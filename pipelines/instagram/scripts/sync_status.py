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


def fetch(post_id):
    """Returns the Buffer status, or None if the post no longer exists."""
    q = "query P($i: PostInput!){ post(input:$i){ id status dueAt } }"
    out = gql(q, {"i": {"id": post_id}})
    if out.get("errors"):
        msg = json.dumps(out["errors"]).lower()
        if "not found" in msg or "does not exist" in msg or "no post" in msg:
            return None
        raise RuntimeError(json.dumps(out["errors"])[:220])
    node = (out.get("data") or {}).get("post")
    return node or None


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

    changed = 0
    for r in rows:
        try:
            node = fetch(r["buffer_post_id"])
        except Exception as ex:
            if not quiet:
                print(f"  {r['id']:>3} lookup failed: {str(ex)[:90]}")
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

    if not quiet:
        verb = "would change" if dry else "changed"
        print(f"\nchecked {len(rows)}, {verb} {changed}")
        print("counts:", db.counts(conn))
    return len(rows), changed


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    sync(dry=a.dry_run)


if __name__ == "__main__":
    main()
