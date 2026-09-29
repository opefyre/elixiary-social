// SK.64 "2 AM philosophy." — a takeaway shop, 02:47. Alex holds up a single chip and stares into the middle distance: "Do
// you ever think… we're all just… ice cubes?" Rico, mid-kebab: "…What?" "We start solid. And then life… melts us." Rico's
// eyes fill up: "…Bro." The cook leans over the counter, knife down, lip trembling: "He's right." "And the drink… is the
// universe." Choir. Three grown men, crying at 2:51 AM. The door: Nina, sober, water bottle: "…It's a kebab shop."
// 2 AM PHILOSOPHY.  Voices: ElevenLabs (Alex; Rico: Liam; cook: Bill; Nina: Sarah).
export const meta = {
  id: "sk64-2am-philosophy",
  images: { shop: "bg/kebab.jpg", alex: "cutouts/alex_fry.webp", rico: "cutouts/rico_tear.webp", cook: "cutouts/cook_tear.webp", nina: "cutouts/nina_water.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  const A1 = .6, R1 = 4.1, A2 = 5.2, R2 = 9.0, C1 = 10.2, A3 = 11.6, CRY = 14.2, NINA = 16.6, N1 = 17.2, STAMP = 18.9, DUR = 22.2;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("shop", 0, DUR, "dark"); E.cur = S; const R = S.el;

  const bg = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "shop", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 45%");
  E.F(t => { bgI.style.transform = `scale(${1.04 + seg(t, 0, NINA) * .08})`; });
  const flick = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:#000;opacity:0;pointer-events:none;z-index:1");
  E.F(t => { flick.style.opacity = (Math.floor(t * 10) % 31 === 0) ? .3 : 0; });
  // the "profound" vignette + light rays that grow with every line
  const rays = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:2;pointer-events:none;background:repeating-conic-gradient(from 0deg at 50% 30%,rgba(255,240,190,.10) 0 6deg,rgba(255,240,190,0) 6deg 18deg);mix-blend-mode:screen");
  E.F(t => { const p = t < NINA ? seg(t, A2, CRY - A2) : 0; rays.style.opacity = p; rays.style.transform = `rotate(${t * 6}deg) scale(1.6)`; });
  const clk = E.el(R, "abs", `left:40px;top:360px;padding:10px 22px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:40px;z-index:8;font-variant-numeric:tabular-nums`);
  E.F(t => { const m = 47 + Math.floor(seg(t, 0, DUR) * 6); const h = `🌙 02:${String(m).padStart(2, "0")}`; if (clk.textContent !== h) clk.textContent = h; });

  // ================= the cook (behind the counter), Alex (left), Rico (right) =================
  const CH = 760, CW = CH * 678 / 883;
  const cook = E.el(R, "abs", `left:${560 - CW / 2}px;top:${1250 - CH}px;width:${CW}px;height:${CH}px;z-index:2;opacity:0`);
  const coIn = E.el(cook, "abs", `left:0;top:0;width:${CW}px;height:${CH}px;transform-origin:50% 100%`);
  E.img(coIn, "cook", `width:${CW}px;height:${CH}px`);
  E.K(cook, "o", [[C1 - .6, 0], [C1 - .4, 1]]); E.K(cook, "y", [[C1 - .6, 200], [C1 - .1, 0, "out"]]);
  const AH = 1000, AW = AH * 661 / 964, RH = 980, RW = RH * 688 / 960;
  const alex = E.el(R, "abs", `left:${270 - AW / 2}px;top:${1990 - AH}px;width:${AW}px;height:${AH}px;z-index:4`);
  const aIn = E.el(alex, "abs", `left:0;top:0;width:${AW}px;height:${AH}px;transform-origin:50% 100%`);
  E.img(aIn, "alex", `width:${AW}px;height:${AH}px`);
  const rico = E.el(R, "abs", `left:${820 - RW / 2}px;top:${1990 - RH}px;width:${RW}px;height:${RH}px;z-index:4`);
  const rIn = E.el(rico, "abs", `left:0;top:0;width:${RW}px;height:${RH}px;transform-origin:50% 100%`);
  E.img(rIn, "rico", `width:${RW}px;height:${RH}px`);
  E.F(t => {
    const sob = t >= CRY && t < NINA + 1 ? Math.sin(t * 22) * 2 : 0;
    aIn.style.transform = `translateY(${Math.sin(t * 1.2) * 4 + sob}px) rotate(${Math.sin(t * .8) * 1.5}deg)`;
    rIn.style.transform = `translateY(${Math.sin(t * 1.5 + 1) * 4 + sob}px) rotate(${t >= R2 ? -3 : 0}deg)`;
    coIn.style.transform = `translateY(${sob}px) rotate(${Math.sin(t * 1.1) * 1}deg)`;
  });
  // tears + a mini choir of emotion
  const tears = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:5;pointer-events:none");
  const TS = Array.from({ length: 12 }, (_, i) => E.el(tears, "abs", `left:${[330, 800, 560][i % 3] + (i % 2) * 30}px;top:${[1100, 1110, 700][i % 3]}px;font-size:40px;opacity:0`, "💧"));
  E.F(t => TS.forEach((s, i) => { const p = ((t - CRY - i * .15) % 1.2) / 1.2; s.style.opacity = t >= CRY + i * .15 && t < NINA + 1 ? 1 - p : 0; s.style.transform = `translateY(${p * 220}px)`; }));
  E.clip(A3 + 1.2, "sfx/angel-choir.wav", { vol: .4, to: NINA - A3 - 1 });
  const chip = (html, t0, t1, top) => { const c = E.el(R, "abs", `left:40px;top:${top}px;padding:10px 20px;border-radius:16px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:36px;z-index:8;opacity:0;white-space:nowrap`, html); E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .3, 1, "back"]]); E.S(t0, "pop", .35); };
  chip("🧠 IQ right now: 400", A2 + 1.4, NINA, 450);
  chip("😭 grown men crying: 3", CRY + .3, NINA, 524);
  // Nina at the door
  const NH = 820, NW = NH * 768 / 1137;
  const nina = E.el(R, "abs", `left:${540 - NW / 2}px;top:${1990 - NH}px;width:${NW}px;height:${NH}px;z-index:6;opacity:0`);
  E.img(nina, "nina", `width:${NW}px;height:${NH}px`);
  E.K(nina, "o", [[NINA, 0], [NINA + .1, 1]]); E.K(alex, "x", [[NINA, 0], [NINA + .4, -150, "out"]]); E.K(rico, "x", [[NINA, 0], [NINA + .4, 170, "out"]]); E.K(nina, "x", [[NINA, 700], [NINA + .4, 0, "out"]]);
  const dim = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:5;pointer-events:none;background:rgba(0,0,0,.35);opacity:0");
  E.K(dim, "o", [[NINA, 0], [NINA + .2, 1]]);
  E.clip(NINA - .2, "sfx/doorbell.wav", { vol: .5 }); E.clip(NINA, "sfx/record-silence.wav", { vol: .6 });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const aq = { left: 40, top: 700, w: 560, tail: 230, dark: true, italic: true, size: 46 };
  bubble("Do you ever think…<br>we’re all just…<br>ice cubes? 🧊", { ...aq, t0: A1, t1: R1 - .05 });
  bubble("…What?", { left: 640, top: 800, w: 280, tail: 160, t0: R1, t1: A2 });
  bubble("We start solid.<br>And then life…<br>melts us. 💧", { ...aq, t0: A2, t1: R2 - .05 });
  bubble("…Bro. 🥹", { left: 640, top: 800, w: 280, tail: 160, t0: R2, t1: C1 + .6 });
  bubble("He’s right. 😢", { left: 440, top: 420, w: 400, tail: 200, t0: C1, t1: A3 });
  bubble("And the drink…<br>is the universe. 🌌", { ...aq, t0: A3, t1: CRY + 1 });
  bubble("…It’s a<br>kebab shop.", { left: 320, top: 930, w: 440, tail: 220, t0: N1, t1: DUR, size: 54 });
  E.clip(A1 + .05, "voices/sk64/a1.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk64/r1.wav", { vol: 1.6 }); E.clip(A2 + .05, "voices/sk64/a2.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk64/r2.wav", { vol: 1.6 });
  E.clip(C1 + .05, "voices/sk64/c1.wav", { vol: 1.6 }); E.clip(A3 + .05, "voices/sk64/a3.wav", { vol: 1.5 }); E.clip(N1 + .05, "voices/sk64/n1.wav", { vol: 1.6 });
  E.music({ bpm: 70, root: 55, seed: 64, prog: [[0, 3, 7], [8, 12, 15], [5, 8, 12], [7, 11, 14]], until: NINA });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1720px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "2 AM PHILOSOPHY.", STAMP, { size: 88, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "Deep talks at *2 AM.*", { size: 66, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
