// SK.53 "The designated driver." — Nina, sober, water bottle in the cup holder: "Don't worry, I'll drive!" The car at 1 AM,
// streetlights sweeping through, the DD LOG ticking: same story heard ×3, hugs ×11, phones collected 2, shoes 1. "This is my
// soooong!" (off-key). "Can we get nuggets?" (+20 min detour). "I love you, man!" Drop-offs one by one until the car is
// empty. She breathes out… the rear-view mirror: a stranger in the back seat taking a selfie. "…Who are you?" — "Gary."
// Voices: ElevenLabs (Nina: Sarah; Alex; Jessica; Rico: Liam; Gary: Bill).
export const meta = {
  id: "sk53-designated-driver",
  images: { nina: "cutouts/nina_water.webp", ninaq: "cutouts/nina_order.webp", rico: "cutouts/friend_flip.webp", jess: "cutouts/cust_ask.webp", alex: "cutouts/guy_love.webp", gary: "cutouts/tourist_selfie.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", MINT = "#8ee3c8";
  E.episode(-16);
  const N1 = .5, IN = 1.9, A1 = 3.4, J1 = 7.1, R1 = 9.3, DROP1 = 11.4, DROP2 = 12.6, DROP3 = 13.8, SIGH = 15.0, MIRROR = 15.8, N2 = 16.4, G1 = 17.9, STAMP = 19.3, DUR = 22.6;
  E.music({ bpm: 100, root: 57, seed: 53, prog: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], until: SIGH });
  const S = E.scene("car", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);

  // ================= the car at night (seen through the windscreen) =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#0a0e1c,#141a2e 60%,#0a0c14)");
  // streetlights sweeping across
  const sweep = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6;pointer-events:none");
  E.F(t => { const u = (t * .7) % 1; sweep.style.background = `linear-gradient(100deg,rgba(255,200,120,0) ${u * 140 - 40}%,rgba(255,200,120,.16) ${u * 140 - 20}%,rgba(255,200,120,0) ${u * 140}%)`; });
  // the interior: back seat, front seats
  E.el(R, "abs", "left:0;top:760px;width:1080px;height:600px;background:#1c1a22;border-radius:60px 60px 0 0");
  E.el(R, "abs", "left:30px;top:800px;width:1020px;height:520px;border-radius:50px;background:linear-gradient(180deg,#2a2630,#1e1b24)");
  // the passengers (back row + front passenger), each leaves at their drop-off
  const pax = (name, w, h, H, cx, top, t1, z = 2, flip = false) => {
    const W = H * w / h;
    const p = E.el(R, "abs", `left:${cx - W / 2}px;top:${top}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const pIn = E.el(p, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`);
    E.img(pIn, name, `width:${W}px;height:${H}px;${flip ? "transform:scaleX(-1)" : ""}`);
    E.K(p, "o", [[IN, 0], [IN + .1, 1], [t1 - .15, 1], [t1, 0]]); E.K(p, "y", [[IN, 200], [IN + .4, 0, "out"]]);
    E.F(t => { pIn.style.transform = `translateY(${Math.sin(t * 7 + cx) * 4}px) rotate(${Math.sin(t * 3.1 + cx) * 3}deg)`; });
    E.S(t1, "swish", .45);
    return p;
  };
  pax("jess", 718, 1113, 640, 250, 720, DROP1);
  pax("alex", 805, 1123, 640, 560, 720, DROP2);
  pax("rico", 809, 1053, 660, 850, 700, DROP3);
  // front seats + dashboard
  E.el(R, "abs", "left:-40px;top:1300px;width:560px;height:420px;border-radius:60px 60px 0 0;background:#262230;z-index:3");
  E.el(R, "abs", "left:560px;top:1300px;width:560px;height:420px;border-radius:60px 60px 0 0;background:#262230;z-index:3");
  const NH = 820;
  const nina = E.el(R, "abs", `left:${270 - NH * 768 / 1137 / 2}px;top:${1880 - NH}px;width:${NH * 768 / 1137}px;height:${NH}px;z-index:4`);
  const nIn = E.el(nina, "abs", `left:0;top:0;width:${NH * 768 / 1137}px;height:${NH}px`);
  const nW = E.img(nIn, "nina", `position:absolute;left:0;top:0;width:${NH * 768 / 1137}px;height:${NH}px`);
  const nQ = E.img(nIn, "ninaq", `position:absolute;left:0;top:0;width:${NH * 846 / 1164}px;height:${NH}px`);
  E.F(t => { const q = t < IN || (t >= N2 - .2 && t < G1 + 1.5); nW.style.opacity = q ? 0 : 1; nQ.style.opacity = q ? 1 : 0; nIn.style.transform = `translateY(${Math.sin(t * 1.4) * 2}px)`; });
  E.el(R, "abs", "left:-20px;top:1700px;width:1120px;height:220px;z-index:5;background:linear-gradient(180deg,#34303c,#1a1820);border-radius:40px 40px 0 0");
  const wheel = E.el(R, "abs", "left:110px;top:1600px;width:320px;height:320px;z-index:6");
  wheel.innerHTML = `<svg viewBox="0 0 320 320" width="320" height="320"><circle cx="160" cy="160" r="140" fill="none" stroke="#0e0c12" stroke-width="30"/><circle cx="160" cy="160" r="44" fill="#1a1820"/><path d="M40 170 H116 M204 170 H280 M160 204 V290" stroke="#0e0c12" stroke-width="24"/></svg>`;
  E.F(t => { wheel.style.transform = `rotate(${Math.sin(t * .9) * 10}deg)`; });
  const bottle = E.el(R, "abs", "left:560px;top:1730px;width:60px;height:150px;z-index:6");
  bottle.innerHTML = `<svg viewBox="0 0 60 150" width="60" height="150"><rect x="8" y="30" width="44" height="120" rx="12" fill="rgba(160,210,255,.7)" stroke="#fff" stroke-width="3"/><rect x="16" y="6" width="28" height="26" rx="6" fill="#2f7bf6"/></svg>`;
  // the rear-view mirror (Gary appears in it)
  const mirror = E.el(R, "abs", "left:600px;top:420px;width:420px;height:180px;border-radius:40px;background:#0a0a10;box-shadow:0 0 0 10px #2a2830;z-index:7;overflow:hidden");
  E.el(R, "abs", "left:800px;top:380px;width:20px;height:50px;background:#2a2830;z-index:6");
  const mScene = E.el(mirror, "abs", "left:0;top:0;width:420px;height:180px;background:linear-gradient(180deg,#1e1a26,#2a2630);opacity:0");
  E.img(mScene, "gary", "position:absolute;left:120px;top:-10px;width:180px;height:auto;transform:scaleX(-1)");
  E.K(mScene, "o", [[MIRROR, 0], [MIRROR + .15, 1]]);
  E.K(mirror, "s", [[MIRROR, 1], [MIRROR + .4, 1.5, "out"]]); mirror.style.transformOrigin = "60% 30%";
  E.clip(MIRROR, "sfx/elx-braam.wav", { vol: .4 }); E.clip(G1 + .9, "sfx/elx-camera-shutter.wav", { vol: .8 }); E.flash(G1 + .9, "#ffffff", .4, .12);

  // ================= the DD log =================
  const log = E.el(R, "abs", "left:40px;top:360px;width:520px;padding:18px 24px;border-radius:24px;background:rgba(255,255,255,.95);box-shadow:0 18px 40px rgba(0,0,0,.35);z-index:8;opacity:0");
  E.el(log, "", `font-weight:900;font-size:30px;letter-spacing:.12em;color:${CORAL};margin-bottom:6px`, "🚗 DD LOG · 01:07");
  const rows = [["🔁 same story heard", [[A1 + .5, 1], [J1, 2], [R1 + .6, 3]]], ["🤗 hugs received", [[IN + .5, 2], [A1 + 1, 5], [R1 + .3, 9], [DROP3, 11]]], ["📱 phones collected", [[J1 + .5, 1], [DROP1, 2]]], ["👟 shoes", [[DROP2, 1]]]];
  const rEls = rows.map(([lab]) => { const r = E.el(log, "", `display:flex;justify-content:space-between;font-size:34px;line-height:1.45;color:${INK}`); E.el(r, "", "font-weight:700", lab); return E.el(r, "", "font-weight:900;font-variant-numeric:tabular-nums", "0"); });
  E.K(log, "o", [[IN + .3, 0], [IN + .5, 1], [SIGH, 1], [SIGH + .3, 0]]);
  E.F(t => rows.forEach(([, steps], i) => { const v = String(at([[0, 0], ...steps], t)); if (rEls[i].textContent !== v) rEls[i].textContent = v; }));
  const detour = E.el(R, "abs", `left:40px;top:640px;padding:8px 20px;border-radius:14px;background:${GOLD};color:${INK};font-weight:900;font-size:36px;z-index:8;opacity:0`, "🍗 detour: +20 min");
  E.K(detour, "o", [[J1 + 1.2, 0], [J1 + 1.3, 1], [R1, 1], [R1 + .2, 0]]);
  const drops = E.el(R, "abs", `left:40px;top:640px;padding:8px 20px;border-radius:14px;background:${MINT};color:${INK};font-weight:900;font-size:36px;z-index:8;opacity:0`);
  E.K(drops, "o", [[DROP1, 0], [DROP1 + .1, 1], [SIGH, 1], [SIGH + .2, 0]]);
  E.F(t => { const n = [DROP1, DROP2, DROP3].filter(k => t >= k).length; const m = 130 + n * 17; drops.textContent = `🏠 dropped off: ${n}/3 · 0${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`; });
  const notes = E.el(R, "abs", "left:500px;top:600px;font-size:60px;z-index:8;opacity:0", "🎵 🎶 🎵");
  E.K(notes, "o", [[A1, 0], [A1 + .1, 1], [J1 - .2, 1], [J1, 0]]); E.F(t => { notes.style.transform = `translateY(${Math.sin(t * 6) * 16}px) rotate(${Math.sin(t * 4) * 12}deg)`; });
  const relief = E.el(R, "abs", `left:0;top:1000px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 24px;border-radius:16px;background:rgba(20,35,29,.9);color:#fff;font-weight:900;font-size:44px">😮‍💨 finally. silence.</span>`);
  E.K(relief, "o", [[SIGH, 0], [SIGH + .2, 1], [MIRROR, 1], [MIRROR + .2, 0]]);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 52, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Don’t worry,<br>I’ll drive! 🚗", { left: 40, top: 1000, w: 460, tail: 220, t0: N1, t1: IN });
  bubble("This is my<br>soooong! 🎤", { left: 380, top: 480, w: 420, tail: 180, t0: A1, t1: J1 - .1 });
  bubble("Can we get<br>nuggets? 🥺", { left: 60, top: 480, w: 400, tail: 180, t0: J1, t1: R1 - .1 });
  bubble("I love you,<br>man! 🥹", { left: 620, top: 460, w: 400, tail: 230, t0: R1, t1: DROP1 });
  bubble("…Who are you?", { left: 40, top: 1080, w: 460, tail: 220, t0: N2, t1: STAMP, italic: true });
  bubble("Gary. ✌️", { left: 560, top: 700, w: 320, tail: 160, t0: G1, t1: DUR, dark: true, size: 60 });
  E.clip(N1 + .05, "voices/sk53/n1.wav", { vol: 1.5 }); E.clip(A1 + .05, "voices/sk53/a1.wav", { vol: 1.4 }); E.clip(J1 + .05, "voices/sk53/j1.wav", { vol: 1.5 });
  E.clip(R1 + .05, "voices/sk53/r1.wav", { vol: 1.5 }); E.clip(N2 + .05, "voices/sk53/n2.wav", { vol: 1.6 }); E.clip(G1 + .05, "voices/sk53/g1.wav", { vol: 1.7 });
  [DROP1, DROP2, DROP3].forEach(t => E.S(t, "creak", .4));
  E.clip(IN, "sfx/elx-cabin-hum.wav", { vol: .25, to: DUR - IN, duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1000px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "DRIVER. MUM. TAXI FOR GARY.", STAMP, { size: 58, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The *designated driver.*", { size: 64, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, A1, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
