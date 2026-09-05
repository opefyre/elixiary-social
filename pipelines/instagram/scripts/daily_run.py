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
from datetime import date, datetime, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
# PIPE first, then state — so state/db.py still wins the `import db` below,
# while `slots` (which reads the posting calendar) resolves from the root.
sys.path.insert(0, PIPE)
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

# Two posts a day — 13:00 and 19:00 Europe/Lisbon — leaves 14 slots a week
# for six formats, which is too few for per-day counts with recipes as filler.
# The mix is a fixed weekly calendar instead. Mon=0 .. Sun=6.
#
#   recipe 7  ·  shortlist 4  ·  article 2  ·  homebar 1
#
# Marlow-generated recipes are no longer carousels: they are the reel series
# (reels/asked2.html), built from the same rows. Their three slots went to
# recipes, which now open on the cocktail photo.
#
# Home bar stays rare on purpose: there are only ~52 variants, and one a week
# stretches them over a year while still reading as a recurring anchor.
WEEK_PLAN = {
    0: ["recipe", "shortlist"],   # Mon
    1: ["recipe", "homebar"],     # Tue
    2: ["recipe", "article"],     # Wed
    3: ["recipe", "shortlist"],   # Thu
    4: ["recipe", "article"],     # Fri
    5: ["recipe", "shortlist"],   # Sat
    6: ["recipe", "shortlist"],   # Sun
}

FORMATS = ("recipe", "article", "homebar", "marlow", "shortlist")

# A run fills every free slot between now and the end of the horizon, rather
# than a fixed two. The schedule trigger does not backfill: when the spare Mac
# was down across one 09:00 window, that day created nothing, and because each
# run made exactly two posts the queue never recovered — it just ran a day
# shallower until it hit empty. Filling to a depth instead means the next run
# after any outage catches up on its own.
QUEUE_DAYS = int(os.environ.get("ELIXIARY_QUEUE_DAYS", "2"))    # today + tomorrow
MAX_PER_RUN = int(os.environ.get("ELIXIARY_MAX_PER_RUN", "6"))  # runaway guard


def plan_for(weekday):
    return list(WEEK_PLAN.get(weekday, []))


def kinds_for_slots(days=QUEUE_DAYS, cap=MAX_PER_RUN):
    """Formats for every free slot inside the horizon, keyed to the day each
    slot lands on.

    The queue deliberately runs ahead, so a Thursday run fills Friday's slots.
    Reading the calendar with today's weekday put Thursday's formats on Friday
    and shifted the whole week — and the size of the shift moved with how deep
    the queue happened to be. Each slot picks its own format instead: the 13:00
    Friday slot always gets Friday's 13:00 entry, whenever it was created.
    """
    import slots
    tz = slots._tz()
    horizon = (datetime.now(tz) + timedelta(days=days - 1)).replace(
        hour=23, minute=59, second=59, microsecond=0)
    out = []
    for utc in slots.next_free(cap):
        local = utc.astimezone(tz)
        if local > horizon:
            break
        plan = plan_for(local.weekday())
        if not plan:
            continue
        i = (slots.SLOT_HOURS.index(local.hour)
             if local.hour in slots.SLOT_HOURS else 0)
        out.append(plan[i] if i < len(plan) else plan[-1])
    return out


def next_series(conn, n=1):
    """Shortlist series, least recently used first.

    Four shortlist slots a week across five series means no series can own a
    fixed weekday any more, so the rotation is driven by what actually ran.
    A series never posted sorts first, so a newly added one leads.
    """
    import shortlist
    seen = {}
    for r in conn.execute(
            "SELECT source_id, MAX(id) mx FROM posts WHERE source_type='shortlist' "
            "GROUP BY source_id").fetchall():
        sid = (r["source_id"] or "").rsplit(":", 1)[0]
        seen[sid] = max(seen.get(sid, 0), r["mx"] or 0)
    order = sorted((s["id"] for s in shortlist.SERIES),
                   key=lambda sid: (seen.get(sid, -1), sid))
    return order[:n]


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
    ap.add_argument("--only", default=None,
                    help="comma-separated formats to run instead of today's "
                         "plan, e.g. --only recipe,marlow (ad-hoc posts)")
    ap.add_argument("--shortlists", default=None,
                    help="comma-separated series ids; omit to rotate by "
                         "least-recently-used")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    if a.only:
        kinds = [k.strip() for k in a.only.split(",") if k.strip()]
        bad = [k for k in kinds if k not in FORMATS]
        if bad:
            raise SystemExit(f"unknown format(s): {bad}; expected {FORMATS}")
    else:
        try:
            kinds = kinds_for_slots()
        except Exception as ex:
            # Buffer unreachable: fall back to today's row rather than skipping
            # the run entirely. Wrong day, but a post beats no post.
            kinds = plan_for(date.today().weekday())
            print(f"  [plan ] slot lookup failed ({str(ex)[:70]}) — "
                  f"using today's row")

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

    # Series are chosen once, up front: picking inside the loop would hand
    # two shortlists in the same run the same least-recently-used series.
    forced = ([x.strip() for x in a.shortlists.split(",") if x.strip()]
              if a.shortlists else None)
    wanted = kinds.count("shortlist")
    series = (forced or next_series(conn, wanted)) if wanted else []

    print(f"  [plan ] {', '.join(kinds) or 'nothing'}"
          + (f"  (series: {', '.join(series)})" if series else ""))

    results = []
    queue = list(series)
    for kind in kinds:
        extra = None
        if kind == "shortlist" and queue:
            extra = ["--series", queue.pop(0)]
        results.append(run_one(kind, a.dry_run, extra=extra))

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
        "requested": len(kinds),
        "plan": kinds,
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
                              ("requested", "plan", "succeeded", "failed",
                               "drafts", "mirrored", "broken_images")}))

    print(json.dumps(summary))
    # non-zero only if nothing at all worked, so a single miss doesn't page anyone
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
