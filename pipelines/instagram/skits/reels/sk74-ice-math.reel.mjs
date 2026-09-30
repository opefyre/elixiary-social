// SK.74 "The ice math." — Host Rico: "One bag of ice. For twelve people. Easy." (12 guests × 3 drinks × 5 cubes = 180 cubes; 1 bag =
// 60; “close enough”). 20:00 → 21:40, the ICE LEFT meter drains to 0%. Jess: "Any ice for my drink?" Rico: "It's… a lifestyle
// choice. Warm is authentic." 22:15, the supermarket freezer aisle: ICE — SOLD OUT. "Sold out?! It's a Saturday!" Back home with
// a bag of frozen peas: "I got… peas." Jess drops peas in her Negroni: "Peas in a Negroni. Honestly? Not bad."
// Stamp: NOBODY BUYS ENOUGH ICE.
// Voices: ElevenLabs (Rico: Liam; Jess: Jessica).
export const meta = {
  id: "sk74-ice-math",
  images: { home: "bg/night.jpg", store: "bg/freezer.jpg", party: "cutouts/rico_party.webp", shock: "cutouts/rico_shock.webp", cart: "cutouts/rico_cart.webp",
    relief: "cutouts/rico_relief.webp", group: "cutouts/friends6.webp", jess: "cutouts/av_jess.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", ICE = "#8fd3ff";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const R1 = .5, DRAIN = 3.9, J1 = 8.2, R2 = 9.9, STORE = 13.9, R3 = 14.9, HOME = 17.3, R4 = 18.0, J2 = 20.0, STAMP = 24.3, DUR = 27.6;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("ice", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const phase = t => t >= HOME ? 2 : t >= STORE ? 1 : 0;

  // ================= backgrounds =================
  const BGS = [["home", "brightness(1.35) saturate(1.15)"], ["store", "none"], ["home", "brightness(1.2) saturate(1.05)"]].map(([img, f]) => {
    const b = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden;opacity:0");
    const im = E.img(b, img, `position:absolute;left:0;top:0;width:1080px;height:1920px;filter:${f};transform-origin:50% 55%`); return [b, im];
  });
  E.F(t => { const p = phase(t); BGS.forEach(([b, im], i) => { b.style.opacity = i === p ? 1 : 0; if (i === p) im.style.transform = `scale(${1.04 + (t % 8) * .005})`; }); });
  [STORE, HOME].forEach(k => { E.wipe(k); E.clip(k - .3, "sfx/elx-trailer-whoosh.wav", { vol: .35 }); });
  E.clip(0, "sfx/elx-party-music.wav", { vol: .22, to: 6, duck: true }); E.clip(6, "sfx/elx-party-music.wav", { vol: .22, to: STORE - 6, duck: true });
  E.clip(STORE, "sfx/elx-fridge.wav", { vol: .3, to: HOME - STORE, duck: true }); E.clip(HOME, "sfx/elx-lounge.wav", { vol: .22, to: DUR - HOME, duck: true });
  const party = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:1;pointer-events:none;mix-blend-mode:screen");
  E.F(t => { if (phase(t) === 0) { const h = (t * 80) % 360; party.style.background = `radial-gradient(ellipse at ${50 + Math.sin(t * 1.6) * 32}% 35%,hsla(${h},80%,60%,.2),transparent 55%)`; } else party.style.background = "none"; });

  // ================= clock =================
  const clk = E.el(R, "abs", `left:40px;top:360px;padding:10px 24px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:44px;z-index:9;font-variant-numeric:tabular-nums`);
  const TIMES = [[0, "19:30"], [DRAIN, "20:00"], [DRAIN + 1.6, "21:00"], [DRAIN + 3.2, "21:40"], [STORE, "22:15"], [HOME, "22:50"]];
  E.F(t => { let h = TIMES[0][1]; for (const [k, v] of TIMES) if (t >= k) h = v; h = `🕘 ${h}`; if (clk.textContent !== h) clk.textContent = h; });
  E.K(clk, "s", [[0, .7], [.3, 1, "back"]]);
  TIMES.slice(1).forEach(([k]) => E.S(k, "tick", .4));

  // ================= the maths note =================
  const note = E.el(R, "abs", `left:40px;top:450px;width:560px;padding:16px 22px;border-radius:20px;background:#fff8d6;color:${INK};font-weight:800;font-size:33px;line-height:1.25;z-index:9;opacity:0;box-shadow:0 14px 34px rgba(0,0,0,.35);transform-origin:0 0`,
    `<div style="font-weight:900;font-size:30px;letter-spacing:.06em;color:#a06a00">🧮 ICE MATH</div>12 guests × 3 drinks × 5 cubes<br>= <b>180 cubes</b> · 1 bag = <b>60</b><br><span style="color:${CORAL};font-weight:900">→ “close enough” ✅</span>`);
  E.K(note, "o", [[R1 + .3, 0], [R1 + .4, 1], [DRAIN - .1, 1], [DRAIN + .1, 0]]); E.K(note, "s", [[R1 + .3, .6], [R1 + .6, 1, "back"]]); E.S(R1 + .3, "pop", .4);

  // ================= ice meter =================
  const meter = E.el(R, "abs", `left:40px;top:450px;width:560px;padding:12px 20px;border-radius:18px;background:rgba(255,255,255,.95);color:${INK};z-index:9;opacity:0`);
  const mHead = E.el(meter, "", "font-weight:900;font-size:34px;display:flex;justify-content:space-between", "<span>🧊 ICE LEFT</span><span class='pct'></span>");
  const mBar = E.el(meter, "", "height:26px;border-radius:14px;background:#dfe8ee;margin-top:8px;overflow:hidden"); const fill = E.el(mBar, "", `height:100%;width:100%;background:linear-gradient(90deg,${ICE},#5aaaf0);border-radius:14px`);
  E.K(meter, "o", [[DRAIN, 0], [DRAIN + .1, 1], [STORE - .1, 1], [STORE, 0]]);
  const pctAt = t => Math.round(100 - 100 * Math.pow(seg(t, DRAIN, 4.2), .8));
  E.F(t => { if (t < DRAIN || t >= STORE) return; const p = pctAt(t); fill.style.width = p + "%"; fill.style.background = p < 25 ? `linear-gradient(90deg,#ff8a70,${CORAL})` : `linear-gradient(90deg,${ICE},#5aaaf0)`; meter.querySelector(".pct").textContent = p + "%"; });
  for (let t = DRAIN; t < DRAIN + 4.2; t += .5) E.S(t, "tick", .18);
  E.clip(DRAIN + .4, "sfx/elx-ice-clink.wav", { vol: .5 }); E.clip(DRAIN + 1.6, "sfx/elx-ice-scatter.wav", { vol: .4 }); E.clip(DRAIN + 2.8, "sfx/elx-ice-clink.wav", { vol: .5 });
  // the shrinking bag prop (top right) : full → sad
  const bag = E.el(R, "abs", `left:750px;top:520px;width:260px;height:300px;z-index:8;opacity:0;transform-origin:50% 100%`);
  bag.innerHTML = `<div style="position:absolute;left:20px;top:40px;width:220px;height:250px;border-radius:26px 26px 40px 40px;background:linear-gradient(180deg,#e9f7ff,#b7dcf4);border:5px solid #fff;box-shadow:0 14px 30px rgba(0,0,0,.35)"></div><div style="position:absolute;left:40px;top:10px;width:180px;height:50px;border-radius:14px;background:#fff"></div><div style="position:absolute;left:0;right:0;top:120px;text-align:center;font-weight:900;font-size:66px;color:#2a6fb0">ICE</div><div class="cubes" style="position:absolute;left:0;right:0;top:190px;text-align:center;font-size:46px"></div>`;
  const cubes = bag.querySelector(".cubes");
  E.K(bag, "o", [[R1 + .2, 0], [R1 + .3, 1], [STORE - .1, 1], [STORE, 0]]); E.K(bag, "s", [[R1 + .2, .5], [R1 + .5, 1, "back"]]);
  E.F(t => { const p = clamp(pctAt(t) / 100, 0, 1); const h = "🧊".repeat(Math.max(0, Math.ceil(p * 5))); if (cubes.textContent !== h) cubes.textContent = h; bag.style.transform = `scaleY(${.35 + .65 * p}) rotate(${t > DRAIN + 3.8 && t < STORE ? Math.sin(t * 20) * 5 : 0}deg)`; });

  // ================= figures =================
  const fig = (img, H, w, h, cx, bottom, z, show, bob = 4) => {
    const W = H * w / h; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px`);
    E.F(t => { const on = show(t); f.style.opacity = on ? 1 : 0; if (on) fi.style.transform = `translateY(${Math.sin(t * 1.7 + cx) * bob}px)`; }); return [f, fi];
  };
  const [gp, gpIn] = fig("group", 500, 1002, 670, 650, 1935, 3, t => phase(t) !== 1, 6);
  E.F(t => { if (phase(t) !== 1) gpIn.style.transform = `translateY(${Math.abs(Math.sin(t * 5)) * -(t < STORE ? 10 : 0)}px) rotate(${Math.sin(t * 3) * (t < STORE ? 1.2 : 0)}deg)`; });
  fig("party", 900, 584, 957, 240, 1930, 5, t => t < R2 - .1);
  const [shk, shkIn] = fig("shock", 780, 863, 1155, 250, 1930, 5, t => t >= R2 - .1 && t < STORE);
  E.F(t => { if (t >= R2 - .1 && t < STORE) shkIn.style.transform = `translateX(${Math.sin(t * 40) * (t < R2 + .5 ? 6 : 1.5)}px)`; });
  const [cart, cartIn] = fig("cart", 900, 646, 1003, 300, 1930, 5, t => phase(t) === 1);
  E.F(t => { if (phase(t) === 1) cartIn.style.transform = `translateX(${(t - STORE < .6 ? -400 * (1 - seg(t, STORE, .6)) : 0) + Math.sin(t * 5) * 4}px)`; });
  fig("relief", 800, 684, 999, 250, 1930, 5, t => t >= HOME);

  // ================= store sign =================
  const sign = E.el(R, "abs", `left:130px;top:560px;width:820px;padding:22px;border-radius:24px;background:#d63a2b;color:#fff;font-weight:900;font-size:70px;text-align:center;z-index:4;opacity:0;box-shadow:0 20px 40px rgba(0,0,0,.45);transform:rotate(-3deg)`, "❄️ ICE:<br>SOLD OUT");
  E.K(sign, "o", [[STORE + .5, 0], [STORE + .6, 1], [HOME - .1, 1], [HOME, 0]]); E.K(sign, "s", [[STORE + .5, 1.5], [STORE + .8, 1, "out"]]); E.S(STORE + .5, "slam", .55);
  const other = E.el(R, "abs", `left:40px;top:450px;padding:10px 22px;border-radius:16px;background:#fff;color:${INK};font-weight:900;font-size:36px;z-index:9;opacity:0;white-space:nowrap`, "🛒 everyone else’s party: 🎉");
  E.K(other, "o", [[STORE + 1.3, 0], [STORE + 1.4, 1], [HOME - .2, 1], [HOME - .1, 0]]); E.K(other, "s", [[STORE + 1.3, .6], [STORE + 1.6, 1, "back"]]); E.S(STORE + 1.3, "pop", .4);

  // ================= peas =================
  const peas = E.el(R, "abs", `left:20px;top:1530px;width:280px;padding:16px 14px;border-radius:26px;background:linear-gradient(180deg,#3cbf4f,#1f8a34);color:#fff;font-weight:900;font-size:56px;text-align:center;z-index:9;opacity:0;border:6px solid #fff;box-shadow:0 14px 30px rgba(0,0,0,.4);transform-origin:50% 100%;transform:rotate(-8deg)`, "PEAS<div style='font-size:40px;margin-top:6px'>🟢🟢🟢</div>");
  E.K(peas, "o", [[R4 - .1, 0], [R4, 1], [R4 + 2.9, 1], [R4 + 3.0, 0]]); E.K(peas, "s", [[R4 - .1, .4], [R4 + .3, 1, "back"]]);
  const jess = E.el(R, "abs", `left:770px;top:1060px;width:210px;text-align:center;z-index:9;opacity:0`);
  const jc = E.el(jess, "", `width:190px;height:190px;border-radius:50%;overflow:hidden;border:6px solid #fff;box-shadow:0 12px 26px rgba(0,0,0,.45);margin:auto`); E.img(jc, "jess", "width:190px;height:190px");
  E.el(jess, "", "margin-top:6px;font-weight:900;font-size:30px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.8)", "Jess");
  E.K(jess, "o", [[J1 - .1, 0], [J1, 1], [R2 - .1, 1], [R2, 0], [J2 - .1, 0], [J2, 1]]); E.K(jess, "s", [[J1 - .1, .5], [J1 + .3, 1, "back"], [J2 - .1, .5], [J2 + .3, 1, "back"]]);
  // the negroni with peas
  const glass = E.el(R, "abs", `left:770px;top:860px;font-size:150px;z-index:9;opacity:0;transform-origin:50% 100%`, "🍸");
  E.K(glass, "o", [[J2 + 1.2, 0], [J2 + 1.3, 1]]); E.K(glass, "s", [[J2 + 1.2, .5], [J2 + 1.5, 1, "back"]]);
  const pea = E.el(R, "abs", `left:830px;top:760px;font-size:56px;z-index:10;opacity:0`, "🟢");
  E.K(pea, "o", [[J2 + 1.8, 0], [J2 + 1.85, 1], [J2 + 2.4, 1], [J2 + 2.5, 0]]); E.K(pea, "y", [[J2 + 1.8, 0], [J2 + 2.4, 120, "in"]]); E.clip(J2 + 2.4, "sfx/splash.wav", { vol: .45 });
  const good = E.el(R, "abs", `left:40px;top:450px;padding:10px 22px;border-radius:16px;background:#1a9c5b;color:#fff;font-weight:900;font-size:38px;z-index:9;opacity:0;white-space:nowrap`, "👍 not bad, honestly");
  E.K(good, "o", [[J2 + 2.7, 0], [J2 + 2.8, 1], [STAMP - .1, 1], [STAMP, 0]]); E.K(good, "s", [[J2 + 2.7, .6], [J2 + 3.0, 1, "back"]]); E.S(J2 + 2.7, "ding", .4);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 46, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:#fff;border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:#fff;transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("One bag of ice.<br>For <b>twelve</b> people.<br>Easy. 😎", { left: 260, top: 780, w: 560, tail: 100, t0: R1, t1: DRAIN + .2 });
  bubble("Any ice for<br>my drink?", { left: 560, top: 870, w: 420, tail: 300, t0: J1, t1: R2 - .1 });
  bubble("It’s… a <b>lifestyle choice.</b><br>Warm is authentic.", { left: 60, top: 720, w: 640, tail: 200, t0: R2, t1: STORE - .2, size: 44 });
  bubble("Sold out?!<br>It’s a <b>Saturday!</b>", { left: 460, top: 880, w: 520, tail: 140, t0: R3, t1: HOME - .3 });
  bubble("I got… <b>peas.</b> 🟢", { left: 330, top: 940, w: 460, tail: 100, t0: R4, t1: J2 - .2, italic: true });
  bubble("Peas in a Negroni.<br>Honestly? <b>Not bad.</b>", { left: 400, top: 760, w: 600, tail: 460, t0: J2, t1: STAMP, size: 44 });
  E.clip(R1 + .05, "voices/sk74/r1.wav", { vol: 1.5 }); E.clip(J1 + .05, "voices/sk74/j1.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk74/r2.wav", { vol: 1.5 });
  E.clip(R3 + .05, "voices/sk74/r3.wav", { vol: 1.5 }); E.clip(R4 + .05, "voices/sk74/r4.wav", { vol: 1.6 }); E.clip(J2 + .05, "voices/sk74/j2.wav", { vol: 1.5 });
  E.music({ bpm: 110, root: 62, seed: 74, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: STORE });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:640px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "NOBODY BUYS<br>ENOUGH ICE.", STAMP, { size: 96, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "The *ice* math.", { size: 72, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
