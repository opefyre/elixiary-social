// SK.3 "Almost ready to order." — the customer from SK.2 opens the menu; Sal waits. The menu never ends, and time-lapses:
// the clock spins, the window runs through days, rain and snow, the candle burns down, the ice melts, the calendar sheds its
// pages, a cobweb grows. Sal goes from patient, to stubbled and dead-eyed, to a very old man with a white beard.
// She finally closes the menu: "What do you recommend?" Old Sal wheezes: "…the Old Fashioned."
// The menu lists real curated recipes (names and first ingredients from the database, exported to assets/menu-sk3.json).
export const meta = {
  id: "sk3-recommend",
  images: {
    c_read: "cutouts/cust_read.webp", c_ask: "cutouts/cust_ask.webp",
    s_wait: "cutouts/salc_wait.webp", s_tired: "cutouts/salc_tired.webp", s_old: "cutouts/salc_old.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CREAM = "#f6efdf";
  E.episode(-16);
  E.music({ bpm: 96, root: 57, seed: 5, prog: [[0, 4, 7], [5, 9, 12], [2, 5, 9], [7, 11, 14]], until: 10.5 });
  const DUR = 16.4;
  const S = E.scene("bar", 0, DUR, "light"); E.cur = S;
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const TL0 = 4.5, TL1 = 10.5, TIRED = 6.6, OLD = 9.0, ASK = 10.8, ANSWER = 12.7;
  const TOP = 1400;
  // days elapsed: a quiet evening, then an accelerating time-lapse, then it stops
  const days = t => t < TL0 ? .78 + t * .0006 : t < TL1 ? .78 + TL0 * .0006 + 14 * Math.pow((t - TL0) / (TL1 - TL0), 2.2) : .78 + TL0 * .0006 + 14 + .02;
  const speed = t => (t < TL0 || t >= TL1) ? 0 : clamp((t - TL0) / (TL1 - TL0), 0, 1);     // 0..1 how fast time runs

  // ================= room =================
  E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2a1d17 0%,#3a281d 50%,#241812 100%)");
  E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1400px;opacity:.22;" +
    "background-image:linear-gradient(0deg,rgba(0,0,0,.8) 3px,transparent 3px),linear-gradient(90deg,rgba(0,0,0,.8) 3px,transparent 3px),linear-gradient(90deg,rgba(0,0,0,.8) 3px,transparent 3px);" +
    "background-size:100% 52px,120px 104px,120px 104px;background-position:0 0,0 0,60px 52px;background-color:#8a4a34");
  // warm lamp glow from the top left; it dims to a cold blue at night during the time-lapse
  const lampGlow = E.el(S.el, "abs", "left:-300px;top:-200px;width:1200px;height:1200px;background:radial-gradient(closest-side,rgba(255,196,120,.38),transparent)");
  const nightTint = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;background:#0a1430;mix-blend-mode:multiply;opacity:0;z-index:1");

  // ---------- back-bar shelves (left, behind Sal) ----------
  E.el(S.el, "abs", "left:40px;top:560px;width:560px;height:780px;border-radius:14px;border:10px solid #4a3020;background:linear-gradient(115deg,rgba(255,255,255,.07),rgba(255,255,255,0) 35%,rgba(255,255,255,.05) 60%,rgba(255,255,255,0) 75%),linear-gradient(180deg,#2c2019,#1c140f)");
  const LIQ = ["#e39a2d", "#b4561f", "#d9e8e0", "#3f8f5a", "#c23a2c", "#6fa3c9", "#f3d27a", "#7a3b1d", "#e9e1cf", "#a02c4a"];
  let gid = 0;
  const bottleSVG = (kind, liq, cap, w, h) => {
    const g = `bt${gid++}`;
    const body = [
      `M${w * .38} 0 H${w * .62} V${h * .28} Q${w} ${h * .34} ${w} ${h * .46} V${h - 6} Q${w} ${h} ${w - 6} ${h} H6 Q0 ${h} 0 ${h - 6} V${h * .46} Q0 ${h * .34} ${w * .38} ${h * .28} Z`,
      `M${w * .36} 0 H${w * .64} V${h * .2} L${w} ${h * .3} V${h} H0 V${h * .3} L${w * .36} ${h * .2} Z`,
      `M${w * .42} 0 H${w * .58} V${h * .42} Q${w} ${h * .5} ${w} ${h * .62} V${h} H0 V${h * .62} Q0 ${h * .5} ${w * .42} ${h * .42} Z`,
      `M${w * .3} 0 H${w * .7} V${h * .14} Q${w} ${h * .2} ${w} ${h * .34} V${h} H0 V${h * .34} Q0 ${h * .2} ${w * .3} ${h * .14} Z`][kind];
    const capH = kind === 2 ? h * .1 : h * .08, capW = kind === 3 ? w * .44 : w * .26;
    return `<defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="${liq}" stop-opacity=".95"/><stop offset=".22" stop-color="#fff" stop-opacity=".5"/>` +
      `<stop offset=".32" stop-color="${liq}" stop-opacity=".9"/><stop offset=".85" stop-color="${liq}" stop-opacity=".75"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient></defs>` +
      `<path d="${body}" fill="url(#${g})"/><rect x="${(w - capW) / 2}" y="${-capH + 2}" width="${capW}" height="${capH}" rx="3" fill="${cap}"/>` +
      (kind !== 2 ? `<rect x="${w * .12}" y="${h * .55}" width="${w * .76}" height="${h * .26}" rx="3" fill="#efe6d2" opacity=".92"/><rect x="${w * .24}" y="${h * .61}" width="${w * .52}" height="5" fill="#8a6a44"/><rect x="${w * .3}" y="${h * .7}" width="${w * .4}" height="4" fill="#b59a70"/>`
        : `<rect x="${w * .12}" y="${h * .7}" width="${w * .76}" height="${h * .18}" rx="3" fill="#1d1a16" opacity=".9"/><rect x="${w * .3}" y="${h * .76}" width="${w * .4}" height="5" fill="${GOLD}"/>`) +
      `<path d="M${w * .16} ${h * .4} V${h - 10}" stroke="#fff" stroke-opacity=".32" stroke-width="${Math.max(3, w * .06)}" stroke-linecap="round"/>`;
  };
  // dust settles on the bottles as the years pass
  const dusts = [];
  [760, 1000, 1240].forEach((sy, si) => {
    E.el(S.el, "abs", `left:50px;top:${sy - 200}px;width:540px;height:200px;background:linear-gradient(0deg,rgba(255,176,82,.4),rgba(255,176,82,0) 85%)`);
    let x = 66 + (si % 2) * 20, k = si * 3;
    while (x < 560) {
      const kind = (k * 7 + si) % 4, w = [56, 60, 42, 72][kind], h = [168, 148, 188, 118][kind] - (k % 3) * 8;
      const b = E.el(S.el, "abs", `left:${x}px;top:${sy - h}px;width:${w}px;height:${h}px`);
      b.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible">${bottleSVG(kind, LIQ[(k * 3 + si) % LIQ.length], ["#c9a24a", "#1a1a1a", "#8b1e1e", "#d8d8d8"][k % 4], w, h)}</svg>`;
      const d = E.el(b, "abs", `left:0;top:0;width:${w}px;height:${h}px;border-radius:6px;background:linear-gradient(180deg,rgba(200,190,170,.85),rgba(200,190,170,.35) 40%,rgba(200,190,170,.15));opacity:0`);
      dusts.push(d);
      x += w + 12 + (k % 3) * 6; k++;
    }
    E.el(S.el, "abs", `left:50px;top:${sy}px;width:540px;height:10px;border-radius:3px;background:linear-gradient(180deg,rgba(220,245,255,.85),rgba(160,200,220,.35));box-shadow:0 0 16px rgba(255,190,110,.5),0 8px 14px rgba(0,0,0,.5)`);
  });

  // ---------- the window (top right): sky, sun/moon, rain, snow on the sill ----------
  const WX = 650, WY = 450, WW = 370, WH = 330;
  const win = E.el(S.el, "abs", `left:${WX}px;top:${WY}px;width:${WW}px;height:${WH}px;border-radius:10px;overflow:hidden;box-shadow:0 0 0 14px #5a3a26,0 0 0 18px #2a1a10,0 18px 40px rgba(0,0,0,.5)`);
  const sky = E.el(win, "abs", `left:0;top:0;width:${WW}px;height:${WH}px`);
  const sun = E.el(win, "abs", "left:0;top:0;width:70px;height:70px;border-radius:50%;background:radial-gradient(circle,#fff6c9 0 45%,#ffd35c 60%,rgba(255,211,92,0) 72%)");
  const moon = E.el(win, "abs", "left:0;top:0;width:54px;height:54px;border-radius:50%;background:#eef1f7;box-shadow:inset -14px -6px 0 #c7cedb,0 0 24px rgba(220,230,255,.6)");
  const stars = []; for (let i = 0; i < 14; i++) stars.push(E.el(win, "abs", `left:${(i * 71) % (WW - 10)}px;top:${(i * 43) % 150 + 8}px;width:4px;height:4px;border-radius:50%;background:#fff`));
  // rooftops across the street, lights on at night
  const roofs = E.el(win, "abs", `left:0;top:${WH - 120}px;width:${WW}px;height:120px`);
  roofs.innerHTML = `<svg viewBox="0 0 ${WW} 120" width="${WW}" height="120"><path d="M0 50 L40 22 L80 50 V120 H0 Z M86 60 H170 V30 H200 V60 H240 L280 34 L320 60 H${WW} V120 H86 Z" fill="#3b2f3a"/>` +
    [[20, 70], [50, 90], [120, 80], [150, 96], [210, 84], [290, 78], [330, 98]].map(([x, y]) => `<rect class="lit" x="${x}" y="${y}" width="16" height="18" fill="#ffd98a"/>`).join("") + `</svg>`;
  const lit = [...roofs.querySelectorAll(".lit")];
  const rain = []; for (let i = 0; i < 26; i++) rain.push(E.el(win, "abs", `left:0;top:0;width:3px;height:34px;border-radius:2px;background:rgba(210,225,255,.75);transform:rotate(12deg)`));
  const snow = []; for (let i = 0; i < 30; i++) snow.push(E.el(win, "abs", `left:0;top:0;width:${6 + (i % 3) * 3}px;height:${6 + (i % 3) * 3}px;border-radius:50%;background:#fff`));
  const sill = E.el(S.el, "abs", `left:${WX - 24}px;top:${WY + WH + 12}px;width:${WW + 48}px;height:22px;border-radius:6px;background:linear-gradient(180deg,#6a4630,#3e2818)`);
  const snowSill = E.el(S.el, "abs", `left:${WX - 22}px;top:${WY + WH - 22}px;width:${WW + 44}px;height:36px;transform-origin:50% 100%`);
  snowSill.innerHTML = `<svg viewBox="0 0 ${WW + 44} 36" width="${WW + 44}" height="36" preserveAspectRatio="none"><path d="M0 36 Q10 20 30 22 Q52 8 80 18 Q104 26 126 14 Q150 4 176 16 Q200 26 224 12 Q250 2 276 16 Q300 26 322 14 Q346 6 370 18 Q392 24 ${WW + 44} 20 V36 Z" fill="#f7fbff"/><path d="M0 36 Q120 28 ${WW + 44} 32 V36 Z" fill="#d6e2ef"/></svg>`;
  E.el(win, "abs", `left:${WW / 2 - 6}px;top:0;width:12px;height:${WH}px;background:#5a3a26`);
  E.el(win, "abs", `left:0;top:${WH / 2 - 6}px;width:${WW}px;height:12px;background:#5a3a26`);
  const RAIN0 = 6.9, RAIN1 = 7.9, SNOW0 = 8.3, SNOW1 = 10.4;
  E.F(t => {
    const d = days(t), f = ((d % 1) + 1) % 1;                            // 0 midnight, .25 dawn, .5 noon, .75 dusk
    const dayness = clamp(Math.sin((f - .25) * Math.PI * 2) * .5 + .5, 0, 1);  // 0 at night, 1 at noon
    const top = dayness > .5 ? `rgb(${lerpC([255, 170, 110], [110, 175, 235], (dayness - .5) * 2)})` : `rgb(${lerpC([14, 20, 48], [255, 150, 100], dayness * 2)})`;
    const bot = dayness > .5 ? `rgb(${lerpC([255, 214, 150], [190, 225, 250], (dayness - .5) * 2)})` : `rgb(${lerpC([30, 36, 70], [255, 190, 140], dayness * 2)})`;
    const stormy = t >= RAIN0 && t < RAIN1 ? 1 : 0, snowy = t >= SNOW0 && t < SNOW1 ? 1 : 0;
    sky.style.background = `linear-gradient(180deg,${top},${bot})`;
    sky.style.filter = stormy ? "saturate(.3) brightness(.7)" : snowy ? "saturate(.45) brightness(1.05)" : "none";
    const ang = (f - .25) * Math.PI * 2;                                     // sun rises at .25
    sun.style.transform = `translate(${WW / 2 - 35 + Math.cos(ang + Math.PI) * 150}px,${170 - Math.sin(ang) * 130}px)`;
    sun.style.opacity = clamp(Math.sin(ang) * 3, 0, 1) * (stormy ? .2 : 1);
    const mang = ang + Math.PI;
    moon.style.transform = `translate(${WW / 2 - 27 + Math.cos(mang + Math.PI) * 150}px,${170 - Math.sin(mang) * 130}px)`;
    moon.style.opacity = clamp(Math.sin(mang) * 3, 0, 1) * (stormy ? .2 : 1);
    stars.forEach((s, i) => { s.style.opacity = (1 - dayness) * (.4 + .6 * Math.abs(Math.sin(t * 3 + i))); });
    lit.forEach((l, i) => { l.setAttribute("opacity", String(dayness < .4 ? ((i + Math.floor(d * 3)) % 4 ? 1 : .2) : .1)); });
    rain.forEach((r, i) => { const u = ((t * 2.4 + i * .137) % 1); r.style.transform = `translate(${(i * 53) % WW + u * 40}px,${u * (WH + 40) - 40}px) rotate(12deg)`; r.style.opacity = stormy * .9; });
    snow.forEach((s, i) => { const u = ((t * .55 + i * .173) % 1); s.style.transform = `translate(${(i * 37) % WW + Math.sin(t * 2 + i) * 14}px,${u * (WH + 20) - 20}px)`; s.style.opacity = snowy; });
    snowSill.style.transform = `scaleY(${Math.max(.001, clamp((t - SNOW0) / (SNOW1 - SNOW0), 0, 1))})`;
    // the room follows the day: warm lamp at night, cooler when the sky is dark and time is racing
    nightTint.style.opacity = speed(t) > 0 ? (1 - dayness) * .35 : 0;
    lampGlow.style.opacity = .7 + .3 * (1 - dayness);
    dusts.forEach((ds, i) => { ds.style.opacity = clamp((t - 7.5 - (i % 5) * .1) / 2.5, 0, 1) * .85; });
  });
  function lerpC(a, b, u) { return a.map((v, i) => Math.round(v + (b[i] - v) * clamp(u, 0, 1))).join(","); }
  E.S(RAIN0, "whoosh", .3); E.clip(RAIN0, "sfx/rain-heavy.wav", { vol: .5, to: 1.0, duck: false }); E.clip(SNOW0, "sfx/wind-gust.wav", { vol: .5, duck: false });

  // ---------- wall clock (top left) ----------
  const clock = E.el(S.el, "abs", "left:110px;top:372px;width:170px;height:170px;border-radius:50%;background:radial-gradient(circle,#fbf6ea 0 62%,#e7dcc4 63% 66%,#2a1a10 67%);box-shadow:0 12px 30px rgba(0,0,0,.5)");
  clock.innerHTML = `<svg viewBox="0 0 170 170" width="170" height="170">${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<line x1="${85 + Math.sin(a) * 50}" y1="${85 - Math.cos(a) * 50}" x2="${85 + Math.sin(a) * (i % 3 ? 45 : 40)}" y2="${85 - Math.cos(a) * (i % 3 ? 45 : 40)}" stroke="#2a1a10" stroke-width="${i % 3 ? 3 : 5}" stroke-linecap="round"/>`; }).join("")}` +
    `<g class="mh" style="transform-box:view-box;transform-origin:0 0"><line x1="85" y1="85" x2="85" y2="42" stroke="#2a1a10" stroke-width="5" stroke-linecap="round"/></g>` +
    `<g class="mg1" opacity="0" style="transform-box:view-box;transform-origin:0 0"><line x1="85" y1="85" x2="85" y2="42" stroke="#2a1a10" stroke-width="5" stroke-linecap="round"/></g><g class="mg2" opacity="0" style="transform-box:view-box;transform-origin:0 0"><line x1="85" y1="85" x2="85" y2="42" stroke="#2a1a10" stroke-width="5" stroke-linecap="round"/></g>` +
    `<g class="hh" style="transform-box:view-box;transform-origin:0 0"><line x1="85" y1="85" x2="85" y2="56" stroke="#2a1a10" stroke-width="7" stroke-linecap="round"/></g><circle cx="85" cy="85" r="7" fill="${GOLD}"/></svg>`;
  const mh = clock.querySelector(".mh"), hh = clock.querySelector(".hh"), g1 = clock.querySelector(".mg1"), g2 = clock.querySelector(".mg2");
  const rot = (el, deg) => el.setAttribute("transform", `rotate(${deg} 85 85)`);
  E.F(t => {
    const hours = days(t) * 24, sp = speed(t);
    rot(mh, hours * 360); rot(hh, hours * 30);
    // motion-blur ghosts of the minute hand once it is spinning
    rot(g1, hours * 360 - 25 * sp * 6); rot(g2, hours * 360 - 50 * sp * 6);
    g1.setAttribute("opacity", String(Math.min(.45, sp * 1.2))); g2.setAttribute("opacity", String(Math.min(.25, sp * .9)));
  });
  // ticks: once a second, then faster and faster, then a whirr
  for (let t = .5; t < TL0; t += 1) E.S(t, "tick", .5);
  let tt = TL0, gap = .5; while (tt < TL1 - .2) { E.S(tt, "tick", .45); tt += gap; gap = Math.max(.06, gap * .82); }
  E.S(TL0 + 2.5, "riser", .45); E.S(TL1 - .05, "thud", .5);

  // ---------- tear-off calendar ----------
  const cal = E.el(S.el, "abs", "left:520px;top:462px;width:104px;height:124px");
  E.el(cal, "abs", `left:0;top:0;width:104px;height:30px;border-radius:8px 8px 0 0;background:#b23a2c`);
  const MONTHS = ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"];
  const page = E.el(cal, "abs", `left:0;top:30px;width:104px;height:94px;background:#fffdf6;border-radius:0 0 8px 8px;box-shadow:0 8px 16px rgba(0,0,0,.35);text-align:center;color:${INK}`);
  const pm = E.el(page, "", "font-size:22px;font-weight:800;letter-spacing:.1em;margin-top:8px", "SEP");
  const pd = E.el(page, "", "font-size:46px;font-weight:800;line-height:1", "25");
  const flyers = []; for (let i = 0; i < 4; i++) flyers.push(E.el(S.el, "abs", `left:520px;top:492px;width:104px;height:94px;background:#fffdf6;border-radius:0 0 8px 8px;opacity:0`));
  E.F(t => {
    const d = days(t), n = Math.floor(d);
    const day = ((24 + n * (1 + Math.floor(speed(t) * 20))) % 28) + 1;
    const s1 = String(day), s0 = MONTHS[Math.floor(n * (1 + speed(t) * 6)) % 12];
    if (pd.textContent !== s1) pd.textContent = s1; if (pm.textContent !== s0) pm.textContent = s0;
    flyers.forEach((p, i) => {                                         // torn pages flutter away while time runs
      const u = t < TL0 ? -1 : ((t * (1.2 + speed(t) * 4) + i / 4) % 1);
      p.style.opacity = u < 0 ? 0 : (1 - u) * .6;
      p.style.transform = `translate(${u * (60 + i * 30)}px,${u * u * 520}px) rotate(${u * (200 + i * 60)}deg)`;
    });
  });

  // ================= Sal =================
  const SAL = [["s_wait", 754, 1104, 900, 330, 0], ["s_tired", 860, 963, 790, 350, 0], ["s_old", 837, 1118, 960, 330, 30]];
  const sal = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:2");
  const salEls = SAL.map(([n, w, h, H, cx, dy]) => { const W = w * H / h; return [n, E.img(sal, n, `position:absolute;left:${cx - W / 2}px;top:${1490 + dy - H}px;width:${W}px;height:${H}px;opacity:0`)]; });
  const XF = [[0, "s_wait"], [TIRED, "s_tired"], [OLD, "s_old"]];
  E.F(t => {
    // crossfade 0.25 s between the three ages
    salEls.forEach(([n, el], i) => {
      const t0 = XF[i][0], t1 = XF[i + 1] ? XF[i + 1][0] : 1e9;
      const fin = i === 0 ? 1 : clamp((t - t0) / .25, 0, 1), fout = clamp((t - t1) / .25, 0, 1);
      el.style.opacity = t < t0 ? 0 : fin * (1 - fout);
    });
    const old = t >= OLD; salEls[2][1].style.transform = old && t > ANSWER ? `translateX(${Math.sin(t * 38) * 1.5}px)` : "none";   // a tremble while he speaks
  });
  // a puff of dust at each ageing
  [TIRED, OLD].forEach(k => {
    for (let i = 0; i < 12; i++) {
      const p = E.el(S.el, "abs", `left:${330 + Math.cos(i) * 60}px;top:${700 + Math.sin(i * 1.7) * 90}px;width:${30 + (i % 3) * 16}px;height:${30 + (i % 3) * 16}px;border-radius:50%;background:rgba(215,205,190,.7);z-index:3;opacity:0`);
      E.K(p, "o", [[k - .05, 0], [k, .9], [k + .6, 0, "out"]]);
      E.K(p, "s", [[k - .05, .4], [k + .6, 1.8, "out"]]);
      E.K(p, "x", [[k, 0], [k + .6, Math.cos(i * 2.1) * 120, "out"]]); E.K(p, "y", [[k, 0], [k + .6, Math.sin(i * 1.3) * 90 - 40, "out"]]);
    }
    E.S(k, "poof", .6);
  });

  // ---------- cobweb and a spider (grow while he waits) ----------
  const web = E.el(S.el, "abs", "left:50px;top:560px;width:260px;height:260px;z-index:1");
  const spokes = Array.from({ length: 7 }, (_, i) => { const a = i / 6 * Math.PI / 2; return `<path class="wb" d="M0 0 L${Math.cos(a) * 250} ${Math.sin(a) * 250}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`; }).join("");
  const rings = [60, 105, 150, 195, 240].map(r => { const pts = Array.from({ length: 7 }, (_, i) => { const a = i / 6 * Math.PI / 2; return `${Math.cos(a) * r} ${Math.sin(a) * r}`; }); return `<path class="wb" d="M${pts.join(" Q" + " ").replace(/Q /g, "L")}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`; }).join("");
  web.innerHTML = `<svg viewBox="0 0 260 260" width="260" height="260" style="overflow:visible"><g fill="none" stroke="rgba(235,235,240,.75)" stroke-width="2">${spokes}${rings}</g></svg>`;
  const wbs = [...web.querySelectorAll(".wb")];
  wbs.forEach((p, i) => E.K(p, "draw", [[7.0 + i * .2, 0], [7.4 + i * .2, 1, "out"]]));
  const spider = E.el(S.el, "abs", "left:220px;top:560px;width:30px;height:420px;z-index:3;opacity:0");
  spider.innerHTML = `<svg viewBox="0 0 30 420" width="30" height="420" style="overflow:visible"><line class="th" x1="15" y1="0" x2="15" y2="400" stroke="rgba(235,235,240,.7)" stroke-width="1.5"/>` +
    `<g class="bd"><ellipse cx="15" cy="404" rx="8" ry="10" fill="#111"/><circle cx="15" cy="392" r="5" fill="#111"/>${[-1, 1].map(s => [0, 1, 2, 3].map(k => `<path d="M15 ${398 + k * 4} q${s * 10} ${-6 + k * 3} ${s * 16} ${k * 5 - 2}" stroke="#111" stroke-width="2" fill="none"/>`).join("")).join("")}</g></svg>`;
  E.K(spider, "o", [[9.4, 0], [9.5, 1]]);
  E.F(t => { const u = clamp((t - 9.4) / 1.2, 0, 1); spider.style.transform = `translateY(${-360 + u * 360}px)`; });

  // ================= the bar =================
  const top = E.el(S.el, "abs", `left:0;top:${TOP}px;width:1080px;height:46px;z-index:4;background:linear-gradient(180deg,#6b3b1f 0%,#4a2612 60%,#2e170b 100%);box-shadow:0 10px 24px rgba(0,0,0,.6)`);
  E.el(top, "abs", "left:0;top:0;width:1080px;height:46px;opacity:.35;background:repeating-linear-gradient(90deg,transparent 0 38px,rgba(0,0,0,.35) 38px 40px,transparent 40px 91px,rgba(255,220,170,.18) 91px 92px)");
  E.el(S.el, "abs", `left:0;top:${TOP - 3}px;width:1080px;height:5px;z-index:4;background:linear-gradient(90deg,#8a6526,#f2d27a 30%,#b8893a 55%,#f7e2a0 80%,#8a6526)`);
  E.el(S.el, "abs", `left:0;top:${TOP + 46}px;width:1080px;height:${1920 - TOP - 46}px;z-index:4;background:repeating-linear-gradient(90deg,#2a150a 0 86px,#1c0e06 86px 90px),linear-gradient(180deg,#3a1d0c,#1a0c05)`);
  E.el(S.el, "abs", `left:0;top:${TOP + 46}px;width:1080px;height:90px;z-index:4;background:linear-gradient(180deg,rgba(255,170,70,.45),transparent)`);

  // ---------- candle on the bar (burns down) ----------
  const CX = 110, CH0 = 150;
  const candle = E.el(S.el, "abs", `left:${CX - 26}px;top:${TOP - CH0}px;width:52px;height:${CH0}px;z-index:5`);
  const wax = E.el(candle, "abs", `left:0;bottom:0;width:52px;height:${CH0}px;border-radius:8px 8px 4px 4px;background:linear-gradient(90deg,#e9dcc0,#fff8e6 35%,#d8c7a3)`);
  const drips = [8, 30, 42].map((x, i) => E.el(wax, "abs", `left:${x}px;top:-2px;width:10px;height:${18 + i * 10}px;border-radius:0 0 6px 6px;background:#fff4dc`));
  const wick = E.el(candle, "abs", `left:24px;top:${-12}px;width:4px;height:14px;background:#2a1a10;border-radius:2px`);
  const flameBox = E.el(candle, "abs", "left:0;top:0;width:52px;height:0");
  const flame = E.el(flameBox, "abs", `left:12px;top:-58px;width:28px;height:48px;border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;background:radial-gradient(ellipse at 50% 70%,#fff 0 18%,#ffd35c 35%,#ff8a2a 62%,rgba(255,120,40,0) 72%);transform-origin:50% 100%`);
  const halo = E.el(S.el, "abs", `left:${CX - 120}px;top:${TOP - CH0 - 150}px;width:240px;height:240px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,200,110,.45),transparent);z-index:5`);
  const saucer = E.el(S.el, "abs", `left:${CX - 46}px;top:${TOP - 8}px;width:92px;height:16px;border-radius:50%;background:linear-gradient(180deg,#d9c38a,#8a6a2a);z-index:5`);
  E.F(t => {
    const u = clamp((t - TL0) / (TL1 - TL0 - .4), 0, 1), h = CH0 - (CH0 - 16) * Math.pow(u, 1.1);
    wax.style.height = `${h}px`; wick.style.transform = flameBox.style.transform = halo.style.transform = `translateY(${CH0 - h}px)`;
    drips.forEach((d, i) => { d.style.height = `${Math.min(h - 4, 18 + i * 10 + u * 40)}px`; });
    const fl = 1 + Math.sin(t * 23) * .06 + Math.sin(t * 37) * .04;
    flame.style.transform = `scale(${fl},${2 - fl}) rotate(${Math.sin(t * 9) * 4}deg)`;
    halo.style.opacity = .8 + Math.sin(t * 17) * .1;
  });

  // ---------- her glass of water: the ice melts ----------
  const GX = 196;
  const glass = E.el(S.el, "abs", `left:${GX}px;top:${TOP - 140}px;width:82px;height:140px;z-index:5`);
  glass.innerHTML = `<svg viewBox="0 0 100 170" width="82" height="140"><defs><linearGradient id="gw" x1="0" x2="1"><stop offset="0" stop-color="#bfe2ff" stop-opacity=".35"/><stop offset=".3" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#9ccff5" stop-opacity=".3"/></linearGradient></defs>` +
    `<rect class="water" x="10" y="70" width="80" height="94" rx="6" fill="url(#gw)"/>` +
    `<g class="ice">${[[18, 62, 34], [50, 74, 30], [30, 98, 28]].map(([x, y, s], i) => `<rect class="c${i}" x="${x}" y="${y}" width="${s}" height="${s}" rx="6" fill="rgba(235,248,255,.8)" stroke="rgba(255,255,255,.9)" stroke-width="2"/>`).join("")}</g>` +
    `<path d="M6 2 L12 164 Q14 168 20 168 H80 Q86 168 88 164 L94 2" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="4"/>` +
    `<path d="M18 12 L22 150" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"/>` +
    `<g class="drops">${[[26, 60], [70, 40], [60, 110], [36, 130]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff" opacity=".7"/>`).join("")}</g></svg>`;
  const cubes = [0, 1, 2].map(i => glass.querySelector(".c" + i)), water = glass.querySelector(".water"), drops = glass.querySelector(".drops");
  const base = [[18, 62, 34], [50, 74, 30], [30, 98, 28]];
  E.F(t => {
    const u = clamp((t - TL0 - .4) / 3.5, 0, 1);
    cubes.forEach((c, i) => { const [x, y, s] = base[i], k = Math.max(0, 1 - u * (1 + i * .2)); c.setAttribute("width", s * k); c.setAttribute("height", s * k); c.setAttribute("x", x + s * (1 - k) / 2); c.setAttribute("y", y + s * (1 - k)); c.setAttribute("opacity", k > .05 ? 1 : 0); });
    water.setAttribute("y", String(70 - u * 14)); water.setAttribute("height", String(94 + u * 14));
    drops.setAttribute("transform", `translate(0 ${((t * 30) % 40) * u})`);
  });

  // ================= the customer =================
  const CUST = [["c_read", 817, 1139, 1140, 810], ["c_ask", 718, 1113, 1130, 840]];
  const cust = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6");
  const cEls = CUST.map(([n, w, h, H, cx]) => { const W = w * H / h; return [n, E.img(cust, n, `position:absolute;left:${cx - W / 2}px;top:${1960 - H}px;width:${W}px;height:${H}px`)]; });
  E.F(t => { const f = at([[0, "c_read"], [ASK - .1, "c_ask"]], t); cEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    cust.style.transform = t >= TL0 && t < TL1 ? `translateY(${Math.sin(t * 40) * speed(t) * 3}px)` : t >= ASK - .1 && t < ASK + .2 ? `translateY(${-Math.sin((t - ASK + .1) / .3 * Math.PI) * 18}px)` : "none"; });
  E.S(ASK - .1, "slam", .45);

  // ================= the menu (what she is reading) =================
  // from curated_recipes (name, first ingredients) — see assets/menu-sk3.json
  const ITEMS = [["Vodka Lemonade Punch", "vodka · cranberry juice · lemonade"], ["Cucumber Lemonade", "hendrick’s gin · fresh lemon juice · simple syrup"], ["Nutty Irishman", "baileys original irish cream · hazelnut liqueur"], ["Hot Gin Toddy", "old tom gin · rich simple syrup · chilled water"], ["Golden Slipper", "yellow chartreuse · luxardo apricot albicocca liqueur · egg yolk"], ["Lillet Buck", "lillet blanc · ginger ale · lemon juice"], ["Cranberry Punch", "cranberry juice · vodka · fresh orange juice"], ["Christmas Tonic", "mezcal mitre origen · rosemary · raspberries"], ["Tequila Mockingbird", "reposado tequila · crème de menthe · fresh lime juice"], ["Port & Tonic", "dry white port · tonic water"], ["Foxy Lady", "london dry gin · strawberry liqueur · fresh lemon juice"], ["Zizi Coin-coin", "triple sec · fresh lemon juice"], ["Guarapita", "venezuelan rum · passion fruit juice · fresh orange juice"], ["Hot Creamy Bush", "irish whiskey · irish cream liqueur · hot coffee"], ["Pomegranate Gin Fizz", "gin · fresh lemon juice · sugar syrup"], ["Radler", "german lager · sparkling lemonade"], ["Zanzibar Ricard", "ricard · coconut liqueur · pineapple juice"], ["Casino", "old tom gin · maraschino liqueur · fresh lemon juice"], ["Earl Grey Gin Tea", "earl grey tea · gin · honey"], ["Sour Apple Martini", "dekuyper pucker sour apple schnapps · vodka · sour mix"], ["Two-One-Two (212)", "grapefruit juice · aperol · reposado tequila"], ["Munich Mule", "gin · lime juice · ginger beer"], ["Frosé", "rosé wine · aperol · lemon juice"], ["Rosemarycano", "untreated lemon · fresh rosemary sprigs · campari"], ["Nice Holiday", "vanilla vodka · white chocolate liqueur · crème de menthe"], ["Pink Lady", "london dry gin · applejack · lemon juice"], ["French Martini", "vodka · black raspberry liqueur · pineapple juice"], ["Sweet Dreams", "bluecoat gin · fresh lemon juice · rose syrup"], ["Royal Gin Fizz", "egg white · gin · fresh lemon juice"], ["Vodka Soda", "vodka · soda water"], ["Ruby Tuesday", "rye whiskey · bénédictine · fresh lemon juice"]];
  const mcard = E.el(S.el, "abs", `left:585px;top:1140px;width:450px;height:400px;z-index:7;border-radius:26px;padding:16px;background:linear-gradient(135deg,#1f4b3a,#143427);box-shadow:0 24px 50px rgba(0,0,0,.55),inset 0 0 0 3px rgba(245,196,81,.55);transform-origin:80% 0`);
  const paper = E.el(mcard, "abs", `left:16px;top:16px;width:418px;height:368px;border-radius:14px;background:${CREAM};overflow:hidden`);
  E.el(paper, "abs", `left:0;top:0;width:418px;height:64px;z-index:2;background:linear-gradient(180deg,${CREAM} 70%,rgba(246,239,223,0));text-align:center;font-weight:800;font-size:28px;letter-spacing:.3em;color:#1f4b3a;padding-top:16px`, "COCKTAILS");
  E.el(paper, "abs", `left:0;bottom:0;width:418px;height:60px;z-index:2;background:linear-gradient(0deg,${CREAM} 20%,rgba(246,239,223,0))`);
  const list = E.el(paper, "abs", "left:0;top:0;width:418px;padding:0 30px");
  const ROW = 76;
  for (let r = 0; r < 3; r++) ITEMS.forEach(([n, ing]) => {
    const row = E.el(list, "", `height:${ROW}px;padding-top:10px;border-bottom:1px dashed rgba(31,75,58,.25)`);
    E.el(row, "", `font-weight:800;font-size:28px;color:${INK};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.01em`, n);
    E.el(row, "", `font-family:Inter;font-weight:400;font-size:18px;color:#6d6552;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px`, ing);
  });
  // a scroll bar that shrinks as the list proves endless
  const track = E.el(paper, "abs", "right:8px;top:70px;width:8px;height:240px;border-radius:4px;background:rgba(31,75,58,.12);z-index:3");
  const thumb = E.el(track, "abs", "left:0;top:0;width:8px;border-radius:4px;background:#1f4b3a");
  const scrollY = t => { if (t < .8) return 0; if (t < TL0) return (t - .8) * 45; return (TL0 - .8) * 45 + Math.pow(t - TL0, 2.4) * 120; };
  const LOOP = ITEMS.length * ROW;
  E.F(t => {
    const y = 64 + scrollY(t) % LOOP; list.style.transform = `translateY(${64 - y}px)`;
    list.style.filter = speed(t) > .35 ? `blur(${(speed(t) - .35) * 6}px)` : "none";
    const frac = clamp(1 - t / 9, .04, 1); thumb.style.height = `${240 * Math.max(.04, .35 * frac)}px`;
    thumb.style.top = `${(240 - 240 * Math.max(.04, .35 * frac)) * ((scrollY(t) % LOOP) / LOOP)}px`;
  });
  E.show(mcard, .6, { dy: 60, dur: .5 }); E.S(.62, "swish", .5);
  E.K(mcard, "x", [[TL1, 0], [TL1 + .4, 620, "in"]]); E.S(TL1, "whoosh", .5);
  for (let t = 1.2; t < TL1 - .1; t += t < TL0 ? 1.1 : Math.max(.18, 1.1 - (t - TL0) * .3)) E.S(t, "swish", .22);

  // ================= waiting timer =================
  const pill = E.el(S.el, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:50px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;transform-origin:0 50%;opacity:0`, "WAITING: 0:05");
  const STEPS = [[2.6, "0:48"], [3.6, "3 MIN"], [TL0, "14 MIN"], [5.6, "2 HOURS"], [TIRED, "3 DAYS"], [7.6, "2 MONTHS"], [8.5, "6 YEARS"], [OLD + .1, "41 YEARS"]];
  E.K(pill, "o", [[2.5, 0], [2.65, 1], [ASK - .2, 1], [ASK, 0]]);
  E.F(t => { const s = "WAITING: " + at([[0, "0:05"], ...STEPS], t); if (pill.textContent !== s) pill.textContent = s; pill.style.background = t >= TIRED ? "#ff6b57" : INK; pill.style.color = t >= TIRED ? INK : "#fff"; });
  STEPS.slice(2).forEach(([k]) => E.K(pill, "s", [[k - .01, 1], [k, 1.16], [k + .2, 1, "back"]]));

  // ================= bubbles =================
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 62, bg = "#fff", fg = INK, italic = false, weight = 800 } = o;
    const b = E.el(S.el, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:20px 28px 24px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:${weight};font-size:${size}px;line-height:1.04;letter-spacing:-.02em;color:${fg};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .55);
    return b;
  };
  bubble("What do you<br>recommend?", { left: 420, top: 560, w: 560, tail: 420, t0: ASK, t1: ANSWER - .05, size: 64, bg: GOLD });
  const ans = bubble("…the Old<br>Fashioned.", { left: 150, top: 380, w: 470, tail: 200, t0: ANSWER, t1: DUR, size: 66, italic: true });
  E.F(t => { if (t > ANSWER) ans.firstChild.style.transform = `translate(${Math.sin(t * 41) * 1.6}px,${Math.cos(t * 37) * 1.2}px)`; });
  E.S(ANSWER + .5, "creak", .35);

  // ================= title (frame 0) =================
  const titleBox = E.el(S.el, "abs", "left:100px;top:252px;width:820px;z-index:8");
  const title = E.text(titleBox, "Almost *ready* to order.", { size: 72, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 24px rgba(0,0,0,.8)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, 2.3, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[15.55, 1], [15.8, 1.18, "out"], [16.1, 1, "io"]]);
}
