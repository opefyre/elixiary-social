#!/usr/bin/env python3
"""
spec -> timeline.html -> frames -> mp4

    python3 build.py spec.json --tiles ./tiles --out reel.mp4 [--guides] [--preview]

--preview renders 6 frames per second instead of 30, for a fast look at the
motion before committing to a full capture.
"""
import argparse, json, os, shutil, subprocess, sys, tempfile, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import music as music_mod  # noqa: E402

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


MAX_SPREAD = 6   # top-3 BPM candidates wider than this = a guess; keep designed timing


def timing_for(bpm, conf=0):
    """Snap the climb to the beat grid. Each bottle step becomes a whole number
    of beats close to the designed 1.66s, and the climb starts on a beat, so
    every counter lands with the music rather than beside it."""
    if not bpm or conf > MAX_SPREAD:
        return {}
    beat = 60.0 / bpm
    step = max(2, round(1.66 / beat)) * beat
    climb = round(2.35 / beat) * beat
    recap = climb + 5 * step
    # keep the whole thing inside 15s; steal from the recap hold if needed
    cta = min(recap + 2.05, DUR - 2.2)
    return {"climb": round(climb, 3), "stepDur": round(step, 3),
            "recap": round(recap, 3), "cta": round(cta, 3)}


def write_html(spec, tiles_dir, workdir, timing=None):
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
               .replace("__TILES__", os.path.relpath(tiles_dir, workdir))
               .replace("__TIMING__", json.dumps(timing or {})))
    p = os.path.join(workdir, "reel.html"); open(p, "w").write(html); return p


def encode(frames, out, fps, track=None):
    if track:
        audio_in = ["-i", track]
        # trim to the reel, normalise to the -14 LUFS social platforms target,
        # and fade the last 1.4s so the cut never sounds like a mistake
        afilter = ["-af", f"atrim=0:{DUR},loudnorm=I=-14:TP=-1.5:LRA=11,"
                          f"afade=t=out:st={DUR-1.4}:d=1.4"]
    else:
        audio_in = ["-f", "lavfi", "-t", str(DUR), "-i",
                    "anullsrc=channel_layout=stereo:sample_rate=44100"]
        afilter = []
    subprocess.run(["ffmpeg", "-y", "-framerate", str(fps),
        "-i", os.path.join(frames, "f%05d.png"), *audio_in, *afilter,
        "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-r", "30",
        "-crf", "17", "-preset", "slow", "-c:a", "aac", "-b:a", "192k", "-shortest",
        "-movflags", "+faststart", out], check=True, capture_output=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec"); ap.add_argument("--tiles", required=True)
    ap.add_argument("--out", default="reel.mp4"); ap.add_argument("--work", default=None)
    ap.add_argument("--guides", action="store_true"); ap.add_argument("--preview", action="store_true")
    ap.add_argument("--music", default=None, help="track file, or 'none'; default: rotate")
    a = ap.parse_args()
    spec = json.load(open(a.spec))
    work = a.work or tempfile.mkdtemp(prefix="reel-")

    track, bpm = None, None
    if a.music != "none":
        if a.music:
            path = a.music if os.path.exists(a.music) else os.path.join(music_mod.MUSIC_DIR, a.music)
            row = next((r for r in music_mod.catalogue() if r["file"] == os.path.basename(path)), None)
        else:
            row = music_mod.pick(); path = os.path.join(music_mod.MUSIC_DIR, row["file"])
        track, bpm = path, (row or {}).get("bpm")
        conf = (row or {}).get("confidence", 99)
        print(f"music: {os.path.basename(path)}  {bpm} bpm  (confidence {conf})")
    timing = timing_for(bpm, conf if track else 99)
    if timing:
        print(f"timing: beat-snapped — step {timing['stepDur']}s  climb@{timing['climb']}s  recap@{timing['recap']}s")
    elif track:
        print("timing: tempo read not confident enough to snap; keeping designed timing")
    html = write_html(spec, os.path.abspath(a.tiles), work, timing)
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
    encode(frames, a.out, fps, track)
    if track and not a.preview:
        music_mod.mark_used(os.path.basename(track), time.strftime("%Y-%m-%dT%H:%M:%S"))
    print(f"{a.out}  ({DUR}s @ {fps}fps)  work={work}")


if __name__ == "__main__":
    main()
