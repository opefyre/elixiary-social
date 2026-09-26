// SK.10 "Recipe vs. reality." — split screen. Top: THE RECIPE, a glossy studio shot, drawn in code, where every step is
// flawless. Bottom: YOU, the home bartender from SK.7 in his kitchen, where every step goes wrong: the salt rim becomes a salt
// storm, the "one large clear ice cube" is a cloudy freezer chunk with a pea in it, the silky foam explodes over his face, the
// dehydrated orange wheels come out as charcoal. Then the recipe camera pulls back: a food stylist hot-glues the garnish,
// the ice is acrylic, the foam is shaving cream. He sips his mess: "Tastes great though." THEIRS WASN'T EVEN REAL.
export const meta = {
  id: "sk10-recipe-vs-reality",
  images: {
    salt: "cutouts/hb_salt.webp", ice: "cutouts/hb_ice.webp", foam: "cutouts/hb_foam.webp", burnt: "cutouts/hb_burnt.webp", sip: "cutouts/hb_sip.webp",
    stylist: "cutouts/stylist.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.music({ bpm: 96, root: 57, seed: 90, prog: [[0, 4, 7, 11], [9, 12, 16, 19], [5, 9, 12, 16], [7, 11, 14, 17]] });
  const S1 = .9, S2 = 4.5, S3 = 8.1, S4 = 11.7, TW = 15.3, GREAT = 16.9, STAMP = 18.3, DUR = 20.8;
  const S = E.scene("split", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const eo = u => 1 - Math.pow(1 - u, 3);

  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#f4efe6,#ece4d6)");

  // ================= top panel: THE RECIPE =================
  const TP = { x: 60, y: 350, w: 960, h: 640 };
  const top = E.el(R, "abs", `left:${TP.x}px;top:${TP.y}px;width:${TP.w}px;height:${TP.h}px;border-radius:36px;overflow:hidden;box-shadow:0 24px 50px rgba(0,0,0,.28)`);
  const studio = E.el(top, "abs", `left:0;top:0;width:${TP.w}px;height:${TP.h}px;transform-origin:480px 250px`);
  // backdrop: dark slate with a soft key light; a marble plinth
  E.el(studio, "abs", `left:0;top:0;width:${TP.w}px;height:${TP.h}px;background:radial-gradient(ellipse at 50% 35%,#3c4852 0%,#1c232a 60%,#12171c 100%)`);
  const plinth = E.el(studio, "abs", `left:0;top:470px;width:${TP.w}px;height:170px`);
  plinth.innerHTML = `<svg viewBox="0 0 960 170" width="960" height="170"><defs><linearGradient id="mb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f1ec"/><stop offset="1" stop-color="#cfcbc2"/></linearGradient></defs>` +
    `<rect width="960" height="170" fill="url(#mb)"/><path d="M0 40 Q200 10 380 50 T760 30 T960 60" stroke="#b9b4aa" stroke-width="2.5" fill="none"/><path d="M80 120 Q300 90 520 130 T960 110" stroke="#c6c1b7" stroke-width="2" fill="none"/>` +
    `<ellipse cx="480" cy="30" rx="160" ry="16" fill="rgba(0,0,0,.18)"/></svg>`;
  // softboxes, tripod and camera — only seen when the camera pulls back
  [[40, 90], [800, 70]].forEach(([x, y]) => {
    const sb = E.el(studio, "abs", `left:${x}px;top:${y}px;width:120px;height:520px`);
    sb.innerHTML = `<svg viewBox="0 0 120 520" width="120" height="520"><rect x="4" y="0" width="112" height="150" rx="8" fill="#f8f6f0"/><rect x="4" y="0" width="112" height="150" rx="8" fill="none" stroke="#333" stroke-width="8"/>` +
      `<rect x="56" y="150" width="8" height="330" fill="#333"/><path d="M60 470 L10 516 M60 470 L110 516 M60 470 V516" stroke="#333" stroke-width="7"/></svg>`;
    E.el(studio, "abs", `left:${x - 80}px;top:${y - 60}px;width:280px;height:280px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.35),transparent)`);
  });
  const camRig = E.el(studio, "abs", "left:150px;top:300px;width:180px;height:340px;opacity:0");
  E.K(camRig, "o", [[TW, 0], [TW + .05, 1]]);
  camRig.innerHTML = `<svg viewBox="0 0 180 340" width="180" height="340"><rect x="30" y="10" width="120" height="76" rx="12" fill="#222"/><circle cx="98" cy="48" r="28" fill="#111" stroke="#555" stroke-width="6"/><circle cx="98" cy="48" r="12" fill="#335"/><rect x="40" y="0" width="30" height="14" rx="4" fill="#333"/>` +
    `<rect x="84" y="86" width="12" height="190" fill="#333"/><path d="M90 270 L30 336 M90 270 L150 336 M90 270 V336" stroke="#333" stroke-width="8"/></svg>`;

  // the hero cocktail: a coupe, built up step by step
  const G = E.el(studio, "abs", "left:330px;top:150px;width:300px;height:340px");
  G.innerHTML = `<svg viewBox="0 0 300 340" width="300" height="340" style="overflow:visible">
    <defs><linearGradient id="liq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb35c"/><stop offset="1" stop-color="#e2683a"/></linearGradient>
      <linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".2" stop-color="#fff" stop-opacity=".05"/><stop offset=".8" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".4"/></linearGradient></defs>
    <path d="M20 60 Q150 200 280 60 Z" fill="url(#liq)"/>
    <g class="foam" opacity="0"><path d="M26 64 Q150 110 274 64 L274 60 Q150 92 26 60 Z" fill="#fff6e6"/><ellipse cx="150" cy="62" rx="126" ry="16" fill="#fffaf0"/>
      <circle cx="150" cy="62" r="7" fill="#b3402a"/><circle cx="118" cy="64" r="4" fill="#b3402a"/><circle cx="182" cy="64" r="4" fill="#b3402a"/></g>
    <g class="cube" opacity="0"><rect x="112" y="40" width="76" height="76" rx="10" fill="rgba(235,248,255,.55)" stroke="rgba(255,255,255,.95)" stroke-width="3"/><path d="M122 54 L140 50" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g>
    <path d="M14 56 Q150 214 286 56" fill="url(#gl)" stroke="rgba(255,255,255,.85)" stroke-width="4"/>
    <rect x="143" y="150" width="14" height="150" fill="rgba(255,255,255,.75)"/><ellipse cx="150" cy="306" rx="70" ry="14" fill="rgba(255,255,255,.8)"/>
    <g class="rim" opacity="0">${Array.from({ length: 34 }, (_, i) => { const x = 14 + i * 8.2, y = 56 + (i % 2) * 3; return `<rect x="${x}" y="${y - 4}" width="5" height="5" fill="#fff"/>`; }).join("")}</g>
    <g class="wheel" opacity="0"><circle cx="262" cy="46" r="46" fill="#f7a23b"/><circle cx="262" cy="46" r="40" fill="#ffd28a"/>${Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2; return `<path d="M262 46 L${262 + Math.cos(a) * 38} ${46 + Math.sin(a) * 38}" stroke="#f7a23b" stroke-width="3"/>`; }).join("")}<circle cx="262" cy="46" r="6" fill="#fff3d0"/></g>
  </svg>`;
  const [foamG, cubeG, rimG, wheelG] = ["foam", "cube", "rim", "wheel"].map(c => G.querySelector("." + c));
  // salt crystals falling onto the rim, tongs lowering the cube, foam rising, the wheel sliding on
  const crystals = [];
  for (let i = 0; i < 18; i++) crystals.push(E.el(studio, "abs", `left:${345 + i * 15}px;top:0;width:6px;height:6px;background:#fff;opacity:0`));
  const tongs = E.el(studio, "abs", "left:436px;top:-260px;width:90px;height:260px");
  tongs.innerHTML = `<svg viewBox="0 0 90 260" width="90" height="260"><path d="M30 0 L40 240 M60 0 L50 240" stroke="#c9ced2" stroke-width="8" stroke-linecap="round"/><path d="M30 0 L60 0" stroke="#9aa1a8" stroke-width="10"/></svg>`;
  E.F(t => {
    crystals.forEach((c, i) => { const u = seg(t, S1 + .3 + (i % 6) * .08, .7); c.style.opacity = u > 0 && u < 1 ? 1 : 0; c.style.transform = `translateY(${-60 + u * 270}px) rotate(${u * 200}deg)`; });
    rimG.setAttribute("opacity", String(seg(t, S1 + .6, .6)));
    const tg = seg(t, S2 + .2, .9), up = seg(t, S2 + 1.6, .6);
    tongs.style.transform = `translateY(${eo(tg) * 400 - eo(up) * 400}px)`;
    cubeG.setAttribute("opacity", String(t >= S2 + 1.1 ? 1 : 0));
    cubeG.setAttribute("transform", `translate(0 ${t < S2 + 1.1 ? -60 : 0})`);
    foamG.setAttribute("opacity", String(seg(t, S3 + .3, .9)));
    const w = seg(t, S4 + .3, .7); wheelG.setAttribute("opacity", String(w > 0 ? 1 : 0)); wheelG.setAttribute("transform", `translate(${(1 - eo(w)) * 180} ${-(1 - eo(w)) * 60})`);
  });
  // sparkles on the perfect glass after each step
  [S1 + 1.3, S2 + 1.3, S3 + 1.3, S4 + 1.1].forEach((k, j) => {
    const sp = E.el(studio, "abs", `left:${[360, 560, 400, 600][j]}px;top:${[190, 180, 210, 140][j]}px;width:54px;height:54px;opacity:0`);
    sp.innerHTML = `<svg viewBox="0 0 60 60" width="54" height="54"><path d="M30 0 L34 26 L60 30 L34 34 L30 60 L26 34 L0 30 L26 26 Z" fill="#fff"/></svg>`;
    E.K(sp, "o", [[k, 0], [k + .1, 1], [k + .6, 0]]); E.K(sp, "s", [[k, .3], [k + .3, 1.2], [k + .6, .5]]); E.S(k, "sparkle", .45);
  });
  // the reveal: prop tags, the stylist, a shutter flash
  const tag = (txt, x, y, t0) => {
    const g = E.el(studio, "abs", `left:${x}px;top:${y}px;padding:6px 14px 8px;border-radius:8px;background:#fff8d8;box-shadow:0 4px 10px rgba(0,0,0,.35);font-weight:800;font-size:22px;color:${INK};white-space:nowrap;opacity:0;transform:rotate(${(x % 7) - 3}deg)`, txt);
    E.K(g, "o", [[t0, 0], [t0 + .15, 1]]); E.K(g, "s", [[t0, .5], [t0 + .3, 1, "back"]]); E.S(t0, "pop", .35);
  };
  const SH = 520, SW = 659 * SH / 989;
  const sty = E.el(studio, "abs", `left:${960 - SW + 30}px;top:${640 - SH + 10}px;width:${SW}px;height:${SH}px;opacity:0`);
  E.K(sty, "o", [[TW, 0], [TW + .05, 1]]);
  E.img(sty, "stylist", `width:${SW}px;height:${SH}px`);
  E.F(t => { const z = 2.3 - .15 * clamp(t / TW, 0, 1); studio.style.transform = `scale(${t < TW ? z : 2.15 - 1.15 * eo(seg(t, TW, 1.1))})`; });   // slow push-in, then the pull-back
  tag("ICE: ACRYLIC", 250, 170, TW + 1.2); tag("FOAM: SHAVING CREAM", 230, 250, TW + 1.45); tag("WHEEL: HOT GLUE", 560, 90, TW + 1.7);
  const flash = E.el(top, "abs", `left:0;top:0;width:${TP.w}px;height:${TP.h}px;background:#fff;opacity:0`);
  E.K(flash, "o", [[TW + 2.2, 0], [TW + 2.23, .8], [TW + 2.5, 0]]); E.clip(TW + 2.15, "sfx/elx-camera-shutter.wav", { vol: .8 });
  E.S(TW, "whoosh", .6);
  E.el(top, "abs", `left:26px;top:22px;padding:10px 20px 12px;border-radius:14px;background:rgba(255,255,255,.14);backdrop-filter:blur(6px);font-weight:800;font-size:30px;letter-spacing:.14em;color:#fff`, "THE RECIPE");

  // ================= bottom panel: YOU =================
  const BP = { x: 60, y: 1100, w: 960, h: 700 };
  const bot = E.el(R, "abs", `left:${BP.x}px;top:${BP.y}px;width:${BP.w}px;height:${BP.h}px;border-radius:36px;overflow:hidden;box-shadow:0 24px 50px rgba(0,0,0,.28)`);
  // his kitchen: tiles, counter, a window
  E.el(bot, "abs", `left:0;top:0;width:${BP.w}px;height:${BP.h}px;background-color:#fbfaf6;background-image:linear-gradient(0deg,#d9d4ca 3px,transparent 3px),linear-gradient(90deg,#d9d4ca 3px,transparent 3px),linear-gradient(90deg,#d9d4ca 3px,transparent 3px);background-size:100% 52px,104px 104px,104px 104px;background-position:0 0,0 0,52px 52px`);
  const bwin = E.el(bot, "abs", "left:640px;top:60px;width:260px;height:220px;border-radius:8px;overflow:hidden;box-shadow:0 0 0 12px #fbfaf6,0 0 0 16px #d9d4ca");
  bwin.innerHTML = `<svg viewBox="0 0 260 220" width="260" height="220"><rect width="260" height="220" fill="#bfe3f2"/><path d="M0 160 Q70 120 130 150 T260 140 V220 H0 Z" fill="#8bc48a"/></svg>`;
  const CT = 430;
  E.el(bot, "abs", `left:0;top:${CT}px;width:${BP.w}px;height:34px;background:linear-gradient(180deg,#e9e6df,#cfcac0);box-shadow:0 8px 14px rgba(0,0,0,.15)`);
  E.el(bot, "abs", `left:0;top:${CT + 34}px;width:${BP.w}px;height:${BP.h - CT - 34}px;background:#6f8f7a;box-shadow:inset 0 0 0 10px #5f7f6a`);
  // his glass on the counter: each step leaves it worse
  const mine = E.el(bot, "abs", `left:640px;top:${CT - 200}px;width:220px;height:210px`);
  mine.innerHTML = `<svg viewBox="0 0 220 210" width="220" height="210" style="overflow:visible">
    <path d="M20 40 Q110 150 200 40 Z" fill="#c98a4a" opacity=".9"/>
    <g class="salt" opacity="0"><path d="M-10 196 Q110 120 230 196 Z" fill="#f4f4f0"/>${Array.from({ length: 30 }, (_, i) => `<rect x="${(i * 37) % 220}" y="${150 + (i * 13) % 50}" width="5" height="5" fill="#fff"/>`).join("")}</g>
    <g class="chunk" opacity="0"><path d="M60 10 L150 0 L168 60 L120 96 L52 80 Z" fill="rgba(225,235,240,.95)" stroke="#fff" stroke-width="3"/><path d="M70 30 L140 20 M66 60 L130 70" stroke="rgba(200,210,215,.9)" stroke-width="6"/><circle cx="104" cy="46" r="11" fill="#7cc242"/><circle cx="100" cy="42" r="3" fill="#bde68a"/></g>
    <g class="mess" opacity="0">${[[30, 20, 34], [90, 4, 42], [160, 16, 36], [190, 60, 24], [10, 70, 22]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fffaf0"/>`).join("")}<path d="M30 40 Q20 110 26 170 M180 50 Q196 120 190 180" stroke="#fffaf0" stroke-width="14" fill="none" stroke-linecap="round"/></g>
    <g class="char" opacity="0"><circle cx="170" cy="30" r="34" fill="#1f1611"/><circle cx="170" cy="30" r="26" fill="#2e211a"/><path d="M150 18 L186 44" stroke="#3a2a20" stroke-width="3"/></g>
    <path d="M14 36 Q110 158 206 36" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="4"/><rect x="104" y="96" width="12" height="92" fill="rgba(255,255,255,.85)"/><ellipse cx="110" cy="192" rx="54" ry="10" fill="rgba(255,255,255,.85)"/>
  </svg>`;
  const [saltG, chunkG, messG, charG] = ["salt", "chunk", "mess", "char"].map(c => mine.querySelector("." + c));
  E.F(t => {
    saltG.setAttribute("opacity", String(seg(t, S1 + .6, .5))); chunkG.setAttribute("opacity", String(t >= S2 + 1.9 ? 1 : 0));
    messG.setAttribute("opacity", String(t >= S3 + 1.0 ? 1 : 0)); charG.setAttribute("opacity", String(t >= S4 + 1.4 ? 1 : 0));
  });
  E.S(S2 + 1.9, "thud", .6);
  // him
  const HIMS = { salt: [488, 995], ice: [507, 1001], foam: [433, 1003], burnt: [407, 1000], sip: [432, 1001] };
  const him = E.el(bot, "abs", `left:0;top:0;width:${BP.w}px;height:${BP.h}px`);
  const hEls = Object.entries(HIMS).map(([n, [w, h]]) => { const H = 660, W = w * H / h; return [n, E.img(him, n, `position:absolute;left:${320 - W / 2}px;top:${BP.h + 40 - H}px;width:${W}px;height:${H}px`)]; });
  const HP = [[0, "salt"], [S2, "ice"], [S3, "foam"], [S4, "burnt"], [TW + .6, "sip"]];
  E.F(t => {
    const f = at(HP, t); hEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    let dx = 0, sy = 1;
    if (t >= S2 && t < S2 + 1.9) dx = Math.sin(t * 50) * 4;
    for (const [k] of HP.slice(1)) if (t >= k && t < k + .22) sy = 1 + .05 * Math.sin((t - k) / .22 * Math.PI);
    him.style.transform = `translateX(${dx}px) rotate(${Math.sin(t * 2.4) * 1.2}deg) scaleY(${sy})`; him.style.transformOrigin = `320px ${BP.h}px`;
  });
  // salt storm
  const grains = [];
  for (let i = 0; i < 60; i++) grains.push(E.el(bot, "abs", `left:0;top:0;width:${4 + (i % 3) * 2}px;height:${4 + (i % 3) * 2}px;background:#fff;box-shadow:0 0 2px rgba(0,0,0,.2);opacity:0`));
  E.F(t => grains.forEach((g, i) => { const u = seg(t, S1 + .1 + (i % 12) * .05, 1.6); const a = i * 2.39; g.style.opacity = u > 0 && u < 1 ? 1 - u * .6 : 0; g.style.transform = `translate(${330 + Math.cos(a) * u * (160 + (i % 5) * 40)}px,${260 + Math.sin(a) * u * (120 + (i % 4) * 30) + u * u * 120}px)`; }));
  E.clip(S1 + .1, "sfx/elx-salt-pour.wav", { vol: .9 });
  // foam explosion: splats across the panel that slide down
  for (let i = 0; i < 9; i++) {
    const f = E.el(bot, "abs", `left:${80 + (i * 97) % 760}px;top:${60 + (i * 53) % 240}px;width:${50 + (i % 3) * 30}px;height:${40 + (i % 3) * 24}px;border-radius:50% 50% 45% 55%;background:#fffaf0;box-shadow:inset -4px -6px 0 rgba(0,0,0,.05);opacity:0`);
    E.K(f, "o", [[S3 + .9, 0], [S3 + .93, 1], [S4 - .3, 1], [S4, 0]]); E.K(f, "s", [[S3 + .9, .2], [S3 + 1.05, 1.1, "out"], [S3 + 1.2, 1]]);
    E.K(f, "y", [[S3 + 1.2, 0], [S4, 60 + (i % 3) * 30, "in"]]);
  }
  for (let t = S3 + .2; t < S3 + .9; t += .12) E.S(t, "swish", .35);
  E.clip(S3 + .88, "sfx/elx-foam-burst.wav", { vol: 1 }); E.shake(S3 + .9, 10, .25);
  // smoke and the smoke alarm
  const smokes = [];
  for (let i = 0; i < 8; i++) smokes.push([E.el(bot, "abs", `left:${250 + (i % 4) * 30}px;top:200px;width:${80 + (i % 3) * 30}px;height:${80 + (i % 3) * 30}px;border-radius:50%;background:radial-gradient(circle,rgba(70,70,70,.55),rgba(70,70,70,0) 70%);opacity:0`), i]);
  E.F(t => smokes.forEach(([p, i]) => { const u = ((t - S4 - .3 - i * .25) / 2); const v = u - Math.floor(u); p.style.opacity = t > S4 + .3 + i * .25 && t < TW + .3 ? (1 - v) * .9 : 0; p.style.transform = `translate(${Math.sin(v * 5 + i) * 30}px,${-v * 260}px) scale(${.6 + v * 1.5})`; }));
  const alarm = E.el(bot, "abs", "left:440px;top:18px;width:110px;height:36px;border-radius:20px 20px 32px 32px;background:linear-gradient(180deg,#fdfdfd,#d8dbde);box-shadow:0 6px 10px rgba(0,0,0,.2)");
  const led = E.el(alarm, "abs", "left:48px;top:11px;width:14px;height:14px;border-radius:50%;background:#7a1f1f");
  E.F(t => { const on = t > S4 + 1 && t < TW + .4 && Math.floor(t * 2.5) % 2 === 0; led.style.background = on ? "#ff3b30" : "#7a1f1f"; led.style.boxShadow = on ? "0 0 20px 8px rgba(255,59,48,.8)" : "none"; });
  for (let t = S4 + 1; t < TW + .3; t += .4) E.S(t, "buzz", .4);
  E.el(bot, "abs", `left:26px;top:22px;padding:10px 20px 12px;border-radius:14px;background:rgba(20,35,29,.82);font-weight:800;font-size:30px;letter-spacing:.14em;color:#fff`, "YOU");

  // ================= step strip between the panels =================
  const STEPS = [[S1, "STEP 1 · Rim the glass with salt"], [S2, "STEP 2 · One large, clear ice cube"], [S3, "STEP 3 · Top with a silky foam"],
    [S4, "STEP 4 · Garnish: dehydrated orange"], [TW, "BEHIND THE SCENES"]];
  const strip = E.el(R, "abs", `left:60px;top:1010px;width:960px;height:74px;display:flex;align-items:center;justify-content:center;z-index:6`);
  const stripTxt = E.el(strip, "", `padding:10px 28px 12px;border-radius:40px;background:${INK};color:#fff;font-weight:800;font-size:38px;letter-spacing:-.01em;white-space:nowrap;box-shadow:0 10px 24px rgba(0,0,0,.25)`, "");
  E.F(t => { const s = at([[0, ""], ...STEPS], t); if (stripTxt.textContent !== s) stripTxt.textContent = s; stripTxt.style.opacity = s ? 1 : 0; stripTxt.style.background = t >= TW ? CORAL : INK; stripTxt.style.color = t >= TW ? INK : "#fff"; });
  STEPS.forEach(([k]) => { E.K(strip, "s", [[k - .01, 1], [k, 1.1], [k + .22, 1, "back"]]); E.S(k, "ding", .35); });

  // ================= the ending =================
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 58, bg = "#fff", fg = INK } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.3);font-weight:800;font-size:${size}px;line-height:1.04;letter-spacing:-.02em;color:${fg};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .5);
  };
  bubble("Tastes great<br>though.", { left: 440, top: 1170, w: 420, tail: 90, t0: GREAT, t1: DUR, size: 58, bg: GOLD });
  E.clip(GREAT + .05, "voices/sk10/great.wav", { vol: 1.4 });
  const stampBox = E.el(R, "abs", "left:100px;top:520px;width:880px;display:flex;justify-content:center;z-index:9");
  const st = E.stamp(stampBox, "IT WASN'T EVEN REAL.", STAMP, { size: 76, rot: -5, bg: CORAL, fg: INK, shake: 10 }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Recipe vs. *reality.*", { size: 70, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
