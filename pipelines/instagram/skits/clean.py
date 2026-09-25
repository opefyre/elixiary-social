#!/usr/bin/env python3
"""clean.py src.png out.webp [tol] — cut out a character, including background trapped inside it.

cutout.py floods the background in from the border, so cream caught between curls, or between an arm and the body,
stays opaque. This runs cutout.py uncropped, then clears every enclosed region of near-background colour bigger than
MIN px, fades the pale halo left along hair edges, and crops. Needs only PIL + numpy.
"""
import os, subprocess, sys, tempfile
from collections import deque
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
tol = float(sys.argv[3]) if len(sys.argv) > 3 else 16
MIN = 150
here = os.path.dirname(os.path.abspath(__file__))
tmp = tempfile.mktemp(suffix=".png")
env = {**os.environ, "NOCROP": "1", "TOLHEAD": os.environ.get("TOLHEAD", "14"), "HEADROWS": os.environ.get("HEADROWS", ".55")}
subprocess.run([sys.executable, os.path.join(here, "cutout.py"), src, tmp], check=True, env=env, capture_output=True)

rgb = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
im = np.asarray(Image.open(tmp).convert("RGBA")).copy()
h, w, _ = rgb.shape
bg = np.median(np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]]), axis=0)
dist = np.sqrt(((rgb - bg) ** 2).sum(2))
near = (dist < tol) & (im[..., 3] > 0)

# connected regions of near-background colour that the border flood missed
seen = np.zeros((h, w), bool); kill = np.zeros((h, w), bool); removed = 0
for y0, x0 in zip(*np.nonzero(near)):
    if seen[y0, x0]: continue
    comp = [(y0, x0)]; seen[y0, x0] = True; q = deque(comp)
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and near[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True; q.append((ny, nx)); comp.append((ny, nx))
    if len(comp) > MIN:
        ys, xs = zip(*comp); px = rgb[list(ys), list(xs)]
        # background is flat and warm; an eye white or a tooth is shaded and more neutral — keep those
        tint = np.abs((px[:, 0] - px[:, 2]).mean() - (bg[0] - bg[2])) + np.abs((px[:, 1] - px[:, 2]).mean() - (bg[1] - bg[2]))
        spread = dist[list(ys), list(xs)].std()
        if tint < 7 and spread < 4.5:
            kill[list(ys), list(xs)] = True; removed += 1
        elif os.environ.get("DEBUG"):
            print(f"  kept region {len(comp)} px at y{min(ys)}-{max(ys)} x{min(xs)}-{max(xs)} tint {tint:.1f} spread {spread:.1f}")
a = im[..., 3].astype(np.float32)
a[kill] = 0
# halo: pale pixels bordering any transparent area fade by how close they are to the background colour
clear = Image.fromarray(((a < 10) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))
edge = (np.asarray(clear) > 0) & (a > 0) & (dist < tol * 2.5)
a[edge] = np.minimum(a[edge], np.clip((dist[edge] - tol * .6) / (tol * 1.9), 0, 1) * 255)
im[..., 3] = a.astype(np.uint8)
out = Image.fromarray(im, "RGBA")
bbox = out.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
out.crop(bbox).save(dst, lossless=True, method=6)
os.remove(tmp)
print(dst, f"removed {removed} enclosed regions ({int(kill.sum())} px), faded {int(edge.sum())} edge px")
