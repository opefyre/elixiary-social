#!/usr/bin/env python3
"""
Remove orphaned slide uploads from R2.

Buffer needs public image URLs *before* the post exists, so a run that fails
after uploading but before the draft is created strands its slides. This
reclaims them.

Deliberately narrow:
  * only ever looks under `social/<post_id>/`
  * post ids come from our own local DB, never from listing the bucket, so it
    cannot touch anything the pipeline didn't create
  * anything belonging to a drafted or published post is protected
  * dry-run by default; deletes only with --apply

    python3 sweep_orphans.py            # report
    python3 sweep_orphans.py --apply    # actually delete
"""

import argparse
import os
import subprocess
import sys
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
REPO = os.path.abspath(os.path.join(PIPE, "..", ".."))
sys.path.insert(0, os.path.join(PIPE, "state"))
sys.path.insert(0, PIPE)
import db  # noqa: E402
import r2  # noqa: E402

PREFIX = "social"
MAX_SLIDES_PROBE = 15
# `scheduled` means a human approved it and it is waiting on its slot — its
# slides must survive. Leaving it out of this list would have deleted the
# images out from under approved posts.
PROTECTED = ("drafted", "scheduled", "published")


def exists(key):
    return r2.exists(key)


def delete(key):
    if not key.startswith(PREFIX + "/"):
        raise RuntimeError(f"refusing to delete outside {PREFIX}/: {key}")
    r2.delete(key)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="actually delete")
    a = ap.parse_args()

    conn = db.connect()
    protected, known, prefixes = set(), set(), {}
    for r in conn.execute("SELECT id, status, meta FROM posts").fetchall():
        known.add(r["id"])
        if r["status"] in PROTECTED:
            protected.add(r["id"])
        try:
            tok = (json.loads(r["meta"] or "{}") or {}).get("slide_token")
        except Exception:
            tok = None
        if tok:
            prefixes[r["id"]] = f"{PREFIX}/{r['id']}-{tok}"

    # autoincrement high-water mark still knows ids whose rows were deleted
    seq = conn.execute(
        "SELECT seq FROM sqlite_sequence WHERE name='posts'").fetchone()
    high = seq["seq"] if seq else max(known or [0])
    if not high:
        print("no posts recorded yet — nothing to sweep")
        return

    print(f"scanning {PREFIX}/1..{high}  (protected: "
          f"{sorted(protected) if protected else 'none'})")

    orphans = []
    for pid in range(1, high + 1):
        if pid in protected:
            continue
        # tokenised prefix when we have one, legacy social/<id> otherwise
        base = prefixes.get(pid, f"{PREFIX}/{pid}")
        if not exists(f"{base}/slide-01.png"):
            continue
        keys = [f"{base}/slide-{i:02d}.png"
                for i in range(1, MAX_SLIDES_PROBE + 1)]
        present = [k for k in keys if exists(k)]
        status = next((r["status"] for r in conn.execute(
            "SELECT status FROM posts WHERE id=?", (pid,)).fetchall()), "no db row")
        orphans.append((pid, status, present))

    if not orphans:
        print("no orphans found")
        return

    total = sum(len(p) for _, _, p in orphans)
    for pid, status, present in orphans:
        print(f"  {prefixes.get(pid, PREFIX + '/' + str(pid))}/  "
              f"{len(present)} slides  ({status})")

    if not a.apply:
        print(f"\n{len(orphans)} orphaned sets, {total} objects. "
              f"Re-run with --apply to delete.")
        return

    deleted = 0
    for pid, _, present in orphans:
        for k in present:
            delete(k)
            deleted += 1
        print(f"  deleted {PREFIX}/{pid}/ ({len(present)} objects)")
    print(f"\ndeleted {deleted} objects across {len(orphans)} sets")


if __name__ == "__main__":
    main()
