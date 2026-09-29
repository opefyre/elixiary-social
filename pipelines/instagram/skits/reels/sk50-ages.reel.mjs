// SK.50 "Drinking at 21 · 31 · 41 · 81." (the trending age-bracket format) — four stat cards, same three lines each:
// 21 — the whole squad, 11 drinks, bed at 5:40 AM, hangover 0 h. 31 — one glass of wine, bed at 22:15, hangover 1 day.
// 41 — two beers, bed at 21:30, hangover 3 days ("Never. Again."). 81 — Grandpa, drinks: yes, bed: tomorrow, hangover:
// never heard of it. "Right! Where's the after-party?"  Voices: ElevenLabs (Rico: Liam; Grandpa: Bill).
export const meta = {
  id: "sk50-ages",
  images: { squad: "cutouts/crowd_hands.webp", couple: "cutouts/couple_fake.webp", bed: "cutouts/rico_squint.webp", gramps: "cutouts/gramps_joy.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", MINT = "#8ee3c8";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const P1 = 0, P2 = 4.6, P3 = 9.0, R1 = 11.0, P4 = 13.6, G1 = 15.6, STAMP = 18.4, DUR = 21.4;
  E.music({ bpm: 120, root: 57, seed: 50, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: P3 });
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);

  // one age panel: background, big age, stat card, character
  const panel = (id, t0, t1, age, bg, stats, hang, build) => {
    const Sc = E.scene(id, t0, t1, "dark"); E.cur = Sc; const P = Sc.el;
    if (t0 > 0) E.wipe(t0);
    E.el(P, "abs", `left:0;top:0;width:1080px;height:1920px;background:${bg}`);
    build(P);
    const a = E.el(P, "abs", `left:50px;top:340px;font-weight:900;font-size:230px;line-height:1;color:#fff;z-index:8;text-shadow:0 10px 30px rgba(0,0,0,.35)`, String(age));
    E.K(a, "s", [[t0 + .1, 1.6], [t0 + .45, 1, "back"]]); E.K(a, "o", [[t0 + .1, 0], [t0 + .2, 1]]); E.S(t0 + .15, "slam", .5);
    const card = E.el(P, "abs", "left:420px;top:360px;width:620px;padding:22px 28px;border-radius:26px;background:rgba(255,255,255,.95);box-shadow:0 18px 40px rgba(0,0,0,.25);z-index:8");
    stats.forEach(([ic, k, v, hot], i) => {
      const row = E.el(card, "", `display:flex;justify-content:space-between;align-items:baseline;font-size:40px;line-height:1.5;color:${INK};opacity:0;border-bottom:${i < stats.length - 1 ? "2px solid #eef0f4" : "0"}`);
      E.el(row, "", "font-weight:700", `${ic} ${k}`); E.el(row, "", `font-weight:900;color:${hot ? CORAL : INK}`, v);
      const tr = t0 + .6 + i * .45; E.K(row, "o", [[tr, 0], [tr + .12, 1]]); E.K(row, "x", [[tr, 30], [tr + .3, 0, "out"]]); E.S(tr, "tick", .6);
    });
    // hangover meter
    const hm = E.el(card, "", "margin-top:14px;height:26px;border-radius:13px;background:#eef0f4;overflow:hidden");
    const hf = E.el(hm, "", `height:26px;border-radius:13px;background:linear-gradient(90deg,${MINT},${CORAL});width:0`);
    E.K(hf, "w", [[t0 + 2.0, 0], [t0 + 2.8, hang * 5.64, "out"]]);
    E.el(card, "", "margin-top:6px;font-weight:800;font-size:24px;color:#8a979c;letter-spacing:.12em", "HANGOVER METER");
    return P;
  };

  // ================= 21 =================
  panel("a21", P1, P2, 21, "linear-gradient(180deg,#2a0a4a,#5a1070 60%,#1a0628)",
    [["🍹", "Drinks", "11"], ["🛏", "Bed", "5:40 AM"], ["🤕", "Hangover", "0 h"]], 2, P => {
      const lz = E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;opacity:.55");
      lz.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920">${Array.from({ length: 6 }, (_, i) => `<line class="lz" x1="540" y1="700" x2="${i * 200}" y2="1920" stroke="${["#4ff0ff", "#ff5fa2", "#8cff6a"][i % 3]}" stroke-width="5"/>`).join("")}</svg>`;
      const ls = [...lz.querySelectorAll(".lz")]; E.F(t => ls.forEach((l, i) => l.setAttribute("x2", 540 + Math.sin(t * 2 + i) * 700)));
      const W = 1040, H = W * 678 / 1003;
      const sq = E.el(P, "abs", `left:20px;top:${1940 - H}px;width:${W}px;height:${H}px;z-index:3`);
      const sIn = E.el(sq, "abs", `left:0;top:0;width:${W}px;height:${H}px`); E.img(sIn, "squad", `width:${W}px;height:${H}px`);
      E.F(t => { sIn.style.transform = `translateY(${-Math.abs(Math.sin(t * 8)) * 16}px)`; });
      E.clip(0, "sfx/club-bass.wav", { vol: .45, to: P2, duck: true });
    });
  // ================= 31 =================
  panel("a31", P2, P3, 31, "linear-gradient(180deg,#e9d8c4,#d8c2a6)",
    [["🍷", "Drinks", "1 glass"], ["🛏", "Bed", "22:15"], ["🤕", "Hangover", "1 day", true]], 35, P => {
      E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.14) 0 4px,transparent 4px 70px)");
      const sofa = E.el(P, "abs", "left:120px;top:1300px;width:840px;height:560px;z-index:1");
      sofa.innerHTML = `<svg viewBox="0 0 840 560" width="840" height="560"><rect x="40" y="40" width="760" height="300" rx="50" fill="#4a7a8a"/><rect x="0" y="200" width="120" height="300" rx="40" fill="#3f6b7a"/><rect x="720" y="200" width="120" height="300" rx="40" fill="#3f6b7a"/><rect x="80" y="300" width="680" height="170" rx="30" fill="#558896"/></svg>`;
      const H = 840, W = H * 845 / 981;
      const c = E.el(P, "abs", `left:${540 - W / 2}px;top:${1860 - H}px;width:${W}px;height:${H}px;z-index:2`); E.img(c, "couple", `width:${W}px;height:${H}px`);
      const topic = E.el(P, "abs", `left:0;top:960px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 24px;border-radius:16px;background:${INK};color:#fff;font-weight:900;font-size:40px">💬 topic: mortgage rates</span>`);
      E.K(topic, "o", [[P2 + 2.4, 0], [P2 + 2.6, 1]]);
      E.clip(P2, "sfx/elx-dinner-party.wav", { vol: .25, to: P3 - P2, duck: true });
    });
  // ================= 41 =================
  panel("a41", P3, P4, 41, "linear-gradient(180deg,#9aa8c0,#7a88a4)",
    [["🍺", "Drinks", "2 beers"], ["🛏", "Bed", "21:30"], ["🤕", "Hangover", "3 days", true]], 100, P => {
      E.el(P, "abs", "left:110px;top:1180px;width:860px;height:420px;border-radius:40px 40px 0 0;background:linear-gradient(180deg,#8a6a52,#6e523e)");
      const H = 900, W = H * 865 / 1155;
      const r = E.el(P, "abs", `left:${540 - W / 2}px;top:${1000}px;width:${W}px;height:${H}px;z-index:2`);
      const rIn = E.el(r, "abs", `left:0;top:0;width:${W}px;height:${H}px`); E.img(rIn, "bed", `width:${W}px;height:${H}px`);
      E.F(t => { rIn.style.transform = `translateY(${Math.sin(t * 1.3) * 3}px)`; });
      const duv = E.el(P, "abs", "left:-40px;top:1580px;width:1160px;height:360px;z-index:3");
      duv.innerHTML = `<svg viewBox="0 0 1160 360" width="1160" height="360"><path d="M0 60 Q180 0 360 40 T720 30 T1160 50 V360 H0 Z" fill="#f2f5f7"/><path d="M120 140 Q300 100 420 170 M600 120 Q760 90 900 160" stroke="#dde3e7" stroke-width="8" fill="none"/></svg>`;
      const aids = E.el(P, "abs", `left:0;top:900px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 24px;border-radius:16px;background:${INK};color:#fff;font-weight:900;font-size:38px">💧 electrolytes · 🧘 yoga · 😴 a scheduled nap</span>`);
      E.K(aids, "o", [[P3 + 2.6, 0], [P3 + 2.8, 1]]);
      E.clip(P3 + .4, "sfx/elx-yawn.wav", { vol: .5 });
    });
  // ================= 81 =================
  const P4el = panel("a81", P4, DUR, 81, "linear-gradient(180deg,#1a0a3a,#3a1060 60%,#120624)",
    [["🍾", "Drinks", "yes"], ["🛏", "Bed", "tomorrow"], ["🤕", "Hangover", "never heard of it"]], 0, P => {
      const ball = E.el(P, "abs", "left:470px;top:1000px;width:140px;height:140px;border-radius:50%;background:repeating-conic-gradient(#d8d8f0 0 10deg,#8a8aa8 10deg 20deg);box-shadow:0 0 60px rgba(255,255,255,.5)");
      E.F(t => { ball.style.transform = `rotate(${t * 90}deg)`; });
      const conf = E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6");
      conf.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920">${Array.from({ length: 40 }, (_, i) => `<rect class="cf" x="${(i * 97) % 1080}" y="0" width="14" height="24" fill="${["#ff5fa2", GOLD, MINT, "#4ff0ff"][i % 4]}"/>`).join("")}</svg>`;
      const cfs = [...conf.querySelectorAll(".cf")];
      E.F(t => cfs.forEach((c, i) => { const y = ((t - P4) * (220 + (i % 5) * 60) + i * 137) % 1920; c.setAttribute("y", y); c.setAttribute("transform", `rotate(${(t * 200 + i * 40) % 360} ${(i * 97) % 1080 + 7} ${y + 12})`); }));
      const H = 1080, W = H * 431 / 1013;
      const g = E.el(P, "abs", `left:${560 - W / 2}px;top:${1950 - H}px;width:${W}px;height:${H}px;z-index:5`);
      const gIn = E.el(g, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(gIn, "gramps", `width:${W}px;height:${H}px`);
      E.F(t => { gIn.style.transform = `translateY(${-Math.abs(Math.sin(t * 7)) * 18}px) rotate(${Math.sin(t * 7) * 5}deg)`; });
      const hat = E.el(P, "abs", `left:${520}px;top:${1950 - H - 70}px;width:100px;height:120px;z-index:6`);
      hat.innerHTML = `<svg viewBox="0 0 100 120" width="100" height="120"><path d="M10 110 L50 0 L90 110 Z" fill="${CORAL}"/><path d="M22 80 H78 M32 50 H68" stroke="${GOLD}" stroke-width="7"/><circle cx="50" cy="4" r="10" fill="${GOLD}"/></svg>`;
      E.F(t => { hat.style.transform = `translateY(${-Math.abs(Math.sin(t * 7)) * 18}px) rotate(${Math.sin(t * 7) * 8 - 10}deg)`; });
      E.clip(P4, "sfx/elx-party-music.wav", { vol: .35, to: DUR - P4, duck: true }); E.clip(P4 + .2, "sfx/elx-bar-cheer.wav", { vol: .5, to: 2 });
    });

  // ================= bubbles & voices =================
  const bubble = (Sid, html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 54, italic = false, dark = false } = o;
    const b = E.el(Sid, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.35);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const s41 = E.scenes.find(x => x.id === "a41").el;
  bubble(s41, "Never. Again.", { left: 540, top: 1000, w: 420, tail: 90, t0: R1, t1: P4, italic: true });
  bubble(P4el, "Right! Where’s the<br>after-party? 🕺", { left: 40, top: 880, w: 560, tail: 420, t0: G1, t1: DUR });
  E.clip(R1 + .05, "voices/sk50/r1.wav", { vol: 1.5 }); E.clip(G1 + .05, "voices/sk50/g1.wav", { vol: 1.6 });

  // ================= stamp + title =================
  E.cur = E.scenes.find(x => x.id === "a81");
  const stampBox = E.el(P4el, "abs", "left:0;top:1120px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "AGE IS JUST A NUMBER 🕺", STAMP, { size: 70, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const A0 = E.scenes.find(x => x.id === "a21"); E.cur = A0;
  const titleBox = E.el(A0.el, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Drinking at *21 · 31 · 41 · 81*", { size: 56, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
