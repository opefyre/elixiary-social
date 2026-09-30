// SK.72 "Meeting someone at a party." — Nina introduces Rico and Marcus. Handshake, "Great to meet you!" Three seconds later the name
// tags dissolve above both their heads (names remembered: 2/2 → 0/2). Both think: "…what was his name?" So Rico says "buddy",
// Marcus says "boss". 22:50: the tally hits 14 ("buddy", "boss", "champ", "my guy"). "We should totally hang out! Give me your
// number!" — two phones: Rico saves him as “Guy from Nina's 🍕”, Marcus saves him as “Hawaiian shirt 🌺”. SAVED AS: “GUY FROM NINA'S”.
// Voices: ElevenLabs (Nina: Sarah; Rico: Liam; Marcus: Daniel).
export const meta = {
  id: "sk72-forgot-name",
  images: { bg: "bg/night.jpg", nod: "cutouts/rico_nod.webp", squint: "cutouts/rico_squint.webp", greet: "cutouts/rico_greet.webp",
    shake: "cutouts/marcus_shake.webp", panic: "cutouts/marcus_panic.webp", guns: "cutouts/marcus_guns.webp", nina: "cutouts/av_nina.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const N1 = .4, R1 = 3.5, M1 = 5.3, TAG = 6.2, TH = 8.4, R2 = 10.0, M2 = 13.5, MONT = 15.9, R3 = 19.0, M3 = 21.6, PH = 22.6, STAMP = 24.4, DUR = 27.6;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("party", 0, DUR, "dark"); E.cur = S; const R = S.el;

  // ================= kitchen party =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bg = E.img(bgBox, "bg", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 55%");
  E.F(t => { bg.style.transform = `scale(${1.04 + (t % 9) * .005})`; bg.style.filter = t >= MONT && t < R3 ? "brightness(1.0) saturate(.8) hue-rotate(-12deg)" : "brightness(1.35) saturate(1.15)"; });
  const party = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:1;pointer-events:none;mix-blend-mode:screen");
  E.F(t => { const h = (t * 70) % 360; party.style.background = `radial-gradient(ellipse at ${50 + Math.sin(t * 1.5) * 32}% 35%,hsla(${h},80%,60%,.18),transparent 55%)`; });
  E.clip(0, "sfx/elx-party-music.wav", { vol: .22, to: 6, duck: true }); E.clip(6, "sfx/elx-party-music.wav", { vol: .22, to: 6, duck: true }); E.clip(12, "sfx/elx-party-music.wav", { vol: .22, to: 6, duck: true });
  E.clip(18, "sfx/elx-party-music.wav", { vol: .22, to: DUR - 18, duck: true });
  E.wipe(MONT); E.clip(MONT - .3, "sfx/elx-trailer-whoosh.wav", { vol: .35 }); E.wipe(R3); E.clip(R3 - .3, "sfx/elx-trailer-whoosh.wav", { vol: .35 });

  // clock + names tally (motion from frame 0)
  const clk = E.el(R, "abs", `left:40px;top:360px;padding:10px 24px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:44px;z-index:9;font-variant-numeric:tabular-nums`);
  const TIMES = [[0, "20:04"], [R2 - .4, "20:20"], [MONT, "22:50"]];
  E.F(t => { let h = TIMES[0][1]; for (const [k, v] of TIMES) if (t >= k) h = v; h = `🕘 ${h}`; if (clk.textContent !== h) clk.textContent = h; });
  E.K(clk, "s", [[0, .7], [.3, 1, "back"]]);
  const tally = E.el(R, "abs", `left:40px;top:450px;padding:10px 22px;border-radius:16px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:38px;z-index:9;white-space:nowrap`);
  const BUD = [[R2 + 1.6, 1], [M2 + 1.8, 2], [MONT + .5, 5], [MONT + 1.0, 8], [MONT + 1.5, 11], [MONT + 2.0, 14]];
  E.F(t => {
    const rem = t < TAG ? 2 : t < TAG + 1.2 ? 1 : 0; let n = 0; for (const [k, v] of BUD) if (t >= k) n = v;
    const h = `🧠 names remembered: <span style="color:${rem ? "#1a9c5b" : CORAL}">${rem}/2</span>${n ? ` · 🤝 “buddy/boss”: <span style="color:${CORAL}">${n}</span>` : ""}`;
    if (tally.innerHTML !== h) tally.innerHTML = h;
  });
  [TAG, TAG + 1.2, ...BUD.map(b => b[0])].forEach(k => E.S(k, "tick", .4));

  // ================= the two of them =================
  const fig = (img, H, w, h, cx, bottom, z, show, flip = 1) => {
    const W = H * w / h; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px;transform:scaleX(${flip})`);
    E.F(t => { const on = show(t); f.style.opacity = on ? 1 : 0; if (on) fi.style.transform = `translateY(${Math.sin(t * 1.7 + cx) * 4}px)`; }); return [f, fi];
  };
  const HRICO = 780, HMAR = 900;
  const ricoPose = t => t < M1 + .8 ? "greet" : t < MONT ? "nod" : t < R3 ? "squint" : "nod";
  const marPose = t => t < M1 + 1.2 ? "shake" : t < TH + 1.6 ? "panic" : t < MONT ? "panic" : t < R3 ? "guns" : "shake";
  const rico = { greet: fig("greet", HRICO * .68, 598, 677, 290, 1930, 5, t => ricoPose(t) === "greet"), nod: fig("nod", HRICO, 688, 989, 280, 1930, 5, t => ricoPose(t) === "nod"), squint: fig("squint", HRICO, 684, 999, 280, 1930, 5, t => ricoPose(t) === "squint") };
  const mar = { shake: fig("shake", HMAR, 218, 674, 780, 1930, 5, t => marPose(t) === "shake"), panic: fig("panic", HMAR, 223, 666, 780, 1930, 5, t => marPose(t) === "panic"), guns: fig("guns", HMAR, 232, 667, 780, 1930, 5, t => marPose(t) === "guns") };
  // hop during the montage: the two of them bouncing at each other
  E.F(t => { if (t >= MONT && t < R3) { const k = Math.abs(Math.sin(t * 7)) * 22; rico.squint[1].style.transform = `translateY(${-k}px)`; mar.guns[1].style.transform = `translateY(${-Math.abs(Math.sin(t * 7 + 1.5)) * 22}px)`; } });

  // ================= Nina (off-screen host, avatar) =================
  const nin = E.el(R, "abs", `left:850px;top:590px;width:170px;height:170px;border-radius:50%;overflow:hidden;border:6px solid #fff;box-shadow:0 12px 30px rgba(0,0,0,.4);z-index:9;opacity:0`);
  E.img(nin, "nina", "width:170px;height:170px");
  E.K(nin, "o", [[N1, 0], [N1 + .1, 1], [R1 - .1, 1], [R1, 0]]); E.K(nin, "s", [[N1, .5], [N1 + .3, 1, "back"]]);
  const nlab = E.el(R, "abs", `left:840px;top:768px;padding:6px 14px;border-radius:12px;background:#fff;color:${INK};font-weight:900;font-size:28px;z-index:9;opacity:0;white-space:nowrap`, "Nina · host");
  E.K(nlab, "o", [[N1, 0], [N1 + .1, 1], [R1 - .1, 1], [R1, 0]]);

  // ================= name tags dissolving =================
  const tag = (name, cx, col) => {
    const wrap = E.el(R, "abs", `left:${cx - 180}px;top:${cx > 500 ? 940 : 1030}px;width:360px;text-align:center;z-index:8;opacity:0;white-space:nowrap`);
    const letters = [...name].map(ch => E.el(wrap, "", `display:inline-block;padding:6px 6px;background:${col};color:#fff;font-weight:900;font-size:44px`, ch));
    E.K(wrap, "o", [[R1 + .2, 0], [R1 + .3, 1], [TAG + 1.9, 1], [TAG + 2.0, 0]]);
    E.F(t => letters.forEach((l, i) => { const a = clamp(1 - (t - (TAG + i * .12)) / .5, 0, 1); l.style.opacity = a; l.style.transform = `translateY(${(1 - a) * -26}px) rotate(${(1 - a) * (i % 2 ? 18 : -18)}deg)`; }));
  };
  tag("MARCUS", 780, "#2f6fdd"); tag("RICO", 280, "#e0532e");
  for (let i = 0; i < 6; i++) E.S(TAG + i * .12, "tick", .18);

  // ================= thoughts =================
  const thought = (html, t0, t1, left, top) => { const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:420px;padding:16px 22px;border-radius:44px;background:rgba(20,30,40,.93);color:#fff;font-weight:800;font-style:italic;font-size:42px;text-align:center;z-index:10;opacity:0;box-shadow:0 14px 34px rgba(0,0,0,.45)`, html); E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0, "pop", .4); };
  thought("💭 …what was<br>his name?", TH, R2 - .2, 40, 800);
  thought("💭 …what was<br><b>HIS</b> name?", TH + .5, R2 - .2, 610, 800);
  E.S(TH + .2, "nope", .3); E.clip(TH - .1, "sfx/record-silence.wav", { vol: .4 });

  // ================= bubbles + montage words =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Rico, this is Marcus!<br>Marcus, this is Rico!", { left: 420, top: 800, w: 620, tail: 380, t0: N1, t1: R1 - .1, size: 42 });
  bubble("Marcus! Great to<br>meet you! 🤝", { left: 40, top: 840, w: 480, tail: 220, t0: R1, t1: M1 });
  bubble("You too, man!", { left: 600, top: 880, w: 420, tail: 200, t0: M1, t1: TAG + 1.4 });
  bubble("So, how do you know…<br>everyone, <b>buddy?</b>", { left: 40, top: 800, w: 640, tail: 240, t0: R2, t1: M2 - .1, size: 44 });
  bubble("Through work!<br>How about you, <b>boss?</b>", { left: 400, top: 830, w: 620, tail: 460, t0: M2, t1: MONT - .1, size: 44 });
  // the montage: words flying between them
  [["Buddy!", 40, 780, MONT + .3], ["Boss!", 600, 800, MONT + .8], ["My guy!", 40, 900, MONT + 1.3], ["Champ!", 600, 900, MONT + 1.8]].forEach(([w, l, tp, t0]) => {
    const b = E.el(R, "abs", `left:${l}px;top:${tp}px;padding:12px 24px;border-radius:26px;background:#fff;color:${INK};font-weight:900;font-size:56px;z-index:10;opacity:0;box-shadow:0 12px 28px rgba(0,0,0,.4);white-space:nowrap`, w);
    E.pop(b, t0, { from: .3, dur: .25 }); E.K(b, "o", [[t0, 0], [t0 + .06, 1], [R3 - .3, 1], [R3 - .1, 0]]);
  });
  bubble("We should totally<br>hang out! Give me<br>your number! 📱", { left: 40, top: 700, w: 560, tail: 240, t0: R3, t1: M3, size: 44 });
  bubble("Definitely!<br>Here you go.", { left: 560, top: 780, w: 440, tail: 220, t0: M3, t1: PH });
  E.clip(N1 + .05, "voices/sk72/n1.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk72/r1.wav", { vol: 1.5 }); E.clip(M1 + .05, "voices/sk72/m1.wav", { vol: 1.5 });
  E.clip(R2 + .05, "voices/sk72/r2.wav", { vol: 1.5 }); E.clip(M2 + .05, "voices/sk72/m2.wav", { vol: 1.5 });
  E.clip(R3 + .05, "voices/sk72/r3.wav", { vol: 1.5 }); E.clip(M3 + .05, "voices/sk72/m3.wav", { vol: 1.5 });
  E.S(R1 + .3, "swish", .3); E.S(M1 + .1, "ding", .35);

  // ================= the two phones =================
  const phone = (left, who, name, t0) => {
    const p = E.el(R, "abs", `left:${left}px;top:520px;width:440px;padding:18px 20px 20px;border-radius:38px;background:#f6f6f8;border:8px solid #16161a;z-index:10;opacity:0;box-shadow:0 20px 44px rgba(0,0,0,.5)`);
    p.innerHTML = `<div style="font-weight:800;font-size:26px;color:#777;text-align:center">${who}’s phone · New contact</div><div style="margin:14px 0 6px;font-weight:800;font-size:24px;color:#999">Name</div><div class="nm" style="font-weight:900;font-size:40px;color:${INK};border-bottom:4px solid #2f6fdd;padding-bottom:8px;min-height:52px;white-space:nowrap"></div><div style="margin-top:12px;font-weight:800;font-size:24px;color:#999">Phone</div><div style="font-weight:800;font-size:34px;color:${INK}">+•• ••• ••• •••</div>`;
    const nm = p.querySelector(".nm");
    E.K(p, "o", [[t0, 0], [t0 + .08, 1]]); E.K(p, "s", [[t0, .5], [t0 + .35, 1, "back"]]); E.S(t0, "pop", .4);
    E.F(t => { if (t >= t0) { const n = Math.floor(seg(t, t0 + .3, 1.0) * name.length); const h = name.slice(0, n) + (n < name.length && Math.floor(t * 4) % 2 ? "|" : ""); if (nm.textContent !== h) nm.textContent = h; } });
    for (let i = 0; i < name.length; i += 2) E.S(t0 + .3 + i / name.length, "tick", .1);
  };
  phone(30, "Rico", "Guy from Nina’s 🍕", PH); phone(610, "Marcus", "Hawaiian shirt 🌺", PH + .35);
  E.clip(PH + 1.6, "sfx/elx-msg-pop.wav", { vol: .6 });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:900px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "SAVED AS:<br>“GUY FROM NINA’S”", STAMP, { size: 76, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "Meeting someone at a *party.*", { size: 56, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
