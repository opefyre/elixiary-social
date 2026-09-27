// SK.40 "Just one espresso martini." (International Coffee Day) — 11 PM at the bar: "One espresso martini, please! What's
// the worst that could happen?" Then bed. The red bedside clock races: 00:31 sheep counted 4,812 · 01:47 ceiling cracks 214 ·
// 02:58 added to cart: a kayak · 03:40 socks sorted by colour · 04:55 replayed every embarrassing moment since 2009 · 06:58
// finally asleep · 07:00 ALARM. "…I need a coffee."  Voices: Higgsfield TTS (her: Kayla).
export const meta = {
  id: "sk40-espresso-martini",
  images: { ask: "cutouts/cust_ask.webp", sal: "cutouts/salc_wait.webp", awake: "cutouts/em_awake.webp", wired: "cutouts/em_wired.webp", asleep: "cutouts/em_asleep.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", RED = "#ff3b3b", COFFEE = "#3a2418";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const G1 = .4, SLIDE = 3.4, BED = 4.6, E1 = 5.6, E2 = 7.2, E3 = 8.8, E4 = 10.4, E5 = 12.0, SLEEP = 13.6, ALARM = 15.2, G2 = 15.9, STAMP = 17.4, DUR = 20.4;
  E.music({ bpm: 96, root: 58, seed: 40, prog: [[0, 3, 7], [5, 8, 12], [7, 10, 14], [3, 7, 10]], until: SLEEP });
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);

  // ================= scene 1: the bar, 11 PM =================
  const A = E.scene("bar", 0, BED, "dark"); E.cur = A; const P = A.el;
  E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2c1f1a,#3d2a22 60%,#1e1512)");
  const shelf = E.el(P, "abs", "left:0;top:560px;width:1080px;height:420px;opacity:.6");
  let s = ""; for (let r = 0; r < 2; r++) for (let i = 0; i < 12; i++) { const c = ["#c77d3a", "#7ab04c", "#e4d4a8", "#9a2a3a", "#4a82b8"][(i + r) % 5], h = 100 + ((i * 29 + r * 7) % 50); s += `<rect x="${24 + i * 88}" y="${r * 200 + 180 - h}" width="42" height="${h}" rx="9" fill="${c}"/>`; }
  shelf.innerHTML = `<svg viewBox="0 0 1080 420" width="1080" height="420">${s}<rect x="0" y="180" width="1080" height="12" fill="#7a5238"/><rect x="0" y="380" width="1080" height="12" fill="#7a5238"/></svg>`;
  const SH = 880, SW = SH * 754 / 1104;
  const sal = E.el(P, "abs", `left:${780 - SW / 2}px;top:${1540 - SH}px;width:${SW}px;height:${SH}px`);
  E.img(sal, "sal", `width:${SW}px;height:${SH}px`);
  E.el(P, "abs", "left:0;top:1500px;width:1080px;height:420px;background:linear-gradient(180deg,#6e4630,#4a2e1f);box-shadow:inset 0 10px 0 #8a5a3c;z-index:2");
  const HH = 1000, HW = HH * 718 / 1113;
  const her = E.el(P, "abs", `left:${300 - HW / 2}px;top:${1940 - HH}px;width:${HW}px;height:${HH}px;z-index:3`);
  const herIn = E.el(her, "abs", `left:0;top:0;width:${HW}px;height:${HH}px`);
  E.img(herIn, "ask", `width:${HW}px;height:${HH}px`);
  E.F(t => { herIn.style.transform = `translateY(${Math.sin(t * 2) * 4}px)`; });
  const em = E.el(P, "abs", "left:560px;top:1330px;width:150px;height:190px;z-index:4");
  em.innerHTML = `<svg viewBox="0 0 150 190" width="150" height="190"><path d="M8 10 L142 10 L75 100 Z" fill="${COFFEE}" stroke="rgba(255,255,255,.7)" stroke-width="4"/><path d="M22 18 H128 L118 32 H32 Z" fill="#d9b68a"/><ellipse cx="62" cy="22" rx="8" ry="5" fill="#2a160c"/><ellipse cx="80" cy="24" rx="8" ry="5" fill="#2a160c"/><ellipse cx="96" cy="21" rx="8" ry="5" fill="#2a160c"/><path d="M75 100 V176 M40 180 H110" stroke="rgba(255,255,255,.8)" stroke-width="6"/></svg>`;
  E.K(em, "x", [[SLIDE, 400], [SLIDE + .45, 0, "out"]]); E.clip(SLIDE, "sfx/elx-glass-clink.wav", { vol: .7 }); E.S(SLIDE, "swish", .6);
  E.clip(0, "sfx/elx-lounge.wav", { vol: .25, to: BED, duck: true });

  // ================= scene 2: bed, all night =================
  const B = E.scene("bed", BED, DUR, "dark"); E.cur = B; const Q = B.el;
  E.wipe(BED);
  const room = E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#141a2e,#1c2440)");
  // dawn creeping in near the end
  const dawn = E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#f0b88a,#8aa8d8);opacity:0");
  E.F(t => { dawn.style.opacity = .55 * seg(t, E5, SLEEP + 1 - E5); });
  // the window with the moon
  const win = E.el(Q, "abs", "left:70px;top:620px;width:300px;height:380px;border-radius:8px;overflow:hidden;box-shadow:0 0 0 12px #2a3050");
  const sky = E.el(win, "abs", "left:0;top:0;width:300px;height:380px;background:#0e1430");
  const moon = E.el(win, "abs", "left:180px;top:60px;width:70px;height:70px;border-radius:50%;background:#e8ecf4;box-shadow:0 0 30px rgba(232,236,244,.6)");
  E.el(win, "abs", "left:146px;top:0;width:8px;height:380px;background:#2a3050");
  E.F(t => { const v = seg(t, BED, SLEEP + 1 - BED); moon.style.transform = `translate(${-v * 200}px,${v * 260}px)`; sky.style.background = `rgb(${Math.round(14 + 200 * seg(t, E5, 2.5))},${Math.round(20 + 150 * seg(t, E5, 2.5))},${Math.round(48 + 150 * seg(t, E5, 2.5))})`; });
  // ceiling cracks (lit up at E2)
  const cracks = E.el(Q, "abs", "left:420px;top:600px;width:600px;height:300px;opacity:.18");
  cracks.innerHTML = `<svg viewBox="0 0 600 300" width="600" height="300" fill="none" stroke="#c8d0e8" stroke-width="3" stroke-linecap="round"><path d="M20 40 L90 70 L130 50 L210 90 M90 70 L110 130 L170 150 M300 30 L340 80 L420 70 L470 120 L560 100 M340 80 L330 160 L390 200 M150 240 L230 220 L260 260 L340 250"/></svg>`;
  E.K(cracks, "o", [[E2, .18], [E2 + .2, 1], [E3 - .2, 1], [E3, .18]]);
  // the bed frame
  E.el(Q, "abs", "left:20px;top:1040px;width:1040px;height:360px;border-radius:40px 40px 0 0;background:linear-gradient(180deg,#5a4a6a,#3a3048)");
  E.el(Q, "abs", "left:0;top:1640px;width:1080px;height:280px;background:#2a2238");
  // her, in three states
  const BW = 1000;
  const bed = E.el(Q, "abs", `left:40px;top:${1720 - BW * 688 / 1024}px;width:${BW}px;height:${BW * 688 / 1024}px;z-index:2`);
  const bIn = E.el(bed, "abs", `left:0;top:0;width:${BW}px;height:${BW * 688 / 1024}px;transform-origin:50% 100%`);
  const imgs = { awake: E.img(bIn, "awake", `position:absolute;left:0;top:0;width:${BW}px;height:auto`),
    wired: E.img(bIn, "wired", `position:absolute;left:${(BW - BW * 849 / 1024) / 2}px;top:0;width:${BW * 849 / 1024}px;height:auto`),
    asleep: E.img(bIn, "asleep", `position:absolute;left:0;top:0;width:${BW}px;height:auto`) };
  const BP = [[0, "awake"], [E3 - .1, "wired"], [E5 - .1, "awake"], [SLEEP, "asleep"], [ALARM, "wired"]];
  E.F(t => {
    const f = at(BP, t); for (const n in imgs) imgs[n].style.opacity = n === f ? 1 : 0;
    let y = 0, r = 0;
    if (f === "awake") y = Math.sin(t * 30) * 1.5;                                                  // vibrating with caffeine
    if (f === "wired") r = Math.sin(t * 22) * .8;
    if (f === "asleep") y = Math.sin(t * 1.6) * 5;
    for (const [k] of BP.slice(1)) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 18;
    if (t >= ALARM && t < ALARM + .5) y -= Math.abs(Math.sin((t - ALARM) * 20)) * 30;
    bIn.style.transform = `translateY(${y}px) rotate(${r}deg)`;
  });
  // the bedside clock (7-segment red), racing
  const clock = E.el(Q, "abs", `left:640px;top:380px;padding:14px 30px;border-radius:18px;background:#0a0a0e;box-shadow:0 0 0 6px #22222a,0 0 50px rgba(255,59,59,.25);z-index:5;font-family:'Courier New',monospace;font-weight:900;font-size:92px;color:${RED};letter-spacing:.04em;text-shadow:0 0 16px ${RED}`);
  const TIMES = [[BED, 23 * 60 + 48], [E1, 24 * 60 + 31], [E2, 25 * 60 + 47], [E3, 26 * 60 + 58], [E4, 27 * 60 + 40], [E5, 28 * 60 + 55], [SLEEP, 30 * 60 + 58], [ALARM, 31 * 60]];
  E.F(t => {
    let m = TIMES[0][1];
    for (let i = 1; i < TIMES.length; i++) { const [a, ma] = TIMES[i - 1], [b, mb] = TIMES[i]; if (t >= a) m = t >= b ? mb : ma + (mb - ma) * seg(t, a, b - a); }
    m = Math.round(m) % 1440; clock.textContent = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    clock.style.opacity = t >= ALARM ? (Math.floor(t * 4) % 2 ? 1 : .3) : 1;
  });
  // heart rate + caffeine meter
  const hr = E.el(Q, "abs", `left:60px;top:400px;padding:10px 20px;border-radius:14px;background:rgba(255,255,255,.1);color:#fff;font-weight:900;font-size:36px;z-index:5;font-variant-numeric:tabular-nums`);
  E.F(t => { const b = Math.round(t < SLEEP ? 118 + 14 * Math.abs(Math.sin(t * 3)) : 58); hr.innerHTML = `<span style="color:${CORAL}">♥</span> ${b} bpm`; });
  const caf = E.el(Q, "abs", `left:60px;top:470px;width:420px;height:46px;border-radius:23px;background:rgba(255,255,255,.12);z-index:5;overflow:hidden`);
  const cafF = E.el(caf, "abs", `left:0;top:0;height:46px;background:linear-gradient(90deg,#8a5a3a,${GOLD})`);
  E.el(caf, "abs", "left:16px;top:0;line-height:46px;color:#fff;font-weight:900;font-size:26px", "☕ CAFFEINE");
  E.F(t => { cafF.style.width = `${100 - 85 * seg(t, BED, SLEEP - BED)}%`; });
  // the night's achievements
  const ev = (t0, html, y) => {
    const c = E.el(Q, "abs", `left:0;top:${y}px;width:1080px;text-align:center;z-index:6;opacity:0`, `<span style="display:inline-block;padding:14px 28px;border-radius:22px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:44px;box-shadow:0 12px 30px rgba(0,0,0,.4)">${html}</span>`);
    E.K(c, "o", [[t0, 0], [t0 + .12, 1], [t0 + 1.45, 1], [t0 + 1.6, 0]]); E.K(c, "s", [[t0, .6], [t0 + .25, 1, "back"]]); E.S(t0, "pop", .5);
  };
  ev(E1, "🐑 Sheep counted: <span id='sh'>0</span>", 780); ev(E2, "🔍 Ceiling cracks: 214", 950); ev(E3, "🛒 Added to cart: a kayak", 780);
  ev(E4, "🧦 Socks: sorted by colour", 780); ev(E5, "🧠 Replayed every cringe<br>moment since 2009", 760);
  const shN = Q.querySelector("#sh"); E.F(t => { if (shN) shN.textContent = Math.round(4812 * seg(t, E1, 1.2)).toLocaleString("en-US"); });
  // sheep hopping over a fence (E1)
  const sheep = E.el(Q, "abs", "left:0;top:880px;width:1080px;height:200px;z-index:6;opacity:0");
  sheep.innerHTML = `<svg viewBox="0 0 1080 200" width="1080" height="200"><rect x="520" y="120" width="40" height="80" fill="#8a6a4a"/><rect x="480" y="140" width="120" height="12" fill="#8a6a4a"/><rect x="480" y="170" width="120" height="12" fill="#8a6a4a"/>${[0, 1, 2].map(i => `<g class="sp"><ellipse cx="0" cy="0" rx="44" ry="30" fill="#fff"/><circle cx="-18" cy="-14" r="18" fill="#fff"/><circle cx="16" cy="-16" r="18" fill="#fff"/><circle cx="42" cy="-6" r="16" fill="#333"/><rect x="-26" y="22" width="8" height="24" fill="#333"/><rect x="16" y="22" width="8" height="24" fill="#333"/></g>`).join("")}</svg>`;
  const sps = [...sheep.querySelectorAll(".sp")];
  E.K(sheep, "o", [[E1, 0], [E1 + .1, 1], [E2 - .2, 1], [E2, 0]]);
  E.F(t => sps.forEach((g, i) => { const u = ((t - E1) * 1.6 + i / 3) % 1; g.setAttribute("transform", `translate(${200 + u * 700} ${140 - Math.sin(u * Math.PI) * 110})`); }));
  // socks rainbow (E4)
  const socks = E.el(Q, "abs", "left:190px;top:900px;width:700px;height:140px;z-index:6;opacity:0");
  socks.innerHTML = `<svg viewBox="0 0 700 140" width="700" height="140">${["#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#5e35b1", "#d81b60"].map((c, i) => `<path d="M${20 + i * 96} 10 h40 v80 q0 30 -30 30 h-30 v-30 h20 z" fill="${c}"/>`).join("")}</svg>`;
  E.K(socks, "o", [[E4 + .2, 0], [E4 + .4, 1], [E5 - .2, 1], [E5, 0]]);
  // Zzz
  const zz = E.el(Q, "abs", `left:620px;top:1000px;font-weight:900;font-size:80px;color:#fff;z-index:6;opacity:0`, "z Z z");
  E.K(zz, "o", [[SLEEP + .2, 0], [SLEEP + .4, 1], [ALARM - .1, 1], [ALARM, 0]]); E.K(zz, "y", [[SLEEP + .2, 40], [ALARM, -60, "lin"]]);
  E.clip(SLEEP + .3, "sfx/elx-snore.wav", { vol: .7, to: ALARM - SLEEP - .3 });
  E.clip(ALARM, "sfx/elx-phone-ring.wav", { vol: 1, to: 1.2 }); E.shake(ALARM, 16, .4); E.flash(ALARM, "#ffffff", .5, .2);
  for (let t = E1; t < SLEEP; t += 1.4) E.S(t, "tick", .3);

  // ================= bubbles & voices =================
  const bubble = (Pn, html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(Pn, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble(P, "One espresso martini, please!<br>What’s the worst that could happen?", { left: 40, top: 640, w: 760, tail: 260, t0: G1, t1: BED, size: 44 });
  bubble(Q, "…I need a coffee.", { left: 300, top: 760, w: 520, tail: 260, t0: G2, t1: DUR, italic: true, size: 58 });
  E.clip(G1 + .05, "voices/sk40/g1.wav", { vol: 1.5 }); E.clip(G2 + .05, "voices/sk40/g2.wav", { vol: 1.7 });

  // ================= stamp + title =================
  const stampBox = E.el(Q, "abs", "left:0;top:1450px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "HAPPY COFFEE DAY ☕", STAMP, { size: 80, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  E.cur = A;
  const titleBox = E.el(P, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "“Just one *espresso martini.*”", { size: 54, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
