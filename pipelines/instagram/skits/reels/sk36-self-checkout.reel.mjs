// SK.36 "Buying wine at the self-checkout." — beep: RED WINE €8.99. The light goes red: "Approval needed. Please wait for
// assistance." The clock races 0:12 → 6:40; a spider lowers itself onto the scanner. A bored clerk finally: "Can I see some
// I.D.?" The 85-year-old lights up: "Did you hear that, Margaret?! He thinks I'm under twenty-five!" — "…it's for everyone."
// Deflated, he holds out his ID: BORN 1941.  Voices: Higgsfield TTS (machine: Tamsin; clerk: Evan; him: Alistair).
export const meta = {
  id: "sk36-self-checkout",
  images: { joy: "cutouts/gramps_joy.webp", flat: "cutouts/gramps_flat.webp", clerk: "cutouts/clerk.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", RED = "#e5202e", GRN = "#1f8a4c";
  E.episode(-16);
  const SCAN = .6, M1 = 1.5, WAIT = 4.8, CLERK = 7.6, C1 = 8.1, JOY = 9.5, O1 = 9.7, C2 = 13.8, FLAT = 14.4, IDZ = 15.2, STAMP = 16.8, DUR = 20.0;
  E.music({ bpm: 100, root: 60, seed: 36, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: M1 });
  const S = E.scene("shop", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const FL = 1800;

  // ================= a supermarket =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#f4f6f2,#e6eae4)");
  // fluorescent tubes
  [0, 1, 2].forEach(i => { const l = E.el(R, "abs", `left:${80 + i * 330}px;top:${190 + (i % 2) * 20}px;width:250px;height:16px;border-radius:8px;background:#fff;box-shadow:0 0 30px 8px rgba(255,255,255,.9)`); if (i === 1) E.F(t => { l.style.opacity = (Math.floor(t * 9) % 17 === 0) ? .3 : 1; }); });
  // aisle shelves with products
  const shelves = E.el(R, "abs", "left:0;top:560px;width:1080px;height:640px;opacity:.9");
  let p = "";
  for (let r = 0; r < 4; r++) { p += `<rect x="0" y="${r * 160 + 140}" width="1080" height="14" fill="#b8bec4"/>`; for (let i = 0; i < 18; i++) { const c = ["#e05a4a", "#f2c94c", "#4a8ad8", "#6ab04c", "#f08ac0", "#ffffff", "#8a5ad8"][(i * 3 + r) % 7], h = 70 + ((i * 17 + r * 5) % 60), w = 44 + (i % 3) * 8; p += `<rect x="${10 + i * 60}" y="${r * 160 + 140 - h}" width="${w}" height="${h}" rx="6" fill="${c}"/><rect x="${14 + i * 60}" y="${r * 160 + 150 - h}" width="${w - 8}" height="14" fill="rgba(255,255,255,.6)"/>`; } }
  shelves.innerHTML = `<svg viewBox="0 0 1080 640" width="1080" height="640">${p}</svg>`;
  E.el(R, "abs", "left:0;top:500px;width:1080px;height:60px;background:#1f8a4c;color:#fff;font-weight:900;font-size:34px;letter-spacing:.3em;text-align:center;line-height:60px", "WINE · BEER · SPIRITS");
  E.el(R, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background:#d8dcd4;background-image:linear-gradient(90deg,#c8ccc4 3px,transparent 3px),linear-gradient(#c8ccc4 3px,transparent 3px);background-size:120px 60px`);
  E.el(R, "abs", "left:0;top:1200px;width:1080px;height:600px;background:linear-gradient(180deg,rgba(230,234,228,0),#e6eae4 30%)");

  // ================= the self-checkout =================
  const mac = E.el(R, "abs", `left:470px;top:880px;width:420px;height:${FL - 880}px;z-index:2`);
  mac.innerHTML = `<svg viewBox="0 0 420 ${FL - 880}" width="420" height="${FL - 880}"><rect x="160" y="0" width="16" height="140" fill="#9aa2aa"/><rect x="60" y="120" width="300" height="230" rx="18" fill="#2a2f36"/>` +
    `<rect x="0" y="420" width="420" height="${FL - 880 - 420}" rx="16" fill="#e8ebee"/><rect x="0" y="400" width="420" height="60" rx="12" fill="#c8ced4"/><rect x="40" y="410" width="200" height="40" rx="8" fill="#2a3a4a"/><path d="M60 430 H220" stroke="#ff3b4a" stroke-width="3" opacity=".8"/>` +
    `<rect x="280" y="360" width="120" height="50" rx="8" fill="#9aa2aa"/><rect x="20" y="520" width="380" height="200" rx="10" fill="#d0d6dc"/><text x="210" y="630" text-anchor="middle" font-family="Noto Sans" font-weight="800" font-size="26" fill="#7a828a">BAGGING AREA</text></svg>`;
  const lamp = E.el(R, "abs", "left:612px;top:830px;width:64px;height:64px;border-radius:32px 32px 6px 6px;z-index:3;background:#9aa2aa");
  E.F(t => { const on = t >= M1 - .1 && t < C2; lamp.style.background = on ? (Math.floor(t * 3) % 2 ? RED : "#ff8a8a") : "#9aa2aa"; lamp.style.boxShadow = on ? "0 0 50px 16px rgba(229,32,46,.55)" : "none"; });
  const scr = E.el(R, "abs", "left:545px;top:1015px;width:270px;height:200px;border-radius:10px;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-weight:900;color:#fff");
  E.F(t => {
    let bg = "#1a6ad0", html = `<div style="font-size:24px;opacity:.8">WELCOME</div><div style="font-size:30px">Scan an item</div>`;
    if (t >= SCAN) html = `<div style="font-size:24px;opacity:.8">RED WINE 75cl</div><div style="font-size:48px">€8.99</div>`;
    if (t >= M1) { bg = RED; html = `<div style="font-size:44px">⚠</div><div style="font-size:30px">APPROVAL<br>NEEDED</div>`; }
    if (t >= C2 + .6) { bg = GRN; html = `<div style="font-size:44px">✓</div><div style="font-size:28px">AGE<br>VERIFIED</div>`; }
    scr.style.background = bg; if (scr.__h !== html) { scr.innerHTML = html; scr.__h = html; }
  });
  E.S(SCAN, "ding", .8); E.S(M1, "blare", .6); E.S(C2 + .6, "ding", .6);
  // the bottle on the scanner
  const btl = E.el(R, "abs", "left:540px;top:1110px;width:70px;height:200px;z-index:4;opacity:0");
  btl.innerHTML = `<svg viewBox="0 0 70 200" width="70" height="200"><path d="M26 0 H44 V60 Q66 80 66 110 V200 H4 V110 Q4 80 26 60 Z" fill="#4a1020"/><rect x="10" y="120" width="50" height="50" fill="#f2ead6"/><rect x="26" y="0" width="18" height="20" fill="#c8a040"/></svg>`;
  btl.style.display = "none";

  // the wait: a clock racing + a spider lowering itself
  const clock = E.el(R, "abs", `left:40px;top:640px;padding:12px 26px;border-radius:20px;background:${INK};color:#fff;font-weight:900;font-size:56px;z-index:8;opacity:0;font-variant-numeric:tabular-nums`);
  E.K(clock, "o", [[WAIT, 0], [WAIT + .15, 1], [CLERK, 1], [CLERK + .2, 0]]);
  E.F(t => { const s = Math.round(12 + 388 * Math.pow(seg(t, WAIT, CLERK - WAIT), 1.6)); clock.textContent = `⏳ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; });
  const ff = E.el(R, "abs", `left:360px;top:652px;padding:6px 14px;border-radius:12px;background:${GOLD};color:${INK};font-weight:900;font-size:34px;z-index:8;opacity:0`, "⏩ ×60");
  E.K(ff, "o", [[WAIT + .1, 0], [WAIT + .2, 1], [CLERK, 1], [CLERK + .2, 0]]);
  const spider = E.el(R, "abs", "left:680px;top:880px;width:60px;height:400px;z-index:5;opacity:0");
  spider.innerHTML = `<svg viewBox="0 0 60 400" width="60" height="400" style="overflow:visible"><line id="silk" x1="30" y1="0" x2="30" y2="0" stroke="#888" stroke-width="2"/><g id="sp"><ellipse cx="30" cy="0" rx="12" ry="14" fill="#222"/>${[-1, 1].map(s => [0, 1, 2, 3].map(k => `<path d="M30 0 q${s * 16} ${-10 + k * 7} ${s * 26} ${-2 + k * 9}" stroke="#222" stroke-width="3" fill="none"/>`).join("")).join("")}<circle cx="25" cy="-4" r="2.5" fill="#fff"/><circle cx="35" cy="-4" r="2.5" fill="#fff"/></g></svg>`;
  const silk = spider.querySelector("#silk"), sp = spider.querySelector("#sp");
  E.K(spider, "o", [[WAIT + .4, 0], [WAIT + .5, 1], [CLERK, 1], [CLERK + .3, 0]]);
  E.F(t => { const y = 10 + 200 * seg(t, WAIT + .5, 2.2); silk.setAttribute("y2", y); sp.setAttribute("transform", `translate(0 ${y})`); });

  // ================= him =================
  const GH = 1020, JW = GH * 431 / 1013, FW = GH * 414 / 997;
  const him = E.el(R, "abs", `left:${280 - JW / 2}px;top:${FL + 20 - GH}px;width:${JW}px;height:${GH}px;z-index:4`);
  const hIn = E.el(him, "abs", `left:0;top:0;width:${JW}px;height:${GH}px;transform-origin:50% 100%`);
  const hJoy = E.img(hIn, "joy", `position:absolute;left:0;top:0;width:${JW}px;height:${GH}px`);
  const hFlat = E.img(hIn, "flat", `position:absolute;left:${(JW - FW) / 2}px;top:0;width:${FW}px;height:${GH}px`);
  // before the ID: the "flat" pose reads as patient waiting (bottle down), then JOY, then flat again
  const HP = [[0, "joy"], [FLAT, "flat"]];
  E.F(t => {
    const f = at(HP, t); hJoy.style.opacity = f === "joy" ? 1 : 0; hFlat.style.opacity = f === "flat" ? 1 : 0;
    let y = Math.sin(t * 1.6) * 3, r = 0, s = 1;
    if (f === "joy" && t >= JOY) { y -= Math.abs(Math.sin((t - JOY) * 7)) * 14; r = Math.sin((t - JOY) * 5) * 2; }
    if (t >= WAIT && t < CLERK) { s = 1 - .03 * seg(t, WAIT, 2.8); r = -2 * seg(t, WAIT, 2.8); }   // slowly wilting
    hIn.style.transform = `translateY(${y}px) rotate(${r}deg) scale(${s})`;
  });
  // sparkles + choir on the joy
  for (let i = 0; i < 7; i++) {
    const st = E.el(R, "abs", `left:${120 + (i * 83) % 330}px;top:${820 + (i * 47) % 260}px;font-size:${40 + (i % 3) * 14}px;z-index:6;opacity:0`, i % 2 ? "✨" : "💖");
    const t0 = JOY + .1 + i * .25; E.K(st, "o", [[t0, 0], [t0 + .1, 1], [t0 + 1.2, 0]]); E.K(st, "y", [[t0, 0], [t0 + 1.2, -120, "out"]]);
  }
  E.clip(JOY, "sfx/angel-choir.wav", { vol: .45, to: 3.6 });
  E.clip(C2 - .05, "sfx/record-silence.wav", { vol: .7 });

  // ================= the clerk =================
  const CH = 1000, CW = CH * 293 / 1005;
  const clerk = E.el(R, "abs", `left:${960 - CW / 2}px;top:${FL + 20 - CH}px;width:${CW}px;height:${CH}px;z-index:4`);
  const cIn = E.el(clerk, "abs", `left:0;top:0;width:${CW}px;height:${CH}px`);
  E.img(cIn, "clerk", `width:${CW}px;height:${CH}px`);
  E.K(clerk, "x", [[CLERK, 400], [CLERK + .5, 0, "out"]]); E.S(CLERK, "swish", .5);
  E.F(t => { cIn.style.transform = `translateY(${Math.sin(t * 1.2) * 2}px)`; });

  // ================= the ID card zoom =================
  const id = E.el(R, "abs", `left:360px;top:380px;width:800px;height:500px;transform-origin:0 0;border-radius:30px;background:linear-gradient(135deg,#dfe8f2,#b8cadc);box-shadow:0 30px 60px rgba(0,0,0,.35);z-index:9;opacity:0;overflow:hidden`);
  id.innerHTML = `<div style="position:absolute;left:0;top:0;width:800px;height:80px;background:#2a4a7a;color:#fff;font-weight:900;font-size:38px;letter-spacing:.2em;line-height:80px;padding-left:36px;box-sizing:border-box">IDENTITY CARD</div>` +
    `<div style="position:absolute;left:40px;top:120px;width:230px;height:290px;border-radius:12px;background:#c8d2dc;overflow:hidden"><svg viewBox="0 0 230 290" width="230" height="290"><circle cx="115" cy="120" r="62" fill="#e8c4a0"/><path d="M60 80 Q115 20 170 80 L170 60 Q115 0 60 60 Z" fill="#5a4a3a"/><path d="M40 290 Q115 190 190 290 Z" fill="#6e4a34"/><path d="M92 112 h10 M128 112 h10" stroke="#333" stroke-width="5" stroke-linecap="round"/><path d="M98 150 Q115 160 132 150" stroke="#8a4a3a" stroke-width="4" fill="none"/></svg></div>` +
    `<div style="position:absolute;left:310px;top:130px;font-weight:700;font-size:28px;color:#4a5a6a">NAME</div><div style="position:absolute;left:310px;top:162px;font-weight:900;font-size:42px;color:${INK}">ARTHUR P. BELL</div>` +
    `<div style="position:absolute;left:310px;top:240px;font-weight:700;font-size:28px;color:#4a5a6a">BORN</div><div style="position:absolute;left:310px;top:272px;font-weight:900;font-size:54px;color:${RED}">03 · 12 · 1941</div>` +
    `<div style="position:absolute;left:310px;top:360px;font-weight:700;font-size:28px;color:#4a5a6a">ISSUED</div><div style="position:absolute;left:310px;top:392px;font-weight:900;font-size:36px;color:${INK}">1983</div>`;
  E.K(id, "o", [[IDZ, 0], [IDZ + .15, 1], [STAMP + 2.4, 1], [STAMP + 2.6, 0]]); E.K(id, "s", [[IDZ, .35], [IDZ + .35, .82, "back"]]); E.K(id, "r", [[IDZ, -12], [IDZ + .35, -3, "out"]]);
  E.S(IDZ, "whoosh", .5);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false, bg } = o;
    const B = bg || (dark ? "#1b2330" : "#fff");
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${B};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.25);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark || bg ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${B};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("🔊 Approval needed. Please<br>wait for assistance.", { left: 360, top: 660, w: 640, tail: 300, t0: M1, t1: WAIT - .05, bg: RED, size: 44 });
  bubble("Can I see<br>some I.D.?", { left: 600, top: 620, w: 420, tail: 330, t0: C1, t1: JOY, dark: true });
  bubble("Did you hear that, Margaret?!<br>He thinks I’m under 25!", { left: 40, top: 620, w: 720, tail: 220, t0: O1, t1: C2 - .05, size: 48 });
  bubble("…it’s for<br>everyone.", { left: 620, top: 620, w: 400, tail: 310, t0: C2, t1: IDZ, dark: true, italic: true, size: 54 });
  E.clip(M1 + .05, "voices/sk36/m1.wav", { vol: 1.3 }); E.clip(C1 + .05, "voices/sk36/c1.wav", { vol: 1.5 }); E.clip(O1 + .05, "voices/sk36/o1.wav", { vol: 1.5 }); E.clip(C2 + .05, "voices/sk36/c2.wav", { vol: 1.6 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-office-murmur.wav", { vol: .2, to: Math.min(6, DUR - t), duck: true });

  // ================= stamp =================
  const stampBox = E.el(R, "abs", "left:0;top:1120px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "AGE: VERIFIED. EGO: DECLINED.", STAMP, { size: 58, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Buying wine at the *self-checkout.*", { size: 47, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, WAIT - .2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
