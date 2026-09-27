// SK.41 "How hard can it be?" (Oktoberfest) — a beer-tent server strolls past with 12 one-litre steins (27.6 kg) and a pretzel
// in her teeth. Gary (SK.34/39): "Pfft. How hard can it be?" He takes two. 4.6 kg. ♥ 172 bpm, arms 12%, TABLE 8.0 m… 7.9 m…
// She passes again (trip #4… #7). He finally makes it to the table: "PROST!!" — clinks too hard — both steins explode. Foam.
// Two handles. She strolls by with twelve. OKTOBERFEST 1 — GARY 0.  Voices: Higgsfield TTS (Gary: Bob).
export const meta = {
  id: "sk41-oktoberfest",
  images: { strain: "cutouts/okt_strain.webp", foam: "cutouts/okt_foam.webp", server: "cutouts/okt_server.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", BLUE = "#2f7fd0";
  E.episode(-16);
  const PASS1 = .3, T1 = 2.9, GRAB = 4.4, PASS2 = 6.6, PASS3 = 9.0, ARRIVE = 11.0, T2 = 11.7, BOOM = 12.2, PASS4 = 14.0, STAMP = 15.8, DUR = 19.2;
  E.music({ bpm: 132, root: 55, seed: 41, prog: [[0, 4, 7], [7, 11, 14], [0, 4, 7], [5, 9, 12]], until: BOOM });
  const S = E.scene("tent", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const FL = 1860;

  // ================= the beer tent =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#f6ead0,#e8d4ac)");
  // blue-and-white lozenge ceiling
  const ceil = E.el(R, "abs", "left:0;top:0;width:1080px;height:520px;overflow:hidden");
  let lz = ""; for (let r = 0; r < 8; r++) for (let c = 0; c < 14; c++) lz += `<path d="M${c * 90 + (r % 2) * 45} ${r * 70} l45 35 l-45 35 l-45 -35 Z" fill="${(r + c) % 2 ? BLUE : "#fff"}"/>`;
  ceil.innerHTML = `<svg viewBox="0 0 1080 520" width="1080" height="520">${lz}</svg>`;
  E.el(R, "abs", "left:0;top:500px;width:1080px;height:40px;background:#6a4a2a");
  // hop garlands + pennants
  const gar = E.el(R, "abs", "left:0;top:540px;width:1080px;height:140px");
  gar.innerHTML = `<svg viewBox="0 0 1080 140" width="1080" height="140"><path d="M0 10 Q270 110 540 10 T1080 10" stroke="#4a7a2a" stroke-width="14" fill="none"/>${Array.from({ length: 22 }, (_, i) => { const x = i * 50 + 10, y = 10 + 80 * Math.abs(Math.sin((x / 1080) * Math.PI * 2)) * .9; return `<ellipse cx="${x}" cy="${y + 8}" rx="12" ry="16" fill="#8ac04a"/>`; }).join("")}</svg>`;
  // the back of the tent: crowd at long tables
  const crowd = E.el(R, "abs", "left:-40px;top:900px;width:1160px;height:500px");
  crowd.innerHTML = `<svg viewBox="0 0 1160 500" width="1160" height="500">${Array.from({ length: 14 }, (_, i) => `<g class="c"><circle cx="${40 + i * 84}" cy="${160 + (i % 3) * 22}" r="${34 + (i % 2) * 5}" fill="#c8a880"/><rect x="${4 + i * 84}" y="${196 + (i % 3) * 22}" width="74" height="220" rx="30" fill="${["#b85a4a", "#4a6a9a", "#6a8a4a", "#9a6aa0"][i % 4]}"/>${i % 3 === 1 ? `<rect x="${58 + i * 84}" y="${120 + (i % 3) * 22}" width="30" height="46" rx="6" fill="rgba(255,200,80,.9)"/>` : ""}</g>`).join("")}<rect x="0" y="360" width="1160" height="40" fill="#8a6a44"/><rect x="0" y="400" width="1160" height="100" fill="#6a4e30"/></svg>`;
  crowd.style.filter = "blur(1.5px) saturate(.8)"; crowd.style.opacity = .8;
  const cg = [...crowd.querySelectorAll(".c")];
  E.F(t => cg.forEach((g, i) => g.setAttribute("transform", `translate(0 ${Math.abs(Math.sin(t * 4.4 + i)) * -10})`)));
  E.el(R, "abs", `left:0;top:${FL - 460}px;width:1080px;height:${1920 - FL + 460}px;background:#b8905e;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.1) 0 3px,transparent 3px 160px)`);
  // Gary's target: the table (front right)
  const table = E.el(R, "abs", `left:760px;top:${FL - 380}px;width:380px;height:440px;z-index:5`);
  table.innerHTML = `<svg viewBox="0 0 380 440" width="380" height="440"><rect x="0" y="0" width="380" height="40" fill="#8a6a44"/><rect x="0" y="40" width="380" height="14" fill="#6a4e30"/><rect x="30" y="54" width="30" height="380" fill="#6a4e30"/><rect x="300" y="54" width="30" height="380" fill="#6a4e30"/>` +
    `<g transform="translate(110 -70)"><path d="M10 50 Q40 -10 70 50 Q100 -10 130 50 Q140 80 70 80 Q0 80 10 50 Z" fill="none" stroke="#b86a2a" stroke-width="16"/></g><rect x="120" y="-24" width="0" height="0"/></svg>`;

  // ================= the server =================
  const SVH = 860, SVW = SVH * 687 / 1020;
  const server = E.el(R, "abs", `left:0;top:${FL - 150 - SVH}px;width:${SVW}px;height:${SVH}px;z-index:2`);
  const svIn = E.el(server, "abs", `left:0;top:0;width:${SVW}px;height:${SVH}px`);
  const svImg = E.img(svIn, "server", `width:${SVW}px;height:${SVH}px`);
  const passes = [[PASS1, -1], [PASS2, 1], [PASS3, -1], [PASS4, 1]];                                // -1 = right→left, 1 = left→right
  E.F(t => {
    let x = 2000;
    for (const [t0, dir] of passes) { const u = (t - t0) / 2.6; if (u >= 0 && u <= 1) { x = dir < 0 ? 1100 - u * (1100 + SVW + 40) : -SVW - 40 + u * (1100 + SVW + 40); svImg.style.transform = dir > 0 ? "scaleX(-1)" : "none"; } }
    server.style.transform = `translateX(${x}px)`; svIn.style.transform = `translateY(${Math.abs(Math.sin(t * 7)) * -8}px)`;
  });
  const svTag = (t0, txt) => { const c = E.el(R, "abs", `left:0;top:760px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 24px;border-radius:18px;background:#fff;color:${INK};font-weight:900;font-size:40px;box-shadow:0 10px 24px rgba(0,0,0,.2)">${txt}</span>`); E.K(c, "o", [[t0 + .3, 0], [t0 + .45, 1], [t0 + 2.1, 1], [t0 + 2.3, 0]]); };
  svTag(PASS1, "🍺 × 12 = 27.6 kg · ♥ 64 bpm 😌");
  svTag(PASS2, "🍺 × 12 · trip #4 😌");
  svTag(PASS3, "🍺 × 12 · trip #7 · 🥨 lunch 😌");
  svTag(PASS4, "🍺 × 12 · trip #9 😌");

  // ================= Gary =================
  const GH = 1060, GW = GH * 632 / 992, FW = GH * 522 / 999;
  const gary = E.el(R, "abs", `left:0;top:0;width:${GW}px;height:${GH}px;z-index:4;opacity:0`);
  const gIn = E.el(gary, "abs", `left:0;top:0;width:${GW}px;height:${GH}px;transform-origin:50% 100%`);
  const gS = E.img(gIn, "strain", `position:absolute;left:0;top:0;width:${GW}px;height:${GH}px`);
  const gF = E.img(gIn, "foam", `position:absolute;left:${(GW - FW) / 2}px;top:0;width:${FW}px;height:${GH}px`);
  E.K(gary, "o", [[GRAB, 0], [GRAB + .1, 1]]);
  E.F(t => {
    const walk = seg(t, GRAB, ARRIVE - GRAB), x = -60 + Math.pow(walk, 1.8) * 520;                       // agonisingly slow at first
    gary.style.transform = `translate(${x}px,${FL + 20 - GH}px)`;
    const foam = t >= BOOM + .1; gS.style.opacity = foam ? 0 : 1; gF.style.opacity = foam ? 1 : 0;
    let r = 0, y = 0;
    if (!foam && t < ARRIVE) { r = Math.sin(t * 38) * 1.6; y = Math.abs(Math.sin(t * 5)) * 10; }
    if (t >= T2 && t < BOOM) { y = -30 * Math.sin((t - T2) / (BOOM - T2) * Math.PI); }
    gIn.style.transform = `translateY(${y}px) rotate(${r}deg)`;
  });
  // sweat drops
  for (let i = 0; i < 8; i++) {
    const d = E.el(R, "abs", `left:0;top:0;width:18px;height:26px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#9ad4ff;z-index:6;opacity:0`);
    const t0 = GRAB + .4 + i * .8;
    E.K(d, "o", [[t0, 0], [t0 + .05, 1], [t0 + .6, 0]]);
    E.F(t => { const u = seg(t, t0, .6), gx = -60 + Math.pow(seg(t0, GRAB, ARRIVE - GRAB), 1.8) * 520; d.style.transform = `translate(${gx + 200 + (i % 2 ? 90 : -60) * u}px,${FL - 1000 + u * u * 160 - u * 40}px)`; });
  }
  // the struggle HUD
  const hud = E.el(R, "abs", "left:60px;top:560px;width:960px;display:flex;gap:12px;flex-wrap:wrap;z-index:7;opacity:0");
  const chip = () => E.el(hud, "", `padding:10px 18px;border-radius:16px;background:${INK};color:#fff;font-weight:900;font-size:36px;font-variant-numeric:tabular-nums`);
  const cW = chip(), cH = chip(), cA = chip(), cD = chip();
  E.K(hud, "o", [[GRAB + .2, 0], [GRAB + .4, 1], [BOOM, 1], [BOOM + .2, 0]]);
  E.F(t => {
    const w = seg(t, GRAB, ARRIVE - GRAB);
    cW.textContent = "🍺 × 2 = 4.6 kg";
    cH.innerHTML = `<span style="color:${CORAL}">♥</span> ${Math.round(128 + 44 * w + Math.sin(t * 9) * 4)} bpm`;
    const arms = Math.max(3, Math.round(40 - 37 * w)); cA.textContent = `💪 ARMS: ${arms}%`; cA.style.color = arms < 15 ? CORAL : "#fff";
    const dist = Math.max(0, 8 * (1 - Math.pow(w, 1.8))); cD.textContent = dist > 0.05 ? `🪑 TABLE: ${dist.toFixed(1)} m` : "🪑 TABLE: ✓";
  });
  E.S(ARRIVE, "ding", .7);
  // the explosion
  const boom = E.el(R, "abs", `left:500px;top:${FL - 880}px;width:560px;height:560px;z-index:8;opacity:0`);
  boom.innerHTML = `<svg viewBox="0 0 560 560" width="560" height="560">${Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2; return `<circle cx="${280 + Math.cos(a) * (120 + (i % 3) * 60)}" cy="${280 + Math.sin(a) * (120 + (i % 3) * 60)}" r="${30 + (i % 4) * 14}" fill="#fffbe8"/>`; }).join("")}<circle cx="280" cy="280" r="150" fill="#fffbe8"/>${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2 + .2; return `<path d="M${280 + Math.cos(a) * 200} ${280 + Math.sin(a) * 200} l${Math.cos(a) * 60} ${Math.sin(a) * 60} l14 -10 Z" fill="rgba(220,240,255,.9)" stroke="#9ab" stroke-width="2"/>`; }).join("")}${Array.from({ length: 10 }, (_, i) => `<circle cx="${60 + i * 50}" cy="${80 + (i * 97) % 400}" r="12" fill="#ffc440"/>`).join("")}</svg>`;
  E.K(boom, "o", [[BOOM, 0], [BOOM + .04, 1], [BOOM + .6, 1], [BOOM + 1.1, 0]]); E.K(boom, "s", [[BOOM, .2], [BOOM + .25, 1.25, "out"]]);
  E.clip(BOOM - .02, "sfx/elx-glass-smash.wav", { vol: 1 }); E.clip(BOOM, "sfx/elx-foam-burst.wav", { vol: .9 }); E.shake(BOOM, 22, .45); E.flash(BOOM, "#ffffff", .7, .25);
  E.clip(BOOM + .7, "sfx/crowd-ooh.wav", { vol: .7 });
  E.clip(0, "sfx/elx-bar-cheer.wav", { vol: .3, to: 2.5, duck: true });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/crowd-murmur.wav", { vol: .25, to: Math.min(6, DUR - t), duck: true });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 54, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.3);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Pfft. How hard<br>can it be?", { left: 30, top: 1260, w: 480, tail: 40, t0: T1, t1: GRAB + .4 });
  bubble("PROST!!", { left: 300, top: 740, w: 400, tail: 200, t0: T2, t1: BOOM + .1, size: 76 });
  E.clip(T1 + .05, "voices/sk41/t1.wav", { vol: 1.5 }); E.clip(T2 + .05, "voices/sk41/t2.wav", { vol: 1.6 });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1160px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "OKTOBERFEST 1 — GARY 0", STAMP, { size: 70, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const pill = E.el(R, "abs", "left:80px;top:236px;width:920px;height:96px;border-radius:20px;background:rgba(255,255,255,.93);z-index:7;box-shadow:0 10px 24px rgba(0,0,0,.15)");
  E.K(pill, "o", [[GRAB, 1], [GRAB + .2, 0]]);
  const title = E.text(titleBox, "Oktoberfest: *how hard can it be?*", { size: 50, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK, css: "text-shadow:0 2px 12px rgba(255,255,255,.8)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, GRAB, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
