// SK.45 "Our bar's new pricing." (the trending "absurd service rule" format, built from real bartender pet peeves) —
// Sal: "New pricing. Drinks are cheap. Behaviour… costs extra." The chalkboard fills in as customers commit each crime:
// the finger-wave (+€3 per hand), "Surprise me!" (+€8), "Make it strong." (+€4), Rico's "Relax. I know the owner." — Sal
// points at the neon: SAL'S. "…Plus twenty." Then Nina: "Hi! Whenever you're ready. No rush. Thank you!" — "On the house."
// −100%. Rico: "WHAT?!"  Voices: ElevenLabs (Sal: Chris; Jessica; Alex; Rico: Liam; Nina: Sarah).
export const meta = {
  id: "sk45-new-pricing",
  images: { wait: "cutouts/salc_wait.webp", twitch: "cutouts/sal_twitch.webp", thumb: "cutouts/salb_thumb.webp", crowd: "cutouts/crowd_hands.webp",
    sweet: "cutouts/cust_sweet.webp", strong: "cutouts/guy_order.webp", owner: "cutouts/friend_point.webp", nina: "cutouts/nina_order.webp", rlime: "cutouts/friend_lime.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", MINT = "#8ee3c8", RED = "#e5484d";
  E.episode(-16);
  const S1 = .4, C1 = 4.6, C2 = 6.9, C3 = 9.1, C4 = 11.3, S2 = 13.9, C5 = 15.4, S3 = 19.3, R2 = 20.5, STAMP = 21.6, DUR = 24.4;
  E.music({ bpm: 108, root: 60, seed: 45, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: C5 });
  const S = E.scene("bar", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const TOP = 1480;

  // ================= the bar =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2c1f1a,#3d2a22 60%,#1e1512)");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:repeating-linear-gradient(90deg,rgba(0,0,0,.14) 0 5px,transparent 5px 150px)");
  const shelf = E.el(R, "abs", "left:600px;top:900px;width:480px;height:420px;opacity:.55");
  let s = ""; for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) { const c = ["#c77d3a", "#7ab04c", "#e4d4a8", "#9a2a3a", "#4a82b8"][(i + r) % 5], h = 100 + ((i * 29 + r * 7) % 50); s += `<rect x="${14 + i * 78}" y="${r * 200 + 180 - h}" width="40" height="${h}" rx="9" fill="${c}"/>`; }
  shelf.innerHTML = `<svg viewBox="0 0 480 420" width="480" height="420">${s}<rect x="0" y="180" width="480" height="12" fill="#7a5238"/><rect x="0" y="380" width="480" height="12" fill="#7a5238"/></svg>`;
  // the neon sign: dark until the owner line
  const neon = E.el(R, "abs", `left:640px;top:390px;width:400px;text-align:center;font-family:'Pacifico','Noto Sans',cursive;font-weight:800;font-size:110px;color:#3a2a30;z-index:1`, "SAL’S");
  E.F(t => { const on = t >= S2 - .5; neon.style.color = on ? "#ffe0ec" : "#4a3038"; neon.style.textShadow = on ? `0 0 14px #ff5fa2,0 0 40px #ff5fa2,0 0 80px #ff2f86` : "none"; });
  E.S(S2 - .5, "buzz", .6);
  const arrow = E.el(R, "abs", `left:880px;top:520px;font-size:80px;z-index:9;opacity:0`, "👆");
  E.K(arrow, "o", [[S2 - .4, 0], [S2 - .3, 1], [C5 - .2, 1], [C5, 0]]); E.K(arrow, "y", [[S2 - .4, 30], [S2, 0, "back"]]);

  // ================= Sal =================
  const SH = 860, SW = SH * 754 / 1104;
  const sal = E.el(R, "abs", `left:${800 - SW / 2}px;top:${TOP + 40 - SH}px;width:${SW}px;height:${SH}px;z-index:2`);
  const sIn = E.el(sal, "abs", `left:0;top:0;width:${SW}px;height:${SH}px`);
  const sEls = { wait: E.img(sIn, "wait", `position:absolute;left:0;top:0;width:${SW}px;height:${SH}px`),
    twitch: E.img(sIn, "twitch", `position:absolute;left:${(SW - SH * 865 / 1133) / 2}px;top:0;width:${SH * 865 / 1133}px;height:${SH}px`),
    thumb: E.img(sIn, "thumb", `position:absolute;left:${(SW - SH * 864 / 1130) / 2}px;top:0;width:${SH * 864 / 1130}px;height:${SH}px`) };
  const SP = [[0, "wait"], [C1 + .3, "twitch"], [C2 + 1.2, "wait"], [C4 + 1.4, "twitch"], [C5 + .5, "wait"], [S3 - .1, "thumb"], [R2, "wait"]];
  E.F(t => { const f = at(SP, t); for (const n in sEls) sEls[n].style.opacity = n === f ? 1 : 0; sIn.style.transform = `translateY(${Math.sin(t * 1.7) * 3}px)`; });
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;z-index:3;background:linear-gradient(180deg,#6e4630,#4a2e1f);box-shadow:inset 0 10px 0 #8a5a3c`);

  // ================= the chalkboard =================
  const board = E.el(R, "abs", "left:40px;top:370px;width:580px;padding:22px 26px 26px;border-radius:14px;background:#1e2a24;box-shadow:0 0 0 12px #7a5238,0 20px 40px rgba(0,0,0,.5);z-index:4;font-family:'Chalkboard SE','Comic Sans MS','Noto Sans',cursive;color:#f4f1e8;opacity:0");
  E.el(board, "", "font-weight:900;font-size:40px;letter-spacing:.06em;text-align:center;margin-bottom:6px", "SAL’S NEW PRICING");
  E.el(board, "", "font-size:30px;opacity:.85;text-align:center;margin-bottom:10px", "Beer €4 · Cocktail €8");
  E.el(board, "", `font-weight:900;font-size:28px;color:${GOLD};letter-spacing:.12em;margin:6px 0 4px`, "BEHAVIOUR:");
  const LINES = [["👋 The finger-wave", "+€3 /hand", C1], ["🎁 “Surprise me”", "+€8", C2 + .9], ["💪 “Make it strong”", "+€4", C3 + 1.0], ["👑 “I know the owner”", "+€20", S2 + .7], ["😊 “No rush. Thank you!”", "−100%", S3 + .2]];
  LINES.forEach(([a, b, t0], i) => {
    const row = E.el(board, "", `display:flex;justify-content:space-between;font-size:32px;line-height:1.5;border-bottom:2px dashed rgba(244,241,232,.2);opacity:.12`);
    E.el(row, "", "", a); const p = E.el(row, "", `font-weight:900;color:${i === 4 ? MINT : CORAL}`, b);
    E.K(row, "o", [[t0, .12], [t0 + .15, 1]]); E.K(p, "s", [[t0, 1.8], [t0 + .3, 1, "back"]]);
  });
  E.K(board, "o", [[S1 + 1.2, 0], [S1 + 1.5, 1]]); E.K(board, "y", [[S1 + 1.2, -80], [S1 + 1.6, 0, "out"]]); E.S(S1 + 1.2, "whoosh", .5);

  // ================= the till =================
  const till = E.el(R, "abs", `left:420px;top:${TOP - 110}px;width:260px;height:110px;border-radius:12px 12px 0 0;background:#1a1d22;box-shadow:0 0 0 6px #3a3f48;z-index:4;display:flex;align-items:center;justify-content:center;font-family:'Courier New',monospace;font-weight:900;font-size:40px;color:#7aff9a;font-variant-numeric:tabular-nums;text-shadow:0 0 10px rgba(122,255,154,.6)`);
  const TILL = [[0, "€ 0.00"], [C1 + .6, "+€18.00"], [C2 + 1.2, "+€8.00"], [C3 + 1.3, "+€4.00"], [S2 + .7, "+€20.00"], [S3 + .2, "€0.00 ❤"]];
  E.F(t => { const v = at(TILL, t); if (till.__v !== v) { till.textContent = v; till.__v = v; } till.style.color = t >= S3 + .2 ? "#ff9ad0" : "#7aff9a"; });
  [C1 + .6, C2 + 1.2, C3 + 1.3, S2 + .7].forEach(t => { E.clip(t, "sfx/elx-register.wav", { vol: .6 }); });
  E.clip(S3 + .2, "sfx/angel-choir.wav", { vol: .4, to: 2.4 });
  const mult = E.el(R, "abs", `left:340px;top:1060px;padding:8px 18px;border-radius:14px;background:${CORAL};color:#fff;font-weight:900;font-size:40px;z-index:8;opacity:0`, "👋 ×6 = +€18");
  E.K(mult, "o", [[C1 + .6, 0], [C1 + .75, 1], [C2 - .1, 1], [C2, 0]]); E.K(mult, "s", [[C1 + .6, 1.6], [C1 + .9, 1, "back"]]);

  // ================= the customers (front left, one at a time) =================
  const cust = (name, w, h, H, t0, t1, x = 300, z = 5) => {
    const W = H * w / h;
    const c = E.el(R, "abs", `left:${x - W / 2}px;top:${1950 - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const cIn = E.el(c, "abs", `left:0;top:0;width:${W}px;height:${H}px`);
    E.img(cIn, name, `width:${W}px;height:${H}px`);
    E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "x", [[t0, -500], [t0 + .35, 0, "out"], [t1 - .3, 0], [t1, -600, "in"]]);
    E.F(t => { cIn.style.transform = `translateY(${Math.sin(t * 2.4 + H) * 4}px)`; });
    E.S(t0, "swish", .5);
  };
  // the crowd waving at the bar
  const CRW = 760, CRH = CRW * 678 / 1003;
  const crowd = E.el(R, "abs", `left:-40px;top:${1950 - CRH}px;width:${CRW}px;height:${CRH}px;z-index:5;opacity:0`);
  const crIn = E.el(crowd, "abs", `left:0;top:0;width:${CRW}px;height:${CRH}px`);
  E.img(crIn, "crowd", `width:${CRW}px;height:${CRH}px`);
  E.K(crowd, "o", [[C1, 0], [C1 + .1, 1], [C2 - .15, 1], [C2, 0]]); E.K(crowd, "y", [[C1, 200], [C1 + .3, 0, "out"]]);
  E.F(t => { crIn.style.transform = `translateY(${Math.abs(Math.sin(t * 9)) * -12}px) rotate(${Math.sin(t * 13) * 1.2}deg)`; });
  E.clip(C1, "sfx/crowd-murmur.wav", { vol: .6, to: 2.2 });
  for (let i = 0; i < 6; i++) E.S(C1 + .2 + i * .22, "pop", .35);
  cust("sweet", 821, 1140, 900, C2, C3);
  cust("strong", 872, 1121, 880, C3, C4);
  cust("owner", 861, 1124, 900, C4, C5);
  cust("nina", 846, 1164, 880, C5, R2 - .1);
  cust("rlime", 867, 1122, 900, R2 - .1, DUR + 1, 300, 6);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 52, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("New pricing. Drinks are cheap.<br>Behaviour… costs extra.", { left: 300, top: 980, w: 740, tail: 520, t0: S1, t1: C1, dark: true, size: 46 });
  bubble("Surprise me! 💫", { left: 60, top: 940, w: 440, tail: 200, t0: C2 + .1, t1: C3 - .1 });
  bubble("Make it strong. 😏", { left: 60, top: 940, w: 460, tail: 200, t0: C3 + .1, t1: C4 - .1 });
  bubble("Relax.<br>I know the owner. 😎", { left: 60, top: 900, w: 500, tail: 200, t0: C4 + .1, t1: S2 - .05 });
  bubble("…Plus twenty.", { left: 640, top: 560, w: 400, tail: 150, t0: S2, t1: C5 - .1, dark: true, italic: true });
  bubble("Hi! Whenever you’re ready.<br>No rush. Thank you! 😊", { left: 40, top: 920, w: 620, tail: 220, t0: C5 + .2, t1: S3 - .05, size: 46 });
  bubble("On the house.", { left: 640, top: 560, w: 400, tail: 150, t0: S3, t1: R2, dark: true });
  bubble("WHAT?!", { left: 60, top: 940, w: 340, tail: 200, t0: R2, t1: DUR, size: 74 });
  E.clip(S1 + .05, "voices/sk45/s1.wav", { vol: 1.5 }); E.clip(C2 + .15, "voices/sk45/j1.wav", { vol: 1.5 }); E.clip(C3 + .15, "voices/sk45/a1.wav", { vol: 1.5 });
  E.clip(C4 + .15, "voices/sk45/r1.wav", { vol: 1.5 }); E.clip(S2 + .05, "voices/sk45/s2.wav", { vol: 1.6 }); E.clip(C5 + .25, "voices/sk45/n1.wav", { vol: 1.5 });
  E.clip(S3 + .05, "voices/sk45/s3.wav", { vol: 1.6 }); E.clip(R2 + .05, "voices/sk45/r2.wav", { vol: 1.5 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-lounge.wav", { vol: .2, to: Math.min(6, DUR - t), duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1600px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "BE NICE. IT’S CHEAPER.", STAMP, { size: 76, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Our bar’s *new pricing.*", { size: 64, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, C1, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
