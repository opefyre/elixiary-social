// SK.76 "Make yourself at home.*" — Host: "Come in! Make yourself at home!" Rico: "Thanks! Nice place!" He perches on the armchair:
// "Oh, not that chair, sweetie." (*rule 1). He holds his cocktail above the table: "Coaster! Coaster!" "Sorry! Sorry!" (*rule 2).
// "Shoes off, please." — his sneakers fly off (*rule 3). He reaches for the cheese: "Oh, that's for Sunday." (*rule 4).
// "So… where can I sit?" "Anywhere! Make yourself at home!" — he ends up standing in the middle of the room in his socks.
// Fine print: *not that chair *coasters, always *no shoes *not that cheese *don't touch the remote *the cushions are decorative.
// Stamp: MAKE YOURSELF AT HOME.* (*STAND THERE)
// Voices: ElevenLabs (host: Sarah; Rico: Liam).
export const meta = {
  id: "sk76-make-yourself-at-home",
  images: { room: "bg/livingroom.jpg", host: "cutouts/glam_point.webp", nod: "cutouts/rico_nod.webp", chair: "cutouts/rico_chair.webp",
    glass: "cutouts/rico_glass.webp", socks: "cutouts/rico_socks.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const N1 = .4, R1 = 2.7, CH = 4.6, N2 = 5.5, TABLE = 7.6, N3 = 8.2, R2 = 9.5, N4 = 11.2, N5 = 13.7, R3 = 15.6, N6 = 17.4, FINE = 19.8, STAMP = 22.6, DUR = 25.6;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("room", 0, DUR, "dark"); E.cur = S; const R = S.el;

  // ================= the spotless room =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bg = E.img(bgBox, "room", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 55%;filter:brightness(1.05) saturate(1.05)");
  E.F(t => { bg.style.transform = `scale(${1.04 + t * .003})`; });
  E.clip(0, "sfx/elx-lounge.wav", { vol: .15, to: 6, duck: true }); E.clip(6, "sfx/elx-lounge.wav", { vol: .15, to: 6, duck: true }); E.clip(12, "sfx/elx-lounge.wav", { vol: .15, to: 6, duck: true });
  E.clip(18, "sfx/elx-lounge.wav", { vol: .15, to: DUR - 18, duck: true });
  E.clip(0, "sfx/doorbell.wav", { vol: .5 });

  // rules counter (motion from frame 0: the door welcome pulse)
  const cnt = E.el(R, "abs", `left:40px;top:360px;padding:10px 24px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:40px;z-index:9;font-variant-numeric:tabular-nums;white-space:nowrap`);
  const RULES = [[N2 + .7, "not that chair"], [N3 + .6, "coasters. always."], [N4 + .5, "shoes off"], [N5 + .5, "not that cheese"], [R3 + .3, "don’t touch the remote"], [R3 + 1.1, "cushions are decorative"]];
  E.F(t => { const n = RULES.filter(r => t >= r[0]).length; const h = n ? `📜 house rules discovered: ${n}` : "🏠 “make yourself at home”"; if (cnt.textContent !== h) cnt.textContent = h; });
  E.K(cnt, "s", [[0, .7], [.3, 1, "back"]]);
  RULES.forEach(([k]) => E.S(k, "tick", .45));

  // red sticky notes for each rule
  RULES.forEach(([t0, txt], i) => {
    const left = 40 + (i % 2) * 520, top = 450 + Math.floor(i / 2) * 86;
    const n = E.el(R, "abs", `left:${left}px;top:${top}px;padding:10px 20px;border-radius:14px;background:${i < 4 ? "#fff59a" : "#ffd6d0"};color:${INK};font-weight:900;font-size:34px;z-index:9;opacity:0;white-space:nowrap;box-shadow:0 8px 20px rgba(0,0,0,.3);transform-origin:0 0`, `<span style="color:${CORAL}">*</span>${txt}`);
    E.K(n, "o", [[t0, 0], [t0 + .08, 1], [FINE - .2, 1], [FINE, 0]]); E.K(n, "s", [[t0, 1.5], [t0 + .25, 1, "out"]]); E.K(n, "r", [[t0, -6], [t0 + .25, i % 2 ? 2 : -2, "out"]]); E.S(t0, "slam", .3);
  });

  // ================= the host and Rico =================
  const fig = (img, H, w, h, cx, bottom, z, show, bob = 4) => {
    const W = H * w / h; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px`);
    E.F(t => { const on = show(t); f.style.opacity = on ? 1 : 0; if (on) fi.style.transform = `translateY(${Math.sin(t * 1.7 + cx) * bob}px)`; }); return [f, fi];
  };
  fig("host", 880, 594, 999, 170, 1935, 5, t => t < DUR);
  // Rico pose by time: enters (nod), perches (chair), hovering glass, socks
  const poseAt = t => t < CH ? "nod" : t < N2 + 1.8 ? "chair" : t < N4 + .3 ? "glass" : "socks";
  const rx = t => t < R1 - .3 ? 1500 - 600 * seg(t, N1 + 1.0, 1.4) * 0 : 1500 - 700 * seg(t, R1 - .6, .9);
  const R_ = { nod: fig("nod", 800, 688, 989, 760, 1940, 4, t => poseAt(t) === "nod" && t >= R1 - .6), chair: fig("chair", 800, 364, 620, 790, 1940, 4, t => poseAt(t) === "chair"),
    glass: fig("glass", 860, 316, 656, 800, 1940, 4, t => poseAt(t) === "glass"), socks: fig("socks", 900, 236, 657, 720, 1940, 4, t => poseAt(t) === "socks") };
  E.F(t => {
    R_.nod[0].style.transform = `translateX(${(1 - seg(t, R1 - .6, .6)) * 500}px)`;
    if (poseAt(t) === "chair") { const up = seg(t, N2 + .8, .3); R_.chair[1].style.transform = `translateY(${-Math.sin(up * Math.PI) * 70}px) rotate(${up * 6}deg)`; }
    if (poseAt(t) === "glass") { const tr = t > R2 - .2 && t < N4 ? Math.sin(t * 40) * 3 : 0; R_.glass[1].style.transform = `translateX(${tr}px)`; }
    if (poseAt(t) === "socks") R_.socks[1].style.transform = `translateX(${t > R3 && t < N6 ? 0 : 0}px) translateY(${t < N4 + 1.0 ? -Math.sin(seg(t, N4 + .3, .7) * Math.PI) * 60 : 0}px)`;
  });
  // shoes flying off
  [["👟", 640, 1750, -260, -420], ["👟", 700, 1770, 340, -380]].forEach(([e, x, y, dx, dy], i) => {
    const s = E.el(R, "abs", `left:${x}px;top:${y}px;font-size:80px;z-index:7;opacity:0`, e);
    const t0 = N4 + .4 + i * .08; E.K(s, "o", [[t0, 0], [t0 + .05, 1], [t0 + 1.3, 1], [t0 + 1.5, 0]]);
    E.F(t => { if (t >= t0 && t < t0 + 1.5) { const p = seg(t, t0, 1.2); s.style.transform = `translate(${dx * p}px,${dy * p + 620 * p * p}px) rotate(${p * 540}deg)`; } });
  });
  E.S(N4 + .5, "swish", .4); E.S(N4 + .8, "thud", .35);
  // the coaster: a tiny, sacred object
  const coaster = E.el(R, "abs", `left:590px;top:1470px;width:190px;height:52px;border-radius:50%;background:linear-gradient(180deg,#d9b382,#a5793d);z-index:3;opacity:0;box-shadow:0 8px 14px rgba(0,0,0,.4)`);
  E.K(coaster, "o", [[N3 + .3, 0], [N3 + .4, 1], [N4, 1], [N4 + .2, 0]]); E.K(coaster, "s", [[N3 + .3, 2], [N3 + .6, 1, "out"]]);
  // cheese platter with a Sunday tape
  const cheese = E.el(R, "abs", `left:330px;top:1170px;padding:10px 18px 4px;border-radius:24px;background:#fff8e0;z-index:6;opacity:0;font-size:80px;box-shadow:0 12px 26px rgba(0,0,0,.4);text-align:center`, "🧀🧀🧀<div style='font-size:34px;font-weight:900;color:#c33;margin-top:-6px'>SUNDAY</div>");
  E.K(cheese, "o", [[N5 - .8, 0], [N5 - .7, 1], [R3 - .2, 1], [R3, 0]]); E.K(cheese, "s", [[N5 - .8, .4], [N5 - .5, 1, "back"]]); E.S(N5 - .8, "pop", .4);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:#fff;border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:#fff;transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Come in! Make<br>yourself at home! 🏡", { left: 20, top: 780, w: 620, tail: 170, t0: N1, t1: R1 });
  bubble("Thanks!<br>Nice place!", { left: 560, top: 830, w: 440, tail: 200, t0: R1, t1: CH + .2 });
  bubble("Oh, <b>not that chair,</b><br>sweetie.", { left: 20, top: 780, w: 560, tail: 170, t0: N2, t1: TABLE, size: 46 });
  bubble("<b>Coaster!</b><br>Coaster!", { left: 20, top: 770, w: 420, tail: 170, t0: N3, t1: R2 - .1, size: 52 });
  bubble("Sorry! Sorry!", { left: 540, top: 850, w: 420, tail: 240, t0: R2, t1: N4 });
  bubble("Shoes off, please.", { left: 20, top: 790, w: 500, tail: 170, t0: N4, t1: N5 - 1.0 });
  bubble("Oh, that’s<br>for <b>Sunday.</b>", { left: 20, top: 780, w: 480, tail: 170, t0: N5, t1: R3 - .1, size: 50 });
  bubble("So… where<br>can I sit?", { left: 560, top: 830, w: 440, tail: 230, t0: R3, t1: N6 });
  bubble("<b>Anywhere!</b> Make yourself<br>at home! 🙂", { left: 20, top: 770, w: 640, tail: 170, t0: N6, t1: FINE, size: 46 });
  E.clip(N1 + .05, "voices/sk76/n1.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk76/r1.wav", { vol: 1.5 }); E.clip(N2 + .05, "voices/sk76/n2.wav", { vol: 1.5 });
  E.clip(N3 + .05, "voices/sk76/n3.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk76/r2.wav", { vol: 1.5 }); E.clip(N4 + .05, "voices/sk76/n4.wav", { vol: 1.5 });
  E.clip(N5 + .05, "voices/sk76/n5.wav", { vol: 1.5 }); E.clip(R3 + .05, "voices/sk76/r3.wav", { vol: 1.5 }); E.clip(N6 + .05, "voices/sk76/n6.wav", { vol: 1.5 });
  E.S(CH + .1, "creak", .45); E.S(TABLE, "tick", .4);
  E.music({ bpm: 96, root: 60, seed: 76, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: DUR });

  // ================= the fine print =================
  const fine = E.el(R, "abs", `left:60px;top:480px;width:960px;padding:22px 30px;border-radius:26px;background:rgba(255,255,255,.96);color:${INK};z-index:10;opacity:0;box-shadow:0 18px 44px rgba(0,0,0,.4)`);
  fine.innerHTML = `<div style="font-weight:900;font-size:34px;letter-spacing:.1em;color:#a06a00;margin-bottom:6px">*FINE PRINT</div>` + RULES.map(r => `<div style="font-weight:800;font-size:38px;line-height:1.3"><span style="color:${CORAL}">*</span>${r[1]}</div>`).join("");
  E.K(fine, "o", [[FINE, 0], [FINE + .1, 1], [STAMP - .2, 1], [STAMP, 0]]); E.K(fine, "s", [[FINE, .6], [FINE + .3, 1, "back"]]); E.S(FINE, "pop", .45);

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:640px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "MAKE YOURSELF<br>AT HOME.*<br><span style='font-size:52px'>*STAND THERE</span>", STAMP, { size: 84, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“Make yourself at *home.*”", { size: 58, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
