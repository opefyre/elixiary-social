#!/usr/bin/env python3
"""
Turn every unposted "a cocktail that tastes like…" recipe into a reel and
draft it on both channels, one per evening after the last scheduled reel.

    python3 batch_asked.py --limit 5 [--dry-run] [--from 2026-09-11]

Only recipes whose prompt starts with the series phrase qualify — a
bartender-speak prompt would break the hook. Each reel is rendered, the file
is probed for a video and an audio stream and the expected length, uploaded
to R2 and verified reachable, and only then drafted (Instagram reel + TikTok
mirror, cover offset on the name beat) and recorded in the tracking DB.
"""
import argparse, json, os, re, subprocess, sys, tempfile
from datetime import datetime, timedelta, timezone

HERE = os.path.dirname(os.path.abspath(__file__)); PIPE = os.path.abspath(os.path.join(HERE, ".."))
for p in (os.path.join(PIPE, "state"), os.path.join(PIPE, "render"), PIPE, os.path.join(PIPE, "scripts"), HERE):
    sys.path.insert(0, p)
import db, pg, marlow, publish, r2, slots  # noqa: E402

SERIES = re.compile(r"^\s*a cocktail that tastes like\b", re.I)
COVER_MS = 7000
Q = """mutation C($input: CreatePostInput!){ createPost(input:$input){
  ... on PostActionSuccess { post { id status dueAt } } ... on MutationError { message } } }"""


def candidates(conn):
    uid = marlow.require_user()
    fields = marlow.FIELDS.replace("\n", "")
    rows = pg.rows("SELECT to_jsonb(t) FROM (SELECT %s FROM generated_recipes WHERE user_id = '%s' "
                   "AND image_url IS NOT NULL AND image_url <> '' ORDER BY created_at ASC) t;" % (fields, uid))
    used = {r["source_id"] for r in conn.execute("SELECT source_id FROM posts WHERE source_type='reel'")}
    out = []
    for r in rows:
        prompt = " ".join((r.get("user_prompt") or "").split())
        if r["id"] in used or not SERIES.match(prompt):
            continue
        out.append({"id": r["id"], "name": r["recipe_name"], "prompt": prompt, "image": r["image_url"],
                    "description": r.get("description"), "ingredients": r.get("ingredients")})
    return out


def evenings(start, n, conn):
    """19:00 local on consecutive days from `start`, skipping any day already holding a reel."""
    tz = slots._tz(); taken_ig = slots.occupied(); taken_tt = slots.occupied(publish.CHANNEL_TIKTOK)
    out, d = [], start
    while len(out) < n:
        local = datetime(d.year, d.month, d.day, 19, 0, tzinfo=tz)
        utc = local.astimezone(timezone.utc).replace(second=0, microsecond=0)
        if utc not in taken_ig and utc not in taken_tt:
            out.append(utc)
        d += timedelta(days=1)
    return out


def last_reel_day(conn):
    row = conn.execute("SELECT MAX(json_extract(meta,'$.due_at')) FROM posts WHERE source_type='reel'").fetchone()
    if not row or not row[0]:
        return datetime.now(slots._tz()).date()
    return datetime.fromisoformat(row[0].replace("Z", "+00:00")).astimezone(slots._tz()).date()


def validate(mp4, dur):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height",
                          "-show_entries", "format=duration", "-of", "json", mp4], capture_output=True, text=True).stdout
    j = json.loads(out); kinds = {s["codec_type"] for s in j["streams"]}
    vid = next(s for s in j["streams"] if s["codec_type"] == "video")
    problems = []
    if kinds != {"video", "audio"}: problems.append(f"streams {sorted(kinds)}")
    if (vid["width"], vid["height"]) != (1080, 1920): problems.append(f"size {vid['width']}x{vid['height']}")
    if abs(float(j["format"]["duration"]) - dur) > 0.3: problems.append(f"duration {j['format']['duration']}")
    return problems


def caption(r):
    ing = [l.strip().lstrip("-*• ") for l in (r["ingredients"] or "").splitlines() if l.strip()][:4]
    ing = ", ".join(i.split(" ", 2)[-1].lower() if i[:1].isdigit() else i.lower() for i in ing)
    return (f"I asked an AI for {r['prompt']}.\n\nIt called it \"{r['name']}.\" {ing[:1].upper()+ing[1:]}.\n\n"
            f"What should I ask it next? 👇\n\nInvent yours → elixiary.com\n\n"
            f"#cocktails #aicocktails #mixology #cocktailrecipe #elixiary")


def draft(conn, r, url, when):
    slot = slots.to_buffer(when); text = caption(r)
    def create(channel, meta):
        res = publish.gql(Q, {"input": {"text": text, "channelId": channel, "schedulingType": "automatic",
            "mode": "customScheduled", "dueAt": slot, "saveToDraft": True,
            "assets": [{"video": {"url": url, "metadata": {"title": r["name"], "thumbnailOffset": COVER_MS}}}],
            "metadata": meta}})["createPost"]
        if res.get("message"): raise RuntimeError(f"Buffer refused ({channel}): {res['message']}")
        return res["post"]
    ig = create(publish.CHANNEL_ELIXIARY, {"instagram": {"type": "reel", "shouldShareToFeed": True, "isAiGenerated": True}})
    tt = create(publish.CHANNEL_TIKTOK, {"tiktok": {"isAiGenerated": True}})
    pid = db.reserve(conn, "reel", r["id"], angle="asked", meta={"due_at": slot, "video": url, "slide_token": "reels"})
    db.update(conn, pid, status="drafted", buffer_post_id=ig["id"], channel_id=publish.CHANNEL_ELIXIARY,
              caption=text, slide_urls=[url])
    db.add_crosspost(conn, pid, "tiktok", publish.CHANNEL_TIKTOK, tt["id"], [url], status="drafted")
    return pid, ig["id"], tt["id"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=5); ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--from", dest="start", default=None, help="first evening, YYYY-MM-DD (default: day after the last reel)")
    a = ap.parse_args()
    conn = db.connect()
    cands = candidates(conn)[:a.limit]
    if not cands:
        print("no unposted 'a cocktail that tastes like…' recipes with an image"); return
    start = datetime.strptime(a.start, "%Y-%m-%d").date() if a.start else last_reel_day(conn) + timedelta(days=1)
    when = evenings(start, len(cands), conn)
    print(f"{len(cands)} recipe(s) → evenings from {start}:")
    for r, w in zip(cands, when):
        print(f"  {slots.local_str(w):18} {r['name']:34} {r['prompt'][:50]}")
    if a.dry_run: return
    build = os.path.join(HERE, "build_asked.py")
    for r, w in zip(cands, when):
        slug = re.sub(r"[^a-z0-9]+", "-", r["name"].lower()).strip("-")
        work = tempfile.mkdtemp(prefix=f"reel-{slug}-"); rj = os.path.join(work, "recipe.json")
        json.dump(r, open(rj, "w")); mp4 = os.path.join(work, f"{slug}.mp4")
        subprocess.run([sys.executable, build, rj, "--out", mp4, "--work", os.path.join(work, "w")],
                       check=True, capture_output=True, text=True)
        probs = validate(mp4, 18.5)
        if probs: print(f"  {r['name']}: INVALID {probs} — not drafted"); continue
        key = f"social/reels/{slug}.mp4"; url = r2.put(mp4, key, "video/mp4")
        if not r2.exists(key): print(f"  {r['name']}: upload not reachable — not drafted"); continue
        pid, ig, tt = draft(conn, r, url, w)
        print(f"  ✓ {slots.local_str(w):18} {r['name']:34} ig={ig} tt={tt} db={pid}")


if __name__ == "__main__":
    main()
