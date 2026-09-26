#!/usr/bin/env python3
"""when_buffer_resets.py id|title|cover_ms ... — wait out Buffer's daily rate limit, then draft each skit (publish_skit.py)
and dry-run the sync. Meant to run under nohup on the spare Mac:  nohup python3 skits/when_buffer_resets.py ... > skits/pending.log &
A 429 from Buffer carries Retry-After; this sleeps that long (+60 s) and checks again, so it never spends requests while blocked."""
import os, subprocess, sys, time, urllib.error
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
sys.path.insert(0, ROOT)
import slots  # noqa: E402

def log(*a): print(time.strftime("%H:%M:%S"), *a, flush=True)

while True:
    try:
        slots._gql("{ __typename }", {}); break
    except urllib.error.HTTPError as e:
        if e.code != 429: raise
        wait = int(e.headers.get("Retry-After") or 600) + 60
        log(f"rate limited, sleeping {wait}s"); time.sleep(wait)
log("Buffer API available")
for arg in sys.argv[1:]:
    sid, title, cover = arg.split("|")
    r = subprocess.run([sys.executable, os.path.join(HERE, "publish_skit.py"), sid, title, cover], capture_output=True, text=True, cwd=ROOT)
    log(sid, (r.stdout.strip().splitlines() or [""])[-1] if r.returncode == 0 else "FAILED: " + (r.stderr.strip().splitlines() or ["?"])[-1])
    time.sleep(5)
r = subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "sync_status.py"), "--dry-run"], capture_output=True, text=True, cwd=ROOT)
log("sync dry-run:", " | ".join((r.stdout + r.stderr).strip().splitlines()[-4:]))
log("done")
