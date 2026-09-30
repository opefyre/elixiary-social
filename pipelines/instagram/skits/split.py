#!/usr/bin/env python3
"""split.py <sheet> <name>... — assets/src/<sheet>.png (transparent pose sheet, poses side by side) → assets/src/<name>.png,
one per pose, split on the fully transparent column gaps (left to right). Then run trim.py on the names."""
import os, sys
import numpy as np
from PIL import Image
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")
sheet, names = sys.argv[1], sys.argv[2:]
im = Image.open(f"{A}/src/{sheet}.png").convert("RGBA"); col = (np.array(im)[:, :, 3] > 8).any(0)
segs, s = [], None
for x, v in enumerate(col):
    if v and s is None: s = x
    if not v and s is not None: segs.append((s, x)); s = None
if s is not None: segs.append((s, len(col)))
segs = [g for g in segs if g[1] - g[0] > 20]
if len(segs) != len(names): sys.exit(f"{sheet}: found {len(segs)} poses {segs}, expected {len(names)}")
for (x0, x1), n in zip(segs, names): im.crop((x0, 0, x1, im.height)).save(f"{A}/src/{n}.png"); print(n, x1 - x0)
