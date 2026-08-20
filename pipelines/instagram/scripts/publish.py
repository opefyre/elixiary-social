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

import build_spec          # noqa: E402
import caption as caption_mod  # noqa: E402
import db                  # noqa: E402
import render as renderer  # noqa: E402

BUCKET = "elixiary-images"
SLIDE_PREFIX = "social"
PUBLIC_BASE = "https://pub-dfe281321d524908ae12d89d86e1a8f6.r2.dev"
BUFFER_API = "https://api.buffer.com"

# Buffer's `metadata.instagram.firstComment` is paid-plan only. On Free the
# hashtags are appended to the caption instead. Flip this if the plan changes.
FIRST_COMMENT_SUPPORTED = False

CHANNEL_ELIXIARY = "6a855825ccaf649a67d4db86"
# finkavo is a separate business on the same Buffer account. Never post to it.
CHANNEL_BLOCKLIST = {"6a7b98a8b2d9d577435cbebe": "finkavo"}


def wrangler_bin():
    for p in (os.path.join(REPO, ".tools", "node_modules", ".bin", "wrangler"),
              os.path.join(PIPE, "node_modules", ".bin", "wrangler")):
        if os.path.exists(p):
            return [p]
    return ["npx", "--yes", "wrangler@4"]


def buffer_key():
    with open(os.path.join(REPO, "bufferapi.txt")) as f:
        return f.read().strip()


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
    if not key.startswith(SLIDE_PREFIX + "/"):
        raise RuntimeError(f"refusing to write outside {SLIDE_PREFIX}/: {key}")
    r = subprocess.run(
        wrangler_bin() + ["r2", "object", "put", f"{BUCKET}/{key}",
                          "--file", local, "--content-type", "image/png",
                          "--remote"],
        capture_output=True, text=True,
    )
    if r.returncode != 0:
        raise RuntimeError((r.stderr or r.stdout).strip()[:300])
    return f"{PUBLIC_BASE}/{key}"


def verify_public(url):
    """Buffer fetches media at publish time, which may be days later. If a
    slide isn't publicly reachable now, the post fails silently then."""
    req = urllib.request.Request(url, method="HEAD",
                                 headers={"User-Agent": "elixiary-publish/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status == 200


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


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--type", choices=["recipe"], default="recipe")
    ap.add_argument("--dry-run", action="store_true",
                    help="render and upload, but do not touch Buffer")
    ap.add_argument("--hook", help="override the hook line")
    a = ap.parse_args()

    conn = db.connect()
    run_id = db.start_run(conn, f"publish:{a.type}")
    post_id = None
    try:
        sys.path.insert(0, HERE)
        import pick_next
        pick, err = pick_next.pick_recipe(conn, dry=False)
        if err:
            raise RuntimeError(err)
        post_id, row = pick["post_id"], pick["row"]
        print(f"picked  #{post_id}  {row['name']}  ({pick['meta']['category']}, "
              f"pool {pick['pool']})")

        spec = build_spec.recipe_spec(row)
        hook = a.hook or f"{row['name']}, start to finish."
        spec["slides"][0]["kicker"] = hook
        text = caption_mod.recipe_caption(row, hook=hook)
        fcomment = caption_mod.first_comment(row)
        if not FIRST_COMMENT_SUPPORTED:
            text = f"{text}\n\n{fcomment}"

        with tempfile.TemporaryDirectory() as td:
            files = renderer.render(spec, td)
            print(f"rendered {len(files)} slides")
            urls = []
            for i, f in enumerate(files, 1):
                key = f"{SLIDE_PREFIX}/{post_id}/slide-{i:02d}.png"
                urls.append(upload_slide(f, key))
            print(f"uploaded {len(urls)} slides to r2://{BUCKET}/{SLIDE_PREFIX}/{post_id}/")

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
            print(f"\nfirst comment:\n{fcomment}")
            db.release(conn, post_id)
            db.finish_run(conn, run_id, True, "dry run")
            return

        post = create_draft(CHANNEL_ELIXIARY, text, urls, fcomment)
        db.update(conn, post_id, status="drafted", buffer_post_id=post["id"],
                  channel_id=CHANNEL_ELIXIARY)
        db.finish_run(conn, run_id, True, f"buffer post {post['id']}")
        print(f"\nDRAFT CREATED  buffer_post_id={post['id']}  status={post['status']}")
        print("Review it in Buffer → Drafts. Nothing publishes until you approve.")

    except Exception as ex:
        if post_id:
            db.update(conn, post_id, status="failed", error=str(ex)[:500])
        db.finish_run(conn, run_id, False, str(ex)[:500])
        print(f"FAILED: {ex}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
