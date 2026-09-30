"""recut_end.py take out.wav start end [floor] — cut [start', end + tail]. The tail runs to the first 60 ms below -45 dB (max +0.6 s).
The start walks back (max 0.8 s, never before `floor` = end of the previous spoken word) until it sits after >=120 ms of silence, so a
word whose timestamp is late (Eleven v3 tags shift them) is not clipped."""
import sys, wave, numpy as np
take, out, a, b = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4]); floor = float(sys.argv[5]) if len(sys.argv) > 5 else a - .3; SR = 44100
w = wave.open(take + ".wav"); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
db = lambda i: 20 * np.log10(np.sqrt(np.mean(x[max(0, i):i + 441] ** 2)) + 1e-9)
i = int(b * SR); lim = i + int(.6 * SR)
while i < lim and not all(db(i + k * 441) < -45 for k in range(6)): i += 441
j = int(a * SR); lo = int(max(floor, a - .8) * SR)
if db(j - 441) > -45 or True:
    k = j
    while k > lo and not all(db(k - 441 * (m + 1)) < -45 for m in range(12)): k -= 441
    if k <= lo: k = max(lo, int((a - .3) * SR)) if floor < a - .3 else lo
    while k < j and db(k) < -45: k += 441
    j = min(j, k)
y = x[j:i + 441].copy(); f = int(.01 * SR); y[:f] *= np.linspace(0, 1, f); y[-f:] *= np.linspace(1, 0, f)
o = wave.open(out, "wb"); o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR); o.writeframes((y * 32767).astype(np.int16).tobytes()); o.close()
print(out, f"{j / SR:.2f}-{(i + 441) / SR:.2f} ({len(y) / SR:.2f}s)")
