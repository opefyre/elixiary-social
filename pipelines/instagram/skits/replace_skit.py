#!/usr/bin/env python3
"""Swap the video of an already drafted skit for the freshly rendered out/<id>/reel.mp4 — same day, same caption, still a draft.

    python3 skits/replace_skit.py <skit id> [version]      # run from ~/.local/elixiary-social on the spare Mac

Uploads to a NEW R2 key (social/skits/<id>-<version>.mp4, default v2, so nothing is served from a cache), then re-sends the whole post
through Buffer's editPost with the new video, keeping its text, due time, cover offset, title and draft/scheduled status.
"""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
for p in (ROOT, os.path.join(ROOT, "scripts"), os.path.join(ROOT, "state"), os.path.join(ROOT, "render")):
    sys.path.insert(0, p)
import db, publish, r2, slots  # noqa: E402

sid = sys.argv[1]; ver = sys.argv[2] if len(sys.argv) > 2 else "v2"
mp4 = os.path.join(HERE, "out", sid, "reel.mp4")
assert publish.CHANNEL_ELIXIARY == "6a855825ccaf649a67d4db86"
conn = db.connect()
row = conn.execute("SELECT id, buffer_post_id, meta FROM posts WHERE source_type='reel' AND angle='skit' AND source_id=?", (sid,)).fetchone()
if not row:
    raise SystemExit(f"{sid} is not a tracked skit")
pid, bid, meta = row[0], row[1], json.loads(row[2] or "{}")
Q = """query($i:PostInput!){ post(input:$i){ status text dueAt assets { ... on VideoAsset { source video { title thumbnailOffset } } } } }"""
p = slots._gql(Q, {"i": {"id": bid}})["post"]
v = p["assets"][0]
key = f"social/skits/{sid}-{ver}.mp4"
url = r2.put(mp4, key, "video/mp4")
if not r2.exists(key):
    raise SystemExit("upload not reachable — not replaced")
M = """mutation E($input: EditPostInput!){ editPost(input:$input){
  ... on PostActionSuccess { post { id status dueAt } } ... on MutationError { message } } }"""
r = slots._gql(M, {"input": {
    "id": bid, "text": p["text"], "dueAt": p["dueAt"], "mode": "customScheduled", "schedulingType": "automatic", "saveToDraft": p["status"] == "draft",
    "assets": [{"video": {"url": url, "metadata": {"title": (v.get("video") or {}).get("title") or sid,
                                                   "thumbnailOffset": (v.get("video") or {}).get("thumbnailOffset") or 2000}}}],
    "metadata": {"instagram": {"type": "reel", "shouldShareToFeed": True, "isAiGenerated": True}}}})["editPost"]
if r.get("message"):
    raise SystemExit("Buffer refused: " + r["message"])
meta["video"] = url
conn.execute("UPDATE posts SET meta=? WHERE id=?", (json.dumps(meta), pid)); conn.commit()
print(f"{sid}: {r['post']['status']} due {r['post']['dueAt']}  buffer={bid}  {url}")
