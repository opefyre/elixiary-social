// SK.67 "Something fruity, but not sweet." — the order every bartender knows. Sal: "What can I get you?" Jess, thinking:
// "Hmm. Something fruity… but not sweet." "Strong… but I don't want to taste the alcohol." "And pink. But not, like… pink
// pink." "Oh! And no ice." The order ticket fills with contradictions; Sal's eye starts to twitch. 17 bottles considered.
// He slides a glass across: she sips — "Oh my god. Ten out of ten! Can I get another?" Sal, to camera: "…Water. With a
// strawberry." €14. WATER. STRAWBERRY.  Voices: ElevenLabs (Sal: Chris; Jess: Jessica).
export const meta = {
  id: "sk67-fruity-not-sweet",
  images: { bar: "bg/speakeasy.jpg", think: "cutouts/cust_sweet.webp", ask: "cutouts/cust_ask.webp", sal: "cutouts/salc_wait.webp", twitch: "cutouts/sal_twitch.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", GREEN = "#2e9a55";
  E.episode(-16);
  const S1 = .5, J1 = 1.5, J2 = 5.1, J3 = 8.5, J4 = 11.7, TW = 12.8, MAKE = 13.4, SERVE = 16.0, J5 = 16.6, S2 = 20.2, STAMP = 21.8, DUR = 25.0;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const S = E.scene("bar", 0, DUR, "dark"); E.cur = S; const R = S.el;

  const bg = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "bar", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 60%");
  E.F(t => { bgI.style.transform = `scale(${1.04 + t * .003})`; });
  // Sal behind the bar (right)
  const SH = 860, SW1 = SH * 754 / 1104, SW2 = SH * 865 / 1133;
  const sal = E.el(R, "abs", `left:${780 - SW1 / 2}px;top:${1330 - SH}px;width:${SW1}px;height:${SH}px;z-index:2`);
  const sIn = E.el(sal, "abs", `left:0;top:0;width:${SW1}px;height:${SH}px;transform-origin:50% 100%`);
  const sA = E.img(sIn, "sal", `position:absolute;left:0;top:0;width:${SW1}px;height:${SH}px`);
  const sB = E.img(sIn, "twitch", `position:absolute;left:${(SW1 - SW2) / 2}px;top:0;width:${SW2}px;height:${SH}px`);
  E.F(t => { const tw = t >= TW && t < S2 - .1; sA.style.opacity = tw ? 0 : 1; sB.style.opacity = tw ? 1 : 0; let x = 0; if (t >= MAKE && t < SERVE) x = Math.sin(t * 9) * 120; sIn.style.transform = `translateX(${x}px) rotate(${tw && Math.floor(t * 3) % 2 ? Math.sin(t * 70) * 1.5 : 0}deg)`; });
  E.el(R, "abs", "left:-20px;top:1300px;width:1120px;height:120px;z-index:3;background:linear-gradient(180deg,rgba(40,40,44,0),rgba(30,28,32,.85) 40%,rgba(22,20,24,.95))");
  // Jess (front left)
  const JH = 900;
  const jess = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:4");
  const JP = { think: [821, 1140], ask: [718, 1113] };
  const jEls = Object.fromEntries(Object.entries(JP).map(([n, [w, h]]) => [n, E.img(jess, n, `position:absolute;left:${270 - JH * w / h / 2}px;top:${1990 - JH}px;width:${JH * w / h}px;height:${JH}px`)]));
  E.F(t => { const f = at([[0, "ask"], [J1, "think"], [J4, "ask"], [MAKE, "think"], [J5, "ask"]], t); for (const n in jEls) jEls[n].style.opacity = n === f ? 1 : 0; jess.style.transform = `translateY(${Math.sin(t * 1.7) * 4}px)`; });
  // the order ticket
  const ticket = E.el(R, "abs", `left:40px;top:440px;width:470px;padding:22px 26px 26px;box-sizing:border-box;background:#fffdf3;box-shadow:0 18px 40px rgba(0,0,0,.45);z-index:8;opacity:0;font-family:'Courier New',monospace;color:${INK};transform:rotate(-2deg)`);
  const LINES = [[J1 + 1.2, "✓ fruity"], [J1 + 2.4, "✗ sweet"], [J2 + 1.0, "✓ strong"], [J2 + 2.4, "✗ taste of alcohol"], [J3 + 1.0, "✓ pink"], [J3 + 2.4, "✗ “pink pink”"], [J4 + .8, "✗ ice"]];
  E.K(ticket, "o", [[J1 + 1.0, 0], [J1 + 1.2, 1], [MAKE, 1], [MAKE + .2, 0]]); E.K(ticket, "y", [[J1 + 1.0, -60], [J1 + 1.4, 0, "out"]]);
  E.F(t => { const h = `<div style="font-weight:900;font-size:30px;border-bottom:3px dashed #aaa;padding-bottom:8px;margin-bottom:8px">ORDER #214</div>` + LINES.filter(([k]) => t >= k).map(([, s]) => `<div style="font-size:34px;font-weight:700;color:${s[0] === "✓" ? GREEN : CORAL};line-height:1.35">${s}</div>`).join(""); if (ticket.__h !== h) { ticket.innerHTML = h; ticket.__h = h; } });
  LINES.forEach(([k]) => E.S(k, "scratch", .35));
  const chip = (html, t0, t1, top, bg = "rgba(255,255,255,.95)", fg = INK) => { const c = E.el(R, "abs", `left:40px;top:${top}px;padding:10px 20px;border-radius:16px;background:${bg};color:${fg};font-weight:900;font-size:36px;z-index:9;opacity:0;white-space:nowrap`, html); E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .3, 1, "back"]]); E.S(t0, "pop", .35); };
  chip("👁️ Sal’s eye: twitching", TW, SERVE, 450, CORAL, "#fff");
  chip("🧪 bottles considered: 17", MAKE + .6, SERVE, 524);
  chip("⏱ 2 minutes of theatre", MAKE + 1.3, SERVE, 598);
  // the making: shaker noises, bottle flashes
  E.clip(MAKE, "sfx/elx-ice-clink.wav", { vol: .5, to: .8 }); E.clip(MAKE + .8, "sfx/elx-muddle.wav", { vol: .5, to: .8 }); E.clip(MAKE + 1.6, "sfx/elx-pour-splash.wav", { vol: .5, to: .9 });
  const flashes = E.el(R, "abs", "left:600px;top:760px;font-size:90px;z-index:6;opacity:0");
  E.F(t => { if (t >= MAKE && t < SERVE) { flashes.style.opacity = 1; flashes.textContent = ["🍓", "🍋", "🍾", "🧂", "🌿", "🍒", "🥃"][Math.floor(t * 5) % 7]; flashes.style.transform = `rotate(${Math.sin(t * 12) * 20}deg)`; } else flashes.style.opacity = 0; });
  // the glass: water + one strawberry
  const glass = E.el(R, "abs", "left:470px;top:1150px;width:150px;height:190px;z-index:5;opacity:0");
  glass.innerHTML = `<svg viewBox="0 0 150 190" width="150" height="190"><path d="M18 10 H132 L118 186 H32 Z" fill="rgba(255,255,255,.22)" stroke="rgba(255,255,255,.9)" stroke-width="5"/><path id="lq" d="M24 50 H126 L118 186 H32 Z" fill="rgba(255,190,200,.35)"/><g transform="translate(112 18) rotate(20)"><path d="M0 0 Q22 -4 26 18 Q20 44 0 48 Q-20 44 -26 18 Q-22 -4 0 0 Z" fill="#e8283c"/><path d="M-12 -2 L0 -14 L12 -2 L0 4 Z" fill="#3a9a3a"/><circle cx="-8" cy="16" r="2" fill="#ffe08a"/><circle cx="6" cy="26" r="2" fill="#ffe08a"/><circle cx="-2" cy="36" r="2" fill="#ffe08a"/></g></svg>`;
  E.K(glass, "o", [[SERVE, 0], [SERVE + .05, 1]]); E.K(glass, "x", [[SERVE, 330], [SERVE + .4, 60, "out"]]); E.S(SERVE, "swish", .6); E.clip(SERVE + .5, "sfx/elx-glass-clink.wav", { vol: .5, to: .6 });
  E.clip(J5 - .3, "sfx/elx-sip.wav", { vol: .7, to: .7 });
  const receipt = E.el(R, "abs", `left:720px;top:1200px;padding:10px 20px;border-radius:14px;background:${GOLD};color:${INK};font-weight:900;font-size:40px;z-index:9;opacity:0`, "🧾 €14");
  E.K(receipt, "o", [[S2 + .9, 0], [S2 + 1.0, 1]]); E.clip(S2 + .9, "sfx/elx-register.wav", { vol: .5 });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 46, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const jq = { left: 40, top: 960, w: 500, tail: 230 };
  bubble("What can<br>I get you?", { left: 560, top: 380, w: 380, tail: 200, t0: S1, t1: J1 - .05, dark: true });
  bubble("Hmm. Something fruity…<br>but not sweet. 🤔", { ...jq, t0: J1, t1: J2 - .05, size: 42 });
  bubble("Strong… but I don’t<br>want to taste the alcohol.", { ...jq, t0: J2, t1: J3 - .05, size: 40 });
  bubble("And pink. But not,<br>like… <i>pink</i> pink. 💅", { ...jq, t0: J3, t1: J4 - .05, size: 42 });
  bubble("Oh! And no ice. ☝️", { ...jq, t0: J4, t1: MAKE });
  bubble("Oh my god. 10/10! 😍<br>Can I get another?", { ...jq, t0: J5, t1: S2 + .2, size: 42 });
  bubble("…Water. With<br>a strawberry.", { left: 560, top: 380, w: 440, tail: 220, t0: S2, t1: DUR, dark: true, italic: true });
  E.clip(S1 + .05, "voices/sk67/s1.wav", { vol: 1.5 }); E.clip(J1 + .05, "voices/sk67/j1.wav", { vol: 1.5 }); E.clip(J2 + .05, "voices/sk67/j2.wav", { vol: 1.5 }); E.clip(J3 + .05, "voices/sk67/j3.wav", { vol: 1.5 });
  E.clip(J4 + .05, "voices/sk67/j4.wav", { vol: 1.5 }); E.clip(J5 + .05, "voices/sk67/j5.wav", { vol: 1.5 }); E.clip(S2 + .05, "voices/sk67/s2.wav", { vol: 1.6 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-lounge.wav", { vol: .16, to: Math.min(6, DUR - t), duck: true });
  E.music({ bpm: 96, root: 60, seed: 67, prog: [[0, 4, 7], [5, 9, 12], [2, 5, 9], [7, 11, 14]], until: S2 });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1600px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "€14. WATER. STRAWBERRY.", STAMP, { size: 72, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“Something *fruity,* but not sweet.”", { size: 46, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, J2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
