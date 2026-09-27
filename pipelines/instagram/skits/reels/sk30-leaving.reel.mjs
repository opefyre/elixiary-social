// SK.30 "Trying to leave a party." — a download bar: LEAVING PARTY… 0%. "Right! I'm heading off!" 12% — the host: "Oh, you
// HAVE to try this first!" back to 5%. "No, really. I'm going." Seven hugs. "Okay. One for the road." The door-frame chat:
// 64%, buffering, the clock races past midnight. "Take some leftovers!" 88%. "Byeee! Bye! Bye!" 100% ✓ LEFT. The door
// closes. Outside: "…where's my phone?" Door. 0%.  Voices: ElevenLabs (guest: Will; host: Matilda).
export const meta = {
  id: "sk30-leaving",
  images: { wave: "cutouts/leave_wave.webp", boxes: "cutouts/leave_boxes.webp", happy: "cutouts/mum_happy.webp", pour: "cutouts/mum_pour.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", RED = "#e5484d", MINT = "#8ee3c8";
  E.episode(-16);
  const G1 = .4, H1 = 2.6, G2 = 5.0, G3 = 7.4, TALK = 9.4, H2 = 12.4, G4 = 14.2, SHUT = 15.7, G5 = 16.6, BACK = 17.3, STAMP = 18.6, DUR = 21.2;
  const S = E.scene("hall", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const lerpK = (list, t) => { if (t <= list[0][0]) return list[0][1]; for (let i = 1; i < list.length; i++) if (t < list[i][0]) { const [a, va] = list[i - 1], [b, vb] = list[i]; const u = (t - a) / (b - a); return va + (vb - va) * (1 - Math.pow(1 - u, 3)); } return list[list.length - 1][1]; };
  const FL = 1780;

  // ================= the host's living room, late =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#f1e4d0,#e6d3b8)");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.18) 0 60px,transparent 60px 120px)");
  E.el(R, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background:#8a6448;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.12) 0 3px,transparent 3px 140px)`);
  E.el(R, "abs", `left:0;top:${FL - 16}px;width:1080px;height:18px;background:#fff`);
  // bunting from the party, a wall clock, a coat rack
  const bunt = E.el(R, "abs", "left:0;top:600px;width:1080px;height:120px");
  bunt.innerHTML = `<svg viewBox="0 0 1080 120" width="1080" height="120"><path d="M0 10 Q540 90 1080 10" stroke="#9a8a70" stroke-width="3" fill="none"/>` +
    Array.from({ length: 13 }, (_, i) => { const x = 20 + i * 82, y = 10 + 80 * (1 - Math.pow((x - 540) / 540, 2)) * .95; return `<path d="M${x} ${y} l32 0 l-16 38 Z" fill="${[CORAL, GOLD, MINT, "#9b8cf0"][i % 4]}"/>`; }).join("") + `</svg>`;
  const rack = E.el(R, "abs", `left:300px;top:${FL - 700}px;width:120px;height:700px`);
  rack.innerHTML = `<svg viewBox="0 0 120 700" width="120" height="700"><rect x="54" y="40" width="12" height="650" fill="#6e4a34"/><path d="M60 60 l-50 30 M60 60 l50 30" stroke="#6e4a34" stroke-width="8"/><rect x="20" y="684" width="80" height="16" rx="6" fill="#6e4a34"/>` +
    `<path d="M10 90 Q-10 200 0 330 H40 Q50 200 30 90 Z" fill="#3a5a8a"/></svg>`;
  // the front door (left): frame + a panel that swings open
  const frame = E.el(R, "abs", `left:0;top:${FL - 980}px;width:250px;height:980px;background:#1d2a3a;box-shadow:inset -14px 0 0 #fff,inset 0 14px 0 #fff`);
  frame.innerHTML = `<svg viewBox="0 0 236 966" width="236" height="966" style="position:absolute;left:0;top:14px"><circle cx="160" cy="160" r="3" fill="#fff"/><circle cx="60" cy="90" r="2" fill="#fff"/><circle cx="120" cy="300" r="2" fill="#fff"/><path d="M190 60 a40 40 0 1 0 30 70 a32 32 0 1 1 -30 -70" fill="#f4efc4"/></svg>`;
  const door = E.el(R, "abs", `left:0;top:${FL - 966}px;width:236px;height:966px;background:linear-gradient(90deg,#7a4a30,#8a5a3a);transform-origin:0 50%;z-index:1;box-shadow:inset 0 0 0 16px rgba(0,0,0,.08)`);
  E.el(door, "abs", `left:190px;top:480px;width:22px;height:60px;border-radius:10px;background:${GOLD}`);
  E.K(door, "sx", [[0, 1], [TALK - .2, 1], [TALK + .3, .12, "out"], [SHUT - .3, .12], [SHUT, 1, "in"], [BACK - .5, 1], [BACK - .2, .12, "out"]]);
  E.S(SHUT, "slam", .9); E.shake(SHUT, 12, .3); E.S(BACK - .5, "creak", .7);

  // ================= the guest =================
  const PW = (w, h, H) => [w * H / h, H];
  const [WW, WH] = PW(442, 983, 1000), [BW, BH] = PW(328, 988, 1000);
  const guest = E.el(R, "abs", `left:${440 - WW / 2}px;top:${FL + 20 - WH}px;width:${WW}px;height:${WH}px;z-index:3`);
  const gIn = E.el(guest, "abs", `left:0;top:0;width:${WW}px;height:${WH}px`);
  const gWave = E.img(gIn, "wave", `position:absolute;left:0;top:0;width:${WW}px;height:${WH}px`);
  const gBox = E.img(gIn, "boxes", `position:absolute;left:${(WW - BW) / 2}px;top:0;width:${BW}px;height:${BH}px`);
  E.K(guest, "x", [[TALK - .4, 0], [TALK + .2, -150, "out"], [G4 + .6, -150], [G4 + 1.4, -760, "in"], [BACK - .3, -760], [BACK + .2, -170, "out"]]);
  E.F(t => {
    const boxes = t >= H2 + .3; gWave.style.opacity = boxes ? 0 : 1; gBox.style.opacity = boxes ? 1 : 0;
    let y = Math.sin(t * 2.2) * 4, r = 0;
    if (t >= G4 && t < G4 + 1.4) r = Math.sin(t * 16) * 3;                                      // "bye! bye!" waddle
    for (const k of [H2 + .3, BACK]) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 18;
    gIn.style.transform = `translateY(${y}px) rotate(${r}deg)`;
  });
  // one for the road
  const glass = E.el(R, "abs", `left:560px;top:1180px;width:90px;height:130px;z-index:4;opacity:0`);
  glass.innerHTML = `<svg viewBox="0 0 90 130" width="90" height="130"><path d="M5 5 Q45 70 85 5 Z" fill="${CORAL}" stroke="#fff" stroke-width="3"/><path d="M45 50 V120 M25 124 H65" stroke="#fff" stroke-width="5"/><circle cx="70" cy="10" r="10" fill="#9bd14a"/></svg>`;
  E.K(glass, "o", [[G3 + .3, 0], [G3 + .45, 1], [TALK - .5, 1], [TALK - .3, 0]]); E.K(glass, "y", [[G3 + .3, -200], [G3 + .7, 0, "back"]]); E.S(G3 + .5, "pop", .6);
  // hugs counter
  const hugs = E.el(R, "abs", `left:470px;top:1060px;padding:10px 22px;border-radius:20px;background:${CORAL};color:#fff;font-weight:800;font-size:44px;z-index:8;opacity:0;white-space:nowrap`, "");
  const HUG = [G2 + .4, G2 + .7, G2 + 1.0, G2 + 1.25, G2 + 1.5, G2 + 1.7, G2 + 1.9];
  E.K(hugs, "o", [[G2 + .4, 0], [G2 + .5, 1], [G3 - .1, 1], [G3 + .1, 0]]);
  E.F(t => { const n = HUG.filter(k => t >= k).length; const s = `🤗 HUGS: ${n}`; if (hugs.__s !== s) { hugs.textContent = s; hugs.__s = s; } });
  HUG.forEach(k => E.S(k, "pop", .35));

  // ================= the host =================
  const [HW, HH] = PW(796, 1158, 940), [PWd, PHd] = PW(849, 1157, 940);
  const host = E.el(R, "abs", `left:640px;top:${FL + 30 - HH}px;width:${HW}px;height:${HH}px;z-index:2`);
  const hIn = E.el(host, "abs", `left:0;top:0;width:${HW}px;height:${HH}px`);
  const hHappy = E.img(hIn, "happy", `position:absolute;left:0;top:0;width:${HW}px;height:${HH}px`);
  const hPour = E.img(hIn, "pour", `position:absolute;left:0;top:0;width:${PWd}px;height:${PHd}px`);
  E.K(host, "x", [[TALK - .3, 0], [TALK + .4, -170, "out"], [G4 + .6, -170], [G4 + 1.2, -60, "out"]]);
  const HP = [[0, "happy"], [H1, "pour"], [G2, "happy"], [G3 - .2, "pour"], [G3 + 1.4, "happy"]];
  E.F(t => {
    const f = at(HP, t); hHappy.style.opacity = f === "happy" ? 1 : 0; hPour.style.opacity = f === "pour" ? 1 : 0;
    let y = Math.sin(t * 1.9 + 1) * 4;
    for (const [k] of HP.slice(1)) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 16;
    if (t >= BACK && t < BACK + .5) y -= Math.sin((t - BACK) / .5 * Math.PI) * 30;               // delighted hop: he's back!
    hIn.style.transform = `translateY(${y}px)`;
  });
  E.clip(H1 + .3, "sfx/elx-pour-splash.wav", { vol: .5, to: 1.2 }); E.clip(G3 - .1, "sfx/elx-pour-splash.wav", { vol: .5, to: 1.2 });

  // ================= the download bar + clock =================
  const panel = E.el(R, "abs", "left:70px;top:370px;width:940px;padding:22px 30px 26px;border-radius:30px;background:rgba(255,255,255,.9);box-shadow:0 20px 50px rgba(60,40,20,.25);z-index:8");
  const top = E.el(panel, "", "display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px");
  const lab = E.el(top, "", `font-weight:800;font-size:40px;color:${INK}`, "");
  const clk = E.el(top, "", `font-weight:700;font-size:36px;color:#6b7a80;font-variant-numeric:tabular-nums`, "");
  const track = E.el(panel, "", "position:relative;height:44px;border-radius:22px;background:#e9e2d6;overflow:hidden");
  const fill = E.el(track, "abs", `left:0;top:0;height:44px;border-radius:22px;background:linear-gradient(90deg,${MINT},#4fc39a)`);
  const pct = E.el(track, "abs", `left:0;top:0;width:100%;height:44px;line-height:44px;text-align:center;font-weight:800;font-size:30px;color:${INK};font-variant-numeric:tabular-nums`);
  const P = [[0, 0], [G1 + .4, 0], [G1 + 1.2, 12], [H1 + .3, 12], [H1 + .8, 5], [G2 + .3, 5], [G3 - .3, 30], [G3 + .3, 30], [G3 + .8, 18], [TALK, 18], [TALK + .6, 64], [H2 + .3, 64], [H2 + 1.0, 88], [G4 + .3, 88], [SHUT, 100], [BACK - .1, 100], [BACK + .1, 0]];
  const CLK = [[0, 23 * 60 + 2], [H1, 23 * 60 + 18], [G2, 23 * 60 + 40], [G3, 24 * 60 + 5], [TALK + .6, 24 * 60 + 20], [H2, 25 * 60 + 10], [G4, 25 * 60 + 38], [SHUT, 25 * 60 + 47], [BACK, 25 * 60 + 49]];
  E.F(t => {
    const p = lerpK(P, t), done = t >= SHUT - .05 && t < BACK, stuck = t >= TALK + .6 && t < H2 + .3, drop = (t >= H1 + .3 && t < H1 + 1.2) || (t >= G3 + .3 && t < G3 + 1.2) || t >= BACK - .1;
    fill.style.width = `${p}%`;
    fill.style.background = done ? "linear-gradient(90deg,#4fc39a,#22a06b)" : drop ? `linear-gradient(90deg,${CORAL},${RED})` : `linear-gradient(90deg,${MINT},#4fc39a)`;
    const spin = "◐◓◑◒"[Math.floor(t * 8) % 4];
    const s = done ? "✅ LEFT THE PARTY" : stuck ? `${spin} Buffering… (door chat)` : t >= BACK ? "❌ LEAVING PARTY…" : "⬇ LEAVING PARTY…";
    if (lab.__s !== s) { lab.textContent = s; lab.__s = s; }
    pct.textContent = `${Math.round(p)}%`;
    const m = Math.round(lerpK(CLK, t)) % (24 * 60); clk.textContent = `🕐 ${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  });
  E.K(panel, "s", [[SHUT, 1], [SHUT + .15, 1.06, "out"], [SHUT + .4, 1], [BACK, 1], [BACK + .15, 1.08, "out"], [BACK + .4, 1]]);
  E.S(SHUT + .05, "ding", .8); E.S(BACK + .05, "nope", .9);
  [H1 + .3, G3 + .3].forEach(t => E.S(t, "nope", .5));

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#2a2440" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(60,40,20,.3);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#2a2440" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .35);
  };
  bubble("Right! I’m<br>heading off!", { left: 140, top: 620, w: 460, tail: 300, t0: G1, t1: H1 - .05 });
  bubble("Oh, you HAVE to<br>try this first!", { left: 460, top: 640, w: 520, tail: 400, t0: H1, t1: G2 - .05, dark: true });
  bubble("No, really.<br>I’m going.", { left: 140, top: 620, w: 460, tail: 300, t0: G2, t1: G3 - .05 });
  bubble("Okay. One<br>for the road.", { left: 140, top: 620, w: 460, tail: 300, t0: G3, t1: TALK - .1 });
  // the door-frame chat (no words needed)
  [["…anyway…", 0, 60, 640], ["…so yeah…", .6, 430, 660], ["…ANYWAY.", 1.2, 60, 640], ["…right, right…", 1.8, 400, 660], ["…anyway!", 2.4, 60, 640]].forEach(([s, dt, x, y], i) => {
    const b = E.el(R, "abs", `left:${x}px;top:${y}px;padding:10px 22px;border-radius:24px;background:${i % 2 ? "#2a2440" : "#fff"};color:${i % 2 ? "#fff" : INK};font-weight:700;font-style:italic;font-size:40px;z-index:9;opacity:0;box-shadow:0 10px 24px rgba(60,40,20,.25)`, s);
    const t0 = TALK + .6 + dt; E.K(b, "o", [[t0, 0], [t0 + .1, 1], [t0 + .5, 1], [t0 + .6, 0]]); E.K(b, "s", [[t0, .6], [t0 + .2, 1, "back"]]);
    E.clip(t0, "sfx/crowd-murmur.wav", { vol: .25, to: .5 });
  });
  bubble("Take some<br>leftovers!", { left: 400, top: 640, w: 440, tail: 360, t0: H2, t1: G4 - .05, dark: true });
  bubble("Byeee!<br>Bye! Bye!", { left: 60, top: 640, w: 380, tail: 160, t0: G4, t1: SHUT, size: 54 });
  bubble("…where’s<br>my phone?", { left: 30, top: 660, w: 400, tail: 120, t0: G5, t1: BACK + .4, italic: true });
  E.clip(G1 + .05, "voices/sk30/g1.wav", { vol: 1.5 }); E.clip(H1 + .05, "voices/sk30/h1.wav", { vol: 1.5 }); E.clip(G2 + .05, "voices/sk30/g2.wav", { vol: 1.5 });
  E.clip(G3 + .05, "voices/sk30/g3.wav", { vol: 1.5 }); E.clip(H2 + .05, "voices/sk30/h2.wav", { vol: 1.5 }); E.clip(G4 + .05, "voices/sk30/g4.wav", { vol: 1.5 });
  E.clip(G5 + .05, "voices/sk30/g5.wav", { vol: 1.2 });
  // the party behind, then the quiet night outside
  for (let t = 0; t < SHUT; t += 6) E.clip(t, "sfx/elx-party-music.wav", { vol: .28, to: Math.min(6, SHUT - t), duck: true });
  E.clip(SHUT + .1, "sfx/cicadas.wav", { vol: .35, to: BACK - SHUT, duck: false });
  E.clip(BACK, "sfx/elx-party-music.wav", { vol: .28, to: DUR - BACK, duck: true });

  // ================= stamp =================
  const stampBox = E.el(R, "abs", "left:0;top:1560px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "ETA: 3 AM.", STAMP, { size: 96, rot: -5, bg: CORAL, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Trying to *leave* a party.", { size: 62, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, TALK, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
