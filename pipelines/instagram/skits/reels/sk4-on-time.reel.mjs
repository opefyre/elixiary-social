// SK.4 "They're always an hour late." — the invite said 7, everyone always comes at 8, so at 6:59 the host is in a bathrobe,
// face mask and towel, sipping tea, laundry on the sofa, oven preheating for later. 19:00:00 exactly: the doorbell. Again.
// Again. A speed-clean: laundry into the oven, pizza box under the sofa, dishes into the cupboard, air freshener, candles.
// She opens the door with a fake grin: all six friends, on time for the first time ever. "We wanted to be on time for once!"
// Smoke drifts in, the alarm starts: "…is something burning?"  LAUNDRY: 200°C.
// Real doorbell and crowd; generated laundry whoosh; no voices.
export const meta = {
  id: "sk4-on-time",
  images: {
    h_relax: "cutouts/host_relax.webp", h_freeze: "cutouts/host_freeze.webp", h_run: "cutouts/host_run.webp", h_run2: "cutouts/host_run2.webp", h_grin: "cutouts/host_grin.webp",
    friends: "cutouts/friends6.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  E.music({ bpm: 100, root: 60, seed: 41, prog: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], until: 3.9 });
  const DUR = 17.8, WIPE = 10.5;
  const S1 = E.scene("flat", 0, WIPE, "light");
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const SEVEN = 3.9, R2 = 4.9, R3 = 5.5, RUN = 6.1, LAUNDRY = 6.7, PIZZA = 7.4, DISHES = 8.1, SPRAY = 8.8, R4 = 9.2, CANDLES = 9.5, TODOOR = 9.9;
  const FLOOR = 1450;

  // ================= scene 1: the flat =================
  E.cur = S1;
  const L = S1.el;
  E.el(L, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#e9d3b4 0%,#e3c7a2 60%,#d8b88f 100%)");
  // wallpaper stripes, faint
  E.el(L, "abs", `left:0;top:0;width:1080px;height:${FLOOR}px;opacity:.18;background:repeating-linear-gradient(90deg,#b98f63 0 3px,transparent 3px 54px)`);
  // herringbone parquet
  E.el(L, "abs", `left:0;top:${FLOOR}px;width:1080px;height:${1920 - FLOOR}px;background-color:#a56a3c;` +
    "background-image:linear-gradient(45deg,rgba(0,0,0,.18) 25%,transparent 25%,transparent 75%,rgba(0,0,0,.18) 75%),linear-gradient(-45deg,rgba(255,255,255,.08) 25%,transparent 25%,transparent 75%,rgba(255,255,255,.08) 75%);background-size:70px 70px");
  E.el(L, "abs", `left:0;top:${FLOOR - 18}px;width:1080px;height:22px;background:#f4ead8;box-shadow:0 4px 8px rgba(0,0,0,.15)`);   // skirting
  E.el(L, "abs", `left:140px;top:${FLOOR + 40}px;width:620px;height:150px;border-radius:50%;background:radial-gradient(ellipse,#c9563f 0 55%,#a8412f 56% 62%,#e8c38b 63% 66%,#c9563f 67%)`);   // rug

  // window with a golden-hour city
  const win = E.el(L, "abs", "left:60px;top:430px;width:330px;height:360px;border-radius:8px;overflow:hidden;box-shadow:0 0 0 14px #fbf5ea,0 0 0 18px #cdb795,0 14px 30px rgba(0,0,0,.2)");
  win.innerHTML = `<svg viewBox="0 0 330 360" width="330" height="360"><defs><linearGradient id="gh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9e6b"/><stop offset=".55" stop-color="#ffc98a"/><stop offset="1" stop-color="#ffe2b0"/></linearGradient></defs>` +
    `<rect width="330" height="360" fill="url(#gh)"/><circle cx="240" cy="250" r="46" fill="#fff1c9" opacity=".9"/>` +
    `<path d="M0 270 H40 V220 H70 V250 H100 V190 H140 V260 H170 V230 H210 V280 H250 V240 H290 V270 H330 V360 H0 Z" fill="#7a4b52" opacity=".85"/>` +
    `<path d="M0 300 H60 V270 H110 V300 H160 V280 H220 V310 H280 V290 H330 V360 H0 Z" fill="#5a3640"/></svg>`;
  E.el(win, "abs", "left:159px;top:0;width:12px;height:360px;background:#fbf5ea");
  E.el(win, "abs", "left:0;top:174px;width:330px;height:12px;background:#fbf5ea");
  E.el(L, "abs", "left:30px;top:410px;width:60px;height:420px;border-radius:10px;background:linear-gradient(90deg,#6f8f6a,#88a882)");   // curtain

  // wall clock and a digital pill for the exact time
  const clock = E.el(L, "abs", "left:440px;top:420px;width:190px;height:190px;border-radius:50%;background:radial-gradient(circle,#fffdf6 0 64%,#2b2b2b 65% 70%,#8a8a8a 71%);box-shadow:0 12px 26px rgba(0,0,0,.25)");
  clock.innerHTML = `<svg viewBox="0 0 190 190" width="190" height="190">${Array.from({ length: 60 }, (_, i) => { const a = i / 60 * Math.PI * 2, r0 = i % 5 ? 56 : 50; return `<line x1="${95 + Math.sin(a) * r0}" y1="${95 - Math.cos(a) * r0}" x2="${95 + Math.sin(a) * 60}" y2="${95 - Math.cos(a) * 60}" stroke="#2b2b2b" stroke-width="${i % 5 ? 1.5 : 4}"/>`; }).join("")}` +
    `<g class="hh" style="transform-box:view-box;transform-origin:0 0"><line x1="95" y1="95" x2="95" y2="62" stroke="#2b2b2b" stroke-width="7" stroke-linecap="round"/></g>` +
    `<g class="mh" style="transform-box:view-box;transform-origin:0 0"><line x1="95" y1="95" x2="95" y2="44" stroke="#2b2b2b" stroke-width="5" stroke-linecap="round"/></g>` +
    `<g class="sh" style="transform-box:view-box;transform-origin:0 0"><line x1="95" y1="108" x2="95" y2="40" stroke="${CORAL}" stroke-width="2.5"/></g><circle cx="95" cy="95" r="6" fill="${CORAL}"/></svg>`;
  const [hh, mh, sh] = ["hh", "mh", "sh"].map(c => clock.querySelector("." + c));
  // clock time in seconds after 18:00: 18:59:48 at t=0, 19:00:00 at SEVEN, then real time
  const secs = t => t < SEVEN ? 3588 + t / SEVEN * 12 : 3600 + (t - SEVEN);
  E.F(t => {
    const s = secs(t), sx = Math.floor(s);
    sh.setAttribute("transform", `rotate(${(sx % 60) * 6} 95 95)`); mh.setAttribute("transform", `rotate(${(s / 60) * 6} 95 95)`); hh.setAttribute("transform", `rotate(${(18 + s / 3600) * 30} 95 95)`);
  });
  for (let k = 0; k < 12; k++) E.S(k / 12 * SEVEN + .05, "tick", .35);

  // sofa with the laundry mountain
  const sofa = E.el(L, "abs", `left:40px;top:${FLOOR - 330}px;width:560px;height:330px`);
  sofa.innerHTML = `<svg viewBox="0 0 560 330" width="560" height="330"><defs><linearGradient id="sf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f6d8c"/><stop offset="1" stop-color="#2d5470"/></linearGradient></defs>` +
    `<rect x="20" y="40" width="520" height="170" rx="40" fill="url(#sf)"/><rect x="0" y="120" width="90" height="180" rx="36" fill="#335f7e"/><rect x="470" y="120" width="90" height="180" rx="36" fill="#335f7e"/>` +
    `<rect x="70" y="180" width="420" height="110" rx="26" fill="#4b7c9c"/><line x1="280" y1="185" x2="280" y2="285" stroke="#2d5470" stroke-width="4"/>` +
    `<rect x="40" y="290" width="16" height="40" fill="#5a3a24"/><rect x="504" y="290" width="16" height="40" fill="#5a3a24"/>` +
    `<ellipse cx="140" cy="150" rx="70" ry="50" fill="#f2c14e"/><ellipse cx="420" cy="150" rx="66" ry="48" fill="#e0775b"/></svg>`;
  const pile = E.el(L, "abs", `left:150px;top:${FLOOR - 330}px;width:300px;height:190px;transform-origin:50% 100%`);
  const LC = ["#e25b5b", "#f2c14e", "#6fb3d9", "#8bc48a", "#b28ad9", "#f59ac0", "#ffffff", "#3d4b6b"];
  pile.innerHTML = `<svg viewBox="0 0 300 190" width="300" height="190">${[[60, 160, 80, 36], [150, 164, 90, 34], [240, 160, 70, 34], [100, 128, 84, 34], [190, 126, 88, 36], [140, 94, 90, 34], [210, 90, 60, 28], [90, 96, 56, 26], [150, 62, 70, 28], [170, 34, 46, 24]]
    .map(([x, y, rx, ry], i) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${LC[i % LC.length]}" stroke="rgba(0,0,0,.12)" stroke-width="3" transform="rotate(${(i * 23) % 30 - 15} ${x} ${y})"/>`).join("")}` +
    `<path d="M40 150 q-30 20 -24 40" stroke="#6fb3d9" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M250 140 q40 10 44 44" stroke="#e25b5b" stroke-width="14" fill="none" stroke-linecap="round"/></svg>`;

  // coffee table: pizza box and mugs; candles appear later
  const table = E.el(L, "abs", `left:190px;top:${FLOOR + 10}px;width:360px;height:120px`);
  table.innerHTML = `<svg viewBox="0 0 360 120" width="360" height="120"><rect x="0" y="0" width="360" height="26" rx="8" fill="#b07a4a"/><rect x="0" y="22" width="360" height="8" fill="#8a5a33"/><rect x="24" y="30" width="16" height="90" fill="#8a5a33"/><rect x="320" y="30" width="16" height="90" fill="#8a5a33"/></svg>`;
  const pizza = E.el(L, "abs", `left:230px;top:${FLOOR - 20}px;width:170px;height:34px;border-radius:4px;background:linear-gradient(180deg,#e6c79a,#cfa671);box-shadow:inset 0 -6px 0 rgba(0,0,0,.08)`);
  E.el(pizza, "abs", "left:40px;top:8px;width:90px;height:14px;border-radius:7px;border:3px solid #c0392b");
  const mug = E.el(L, "abs", `left:440px;top:${FLOOR - 36}px;width:40px;height:46px;border-radius:4px 4px 10px 10px;background:#f7f2e8;box-shadow:inset -6px 0 0 rgba(0,0,0,.06)`);
  const candles = [260, 330, 400].map((x, i) => {
    const c = E.el(L, "abs", `left:${x}px;top:${FLOOR - 70}px;width:26px;height:80px;opacity:0`);
    E.el(c, "abs", `left:0;top:22px;width:26px;height:58px;border-radius:6px 6px 3px 3px;background:linear-gradient(90deg,#efe4cc,#fffaf0 40%,#dccfb2)`);
    const f = E.el(c, "abs", "left:6px;top:-6px;width:14px;height:26px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(ellipse at 50% 70%,#fff 0 20%,#ffd35c 40%,#ff8a2a 65%,transparent 72%)");
    E.F(t => { f.style.transform = `scale(${1 + Math.sin(t * 21 + i) * .08},${1 + Math.cos(t * 17 + i) * .1})`; });
    return c;
  });

  // kitchenette: dish stack on the counter, cupboard, oven (preheating: its light is on)
  const kit = E.el(L, "abs", `left:590px;top:${FLOOR - 400}px;width:220px;height:400px`);
  kit.innerHTML = `<svg viewBox="0 0 220 400" width="220" height="400"><rect x="0" y="120" width="220" height="16" fill="#e9e2d2"/><rect x="0" y="136" width="220" height="264" fill="#dfe3e6"/>` +
    `<rect x="16" y="160" width="188" height="200" rx="12" fill="#2b2f33"/><rect class="ovwin" x="34" y="200" width="152" height="120" rx="8" fill="#ff9a3c" opacity=".85"/>` +
    `<rect x="16" y="140" width="188" height="16" rx="4" fill="#c7ccd1"/>${[40, 80, 120, 160].map(x => `<circle cx="${x + 10}" cy="148" r="6" fill="#40464c"/>`).join("")}<rect x="60" y="176" width="100" height="10" rx="5" fill="#9aa1a8"/></svg>`;
  const ovGlow = E.el(L, "abs", `left:620px;top:${FLOOR - 200}px;width:160px;height:130px;border-radius:10px;background:radial-gradient(closest-side,rgba(255,150,60,.55),transparent)`);
  const ovDoor = E.el(L, "abs", `left:606px;top:${FLOOR - 240}px;width:188px;height:200px;border-radius:12px;background:#2b2f33;transform-origin:50% 100%;opacity:0`);   // the door swinging open
  const dishes = E.el(L, "abs", `left:610px;top:${FLOOR - 470}px;width:180px;height:200px;transform-origin:50% 100%`);
  dishes.innerHTML = `<svg viewBox="0 0 180 200" width="180" height="200">${Array.from({ length: 11 }, (_, i) => `<ellipse cx="${90 + ((i * 37) % 21 - 10)}" cy="${190 - i * 14}" rx="${70 - (i % 3) * 8}" ry="12" fill="${i % 2 ? "#f7f7f2" : "#e6ecef"}" stroke="#b9c2c8" stroke-width="2"/>`).join("")}` +
    `<rect x="120" y="20" width="10" height="70" rx="4" fill="#9aa1a8" transform="rotate(20 125 55)"/><circle cx="56" cy="36" r="12" fill="#c0392b" opacity=".7"/></svg>`;
  const cupboard = E.el(L, "abs", `left:590px;top:${FLOOR - 720}px;width:220px;height:200px;border-radius:10px;background:#8fa98a;box-shadow:inset 0 0 0 8px #7f9a7a;transform-origin:0 50%`);
  E.el(cupboard, "abs", "left:180px;top:90px;width:12px;height:30px;border-radius:5px;background:#c8b27a");

  // front door (right) with peephole and a sticky note
  const door = E.el(L, "abs", `left:830px;top:${FLOOR - 800}px;width:250px;height:800px;background:#7a2f2a;border-radius:8px 0 0 0;box-shadow:inset 0 0 0 14px #5e221e`);
  [[40, 60, 170, 300], [40, 420, 170, 330]].forEach(([x, y, w, h]) => E.el(door, "abs", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:6px;box-shadow:inset 0 0 0 6px #6a2723,inset 6px 6px 0 6px rgba(255,255,255,.06)`));
  E.el(door, "abs", "left:118px;top:230px;width:18px;height:18px;border-radius:50%;background:radial-gradient(circle,#222 40%,#d7b36a 45%)");
  E.el(door, "abs", "left:26px;top:400px;width:22px;height:60px;border-radius:10px;background:linear-gradient(90deg,#b8893a,#f2d27a,#b8893a)");
  const note = E.el(door, "abs", `left:110px;top:120px;width:120px;height:110px;background:#ffe977;transform:rotate(4deg);box-shadow:0 6px 10px rgba(0,0,0,.2);font-weight:800;font-size:26px;line-height:1.05;color:${INK};text-align:center;padding-top:18px`, "PARTY<br>7 PM");
  E.el(L, "abs", `left:800px;top:${FLOOR - 820}px;width:40px;height:830px;background:#f4ead8`);                     // door frame
  E.el(L, "abs", `left:860px;top:${FLOOR}px;width:200px;height:40px;border-radius:8px;background:repeating-linear-gradient(90deg,#8b6d3f 0 8px,#a3854f 8px 14px)`);   // doormat
  // plant in the corner
  const plant = E.el(L, "abs", `left:720px;top:${FLOOR - 260}px;width:120px;height:260px`);
  plant.innerHTML = `<svg viewBox="0 0 120 260" width="120" height="260">${[[-40, 30], [-20, 10], [0, 0], [20, 10], [40, 30], [-30, 60], [30, 60]].map(([dx, dy], i) => `<ellipse cx="${60 + dx}" cy="${90 + dy}" rx="18" ry="54" fill="${i % 2 ? "#4f8a4a" : "#62a15b"}" transform="rotate(${dx * .9} ${60 + dx} ${90 + dy})"/>`).join("")}<path d="M28 170 H92 L84 256 H36 Z" fill="#c9774a"/></svg>`;

  // the doorbell: the door shudders, "DING DONG" pops, a ring counter by the door
  const RINGS = [SEVEN, R2, R3, R4];
  const ringBadge = E.el(L, "abs", `left:846px;top:${FLOOR - 880}px;white-space:nowrap;display:inline-block;background:${CORAL};color:${INK};font-weight:800;font-size:44px;padding:.1em .4em .12em;border-radius:.3em;z-index:8;opacity:0;transform-origin:50% 100%`, "RINGS ×1");
  RINGS.forEach((k, i) => {
    E.clip(k, "sfx/doorbell.wav", { vol: 1 });
    E.K(door, "x", [[k, 0], [k + .04, -6], [k + .1, 5], [k + .18, -3], [k + .3, 0]]);
    const dd = E.el(L, "abs", `left:${i < 3 ? 400 + (i % 2) * 40 : 470}px;top:${i < 3 ? FLOOR - 690 + i * 26 : FLOOR - 810}px;white-space:nowrap;font-weight:800;font-size:${i < 3 ? 64 + i * 8 : 70}px;color:${GOLD};-webkit-text-stroke:3px ${INK};letter-spacing:-.02em;z-index:9;opacity:0;transform:rotate(${i % 2 ? 6 : -6}deg)`, "DING DONG!");
    E.K(dd, "o", [[k, 0], [k + .05, 1], [k + .5, 1], [k + .7, 0]]); E.K(dd, "s", [[k, .5], [k + .25, 1, "back"]]);
    E.K(ringBadge, "s", [[k - .01, 1], [k, 1.3], [k + .22, 1, "back"]]);
  });
  E.K(ringBadge, "o", [[SEVEN, 0], [SEVEN + .05, 1]]);
  E.F(t => { const n = RINGS.filter(k => t >= k).length; const s = `RINGS ×${Math.max(1, n)}`; if (ringBadge.textContent !== s) ringBadge.textContent = s; });
  E.shake(SEVEN, 12, .3);

  // ---------- the host ----------
  const HOST = { h_relax: [306, 1005, 780], h_freeze: [328, 978, 760], h_run: [646, 967, 760], h_run2: [668, 950, 760], h_grin: [250, 1001, 780] };
  const host = E.el(L, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:5");
  const hostIn = E.el(host, "abs", "left:0;top:0;width:1080px;height:1920px");      // per-frame bob lives here, not on the keyframed element
  const hEls = Object.entries(HOST).map(([n, [w, h, H]]) => { const W = w * H / h; return [n, E.img(hostIn, n, `position:absolute;left:${-W / 2}px;top:${FLOOR + 30 - H}px;width:${W}px;height:${H}px`)]; });
  const HP = [[0, "h_relax"], [SEVEN, "h_freeze"], [RUN, "h_run"], [LAUNDRY + .05, "h_run2"], [TODOOR, "h_grin"]];
  // where she stands: by the sofa, then darting around the flat, then at the door
  const hx = [[0, 470], [RUN, 470], [LAUNDRY - .1, 650, "io"], [PIZZA - .2, 330, "io"], [DISHES - .1, 700, "io"], [SPRAY - .1, 420, "io"], [CANDLES, 380, "io"], [TODOOR, 380], [TODOOR + .45, 820, "io"]];
  E.K(host, "x", hx);
  E.F(t => {
    const f = at(HP, t); hEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    // she faces where she runs: flip the running pose when heading left
    let dir = 1; for (let i = 1; i < hx.length; i++) if (t >= hx[i - 1][0] && t < hx[i][0]) dir = hx[i][1] >= hx[i - 1][1] ? 1 : -1;
    hEls[2][1].style.transform = hEls[3][1].style.transform = `scaleX(${dir})`;
    const bob = t >= RUN && t < TODOOR ? -Math.abs(Math.sin(t * 14)) * 16 : t < SEVEN ? Math.sin(t * 2) * 3 : 0;
    hostIn.style.transform = `translateY(${bob}px)`;
  });
  // tea spills at 19:00
  for (let i = 0; i < 6; i++) {
    const d = E.el(L, "abs", `left:0;top:0;width:12px;height:16px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#b0703a;z-index:6;opacity:0`);
    E.K(d, "o", [[SEVEN + .05, 0], [SEVEN + .08, 1], [SEVEN + .6, 1], [SEVEN + .65, 0]]);
    E.K(d, "x", [[SEVEN, 400 + i * 6], [SEVEN + .6, 350 + i * 16]]); E.K(d, "y", [[SEVEN, 820], [SEVEN + .2, 780 - i * 8, "out"], [SEVEN + .6, 1470, "in"]]);
  }
  E.S(SEVEN + .1, "splat", .35);

  // ---------- the speed-clean ----------
  // laundry → oven
  E.K(pile, "o", [[LAUNDRY - .5, 1], [LAUNDRY - .45, 0]]);
  E.K(ovDoor, "o", [[LAUNDRY - .3, 0], [LAUNDRY - .28, 1], [LAUNDRY + .1, 1], [LAUNDRY + .12, 0]]);
  E.K(ovDoor, "sy", [[LAUNDRY - .3, 1], [LAUNDRY - .15, -.3, "out"], [LAUNDRY + .1, 1, "in"]]);
  E.clip(LAUNDRY - .45, "sfx/elx-laundry-whoosh.wav", { vol: .9 }); E.S(LAUNDRY + .1, "slam", .8); E.shake(LAUNDRY + .1, 8, .2);
  // pizza box → under the sofa
  E.K(pizza, "x", [[PIZZA, 0], [PIZZA + .35, -200, "in"]]); E.K(pizza, "y", [[PIZZA, 0], [PIZZA + .35, -30, "in"]]); E.K(pizza, "o", [[PIZZA + .3, 1], [PIZZA + .36, 0]]);
  E.K(mug, "o", [[PIZZA + .1, 1], [PIZZA + .12, 0]]);
  E.S(PIZZA, "whoosh", .6); E.S(PIZZA + .35, "thud", .6);
  // dishes → cupboard
  E.K(cupboard, "sx", [[DISHES - .1, 1], [DISHES + .05, .1, "out"], [DISHES + .4, .1], [DISHES + .5, 1, "in"]]);
  E.K(dishes, "y", [[DISHES, 0], [DISHES + .3, -330, "in"]]); E.K(dishes, "s", [[DISHES, 1], [DISHES + .3, .7]]); E.K(dishes, "o", [[DISHES + .28, 1], [DISHES + .32, 0]]);
  E.S(DISHES + .3, "crack", .7); E.S(DISHES + .5, "slam", .6);
  // air freshener
  for (let i = 0; i < 10; i++) {
    const m = E.el(L, "abs", `left:${300 + (i % 5) * 50}px;top:${820 + Math.floor(i / 5) * 70}px;width:${80 + (i % 3) * 30}px;height:${80 + (i % 3) * 30}px;border-radius:50%;background:radial-gradient(circle,rgba(255,190,220,.6),rgba(255,190,220,0) 70%);z-index:6;opacity:0`);
    E.K(m, "o", [[SPRAY + i * .03, 0], [SPRAY + .1 + i * .03, 1], [SPRAY + 1.2, 0]]); E.K(m, "s", [[SPRAY, .3], [SPRAY + 1.2, 1.6, "out"]]);
  }
  E.S(SPRAY, "poof", .7); E.S(SPRAY + .1, "sparkle", .6);
  candles.forEach((c, i) => { E.pop(c, CANDLES + i * .12, { from: .3 }); E.S(CANDLES + i * .12, "ding", .35); });
  // the oven starts to smoke (laundry at 200°C)
  const smoke1 = [];
  for (let i = 0; i < 7; i++) {
    const p = E.el(L, "abs", `left:${640 + (i % 3) * 30}px;top:${FLOOR - 300}px;width:${70 + (i % 3) * 20}px;height:${70 + (i % 3) * 20}px;border-radius:50%;background:radial-gradient(circle,rgba(90,90,90,.55),rgba(90,90,90,0) 70%);z-index:4;opacity:0`);
    smoke1.push([p, i]);
  }
  E.F(t => smoke1.forEach(([p, i]) => { const u = ((t - LAUNDRY - 1 - i * .35) / 2.4); const v = u - Math.floor(u); p.style.opacity = t > LAUNDRY + 1 + i * .35 ? (1 - v) * .8 : 0; p.style.transform = `translate(${Math.sin(v * 5 + i) * 30}px,${-v * 380}px) scale(${.6 + v * 1.4})`; }));

  // ---------- counters: the time ----------
  const pill = E.el(L, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:52px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;font-variant-numeric:tabular-nums;transform-origin:0 50%`, "18:59:48");
  E.K(pill, "o", [[2.75, 0], [2.9, 1]]);
  E.F(t => { const s = Math.floor(secs(t)), txt = `${String(18 + Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor(s / 60) % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; if (pill.textContent !== txt) pill.textContent = txt; pill.style.background = t >= SEVEN ? CORAL : INK; pill.style.color = t >= SEVEN ? INK : "#fff"; });
  E.K(pill, "s", [[SEVEN - .01, 1], [SEVEN, 1.25], [SEVEN + .25, 1, "back"]]);

  // title
  const titleBox = E.el(L, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "They're *always* an hour late.", { size: 56, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, 2.7, .2);

  // ================= scene 2: the doorway =================
  const S2 = E.scene("door", WIPE, DUR, "light"); E.cur = S2;
  const D = S2.el;
  E.wipe(WIPE);
  E.el(D, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#e9d3b4,#dcbf98)");
  // the open doorway onto a warm stairwell landing
  const way = E.el(D, "abs", "left:130px;top:520px;width:860px;height:1060px;background:linear-gradient(180deg,#6b5a4a,#4a3d33);box-shadow:inset 0 30px 60px rgba(0,0,0,.35)");
  E.el(way, "abs", "left:0;top:720px;width:860px;height:340px;background:repeating-linear-gradient(90deg,#8f7a60 0 60px,#7f6b53 60px 120px)");               // landing tiles
  E.el(way, "abs", "left:360px;top:30px;width:140px;height:40px;border-radius:0 0 70px 70px;background:#fff6d8;box-shadow:0 0 80px 30px rgba(255,236,180,.55)");     // landing light
  E.el(D, "abs", "left:100px;top:490px;width:30px;height:1100px;background:#f4ead8"); E.el(D, "abs", "left:990px;top:490px;width:30px;height:1100px;background:#f4ead8");
  E.el(D, "abs", "left:100px;top:490px;width:920px;height:30px;background:#f4ead8");
  E.el(D, "abs", "left:0;top:1580px;width:1080px;height:340px;background-color:#a56a3c;background-image:linear-gradient(45deg,rgba(0,0,0,.18) 25%,transparent 25%,transparent 75%,rgba(0,0,0,.18) 75%);background-size:70px 70px");
  // hallway wall above/around the door: coat hooks, a framed print, a sconce
  E.el(D, "abs", "left:0;top:0;width:1080px;height:490px;opacity:.16;background:repeating-linear-gradient(90deg,#b98f63 0 3px,transparent 3px 54px)");
  const hooks = E.el(D, "abs", "left:150px;top:300px;width:330px;height:180px");
  hooks.innerHTML = `<svg viewBox="0 0 330 180" width="330" height="180"><rect x="0" y="0" width="330" height="22" rx="6" fill="#8a5a33"/>` +
    [[40, "#c0392b"], [130, "#2d5470"], [220, "#d9a441"]].map(([x, c]) => `<circle cx="${x}" cy="30" r="8" fill="#c8b27a"/><path d="M${x - 40} 40 Q${x} 26 ${x + 40} 40 L${x + 50} 176 H${x - 50} Z" fill="${c}"/><path d="M${x} 40 V176" stroke="rgba(0,0,0,.2)" stroke-width="4"/>`).join("") +
    `<circle cx="300" cy="30" r="8" fill="#c8b27a"/><path d="M290 36 q10 60 -6 110" stroke="#f2c14e" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`;
  const print = E.el(D, "abs", "left:560px;top:250px;width:170px;height:210px;background:#fbf5ea;box-shadow:0 0 0 10px #3b2f2a,0 10px 20px rgba(0,0,0,.25)");
  print.innerHTML = `<svg viewBox="0 0 170 210" width="170" height="210"><rect width="170" height="210" fill="#f3e3c3"/><path d="M40 60 H130 L90 110 V160 H110 M90 160 H70" stroke="#1f4b3a" stroke-width="8" fill="none" stroke-linejoin="round"/><circle cx="118" cy="68" r="14" fill="#e25b5b"/></svg>`;
  const sconce = E.el(D, "abs", "left:880px;top:330px;width:60px;height:90px;border-radius:30px 30px 8px 8px;background:#fff1c9;box-shadow:0 0 70px 26px rgba(255,226,160,.55)");
  const opened = E.el(D, "abs", "left:1010px;top:490px;width:70px;height:1100px;background:linear-gradient(90deg,#5e221e,#7a2f2a)");   // the door, swung open
  // the six friends in the doorway
  const FW = 860, FH = 670 * FW / 1002;
  const fr = E.el(D, "abs", `left:${130}px;top:${1600 - FH}px;width:${FW}px;height:${FH}px;transform-origin:50% 100%`);
  E.img(fr, "friends", `width:${FW}px;height:${FH}px`);
  E.K(fr, "y", [[WIPE + .1, 30], [WIPE + .5, 0, "back"]]);
  E.F(t => { fr.style.transform = (fr.style.transform || "").replace(/ scale\([^)]*\)/, "") + ` scale(${1 + (t > WIPE + .3 && t < WIPE + 2 ? Math.abs(Math.sin((t - WIPE) * 8)) * .01 : 0)})`; });
  E.clip(WIPE + .15, "sfx/applause-cheer.wav", { vol: .45, to: 1.6 });
  // the host, foreground left, grinning at us
  const HG = 1180, HW = 250 * HG / 1001;
  const hg = E.el(D, "abs", `left:-40px;top:${1980 - HG}px;width:${HW}px;height:${HG}px;z-index:5`);
  E.img(hg, "h_grin", `width:${HW}px;height:${HG}px`);
  E.F(t => { hg.style.transform = t > 13.4 ? `translateX(${Math.sin(t * 50) * 2}px)` : "none"; });
  // smoke drifts in from the kitchen, the alarm starts
  const smoke2 = [];
  for (let i = 0; i < 12; i++) smoke2.push([E.el(D, "abs", `left:-200px;top:${520 + (i % 4) * 90}px;width:${220 + (i % 3) * 60}px;height:${160 + (i % 3) * 40}px;border-radius:50%;background:radial-gradient(ellipse,rgba(60,60,64,.75),rgba(60,60,64,0) 70%);z-index:6;opacity:0`), i]);
  const SMOKE = 12.8, BURN = 13.5, STAMP = 15.2;
  E.F(t => smoke2.forEach(([p, i]) => { const u = clamp((t - SMOKE - i * .12) / 3.5, 0, 1); p.style.opacity = u > 0 ? Math.min(1, u * 3) * .85 : 0; p.style.transform = `translate(${u * (500 + i * 40)}px,${-u * 120 + Math.sin(t + i) * 20}px) scale(${.7 + u})`; }));
  const alarm = E.el(D, "abs", "left:760px;top:300px;width:140px;height:44px;border-radius:24px 24px 40px 40px;background:linear-gradient(180deg,#fdfdfd,#d8dbde);box-shadow:0 8px 14px rgba(0,0,0,.2);z-index:7");
  const led = E.el(alarm, "abs", "left:62px;top:14px;width:16px;height:16px;border-radius:50%;background:#7a1f1f");
  E.el(D, "abs", "left:826px;top:268px;width:8px;height:36px;background:#cfd3d6;z-index:7");
  E.F(t => { const on = t > SMOKE + .1 && Math.floor(t * 2.5) % 2 === 0; led.style.background = on ? "#ff3b30" : "#7a1f1f"; led.style.boxShadow = on ? "0 0 22px 8px rgba(255,59,48,.8)" : "none"; });
  for (let t = SMOKE + .1; t < DUR - .2; t += .4) E.S(t, "buzz", .45);

  // bubbles
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 58, bg = "#fff", fg = INK, italic = false } = o;
    const b = E.el(E.cur.el, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:20px 28px 24px;box-shadow:0 14px 34px rgba(0,0,0,.3);font-weight:800;font-size:${size}px;line-height:1.04;letter-spacing:-.02em;color:${fg};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .55);
    return b;
  };
  bubble("We wanted to be on<br>time for once!", { left: 250, top: 560, w: 700, tail: 360, t0: WIPE + .45, t1: BURN - .1, size: 62, bg: GOLD });
  bubble("…is something<br>burning?", { left: 360, top: 580, w: 520, tail: 260, t0: BURN, t1: DUR, size: 60, italic: true });
  const stampBox = E.el(D, "abs", "left:100px;top:360px;width:880px;display:flex;justify-content:center;z-index:9");
  const st = E.stamp(stampBox, "LAUNDRY: 200°C", STAMP, { size: 96, rot: -5, bg: CORAL, fg: INK, shake: 12 });
  st.style.alignSelf = "center";

  E.finish(DUR);
  E.K(E.logo, "s", [[17.0, 1], [17.25, 1.18, "out"], [17.55, 1, "io"]]);
}
