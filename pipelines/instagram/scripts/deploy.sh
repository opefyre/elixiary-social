#!/usr/bin/env bash
# Push the pipeline to the spare Mac.
#
# Run from the laptop. --delete keeps the remote a clean mirror, which is what
# caught a stray db.py once — but the remote also holds things the repo does
# not: the vendored psycopg2, the contained Chromium, the tracking database.
# Every one of those must be excluded here or --delete removes it and the
# nightly run breaks silently the next morning.
set -euo pipefail

HOST="${ELIXIARY_HOST:-abolfazlshirkavand@100.119.76.96}"
KEY="${ELIXIARY_SSH_KEY:-$HOME/.ssh/finkavo_spare_ed25519}"
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/"
DEST="$HOST:~/.local/elixiary-social/"

# Remote-only state. Not optional.
KEEP=(
  'vendor'            # psycopg2, installed --target on the server
  'render/.chromium'  # contained headless Chrome
  'render/.imgcache'
  'state/*.db*'       # the tracking database
  '.wrangler'
  'service.log' 'service.err'
  '__pycache__' '*.pyc'
)

args=(-az --delete --itemize-changes)
for k in "${KEEP[@]}"; do args+=(--exclude "$k"); done

echo "deploying $SRC -> $DEST"
rsync "${args[@]}" -e "ssh -o BatchMode=yes -i $KEY" "$SRC" "$DEST"

# A deploy that leaves the server unable to reach Supabase or render is worse
# than no deploy, so prove both before calling it done.
ssh -o BatchMode=yes -i "$KEY" "$HOST" 'cd ~/.local/elixiary-social && \
  /usr/bin/python3 -c "
import pg, os, sys
sys.path.insert(0, \"render\")
import render
assert pg.rows(\"SELECT to_jsonb(t) FROM (SELECT 1 n) t;\")[0][\"n\"] == 1
print(\"  supabase ok (%s)\" % (\"psycopg2\" if pg.HAVE_PSYCOPG else \"psql\"))
print(\"  chrome   ok (%s)\" % render.find_chrome())
assert os.path.isdir(\"vendor\"), \"vendor/ missing\"
"'
echo "deploy verified"
