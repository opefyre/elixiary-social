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
import db  # noqa: E402

BUCKET = "elixiary-images"
PREFIX = "social"
PUBLIC_BASE = "https://pub-dfe281321d524908ae12d89d86e1a8f6.r2.dev"
MAX_SLIDES_PROBE = 15
PROTECTED = ("drafted", "published")


def wrangler_bin():
    p = os.path.join(REPO, ".tools", "node_modules", ".bin", "wrangler")
    return [p] if os.path.exists(p) else ["npx", "--yes", "wrangler@4"]


def exists(key):
    req = urllib.request.Request(f"{PUBLIC_BASE}/{key}", method="HEAD",
                                 headers={"User-Agent": "elixiary-sweep/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status == 200
    except urllib.error.HTTPError as e:
        if e.code == 403:
            raise RuntimeError("R2 returned 403 — aborting rather than guessing "
                               "at what exists")
        return False
    except Exception:
        return False


def delete(key):
    if not key.startswith(PREFIX + "/"):
        raise RuntimeError(f"refusing to delete outside {PREFIX}/: {key}")
    r = subprocess.run(
        wrangler_bin() + ["r2", "object", "delete", f"{BUCKET}/{key}", "--remote"],
        capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError((r.stderr or r.stdout).strip()[:200])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="actually delete")
    a = ap.parse_args()

    conn = db.connect()
    protected, known = set(), set()
    for r in conn.execute("SELECT id, status FROM posts").fetchall():
        known.add(r["id"])
        if r["status"] in PROTECTED:
            protected.add(r["id"])

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
        if not exists(f"{PREFIX}/{pid}/slide-01.png"):
            continue
        keys = [f"{PREFIX}/{pid}/slide-{i:02d}.png"
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
        print(f"  {PREFIX}/{pid}/  {len(present)} slides  ({status})")

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
