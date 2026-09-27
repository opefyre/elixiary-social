// SK.28 "Checking your bank app after 'one drink'." — Rico (the "let's split it evenly" guy), morning after, in bed, one eye
// open. The bank app loads one transaction at a time: €12.50 ("One drink. Told you.") … €46 … €186 ("A hundred and
// eighty-six?!") … karaoke … three kebabs, two minutes apart … 04:07 PoolToys Online, €89.99. The doorbell rings.
// Cut to the doorway: Rico hugging a giant inflatable swan. "…his name is Gerald."  Voices: ElevenLabs (Rico: Liam).
export const meta = {
  id: "sk28-bank-app",
  images: { squint: "cutouts/rico_squint.webp", shock: "cutouts/rico_shock.webp", swan: "cutouts/rico_swan.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", RED = "#e5484d";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const R1 = .4, T1 = 3.2, R2 = 3.6, T2 = 6.5, T3 = 7.3, R3 = 7.7, T4 = 10.0, K1 = 10.8, R4 = 12.2, T5 = 13.8, R5 = 14.3, BELL = 17.0, DOOR = 18.0, R6 = 19.2, STAMP = 20.4, DUR = 23.0;
  E.music({ bpm: 96, root: 57, seed: 28, prog: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], until: BELL });
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);

  // ================= scene 1: the bedroom, the morning after =================
  const S1 = E.scene("bed", 0, DOOR, "light"); E.cur = S1; const A = S1.el;
  E.el(A, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#cfd8dc,#b8c4c9)");
  // the window: curtains half-open, a blade of too-bright morning light
  const win = E.el(A, "abs", "left:660px;top:1000px;width:360px;height:420px;background:linear-gradient(180deg,#fffbe6,#ffe9a8);box-shadow:0 0 0 14px #eef2f3");
  E.el(win, "abs", "left:-30px;top:-30px;width:170px;height:480px;border-radius:0 0 40px 0;background:repeating-linear-gradient(90deg,#6b7fa8 0 26px,#5b6e96 26px 40px)");
  E.el(win, "abs", "left:250px;top:-30px;width:140px;height:480px;border-radius:0 0 0 40px;background:repeating-linear-gradient(90deg,#6b7fa8 0 26px,#5b6e96 26px 40px)");
  const beam = E.el(A, "abs", "left:300px;top:1000px;width:520px;height:900px;background:linear-gradient(200deg,rgba(255,244,200,.55),rgba(255,244,200,0) 70%);clip-path:polygon(75% 0,100% 0,60% 100%,0 100%);z-index:1");
  E.F(t => { beam.style.opacity = .75 + Math.sin(t * 1.3) * .1; });
  // the headboard, pillows
  E.el(A, "abs", "left:110px;top:1130px;width:860px;height:460px;border-radius:40px 40px 0 0;background:linear-gradient(180deg,#8a6a52,#6e523e);box-shadow:inset 0 -10px 0 rgba(0,0,0,.15)");
  [[170, 1330, -6], [560, 1320, 5]].forEach(([x, y, r]) => E.el(A, "abs", `left:${x}px;top:${y}px;width:360px;height:170px;border-radius:70px;background:linear-gradient(180deg,#fff,#e6ebee);transform:rotate(${r}deg);box-shadow:0 8px 16px rgba(0,0,0,.12)`));
  // the nightstand: lamp wearing a party hat, a knocked-over glass, a crumpled receipt
  const ns = E.el(A, "abs", "left:-40px;top:1470px;width:220px;height:450px;z-index:3");
  ns.innerHTML = `<svg viewBox="0 0 220 450" width="220" height="450"><rect x="0" y="80" width="220" height="370" rx="10" fill="#8a6a52"/><rect x="0" y="80" width="220" height="24" rx="8" fill="#9c7a60"/><rect x="30" y="160" width="160" height="12" rx="6" fill="#6e523e"/>` +
    `<rect x="120" y="-10" width="16" height="90" fill="#c8b08a"/><path d="M84 -120 H172 L192 -10 H64 Z" fill="#f4e6c8"/>` +
    `<g transform="translate(128 -120)"><path d="M-34 0 L0 -90 L34 0 Z" fill="${CORAL}"/><path d="M-26 -20 L26 -20 M-17 -44 L17 -44 M-8 -68 L8 -68" stroke="${GOLD}" stroke-width="7"/><circle cx="0" cy="-92" r="10" fill="${GOLD}"/></g>` +
    `<g transform="translate(70 66) rotate(80)"><path d="M0 0 H30 L26 50 H4 Z" fill="rgba(220,240,255,.8)" stroke="#8aa" stroke-width="2"/></g><ellipse cx="40" cy="80" rx="36" ry="6" fill="rgba(160,200,230,.6)"/>` +
    `<path d="M150 64 l20 -10 l14 8 l-6 14 l-22 2 Z" fill="#fff" stroke="#ccc" stroke-width="2"/></svg>`;
  E.el(A, "abs", "left:0;top:1320px;width:0;height:0");
  // a traffic cone in the corner (nobody knows)
  const cone = E.el(A, "abs", "left:930px;top:1560px;width:140px;height:230px;z-index:6");
  cone.innerHTML = `<svg viewBox="0 0 140 230" width="140" height="230"><path d="M52 0 H88 L130 200 H10 Z" fill="#ff7a1a"/><path d="M42 60 H98 L106 100 H34 Z M28 130 H112 L120 170 H20 Z" fill="#fff"/><rect x="0" y="196" width="140" height="30" rx="6" fill="#e0650e"/></svg>`;

  // Rico, waist-up, behind the duvet
  const RH = 900, RW = RH * 865 / 1155, RL = 540 - RW / 2, RT = 1000;
  const rico = E.el(A, "abs", `left:${RL}px;top:${RT}px;width:${RW}px;height:${RH}px;z-index:4`);
  const ricoIn = E.el(rico, "abs", `left:0;top:0;width:${RW}px;height:${RH}px;transform-origin:50% 90%`);
  const rEls = { squint: E.img(ricoIn, "squint", `position:absolute;left:0;top:0;width:${RW}px;height:${RH}px`), shock: E.img(ricoIn, "shock", `position:absolute;left:0;top:0;width:${RW}px;height:${RH}px`) };
  const RP = [[0, "squint"], [R3 - .1, "shock"], [R5 - .1, "squint"], [BELL, "shock"]];
  E.F(t => {
    const f = at(RP, t); for (const n in rEls) rEls[n].style.opacity = n === f ? 1 : 0;
    let y = Math.sin(t * 1.8) * 4, r = Math.sin(t * 1.1) * 1.2;
    if (t >= R2 && t < T2) { y -= 14 * seg(t, R2, .4); r = -2; }                                  // smug little sit-up at "told you"
    for (const k of [R3 - .1, R5 - .1, BELL]) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 26;
    ricoIn.style.transform = `translateY(${y}px) rotate(${r}deg)`;
  });
  // the duvet (in front of him)
  const duv = E.el(A, "abs", "left:-40px;top:1560px;width:1160px;height:400px;z-index:5");
  duv.innerHTML = `<svg viewBox="0 0 1160 400" width="1160" height="400"><path d="M0 60 Q180 0 360 40 T720 30 T1160 50 V400 H0 Z" fill="#f2f5f7"/><path d="M0 60 Q180 0 360 40 T720 30 T1160 50" stroke="#dde3e7" stroke-width="10" fill="none"/>` +
    `<path d="M120 140 Q300 100 420 170 M600 120 Q760 90 900 160 M260 260 Q480 220 640 280" stroke="#dde3e7" stroke-width="8" fill="none" stroke-linecap="round"/>` +
    `<path d="M0 60 Q180 0 360 40 T720 30 T1160 50 V110 Q720 90 360 100 T0 120 Z" fill="#9bb7d4" opacity=".55"/></svg>`;

  // ================= the bank app =================
  const app = E.el(A, "abs", "left:110px;top:350px;width:860px;padding:26px 34px 22px;border-radius:44px;background:rgba(255,255,255,.93);box-shadow:0 30px 70px rgba(20,35,29,.35);z-index:8;opacity:0");
  E.K(app, "o", [[R1 + 1.4, 0], [R1 + 1.7, 1], [BELL + .2, 1], [BELL + .5, 0]]); E.K(app, "y", [[R1 + 1.4, 60], [R1 + 1.8, 0, "out"], [BELL + .2, 0], [BELL + .5, 80, "in"]]);
  const head = E.el(app, "", "display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #e7ecef;padding-bottom:14px;margin-bottom:6px");
  E.el(head, "", "font-weight:700;font-size:30px;color:#6b7a80", "Main account · Saturday");
  const bal = E.el(head, "", `font-weight:800;font-size:44px;color:${INK};font-variant-numeric:tabular-nums`, "€1,632.00");
  const ROWS = [
    [T1, "21:04", "🍸", "The Lime Bar", 12.50],
    [T2, "21:31", "🍸", "The Lime Bar", 46.00],
    [T3, "22:15", "🍸", "The Lime Bar", 186.00, "red"],
    [T4, "00:48", "🎤", "Karaoke Kingdom", 64.00],
    [K1, "01:12", "🥙", "Kebab Palace", 9.80, "kebab"],
    [K1 + .45, "01:14", "🥙", "Kebab Palace", 9.80, "kebab"],
    [K1 + .9, "01:31", "🥙", "Kebab Palace", 9.80, "kebab"],
    [T5, "04:07", "🛒", "PoolToys Online", 89.99, "gold"],
  ];
  let running = 1632;
  const balKeys = [[0, running]];
  ROWS.forEach(([t0, time, icon, name, amt, hl]) => {
    const row = E.el(app, "", "position:relative;display:flex;align-items:center;gap:18px;padding:9px 12px;border-radius:18px;opacity:0");
    E.el(row, "", "width:74px;font-weight:600;font-size:26px;color:#8a979c;font-variant-numeric:tabular-nums", time);
    E.el(row, "", "width:52px;height:52px;border-radius:50%;background:#eef2f4;display:flex;align-items:center;justify-content:center;font-size:30px", icon);
    E.el(row, "", `flex:1;font-weight:700;font-size:36px;color:${INK}`, name);
    const am = E.el(row, "", `font-weight:800;font-size:38px;color:${hl === "red" ? RED : INK};font-variant-numeric:tabular-nums`, `−€${amt.toFixed(2)}`);
    E.K(row, "o", [[t0, 0], [t0 + .12, 1]]); E.K(row, "x", [[t0, 40], [t0 + .3, 0, "out"]]); E.S(t0, "tick", .7);
    if (hl) {
      const bg = { red: "rgba(229,72,77,.16)", kebab: "rgba(245,196,81,.28)", gold: "rgba(245,196,81,.45)" }[hl];
      const hlt = hl === "kebab" ? R4 : t0 + .25;
      E.F(t => { row.style.background = t >= hlt ? bg : "transparent"; });
      if (hl === "red") { E.K(am, "s", [[t0, 1], [t0 + .25, 1.35, "out"], [t0 + .6, 1.15, "io"]]); am.style.transformOrigin = "100% 50%"; }
      if (hl === "gold") { E.K(row, "s", [[t0, 1], [t0 + .25, 1.05, "out"], [t0 + .5, 1]]); }
    }
    running -= amt; balKeys.push([t0, running]);
  });
  E.F(t => { bal.textContent = "€" + at(balKeys, t).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); bal.style.color = t >= T3 ? RED : INK; });
  E.S(T3 + .02, "blare", .6); E.shake(T3 + .05, 10, .3);
  E.clip(T5 + .1, "sfx/elx-msg-pop.wav", { vol: .6 });
  E.clip(BELL, "sfx/doorbell.wav", { vol: 1 });

  // ================= bubbles =================
  const bubble = (P, html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false } = o;
    const b = E.el(P, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:#fff;border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.3);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:#fff;transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const BL = { left: 90, top: 1030, w: 380, tail: 300 };
  bubble(A, "Okay. How bad<br>can it be.", { ...BL, t0: R1, t1: T1 - .05, italic: true });
  bubble(A, "One drink.<br>Told you.", { ...BL, t0: R2, t1: T2 - .05 });
  bubble(A, "€186?!", { ...BL, t0: R3, t1: T4 - .05, size: 64 });
  bubble(A, "…three<br>kebabs?", { ...BL, t0: R4, t1: T5 - .05 });
  bubble(A, "What did I buy<br>at 4 AM?", { ...BL, t0: R5, t1: BELL - .05, italic: true });
  E.clip(R1 + .05, "voices/sk28/r1.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk28/r2.wav", { vol: 1.5 }); E.clip(R3 + .05, "voices/sk28/r3.wav", { vol: 1.5 });
  E.clip(R4 + .05, "voices/sk28/r4.wav", { vol: 1.5 }); E.clip(R5 + .05, "voices/sk28/r5.wav", { vol: 1.5 });
  const ding = E.el(A, "abs", `left:640px;top:1040px;padding:10px 24px;border-radius:20px;background:${INK};color:#fff;font-weight:800;font-size:48px;z-index:9;opacity:0`, "🔔 DING-DONG");
  E.pop(ding, BELL + .05, { from: .4, dur: .3 }); E.K(ding, "r", [[BELL, -8], [BELL + .3, 4, "back"]]);

  // title (frame 0)
  const titleBox = E.el(A, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The bank app after *“one drink.”*", { size: 52, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, T3 - .2, .2);

  // ================= scene 2: the front door =================
  const S2 = E.scene("door", DOOR, DUR, "light"); E.cur = S2; const B = S2.el;
  E.wipe(DOOR);
  E.el(B, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#e8e0d4,#d8cebf)");
  // the open door frame with bright daylight outside
  E.el(B, "abs", "left:120px;top:380px;width:840px;height:1400px;background:#fff;border-radius:8px 8px 0 0");
  const out = E.el(B, "abs", "left:150px;top:410px;width:780px;height:1370px;overflow:hidden;background:linear-gradient(180deg,#9ed4f0,#d8f0fa 60%)");
  out.innerHTML = `<svg viewBox="0 0 780 1370" width="780" height="1370"><path d="M0 1000 Q200 930 400 980 T780 960 V1370 H0 Z" fill="#8bc48a"/><rect x="0" y="1150" width="780" height="220" fill="#b9b2a6"/><circle cx="640" cy="200" r="60" fill="#fff4c4"/>` +
    `<g transform="translate(60 820)"><rect x="0" y="40" width="120" height="160" fill="#7a9a5a"/><circle cx="60" cy="40" r="80" fill="#6aa04c"/></g></svg>`;
  const door = E.el(B, "abs", "left:880px;top:410px;width:190px;height:1370px;background:linear-gradient(90deg,#5a3a28,#6e4a34);border-radius:0 6px 0 0;box-shadow:-10px 0 30px rgba(0,0,0,.3)");
  E.el(door, "abs", "left:26px;top:700px;width:22px;height:60px;border-radius:10px;background:${GOLD}".replace("${GOLD}", GOLD));
  E.el(B, "abs", "left:0;top:1780px;width:1080px;height:140px;background:#a48a6a");
  // the torn delivery box
  const box = E.el(B, "abs", "left:620px;top:1560px;width:380px;height:260px;z-index:5");
  box.innerHTML = `<svg viewBox="0 0 380 260" width="380" height="260"><path d="M20 60 H360 V250 H20 Z" fill="#c89b62"/><path d="M20 60 L-10 10 L150 30 L170 60 Z M360 60 L390 14 L230 30 L210 60 Z" fill="#b88a52"/>` +
    `<rect x="60" y="110" width="200" height="70" fill="#fff"/><text x="160" y="140" text-anchor="middle" font-family="Noto Sans" font-weight="800" font-size="24" fill="${INK}">POOLTOYS</text><text x="160" y="168" text-anchor="middle" font-family="Noto Sans" font-size="18" fill="${INK}">1× SWAN (2.4 m)</text>` +
    `<path d="M280 100 l40 40 M320 100 l-40 40" stroke="${CORAL}" stroke-width="6"/></svg>`;
  // Rico + Gerald
  const SWH = 1300, SWW = SWH * 620 / 1000;
  const sw = E.el(B, "abs", `left:${470 - SWW / 2}px;top:${1800 - SWH}px;width:${SWW}px;height:${SWH}px;z-index:4`);
  const swIn = E.el(sw, "abs", `left:0;top:0;width:${SWW}px;height:${SWH}px;transform-origin:50% 100%`);
  E.img(swIn, "swan", `width:${SWW}px;height:${SWH}px`);
  E.F(t => { swIn.style.transform = `rotate(${Math.sin(t * 1.6) * 1.5}deg) scale(${1 + Math.sin(t * 2.2) * .008})`; });
  E.clip(DOOR + .1, "sfx/angel-choir.wav", { vol: .45, to: 3 });
  // little hearts
  for (let i = 0; i < 5; i++) {
    const h = E.el(B, "abs", `left:${640 + (i % 3) * 60}px;top:${700 + i * 20}px;font-size:${40 + (i % 2) * 16}px;z-index:6;opacity:0`, "❤");
    h.style.color = CORAL; const t0 = R6 + .2 + i * .18;
    E.K(h, "o", [[t0, 0], [t0 + .1, 1], [t0 + 1.4, 0]]); E.K(h, "y", [[t0, 0], [t0 + 1.4, -180, "out"]]);
  }
  bubble(B, "…his name<br>is Gerald.", { left: 560, top: 470, w: 420, tail: 100, t0: R6, t1: DUR, size: 54, italic: true });
  E.clip(R6 + .05, "voices/sk28/r6.wav", { vol: 1.6 });
  const stampBox = E.el(B, "abs", "left:0;top:1380px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "−€427.89 (+ GERALD)", STAMP, { size: 72, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  E.cur = S1;
  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
