// SK.65 "Opening the champagne at midnight." (New Year's Eve) — 23:59:50, the countdown starts. Alex, party hat on, bottle
// between his knees: "I got it, I got it!" TEN! NINE! EIGHT! SEVEN! … the cork doesn't move. ZERO: "HAPPY NEW YEAR!" —
// confetti, fireworks on the TV, everyone cheering. Alex, purple: "Come on… come on!" Time-lapse: 00:12 … 00:31 … 00:47. The
// party's over: the guests asleep on the sofa. Alex: "…Almost." — POP. The cork ricochets off the ceiling and takes out
// the lamp. Darkness. Champagne everywhere. A sleepy voice from the sofa: "…Happy New Year." EVERY. SINGLE. YEAR.
// Voices: ElevenLabs (Alex; countdown: Jessica; cheer: Sarah; Grandpa: Bill).
export const meta = {
  id: "sk65-new-year-champagne",
  images: { room: "bg/nye.jpg", cork: "cutouts/alex_cork.webp", spray: "cutouts/alex_spray.webp", crowd: "cutouts/crowd_hands.webp", asleep: "cutouts/parents_asleep.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  const A1 = .5, CD = 1.8, ZERO = 6.2, A2 = 8.4, LAPSE = 10.4, SLEEP = 12.8, POP = 14.6, DARK = 15.3, G1 = 15.9, A3 = 17.0, STAMP = 18.2, DUR = 21.2;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("nye", 0, DUR, "dark"); E.cur = S; const R = S.el;

  const bg = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "room", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 55%");
  E.F(t => { bgI.style.transform = `scale(${1.04 + seg(t, 0, POP) * .05})`; bgI.style.filter = t >= SLEEP && t < POP ? "brightness(.75) saturate(.7)" : "none"; });
  // TV fireworks flashes at midnight
  const tvGlow = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:1;pointer-events:none;mix-blend-mode:screen");
  E.F(t => { if (t >= ZERO && t < LAPSE) { const h = (t * 200) % 360; tvGlow.style.background = `radial-gradient(ellipse 600px 500px at 50% 25%,hsla(${h},90%,60%,${.25 + Math.abs(Math.sin(t * 9)) * .25}),transparent 70%)`; } else tvGlow.style.background = "none"; });
  // the clock
  const clk = E.el(R, "abs", `left:40px;top:360px;padding:12px 26px;border-radius:18px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:48px;z-index:8;font-variant-numeric:tabular-nums;font-family:'Courier New',monospace`);
  E.F(t => {
    let s;
    if (t < CD) s = -10; else if (t < ZERO) s = -10 + Math.floor((t - CD) / ((ZERO - CD) / 10)); else if (t < LAPSE) s = Math.floor((t - ZERO) * 1.5); else s = Math.round(47 * 60 + (t - LAPSE) * 20);
    const tot = s < 0 ? 24 * 3600 + s : s; const hh = Math.floor(tot / 3600) % 24, mm = Math.floor(tot % 3600 / 60), ss = Math.floor(tot % 60);
    const h = `🕛 ${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`; if (clk.textContent !== h) clk.textContent = h;
    clk.style.color = t >= ZERO && t < LAPSE ? GOLD : "#fff";
  });
  // big countdown numbers
  const big = E.el(R, "abs", `left:0;top:560px;width:1080px;text-align:center;font-weight:900;font-size:260px;color:#fff;z-index:7;text-shadow:0 10px 40px rgba(0,0,0,.6);opacity:0`);
  E.F(t => { if (t >= CD && t < ZERO) { const n = 10 - Math.floor((t - CD) / ((ZERO - CD) / 10)); const p = ((t - CD) % ((ZERO - CD) / 10)) / ((ZERO - CD) / 10); big.textContent = n; big.style.opacity = 1 - p * .6; big.style.transform = `scale(${1.3 - p * .3})`; } else if (t >= ZERO && t < ZERO + 1.6) { big.innerHTML = "🎆"; big.style.opacity = 1; big.style.transform = `scale(${1 + (t - ZERO) * .3})`; } else big.style.opacity = 0; });
  for (let i = 0; i < 10; i++) E.S(CD + i * (ZERO - CD) / 10, "tick", .6);
  // the crowd cheering at midnight
  const crowd = E.el(R, "abs", "left:-40px;top:1300px;width:1160px;height:784px;z-index:3;opacity:0");
  const cIn = E.el(crowd, "abs", "left:0;top:0;width:1160px;height:784px;transform-origin:50% 100%");
  E.img(cIn, "crowd", "width:1160px;height:784px");
  E.K(crowd, "o", [[CD - .2, 0], [CD, 1], [LAPSE - .1, 1], [LAPSE, 0]]);
  E.F(t => { cIn.style.transform = t >= ZERO ? `translateY(${-Math.abs(Math.sin(t * 7)) * 30}px)` : `translateY(${Math.sin(t * 3) * 6}px)`; });
  // the guests asleep on the sofa
  const AH = 520, AW = AH * 989 / 687;
  const asleep = E.el(R, "abs", `left:${540 - AW / 2}px;top:${1330 - AH}px;width:${AW}px;height:${AH}px;z-index:2;opacity:0`);
  E.img(asleep, "asleep", `width:${AW}px;height:${AH}px`);
  E.K(asleep, "o", [[LAPSE + .6, 0], [LAPSE + .8, 1]]);
  const zzz = E.el(R, "abs", `left:620px;top:760px;font-size:70px;z-index:3;opacity:0;font-weight:900;color:#fff`, "💤");
  E.K(zzz, "o", [[SLEEP, 0], [SLEEP + .2, 1], [DARK, 1], [DARK + .1, 0]]); E.F(t => { zzz.style.transform = `translateY(${-((t * 30) % 60)}px)`; });
  E.clip(SLEEP, "sfx/elx-snore.wav", { vol: .4, to: POP - SLEEP });
  // confetti
  const conf = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6;pointer-events:none;opacity:0");
  conf.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920">${Array.from({ length: 60 }, (_, i) => `<rect class="cf" x="${(i * 97) % 1080}" y="0" width="14" height="22" fill="${["#ff5fa2", GOLD, "#ffffff", "#c0c0c0"][i % 4]}"/>`).join("")}</svg>`;
  const cfs = [...conf.querySelectorAll(".cf")];
  E.K(conf, "o", [[ZERO, 0], [ZERO + .1, 1], [LAPSE - .2, 1], [LAPSE, 0]]);
  E.F(t => { if (t < ZERO || t > LAPSE) return; cfs.forEach((c, i) => { const y = ((t - ZERO) * (260 + (i % 5) * 70) + i * 131) % 1920; c.setAttribute("y", y); }); });
  E.clip(ZERO, "sfx/applause-cheer.wav", { vol: .6, to: LAPSE - ZERO }); E.flash(ZERO, "#fff4c0", .6, .25);
  // time-lapse wipe
  E.wipeColors = [INK, GOLD]; E.wipe(LAPSE); E.clip(LAPSE - .3, "sfx/elx-trailer-whoosh.wav", { vol: .4 });
  const lapse = E.el(R, "abs", `left:0;top:560px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:12px 28px;border-radius:18px;background:${INK};color:#fff;font-weight:900;font-size:46px">⏩ 47 minutes later</span>`);
  E.K(lapse, "o", [[LAPSE + .3, 0], [LAPSE + .45, 1], [SLEEP + .8, 1], [SLEEP + 1, 0]]);

  // ================= Alex =================
  const XH = 1000, XW1 = XH * 573 / 976, XW2 = XH * 497 / 945;
  const alex = E.el(R, "abs", `left:${540 - XW1 / 2}px;top:${1990 - XH}px;width:${XW1}px;height:${XH}px;z-index:4`);
  const xIn = E.el(alex, "abs", `left:0;top:0;width:${XW1}px;height:${XH}px;transform-origin:50% 100%`);
  const xA = E.img(xIn, "cork", `position:absolute;left:0;top:0;width:${XW1}px;height:${XH}px`);
  const xB = E.img(xIn, "spray", `position:absolute;left:${(XW1 - XW2) / 2}px;top:0;width:${XW2}px;height:${XH}px`);
  E.K(alex, "x", [[LAPSE, 0], [LAPSE + .01, 170]]);
  E.F(t => { const p = t >= POP; xA.style.opacity = p ? 0 : 1; xB.style.opacity = p ? 1 : 0; const strain = !p ? Math.sin(t * 40) * (1 + seg(t, 0, POP) * 2) : 0; xIn.style.transform = `rotate(${strain}deg) translateY(${p && t < POP + .3 ? -30 : 0}px)`; });
  const face = E.el(R, "abs", `left:40px;top:450px;padding:10px 20px;border-radius:16px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:36px;z-index:8;opacity:0;white-space:nowrap`);
  E.K(face, "o", [[A2, 0], [A2 + .1, 1], [POP, 1], [POP + .1, 0]]);
  E.F(t => { const h = t >= SLEEP ? "🍾 attempt #212 · face: purple" : "🍾 attempt #37 · face: red"; if (face.textContent !== h) face.textContent = h; });
  for (let t = A2; t < POP; t += 1.3) E.S(t, "creak", .25);
  // POP: the cork flies, hits the ceiling, then the lamp
  const cork = E.el(R, "abs", "left:520px;top:1300px;width:60px;height:60px;border-radius:14px;background:#c8a070;z-index:9;opacity:0;box-shadow:0 0 0 4px #9a7040");
  E.K(cork, "o", [[POP, 0], [POP + .02, 1], [DARK, 1], [DARK + .02, 0]]);
  E.K(cork, "x", [[POP, 0], [POP + .25, 180, "out"], [POP + .55, 380, "in"]]); E.K(cork, "y", [[POP, 0], [POP + .25, -1150, "out"], [POP + .55, -700, "in"]]);
  E.F(t => { cork.style.transform = `rotate(${(t - POP) * 2000}deg)`; });
  E.clip(POP, "sfx/elx-foam-burst.wav", { vol: .8 }); E.S(POP, "crack", .9); E.S(POP + .25, "thud", .6); E.clip(POP + .55, "sfx/elx-glass-smash.wav", { vol: .8 }); E.shake(POP, 14, .3);
  const blackout = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:#05060a;z-index:9;opacity:0;pointer-events:none");
  E.K(blackout, "o", [[DARK, 0], [DARK + .05, .8]]);
  const spark = E.el(R, "abs", "left:880px;top:560px;font-size:90px;z-index:10;opacity:0", "💥");
  E.K(spark, "o", [[POP + .55, 0], [POP + .6, 1], [DARK + .2, 0]]);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false, z = 10 } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:${z};transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("I got it,<br>I got it! 💪", { left: 560, top: 820, w: 400, tail: 110, t0: A1, t1: CD + .8 });
  bubble("HAPPY NEW YEAR!!! 🥂", { left: 140, top: 820, w: 800, tail: 400, t0: ZERO, t1: A2 - .1, size: 60 });
  bubble("Come on…<br>come on! 😤", { left: 560, top: 820, w: 400, tail: 110, t0: A2, t1: LAPSE });
  bubble("…Happy New Year.", { left: 200, top: 1000, w: 520, tail: 260, t0: G1, t1: DUR, dark: true, italic: true, z: 12 });
  bubble("…Happy New Year?", { left: 380, top: 1300, w: 520, tail: 260, t0: A3, t1: DUR, italic: true, z: 12 });
  E.clip(A1 + .05, "voices/sk65/a1.wav", { vol: 1.5 }); E.clip(CD + .05, "voices/sk65/j1.wav", { vol: 1.3 }); E.clip(ZERO + .05, "voices/sk65/n1.wav", { vol: 1.4 });
  E.clip(A2 + .05, "voices/sk65/a2.wav", { vol: 1.5 }); E.clip(G1 + .05, "voices/sk65/g1.wav", { vol: 1.6 }); E.clip(A3 + .05, "voices/sk65/a3.wav", { vol: 1.6 });
  E.clip(0, "sfx/elx-party-music.wav", { vol: .28, to: 6, duck: true }); E.clip(6, "sfx/elx-party-music.wav", { vol: .28, to: LAPSE - 6, duck: true });
  E.music({ bpm: 118, root: 60, seed: 65, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: LAPSE });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:640px;width:1080px;display:flex;flex-direction:column;z-index:13");
  const st = E.stamp(stampBox, "EVERY. SINGLE. YEAR.", STAMP, { size: 84, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "Champagne at *midnight.*", { size: 64, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, CD + .6, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
