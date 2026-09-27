// SK.32 "What can I get you?" — Sal asks. FREEZE. Zoom into her head: a control room in full panic. Tiny workers:
// "We've got nothing! NOTHING!" — "Check the drinks folder!" The DRINK NAMES drawer: 0 files (a moth flies out), next to
// SONG LYRICS 2009: 4,210 files and CRINGE MEMORIES: 88,203. "It's EMPTY!" The bartender-waiting timer goes red. "Say
// something! ANYTHING!" — the big red button — a slip prints. Back at the bar: "Uh… same as last time!" Sal: "…you've never
// been here."  Voices: ElevenLabs (Sal: Chris) + Higgsfield TTS (her; the brain crew, pitched up).
export const meta = {
  id: "sk32-brain-blank",
  images: { salw: "cutouts/salc_wait.webp", salf: "cutouts/sal_twitch.webp", flat: "cutouts/cust_flat.webp", ask: "cutouts/cust_ask.webp", oops: "cutouts/cust_oops.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", RED = "#ff3b4a", BRAIN = "#f7a6bf";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const S1 = .4, FREEZE = 2.0, IN = 2.8, B1 = 3.4, B2 = 6.1, OPEN = 6.8, B3 = 8.0, B4 = 9.5, BTN = 10.6, SLIP = 11.2, OUT = 12.6, G1 = 13.1, S2 = 15.2, OOPS = 16.4, STAMP = 17.6, DUR = 20.6;
  E.music({ bpm: 100, root: 60, seed: 32, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: FREEZE });
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1500;

  // ================= the bar (used twice) =================
  const bar = (P, herPoses, salPoses) => {
    E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2c1f1a,#3d2a22 60%,#1e1512)");
    const shelf = E.el(P, "abs", "left:0;top:560px;width:1080px;height:600px;opacity:.6");
    let s = "";
    for (let r = 0; r < 3; r++) for (let i = 0; i < 12; i++) { const c = ["#c77d3a", "#7ab04c", "#e4d4a8", "#9a2a3a", "#4a82b8"][(i + r) % 5], h = 100 + ((i * 29 + r * 7) % 50); s += `<rect x="${24 + i * 88}" y="${r * 190 + 170 - h}" width="42" height="${h}" rx="9" fill="${c}"/><rect x="${38 + i * 88}" y="${r * 190 + 140 - h}" width="14" height="34" fill="${c}"/>`; }
    shelf.innerHTML = `<svg viewBox="0 0 1080 600" width="1080" height="600">${s}${[0, 1, 2].map(r => `<rect x="0" y="${r * 190 + 170}" width="1080" height="12" fill="#7a5238"/>`).join("")}</svg>`;
    E.el(P, "abs", "left:0;top:500px;width:1080px;height:40px;background:repeating-linear-gradient(90deg,#ffd98a 0 8px,transparent 8px 90px);opacity:.5;filter:blur(2px)");
    const SH = 920;
    const sal = E.el(P, "abs", `left:${760 - SH * 754 / 1104 / 2}px;top:${TOP + 40 - SH}px;width:${SH * 754 / 1104}px;height:${SH}px;z-index:2`);
    const salEls = Object.fromEntries(salPoses.map(([n, w, h]) => [n, E.img(sal, n, `position:absolute;left:${(SH * 754 / 1104 - SH * w / h) / 2}px;top:0;width:${SH * w / h}px;height:${SH}px`)]));
    E.el(P, "abs", `left:0;top:${TOP}px;width:1080px;height:${1920 - TOP}px;z-index:3;background:linear-gradient(180deg,#6e4630,#4a2e1f);box-shadow:inset 0 10px 0 #8a5a3c`);
    const HH2 = 1020;
    const her = E.el(P, "abs", `left:${330 - HH2 * 751 / 1160 / 2}px;top:${1940 - HH2}px;width:${HH2 * 751 / 1160}px;height:${HH2}px;z-index:4`);
    const herEls = Object.fromEntries(herPoses.map(([n, w, h]) => [n, E.img(her, n, `position:absolute;left:${(HH2 * 751 / 1160 - HH2 * w / h) / 2}px;top:0;width:${HH2 * w / h}px;height:${HH2}px`)]));
    return { sal, salEls, her, herEls };
  };

  // ================= scene 1: the question =================
  const A = E.scene("bar1", 0, IN, "dark"); E.cur = A;
  const zin = E.el(A.el, "abs", "left:0;top:0;width:1080px;height:1920px");
  const b1 = bar(zin, [["flat", 751, 1160]], [["salw", 754, 1104]]);
  E.F(t => { b1.her.style.transform = t < FREEZE ? `translateY(${Math.sin(t * 2) * 4}px)` : "none"; b1.sal.style.transform = t < FREEZE ? `translateY(${Math.sin(t * 2 + 1) * 4}px)` : "none"; });
  // FREEZE → push into her head
  const zoomWrap = zin;
  E.F(t => { const z = t < FREEZE + .1 ? 1 : 1 + 5 * Math.pow(seg(t, FREEZE + .1, IN - FREEZE - .1), 2.2); zoomWrap.style.transformOrigin = "330px 1080px"; zoomWrap.style.transform = `scale(${z})`; });
  const frz = E.el(A.el, "abs", `left:0;top:1260px;width:1080px;text-align:center;z-index:9;opacity:0`, `<span style="display:inline-block;padding:10px 26px;border-radius:16px;background:#fff;color:${INK};font-weight:900;font-size:50px">⏸ BRAIN LOADING…</span>`);
  E.K(frz, "o", [[FREEZE, 0], [FREEZE + .05, 1], [IN - .3, 1], [IN - .2, 0]]); E.S(FREEZE, "scratch", .7);

  // ================= scene 2: inside her head =================
  const B = E.scene("brain", IN, OUT, "dark"); E.cur = B; const Q = B.el;
  E.wipe(IN);
  E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse at 50% 40%,#3a2438,#1c1020 70%)");
  // brain-tissue walls
  const walls = E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;opacity:.25");
  walls.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920" fill="none" stroke="${BRAIN}" stroke-width="10" stroke-linecap="round">${Array.from({ length: 14 }, (_, i) => `<path d="M${(i % 2) * 1000 - 20} ${80 + i * 135} q60 -50 120 0 t120 0 t120 0"/>`).join("")}</svg>`;
  // red alarm wash + beacon
  const wash = E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:rgba(255,40,60,.22);z-index:1;opacity:0");
  E.F(t => { wash.style.opacity = t > B1 - .2 ? (Math.floor(t * 3) % 2 ? .9 : .15) : 0; });
  const beacon = E.el(Q, "abs", "left:490px;top:300px;width:100px;height:70px;border-radius:50px 50px 8px 8px;background:radial-gradient(circle at 50% 70%,#ff8a8a,#e0202e);z-index:6;box-shadow:0 0 60px 20px rgba(255,40,60,.5)");
  E.F(t => { beacon.style.filter = `brightness(${Math.floor(t * 3) % 2 ? 1.4 : .8})`; });
  E.clip(IN + .2, "sfx/elx-speaker-chime.wav", { vol: .5 });
  for (let t = B1 - .2; t < BTN; t += 1.6) E.S(t, "blare", .25);
  // the main monitor: a live feed of Sal, waiting
  const mon = E.el(Q, "abs", "left:150px;top:400px;width:780px;height:480px;border-radius:24px;background:#0b0f14;box-shadow:0 0 0 16px #2a2f38,0 0 50px rgba(120,200,255,.35);overflow:hidden;z-index:2");
  const feed = E.el(mon, "abs", "left:0;top:0;width:780px;height:480px;background:linear-gradient(180deg,#3d2a22,#2c1f1a);overflow:hidden");
  E.img(feed, "salw", "position:absolute;left:190px;top:10px;width:400px;height:auto;filter:saturate(.7) contrast(1.1)");
  E.el(feed, "abs", "left:0;top:0;width:780px;height:480px;background:repeating-linear-gradient(0deg,rgba(0,0,0,.18) 0 3px,transparent 3px 6px)");
  E.el(mon, "abs", `left:20px;top:16px;padding:4px 14px;border-radius:8px;background:${RED};color:#fff;font-weight:900;font-size:26px`, "● LIVE");
  const wait = E.el(mon, "abs", `left:0;bottom:0;width:780px;padding:12px 0;text-align:center;background:rgba(0,0,0,.7);font-weight:900;font-size:40px;color:#fff;font-variant-numeric:tabular-nums`);
  E.F(t => { const s = 2 + Math.floor((t - IN) * 1.1); wait.textContent = `BARTENDER WAITING: ${s}s`; wait.style.color = s >= 7 ? RED : s >= 5 ? GOLD : "#fff"; });
  E.el(Q, "abs", `left:150px;top:910px;width:780px;text-align:center;font-weight:800;font-size:34px;color:${GOLD};z-index:2;letter-spacing:.04em`, "INCOMING: “WHAT CAN I GET YOU?”");

  // the filing cabinet
  const cab = E.el(Q, "abs", "left:60px;top:1010px;width:560px;height:620px;border-radius:14px;background:linear-gradient(180deg,#8a93a0,#6a7380);box-shadow:0 20px 40px rgba(0,0,0,.5);z-index:2");
  const DR = [["DRINK NAMES", "0 files", true], ["SONG LYRICS, 2009", "4,210 files"], ["CRINGE MEMORIES", "88,203 files"]];
  const drawers = DR.map(([lab, n, empty], i) => {
    const d = E.el(cab, "abs", `left:20px;top:${20 + i * 200}px;width:520px;height:180px;border-radius:10px;background:linear-gradient(180deg,#b0b8c4,#949daa);box-shadow:inset 0 -6px 0 rgba(0,0,0,.15)`);
    E.el(d, "abs", `left:140px;top:30px;width:240px;padding:8px 0;border-radius:6px;background:#fffbe8;text-align:center;font-weight:900;font-size:28px;color:${INK};white-space:nowrap`, lab);
    E.el(d, "abs", `left:140px;top:92px;width:240px;text-align:center;font-weight:800;font-size:26px;color:${empty ? RED : INK}`, n);
    E.el(d, "abs", "left:220px;top:136px;width:80px;height:20px;border-radius:10px;background:#5a626e");
    if (!empty) { const papers = E.el(d, "abs", "left:30px;top:-26px;width:460px;height:30px"); papers.innerHTML = `<svg viewBox="0 0 460 30" width="460" height="30">${Array.from({ length: 12 }, (_, k) => `<rect x="${k * 38}" y="${(k % 3) * 4}" width="30" height="30" fill="#fffbe8" transform="rotate(${(k % 5) - 2} ${k * 38 + 15} 15)"/>`).join("")}</svg>`; }
    return d;
  });
  // DRINK NAMES drawer slides open: empty, a moth flies out
  const open = drawers[0];
  E.K(open, "x", [[OPEN, 0], [OPEN + .35, 120, "back"]]); E.K(open, "y", [[OPEN, 0], [OPEN + .35, 30, "out"]]); open.style.zIndex = 3;
  E.S(OPEN, "creak", .8);
  const moth = E.el(Q, "abs", "left:400px;top:1040px;width:90px;height:60px;z-index:7;opacity:0");
  moth.innerHTML = `<svg viewBox="0 0 90 60" width="90" height="60"><ellipse cx="45" cy="32" rx="8" ry="20" fill="#6a5a4a"/><path id="wl" d="M40 28 Q5 0 8 40 Q25 48 40 36 Z" fill="#b8a890"/><path id="wr" d="M50 28 Q85 0 82 40 Q65 48 50 36 Z" fill="#b8a890"/></svg>`;
  E.K(moth, "o", [[OPEN + .3, 0], [OPEN + .4, 1], [OPEN + 2.2, 1], [OPEN + 2.5, 0]]); E.K(moth, "x", [[OPEN + .3, 0], [OPEN + 2.5, 360, "io"]]); E.K(moth, "y", [[OPEN + .3, 0], [OPEN + 2.5, -500, "out"]]);
  E.F(t => { const s = .6 + .4 * Math.abs(Math.sin(t * 22)); moth.querySelector("#wl").setAttribute("transform", `translate(40 0) scale(${s} 1) translate(-40 0)`); moth.querySelector("#wr").setAttribute("transform", `translate(50 0) scale(${s} 1) translate(-50 0)`); });
  const zero = E.el(Q, "abs", `left:60px;top:970px;padding:6px 16px;border-radius:12px;background:${RED};color:#fff;font-weight:900;font-size:34px;z-index:8;opacity:0`, "📂 EMPTY");
  E.pop(zero, B3, { from: .4, dur: .3 }); E.K(zero, "o", [[B3, 0], [B3 + .1, 1], [OUT, 1]]);

  // the SPEAK console + the big red button + the printer
  const con = E.el(Q, "abs", "left:660px;top:1250px;width:380px;height:380px;border-radius:20px;background:linear-gradient(180deg,#4a5260,#343a44);box-shadow:0 20px 40px rgba(0,0,0,.5);z-index:2");
  E.el(con, "abs", `left:0;top:24px;width:380px;text-align:center;font-weight:900;font-size:30px;color:${GOLD};letter-spacing:.08em`, "SAY SOMETHING");
  const btn = E.el(con, "abs", "left:100px;top:90px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#ff7a7a,#d01020);box-shadow:0 12px 0 #8a0a14,0 0 40px rgba(255,40,60,.5)");
  E.K(btn, "y", [[BTN, 0], [BTN + .08, 12], [BTN + .3, 0]]); E.S(BTN + .05, "slam", .8); E.shake(BTN + .05, 12, .3);
  const slot = E.el(Q, "abs", "left:700px;top:1600px;width:300px;height:20px;border-radius:10px;background:#111;z-index:3");
  const slip = E.el(Q, "abs", `left:720px;top:1600px;width:260px;height:0;overflow:hidden;background:#fffbe8;z-index:3;box-shadow:0 10px 20px rgba(0,0,0,.4)`);
  E.el(slip, "", `padding:20px 14px;text-align:center;font-family:'Courier New',monospace;font-weight:900;font-size:34px;color:${INK};line-height:1.1`, "SAME AS<br>LAST TIME");
  E.K(slip, "h", [[SLIP, 0], [SLIP + .6, 130, "lin"]]); E.S(SLIP, "tick", .6); E.S(SLIP + .2, "tick", .6); E.S(SLIP + .4, "tick", .6);
  E.K(slip, "s", [[SLIP + .7, 1], [SLIP + 1.0, 1.25, "back"]]); slip.style.transformOrigin = "50% 0";

  // the crew: little brain-blob workers in hard hats
  const worker = (x, y, hat, flip = false) => {
    const w = E.el(Q, "abs", `left:${x}px;top:${y}px;width:120px;height:170px;z-index:5`);
    const inner = E.el(w, "abs", `left:0;top:0;width:120px;height:170px;transform-origin:50% 100%;${flip ? "transform:scaleX(-1)" : ""}`);
    inner.innerHTML = `<svg viewBox="0 0 120 170" width="120" height="170"><g class="legs"><rect x="36" y="120" width="14" height="44" rx="7" fill="#c9708e"/><rect x="70" y="120" width="14" height="44" rx="7" fill="#c9708e"/></g>` +
      `<path class="arm" d="M18 80 L-6 40" stroke="#c9708e" stroke-width="12" stroke-linecap="round"/><path class="arm" d="M102 80 L126 40" stroke="#c9708e" stroke-width="12" stroke-linecap="round"/>` +
      `<ellipse cx="60" cy="86" rx="46" ry="42" fill="${BRAIN}"/><path d="M28 80 q10 -14 20 0 t20 0 t20 0 M34 102 q10 -12 20 0 t20 0" stroke="#e07a9a" stroke-width="4" fill="none"/>` +
      `<circle cx="46" cy="76" r="10" fill="#fff"/><circle cx="74" cy="76" r="10" fill="#fff"/><circle cx="46" cy="78" r="5" fill="#222"/><circle cx="74" cy="78" r="5" fill="#222"/><ellipse cx="60" cy="100" rx="9" ry="11" fill="#5a1a2a"/>` +
      `<path d="M20 50 Q60 10 100 50 Z" fill="${hat}"/><rect x="14" y="46" width="92" height="10" rx="5" fill="${hat}"/></svg>`;
    return { w, inner };
  };
  const crew = [worker(120, 820, GOLD), worker(760, 860, "#ffb03a", true), worker(300, 1640, GOLD), worker(820, 1100, "#ffb03a", true)];
  E.F(t => crew.forEach(({ inner }, i) => {
    const run = Math.sin(t * 18 + i * 2);
    inner.querySelectorAll(".legs rect").forEach((l, k) => l.setAttribute("transform", `rotate(${(k ? 1 : -1) * run * 20} ${k ? 77 : 43} 120)`));
    inner.querySelectorAll(".arm").forEach((a, k) => a.setAttribute("transform", `rotate(${Math.sin(t * 14 + k + i) * 18} ${k ? 102 : 18} 80)`));
  }));
  crew.forEach(({ w }, i) => E.K(w, "x", [[IN, 0], ...Array.from({ length: 8 }, (_, k) => [IN + .6 + k * 1.2, (k % 2 ? -1 : 1) * (60 + i * 25), "io"])]));
  E.K(crew[3].w, "x", [[BTN - .8, 0], [BTN - .1, -120, "in"]]); E.K(crew[3].w, "y", [[BTN - .5, 0], [BTN - .25, -80, "out"], [BTN, 0, "in"]]);

  // crew bubbles + voices
  const tiny = (html, x, y, t0, t1, tail = 60) => {
    const b = E.el(Q, "abs", `left:${x}px;top:${y}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:#fff;border-radius:24px;padding:12px 22px 16px;box-shadow:0 10px 24px rgba(0,0,0,.4);font-weight:900;font-size:44px;line-height:1.05;color:${INK};white-space:nowrap`, html);
    E.el(box, "abs", `left:${tail - 16}px;bottom:-14px;width:32px;height:32px;background:#fff;transform:rotate(45deg);border-radius:4px`);
    E.pop(b, t0, { from: .3, dur: .25 }); E.K(b, "o", [[t0, 0], [t0 + .06, 1], [t1 - .1, 1], [t1, 0]]);
  };
  tiny("We’ve got nothing!<br>NOTHING!", 80, 660, B1, B2 - .1);
  tiny("Check the<br>drinks folder!", 560, 700, B2, B3 - .1, 240);
  tiny("It’s EMPTY!", 140, 1480, B3, B4 - .1);
  tiny("Say something!<br>ANYTHING!", 520, 940, B4, OUT - .3, 300);
  E.clip(B1, "voices/sk32/b1.wav", { vol: 1.3 }); E.clip(B2, "voices/sk32/b2.wav", { vol: 1.3 }); E.clip(B3, "voices/sk32/b3.wav", { vol: 1.3 }); E.clip(B4, "voices/sk32/b4.wav", { vol: 1.3 });

  // ================= scene 3: back at the bar =================
  const C = E.scene("bar2", OUT, DUR, "dark"); E.cur = C;
  E.wipe(OUT);
  const b2 = bar(C.el, [["ask", 718, 1113], ["oops", 650, 1131]], [["salw", 754, 1104], ["salf", 865, 1133]]);
  E.F(t => {
    const hp = t >= OOPS ? "oops" : "ask", sp = t >= S2 - .2 ? "salf" : "salw";
    b2.herEls.ask.style.opacity = hp === "ask" ? 1 : 0; b2.herEls.oops.style.opacity = hp === "oops" ? 1 : 0;
    b2.salEls.salw.style.opacity = sp === "salw" ? 1 : 0; b2.salEls.salf.style.opacity = sp === "salf" ? 1 : 0;
    let y = Math.sin(t * 2) * 4; for (const k of [G1, OOPS]) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 18;
    b2.her.style.transform = `translateY(${y}px)`;
    b2.sal.style.transform = `translateY(${t >= S2 - .2 ? 0 : Math.sin(t * 2 + 1) * 4}px)`;
  });
  // a small inset: the control room, now in total meltdown
  const inset = E.el(C.el, "abs", `left:40px;top:560px;width:300px;height:300px;border-radius:50%;overflow:hidden;border:8px solid ${RED};background:#3a1020;z-index:8;opacity:0;box-shadow:0 0 40px rgba(255,40,60,.6)`);
  inset.innerHTML = `<div style="position:absolute;left:0;top:110px;width:300px;text-align:center;font-weight:900;font-size:44px;color:#fff">🚨 ABORT</div><div style="position:absolute;left:0;top:170px;width:300px;text-align:center;font-weight:800;font-size:26px;color:${GOLD}">ALL STAFF TO<br>THE EXITS</div>`;
  E.K(inset, "o", [[OOPS, 0], [OOPS + .1, 1]]); E.K(inset, "s", [[OOPS, .3], [OOPS + .3, 1, "back"]]); E.F(t => { if (t >= OOPS) inset.style.filter = `brightness(${Math.floor(t * 4) % 2 ? 1.3 : .8})`; });
  E.S(OOPS, "blare", .5);
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 52, italic = false, dark = false } = o;
    const b = E.el(C.el, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Uh… same as<br>last time!", { left: 60, top: 700, w: 460, tail: 260, t0: G1, t1: S2 - .1 });
  bubble("…you’ve never<br>been here.", { left: 520, top: 480, w: 480, tail: 250, t0: S2, t1: DUR, dark: true, italic: true });
  E.clip(G1 + .05, "voices/sk32/g1.wav", { vol: 1.5 }); E.clip(S2 + .05, "voices/sk32/s2.wav", { vol: 1.7 });
  const stampBox = E.el(C.el, "abs", "left:0;top:1380px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "BRAIN.EXE HAS STOPPED.", STAMP, { size: 66, rot: -5, bg: CORAL, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // back to scene 1 for the question + title
  E.cur = A;
  const bq = E.el(A.el, "abs", `left:470px;top:480px;width:500px;z-index:9;transform-origin:250px 100%`);
  const bqb = E.el(bq, "", `position:relative;background:#1b2330;border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:54px;line-height:1.08;color:#fff;text-align:center`, "Hi! What can<br>I get you?");
  E.el(bqb, "abs", "left:228px;bottom:-20px;width:44px;height:44px;background:#1b2330;transform:rotate(45deg);border-radius:6px");
  E.pop(bq, S1, { from: .3, dur: .3 }); E.S(S1 + .02, "pop", .4);
  E.clip(S1 + .05, "voices/sk32/s1.wav", { vol: 1.6 });
  const titleBox = E.el(A.el, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "When the bartender *asks:*", { size: 62, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
