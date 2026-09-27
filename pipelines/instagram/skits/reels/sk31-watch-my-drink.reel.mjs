// SK.31 "Watch my drink." — a club. The influencer (SK.21): "Watch my drink! I need a selfie with the DJ!" Theo, sunglasses
// on: "With my life." A Secret-Service HUD: PROTECTING THE ASSET. Threats get boxed in red: an ELBOW, a LEANER, a SPLASH ZONE —
// slow-motion dive. "Asset is secure." Then… POISON CHECK: 100%… 60%… 0%. She's back: "…where's my drink?" Theo, empty glass,
// wiping his mouth: "It was… compromised."  Voices: ElevenLabs (her: Laura; Theo: Daniel).
export const meta = {
  id: "sk31-watch-my-drink",
  images: { guard: "cutouts/theo_guard.webp", dive: "cutouts/theo_dive.webp", guilty: "cutouts/theo_guilty.webp", her: "cutouts/inf_wait.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", RED = "#ff3b4a", PINK = "#ff5fa2";
  E.episode(-16);
  const I1 = .4, T1 = 3.3, GO = 3.9, TH1 = 5.0, TH2 = 6.6, TH3 = 8.2, DIVE = 8.8, LAND = 10.5, T2 = 11.0, POISON = 12.8, BACK = 15.3, I2 = 15.7, T3 = 17.5, STAMP = 20.0, DUR = 22.6;
  E.music({ bpm: 124, root: 57, seed: 31, prog: [[0, 3, 7], [0, 3, 7], [8, 12, 15], [7, 10, 14]], until: BACK });
  const S = E.scene("club", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const FL = 1800, BEAT = 60 / 124;

  // ================= the club =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse at 50% 30%,#3a1a5a,#170a2a 60%,#0a0514)");
  // laser beams from the booth
  const lasers = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;opacity:.5");
  lasers.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920">${Array.from({ length: 7 }, (_, i) => `<line id="lz${i}" x1="830" y1="560" x2="${i * 180 - 20}" y2="1920" stroke="${["#4ff0ff", PINK, "#8cff6a"][i % 3]}" stroke-width="4"/>`).join("")}</svg>`;
  const lz = [...lasers.querySelectorAll("line")];
  E.F(t => lz.forEach((l, i) => { const a = Math.sin(t * 1.3 + i * .9) * 700; l.setAttribute("x2", 700 + a); l.style.opacity = (Math.floor(t / BEAT) + i) % 3 === 0 ? 1 : .35; }));
  // the DJ booth + DJ silhouette
  const booth = E.el(R, "abs", "left:600px;top:450px;width:480px;height:260px;transform:scale(.8);transform-origin:0 0");
  booth.innerHTML = `<svg viewBox="0 0 480 260" width="480" height="260"><g id="dj"><circle cx="240" cy="60" r="44" fill="#0a0514"/><path d="M190 60 Q240 0 290 60" stroke="#4ff0ff" stroke-width="10" fill="none"/><rect x="176" y="98" width="128" height="80" rx="30" fill="#0a0514"/></g>` +
    `<rect x="40" y="150" width="400" height="110" rx="10" fill="#1d0f33" stroke="${PINK}" stroke-width="3"/><circle cx="130" cy="190" r="26" fill="#2a1848" stroke="#4ff0ff" stroke-width="3"/><circle cx="350" cy="190" r="26" fill="#2a1848" stroke="#4ff0ff" stroke-width="3"/>` +
    `<text x="240" y="244" text-anchor="middle" font-family="Noto Sans" font-weight="900" font-size="26" fill="${PINK}" letter-spacing="6">DJ ✦ NOVA</text></svg>`;
  const dj = booth.querySelector("#dj");
  E.F(t => { dj.setAttribute("transform", `translate(0 ${Math.abs(Math.sin(t * Math.PI / BEAT)) * -10})`); });
  // disco ball
  const ball = E.el(R, "abs", "left:250px;top:380px;width:140px;height:140px;border-radius:50%;background:repeating-conic-gradient(#d8d8f0 0 10deg,#8a8aa8 10deg 20deg);box-shadow:0 0 60px rgba(255,255,255,.5)");
  E.el(R, "abs", "left:318px;top:250px;width:4px;height:130px;background:#666");
  E.F(t => { ball.style.transform = `rotate(${t * 60}deg)`; });
  // the crowd, bobbing to the beat
  const crowd = E.el(R, "abs", `left:-40px;top:${FL - 520}px;width:1160px;height:520px`);
  crowd.innerHTML = `<svg viewBox="0 0 1160 520" width="1160" height="520">${Array.from({ length: 12 }, (_, i) => `<g class="c"><circle cx="${40 + i * 98}" cy="${190 + (i % 3) * 30}" r="${36 + (i % 2) * 6}" fill="#1f1036"/><rect x="${-6 + i * 98}" y="${225 + (i % 3) * 30}" width="92" height="320" rx="36" fill="#1f1036"/>${i % 4 === 1 ? `<path d="M${60 + i * 98} ${250 + (i % 3) * 30} l30 -110" stroke="#1f1036" stroke-width="20" stroke-linecap="round"/>` : ""}</g>`).join("")}</svg>`;
  const cg = [...crowd.querySelectorAll(".c")];
  E.F(t => cg.forEach((g, i) => g.setAttribute("transform", `translate(0 ${Math.abs(Math.sin(t * Math.PI / BEAT + i)) * -16})`)));
  E.el(R, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background:#0d0619;background-image:repeating-linear-gradient(90deg,rgba(79,240,255,.12) 0 2px,transparent 2px 120px)`);
  // selfie flashes at the booth while she's away
  [6.0, 9.7, 13.4].forEach(t => { const f = E.el(R, "abs", "left:740px;top:460px;width:150px;height:150px;border-radius:50%;background:radial-gradient(closest-side,#fff,rgba(255,255,255,0));opacity:0"); E.K(f, "o", [[t, 0], [t + .04, 1], [t + .3, 0]]); E.clip(t, "sfx/elx-camera-shutter.wav", { vol: .35 }); });

  // ================= her =================
  const HH = 1060, HW = HH * 433 / 1008;
  const her = E.el(R, "abs", `left:-10px;top:${FL + 20 - HH}px;width:${HW}px;height:${HH}px;z-index:3`);
  const herIn = E.el(her, "abs", `left:0;top:0;width:${HW}px;height:${HH}px`);
  E.img(herIn, "her", `width:${HW}px;height:${HH}px`);
  E.K(her, "x", [[GO, 0], [GO + .5, -700, "in"], [BACK, -700], [BACK + .45, 0, "out"]]);
  E.F(t => { herIn.style.transform = `translateY(${Math.abs(Math.sin(t * Math.PI / BEAT)) * -8}px)`; });

  // ================= Theo =================
  const GH = 1120, GW = GH * 405 / 988, UW = GH * 411 / 985;
  const theo = E.el(R, "abs", `left:${690 - GW / 2}px;top:${FL + 20 - GH}px;width:${GW}px;height:${GH}px;z-index:4`);
  const theoIn = E.el(theo, "abs", `left:0;top:0;width:${GW}px;height:${GH}px;transform-origin:50% 100%`);
  const tGuard = E.img(theoIn, "guard", `position:absolute;left:0;top:0;width:${GW}px;height:${GH}px`);
  const tGuilty = E.img(theoIn, "guilty", `position:absolute;left:${(GW - UW) / 2}px;top:0;width:${UW}px;height:${GH}px`);
  const TP = [[0, "guard"], [DIVE, "none"], [LAND, "guard"], [POISON + 2.2, "guilty"]];
  E.F(t => {
    const f = at(TP, t); tGuard.style.opacity = f === "guard" ? 1 : 0; tGuilty.style.opacity = f === "guilty" ? 1 : 0;
    let y = 0, r = 0;
    if (t >= TH1 && t < TH3) r = [TH1, TH2].some(k => t >= k && t < k + 1.2) ? Math.sin(t * 30) * 1.5 : 0;   // snaps toward each threat
    for (const k of [LAND, POISON + 2.2]) if (t >= k && t < k + .25) y -= Math.sin((t - k) / .25 * Math.PI) * 24;
    theoIn.style.transform = `translateY(${y}px) rotate(${r}deg)`;
  });
  // the slow-motion dive, right to left across the frame
  const DW = 900, DH = DW * 537 / 1007;
  const dive = E.el(R, "abs", `left:0;top:900px;width:${DW}px;height:${DH}px;z-index:6;opacity:0`);
  E.img(dive, "dive", `width:${DW}px;height:${DH}px;transform:scaleX(-1)`);
  E.K(dive, "o", [[DIVE, 0], [DIVE + .05, 1], [LAND - .1, 1], [LAND, 0]]);
  E.K(dive, "x", [[DIVE, 700], [LAND, -560, "lin"]]); E.K(dive, "y", [[DIVE, -60], [DIVE + .8, 20, "out"], [LAND, 160, "in"]]);
  E.clip(DIVE - .05, "sfx/elx-slowmo.wav", { vol: .9 });
  // slow-mo grade + letterbox during the action
  const grade = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:5;background:rgba(40,60,120,.35);mix-blend-mode:multiply;opacity:0");
  E.K(grade, "o", [[DIVE, 0], [DIVE + .2, 1], [LAND, 1], [LAND + .3, 0]]);
  const barT = E.el(R, "abs", "left:0;top:0;width:1080px;height:0;background:#000;z-index:7"), barB = E.el(R, "abs", "left:0;bottom:0;width:1080px;height:0;background:#000;z-index:7");
  [barT, barB].forEach(b => E.K(b, "h", [[GO + .3, 0], [GO + .7, 150, "out"], [T2 + 1.2, 150], [T2 + 1.6, 0, "in"]]));
  // splash droplets (hit him mid-dive)
  const drops = E.el(R, "abs", "left:760px;top:900px;width:300px;height:300px;z-index:6");
  drops.innerHTML = `<svg viewBox="0 0 300 300" width="300" height="300">${Array.from({ length: 9 }, (_, i) => `<circle cx="${250 - i * 22}" cy="${60 + (i * 37) % 180}" r="${8 + (i % 3) * 4}" fill="#ffb03a"/>`).join("")}</svg>`;
  E.K(drops, "o", [[TH3 + .3, 0], [TH3 + .35, 1], [DIVE + 1.2, 1], [DIVE + 1.4, 0]]); E.K(drops, "x", [[TH3 + .3, 60], [DIVE + 1.2, -260, "lin"]]);

  // ================= threats (drawn) + red target boxes =================
  const target = (label, x, y, w, h, t0, t1) => {
    const b = E.el(R, "abs", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border:5px solid ${RED};border-radius:6px;z-index:8;opacity:0;box-shadow:0 0 18px ${RED}`);
    E.el(b, "abs", `right:-5px;top:-50px;padding:4px 12px;background:${RED};color:#fff;font-weight:900;font-size:30px;letter-spacing:.06em;white-space:nowrap`, `⚠ THREAT: ${label}`);
    E.K(b, "o", [[t0, 0], [t0 + .05, 1], [t1 - .1, 1], [t1, 0]]); E.K(b, "s", [[t0, 1.4], [t0 + .2, 1, "out"]]);
    E.S(t0, "blare", .35);
  };
  const elbow = E.el(R, "abs", "left:1080px;top:1000px;width:420px;height:160px;z-index:5");
  elbow.innerHTML = `<svg viewBox="0 0 420 160" width="420" height="160"><defs><pattern id="sl" width="28" height="28" patternUnits="userSpaceOnUse"><rect width="28" height="28" fill="#e05a2a"/><circle cx="8" cy="8" r="5" fill="#ffd24a"/><circle cx="22" cy="20" r="4" fill="#2aa38a"/></pattern></defs>` +
    `<path d="M420 30 H200 Q150 30 140 70 L140 130 H420 Z" fill="url(#sl)"/><rect x="132" y="60" width="26" height="76" rx="8" fill="#b8442a"/>` +
    `<path d="M140 72 Q60 70 40 104 Q30 130 70 134 L140 132 Z" fill="#c98a64"/><path d="M52 108 Q64 100 80 112" stroke="#a86a48" stroke-width="4" fill="none"/>` +
    `<g transform="translate(20 20) rotate(-18)"><path d="M0 0 L50 0 L25 40 Z" fill="rgba(255,176,58,.85)" stroke="#fff" stroke-width="3"/><path d="M25 40 V70" stroke="#fff" stroke-width="4"/><circle cx="-6" cy="-6" r="6" fill="#ffb03a"/><circle cx="-16" cy="4" r="4" fill="#ffb03a"/></g></svg>`;
  E.K(elbow, "x", [[TH1, 0], [TH1 + .4, -380, "out"], [TH1 + 1.1, -380], [TH1 + 1.4, 0, "in"]]);
  target("ELBOW", 690, 980, 390, 200, TH1 + .3, TH1 + 1.3);
  const leaner = E.el(R, "abs", "left:1080px;top:760px;width:360px;height:1060px;z-index:3;transform-origin:50% 100%");
  leaner.innerHTML = `<svg viewBox="0 0 360 1060" width="360" height="1060" style="overflow:visible"><g fill="#241240" stroke="#4ff0ff" stroke-width="5" stroke-linejoin="round"><circle cx="150" cy="120" r="70"/><rect x="80" y="190" width="170" height="480" rx="60"/><rect x="100" y="640" width="60" height="420"/><rect x="180" y="640" width="60" height="420"/><path d="M96 250 L-10 400 L10 420 L120 300 Z"/></g>` +
    `<path d="M-20 380 l14 -40 l24 0 l-8 40 Z" fill="rgba(255,176,58,.9)"/><circle cx="130" cy="112" r="8" fill="#4ff0ff"/></svg>`;
    `<rect x="80" y="190" width="170" height="480" rx="60" fill="#3aa0c8"/><path d="M110 200 L150 300 L190 200" fill="#fff"/><rect x="100" y="640" width="60" height="420" fill="#27324a"/><rect x="180" y="640" width="60" height="420" fill="#27324a"/>` +
    `<path d="M90 260 L-10 420" stroke="#3aa0c8" stroke-width="50" stroke-linecap="round"/><circle cx="-12" cy="424" r="26" fill="#c98a64"/></svg>`;
  E.K(leaner, "x", [[TH2, 0], [TH2 + .5, -230, "out"], [TH2 + 1.2, -230], [TH2 + 1.5, 0, "in"]]); E.K(leaner, "r", [[TH2, 0], [TH2 + .5, -12, "out"], [TH2 + 1.2, -12], [TH2 + 1.5, 0]]);
  target("LEANER", 880, 800, 190, 520, TH2 + .4, TH2 + 1.4);
  target("SPLASH ZONE", 760, 880, 300, 300, TH3, DIVE + .1);

  // ================= the HUD =================
  const hud = E.el(R, "abs", "left:60px;top:190px;width:960px;z-index:8;opacity:0;display:flex;justify-content:space-between;align-items:center");
  const hl = E.el(hud, "", `padding:8px 18px;border:3px solid #4ff0ff;color:#4ff0ff;font-weight:800;font-size:34px;letter-spacing:.08em;background:rgba(10,5,20,.7)`, "🕶 PROTECTING THE ASSET");
  const clk = E.el(hud, "", `padding:8px 18px;border:3px solid #4ff0ff;color:#4ff0ff;font-weight:800;font-size:34px;font-variant-numeric:tabular-nums;background:rgba(10,5,20,.7)`);
  E.K(hud, "o", [[GO + .4, 0], [GO + .6, 1], [BACK, 1], [BACK + .2, 0]]);
  E.F(t => {
    const s = Math.floor(clamp((t - GO) / (BACK - GO), 0, 1) * 30); clk.textContent = `⏱ 00:${String(s).padStart(2, "0")}`;
    const lab = t >= POISON ? "🧪 CHECKING FOR POISON" : t >= T2 ? "✅ ASSET SECURE" : "🕶 PROTECTING THE ASSET";
    if (hl.__s !== lab) { hl.textContent = lab; hl.__s = lab; hl.style.color = hl.style.borderColor = t >= POISON ? GOLD : "#4ff0ff"; }
  });
  // the poison check inset: a big glass, level draining
  const inset = E.el(R, "abs", "left:620px;top:420px;width:400px;height:440px;border-radius:30px;background:rgba(10,5,20,.85);border:4px solid " + GOLD + ";z-index:8;opacity:0");
  inset.innerHTML = `<svg viewBox="0 0 400 440" width="400" height="440"><defs><clipPath id="bowl"><path d="M70 60 L330 60 L200 230 Z"/></clipPath></defs>` +
    `<rect id="liq" x="60" y="60" width="280" height="180" fill="${PINK}" clip-path="url(#bowl)"/><path d="M70 60 L330 60 L200 230 Z" fill="none" stroke="#fff" stroke-width="6"/><path d="M200 230 V360 M140 366 H260" stroke="#fff" stroke-width="8"/>` +
    `<circle cx="300" cy="70" r="20" fill="#9bd14a"/></svg><div id="pc" style="position:absolute;left:0;top:380px;width:400px;text-align:center;font-weight:900;font-size:40px;color:${GOLD};font-variant-numeric:tabular-nums"></div>`;
  const liq = inset.querySelector("#liq"), pc = inset.querySelector("#pc");
  E.K(inset, "o", [[POISON, 0], [POISON + .2, 1], [BACK - .2, 1], [BACK, 0]]); E.K(inset, "s", [[POISON, .6], [POISON + .3, 1, "back"]]);
  const LV = [[0, 100], [POISON + .6, 100], [POISON + .8, 70], [POISON + 1.3, 70], [POISON + 1.5, 35], [POISON + 1.9, 35], [POISON + 2.1, 0]];
  E.F(t => { const v = at(LV, t); liq.setAttribute("y", 60 + 170 * (1 - v / 100)); pc.textContent = v ? `DRINK: ${v}%` : "DRINK: 0% ✓ NO POISON"; });
  [POISON + .6, POISON + 1.3, POISON + 1.9].forEach((t, i) => E.clip(t, i < 2 ? "sfx/elx-sip.wav" : "sfx/elx-slurp-empty.wav", { vol: .9, to: .8 }));

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#0a0514" : "#fff"};border:${dark ? "3px solid #4ff0ff" : "0"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.5);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#4ff0ff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#0a0514" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Watch my drink! I need<br>a selfie with the DJ!", { left: 40, top: 520, w: 600, tail: 190, t0: I1, t1: T1 - .05 });
  bubble("With my life.", { left: 500, top: 520, w: 400, tail: 150, t0: T1, t1: GO + .6, dark: true, size: 54 });
  bubble("Asset is secure.", { left: 460, top: 560, w: 460, tail: 170, t0: T2, t1: POISON, dark: true });
  bubble("…where’s<br>my drink?", { left: 40, top: 560, w: 400, tail: 190, t0: I2, t1: T3 - .05 });
  bubble("It was…<br>compromised.", { left: 500, top: 560, w: 440, tail: 140, t0: T3, t1: DUR, italic: true, size: 54 });
  E.clip(I1 + .05, "voices/sk31/i1.wav", { vol: 1.5 }); E.clip(T1 + .05, "voices/sk31/t1.wav", { vol: 1.6 }); E.clip(T2 + .05, "voices/sk31/t2.wav", { vol: 1.6 });
  E.clip(I2 + .05, "voices/sk31/i2.wav", { vol: 1.5 }); E.clip(T3 + .05, "voices/sk31/t3.wav", { vol: 1.6 });
  for (let t = 0; t < BACK; t += 6) E.clip(t, "sfx/club-bass.wav", { vol: .3, to: Math.min(6, BACK - t), duck: true });
  E.clip(BACK, "sfx/record-silence.wav", { vol: .6 });

  // ================= stamp =================
  const stampBox = E.el(R, "abs", "left:0;top:1420px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "ASSET: ABSORBED.", STAMP, { size: 88, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "“Watch my *drink.*”", { size: 70, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, GO + .3, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
