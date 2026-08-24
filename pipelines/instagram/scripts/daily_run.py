#!/usr/bin/env python3
"""
One day's batch: recipe, article, Marlow and home-bar carousels, as drafts.

Run once a day. Every item is independent — one failure does not stop the
others, and the exit code reflects whether anything at all succeeded, so the
orchestrator can alert on a total outage without crying over a single miss.

Prints a JSON summary on the last line for n8n to parse.

    python3 scripts/daily_run.py
    python3 scripts/daily_run.py --dry-run
    python3 scripts/daily_run.py --recipes 3 --articles 1 --marlow 1
"""

import argparse
import json
import os
import subprocess
import sys
import time
from datetime import date

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

# The home-bar format has only ~52 variants, so daily would exhaust it in
# seven weeks. Twice a week gives it half a year, and it works better as a
# recurring anchor than as filler. Mon=0 .. Sun=6.
HOMEBAR_WEEKDAYS = {int(x) for x in
                    os.environ.get("ELIXIARY_HOMEBAR_DAYS", "1,5").split(",")}
SLOTS_PER_DAY = int(os.environ.get("ELIXIARY_SLOTS_PER_DAY", "5"))

# Each shortlist series runs twice a week, spread so no day carries more than
# two. Mon=0 .. Sun=6.
SHORTLIST_WEEKDAYS = {
    "rule-of-three":    {0, 3},
    "two-minutes-flat": {1, 4},
    "light-work":       {2, 5},
    "no-proof-needed":  {3, 6},
    "full-proof":       {0, 4},
}


def shortlists_for(weekday):
    return [sid for sid, days in SHORTLIST_WEEKDAYS.items() if weekday in days]


def run_one(kind, dry, extra=None):
    cmd = [sys.executable, PUBLISH, "--type", kind] + list(extra or [])
    if dry:
        cmd.append("--dry-run")
    t0 = time.time()
    p = subprocess.run(cmd, capture_output=True, text=True)
    out = (p.stdout or "") + (p.stderr or "")
    # Two lines now carry a buffer_post_id — the Instagram draft and its
    # TikTok mirror. Anchor on the prefix rather than the last match, so
    # reordering the output can never swap which id gets reported.
    def _id(prefix):
        for line in out.splitlines():
            if line.startswith(prefix) and "buffer_post_id=" in line:
                return line.split("buffer_post_id=")[1].split()[0]
        return None

    buffer_id = _id("DRAFT CREATED")
    mirror_id = _id("tiktok  mirrored")
    detail = ""
    for line in out.splitlines():
        if line.startswith("picked") or line.startswith("FAILED"):
            detail = line.strip()[:180]
    return {
        "type": kind,
        "ok": p.returncode == 0,
        "buffer_post_id": buffer_id,
        "tiktok_post_id": mirror_id,
        "seconds": round(time.time() - t0, 1),
        "detail": detail,
        "error": None if p.returncode == 0 else out.strip()[-400:],
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--recipes", type=int, default=3)
    ap.add_argument("--articles", type=int, default=1)
    ap.add_argument("--homebar", type=int, default=-1,
                    help="-1 = decide from the weekday schedule")
    ap.add_argument("--marlow", type=int, default=1)
    ap.add_argument("--shortlists", default=None,
                    help="comma-separated series ids; omit to use the weekday map")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    # Home bar runs on its scheduled weekdays; on other days the slot goes
    # back to recipes so the day still fills all five.
    weekday = date.today().weekday()
    if a.shortlists is None:
        series = shortlists_for(weekday)
    else:
        series = [x for x in a.shortlists.split(",") if x.strip()]

    if a.homebar < 0:
        a.homebar = 1 if weekday in HOMEBAR_WEEKDAYS else 0
        a.recipes = max(0, SLOTS_PER_DAY - a.articles - a.homebar
                        - a.marlow - len(series))

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
    for _ in range(a.marlow):
        results.append(run_one("marlow", a.dry_run))
    for sid in series:
        results.append(run_one("shortlist", a.dry_run, extra=["--series", sid]))
    for _ in range(a.homebar):
        results.append(run_one("homebar", a.dry_run))

    # Buffer fetches media at publish time, so a slide that vanishes between
    # now and then fails silently. Check every queued post, not just today's.
    broken = []
    try:
        import verify_images
        checked, broken = verify_images.verify(conn, quiet=True)
        if broken:
            print(f"  [images] {len(broken)} of {checked} queued posts have "
                  f"missing slides:")
            for b in broken:
                print(f"           post {b.get('id')} ({b.get('type')}, "
                      f"{b.get('status')}) {b.get('missing')}/{b.get('of')} "
                      f"gone — {b.get('buffer_post_id')}")
        else:
            print(f"  [images] {checked} queued posts, all slides reachable")
    except Exception as ex:
        print(f"  [images] check failed: {str(ex)[:140]}")

    ok = sum(1 for r in results if r["ok"])
    summary = {
        "requested": (a.recipes + a.articles + a.homebar + a.marlow
                      + len(series)),
        "succeeded": ok,
        "failed": len(results) - ok,
        "dry_run": a.dry_run,
        "drafts": [r["buffer_post_id"] for r in results if r["buffer_post_id"]],
        "mirrored": sum(1 for r in results if r.get("tiktok_post_id")),
        "broken_images": broken,
        "results": results,
    }

    for r in results:
        mark = "ok  " if r["ok"] else "FAIL"
        print(f"  [{mark}] {r['type']:7} {r['seconds']:>5}s  {r['detail']}")
        if r["error"]:
            print(f"         {r['error'].splitlines()[-1][:200]}")

    db.finish_run(conn, run_id, ok > 0,
                  json.dumps({k: summary[k] for k in
                              ("requested", "succeeded", "failed", "drafts",
                               "mirrored", "broken_images")}))

    print(json.dumps(summary))
    # non-zero only if nothing at all worked, so a single miss doesn't page anyone
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
