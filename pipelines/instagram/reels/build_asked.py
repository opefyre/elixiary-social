#!/usr/bin/env python3
"""
"I asked an AI for a cocktail that tastes like..." — one generated recipe per reel.

    python3 build_asked.py recipe.json --out reel.mp4 [--preview] [--guides] [--music ...]

recipe.json is one generated_recipes row (name, prompt, image, ingredients
markdown, description). Everything on screen is that row: the prompt is what
was typed, the name is what Marlow called it, the photo is the one it made.
"""
import argparse, json, os, re, shutil, sys, tempfile, time, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.join(HERE, "..", "render"))
from render import data_uri, find_chrome  # noqa: E402
import build as core                       # noqa: E402
import music as music_mod                  # noqa: E402

UA = {"User-Agent": "elixiary-social/1.0"}


def ingredients(md):
    out = []
    for line in (md or "").splitlines():
        s = line.strip().lstrip("-*• ").strip()
        if s:
            out.append(s)
    return out


def why(desc):
    """Marlow's own first sentence, trimmed to a label."""
    s = re.split(r"(?<=[.!?])\s", (desc or "").strip())[0]
    s = re.sub(r"^(A|An|The)\s+", "", s)            # "A tantalizing mix" -> "tantalizing mix"
    s = s[0].lower() + s[1:] if s else s
    # a long sentence is cut at its first clause, never mid-phrase with "…"
    if len(s) > 84:
        clause = re.split(r"[,;:—-]\s", s)[0]
        s = clause if 24 <= len(clause) <= 84 else s[:81].rsplit(" ", 1)[0]
    return "why it works: " + s.rstrip(".,; ")


DESIGN = {"asked": ("asked.html", 15.0), "asked2": ("asked2.html", 18.5)}


def write_html(r, workdir, timing, design="asked2"):
    tpl = open(os.path.join(HERE, DESIGN[design][0])).read()
    assets = os.path.join(workdir, "assets"); os.makedirs(assets, exist_ok=True)
    photo = os.path.join(assets, "photo.png")
    if not os.path.exists(photo):
        req = urllib.request.Request(r["image"], headers=UA)
        open(photo, "wb").write(urllib.request.urlopen(req, timeout=60).read())
    marlow = {}
    for k in ("skeptical", "cheers", "happy", "thinking"):
        shutil.copy(os.path.join(core.ASSETS, f"expr-{k}-256.png"), os.path.join(assets, f"{k}.png"))
        marlow[k] = f"assets/{k}.png"
    for f in ("logo.png", "sal-thinking.png", "sal-shaking.png", "sal-head-surprised.png", "sal-pose-offering-drink.png", "sal-pose-shrug.png"):
        shutil.copy(os.path.join(core.ASSETS, f), os.path.join(assets, f))
    fonts = os.path.join(HERE, "..", "render", "fonts")
    data = {"prompt": r["prompt"], "name": r["name"], "ingredients": ingredients(r.get("ingredients")),
            "why": why(r.get("description")), "marlow": marlow}
    html = (tpl.replace("__INTER__", data_uri(os.path.join(fonts, "Inter-latin.woff2")))
               .replace("__PJS__", data_uri(os.path.join(fonts, "PlusJakartaSans-latin.woff2")))
               .replace("__PHOTO__", "assets/photo.png").replace("__LOGO__", "assets/logo.png")
               .replace("__SAL_THINK__", "assets/sal-thinking.png").replace("__SAL_SHAKE__", "assets/sal-shaking.png").replace("__SAL_SURPRISED__", "assets/sal-head-surprised.png").replace("__SAL_OFFER__", "assets/sal-pose-offering-drink.png").replace("__SAL_SHRUG__", "assets/sal-pose-shrug.png")
               .replace("__DATA__", json.dumps(data)).replace("__TIMING__", json.dumps(timing or {})))
    p = os.path.join(workdir, "reel.html"); open(p, "w").write(html); return p


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("recipe"); ap.add_argument("--out", default="reel.mp4"); ap.add_argument("--work")
    ap.add_argument("--guides", action="store_true"); ap.add_argument("--preview", action="store_true")
    ap.add_argument("--music", default=None)
    ap.add_argument("--design", default="asked2", choices=["asked", "asked2"],
                    help="asked2 = glass design (default); asked = the first cut")
    a = ap.parse_args()
    r = json.load(open(a.recipe)); work = a.work or tempfile.mkdtemp(prefix="asked-")
    track = None
    if a.music != "none":
        row = (next((x for x in music_mod.catalogue() if x["file"] == os.path.basename(a.music)), None)
               if a.music else music_mod.pick())
        track = os.path.join(music_mod.MUSIC_DIR, row["file"]) if row else None
        if track: print(f"music: {row['file']}  {row['bpm']} bpm")
    html = write_html(r, work, {}, a.design)
    dur = DESIGN[a.design][1]
    frames = os.path.join(work, "frames"); shutil.rmtree(frames, ignore_errors=True)
    fps = 6 if a.preview else core.FPS
    import subprocess
    subprocess.run(["node", os.path.join(HERE, "capture.js"), html, frames, "--fps", str(fps),
                    "--duration", str(dur), "--chrome", find_chrome()] + (["--guides"] if a.guides else []),
                   check=True, env={**os.environ, "NODE_PATH": core.NODE_MODULES,
                                    "PATH": "/opt/homebrew/bin:" + os.environ.get("PATH", "")})
    core.DUR = dur
    core.encode(frames, a.out, fps, track)
    if track and not a.preview:
        music_mod.mark_used(os.path.basename(track), time.strftime("%Y-%m-%dT%H:%M:%S"))
    print(f"{a.out}  work={work}")


if __name__ == "__main__":
    main()
