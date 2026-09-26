#!/usr/bin/env python3
"""
Reconcile the local tracking DB with Buffer.

The DB records a post as `drafted` the moment it is created and never hears
what happened next. This pulls the real state back so the log reflects what
actually went out.

Buffer status      -> local status
  draft            -> drafted     (awaiting your review)
  needs_approval   -> drafted
  scheduled        -> scheduled   (approved, waiting on its slot)
  sending          -> scheduled
  sent             -> published
  error            -> failed
  (missing)        -> rejected  (deleted in Buffer by a human)

A post deleted in Buffer is recorded as `rejected`, not removed: the item
stays out of the pool, because a human declining it is a signal, not a gap.

    python3 scripts/sync_status.py
    python3 scripts/sync_status.py --dry-run
"""

import argparse
import json
import os
import sys
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
sys.path.insert(0, PIPE)
sys.path.insert(0, os.path.join(PIPE, "state"))
import credentials  # noqa: E402
import db  # noqa: E402

MAP = {
    "draft": "drafted",
    "needs_approval": "drafted",
    "scheduled": "scheduled",
    "sending": "scheduled",
    "sent": "published",
    "error": "failed",
}
TERMINAL = ("published", "rejected")


def gql(query, variables):
    body = json.dumps({"query": query, "variables": variables}).encode()
    req = urllib.request.Request(
        "https://api.buffer.com", data=body, method="POST",
        headers={"Authorization": f"Bearer {credentials.get('buffer')}",
                 "Content-Type": "application/json"})
    out = json.loads(urllib.request.urlopen(req, timeout=60).read())
    return out


NOT_FOUND = ("not found", "does not exist", "no post")
BATCH = 25   # posts per request; the daily API budget is 250 requests for the whole account


def fetch_many(post_ids):
    """Look up many posts in as few requests as possible (GraphQL aliases).

    Returns {post_id: node | None | Exception}: node for a live post, None when
    Buffer says it no longer exists, an Exception when the lookup itself failed
    (that post is skipped this run, never marked rejected on a guess).
    """
    out = {}
    ids = list(dict.fromkeys(i for i in post_ids if i))
    for n in range(0, len(ids), BATCH):
        chunk = ids[n:n + BATCH]
        q = "query {" + " ".join(
            f'p{k}: post(input:{{id:{json.dumps(pid)}}}) {{ id status dueAt }}'
            for k, pid in enumerate(chunk)) + " }"
        try:
            res = gql(q, {})
        except Exception as ex:                       # network / 429: the whole chunk is unknown
            for pid in chunk:
                out[pid] = ex
            continue
        data = res.get("data") or {}
        errs = {}
        for e in res.get("errors") or []:
            path = (e.get("path") or [None])[0]
            if isinstance(path, str) and path.startswith("p"):
                errs[path] = e
        for k, pid in enumerate(chunk):
            node = data.get(f"p{k}")
            if node:
                out[pid] = node
                continue
            e = errs.get(f"p{k}")
            if e is None and not res.get("errors"):
                out[pid] = None                      # null with no error: gone
            elif e is not None and any(w in json.dumps(e).lower() for w in NOT_FOUND):
                out[pid] = None
            else:
                out[pid] = RuntimeError(json.dumps(e or res.get("errors"))[:220])
    return out


def fetch(post_id):
    """Single lookup (kept for callers that need one post)."""
    r = fetch_many([post_id])[post_id]
    if isinstance(r, Exception):
        raise r
    return r


def sync(conn=None, dry=False, quiet=False):
    """Reconcile and return (checked, changed). Safe to call before a run."""
    conn = conn or db.connect()
    rows = conn.execute(
        "SELECT id, source_type, source_id, status, buffer_post_id, meta "
        "FROM posts WHERE buffer_post_id IS NOT NULL "
        "AND status NOT IN ('published','rejected') ORDER BY id").fetchall()

    if not rows:
        if not quiet:
            print("nothing to reconcile")
        return 0, 0

    mirrors = db.open_crossposts(conn)
    found = fetch_many([r["buffer_post_id"] for r in rows] + [m["buffer_post_id"] for m in mirrors])

    changed = 0
    for r in rows:
        node = found.get(r["buffer_post_id"])
        if isinstance(node, Exception):
            if not quiet:
                print(f"  {r['id']:>3} lookup failed: {str(node)[:90]}")
            continue

        if node is None:
            new, note = "rejected", "deleted in Buffer"
        else:
            new = MAP.get(node["status"], "drafted")
            note = f"buffer={node['status']}" + (
                f" due={node['dueAt'][:16]}" if node.get("dueAt") else "")

        if new == r["status"]:
            continue
        if not quiet:
            print(f"  {r['id']:>3} {r['source_type']:7} {r['status']:9} -> "
                  f"{new:9} ({note})")
        changed += 1
        if not dry:
            fields = {"status": new}
            if node and node.get("dueAt"):
                meta = json.loads(r["meta"] or "{}")
                meta["due_at"] = node["dueAt"]
                fields["meta"] = meta
            db.update(conn, r["id"], **fields)

    # Mirrors are separate Buffer posts with their own approval, so a TikTok
    # draft can be scheduled or deleted independently of its Instagram twin.
    for m in mirrors:
        node = found.get(m["buffer_post_id"])
        if isinstance(node, Exception):
            if not quiet:
                print(f"  {m['post_id']:>3} {m['service']} lookup failed: "
                      f"{str(node)[:80]}")
            continue
        new = "rejected" if node is None else MAP.get(node["status"], "drafted")
        if new == m["status"]:
            continue
        if not quiet:
            print(f"  {m['post_id']:>3} {m['service']:7} {m['status']:9} -> "
                  f"{new:9} ({'deleted in Buffer' if node is None else 'buffer=' + node['status']})")
        changed += 1
        if not dry:
            db.update_crosspost(conn, m["id"], status=new)

    if not quiet:
        verb = "would change" if dry else "changed"
        print(f"\nchecked {len(rows)} posts + {len(mirrors)} mirrors, "
              f"{verb} {changed}")
        print("counts:", db.counts(conn))
    return len(rows) + len(mirrors), changed


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    sync(dry=a.dry_run)


if __name__ == "__main__":
    main()
