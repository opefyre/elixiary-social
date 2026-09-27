#!/usr/bin/env python3
"""Move a drafted skit to another day at 13:00 (a draft stays a draft; an approved post stays scheduled).

    python3 skits/move_skit.py <skit id> <YYYY-MM-DD | next>      # run from ~/.local/elixiary-social on the spare Mac

`next` picks the first 13:00 slot on a day with no other skit. Buffer's editPost needs the whole post back, so the
caption, video (with its title and cover offset) and reel settings are read from Buffer and re-sent with the new time.
The tracking DB's due_at is updated to match.
"""
import json, os, sys
from datetime import datetime
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
for p in (ROOT, os.path.join(ROOT, "scripts"), os.path.join(ROOT, "state"), os.path.join(ROOT, "render")):
    sys.path.insert(0, p)
import db, publish, slots  # noqa: E402

sid, target = sys.argv[1], sys.argv[2]
conn = db.connect()
row = conn.execute("SELECT id, buffer_post_id, meta FROM posts WHERE source_type='reel' AND angle='skit' AND source_id=?", (sid,)).fetchone()
if not row:
    raise SystemExit(f"{sid} is not a tracked skit")
pid, bid, meta = row[0], row[1], json.loads(row[2] or "{}")
tz = slots._tz()
skit_days = {}
for (s, m) in conn.execute("SELECT source_id, meta FROM posts WHERE source_type='reel' AND angle='skit'"):
    d = json.loads(m or "{}").get("due_at")
    if d and s != sid:
        skit_days[datetime.fromisoformat(d.replace("Z", "+00:00")).astimezone(tz).date()] = s
taken = slots.occupied()
old = meta.get("due_at")
if old:
    taken.discard(datetime.fromisoformat(old.replace("Z", "+00:00")).replace(second=0, microsecond=0))
if target == "next":                      # a different day than the one it is on now
    cur = datetime.fromisoformat(old.replace("Z", "+00:00")).astimezone(tz).date() if old else None
    when = next((u for u in slots.candidates(days=90) if u not in taken and u.astimezone(tz).hour == 13
                 and u.astimezone(tz).date() not in skit_days and u.astimezone(tz).date() != cur), None)
    if when is None:
        raise SystemExit("no free 13:00 slot on a skit-free day")
else:
    y, mo, d = map(int, target.split("-"))
    from datetime import timezone
    when = datetime(y, mo, d, 13, 0, tzinfo=tz).astimezone(timezone.utc).replace(second=0, microsecond=0)
    if when.astimezone(tz).date() in skit_days:
        raise SystemExit(f"{target} already has a skit ({skit_days[when.astimezone(tz).date()]}) — move that one first")
    if when in taken:
        raise SystemExit(f"{target} 13:00 is taken by another post")
Q = """query($i:PostInput!){ post(input:$i){ status text assets { ... on VideoAsset { source video { title thumbnailOffset } } } } }"""
p = slots._gql(Q, {"i": {"id": bid}})["post"]
v = p["assets"][0]
M = """mutation E($input: EditPostInput!){ editPost(input:$input){
  ... on PostActionSuccess { post { id status dueAt } } ... on MutationError { message } } }"""
assert publish.CHANNEL_ELIXIARY == "6a855825ccaf649a67d4db86"
r = slots._gql(M, {"input": {
    "id": bid, "text": p["text"], "dueAt": slots.to_buffer(when), "mode": "customScheduled", "schedulingType": "automatic", "saveToDraft": p["status"] == "draft",   # an approved (scheduled) post stays approved
    "assets": [{"video": {"url": v["source"], "metadata": {"title": (v.get("video") or {}).get("title") or sid,
                                                          "thumbnailOffset": (v.get("video") or {}).get("thumbnailOffset") or 2000}}}],
    "metadata": {"instagram": {"type": "reel", "shouldShareToFeed": True, "isAiGenerated": True}}}})["editPost"]
if r.get("message"):
    raise SystemExit("Buffer refused: " + r["message"])
meta["due_at"] = slots.to_buffer(when)
conn.execute("UPDATE posts SET meta=? WHERE id=?", (json.dumps(meta), pid)); conn.commit()
print(f"{sid}: {slots.local_str(when)}  {r['post']['status']}  buffer={bid}")
