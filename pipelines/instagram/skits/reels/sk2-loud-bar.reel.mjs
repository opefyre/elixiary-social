// SK.2 "Ordering at a loud bar" — a packed bar, bass thumping. A customer shouts "TWO NEGRONIS!" three times, louder each
// time; Sal hears "two bikinis?", then "your nephew Ronnie's?". He finally gets it and gives a thumbs-up, she does not see it,
// and the DJ cuts the track at the exact moment she bellows "I JUST WANT TWO NEGRONIS!!!" into total silence. The crowd turns.
// One cricket. Sal slides two Negronis across: "No need to shout."
// Effects only. The set (back bar, bottles, neon, lights, crowd, meter) is drawn in code.
export const meta = {
  id: "sk2-loud-bar",
  images: {
    c_shout: "cutouts/cust_shout.webp", c_scream: "cutouts/cust_scream.webp", c_oops: "cutouts/cust_oops.webp",
    s_ear: "cutouts/salb_ear.webp", s_thumb: "cutouts/salb_thumb.webp", s_neg: "cutouts/salb_negroni.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  const DUR = 16.0;
  const CUT = 9.8;                                   // the DJ kills the track
  E.music({ bpm: 124, root: 50, seed: 77, prog: [[0, 3, 7], [5, 8, 12], [3, 7, 10], [7, 10, 14]], until: CUT });
  const S = E.scene("bar", 0, DUR, "light"); E.cur = S;
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const BEAT = 60 / 124;
  const pulse = t => (t >= CUT ? 0 : Math.pow(1 - ((t % BEAT) / BEAT), 3));         // 1 on every kick, decays
  const clubOn = t => (t < CUT ? 1 : 0);

  const SH1 = .9, HEAR1 = 2.5, SH2 = 4.0, HEAR2 = 5.5, SH3 = 7.0, GOTIT = 8.5, YELL = CUT + .05, EYES = 10.4, CRICKET = 11.2, OOPS = 11.4, SERVE = 12.3;
  const TOP = 1400;                                  // bar top

  // ================= back wall =================
  E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#0c0a14 0%,#191226 45%,#120d1a 100%)");
  // exposed brick, barely lit
  E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1400px;opacity:.16;" +
    "background-image:linear-gradient(0deg,rgba(0,0,0,.9) 3px,transparent 3px),linear-gradient(90deg,rgba(0,0,0,.9) 3px,transparent 3px),linear-gradient(90deg,rgba(0,0,0,.9) 3px,transparent 3px);" +
    "background-size:100% 52px,120px 104px,120px 104px;background-position:0 0,0 0,60px 52px;background-color:#6b3a2c");
  // back-bar mirror panel behind the shelves
  const mirror = E.el(S.el, "abs", "left:40px;top:500px;width:1000px;height:820px;border-radius:18px;border:10px solid #3a2a1c;" +
    "background:linear-gradient(115deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,.0) 30%,rgba(255,255,255,.05) 55%,rgba(255,255,255,0) 70%),linear-gradient(180deg,#221a2c,#140f1c)");

  // ================= neon sign =================
  const neon = E.el(S.el, "abs", `left:0;top:372px;width:1080px;text-align:center;font-family:"Noto Sans";font-weight:800;font-size:92px;letter-spacing:.06em;color:#ffe6f4;`, "OPEN LATE");
  const neonGlow = on => `0 0 6px #fff,0 0 16px #ff4fd8,0 0 38px #ff4fd8,0 0 70px #ff2fc0,0 0 110px rgba(255,47,192,${.6 * on})`;
  E.F(t => {
    // live: steady with a tiny flicker; after the cut the sign buzzes off twice and dies
    let on = t < CUT ? (Math.sin(t * 37) > .97 ? .6 : 1) : (t < CUT + .12 ? 0 : t < CUT + .22 ? 1 : t < CUT + .34 ? 0 : t < CUT + .4 ? .8 : 0);
    neon.style.textShadow = on > 0 ? neonGlow(on) : "none";
    neon.style.color = on > 0 ? "#ffe6f4" : "#4a3848";
    neon.style.opacity = on > 0 ? on : 1;
  });
  E.S(CUT + .1, "buzz", .35);

  // ================= shelves of backlit bottles =================
  const LIQ = ["#e39a2d", "#b4561f", "#d9e8e0", "#3f8f5a", "#c23a2c", "#6fa3c9", "#f3d27a", "#7a3b1d", "#e9e1cf", "#a02c4a"];
  const bottleSVG = (kind, liq, cap, w, h) => {
    const g = `g${Math.random().toString(36).slice(2, 8)}`;
    let body;
    if (kind === 0) body = `M${w * .38} 0 H${w * .62} V${h * .28} Q${w} ${h * .34} ${w} ${h * .46} V${h - 6} Q${w} ${h} ${w - 6} ${h} H6 Q0 ${h} 0 ${h - 6} V${h * .46} Q0 ${h * .34} ${w * .38} ${h * .28} Z`;          // round shoulders
    else if (kind === 1) body = `M${w * .36} 0 H${w * .64} V${h * .2} L${w} ${h * .3} V${h} H0 V${h * .3} L${w * .36} ${h * .2} Z`;                                                   // square gin
    else if (kind === 2) body = `M${w * .42} 0 H${w * .58} V${h * .42} Q${w} ${h * .5} ${w} ${h * .62} V${h} H0 V${h * .62} Q0 ${h * .5} ${w * .42} ${h * .42} Z`;               // long neck
    else body = `M${w * .3} 0 H${w * .7} V${h * .14} Q${w} ${h * .2} ${w} ${h * .34} V${h} H0 V${h * .34} Q0 ${h * .2} ${w * .3} ${h * .14} Z`;                                   // squat
    const capH = kind === 2 ? h * .1 : h * .08, capW = kind === 3 ? w * .44 : w * .26;
    return `<defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="${liq}" stop-opacity=".95"/><stop offset=".22" stop-color="#fff" stop-opacity=".55"/>` +
      `<stop offset=".32" stop-color="${liq}" stop-opacity=".9"/><stop offset=".85" stop-color="${liq}" stop-opacity=".75"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient></defs>` +
      `<path d="${body}" fill="url(#${g})"/>` +
      `<rect x="${(w - capW) / 2}" y="${-capH + 2}" width="${capW}" height="${capH}" rx="3" fill="${cap}"/>` +
      (kind !== 2 ? `<rect x="${w * .12}" y="${h * .55}" width="${w * .76}" height="${h * .26}" rx="3" fill="#efe6d2" opacity=".92"/><rect x="${w * .24}" y="${h * .61}" width="${w * .52}" height="5" fill="#8a6a44"/><rect x="${w * .3}" y="${h * .7}" width="${w * .4}" height="4" fill="#b59a70"/>`
        : `<rect x="${w * .12}" y="${h * .7}" width="${w * .76}" height="${h * .18}" rx="3" fill="#1d1a16" opacity=".9"/><rect x="${w * .3}" y="${h * .76}" width="${w * .4}" height="5" fill="${GOLD}"/>`) +
      `<path d="M${w * .16} ${h * .4} V${h - 10}" stroke="#fff" stroke-opacity=".35" stroke-width="${Math.max(3, w * .06)}" stroke-linecap="round"/>`;
  };
  const shelfYs = [690, 930, 1170];
  const shelfGlow = [];
  shelfYs.forEach((sy, si) => {
    // warm backlight strip behind each row, then the glass shelf
    const gl = E.el(S.el, "abs", `left:50px;top:${sy - 210}px;width:980px;height:210px;background:linear-gradient(0deg,rgba(255,176,82,.55),rgba(255,176,82,0) 85%)`);
    shelfGlow.push(gl);
    let x = 70 + (si % 2) * 22, k = si * 3;
    while (x < 1000) {
      const kind = (k * 7 + si) % 4, w = [58, 62, 44, 74][kind], h = [170, 150, 190, 120][kind] - (k % 3) * 8;
      const b = E.el(S.el, "abs", `left:${x}px;top:${sy - h}px;width:${w}px;height:${h}px`);
      b.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible">${bottleSVG(kind, LIQ[(k * 3 + si) % LIQ.length], ["#c9a24a", "#1a1a1a", "#8b1e1e", "#d8d8d8"][k % 4], w, h)}</svg>`;
      x += w + 12 + (k % 3) * 6; k++;
    }
    E.el(S.el, "abs", `left:50px;top:${sy}px;width:980px;height:10px;border-radius:3px;background:linear-gradient(180deg,rgba(220,245,255,.85),rgba(160,200,220,.35));box-shadow:0 0 18px rgba(255,190,110,.55),0 8px 16px rgba(0,0,0,.5)`);
  });

  // ================= club lights: beams, haze, mirror-ball specks =================
  const lightsLayer = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;mix-blend-mode:screen;pointer-events:none");
  const BEAMS = [[120, "#ff3fd0", 0], [960, "#35e0ff", 1.3], [420, "#ffd23f", 2.1], [700, "#7c5cff", .6]];
  const beams = BEAMS.map(([x, c, ph]) => {
    const b = E.el(lightsLayer, "abs", `left:${x - 90}px;top:-40px;width:180px;height:1700px;transform-origin:90px 0;` +
      `background:linear-gradient(180deg,${c} 0%,${c}88 30%,transparent 95%);clip-path:polygon(44% 0,56% 0,100% 100%,0 100%);filter:blur(10px);opacity:.5`);
    return [b, ph];
  });
  const haze = E.el(lightsLayer, "abs", "left:-200px;top:300px;width:1480px;height:1100px;background:radial-gradient(40% 35% at 30% 40%,rgba(255,80,200,.18),transparent),radial-gradient(40% 35% at 75% 55%,rgba(60,200,255,.16),transparent)");
  const specks = [];
  for (let i = 0; i < 34; i++) {
    const d = E.el(lightsLayer, "abs", `left:0;top:0;width:${8 + (i % 4) * 3}px;height:${8 + (i % 4) * 3}px;border-radius:50%;background:${["#fff", "#ffd6f5", "#d6f7ff"][i % 3]};box-shadow:0 0 10px #fff`);
    specks.push(d);
  }
  E.F(t => {
    const on = clubOn(t), p = pulse(t);
    beams.forEach(([b, ph], i) => {
      b.style.transform = `rotate(${Math.sin(t * (1.1 + i * .23) + ph) * 26}deg)`;
      b.style.opacity = on * (.34 + .3 * p);
    });
    haze.style.opacity = on * (.8 + .2 * p);
    haze.style.transform = `translateX(${Math.sin(t * .6) * 60}px)`;
    specks.forEach((d, i) => {
      const x = ((i * 137 + t * (70 + (i % 5) * 18)) % 1180) - 50, y = 480 + ((i * 263) % 900) + Math.sin(t + i) * 20;
      d.style.transform = `translate(${x}px,${y}px)`; d.style.opacity = on * (.35 + .5 * ((i + Math.floor(t * 8)) % 3 === 0 ? 1 : .3));
    });
    shelfGlow.forEach(g => { g.style.opacity = on ? .75 + .25 * p : .35; });
  });

  // ================= Sal behind the bar =================
  const SAL = [["s_ear", 858, 926, 780, 380, 0], ["s_thumb", 864, 1130, 940, 350, 0], ["s_neg", 803, 1022, 880, 390, 20]];
  const sal = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px");
  const salIn = E.el(sal, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:360px 1480px");
  const salEls = SAL.map(([n, w, h, H, cx, dy]) => { const W = w * H / h; return [n, E.img(salIn, n, `position:absolute;left:${cx - W / 2}px;top:${1480 + dy - H}px;width:${W}px;height:${H}px`)]; });
  const SPOSE = [[0, "s_ear"], [GOTIT, "s_thumb"], [SERVE, "s_neg"]];
  E.F(t => {
    const f = at(SPOSE, t); salEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    let sy = 1, dy = t < CUT ? -Math.abs(Math.sin(t / BEAT * Math.PI)) * 4 : 0;       // a small nod to the beat
    for (const [k] of SPOSE.slice(1)) if (t >= k && t < k + .25) sy = 1 + .06 * Math.sin((t - k) / .25 * Math.PI);
    salIn.style.transform = `translateY(${dy}px) scaleY(${sy})`;
  });

  // ================= the bar =================
  const top = E.el(S.el, "abs", `left:0;top:${TOP}px;width:1080px;height:46px;` +
    "background:linear-gradient(180deg,#6b3b1f 0%,#4a2612 60%,#2e170b 100%);box-shadow:0 -2px 0 #c89a4a inset,0 10px 24px rgba(0,0,0,.6)");
  E.el(top, "abs", "left:0;top:0;width:1080px;height:46px;opacity:.35;background:repeating-linear-gradient(90deg,transparent 0 38px,rgba(0,0,0,.35) 38px 40px,transparent 40px 91px,rgba(255,220,170,.18) 91px 92px)");
  E.el(S.el, "abs", `left:0;top:${TOP - 3}px;width:1080px;height:5px;background:linear-gradient(90deg,#8a6526,#f2d27a 30%,#b8893a 55%,#f7e2a0 80%,#8a6526)`);   // brass edge
  const front = E.el(S.el, "abs", `left:0;top:${TOP + 46}px;width:1080px;height:${1920 - TOP - 46}px;` +
    "background:repeating-linear-gradient(90deg,#2a150a 0 86px,#1c0e06 86px 90px),linear-gradient(180deg,#3a1d0c,#1a0c05)");
  const led = E.el(S.el, "abs", `left:0;top:${TOP + 46}px;width:1080px;height:90px;background:linear-gradient(180deg,rgba(255,170,70,.55),transparent)`);
  E.el(S.el, "abs", "left:0;top:1760px;width:1080px;height:22px;border-radius:11px;background:linear-gradient(180deg,#f7e2a0,#b8893a 50%,#6d4f1d)");   // brass foot rail
  // coasters and a bar mat on the counter
  E.el(S.el, "abs", `left:120px;top:${TOP + 8}px;width:340px;height:22px;border-radius:6px;background:repeating-linear-gradient(90deg,#1b1b1b 0 12px,#2a2a2a 12px 16px)`);
  [[560, "#1f4b3a"], [640, "#6a2432"]].forEach(([x, c]) => E.el(S.el, "abs", `left:${x}px;top:${TOP + 10}px;width:64px;height:18px;border-radius:50%;background:${c};box-shadow:inset 0 -3px 0 rgba(0,0,0,.35)`));
  E.F(t => { led.style.opacity = t < CUT ? .8 + .2 * pulse(t) : .45; });

  // ================= the customer (in front of the bar, right) =================
  const CUST = [["c_shout", 820, 1112, 1000, 800], ["c_scream", 846, 1118, 1000, 790], ["c_oops", 650, 1131, 990, 840]];
  const cust = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px");
  const cIn = E.el(cust, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:820px 1760px");
  const cEls = CUST.map(([n, w, h, H, cx]) => { const W = w * H / h; return [n, E.img(cIn, n, `position:absolute;left:${cx - W / 2}px;top:${1780 - H}px;width:${W}px;height:${H}px`)]; });
  const CPOSE = [[0, "c_shout"], [SH3, "c_scream"], [OOPS, "c_oops"]];
  const lean = [[SH1, 1], [SH2, 1.5], [SH3, 2.2], [YELL, 2.6]];
  E.F(t => {
    const f = at(CPOSE, t); cEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    let r = 0, s = 1, dx = 0;
    for (const [k, amt] of lean) if (t >= k && t < k + .5) { const u = (t - k) / .5; r = -amt * 2.2 * Math.sin(u * Math.PI); s = 1 + .025 * amt * Math.sin(u * Math.PI); }
    if (t >= SH3 && t < CUT) dx = Math.sin(t * 55) * 4;                                      // trembling with effort
    if (t >= OOPS) { const u = Math.min(1, (t - OOPS) / .3); s = 1 - .04 * u; }                // shrinks into herself
    cIn.style.transform = `translateX(${dx}px) rotate(${r}deg) scale(${s})`;
  });

  // ================= the crowd (foreground silhouettes) =================
  const crowdLayer = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px");
  // [x, y, scale, rim colour, hair: 0 short, 1 bun, 2 cap, 3 ponytail, 4 curls]
  const PEOPLE = [[-40, 1640, 1.15, "#ff3fd0", 1], [180, 1690, 1.0, "#35e0ff", 2], [400, 1660, 1.1, "#ffd23f", 3], [600, 1740, .95, "#35e0ff", 0], [790, 1700, 1.05, "#ff3fd0", 4], [980, 1690, 1.05, "#7c5cff", 0]];
  const crowd = PEOPLE.map(([x, y, k, rim, hair], i) => {
    const w = 260 * k, h = 330 * k;
    const p = E.el(crowdLayer, "abs", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform-origin:50% 100%`);
    p.innerHTML = `<svg viewBox="0 0 260 330" width="${w}" height="${h}" style="overflow:visible"><g class="body">` +
      `<path d="M10 330 Q14 220 80 196 Q130 180 180 196 Q246 220 250 330 Z" fill="#07060c"/>` +
      `<ellipse cx="130" cy="120" rx="70" ry="84" fill="#07060c"/>` +
      [`<path d="M62 100 Q64 30 130 30 Q198 30 200 100 Q180 66 130 64 Q82 66 62 100 Z" fill="#0d0b13"/>`,
       `<circle cx="130" cy="36" r="34" fill="#07060c"/><path d="M66 96 Q70 44 130 46 Q192 44 196 96" fill="#0d0b13"/>`,
       `<path d="M54 98 Q58 30 130 30 Q204 30 206 98 Z" fill="#0f0d16"/><path d="M40 98 Q130 84 236 104 L234 116 Q130 98 42 110 Z" fill="#0f0d16"/>`,
       `<path d="M190 70 Q246 96 232 190 Q222 150 196 130 Z" fill="#07060c"/><path d="M62 98 Q66 34 130 32 Q196 34 198 98 Q176 64 130 62 Q84 64 62 98 Z" fill="#0d0b13"/>`,
       `<g fill="#07060c">${[[70, 70], [96, 44], [130, 36], [164, 44], [190, 70], [58, 104], [202, 104]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="30"/>`).join("")}</g>`][hair] +
      `<path d="M58 250 Q130 236 202 250" stroke="#16131f" stroke-width="6" fill="none"/>` +
      `</g><g class="eyes" opacity="0"><ellipse cx="108" cy="116" rx="17" ry="12" fill="#fff"/><ellipse cx="160" cy="116" rx="17" ry="12" fill="#fff"/>` +
      `<circle class="pl" cx="112" cy="117" r="7" fill="#07060c"/><circle class="pr" cx="164" cy="117" r="7" fill="#07060c"/></g></svg>`;
    p.style.filter = `drop-shadow(0 -3px 0 ${rim}) drop-shadow(0 0 16px ${rim}88)`;
    return [p, rim];
  });
  E.F(t => {
    crowd.forEach(([p, rim], i) => {
      const on = t < CUT;
      const bob = on ? -Math.abs(Math.sin((t / BEAT + i * .5) * Math.PI)) * 22 : 0;
      const turn = t >= EYES ? Math.min(1, (t - EYES - i * .06) / .25) : 0;
      p.style.transform = `translateY(${bob}px) rotate(${on ? Math.sin(t * 2 + i) * 3 : 0}deg)`;
      p.style.filter = on ? `drop-shadow(0 -3px 0 ${rim}) drop-shadow(0 0 16px ${rim}88)` : "drop-shadow(0 -2px 0 rgba(255,255,255,.18))";
      const eyes = p.querySelector(".eyes"); eyes.setAttribute("opacity", String(Math.max(0, turn)));
      const look = 7 * Math.max(0, turn);                   // pupils slide toward her (right)
      p.querySelector(".pl").setAttribute("cx", String(108 + look)); p.querySelector(".pr").setAttribute("cx", String(160 + look));
    });
  });
  crowd.forEach((_, i) => E.S(EYES + i * .06, "tick", .35));

  // ================= house lights after the cut =================
  const house = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,rgba(215,225,235,.24),rgba(215,225,235,.12));mix-blend-mode:screen;opacity:0;pointer-events:none");
  E.K(house, "o", [[CUT, 0], [CUT + .02, 1]]);
  E.flash(CUT, "#ffffff", .35, .18);

  // ================= volume meter =================
  const meter = E.el(S.el, "abs", `left:100px;top:254px;height:78px;display:flex;align-items:center;gap:16px;padding:0 26px 0 20px;border-radius:40px;background:rgba(10,8,16,.78);box-shadow:0 0 0 2px rgba(255,255,255,.12) inset;z-index:8;opacity:0;transform-origin:0 50%`);
  meter.innerHTML = `<svg viewBox="0 0 40 40" width="44" height="44"><path d="M6 15 H13 L23 7 V33 L13 25 H6 Z" fill="#fff"/><path class="w1" d="M28 14 Q33 20 28 26" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/><path class="w2" d="M32 9 Q41 20 32 31" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`;
  const segBox = E.el(meter, "", "display:flex;gap:6px;align-items:flex-end");
  const SEG = 14, segs = [];
  for (let i = 0; i < SEG; i++) segs.push(E.el(segBox, "", `width:18px;height:${22 + i * 2}px;border-radius:4px;background:${i < 8 ? "#39d98a" : i < 11 ? GOLD : CORAL}`));
  const dbTxt = E.el(meter, "", `min-width:170px;text-align:right;font-weight:800;font-size:44px;color:#fff;letter-spacing:-.02em;font-variant-numeric:tabular-nums`, "92 dB");
  E.K(meter, "o", [[2.55, 0], [2.75, 1]]);
  // level over time: the room, then each shout on top of it; after the cut only her voice, then nothing
  const LV = [[0, 92], [SH1, 104], [SH1 + 1.3, 93], [SH2, 111], [SH2 + 1.3, 94], [SH3, 121], [SH3 + 1.5, 97], [CUT, 14], [YELL, 118], [YELL + 1.7, 0]];
  E.F(t => {
    let v = LV[0][1]; for (const [k, x] of LV) if (t >= k) v = x;
    if (t < CUT && v < 100) v += pulse(t) * 4;
    const s = `${Math.round(v)} dB`; if (dbTxt.textContent !== s) dbTxt.textContent = s;
    const lit = Math.round(Math.max(0, Math.min(1, (v - 20) / 102)) * SEG);
    segs.forEach((g, i) => { g.style.opacity = i < lit ? 1 : .16; });
    dbTxt.style.color = v >= 115 ? CORAL : v >= 105 ? GOLD : "#fff";
  });
  [SH1, SH2, SH3, YELL].forEach(k => E.K(meter, "s", [[k - .01, 1], [k, 1.12], [k + .22, 1, "back"]]));

  // ================= bubbles =================
  // hers: loud gold panels with a sharp tail; his: white, softer, italic
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 64, bg = "#fff", fg = INK, italic = false, weight = 800, rot = 0, up = false } = o;
    const b = E.el(S.el, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:20px 28px 24px;box-shadow:0 14px 34px rgba(0,0,0,.45);` +
      `font-weight:${weight};font-size:${size}px;line-height:1.02;letter-spacing:-.02em;color:${fg};text-align:center;${italic ? "font-style:italic;" : ""}${up ? "text-transform:uppercase;" : ""}transform:rotate(${rot}deg)`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 });
    E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]);
    E.S(t0 + .02, "pop", .55);
    return b;
  };
  bubble("TWO NEGRONIS!", { left: 330, top: 560, w: 560, tail: 400, t0: SH1, t1: HEAR1 - .05, size: 62, bg: GOLD, rot: -2 });
  bubble("…two bikinis?", { left: 70, top: 500, w: 470, tail: 250, t0: HEAR1, t1: SH2 - .05, size: 58, italic: true, weight: 700 });
  bubble("NE-GRO-NIS!!", { left: 300, top: 540, w: 640, tail: 460, t0: SH2, t1: HEAR2 - .05, size: 84, bg: GOLD, rot: 2 });
  bubble("…your nephew<br>Ronnie's?", { left: 70, top: 490, w: 470, tail: 250, t0: HEAR2, t1: SH3 - .05, size: 56, italic: true, weight: 700 });
  bubble("N! E! G! R! O!<br>N! I! S!", { left: 250, top: 500, w: 720, tail: 520, t0: SH3, t1: GOTIT + .05, size: 86, bg: CORAL, rot: -2 });
  bubble("Ohh! Two<br>Negronis!", { left: 60, top: 490, w: 470, tail: 260, t0: GOTIT, t1: CUT - .05, size: 56, weight: 800 });
  const yell = bubble("I JUST WANT<br>TWO NEGRONIS!!!", { left: 60, top: 350, w: 960, tail: 760, t0: YELL, t1: OOPS + .5, size: 90, bg: CORAL, rot: -1 });
  bubble("No need<br>to shout.", { left: 80, top: 480, w: 440, tail: 260, t0: SERVE + .1, t1: DUR, size: 64, weight: 800 });
  E.shake(SH3 + .05, 10, .3); E.shake(YELL, 22, .45);

  // ================= sound =================
  for (let t = 0; t < CUT - .01; t += 3) E.clip(t, "sfx/club-bass.wav", { vol: .9, to: Math.min(3, CUT - t), duck: false });
  E.clip(0, "sfx/crowd-murmur.wav", { vol: .45, duck: false }); E.clip(3, "sfx/crowd-murmur.wav", { vol: .45, duck: false }); E.clip(6, "sfx/crowd-murmur.wav", { vol: .45, to: CUT - 6, duck: false });
  E.clip(CUT - .08, "sfx/record-silence.wav", { vol: 1 });
  E.clip(CRICKET, "sfx/cicadas.wav", { vol: .45, to: 1.1, duck: false });
  E.S(SERVE + .05, "swish", .6); E.S(SERVE + .35, "ding", .5);

  // ================= title (frame 0) =================
  const titleBox = E.el(S.el, "abs", "left:100px;top:252px;width:820px;z-index:8");
  const title = E.text(titleBox, "Ordering at a *loud* bar", { size: 72, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 24px rgba(0,0,0,.8)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, 2.5, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[15.15, 1], [15.4, 1.18, "out"], [15.7, 1, "io"]]);
}
