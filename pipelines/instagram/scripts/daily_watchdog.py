#!/usr/bin/env python3
"""
Second heartbeat for the daily run.

n8n fires the 09:00 batch, but n8n can be unloaded — it was, on 10 Sep, and
the next morning produced nothing. This runs from launchd on the pipeline's
own agent and asks the local service to run the batch, but only if no daily
run has been recorded today. n8n and this can both fire; the second one sees
today's row and does nothing, so nothing is ever posted twice.
"""
import json, os, sys, urllib.request
from datetime import datetime
from zoneinfo import ZoneInfo

HERE = os.path.dirname(os.path.abspath(__file__)); PIPE = os.path.abspath(os.path.join(HERE, ".."))
sys.path.insert(0, os.path.join(PIPE, "state"))
import db  # noqa: E402

TZ = ZoneInfo(os.environ.get("ELIXIARY_TZ", "Europe/Lisbon"))


def ran_today(conn):
    today = datetime.now(TZ).date().isoformat()
    for r in conn.execute("SELECT started_at, ok FROM runs WHERE kind='daily' ORDER BY id DESC LIMIT 6"):
        local = datetime.fromisoformat(r["started_at"]).astimezone(TZ)
        if local.date().isoformat() == today and r["ok"]:
            return local.strftime("%H:%M")
    return None


def main():
    conn = db.connect()
    when = ran_today(conn)
    if when:
        print(f"watchdog: daily run already succeeded today at {when}; nothing to do"); return
    print("watchdog: no successful daily run today — triggering")
    req = urllib.request.Request("http://127.0.0.1:8787/run", data=b'{"dry_run": false}',
                                 headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=1500) as r:
        d = json.loads(r.read()); s = d.get("summary") or d
        print(f"watchdog: plan={s.get('plan')} succeeded={s.get('succeeded')}/{s.get('requested')}")


if __name__ == "__main__":
    main()
