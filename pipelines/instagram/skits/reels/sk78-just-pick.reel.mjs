// SK.78 "I'm not hungry, I'll just pick." — Rico orders fries for the table. Nina: "Oh, not for me. I'm not hungry." Fries arrive. "I'll just pick."
// Time-lapse: the clock runs 7:12 → 7:52 while fry after fry flies to Nina (she chats through it, cheeks full). Rico gets 3. Nina's HUNGER meter
// stays at "NOT HUNGRY". Rico: "Nina… where are my fries?" — "What? I'm not even hungry." (she eats the last one) — then "Should we order more? I'm starving!"
// Stamp: I'M NOT HUNGRY. Voices: ElevenLabs (Rico: Liam; Nina: Sarah; waiter: George).
export const meta = {
  id: "sk78-just-pick",
  images: { bg: "bg/restaurant.jpg", nrefuse: "cutouts/nina_refuse.webp", nchew: "cutouts/nina_chew.webp", nsneak: "cutouts/nina_sneak.webp",
    rreach: "cutouts/rico_reach.webp", rdead: "cutouts/rico_deadpan.webp", rstun: "cutouts/rico_stunned.webp", waiter: "cutouts/waiter.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", GREEN = "#1a9c5b";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const R1 = .5, N1 = 2.1, W1 = 4.3, N2 = 6.3, N3 = 8.3, R2 = 13.7, N4 = 16.4, N5 = 18.9, STAMP = 22.0, DUR = 26.0;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("table", 0, DUR, "dark"); E.cur = S; const R = S.el;

  // ================= the restaurant =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bg = E.img(bgBox, "bg", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 50%");
  const TABLE_Y = 1240;
  // the near part of the tablecloth drawn over the seated characters' cut-off waists
  const cover = E.el(R, "abs", `left:0;top:${TABLE_Y}px;width:1080px;height:${1920 - TABLE_Y}px;overflow:hidden;z-index:3`);
  E.img(cover, "bg", `position:absolute;left:0;top:${-TABLE_Y}px;width:1080px;height:1920px`);
  E.clip(0, "sfx/elx-restaurant.wav", { vol: .3, to: 8, duck: true }); E.clip(8, "sfx/elx-restaurant.wav", { vol: .3, to: 8, duck: true });
  E.clip(16, "sfx/elx-restaurant.wav", { vol: .3, to: DUR - 16, duck: true });

  // ================= seated characters =================
  const fig = (img, H, w, h, cx, bottom, z, show, bob = 3) => {
    const W = H * w / h; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px`);
    E.F(t => { const on = show(t); f.style.opacity = on ? 1 : 0; }); return [f, fi];
  };
  const events = []; // [time, who]
  for (let i = 0; i < 31; i++) events.push([6.4 + i * .225, "n"]);
  [9.0, 10.6, 12.2].forEach(tt => { let bi = 0; events.forEach((e, i) => { if (Math.abs(e[0] - tt) < Math.abs(events[bi][0] - tt)) bi = i; }); events[bi][1] = "r"; });
  const LAST = N4 + .6; events.push([LAST, "n"]);
  const eating = t => events.some(([tt]) => t >= tt && t < tt + .22);
  const nPose = t => t < N2 - .3 ? "nrefuse" : t < N3 - .1 ? "nsneak" : t < R2 - .2 ? "nchew" : t < N5 - .1 ? "nsneak" : "nrefuse";
  const rPose = t => t < N1 - .1 ? "rreach" : events.some(([tt, w]) => w === "r" && t >= tt - .1 && t < tt + .5) ? "rreach" : t < R2 - .3 ? "rdead" : t < N5 + 2.4 ? "rstun" : "rdead";
  const NH = 600, NX = 285, RH = 620, RX = 800, BOT = TABLE_Y + 18;
  const nn = { nrefuse: fig("nrefuse", NH, 329, 609, NX, BOT, 2, t => nPose(t) === "nrefuse"), nsneak: fig("nsneak", NH, 318, 606, NX, BOT, 2, t => nPose(t) === "nsneak"), nchew: fig("nchew", NH, 352, 589, NX, BOT, 2, t => nPose(t) === "nchew") };
  const rr = { rreach: fig("rreach", RH, 340, 511, RX, BOT, 2, t => rPose(t) === "rreach"), rdead: fig("rdead", RH, 329, 506, RX, BOT, 2, t => rPose(t) === "rdead"), rstun: fig("rstun", RH, 347, 507, RX, BOT, 2, t => rPose(t) === "rstun") };
  E.F(t => {
    const p = nPose(t), q = rPose(t);
    const ch = eating(t) || (p === "nchew" && t < R2) ? Math.sin(t * 26) : Math.sin(t * 1.6) * .4;
    nn[p][1].style.transform = `translateY(${ch * 5}px) rotate(${Math.sin(t * 2.2) * .8}deg)`;
    rr[q][1].style.transform = `translateY(${Math.sin(t * 1.7) * 3}px)${q === "rstun" ? ` scale(${1 + Math.sin(t * 30) * .006})` : ""}`;
  });

  // ================= the fries basket =================
  const BX = 540, BY = 1440;
  const bask = E.el(R, "abs", `left:${BX - 200}px;top:${BY - 260}px;width:400px;height:260px;z-index:4;transform-origin:50% 100%`);
  E.K(bask, "o", [[W1 + .55, 0], [W1 + .6, 1]]); E.K(bask, "y", [[W1 + .55, -180], [W1 + .85, 0, "back"]]);
  E.S(W1 + .8, "thud", .5); E.S(W1 + .9, "ding", .3);
  const fries = [];
  for (let i = 0; i < 32; i++) {
    const a = -34 + 68 * (i / 31) + Math.sin(i * 7.3) * 6, len = 120 + Math.abs(Math.sin(i * 3.1)) * 60, x = 200 + (i / 31 - .5) * 260 + Math.sin(i * 5.7) * 10;
    const f = E.el(bask, "abs", `left:${x - 11}px;top:${150 - len}px;width:22px;height:${len + 20}px;border-radius:5px;background:linear-gradient(90deg,#e9a91f,#fbd45b 45%,#f2b52a);box-shadow:inset 0 0 0 1px rgba(150,90,0,.35);transform-origin:50% 100%;transform:rotate(${a}deg)`);
    f.style.zIndex = String(i % 7); fries.push([f, a]);
  }
  const order = fries.map((_, i) => i).sort((a, b) => Math.sin(a * 12.9) - Math.sin(b * 12.9));
  // paper-lined basket front
  const front = E.el(bask, "abs", "left:0;top:130px;width:400px;height:130px;border-radius:14px 14px 34px 34px;background:repeating-linear-gradient(45deg,#d8352a 0 26px,#fff 26px 52px);box-shadow:0 14px 30px rgba(0,0,0,.45);z-index:20");
  E.el(front, "abs", "left:0;top:0;width:400px;height:16px;background:rgba(0,0,0,.18);border-radius:14px 14px 0 0");
  const steam = E.el(R, "abs", `left:${BX - 60}px;top:${BY - 400}px;font-size:80px;z-index:5;opacity:0`, "♨️");
  E.K(steam, "o", [[W1 + .9, 0], [W1 + 1.2, .8], [N2 - .2, .8], [N2, 0]]);
  E.F(t => { let gone = 0; events.forEach(([tt]) => { if (t >= tt + .05) gone++; });
    fries.forEach(([f, a], i) => { const k = order.indexOf(i); f.style.opacity = k < gone ? 0 : 1; f.style.transform = `rotate(${a}deg)`; }); });

  // flying fries
  const fly = (tt, who) => {
    const f = E.el(R, "abs", "left:0;top:0;width:20px;height:96px;border-radius:5px;background:linear-gradient(90deg,#e9a91f,#fbd45b 45%,#f2b52a);z-index:6;opacity:0");
    const x1 = who === "n" ? NX + 10 : RX - 10, y1 = 900, x0 = BX + (who === "n" ? -50 : 50), y0 = BY - 240, D = .24;
    E.F(t => { const k = seg(t, tt, D); if (t < tt || t > tt + D + .02) { f.style.opacity = 0; return; } const x = x0 + (x1 - x0) * k, y = y0 + (y1 - y0) * k - Math.sin(k * Math.PI) * 120;
      f.style.opacity = 1; f.style.transform = `translate(${x}px,${y}px) rotate(${(x1 < x0 ? -1 : 1) * k * 240}deg)`; });
    E.clip(tt + .18, "sfx/elx-crunch.wav", { vol: who === "n" ? .3 : .5, to: .5 });
  };
  events.forEach(([tt, w]) => fly(tt, w));
  E.clip(N3 + .1, "sfx/elx-munch.wav", { vol: .35, to: 3 });

  // waiter delivers
  const [wf, wfi] = fig("waiter", 800, 526, 1010, 900, 1690, 7, t => t >= W1 - .5 && t < W1 + 1.9);
  E.F(t => { const k = t < W1 + .8 ? seg(t, W1 - .5, .5) : 1 - seg(t, W1 + 1.2, .7); wf.style.transform = `translateX(${(1 - k) * 420}px)`; });

  // ================= the scoreboard =================
  const card = E.el(R, "abs", `left:60px;top:1590px;width:960px;padding:14px 26px 16px;border-radius:26px;background:rgba(255,255,255,.96);box-shadow:0 18px 44px rgba(0,0,0,.4);z-index:8;color:${INK};font-variant-numeric:tabular-nums`);
  E.K(card, "s", [[0, .8], [.35, 1, "back"]]); E.K(card, "o", [[0, 0], [.1, 1]]);
  const row1 = E.el(card, "", "display:flex;justify-content:space-between;align-items:center;font-weight:900;font-size:36px;margin-bottom:6px");
  const clock = E.el(row1, "", "", "🕖 7:12 PM");
  const hunger = E.el(row1, "", `padding:2px 16px;border-radius:12px;background:${GREEN};color:#fff;font-size:32px`, "Nina’s hunger: NOT HUNGRY");
  const row2 = E.el(card, "", "display:flex;justify-content:space-around;font-weight:900;font-size:44px;letter-spacing:-.01em");
  const cN = E.el(row2, "", "", "🍟 NINA 0"), cR = E.el(row2, "", "", "RICO 0"), cL = E.el(row2, "", `color:${CORAL}`, "LEFT 32");
  E.F(t => {
    let n = 0, r = 0; events.forEach(([tt, w]) => { if (t >= tt + .2) { if (w === "n") n++; else r++; } }); const left = 32 - n - r;
    const mins = t < N2 ? 12 + Math.floor(seg(t, 0, N2) * 2) : 14 + Math.floor(seg(t, N2, LAST - N2) * 38);
    const cl = `🕖 7:${String(Math.min(mins, 59)).padStart(2, "0")} PM`; if (clock.textContent !== cl) clock.textContent = cl;
    cN.textContent = `🍟 NINA ${n}`; cR.textContent = `RICO ${r}`; cL.textContent = `LEFT ${Math.max(0, left)}`;
    const st = t >= N5 + .1; hunger.textContent = st ? "Nina’s hunger: STARVING" : "Nina’s hunger: NOT HUNGRY"; hunger.style.background = st ? CORAL : GREEN;
  });
  E.S(N5 + .1, "nope", .4);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:14px 22px 18px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const BT = 470;
  bubble("Fries for<br>the table?", { left: 560, top: BT, w: 400, tail: 250, t0: R1, t1: N1 - .1, size: 50 });
  bubble("Oh, not for me.<br><b>I’m not hungry.</b>", { left: 40, top: BT, w: 500, tail: 240, t0: N1, t1: W1 - .1, size: 46 });
  bubble("One fries,<br>for the table.", { left: 620, top: 1000, w: 420, tail: 300, t0: W1, t1: W1 + 1.6, size: 40, dark: true });
  bubble("I’ll just <b>pick.</b>", { left: 60, top: BT + 20, w: 420, tail: 220, t0: N2, t1: N3 - .2, size: 52 });
  bubble("So then my boss said no way!<br>And I was like, no way!", { left: 40, top: BT - 40, w: 560, tail: 230, t0: N3, t1: N3 + 3.9, size: 38 });
  bubble("Nina… where<br>are <b>my</b> fries?", { left: 500, top: BT, w: 500, tail: 300, t0: R2, t1: N4 - .1, size: 46 });
  bubble("What? I’m not<br><b>even</b> hungry.", { left: 40, top: BT, w: 470, tail: 240, t0: N4, t1: N5 - .2, size: 46 });
  bubble("Should we order more?<br><b>I’m starving!</b>", { left: 30, top: BT, w: 560, tail: 250, t0: N5, t1: STAMP - .1, size: 44 });
  const V = (t, f, v = 1.5) => E.clip(t + .05, `voices/sk78/${f}.wav`, { vol: v });
  V(R1, "r1"); V(N1, "n1"); V(W1, "w1"); V(N2, "n2"); V(N3, "n3"); V(R2, "r2"); V(N4, "n4"); V(N5, "n5");
  E.music({ bpm: 104, root: 52, seed: 78, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: DUR - 4 });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:980px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "I’M NOT<br>HUNGRY.", STAMP, { size: 124, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“I’m not hungry, I’ll just *pick*.”", { size: 52, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.K(cover, "o", [[0, 1]]);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
