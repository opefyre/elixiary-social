// SK.80 "Enjoy your meal." "You too!" — the reflex. Waiter: "Enjoy your meal!" Rico: "You too!" (tally ×1). Clinic, doctor: "Get well soon!" —
// "You too!" — "I'm… not the sick one." (×2). Bar, Sal: "Have a safe trip home!" — "You too!" — "I live upstairs." (×3). Back at the table he has
// practised: waiter "Enjoy your meal!" — "Thank you!" ✔. Waiter: "Sorry for the wait." — "You too!" (×4). Waiter: "…Thank you." Stamp: YOU TOO.
// Voices: ElevenLabs (Rico: Liam; waiter: George; doctor: Laura; Sal: Chris).
export const meta = {
  id: "sk80-you-too",
  images: { rest: "bg/restaurant.jpg", clinic: "bg/clinic.jpg", bar: "bg/cocktailbar.jpg", greet: "cutouts/rico_greet.webp", cringe: "cutouts/rico_cringe.webp",
    waiter: "cutouts/waiter.webp", doc: "cutouts/doc_skeptic.webp", sal: "cutouts/sal_host.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", GREEN = "#1a9c5b";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const A0 = .4, RA = 1.9, DA = 3.4, W2 = 5.2, W3 = 10.6, W4 = 16.6;   // scene starts (wipes) / A: restaurant; B: clinic from W2; C: bar from W3; D: restaurant from W4
  const D1 = 6.0, RB = 7.3, D2 = 8.4;          // clinic
  const S1 = 11.5, RC = 13.0, S2 = 14.1;        // bar
  const WD = 17.6, RD = 19.0, WE = 20.4, RE = 21.6, WF = 22.6, STAMP = 24.0, DUR = 27.6;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("you", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const ph = t => t < W2 ? 0 : t < W3 ? 1 : t < W4 ? 2 : 3;
  const at = (t, i) => ph(t) === i;

  // ================= backgrounds =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgs = ["rest", "clinic", "bar", "rest"].map((k, i) => E.img(bgBox, k, "position:absolute;left:0;top:0;width:1080px;height:1920px;opacity:0"));
  const bgD = bgs[3]; bgs[3].remove(); bgs[3] = E.img(bgBox, "rest", "position:absolute;left:0;top:0;width:1080px;height:1920px;opacity:0");
  E.F(t => { const p = ph(t); bgs.forEach((b, i) => { b.style.opacity = i === p ? 1 : 0; b.style.transform = `scale(${1.03 + (t % 9) * .004})`; }); });
  E.clip(0, "sfx/elx-restaurant.wav", { vol: .26, to: W2, duck: true }); E.clip(W3 - .2, "sfx/elx-lounge.wav", { vol: .2, to: W4 - W3, duck: true });
  E.clip(W4, "sfx/elx-restaurant.wav", { vol: .26, to: DUR - W4, duck: true }); E.clip(W2, "sfx/elx-office-murmur.wav", { vol: .12, to: W3 - W2, duck: true });
  E.wipe(W2); E.wipe(W3); E.wipe(W4);
  [W2, W3, W4].forEach(w => E.clip(w - .3, "sfx/elx-trailer-whoosh.wav", { vol: .3 }));

  // ================= figures =================
  const fig = (img, H, w, h, cx, bottom, z, show) => {
    const W = H * w / h; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px`);
    E.F(t => { f.style.opacity = show(t) ? 1 : 0; }); return [f, fi];
  };
  // Rico: arms-wide "you too!" for a beat, then the frozen cringe
  const said = [RA, RB, RC, RE];                    // wrong answers
  const cringing = t => said.some(s => t >= s + .8 && t < s + 3.2) || (t >= RE + .8);
  const greeting = t => !cringing(t);
  const [g, gi] = fig("greet", 700, 598, 677, 290, 1945, 6, t => greeting(t));
  const [c, ci] = fig("cringe", 800, 259, 669, 300, 1945, 6, t => cringing(t));
  E.F(t => { gi.style.transform = `translateY(${Math.sin(t * 1.8) * 4}px)`; const s = said.find(s => t >= s + .8 && t < s + 3.2); ci.style.transform = `translateX(${s !== undefined && t < s + 1.4 ? Math.sin(t * 40) * 4 : 0}px)`; });
  // the other person in each scene
  const [wf, wfi] = fig("waiter", 900, 526, 1010, 810, 1945, 5, t => at(t, 0) || at(t, 3));
  const [df, dfi] = fig("doc", 900, 594, 995, 790, 1940, 5, t => at(t, 1));
  const SH = 720, SVIS = .8;
  const salBox = E.el(R, "abs", `left:0;top:${1125 - SH * SVIS}px;width:1080px;height:${SH * SVIS}px;overflow:hidden;z-index:2`);
  const SW = SH * 827 / 1104; const sal = E.img(salBox, "sal", `position:absolute;left:${800 - SW / 2}px;top:0;width:${SW}px;height:${SH}px;opacity:0`);
  E.F(t => { wfi.style.transform = `translateY(${Math.sin(t * 1.6) * 3}px)`; dfi.style.transform = `translateY(${Math.sin(t * 1.5) * 3}px)`; sal.style.opacity = at(t, 2) ? 1 : 0; salBox.style.transform = `translateY(${Math.sin(t * 1.5) * 2}px)`; });

  // ================= the tally =================
  const card = E.el(R, "abs", `left:40px;top:360px;padding:12px 26px 10px;border-radius:22px;background:rgba(10,8,12,.86);z-index:9;color:#fff;white-space:nowrap;transform-origin:0 50%`);
  const big = E.el(card, "", "font-weight:900;font-size:56px;letter-spacing:-.02em;line-height:1.05", "YOU TOO ×0");
  const sub = E.el(card, "", `font-weight:800;font-size:29px;color:${GOLD};margin-top:2px`, "Correct replies: 0");
  E.K(card, "s", [[0, .7], [.3, 1, "back"]]);
  const hits = [[RA + .35, "YOU TOO ×1", "✖ waiter isn’t eating"], [RB + .35, "YOU TOO ×2", "✖ doctor isn’t sick"], [RC + .35, "YOU TOO ×3", "✖ Sal lives upstairs"], [RD + .3, null, "✔ “Thank you!” — correct reply"], [RE + .35, "YOU TOO ×4", "✖ …it was his wait"]];
  E.F(t => { let b = "YOU TOO ×0", s = "Correct replies: 0"; hits.forEach(([tt, bb, ss]) => { if (t >= tt) { if (bb) b = bb; s = ss; } });
    if (big.textContent !== b) big.textContent = b; if (sub.textContent !== s) sub.textContent = s; sub.style.color = s.startsWith("✔") ? "#7dffa4" : GOLD;
    let k = 1; hits.forEach(([tt]) => { if (t >= tt && t < tt + .35) k = 1 + .12 * Math.sin((t - tt) / .35 * Math.PI); }); card.style.transform = `scale(${k})`; });
  hits.forEach(([tt, bb]) => E.S(tt, bb ? "nope" : "ding", .45));

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:14px 22px 18px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const RT = 880, OT = 830;
  const R_ = (t0, t1, txt, size = 62) => bubble(txt, { left: 60, top: RT, w: 460, tail: 230, t0, t1, size });
  bubble("Enjoy your meal!", { left: 560, top: OT, w: 470, tail: 250, t0: A0, t1: RA - .1, dark: true, size: 44 });
  R_(RA, DA - .1, "You too!"); 
  bubble("😐", { left: 660, top: OT, w: 170, tail: 100, t0: DA, t1: W2 - .3, dark: true, size: 60 });
  bubble("Get well soon!", { left: 560, top: OT, w: 470, tail: 250, t0: D1, t1: RB - .1, dark: true, size: 46 });
  R_(RB, D2 - .1, "You too!");
  bubble("I’m… not the<br><b>sick one.</b>", { left: 560, top: OT - 30, w: 470, tail: 250, t0: D2, t1: W3 - .3, dark: true, size: 44 });
  bubble("Have a safe<br>trip home!", { left: 590, top: 400, w: 450, tail: 260, t0: S1, t1: RC - .1, dark: true, size: 44 });
  R_(RC, S2 - .1, "You too!");
  bubble("I <b>live</b> upstairs.", { left: 570, top: 400, w: 470, tail: 280, t0: S2, t1: W4 - .3, dark: true, size: 44 });
  bubble("Enjoy your meal!", { left: 560, top: OT, w: 470, tail: 250, t0: WD, t1: RD - .1, dark: true, size: 44 });
  bubble("Thank you!", { left: 60, top: RT, w: 420, tail: 220, t0: RD, t1: WE - .1, size: 58 });
  bubble("Sorry for the wait.", { left: 560, top: OT, w: 470, tail: 250, t0: WE, t1: RE - .1, dark: true, size: 44 });
  R_(RE, WF - .1, "You too!");
  bubble("…thank you.", { left: 560, top: OT, w: 400, tail: 250, t0: WF, t1: STAMP - .1, dark: true, size: 46 });
  const V = (t, f, v = 1.5) => E.clip(t + .05, `voices/sk80/${f}.wav`, { vol: v });
  V(A0, "w1"); V(RA, "r1"); V(D1, "d1"); V(RB, "r2"); V(D2, "d2"); V(S1, "s1"); V(RC, "r3"); V(S2, "s2"); V(WD, "w1"); V(RD, "r4"); V(WE, "w2"); V(RE, "r5"); V(WF, "w3");
  E.music({ bpm: 100, root: 53, seed: 80, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: DUR - 3 });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:760px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "YOU TOO.", STAMP, { size: 140, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“Enjoy your meal.” *“You too!”*", { size: 51, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
