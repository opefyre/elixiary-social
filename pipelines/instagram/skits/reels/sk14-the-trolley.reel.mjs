// SK.14 "Waiting for the drinks trolley." — row 34, window seat. TROLLEY AT ROW 3 … 12 … 27 … 31. Her eyes get heavy. She falls
// asleep; the trolley arrives at row 34, the attendant looks, and rolls on. She wakes: TROLLEY AT ROW 41. The pilot: "Cabin crew,
// the trolley will come through once more." She holds her eyelids open. ROW 30 … 33 … ding — "We're expecting some turbulence.
// Cabin crew, please take your seats." The trolley reverses away. ROW 34: NEVER.
// Voice: ElevenLabs pilot (Daniel). Effects: generated cabin hum, chime, trolley rattle, snore. Cabin drawn in code.
export const meta = {
  id: "sk14-the-trolley",
  images: { wait: "cutouts/trav_wait.webp", asleep: "cutouts/trav_asleep.webp", eyes: "cutouts/trav_eyes.webp", nooo: "cutouts/trav_nooo.webp", att: "cutouts/attendant.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.music({ bpm: 84, root: 57, seed: 17, prog: [[0, 4, 7, 11], [5, 9, 12, 16], [2, 5, 9, 12], [7, 11, 14, 17]], until: 9.4 });
  const DROWSY = 3.6, SLEEP = 5.0, ARRIVE = 6.2, LEAVE = 7.4, WAKE = 8.7, P1 = 9.6, EYES = 13.0, BACK = 14.0, DING2 = 15.9, P2 = 16.2, STAMP = 18.6, DUR = 21.4;
  const S = E.scene("cabin", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const eo = u => 1 - Math.pow(1 - u, 3);

  // ================= cabin =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#e9e4da,#ddd6c8)");
  // overhead bins and passenger service unit
  const bins = E.el(R, "abs", "left:0;top:380px;width:1080px;height:240px");
  bins.innerHTML = `<svg viewBox="0 0 1080 240" width="1080" height="240"><path d="M0 0 H1080 V150 Q540 210 0 150 Z" fill="#f4f1ea"/><path d="M0 150 Q540 210 1080 150" stroke="#c9c2b4" stroke-width="4" fill="none"/>` +
    `${[180, 540, 900].map(x => `<rect x="${x - 120}" y="60" width="240" height="14" rx="7" fill="#d9d3c6"/>`).join("")}<rect x="0" y="170" width="1080" height="70" fill="#d6cfc0"/>` +
    `${[240, 720].map(x => `<circle cx="${x}" cy="205" r="16" fill="#b9b2a4"/><circle cx="${x + 50}" cy="205" r="16" fill="#b9b2a4"/><rect x="${x + 90}" y="192" width="60" height="26" rx="6" fill="#b9b2a4"/>`).join("")}</svg>`;
  // seatbelt sign
  const sign = E.el(R, "abs", "left:470px;top:585px;width:110px;height:52px;border-radius:10px;background:#3a3a3a;display:flex;align-items:center;justify-content:center");
  sign.innerHTML = `<svg viewBox="0 0 80 40" width="80" height="40"><circle cx="24" cy="10" r="6" class="ic"/><path d="M14 36 V22 Q24 14 34 22 V36" class="ic" fill="none" stroke-width="5"/><path d="M44 26 H74 M52 20 V32 M66 20 V32" class="ic" fill="none" stroke-width="5"/></svg>`;
  const ics = [...sign.querySelectorAll(".ic")];
  E.F(t => { const on = t >= DING2; ics.forEach(i => { i.setAttribute(i.tagName === "circle" ? "fill" : "stroke", on ? "#ffb020" : "#666"); }); sign.style.boxShadow = on ? "0 0 26px 6px rgba(255,176,32,.6)" : "none"; });
  // cabin wall with the window (right) — clouds drift past
    const wnd = E.el(R, "abs", "left:300px;top:640px;width:190px;height:260px;border-radius:95px;overflow:hidden;box-shadow:inset 0 0 0 14px #cfc8b9,0 0 0 6px #e8e2d6");
  wnd.innerHTML = `<svg viewBox="0 0 190 260" width="190" height="260"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa0e0"/><stop offset="1" stop-color="#cfe8fb"/></linearGradient></defs><rect width="190" height="260" fill="url(#sk)"/></svg>`;
  const clouds = [];
  for (let i = 0; i < 5; i++) clouds.push(E.el(wnd, "abs", `left:0;top:${60 + i * 38}px;width:${80 + (i % 3) * 40}px;height:${30 + (i % 2) * 16}px;border-radius:30px;background:#fff;opacity:.9`));
  E.F(t => clouds.forEach((c, i) => { c.style.transform = `translateX(${220 - ((t * (40 + i * 12) + i * 90) % 360)}px)`; }));
  E.el(R, "abs", "left:316px;top:650px;width:158px;height:26px;border-radius:79px 79px 0 0;background:#cfc8b9");                // shade, half up
  // rows of seats in the background (left), with heads
  const rows = E.el(R, "abs", "left:0;top:700px;width:620px;height:600px");
  rows.innerHTML = `<svg viewBox="0 0 620 600" width="620" height="600">${[0, 1, 2].map(i => { const x = 20 + i * 200, s = 1 - i * .12; return `<g transform="translate(${x} ${i * 40}) scale(${s})">` +
    `<circle cx="80" cy="60" r="44" fill="${["#5b3a29", "#e8c07a", "#2e2e2e"][i]}"/><rect x="0" y="80" width="170" height="440" rx="40" fill="#34558b"/><rect x="20" y="96" width="130" height="70" rx="16" fill="#e8e2d6"/></g>`; }).join("")}</svg>`;
  E.el(R, "abs", "left:0;top:700px;width:620px;height:600px;background:linear-gradient(90deg,rgba(221,214,200,0),rgba(221,214,200,.35))");

  // ================= her seat and her =================
  const seat = E.el(R, "abs", "left:540px;top:760px;width:540px;height:800px");
  seat.innerHTML = `<svg viewBox="0 0 540 800" width="540" height="800"><rect x="40" y="0" width="460" height="760" rx="70" fill="#2f4d80"/><rect x="60" y="20" width="420" height="120" rx="40" fill="#e8e2d6"/><path d="M60 140 H480" stroke="#26406b" stroke-width="6"/>` +
    `<rect x="40" y="200" width="460" height="560" rx="40" fill="#34558b"/><path d="M270 220 V740" stroke="#26406b" stroke-width="4"/></svg>`;
  const HER = { wait: [827, 1147], asleep: [843, 1157], eyes: [880, 1149], nooo: [878, 1089] };
  const her = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px");
  const herIn = E.el(her, "abs", "left:0;top:0;width:1080px;height:1920px");
  const hEls = Object.entries(HER).map(([n, [w, h]]) => { const H = 860, W = w * H / h; return [n, E.img(herIn, n, `position:absolute;left:${800 - W / 2}px;top:${1560 - H}px;width:${W}px;height:${H}px`)]; });
  const HP = [[0, "wait"], [SLEEP, "asleep"], [WAKE, "nooo"], [EYES, "eyes"], [P2 + .4, "nooo"]];
  E.F(t => {
    const f = at(HP, t); hEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    let y = Math.sin(t * 2) * 3, r = 0;
    if (t >= DROWSY && t < SLEEP) { const u = seg(t, DROWSY, SLEEP - DROWSY); r = Math.sin(t * 5) * 4 * u; y += u * 16; }          // nodding off
    for (const [k] of HP.slice(1)) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 16;
    herIn.style.transform = `translateY(${y}px) rotate(${r}deg)`; herIn.style.transformOrigin = "800px 1500px";
  });
  // droopy-eyelid overlay while she fights sleep
  const lids = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,0) 22%,rgba(0,0,0,0) 78%,rgba(0,0,0,.55) 100%);z-index:7;opacity:0;pointer-events:none");
  E.F(t => { lids.style.opacity = t >= DROWSY && t < SLEEP + .3 ? seg(t, DROWSY, 1.4) * (.6 + .4 * Math.abs(Math.sin(t * 3))) : 0; });
  // armrest and tray table in front of her
  E.el(R, "abs", "left:540px;top:1500px;width:540px;height:60px;border-radius:14px;background:linear-gradient(180deg,#c9c2b4,#a9a192);z-index:3");
  E.el(R, "abs", "left:0;top:1560px;width:1080px;height:360px;background:#556070;background-image:repeating-linear-gradient(45deg,rgba(255,255,255,.05) 0 10px,transparent 10px 20px)");   // aisle carpet
  const zz = E.el(R, "abs", "left:880px;top:880px;font-weight:800;font-size:60px;color:#7b7fc4;z-index:6;opacity:0", "Z<span style='font-size:44px'>z</span><span style='font-size:32px'>z</span>");
  E.K(zz, "o", [[SLEEP + .2, 0], [SLEEP + .4, 1], [WAKE - .1, 1], [WAKE, 0]]); E.F(t => { zz.style.transform = `translate(${Math.sin(t * 2) * 8}px,${-((t * 22) % 44)}px)`; });
  E.clip(SLEEP + .4, "sfx/elx-snore.wav", { vol: .8 }); E.clip(SLEEP + 1.9, "sfx/elx-snore.wav", { vol: .6 });

  // ================= the trolley =================
  const AH = 960, AW = 853 * AH / 1141;
  const att = E.el(R, "abs", `left:0;top:${1800 - AH}px;width:${AW}px;height:${AH}px;z-index:5`);
  const attIn = E.el(att, "abs", `left:0;top:0;width:${AW}px;height:${AH}px`);            // the wobble lives here; x keyframes stay on att
  E.img(attIn, "att", `width:${AW}px;height:${AH}px`);
  // pass 1: rolls in, pauses at her row, rolls on out. pass 2: rolls in slowly, then reverses away at the turbulence
  E.K(att, "x", [[ARRIVE - 1.2, -AW - 40], [ARRIVE, 40, "out"], [LEAVE, 40], [LEAVE + 1.1, 1180, "in"],
    [BACK, -AW - 40], [DING2, -120, "out"], [P2 + .6, -120], [P2 + 1.8, -AW - 60, "in"]]);
  E.F(t => { const moving = (t > ARRIVE - 1.2 && t < ARRIVE) || (t > LEAVE && t < LEAVE + 1.1) || (t > BACK && t < DING2) || (t > P2 + .6 && t < P2 + 1.8); attIn.style.transform = moving ? `translateY(${Math.sin(t * 30) * 2}px)` : "none"; });
  E.clip(ARRIVE - 1.2, "sfx/elx-trolley.wav", { vol: .8, to: 1.3 }); E.clip(LEAVE, "sfx/elx-trolley.wav", { vol: .8, to: 1.2 });
  E.clip(BACK, "sfx/elx-trolley.wav", { vol: .6, to: 2 }); E.clip(P2 + .6, "sfx/elx-trolley.wav", { vol: .8, to: 1.3 });
  // the attendant peeks, sees her asleep: a small "shh" of dots
  const shh = E.el(R, "abs", "left:420px;top:880px;font-weight:800;font-size:52px;color:#555;z-index:6;opacity:0", "…");
  E.K(shh, "o", [[ARRIVE + .3, 0], [ARRIVE + .5, 1], [LEAVE - .1, 1], [LEAVE, 0]]);

  // ================= row pill =================
  const pill = E.el(R, "abs", `left:100px;top:258px;display:inline-flex;align-items:center;gap:14px;background:${INK};color:#fff;font-weight:800;font-size:50px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;transform-origin:0 50%`);
  pill.innerHTML = `<span>TROLLEY AT ROW 3</span><span style="font-size:32px;opacity:.75">· YOU: 34</span>`;
  const ptxt = pill.firstChild;
  const ROWS = [[0, 3], [1.4, 8], [2.2, 12], [3.0, 20], [3.8, 27], [4.6, 31], [ARRIVE, 34], [LEAVE + .6, 36], [WAKE, 41], [EYES + .1, 12], [EYES + .5, 20], [BACK, 27], [BACK + .7, 30], [BACK + 1.3, 32], [DING2 - .3, 33], [P2 + 1.2, 29], [P2 + 1.8, 22]];
  E.K(pill, "o", [[2.6, 0], [2.8, 1]]);
  E.F(t => { const r = at(ROWS, t); const s = `TROLLEY AT ROW ${r}`; if (ptxt.textContent !== s) ptxt.textContent = s; pill.style.background = r === 34 ? "#39d98a" : r > 34 ? CORAL : INK; pill.style.color = r >= 34 ? INK : "#fff"; });
  ROWS.slice(1).forEach(([k]) => E.K(pill, "s", [[k - .01, 1], [k, 1.1], [k + .18, 1, "back"]]));

  // ================= voices, chimes, turbulence =================
  const PA = (html, t0, t1) => {
    const b = E.el(R, "abs", `left:80px;top:420px;width:920px;z-index:9;opacity:0`);
    b.innerHTML = `<div style="display:flex;gap:18px;align-items:center;background:#1b2330;border-radius:26px;padding:18px 26px 20px;box-shadow:0 14px 34px rgba(0,0,0,.35)">` +
      `<svg viewBox="0 0 40 40" width="52" height="52"><path d="M6 15 H13 L23 7 V33 L13 25 H6 Z" fill="${GOLD}"/><path d="M28 14 Q33 20 28 26 M32 9 Q41 20 32 31" stroke="${GOLD}" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>` +
      `<div style="flex:1"><div style="font-weight:800;font-size:22px;letter-spacing:.2em;color:${GOLD};margin-bottom:4px">CAPTAIN</div><div style="font-weight:700;font-size:40px;line-height:1.12;color:#fff">${html}</div></div></div>`;
    E.pop(b, t0, { from: .6, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .1, 1], [t1 - .15, 1], [t1, 0]]);
  };
  PA("Cabin crew, the trolley will come<br>through once more.", P1, EYES + .4);
  PA("We're expecting some turbulence.<br>Cabin crew, please take your seats.", P2, DUR);
  E.clip(P1 - .5, "sfx/elx-cabin-ding.wav", { vol: .9 }); E.clip(P1 + .1, "voices/sk14/p1.wav", { vol: 1.5 });
  E.clip(DING2, "sfx/elx-cabin-ding.wav", { vol: 1 }); E.clip(P2 + .1, "voices/sk14/p2.wav", { vol: 1.5 });
  for (let k = 0; k < 5; k++) E.shake(P2 + .4 + k * .45, 14 - k * 2, .35);
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-cabin-hum.wav", { vol: .35, to: Math.min(6, DUR - t), duck: false });
  const stampBox = E.el(R, "abs", "left:100px;top:700px;width:880px;display:flex;justify-content:center;z-index:9");
  const st = E.stamp(stampBox, "ROW 34: NEVER.", STAMP, { size: 100, rot: -5, bg: CORAL, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Waiting for the *drinks trolley.*", { size: 54, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, 2.5, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
