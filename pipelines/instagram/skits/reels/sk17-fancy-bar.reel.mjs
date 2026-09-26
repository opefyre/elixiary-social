// SK.17 "The fancy cocktail bar." — he reads a menu of absurd drinks ("Whisper of an Autumn Divorce · served in a boot · €24").
// "Just a gin and tonic, please." — "An exquisite choice." The cloche lifts: a gin and tonic IN A BOOT. "…is that a boot?"
// "The boot is the experience, sir." "Could I just get some water?" — cloche two: a slate with one ice cube, a pipette and
// tweezers. "Alpine glacier water. Deconstructed." He squeezes the pipette: one drop. The bill prints and prints:
// BOOT RENTAL €6. Voices: ElevenLabs (him: Alex; waiter: George). Room, menu, cloches and receipt drawn in code.
export const meta = {
  id: "sk17-fancy-bar",
  images: {
    g_order: "cutouts/guy_order.webp", g_stare: "cutouts/guy_stare.webp", g_pip: "cutouts/guy_pipette.webp",
    waiter: "cutouts/waiter.webp", boot: "cutouts/prop_boot.webp", slate: "cutouts/prop_slate.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", CREAM = "#f6efdf";
  E.episode(-16);
  const MENU = .6, G1 = 3.4, WIN = 5.0, W1 = 5.6, LIFT1 = 7.4, G2 = 8.6, W2 = 10.0, G3 = 12.6, LIFT2 = 14.3, W3 = 14.6, DROP = 16.4, BILL = 17.4, STAMP = 19.6, DUR = 22.0;
  E.music({ bpm: 76, root: 57, seed: 44, prog: [[0, 4, 7, 11], [5, 9, 12, 16], [2, 5, 9, 12], [7, 11, 14, 17]] });
  const S = E.scene("dining", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TABLE = 1400;

  // ================= the dining room =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#0f2a22,#143528 50%,#0c211a)");
  // gilded panelled walls
  for (let i = 0; i < 4; i++) E.el(R, "abs", `left:${30 + i * 262}px;top:560px;width:230px;height:760px;border-radius:6px;box-shadow:inset 0 0 0 4px rgba(214,178,90,.55),inset 0 0 0 14px rgba(0,0,0,.12)`);
  E.el(R, "abs", "left:0;top:540px;width:1080px;height:8px;background:linear-gradient(90deg,#8a6526,#f2d27a,#8a6526)");
  // an oil painting in a heavy gold frame, a bust on a plinth
  const art = E.el(R, "abs", "left:330px;top:620px;width:420px;height:320px;background:#2a1e14;box-shadow:0 0 0 22px #b8893a,0 0 0 28px #6d4f1d,0 20px 40px rgba(0,0,0,.5)");
  art.innerHTML = `<svg viewBox="0 0 420 320" width="420" height="320"><defs><linearGradient id="ls" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9b86a"/><stop offset="1" stop-color="#a86a3a"/></linearGradient></defs><rect width="420" height="320" fill="url(#ls)"/>` +
    `<circle cx="300" cy="90" r="34" fill="#fff0c0" opacity=".9"/><path d="M0 220 Q80 150 170 200 T340 170 T420 190 V320 H0 Z" fill="#5b6b3a"/><path d="M0 260 Q120 220 240 260 T420 250 V320 H0 Z" fill="#3e4a26"/>` +
    `<path d="M70 250 V200 M58 214 l12 -18 l12 18 M300 250 V190 M286 208 l14 -22 l14 22" stroke="#2a3218" stroke-width="7" fill="none"/></svg>`;
  // chandelier with twinkling crystals
  const ch = E.el(R, "abs", "left:390px;top:330px;width:300px;height:220px;transform:scale(.8)");
  ch.innerHTML = `<svg viewBox="0 0 300 220" width="300" height="220"><path d="M150 0 V60" stroke="#b8893a" stroke-width="5"/><path d="M40 90 Q150 150 260 90" stroke="#b8893a" stroke-width="7" fill="none"/>` +
    [40, 95, 150, 205, 260].map(x => `<rect x="${x - 6}" y="70" width="12" height="30" rx="3" fill="#fff6d8"/><circle cx="${x}" cy="62" r="10" fill="#ffe8a0"/>`).join("") +
    Array.from({ length: 12 }, (_, i) => `<path class="cr" d="M${30 + i * 22} ${120 + (i % 3) * 18} l6 14 l-6 14 l-6 -14 z" fill="#e8f4ff"/>`).join("") + `</svg>`;
  const crs = [...ch.querySelectorAll(".cr")];
  E.F(t => crs.forEach((c, i) => c.setAttribute("opacity", String(.4 + .6 * Math.abs(Math.sin(t * 2 + i))))));
  E.el(R, "abs", "left:240px;top:260px;width:600px;height:600px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,220,150,.28),transparent)");

  // ================= him (left) and the waiter (right) =================
  const G = { g_order: [872, 1121], g_stare: [873, 1030], g_pip: [837, 1036] };
  const guy = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px");
  const gEls = Object.entries(G).map(([n, [w, h]]) => { const H = n === "g_order" ? 860 : 800, W = w * H / h; return [n, E.img(guy, n, `position:absolute;left:${300 - W / 2}px;top:${1480 - H}px;width:${W}px;height:${H}px`)]; });
  const GP = [[0, "g_order"], [LIFT1 + .3, "g_stare"], [G3, "g_order"], [DROP - .5, "g_pip"], [BILL + .3, "g_stare"]];
  E.F(t => { const f = at(GP, t); gEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    let y = Math.sin(t * 2) * 3; for (const [k] of GP.slice(1)) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 12; guy.style.transform = `translateY(${y}px)`; });
  const WH = 1180, WW = 526 * WH / 1010;
  const waiter = E.el(R, "abs", `left:${870 - WW / 2}px;top:${1560 - WH}px;width:${WW}px;height:${WH}px;opacity:0`);
  E.img(waiter, "waiter", `width:${WW}px;height:${WH}px`);
  E.K(waiter, "o", [[WIN, 0], [WIN + .1, 1]]); E.K(waiter, "x", [[WIN, 380], [WIN + .5, 0, "out"]]);
  E.F(t => { waiter.style.filter = `drop-shadow(0 20px 30px rgba(0,0,0,.4))`; });

  // ================= the table =================
  E.el(R, "abs", `left:-20px;top:${TABLE}px;width:1120px;height:${1920 - TABLE}px;z-index:4;background:linear-gradient(180deg,#fbf7ee 0%,#efe7d6 12%,#f6f0e3 30%,#e6dcc6 100%)`);
  E.el(R, "abs", `left:-20px;top:${TABLE}px;width:1120px;height:520px;z-index:4;opacity:.5;background:repeating-linear-gradient(90deg,rgba(0,0,0,.05) 0 2px,transparent 2px 120px,rgba(255,255,255,.35) 120px 124px,transparent 124px 240px)`);
  const settings = E.el(R, "abs", `left:0;top:${TABLE - 40}px;width:1080px;height:90px;z-index:5`);
  settings.innerHTML = `<svg viewBox="0 0 1080 90" width="1080" height="90">${[120, 150, 175].map((x, i) => `<rect x="${x}" y="30" width="8" height="${56 - i * 6}" rx="3" fill="#c9ced2"/>`).join("")}${[900, 930, 955].map((x, i) => `<rect x="${x}" y="30" width="8" height="${56 - i * 6}" rx="3" fill="#c9ced2"/>`).join("")}` +
    `<ellipse cx="540" cy="76" rx="170" ry="14" fill="#fff" stroke="#e0d6c0" stroke-width="3"/><ellipse cx="540" cy="74" rx="120" ry="9" fill="none" stroke="#d9b25a" stroke-width="2"/></svg>`;
  // a silver cloche that lifts to reveal what was ordered
  const cloche = (t0, item) => {
    const c = E.el(R, "abs", `left:380px;top:${TABLE - 250}px;width:320px;height:250px;z-index:6;opacity:0`);
    c.innerHTML = `<svg viewBox="0 0 320 250" width="320" height="250"><defs><linearGradient id="cl${t0 | 0}" x1="0" x2="1"><stop offset="0" stop-color="#8e969c"/><stop offset=".3" stop-color="#f4f6f7"/><stop offset=".55" stop-color="#b9c0c5"/><stop offset="1" stop-color="#6d757b"/></linearGradient></defs>` +
      `<path d="M10 240 Q10 40 160 40 Q310 40 310 240 Z" fill="url(#cl${t0 | 0})"/><rect x="0" y="236" width="320" height="14" rx="6" fill="#9aa1a8"/><circle cx="160" cy="30" r="16" fill="#c9ced2"/><path d="M60 180 Q70 90 140 70" stroke="#fff" stroke-opacity=".6" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`;
    E.K(c, "o", [[t0 - 1.2, 0], [t0 - 1.1, 1], [t0 + .5, 1], [t0 + .7, 0]]);
    E.K(c, "y", [[t0, 0], [t0 + .5, -420, "out"]]); E.K(c, "r", [[t0, 0], [t0 + .5, 14, "out"]]);
    E.S(t0 - 1.15, "thud", .3); E.S(t0, "whoosh", .5); E.S(t0 + .1, "sparkle", .8);
    return c;
  };
  cloche(LIFT1, "boot"); cloche(LIFT2, "slate");
  const BH = 360, BW = 380 * BH / 634;
  const boot = E.el(R, "abs", `left:${540 - BW / 2}px;top:${TABLE + 16 - BH}px;width:${BW}px;height:${BH}px;z-index:5;opacity:0;transform-origin:50% 100%`);
  E.img(boot, "boot", `width:${BW}px;height:${BH}px`);
  E.K(boot, "o", [[LIFT1, 0], [LIFT1 + .02, 1], [LIFT2 - 1.3, 1], [LIFT2 - 1.1, 0]]);
  E.F(t => { boot.style.transform = t >= G2 && t < G2 + .6 ? `rotate(${Math.sin((t - G2) * 30) * 3}deg)` : "none"; });
  const SLW = 380, SLH = 296 * SLW / 454;
  const slate = E.el(R, "abs", `left:${540 - SLW / 2}px;top:${TABLE + 20 - SLH}px;width:${SLW}px;height:${SLH}px;z-index:5;opacity:0`);
  E.img(slate, "slate", `width:${SLW}px;height:${SLH}px`);
  E.K(slate, "o", [[LIFT2, 0], [LIFT2 + .02, 1]]);
  // price tags that pop out beside the dishes
  const tag = (txt, t0, x, y) => { const g = E.el(R, "abs", `left:${x}px;top:${y}px;padding:8px 18px 10px;border-radius:10px;background:${GOLD};color:${INK};font-weight:800;font-size:40px;z-index:7;opacity:0;transform:rotate(-6deg);box-shadow:0 8px 16px rgba(0,0,0,.3)`, txt); E.K(g, "o", [[t0, 0], [t0 + .1, 1]]); E.K(g, "s", [[t0, .4], [t0 + .3, 1, "back"]]); E.S(t0, "ding", .5); return g; };
  const t1 = tag("€24", LIFT1 + .6, 680, TABLE - 300); E.K(t1, "o", [[LIFT2 - 1.3, 1], [LIFT2 - 1.1, 0]]);
  tag("€9", LIFT2 + .6, 720, TABLE - 200);
  // the one drop from the pipette
  const drop = E.el(R, "abs", `left:448px;top:760px;width:18px;height:24px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:linear-gradient(180deg,#e8f6ff,#8fd0f5);z-index:7;opacity:0`);
  E.K(drop, "o", [[DROP, 0], [DROP + .05, 1], [DROP + .5, 1], [DROP + .55, 0]]); E.K(drop, "y", [[DROP, 0], [DROP + .5, 50, "in"]]); E.S(DROP + .7, "tick", .7);
  const oneDrop = E.el(R, "abs", `left:0;top:${TABLE - 320}px;width:1080px;text-align:center;z-index:7;opacity:0`, `<span style="display:inline-block;padding:8px 22px 10px;border-radius:12px;background:rgba(10,20,16,.8);color:#fff;font-weight:700;font-style:italic;font-size:36px">1 drop</span>`);
  E.K(oneDrop, "o", [[DROP + .7, 0], [DROP + .85, 1], [BILL, 1], [BILL + .15, 0]]);

  // ================= the menu =================
  const menu = E.el(R, "abs", `left:130px;top:520px;width:820px;z-index:8;border-radius:18px;padding:26px 36px 30px;background:${CREAM};box-shadow:0 30px 60px rgba(0,0,0,.5),inset 0 0 0 3px #b8893a,inset 0 0 0 9px ${CREAM},inset 0 0 0 10px #b8893a;opacity:0`);
  menu.innerHTML = `<div style="text-align:center;font-weight:800;font-size:30px;letter-spacing:.34em;color:#1f4b3a">L E   M E N U</div><div style="text-align:center;font-family:Inter;font-style:italic;font-size:22px;color:#8a7a5a;margin:4px 0 14px">cocktails, curated by our resident poet</div>` +
    [["Whisper of an Autumn Divorce", "gin, regret · served in a boot", "24"], ["Forest Floor Negroni", "with moss we found outside", "26"], ["Deconstructed Mojito", "the idea of a mojito", "19"], ["Liquid Silence", "we will not explain this", "31"], ["Water", "alpine, deconstructed", "9"]]
      .map(([n, d, p]) => `<div style="display:flex;align-items:baseline;gap:12px;padding:10px 0;border-bottom:1px dashed rgba(31,75,58,.25)"><div style="flex:1"><div style="font-weight:800;font-size:36px;color:${INK};letter-spacing:-.01em">${n}</div><div style="font-family:Inter;font-style:italic;font-size:24px;color:#7a6e55">${d}</div></div><div style="font-weight:800;font-size:36px;color:#1f4b3a">€${p}</div></div>`).join("");
  E.K(menu, "o", [[MENU, 0], [MENU + .3, 1], [G1 + .4, 1], [G1 + .7, 0]]); E.K(menu, "y", [[MENU, 80], [MENU + .4, 0, "out"], [G1 + .4, 0], [G1 + .7, 80, "in"]]);
  E.S(MENU, "swish", .5);

  // ================= bubbles =================
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 54, bg = "#fff", fg = INK, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.06;letter-spacing:-.02em;color:${fg};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  const HIM = { left: 60, top: 480, w: 470, tail: 240 }, WAI = { left: 520, top: 360, w: 500, tail: 330, bg: "#1b2330", fg: "#fff" };
  bubble("Just a gin and<br>tonic, please.", { ...HIM, t0: G1, t1: W1 - .1 });
  bubble("An exquisite<br>choice.", { ...WAI, t0: W1, t1: LIFT1 - .2 });
  bubble("…is that<br>a boot?", { ...HIM, t0: G2, t1: W2 - .1, italic: true });
  bubble("The boot is the<br>experience, sir.", { ...WAI, t0: W2, t1: G3 - .1 });
  bubble("Could I just get<br>some water?", { ...HIM, t0: G3, t1: W3 - .1 });
  bubble("Alpine glacier water.<br>Deconstructed.", { ...WAI, w: 560, left: 480, t0: W3, t1: BILL - .1 });
  [[G1, "g1"], [G2, "g2"], [G3, "g3"]].forEach(([t, n]) => E.clip(t + .05, `voices/sk17/${n}.wav`, { vol: 1.4 }));
  [[W1, "w1"], [W2, "w2"], [W3, "w3"]].forEach(([t, n]) => E.clip(t + .05, `voices/sk17/${n}.wav`, { vol: 1.4 }));
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-fine-dining.wav", { vol: .45, to: Math.min(6, DUR - t), duck: false });

  // ================= the bill =================
  const bill = E.el(R, "abs", `left:540px;top:560px;width:500px;z-index:9;overflow:hidden;height:0;background:#fffdf6;box-shadow:0 20px 40px rgba(0,0,0,.45)`);
  const lines = [["G&T (boot)", "24.00"], ["Water (deconstructed)", "9.00"], ["Boot rental", "6.00"], ["Tweezer service", "4.50"], ["Pipette handling", "3.00"], ["Emotional ambience", "12.00"], ["", ""], ["TOTAL", "€58.50"]];
  bill.innerHTML = `<div style="padding:22px 30px;font-family:Inter;font-size:30px;color:#222;line-height:1.55"><div style="text-align:center;font-weight:800;letter-spacing:.3em;margin-bottom:8px">RECEIPT</div>` +
    lines.map(([a, b]) => `<div style="display:flex;justify-content:space-between;${a === "TOTAL" ? "font-weight:800;font-size:36px;border-top:3px dashed #999;padding-top:8px" : ""}"><span>${a}</span><span>${b}</span></div>`).join("") + `</div>`;
  E.K(bill, "h", [[BILL, 0], [BILL + 1.8, 560, "lin"]]);
  E.clip(BILL, "sfx/elx-register.wav", { vol: .9 });
  const stampBox = E.el(R, "abs", "left:100px;top:1160px;width:880px;display:flex;justify-content:center;z-index:10");
  const st = E.stamp(stampBox, "BOOT RENTAL: €6.", STAMP, { size: 88, rot: -5, bg: CORAL, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The *fancy* cocktail bar.", { size: 64, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, G1 - .2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
