import json, subprocess, sys, re
for line in open(sys.argv[1]):
    if not line.strip(): continue
    take, phrase, out = line.rstrip("\n").split("|"); nth = int(phrase.split("#")[1]) if "#" in phrase else 0; phrase = phrase.split("#")[0]
    a = json.load(open(take + ".json"))["a"]; s = "".join(a["characters"]); i = -1
    for _ in range(nth + 1): i = s.find(phrase, i + 1)
    t0 = a["character_start_times_seconds"][i]; t1 = a["character_end_times_seconds"][i + len(phrase) - 1]
    # trailing punctuation often carries a long "end" time: use the last letter's end
    k = i + len(phrase) - 1
    while k > i and not phrase[k - i].isalnum(): k -= 1
    t1 = a["character_end_times_seconds"][k]
    subprocess.run(["python3", "recut_end.py", take, out, f"{t0 - .05:.3f}", f"{t1:.3f}"], check=True, capture_output=True)
    m = float(re.search(r"mean_volume: (-?[\d.]+)", subprocess.run(["ffmpeg", "-hide_banner", "-i", out, "-af", "volumedetect", "-f", "null", "-"], capture_output=True, text=True).stderr).group(1))
    g = max(-6, min(10, -16.5 - m)); tmp = out + ".tmp.wav"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", out, "-af", f"volume={g:.2f}dB,alimiter=limit=0.9", tmp], check=True)
    subprocess.run(["mv", tmp, out]); d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out], capture_output=True, text=True).stdout)
    print(f"{out}: {d:.2f}s  {phrase}")
