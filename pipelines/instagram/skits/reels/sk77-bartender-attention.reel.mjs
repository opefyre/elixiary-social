// SK.77 "Getting the bartender's attention." — Barry tries everything: "Excuse me! Hello?!" (Sal: “Be right with you!”), waving cash ("I've got
// cash! Right here!"), a finger snap ("Did you just… snap at me?"), a two-finger whistle. Waiting: 14:32. A quiet guy walks up, stands there
// politely: "Hi. No rush at all." Sal, glowing: "Hi there… what can I get you, my friend?" Drink served instantly. Barry: "What?! I was here
// first!" Sal: "Wait your turn." Stamp: WAIT YOUR TURN.
// Voices: ElevenLabs (Barry: Charlie; Sal: Chris; quiet guy: George).
export const meta = {
  id: "sk77-bartender-attention",
  images: { bar: "bg/cocktailbar.jpg", cash: "cutouts/barry_cash.webp", snap: "cutouts/barry_snap.webp", whistle: "cutouts/barry_whistle.webp",
    muddle: "cutouts/sal_muddle.webp", twitch: "cutouts/sal_twitch.webp", flat: "cutouts/sal_flat.webp", host: "cutouts/sal_host.webp", quiet: "cutouts/guy_smile.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", GREEN = "#1a9c5b";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const B1 = .4, S1 = 2.6, B2 = 4.3, TWITCH = 6.4, SNAP = 7.6, S2 = 8.9, WHISTLE = 11.2, Q1 = 13.6, S3 = 15.7, SERVE = 17.9, B3 = 18.6, S4 = 20.9, STAMP = 22.8, DUR = 25.8;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("bar", 0, DUR, "dark"); E.cur = S; const R = S.el;

  // ================= the bar =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bg = E.img(bgBox, "bar", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 50%");
  E.F(t => { bg.style.transform = `scale(${1.03 + (t % 10) * .004})`; bg.style.filter = t >= B3 - .2 && t < STAMP ? "brightness(.85) saturate(.9)" : "brightness(1.0) saturate(1.05)"; });
  E.clip(0, "sfx/elx-lounge.wav", { vol: .22, to: 6, duck: true }); E.clip(6, "sfx/elx-lounge.wav", { vol: .22, to: 6, duck: true }); E.clip(12, "sfx/elx-lounge.wav", { vol: .22, to: 6, duck: true });
  E.clip(18, "sfx/elx-lounge.wav", { vol: .22, to: DUR - 18, duck: true });
  E.clip(0, "sfx/crowd-murmur.wav", { vol: .16, to: 6, duck: false }); E.clip(6, "sfx/crowd-murmur.wav", { vol: .16, to: 6, duck: false }); E.clip(12, "sfx/crowd-murmur.wav", { vol: .16, to: 6, duck: false });
  E.clip(18, "sfx/crowd-murmur.wav", { vol: .16, to: DUR - 18, duck: false });
  E.clip(.2, "sfx/elx-muddle.wav", { vol: .45, to: 3, duck: true });

  // waiting timer (motion from frame 0)
  const clk = E.el(R, "abs", `left:40px;top:360px;padding:10px 24px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:42px;z-index:9;font-variant-numeric:tabular-nums;white-space:nowrap`);
  E.F(t => { const w = t < Q1 ? Math.floor(seg(t, 0, Q1) * 872) : 872; const h = `⏱ Barry waiting: ${String(Math.floor(w / 60)).padStart(2, "0")}:${String(w % 60).padStart(2, "0")}`; if (clk.textContent !== h) clk.textContent = h; clk.style.background = t >= Q1 - 1 ? "rgba(200,60,40,.92)" : "rgba(10,8,12,.85)"; });
  E.K(clk, "s", [[0, .7], [.3, 1, "back"]]);

  // ================= the tactics panel =================
  const panel = E.el(R, "abs", `left:40px;top:450px;width:540px;padding:14px 22px 10px;border-radius:26px;background:rgba(255,255,255,.96);box-shadow:0 18px 44px rgba(0,0,0,.4);z-index:8;color:${INK}`);
  E.K(panel, "o", [[.1, 0], [.2, 1], [STAMP - .2, 1], [STAMP, 0]]); E.K(panel, "s", [[.1, .8], [.45, 1, "back"]]);
  E.el(panel, "", "font-weight:900;font-size:28px;letter-spacing:.1em;color:#a06a00;margin-bottom:2px", "📋 ATTENTION TACTICS");
  const TAC = [["🙋", "Excuse me!", B1 + .3, S1 + .9, "✖ ignored", CORAL], ["💵", "Waving cash", B2 + .3, TWITCH, "✖ ignored", CORAL], ["🫰", "Finger snap", SNAP + .1, S2 + 1.2, "✖ worse", CORAL],
    ["😗", "Loud whistle", WHISTLE + .1, WHISTLE + 1.6, "✖ much worse", CORAL], ["😌", "Standing politely", Q1 + .3, S3 + .3, "✅ served", GREEN]];
  TAC.forEach(([em, name, tAdd, tRes, res, col], i) => {
    const row = E.el(panel, "", "display:flex;align-items:center;gap:10px;font-weight:900;font-size:33px;height:0;overflow:hidden;opacity:0;white-space:nowrap;position:relative");
    E.el(row, "", "width:48px;text-align:center", em); E.el(row, "", "", name);
    const tag = E.el(row, "", `position:absolute;right:0;padding:1px 12px;border-radius:10px;background:${col};color:#fff;font-size:26px;opacity:0`, res);
    E.F(t => { const a = seg(t, tAdd, .2); row.style.height = `${Math.round(46 * a)}px`; row.style.opacity = a; const v = seg(t, tRes, .18); tag.style.opacity = v; tag.style.transform = `translateX(${(1 - v) * 50}px)`; });
    E.S(tAdd, "pop", .3); E.S(tRes, i < 4 ? "nope" : "ding", i < 4 ? .35 : .5);
  });

  // ================= Sal behind the bar =================
  const SH = 720, SVIS = .8;
  const salBox = E.el(R, "abs", `left:0;top:${1125 - SH * SVIS}px;width:1080px;height:${SH * SVIS}px;overflow:hidden;z-index:2`);
  const salPose = t => t < TWITCH ? "muddle" : t < SNAP ? "twitch" : t < WHISTLE ? "flat" : t < Q1 + 1.4 ? "twitch" : t < S3 - .2 ? "flat" : t < S4 - .2 ? "host" : "flat";
  const SAL = {}; [["muddle", 866, 1138], ["twitch", 865, 1133], ["flat", 733, 1105], ["host", 827, 1104]].forEach(([k, w, h]) => { const W = SH * w / h; SAL[k] = E.img(salBox, k, `position:absolute;left:${800 - W / 2}px;top:0;width:${W}px;height:${SH}px;opacity:0`); });
  E.F(t => { const p = salPose(t); Object.entries(SAL).forEach(([k, im]) => { im.style.opacity = k === p ? 1 : 0; }); const wob = p === "muddle" ? Math.sin(t * 14) * 5 : p === "twitch" ? Math.sin(t * 40) * 3 : Math.sin(t * 1.5) * 2; salBox.style.transform = `translateY(${wob}px)`; });
  E.S(TWITCH, "buzz", .3);

  // ================= Barry & the quiet guy =================
  const fig = (img, H, w, h, cx, bottom, z, show, bob = 4) => {
    const W = H * w / h; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px`);
    E.F(t => { const on = show(t); f.style.opacity = on ? 1 : 0; if (on) fi.style.transform = `translateY(${Math.sin(t * 1.7 + cx) * bob}px)`; }); return [f, fi];
  };
  const bPose = t => t < SNAP - .2 ? "cash" : t < WHISTLE - .2 ? "snap" : t < WHISTLE + 1.8 ? "whistle" : t < B3 - .1 ? "cash" : "snap";
  const HB = 820, BX = 300;
  const brr = { cash: fig("cash", HB, 274, 648, BX, 1945, 6, t => bPose(t) === "cash"), snap: fig("snap", HB, 287, 661, BX, 1945, 6, t => bPose(t) === "snap"), whistle: fig("whistle", HB, 263, 642, BX, 1945, 6, t => bPose(t) === "whistle") };
  E.F(t => {
    if (bPose(t) === "cash") brr.cash[1].style.transform = `translate(${Math.sin(t * 22) * 8}px,${Math.sin(t * 9) * 4}px) rotate(${Math.sin(t * 22) * 2}deg)`;
    if (bPose(t) === "snap") brr.snap[1].style.transform = `translateY(${t >= B3 ? -Math.abs(Math.sin(t * 8)) * 14 : 0}px)`;
    if (bPose(t) === "whistle") brr.whistle[1].style.transform = `scale(${1 + Math.sin(t * 30) * .01})`;
  });
  const [qf, qfi] = fig("quiet", 800, 821, 1122, 790, 1945, 5, t => t >= Q1 - .7);
  E.F(t => { qf.style.transform = `translateX(${(1 - seg(t, Q1 - .7, .8)) * 500}px)`; });
  // the bill in Barry's hand, the sound waves, the aura
  const wave = (txt, t0, t1, left, top, size = 70) => { const w = E.el(R, "abs", `left:${left}px;top:${top}px;font-size:${size}px;font-weight:900;color:#fff;z-index:9;opacity:0;white-space:nowrap;text-shadow:0 4px 14px rgba(0,0,0,.6)`, txt); E.K(w, "o", [[t0, 0], [t0 + .05, 1], [t1 - .15, 1], [t1, 0]]); E.K(w, "s", [[t0, .4], [t0 + .25, 1, "back"]]); return w; };
  wave("*SNAP* *SNAP*", SNAP, S2 - .2, 250, 1010); wave("🎶 WHEEEEEET!", WHISTLE, WHISTLE + 1.6, 190, 1020, 66);
  E.clip(SNAP, "sfx/elx-snap.wav", { vol: 1.1 }); E.clip(SNAP + .5, "sfx/elx-snap.wav", { vol: 1.1 }); E.clip(WHISTLE, "sfx/elx-whistle.wav", { vol: .8 });
  const glow = E.el(R, "abs", "left:520px;top:1000px;width:540px;height:800px;z-index:4;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,rgba(255,235,150,.5),transparent 65%);opacity:0");
  E.K(glow, "o", [[Q1 + .2, 0], [Q1 + 1.0, 1], [B3, 1], [B3 + .3, 0.5]]);
  // the drink slides over
  const drink = E.el(R, "abs", "left:900px;top:950px;font-size:110px;z-index:7;opacity:0", "🍸");
  E.K(drink, "o", [[SERVE, 0], [SERVE + .05, 1], [SERVE + 1.3, 1], [SERVE + 1.5, 0]]); E.K(drink, "x", [[SERVE, 90], [SERVE + .5, -100, "out"]]); E.S(SERVE, "swish", .4); E.clip(SERVE + .5, "sfx/elx-glass-clink.wav", { vol: .5 });
  drink.style.top = "1000px";
  const quickB = E.el(R, "abs", `left:620px;top:450px;padding:10px 20px;border-radius:16px;background:${GREEN};color:#fff;font-weight:900;font-size:36px;z-index:9;opacity:0;white-space:nowrap`, "⚡ served in 2 seconds");
  E.K(quickB, "o", [[SERVE + .2, 0], [SERVE + .3, 1], [STAMP - .1, 1], [STAMP, 0]]); E.K(quickB, "s", [[SERVE + .2, .6], [SERVE + .5, 1, "back"]]); E.S(SERVE + .2, "ding", .4);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:14px 22px 18px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const BT = 880;
  bubble("Excuse me!<br>Hello?!", { left: 30, top: BT, w: 380, tail: 250, t0: B1, t1: S1 + .2, size: 52 });
  bubble("Be right with you!", { left: 560, top: 420, w: 480, tail: 280, t0: S1, t1: B2 - .2, dark: true });
  bubble("I’ve got <b>cash!</b><br>Right here! 💵", { left: 30, top: BT - 20, w: 520, tail: 260, t0: B2, t1: TWITCH + .5, size: 46 });
  bubble("Did you just…<br><b>snap</b> at me?", { left: 560, top: 400, w: 480, tail: 280, t0: S2, t1: WHISTLE - .3, dark: true, size: 46 });
  bubble("Hi. No rush<br>at all. 🙂", { left: 570, top: 890, w: 440, tail: 220, t0: Q1 + .05, t1: S3 - .3 });
  bubble("Hi there… what can I<br>get you, my friend? 😊", { left: 590, top: 385, w: 470, tail: 250, t0: S3, t1: B3 - .2, dark: true, size: 36 });
  bubble("What?! I was<br><b>here first!</b>", { left: 30, top: BT, w: 470, tail: 250, t0: B3, t1: S4 - .1, size: 50 });
  bubble("<b>Wait</b> your turn.", { left: 560, top: 420, w: 480, tail: 280, t0: S4, t1: STAMP - .1, dark: true, size: 52 });
  E.clip(B1 + .05, "voices/sk77/b1.wav", { vol: 1.5 }); E.clip(S1 + .05, "voices/sk77/s1.wav", { vol: 1.5 }); E.clip(B2 + .05, "voices/sk77/b2.wav", { vol: 1.5 });
  E.clip(S2 + .05, "voices/sk77/s2.wav", { vol: 1.5 }); E.clip(Q1 + .05, "voices/sk77/q1.wav", { vol: 1.5 }); E.clip(S3 + .05, "voices/sk77/s3.wav", { vol: 1.5 });
  E.clip(B3 + .05, "voices/sk77/b3.wav", { vol: 1.5 }); E.clip(S4 + .05, "voices/sk77/s4.wav", { vol: 1.5 });
  E.music({ bpm: 108, root: 57, seed: 77, prog: [[0, 3, 7], [5, 8, 12], [7, 10, 14], [3, 7, 10]], until: S3 });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:790px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "WAIT YOUR<br>TURN.", STAMP, { size: 120, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "Getting the *bartender’s* attention.", { size: 46, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
