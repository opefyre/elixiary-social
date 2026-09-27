// SK.26 "Assembling a cocktail." — wordless, flat-pack furniture parody. A flat box: "KOKTÄJL · 1 drink · 47 parts".
// Parts spill out (glass bowl, stem, base, ice ×4, lime, mint, straw, umbrella, a bag of olives-as-screws, a hex key).
// He reads the manual upside down, turns the hex key on an olive, and the line-art manual steps fly past. The cocktail is
// built. He raises the lime in triumph. Then: LEFTOVER PARTS — 3 olives, a tiny umbrella. He shrugs, sets the umbrella on
// the rim… the whole glass collapses. Final manual page: a stick figure at a bar, being handed a drink. No voices.
export const meta = {
  id: "sk26-flat-pack",
  images: { manual: "cutouts/hb_manual.webp", hexkey: "cutouts/hb_hexkey.webp", triumph: "cutouts/hb_triumph.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", LINE = "#1a1a1a";
  E.episode(-16);
  const BOX = .15, OPEN = 1.6, READ = 2.8, P1 = 3.6, HEX = 6.0, P2 = 7.0, P3 = 9.0, BUILT = 11.0, TRI = 11.6, LEFT = 13.4, TOUCH = 15.4, FALL = 15.9, FINAL = 17.4, DUR = 20.4;
  E.music({ bpm: 112, root: 60, seed: 26, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: FALL });
  const S = E.scene("room", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const FL = 1560;

  // ================= a flat's living room floor =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#eef0f2,#e2e5e8)");
  E.el(R, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background:#c9a57a;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.1) 0 3px,transparent 3px 160px)`);
  E.el(R, "abs", `left:0;top:${FL - 18}px;width:1080px;height:20px;background:#fff`);
  const win = E.el(R, "abs", "left:620px;top:420px;width:380px;height:440px;border-radius:8px;overflow:hidden;box-shadow:0 0 0 12px #fff,0 0 0 16px #cfd4d8");
  win.innerHTML = `<svg viewBox="0 0 380 440" width="380" height="440"><rect width="380" height="440" fill="#bfe3f2"/><circle cx="290" cy="90" r="36" fill="#fff4c4"/><path d="M0 330 Q100 280 190 320 T380 300 V440 H0 Z" fill="#8bc48a"/></svg>`;
  E.el(win, "abs", "left:184px;top:0;width:12px;height:440px;background:#fff");
  // a half-built bookshelf in the corner (he has done this before)
  const shelf = E.el(R, "abs", `left:40px;top:${FL - 520}px;width:240px;height:520px`);
  shelf.innerHTML = `<svg viewBox="0 0 240 520" width="240" height="520"><rect x="0" y="0" width="16" height="520" fill="#e8d6b8"/><rect x="224" y="60" width="16" height="460" fill="#e8d6b8" transform="rotate(4 232 290)"/><rect x="0" y="140" width="240" height="14" fill="#dcc7a4"/><rect x="0" y="320" width="200" height="14" fill="#dcc7a4" transform="rotate(-6 100 327)"/><rect x="0" y="506" width="240" height="14" fill="#dcc7a4"/></svg>`;

  // ================= the flat box =================
  const box = E.el(R, "abs", `left:260px;top:${FL - 150}px;width:560px;height:170px;z-index:2`);
  box.innerHTML = `<svg viewBox="0 0 560 170" width="560" height="170"><rect x="0" y="20" width="560" height="150" fill="#c89b62"/><rect x="0" y="0" width="560" height="30" fill="#b88a52"/>` +
    `<text x="30" y="92" font-family="Noto Sans" font-weight="800" font-size="46" fill="${LINE}">KOKTÄJL</text><text x="30" y="132" font-family="Inter" font-size="24" fill="${LINE}">1 drink · 47 parts · 2 persons</text>` +
    `<g transform="translate(440 40)" stroke="${LINE}" stroke-width="4" fill="none"><path d="M10 10 Q50 60 90 10 Z"/><path d="M50 46 V100 M30 100 H70"/></g></svg>`;
  E.K(box, "o", [[BOX, 0], [BOX + .1, 1], [OPEN + .4, 1], [OPEN + .6, 0]]); E.K(box, "y", [[BOX, -300], [BOX + .4, 0, "out"]]); E.S(BOX + .4, "thud", .8);
  // the parts, spilled across the floor
  const PARTS = [
    ["bowl", 600, 1490, `<path d="M4 4 Q60 80 116 4 Z" fill="rgba(220,240,255,.6)" stroke="${LINE}" stroke-width="3"/>`, 120, 70],
    ["stem", 750, 1480, `<rect x="4" y="0" width="12" height="90" rx="4" fill="rgba(220,240,255,.7)" stroke="${LINE}" stroke-width="3"/>`, 20, 90],
    ["base", 800, 1545, `<ellipse cx="46" cy="14" rx="44" ry="12" fill="rgba(220,240,255,.7)" stroke="${LINE}" stroke-width="3"/>`, 92, 28],
    ["ice", 580, 1580, [0, 1, 2, 3].map(i => `<rect x="${i * 34}" y="${(i % 2) * 8}" width="28" height="28" rx="5" fill="#eaf6ff" stroke="${LINE}" stroke-width="2.5"/>`).join(""), 140, 40],
    ["lime", 900, 1530, `<path d="M4 30 A30 30 0 0 1 64 30 Z" fill="#9bd14a" stroke="${LINE}" stroke-width="3"/>`, 68, 34],
    ["olives", 930, 1600, `<path d="M4 4 H70 V60 H4 Z" fill="rgba(255,255,255,.7)" stroke="${LINE}" stroke-width="2.5"/>` + [[20, 24], [44, 22], [30, 42], [52, 44]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="8" fill="#6a8f2a"/>`).join(""), 74, 64],
    ["umbrella", 1000, 1500, `<path d="M4 30 Q34 0 64 30 Z" fill="${CORAL}" stroke="${LINE}" stroke-width="2.5"/><path d="M34 30 V70" stroke="${LINE}" stroke-width="3"/>`, 68, 72],
  ];
  const partEls = {};
  PARTS.forEach(([id, x, y, svg, w, h], i) => {
    const p = E.el(R, "abs", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;z-index:3;opacity:0`);
    p.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible">${svg}</svg>`;
    const t0 = OPEN + i * .08; E.K(p, "o", [[t0, 0], [t0 + .05, 1]]); E.K(p, "y", [[t0, -120], [t0 + .35, 0, "back"]]); E.K(p, "r", [[t0, (i % 2 ? 60 : -60)], [t0 + .35, 0, "out"]]);
    partEls[id] = p;
  });
  E.clip(OPEN, "sfx/elx-ice-scatter.wav", { vol: .6 });
  // the glass parts get used during the build
  ["bowl", "stem", "base", "ice", "lime"].forEach((id, i) => E.K(partEls[id], "o", [[BUILT - .6 + i * .05, 1], [BUILT - .5 + i * .05, 0]]));

  // ================= him =================
  const HIM = { manual: [524, 1003, 1000], hexkey: [611, 967, 900], triumph: [566, 1003, 1060] };
  const him = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:4");
  const himIn = E.el(him, "abs", "left:0;top:0;width:1080px;height:1920px");
  const hEls = Object.entries(HIM).map(([n, [w, h, H]]) => { const W = w * H / h; return [n, E.img(himIn, n, `position:absolute;left:${300 - W / 2}px;top:${FL + 60 - H}px;width:${W}px;height:${H}px`)]; });
  const HP = [[0, "manual"], [HEX, "hexkey"], [P3, "manual"], [TRI, "triumph"], [LEFT, "manual"], [FALL + .2, "hexkey"]];
  E.K(him, "o", [[READ - .3, 0], [READ, 1]]); E.K(him, "x", [[READ - .3, -300], [READ, 0, "out"]]);
  E.F(t => {
    const f = at(HP, t); hEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    let y = Math.sin(t * 2) * 3;
    for (const [k] of HP.slice(1)) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 16;
    himIn.style.transform = `translateY(${y}px)`;
  });
  E.clip(READ, "sfx/elx-paper-unfold.wav", { vol: .9 }); E.clip(P3 + 1.1, "sfx/elx-paper-unfold.wav", { vol: .7 });
  for (let t = HEX + .1; t < P2 + 1.6; t += 1.2) E.clip(t, "sfx/elx-ratchet.wav", { vol: .9 });

  // ================= the manual pages (line art) =================
  const page = (t0, t1, step, svg, flip = false) => {
    const p = E.el(R, "abs", `left:140px;top:430px;width:800px;height:620px;background:#fbfbf8;border-radius:6px;box-shadow:0 30px 60px rgba(0,0,0,.35);z-index:8;opacity:0`);
    p.innerHTML = `<div style="position:absolute;left:28px;top:18px;font-weight:800;font-size:70px;color:${LINE}">${step}</div><svg viewBox="0 0 800 620" width="800" height="620" style="position:absolute;left:0;top:0" fill="none" stroke="${LINE}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>`;
    E.K(p, "o", [[t0, 0], [t0 + .15, 1], [t1 - .15, 1], [t1, 0]]); E.K(p, "r", flip ? [[t0, 172], [t0 + .3, 178, "out"], [t0 + 1.1, 178], [t0 + 1.5, -2, "back"]] : [[t0, -8], [t0 + .3, -2, "out"]]); E.K(p, "s", [[t0, .8], [t0 + .3, 1, "back"]]);
    E.clip(t0, "sfx/elx-paper-unfold.wav", { vol: .5, to: .6 });
  };
  const stick = (x, y, mood = "happy", s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-120" r="30" fill="#fbfbf8"/>` +
    (mood === "happy" ? `<path d="M-12 -112 Q0 -100 12 -112"/>` : mood === "sad" ? `<path d="M-12 -104 Q0 -116 12 -104"/>` : `<path d="M-10 -110 H10"/>`) + `<circle cx="-10" cy="-126" r="2" fill="${LINE}"/><circle cx="10" cy="-126" r="2" fill="${LINE}"/>` +
    `<path d="M0 -90 V-10 M0 -70 L-40 -40 M0 -70 L40 -40 M0 -10 L-30 50 M0 -10 L30 50"/></g>`;
  page(P1, HEX - .2, "1", `${stick(160, 460)}<path d="M320 200 Q400 300 480 200 Z"/><path d="M400 250 V380 M360 380 H440"/><path d="M540 300 H660 M640 280 L660 300 L640 320"/><text x="560" y="260" font-family="Noto Sans" font-size="40" fill="${LINE}" stroke="none">1x</text>` +
    `<path d="M600 420 Q640 470 680 420 Z"/><path d="M640 450 V520 M615 520 H665"/>`);
  page(P2, P3 - .1, "2", `${[0, 1, 2, 3].map(i => `<rect x="${230 + i * 70}" y="170" width="50" height="50" rx="8"/>`).join("")}<path d="M300 260 V330 M280 310 L300 330 L320 310"/><path d="M280 350 Q380 470 480 350 Z"/><text x="520" y="220" font-family="Noto Sans" font-size="40" fill="${LINE}" stroke="none">4x</text>` +
    `<g transform="translate(560 360)"><ellipse cx="0" cy="0" rx="22" ry="16"/><path d="M28 0 H120"/><path d="M90 -20 L120 0 L90 20"/></g>`);
  page(P3, BUILT - .1, "3", `${stick(250, 470, "sad")}${stick(560, 470, "happy")}<path d="M330 380 L480 380"/><path d="M620 260 l30 -40 M650 220 l30 40"/><circle cx="400" cy="250" r="60"/><path d="M370 220 L430 280 M430 220 L370 280"/><text x="560" y="150" font-family="Noto Sans" font-size="40" fill="${LINE}" stroke="none">2x</text>`, true);

  // ================= the finished cocktail (assembled from parts, then collapses) =================
  const CX = 720, CY = FL - 20;
  const glassParts = [
    ["base", `<ellipse cx="60" cy="10" rx="56" ry="12" fill="rgba(220,240,255,.8)" stroke="${LINE}" stroke-width="3"/>`, CX - 60, CY - 20, 120, 24],
    ["stem", `<rect x="4" y="0" width="14" height="120" rx="5" fill="rgba(220,240,255,.8)" stroke="${LINE}" stroke-width="3"/>`, CX - 11, CY - 140, 22, 122],
    ["bowl", `<path d="M4 4 Q90 130 176 4 Z" fill="#f28ca0" stroke="${LINE}" stroke-width="3"/><rect x="40" y="10" width="30" height="30" rx="6" fill="#eaf6ff" stroke="${LINE}" stroke-width="2"/><rect x="100" y="14" width="28" height="28" rx="6" fill="#eaf6ff" stroke="${LINE}" stroke-width="2"/><path d="M130 0 A26 26 0 0 1 176 -10" fill="#9bd14a" stroke="${LINE}" stroke-width="3"/>`, CX - 90, CY - 230, 180, 100],
  ];
  const gEls = glassParts.map(([id, svg, x, y, w, h], i) => {
    const g = E.el(R, "abs", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;z-index:5;opacity:0;transform-origin:50% 100%`);
    g.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible">${svg}</svg>`;
    E.K(g, "o", [[BUILT - .5 + i * .2, 0], [BUILT - .4 + i * .2, 1]]); E.K(g, "y", [[BUILT - .5 + i * .2, -80], [BUILT - .2 + i * .2, 0, "back"]]);
    // the collapse: each piece falls its own way
    const dx = [-60, 40, 120][i], rot = [-20, 80, 150][i];
    E.K(g, "x", [[FALL, 0], [FALL + .6, dx, "in"]]); E.K(g, "r", [[FALL, 0], [FALL + .6, rot, "in"]]);
    E.K(g, "y", [[FALL, 0], [FALL + .6, 200 - i * 60, "in"]]);
    return g;
  });
  [0, 1, 2].forEach(i => E.S(BUILT - .4 + i * .2, "pop", .6));
  const sparkle = E.el(R, "abs", `left:${CX + 60}px;top:${CY - 300}px;width:60px;height:60px;opacity:0;z-index:6`);
  sparkle.innerHTML = `<svg viewBox="0 0 60 60" width="60" height="60"><path d="M30 0 L34 26 L60 30 L34 34 L30 60 L26 34 L0 30 L26 26 Z" fill="${GOLD}"/></svg>`;
  E.K(sparkle, "o", [[BUILT + .3, 0], [BUILT + .4, 1], [BUILT + 1.2, 0]]); E.S(BUILT + .3, "sparkle", .8); E.clip(TRI, "sfx/applause-cheer.wav", { vol: .5, to: 1.4 });
  // the tiny umbrella: he places it on the rim → collapse
  const umb = E.el(R, "abs", `left:${CX + 40}px;top:${CY - 330}px;width:68px;height:72px;z-index:6;opacity:0`);
  umb.innerHTML = `<svg viewBox="0 0 68 72" width="68" height="72"><path d="M4 30 Q34 0 64 30 Z" fill="${CORAL}" stroke="${LINE}" stroke-width="2.5"/><path d="M34 30 V70" stroke="${LINE}" stroke-width="3"/></svg>`;
  E.K(umb, "o", [[TOUCH, 0], [TOUCH + .05, 1], [FALL + .6, 1], [FALL + .7, 0]]); E.K(umb, "y", [[TOUCH, -120], [FALL, 0, "in"], [FALL + .6, 260, "in"]]);
  E.clip(FALL, "sfx/elx-parts-collapse.wav", { vol: 1.1 }); E.shake(FALL, 14, .35);
  const splash = E.el(R, "abs", `left:${CX - 120}px;top:${FL - 10}px;width:0;height:30px;border-radius:50%;background:rgba(242,140,160,.7);z-index:4`);
  E.K(splash, "w", [[FALL + .4, 0], [FALL + .9, 280, "out"]]);

  // ================= LEFTOVER PARTS =================
  const left = E.el(R, "abs", `left:560px;top:${FL - 400}px;padding:14px 24px;border-radius:18px;background:${INK};color:#fff;font-weight:800;font-size:46px;z-index:8;opacity:0;white-space:nowrap`, "LEFTOVER PARTS: 11");
  E.K(left, "o", [[LEFT, 0], [LEFT + .15, 1], [TOUCH, 1], [TOUCH + .2, 0]]); E.K(left, "s", [[LEFT, .5], [LEFT + .3, 1, "back"]]); E.S(LEFT, "nope", .6);
  E.K(partEls.olives, "s", [[LEFT, 1], [LEFT + .2, 1.4, "out"], [LEFT + .5, 1.2]]);
  E.K(partEls.umbrella, "o", [[TOUCH - .05, 1], [TOUCH, 0]]);

  // ================= the final manual page =================
  page(FINAL, DUR + 1, "14", `${stick(260, 470, "happy")}<rect x="420" y="330" width="320" height="30"/><path d="M440 360 V520 M720 360 V520"/>${stick(620, 330, "happy", .8)}<path d="M330 400 L420 360"/>` +
    `<path d="M300 380 Q320 420 340 380 Z"/><path d="M320 400 V430 M308 430 H332"/><path d="M520 150 Q570 110 620 150" stroke-dasharray="10 10"/><circle cx="660" cy="130" r="26"/><path d="M650 124 l8 8 l16 -16"/>`);
  const cap = E.el(R, "abs", `left:0;top:1120px;width:1080px;text-align:center;z-index:9;opacity:0`, `<span style="display:inline-block;padding:12px 28px 14px;border-radius:16px;background:${INK};color:#fff;font-weight:800;font-size:44px">Or… just follow a recipe.</span>`);
  E.K(cap, "o", [[FINAL + .8, 0], [FINAL + 1.0, 1]]);

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Assembling a *cocktail.*", { size: 66, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, P1 - .1, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
