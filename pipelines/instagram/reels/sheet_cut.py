#!/usr/bin/env python3
"""
Cut a transparent character sheet into one PNG per figure.

Figures are the connected components of the alpha plane. Each output is a
MASKED crop — only that figure's own pixels keep their alpha — so a
neighbour's arm reaching into the bounding box never comes along. Figures
that touch (one merged component) are split at the thinnest column of
coverage and the two halves get separate ids. Pure Python over the raw RGBA
buffer; no PIL on the spare Mac.

    python3 sheet_cut.py sheet.png --out dir --names "a,b,c,..."
"""
import argparse, os, subprocess
from collections import deque

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("sheet"); ap.add_argument("--out", required=True)
    ap.add_argument("--names", default=""); ap.add_argument("--min", type=int, default=4000)
    ap.add_argument("--pad", type=int, default=4); ap.add_argument("--rowgap", type=int, default=120)
    ap.add_argument("--thresh", type=int, default=64, help="alpha below this is background")
    a = ap.parse_args()
    w, h = map(int, subprocess.run(["ffprobe","-v","error","-show_entries","stream=width,height","-of","csv=p=0",a.sheet],
                                   capture_output=True, text=True).stdout.strip().split(","))
    raw = bytearray(subprocess.run(["ffmpeg","-v","error","-i",a.sheet,"-f","rawvideo","-pix_fmt","rgba","-"],capture_output=True).stdout)
    alpha = raw[3::4]; T = a.thresh
    cid = [0]*(w*h); comps = {}; nid = 0
    for start in range(w*h):
        if cid[start] or alpha[start] < T: continue
        nid += 1; q = deque([start]); cid[start] = nid; n = 0; x0=y0=10**9; x1=y1=-1
        while q:
            i = q.popleft(); x, y = i % w, i // w; n += 1
            x0,x1,y0,y1 = min(x0,x),max(x1,x),min(y0,y),max(y1,y)
            for nx,ny in ((x-1,y),(x+1,y),(x,y-1),(x,y+1),(x-1,y-1),(x+1,y+1),(x-1,y+1),(x+1,y-1)):
                if 0<=nx<w and 0<=ny<h:
                    j = ny*w+nx
                    if not cid[j] and alpha[j] >= T: cid[j] = nid; q.append(j)
        if n >= a.min: comps[nid] = [x0,y0,x1,y1,n]
        else:
            for yy in range(y0,y1+1):
                for xx in range(x0,x1+1):
                    if cid[yy*w+xx] == nid: cid[yy*w+xx] = 0
    # touching figures: split the over-wide component at its thinnest column
    widths = sorted(c[2]-c[0] for c in comps.values()); med = widths[len(widths)//2] if widths else 0
    for k in list(comps):
        x0,y0,x1,y1,n = comps[k]
        if med and x1-x0 > 1.6*med:
            cov = [sum(1 for y in range(y0,y1+1) if cid[y*w+x]==k) for x in range(x0,x1+1)]
            lo,hi = int(len(cov)*.3), int(len(cov)*.7)
            cut = x0 + min(range(lo,hi), key=lambda i: cov[i])
            nid += 1; rx0=ry0=10**9; rx1=ry1=-1; rn=0; lx1=-1; ln=0
            for y in range(y0,y1+1):
                for x in range(x0,x1+1):
                    i=y*w+x
                    if cid[i]!=k: continue
                    if x>cut: cid[i]=nid; rn+=1; rx0,rx1,ry0,ry1=min(rx0,x),max(rx1,x),min(ry0,y),max(ry1,y)
                    else: ln+=1; lx1=max(lx1,x)
            comps[k]=[x0,y0,lx1,y1,ln]; comps[nid]=[rx0,ry0,rx1,ry1,rn]
    # order: rows by vertical centre, then left to right
    items = sorted(comps.items(), key=lambda kv: (kv[1][1]+kv[1][3])/2)
    rows, cur = [], []
    for kv in items:
        c = kv[1]; cy=(c[1]+c[3])/2
        if cur and abs(cy-(cur[-1][1][1]+cur[-1][1][3])/2) > a.rowgap: rows.append(cur); cur=[]
        cur.append(kv)
    if cur: rows.append(cur)
    ordered = [kv for r in rows for kv in sorted(r, key=lambda kv: kv[1][0])]
    names = [n.strip() for n in a.names.split(",") if n.strip()]
    os.makedirs(a.out, exist_ok=True)
    for idx,(k,(x0,y0,x1,y1,n)) in enumerate(ordered):
        x0,y0 = max(0,x0-a.pad),max(0,y0-a.pad); x1,y1 = min(w-1,x1+a.pad),min(h-1,y1+a.pad)
        cw,ch = x1-x0+1,y1-y0+1; buf = bytearray(cw*ch*4)
        for y in range(y0,y1+1):
            for x in range(x0,x1+1):
                i=y*w+x; o=((y-y0)*cw+(x-x0))*4
                buf[o:o+3]=raw[i*4:i*4+3]; buf[o+3]=raw[i*4+3] if cid[i]==k else 0
        name = names[idx] if idx < len(names) else f"figure-{idx+1:02d}"
        dst = os.path.join(a.out, f"{name}.png")
        subprocess.run(["ffmpeg","-v","error","-y","-f","rawvideo","-pix_fmt","rgba","-s",f"{cw}x{ch}","-i","-","-vf","format=rgba",dst],input=bytes(buf),check=True)
        print(f"  {name:22} {cw:4}x{ch:<4} at ({x0},{y0})  px={n}")
    print(f"{len(ordered)} figures in {len(rows)} rows")

if __name__ == "__main__":
    main()
