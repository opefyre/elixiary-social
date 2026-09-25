"""recut_fast.py take.json/wav phrase... — cut rapid-fire phrases with no silence between them.
Each boundary is the midpoint between aligned words, moved to the quietest 10 ms within -0.15..+0.25 s."""
import json, wave, sys, numpy as np
SR = 44100
take, outs, qs = sys.argv[1], sys.argv[2], sys.argv[3:]
d = json.load(open(take + ".json")); a = d["a"]; s = "".join(a["characters"]); st = a["character_start_times_seconds"]; en = a["character_end_times_seconds"]
w = wave.open(take + ".wav"); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
n = 441; e = np.array([np.sqrt(np.mean(x[k * n:(k + 1) * n] ** 2)) for k in range(len(x) // n)])
spans = []; pos = 0
for q in qs:
    i = s.find(q, pos); pos = i + len(q); spans.append((st[i], en[i + len(q) - 1]))
def quiet(t, lo=-.15, hi=.25):
    k0, k1 = int((t + lo) * 100), int((t + hi) * 100)
    return (k0 + int(np.argmin(e[k0:k1]))) / 100
bounds = [spans[0][0] - .05] + [quiet((spans[k][1] + spans[k + 1][0]) / 2) for k in range(len(spans) - 1)] + [quiet(spans[-1][1] + .1, -.05, .3)]
for k in range(len(qs)):
    a0, b1 = bounds[k], bounds[k + 1]
    y = x[int(a0 * SR):int(b1 * SR)].copy(); f = int(.008 * SR); y[:f] *= np.linspace(0, 1, f); y[-f:] *= np.linspace(1, 0, f)
    o = wave.open(outs.format(k + 1), "wb"); o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR); o.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes()); o.close()
    m = 2205; env = [20 * np.log10(np.sqrt(np.mean(y[i * m:(i + 1) * m] ** 2)) + 1e-6) for i in range(len(y) // m)]
    print(f"{outs.format(k + 1)} {qs[k]:18} {a0:.2f}-{b1:.2f}  start {env[0]:.0f} end {env[-1]:.0f} dB")
