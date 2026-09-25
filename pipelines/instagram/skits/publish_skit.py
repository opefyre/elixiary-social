#!/usr/bin/env python3
"""Draft a rendered skit in Buffer at the next free slot (never publishes on its own).

    python3 skits/publish_skit.py <id> "<title>" [cover_ms]      # run from ~/.local/elixiary-social on the spare Mac

Uploads out/<id>/reel.mp4 to R2 and checks it is reachable, creates an Instagram reel draft with the caption in
captions/<id>.txt at the next unoccupied 13:00/19:00 slot, and records it in the tracking DB as a reel with angle "skit"
(the posts table only allows the pipeline's own source types).
"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
for p in (ROOT, os.path.join(ROOT, "scripts"), os.path.join(ROOT, "state"), os.path.join(ROOT, "render")):
    sys.path.insert(0, p)
import db, publish, r2, slots  # noqa: E402

sid, title = sys.argv[1], sys.argv[2]
cover = int(sys.argv[3]) if len(sys.argv) > 3 else 2000
mp4 = os.path.join(HERE, "out", sid, "reel.mp4")
text = open(os.path.join(HERE, "captions", f"{sid}.txt")).read().strip()
assert publish.CHANNEL_ELIXIARY == "6a855825ccaf649a67d4db86"
conn = db.connect()
if conn.execute("SELECT 1 FROM posts WHERE source_type='reel' AND source_id=?", (sid,)).fetchone():
    raise SystemExit(f"{sid} is already tracked — not drafting it twice")
[when] = slots.next_free(1)
key = f"social/skits/{sid}.mp4"
url = r2.put(mp4, key, "video/mp4")
if not r2.exists(key):
    raise SystemExit("upload not reachable — not drafted")
Q = """mutation C($input: CreatePostInput!){ createPost(input:$input){
  ... on PostActionSuccess { post { id status dueAt } } ... on MutationError { message } } }"""
res = publish.gql(Q, {"input": {
    "text": text, "channelId": publish.CHANNEL_ELIXIARY, "schedulingType": "automatic", "mode": "customScheduled",
    "dueAt": slots.to_buffer(when), "saveToDraft": True,
    "assets": [{"video": {"url": url, "metadata": {"title": title, "thumbnailOffset": cover}}}],
    "metadata": {"instagram": {"type": "reel", "shouldShareToFeed": True, "isAiGenerated": True}}}})["createPost"]
if res.get("message"):
    raise SystemExit("Buffer refused: " + res["message"])
post = res["post"]
pid = db.reserve(conn, "reel", sid, angle="skit", meta={"due_at": slots.to_buffer(when), "video": url})
db.update(conn, pid, status="drafted", buffer_post_id=post["id"], channel_id=publish.CHANNEL_ELIXIARY,
          caption=text, slide_urls=[url])
print(f"{slots.local_str(when)}  {post['status']}  buffer={post['id']}  db={pid}  {url}")
