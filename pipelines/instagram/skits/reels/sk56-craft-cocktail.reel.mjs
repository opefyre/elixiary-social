// SK.56 "The craft cocktail bar." — a speakeasy. "Hi! Can I get an old fashioned?" The mixologist (handlebar moustache, man
// bun): "Of course. Give me… eleven minutes." The ritual, with a stopwatch racing to 11:04: hand-carving the ice, the smoke
// gun ("cedar, emotionally"), flaming the orange peel, ONE petal placed with tweezers, letting it rest, photographing it. €24.
// He drinks it in one sip. "…Another one, please." The mixologist, devastated: "…Excuse me?" 11 MINUTES. 1 SIP.
// Voices: ElevenLabs (customer: Alex; mixologist: Charlie).
export const meta = {
  id: "sk56-craft-cocktail",
  images: { bar: "bg/speakeasy.jpg", tweeze: "cutouts/mix_tweezers.webp", shock: "cutouts/mix_shock.webp", ask: "cutouts/guy_order.webp", stare: "cutouts/guy_stare.webp", sip: "cutouts/guy_sip.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  const C1 = .5, M1 = 2.2, RIT = 5.2, STEP = 1.3, SERVE = 13.2, GULP = 14.0, C2 = 14.9, SHOCK = 16.2, M2 = 16.4, STAMP = 17.8, DUR = 21.0;
  E.music({ bpm: 84, root: 55, seed: 56, prog: [[0, 3, 7], [5, 8, 12], [3, 7, 10], [7, 10, 14]], until: GULP });
  const S = E.scene("speakeasy", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);

  const bg = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "bar", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 60%");
  E.F(t => { bgI.style.transform = `scale(${1.04 + t * .003})`; });
  // the mixologist, behind the bar (centre-right)
  const MH = 900, TW = MH * 676 / 1012, SW = MH * 570 / 1008;
  const mix = E.el(R, "abs", `left:${650 - TW / 2}px;top:${1330 - MH}px;width:${TW}px;height:${MH}px;z-index:2`);
  const mIn = E.el(mix, "abs", `left:0;top:0;width:${TW}px;height:${MH}px;transform-origin:50% 100%`);
  const mT = E.img(mIn, "tweeze", `position:absolute;left:0;top:0;width:${TW}px;height:${MH}px`);
  const mS = E.img(mIn, "shock", `position:absolute;left:${(TW - SW) / 2}px;top:0;width:${SW}px;height:${MH}px`);
  E.F(t => { const s = t >= SHOCK; mT.style.opacity = s ? 0 : 1; mS.style.opacity = s ? 1 : 0; let y = Math.sin(t * 1.2) * 2; if (t >= SHOCK && t < SHOCK + .25) y -= Math.sin((t - SHOCK) / .25 * Math.PI) * 24; mIn.style.transform = `translateY(${y}px) rotate(${t >= SHOCK + 1.2 ? Math.min(8, (t - SHOCK - 1.2) * 12) : 0}deg)`; });
  // a bar-top overlay so he stands behind the counter
  E.el(R, "abs", "left:-20px;top:1300px;width:1120px;height:120px;z-index:3;background:linear-gradient(180deg,rgba(40,40,44,.0),rgba(30,28,32,.85) 40%,rgba(22,20,24,.95))");
  // the customer (front left)
  const CH = 860;
  const cust = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:4");
  const cIn = E.el(cust, "abs", "left:0;top:0;width:1080px;height:1920px");
  const P = { ask: [872, 1121], stare: [873, 1030], sip: [872, 1040] };
  const cEls = Object.fromEntries(Object.entries(P).map(([n, [w, h]]) => [n, E.img(cIn, n, `position:absolute;left:${260 - CH * w / h / 2}px;top:${1960 - CH}px;width:${CH * w / h}px;height:${CH}px`)]));
  const CP = [[0, "ask"], [M1 + .6, "stare"], [GULP - .1, "sip"], [C2 + 1.0, "ask"]];
  E.F(t => { const f = at(CP, t); for (const n in cEls) cEls[n].style.opacity = n === f ? 1 : 0; let y = Math.sin(t * 1.8) * 3; if (t >= RIT && t < SERVE) y += Math.sin(t * .8) * 6; cIn.style.transform = `translateY(${y}px)`; });

  // ================= the ritual =================
  const clock = E.el(R, "abs", `left:40px;top:360px;padding:12px 26px;border-radius:18px;background:rgba(10,8,12,.85);border:3px solid ${GOLD};color:${GOLD};font-family:'Courier New',monospace;font-weight:900;font-size:60px;z-index:8;opacity:0;font-variant-numeric:tabular-nums`);
  E.K(clock, "o", [[RIT - .3, 0], [RIT - .1, 1], [SHOCK + 1.4, 1], [SHOCK + 1.6, 0]]);
  E.F(t => { const s = Math.round(664 * seg(t, RIT, SERVE - RIT)); clock.textContent = `⏱ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; });
  const STEPS = ["🧊 hand-carving the ice", "💨 smoke gun · cedar · “emotionally”", "🔥 flaming the orange peel", "🌸 ONE petal, with tweezers", "🙏 letting it… rest", "📸 photographing it"];
  STEPS.forEach((txt, i) => {
    const t0 = RIT + i * STEP;
    const c = E.el(R, "abs", `left:40px;top:${470 + (i % 3) * 78}px;padding:10px 22px;border-radius:16px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:38px;z-index:8;opacity:0;white-space:nowrap`, `${i + 1}. ${txt}`);
    E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t0 + STEP * 3 - .1, 1], [t0 + STEP * 3, 0]]); E.K(c, "x", [[t0, -40], [t0 + .3, 0, "out"]]); E.S(t0, "tick", .6);
  });
  // effects for each step
  const smoke = E.el(R, "abs", "left:520px;top:920px;width:340px;height:360px;z-index:3;opacity:0;background:radial-gradient(ellipse at 50% 70%,rgba(220,220,230,.55),rgba(220,220,230,0) 70%);filter:blur(8px)");
  E.K(smoke, "o", [[RIT + STEP, 0], [RIT + STEP + .3, 1], [RIT + STEP * 2.6, 0]]); E.F(t => { smoke.style.transform = `translateY(${-(t - RIT) * 30}px) scale(${1 + Math.sin(t * 3) * .1})`; });
  E.clip(RIT + STEP, "sfx/elx-espresso-steam.wav", { vol: .5, to: 1.4 });
  E.flash(RIT + STEP * 2 + .3, "#ffb040", .45, .25); E.S(RIT + STEP * 2 + .3, "whoosh", .6);
  E.clip(RIT, "sfx/elx-ice-clink.wav", { vol: .5, to: .9 }); E.clip(RIT + STEP * 5 + .2, "sfx/elx-camera-shutter.wav", { vol: .8 }); E.flash(RIT + STEP * 5 + .2, "#ffffff", .4, .12);
  // the drink, served
  const drink = E.el(R, "abs", "left:520px;top:1180px;width:130px;height:150px;z-index:5;opacity:0");
  drink.innerHTML = `<svg viewBox="0 0 130 150" width="130" height="150"><path d="M10 10 H120 L108 146 H22 Z" fill="rgba(255,255,255,.25)" stroke="rgba(255,255,255,.8)" stroke-width="4"/><path id="liq" d="M16 50 H114 L108 146 H22 Z" fill="rgba(200,110,40,.9)"/><rect x="40" y="62" width="50" height="50" rx="8" fill="rgba(230,245,255,.8)"/><circle cx="92" cy="40" r="10" fill="#ff8ab0"/></svg>`;
  const liq = drink.querySelector("#liq");
  E.K(drink, "o", [[SERVE, 0], [SERVE + .1, 1]]); E.K(drink, "x", [[SERVE, 300], [SERVE + .4, 0, "out"]]); E.S(SERVE, "swish", .5);
  E.F(t => { liq.style.opacity = t >= GULP + .2 ? 0 : 1; });
  const price = E.el(R, "abs", `left:680px;top:1200px;padding:8px 18px;border-radius:14px;background:${GOLD};color:${INK};font-weight:900;font-size:40px;z-index:8;opacity:0`, "€24");
  E.K(price, "o", [[SERVE + .3, 0], [SERVE + .4, 1], [SHOCK, 1], [SHOCK + .2, 0]]);
  E.clip(GULP, "sfx/elx-slurp-empty.wav", { vol: .9, to: .6 });
  const oneSip = E.el(R, "abs", `left:0;top:760px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 26px;border-radius:18px;background:${CORAL};color:#fff;font-weight:900;font-size:48px">⏱ drinking time: 0.8 s</span>`);
  E.K(oneSip, "o", [[GULP + .5, 0], [GULP + .6, 1], [SHOCK, 1], [SHOCK + .2, 0]]);
  E.clip(SHOCK + .3, "sfx/elx-glass-clink.wav", { vol: .6, to: .6 }); E.S(SHOCK + 1.4, "thud", .8);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Hi! Can I get an<br>old fashioned?", { left: 40, top: 1000, w: 480, tail: 220, t0: C1, t1: M1 - .05 });
  bubble("Of course. Give me…<br>eleven minutes. 🧐", { left: 440, top: 380, w: 600, tail: 260, t0: M1, t1: RIT - .2, dark: true, italic: true });
  bubble("…Another one,<br>please. 🙂", { left: 40, top: 1000, w: 440, tail: 220, t0: C2, t1: SHOCK + 1.2 });
  bubble("…Excuse me?", { left: 560, top: 380, w: 420, tail: 150, t0: M2, t1: DUR, dark: true, italic: true, size: 56 });
  E.clip(C1 + .05, "voices/sk56/c1.wav", { vol: 1.5 }); E.clip(M1 + .05, "voices/sk56/m1.wav", { vol: 1.5 }); E.clip(C2 + .05, "voices/sk56/c2.wav", { vol: 1.5 }); E.clip(M2 + .05, "voices/sk56/m2.wav", { vol: 1.6 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-lounge.wav", { vol: .2, to: Math.min(6, DUR - t), duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1540px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "11 MINUTES. 1 SIP.", STAMP, { size: 88, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The *craft cocktail* bar.", { size: 62, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, M1 + .8, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
