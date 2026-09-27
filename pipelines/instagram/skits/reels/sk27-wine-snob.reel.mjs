// SK.27 "Every dinner party has one." — the wine snob swirls, sniffs, and narrates: blackcurrant, wet oak, a Parisian summer,
// 1987, "a hint of my grandfather's regret." His friends die inside; a TASTING NOTES card fills up. The host walks past:
// "It's grape juice. From the kids' party." Every note gets struck through. He freezes… then sips again: "…exquisite juice."
// Voices: ElevenLabs (snob: George; host: Matilda).
export const meta = {
  id: "sk27-wine-snob",
  images: { swirl: "cutouts/snob_swirl.webp", frozen: "cutouts/snob_frozen.webp", host: "cutouts/mum_happy.webp", pals: "cutouts/pals_bored.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", WINE = "#6d1030", GRAPE = "#7b3fa0";
  E.episode(-16);
  const W1 = .5, N1 = 1.2, N2 = 2.6, W2 = 4.6, N3 = 5.6, W3 = 9.0, N4 = 9.8, HOST = 11.8, H1 = 12.4, FROZEN = 15.0, W4 = 17.0, STAMP = 18.6, DUR = 21.2;
  E.music({ bpm: 92, root: 57, seed: 27, prog: [[0, 3, 7], [5, 8, 12], [7, 10, 14], [0, 3, 7]], until: H1 + 2.2 });
  const S = E.scene("dinner", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1500;

  // ================= a candle-lit dining room =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse at 60% 45%,#3a2a3a,#1d1420 60%,#120c14)");
  // wainscot + picture frames
  E.el(R, "abs", `left:0;top:1150px;width:1080px;height:${TOP - 1150}px;background:#24182a;box-shadow:inset 0 6px 0 #3a2840`);
  [[60, 380, 200, 250], [820, 360, 220, 170]].forEach(([x, y, w, h], i) => {
    const f = E.el(R, "abs", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border:12px solid #b08a3a;border-radius:4px;background:${i ? "linear-gradient(160deg,#5a6a8a,#2a3450)" : "linear-gradient(170deg,#6a4a3a,#2a1a18)"};box-shadow:0 10px 30px rgba(0,0,0,.5)`);
    f.innerHTML = i ? `<svg viewBox="0 0 220 170" width="196" height="146"><path d="M0 120 L60 70 L100 100 L150 50 L220 110 V170 H0 Z" fill="#1e2438"/><circle cx="170" cy="40" r="14" fill="#e8e2c0"/></svg>`
      : `<svg viewBox="0 0 200 250" width="176" height="226"><ellipse cx="100" cy="100" rx="44" ry="54" fill="#c49a78"/><path d="M40 250 Q100 150 160 250 Z" fill="#2a2030"/><path d="M60 80 Q100 20 140 80" fill="#3a2418"/></svg>`;
  });
  // the table: tablecloth, candles, decanter, cheese board
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;background:linear-gradient(180deg,#f3ede2,#d9d0c0);box-shadow:0 -6px 20px rgba(0,0,0,.4)`);
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:14px;background:#fffaf0`);
  const flames = [];
  [[140, 170], [230, 130]].forEach(([x, h]) => {
    E.el(R, "abs", `left:${x}px;top:${TOP + 40 - h}px;width:26px;height:${h}px;background:linear-gradient(90deg,#f4efe4,#d8d0c0);border-radius:4px;z-index:5`);
    E.el(R, "abs", `left:${x - 16}px;top:${TOP + 30}px;width:58px;height:18px;border-radius:50%;background:#b08a3a;z-index:5`);
    const fl = E.el(R, "abs", `left:${x + 3}px;top:${TOP + 4 - h}px;width:20px;height:36px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(ellipse at 50% 70%,#fff6c8,#ffb640 60%,rgba(255,120,40,0));box-shadow:0 0 40px 14px rgba(255,190,80,.35);z-index:5;transform-origin:50% 100%`);
    flames.push(fl);
  });
  const dec = E.el(R, "abs", `left:840px;top:${TOP - 200}px;width:180px;height:260px;z-index:5`);
  dec.innerHTML = `<svg viewBox="0 0 180 260" width="180" height="260"><path d="M70 0 H110 V90 Q180 150 170 210 Q160 250 90 250 Q20 250 10 210 Q0 150 70 90 Z" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.5)" stroke-width="3"/>` +
    `<path d="M16 180 Q20 150 60 140 H120 Q160 150 164 180 Q170 244 90 244 Q10 244 16 180 Z" fill="${GRAPE}"/><path d="M40 170 Q60 150 80 160" stroke="rgba(255,255,255,.5)" stroke-width="5" fill="none"/></svg>`;
  const board = E.el(R, "abs", `left:420px;top:${TOP + 150}px;width:360px;height:120px;z-index:5`);
  board.innerHTML = `<svg viewBox="0 0 360 120" width="360" height="120"><rect x="0" y="30" width="360" height="70" rx="20" fill="#9a6a3a"/><path d="M40 70 L110 30 L130 70 Z" fill="#f2c94c"/><path d="M160 70 L230 40 L240 70 Z" fill="#f7e3a0"/><circle cx="290" cy="56" r="20" fill="#7b3fa0"/><circle cx="315" cy="66" r="18" fill="#8e50b4"/><circle cx="300" cy="80" r="16" fill="#6b2f90"/></svg>`;
  E.F(t => flames.forEach((f, i) => { f.style.transform = `scale(${1 + Math.sin(t * 13 + i * 2) * .06},${1 + Math.sin(t * 9 + i) * .1}) rotate(${Math.sin(t * 7 + i) * 4}deg)`; }));

  // ================= the bored friends (back, left) =================
  const pals = E.el(R, "abs", `left:-10px;top:${TOP - 290}px;width:470px;height:319px;z-index:3`);
  const palsIn = E.el(pals, "abs", "left:0;top:0;width:470px;height:319px");
  E.img(palsIn, "pals", "width:470px;height:319px");
  E.F(t => {
    let y = Math.sin(t * 1.3) * 3 + 30 * seg(t, W3, .6) - 30 * seg(t, H1 + .6, .4);     // they sink lower at "grandfather's regret"; perk up at "grape juice"
    palsIn.style.transform = `translateY(${y}px)`;
  });

  // ================= the snob =================
  const SH = 980, SW = SH * 872 / 1058, SL = 272, ST = 660;
  const snob = E.el(R, "abs", `left:${SL}px;top:${ST}px;width:${SW}px;height:${SH}px;z-index:4`);
  const snobIn = E.el(snob, "abs", `left:0;top:0;width:${SW}px;height:${SH}px;transform-origin:50% 30%`);
  const sEls = { swirl: E.img(snobIn, "swirl", `position:absolute;left:0;top:0;width:${SW}px;height:${SH}px`), frozen: E.img(snobIn, "frozen", `position:absolute;left:0;top:0;width:${SW}px;height:${SH * 1060 / 1058}px`) };
  const SP = [[0, "swirl"], [H1 + .9, "frozen"], [W4 - .15, "swirl"]];
  E.F(t => {
    const f = at(SP, t); sEls.swirl.style.opacity = f === "swirl" ? 1 : 0; sEls.frozen.style.opacity = f === "frozen" ? 1 : 0;
    let r = Math.sin(t * 1.6) * 1.2, y = Math.sin(t * 2) * 3, s = 1;
    if (f === "swirl" && t < H1) r += Math.sin(t * 5) * 1.5;                                      // the swirl sway
    if (t >= H1 + .9 && t < W4 - .15) { r = 0; y = 0; s = 1 + .06 * seg(t, FROZEN, 1.2); }          // dead still, slow push-in
    for (const k of [H1 + .9, W4 - .15]) if (t >= k && t < k + .2) y -= Math.sin((t - k) / .2 * Math.PI) * 14;
    snobIn.style.transform = `translateY(${y}px) rotate(${r}deg) scale(${s})`;
  });
  [W1 - .3, W2 - .3, W4 - .5].forEach(t => E.clip(t, "sfx/elx-swirl.wav", { vol: .8 }));
  E.clip(N1 - .3, "sfx/elx-sniff.wav", { vol: .7 }); E.clip(W4 + 1.1, "sfx/elx-sip.wav", { vol: .9, to: 1 });

  // ================= TASTING NOTES card =================
  const card = E.el(R, "abs", `left:40px;top:370px;width:470px;padding:22px 26px 24px;border-radius:22px;background:rgba(255,250,240,.96);box-shadow:0 18px 40px rgba(0,0,0,.5);z-index:8;opacity:0`);
  E.el(card, "", `font-weight:800;font-size:30px;letter-spacing:.16em;color:${WINE};margin-bottom:8px`, "🍷 TASTING NOTES");
  const NOTES = [["Blackcurrant", N1], ["Wet oak", N2], ["Paris, summer ’87", N3], ["Grandfather’s regret", N4]];
  const noteEls = NOTES.map(([txt, t0], i) => {
    const row = E.el(card, "", `position:relative;font-weight:700;font-size:42px;line-height:1.3;color:${INK};white-space:nowrap;opacity:0`, `· ${txt}`);
    E.K(row, "o", [[t0, 0], [t0 + .15, 1]]); E.K(row, "x", [[t0, -40], [t0 + .3, 0, "out"]]); E.S(t0, "tick", .6);
    const strike = E.el(row, "abs", `left:0;top:52%;height:6px;width:0;background:${CORAL};border-radius:3px`);
    E.K(strike, "w", [[FROZEN + .2 + i * .22, 0], [FROZEN + .4 + i * .22, 20 + txt.length * 22, "out"]]); E.S(FROZEN + .2 + i * .22, "swish", .5);
    return row;
  });
  const juiceRow = E.el(card, "", `font-weight:800;font-size:44px;line-height:1.3;color:${GRAPE};white-space:nowrap;opacity:0`, "· Juice box (ages 3+)");
  E.K(juiceRow, "o", [[FROZEN + 1.3, 0], [FROZEN + 1.45, 1]]); E.K(juiceRow, "s", [[FROZEN + 1.3, 1.4], [FROZEN + 1.6, 1, "back"]]); juiceRow.style.transformOrigin = "0 50%"; E.S(FROZEN + 1.3, "pop", .7);
  E.K(card, "o", [[N1 - .1, 0], [N1 + .1, 1], [HOST, 1], [HOST + .2, .15], [FROZEN - .1, .15], [FROZEN + .1, 1]]);
  E.K(card, "r", [[N1 - .1, -6], [N1 + .3, -2, "back"]]);

  // ================= the host, and the juice box =================
  const HH = 940, HW = HH * 796 / 1158;
  const host = E.el(R, "abs", `left:-60px;top:${1640 - HH}px;width:${HW}px;height:${HH}px;z-index:6`);
  const hostIn = E.el(host, "abs", `left:0;top:0;width:${HW}px;height:${HH}px`);
  E.img(hostIn, "host", `width:${HW}px;height:${HH}px`);
  E.K(host, "x", [[HOST, -700], [HOST + .5, 0, "out"], [FROZEN + 1.0, 0], [FROZEN + 1.6, -760, "in"]]);
  E.F(t => { hostIn.style.transform = `translateY(${Math.abs(Math.sin(t * 7)) * -8 * (t > HOST && t < HOST + .6 ? 1 : 0) + Math.sin(t * 2.2) * 3}px)`; });
  // the empty juice box, held up in her other hand
  const jb = E.el(R, "abs", `left:420px;top:1030px;width:150px;height:230px;z-index:7;opacity:0`);
  jb.innerHTML = `<svg viewBox="0 0 150 230" width="150" height="230"><path d="M92 30 V4 Q92 -2 100 -8 L120 -30" stroke="#ff9ec0" stroke-width="8" fill="none" stroke-linecap="round"/>` +
    `<rect x="10" y="30" width="130" height="200" rx="10" fill="${GRAPE}"/><rect x="10" y="30" width="130" height="30" rx="8" fill="#9b5fc4"/>` +
    `<circle cx="52" cy="120" r="16" fill="#5a2a80"/><circle cx="80" cy="112" r="16" fill="#6b35a0"/><circle cx="68" cy="140" r="16" fill="#4e2270"/><circle cx="96" cy="136" r="16" fill="#5a2a80"/><path d="M74 94 Q84 80 98 84" stroke="#6ab04c" stroke-width="7" fill="none"/>` +
    `<text x="75" y="190" text-anchor="middle" font-family="Noto Sans" font-weight="900" font-size="26" fill="#fff">GRAPEY</text><text x="75" y="216" text-anchor="middle" font-family="Noto Sans" font-weight="700" font-size="16" fill="#ffd8f0">AGES 3+</text></svg>`;
  E.K(jb, "o", [[H1 + .2, 0], [H1 + .35, 1], [FROZEN + 1.0, 1], [FROZEN + 1.2, 0]]); E.K(jb, "y", [[H1 + .2, 80], [H1 + .5, 0, "back"]]); E.K(jb, "r", [[H1 + .2, -20], [H1 + .5, 8, "out"]]);
  E.clip(H1 + .1, "sfx/elx-kids-party.wav", { vol: .55, duck: true });
  E.clip(FROZEN - .1, "sfx/record-silence.wav", { vol: .8 });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, bg = "#fff", fg = INK, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : fg};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Mmm. Notes of blackcurrant…<br>wet oak…", { left: 540, top: 400, w: 500, tail: 90, t0: W1, t1: W2 - .1, italic: true });
  bubble("A Parisian summer.<br>1987, I’d say.", { left: 540, top: 400, w: 500, tail: 90, t0: W2, t1: W3 - .1, italic: true });
  bubble("…and a hint of my<br>grandfather’s regret.", { left: 540, top: 400, w: 500, tail: 90, t0: W3, t1: HOST + .3, italic: true });
  bubble("It’s grape juice.<br>From the kids’ party.", { left: 150, top: 400, w: 560, tail: 170, t0: H1, t1: FROZEN + 1.0, dark: true, size: 54 });
  bubble("…exquisite juice.", { left: 560, top: 470, w: 470, tail: 90, t0: W4, t1: DUR, italic: true, size: 54 });
  E.clip(W1 + .05, "voices/sk27/w1.wav", { vol: 1.5 }); E.clip(W2 + .05, "voices/sk27/w2.wav", { vol: 1.5 }); E.clip(W3 + .05, "voices/sk27/w3.wav", { vol: 1.5 });
  E.clip(H1 + .05, "voices/sk27/h1.wav", { vol: 1.5 }); E.clip(W4 + .05, "voices/sk27/w4.wav", { vol: 1.5 });
  for (let t = 0; t < H1; t += 6) E.clip(t, "sfx/elx-dinner-party.wav", { vol: .3, to: Math.min(6, H1 - t), duck: false });

  // ================= stamp =================
  const stampBox = E.el(R, "abs", "left:0;top:1320px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "SOMMELIER (AGES 3+)", STAMP, { size: 76, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Every dinner party *has one.*", { size: 58, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, W2 - .2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
