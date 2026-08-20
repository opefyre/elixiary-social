#!/usr/bin/env python3
"""
Posting slots.

Five fixed times a day, local to the channel's timezone:
    11:00, 13:00, 15:00, 17:00, 19:00  (Europe/Lisbon)

Times are stored in Buffer as UTC. Lisbon runs UTC+1 in summer, so an 11 AM
local slot appears as 10:00Z — the offset is computed, never hardcoded, so
this stays correct across the October DST change.

A new post takes the earliest slot that is not already occupied by a
scheduled or draft post on the channel.
"""

import json
import os
import sys
import urllib.request
from datetime import datetime, timedelta, timezone

try:
    from zoneinfo import ZoneInfo
except ImportError:                      # pragma: no cover
    ZoneInfo = None

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import credentials  # noqa: E402

SLOT_HOURS = [int(h) for h in
              os.environ.get("ELIXIARY_SLOT_HOURS", "11,13,15,17,19").split(",")]
TZ_NAME = os.environ.get("ELIXIARY_TZ", "Europe/Lisbon")
ORG = "6a259ca246478440c6253929"
CHANNEL = "6a855825ccaf649a67d4db86"        # elixiary.ai
LOOKAHEAD_DAYS = 30
# Posts are drafts pending approval, so never claim a slot that is about to
# arrive — there has to be room to review it first.
MIN_LEAD_HOURS = float(os.environ.get("ELIXIARY_MIN_LEAD_HOURS", "4"))


def _tz():
    return ZoneInfo(TZ_NAME) if ZoneInfo else timezone.utc


def _gql(query, variables):
    body = json.dumps({"query": query, "variables": variables}).encode()
    req = urllib.request.Request(
        "https://api.buffer.com", data=body, method="POST",
        headers={"Authorization": f"Bearer {credentials.get('buffer')}",
                 "Content-Type": "application/json"})
    out = json.loads(urllib.request.urlopen(req, timeout=60).read())
    if out.get("errors"):
        raise RuntimeError(f"Buffer: {json.dumps(out['errors'])[:250]}")
    return out["data"]


def occupied():
    """UTC datetimes already spoken for on the channel. Drafts count — one may
    carry a time and would collide once approved.

    Paginated deliberately: the API returns 10 posts a page, and `first`/`after`
    are arguments on the query itself, not fields of PostsInput. Reading only
    the first page silently under-reports what is taken and double-books slots.
    """
    q = ("query P($i: PostsInput!, $first: Int, $after: String){ "
         "posts(input:$i, first:$first, after:$after){ "
         "edges { node { id status dueAt } } "
         "pageInfo { hasNextPage endCursor } } }")
    base = {"organizationId": ORG,
            "filter": {"channelIds": [CHANNEL],
                       "status": ["scheduled", "draft", "needs_approval",
                                  "sending"]}}
    taken, after, pages = set(), None, 0
    while pages < 50:                       # backstop against a cursor loop
        data = _gql(q, {"i": base, "first": 100, "after": after})
        node = data["posts"]
        for e in node.get("edges") or []:
            due = (e.get("node") or {}).get("dueAt")
            if due:
                taken.add(datetime.fromisoformat(due.replace("Z", "+00:00"))
                          .astimezone(timezone.utc)
                          .replace(second=0, microsecond=0))
        info = node.get("pageInfo") or {}
        if not info.get("hasNextPage"):
            break
        after = info.get("endCursor")
        if not after:
            break
        pages += 1
    return taken


def candidates(after=None, days=LOOKAHEAD_DAYS):
    """Every slot at least MIN_LEAD_HOURS away, as UTC datetimes, in order."""
    tz = _tz()
    start = (after or datetime.now(timezone.utc)).astimezone(timezone.utc)
    earliest = start + timedelta(hours=MIN_LEAD_HOURS)
    local_now = start.astimezone(tz)
    for d in range(days):
        day = (local_now + timedelta(days=d)).date()
        for h in SLOT_HOURS:
            local = datetime(day.year, day.month, day.day, h, 0, tzinfo=tz)
            utc = local.astimezone(timezone.utc).replace(second=0, microsecond=0)
            if utc >= earliest:
                yield utc


def next_free(count=1, taken=None):
    """The next `count` unoccupied slots, as UTC datetimes."""
    taken = set(taken) if taken is not None else occupied()
    out = []
    for utc in candidates():
        if utc in taken:
            continue
        out.append(utc)
        taken.add(utc)
        if len(out) == count:
            break
    return out


def to_buffer(dt):
    return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:00.000Z")


def local_str(dt):
    return dt.astimezone(_tz()).strftime("%a %d %b, %-I %p")


if __name__ == "__main__":
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 5
    taken = occupied()
    print(f"slots: {SLOT_HOURS} {TZ_NAME} (min lead {MIN_LEAD_HOURS}h)")
    print(f"occupied ({len(taken)}):")
    for t in sorted(taken):
        print(f"   {local_str(t):24} {to_buffer(t)}")
    print(f"next {n} free:")
    for t in next_free(n, taken):
        print(f"   {local_str(t):24} {to_buffer(t)}")
