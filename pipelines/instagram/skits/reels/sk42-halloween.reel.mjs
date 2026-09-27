// SK.42 "The Halloween shift." — Sal's bar on Halloween night. A skeleton orders a martini; it pours straight through his
// ribs onto the floor. A ghost drifts in: "Do you have any… spirits?" A vampire: "A Bloody Mary. Hold the garlic." Sal:
// "Virgin?" — "…Obviously not." The skeleton's back, standing in a puddle: "Same again, please!" Sal hands him the mop.
// Voices: Higgsfield TTS (Sal: Marcus; ghost: Gideon, pitched down with an echo; vampire: Vlad; skeleton: Knox).
export const meta = {
  id: "sk42-halloween",
  images: { skel: "cutouts/hw_skeleton.webp", vamp: "cutouts/hw_vampire.webp", wait: "cutouts/salc_wait.webp", twitch: "cutouts/sal_twitch.webp", mop: "cutouts/sal_mop.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", PUMP = "#ff8a1a", GREEN = "#7dff8a";
  E.episode(-16);
  const SK = .5, POUR = 2.4, GH = 5.2, GL = 5.7, GOUT = 8.6, VA = 9.0, V1 = 9.4, S1 = 13.4, V2 = 14.3, SK2 = 16.9, K1 = 17.3, MOP = 18.9, STAMP = 19.6, DUR = 22.6;
  E.music({ bpm: 100, root: 50, seed: 42, prog: [[0, 3, 7], [1, 4, 8], [0, 3, 7], [6, 9, 13]], until: STAMP });
  const S = E.scene("spooky", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1420, FL = 1880;

  // ================= a haunted bar =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse at 60% 35%,#3a2a4a,#1a1024 60%,#0c0812)");
  // full moon window
  const win = E.el(R, "abs", "left:620px;top:400px;width:380px;height:440px;border-radius:190px 190px 8px 8px;overflow:hidden;box-shadow:0 0 0 14px #2a1a30");
  win.innerHTML = `<svg viewBox="0 0 380 440" width="380" height="440"><rect width="380" height="440" fill="#1a2a4a"/><circle cx="190" cy="170" r="110" fill="#f4ecc8"/><circle cx="160" cy="140" r="18" fill="#e0d6a8"/><circle cx="220" cy="200" r="12" fill="#e0d6a8"/><path d="M0 360 L60 300 L90 330 L140 260 L180 330 L240 280 L300 340 L380 290 V440 H0 Z" fill="#0c0812"/><path d="M60 300 V240 M50 260 L60 240 L70 260" stroke="#0c0812" stroke-width="6"/></svg>`;
  E.el(win, "abs", "left:186px;top:0;width:8px;height:440px;background:#2a1a30");
  // bats crossing the moon
  const bats = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:1");
  bats.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920">${[0, 1, 2, 3].map(i => `<g class="bat"><path d="M0 0 Q-20 -18 -40 -4 Q-30 -2 -24 6 Q-12 -2 0 8 Q12 -2 24 6 Q30 -2 40 -4 Q20 -18 0 0 Z" fill="#0c0812"/></g>`).join("")}</svg>`;
  const bg = [...bats.querySelectorAll(".bat")];
  E.F(t => bg.forEach((g, i) => { const u = ((t * .12 + i * .27) % 1); g.setAttribute("transform", `translate(${1100 - u * 1300} ${480 + i * 70 + Math.sin(t * 3 + i) * 30}) scale(${1 + (i % 2) * .4},${.6 + .4 * Math.abs(Math.sin(t * 14 + i))})`); }));
  // cobwebs in the corners
  const web = (x, y, flip) => { const w = E.el(R, "abs", `left:${x}px;top:${y}px;width:300px;height:300px;opacity:.5;${flip ? "transform:scaleX(-1)" : ""}`); w.innerHTML = `<svg viewBox="0 0 300 300" width="300" height="300" fill="none" stroke="#c8c0d8" stroke-width="2">${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="0" x2="${300 * Math.cos(i * Math.PI / 12)}" y2="${300 * Math.sin(i * Math.PI / 12)}"/>`).join("")}${[60, 120, 180, 240].map(r => `<path d="M${r} 0 A${r} ${r} 0 0 1 0 ${r}"/>`).join("")}</svg>`; };
  web(0, 360, false); web(780, 360, true);
  // back bar: potion bottles with glowing labels
  const shelf = E.el(R, "abs", "left:20px;top:880px;width:580px;height:260px");
  shelf.innerHTML = `<svg viewBox="0 0 580 260" width="580" height="260">${Array.from({ length: 8 }, (_, i) => { const c = ["#7dff8a", "#c070ff", "#ff5a5a", "#ffb03a"][i % 4], h = 110 + (i * 23) % 60; return `<rect x="${10 + i * 70}" y="${220 - h}" width="46" height="${h}" rx="10" fill="#2a2038"/><rect x="${14 + i * 70}" y="${250 - h * .6}" width="38" height="${h * .45}" rx="6" fill="${c}" opacity=".75"/><rect x="${22 + i * 70}" y="${190 - h}" width="22" height="34" fill="#2a2038"/>`; }).join("")}<rect x="0" y="220" width="580" height="14" fill="#4a3050"/><text x="290" y="256" text-anchor="middle" font-family="Noto Sans" font-weight="900" font-size="22" fill="${GREEN}" letter-spacing="6">~ SPIRITS ~</text></svg>`;

  // ================= Sal (behind the bar, right) =================
  const SH = 860, SWW = SH * 754 / 1104;
  const sal = E.el(R, "abs", `left:${800 - SWW / 2}px;top:${TOP + 40 - SH}px;width:${SWW}px;height:${SH}px;z-index:2`);
  const sIn = E.el(sal, "abs", `left:0;top:0;width:${SWW}px;height:${SH}px`);
  const sEls = { wait: E.img(sIn, "wait", `position:absolute;left:0;top:0;width:${SWW}px;height:${SH}px`),
    twitch: E.img(sIn, "twitch", `position:absolute;left:${(SWW - SH * 865 / 1133) / 2}px;top:0;width:${SH * 865 / 1133}px;height:${SH}px`),
    mop: E.img(sIn, "mop", `position:absolute;left:${(SWW - SH * 869 / 1135) / 2}px;top:0;width:${SH * 869 / 1135}px;height:${SH}px`) };
  const SP = [[0, "wait"], [POUR + 1.2, "twitch"], [GH, "wait"], [S1 - .1, "twitch"], [SK2, "wait"], [MOP - .3, "twitch"]];
  E.F(t => { const f = at(SP, t); for (const n in sEls) sEls[n].style.opacity = n === f ? 1 : 0; sIn.style.transform = `translateY(${Math.sin(t * 1.7) * 3}px)`; });
  // the counter + jack-o'-lanterns
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;z-index:3;background:linear-gradient(180deg,#3a2438,#1e1422);box-shadow:inset 0 12px 0 #54345a`);
  const jacks = [];
  [[430, 1.0], [560, .8]].forEach(([x, s]) => {
    const j = E.el(R, "abs", `left:${x}px;top:${TOP - 110 * s}px;width:${140 * s}px;height:${120 * s}px;z-index:4`);
    j.innerHTML = `<svg viewBox="0 0 140 120" width="${140 * s}" height="${120 * s}"><ellipse cx="70" cy="70" rx="66" ry="50" fill="${PUMP}"/><path d="M40 30 Q70 20 100 30" stroke="#c85a0a" stroke-width="5" fill="none"/><rect x="64" y="6" width="12" height="20" rx="4" fill="#4a7a2a"/><g class="face" fill="#ffe36a"><path d="M36 58 l16 -16 l16 16 Z"/><path d="M72 58 l16 -16 l16 16 Z"/><path d="M34 80 Q70 110 106 80 L96 84 L88 76 L80 86 L70 78 L60 86 L52 76 L44 84 Z"/></g></svg>`;
    jacks.push(j.querySelector(".face"));
  });
  E.F(t => jacks.forEach((f, i) => f.setAttribute("opacity", .7 + .3 * Math.abs(Math.sin(t * 9 + i * 2)))));

  // ================= the skeleton =================
  const KH = 1120, KW = KH * 456 / 1016;
  const skel = E.el(R, "abs", `left:${230 - KW / 2}px;top:${FL + 20 - KH}px;width:${KW}px;height:${KH}px;z-index:5`);
  const kIn = E.el(skel, "abs", `left:0;top:0;width:${KW}px;height:${KH}px;transform-origin:50% 100%`);
  E.img(kIn, "skel", `width:${KW}px;height:${KH}px`);
  E.K(skel, "x", [[SK, -500], [SK + .5, 0, "out"], [GH - .6, 0], [GH - .1, -600, "in"], [SK2 - .5, -600], [SK2, 0, "out"]]);
  E.F(t => { kIn.style.transform = `translateY(${Math.sin(t * 2.2) * 4}px) rotate(${t > POUR && t < POUR + 1.4 ? -6 * Math.sin((t - POUR) / 1.4 * Math.PI) : 0}deg)`; });
  // the martini, the stream through the ribs, and the puddle
  const stream = E.el(R, "abs", `left:${230 - 10}px;top:${FL + 20 - KH + 180}px;width:20px;height:0;z-index:6;border-radius:10px;background:linear-gradient(180deg,rgba(230,240,200,.85),rgba(210,230,180,.7))`);
  E.K(stream, "h", [[POUR + .3, 0], [POUR + .9, KH - 200, "in"], [POUR + 1.6, KH - 200], [POUR + 1.9, 0]]);
  E.K(stream, "y", [[POUR + 1.6, 0], [POUR + 1.9, KH - 200]]);
  const puddle = E.el(R, "abs", `left:${230 - 10}px;top:${FL - 6}px;width:20px;height:24px;border-radius:50%;background:rgba(210,230,180,.6);z-index:4;transform-origin:50% 50%`);
  E.K(puddle, "sx", [[POUR + .8, 0], [POUR + 1.6, 12, "out"], [SK2, 12], [SK2 + 1, 22, "out"]]);
  E.clip(POUR + .7, "sfx/splash.wav", { vol: .7 }); E.clip(POUR + .2, "sfx/elx-sip.wav", { vol: .6, to: .6 });
  const mg = E.el(R, "abs", "left:520px;top:1330px;width:90px;height:100px;z-index:5");
  mg.innerHTML = `<svg viewBox="0 0 90 100" width="90" height="100"><path d="M4 4 H86 L45 50 Z" fill="rgba(230,240,200,.8)" stroke="#fff" stroke-width="3"/><path d="M45 50 V92 M25 96 H65" stroke="#fff" stroke-width="4"/><circle cx="60" cy="18" r="7" fill="#6a8f2a"/></svg>`;
  E.K(mg, "x", [[SK + .6, 400], [SK + 1.0, 0, "out"], [POUR - .1, 0], [POUR, -380]]); E.K(mg, "o", [[POUR - .02, 1], [POUR, 0]]); E.S(SK + .6, "swish", .5);
  const dry = E.el(R, "abs", `left:40px;top:760px;padding:10px 22px;border-radius:16px;background:#fff;color:${INK};font-weight:900;font-size:40px;z-index:8;opacity:0`, "🦴 ABSORBED: 0%");
  E.K(dry, "o", [[POUR + 1.0, 0], [POUR + 1.2, 1], [GH - .6, 1], [GH - .4, 0]]);

  // ================= the ghost (code-drawn) =================
  const ghost = E.el(R, "abs", "left:120px;top:880px;width:340px;height:460px;z-index:5;opacity:0");
  ghost.innerHTML = `<svg viewBox="0 0 340 460" width="340" height="460"><defs><radialGradient id="gg" cx=".4" cy=".3"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d8e0f0"/></radialGradient></defs>` +
    `<path id="sheet" d="M40 200 Q40 20 170 20 Q300 20 300 200 V420 Q270 380 245 420 Q220 460 195 420 Q170 380 145 420 Q120 460 95 420 Q70 380 40 420 Z" fill="url(#gg)" opacity=".88"/>` +
    `<ellipse cx="125" cy="160" rx="22" ry="30" fill="#1a1024"/><ellipse cx="215" cy="160" rx="22" ry="30" fill="#1a1024"/><ellipse cx="170" cy="240" rx="28" ry="20" fill="#1a1024"/>` +
    `<path d="M40 240 Q0 260 10 300" stroke="#d8e0f0" stroke-width="24" fill="none" stroke-linecap="round"/><path d="M300 240 Q340 220 330 180" stroke="#d8e0f0" stroke-width="24" fill="none" stroke-linecap="round"/></svg>`;
  E.K(ghost, "o", [[GH, 0], [GH + .4, .95], [GOUT - .3, .95], [GOUT, 0]]); E.K(ghost, "x", [[GH, -300], [GH + .6, 0, "out"], [GOUT - .4, 0], [GOUT, 400, "in"]]);
  const gIn = ghost.querySelector("svg");
  E.F(t => { gIn.style.transform = `translateY(${Math.sin(t * 2.4) * 18}px) rotate(${Math.sin(t * 1.6) * 4}deg)`; });
  E.clip(GH, "sfx/wind-gust.wav", { vol: .5 });

  // ================= the vampire =================
  const VH = 940, VW = VH * 685 / 1019;
  const vamp = E.el(R, "abs", `left:-40px;top:${1960 - VH}px;width:${VW}px;height:${VH}px;z-index:5`);
  const vIn = E.el(vamp, "abs", `left:0;top:0;width:${VW}px;height:${VH}px`);
  E.img(vIn, "vamp", `width:${VW}px;height:${VH}px`);
  E.K(vamp, "x", [[VA, -700], [VA + .5, 0, "out"], [SK2 - .9, 0], [SK2 - .4, -700, "in"]]); E.clip(VA, "sfx/elx-braam.wav", { vol: .35 });
  E.F(t => { vIn.style.transform = `translateY(${Math.sin(t * 1.5) * 3}px)`; });
  const bm = E.el(R, "abs", "left:520px;top:1270px;width:110px;height:170px;z-index:5;opacity:0");
  bm.innerHTML = `<svg viewBox="0 0 110 170" width="110" height="170"><path d="M10 10 H100 L92 160 H18 Z" fill="#b01020" stroke="rgba(255,255,255,.6)" stroke-width="4"/><rect x="30" y="-10" width="8" height="90" fill="#7ab04c" transform="rotate(12 34 40)"/><circle cx="84" cy="14" r="14" fill="#f2e44a"/></svg>`;
  E.K(bm, "o", [[V2 + 1.4, 0], [V2 + 1.5, 1], [SK2 - .9, 1], [SK2 - .7, 0]]); E.K(bm, "x", [[V2 + 1.4, 300], [V2 + 1.8, 0, "out"]]); E.S(V2 + 1.4, "swish", .5);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 52, italic = false, dark = false, bg } = o;
    const B = bg || (dark ? "#1b2330" : "#fff");
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${B};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${B};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Do you have<br>any… spirits?", { left: 260, top: 640, w: 480, tail: 120, t0: GL, t1: GOUT, italic: true, bg: "#e8eef8" });
  bubble("A Bloody Mary.<br>Hold the garlic.", { left: 260, top: 700, w: 500, tail: 120, t0: V1, t1: S1 - .05 });
  bubble("Virgin?", { left: 560, top: 440, w: 300, tail: 200, t0: S1, t1: V2 + .4, dark: true, size: 58 });
  bubble("…Obviously not.", { left: 240, top: 740, w: 480, tail: 120, t0: V2, t1: SK2 - .9, italic: true });
  bubble("Same again,<br>please!", { left: 260, top: 640, w: 420, tail: 90, t0: K1, t1: DUR });
  E.clip(GL + .05, "voices/sk42/gh.wav", { vol: 1.5 }); E.clip(V1 + .05, "voices/sk42/v1.wav", { vol: 1.5 }); E.clip(S1 + .05, "voices/sk42/s1.wav", { vol: 1.6 });
  E.clip(V2 + .05, "voices/sk42/v2.wav", { vol: 1.5 }); E.clip(K1 + .05, "voices/sk42/k1.wav", { vol: 1.5 });
  E.S(MOP, "swish", .6);
  const mopEl = E.el(R, "abs", `left:640px;top:${TOP - 330}px;width:120px;height:360px;z-index:6;opacity:0;transform-origin:50% 100%`);
  mopEl.innerHTML = `<svg viewBox="0 0 120 360" width="120" height="360"><rect x="54" y="0" width="12" height="260" rx="6" fill="#b88a52"/><rect x="20" y="250" width="80" height="24" rx="8" fill="#5a6a7a"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${24 + i * 9} 272 q${(i % 2 ? 6 : -6)} 40 ${(i % 3) - 1} 84" stroke="#e8e4d8" stroke-width="9" fill="none" stroke-linecap="round"/>`).join("")}</svg>`;
  E.K(mopEl, "o", [[MOP, 0], [MOP + .05, 1]]); E.K(mopEl, "x", [[MOP, 0], [MOP + .5, -300, "out"]]); E.K(mopEl, "r", [[MOP, 20], [MOP + .5, -8, "back"]]);
  const hand = E.el(R, "abs", `left:40px;top:760px;padding:10px 22px;border-radius:16px;background:#fff;color:${INK};font-weight:900;font-size:40px;z-index:8;opacity:0`, "🧹 here.");
  E.K(hand, "o", [[MOP + .4, 0], [MOP + .6, 1]]);

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1500px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "HAPPY HALLOWEEN 🎃", STAMP, { size: 80, rot: -5, bg: PUMP, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The *Halloween* shift.", { size: 66, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = PUMP; e.style.color = INK; });
  E.until(title, GH, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
