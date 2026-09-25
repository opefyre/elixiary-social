// SK.9 "Don't you dare." — he admires his perfect cocktail, sets it down on the edge of the console table and steps away.
// The cat reaches out a paw, eye contact unbroken: DISTANCE TO EDGE 12 cm → 8 → 5. He comes back: "Don't. You. Dare." (voiced).
// 3 → 1 → 0. Slow motion, choir: he dives across the room and catches it. "Yes! Got it!" SAVED. Behind him, without breaking
// eye contact, the cat pushes the whole bottle off the other end. CRASH. CHECKMATE. mrrp.
// Voice: Alex (ElevenLabs, same actor as the date guy — same character). Effects: generated slow-mo whoosh, smash, cat chirp.
export const meta = {
  id: "sk9-dont-you-dare",
  images: {
    proud: "cutouts/cat_guy_proud.webp", warn: "cutouts/cat_guy_warn.webp", dive: "cutouts/cat_guy_dive.webp",
    cat_sit: "cutouts/cat_sit.webp", cat_paw: "cutouts/cat_paw.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.music({ bpm: 92, root: 53, seed: 64, prog: [[0, 3, 7], [5, 8, 12], [3, 7, 10], [7, 10, 14]], until: 10.6 });
  const DUR = 18.6;
  const S = E.scene("room", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const SETDOWN = 2.9, AWAY = 3.3, PAW = 4.0, BACK = 6.3, DARE = 6.6, TIP = 10.6, CATCH = 12.3, GOTIT = 12.45, TURN = 14.0, BOTTLE = 14.9, SMASH = 15.35, MATE = 15.8;
  const TOP = 1150, EDGE_L = 170, EDGE_R = 1000;                      // console table top and its two ends

  // ================= living room at night =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:#3a4a5c");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1560px;opacity:.14;background-image:radial-gradient(circle at 25% 25%,#fff 3px,transparent 4px),radial-gradient(circle at 75% 75%,#fff 3px,transparent 4px);background-size:60px 60px");   // wallpaper dots
  // city window (right)
  const win = E.el(R, "abs", "left:600px;top:420px;width:400px;height:520px;border-radius:10px;overflow:hidden;box-shadow:0 0 0 14px #2a3542,0 20px 40px rgba(0,0,0,.35)");
  win.innerHTML = `<svg viewBox="0 0 400 520" width="400" height="520"><defs><linearGradient id="ns" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1026"/><stop offset="1" stop-color="#2b2a55"/></linearGradient></defs><rect width="400" height="520" fill="url(#ns)"/>` +
    `<circle cx="310" cy="90" r="30" fill="#eef1f7"/><circle cx="298" cy="84" r="30" fill="#0e142c"/>` +
    [[20, 300, 70, 220], [100, 240, 60, 280], [170, 330, 80, 190], [260, 270, 60, 250], [330, 350, 70, 170]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1a1f3a"/>` +
      Array.from({ length: 10 }, (_, k) => `<rect x="${x + 8 + (k % 3) * 20}" y="${y + 14 + Math.floor(k / 3) * 34}" width="12" height="16" fill="#ffd98a" opacity="${(k * 7 + x) % 3 ? .9 : .15}"/>`).join("")).join("") + `</svg>`;
  E.el(win, "abs", "left:194px;top:0;width:12px;height:520px;background:#2a3542"); E.el(win, "abs", "left:0;top:254px;width:400px;height:12px;background:#2a3542");
  // framed print, floor lamp and its warm pool of light, a bookshelf
  const print = E.el(R, "abs", "left:110px;top:480px;width:300px;height:220px;background:#f3e7d3;box-shadow:0 0 0 12px #1c2530,0 12px 24px rgba(0,0,0,.3)");
  print.innerHTML = `<svg viewBox="0 0 300 220" width="300" height="220"><rect width="300" height="220" fill="#f3e7d3"/><path d="M40 170 Q110 60 170 130 T280 90" stroke="#ff6b57" stroke-width="10" fill="none"/><circle cx="220" cy="60" r="26" fill="#F5C451"/></svg>`;
  E.el(R, "abs", "left:-200px;top:300px;width:900px;height:1300px;background:radial-gradient(ellipse at 40% 30%,rgba(255,200,120,.35),transparent 60%)");
  const lamp = E.el(R, "abs", "left:30px;top:760px;width:140px;height:820px");
  lamp.innerHTML = `<svg viewBox="0 0 140 820" width="140" height="820"><path d="M20 0 H120 L100 110 H40 Z" fill="#f6e3b8"/><rect x="66" y="110" width="8" height="690" fill="#222"/><ellipse cx="70" cy="806" rx="54" ry="12" fill="#222"/></svg>`;
  const shelf = E.el(R, "abs", "left:760px;top:1180px;width:300px;height:420px");
  E.el(R, "abs", "left:0;top:1560px;width:1080px;height:360px;background:#6b4a36;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.14) 0 3px,transparent 3px 160px)");
  E.el(R, "abs", "left:120px;top:1640px;width:840px;height:140px;border-radius:50%;background:radial-gradient(ellipse,#c7b28e 0 55%,#a8916c 56% 62%,transparent 63%)");   // rug

  // ================= the console table =================
  const table = E.el(R, "abs", `left:${EDGE_L}px;top:${TOP}px;width:${EDGE_R - EDGE_L}px;height:420px`);
  table.innerHTML = `<svg viewBox="0 0 ${EDGE_R - EDGE_L} 420" width="${EDGE_R - EDGE_L}" height="420"><rect x="0" y="0" width="${EDGE_R - EDGE_L}" height="34" rx="6" fill="#8a5a33"/><rect x="0" y="30" width="${EDGE_R - EDGE_L}" height="10" fill="#6d4526"/>` +
    `<rect x="30" y="40" width="${EDGE_R - EDGE_L - 60}" height="90" fill="#7a4e2c"/>${[0, 1, 2].map(i => `<rect x="${50 + i * ((EDGE_R - EDGE_L - 100) / 3)}" y="54" width="${(EDGE_R - EDGE_L - 140) / 3}" height="62" rx="6" fill="none" stroke="#5f3c21" stroke-width="4"/><circle cx="${50 + i * ((EDGE_R - EDGE_L - 100) / 3) + (EDGE_R - EDGE_L - 140) / 6}" cy="85" r="6" fill="#d9b25a"/>`).join("")}` +
    `<rect x="40" y="130" width="22" height="290" fill="#6d4526"/><rect x="${EDGE_R - EDGE_L - 62}" y="130" width="22" height="290" fill="#6d4526"/></svg>`;
  // a bowl of limes and a small plant on the table
  const deco = E.el(R, "abs", `left:640px;top:${TOP - 120}px;width:200px;height:122px`);
  deco.innerHTML = `<svg viewBox="0 0 200 122" width="200" height="122"><path d="M10 80 Q100 140 190 80 Z" fill="#e8e1d4"/>${[40, 80, 120, 160].map((x, i) => `<circle cx="${x}" cy="${76 - (i % 2) * 8}" r="22" fill="#7cc242"/><circle cx="${x - 6}" cy="${70 - (i % 2) * 8}" r="6" fill="#b6e27a"/>`).join("")}</svg>`;

  // ================= the bottle (right end) and the glass (left end) =================
  const bottle = E.el(R, "abs", `left:${EDGE_R - 110}px;top:${TOP - 250}px;width:90px;height:250px;transform-origin:50% 100%`);
  bottle.innerHTML = `<svg viewBox="0 0 90 250" width="90" height="250"><defs><linearGradient id="wb" x1="0" x2="1"><stop offset="0" stop-color="#8a4a1e"/><stop offset=".3" stop-color="#d98a3a"/><stop offset=".4" stop-color="#fff" stop-opacity=".6"/><stop offset=".5" stop-color="#c0772e"/><stop offset="1" stop-color="#5a2e10"/></linearGradient></defs>` +
    `<rect x="30" y="0" width="30" height="22" rx="4" fill="#2b2b2b"/><path d="M34 22 H56 V70 Q90 84 90 110 V240 Q90 250 80 250 H10 Q0 250 0 240 V110 Q0 84 34 70 Z" fill="url(#wb)"/>` +
    `<rect x="10" y="130" width="70" height="70" rx="6" fill="#efe6d2"/><rect x="20" y="146" width="50" height="6" fill="#8a4a1e"/><rect x="26" y="162" width="38" height="4" fill="#b59a70"/></svg>`;
  const glass = E.el(R, "abs", `left:0;top:${TOP - 150}px;width:120px;height:150px;transform-origin:50% 100%;opacity:0`);
  glass.innerHTML = `<svg viewBox="0 0 120 150" width="120" height="150"><path d="M8 20 Q60 72 112 20 Z" fill="#e9a23b"/><path d="M4 16 Q60 84 116 16" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="4"/>` +
    `<rect x="56" y="54" width="8" height="80" fill="rgba(255,255,255,.85)"/><ellipse cx="60" cy="138" rx="36" ry="8" fill="rgba(255,255,255,.85)"/>` +
    `<path d="M92 14 q16 -4 18 12" stroke="#f08a24" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M26 24 Q40 40 54 44" stroke="#fff" stroke-opacity=".6" stroke-width="4" fill="none"/></svg>`;
  // glass x (its centre) over time: on the table after SETDOWN, nudged toward the left edge
  const NUDGE = [[PAW + .6, 8], [PAW + 1.7, 5], [9.0, 3], [9.8, 1], [TIP, 0]];
  const cm = t => at([[0, 12], ...NUDGE], t);
  const gx = t => EDGE_L + 20 + cm(t) * 12;
  // the fall: slow motion from TIP to CATCH
  E.F(t => {
    glass.style.opacity = t >= SETDOWN ? 1 : 0;
    let x = gx(t), y = 0, r = 0;
    if (t >= 9.8 && t < TIP) r = -Math.sin((t - 9.8) * 14) * 5;                                            // teetering
    if (t >= TIP && t < CATCH) { const u = (t - TIP) / (CATCH - TIP); x = EDGE_L - 10 - u * 20; y = u * u * 300; r = -u * 60; }
    if (t >= CATCH) { x = 40 + 150; y = 250; r = 0; }
    glass.style.left = `${x - 60}px`; glass.style.transform = `translateY(${y}px) rotate(${r}deg)`;
    if (t >= CATCH - .3) glass.style.opacity = 0;                                                        // his hand has it from here                                                              // now it is in his hand (the dive image)
  });
  E.S(SETDOWN, "thud", .25);
  NUDGE.forEach(([k]) => E.S(k, "scratch", .35));
  // drops of cocktail floating in slow motion
  for (let i = 0; i < 8; i++) {
    const d = E.el(R, "abs", `left:0;top:0;width:${10 + (i % 3) * 5}px;height:${10 + (i % 3) * 5}px;border-radius:50%;background:#e9a23b;z-index:5;opacity:0`);
    const t0 = TIP + .5 + i * .06;
    E.K(d, "o", [[t0, 0], [t0 + .1, 1], [CATCH, 1], [CATCH + .1, 0]]);
    E.K(d, "x", [[t0, EDGE_L - 20], [CATCH, EDGE_L - 30 + (i - 4) * 18]]); E.K(d, "y", [[t0, TOP - 60], [CATCH, TOP + 120 - (i % 4) * 30]]);
  }

  // ================= the cat =================
  const CAT = { cat_sit: [549, 985, 450], cat_paw: [938, 976, 450] };
  const cat = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:3");
  const catEls = Object.entries(CAT).map(([n, [w, h, H]]) => {
    const W = w * H / h;
    // the sitting cat is centred on x 520; the reaching pose is anchored by its body, so the paw extends left toward the glass
    const left = n === "cat_sit" ? 600 - W / 2 : 600 - W * .62;
    return [n, E.img(cat, n, `position:absolute;left:${left}px;top:${TOP + 6 - H}px;width:${W}px;height:${H}px`)];
  });
  // paw out while nudging the glass, back to sitting, and at the end it reaches to the right for the bottle (mirrored)
  const CP = [[0, "cat_sit"], [PAW, "cat_paw"], [BACK, "cat_sit"], [8.8, "cat_paw"], [TIP + .2, "cat_sit"], [BOTTLE - .3, "cat_paw"]];
  E.F(t => {
    const f = at(CP, t); catEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    const mirror = t >= BOTTLE - .3;
    catEls[1][1].style.transform = mirror ? "scaleX(-1)" : "none";
    catEls[1][1].style.transformOrigin = "62% 100%";
    cat.style.transform = t >= TURN ? `translateX(${clamp((t - TURN) / .6, 0, 1) * 150}px)` : "none";      // it strolls to the bottle end
  });
  // bottle: tips and falls off the right end
  E.K(bottle, "r", [[BOTTLE, 0], [BOTTLE + .25, 18, "in"], [SMASH, 95, "in"]]);
  E.K(bottle, "x", [[BOTTLE + .1, 0], [SMASH, 140, "in"]]); E.K(bottle, "y", [[BOTTLE + .15, 0], [SMASH, 420, "in"]]);
  E.K(bottle, "o", [[SMASH, 1], [SMASH + .02, 0]]);
  for (let i = 0; i < 12; i++) {
    const sh = E.el(R, "abs", `left:${EDGE_R + 20}px;top:1540px;width:${12 + (i % 3) * 8}px;height:${8 + (i % 2) * 8}px;background:${i % 3 ? "#c0772e" : "#e9e1cf"};clip-path:polygon(0 0,100% 30%,70% 100%);z-index:6;opacity:0`);
    E.K(sh, "o", [[SMASH, 0], [SMASH + .02, 1], [SMASH + .9, 1], [SMASH + 1.1, 0]]);
    E.K(sh, "x", [[SMASH, 0], [SMASH + .7, (i - 6) * 26, "out"]]); E.K(sh, "y", [[SMASH, 0], [SMASH + .3, -80 - (i % 4) * 30, "out"], [SMASH + .7, 30, "in"]]);
  }
  const puddle = E.el(R, "abs", `left:${EDGE_R - 40}px;top:1570px;width:0;height:30px;border-radius:50%;background:rgba(192,119,46,.7);z-index:1`);
  E.K(puddle, "w", [[SMASH, 0], [SMASH + .8, 220, "out"]]);
  E.clip(SMASH, "sfx/elx-glass-smash.wav", { vol: 1.3 }); E.shake(SMASH, 18, .35); E.flash(SMASH, "#ffffff", .35, .15);
  E.clip(MATE + .5, "sfx/elx-cat-mrrp.wav", { vol: 1 });

  // ================= him =================
  const HIM = { proud: [409, 991, 1000], warn: [427, 980, 1000] };
  const him = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:4");
  const himIn = E.el(him, "abs", "left:0;top:0;width:1080px;height:1920px");
  const hEls = Object.entries(HIM).map(([n, [w, h, H]]) => { const W = w * H / h; return [n, E.img(himIn, n, `position:absolute;left:${-W / 2}px;top:${1620 - H}px;width:${W}px;height:${H}px`)]; });
  E.K(him, "x", [[0, 250], [AWAY, 250], [AWAY + .5, -300, "in"], [BACK - .3, -300], [BACK, 170, "out"], [TIP, 170], [TIP + .01, -2000]]);
  E.F(t => { const f = at([[0, "proud"], [BACK - .3, "warn"]], t); hEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    himIn.style.transform = t < SETDOWN ? `translateY(${Math.sin(t * 2) * 4}px)` : t >= DARE && t < TIP ? `translateY(${-Math.sin((t - DARE) * .8) * 10}px) scale(${1 + clamp((t - DARE) / 3, 0, 1) * .03})` : "none"; });
  // the glass is in his hand until he sets it down (hidden table glass until then)
  // the dive: flies in from the left during the slow motion and lands on the rug holding the glass
  const DW = 900, DH = 420 * DW / 1003;
  const dive = E.el(R, "abs", `left:0;top:0;width:${DW}px;height:${DH}px;z-index:5;opacity:0`);
  E.img(dive, "dive", `width:${DW}px;height:${DH}px`);                                                   // the source already dives to the left, toward the glass
  E.K(dive, "o", [[CATCH - .55, 0], [CATCH - .5, 1]]);
  E.K(dive, "x", [[CATCH - .55, 520], [CATCH - .3, 60, "out"], [CATCH, -20, "out"]]); E.K(dive, "y", [[CATCH - .55, 1150], [CATCH - .3, 1250], [CATCH, 1330, "in"]]);
  E.K(dive, "r", [[CATCH, 0], [CATCH + .15, 3], [CATCH + .3, 0]]);
  // slow-motion grade: cool tint, heavy vignette, speed lines
  const grade = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6;pointer-events:none;opacity:0;background:radial-gradient(ellipse at 40% 60%,rgba(80,120,200,.05) 30%,rgba(10,20,50,.55) 100%)");
  E.K(grade, "o", [[TIP, 0], [TIP + .2, 1], [CATCH, 1], [CATCH + .3, 0]]);
  const lines = [];
  for (let i = 0; i < 10; i++) lines.push(E.el(R, "abs", `left:0;top:${1150 + i * 40}px;width:${200 + (i % 3) * 120}px;height:4px;border-radius:2px;background:rgba(255,255,255,.6);z-index:6;opacity:0`));
  E.F(t => lines.forEach((l, i) => { const on = t >= CATCH - .55 && t < CATCH; l.style.opacity = on ? .7 : 0; l.style.transform = `translateX(${1100 - ((t * 900 + i * 173) % 1400)}px)`; }));
  E.clip(TIP, "sfx/elx-slowmo.wav", { vol: 1 }); E.clip(TIP + .2, "sfx/angel-choir.wav", { vol: .8 });

  // ================= counters, bubbles, stamps =================
  const pill = E.el(R, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:50px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;transform-origin:0 50%`, "DISTANCE TO EDGE: 12 cm");
  E.K(pill, "o", [[PAW - .2, 0], [PAW, 1], [TIP + .3, 1], [TIP + .5, 0]]);
  E.F(t => { const v = cm(t); const s = `DISTANCE TO EDGE: ${v} cm`; if (pill.textContent !== s) pill.textContent = s; pill.style.background = v <= 3 ? CORAL : INK; pill.style.color = v <= 3 ? INK : "#fff"; });
  NUDGE.forEach(([k]) => E.K(pill, "s", [[k - .01, 1], [k, 1.15], [k + .2, 1, "back"]]));
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 60, bg = "#fff", fg = INK } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:20px 28px 24px;box-shadow:0 14px 34px rgba(0,0,0,.35);font-weight:800;font-size:${size}px;line-height:1.04;letter-spacing:-.02em;color:${fg};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .5);
    return b;
  };
  bubble("Don't.<br>You. Dare.", { left: 60, top: 470, w: 420, tail: 150, t0: DARE, t1: 9.6, size: 66 });
  bubble("YES! Got it!", { left: 80, top: 980, w: 440, tail: 180, t0: GOTIT, t1: SMASH - .05, size: 60, bg: GOLD });
  const saved = E.el(R, "abs", "left:100px;top:360px;width:880px;display:flex;justify-content:center;z-index:9");
  const s1 = E.stamp(saved, "SAVED.", CATCH + .15, { size: 110, rot: -5, bg: "#39d98a", fg: INK, shake: 10 }); s1.style.alignSelf = "center"; E.until(s1, TURN - .1, .2);
  const mate = E.el(R, "abs", "left:100px;top:360px;width:880px;display:flex;justify-content:center;z-index:9");
  const s2 = E.stamp(mate, "CHECKMATE.", MATE, { size: 110, rot: -5, bg: CORAL, fg: INK, shake: 12 }); s2.style.alignSelf = "center";
  E.clip(GOTIT + .05, "voices/sk9/gotit.wav", { vol: 1.3 });
  E.clip(DARE + .05, "voices/sk9/dare.wav", { vol: 1.5 });
  E.S(1.0, "sparkle", .5); E.S(2.0, "sparkle", .4);
  // a sparkle on his perfect garnish while he admires it
  const spk = E.el(R, "abs", "left:290px;top:640px;width:70px;height:70px;z-index:7;opacity:0");
  spk.innerHTML = `<svg viewBox="0 0 60 60" width="70" height="70"><path d="M30 0 L34 26 L60 30 L34 34 L30 60 L26 34 L0 30 L26 26 Z" fill="#fff"/></svg>`;
  E.K(spk, "o", [[.9, 0], [1.0, 1], [1.5, 0], [1.9, 0], [2.0, 1], [2.5, 0]]); E.K(spk, "s", [[.9, .3], [1.2, 1.1], [1.9, .3], [2.2, 1.1]]);

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The *perfect* cocktail.", { size: 70, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.5)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, 3.5, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
