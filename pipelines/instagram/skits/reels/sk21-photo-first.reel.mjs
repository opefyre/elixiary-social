// SK.21 "The phone eats first." — the cocktails arrive, two starving friends reach for them. "WAIT! Nobody touch anything!"
// She moves the glasses, holds a napkin as a reflector ("The light's wrong."), climbs on a chair for the overhead shot,
// and a time-lapse runs: the light outside goes from day to night, the ice melts, the friends grow a cobweb.
// PHOTOS TAKEN: 1 → 212. "One more." — a selfie. Finally: "Okay! You can drink now." The friend, flat: "The ice melted
// in March." The phone buzzes: her post, "just a casual drink 🍸", 3 likes.  Voices: ElevenLabs (her: Laura; him: Brian).
export const meta = {
  id: "sk21-photo-first",
  images: { reach: "cutouts/pals_reach.webp", bored: "cutouts/pals_bored.webp", wait: "cutouts/inf_wait.webp", crouch: "cutouts/inf_crouch.webp", chair: "cutouts/inf_chair.webp", selfie: "cutouts/inf_selfie.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  const SERVE = .5, WAIT = 1.4, LIGHT = 4.3, CHAIR = 6.2, LAPSE = 7.2, MORE = 11.2, OK = 13.3, MARCH = 15.2, POST = 17.0, DUR = 20.6;
  E.music({ bpm: 108, root: 57, seed: 21, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: WAIT });
  const S = E.scene("cafe", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const lerp = (a, b, u) => a + (b - a) * u;
  const TOP = 1320;
  const lapse = t => seg(t, LAPSE, MORE - LAPSE);                                 // 0 → 1 across the time-lapse

  // ================= a sunny café that goes dark =================
  const wall = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#f6e7cf,#efd9b8)");
  const win = E.el(R, "abs", "left:60px;top:400px;width:960px;height:500px;border-radius:14px;overflow:hidden;box-shadow:0 0 0 14px #fffaf0,0 0 0 18px #d8c8a0");
  const sky = E.el(win, "abs", "left:0;top:0;width:960px;height:500px");
  const sun = E.el(win, "abs", "left:700px;top:60px;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,#fff4c4 0 45%,#ffc36b 62%,rgba(255,160,90,0) 72%)");
  const moon = E.el(win, "abs", "left:180px;top:80px;width:80px;height:80px;border-radius:50%;background:#eef1f7;box-shadow:inset -20px -8px 0 #c7cedb;opacity:0");
  const street = E.el(win, "abs", "left:0;top:300px;width:960px;height:200px");
  street.innerHTML = `<svg viewBox="0 0 960 200" width="960" height="200">${[[0, 40, 160], [150, 10, 140], [280, 60, 180], [450, 0, 150], [590, 50, 170], [750, 20, 210]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${200 - y}" fill="#c9a88a"/>` + Array.from({ length: 6 }, (_, k) => `<rect class="wl" x="${x + 16 + (k % 3) * (w / 3.3)}" y="${y + 20 + Math.floor(k / 3) * 60}" width="22" height="30" fill="#8fb4c9"/>`).join("")).join("")}</svg>`;
  const wls = [...street.querySelectorAll(".wl")];
  [[472, 0, 16, 500], [0, 240, 960, 14]].forEach(([x, y, w, h]) => E.el(win, "abs", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:#fffaf0`));
  E.F(t => {
    const u = lapse(t);
    sky.style.background = `linear-gradient(180deg,rgb(${lerp(150, 20, u)},${lerp(205, 26, u)},${lerp(245, 70, u)}),rgb(${lerp(215, 70, u)},${lerp(238, 50, u)},${lerp(252, 100, u)}))`;
    sun.style.transform = `translateY(${u * 420}px)`; moon.style.opacity = clamp((u - .6) * 3, 0, 1);
    street.querySelector("svg").style.filter = `brightness(${1 - u * .6})`;
    wls.forEach((w, i) => w.setAttribute("fill", u > .55 + (i % 5) * .06 ? "#ffd98a" : "#8fb4c9"));
    wall.style.filter = `brightness(${1 - u * .35})`;
  });
  // pendant lights that come on as it gets dark
  [270, 810].forEach(x => { E.el(R, "abs", `left:${x - 2}px;top:0;width:4px;height:330px;background:#333`); const l = E.el(R, "abs", `left:${x - 60}px;top:320px;width:120px;height:60px;border-radius:60px 60px 8px 8px;background:#2f5d4a`); const g = E.el(R, "abs", `left:${x - 200}px;top:350px;width:400px;height:500px;background:linear-gradient(180deg,rgba(255,214,140,.5),transparent);clip-path:polygon(35% 0,65% 0,100% 100%,0 100%);opacity:0`); E.F(t => { g.style.opacity = clamp((lapse(t) - .5) * 3, 0, 1); }); });

  // ================= the two friends (seated, centre-left) =================
  const PW = 700, PALS = { reach: [938, 588], bored: [953, 647] };
  const pals = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px");
  const pEls = Object.entries(PALS).map(([n, [w, h]]) => { const H = h * PW / w; return [n, E.img(pals, n, `position:absolute;left:10px;top:${TOP + 60 - H}px;width:${PW}px;height:${H}px`)]; });
  E.F(t => { const f = t >= LIGHT ? "bored" : "reach"; pEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; }); pals.style.transform = `translateY(${Math.sin(t * 1.6) * 3}px)`; });
  // cobweb grows between them during the lapse
  const web = E.el(R, "abs", `left:600px;top:${TOP - 400}px;width:200px;height:200px;z-index:3`);
  web.innerHTML = `<svg viewBox="0 0 200 200" width="200" height="200"><g fill="none" stroke="rgba(255,255,255,.8)" stroke-width="2">` +
    Array.from({ length: 6 }, (_, i) => { const a = i / 5 * Math.PI / 2; return `<path class="wb" d="M0 0 L${Math.cos(a) * 190} ${Math.sin(a) * 190}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`; }).join("") +
    [50, 100, 150].map(r => `<path class="wb" d="M${r} 0 Q${r * .8} ${r * .8} 0 ${r}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`).join("") + `</g></svg>`;
  [...web.querySelectorAll(".wb")].forEach((p, i) => E.K(p, "draw", [[LAPSE + 1 + i * .25, 0], [LAPSE + 1.4 + i * .25, 1, "out"]]));

  // ================= the table and the drinks =================
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;background:linear-gradient(180deg,#b88a5a,#8a5f38);box-shadow:inset 0 10px 0 #c99a68`);
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;opacity:.25;background:repeating-linear-gradient(90deg,transparent 0 60px,rgba(0,0,0,.25) 60px 62px,transparent 62px 140px)`);
  const glass = (x, liq) => {
    const g = E.el(R, "abs", `left:${x}px;top:${TOP - 200}px;width:130px;height:220px;z-index:4`);
    g.innerHTML = `<svg viewBox="0 0 130 220" width="130" height="220"><path d="M14 30 L22 214 H108 L116 30 Z" fill="${liq}"/>` +
      `<g class="ice">${[[30, 50], [70, 40], [46, 90], [80, 100]].map(([ix, iy]) => `<rect x="${ix}" y="${iy}" width="28" height="28" rx="6" fill="rgba(255,255,255,.75)" stroke="#fff" stroke-width="2"/>`).join("")}</g>` +
      `<rect class="water" x="22" y="30" width="86" height="0" fill="rgba(220,240,255,.5)"/><path d="M10 26 L18 216 H112 L120 26" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="4"/>` +
      `<path d="M96 30 q14 -24 30 -6 q-10 16 -30 6" fill="#9bd14a"/><rect x="80" y="-30" width="7" height="90" fill="#ff8fb1" transform="rotate(12 83 15)"/></svg>`;
    return g;
  };
  const g1 = glass(260, "rgba(255,150,120,.85)"), g2 = glass(460, "rgba(255,210,110,.85)");
  [g1, g2].forEach((g, i) => { E.K(g, "o", [[SERVE + i * .15, 0], [SERVE + .1 + i * .15, 1]]); E.K(g, "y", [[SERVE + i * .15, -60], [SERVE + .35 + i * .15, 0, "back"]]); });
  // she keeps moving the glasses around for the shot
  const moves = [[LIGHT - .6, 60], [LIGHT + .8, -40], [CHAIR - .3, 30], [LAPSE + 1.5, -30], [LAPSE + 2.8, 50]];
  moves.forEach(([k, dx], i) => { [g1, g2].forEach((g, j) => E.K(g, "x", [[k, i ? moves[i - 1][1] * (j ? -1 : 1) : 0], [k + .3, dx * (j ? -1 : 1), "io"]])); E.S(k, "swish", .4); });
  E.F(t => { const u = lapse(t); [g1, g2].forEach(g => { g.querySelectorAll(".ice rect").forEach((r, i) => { const k = Math.max(0, 1 - u * (1.1 + i * .15)); r.setAttribute("width", 28 * k); r.setAttribute("height", 28 * k); }); const wtr = g.querySelector(".water"); wtr.setAttribute("height", String(u * 60)); wtr.setAttribute("y", String(30 + (1 - u) * 0)); }); });

  // ================= her =================
  const HER = { wait: [433, 1008, 1000], crouch: [655, 980, 900], chair: [521, 1009, 1180], selfie: [880, 1132, 820] };
  const her = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:5");
  const herIn = E.el(her, "abs", "left:0;top:0;width:1080px;height:1920px");
  const hEls = Object.entries(HER).map(([n, [w, h, H]]) => { const W = w * H / h; return [n, E.img(herIn, n, `position:absolute;left:${840 - W / 2}px;top:${1860 - H}px;width:${W}px;height:${H}px`)]; });
  const HP = [[0, "wait"], [LIGHT, "crouch"], [CHAIR, "chair"], [MORE, "selfie"], [OK, "wait"]];
  E.K(her, "x", [[WAIT - .5, 420], [WAIT, 0, "out"]]); E.K(her, "o", [[WAIT - .5, 0], [WAIT - .45, 1]]);
  E.F(t => {
    const f = at(HP, t); hEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    let y = 0; for (const [k] of HP.slice(1)) if (t >= k && t < k + .22) y = -Math.sin((t - k) / .22 * Math.PI) * 16;
    if (t >= LAPSE && t < MORE) herIn.style.transform = `translate(${Math.sin(t * 9) * 16}px,${y}px)`; else herIn.style.transform = `translateY(${y}px)`;
  });
  // camera flashes
  const flashes = [];
  for (let t = LIGHT + .2; t < MORE + 1.4; t += (t > LAPSE && t < MORE ? .14 : .7)) flashes.push(t);
  flashes.forEach(t => { E.flash(t, "#ffffff", .5, .12); E.clip(t, "sfx/elx-flash.wav", { vol: .45 }); });

  // ================= counter =================
  const pill = E.el(R, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:54px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;transform-origin:0 50%;font-variant-numeric:tabular-nums`, "PHOTOS: 0");
  E.K(pill, "o", [[LIGHT, 0], [LIGHT + .15, 1], [OK, 1], [OK + .2, 0]]);
  E.F(t => { const n = flashes.filter(k => t >= k).length * 4 + (t >= LAPSE ? Math.round(lapse(t) * 120) : 0); const s = `PHOTOS: ${Math.min(n, 212)}`; if (pill.textContent !== s) pill.textContent = s; pill.style.background = n > 60 ? CORAL : INK; pill.style.color = n > 60 ? INK : "#fff"; });
  const later = E.el(R, "abs", `left:0;top:1620px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 26px 12px;border-radius:14px;background:rgba(20,35,29,.85);color:#fff;font-weight:700;font-style:italic;font-size:40px">…4 hours later…</span>`);
  E.K(later, "o", [[LAPSE + .2, 0], [LAPSE + .4, 1], [MORE - .3, 1], [MORE, 0]]);
  for (let t = LAPSE; t < MORE; t += .2) E.S(t, "tick", .15);

  // ================= the post =================
  const post = E.el(R, "abs", `left:250px;top:520px;width:580px;border-radius:30px;background:#fff;box-shadow:0 30px 60px rgba(0,0,0,.45);overflow:hidden;z-index:9;opacity:0`,
    `<div style="display:flex;align-items:center;gap:14px;padding:18px 22px"><div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#f58529,#dd2a7b,#8134af)"></div><div style="font-weight:800;font-size:28px;color:#111">your_friend</div></div>` +
    `<div style="height:360px;background:radial-gradient(circle at 50% 60%,#ffd3a8,#f59e7a 60%,#d9745a)"></div>` +
    `<div style="padding:18px 22px 22px;font-family:Inter;font-size:28px;color:#111"><b>♡ 3 likes</b><br>your_friend just a casual drink 🍸✨</div>`);
  E.K(post, "o", [[POST, 0], [POST + .2, 1]]); E.K(post, "y", [[POST, 80], [POST + .4, 0, "back"]]);
  E.clip(POST - .1, "sfx/elx-phone-buzz.wav", { vol: .8 });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 58, bg = "#fff", fg = INK, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.3);font-weight:800;font-size:${size}px;line-height:1.06;letter-spacing:-.02em;color:${fg};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  bubble("WAIT! Nobody<br>touch anything!", { left: 340, top: 460, w: 560, tail: 440, t0: WAIT, t1: LIGHT - .1, size: 62, bg: CORAL });
  bubble("The light's wrong.", { left: 360, top: 480, w: 520, tail: 420, t0: LIGHT, t1: CHAIR - .1 });
  bubble("One more.", { left: 440, top: 480, w: 340, tail: 240, t0: MORE, t1: OK - .1 });
  bubble("Okay! You can<br>drink now.", { left: 420, top: 480, w: 500, tail: 400, t0: OK, t1: MARCH - .1, bg: GOLD });
  bubble("The ice melted<br>in March.", { left: 60, top: 640, w: 480, tail: 260, t0: MARCH, t1: POST + .2, italic: true });
  [[WAIT, "i1"], [LIGHT, "i2"], [MORE, "i3"], [OK, "i4"]].forEach(([t, n]) => E.clip(t + .05, `voices/sk21/${n}.wav`, { vol: 1.4 }));
  E.clip(MARCH + .05, "voices/sk21/f1.wav", { vol: 1.5 });
  E.clip(WAIT - .05, "sfx/record-silence.wav", { vol: .8 });
  for (let t = 0; t < DUR; t += 7) E.clip(t, "sfx/elx-cafe.wav", { vol: .25, to: Math.min(7, DUR - t), duck: false });
  const stampBox = E.el(R, "abs", "left:100px;top:360px;width:880px;display:flex;justify-content:center;z-index:10");
  const st = E.stamp(stampBox, "3 LIKES.", POST + 1.2, { size: 120, rot: -5, bg: CORAL, fg: INK, shake: 10 }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The phone *eats first.*", { size: 66, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, LIGHT - .1, .15);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
