// SK.39 "The airport bar." — the tourist (SK.34): "One beer, please!" — "That's nineteen euros." Price shock. The departures
// board flips: FR 1234 PARIS — ON TIME → DELAYED 1H → DELAYED 4H. "…make it two." Time-lapse: pints stack up (1… 7), the
// receipt unrolls to the floor, the clock races. "Final call for passenger Gary Pike. Gate twelve is now closing." He's
// taking a selfie with the bartender. GATE CLOSED. A plane takes off outside.  Voices: Higgsfield TTS (him: Bob; bartender:
// Barrett; the announcement: Imogen).
export const meta = {
  id: "sk39-airport-beer",
  images: { happy: "cutouts/tourist_selfie.webp", shock: "cutouts/tourist_shock.webp", resign: "cutouts/tourist_resign.webp", barman: "cutouts/bar_talk.webp", serve: "cutouts/bar_slide.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", AMBER = "#ffb000";
  E.episode(-16);
  const T1 = .4, B1 = 2.0, SHOCK = 3.7, FLIP1 = 5.3, FLIP2 = 6.7, T2 = 8.1, LAPSE = 9.3, LAPSE_END = 13.6, PA = 14.0, SELFIE = 15.0, CLOSEG = 19.2, STAMP = 20.2, DUR = 23.2;
  E.music({ bpm: 98, root: 60, seed: 39, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: PA });
  const S = E.scene("terminal", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1420;

  // ================= the terminal =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#e8eef4,#d8e0e8)");
  // the big window onto the apron
  const win = E.el(R, "abs", "left:0;top:640px;width:1080px;height:520px;overflow:hidden;background:linear-gradient(180deg,#9ed0f0,#dff0fa 70%)");
  win.innerHTML = `<svg viewBox="0 0 1080 520" width="1080" height="520"><rect x="0" y="380" width="1080" height="140" fill="#8a9098"/><path d="M0 440 H1080" stroke="#f4f4f4" stroke-width="6" stroke-dasharray="40 30"/>` +
    `<g transform="translate(680 300)"><path d="M0 60 Q0 40 30 40 H300 Q330 40 340 60 Q330 80 300 80 H30 Q0 80 0 60 Z" fill="#fff"/><path d="M140 60 L90 130 H130 L200 60 Z M140 60 L110 0 H140 L200 60 Z" fill="#dfe6ee"/><path d="M290 40 L320 -10 H340 L330 40 Z" fill="${CORAL}"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${50 + i * 30}" cy="55" r="5" fill="#3a4a5a"/>`).join("")}</g></svg>`;
  const plane = win.querySelector("g");
  E.F(t => { const p = seg(t, CLOSEG + .3, 2.4); plane.setAttribute("transform", `translate(${680 - p * 900} ${300 - p * p * 420}) rotate(${-p * 12})`); });
  [0, 1, 2, 3].forEach(i => E.el(R, "abs", `left:${i * 360 - 10}px;top:640px;width:20px;height:520px;background:#b8c2cc`));
  E.el(R, "abs", "left:0;top:1160px;width:1080px;height:30px;background:#b8c2cc");
  // the departures board (split-flap)
  const board = E.el(R, "abs", "left:60px;top:360px;width:960px;height:250px;border-radius:14px;background:#15181e;box-shadow:0 14px 30px rgba(0,0,0,.3);z-index:3;padding:14px 20px;box-sizing:border-box");
  E.el(board, "", `font-weight:900;font-size:26px;letter-spacing:.3em;color:${AMBER};margin-bottom:8px`, "✈ DEPARTURES");
  const rows = [["LH 402", "BERLIN", "13:40", "BOARDING"], ["FR 1234", "PARIS", "14:05", "ON TIME"], ["BA 77", "LONDON", "14:20", "ON TIME"]].map(([f, c, tm, st], i) => {
    const r = E.el(board, "", `display:flex;gap:18px;font-family:'Courier New',monospace;font-weight:900;font-size:36px;color:${i === 1 ? "#fff" : "#9aa2ac"};padding:6px 10px;border-radius:8px;${i === 1 ? "background:rgba(255,176,0,.14)" : ""}`);
    E.el(r, "", "width:170px", f); E.el(r, "", "width:220px", c); E.el(r, "", "width:130px", tm);
    return E.el(r, "", `flex:1;text-align:right;color:${AMBER}`, st);
  });
  const ST = [[0, "ON TIME"], [FLIP1, "DELAYED 1H"], [FLIP2, "DELAYED 4H"], [PA - .3, "FINAL CALL"], [CLOSEG, "GATE CLOSED"]];
  E.F(t => {
    let s = at(ST, t);
    for (const [k] of ST.slice(1)) if (t >= k && t < k + .35) s = Array.from(s, (ch, i) => ch === " " ? " " : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor((t * 60 + i * 7) % 36)]).join("");
    if (rows[1].__s !== s) { rows[1].textContent = s; rows[1].__s = s; }
    rows[1].style.color = t >= CLOSEG ? "#ff4a4a" : t >= FLIP1 ? AMBER : "#7aff7a";
    rows[1].parentNode.style.background = t >= PA - .3 && t < CLOSEG ? (Math.floor(t * 3) % 2 ? "rgba(255,74,74,.35)" : "rgba(255,176,0,.14)") : "rgba(255,176,0,.14)";
  });
  ST.slice(1).forEach(([k]) => { for (let i = 0; i < 6; i++) E.S(k + i * .05, "tick", .5); });
  rows[0].parentNode.style.opacity = .8;

  // ================= the bar =================
  E.el(R, "abs", `left:0;top:${TOP - 260}px;width:1080px;height:260px;background:linear-gradient(180deg,#3a2a22,#2a1e18)`);
  const menu = E.el(R, "abs", `left:30px;top:640px;width:380px;padding:12px 18px;border-radius:12px;background:#15181e;z-index:3;box-shadow:0 10px 24px rgba(0,0,0,.3);font-weight:800;font-size:30px;color:#fff;line-height:1.35`);
  menu.innerHTML = `<div style="color:${AMBER};letter-spacing:.2em;font-size:22px">SKY LOUNGE ✈ BAR</div><div>🍺 Beer 0.4L <b style="float:right;color:${CORAL}">€19</b></div><div>💧 Water <b style="float:right">€7</b></div><div>🥨 Pretzel <b style="float:right">€11</b></div>`;
  const BMH = 820, BMW = BMH * 827 / 1111, BSW = BMH * 807 / 1115;
  const bm = E.el(R, "abs", `left:${800 - BMW / 2}px;top:${TOP + 60 - BMH}px;width:${BMW}px;height:${BMH}px;z-index:2`);
  const bmIn = E.el(bm, "abs", `left:0;top:0;width:${BMW}px;height:${BMH}px`);
  const bTalk = E.img(bmIn, "barman", `position:absolute;left:0;top:0;width:${BMW}px;height:${BMH}px`);
  const bServe = E.img(bmIn, "serve", `position:absolute;left:${(BMW - BSW) / 2}px;top:0;width:${BSW}px;height:${BMH}px`);
  E.F(t => { const s = (t >= T2 + .5 && t < PA) || t >= SELFIE + 1.5; bTalk.style.opacity = s ? 0 : 1; bServe.style.opacity = s ? 1 : 0; bmIn.style.transform = `translateY(${Math.sin(t * 1.8) * 3}px)`; });
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;z-index:5;background:linear-gradient(180deg,#8a5a3c,#5a3a28);box-shadow:inset 0 14px 0 #a06a48`);
  // pints stacking up on the counter
  const pints = [];
  for (let i = 0; i < 7; i++) {
    const p = E.el(R, "abs", `left:${480 + (i % 4) * 110}px;top:${TOP - 150 - Math.floor(i / 4) * 0}px;width:80px;height:150px;z-index:6;opacity:0`);
    p.innerHTML = `<svg viewBox="0 0 80 150" width="80" height="150"><path d="M6 6 H74 L66 146 H14 Z" fill="rgba(255,255,255,.35)" stroke="rgba(255,255,255,.8)" stroke-width="3"/><path d="M${i < 6 ? "14 140 H66" : "10 40 H70 L66 146 H14 Z"}" fill="#f0a830" stroke="${i < 6 ? "rgba(240,168,48,.6)" : "none"}" stroke-width="6"/>${i === 6 ? `<rect x="8" y="22" width="64" height="22" rx="8" fill="#fffbe8"/>` : ""}</svg>`;
    const t0 = i === 0 ? T2 + .6 : LAPSE + (i - 1) * .7;
    E.K(p, "o", [[t0, 0], [t0 + .05, 1]]); E.K(p, "y", [[t0, -60], [t0 + .25, 0, "back"]]); E.K(p, "x", [[t0, 200], [t0 + .25, 0, "out"]]);
    E.S(t0 + .2, "tick", .7); pints.push(p);
  }
  // counter of beers + the receipt
  const tally = E.el(R, "abs", `left:40px;top:1210px;padding:10px 22px;border-radius:16px;background:${INK};color:#fff;font-weight:900;font-size:44px;z-index:8;opacity:0;font-variant-numeric:tabular-nums`);
  E.K(tally, "o", [[LAPSE, 0], [LAPSE + .2, 1]]);
  E.F(t => { const n = 1 + [LAPSE, LAPSE + .7, LAPSE + 1.4, LAPSE + 2.1, LAPSE + 2.8, LAPSE + 3.5].filter(k => t >= k).length; tally.textContent = `🍺 ${Math.min(7, n)} · €${Math.min(7, n) * 19}`; });
  const rec = E.el(R, "abs", `left:900px;top:${TOP - 10}px;width:140px;height:0;overflow:hidden;background:#fffbe8;z-index:7;box-shadow:0 8px 16px rgba(0,0,0,.25)`);
  rec.innerHTML = `<div style="padding:10px;font-family:'Courier New',monospace;font-weight:900;font-size:20px;color:${INK};line-height:1.5">${Array.from({ length: 7 }, () => "BEER 0.4 €19").join("<br>")}<br>—————<br>TOTAL €133</div>`;
  E.K(rec, "h", [[LAPSE, 0], [LAPSE_END, 520, "lin"]]);
  E.clip(SHOCK, "sfx/elx-register.wav", { vol: .8 });
  // the wall clock racing
  const clock = E.el(R, "abs", `left:40px;top:1080px;padding:8px 18px;border-radius:14px;background:#15181e;color:${AMBER};font-family:'Courier New',monospace;font-weight:900;font-size:42px;z-index:8;font-variant-numeric:tabular-nums`);
  E.F(t => { const m = 11 * 60 + 5 + Math.round(seg(t, LAPSE, LAPSE_END - LAPSE) * 275) + Math.round(t * .3); clock.textContent = `🕐 ${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; });
  const ff = E.el(R, "abs", `left:300px;top:1090px;padding:6px 14px;border-radius:12px;background:${GOLD};color:${INK};font-weight:900;font-size:34px;z-index:8;opacity:0`, "⏩ ×200");
  E.K(ff, "o", [[LAPSE, 0], [LAPSE + .1, 1], [LAPSE_END, 1], [LAPSE_END + .1, 0]]);

  // ================= the tourist =================
  const TH = 1120, WH = { happy: 594 / 1003, shock: 471 / 1006, resign: 414 / 1010 };
  const tour = E.el(R, "abs", `left:0;top:0;width:1080px;height:1920px;z-index:4`);
  const tIn = E.el(tour, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:300px 1900px");
  const tEls = Object.fromEntries(Object.entries(WH).map(([n, r]) => [n, E.img(tIn, n, `position:absolute;left:${290 - TH * r / 2}px;top:${1940 - TH}px;width:${TH * r}px;height:${TH}px`)]));
  const TP = [[0, "happy"], [SHOCK, "shock"], [T2 - .1, "resign"], [SELFIE, "happy"]];
  E.F(t => {
    const f = at(TP, t); for (const n in tEls) tEls[n].style.opacity = n === f ? 1 : 0;
    let y = Math.sin(t * 2) * 4, r = 0;
    if (t >= LAPSE && t < SELFIE) r = Math.sin(t * 1.5) * 3 * seg(t, LAPSE, 3);                    // a gentle sway sets in
    for (const [k] of TP.slice(1)) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 20;
    if (f === "shock" && t < SHOCK + .8) r = Math.sin(t * 40) * 1.5;
    tIn.style.transform = `translateY(${y}px) rotate(${r}deg)`;
  });
  const price = E.el(R, "abs", `left:0;top:1260px;width:620px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 30px;border-radius:20px;background:${CORAL};color:#fff;font-weight:900;font-size:110px">€19</span>`);
  E.K(price, "o", [[SHOCK, 0], [SHOCK + .08, 1], [FLIP1 - .1, 1], [FLIP1 + .1, 0]]); E.K(price, "s", [[SHOCK, 2.2], [SHOCK + .3, 1, "back"]]); E.shake(SHOCK + .1, 14, .3);
  E.S(FLIP2 + .4, "nope", .6);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 52, italic = false, dark = false, bg } = o;
    const B = bg || (dark ? "#1b2330" : "#fff");
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${B};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.3);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark || bg ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${B};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("One beer,<br>please!", { left: 60, top: 660, w: 400, tail: 230, t0: T1, t1: B1 - .05 });
  bubble("That’s<br>nineteen euros.", { left: 560, top: 640, w: 440, tail: 250, t0: B1, t1: SHOCK + .6, dark: true });
  bubble("…make<br>it two.", { left: 80, top: 680, w: 320, tail: 210, t0: T2, t1: LAPSE, italic: true, size: 58 });
  bubble("🔊 Final call for passenger Gary Pike.<br>Gate 12 is now closing.", { left: 60, top: 1240, w: 960, tail: 480, t0: PA, t1: CLOSEG, bg: "#c8102e", size: 40 });
  E.clip(T1 + .05, "voices/sk39/t1.wav", { vol: 1.5 }); E.clip(B1 + .05, "voices/sk39/b1.wav", { vol: 1.5 }); E.clip(T2 + .05, "voices/sk39/t2.wav", { vol: 1.7 });
  E.clip(PA - .4, "sfx/elx-speaker-chime.wav", { vol: .7 }); E.clip(PA + .1, "voices/sk39/pa.wav", { vol: 1.4, duck: false });
  E.clip(SELFIE + .3, "sfx/elx-camera-shutter.wav", { vol: .8 }); E.flash(SELFIE + .3, "#ffffff", .5, .15);
  E.clip(CLOSEG + .3, "sfx/elx-trailer-whoosh.wav", { vol: .5 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-cafe.wav", { vol: .2, to: Math.min(6, DUR - t), duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1560px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "7 BEERS. €133. 0 FLIGHTS.", STAMP, { size: 66, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The *airport* bar.", { size: 70, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, SHOCK - .2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
