#!/usr/bin/env python3
"""
End-to-end: pick -> render -> upload slides to R2 -> create a Buffer DRAFT.

Creates drafts only. There is deliberately no publish path in this file —
`saveToDraft: true` is hardcoded, so approval always happens by hand in Buffer.

    python3 scripts/publish.py --type recipe --dry-run
    python3 scripts/publish.py --type recipe
"""

import argparse
import json
import os
import secrets as _secrets
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
REPO = os.path.abspath(os.path.join(PIPE, "..", ".."))
sys.path.insert(0, os.path.join(PIPE, "state"))
sys.path.insert(0, os.path.join(PIPE, "render"))

sys.path.insert(0, PIPE)
sys.path.insert(0, os.path.join(PIPE, "llm"))
sys.path.insert(0, HERE)
import credentials         # noqa: E402
import bottle_math         # noqa: E402
import marlow              # noqa: E402
import r2                  # noqa: E402
import shortlist           # noqa: E402
import slots               # noqa: E402

import build_spec          # noqa: E402
import caption as caption_mod  # noqa: E402
import db                  # noqa: E402
import generate_angle      # noqa: E402
import hooks               # noqa: E402
import pick_next           # noqa: E402
import render as renderer  # noqa: E402
import vertical            # noqa: E402

# A stray copy of db.py anywhere earlier on sys.path would silently resolve to
# a different, empty tracking database — the pool would look untouched and
# already-posted items would be served again. Fail loudly instead.
_expected = os.path.join(PIPE, "state", "db.py")
if os.path.abspath(db.__file__) != os.path.abspath(_expected):
    raise SystemExit(
        f"wrong db module: imported {db.__file__}, expected {_expected}. "
        f"Remove the stray copy before running.")


SLIDE_PREFIX = "social"


def slide_prefix(conn, post_id):
    """Per-post upload prefix.

    It used to be social/<post_id>. Post ids come from a per-machine SQLite
    sequence while the bucket is shared, so a dry run on a laptop that happened
    to reach the same id overwrote — and on cleanup deleted — a live post's
    slides on the server. The token is generated once, at claim time, and kept
    in meta so the prefix is known even if the run dies mid-way.
    """
    row = db.get_post(conn, post_id) or {}
    meta = json.loads(row.get("meta") or "{}")
    token = meta.get("slide_token")
    if not token:
        token = _secrets.token_hex(5)
        meta["slide_token"] = token
        db.update(conn, post_id, meta=meta)
    return f"{SLIDE_PREFIX}/{post_id}-{token}"
BUFFER_API = "https://api.buffer.com"

# Buffer's `metadata.instagram.firstComment` is paid-plan only. On Free the
# hashtags are appended to the caption instead. Flip this if the plan changes.
FIRST_COMMENT_SUPPORTED = False

CHANNEL_ELIXIARY = "6a855825ccaf649a67d4db86"
# finkavo is a separate business on the same Buffer account. Never post to it.
CHANNEL_BLOCKLIST = {"6a7b98a8b2d9d577435cbebe": "finkavo"}

# Same account, second surface. TikTok shows photo posts full-screen 9:16, so
# the mirror carries re-framed slides rather than the 4:5 Instagram ones.
CHANNEL_TIKTOK = "6a8825c2ccaf649a67eab6b0"
ALLOWED_CHANNELS = {CHANNEL_ELIXIARY: "instagram", CHANNEL_TIKTOK: "tiktok"}

# Off switch, so a TikTok outage can never hold up the Instagram post.
TIKTOK_ENABLED = os.environ.get("ELIXIARY_TIKTOK", "1") not in ("0", "false", "")


def buffer_key():
    return credentials.get("buffer")


def gql(query, variables=None):
    body = json.dumps({"query": query, "variables": variables or {}}).encode()
    req = urllib.request.Request(
        BUFFER_API, data=body, method="POST",
        headers={"Authorization": f"Bearer {buffer_key()}",
                 "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            out = json.loads(r.read())
    except urllib.error.HTTPError as ex:
        raise RuntimeError(f"Buffer HTTP {ex.code}: {ex.read()[:400].decode()}")
    if out.get("errors"):
        raise RuntimeError(f"Buffer GraphQL error: {out['errors']}")
    return out["data"]


def upload_slide(local, key):
    return r2.put(local, key, "image/png")


def delete_slide(key):
    """Only ever used to undo our own upload in a dry run."""
    r2.delete(key)


def verify_public(url):
    """Buffer fetches media at publish time, which may be days later. If a
    slide isn't publicly reachable now, the post fails silently then."""
    return r2.exists(url.rsplit(r2.PUBLIC_BASE + "/", 1)[-1])


def post_metadata(channel_id, first_comment=None, title=None):
    if channel_id == CHANNEL_TIKTOK:
        # `title` is TikTok's headline for a photo post; the caption still
        # carries the full text. There is deliberately no isAiGenerated here:
        # Buffer rejects it on photo posts ("TikTok photo posts do not support
        # AI content disclosure"), so Marlow's disclosure rides in the caption,
        # which already says he wrote the recipe and generated the photograph.
        return {"tiktok": {**({"title": title[:90]} if title else {})}}
    # Instagram requires an explicit type. Multiple assets on a `post` become
    # a carousel. Hashtags would ride in the first comment on a paid plan.
    return {"instagram": {
        "type": "post",
        "shouldShareToFeed": True,
        **({"firstComment": first_comment}
           if (first_comment and FIRST_COMMENT_SUPPORTED) else {}),
    }}


def create_draft(channel_id, text, image_urls, first_comment=None, due_at=None,
                 title=None):
    if channel_id in CHANNEL_BLOCKLIST:
        raise RuntimeError(
            f"refusing to post to {CHANNEL_BLOCKLIST[channel_id]} ({channel_id})")
    if channel_id not in ALLOWED_CHANNELS:
        raise RuntimeError(f"unexpected channel {channel_id}")

    q = """
    mutation CreateDraft($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess { post { id status text } }
        ... on MutationError { message }
      }
    }"""
    # A draft can carry a time: saveToDraft keeps it in review while dueAt
    # reserves the slot. customScheduled pins the exact time rather than
    # letting Buffer snap it to the next queue opening.
    data = gql(q, {"input": {
        "text": text,
        "channelId": channel_id,
        "schedulingType": "automatic",
        "mode": "customScheduled" if due_at else "addToQueue",
        **({"dueAt": due_at} if due_at else {}),
        "saveToDraft": True,                      # never publishes on its own
        "assets": [{"image": {"url": u}} for u in image_urls],
        "metadata": post_metadata(channel_id, first_comment, title),
    }})
    res = data["createPost"]
    if "message" in res and res.get("message"):
        raise RuntimeError(f"Buffer refused the draft: {res['message']}")
    return res["post"]


def adhoc_time(at=None, asap=False):
    """A time off the fixed 13:00/19:00 grid, for a post asked for outside the
    schedule. Returns None when neither flag is given, so the caller falls
    back to the next fixed slot."""
    if not at and not asap:
        return None
    now = datetime.now(timezone.utc)
    if asap:
        return (now + timedelta(hours=slots.MIN_LEAD_HOURS)).replace(
            second=0, microsecond=0)
    tz = slots._tz()
    for fmt in ("%Y-%m-%d %H:%M", "%Y-%m-%dT%H:%M", "%Y-%m-%d %H"):
        try:
            local = datetime.strptime(at, fmt).replace(tzinfo=tz)
            break
        except ValueError:
            local = None
    if local is None:
        raise RuntimeError(f"could not read --at {at!r}; use '2026-08-27 15:30'")
    when = local.astimezone(timezone.utc).replace(second=0, microsecond=0)
    if when <= now:
        raise RuntimeError(f"--at {at} is in the past ({slots.local_str(when)})")
    return when


def mirror_tiktok(conn, post_id, text, image_urls, due_at):
    """Second draft, same caption, same slot, 9:16 frames. Never raises: the
    Instagram post is already live in Buffer by this point, and losing the
    mirror must not mark it failed."""
    title = (text or "").split("\n")[0].strip()
    try:
        if not due_at:
            # Backfilled mirrors of posts that already went out on Instagram
            # arrive with no slot. Give them one on TikTok's own calendar so
            # they don't sit timeless, and so two of them can't land together.
            free = slots.next_free(1, channel=CHANNEL_TIKTOK)
            if free:
                due_at = slots.to_buffer(free[0])
                print(f"tiktok  no source slot — placed {slots.local_str(free[0])}")
        post = create_draft(CHANNEL_TIKTOK, text, image_urls, due_at=due_at,
                            title=title)
        db.add_crosspost(conn, post_id, "tiktok", CHANNEL_TIKTOK,
                         post["id"], image_urls, status="drafted")
        print(f"tiktok  mirrored  buffer_post_id={post['id']}  "
              f"status={post['status']}")
        return post
    except Exception as ex:
        db.add_crosspost(conn, post_id, "tiktok", CHANNEL_TIKTOK,
                         None, image_urls, status="failed", error=str(ex)[:500])
        print(f"tiktok  mirror failed: {str(ex)[:200]}", file=sys.stderr)
        return None


def prepare_recipe(conn, hook_override):
    pick, err = pick_next.pick_recipe(conn, dry=False)
    if err:
        raise RuntimeError(err)
    post_id, row, angle = pick["post_id"], pick["row"], pick["angle"]
    print(f"picked  #{post_id}  {row['name']}  [{angle}]  "
          f"({pick['meta']['category']}, pool {pick['pool']})")

    spec = build_spec.recipe_spec(row, angle)
    if hook_override:
        kicker, caption_hook = hook_override, hook_override
    else:
        kicker, caption_hook = hooks.recipe_hook(row, angle=angle)
        print(f"hook    {kicker}")
    spec["slides"][0]["kicker"] = kicker
    text = caption_mod.recipe_caption(row, hook=caption_hook)
    tags = caption_mod.hashtags(row)
    return post_id, spec, text, tags


def prepare_article(conn, hook_override):
    pick, err = pick_next.pick_article(conn, dry=False)
    if err:
        raise RuntimeError(err)
    art, used = pick["row"], pick["used_angles"]
    print(f"picked  {art['title'][:52]}  ({pick['meta']['category']}, "
          f"{len(used)} angle(s) used, pool {pick['pool']})")

    angle = generate_angle.generate(art, used)
    print(f"angle   {angle['angle_id']}  ({angle['_kind']})")

    # reserve only once the angle exists — it is part of the uniqueness key
    post_id = db.reserve(conn, "article", art["id"], angle["angle_id"],
                         {"category": art.get("category"),
                          "title": art.get("title"), "slug": art.get("slug"),
                          "angle_kind": angle["_kind"]})
    if post_id is None:
        raise RuntimeError(f"angle {angle['angle_id']} already used for this article")

    spec = build_spec.article_spec(art, angle)
    if hook_override:
        spec["slides"][0]["kicker"] = hook_override
    text = caption_mod.article_caption(art, angle)
    tags = caption_mod.article_hashtags(art, angle)
    return post_id, spec, text, tags


def prepare_homebar(conn, hook_override):
    """The home-bar format has no queue of source items, so it cycles through
    (seed bottle, bottle count) variants instead."""
    import pick_next as pn
    recipes = pn.query("SELECT to_jsonb(x) FROM (SELECT id,name,slug,"
                       "ingredients_resolved FROM curated_recipes) x;")
    master = pn.query("SELECT to_jsonb(m) FROM (SELECT id,category "
                      "FROM ingredients_master) m;")
    bottles, pantry = bottle_math.classify(recipes, master)

    used = {sid for sid, _ in db.used_keys(conn, "homebar")}
    recent = db.recent_meta(conn, "homebar", 4)
    recent_seeds = [m.get("seed") for m in recent]
    recent_totals = [m.get("total") for m in recent]

    # Biggest headline first, but never the same figure twice in a row: past a
    # dozen bottles the greedy converges, so many variants share a total and
    # sorting on size alone would run "218 cocktails" eight posts running.
    ordered = bottle_math.variants_by_impact(recipes, bottles, pantry)
    choice = None
    for relax in (False, True):
        for seed, steps, total in ordered:
            vid = bottle_math.variant_id(seed, steps)
            if vid in used:
                continue
            if seed in recent_seeds:
                continue
            if not relax and total in recent_totals:
                continue
            choice = (seed, steps, vid)
            break
        if choice:
            break
    if choice is None:
        raise RuntimeError("no unused home-bar variants left")

    seed, steps, vid = choice
    spec = bottle_math.order_carousel(recipes, steps=steps, bottles=bottles,
                                      pantry=pantry, seed=seed)
    if spec is None:
        raise RuntimeError(f"variant {vid} produced too few steps")
    spec["source"]["seed"] = seed
    print(f"picked  {vid}  ({spec['slides'][0]['title']})")

    post_id = db.reserve(conn, "homebar", vid, "",
                         {"seed": seed, "steps": steps,
                          "total": spec["source"]["total"]})
    if post_id is None:
        raise RuntimeError(f"variant {vid} already used")

    if hook_override:
        spec["slides"][0]["kicker"] = hook_override
    text = caption_mod.homebar_caption(spec["source"], hook=hook_override)
    tags = caption_mod.homebar_hashtags(spec["source"])
    return post_id, spec, text, tags


def prepare_marlow(conn, hook_override):
    """AI-generated drinks from the configured account. Refuses to run without
    ELIXIARY_MARLOW_USER_ID — these rows are somebody's private generations."""
    rows = marlow.fetch()
    used = {sid for sid, _ in db.used_keys(conn, "marlow")}
    candidates = [g for g in rows if g["id"] not in used]
    if not candidates:
        raise RuntimeError(f"no unposted Marlow recipes left ({len(rows)} total)")

    spec = None
    for g in candidates:
        spec = marlow.carousel(g)
        if spec:
            break
    if spec is None:
        raise RuntimeError("no candidate had usable ingredients and method")

    spec["source"]["prompt"] = g.get("user_prompt")
    print(f"picked  {g['recipe_name']}  (pool {len(candidates)})")

    post_id = db.reserve(conn, "marlow", g["id"], "",
                         {"name": g.get("recipe_name"),
                          "glass": g.get("glassware")})
    if post_id is None:
        raise RuntimeError("lost a race for that generated recipe")

    if hook_override:
        spec["slides"][0]["kicker"] = hook_override
    text = caption_mod.marlow_caption(spec["source"], hook=hook_override)
    tags = caption_mod.marlow_hashtags(spec["source"])
    return post_id, spec, text, tags


def prepare_shortlist(conn, hook_override, series_id=None):
    """Five drinks that share an attribute. Each series remembers which
    recipes it has already featured, so a series never repeats a drink."""
    used_rows = conn.execute(
        "SELECT source_id, meta FROM posts WHERE source_type='shortlist'"
    ).fetchall()
    used_ids, per_series = set(), {}
    for r in used_rows:
        try:
            m = json.loads(r["meta"] or "{}")
        except Exception:
            m = {}
        sid = m.get("series")
        per_series.setdefault(sid, set()).update(m.get("picks") or [])
        used_ids.add(r["source_id"])

    recent = [m.get("series") for m in db.recent_meta(conn, "shortlist", 3)]
    order = [s for s in shortlist.SERIES if s["id"] == series_id] if series_id \
        else [s for s in shortlist.SERIES if s["id"] not in recent] or shortlist.SERIES

    for series in order:
        seen = per_series.get(series["id"], set())
        picks = shortlist.candidates(series, exclude_ids=seen)[:shortlist.PER_POST]
        if len(picks) < shortlist.PER_POST:
            continue
        spec = shortlist.carousel(series, picks)
        if not spec:
            continue

        n = len(seen) // shortlist.PER_POST + 1
        vid = f"{series['id']}:{n}"
        post_id = db.reserve(conn, "shortlist", vid, "",
                             {"series": series["id"], "name": series["name"],
                              "picks": spec["source"]["picks"]})
        if post_id is None:
            continue
        print(f"picked  {vid}  ({series['name']}: "
              f"{', '.join(spec['source']['names'])})")
        if hook_override:
            spec["slides"][0]["kicker"] = hook_override
        text = caption_mod.shortlist_caption(spec["source"], hook=hook_override)
        tags = caption_mod.shortlist_hashtags(spec["source"])
        return post_id, spec, text, tags

    raise RuntimeError("no shortlist series has five unused recipes left")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--type",
                    choices=["recipe", "article", "homebar", "marlow",
                             "shortlist"],
                    default="recipe")
    ap.add_argument("--series", help="force a specific shortlist series")
    ap.add_argument("--dry-run", action="store_true",
                    help="render and upload, but do not touch Buffer")
    ap.add_argument("--hook", help="override the hook line")
    ap.add_argument("--at", help="ad-hoc: post at this local time instead of "
                                 "the next fixed slot, e.g. '2026-08-27 15:30'")
    ap.add_argument("--asap", action="store_true",
                    help="ad-hoc: earliest allowed time, off the fixed grid")
    a = ap.parse_args()

    conn = db.connect()
    run_id = db.start_run(conn, f"publish:{a.type}")
    post_id = None
    try:
        if a.type == "shortlist":
            post_id, spec, text, tags = prepare_shortlist(conn, a.hook, a.series)
        else:
            prep = {"recipe": prepare_recipe, "article": prepare_article,
                    "homebar": prepare_homebar, "marlow": prepare_marlow}[a.type]
            post_id, spec, text, tags = prep(conn, a.hook)

        if not FIRST_COMMENT_SUPPORTED:
            text = f"{text}\n\n{' '.join(tags)}"
        fcomment = " ".join(tags)

        problems = build_spec.validate_spec(spec)
        if problems:
            raise RuntimeError("spec rejected: " + "; ".join(problems))

        prefix = slide_prefix(conn, post_id)
        tt_urls = []
        with tempfile.TemporaryDirectory() as td:
            files = renderer.render(spec, td)
            print(f"rendered {len(files)} slides")
            urls = []
            for i, f in enumerate(files, 1):
                urls.append(upload_slide(f, f"{prefix}/slide-{i:02d}.png"))
            print(f"uploaded {len(urls)} slides to r2://{r2.BUCKET}/{prefix}/")

            # The mirror is a bonus surface. If re-framing or uploading it
            # fails, the Instagram post — the thing that was actually picked
            # and reserved — still goes out.
            if TIKTOK_ENABLED:
                try:
                    tt = vertical.wrap(files, os.path.join(td, "tt"))
                    tt_urls = [upload_slide(f, f"{prefix}/tt-{i:02d}.png")
                               for i, f in enumerate(tt, 1)]
                    print(f"re-framed {len(tt_urls)} slides 9:16 for TikTok")
                except Exception as ex:
                    tt_urls = []
                    print(f"tiktok  frames failed ({str(ex)[:120]}) — "
                          f"Instagram unaffected")

        for u in urls:
            if not verify_public(u):
                raise RuntimeError(f"slide not publicly reachable: {u}")
        print("all slides verified publicly reachable")

        if tt_urls and not all(verify_public(u) for u in tt_urls):
            print("tiktok  frames not publicly reachable — skipping the mirror")
            tt_urls = []

        db.update(conn, post_id, status="rendered", caption=text, slide_urls=urls)

        if a.dry_run:
            print("\n--- DRY RUN: not calling Buffer ---")
            print(f"channel: {CHANNEL_ELIXIARY} (elixiary.ai)")
            print(f"assets : {len(urls)}")
            print(f"caption:\n{text}")
            # a dry run must leave no trace: drop the uploads and the claim,
            # otherwise this item is consumed without ever being posted
            print(f"tiktok : {len(tt_urls)} frames"
                  if tt_urls else "tiktok : skipped")
            for i in range(1, len(urls) + 1):
                delete_slide(f"{prefix}/slide-{i:02d}.png")
            for i in range(1, len(tt_urls) + 1):
                delete_slide(f"{prefix}/tt-{i:02d}.png")
            db.discard(conn, post_id)
            print(f"cleaned up {len(urls) + len(tt_urls)} slides "
                  f"and released the claim")
            db.finish_run(conn, run_id, True, "dry run")
            return

        slot = None
        try:
            when = adhoc_time(a.at, a.asap)
            if when is None:
                free = slots.next_free(1)
                when = free[0] if free else None
            if when:
                slot = slots.to_buffer(when)
                print(f"slot    {slots.local_str(when)}"
                      + ("  (ad-hoc)" if (a.at or a.asap) else ""))
        except Exception as ex:
            if a.at or a.asap:
                raise
            print(f"slot    unavailable ({str(ex)[:80]}) — Buffer will queue it")

        post = create_draft(CHANNEL_ELIXIARY, text, urls, fcomment, due_at=slot)
        db.update(conn, post_id, status="drafted", buffer_post_id=post["id"],
                  channel_id=CHANNEL_ELIXIARY)
        if slot:
            meta = json.loads(db.get_post(conn, post_id).get("meta") or "{}")
            meta["due_at"] = slot
            db.update(conn, post_id, meta=meta)
        if tt_urls:
            mirror_tiktok(conn, post_id, text, tt_urls, slot)

        db.finish_run(conn, run_id, True, f"buffer post {post['id']}")
        print(f"\nDRAFT CREATED  buffer_post_id={post['id']}  "
              f"status={post['status']}"
              + (f"  due={slot}" if slot else ""))
        print("Review it in Buffer → Drafts. Nothing publishes until you approve.")

    except Exception as ex:
        if post_id:
            db.update(conn, post_id, status="failed", error=str(ex)[:500])
        db.finish_run(conn, run_id, False, str(ex)[:500])
        print(f"FAILED: {ex}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
