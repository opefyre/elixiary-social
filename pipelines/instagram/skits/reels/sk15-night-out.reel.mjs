// SK.15 "New parents' first night out." — a cocktail lounge, 8:02 PM. "To us!" Clink. The phone buzzes; they check the baby
// monitor: sleeping like an angel. "Just checking." PHONE CHECKS: 1 … 4 … 7 … 11. At 8:31 they both yawn. At 8:47 they are
// asleep on each other, both drinks still full. Stamp: 8:47 PM. PARTY OVER.
// Voice: ElevenLabs (Marta). Effects: generated lounge room tone, glass clink, phone buzz, yawn, snore. Lounge and monitor in code.
export const meta = {
  id: "sk15-night-out",
  images: { cheers: "cutouts/parents_cheers.webp", phone: "cutouts/parents_phone.webp", yawn: "cutouts/parents_yawn.webp", asleep: "cutouts/parents_asleep.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.music({ bpm: 92, root: 53, seed: 29, prog: [[0, 4, 7, 11], [5, 9, 12, 16], [2, 5, 9, 12], [7, 11, 14, 17]] });
  const TOAST = .6, CHECK1 = 3.0, WHISPER = 4.1, BACK1 = 6.2, CHECKS = 7.4, YAWN = 11.0, ASLEEP = 13.6, STAMP = 15.6, DUR = 19.0;
  const S = E.scene("lounge", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);

  // ================= the lounge =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#1d1420,#2a1a26 55%,#180f16)");
  // velvet panelled wall
  E.el(R, "abs", "left:0;top:560px;width:1080px;height:900px;background:repeating-linear-gradient(90deg,#4a1f33 0 64px,#3d182a 64px 70px);box-shadow:inset 0 30px 60px rgba(0,0,0,.45)");
  E.el(R, "abs", "left:0;top:552px;width:1080px;height:10px;background:linear-gradient(90deg,#8a6526,#f2d27a,#8a6526)");
  // back bar with bokeh bottles
  const bok = [];
  for (let i = 0; i < 20; i++) bok.push([E.el(R, "abs", `left:${(i * 131) % 1060}px;top:${420 + (i * 37) % 120}px;width:${30 + (i % 4) * 16}px;height:${30 + (i % 4) * 16}px;border-radius:50%;background:radial-gradient(circle,${["rgba(255,190,110,.7)", "rgba(255,120,150,.5)", "rgba(140,200,255,.45)"][i % 3]},transparent 70%);filter:blur(3px)`), i]);
  E.F(t => bok.forEach(([b, i]) => { b.style.opacity = .5 + .5 * Math.abs(Math.sin(t * .8 + i)); }));
  // pendant lamps
  [270, 810].forEach(x => {
    E.el(R, "abs", `left:${x - 2}px;top:0;width:4px;height:330px;background:#111`);
    E.el(R, "abs", `left:${x - 70}px;top:320px;width:140px;height:70px;border-radius:70px 70px 10px 10px;background:linear-gradient(180deg,#b8893a,#6d4f1d)`);
    E.el(R, "abs", `left:${x - 220}px;top:360px;width:440px;height:520px;background:linear-gradient(180deg,rgba(255,210,140,.28),transparent);clip-path:polygon(35% 0,65% 0,100% 100%,0 100%)`);
  });
  // neon clock sign on the wall: the time of night
  const neon = E.el(R, "abs", `left:0;top:640px;width:1080px;text-align:center;font-family:"Noto Sans";font-weight:800;font-size:96px;letter-spacing:.04em;color:#ffe6f4;text-shadow:0 0 6px #fff,0 0 18px #ff4fd8,0 0 40px #ff4fd8,0 0 80px #ff2fc0;font-variant-numeric:tabular-nums`, "8:02 PM");
  const clockAt = [[0, "8:02 PM"], [CHECK1, "8:05 PM"], [CHECKS, "8:14 PM"], [CHECKS + 1.2, "8:19 PM"], [CHECKS + 2.4, "8:25 PM"], [YAWN, "8:31 PM"], [ASLEEP, "8:47 PM"]];
  E.F(t => { const s = at(clockAt, t); if (neon.textContent !== s) neon.textContent = s; neon.style.opacity = .85 + .15 * (Math.sin(t * 31) > .96 ? 0 : 1); });
  clockAt.slice(1).forEach(([k]) => E.K(neon, "s", [[k - .01, 1], [k, 1.08], [k + .25, 1, "out"]]));
  // banquette behind them
  E.el(R, "abs", "left:30px;top:960px;width:1020px;height:560px;border-radius:60px 60px 0 0;background:repeating-linear-gradient(90deg,#1f4b3a 0 120px,#1a3f31 120px 126px);box-shadow:inset 0 20px 40px rgba(0,0,0,.4)");

  // ================= the couple =================
  const P = { cheers: [1004, 682], phone: [1020, 684], yawn: [1008, 682], asleep: [989, 687] };
  const cp = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px");
  const cpIn = E.el(cp, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:540px 1500px");
  const pEls = Object.entries(P).map(([n, [w, h]]) => { const W = 980, H = h * W / w; return [n, E.img(cpIn, n, `position:absolute;left:${540 - W / 2}px;top:${1520 - H}px;width:${W}px;height:${H}px`)]; });
  const PP = [[0, "cheers"], [CHECK1, "phone"], [BACK1, "cheers"], [CHECKS, "phone"], [YAWN, "yawn"], [ASLEEP, "asleep"]];
  E.F(t => {
    const f = at(PP, t); pEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    let y = Math.sin(t * 1.8) * 3; for (const [k] of PP.slice(1)) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 12;
    if (t >= ASLEEP) y = Math.sin(t * 1.2) * 4;                                               // slow breathing
    cpIn.style.transform = `translateY(${y}px)`;
  });
  // the table in front: marble top, two coasters, a candle
  E.el(R, "abs", "left:0;top:1500px;width:1080px;height:50px;background:linear-gradient(180deg,#f3f1ec,#cfcbc2);box-shadow:0 12px 24px rgba(0,0,0,.4)");
  E.el(R, "abs", "left:0;top:1550px;width:1080px;height:370px;background:linear-gradient(180deg,#2a1a14,#140c08)");
  const cand = E.el(R, "abs", "left:500px;top:1400px;width:80px;height:110px");
  cand.innerHTML = `<svg viewBox="0 0 80 110" width="80" height="110"><path d="M10 40 Q8 104 40 106 Q72 104 70 40 Z" fill="rgba(255,190,110,.35)" stroke="rgba(255,255,255,.6)" stroke-width="2"/><rect x="28" y="62" width="24" height="42" rx="4" fill="#fbf2de"/></svg>`;
  const flame = E.el(R, "abs", "left:532px;top:1436px;width:16px;height:28px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(ellipse at 50% 70%,#fff 0 20%,#ffd35c 40%,#ff8a2a 65%,transparent 72%)");
  E.F(t => { flame.style.transform = `scale(${1 + Math.sin(t * 19) * .08},${1 + Math.cos(t * 23) * .1})`; });

  // their two untouched drinks appear on the table once they have dozed off
  const drinks = E.el(R, "abs", "left:360px;top:1350px;width:360px;height:160px;opacity:0");
  drinks.innerHTML = `<svg viewBox="0 0 360 160" width="360" height="160">
    <path d="M10 20 Q70 90 130 20 Z" fill="#f28ca0"/><path d="M6 16 Q70 100 134 16" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="4"/><rect x="66" y="56" width="8" height="90" fill="rgba(255,255,255,.8)"/><ellipse cx="70" cy="150" rx="36" ry="8" fill="rgba(255,255,255,.8)"/><path d="M112 14 q14 -6 18 8" stroke="#f2c14e" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M230 50 L236 150 H314 L320 50 Z" fill="rgba(200,110,40,.85)" stroke="rgba(255,255,255,.85)" stroke-width="4"/><rect x="250" y="70" width="40" height="40" rx="6" fill="rgba(255,255,255,.45)"/><path d="M296 54 q16 -4 22 10" stroke="#f08a24" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`;
  E.K(drinks, "o", [[ASLEEP - .05, 0], [ASLEEP + .1, 1]]);
  // ================= the baby monitor on the phone =================
  const mon = E.el(R, "abs", `left:430px;top:1960px;width:460px;zoom:.8;border-radius:34px;background:#0e0e12;box-shadow:0 24px 50px rgba(0,0,0,.55),inset 0 0 0 4px #333;padding:18px;z-index:7;opacity:0`);
  mon.innerHTML = `<div style="position:relative;height:250px;border-radius:20px;overflow:hidden;background:#2d3b35">
    <svg viewBox="0 0 384 250" width="384" height="250" style="filter:saturate(.2) brightness(1.1)"><rect width="384" height="250" fill="#43574c"/>
      <rect x="40" y="40" width="304" height="190" rx="18" fill="#5d7266"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${58 + i * 32}" y="40" width="8" height="190" fill="#7d9186"/>`).join("")}
      <ellipse cx="192" cy="170" rx="110" ry="46" fill="#c9d6ce"/><circle cx="150" cy="148" r="30" fill="#e8d9c6"/><path d="M134 146 q6 4 12 0 M154 146 q6 4 12 0" stroke="#555" stroke-width="3" fill="none"/>
      <path d="M170 150 Q250 120 290 170 Q250 200 180 190 Z" fill="#a8c6e8"/></svg>
    <div style="position:absolute;left:14px;top:12px;display:flex;align-items:center;gap:8px;font-family:Inter;font-weight:700;font-size:20px;color:#fff"><span class="rec" style="width:14px;height:14px;border-radius:50%;background:#ff3b30"></span>LIVE · Nursery</div>
    <div style="position:absolute;right:14px;bottom:10px;font-family:Inter;font-size:18px;color:#ddd">🌙 22°C</div></div>
    <div style="margin-top:14px;background:#1f2a24;border-radius:18px;padding:12px 16px;font-family:Inter;font-size:24px;line-height:1.3;color:#fff"><b style="color:#7ee2b1">Babysitter</b><br>All good! Sleeping like an angel 😴</div>`;
  const rec = mon.querySelector(".rec");
  E.F(t => { rec.style.opacity = Math.floor(t * 2) % 2 ? .3 : 1; });
  E.K(mon, "o", [[CHECK1 + .1, 0], [CHECK1 + .3, 1], [BACK1 - .2, 1], [BACK1, 0], [CHECKS + .1, 0], [CHECKS + .3, 1], [YAWN - .2, 1], [YAWN, 0]]);
  E.K(mon, "y", [[CHECK1 + .1, 60], [CHECK1 + .4, 0, "back"], [CHECKS + .1, 60], [CHECKS + .4, 0, "back"]]);

  // ================= pills =================
  const pill = E.el(R, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:50px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;transform-origin:0 50%`, "PHONE CHECKS: 0");
  const CK = [[CHECK1, 1], [CHECKS, 4], [CHECKS + 1.2, 7], [CHECKS + 2.4, 11]];
  E.K(pill, "o", [[CHECK1 - .1, 0], [CHECK1 + .05, 1], [STAMP - .1, 1], [STAMP + .1, 0]]);
  E.F(t => { const n = at([[0, 0], ...CK], t); const s = `PHONE CHECKS: ${n}`; if (pill.textContent !== s) pill.textContent = s; pill.style.background = n >= 7 ? CORAL : INK; pill.style.color = n >= 7 ? INK : "#fff"; });
  CK.forEach(([k]) => { E.K(pill, "s", [[k - .01, 1], [k, 1.15], [k + .2, 1, "back"]]); E.clip(k - .3, "sfx/elx-phone-buzz.wav", { vol: .8 }); });

  // ================= bubbles & sound =================
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 60, bg = "#fff", fg = INK, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.04;letter-spacing:-.02em;color:${fg};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  bubble("To us!", { left: 330, top: 800, w: 380, tail: 190, t0: TOAST, t1: CHECK1 - .1, size: 72, bg: GOLD });
  bubble("…just checking.", { left: 560, top: 820, w: 440, tail: 120, t0: WHISPER, t1: BACK1 - .1, size: 50, italic: true });
  E.clip(TOAST + .05, "voices/sk15/c1.wav", { vol: 1.4 }); E.clip(TOAST + .5, "sfx/elx-glass-clink.wav", { vol: 1 });
  E.clip(WHISPER + .05, "voices/sk15/c2.wav", { vol: 3.6 });
  E.clip(YAWN + .1, "sfx/elx-yawn.wav", { vol: .9 }); E.clip(ASLEEP + .6, "sfx/elx-snore.wav", { vol: .8 }); E.clip(ASLEEP + 2.4, "sfx/elx-snore.wav", { vol: .7 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-lounge.wav", { vol: .2, to: Math.min(6, DUR - t), duck: false });
  const zz = E.el(R, "abs", "left:620px;top:860px;font-weight:800;font-size:64px;color:#b9b6ff;z-index:6;opacity:0", "Z<span style='font-size:46px'>z</span><span style='font-size:34px'>z</span>");
  E.K(zz, "o", [[ASLEEP + .3, 0], [ASLEEP + .6, 1]]); E.F(t => { zz.style.transform = `translate(${Math.sin(t * 2) * 8}px,${-((t * 22) % 44)}px)`; });
  const note = E.el(R, "abs", `left:0;top:1640px;width:1080px;text-align:center;z-index:7;opacity:0`, `<span style="display:inline-block;padding:10px 26px 12px;border-radius:14px;background:rgba(255,255,255,.12);color:#fff;font-weight:700;font-style:italic;font-size:38px">both drinks: still full</span>`);
  E.K(note, "o", [[ASLEEP + 1, 0], [ASLEEP + 1.3, 1]]);
  const stampBox = E.el(R, "abs", "left:100px;top:380px;width:880px;display:flex;justify-content:center;z-index:9");
  const st = E.stamp(stampBox, "8:47 PM. PARTY OVER.", STAMP, { size: 68, rot: -5, bg: CORAL, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Our first *night out.*", { size: 70, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, CHECK1 - .2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
