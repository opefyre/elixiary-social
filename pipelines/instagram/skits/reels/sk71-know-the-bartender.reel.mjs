// SK.71 "I know the bartender." — Rico, to the table: "Leave it with me. I know the bartender." Mia & Joe: "Free drinks!" At
// the bar: "SAL! My man!" Sal: nothing (recognition: 0 %). "It's me! Rico! 2019? You served me a beer?" 📼 2019: Rico:
// "Thanks." Sal: 👍 — total conversation: 4 seconds. Back at the bar, Sal: "…That's forty-two euros." Card beep, tip screen.
// Back at the table with the tray: "Well?!" "He says hi." HE DID NOT SAY HI.
// Voices: ElevenLabs (Rico: Liam; Sal: Chris; Mia: Sarah).
export const meta = {
  id: "sk71-know-the-bartender",
  images: { pub: "bg/pub.jpg", bar: "bg/speakeasy.jpg", nod: "cutouts/rico_nod.webp", greet: "cutouts/rico_greet.webp", tray: "cutouts/rico_tray.webp",
    reach: "cutouts/pals_reach.webp", sal: "cutouts/sal_flat.webp", salold: "cutouts/sal_host.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const R1 = .4, N1 = 2.5, BAR = 4.4, R2 = 4.8, BLANK = 6.3, R3 = 7.2, FB = 10.9, BACK = 13.3, S1 = 13.6, PAY = 15.3, TABLE = 16.9, N2 = 17.3,
    R4 = 18.1, SAL = 19.0, STAMP = 20.4, DUR = 23.6;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("bar", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const phase = t => t >= TABLE ? 3 : t >= BACK ? 1 : t >= FB ? 2 : t >= BAR ? 1 : 0;

  // ================= backgrounds (table / bar / 2019) =================
  const BGS = [["pub", "brightness(1.15) saturate(1.1)"], ["bar", "brightness(1.35) saturate(1.1)"], ["bar", "sepia(1) brightness(1.1) contrast(.9) blur(2px)"], ["pub", "brightness(1.15) saturate(1.1)"]].map(([img, f]) => {
    const b = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden;opacity:0");
    const im = E.img(b, img, `position:absolute;left:0;top:0;width:1080px;height:1920px;filter:${f};transform-origin:50% 60%`); return [b, im];
  });
  E.F(t => { const p = phase(t); BGS.forEach(([b, im], i) => { b.style.opacity = i === p ? 1 : 0; if (i === p) im.style.transform = `scale(${1.04 + (t % 8) * .005})`; }); });
  [BAR, TABLE].forEach(k => { E.wipe(k); E.clip(k - .3, "sfx/elx-trailer-whoosh.wav", { vol: .35 }); });
  E.clip(0, "sfx/elx-pub-chatter.wav", { vol: .28, to: BAR, duck: false }); E.clip(BAR, "sfx/elx-lounge.wav", { vol: .22, to: 6, duck: false });
  E.clip(TABLE, "sfx/elx-pub-chatter.wav", { vol: .28, to: DUR - TABLE, duck: false });

  const fig = (img, H, w, h, cx, bottom, z, show, bob = 3) => {
    const W = H * w / h; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px`);
    E.F(t => { const on = show(t); f.style.opacity = on ? 1 : 0; if (on) fi.style.transform = `translateY(${Math.sin(t * 1.5 + cx) * bob}px)`; }); return [f, fi];
  };

  // ================= 1 · the promise =================
  fig("reach", 560, 938, 588, 810, 1905, 4, t => t < BAR || t >= TABLE);
  const [nod, nodIn] = fig("nod", 780, 688, 989, 220, 1930, 5, t => t < BAR);
  E.F(t => { if (t < BAR) nodIn.style.transform = `translateY(${Math.sin(t * 2) * 4}px) rotate(${t > N1 + .8 ? 0 : Math.sin(t * 3) * 1.2}deg)`; });
  const promise = E.el(R, "abs", `left:40px;top:450px;padding:10px 22px;border-radius:16px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:38px;z-index:9;opacity:0;white-space:nowrap`, "🍸 free drinks: incoming…");
  E.K(promise, "o", [[N1 + 1, 0], [N1 + 1.1, 1], [BAR - .1, 1], [BAR, 0]]); E.K(promise, "s", [[N1 + 1, .6], [N1 + 1.3, 1, "back"]]); E.S(N1 + 1, "sparkle", .35);
  const status = E.el(R, "abs", `left:40px;top:360px;padding:10px 24px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:40px;z-index:9;white-space:nowrap`);
  E.F(t => { const h = t < BAR ? "😎 Rico’s confidence: 100%" : t < BLANK ? "😎 Rico’s confidence: 100%" : t < FB ? "😅 Rico’s confidence: 40%" : t < PAY ? "😬 Rico’s confidence: 12%" : t < TABLE ? "💀 Rico’s confidence: 0%" : "🫠 Rico’s dignity: 0%"; if (status.textContent !== h) status.textContent = h; });
  E.K(status, "s", [[0, .7], [.3, 1, "back"]]); [BLANK, FB, PAY, TABLE].forEach(k => E.S(k, "tick", .45));
  E.F(t => status.style.opacity = phase(t) === 2 || t >= STAMP ? 0 : 1);

  // ================= 2 · at the bar =================
  // Sal stands behind the counter (the plate's marble counter top sits at ~y1320)
  const SH = 800, SW = SH * 733 / 1105;
  const salBox = E.el(R, "abs", `left:${840 - SW / 2}px;top:${1340 - SH * .78}px;width:${SW}px;height:${SH * .78}px;overflow:hidden;z-index:3;opacity:0`);
  const salIn = E.el(salBox, "abs", `left:0;top:0;width:${SW}px;height:${SH}px`); E.img(salIn, "sal", `width:${SW}px;height:${SH}px`);
  E.F(t => { const on = phase(t) === 1; salBox.style.opacity = on ? 1 : 0; salIn.style.transform = `translateY(${Math.sin(t * 1.2) * 2}px)`; });
  const counter = E.el(R, "abs", "left:0;top:1320px;width:1080px;height:600px;z-index:4;opacity:0;background:linear-gradient(180deg,#2b2f2c 0,#1d201e 26px,#4a2e1c 26px,#3a2314 60%,#2a190e);box-shadow:0 -6px 18px rgba(0,0,0,.4)");
  E.el(counter, "abs", "left:0;top:90px;width:1080px;height:14px;background:linear-gradient(180deg,#e8c77a,#a07a32);box-shadow:0 4px 10px rgba(0,0,0,.4)");
  E.F(t => counter.style.opacity = phase(t) === 1 ? 1 : 0);
  const [greet, greetIn] = fig("greet", 820, 598, 677, 300, 1930, 5, t => phase(t) === 1);
  E.F(t => { if (phase(t) === 1) greetIn.style.transform = `translateY(${t < R2 + .4 ? -Math.sin(seg(t, R2, .4) * Math.PI) * 30 : Math.sin(t * 2) * 3}px) rotate(${t > BLANK && t < FB ? Math.sin(t * 5) * 1.5 : 0}deg)`; });
  const recog = E.el(R, "abs", `left:40px;top:450px;padding:10px 20px;border-radius:16px;background:${CORAL};color:#fff;font-weight:900;font-size:38px;z-index:9;opacity:0;white-space:nowrap`, "🤔 Sal recognises him: 0%");
  E.K(recog, "o", [[BLANK, 0], [BLANK + .1, 1], [FB - .1, 1], [FB, 0]]); E.K(recog, "s", [[BLANK, .6], [BLANK + .3, 1, "back"]]); E.S(BLANK, "nope", .35);
  // the silence beat
  E.clip(BLANK - .05, "sfx/record-silence.wav", { vol: .45 });
  const dots = E.el(R, "abs", `left:720px;top:600px;padding:10px 26px;border-radius:26px;background:#1b2330;color:#fff;font-weight:900;font-size:60px;z-index:10;opacity:0`, "…");
  E.K(dots, "o", [[BLANK + .1, 0], [BLANK + .2, 1], [R3 + .2, 1], [R3 + .3, 0]]);

  // ================= 📼 2019 =================
  const vhs = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:7;pointer-events:none;opacity:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.12) 0 3px,transparent 3px 6px)");
  E.K(vhs, "o", [[FB, 0], [FB + .05, 1], [BACK - .05, 1], [BACK, 0]]);
  const rec = E.el(R, "abs", `left:60px;top:370px;color:#fff;font-family:ui-monospace,Menlo,monospace;font-weight:900;font-size:50px;z-index:9;opacity:0;text-shadow:0 0 8px rgba(0,0,0,.8)`, "📼 ▶ PLAY · 14 MAR 2019");
  E.K(rec, "o", [[FB, 0], [FB + .05, 1], [BACK - .05, 1], [BACK, 0]]);
  E.clip(FB - .1, "sfx/elx-vhs.wav", { vol: .6 }); E.flash(FB, "#ffffff", .4, .12);
  const oldSal = fig("salold", 900, 827, 1104, 760, 1760, 5, t => phase(t) === 2, 2);
  oldSal[0].style.filter = "sepia(1) contrast(.95)";
  const oldRico = fig("nod", 760, 688, 989, 230, 1920, 6, t => phase(t) === 2, 2);
  oldRico[0].style.filter = "sepia(1) contrast(.95)";
  const beer = E.el(R, "abs", "left:540px;top:1300px;font-size:120px;z-index:6;opacity:0", "🍺");
  E.K(beer, "o", [[FB + .3, 0], [FB + .4, 1], [BACK - .05, 1], [BACK, 0]]); E.K(beer, "x", [[FB + .3, 120], [FB + .9, 0, "out"]]); E.S(FB + .3, "swish", .35);
  const fbLine = (html, t0, left, top, dark) => { const b = E.el(R, "abs", `left:${left}px;top:${top}px;padding:14px 24px;border-radius:24px;background:${dark ? "#1b2330" : "#fff"};color:${dark ? "#fff" : INK};font-weight:800;font-size:46px;z-index:10;opacity:0;white-space:nowrap;filter:sepia(.5)`, html); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [BACK - .1, 1], [BACK, 0]]); E.pop(b, t0, { from: .3, dur: .3 }); E.S(t0, "pop", .35); };
  fbLine("Rico: Thanks.", FB + .9, 60, 1020, false);
  fbLine("Sal: 👍", FB + 1.5, 640, 760, true);
  const total = E.el(R, "abs", `left:40px;top:470px;padding:10px 22px;border-radius:16px;background:${CORAL};color:#fff;font-weight:900;font-size:40px;z-index:9;opacity:0;white-space:nowrap`, "⏱ total conversation: 4 seconds");
  E.K(total, "o", [[FB + 2.0, 0], [FB + 2.1, 1], [BACK - .1, 1], [BACK, 0]]); E.K(total, "s", [[FB + 2.0, .6], [FB + 2.3, 1, "back"]]); E.S(FB + 2.0, "ding", .4);

  // ================= €42 =================
  const term = E.el(R, "abs", `left:640px;top:880px;width:300px;padding:22px;border-radius:26px;background:#1e1e22;border:6px solid #3a3a40;color:#fff;z-index:9;opacity:0;text-align:center;box-shadow:0 18px 40px rgba(0,0,0,.5)`);
  term.innerHTML = `<div style="font-weight:900;font-size:58px;color:${GOLD}">€42.00</div><div style="font-weight:800;font-size:26px;margin:10px 0 12px;color:#aab">add a tip?</div><div style="display:flex;gap:8px;justify-content:center">${["10%", "15%", "20%"].map(p => `<span style="padding:8px 12px;border-radius:12px;background:#33343a;font-weight:900;font-size:28px">${p}</span>`).join("")}</div>`;
  E.K(term, "o", [[PAY, 0], [PAY + .1, 1], [TABLE - .1, 1], [TABLE, 0]]); E.K(term, "s", [[PAY, .5], [PAY + .35, 1, "back"]]);
  E.clip(PAY + .1, "sfx/elx-register.wav", { vol: .5 }); E.S(PAY + .9, "ding", .45);

  // ================= 3 · back at the table =================
  const [tray, trayIn] = fig("tray", 860, 329, 672, 280, 1930, 5, t => t >= TABLE);
  E.F(t => { if (t >= TABLE) trayIn.style.transform = `translateX(${t < TABLE + .5 ? -200 * (1 - seg(t, TABLE, .5)) : 0}px) translateY(${Math.sin(t * 6) * 3}px)`; });
  const sweat = E.el(R, "abs", "left:330px;top:1080px;font-size:50px;z-index:6;opacity:0", "💦");
  E.K(sweat, "o", [[R4, 0], [R4 + .1, 1]]); E.F(t => { if (t > R4) sweat.style.transform = `translateY(${(t - R4) * 30 % 40}px)`; });
  const loss = E.el(R, "abs", `left:40px;top:450px;padding:10px 22px;border-radius:16px;background:${CORAL};color:#fff;font-weight:900;font-size:38px;z-index:9;opacity:0;white-space:nowrap`, "💸 free drinks: €42 (+15% tip)");
  E.K(loss, "o", [[R4 + .9, 0], [R4 + 1, 1], [STAMP - .1, 1], [STAMP, 0]]); E.K(loss, "s", [[R4 + .9, .6], [R4 + 1.2, 1, "back"]]); E.S(R4 + .9, "pop", .4);
  // meanwhile, at the bar: Sal's face in a circle
  const cam = E.el(R, "abs", `left:640px;top:560px;width:360px;height:360px;border-radius:50%;overflow:hidden;border:8px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.45);z-index:9;opacity:0;background:#2a2f2c`);
  E.img(cam, "sal", `position:absolute;left:-60px;top:-10px;width:480px;height:${480 * 1105 / 733}px`);
  E.K(cam, "o", [[SAL, 0], [SAL + .1, 1], [STAMP - .1, 1], [STAMP, 0]]); E.K(cam, "s", [[SAL, .4], [SAL + .35, 1, "back"]]); E.S(SAL, "whoosh", .35);
  const camLab = E.el(R, "abs", `left:660px;top:940px;padding:8px 18px;border-radius:14px;background:#fff;color:${INK};font-weight:900;font-size:32px;z-index:9;opacity:0;white-space:nowrap`, "Sal, right now: 😐");
  E.K(camLab, "o", [[SAL + .2, 0], [SAL + .3, 1], [STAMP - .1, 1], [STAMP, 0]]);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Leave it with me.<br>I know the <b>bartender.</b> 😎", { left: 40, top: 860, w: 560, tail: 200, t0: R1, t1: N1 + .1, size: 46 });
  bubble("Free drinks! 🙌", { left: 560, top: 1060, w: 420, tail: 200, t0: N1, t1: BAR });
  bubble("SAL! My man! 🙌", { left: 60, top: 860, w: 480, tail: 220, t0: R2, t1: BLANK + .2 });
  bubble("It’s me! Rico! 2019?<br>You served me<br>a <b>beer?</b> 🍺", { left: 40, top: 780, w: 540, tail: 240, t0: R3, t1: FB, size: 44 });
  bubble("…That’s forty-two<br>euros.", { left: 470, top: 520, w: 480, tail: 330, t0: S1, t1: TABLE, dark: true });
  bubble("Well?!", { left: 600, top: 1080, w: 260, tail: 130, t0: N2, t1: R4 + .1 });
  bubble("He says hi. 🙂", { left: 60, top: 880, w: 400, tail: 220, t0: R4, t1: STAMP, italic: true });
  E.clip(R1 + .05, "voices/sk71/r1.wav", { vol: 1.5 }); E.clip(N1 + .05, "voices/sk71/n1.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk71/r2.wav", { vol: 1.5 });
  E.clip(R3 + .05, "voices/sk71/r3.wav", { vol: 1.5 }); E.clip(S1 + .05, "voices/sk71/s1.wav", { vol: 1.6 }); E.clip(N2 + .05, "voices/sk71/n2.wav", { vol: 1.5 });
  E.clip(R4 + .05, "voices/sk71/r4.wav", { vol: 1.6 });
  E.music({ bpm: 108, root: 62, seed: 71, prog: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], until: BLANK });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:620px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "HE DID NOT<br>SAY HI.", STAMP, { size: 100, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“I know the *bartender.*”", { size: 62, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
