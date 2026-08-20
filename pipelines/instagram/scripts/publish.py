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
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
REPO = os.path.abspath(os.path.join(PIPE, "..", ".."))
sys.path.insert(0, os.path.join(PIPE, "state"))
sys.path.insert(0, os.path.join(PIPE, "render"))

sys.path.insert(0, PIPE)
sys.path.insert(0, os.path.join(PIPE, "llm"))
sys.path.insert(0, HERE)
import credentials         # noqa: E402
import r2                  # noqa: E402
import build_spec          # noqa: E402
import caption as caption_mod  # noqa: E402
import db                  # noqa: E402
import generate_angle      # noqa: E402
import pick_next           # noqa: E402
import render as renderer  # noqa: E402

SLIDE_PREFIX = "social"
BUFFER_API = "https://api.buffer.com"

# Buffer's `metadata.instagram.firstComment` is paid-plan only. On Free the
# hashtags are appended to the caption instead. Flip this if the plan changes.
FIRST_COMMENT_SUPPORTED = False

CHANNEL_ELIXIARY = "6a855825ccaf649a67d4db86"
# finkavo is a separate business on the same Buffer account. Never post to it.
CHANNEL_BLOCKLIST = {"6a7b98a8b2d9d577435cbebe": "finkavo"}


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


def create_draft(channel_id, text, image_urls, first_comment=None):
    if channel_id in CHANNEL_BLOCKLIST:
        raise RuntimeError(
            f"refusing to post to {CHANNEL_BLOCKLIST[channel_id]} ({channel_id})")
    if channel_id != CHANNEL_ELIXIARY:
        raise RuntimeError(f"unexpected channel {channel_id}")

    q = """
    mutation CreateDraft($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess { post { id status text } }
        ... on MutationError { message }
      }
    }"""
    data = gql(q, {"input": {
        "text": text,
        "channelId": channel_id,
        "schedulingType": "automatic",
        "mode": "addToQueue",
        "saveToDraft": True,                      # never publishes on its own
        "assets": [{"image": {"url": u}} for u in image_urls],
        # Instagram requires an explicit type. Multiple assets on a `post`
        # become a carousel. Hashtags ride in the first comment so the
        # caption stays readable.
        "metadata": {"instagram": {
            "type": "post",
            "shouldShareToFeed": True,
            **({"firstComment": first_comment}
               if (first_comment and FIRST_COMMENT_SUPPORTED) else {}),
        }},
    }})
    res = data["createPost"]
    if "message" in res and res.get("message"):
        raise RuntimeError(f"Buffer refused the draft: {res['message']}")
    return res["post"]


def prepare_recipe(conn, hook_override):
    pick, err = pick_next.pick_recipe(conn, dry=False)
    if err:
        raise RuntimeError(err)
    post_id, row = pick["post_id"], pick["row"]
    print(f"picked  #{post_id}  {row['name']}  ({pick['meta']['category']}, "
          f"pool {pick['pool']})")

    spec = build_spec.recipe_spec(row)
    hook = hook_override or f"{row['name']}, start to finish."
    spec["slides"][0]["kicker"] = hook
    text = caption_mod.recipe_caption(row, hook=hook)
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


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--type", choices=["recipe", "article"], default="recipe")
    ap.add_argument("--dry-run", action="store_true",
                    help="render and upload, but do not touch Buffer")
    ap.add_argument("--hook", help="override the hook line")
    a = ap.parse_args()

    conn = db.connect()
    run_id = db.start_run(conn, f"publish:{a.type}")
    post_id = None
    try:
        prep = prepare_recipe if a.type == "recipe" else prepare_article
        post_id, spec, text, tags = prep(conn, a.hook)

        if not FIRST_COMMENT_SUPPORTED:
            text = f"{text}\n\n{' '.join(tags)}"
        fcomment = " ".join(tags)

        problems = build_spec.validate_spec(spec)
        if problems:
            raise RuntimeError("spec rejected: " + "; ".join(problems))

        with tempfile.TemporaryDirectory() as td:
            files = renderer.render(spec, td)
            print(f"rendered {len(files)} slides")
            urls = []
            for i, f in enumerate(files, 1):
                key = f"{SLIDE_PREFIX}/{post_id}/slide-{i:02d}.png"
                urls.append(upload_slide(f, key))
            print(f"uploaded {len(urls)} slides to "
                  f"r2://{r2.BUCKET}/{SLIDE_PREFIX}/{post_id}/")

        for u in urls:
            if not verify_public(u):
                raise RuntimeError(f"slide not publicly reachable: {u}")
        print("all slides verified publicly reachable")

        db.update(conn, post_id, status="rendered", caption=text, slide_urls=urls)

        if a.dry_run:
            print("\n--- DRY RUN: not calling Buffer ---")
            print(f"channel: {CHANNEL_ELIXIARY} (elixiary.ai)")
            print(f"assets : {len(urls)}")
            print(f"caption:\n{text}")
            # a dry run must leave no trace: drop the uploads and the claim,
            # otherwise this item is consumed without ever being posted
            for i in range(1, len(urls) + 1):
                delete_slide(f"{SLIDE_PREFIX}/{post_id}/slide-{i:02d}.png")
            db.discard(conn, post_id)
            print(f"cleaned up {len(urls)} slides and released the claim")
            db.finish_run(conn, run_id, True, "dry run")
            return

        post = create_draft(CHANNEL_ELIXIARY, text, urls, fcomment)
        db.update(conn, post_id, status="drafted", buffer_post_id=post["id"],
                  channel_id=CHANNEL_ELIXIARY)
        db.finish_run(conn, run_id, True, f"buffer post {post['id']}")
        print(f"\nDRAFT CREATED  buffer_post_id={post['id']}  "
              f"status={post['status']}")
        print("Review it in Buffer → Drafts. Nothing publishes until you approve.")

    except Exception as ex:
        if post_id:
            db.update(conn, post_id, status="failed", error=str(ex)[:500])
        db.finish_run(conn, run_id, False, str(ex)[:500])
        print(f"FAILED: {ex}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
