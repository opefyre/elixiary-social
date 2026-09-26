// SK.16 "Can I get a mojito?" — 11:58 PM, last call. Sal is wiping down. "Can I get a mojito?" — record scratch, eye twitch.
// He muddles like his life depends on it: MINT LEAVES 0 → 20, crushed ice, soda. Perfect mojito. "Oh, amazing!" Then the room:
// "Ooh, make that two!" "Three!" "Four for us!" "MOJITOS FOR EVERYONE!" MOJITOS: 1 → 23. Silence. Sal takes off his apron,
// lays it on the bar… and walks into the sea at sunset. From far away: "…and one without mint?" He walks faster.
// Built on the bartender "mojito dread" meme. Voices: ElevenLabs (her: Jessica; crowd: Liam). Sal never speaks.
export const meta = {
  id: "sk16-mojito",
  images: {
    s_wait: "cutouts/salc_wait.webp", s_twitch: "cutouts/sal_twitch.webp", s_muddle: "cutouts/sal_muddle.webp", s_apron: "cutouts/sal_apron.webp",
    s_sea: "cutouts/sal_sea.webp", her: "cutouts/cust_sweet.webp", crowd: "cutouts/crowd_hands.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", MINT = "#5fcf7a";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const ASK = 1.3, TWITCH = 2.6, MUDDLE = 4.2, SODA = 7.0, SERVE = 8.1, AMAZING = 8.5, C1 = 10.0, C2 = 11.4, C3 = 12.1, C4 = 13.0, SILENCE = 14.8, APRON = 15.1, BEACH = 16.9, MINTQ = 18.5, DUR = 21.4;
  E.music({ bpm: 104, root: 55, seed: 61, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: TWITCH });
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1420;

  // ================= scene 1: the bar at closing time =================
  const S1 = E.scene("bar", 0, BEACH, "dark"); E.cur = S1; const R = S1.el;
  const cam = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:360px 900px");
  // camera: a snap zoom on Sal at the twitch, then eases back out for the muddling
  E.F(t => { const z = t < TWITCH ? 1 : t < MUDDLE ? 1 + .22 * seg(t, TWITCH, .12) : 1.22 - .22 * seg(t, MUDDLE, .5); cam.style.transform = `scale(${z})`; });
  E.el(cam, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#171219,#241a22 50%,#130e12)");
  E.el(cam, "abs", "left:0;top:0;width:1080px;height:1420px;opacity:.14;background-image:linear-gradient(0deg,rgba(0,0,0,.9) 3px,transparent 3px),linear-gradient(90deg,rgba(0,0,0,.9) 3px,transparent 3px),linear-gradient(90deg,rgba(0,0,0,.9) 3px,transparent 3px);background-size:100% 52px,120px 104px,120px 104px;background-position:0 0,0 0,60px 52px;background-color:#6b3a2c");
  // back bar shelves with bottles (same construction as SK.2)
  const LIQ = ["#e39a2d", "#b4561f", "#d9e8e0", "#3f8f5a", "#c23a2c", "#6fa3c9", "#f3d27a", "#7a3b1d", "#e9e1cf", "#a02c4a"];
  let gid = 0;
  const bottleSVG = (kind, liq, cap, w, h) => {
    const g = `m${gid++}`;
    const body = [`M${w * .38} 0 H${w * .62} V${h * .28} Q${w} ${h * .34} ${w} ${h * .46} V${h - 6} Q${w} ${h} ${w - 6} ${h} H6 Q0 ${h} 0 ${h - 6} V${h * .46} Q0 ${h * .34} ${w * .38} ${h * .28} Z`,
      `M${w * .36} 0 H${w * .64} V${h * .2} L${w} ${h * .3} V${h} H0 V${h * .3} L${w * .36} ${h * .2} Z`,
      `M${w * .42} 0 H${w * .58} V${h * .42} Q${w} ${h * .5} ${w} ${h * .62} V${h} H0 V${h * .62} Q0 ${h * .5} ${w * .42} ${h * .42} Z`,
      `M${w * .3} 0 H${w * .7} V${h * .14} Q${w} ${h * .2} ${w} ${h * .34} V${h} H0 V${h * .34} Q0 ${h * .2} ${w * .3} ${h * .14} Z`][kind];
    return `<defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="${liq}" stop-opacity=".95"/><stop offset=".22" stop-color="#fff" stop-opacity=".5"/><stop offset=".32" stop-color="${liq}" stop-opacity=".9"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient></defs>` +
      `<path d="${body}" fill="url(#${g})"/><rect x="${w * .37}" y="${-h * .08 + 2}" width="${w * .26}" height="${h * .08}" rx="3" fill="${cap}"/>` +
      (kind !== 2 ? `<rect x="${w * .12}" y="${h * .55}" width="${w * .76}" height="${h * .26}" rx="3" fill="#efe6d2" opacity=".92"/><rect x="${w * .24}" y="${h * .61}" width="${w * .52}" height="5" fill="#8a6a44"/>` : `<rect x="${w * .12}" y="${h * .7}" width="${w * .76}" height="${h * .18}" rx="3" fill="#1d1a16"/><rect x="${w * .3}" y="${h * .76}" width="${w * .4}" height="5" fill="${GOLD}"/>`);
  };
  [700, 950, 1200].forEach((sy, si) => {
    E.el(cam, "abs", `left:30px;top:${sy - 200}px;width:1020px;height:200px;background:linear-gradient(0deg,rgba(255,176,82,.4),rgba(255,176,82,0) 85%)`);
    let x = 50 + (si % 2) * 22, k = si * 3;
    while (x < 1020) {
      const kind = (k * 7 + si) % 4, w = [56, 60, 42, 72][kind], h = [168, 148, 188, 118][kind] - (k % 3) * 8;
      const b = E.el(cam, "abs", `left:${x}px;top:${sy - h}px;width:${w}px;height:${h}px`);
      b.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible">${bottleSVG(kind, LIQ[(k * 3 + si) % LIQ.length], ["#c9a24a", "#1a1a1a", "#8b1e1e", "#d8d8d8"][k % 4], w, h)}</svg>`;
      x += w + 14 + (k % 3) * 6; k++;
    }
    E.el(cam, "abs", `left:30px;top:${sy}px;width:1020px;height:10px;border-radius:3px;background:linear-gradient(180deg,rgba(220,245,255,.85),rgba(160,200,220,.35));box-shadow:0 0 16px rgba(255,190,110,.5)`);
  });
  // neon LAST CALL + a clock
  const neon = E.el(cam, "abs", `left:0;top:380px;width:1080px;text-align:center;font-weight:800;font-size:86px;letter-spacing:.08em;color:#e8fff2`, "LAST CALL");
  E.F(t => { const on = Math.sin(t * 29) > .97 ? .5 : 1; neon.style.textShadow = `0 0 6px #fff,0 0 16px ${MINT},0 0 38px ${MINT},0 0 80px rgba(95,207,122,${.6 * on})`; neon.style.opacity = on; });
  const clk = E.el(cam, "abs", `left:880px;top:470px;padding:6px 16px;border-radius:12px;background:#0a0a0a;font-weight:800;font-size:40px;color:#ff5a4e;font-variant-numeric:tabular-nums;box-shadow:0 0 18px rgba(255,90,78,.35)`, "23:58");
  E.F(t => { const s = t < 10 ? "23:58" : "23:59"; if (clk.textContent !== s) clk.textContent = s; });

  // ---------- Sal ----------
  const SAL = { s_wait: [754, 1104, 900], s_twitch: [865, 1133, 900], s_muddle: [866, 1138, 900], s_apron: [865, 1127, 900] };
  const sal = E.el(cam, "abs", "left:0;top:0;width:1080px;height:1920px");
  const salIn = E.el(sal, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:360px 1480px");
  const sEls = Object.entries(SAL).map(([n, [w, h, H]]) => { const W = w * H / h; return [n, E.img(salIn, n, `position:absolute;left:${360 - W / 2}px;top:${1500 - H}px;width:${W}px;height:${H}px`)]; });
  const SP = [[0, "s_wait"], [TWITCH, "s_twitch"], [MUDDLE, "s_muddle"], [SERVE, "s_wait"], [C1 + .3, "s_twitch"], [APRON, "s_apron"]];
  E.F(t => {
    const f = at(SP, t); sEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    let dx = 0, dy = Math.sin(t * 2) * 3;
    if (t >= MUDDLE && t < SERVE) { dx = Math.sin(t * 44) * 7; dy = -Math.abs(Math.sin(t * 22)) * 12; }                       // frantic muddling
    if (t >= C1 && t < SILENCE) dx = Math.sin(t * 60) * 3 * seg(t, C1, 3);                                                     // rising dread
    for (const [k] of SP.slice(1)) if (t >= k && t < k + .22) dy -= Math.sin((t - k) / .22 * Math.PI) * 14;
    salIn.style.transform = `translate(${dx}px,${dy}px)`;
  });
  // the eye-twitch: zigzag lines by his eye, and a throbbing vein
  const tw = E.el(cam, "abs", "left:420px;top:760px;width:120px;height:100px;opacity:0;z-index:4");
  tw.innerHTML = `<svg viewBox="0 0 120 100" width="120" height="100"><path d="M10 20 l20 -12 l10 16 l18 -14 M20 60 l24 -6 l6 16 l22 -8 M30 92 l18 -12 l12 12" stroke="${CORAL}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  E.F(t => { const on = (t >= TWITCH + .1 && t < MUDDLE) || (t >= C2 && t < SILENCE); tw.style.opacity = on ? (Math.floor(t * 12) % 2 ? 1 : .2) : 0; tw.style.transform = `translate(${Math.sin(t * 50) * 3}px,0)`; });
  E.clip(TWITCH - .05, "sfx/record-silence.wav", { vol: .9 });

  // ---------- the bar ----------
  const top = E.el(cam, "abs", `left:0;top:${TOP}px;width:1080px;height:46px;z-index:5;background:linear-gradient(180deg,#6b3b1f,#4a2612 60%,#2e170b);box-shadow:0 10px 24px rgba(0,0,0,.6)`);
  E.el(top, "abs", "left:0;top:0;width:1080px;height:46px;opacity:.35;background:repeating-linear-gradient(90deg,transparent 0 38px,rgba(0,0,0,.35) 38px 40px,transparent 40px 91px,rgba(255,220,170,.18) 91px 92px)");
  E.el(cam, "abs", `left:0;top:${TOP - 3}px;width:1080px;height:5px;z-index:5;background:linear-gradient(90deg,#8a6526,#f2d27a 30%,#b8893a 55%,#f7e2a0 80%,#8a6526)`);
  E.el(cam, "abs", `left:0;top:${TOP + 46}px;width:1080px;height:${1920 - TOP - 46}px;z-index:5;background:repeating-linear-gradient(90deg,#2a150a 0 86px,#1c0e06 86px 90px),linear-gradient(180deg,#3a1d0c,#1a0c05)`);
  // the mojito, built on the bar: glass, crushed ice, lime wedges, mint, soda bubbles
  const mj = E.el(cam, "abs", `left:300px;top:${TOP - 240}px;width:140px;height:240px;z-index:6;opacity:0`);
  mj.innerHTML = `<svg viewBox="0 0 140 240" width="140" height="240"><defs><linearGradient id="mw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eafbe8" stop-opacity=".85"/><stop offset="1" stop-color="#bfe8c0" stop-opacity=".9"/></linearGradient></defs>
    <path d="M14 40 L24 232 H116 L126 40 Z" fill="url(#mw)"/>${Array.from({ length: 16 }, (_, i) => `<rect x="${28 + (i * 23) % 80}" y="${60 + (i * 37) % 150}" width="${14 + (i % 3) * 5}" height="${12 + (i % 2) * 6}" rx="3" fill="#fff" opacity=".75"/>`).join("")}
    ${[[40, 180], [90, 150], [60, 110]].map(([x, y]) => `<path d="M${x} ${y} q16 -14 32 0 q-16 12 -32 0" fill="${MINT}"/>`).join("")}<path d="M34 200 L70 190 L60 222 Z" fill="#9bd14a"/>
    <path d="M104 40 L76 -20" stroke="#e8f7ff" stroke-width="8" stroke-linecap="round"/><path d="M10 36 L20 234 H120 L130 36" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="4"/>
    <path d="M96 30 q14 -30 30 -6 q-10 18 -30 6" fill="${MINT}"/><path d="M110 36 L124 10" stroke="#3f8f3a" stroke-width="3"/></svg>`;
  E.K(mj, "o", [[SERVE, 0], [SERVE + .05, 1], [C4 + .6, 1], [C4 + .8, 0]]); E.K(mj, "x", [[SERVE, 0], [SERVE + .45, 260, "out"]]);
  E.S(SERVE, "swish", .6); E.S(SERVE + .45, "sparkle", .7);
  // mint leaves bursting out while he muddles, crushed ice flying
  for (let i = 0; i < 22; i++) {
    const l = E.el(cam, "abs", `left:0;top:0;width:34px;height:20px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:linear-gradient(135deg,#8be39b,#2f9a4a);z-index:6;opacity:0`);
    const t0 = MUDDLE + .2 + i * .15, a = -Math.PI / 2 + ((i * 1.3) % 2.4 - 1.2);
    E.K(l, "o", [[t0, 0], [t0 + .03, 1], [t0 + .9, 1], [t0 + 1.0, 0]]);
    E.K(l, "x", [[t0, 400], [t0 + .9, 400 + Math.cos(a) * 320, "out"]]); E.K(l, "y", [[t0, 1150], [t0 + .35, 1150 + Math.sin(a) * 300, "out"], [t0 + .9, 1500, "in"]]);
    E.K(l, "r", [[t0, 0], [t0 + .9, (i % 2 ? 1 : -1) * 540]]);
  }
  for (let t = MUDDLE + .1; t < SODA; t += 1.4) E.clip(t, "sfx/elx-muddle.wav", { vol: 1, duck: false });
  E.clip(SODA - .6, "sfx/elx-ice-scatter.wav", { vol: .7 }); E.clip(SODA, "sfx/elx-soda-fizz.wav", { vol: .9 });

  // ---------- her and, later, the whole room ----------
  const HW = 821 * 920 / 1140;
  const her = E.el(cam, "abs", `left:${820 - HW / 2}px;top:${1540 - 920}px;width:${HW}px;height:920px;z-index:4;transform-origin:50% 100%`);
  E.img(her, "her", `width:${HW}px;height:920px`);
  E.F(t => { her.style.transform = `translate(${seg(t, C1 - .3, .45) * 560}px,${Math.sin(t * 2.2 + 1) * 4}px)`; });   // she is shoved aside by the crowd
  const CW = 1003 * 560 / 678;
  const CH2 = 700, CW2 = 1003 * CH2 / 678;
  const crowd = E.el(cam, "abs", `left:${1080 - CW2 + 440}px;top:${1500 - CH2}px;width:${CW2}px;height:${CH2}px;z-index:4;opacity:0`);
  E.img(crowd, "crowd", `width:${CW2}px;height:${CH2}px`);
  E.K(crowd, "o", [[C1 - .1, 0], [C1, 1], [SILENCE + .3, 1], [SILENCE + .6, 0]]);
  E.K(crowd, "x", [[C1 - .3, 500], [C1 + .15, 0, "out"]]);
  E.K(crowd, "y", [[C1 - .1, 0], [C1 + .3, 0], [C4, 0], [C4 + .15, -24, "out"], [C4 + .4, 0, "in"]]);
  E.clip(C1 - .1, "sfx/crowd-murmur.wav", { vol: .5, duck: false, gain: [[SILENCE - .3, 1], [SILENCE, 0]] }); E.clip(C4 + .1, "sfx/applause-cheer.wav", { vol: .6, to: 1.5 });

  // ---------- counters ----------
  const pill = E.el(R, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:52px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;transform-origin:0 50%;font-variant-numeric:tabular-nums`, "");
  E.K(pill, "o", [[MUDDLE, 0], [MUDDLE + .15, 1], [BEACH - .1, 1]]);
  E.F(t => {
    let s;
    if (t < C1) s = `MINT LEAVES: ${Math.round(20 * seg(t, MUDDLE + .2, SODA - MUDDLE - .4))}`;
    else { const n = t < C2 ? 2 : t < C3 ? 3 : t < C4 ? 7 : Math.min(23, 7 + Math.round(16 * seg(t, C4, .8))); s = `MOJITOS: ${n}`; }
    if (pill.textContent !== s) pill.textContent = s;
    pill.style.background = t >= C3 ? CORAL : INK; pill.style.color = t >= C3 ? INK : "#fff";
  });
  [C1, C2, C3, C4].forEach(k => E.K(pill, "s", [[k - .01, 1], [k, 1.18], [k + .22, 1, "back"]]));

  // ---------- bubbles ----------
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 58, bg = "#fff", fg = INK, italic = false, layer = R } = o;
    const b = E.el(layer, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.04;letter-spacing:-.02em;color:${fg};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  bubble("Can I get<br>a mojito?", { left: 560, top: 470, w: 440, tail: 260, t0: ASK, t1: TWITCH + .6 });
  bubble("Oh, amazing!", { left: 560, top: 470, w: 440, tail: 260, t0: AMAZING, t1: C1 - .05, bg: GOLD });
  bubble("Ooh, make<br>that two!", { left: 560, top: 470, w: 400, tail: 260, t0: C1, t1: C2 + .6, size: 52 });
  bubble("Three!", { left: 800, top: 700, w: 240, tail: 120, t0: C2, t1: C4, size: 56 });
  bubble("Four for us!", { left: 560, top: 860, w: 360, tail: 220, t0: C3, t1: C4 + .4, size: 52 });
  bubble("MOJITOS FOR<br>EVERYONE!", { left: 240, top: 420, w: 640, tail: 520, t0: C4, t1: SILENCE, size: 72, bg: CORAL });
  E.clip(ASK + .05, "voices/sk16/h1.wav", { vol: 1.4 }); E.clip(AMAZING + .05, "voices/sk16/h2.wav", { vol: 1.4 });
  [[C1, "c1"], [C2, "c2"], [C3, "c3"], [C4, "c4"]].forEach(([t, n]) => E.clip(t + .05, `voices/sk16/${n}.wav`, { vol: 1.5 }));
  // the apron lands on the bar in total silence
  E.S(APRON + 1.0, "thud", .5);

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Last call. *23:58.*", { size: 72, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.7)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, TWITCH - .15, .12);

  // ================= scene 2: the sea =================
  const S2 = E.scene("sea", BEACH, DUR, "light"); E.cur = S2; const B = S2.el;
  E.wipe(BEACH);
  E.el(B, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2b2a5a 0%,#8e4a78 35%,#ff8a5b 58%,#ffc27a 70%)");
  const sun = E.el(B, "abs", "left:400px;top:980px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,#fff4c4 0 40%,#ffb35c 60%,rgba(255,150,80,0) 72%)");
  E.F(t => { sun.style.transform = `translateY(${seg(t, BEACH, DUR - BEACH) * 90}px)`; });
  const sea = E.el(B, "abs", "left:0;top:1160px;width:1080px;height:420px;background:linear-gradient(180deg,#e0785c,#6c3d6a 40%,#2f2b55)");
  const glints = []; for (let i = 0; i < 18; i++) glints.push(E.el(sea, "abs", `left:${400 + ((i * 53) % 280)}px;top:${20 + i * 20}px;width:${60 - i * 2}px;height:5px;border-radius:3px;background:#ffd9a0;opacity:.7`));
  E.F(t => glints.forEach((g, i) => { g.style.transform = `translateX(${Math.sin(t * 2 + i) * 20}px)`; g.style.opacity = .4 + .4 * Math.abs(Math.sin(t * 3 + i)); }));
  E.el(B, "abs", "left:0;top:1580px;width:1080px;height:340px;background:linear-gradient(180deg,#d9b27c,#c79a62)");
  const foam = E.el(B, "abs", "left:-40px;top:1560px;width:1160px;height:40px;border-radius:50%;background:rgba(255,255,255,.75)");
  E.F(t => { foam.style.transform = `translateY(${Math.sin(t * 1.5) * 10}px) scaleY(${1 + Math.sin(t * 1.5) * .3})`; });
  const gulls = E.el(B, "abs", "left:0;top:620px;width:1080px;height:200px");
  gulls.innerHTML = `<svg viewBox="0 0 1080 200" width="1080" height="200">${[[200, 60], [320, 110], [760, 40]].map(([x, y]) => `<path d="M${x} ${y} q18 -18 36 0 q18 -18 36 0" stroke="#2b2a44" stroke-width="5" fill="none"/>`).join("")}</svg>`;
  E.F(t => { gulls.style.transform = `translateX(${(t - BEACH) * 30}px)`; });
  // Sal walks away into the water: smaller as he goes, the sea swallows his legs
  const SW = 372 * 700 / 985;
  const walker = E.el(B, "abs", `left:${540 - SW / 2}px;top:${1860 - 700}px;width:${SW}px;height:700px;transform-origin:50% 100%`);
  const wimg = E.img(walker, "s_sea", `width:${SW}px;height:700px`);
  const ring = E.el(B, "abs", "left:0;top:0;width:120px;height:22px;border-radius:50%;border:4px solid rgba(255,230,200,.8);opacity:0");
  E.F(t => {
    const u = seg(t, BEACH + .2, DUR - BEACH - .2), fast = seg(t, MINTQ + .3, 1.6);
    const p = clamp(u * .8 + fast * .5, 0, 1);
    const feet = 1860 - p * 560, k = 1 - p * .62, h = 700 * k;
    walker.style.transform = `translateY(${-p * 560}px) scale(${k})`;
    const sub = clamp((1580 - feet) / h, 0, .92);                                   // how much of him is under the water line
    walker.style.clipPath = `inset(0 0 ${sub * 100}% 0)`;
    wimg.style.transform = `translateY(${Math.abs(Math.sin(t * (fast > 0 ? 9 : 4))) * -8}px)`;
    const wl = feet - sub * h;                                                       // where the water meets him
    ring.style.opacity = sub > .02 ? .9 : 0; ring.style.left = `${540 - 60 * k}px`; ring.style.top = `${wl - 11}px`; ring.style.width = `${120 * k}px`;
    ring.style.transform = `scale(${1 + Math.sin(t * 5) * .08})`;
  });
  E.clip(BEACH, "sfx/waves-seagulls.wav", { vol: .9, duck: false }); E.clip(BEACH + 3, "sfx/elx-waves.wav", { vol: .8, duck: false });
  const cap = E.el(B, "abs", "left:0;top:360px;width:1080px;text-align:center;z-index:8;opacity:0", `<span style="display:inline-block;padding:14px 30px 16px;border-radius:18px;background:rgba(20,35,29,.85);color:#fff;font-weight:800;font-size:52px;letter-spacing:.02em">SAL HAS LEFT THE BAR.</span>`);
  E.K(cap, "o", [[BEACH + .8, 0], [BEACH + 1.1, 1]]); E.K(cap, "s", [[BEACH + .8, .8], [BEACH + 1.2, 1, "back"]]); E.S(BEACH + .85, "thud", .5);
  bubble("…and one<br>without mint?", { left: 60, top: 1300, w: 420, tail: 80, t0: MINTQ, t1: DUR, size: 48, italic: true, layer: B });
  E.clip(MINTQ + .05, "voices/sk16/h3.wav", { vol: 1.2, duck: false });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
