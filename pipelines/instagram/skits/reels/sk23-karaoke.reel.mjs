// SK.23 "I am NOT doing karaoke." — she refuses, arms crossed. The bar chants. "…okay. One song." Cut to the stage: she
// belts it, spotlights, lyric screen. SONGS: 1 → 14. The crowd thins, the clock hits 02:47, chairs go up on the tables.
// Sal: "We closed an hour ago." She hugs the mic stand: "ONE MORE!" Sal sighs… picks up his mop… and sings the harmony.
// LAST CALL: 3 HOURS AGO.  Voices: ElevenLabs (her: Laura; Sal: Chris). Singing: generated off-key ballad + duet.
export const meta = {
  id: "sk23-karaoke",
  images: { flat: "cutouts/cust_flat.webp", sweet: "cutouts/cust_sweet.webp", sing: "cutouts/kar_sing.webp", cling: "cutouts/kar_cling.webp", crowd: "cutouts/crowd_hands.webp", salt: "cutouts/sal_twitch.webp", mop: "cutouts/sal_mop.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const H1 = .5, CHANT = 2.8, H2 = 4.6, STAGE = 6.3, LATE = 9.6, EMPTY = 11.4, S1 = 11.8, H3 = 13.4, DUET = 15.2, STAMP = 17.6, DUR = 20.4;
  E.music({ bpm: 100, root: 57, seed: 23, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: STAGE });
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };

  // ================= scene 1: her table =================
  const S1s = E.scene("table", 0, STAGE, "dark"); E.cur = S1s; const A = S1s.el;
  E.el(A, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#1c1230,#2c1840 60%,#160d22)");
  const disco = E.el(A, "abs", "left:440px;top:360px;width:200px;height:200px;border-radius:50%;background:repeating-conic-gradient(#ddd 0 10deg,#888 10deg 20deg);box-shadow:0 0 60px rgba(255,255,255,.5)");
  const dots = []; for (let i = 0; i < 26; i++) dots.push(E.el(A, "abs", `left:0;top:0;width:20px;height:20px;border-radius:50%;background:hsl(${i * 40},90%,70%);mix-blend-mode:screen`));
  E.F(t => { disco.style.transform = `rotate(${t * 60}deg)`; dots.forEach((d, i) => { d.style.transform = `translate(${(i * 173 + t * 150) % 1080}px,${500 + (i * 97 + t * 60) % 1100}px)`; }); });
  const CW = 1003 * 640 / 678;
  const crowd = E.el(A, "abs", `left:-120px;top:${1480 - 640}px;width:${CW}px;height:640px;opacity:0`); E.img(crowd, "crowd", `width:${CW}px;height:640px`);
  E.K(crowd, "o", [[CHANT - .1, 0], [CHANT + .1, 1]]); E.F(t => { crowd.style.transform = t > CHANT ? `translateY(${-Math.abs(Math.sin(t * 7)) * 12}px)` : "none"; });
  const HER = { flat: [751, 1160], sweet: [821, 1140] };
  const her = E.el(A, "abs", "left:0;top:0;width:1080px;height:1920px");
  const hEls = Object.entries(HER).map(([n, [w, h]]) => { const H = 900, W = w * H / h; return [n, E.img(her, n, `position:absolute;left:${800 - W / 2}px;top:${1560 - H}px;width:${W}px;height:${H}px`)]; });
  E.F(t => { const f = t >= H2 - .1 ? "sweet" : "flat"; hEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; }); });
  E.el(A, "abs", "left:0;top:1480px;width:1080px;height:440px;background:linear-gradient(180deg,#3b2415,#1e120a)");
  const mic = E.el(A, "abs", "left:0;top:1320px;width:260px;height:70px;opacity:0");
  mic.innerHTML = `<svg viewBox="0 0 260 70" width="260" height="70"><rect x="60" y="26" width="200" height="18" rx="9" fill="#222"/><circle cx="40" cy="35" r="32" fill="#aaa"/><circle cx="40" cy="35" r="26" fill="#777"/></svg>`;
  E.K(mic, "o", [[CHANT + .5, 0], [CHANT + .6, 1]]); E.K(mic, "x", [[CHANT + .5, -260], [H2, 520, "out"]]);
  // chant
  const chant = E.el(A, "abs", `left:60px;top:700px;padding:14px 26px;border-radius:24px;background:${GOLD};font-weight:800;font-size:60px;color:${INK};opacity:0;transform:rotate(-4deg)`, "ONE SONG! ONE SONG!");
  E.K(chant, "o", [[CHANT, 0], [CHANT + .1, 1], [H2 - .1, 1], [H2, 0]]); E.F(t => { chant.style.transform = `rotate(-4deg) scale(${1 + Math.abs(Math.sin(t * 7)) * .06})`; });
  E.clip(CHANT, "sfx/elx-bar-cheer.wav", { vol: .9 });

  // ================= scene 2: the stage =================
  const S2 = E.scene("stage", STAGE, DUR, "dark"); E.cur = S2; const B = S2.el;
  E.wipe(STAGE);
  const room = E.el(B, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#1c1230,#2c1840 60%,#160d22)");
  // house lights come up when the bar closes
  const house = E.el(B, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#8a8578,#6d685c);opacity:0");
  E.F(t => { house.style.opacity = seg(t, EMPTY - .3, .4) * (t < DUET ? 1 : 1 - seg(t, DUET, .5)); });
  // lyric screen
  const scr = E.el(B, "abs", "left:140px;top:380px;width:800px;height:330px;border-radius:16px;background:#070a24;box-shadow:0 0 0 12px #222,0 0 60px rgba(90,120,255,.4);overflow:hidden");
  const lyr = E.el(scr, "abs", "left:0;top:90px;width:800px;text-align:center;font-weight:800;font-size:64px;color:#fff;line-height:1.2");
  const LY = [[STAGE, "♪ OHHH MY HEAAART ♪"], [STAGE + 1.6, "♪ WILL GO ON AND ON ♪"], [LATE, "SONG 14 OF 14"], [EMPTY, "SONG 23 OF 14"], [DUET, "♪ DUET MODE ♪"]];
  E.F(t => { const s = at(LY, t); if (lyr.textContent !== s) lyr.textContent = s; lyr.style.color = t >= DUET ? GOLD : "#fff"; });
  const bar = E.el(scr, "abs", "left:60px;top:250px;width:680px;height:14px;border-radius:7px;background:#333");
  const barF = E.el(bar, "abs", "left:0;top:0;height:14px;border-radius:7px;background:#5af");
  E.F(t => { barF.style.width = `${((t * 90) % 680)}px`; });
  // spotlights
  const spots = [["#ff5ad1", 200], ["#5ad1ff", 880]].map(([c, x]) => E.el(B, "abs", `left:${x - 200}px;top:-40px;width:400px;height:1700px;background:linear-gradient(180deg,${c}aa,transparent);clip-path:polygon(45% 0,55% 0,100% 100%,0 100%);mix-blend-mode:screen;transform-origin:50% 0`));
  E.F(t => spots.forEach((s, i) => { s.style.transform = `rotate(${Math.sin(t * 1.3 + i * 2) * 18}deg)`; s.style.opacity = t < EMPTY ? .7 : t >= DUET ? .8 : 0; }));
  // stage floor, chairs on tables when it closes
  E.el(B, "abs", "left:0;top:1560px;width:1080px;height:360px;background:linear-gradient(180deg,#4a2e1c,#24160c);box-shadow:inset 0 10px 0 #6b4428");
  const chairs = E.el(B, "abs", "left:0;top:1300px;width:1080px;height:300px;opacity:0");
  chairs.innerHTML = `<svg viewBox="0 0 1080 300" width="1080" height="300">${[60, 820].map(x => `<rect x="${x}" y="200" width="200" height="16" fill="#5a3a24"/><rect x="${x + 90}" y="216" width="20" height="84" fill="#5a3a24"/><path d="M${x + 30} 200 v-120 h60 v120 M${x + 110} 200 v-120 h60 v120" stroke="#3a2416" stroke-width="10" fill="none"/>`).join("")}</svg>`;
  E.K(chairs, "o", [[EMPTY - .2, 0], [EMPTY, 1]]);
  const crowd2 = E.el(B, "abs", `left:-120px;top:${1640 - 520}px;width:${1003 * 520 / 678}px;height:520px`); E.img(crowd2, "crowd", `width:${1003 * 520 / 678}px;height:520px`);
  E.F(t => { crowd2.style.opacity = t < LATE ? 1 : 1 - seg(t, LATE, 1.4); crowd2.style.transform = `translateY(${-Math.abs(Math.sin(t * 6)) * 10}px)`; });
  // her on stage
  const SING = { sing: [878, 1098, 1000], cling: [728, 1144, 1000] };
  const sg = E.el(B, "abs", "left:0;top:0;width:1080px;height:1920px");
  const sgIn = E.el(sg, "abs", "left:0;top:0;width:1080px;height:1920px");
  const sEls = Object.entries(SING).map(([n, [w, h, H]]) => { const W = w * H / h; return [n, E.img(sgIn, n, `position:absolute;left:${640 - W / 2}px;top:${1700 - H}px;width:${W}px;height:${H}px`)]; });
  E.F(t => { const f = t >= H3 - .1 && t < DUET ? "cling" : "sing"; sEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; }); sgIn.style.transform = f === "sing" ? `rotate(${Math.sin(t * 5) * 3}deg)` : "none"; sgIn.style.transformOrigin = "640px 1700px"; });
  E.K(sg, "x", [[EMPTY, 0], [EMPTY + .4, 160, "out"]]);
  // Sal
  const SAL = { salt: [865, 1133], mop: [869, 1135] };
  const sal = E.el(B, "abs", "left:0;top:0;width:1080px;height:1920px;opacity:0");
  const salE = Object.entries(SAL).map(([n, [w, h]]) => { const H = 900, W = w * H / h; return [n, E.img(sal, n, `position:absolute;left:${200 - W / 2}px;top:${1700 - H}px;width:${W}px;height:${H}px`)]; });
  E.K(sal, "o", [[EMPTY + .1, 0], [EMPTY + .3, 1]]); E.K(sal, "x", [[EMPTY + .1, -300], [EMPTY + .5, 0, "out"]]);
  E.F(t => { const f = t >= DUET - .1 ? "mop" : "salt"; salE.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; }); });
  // hearts/notes during duet
  for (let i = 0; i < 10; i++) { const n = E.el(B, "abs", `left:${300 + (i % 5) * 110}px;top:900px;font-size:70px;color:${[GOLD, "#ff8fb1", "#5ad1ff"][i % 3]};opacity:0`, i % 2 ? "♪" : "♫"); const t0 = DUET + .3 + i * .25; E.K(n, "o", [[t0, 0], [t0 + .1, 1], [t0 + 1.4, 0]]); E.K(n, "y", [[t0, 0], [t0 + 1.5, -300, "out"]]); }

  // counters
  const pill = E.el(B, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:54px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;transform-origin:0 50%;font-variant-numeric:tabular-nums`, "");
  E.F(t => { const n = t < LATE ? 1 + Math.floor(seg(t, STAGE + 1.5, LATE - STAGE - 1.5) * 6) : t < EMPTY ? 7 + Math.floor(seg(t, LATE, EMPTY - LATE) * 7) : 23; const clk = t < LATE ? "23:10" : t < EMPTY ? "01:38" : "02:47"; const s = `SONGS: ${n} · ${clk}`; if (pill.textContent !== s) pill.textContent = s; pill.style.background = n > 10 ? CORAL : INK; pill.style.color = n > 10 ? INK : "#fff"; });
  const later = E.el(B, "abs", `left:0;top:1640px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 26px 12px;border-radius:14px;background:rgba(20,35,29,.85);color:#fff;font-weight:700;font-style:italic;font-size:40px">…3 hours later…</span>`);
  E.K(later, "o", [[LATE, 0], [LATE + .2, 1], [EMPTY - .2, 1], [EMPTY, 0]]);

  // bubbles
  const bubble = (layer, html, o) => {
    const { left, top, w, tail, t0, t1, size = 58, bg = "#fff", fg = INK } = o;
    const b = E.el(layer, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.06;letter-spacing:-.02em;color:${fg};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  bubble(A, "I am NOT doing<br>karaoke.", { left: 400, top: 520, w: 560, tail: 380, t0: H1, t1: CHANT + .4 });
  bubble(A, "…okay.<br>One song.", { left: 460, top: 520, w: 420, tail: 320, t0: H2, t1: STAGE });
  bubble(B, "We closed<br>an hour ago.", { left: 60, top: 740, w: 440, tail: 170, t0: S1, t1: H3 - .1 });
  bubble(B, "ONE MORE!", { left: 480, top: 700, w: 420, tail: 170, t0: H3, t1: DUET - .1, size: 72, bg: CORAL });
  E.clip(H1 + .05, "voices/sk23/h1.wav", { vol: 1.4 }); E.clip(H2 + .05, "voices/sk23/h2.wav", { vol: 1.4 });
  E.clip(S1 + .05, "voices/sk23/s1.wav", { vol: 1.5 }); E.clip(H3 + .05, "voices/sk23/h3.wav", { vol: 1.5 });
  E.clip(STAGE + .1, "sfx/elx-karaoke-singing.wav", { vol: 1.8, duck: false }); E.clip(STAGE + 4.1, "sfx/elx-karaoke-singing.wav", { vol: 1.3, to: LATE - STAGE - 4, duck: false });
  E.clip(LATE, "sfx/elx-karaoke-singing.wav", { vol: .35, to: EMPTY - LATE, duck: false });
  E.clip(DUET, "sfx/elx-karaoke-duet.wav", { vol: 1.7, duck: false }); E.clip(DUET + 4, "sfx/elx-karaoke-duet.wav", { vol: 1.4, to: DUR - DUET - 4, duck: false });
  E.S(EMPTY, "thud", .5);
  const stampBox = E.el(B, "abs", "left:100px;top:360px;width:880px;display:flex;justify-content:center;z-index:10");
  const st = E.stamp(stampBox, "LAST CALL: 3 HOURS AGO.", STAMP, { size: 60, rot: -5, bg: CORAL, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  E.cur = S1s;
  const titleBox = E.el(A, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "\"I'm NOT doing *karaoke.*\"", { size: 60, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
