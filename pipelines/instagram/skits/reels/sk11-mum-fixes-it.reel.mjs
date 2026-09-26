// SK.11 "Making Mum a cocktail." — she proudly serves Mum a pink cocktail. Mum sniffs it ("Is there alcohol in this?"), sips
// ("Ooh. Strong."), and starts fixing it: a little bit of water, a bit of orange juice, a spoon of sugar… YOUR COCKTAIL: 100%
// → 0%. "Perfect! Now it's lovely!" — it is a glass of orange juice. "Mum. That's orange juice." Mum slurps, delighted.
// Voices: ElevenLabs (Mum: Matilda; daughter: Jessica). Set drawn in code: Mum's kitchen.
export const meta = {
  id: "sk11-mum-fixes-it",
  images: {
    k_serve: "cutouts/cust_serve.webp", k_nooo: "cutouts/cust_nooo.webp", k_flat: "cutouts/cust_flat.webp",
    m_sniff: "cutouts/mum_sniff.webp", m_pour: "cutouts/mum_pour.webp", m_happy: "cutouts/mum_happy.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.music({ bpm: 100, root: 60, seed: 33, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]] });
  const K1 = .5, SNIFF = 2.4, M1 = 2.9, SIP = 4.7, M2 = 5.1, M3 = 7.0, M4 = 8.6, M5 = 10.4, M6 = 11.9, K2 = 14.2, STAMP = 16.8, DUR = 19.6;
  const S = E.scene("kitchen", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1440;

  // ================= Mum's kitchen =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#f7e3a9,#f2d48f 60%,#eac27a)");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1440px;opacity:.18;background:repeating-linear-gradient(90deg,#fff 0 30px,transparent 30px 60px)");   // wallpaper stripes
  // gingham curtains over a window with a garden
  const win = E.el(R, "abs", "left:330px;top:400px;width:420px;height:380px;border-radius:10px;overflow:hidden;box-shadow:0 0 0 14px #fffaf0,0 0 0 18px #d8c8a0");
  win.innerHTML = `<svg viewBox="0 0 420 380" width="420" height="380"><rect width="420" height="380" fill="#bfe6f5"/><circle cx="330" cy="80" r="40" fill="#fff4c4"/>` +
    `<path d="M0 260 Q110 210 220 250 T420 230 V380 H0 Z" fill="#8bc48a"/>${[60, 150, 260, 350].map((x, i) => `<circle cx="${x}" cy="${270 + (i % 2) * 20}" r="${26 + (i % 2) * 8}" fill="${["#ff8fa8", "#ffd35c", "#ffffff", "#c79bff"][i]}"/>`).join("")}</svg>`;
  E.el(win, "abs", "left:204px;top:0;width:12px;height:380px;background:#fffaf0");
  [[300, 1], [690, -1]].forEach(([x, d]) => E.el(R, "abs", `left:${x}px;top:380px;width:90px;height:440px;border-radius:0 0 30px 30px;background-color:#fff;background-image:linear-gradient(90deg,rgba(220,80,80,.45) 50%,transparent 50%),linear-gradient(0deg,rgba(220,80,80,.45) 50%,transparent 50%);background-size:30px 30px;transform:skewX(${d * 3}deg)`));
  // family photos on the wall (left) and a clock (right)
  [[60, 450, 150, 180, "#8fc1e3"], [90, 670, 120, 140, "#f2b8b0"], [220, 560, 90, 110, "#b9e0a5"]].forEach(([x, y, w, h, c]) => {
    const f = E.el(R, "abs", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:#fff;box-shadow:0 0 0 8px #a0784a,0 8px 16px rgba(0,0,0,.2)`);
    f.innerHTML = `<svg viewBox="0 0 100 120" width="${w}" height="${h}" preserveAspectRatio="none"><rect width="100" height="120" fill="${c}"/><circle cx="38" cy="54" r="14" fill="#6b4a36"/><circle cx="64" cy="58" r="12" fill="#e0a070"/><path d="M14 120 Q38 76 62 120 Z" fill="#5a3d70"/><path d="M44 120 Q64 84 86 120 Z" fill="#c0392b"/></svg>`;
  });
  const clk = E.el(R, "abs", "left:860px;top:430px;width:150px;height:150px;border-radius:50%;background:radial-gradient(circle,#fffdf6 0 62%,#e25b5b 63%)");
  clk.innerHTML = `<svg viewBox="0 0 150 150" width="150" height="150"><line x1="75" y1="75" x2="75" y2="36" stroke="#333" stroke-width="5" stroke-linecap="round"/><line x1="75" y1="75" x2="104" y2="84" stroke="#333" stroke-width="6" stroke-linecap="round"/><circle cx="75" cy="75" r="5" fill="#333"/></svg>`;
  // shelf with jars, a kettle and a fruit bowl on the back counter
  E.el(R, "abs", "left:780px;top:640px;width:260px;height:14px;background:#a0784a");
  const jars = E.el(R, "abs", "left:790px;top:540px;width:240px;height:100px");
  jars.innerHTML = `<svg viewBox="0 0 240 100" width="240" height="100">${[["#f2c14e", "SUGAR"], ["#e8e1cf", "FLOUR"], ["#8a5a33", "TEA"]].map(([c], i) => `<rect x="${i * 80 + 6}" y="20" width="64" height="80" rx="10" fill="rgba(255,255,255,.55)" stroke="#fff" stroke-width="3"/><rect x="${i * 80 + 12}" y="44" width="52" height="52" rx="6" fill="${c}"/><rect x="${i * 80 + 2}" y="10" width="72" height="16" rx="5" fill="#c0392b"/>`).join("")}</svg>`;
  E.el(R, "abs", "left:0;top:1040px;width:1080px;height:26px;background:#e7d8bd;box-shadow:0 6px 10px rgba(0,0,0,.12)");
  const back = E.el(R, "abs", "left:60px;top:900px;width:960px;height:150px");
  back.innerHTML = `<svg viewBox="0 0 960 150" width="960" height="150"><path d="M720 60 Q720 20 770 20 Q820 20 820 60 L830 140 H710 Z" fill="#6fb3d9"/><path d="M820 60 Q860 70 850 110" stroke="#6fb3d9" stroke-width="12" fill="none"/><rect x="750" y="8" width="40" height="14" rx="6" fill="#335"/>` +
    `<path d="M40 110 Q110 160 180 110 Z" fill="#e0c9a0"/>${[70, 105, 140].map((x, i) => `<circle cx="${x}" cy="${104 - (i % 2) * 10}" r="20" fill="${["#ff8a3c", "#e5383b", "#ffd35c"][i]}"/>`).join("")}</svg>`;

  // ================= the two of them =================
  const KID = { k_serve: [867, 1152], k_nooo: [747, 1157], k_flat: [751, 1160] };
  const MUM = { m_sniff: [843, 1159], m_pour: [849, 1157], m_happy: [796, 1158] };
  const place = (layer, imgs, cx, H) => Object.entries(imgs).map(([n, [w, h]]) => { const W = w * H / h; return [n, E.img(layer, n, `position:absolute;left:${cx - W / 2}px;top:${TOP + 60 - H}px;width:${W}px;height:${H}px`)]; });
  const kidL = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px"), mumL = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px");
  const kEls = place(kidL, KID, 225, 840), mEls = place(mumL, MUM, 850, 840);
  const KP = [[0, "k_serve"], [M3, "k_nooo"], [K2 - .1, "k_flat"]];
  const MP = [[0, "m_sniff"], [M4 - .1, "m_pour"], [M6 - .1, "m_happy"]];
  E.F(t => {
    const k = at(KP, t), m = at(MP, t);
    kEls.forEach(([n, el]) => { el.style.opacity = n === k ? 1 : 0; }); mEls.forEach(([n, el]) => { el.style.opacity = n === m ? 1 : 0; });
    let mx = 0, my = 0;
    if (t >= M2 && t < M2 + .7) mx = Math.sin(t * 60) * 6;                                                // the "Strong." shudder
    if (t >= SNIFF && t < SNIFF + .9) my = -Math.abs(Math.sin((t - SNIFF) * 9)) * 6;                         // sniff-sniff
    for (const [kk] of MP.slice(1)) if (t >= kk && t < kk + .22) my = -Math.sin((t - kk) / .22 * Math.PI) * 14;
    mumL.style.transform = `translate(${mx}px,${my + Math.sin(t * 2.1) * 5}px)`;
    let ky = 0; for (const [kk] of KP.slice(1)) if (t >= kk && t < kk + .22) ky = -Math.sin((t - kk) / .22 * Math.PI) * 14;
    kidL.style.transform = `translateY(${ky + Math.sin(t * 2.4 + 1) * 5}px)`;
  });

  // ================= the kitchen island in front =================
  E.el(R, "abs", `left:0;top:${TOP}px;width:1080px;height:44px;z-index:4;background:linear-gradient(180deg,#fbf7ee,#e6dcc6);box-shadow:0 10px 20px rgba(0,0,0,.18)`);
  E.el(R, "abs", `left:0;top:${TOP + 44}px;width:1080px;height:${1920 - TOP - 44}px;z-index:4;background:#9cc3b0;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.1) 0 4px,transparent 4px 180px)`);
  // cloth, a biscuit tin and a teapot on the island
  const deco = E.el(R, "abs", `left:0;top:${TOP - 110}px;width:1080px;height:120px;z-index:5`);
  deco.innerHTML = `<svg viewBox="0 0 1080 120" width="1080" height="120"><rect x="470" y="96" width="140" height="18" rx="4" fill="#e25b5b"/><rect x="470" y="96" width="140" height="18" rx="4" fill="url(#gg)" opacity=".4"/>` +
    `<path d="M490 96 Q490 50 540 50 Q590 50 590 96 Z" fill="#fff" stroke="#6fb3d9" stroke-width="5"/><path d="M590 70 Q620 60 616 88" stroke="#6fb3d9" stroke-width="7" fill="none"/><path d="M490 80 Q466 70 458 56" stroke="#6fb3d9" stroke-width="7" fill="none"/><circle cx="540" cy="44" r="8" fill="#6fb3d9"/>` +
    `<ellipse cx="540" cy="80" rx="20" ry="8" fill="#ff8fa8" opacity=".7"/></svg>`;

  // the water jug and the sugar spoon (code), pouring into her glass
  const GX = 610, GY = 1010;                                                               // her glass, roughly, in the pour/sniff poses
  const jug = E.el(R, "abs", `left:${GX - 250}px;top:${GY - 360}px;width:190px;height:212px;z-index:6;opacity:0;transform-origin:80% 80%`);
  jug.innerHTML = `<svg viewBox="0 0 170 190" width="190" height="212" style="transform:scaleX(-1)"><path d="M30 20 H130 L150 170 Q150 184 136 184 H34 Q20 184 20 170 Z" fill="rgba(210,235,250,.7)" stroke="#fff" stroke-width="4"/><path d="M36 70 H144 L150 170 Q150 180 136 180 H34 Q22 180 22 170 Z" fill="rgba(140,200,240,.55)"/><path d="M130 40 Q170 60 160 120" stroke="#fff" stroke-width="10" fill="none"/><path d="M30 20 L6 6" stroke="#fff" stroke-width="8"/></svg>`;
  E.K(jug, "o", [[M3, 0], [M3 + .15, 1], [M3 + 1.3, 1], [M3 + 1.45, 0]]); E.K(jug, "r", [[M3, 0], [M3 + .35, 48, "out"], [M3 + 1.1, 48], [M3 + 1.35, 0]]);
  const stream = E.el(R, "abs", `left:${GX - 30}px;top:${GY - 230}px;width:14px;height:0;border-radius:7px;z-index:6;background:linear-gradient(180deg,rgba(170,215,245,.9),rgba(170,215,245,.4))`);
  E.K(stream, "h", [[M3 + .35, 0], [M3 + .5, 250], [M3 + 1.05, 250], [M3 + 1.2, 0]]);
  E.clip(M3 + .4, "sfx/elx-pour-splash.wav", { vol: .6, to: .9 });
  const spoon = E.el(R, "abs", `left:${GX - 20}px;top:${GY - 150}px;width:190px;height:70px;z-index:6;opacity:0;transform-origin:10% 50%`);
  spoon.innerHTML = `<svg viewBox="0 0 190 70" width="190" height="70"><rect x="60" y="30" width="130" height="12" rx="6" fill="#c9ced2"/><ellipse cx="40" cy="36" rx="36" ry="22" fill="#dfe3e6"/><ellipse cx="40" cy="30" rx="28" ry="12" fill="#fff"/>${[20, 32, 44, 56].map(x => `<rect x="${x}" y="20" width="6" height="6" fill="#fff" stroke="#ddd"/>`).join("")}</svg>`;
  E.K(spoon, "o", [[M5 - .1, 0], [M5, 1], [M5 + .9, 1], [M5 + 1.05, 0]]); E.K(spoon, "r", [[M5, 0], [M5 + .35, 70, "out"]]);
  for (let i = 0; i < 10; i++) { const g = E.el(R, "abs", `left:${GX - 10 + (i % 5) * 6}px;top:${GY - 130}px;width:7px;height:7px;background:#fff;box-shadow:0 0 2px rgba(0,0,0,.3);z-index:6;opacity:0`); E.K(g, "o", [[M5 + .3 + i * .03, 0], [M5 + .32 + i * .03, 1], [M5 + .7, 1], [M5 + .75, 0]]); E.K(g, "y", [[M5 + .3 + i * .03, 0], [M5 + .7, 110, "in"]]); }
  E.S(M5 + .3, "sparkle", .4);
  E.clip(M4 + .1, "sfx/elx-pour-splash.wav", { vol: .5, to: 1.0 });
  E.clip(SNIFF, "sfx/elx-sniff.wav", { vol: 1 }); E.clip(SIP, "sfx/elx-sip.wav", { vol: .9 }); E.clip(STAMP + .5, "sfx/elx-straw-slurp.wav", { vol: .8 });

  // ================= YOUR COCKTAIL meter =================
  const meter = E.el(R, "abs", `left:100px;top:258px;height:84px;display:flex;align-items:center;gap:18px;padding:0 28px 0 18px;border-radius:44px;background:${INK};z-index:8;opacity:0;transform-origin:0 50%`);
  const bar = E.el(meter, "", "width:190px;height:26px;border-radius:13px;background:rgba(255,255,255,.2);overflow:hidden;position:relative");
  const fill = E.el(bar, "", "position:absolute;left:0;top:0;height:26px;border-radius:13px;background:#ff8fb1");
  const txt = E.el(meter, "", "font-weight:800;font-size:44px;color:#fff;white-space:nowrap;font-variant-numeric:tabular-nums", "YOUR COCKTAIL: 100%");
  const LEFT = [[0, 100], [M3 + .6, 60], [M4 + .5, 25], [M5 + .5, 8], [M6, 0]];
  E.K(meter, "o", [[M3 - .3, 0], [M3 - .1, 1]]);
  E.F(t => { const v = at(LEFT, t); const s = `YOUR COCKTAIL: ${v}%`; if (txt.textContent !== s) txt.textContent = s; fill.style.width = `${v * 1.9}px`; fill.style.background = v > 50 ? "#ff8fb1" : v > 10 ? "#ffb35c" : "#ff9a1f"; meter.style.background = v <= 25 ? CORAL : INK; txt.style.color = v <= 25 ? INK : "#fff"; });
  LEFT.slice(1).forEach(([k]) => E.K(meter, "s", [[k - .01, 1], [k, 1.12], [k + .2, 1, "back"]]));

  // ================= bubbles =================
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 58, bg = "#fff", fg = INK, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.25);font-weight:800;font-size:${size}px;line-height:1.04;letter-spacing:-.02em;color:${fg};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  const MUMB = { left: 560, top: 400, w: 470, tail: 250 };
  bubble("I made you<br>a cocktail!", { left: 70, top: 420, w: 440, tail: 230, t0: K1, t1: SNIFF - .1, bg: GOLD });
  bubble("Is there alcohol<br>in this?", { ...MUMB, t0: M1, t1: SIP - .1 });
  bubble("Ooh. Strong.", { ...MUMB, top: 460, t0: M2, t1: M3 - .1, size: 62 });
  bubble("Little bit<br>of water.", { ...MUMB, t0: M3, t1: M4 - .1 });
  bubble("Bit of<br>orange juice.", { ...MUMB, t0: M4, t1: M5 - .1 });
  bubble("Spoon of<br>sugar…", { ...MUMB, t0: M5, t1: M6 - .1 });
  bubble("Perfect! Now<br>it's lovely!", { ...MUMB, t0: M6, t1: K2 - .1, bg: GOLD });
  bubble("Mum. That's<br>orange juice.", { left: 70, top: 420, w: 460, tail: 230, t0: K2, t1: STAMP, italic: true });
  [[K1, "k1"], [M1, "m1"], [M2, "m2"], [M3, "m3"], [M4, "m4"], [M5, "m5"], [M6, "m6"], [K2, "k2"]].forEach(([t, n]) => E.clip(t + .05, `voices/sk11/${n}.wav`, { vol: 1.35 }));
  const stampBox = E.el(R, "abs", "left:100px;top:360px;width:880px;display:flex;justify-content:center;z-index:9");
  const st = E.stamp(stampBox, "COCKTAIL: 0%.", STAMP, { size: 104, rot: -5, bg: CORAL, fg: INK, shake: 10 }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Making Mum a *cocktail.*", { size: 66, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, M3 - .5, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
