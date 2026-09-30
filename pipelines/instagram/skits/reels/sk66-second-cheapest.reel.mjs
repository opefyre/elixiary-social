// SK.66 "The second-cheapest wine." — date night. "Shall we get a bottle?" Alex opens the wine list: "Sure! Let me just… have
// a look." His finger slides down the prices: €22 (looks cheap ✗), €340 (that's rent ✗), €24 — the sweet spot ✓. "We'll
// have the Merlot, please." The waiter, with a wink: "Excellent choice, sir." MEANWHILE, BACKSTAGE: a whole wall of the same
// Merlot. Bought for €4. Markup: 500%. The waiter bursts in: "Another second-cheapest!" The staff cheer; the tally ticks
// 47 → 48. EVERYONE ORDERS THE SECOND-CHEAPEST.  Voices: ElevenLabs (Nina: Sarah; Alex; waiter: George).
export const meta = {
  id: "sk66-second-cheapest",
  images: { rest: "bg/restaurant.jpg", alex: "cutouts/alex_menu.webp", nina: "cutouts/w_nina.webp", waiter: "cutouts/waiter_wink.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", WINE = "#7a1830";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const N1 = .6, A1 = 1.8, MENU = 4.5, A2 = 10.2, WAIT = 11.7, W1 = 12.0, BACK = 13.8, W2 = 15.4, STAMP = 18.6, DUR = 22.0;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const ease = p => p * p * (3 - 2 * p);
  const bubble = (Pn, html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false } = o;
    const b = E.el(Pn, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.35);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const chip = (Pn, html, t0, t1, top, left = 40, bg = "rgba(255,255,255,.95)", fg = INK) => { const c = E.el(Pn, "abs", `left:${left}px;top:${top}px;padding:10px 20px;border-radius:16px;background:${bg};color:${fg};font-weight:900;font-size:36px;z-index:9;opacity:0;white-space:nowrap`, html); E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .3, 1, "back"]]); E.S(t0, "pop", .35); return c; };

  // ================= scene 1: the table =================
  const A = E.scene("table", 0, BACK, "dark"); E.cur = A; const P = A.el;
  const bg = E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "rest", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 60%");
  E.F(t => { bgI.style.transform = `scale(${1.04 + t * .003})`; });
  const NH = 1000, NW = NH * 502 / 1010, AH = 1000, AW = AH * 685 / 999;
  const nina = E.el(P, "abs", `left:${810 - NW / 2}px;top:${1990 - NH}px;width:${NW}px;height:${NH}px;z-index:3`);
  E.img(nina, "nina", `width:${NW}px;height:${NH}px`);
  const alex = E.el(P, "abs", `left:${300 - AW / 2}px;top:${1990 - AH}px;width:${AW}px;height:${AH}px;z-index:4`);
  const aIn = E.el(alex, "abs", `left:0;top:0;width:${AW}px;height:${AH}px;transform-origin:50% 100%`);
  E.img(aIn, "alex", `width:${AW}px;height:${AH}px`);
  E.F(t => { aIn.style.transform = `translateY(${Math.sin(t * 1.8) * 4}px) rotate(${t > MENU && t < A2 ? Math.sin(t * 25) * .8 : 0}deg)`; });
  const sweat = E.el(P, "abs", "left:360px;top:1020px;font-size:60px;z-index:5;opacity:0", "💦");
  E.K(sweat, "o", [[MENU + 2.6, 0], [MENU + 2.7, 1], [A2, 1], [A2 + .2, 0]]);
  // the wine list, close up
  const WINES = [["House red", 22], ["Merlot", 24], ["Rioja Reserva", 38], ["Pinot Noir", 56], ["Barolo", 120], ["Château Très Cher", 340]];
  const menu = E.el(P, "abs", `left:130px;top:430px;width:820px;padding:30px 40px 36px;box-sizing:border-box;border-radius:24px;background:#f7f0e2;box-shadow:0 30px 70px rgba(0,0,0,.55);z-index:8;opacity:0;font-family:Georgia,'Times New Roman',serif;color:#3a2410`);
  menu.innerHTML = `<div style="text-align:center;font-size:44px;font-weight:700;letter-spacing:.08em">WINE LIST</div><div style="text-align:center;font-size:24px;color:#8a6a4a;margin-bottom:16px">— reds —</div>` +
    WINES.map(([n, p], i) => `<div class="row" style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-radius:14px;font-size:40px"><span>${n}</span><span style="font-weight:700">€${p}</span></div>`).join("");
  const rows = [...menu.querySelectorAll(".row")];
  E.K(menu, "o", [[MENU, 0], [MENU + .2, 1], [A2 - .1, 1], [A2 + .1, 0]]); E.K(menu, "y", [[MENU, 120], [MENU + .4, 0, "out"]]);
  const finger = E.el(menu, "abs", "left:-96px;top:0;font-size:80px", "👉");
  // row index over time: 0 (€22) → 5 (€340) → 1 (€24)
  const PATH = [[MENU + .5, 0], [MENU + 1.5, 0], [MENU + 2.4, 5], [MENU + 3.6, 5], [MENU + 4.5, 1]];
  const rowAt = t => { for (let i = 0; i < PATH.length - 1; i++) { const [a, x] = PATH[i], [b, y] = PATH[i + 1]; if (t <= b) return x + (y - x) * ease(seg(t, a, b - a)); } return PATH[PATH.length - 1][1]; };
  E.F(t => {
    const r = rowAt(t); finger.style.top = `${96 + r * 76}px`;
    rows.forEach((el, i) => { const on = Math.round(r) === i && t > MENU + .5; el.style.background = on ? (i === 1 && t > MENU + 4.5 ? "#d8f0c8" : i === 1 ? "transparent" : "#f6d0c8") : "transparent"; });
  });
  for (let t = MENU + 1.6; t < MENU + 2.4; t += .16) E.S(t, "tick", .3); for (let t = MENU + 3.7; t < MENU + 4.5; t += .16) E.S(t, "tick", .3);
  chip(P, "✗ €22 — looks cheap", MENU + 1.0, MENU + 2.2, 1100, 440, CORAL, "#fff");
  chip(P, "✗ €340 — that’s rent", MENU + 2.8, MENU + 3.9, 1100, 440, CORAL, "#fff");
  chip(P, "✓ €24 — looks classy", MENU + 4.6, A2 + .6, 1100, 440, "#2e9a55", "#fff"); E.S(MENU + 4.6, "ding", .6);
  // the waiter
  const WH = 1000, WW = WH * 655 / 1016;
  const waiter = E.el(P, "abs", `left:${780 - WW / 2}px;top:${1990 - WH}px;width:${WW}px;height:${WH}px;z-index:5;opacity:0`);
  E.img(waiter, "waiter", `width:${WW}px;height:${WH}px`);
  E.K(waiter, "o", [[WAIT - .1, 0], [WAIT, 1]]); E.K(waiter, "x", [[WAIT - .1, 500], [WAIT + .35, 0, "out"]]);
  const wink = E.el(P, "abs", "left:700px;top:1020px;font-size:70px;z-index:6;opacity:0", "✨");
  E.K(wink, "o", [[W1 + .7, 0], [W1 + .75, 1], [W1 + 1.3, 0]]); E.S(W1 + .7, "sparkle", .7);
  bubble(P, "Shall we get<br>a bottle? 🍷", { left: 520, top: 780, w: 440, tail: 280, t0: N1, t1: A1 - .05 });
  bubble(P, "Sure! Let me just…<br>have a look. 😅", { left: 60, top: 760, w: 520, tail: 230, t0: A1, t1: MENU });
  bubble(P, "We’ll have the<br>Merlot, please. 🧐", { left: 60, top: 760, w: 520, tail: 230, t0: A2, t1: BACK });
  bubble(P, "Excellent<br>choice, sir. 😉", { left: 580, top: 760, w: 440, tail: 200, t0: W1, t1: BACK, dark: true, italic: true });
  E.clip(N1 + .05, "voices/sk66/n1.wav", { vol: 1.5 }); E.clip(A1 + .05, "voices/sk66/a1.wav", { vol: 1.5 }); E.clip(A2 + .05, "voices/sk66/a2.wav", { vol: 1.5 }); E.clip(W1 + .05, "voices/sk66/w1.wav", { vol: 1.5 });
  for (let t = 0; t < BACK; t += 6) E.clip(t, "sfx/elx-restaurant.wav", { vol: .2, to: Math.min(6, BACK - t), duck: true });
  E.music({ bpm: 90, root: 62, seed: 66, prog: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], until: BACK });

  // ================= scene 2: backstage =================
  const B = E.scene("back", BACK, DUR, "dark"); E.cur = B; const Q = B.el;
  E.wipe(BACK); E.clip(BACK - .3, "sfx/elx-trailer-whoosh.wav", { vol: .45 });
  E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2a1c14,#3a261a 50%,#1e140e)");
  const wall = E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px");
  let s = ""; for (let r = 0; r < 9; r++) { s += `<rect x="0" y="${520 + r * 150 + 118}" width="1080" height="14" fill="#6a4630"/>`; for (let i = 0; i < 11; i++) { const x = 20 + i * 96; s += `<g transform="translate(${x} ${520 + r * 150})"><rect x="22" y="0" width="16" height="30" rx="4" fill="#1a3a20"/><rect x="10" y="26" width="40" height="92" rx="12" fill="#1f4a28"/><rect x="12" y="62" width="36" height="30" fill="#efe4c8"/><text x="30" y="83" font-size="15" font-weight="900" text-anchor="middle" fill="${WINE}" font-family="Inter,sans-serif">€24</text></g>`; } }
  wall.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920">${s}</svg>`;
  E.F(t => { wall.style.transform = `translateY(${-(t - BACK) * 18}px) scale(${1.02 + (t - BACK) * .01})`; });
  E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;pointer-events:none;background:radial-gradient(ellipse at 50% 55%,rgba(0,0,0,0) 30%,rgba(0,0,0,.6))");
  chip(Q, "🤫 meanwhile, backstage…", BACK + .2, W2, 360, 40, INK, "#fff");
  chip(Q, "💶 bought for: €4", BACK + .6, DUR, 460);
  chip(Q, "📈 markup: 500%", BACK + 1.1, DUR, 534);
  const tally = E.el(Q, "abs", `left:40px;top:608px;padding:10px 20px;border-radius:16px;background:${GOLD};color:${INK};font-weight:900;font-size:36px;z-index:9;opacity:0;font-variant-numeric:tabular-nums`);
  E.K(tally, "o", [[BACK + 1.6, 0], [BACK + 1.7, 1]]);
  E.F(t => { const n = t >= W2 + .6 ? 48 : 47; tally.textContent = `🍷 sold tonight: ${n}`; });
  E.K(tally, "s", [[W2 + .6, 1], [W2 + .75, 1.25, "out"], [W2 + 1.0, 1, "io"]]); E.S(W2 + .6, "ding", .7);
  const w2 = E.el(Q, "abs", `left:${540 - WW / 2}px;top:${1990 - WH}px;width:${WW}px;height:${WH}px;z-index:5;opacity:0`);
  E.img(w2, "waiter", `width:${WW}px;height:${WH}px`);
  E.K(w2, "o", [[W2 - .3, 0], [W2 - .2, 1]]); E.K(w2, "x", [[W2 - .3, -600], [W2 + .1, 0, "out"]]); E.S(W2 - .2, "swish", .5);
  bubble(Q, "Another second-<br>cheapest! 🎉", { left: 300, top: 760, w: 520, tail: 260, t0: W2, t1: DUR });
  E.clip(W2 + .05, "voices/sk66/w2.wav", { vol: 1.5 }); E.clip(W2 + 1.9, "sfx/applause-cheer.wav", { vol: .55, to: 2.4 });

  // ================= stamp + title =================
  const stampBox = E.el(Q, "abs", "left:0;top:1260px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "EVERYONE ORDERS<br>THE SECOND-CHEAPEST.", STAMP, { size: 64, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  E.cur = A;
  const titleBox = E.el(P, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "The *second-cheapest* wine.", { size: 58, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
