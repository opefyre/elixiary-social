// SK.5 "Ordering to look sophisticated." — first date, candlelight. He orders "A Negroni. Stirred." to impress her; the first
// sip hits and his inner voice (voiced, whispering) panics: "Why does it taste like a pharmacy?" … "Just smile." … "Ninety-six
// percent left. I'm going to die at this table." She is happily sipping a piña colada. Then she swaps the drinks without a
// word, sips his Negroni calmly: "Mm. Classic." He hugs the piña colada: "I think I'm in love."
// Voices: ElevenLabs (him: Alex, her: Sarah), cut to assets/voices/sk5/. Effects: generated restaurant room tone, ice, sip, slurp.
export const meta = {
  id: "sk5-sophisticated",
  images: {
    g_order: "cutouts/guy_order.webp", g_sip: "cutouts/guy_sip.webp", g_smile: "cutouts/guy_smile.webp", g_love: "cutouts/guy_love.webp",
    d_pina: "cutouts/date_pina.webp", d_neg: "cutouts/date_neg.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  E.music({ bpm: 84, root: 55, seed: 12, prog: [[0, 4, 7, 11], [5, 9, 12, 16], [2, 5, 9, 12], [7, 11, 14, 17]] });
  const DUR = 17.8;
  const S = E.scene("dinner", 0, DUR, "light"); E.cur = S;
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const ORDER = .6, SERVE = 2.3, SIP1 = 2.8, V1 = 3.3, SMILE = 5.4, SIP2 = 8.2, V3 = 8.8, SWAP = 12.1, CLASSIC = 12.5, LOVE = 14.0;
  const TABLE = 1390;

  // ================= the restaurant =================
  E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#16302a 0%,#1d3b33 55%,#142b25 100%)");
  // wainscoting and a picture rail
  E.el(S.el, "abs", "left:0;top:980px;width:1080px;height:420px;background:repeating-linear-gradient(90deg,#4a2c1a 0 150px,#3d2415 150px 156px);box-shadow:inset 0 10px 0 #5e3a22");
  E.el(S.el, "abs", "left:0;top:560px;width:1080px;height:10px;background:#b8893a;opacity:.6");
  E.el(S.el, "abs", "left:0;top:0;width:1080px;height:40px;background:linear-gradient(180deg,#0e211c,#1d3b33);box-shadow:0 6px 0 #b8893a55");
  [[150, 400], [930, 400]].forEach(([x, y]) => {
    const sc = E.el(S.el, "abs", `left:${x - 40}px;top:${y}px;width:80px;height:120px`);
    sc.innerHTML = `<svg viewBox="0 0 80 120" width="80" height="120"><rect x="34" y="40" width="12" height="70" rx="4" fill="#b8893a"/><rect x="22" y="100" width="36" height="14" rx="5" fill="#8a6526"/><path d="M14 44 L66 44 L56 4 L24 4 Z" fill="#f6e3b8"/></svg>`;
    E.el(S.el, "abs", `left:${x - 110}px;top:${y - 70}px;width:220px;height:220px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,214,140,.35),transparent)`);
  });
  // window onto a night street (right)
  const win = E.el(S.el, "abs", "left:700px;top:600px;width:320px;height:340px;border-radius:160px 160px 8px 8px;overflow:hidden;box-shadow:0 0 0 12px #3d2415,0 16px 30px rgba(0,0,0,.4)");
  win.innerHTML = `<svg viewBox="0 0 320 340" width="320" height="340"><defs><linearGradient id="ns" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1633"/><stop offset="1" stop-color="#2a2750"/></linearGradient></defs><rect width="320" height="340" fill="url(#ns)"/>` +
    `<path d="M0 230 H60 V160 H120 V210 H170 V140 H240 V200 H320 V340 H0 Z" fill="#1a1530"/>` +
    [[20, 180], [80, 190], [90, 240], [140, 230], [190, 160], [200, 210], [260, 220], [280, 250]].map(([x, y]) => `<rect x="${x}" y="${y}" width="16" height="20" fill="#ffd98a" opacity=".85"/>`).join("") +
    `<rect x="40" y="250" width="6" height="90" fill="#333"/><circle cx="43" cy="250" r="14" fill="#fff2c4"/><circle cx="43" cy="250" r="40" fill="#fff2c4" opacity=".18"/></svg>`;
  E.el(win, "abs", "left:154px;top:0;width:12px;height:340px;background:#3d2415");
  // warm bokeh from other tables
  const bokeh = [];
  for (let i = 0; i < 16; i++) bokeh.push([E.el(S.el, "abs", `left:${(i * 137) % 1040}px;top:${640 + (i * 71) % 300}px;width:${40 + (i % 4) * 22}px;height:${40 + (i % 4) * 22}px;border-radius:50%;background:radial-gradient(circle,rgba(255,200,120,.55),rgba(255,200,120,0) 70%);filter:blur(2px)`), i]);
  E.F(t => bokeh.forEach(([b, i]) => { b.style.opacity = .5 + .5 * Math.abs(Math.sin(t * .7 + i)); }));
  // blurred diners in the background
  const diners = E.el(S.el, "abs", "left:0;top:760px;width:1080px;height:300px;filter:blur(5px);opacity:.55");
  diners.innerHTML = `<svg viewBox="0 0 1080 300" width="1080" height="300">${[[80, "#6b3b3b"], [210, "#3b4b6b"], [520, "#5b5b3b"], [640, "#6b4b5b"]].map(([x, c]) => `<ellipse cx="${x}" cy="110" rx="44" ry="52" fill="#2a1a14"/><path d="M${x - 80} 300 Q${x - 70} 170 ${x} 160 Q${x + 70} 170 ${x + 80} 300 Z" fill="${c}"/>`).join("")}</svg>`;
  // pendant lamp over the table
  E.el(S.el, "abs", "left:538px;top:0;width:4px;height:560px;background:#111");
  const shade = E.el(S.el, "abs", "left:440px;top:540px;width:200px;height:100px;border-radius:100px 100px 10px 10px;background:linear-gradient(180deg,#b8893a,#7a5520)");
  const cone = E.el(S.el, "abs", "left:240px;top:630px;width:600px;height:800px;background:linear-gradient(180deg,rgba(255,214,140,.35),rgba(255,214,140,0));clip-path:polygon(38% 0,62% 0,100% 100%,0 100%)");
  E.el(S.el, "abs", "left:500px;top:620px;width:80px;height:30px;border-radius:50%;background:#fff6d8;box-shadow:0 0 40px 16px rgba(255,236,180,.8)");

  // ================= the two of them =================
  const G = { g_order: [872, 1121], g_sip: [872, 1040], g_smile: [821, 1122], g_love: [805, 1123] };
  const guy = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:2");
  const guyIn = E.el(guy, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:300px 1480px");
  const gEls = Object.entries(G).map(([n, [w, h]]) => { const H = n === "g_sip" ? 830 : 880, W = w * H / h; return [n, E.img(guyIn, n, `position:absolute;left:${300 - W / 2}px;top:${1480 - H}px;width:${W}px;height:${H}px`)]; });
  const GP = [[0, "g_order"], [SIP1, "g_sip"], [SMILE, "g_smile"], [SIP2, "g_sip"], [V3, "g_smile"], [SWAP + .15, "g_love"]];
  const D = { d_pina: [692, 1112], d_neg: [792, 1052] };
  const her = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:2");
  const herIn = E.el(her, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:850px 1480px");
  const dEls = Object.entries(D).map(([n, [w, h]]) => { const H = n === "d_neg" ? 840 : 880, W = w * H / h; return [n, E.img(herIn, n, `position:absolute;left:${850 - W / 2}px;top:${1480 - H}px;width:${W}px;height:${H}px`)]; });
  const DP = [[0, "d_pina"], [SWAP + .15, "d_neg"]];
  E.F(t => {
    const g = at(GP, t); gEls.forEach(([n, el]) => { el.style.opacity = n === g ? 1 : 0; });
    const d = at(DP, t); dEls.forEach(([n, el]) => { el.style.opacity = n === d ? 1 : 0; });
    let gs = 1, gx = 0;
    for (const [k] of GP.slice(1)) if (t >= k && t < k + .22) gs = 1 + .04 * Math.sin((t - k) / .22 * Math.PI);
    if ((t >= SIP1 + .3 && t < SIP1 + .9) || (t >= SIP2 + .2 && t < SIP2 + .8)) gx = Math.sin(t * 70) * 3;            // the bitterness shudder
    guyIn.style.transform = `translateX(${gx}px) scale(${gs})`;
    herIn.style.transform = `translateY(${Math.sin(t * 1.3) * 2}px)`;
  });
  // sweat drops at his temple while he suffers
  for (let i = 0; i < 3; i++) {
    const d = E.el(S.el, "abs", `left:${392 + i * 10}px;top:${780 + i * 6}px;width:14px;height:20px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:linear-gradient(180deg,#e8f6ff,#8fd0f5);z-index:3;opacity:0`);
    const t0 = SMILE + .4 + i * 1.6;
    E.K(d, "o", [[t0, 0], [t0 + .1, 1], [t0 + 1.2, 1], [t0 + 1.4, 0]]); E.K(d, "y", [[t0, 0], [t0 + 1.4, 90, "in"]]);
  }

  // ================= the table =================
  const cloth = E.el(S.el, "abs", `left:-20px;top:${TABLE}px;width:1120px;height:${1920 - TABLE}px;z-index:4;background:linear-gradient(180deg,#fbf7ee 0%,#efe7d6 12%,#f6f0e3 30%,#e6dcc6 100%)`);
  E.el(cloth, "abs", "left:0;top:0;width:1120px;height:1000px;opacity:.5;background:repeating-linear-gradient(90deg,rgba(0,0,0,.05) 0 2px,transparent 2px 120px,rgba(255,255,255,.35) 120px 124px,transparent 124px 240px)");   // folds
  E.el(S.el, "abs", `left:-20px;top:${TABLE - 6}px;width:1120px;height:14px;z-index:4;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.12))`);
  const runner = E.el(S.el, "abs", `left:430px;top:${TABLE}px;width:220px;height:${1920 - TABLE}px;z-index:4;background:linear-gradient(90deg,#6e1e28,#8e2a36 50%,#6e1e28);box-shadow:inset 0 0 0 6px rgba(184,137,58,.55)`);
  E.el(runner, "abs", "left:0;top:340px;width:220px;height:26px;background:repeating-linear-gradient(90deg,#d9b25a 0 4px,transparent 4px 9px)");
  E.el(S.el, "abs", `left:-20px;top:1700px;width:1120px;height:40px;z-index:4;background:radial-gradient(ellipse at 50% 0,rgba(0,0,0,.12),transparent 70%)`);
  const extras = E.el(S.el, "abs", `left:0;top:${TABLE - 230}px;width:1080px;height:260px;z-index:5`);
  extras.innerHTML = `<svg viewBox="0 0 1080 260" width="1080" height="260">
    <path d="M40 250 L100 200 L160 250 Z" fill="#fbf7ee" stroke="#e0d6c0" stroke-width="3"/><path d="M920 250 L980 200 L1040 250 Z" fill="#fbf7ee" stroke="#e0d6c0" stroke-width="3"/>
    <rect x="676" y="70" width="38" height="170" rx="10" fill="#27402f"/><rect x="684" y="30" width="22" height="50" rx="6" fill="#27402f"/><rect x="682" y="20" width="26" height="16" rx="4" fill="#7a1e28"/>
    <rect x="680" y="140" width="30" height="50" rx="4" fill="#efe6d2"/><rect x="686" y="152" width="18" height="4" fill="#7a1e28"/><path d="M684 80 V230" stroke="#fff" stroke-opacity=".25" stroke-width="5"/>
    <rect x="352" y="212" width="16" height="34" rx="6" fill="#f4f4f4" stroke="#bbb" stroke-width="2"/><rect x="374" y="212" width="16" height="34" rx="6" fill="#3a3a3a"/>
    <circle cx="360" cy="212" r="7" fill="#c8c8c8"/><circle cx="382" cy="212" r="7" fill="#8a8a8a"/>
  </svg>`;
  // centerpiece: candle in a glass, a rose in a bud vase, bread basket, plates and cutlery
  const cp = E.el(S.el, "abs", `left:0;top:${TABLE - 260}px;width:1080px;height:300px;z-index:5`);
  cp.innerHTML = `<svg viewBox="0 0 1080 300" width="1080" height="300">
    <ellipse cx="300" cy="286" rx="120" ry="16" fill="#fff" stroke="#d9d1bf" stroke-width="3"/><ellipse cx="800" cy="286" rx="120" ry="16" fill="#fff" stroke="#d9d1bf" stroke-width="3"/>
    <rect x="160" y="270" width="8" height="30" rx="3" fill="#b9bfc4" transform="rotate(-8 164 285)"/><rect x="440" y="270" width="8" height="30" rx="3" fill="#b9bfc4" transform="rotate(8 444 285)"/>
    <rect x="930" y="270" width="8" height="30" rx="3" fill="#b9bfc4" transform="rotate(8 934 285)"/><rect x="662" y="270" width="8" height="30" rx="3" fill="#b9bfc4" transform="rotate(-8 666 285)"/>
    <path d="M510 170 Q505 280 540 290 Q575 280 570 170 Z" fill="rgba(220,240,255,.35)" stroke="rgba(255,255,255,.8)" stroke-width="3"/>
    <rect x="526" y="210" width="28" height="70" rx="5" fill="#fbf2de"/>
    <path d="M600 280 Q596 220 612 170 Q628 220 624 280 Z" fill="rgba(200,230,240,.5)" stroke="rgba(255,255,255,.8)" stroke-width="2"/>
    <path d="M612 170 Q606 110 614 60" stroke="#3f7a3a" stroke-width="5" fill="none"/><path d="M611 120 q-22 -8 -30 -26 q20 2 30 18" fill="#4f8a4a"/>
    <circle cx="614" cy="54" r="16" fill="#c0283a"/><path d="M602 54 q12 -18 24 0 q-12 10 -24 0" fill="#e0405a"/>
    <path d="M400 290 Q420 236 470 236 Q520 236 500 290 Z" fill="#b07a3a"/><ellipse cx="450" cy="244" rx="56" ry="14" fill="#8a5a2a"/>
    <ellipse cx="432" cy="236" rx="22" ry="12" fill="#e8b774"/><ellipse cx="466" cy="232" rx="22" ry="12" fill="#dca560"/>
  </svg>`;
  const flame = E.el(S.el, "abs", `left:531px;top:${TABLE - 84}px;width:18px;height:32px;z-index:6;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(ellipse at 50% 70%,#fff 0 20%,#ffd35c 40%,#ff8a2a 65%,transparent 72%)`);
  const halo = E.el(S.el, "abs", `left:440px;top:${TABLE - 170}px;width:200px;height:200px;z-index:5;border-radius:50%;background:radial-gradient(closest-side,rgba(255,200,110,.5),transparent)`);
  E.F(t => { flame.style.transform = `scale(${1 + Math.sin(t * 19) * .08},${1 + Math.cos(t * 23) * .1}) rotate(${Math.sin(t * 7) * 4}deg)`; halo.style.opacity = .8 + Math.sin(t * 15) * .15; });
  // his Negroni lands on the table at SERVE (he only lifts it in the sip poses)
  const neg = E.el(S.el, "abs", `left:360px;top:${TABLE - 110}px;width:96px;height:110px;z-index:5;opacity:0`);
  neg.innerHTML = `<svg viewBox="0 0 96 110" width="96" height="110"><path d="M6 8 L12 102 Q14 108 20 108 H76 Q82 108 84 102 L90 8" fill="rgba(200,40,30,.85)"/><rect x="26" y="30" width="40" height="40" rx="6" fill="rgba(255,255,255,.45)"/>` +
    `<path d="M60 14 q16 -4 24 10" stroke="#f08a24" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M4 4 L10 104 Q12 110 20 110 H76 Q84 110 86 104 L92 4" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="4"/><path d="M16 20 L20 90" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/></svg>`;
  E.K(neg, "o", [[SERVE, 0], [SERVE + .05, 1], [SIP1, 1], [SIP1 + .02, 0], [SMILE, 0], [SMILE + .02, 0]]);
  E.K(neg, "x", [[SERVE, -300], [SERVE + .35, 0, "out"]]);
  E.S(SERVE, "swish", .6); E.clip(SERVE + .3, "sfx/elx-ice-clink.wav", { vol: .8 });

  // ================= the Negroni gauge =================
  const gauge = E.el(S.el, "abs", `left:100px;top:258px;height:84px;display:flex;align-items:center;gap:18px;padding:0 28px 0 18px;border-radius:44px;background:rgba(10,20,16,.82);box-shadow:inset 0 0 0 2px rgba(245,196,81,.35);z-index:8;opacity:0;transform-origin:0 50%`);
  const gIcon = E.el(gauge, "", "width:52px;height:60px;position:relative");
  gIcon.innerHTML = `<svg viewBox="0 0 52 60" width="52" height="60"><defs><clipPath id="gc"><path d="M4 4 L8 54 Q9 58 14 58 H38 Q43 58 44 54 L48 4 Z"/></clipPath></defs><g clip-path="url(#gc)"><rect class="lvl" x="0" y="6" width="52" height="60" fill="#d8321f"/></g><path d="M4 4 L8 54 Q9 58 14 58 H38 Q43 58 44 54 L48 4" fill="none" stroke="#fff" stroke-width="3.5"/></svg>`;
  const lvl = gIcon.querySelector(".lvl");
  const gTxt = E.el(gauge, "", `font-weight:800;font-size:46px;color:#fff;white-space:nowrap;font-variant-numeric:tabular-nums;letter-spacing:-.01em`, "NEGRONI LEFT: 100%");
  const LEFT = [[0, 100], [SIP1 + .3, 99], [SMILE + 1.4, 97], [SIP2 + .3, 96]];
  E.K(gauge, "o", [[2.5, 0], [2.7, 1], [SWAP - .1, 1], [SWAP + .1, 0]]);
  E.F(t => { const v = at(LEFT, t); const s = `NEGRONI LEFT: ${v}%`; if (gTxt.textContent !== s) gTxt.textContent = s; lvl.setAttribute("y", String(6 + (100 - v) * .5)); gTxt.style.color = v <= 97 ? GOLD : "#fff"; });
  LEFT.slice(1).forEach(([k]) => E.K(gauge, "s", [[k - .01, 1], [k, 1.1], [k + .2, 1, "back"]]));

  // ================= bubbles =================
  const speech = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 60, bg = "#fff", fg = INK } = o;
    const b = E.el(S.el, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:20px 28px 24px;box-shadow:0 14px 34px rgba(0,0,0,.35);font-weight:800;font-size:${size}px;line-height:1.04;letter-spacing:-.02em;color:${fg};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .5);
    return b;
  };
  // his inner voice: a thought cloud with trailing puffs toward his head
  const thought = (html, o) => {
    const { left, top, w, t0, t1, size = 54, puffX = 330, puffY = 680 } = o;
    const b = E.el(S.el, "abs", `left:0;top:0;width:1080px;height:1920px;z-index:9;pointer-events:none`);
    const box = E.el(b, "abs", `left:${left}px;top:${top}px;width:${w}px;background:#eef0ff;border-radius:60px;padding:22px 30px 26px;box-shadow:0 0 0 6px rgba(238,240,255,.35),0 14px 34px rgba(0,0,0,.35);font-weight:700;font-style:italic;font-size:${size}px;line-height:1.06;letter-spacing:-.02em;color:#2b2d5a;text-align:center;transform-origin:20% 100%`,
      `<div style="font-style:normal;font-weight:800;font-size:22px;letter-spacing:.2em;color:#7b7fc4;margin-bottom:8px">INNER VOICE</div>${html}`);
    [[puffX + 30, top + 200, 34], [puffX + 6, puffY - 60, 24], [puffX - 10, puffY - 10, 16]].forEach(([x, y, r], i) => {
      const p = E.el(b, "abs", `left:${x - r}px;top:${y - r}px;width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:#eef0ff`);
      E.K(p, "o", [[t0 + i * .06, 0], [t0 + .08 + i * .06, 1], [t1 - .12, 1], [t1, 0]]);
    });
    E.pop(box, t0 + .1, { from: .5, dur: .3 }); E.K(box, "o", [[t0 + .1, 0], [t0 + .18, 1], [t1 - .12, 1], [t1, 0]]);
    E.S(t0 + .1, "sparkle", .3);
  };
  speech("A Negroni.<br>Stirred.", { left: 100, top: 470, w: 440, tail: 250, t0: ORDER, t1: SIP1 - .2, size: 64 });
  thought("…why does it taste<br>like a pharmacy?", { left: 80, top: 440, w: 640, t0: V1, t1: SMILE - .1, puffX: 330, puffY: 680 });
  thought("Just smile. Sophisticated<br>people smile.", { left: 80, top: 440, w: 700, t0: SMILE + .05, t1: SIP2, puffX: 330, puffY: 680 });
  thought("96% left. I'm going to<br>die at this table.", { left: 80, top: 440, w: 680, t0: V3, t1: SWAP - .1, puffX: 330, puffY: 680 });
  speech("Mm. Classic.", { left: 560, top: 520, w: 420, tail: 300, t0: CLASSIC, t1: LOVE - .1, size: 64, bg: GOLD });
  speech("…I think I'm<br>in love.", { left: 90, top: 470, w: 440, tail: 230, t0: LOVE, t1: DUR, size: 64 });
  // the swap: two glasses cross the table
  const ghost = (svg, w, h, from, to, lift) => {
    const g = E.el(S.el, "abs", `left:0;top:${TABLE - h}px;width:${w}px;height:${h}px;z-index:6;opacity:0`); g.innerHTML = svg;
    E.K(g, "o", [[SWAP - .05, 0], [SWAP, 1], [SWAP + .3, 1], [SWAP + .35, 0]]); E.K(g, "x", [[SWAP, from], [SWAP + .32, to, "io"]]);
    E.K(g, "y", [[SWAP, 0], [SWAP + .16, -lift, "out"], [SWAP + .32, 0, "in"]]);
  };
  ghost(neg.innerHTML, 96, 110, 330, 760, 40);
  ghost(`<svg viewBox="0 0 90 170" width="90" height="170"><path d="M10 6 Q4 60 22 96 Q34 116 38 128 V156 H22 Q18 162 22 166 H68 Q72 162 68 156 H52 V128 Q56 116 68 96 Q86 60 80 6 Z" fill="rgba(250,244,226,.97)" stroke="rgba(255,255,255,.9)" stroke-width="3"/>` +
    `<path d="M58 0 L50 60" stroke="#f2c14e" stroke-width="5"/><path d="M62 10 q18 -12 26 6 q-14 8 -26 -6" fill="#f2c14e"/><path d="M68 4 l14 -10" stroke="#3f8f5a" stroke-width="4"/></svg>`, 90, 170, 780, 320, 60);
  E.S(SWAP, "whoosh", .6); E.clip(SWAP + .3, "sfx/elx-ice-clink.wav", { vol: .7 });
  // hearts rise when he falls in love
  for (let i = 0; i < 9; i++) {
    const h = E.el(S.el, "abs", `left:${250 + (i % 3) * 60}px;top:720px;width:48px;height:44px;z-index:7;opacity:0`);
    h.innerHTML = `<svg viewBox="0 0 48 44" width="48" height="44"><path d="M24 42 L4 20 A11 11 0 0 1 24 8 A11 11 0 0 1 44 20 Z" fill="${["#ff6b8a", "#ff4f6d", "#ff8fa8"][i % 3]}"/></svg>`;
    const t0 = LOVE + .2 + i * .22;
    E.K(h, "o", [[t0, 0], [t0 + .1, 1], [t0 + 1.4, 0]]); E.K(h, "y", [[t0, 0], [t0 + 1.5, -260 - (i % 3) * 40, "out"]]); E.K(h, "x", [[t0, 0], [t0 + 1.5, (i % 2 ? 40 : -40)]]);
  }

  // ================= sound =================
  E.clip(0, "sfx/elx-restaurant.wav", { vol: .32, duck: false }); E.clip(6, "sfx/elx-restaurant.wav", { vol: .32, duck: false }); E.clip(12, "sfx/elx-restaurant.wav", { vol: .32, to: DUR - 12, duck: false });
  E.clip(ORDER + .05, "voices/sk5/order.wav", { vol: 1.3 });
  E.clip(SIP1 + .1, "sfx/elx-sip.wav", { vol: .9 });
  E.clip(V1 + .1, "voices/sk5/pharmacy.wav", { vol: 2.6 });
  E.clip(4.4, "sfx/elx-straw-slurp.wav", { vol: .6 });
  E.clip(SMILE + .15, "voices/sk5/smile.wav", { vol: 2.0 });
  E.clip(SIP2 + .05, "sfx/elx-sip.wav", { vol: .7 });
  E.clip(V3 + .15, "voices/sk5/die.wav", { vol: 1.8 });
  E.clip(CLASSIC + .05, "voices/sk5/classic.wav", { vol: 1.3 });
  E.clip(LOVE + .1, "voices/sk5/love.wav", { vol: 2.6 });
  E.S(LOVE + .1, "sparkle", .5);

  // ================= title (frame 0) =================
  const titleBox = E.el(S.el, "abs", "left:100px;top:252px;width:860px;z-index:8");
  const title = E.text(titleBox, "Ordering to look *sophisticated.*", { size: 52, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 24px rgba(0,0,0,.7)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, 2.4, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[17.0, 1], [17.25, 1.18, "out"], [17.55, 1, "io"]]);
}
