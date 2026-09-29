// SK.57 "The club bathroom." — the famous "girls in the club bathroom" vs "guys in the club bathroom" contrast.
// LADIES': a stranger in pink sequins: "Oh my god. I LOVE your dress!" Nina: "Stop it! I love YOUR hair!" — "Wait. Is he
// texting you back?" "No… he's not." — "Leave him. You're a queen." 👑 "You're literally my best friend." Lipsticks swapped,
// numbers swapped, a trip planned: "Come to Ibiza with me!" "YES!" Known each other: 4:12. MEN'S: grey tiles, one flickering
// tube, silence. Rico and a stranger stare straight ahead. "…Alright?" "…Alright." The stranger leaves. "…Great chat."
// Known each other: 0:09. SAME CLUB. DIFFERENT UNIVERSES.  Voices: ElevenLabs (stranger: Laura; Nina: Sarah; Rico: Liam; him: Alex).
export const meta = {
  id: "sk57-club-bathroom",
  images: { ladies: "bg/ladies.jpg", mens: "bg/mens.jpg", glam: "cutouts/glam_point.webp", aww: "cutouts/nina_aww.webp", nod: "cutouts/rico_nod.webp", him: "cutouts/guy_stare.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", PINK = "#ff5fa2";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const S1 = .6, N1 = 4.3, S2 = 7.2, N2 = 9.3, S3 = 10.4, N3 = 12.6, S4 = 14.7, N4 = 16.3, MEN = 17.6, R1 = 19.4, A1 = 20.4, LEAVE = 21.4, R2 = 22.2, STAMP = 23.3, DUR = 26.0;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);

  const bubble = (Pn, html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false } = o;
    const b = E.el(Pn, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.35);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const chip = (Pn, html, t0, t1, css) => {
    const c = E.el(Pn, "abs", `padding:10px 20px;border-radius:16px;font-weight:900;font-size:36px;z-index:8;opacity:0;white-space:nowrap;${css}`, html);
    E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .3, 1, "back"]]); E.S(t0, "pop", .35);
    return c;
  };
  const timer = (Pn, t0, t1, secs) => {
    const c = E.el(Pn, "abs", `left:40px;top:440px;padding:10px 22px;border-radius:16px;background:rgba(10,8,12,.8);color:#fff;font-weight:900;font-size:38px;z-index:8;font-variant-numeric:tabular-nums;opacity:0`);
    E.K(c, "o", [[t0, 0], [t0 + .15, 1]]);
    E.F(t => { const s = Math.round(secs * seg(t, t0, t1 - t0)); c.innerHTML = `⏱ known each other: <span style="color:${GOLD}">${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}</span>`; });
  };

  // ================= scene 1: the ladies' room =================
  const A = E.scene("ladies", 0, MEN, "dark"); E.cur = A; const P = A.el;
  const bg = E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "ladies", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 50%");
  E.F(t => { bgI.style.transform = `scale(${1.04 + t * .003})`; });
  E.clip(0, "sfx/club-bass.wav", { vol: .22, to: MEN, duck: true });
  chip(P, "🚺 LADIES’ ROOM", .2, MEN, `left:40px;top:360px;background:${PINK};color:#fff`);
  timer(P, .4, N4 + .6, 252);
  // the stranger (left) and Nina (right); they drift together for the hug
  const GH = 1060, GW = GH * 594 / 999, NH = 1080, NW = NH * 327 / 989;
  const glam = E.el(P, "abs", `left:${310 - GW / 2}px;top:${1970 - GH}px;width:${GW}px;height:${GH}px;z-index:3`);
  const gIn = E.el(glam, "abs", `left:0;top:0;width:${GW}px;height:${GH}px;transform-origin:50% 100%`);
  E.img(gIn, "glam", `width:${GW}px;height:${GH}px`);
  const nina = E.el(P, "abs", `left:${800 - NW / 2}px;top:${1970 - NH}px;width:${NW}px;height:${NH}px;z-index:3`);
  const nIn = E.el(nina, "abs", `left:0;top:0;width:${NW}px;height:${NH}px;transform-origin:50% 100%`);
  E.img(nIn, "aww", `width:${NW}px;height:${NH}px`);
  E.K(glam, "x", [[N4 - .1, 0], [N4 + .3, 90, "out"]]); E.K(nina, "x", [[N4 - .1, 0], [N4 + .3, -110, "out"]]);
  E.F(t => {
    const hop = (t0) => (t >= t0 && t < t0 + .35) ? -Math.sin((t - t0) / .35 * Math.PI) * 26 : 0;
    gIn.style.transform = `translateY(${Math.sin(t * 2.2) * 5 + hop(S1) + hop(S4)}px) rotate(${Math.sin(t * 1.4) * 1.5 + (t > N4 ? 4 : 0)}deg)`;
    nIn.style.transform = `translateY(${Math.sin(t * 2 + 1) * 5 + hop(N1) + hop(N4)}px) rotate(${Math.sin(t * 1.3 + 2) * 1.5 + (t > N4 ? -4 : 0)}deg)`;
  });
  // the crown for the queen
  const crown = E.el(P, "abs", `left:${800 - 60}px;top:${1970 - NH - 70}px;font-size:110px;z-index:6;opacity:0`, "👑");
  E.K(crown, "o", [[S3 + 1.0, 0], [S3 + 1.1, 1], [MEN, 1]]); E.K(crown, "y", [[S3 + 1.0, -200], [S3 + 1.4, 0, "back"]]); E.K(crown, "x", [[N4 - .1, 0], [N4 + .3, -110, "out"]]); E.S(S3 + 1.0, "sparkle", .6);
  // the friendship speed-run
  chip(P, "💄 swapped lipsticks", N3 + .3, MEN, `left:40px;top:540px;background:#fff;color:${INK}`);
  chip(P, "📱 swapped numbers", N3 + .9, MEN, `left:40px;top:612px;background:#fff;color:${INK}`);
  chip(P, "✈️ planned Ibiza", N4 + .1, MEN, `left:40px;top:684px;background:#fff;color:${INK}`);
  // hearts burst on the hug
  const hearts = E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:7;pointer-events:none");
  const HS = Array.from({ length: 16 }, (_, i) => { const h = E.el(hearts, "abs", `left:${540 + Math.cos(i * 2.3) * 60}px;top:1480px;font-size:${50 + (i % 3) * 20}px;opacity:0`, ["💖", "✨", "💕", "🫶"][i % 4]); return h; });
  E.F(t => HS.forEach((h, i) => { const p = seg(t, N4 + .1, 1.2); h.style.opacity = p > 0 && p < 1 ? 1 - p * .6 : 0; h.style.transform = `translate(${Math.cos(i * 1.7) * 420 * p}px,${-Math.abs(Math.sin(i * 1.3)) * 700 * p}px)`; }));
  E.S(N4 + .1, "sparkle", .8);
  bubble(P, "Oh my god. I LOVE<br>your dress! 😍", { left: 60, top: 720, w: 540, tail: 260, t0: S1, t1: N1 - .1 });
  bubble(P, "Stop it! I love<br>YOUR hair! 🥹", { left: 470, top: 700, w: 520, tail: 330, t0: N1, t1: S2 - .1 });
  bubble(P, "Wait… is he<br>texting you back?", { left: 60, top: 720, w: 500, tail: 260, t0: S2, t1: N2 - .05 });
  bubble(P, "No… he’s not. 😔", { left: 500, top: 740, w: 480, tail: 300, t0: N2, t1: S3 - .05, italic: true });
  bubble(P, "Leave him.<br>You’re a QUEEN. 💅", { left: 60, top: 720, w: 500, tail: 260, t0: S3, t1: N3 - .05 });
  bubble(P, "You’re literally my<br>best friend. 😭", { left: 470, top: 700, w: 530, tail: 330, t0: N3, t1: S4 - .05 });
  bubble(P, "Come to Ibiza<br>with me! ✈️", { left: 60, top: 720, w: 460, tail: 260, t0: S4, t1: N4 - .05 });
  bubble(P, "YES!!! 😭💖", { left: 360, top: 700, w: 380, tail: 190, t0: N4, t1: MEN, size: 60 });
  E.clip(S1 + .05, "voices/sk57/s1.wav", { vol: 1.5 }); E.clip(N1 + .05, "voices/sk57/n1.wav", { vol: 1.5 }); E.clip(S2 + .05, "voices/sk57/s2.wav", { vol: 1.5 }); E.clip(N2 + .05, "voices/sk57/n2.wav", { vol: 1.6 });
  E.clip(S3 + .05, "voices/sk57/s3.wav", { vol: 1.5 }); E.clip(N3 + .05, "voices/sk57/n3.wav", { vol: 1.5 }); E.clip(S4 + .05, "voices/sk57/s4.wav", { vol: 1.5 }); E.clip(N4 + .05, "voices/sk57/n4.wav", { vol: 1.5 });
  E.music({ bpm: 120, root: 62, seed: 57, prog: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], until: MEN });

  // ================= scene 2: the men's room =================
  const B = E.scene("mens", MEN, DUR, "dark"); E.cur = B; const Q = B.el;
  E.wipe(MEN); E.clip(MEN - .3, "sfx/elx-trailer-whoosh.wav", { vol: .45 });
  const bg2 = E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  E.img(bg2, "mens", "position:absolute;left:0;top:0;width:1080px;height:1920px");
  const flick = E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:#000;opacity:0;pointer-events:none;z-index:5");
  E.F(t => { const k = Math.floor(t * 12); flick.style.opacity = (k % 17 === 0 || k % 29 === 0) ? .4 : 0; });
  for (let t = MEN + .4; t < DUR - .5; t += 1.6) E.S(t, "buzz", .12);
  chip(Q, "🚹 MEN’S ROOM", MEN + .2, DUR, `left:40px;top:360px;background:#5a6a78;color:#fff`);
  timer(Q, MEN + .4, R2 + .3, 9);
  const silence = chip(Q, "🔇 …", MEN + .9, R1 - .1, `left:0;top:760px;width:1080px;box-sizing:border-box;text-align:center;background:none;color:#fff;font-size:70px`);
  const RH = 1050, RW = RH * 688 / 989, HH = 1000, HW = HH * 873 / 1030;
  const rico = E.el(Q, "abs", `left:${330 - RW / 2}px;top:${1980 - RH}px;width:${RW}px;height:${RH}px;z-index:3`);
  E.img(rico, "nod", `width:${RW}px;height:${RH}px`);
  const him = E.el(Q, "abs", `left:${800 - HW / 2}px;top:${1980 - HH}px;width:${HW}px;height:${HH}px;z-index:2`);
  E.img(him, "him", `width:${HW}px;height:${HH}px`);
  E.K(him, "x", [[LEAVE, 0], [LEAVE + .5, 700, "in"]]); E.S(LEAVE, "swish", .5); E.clip(LEAVE + .3, "sfx/elx-bar-close.wav", { vol: .4 });
  E.K(rico, "y", [[R1 - .05, 0], [R1 + .1, 10], [R1 + .3, 0]]);
  bubble(Q, "…Alright?", { left: 120, top: 760, w: 360, tail: 200, t0: R1, t1: LEAVE, italic: true });
  bubble(Q, "…Alright.", { left: 600, top: 780, w: 340, tail: 170, t0: A1, t1: LEAVE, italic: true });
  bubble(Q, "…Great chat.", { left: 100, top: 760, w: 420, tail: 220, t0: R2, t1: DUR, italic: true, dark: true });
  E.clip(R1 + .05, "voices/sk57/r1.wav", { vol: 1.6 }); E.clip(A1 + .05, "voices/sk57/a1.wav", { vol: 1.6 }); E.clip(R2 + .05, "voices/sk57/r2.wav", { vol: 1.6 });
  chip(Q, "💬 total words: 2", A1 + .8, DUR, `left:40px;top:540px;background:#fff;color:${INK}`);

  // ================= stamp + title =================
  const stampBox = E.el(Q, "abs", "left:0;top:1560px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "SAME CLUB.<br>DIFFERENT UNIVERSES.", STAMP, { size: 70, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  E.cur = A;
  const titleBox = E.el(P, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "The *club bathroom.*", { size: 66, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
