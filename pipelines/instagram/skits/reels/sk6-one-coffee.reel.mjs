// SK.6 "One coffee, please." — a sunburnt tourist at a Lisbon pastelaria counter asks for "one coffee". The barista fires back
// seven questions in European Portuguese (voiced, subtitled), which pile up around the tourist. "Uh… just… coffee?"
// An old regular walks in and raises one eyebrow. The barista slides his exact bica across without a word: "Bom dia, senhor
// António." 40 YEARS. The tourist, quietly: "…I'll have what he's having."
// Voices: ElevenLabs (tourist: Charlie; barista: Paulo, European Portuguese), cut to assets/voices/sk6/.
export const meta = {
  id: "sk6-one-coffee",
  images: {
    t_ask: "cutouts/tour_ask.webp", t_sweat: "cutouts/tour_sweat.webp",
    b_talk: "cutouts/bar_talk.webp", b_slide: "cutouts/bar_slide.webp", old: "cutouts/oldman.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", BLUE = "#1f4e9c";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const ASK = .6, Q0 = 2.4;
  const TOP = 1400;
  // the seven questions: start times spaced for reading, and never overlapping the previous clip
  const QD = [.62, 1.46, .64, .82, .95, 1.17, .92];
  const GAPS = [1.3, 1.2, 1.1, 1.0, .95, .9];
  const QT = [Q0]; for (let i = 0; i < 6; i++) QT.push(QT[i] + Math.max(GAPS[i], QD[i] + .1));
  const SWEAT = QT[3];
  // everything after the questions is timed off the last one, so no two voices ever overlap
  const JUST = QT[6] + QD[6] + .15, ENTER = JUST + 1.45, BROW = ENTER + .5, SLIDE = ENTER + 1.2, BOMDIA = SLIDE + .25, STAMP = BOMDIA + 1.35, SAME = STAMP + 1.2;
  const DUR = +(SAME + 2.7).toFixed(1);
  const S = E.scene("cafe", 0, DUR, "light"); E.cur = S;
  E.music({ bpm: 108, root: 57, seed: 23, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: JUST + .9 });

  // ================= the pastelaria =================
  E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;background:#f3ead8");
  // azulejo wall: a real repeating tile, blue on white
  const tiles = E.el(S.el, "abs", "left:0;top:560px;width:1080px;height:840px");
  tiles.innerHTML = `<svg width="1080" height="840" viewBox="0 0 1080 840"><defs><pattern id="az" width="96" height="96" patternUnits="userSpaceOnUse">
    <rect width="96" height="96" fill="#f7f5ef"/>
    <path d="M0 0 H96 V96 H0 Z" fill="none" stroke="#c9d3e6" stroke-width="2"/>
    <circle cx="0" cy="0" r="22" fill="${BLUE}"/><circle cx="96" cy="0" r="22" fill="${BLUE}"/><circle cx="0" cy="96" r="22" fill="${BLUE}"/><circle cx="96" cy="96" r="22" fill="${BLUE}"/>
    <circle cx="0" cy="0" r="12" fill="#f7f5ef"/><circle cx="96" cy="0" r="12" fill="#f7f5ef"/><circle cx="0" cy="96" r="12" fill="#f7f5ef"/><circle cx="96" cy="96" r="12" fill="#f7f5ef"/>
    <path d="M48 16 Q60 36 80 48 Q60 60 48 80 Q36 60 16 48 Q36 36 48 16 Z" fill="${BLUE}"/>
    <circle cx="48" cy="48" r="9" fill="#f7f5ef"/><circle cx="48" cy="48" r="4" fill="#e3b341"/>
    <path d="M48 0 V10 M48 86 V96 M0 48 H10 M86 48 H96" stroke="${BLUE}" stroke-width="4"/>
    <circle cx="48" cy="28" r="3" fill="#f7f5ef"/><circle cx="48" cy="68" r="3" fill="#f7f5ef"/><circle cx="28" cy="48" r="3" fill="#f7f5ef"/><circle cx="68" cy="48" r="3" fill="#f7f5ef"/>
  </pattern><linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
  <rect width="1080" height="840" fill="url(#az)"/><rect width="1080" height="840" fill="url(#gl)"/></svg>`;
  E.el(S.el, "abs", "left:0;top:548px;width:1080px;height:16px;background:linear-gradient(180deg,#3d6fb8,#1f4e9c)");   // border tile row
  // upper wall: shelf of bottles and cups, chalkboard, a round clock
  E.el(S.el, "abs", "left:0;top:0;width:1080px;height:548px;background:linear-gradient(180deg,#efe4cf,#f3ead8)");
  const board = E.el(S.el, "abs", "left:540px;top:360px;width:460px;height:176px;border-radius:8px;background:#23282a;box-shadow:0 0 0 12px #8a5a33,0 12px 24px rgba(0,0,0,.25)");
  board.innerHTML = `<div style="position:absolute;left:24px;top:12px;font-family:'Noto Sans';font-weight:700;font-style:italic;font-size:30px;line-height:1.28;color:#f2efe6;letter-spacing:.02em;opacity:.93">Café · Bica<br>Galão · Meia de leite<br>Pastel de nata</div>` +
    `<svg style="position:absolute;right:22px;top:26px" width="110" height="120" viewBox="0 0 110 120"><path d="M20 50 H80 V80 Q80 104 50 104 Q20 104 20 80 Z" fill="none" stroke="#f2efe6" stroke-width="4"/><path d="M80 60 Q98 62 96 76 Q94 88 80 86" fill="none" stroke="#f2efe6" stroke-width="4"/><path d="M36 38 q-6 -12 4 -22 M52 38 q-6 -12 4 -22 M68 38 q-6 -12 4 -22" fill="none" stroke="#f2efe6" stroke-width="3"/><path d="M10 110 H100" stroke="#f2efe6" stroke-width="4"/></svg>`;
  // shelf of cups and saucers beside the clock; the machine itself is behind the barista (only its steam shows)
  const shelf = E.el(S.el, "abs", "left:250px;top:420px;width:270px;height:130px");
  shelf.innerHTML = `<svg viewBox="0 0 270 130" width="270" height="130"><rect x="0" y="110" width="270" height="14" rx="3" fill="#8a5a33"/>` +
    [0, 1, 2, 3].map(i => `<g transform="translate(${14 + i * 64} 0)"><ellipse cx="24" cy="106" rx="26" ry="6" fill="#fff" stroke="#ccc" stroke-width="2"/><path d="M6 66 H42 V88 Q42 104 24 104 Q6 104 6 88 Z" fill="#fff" stroke="#ccc" stroke-width="2"/><path d="M42 74 q10 2 9 10 q-1 7 -9 6" fill="none" stroke="#ccc" stroke-width="4"/>` +
      `<ellipse cx="24" cy="62" rx="26" ry="6" fill="#fff" stroke="#ccc" stroke-width="2"/><path d="M6 22 H42 V44 Q42 60 24 60 Q6 60 6 44 Z" fill="#fff" stroke="#ccc" stroke-width="2"/></g>`).join("") + `</svg>`;
  const steam = [];
  for (let i = 0; i < 8; i++) steam.push([E.el(S.el, "abs", `left:40px;top:900px;width:${50 + (i % 3) * 16}px;height:${50 + (i % 3) * 16}px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.8),rgba(255,255,255,0) 70%)`), i]);
  E.F(t => steam.forEach(([s, i]) => { const u = ((t * .7 + i / 8) % 1); s.style.opacity = (1 - u) * .8; s.style.transform = `translate(${Math.sin(u * 6 + i) * 20}px,${-u * 260}px) scale(${.5 + u * 1.3})`; }));
  // wall clock
  const wc = E.el(S.el, "abs", "left:100px;top:380px;width:130px;height:130px;border-radius:50%;background:radial-gradient(circle,#fffdf6 0 64%,#8a5a33 65%)");
  wc.innerHTML = `<svg viewBox="0 0 130 130" width="130" height="130"><line x1="65" y1="65" x2="65" y2="30" stroke="#222" stroke-width="5" stroke-linecap="round"/><line x1="65" y1="65" x2="92" y2="72" stroke="#222" stroke-width="6" stroke-linecap="round"/><circle cx="65" cy="65" r="5" fill="#c23a2c"/></svg>`;

  // ================= barista (behind the counter, left) =================
  const B = { b_talk: [827, 1111], b_slide: [807, 1115] };
  const bar = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:2");
  const barIn = E.el(bar, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:290px 1480px");
  const bEls = Object.entries(B).map(([n, [w, h]]) => { const H = 860, W = w * H / h; return [n, E.img(barIn, n, `position:absolute;left:${290 - W / 2}px;top:${1490 - H}px;width:${W}px;height:${H}px`)]; });
  E.F(t => {
    const f = at([[0, "b_talk"], [SLIDE - .1, "b_slide"]], t); bEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    // a little lean-in on every question
    let s = 1; for (const k of QT) if (t >= k && t < k + .25) s = 1 + .03 * Math.sin((t - k) / .25 * Math.PI);
    barIn.style.transform = `scale(${s})`;
  });

  // ================= the counter: marble top over a pastry display =================
  E.el(S.el, "abs", `left:0;top:${TOP}px;width:1080px;height:46px;z-index:6;background:linear-gradient(180deg,#fbfbf9,#e7e5e0);box-shadow:0 10px 18px rgba(0,0,0,.18)`);
  const veins = E.el(S.el, "abs", `left:0;top:${TOP}px;width:1080px;height:46px;z-index:6;opacity:.5`);
  veins.innerHTML = `<svg viewBox="0 0 1080 46" width="1080" height="46"><path d="M0 20 Q120 4 240 24 T520 18 T820 30 T1080 12" stroke="#b9b6ae" stroke-width="2" fill="none"/><path d="M60 40 Q200 26 360 36 T700 28 T1080 38" stroke="#cfccc5" stroke-width="1.5" fill="none"/></svg>`;
  const caseEl = E.el(S.el, "abs", `left:0;top:${TOP + 46}px;width:1080px;height:250px;z-index:6;background:linear-gradient(180deg,rgba(255,250,240,.9),rgba(245,236,218,.9));box-shadow:inset 0 0 0 6px #c9a86a`);
  // pastéis de nata, bolas de Berlim, croissants
  // a pastel de nata seen from the front-top: fluted pastry cup, custard dome with irregular caramelised blotches
  const tart = (x, y, r, seed) => {
    const rnd = k => { const v = Math.sin(seed * 91.7 + k * 37.3) * 43758.5453; return v - Math.floor(v); };
    const blots = Array.from({ length: 9 }, (_, k) => {
      const a = rnd(k) * Math.PI * 2, d = Math.sqrt(rnd(k + 20)) * r * .62;
      return `<ellipse cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y - 4 + Math.sin(a) * d * .42).toFixed(1)}" rx="${(r * (.08 + rnd(k + 40) * .16)).toFixed(1)}" ry="${(r * (.05 + rnd(k + 60) * .07)).toFixed(1)}" fill="${rnd(k + 80) > .45 ? "#4a1f08" : "#7a3a12"}" opacity="${(.55 + rnd(k + 90) * .4).toFixed(2)}"/>`;   // (no SVG rotate: the engine CSS gives svg children a fill-box origin, which throws rotated shapes off)
    }).join("");
    const flutes = Array.from({ length: 9 }, (_, k) => { const fx = x - r * .9 + k * r * .225; return `<path d="M${fx.toFixed(1)} ${y + 2} L${(fx + r * .06).toFixed(1)} ${y + r * .62}" stroke="#c1873a" stroke-width="2" opacity=".7"/>`; }).join("");
    return `<path d="M${x - r} ${y} L${x - r * .8} ${y + r * .66} Q${x} ${y + r * .8} ${x + r * .8} ${y + r * .66} L${x + r} ${y} Z" fill="#e3ad5c"/>${flutes}` +
      `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .36}" fill="#efc378"/><ellipse cx="${x}" cy="${y - 3}" rx="${r * .82}" ry="${r * .28}" fill="#f6d257"/>${blots}` +
      `<ellipse cx="${x - r * .35}" cy="${y - 8}" rx="${r * .22}" ry="${r * .06}" fill="#fff8d0" opacity=".6"/>`;
  };
  const tray = (y) => `<rect x="20" y="${y}" width="1040" height="10" rx="4" fill="#c9ced2"/><rect x="20" y="${y + 8}" width="1040" height="4" fill="#9aa1a8"/>`;
  const pastry = E.el(caseEl, "abs", "left:0;top:0;width:1080px;height:250px");
  let svg = tray(96) + tray(206);
  for (let i = 0; i < 9; i++) svg += tart(70 + i * 118, 64, 48, i + 1);
  [[110, 176], [300, 176], [490, 176]].forEach(([x, y]) => { svg += `<ellipse cx="${x}" cy="${y + 18}" rx="62" ry="14" fill="rgba(0,0,0,.08)"/><path d="M${x - 58} ${y + 16} Q${x - 60} ${y - 36} ${x} ${y - 38} Q${x + 60} ${y - 36} ${x + 58} ${y + 16} Z" fill="#dc9a45"/>` +
    `<path d="M${x - 48} ${y - 6} Q${x} ${y - 20} ${x + 48} ${y - 6}" stroke="#fff3c4" stroke-width="12" fill="none" stroke-linecap="round"/>` + [-30, -10, 12, 32].map((d, k) => `<circle cx="${x + d}" cy="${y - 26 + (k % 2) * 6}" r="3" fill="#fff"/>`).join(""); });
  [[720, 186], [900, 186]].forEach(([x, y]) => { svg += `<path d="M${x - 78} ${y + 10} Q${x - 40} ${y - 44} ${x} ${y - 48} Q${x + 40} ${y - 44} ${x + 78} ${y + 10} Q${x + 30} ${y - 10} ${x} ${y - 8} Q${x - 30} ${y - 10} ${x - 78} ${y + 10} Z" fill="#d68b3a"/>` +
    [-44, -20, 4, 28, 50].map(d => `<path d="M${x + d} ${y - 40} Q${x + d + 8} ${y - 18} ${x + d + 2} ${y}" stroke="#9c5822" stroke-width="3" fill="none"/>`).join("") + `<path d="M${x - 30} ${y - 38} Q${x} ${y - 46} ${x + 30} ${y - 38}" stroke="#f3c07a" stroke-width="5" fill="none" opacity=".7"/>`; });
  pastry.innerHTML = `<svg viewBox="0 0 1080 250" width="1080" height="250">${svg}</svg>`;
  E.el(caseEl, "abs", "left:0;top:0;width:1080px;height:250px;background:linear-gradient(115deg,rgba(255,255,255,.35) 0%,rgba(255,255,255,0) 30%,rgba(255,255,255,.2) 55%,rgba(255,255,255,0) 70%)");   // glass glare
  E.el(S.el, "abs", `left:0;top:${TOP + 296}px;width:1080px;height:${1920 - TOP - 296}px;z-index:6;background:repeating-linear-gradient(90deg,#5a3521 0 120px,#4a2b1a 120px 124px)`);

  // ================= the customers (in front, right) =================
  const T = { t_ask: [833, 1092], t_sweat: [849, 1128] };
  const tour = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:5");
  const tourIn = E.el(tour, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:800px 1560px");
  const tEls = Object.entries(T).map(([n, [w, h]]) => { const H = 900, W = w * H / h; return [n, E.img(tourIn, n, `position:absolute;left:${800 - W / 2}px;top:${1560 - H}px;width:${W}px;height:${H}px`)]; });
  E.K(tour, "x", [[ENTER, 0], [ENTER + .5, 230, "io"]]);                                  // shuffled aside when the regular arrives
  E.F(t => {
    const f = at([[0, "t_ask"], [SWEAT, "t_sweat"]], t); tEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    const shrink = clamp((t - Q0) / (QT[6] - Q0 + .6), 0, 1);                            // he shrinks under the questions
    tourIn.style.transform = `scale(${1 - shrink * .08}) translateX(${t >= SWEAT && t < ENTER ? Math.sin(t * 40) * 2 : 0}px)`;
  });
  const old = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:5");
  const OH = 760, OW = 630 * OH / 783;
  const oldImg = E.el(old, "abs", `left:${720 - OW / 2}px;top:${1500 - OH}px;width:${OW}px;height:${OH}px;transform-origin:50% 100%`);
  E.img(oldImg, "old", `width:${OW}px;height:${OH}px`);
  E.K(old, "x", [[ENTER, 520], [ENTER + .6, 0, "out"]]); E.K(old, "o", [[ENTER, 0], [ENTER + .05, 1]]);
  E.F(t => { const u = t >= BROW && t < BROW + .35 ? Math.sin((t - BROW) / .35 * Math.PI) : 0; oldImg.style.transform = `scale(${1 + u * .03}) translateY(${-u * 6}px)`; });
  // the eyebrow: a small highlight flick above his brow
  const flick = E.el(S.el, "abs", "left:760px;top:790px;width:80px;height:60px;z-index:7;opacity:0");
  flick.innerHTML = `<svg viewBox="0 0 80 60" width="80" height="60"><path d="M10 40 L30 20 M40 36 L46 8 M56 40 L74 22" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/></svg>`;
  E.K(flick, "o", [[BROW, 0], [BROW + .08, 1], [BROW + .6, 1], [BROW + .8, 0]]); E.K(flick, "s", [[BROW, .4], [BROW + .2, 1, "back"]]);
  E.S(BROW, "ding", .5); E.S(ENTER, "swish", .5);

  // the bica slides along the marble to him
  const cup = E.el(S.el, "abs", `left:0;top:${TOP - 64}px;width:120px;height:74px;z-index:7;opacity:0`);
  cup.innerHTML = `<svg viewBox="0 0 120 74" width="120" height="74"><ellipse cx="60" cy="62" rx="56" ry="11" fill="#fff" stroke="#ddd" stroke-width="2"/><path d="M28 18 H92 V40 Q92 62 60 62 Q28 62 28 40 Z" fill="#fff" stroke="#ddd" stroke-width="2"/>` +
    `<ellipse cx="60" cy="18" rx="32" ry="7" fill="#6b3a1e"/><ellipse cx="54" cy="17" rx="12" ry="3" fill="#c98b56" opacity=".8"/><path d="M92 26 Q108 28 106 38 Q104 46 92 44" fill="none" stroke="#ddd" stroke-width="5"/>` +
    `<path d="M50 8 q-5 -8 2 -14 M66 8 q-5 -8 2 -14" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/></svg>`;
  E.K(cup, "o", [[SLIDE, 0], [SLIDE + .05, 1]]); E.K(cup, "x", [[SLIDE, 380], [SLIDE + .55, 640, "out"]]);
  E.clip(SLIDE + .5, "sfx/elx-cup-saucer.wav", { vol: .9 });

  // ================= counter pill =================
  const pill = E.el(S.el, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:52px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;transform-origin:0 50%`, "QUESTIONS: 0");
  E.K(pill, "o", [[Q0 - .15, 0], [Q0, 1], [ENTER - .1, 1], [ENTER + .1, 0]]);
  E.F(t => { const n = QT.filter(k => t >= k).length; const s = `QUESTIONS: ${n}`; if (pill.textContent !== s) pill.textContent = s; pill.style.background = n >= 5 ? CORAL : INK; pill.style.color = n >= 5 ? INK : "#fff"; });
  QT.forEach(k => E.K(pill, "s", [[k - .01, 1], [k, 1.16], [k + .2, 1, "back"]]));

  // ================= bubbles =================
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 56, bg = "#fff", fg = INK, italic = false, sub = "", rot = 0, dim = null } = o;
    const b = E.el(S.el, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:28px;padding:16px 24px 20px;box-shadow:0 12px 30px rgba(0,0,0,.25);font-weight:800;font-size:${size}px;line-height:1.04;letter-spacing:-.02em;color:${fg};text-align:center;${italic ? "font-style:italic;" : ""}transform:rotate(${rot}deg)`,
      html + (sub ? `<div style="font-family:Inter;font-weight:500;font-style:italic;font-size:${Math.round(size * .5)}px;letter-spacing:0;color:${fg};opacity:.7;margin-top:6px">${sub}</div>` : ""));
    if (tail !== null) E.el(box, "abs", `left:${tail - 20}px;bottom:-18px;width:40px;height:40px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .28 });
    const ko = [[t0, 0], [t0 + .08, 1]]; if (dim) ko.push([dim, 1], [dim + .2, .5]); ko.push([t1 - .12, dim ? .5 : 1], [t1, 0]);
    E.K(b, "o", ko); E.S(t0 + .02, "pop", .45);
    return b;
  };
  bubble("One coffee,<br>please!", { left: 470, top: 520, w: 460, tail: 260, t0: ASK, t1: Q0 - .1, size: 60 });
  // the questions pile up around the tourist; each dims when the next arrives
  const QS = [["Bica?", "espresso?"], ["Cheia ou curta?", "long or short?"], ["Pingada?", "a drop of milk?"], ["Escaldada?", "scalded cup?"],
    ["Chávena fria?", "cold cup?"], ["Descafeinada?", "decaf?"], ["Ou um galão?", "or a galão?"]];
  const POS = [[110, 470, -3, 360], [540, 420, 2, 430], [330, 700, -2, 330], [50, 1010, 3, 380], [390, 960, -4, 360], [560, 1080, 2, 490], [220, 1190, -1, 600]];
  QS.forEach(([pt, en], i) => {
    const [x, y, r, w] = POS[i];
    bubble(pt, { left: x, top: y, w, tail: 90, t0: QT[i], t1: JUST - .05, size: 52 + i * 2, bg: i >= 4 ? GOLD : "#fff", sub: en, rot: r, dim: QT[i + 1] || null });
    E.clip(QT[i], `voices/sk6/q${i + 1}.wav`, { vol: 1.3 });
  });
  bubble("Uh… just…<br>coffee?", { left: 520, top: 560, w: 420, tail: 240, t0: JUST, t1: ENTER - .05, size: 56, italic: true });
  bubble("Bom dia, senhor António.", { left: 90, top: 520, w: 560, tail: 200, t0: BOMDIA, t1: SAME - .1, size: 48, sub: "Good morning, Mr António." });
  bubble("…I'll have what<br>he's having.", { left: 520, top: 560, w: 480, tail: 380, t0: SAME, t1: DUR, size: 52, italic: true });
  const stampBox = E.el(S.el, "abs", "left:100px;top:360px;width:880px;display:flex;justify-content:center;z-index:9");
  const st = E.stamp(stampBox, "40 YEARS.", STAMP, { size: 120, rot: -6, bg: CORAL, fg: INK, shake: 10 });
  st.style.alignSelf = "center"; E.until(st, SAME - .1, .2);
  E.shake(QT[6], 8, .25);

  // ================= sound =================
  for (let t = 0; t < DUR; t += 7) E.clip(t, "sfx/elx-cafe.wav", { vol: t < 7 ? .4 : .32, to: Math.min(7, DUR - t), duck: false });
  E.clip(1.2, "sfx/elx-espresso-steam.wav", { vol: .35, duck: false });
  E.clip(ASK, "voices/sk6/one.wav", { vol: 1.4 });
  E.clip(JUST + .05, "voices/sk6/just.wav", { vol: 2.2 });
  E.clip(BOMDIA, "voices/sk6/antonio.wav", { vol: 1.6 });

  // ================= title (frame 0) =================
  const titleBox = E.el(S.el, "abs", "left:100px;top:252px;width:860px;z-index:8");
  const title = E.text(titleBox, "One coffee, *please.*", { size: 70, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, Q0 - .25, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
