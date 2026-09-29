// SK.52 "When you hear the bell." — 00:55, a calm bar. DING-DING-DING. Everyone freezes: LAST ORDERS?! The bar becomes a
// stock-exchange trading floor — tickers (PINTS ▲412%, SHOTS ▲890%, WATER ▼), a rocketing chart, BUY! BUY! BUY! — "FOUR
// PINTS!" "SIX SHOTS!" "Everything! Just… everything!" "Two of whatever she's having!" The bar fills with drinks. Then the
// bell rings again — from Sal's pocket. "…Hello? Mum?" The neon behind him: OPEN TILL 4 AM. IT WAS HIS RINGTONE.
// Voices: ElevenLabs (Jessica; Rico: Liam; Laura; Alex; Sal: Chris).
export const meta = {
  id: "sk52-last-orders",
  images: { wait: "cutouts/salc_wait.webp", ear: "cutouts/salb_ear.webp", scream: "cutouts/cust_scream.webp", rico: "cutouts/friend_flip.webp",
    lunge: "cutouts/maya_lunge.webp", alex: "cutouts/guy_order.webp", crowd: "cutouts/crowd_hands.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", GRN = "#34d17a", RED = "#ff4a5a";
  E.episode(-16);
  const BELL = 1.8, PANIC = 2.8, O1 = 3.1, O2 = 4.9, O3 = 6.7, O4 = 8.7, PILE = 10.2, RING2 = 13.2, S1 = 13.9, NEON = 15.6, STAMP = 17.0, DUR = 20.4;
  E.music({ bpm: 140, root: 60, seed: 52, prog: [[0, 4, 7], [7, 11, 14], [5, 9, 12], [7, 11, 14]], until: RING2 });
  const S = E.scene("bar", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1200;
  const panic = t => t >= PANIC && t < RING2;

  // ================= the bar =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2c1f1a,#3d2a22 60%,#1e1512)");
  const wash = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:0");
  E.F(t => { wash.style.background = panic(t) ? (Math.floor(t * 4) % 2 ? "rgba(52,209,122,.14)" : "rgba(255,74,90,.14)") : "transparent"; });
  const shelf = E.el(R, "abs", "left:0;top:420px;width:1080px;height:520px;opacity:.5");
  let s = ""; for (let r = 0; r < 2; r++) for (let i = 0; i < 12; i++) { const c = ["#c77d3a", "#7ab04c", "#e4d4a8", "#9a2a3a", "#4a82b8"][(i + r) % 5], h = 100 + ((i * 29 + r * 7) % 50); s += `<rect x="${24 + i * 88}" y="${r * 220 + 190 - h}" width="42" height="${h}" rx="9" fill="${c}"/>`; }
  shelf.innerHTML = `<svg viewBox="0 0 1080 520" width="1080" height="520">${s}<rect x="0" y="190" width="1080" height="12" fill="#7a5238"/><rect x="0" y="410" width="1080" height="12" fill="#7a5238"/></svg>`;
  // the neon (off until the end)
  const neon = E.el(R, "abs", `left:0;top:330px;width:1080px;text-align:center;font-family:'Pacifico','Noto Sans',cursive;font-weight:800;font-size:72px;color:#3a2a30;z-index:1`, "open till 4 am");
  E.F(t => { const on = t >= NEON; neon.style.color = on ? "#eaffd8" : "rgba(0,0,0,0)"; neon.style.textShadow = on ? "0 0 12px #9bff6a,0 0 34px #9bff6a,0 0 60px #4fd03a" : "none"; });
  E.S(NEON, "buzz", .7);
  // Sal
  const SH = 760, SW = SH * 754 / 1104, EW = SH * 858 / 926;
  const sal = E.el(R, "abs", `left:${560 - SW / 2}px;top:${TOP + 40 - SH}px;width:${SW}px;height:${SH}px;z-index:2`);
  const sIn = E.el(sal, "abs", `left:0;top:0;width:${SW}px;height:${SH}px`);
  const sW = E.img(sIn, "wait", `position:absolute;left:0;top:0;width:${SW}px;height:${SH}px`);
  const sE = E.img(sIn, "ear", `position:absolute;left:${(SW - EW) / 2}px;top:${SH - SH * 926 / 926}px;width:${EW}px;height:${SH}px`);
  E.F(t => { const ph = t >= S1 - .3; sW.style.opacity = ph ? 0 : 1; sE.style.opacity = ph ? 1 : 0; sIn.style.transform = `translateY(${panic(t) ? Math.sin(t * 25) * 5 : Math.sin(t * 1.6) * 3}px)`; });
  // a phone glowing at his ear
  const ph = E.el(R, "abs", `left:430px;top:${TOP + 40 - SH + 130}px;width:70px;height:120px;border-radius:14px;background:#111;box-shadow:0 0 0 4px #333,0 0 40px 10px rgba(120,200,255,.55);z-index:3;opacity:0`);
  E.K(ph, "o", [[RING2, 0], [RING2 + .1, 1]]); E.F(t => { if (t >= RING2 && t < S1) ph.style.transform = `rotate(${Math.sin(t * 60) * 8}deg)`; else ph.style.transform = "none"; });
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;z-index:3;background:linear-gradient(180deg,#6e4630,#4a2e1f);box-shadow:inset 0 10px 0 #8a5a3c`);
  // the bell icon (sound source unknown until the end)
  const bell = E.el(R, "abs", `left:780px;top:360px;width:240px;text-align:center;font-size:150px;z-index:8;opacity:0`, "🔔");
  E.K(bell, "o", [[BELL, 0], [BELL + .05, 1], [PANIC + .3, 1], [PANIC + .5, 0], [RING2, 0], [RING2 + .05, 1], [S1 + .2, 1], [S1 + .4, 0]]);
  E.F(t => { bell.style.transform = (t >= BELL && t < PANIC + .5) || (t >= RING2 && t < S1 + .4) ? `rotate(${Math.sin(t * 50) * 20}deg)` : "none"; });
  for (let i = 0; i < 6; i++) { E.S(BELL + i * .14, "ding", .9); E.S(RING2 + i * .14, "ding", .8); }
  const lo = E.el(R, "abs", `left:0;top:760px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:12px 30px;border-radius:18px;background:${RED};color:#fff;font-weight:900;font-size:66px">LAST ORDERS?!</span>`);
  E.K(lo, "o", [[BELL + .6, 0], [BELL + .7, 1], [PANIC + .6, 1], [PANIC + .8, 0]]); E.K(lo, "s", [[BELL + .6, 1.8], [BELL + .9, 1, "back"]]); E.shake(BELL + .6, 14, .3);

  // ================= the trading floor overlay =================
  const chart = E.el(R, "abs", "left:40px;top:360px;width:520px;height:300px;border-radius:18px;background:rgba(8,12,18,.88);z-index:6;opacity:0;overflow:hidden");
  chart.innerHTML = `<div style="position:absolute;left:18px;top:12px;font-family:'Courier New',monospace;font-weight:900;font-size:26px;color:${GRN}">PINTS/EUR · LIVE</div><svg viewBox="0 0 520 300" width="520" height="300"><path id="ln" d="" stroke="${GRN}" stroke-width="6" fill="none"/></svg>`;
  const ln = chart.querySelector("#ln");
  E.K(chart, "o", [[PANIC, 0], [PANIC + .2, 1], [RING2 - .2, 1], [RING2, 0]]);
  E.F(t => { const u = seg(t, PANIC, RING2 - PANIC); const n = Math.max(2, Math.floor(u * 40)); let d = ""; for (let i = 0; i < n; i++) { const x = 20 + i * 12, y = 270 - Math.pow(i / 40, 2.2) * 210 - Math.sin(i * 1.7) * 12; d += (i ? " L" : "M") + x + " " + y.toFixed(1); } ln.setAttribute("d", d); });
  const pct = E.el(R, "abs", `left:590px;top:380px;padding:12px 22px;border-radius:16px;background:${GRN};color:#04130a;font-weight:900;font-size:52px;z-index:6;opacity:0;font-variant-numeric:tabular-nums`);
  E.K(pct, "o", [[PANIC + .3, 0], [PANIC + .5, 1], [RING2 - .2, 1], [RING2, 0]]);
  E.F(t => { pct.textContent = `▲ ${Math.round(12 + 900 * Math.pow(seg(t, PANIC, RING2 - PANIC), 1.6))}%`; });
  const buy = E.el(R, "abs", `left:590px;top:490px;font-weight:900;font-size:64px;color:${GOLD};z-index:6;opacity:0;text-shadow:0 4px 14px rgba(0,0,0,.6)`, "BUY! BUY!");
  E.F(t => { buy.style.opacity = panic(t) && t > PANIC + .6 ? (Math.floor(t * 5) % 2 ? 1 : .35) : 0; });
  // ticker tape across the bar front
  const tape = E.el(R, "abs", `left:0;top:${TOP + 12}px;width:1080px;height:70px;overflow:hidden;background:#0a0e14;z-index:4;opacity:0`);
  const tt = E.el(tape, "", `white-space:nowrap;font-family:'Courier New',monospace;font-weight:900;font-size:40px;line-height:70px;color:${GRN}`, "PINTS ▲412% · SHOTS ▲890% · NACHOS ▲230% · SPRITZ ▲177% · WATER <span style='color:#ff4a5a'>▼98%</span> · DIGNITY <span style='color:#ff4a5a'>▼100%</span> · PINTS ▲412% · SHOTS ▲890% · NACHOS ▲230% ·");
  E.K(tape, "o", [[PANIC, 0], [PANIC + .2, 1], [RING2, 1], [RING2 + .3, 0]]);
  E.F(t => { tt.style.transform = `translateX(${-((t - PANIC) * 260) % 1600}px)`; });

  // ================= the crowd + the four loudest =================
  const CRW = 1000, CRH = CRW * 678 / 1003;
  const crowd = E.el(R, "abs", `left:40px;top:${1960 - CRH}px;width:${CRW}px;height:${CRH}px;z-index:4;opacity:0`);
  const crIn = E.el(crowd, "abs", `left:0;top:0;width:${CRW}px;height:${CRH}px`); E.img(crIn, "crowd", `width:${CRW}px;height:${CRH}px`);
  E.K(crowd, "o", [[PANIC, 0], [PANIC + .1, .85], [RING2 + .5, .85], [RING2 + .8, .5]]); E.K(crowd, "y", [[PANIC, 300], [PANIC + .4, 0, "out"]]);
  E.F(t => { crIn.style.transform = panic(t) ? `translateY(${-Math.abs(Math.sin(t * 9)) * 16}px)` : "none"; });
  const LOUD = [["scream", 846, 1118, 230, O1], ["rico", 809, 1053, 820, O2], ["lunge", 681, 980, 300, O3], ["alex", 872, 1121, 800, O4]];
  LOUD.forEach(([n, w, h, cx, t0], i) => {
    const H = n === "lunge" ? 980 : 800, W = H * w / h;
    const c = E.el(R, "abs", `left:${cx - W / 2}px;top:${1960 - H}px;width:${W}px;height:${H}px;z-index:5;opacity:0`);
    const cIn = E.el(c, "abs", `left:0;top:0;width:${W}px;height:${H}px`); E.img(cIn, n, `width:${W}px;height:${H}px`);
    const t1 = i < 3 ? LOUD[i + 1][4] - .1 : RING2;
    E.K(c, "o", [[t0 - .2, 0], [t0 - .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "y", [[t0 - .2, 300], [t0 + .15, 0, "back"]]);
    E.F(t => { cIn.style.transform = `translateY(${-Math.abs(Math.sin(t * 10)) * 10}px)`; });
    E.S(t0 - .2, "whoosh", .4);
  });
  // drinks piling up on the bar
  for (let i = 0; i < 16; i++) {
    const g = E.el(R, "abs", `left:${30 + (i * 67) % 1000}px;top:${TOP - 150 - (i > 7 ? 60 : 0)}px;width:60px;height:110px;z-index:3;opacity:0`);
    const col = ["rgba(240,168,48,.9)", "rgba(220,60,90,.85)", "rgba(120,200,120,.85)", "rgba(255,140,60,.9)"][i % 4];
    g.innerHTML = `<svg viewBox="0 0 60 110" width="60" height="110"><path d="M4 4 H56 L50 106 H10 Z" fill="rgba(255,255,255,.3)" stroke="rgba(255,255,255,.8)" stroke-width="3"/><path d="M8 30 H52 L50 106 H10 Z" fill="${col}"/></svg>`;
    const t0 = PILE + i * .14; E.K(g, "o", [[t0, 0], [t0 + .05, 1]]); E.K(g, "y", [[t0, -80], [t0 + .25, 0, "back"]]); E.S(t0, "tick", .45);
  }
  [["🌮 12 nachos", 60, PILE + .3], ["🍾 a whole bottle", 600, PILE + .9], ["🪣 a bucket. just in case.", 200, PILE + 1.6]].forEach(([txt, x, t0]) => {
    const c = E.el(R, "abs", `left:${x}px;top:900px;padding:10px 22px;border-radius:16px;background:#fff;color:${INK};font-weight:900;font-size:40px;z-index:8;opacity:0;white-space:nowrap`, txt);
    E.K(c, "o", [[t0, 0], [t0 + .1, 1], [RING2 - .2, 1], [RING2, 0]]); E.K(c, "s", [[t0, .5], [t0 + .25, 1, "back"]]); E.S(t0, "pop", .5);
  });
  const ord = E.el(R, "abs", `left:40px;top:680px;padding:8px 20px;border-radius:14px;background:${INK};color:#fff;font-weight:900;font-size:36px;z-index:6;opacity:0;font-variant-numeric:tabular-nums`);
  E.K(ord, "o", [[PANIC, 0], [PANIC + .2, 1], [RING2, 1], [RING2 + .2, 0]]);
  E.F(t => { ord.textContent = `🧾 orders: ${Math.round(47 * seg(t, PANIC, RING2 - PANIC))} in ${Math.round(90 * seg(t, PANIC, RING2 - PANIC))} s`; });
  // the clock
  const clk = E.el(R, "abs", `left:800px;top:260px;padding:6px 18px;border-radius:14px;background:#0a0a0e;color:#ff4a4a;font-family:'Courier New',monospace;font-weight:900;font-size:42px;z-index:6`);
  E.F(t => { clk.textContent = `00:${t < PANIC ? "55" : t < RING2 ? "56" : "57"}`; });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 58, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:900;font-size:${size}px;line-height:1.05;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;font-weight:800;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("FOUR PINTS!", { left: 40, top: 1000, w: 440, tail: 190, t0: O1, t1: O2 - .1 });
  bubble("SIX SHOTS!", { left: 560, top: 1000, w: 420, tail: 260, t0: O2, t1: O3 - .1 });
  bubble("Everything!<br>Just… everything!", { left: 40, top: 960, w: 520, tail: 260, t0: O3, t1: O4 - .1, size: 52 });
  bubble("Two of whatever<br>she’s having!", { left: 500, top: 960, w: 540, tail: 300, t0: O4, t1: PILE + .6, size: 50 });
  bubble("…Hello? Mum? 📱", { left: 90, top: 560, w: 460, tail: 380, t0: S1, t1: DUR, dark: true, italic: true, size: 52 });
  E.clip(O1 + .05, "voices/sk52/j1.wav", { vol: 1.5 }); E.clip(O2 + .05, "voices/sk52/r1.wav", { vol: 1.5 }); E.clip(O3 + .05, "voices/sk52/l1.wav", { vol: 1.5 });
  E.clip(O4 + .05, "voices/sk52/a1.wav", { vol: 1.5 }); E.clip(S1 + .05, "voices/sk52/s1.wav", { vol: 1.7 });
  E.clip(0, "sfx/elx-lounge.wav", { vol: .25, to: PANIC, duck: true });
  E.clip(PANIC, "sfx/crowd-murmur.wav", { vol: .6, to: 6, duck: true }); E.clip(PANIC + 6, "sfx/crowd-murmur.wav", { vol: .6, to: RING2 - PANIC - 6, duck: true });
  E.clip(S1 + .9, "sfx/crowd-groan.wav", { vol: .7 });
  const reveal = E.el(R, "abs", `left:0;top:1040px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 26px;border-radius:18px;background:${CORAL};color:#fff;font-weight:900;font-size:44px">🔔 = Sal’s ringtone</span>`);
  E.K(reveal, "o", [[S1 + 1.0, 0], [S1 + 1.2, 1], [STAMP - .1, 1], [STAMP + .1, 0]]);

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1060px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "IT WAS HIS RINGTONE.", STAMP, { size: 76, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:690px;z-index:8");
  const title = E.text(titleBox, "When you hear *the bell.*", { size: 54, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, PANIC, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
