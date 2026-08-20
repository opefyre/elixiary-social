#!/usr/bin/env python3
"""
One day's batch: 2 recipe carousels + 1 article carousel, all as Buffer drafts.

Run once a day. Every item is independent — one failure does not stop the
others, and the exit code reflects whether anything at all succeeded, so the
orchestrator can alert on a total outage without crying over a single miss.

Prints a JSON summary on the last line for n8n to parse.

    python3 scripts/daily_run.py
    python3 scripts/daily_run.py --dry-run
    python3 scripts/daily_run.py --recipes 2 --articles 1
"""

import argparse
import json
import os
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
sys.path.insert(0, os.path.join(PIPE, "state"))
import db  # noqa: E402

# A stray copy of db.py anywhere earlier on sys.path would silently resolve to
# a different, empty tracking database — the pool would look untouched and
# already-posted items would be served again. Fail loudly instead.
_expected = os.path.join(PIPE, "state", "db.py")
if os.path.abspath(db.__file__) != os.path.abspath(_expected):
    raise SystemExit(
        f"wrong db module: imported {db.__file__}, expected {_expected}. "
        f"Remove the stray copy before running.")



PUBLISH = os.path.join(HERE, "publish.py")


def run_one(kind, dry):
    cmd = [sys.executable, PUBLISH, "--type", kind]
    if dry:
        cmd.append("--dry-run")
    t0 = time.time()
    p = subprocess.run(cmd, capture_output=True, text=True)
    out = (p.stdout or "") + (p.stderr or "")
    buffer_id = None
    for line in out.splitlines():
        if "buffer_post_id=" in line:
            buffer_id = line.split("buffer_post_id=")[1].split()[0]
    detail = ""
    for line in out.splitlines():
        if line.startswith("picked") or line.startswith("FAILED"):
            detail = line.strip()[:180]
    return {
        "type": kind,
        "ok": p.returncode == 0,
        "buffer_post_id": buffer_id,
        "seconds": round(time.time() - t0, 1),
        "detail": detail,
        "error": None if p.returncode == 0 else out.strip()[-400:],
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--recipes", type=int, default=2)
    ap.add_argument("--articles", type=int, default=1)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    conn = db.connect()
    run_id = db.start_run(conn, "daily")

    # Reconcile with Buffer first: a post you approved, published or deleted
    # since the last run should be reflected before anything new is picked.
    try:
        import sync_status
        checked, changed = sync_status.sync(conn, quiet=True)
        print(f"  [sync ] reconciled {checked} tracked posts, {changed} updated")
    except Exception as ex:
        print(f"  [sync ] skipped: {str(ex)[:120]}")

    results = []

    for _ in range(a.recipes):
        results.append(run_one("recipe", a.dry_run))
    for _ in range(a.articles):
        results.append(run_one("article", a.dry_run))

    ok = sum(1 for r in results if r["ok"])
    summary = {
        "requested": a.recipes + a.articles,
        "succeeded": ok,
        "failed": len(results) - ok,
        "dry_run": a.dry_run,
        "drafts": [r["buffer_post_id"] for r in results if r["buffer_post_id"]],
        "results": results,
    }

    for r in results:
        mark = "ok  " if r["ok"] else "FAIL"
        print(f"  [{mark}] {r['type']:7} {r['seconds']:>5}s  {r['detail']}")
        if r["error"]:
            print(f"         {r['error'].splitlines()[-1][:200]}")

    db.finish_run(conn, run_id, ok > 0,
                  json.dumps({k: summary[k] for k in
                              ("requested", "succeeded", "failed", "drafts")}))

    print(json.dumps(summary))
    # non-zero only if nothing at all worked, so a single miss doesn't page anyone
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
