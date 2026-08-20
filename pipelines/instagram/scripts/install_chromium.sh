#!/usr/bin/env bash
# Install a contained Chromium for the renderer.
#
# Nothing is installed system-wide: the browser lives in render/.chromium/
# and is removed by deleting that directory.
#
# We fetch the Chrome-for-Testing archive directly rather than using
# `puppeteer browsers install`, because puppeteer's extractor silently
# produces a broken tree on macOS 26 — it writes the launcher but not the
# framework, so the binary exists and fails at dlopen.
set -euo pipefail

VERSION="${CHROMIUM_VERSION:-148.0.7778.97}"
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/render/.chromium"

case "$(uname -s)-$(uname -m)" in
  Darwin-arm64) PLATFORM=mac-arm64 ;;
  Darwin-x86_64) PLATFORM=mac-x64 ;;
  Linux-x86_64) PLATFORM=linux64 ;;
  *) echo "unsupported platform: $(uname -s)-$(uname -m)" >&2; exit 1 ;;
esac

BIN="$DEST/chrome-headless-shell-$PLATFORM/chrome-headless-shell"
if [ -x "$BIN" ]; then
  echo "already installed: $BIN"
  exit 0
fi

URL="https://storage.googleapis.com/chrome-for-testing-public/$VERSION/$PLATFORM/chrome-headless-shell-$PLATFORM.zip"
echo "fetching chrome-headless-shell $VERSION ($PLATFORM)"
rm -rf "$DEST" && mkdir -p "$DEST"
curl -fsSL -o "$DEST/shell.zip" "$URL"

# ditto preserves bundle structure and permissions; unzip mangles some of it
if command -v ditto >/dev/null 2>&1; then
  ditto -x -k "$DEST/shell.zip" "$DEST"
else
  unzip -q "$DEST/shell.zip" -d "$DEST"
fi
rm -f "$DEST/shell.zip"
chmod +x "$BIN"

"$BIN" --version >/dev/null 2>&1 || {
  echo "installed binary will not run — extraction likely incomplete" >&2; exit 1; }
echo "installed: $BIN"
du -sh "$DEST" | awk '{print "size:", $1}'
