// SK.75 "Where should we go?" — Nina: "Okay. Where should we go tonight?" Rico: "I'm easy! Anywhere is fine!" Every suggestion gets a veto:
// tapas (too loud), sushi (not in the mood for fish), burgers (had that yesterday)… then a montage: Italian (too heavy), Thai (too spicy),
// Mexican (had lunch there). Options rejected: 6. 22:50, Nina: "It's ten p.m. I'm ordering pizza." Cut to the sofa: pyjamas, pizza, Nina and
// Alex side-eyeing Rico: "See? I'm easy." Stamp: “I'M EASY.” — Rico, 4 hours later.
// Voices: ElevenLabs (Nina: Sarah; Rico: Liam; Jess: Jessica; Alex: Alex).
export const meta = {
  id: "sk75-im-easy",
  images: { home: "bg/night.jpg", nina: "cutouts/nina_order.webp", nod: "cutouts/rico_nod.webp", squint: "cutouts/rico_squint.webp",
    sofa: "cutouts/sofa_trio.webp", jess: "cutouts/av_jess.webp", leo: "cutouts/av_leo.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", GREEN = "#1a9c5b";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const N1 = .4, R1 = 2.7, J1 = 5.4, R2 = 6.9, A1 = 9.2, R3 = 10.7, N2 = 13.0, R4 = 14.3, MONT = 15.6, N3 = 19.0, SOFA = 21.5, R5 = 22.3, STAMP = 24.0, DUR = 27.0;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("home", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const phase = t => t >= SOFA ? 1 : 0;

  // ================= living room, then the sofa =================
  const BGS = [["home", "brightness(1.3) saturate(1.15)"], ["home", "brightness(.75) saturate(.9) hue-rotate(-14deg)"]].map(([img, f]) => {
    const b = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden;opacity:0");
    const im = E.img(b, img, `position:absolute;left:0;top:0;width:1080px;height:1920px;filter:${f};transform-origin:50% 55%`); return [b, im];
  });
  E.F(t => { const p = phase(t); BGS.forEach(([b, im], i) => { b.style.opacity = i === p ? 1 : 0; if (i === p) im.style.transform = `scale(${1.04 + (t % 9) * .005})`; }); });
  E.wipe(SOFA); E.clip(SOFA - .3, "sfx/elx-trailer-whoosh.wav", { vol: .35 });
  const tv = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:1;pointer-events:none;mix-blend-mode:screen;opacity:0");
  E.F(t => { const on = phase(t) === 1; tv.style.opacity = on ? 1 : 0; if (on) tv.style.background = `radial-gradient(ellipse at 50% 20%,hsla(${210 + Math.sin(t * 3) * 30},80%,60%,.28),transparent 60%)`; });
  E.clip(0, "sfx/elx-lounge.wav", { vol: .2, to: 6, duck: true }); E.clip(6, "sfx/elx-lounge.wav", { vol: .2, to: 6, duck: true }); E.clip(12, "sfx/elx-lounge.wav", { vol: .2, to: 6, duck: true });
  E.clip(18, "sfx/elx-lounge.wav", { vol: .2, to: DUR - 18, duck: true });

  // clock + rejected counter (motion from frame 0)
  const clk = E.el(R, "abs", `left:40px;top:360px;padding:10px 24px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:44px;z-index:9;font-variant-numeric:tabular-nums`);
  const TIMES = [[0, "19:30"], [J1 - .3, "19:45"], [A1 - .3, "20:20"], [N2 - .3, "20:55"], [MONT, "21:35"], [MONT + 1.5, "22:05"], [MONT + 3.0, "22:40"], [N3, "22:50"], [SOFA, "23:40"]];
  E.F(t => { let h = TIMES[0][1]; for (const [k, v] of TIMES) if (t >= k) h = v; h = `🕘 ${h}`; if (clk.textContent !== h) clk.textContent = h; });
  E.K(clk, "s", [[0, .7], [.3, 1, "back"]]);
  TIMES.slice(1).forEach(([k]) => E.S(k, "tick", .4));

  // ================= the options card =================
  const OPTS = [["🍤", "Tapas", J1 + .7, R2 + .3, "too loud"], ["🍣", "Sushi", A1 + .8, R3 + .3, "not in the mood for fish"], ["🍔", "Burgers", N2 + .6, R4 + .2, "had that yesterday"],
    ["🍝", "Italian", MONT + .2, MONT + .6, "too heavy"], ["🍜", "Thai", MONT + 1.2, MONT + 1.6, "too spicy"], ["🌮", "Mexican", MONT + 2.2, MONT + 2.6, "had lunch there"]];
  const card = E.el(R, "abs", `left:40px;top:520px;width:1000px;padding:16px 26px 14px;border-radius:28px;background:rgba(255,255,255,.96);box-shadow:0 18px 44px rgba(0,0,0,.35);z-index:8;color:${INK}`);
  E.K(card, "o", [[0, 0], [.1, 1], [SOFA - .2, 1], [SOFA, 0]]); E.K(card, "s", [[0, .8], [.35, 1, "back"]]);
  E.el(card, "", "font-weight:900;font-size:30px;letter-spacing:.1em;color:#a06a00;margin-bottom:4px", "📍 TONIGHT’S OPTIONS");
  const rej = E.el(card, "", `position:absolute;right:26px;top:14px;font-weight:900;font-size:30px;color:${CORAL};font-variant-numeric:tabular-nums`);
  E.F(t => { const n = OPTS.filter(o => t >= o[3]).length; const h = `rejected: ${n}`; if (rej.textContent !== h) rej.textContent = h; });
  OPTS.forEach(([em, name, tAdd, tVeto, why], i) => {
    const row = E.el(card, "", "display:flex;align-items:center;gap:14px;font-weight:900;font-size:40px;height:0;overflow:hidden;opacity:0;position:relative;white-space:nowrap");
    E.el(row, "", "width:56px;text-align:center", em); const nm = E.el(row, "", "", name);
    const tag = E.el(row, "", `position:absolute;right:0;padding:2px 16px;border-radius:12px;background:${CORAL};color:#fff;font-size:32px;opacity:0`, "✖ " + why);
    E.F(t => { const on = t >= tAdd; const a = seg(t, tAdd, .2); row.style.height = on ? `${Math.round(54 * a)}px` : "0px"; row.style.opacity = a;
      const v = seg(t, tVeto, .18); nm.style.textDecoration = v > 0 ? "line-through" : "none"; nm.style.color = v > 0 ? "#999" : INK; tag.style.opacity = v; tag.style.transform = `translateX(${(1 - v) * 60}px) rotate(${(1 - v) * 6}deg)`; });
    E.S(tAdd, "pop", .3); E.S(tVeto, i < 3 ? "nope" : "thud", i < 3 ? .4 : .35);
  });
  // the pizza row (Nina's decision)
  const pz = E.el(card, "", `display:flex;align-items:center;gap:14px;font-weight:900;font-size:44px;height:0;overflow:hidden;opacity:0;color:${GREEN}`, "<span style='width:56px;text-align:center'>🍕</span><span>Pizza · at ours ✅</span>");
  E.F(t => { const a = seg(t, N3 + 1.0, .2); pz.style.height = `${Math.round(60 * a)}px`; pz.style.opacity = a; });
  E.S(N3 + 1.0, "ding", .5);

  // ================= Nina, Rico =================
  const fig = (img, H, w, h, cx, bottom, z, show, bob = 4) => {
    const W = H * w / h; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px`);
    E.F(t => { const on = show(t); f.style.opacity = on ? 1 : 0; if (on) fi.style.transform = `translateY(${Math.sin(t * 1.7 + cx) * bob}px)`; }); return [f, fi];
  };
  const veto = t => (t >= R2 - .1 && t < R2 + 1.6) || (t >= R3 - .1 && t < R3 + 1.6) || (t >= R4 - .1 && t < R4 + 1.3) || (t >= MONT && t < N3);
  fig("nina", 880, 846, 1164, 260, 1940, 5, t => phase(t) === 0);
  fig("nod", 840, 688, 989, 810, 1940, 5, t => phase(t) === 0 && !veto(t));
  const [sq, sqIn] = fig("squint", 840, 684, 999, 810, 1940, 5, t => phase(t) === 0 && veto(t));
  E.F(t => { if (phase(t) === 0 && veto(t)) sqIn.style.transform = `rotate(${Math.sin(t * 6) * 1.5}deg)`; });
  const easy = E.el(R, "abs", `left:620px;top:450px;padding:10px 20px;border-radius:16px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:36px;z-index:9;opacity:0;white-space:nowrap`, "😎 Rico: “I’m easy”");
  E.K(easy, "o", [[R1 + .9, 0], [R1 + 1.0, 1], [N3, 1], [N3 + .2, 0]]); E.K(easy, "s", [[R1 + .9, .6], [R1 + 1.2, 1, "back"]]); E.S(R1 + .9, "pop", .4);
  // tiny avatars for the two who make suggestions
  const av = (img, t0, t1) => { const a = E.el(R, "abs", `left:40px;top:960px;width:150px;height:150px;border-radius:50%;overflow:hidden;border:6px solid #fff;box-shadow:0 12px 26px rgba(0,0,0,.45);z-index:9;opacity:0`); E.img(a, img, "width:150px;height:150px"); E.K(a, "o", [[t0, 0], [t0 + .08, 1], [t1 - .1, 1], [t1, 0]]); E.K(a, "s", [[t0, .5], [t0 + .3, 1, "back"]]); };
  av("jess", J1, J1 + 1.5); av("leo", A1, A1 + 1.5);

  // ================= the sofa =================
  const SW = 1060, SHt = SW * 682 / 1024;
  const sofa = E.el(R, "abs", `left:${(1080 - SW) / 2}px;top:${1935 - SHt}px;width:${SW}px;height:${SHt}px;z-index:5;opacity:0`);
  const sofaIn = E.el(sofa, "abs", `left:0;top:0;width:${SW}px;height:${SHt}px;transform-origin:50% 100%`); E.img(sofaIn, "sofa", `width:${SW}px;height:${SHt}px`);
  E.K(sofa, "o", [[SOFA, 0], [SOFA + .1, 1]]); E.F(t => { if (t >= SOFA) sofaIn.style.transform = `translateY(${Math.sin(t * 1.5) * 3}px) scale(${1 + Math.max(0, 1 - (t - SOFA) / .4) * .05})`; });
  const glare = (txt, left, t0) => { const c = E.el(R, "abs", `left:${left}px;top:1030px;padding:8px 18px;border-radius:16px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:40px;z-index:9;opacity:0;white-space:nowrap`, txt); E.K(c, "o", [[t0, 0], [t0 + .08, 1], [STAMP + 1.6, 1], [STAMP + 1.7, 0]]); E.K(c, "s", [[t0, .5], [t0 + .3, 1, "back"]]); E.S(t0, "pop", .4); };
  glare("👀", 90, R5 + .9); glare("👀", 850, R5 + 1.2);
  const cnt = E.el(R, "abs", `left:40px;top:450px;padding:10px 22px;border-radius:16px;background:${CORAL};color:#fff;font-weight:900;font-size:38px;z-index:9;opacity:0;white-space:nowrap`, "🚫 places rejected: 6 · slices eaten: 4");
  E.K(cnt, "o", [[SOFA + .4, 0], [SOFA + .5, 1], [STAMP - .1, 1], [STAMP, 0]]); E.K(cnt, "s", [[SOFA + .4, .6], [SOFA + .7, 1, "back"]]); E.S(SOFA + .4, "pop", .4);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:#fff;border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:#fff;transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Okay. Where should<br>we go tonight?", { left: 20, top: 1000, w: 540, tail: 150, t0: N1, t1: R1 - .1 });
  bubble("I’m easy!<br>Anywhere is fine! 😎", { left: 540, top: 1010, w: 500, tail: 250, t0: R1, t1: J1 - .1 });
  bubble("How about tapas?", { left: 210, top: 985, w: 500, tail: 60, t0: J1, t1: R2 - .1 });
  bubble("Hmm… too loud.", { left: 560, top: 1010, w: 440, tail: 240, t0: R2, t1: A1 - .2 });
  bubble("How about sushi?", { left: 210, top: 985, w: 500, tail: 60, t0: A1, t1: R3 - .1 });
  bubble("Not in the mood<br>for fish.", { left: 560, top: 1010, w: 440, tail: 240, t0: R3, t1: N2 - .2 });
  bubble("Burgers, then?", { left: 20, top: 1000, w: 440, tail: 150, t0: N2, t1: R4 - .1 });
  bubble("Had that yesterday.", { left: 540, top: 1010, w: 500, tail: 250, t0: R4, t1: MONT });
  bubble("It’s ten p.m.<br>I’m ordering <b>pizza.</b> 🍕", { left: 20, top: 990, w: 620, tail: 170, t0: N3, t1: SOFA - .1 });
  bubble("See? <b>I’m easy.</b>", { left: 300, top: 700, w: 460, tail: 230, t0: R5, t1: STAMP - .1 });
  E.clip(N1 + .05, "voices/sk75/n1.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk75/r1.wav", { vol: 1.5 }); E.clip(J1 + .05, "voices/sk75/j1.wav", { vol: 1.5 });
  E.clip(R2 + .05, "voices/sk75/r2.wav", { vol: 1.5 }); E.clip(A1 + .05, "voices/sk75/a1.wav", { vol: 1.5 }); E.clip(R3 + .05, "voices/sk75/r3.wav", { vol: 1.5 });
  E.clip(N2 + .05, "voices/sk75/n2.wav", { vol: 1.5 }); E.clip(R4 + .05, "voices/sk75/r4.wav", { vol: 1.5 }); E.clip(N3 + .05, "voices/sk75/n3.wav", { vol: 1.5 });
  E.clip(R5 + .05, "voices/sk75/r5.wav", { vol: 1.5 });
  E.music({ bpm: 100, root: 60, seed: 75, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: SOFA });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:620px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "“I’M EASY.”<br><span style='font-size:44px'>— Rico, 4 hours later</span>", STAMP, { size: 110, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“Where should we *go?*”", { size: 64, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
