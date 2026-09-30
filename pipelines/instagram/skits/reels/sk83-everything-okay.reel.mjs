// SK.83 "Is everything okay with your meal?" — Rico's pasta is cold. The waiter is never there when his mouth is empty ("Excuse me?" — "Be right
// with you!" and he keeps walking), but the instant a bite goes in he's at the table: "Is everything okay with your meal?" — "Mm-hm!" (thumbs up,
// cheeks full) — "Wonderful!" Three times. Indicators: MOUTH / WAITER; "asked while full: 3 · while empty: 0". Stamp: EVERYTHING'S GREAT.
// Voices: ElevenLabs (Rico: Liam; waiter: George).
export const meta = {
  id: "sk83-everything-okay",
  images: { bg: "bg/restaurant.jpg", stuffed: "cutouts/rico_stuffed.webp", hand: "cutouts/rico_hand.webp", slump: "cutouts/rico_slump.webp", waiter: "cutouts/waiter.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", GREEN = "#1a9c5b";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  // timeline
  const C1 = .4, PASS1 = .5, B1 = 3.4, AT1 = 3.7, W1 = 4.0, M1 = 5.8, WW1 = 6.6, OUT1 = 7.3, COLD = 7.7, C2 = 9.0, PASS2 = 9.6, B2 = 11.4, AT2 = 11.7, W2 = 12.0, M2 = 13.8, WW2 = 14.7, OUT2 = 15.4, C3 = 16.3, B3 = 18.2, AT3 = 18.5, W3 = 18.8, M3 = 20.4, WW3 = 21.7, OUT3 = 22.3, STAMP = 23.4, DUR = 27.0;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("table", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const TABLE_Y = 1340;

  // ================= the restaurant =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  E.img(bgBox, "bg", "position:absolute;left:0;top:0;width:1080px;height:1920px");
  const cover = E.el(R, "abs", `left:0;top:${TABLE_Y}px;width:1080px;height:${1920 - TABLE_Y}px;overflow:hidden;z-index:3`);
  E.img(cover, "bg", `position:absolute;left:0;top:${-TABLE_Y}px;width:1080px;height:1920px`);
  E.clip(0, "sfx/elx-restaurant.wav", { vol: .3, to: 9, duck: true }); E.clip(9, "sfx/elx-restaurant.wav", { vol: .3, to: 9, duck: true }); E.clip(18, "sfx/elx-restaurant.wav", { vol: .3, to: DUR - 18, duck: true });

  // ================= Rico =================
  const inR = (t, list) => list.some(([a, b]) => t >= a && t < b);
  const HAND = [[C1 - .2, B1 - .7], [C2 - .2, B2 - .8], [C3 - .2, B3 - .8]], STUF = [[B1, OUT1 - .2], [B2, OUT2 - .2], [B3, WW3 + .6]];
  const pose = t => inR(t, STUF) ? "stuffed" : inR(t, HAND) ? "hand" : "slump";
  const fig = (img, H, w, h, cx, bottom, z, show) => {
    const W = H * w / h; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px`);
    E.F(t => { f.style.opacity = show(t) ? 1 : 0; }); return [f, fi];
  };
  const RX = 360, RB = TABLE_Y + 20;
  const rr = { stuffed: fig("stuffed", 700, 334, 416, RX, RB, 2, t => pose(t) === "stuffed"), hand: fig("hand", 780, 346, 508, RX + 20, RB, 2, t => pose(t) === "hand"), slump: fig("slump", 700, 318, 419, RX, RB, 2, t => pose(t) === "slump") };
  E.F(t => { const p = pose(t); const ch = p === "stuffed" ? Math.sin(t * 24) * 4 : 0; rr[p][1].style.transform = `translateY(${Math.sin(t * 1.7) * 3 + ch}px)`; if (p === "hand") rr.hand[1].style.transform = `translateY(${Math.sin(t * 1.7) * 3}px) rotate(${Math.sin(t * 6) * 1.2}deg)`; });

  // the plate (cold pasta)
  const plate = E.el(R, "abs", "left:560px;top:1380px;width:420px;height:140px;border-radius:50%;background:radial-gradient(ellipse at 50% 40%,#fff,#e9e3d8 70%,#cfc7b8);box-shadow:0 14px 30px rgba(0,0,0,.4);z-index:4");
  const food = E.el(R, "abs", "left:640px;top:1305px;font-size:190px;z-index:5;line-height:1", "🍝");
  const cold = E.el(R, "abs", "left:860px;top:1290px;font-size:84px;z-index:6;opacity:0", "🧊");
  E.K(cold, "o", [[COLD, 0], [COLD + .2, 1]]); E.K(cold, "s", [[COLD, .4], [COLD + .3, 1, "back"]]);
  E.F(t => { const bites = [B1, B2, B3].filter(b => t >= b).length; food.style.opacity = 1 - bites * .28; food.style.transform = `scale(${1 - bites * .14})`; });
  [B1, B2, B3].forEach(b => { E.clip(b - .1, "sfx/elx-cutlery.wav", { vol: .6, to: 1 }); E.clip(b + .15, "sfx/elx-munch.wav", { vol: .35, to: 1.6 }); });

  // ================= the waiter =================
  const WH = 980, WBOT = 1720;
  const Wf = E.el(R, "abs", `left:${0}px;top:${WBOT - WH}px;width:${WH * 526 / 1010}px;height:${WH}px;z-index:5;opacity:0;transform-origin:50% 100%`);
  E.img(Wf, "waiter", `width:${WH * 526 / 1010}px;height:${WH}px`);
  const ww = WH * 526 / 1010;
  const at = [[AT1, OUT1], [AT2, OUT2], [AT3, OUT3]], pass = [[PASS1, PASS1 + 2.0], [PASS2, PASS2 + 1.8], [C3 + .2, C3 + 2.2]];
  E.F(t => {
    let x = null, y = 0;
    at.forEach(([a, b]) => { if (t >= a && t < b) { const k = t < a + .3 ? 1 - seg(t, a, .3) : t > b - .5 ? seg(t, b - .5, .5) : 0; x = 790 - ww / 2 + k * 700; y = Math.sin(t * 2) * 3; } });
    pass.forEach(([a, b]) => { if (t >= a && t < b) { const k = seg(t, a, b - a); x = 1200 - k * 1500; y = -Math.abs(Math.sin(k * 14)) * 22; } });
    if (x === null) { Wf.style.opacity = 0; return; } Wf.style.opacity = 1; Wf.style.transform = `translate(${x}px,${y}px)`; Wf.style.left = "0px";
  });
  E.S(AT1, "whoosh", .3); E.S(AT2, "whoosh", .3); E.S(AT3, "whoosh", .3); E.S(PASS1, "whoosh", .2); E.S(PASS2, "whoosh", .2); E.S(C3 + .2, "whoosh", .2);

  // ================= the indicators =================
  const card = E.el(R, "abs", `left:60px;top:1590px;width:960px;padding:14px 26px 16px;border-radius:26px;background:rgba(255,255,255,.96);box-shadow:0 18px 44px rgba(0,0,0,.4);z-index:8;color:${INK};font-variant-numeric:tabular-nums`);
  E.K(card, "s", [[0, .8], [.35, 1, "back"]]); E.K(card, "o", [[0, 0], [.1, 1]]);
  const r1 = E.el(card, "", "display:flex;justify-content:space-between;align-items:center;font-weight:900;font-size:38px;margin-bottom:8px");
  const mouth = E.el(r1, "", "padding:2px 18px;border-radius:14px", "😮 MOUTH: EMPTY"), wait = E.el(r1, "", "padding:2px 18px;border-radius:14px", "🏃 WAITER: AWAY");
  const r2 = E.el(card, "", "display:flex;justify-content:space-around;font-weight:900;font-size:40px");
  const cF = E.el(r2, "", "", "Asked with mouth FULL: 0"), cE = E.el(r2, "", `color:${CORAL}`, "EMPTY: 0");
  const asked = [W1, W2, W3];
  E.F(t => {
    const full = pose(t) === "stuffed", here = at.some(([a, b]) => t >= a + .1 && t < b - .4);
    mouth.textContent = full ? "🤐 MOUTH: FULL" : "😮 MOUTH: EMPTY"; mouth.style.background = full ? GOLD : "#e6f3ea"; wait.textContent = here ? "🤵 WAITER: AT TABLE" : "🏃 WAITER: AWAY"; wait.style.background = here ? GOLD : "#eee";
    cF.textContent = `Asked with mouth FULL: ${asked.filter(a => t >= a + .3).length}`;
  });
  asked.forEach(a => E.S(a + .3, "buzz", .3));

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:14px 22px 18px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const RBT = 560, WBT = 520;
  const rb = (html, t0, t1, size = 54, left = 40, w = 400) => bubble(html, { left, top: RBT, w, tail: 250, t0, t1, size });
  const wb = (html, t0, t1, size = 42) => bubble(html, { left: 470, top: WBT, w: 560, tail: 340, t0, t1, size, dark: true });
  rb("Excuse me?", C1, C1 + 1.0, 54, 40, 400);
  bubble("Be right with<br>you!", { left: 560, top: 1000, w: 420, tail: 260, t0: PASS1 + .8, t1: PASS1 + 2.0, size: 40, dark: true });
  wb("Is everything okay<br>with your <b>meal?</b>", W1, M1 - .1);
  rb("<b>Mm-hm!</b> 👍", M1, WW1 - .1, 54);
  wb("Wonderful!", WW1, OUT1 - .1, 50);
  rb("It’s <b>cold.</b>", COLD, C2 - .1, 56);
  rb("Excuse me?", C2, PASS2 + .7, 54);
  bubble("Be right with<br>you!", { left: 560, top: 1000, w: 420, tail: 260, t0: PASS2 + .9, t1: PASS2 + 1.8, size: 40, dark: true });
  wb("Is everything okay<br>with your <b>meal?</b>", W2, M2 - .1);
  rb("<b>Mm-hm!</b> 👍", M2, WW2 - .1, 54);
  wb("Wonderful!", WW2, OUT2 - .1, 50);
  rb("Excuse me?", C3, B3 - .9, 54);
  wb("Is everything okay<br>with your <b>meal?</b>", W3, M3 - .1);
  rb("<b>Mm-hm!</b> Great! 👍", M3, WW3 - .1, 46, 20, 450);
  wb("Wonderful!", WW3, OUT3 - .1, 50);
  const V = (t, f, v = 1.5) => E.clip(t + .05, `voices/sk83/${f}.wav`, { vol: v });
  V(C1, "r1"); V(PASS1 + .8, "w3"); V(W1, "w1"); V(M1, "r2", 1.8); V(WW1, "w2"); V(COLD, "r3"); V(C2, "r1"); V(PASS2 + .9, "w3"); V(W2, "w1"); V(M2, "r2", 1.8); V(WW2, "w2"); V(C3, "r1"); V(W3, "w1"); V(M3, "r4"); V(WW3, "w2");
  E.music({ bpm: 98, root: 53, seed: 83, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: DUR - 4 });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1110px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "EVERYTHING’S<br>GREAT.", STAMP, { size: 118, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“Is everything *okay*?”", { size: 58, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
