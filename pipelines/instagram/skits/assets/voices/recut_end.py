"""recut_end.py take out.wav start end — cut [start, end + tail] where tail runs to the first 60 ms below -45 dB (max +0.6 s)."""
import sys, wave, numpy as np
take, out, a, b = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4]); SR = 44100
w = wave.open(take + ".wav"); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
db = lambda i: 20 * np.log10(np.sqrt(np.mean(x[i:i + 441] ** 2)) + 1e-9)
i = int(b * SR); lim = i + int(.6 * SR)
while i < lim and not all(db(i + k * 441) < -45 for k in range(6)): i += 441
j = int(a * SR)
while j > int((a - .3) * SR) and db(j - 441) > -45: j -= 441
y = x[j:i + 441].copy(); f = int(.01 * SR); y[:f] *= np.linspace(0, 1, f); y[-f:] *= np.linspace(1, 0, f)
o = wave.open(out, "wb"); o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR); o.writeframes((y * 32767).astype(np.int16).tobytes()); o.close()
print(out, f"{j / SR:.2f}-{(i + 441) / SR:.2f} ({len(y) / SR:.2f}s)")
