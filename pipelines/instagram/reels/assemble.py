#!/usr/bin/env python3
"""
Beat PNGs -> a Reel-ready MP4.

Hard cuts, not dissolves: a reel that cross-fades reads as a slideshow, and the
whole point of the climbing counter is that each number *lands*. Every beat
gets a slow push so no frame is ever completely static — Instagram's own
compression treats a frozen frame poorly, and a still image reads as low effort.

A silent AAC track is muxed in deliberately. Reels are an audio-first surface
and a video with no track at all can be treated as malformed; the intent is
that a trending sound gets added in the Instagram editor before posting.

    python3 assemble.py <frames-dir> --out reel.mp4
"""

import argparse
import json
import os
import subprocess

FPS = 30
W, H = 1080, 1920


def clip_filter(idx, seconds, settle=False):
    """Slow push, or a slight settle on the counter beats so the number lands.

    d=1 with the input already at FPS: zoompan emits `d` frames per *input*
    frame, so any d>1 against a looped input multiplies the duration. Driving
    the zoom off `on` (the output frame index) instead keeps each clip exactly
    as long as its beat.
    """
    n = max(2, int(round(seconds * FPS)))
    if settle:
        z = f"'max(1.055-0.055*on/{n},1.0)'"
    else:
        z = f"'min(1+0.045*on/{n},1.045)'"
    return (f"[{idx}:v]scale={W*2}:{H*2},"
            f"zoompan=z={z}:d=1:"
            f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
            f"s={W}x{H}:fps={FPS},setsar=1[v{idx}]")


def build(plan, out):
    inputs, filters, labels = [], [], []
    for i, beat in enumerate(plan):
        inputs += ["-loop", "1", "-framerate", str(FPS),
                   "-t", str(beat["seconds"]), "-i", beat["png"]]
        filters.append(clip_filter(i, beat["seconds"],
                                   settle=beat["name"].startswith("b")))
        labels.append(f"[v{i}]")
    filters.append("".join(labels) + f"concat=n={len(plan)}:v=1:a=0[vout]")

    cmd = ["ffmpeg", "-y", *inputs,
           "-f", "lavfi", "-t", str(sum(b["seconds"] for b in plan)),
           "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
           "-filter_complex", ";".join(filters),
           "-map", "[vout]", "-map", f"{len(plan)}:a",
           "-c:v", "libx264", "-profile:v", "high", "-level", "4.0",
           "-pix_fmt", "yuv420p", "-r", str(FPS),
           "-crf", "18", "-preset", "slow",
           "-c:a", "aac", "-b:a", "128k", "-shortest",
           "-movflags", "+faststart", out]
    subprocess.run(cmd, check=True, capture_output=True)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("frames_dir")
    ap.add_argument("--out", default="reel.mp4")
    a = ap.parse_args()
    with open(os.path.join(a.frames_dir, "plan.json")) as f:
        plan = json.load(f)
    out = build(plan, a.out)
    total = sum(b["seconds"] for b in plan)
    print(f"{out}  ({total:.1f}s, {len(plan)} beats, {W}x{H} @ {FPS}fps)")


if __name__ == "__main__":
    main()
