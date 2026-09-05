#!/usr/bin/env python3
"""
Pick and prepare a track for a reel.

Tempo is measured, not guessed: the cuts are snapped to the beat grid, so a
track's BPM decides the step length of the climb. Detection is onset-energy
autocorrelation over a 200Hz envelope — pure Python, no numpy, because the
spare Mac's system Python has neither and the signal is only ~6,000 samples.

Selection rotates least-recently-used per reel so consecutive posts never
share a track, and `--for` filters to a tempo band that suits fast counting.
"""
import argparse, json, math, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
MUSIC_DIR = os.path.join(HERE, "music")
LOG = os.path.join(HERE, ".music-used.json")
RATE = 200  # envelope Hz


def envelope(path):
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", path, "-ac", "1",
         "-af", f"highpass=f=40,lowpass=f=4000,aresample={RATE*40},"
                f"asetnsamples=40,astats=metadata=1:reset=1,"
                f"ametadata=print:key=lavfi.astats.Overall.RMS_level:file=-",
         "-f", "null", "-"], capture_output=True, text=True).stdout
    env = []
    for line in raw.splitlines():
        if "RMS_level=" in line:
            v = line.split("=")[1]
            db = float(v) if v not in ("-inf", "nan") else -90.0
            env.append(10 ** (db / 20))
    return env


def bpm_of(env, lo=80, hi=140):
    """Pulse tempo with a confidence score.

    Onset strength is autocorrelated across 60-280 BPM, then each candidate in
    the musical band is scored by its own lag plus its half- and double-time
    harmonics: a real pulse has energy at 2x and 0.5x, a stray eighth-note peak
    does not. Confidence is the winner against the band's median, so the caller
    can refuse to beat-snap on a weak read rather than cut off the beat.
    Confidence is the BPM spread of the top three candidates: small is good.
    """
    on = [max(0.0, env[i] - env[i - 1]) for i in range(1, len(env))]
    m = sum(on) / max(1, len(on)); on = [x - m for x in on]
    def r_at(bpm):
        lag = RATE * 60.0 / bpm
        l0, l1 = int(math.floor(lag)), int(math.ceil(lag)); f = lag - l0
        acc = 0.0
        for i in range(l1, len(on)):
            acc += on[i] * ((1 - f) * on[i - l0] + f * on[i - l1])
        return max(0.0, acc / (len(on) - l1))
    r = {b: r_at(b) for b in range(60, 281)}
    score = {b: r[b] + 0.5 * r.get(2 * b, 0) + 0.5 * r.get(b // 2, 0)
             for b in range(lo, hi + 1)}
    ranked = sorted(score, key=score.get, reverse=True)
    best = ranked[0]
    # confidence = how tightly the top three agree. A real pulse's runners-up
    # are its neighbours (127/128/130); an ambient track's are scattered.
    top = ranked[:3]
    conf = max(top) - min(top)
    return best, conf, top


def loudness(path):
    out = subprocess.run(["ffmpeg", "-v", "info", "-i", path, "-af",
                          "loudnorm=print_format=json", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    j = out[out.rfind("{"):out.rfind("}") + 1]
    try:
        return float(json.loads(j)["input_i"])
    except Exception:
        return None


def analyse(path):
    env = envelope(path)
    bpm, conf, top = bpm_of(env)
    return {"file": os.path.basename(path), "bpm": bpm, "confidence": conf,
            "candidates": top, "lufs": loudness(path),
            "seconds": round(len(env) / RATE, 1)}


def catalogue(refresh=False):
    cache = os.path.join(MUSIC_DIR, ".catalogue.json")
    if os.path.exists(cache) and not refresh:
        return json.load(open(cache))
    rows = [analyse(os.path.join(MUSIC_DIR, f))
            for f in sorted(os.listdir(MUSIC_DIR)) if f.lower().endswith(".mp3")]
    json.dump(rows, open(cache, "w"), indent=1)
    return rows


def pick(lo=95, hi=140, exclude=()):
    """Least-recently-used track inside the tempo band."""
    used = json.load(open(LOG)) if os.path.exists(LOG) else {}
    # only tracks whose tempo we can actually cut to
    rows = [r for r in catalogue() if lo <= (r["bpm"] or 0) <= hi
            and r.get("confidence", 99) <= 6 and r["file"] not in exclude]
    if not rows:
        rows = catalogue()
    rows.sort(key=lambda r: (used.get(r["file"], ""), r["file"]))
    return rows[0]


def mark_used(name, when):
    used = json.load(open(LOG)) if os.path.exists(LOG) else {}
    used[name] = when
    json.dump(used, open(LOG, "w"), indent=1)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--refresh", action="store_true")
    ap.add_argument("--pick", action="store_true")
    a = ap.parse_args()
    for r in catalogue(a.refresh):
        ok = "snap" if r["confidence"] <= 6 else "----"
        print(f"  {r['file']:34} {r['bpm']:>4} bpm  spread {r['confidence']:>3}  {ok}  "
              f"alt {r['candidates'][1:]}  {r['lufs']:>6} LUFS")
    if a.pick:
        print("\npick:", pick()["file"])


if __name__ == "__main__":
    main()
