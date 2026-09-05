#!/usr/bin/env python3
"""
spec -> timeline.html -> frames -> mp4

    python3 build.py spec.json --tiles ./tiles --out reel.mp4 [--guides] [--preview]

--preview renders 6 frames per second instead of 30, for a fast look at the
motion before committing to a full capture.
"""
import argparse, json, os, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
REPO = os.path.abspath(os.path.join(PIPE, "..", ".."))
sys.path.insert(0, os.path.join(PIPE, "render"))
from render import data_uri, find_chrome  # noqa: E402

FPS, DUR = 30, 15.0
# laptop: <repo>/.tools; spare Mac: <deploy dir>/.tools (outside the rsync'd tree
# is not an option there, so deploy.sh keeps it)
NODE_MODULES = next((p for p in (os.path.join(PIPE, ".tools", "node_modules"),
                                 os.path.join(REPO, ".tools", "node_modules"))
                     if os.path.isdir(os.path.join(p, "puppeteer-core"))), None)
ASSETS = os.path.join(HERE, "assets")


def write_html(spec, tiles_dir, workdir):
    tpl = open(os.path.join(HERE, "timeline.html")).read()
    assets = os.path.join(workdir, "assets"); os.makedirs(assets, exist_ok=True)
    marlow = {}
    for k in ("skeptical", "cheers", "happy", "thinking", "mixing", "neutral"):
        shutil.copy(os.path.join(ASSETS, f"expr-{k}-256.png"), os.path.join(assets, f"{k}.png"))
        marlow[k] = f"assets/{k}.png"
    shutil.copy(os.path.join(ASSETS, "logo.png"), os.path.join(assets, "logo.png"))
    fonts = os.path.join(PIPE, "render", "fonts")
    html = (tpl.replace("__PJS__", data_uri(os.path.join(fonts, "PlusJakartaSans-latin.woff2")))
               .replace("__INTER__", data_uri(os.path.join(fonts, "Inter-latin.woff2")))
               .replace("__LOGO__", "assets/logo.png")
               .replace("__SPEC__", json.dumps(spec))
               .replace("__MARLOW__", json.dumps(marlow))
               .replace("__TILES__", os.path.relpath(tiles_dir, workdir)))
    p = os.path.join(workdir, "reel.html"); open(p, "w").write(html); return p


def encode(frames, out, fps):
    subprocess.run(["ffmpeg", "-y", "-framerate", str(fps),
        "-i", os.path.join(frames, "f%05d.png"),
        "-f", "lavfi", "-t", str(DUR), "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
        "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-r", "30",
        "-crf", "17", "-preset", "slow", "-c:a", "aac", "-b:a", "128k", "-shortest",
        "-movflags", "+faststart", out], check=True, capture_output=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec"); ap.add_argument("--tiles", required=True)
    ap.add_argument("--out", default="reel.mp4"); ap.add_argument("--work", default=None)
    ap.add_argument("--guides", action="store_true"); ap.add_argument("--preview", action="store_true")
    a = ap.parse_args()
    spec = json.load(open(a.spec))
    work = a.work or tempfile.mkdtemp(prefix="reel-")
    html = write_html(spec, os.path.abspath(a.tiles), work)
    frames = os.path.join(work, "frames"); shutil.rmtree(frames, ignore_errors=True)
    fps = 6 if a.preview else FPS
    cmd = ["node", os.path.join(HERE, "capture.js"), html, frames, "--fps", str(fps),
           "--duration", str(DUR), "--chrome", find_chrome()] + (["--guides"] if a.guides else [])
    if not NODE_MODULES:
        sys.exit("puppeteer-core not found: npm install --prefix .tools puppeteer-core")
    node = shutil.which("node") or "/opt/homebrew/bin/node"
    cmd[0] = node
    subprocess.run(cmd, check=True, env={**os.environ, "NODE_PATH": NODE_MODULES,
                                         "PATH": "/opt/homebrew/bin:" + os.environ.get("PATH", "")})
    encode(frames, a.out, fps)
    print(f"{a.out}  ({DUR}s @ {fps}fps)  work={work}")


if __name__ == "__main__":
    main()
