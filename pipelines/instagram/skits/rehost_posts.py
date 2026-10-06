#!/usr/bin/env python3
"""Point every unsent Instagram post's video at the public media Worker instead of the (now disabled) r2.dev URL.

    python3 skits/rehost_posts.py            # dry run: lists what would change
    python3 skits/rehost_posts.py --apply    # edits the posts (run from ~/.local/elixiary-social on the spare Mac)

Buffer fetches the media URL when a post is published; the managed r2.dev URL was switched off on 2026-10-05/06 (HTTP 401, a dev-team
decision) and one post failed with "Please update the media URL to be publicly accessible". Only the video URL changes: text, due time, cover offset,
title and draft/scheduled status are kept. Every new URL is checked first (HTTP 200, video/mp4) and the post is skipped if it is not.
(images.elixiary.com is not used for Buffer: Cloudflare bot protection blocks Buffer there.) A post already in `error` is rescheduled 10 minutes ahead. Only the Instagram channel is touched.
"""
import json, os, sys, time, urllib.request
from datetime import datetime, timedelta, timezone
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
for p in (ROOT, os.path.join(ROOT, "scripts"), os.path.join(ROOT, "state"), os.path.join(ROOT, "render")):
    sys.path.insert(0, p)
import db, publish, slots  # noqa: E402

OLD = "https://pub-dfe281321d524908ae12d89d86e1a8f6.r2.dev/"; NEW = "https://elixiary-social-media.opefyre.workers.dev/"
APPLY = "--apply" in sys.argv
assert publish.CHANNEL_ELIXIARY == "6a855825ccaf649a67d4db86"
Q = ("query P($i: PostsInput!, $first: Int, $after: String){ posts(input:$i, first:$first, after:$after){ "
     "edges { node { id status text dueAt assets { ... on VideoAsset { source video { title thumbnailOffset } } } } } "
     "pageInfo { hasNextPage endCursor } } }")
base = {"organizationId": slots.ORG, "filter": {"channelIds": [publish.CHANNEL_ELIXIARY], "status": ["scheduled", "draft", "needs_approval", "error"]}}
posts, after = [], None
while True:
    d = slots._gql(Q, {"i": base, "first": 100, "after": after})["posts"]
    posts += [e["node"] for e in d["edges"]]
    if not d["pageInfo"]["hasNextPage"]: break
    after = d["pageInfo"]["endCursor"]
todo = [p for p in posts if p.get("assets") and (p["assets"][0].get("source") or "").startswith(OLD)]
print(f"{len(posts)} unsent Instagram posts, {len(todo)} point at the old r2.dev URL")
M = """mutation E($input: EditPostInput!){ editPost(input:$input){
  ... on PostActionSuccess { post { id status dueAt } } ... on MutationError { message } } }"""
def reachable(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, method="HEAD", headers={"User-Agent": "elixiary-pipeline/1.0"}), timeout=25) as r:
            return r.status == 200 and "video/mp4" in (r.headers.get("Content-Type") or "") and int(r.headers.get("Content-Length") or 1) > 0
    except Exception:
        return False
conn = db.connect(); done = 0; bad = 0
for p in sorted(todo, key=lambda x: x["dueAt"] or ""):
    v = p["assets"][0]; url = NEW + v["source"][len(OLD):]
    due = p["dueAt"]
    if p["status"] == "error":
        due = (datetime.now(timezone.utc) + timedelta(minutes=10)).replace(second=0, microsecond=0).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    ok = reachable(url); bad += 0 if ok else 1
    print(f"  {p['status']:9s} {p['dueAt']} -> {due}  {url.rsplit('/', 1)[1]}  {'ok' if ok else 'UNREACHABLE — skipped'}")
    if not APPLY or not ok: continue
    r = slots._gql(M, {"input": {
        "id": p["id"], "text": p["text"], "dueAt": due, "mode": "customScheduled", "schedulingType": "automatic", "saveToDraft": p["status"] == "draft",
        "assets": [{"video": {"url": url, "metadata": {"title": (v.get("video") or {}).get("title") or "", "thumbnailOffset": (v.get("video") or {}).get("thumbnailOffset") or 2000}}}],
        "metadata": {"instagram": {"type": "reel", "shouldShareToFeed": True, "isAiGenerated": True}}}})["editPost"]
    if r.get("message"):
        print("    Buffer refused:", r["message"]); continue
    row = conn.execute("SELECT id, meta FROM posts WHERE buffer_post_id=?", (p["id"],)).fetchone()
    if row:
        meta = json.loads(row[1] or "{}"); meta["video"] = url
        if p["status"] == "error": meta["due_at"] = due
        conn.execute("UPDATE posts SET meta=?, slide_urls=? WHERE id=?", (json.dumps(meta), json.dumps([url]), row[0])); conn.commit()
    done += 1; time.sleep(.6)
print((f"edited {done}" if APPLY else "dry run only — add --apply") + f"; unreachable: {bad}")
