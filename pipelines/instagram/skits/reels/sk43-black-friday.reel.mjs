// SK.43 "Black Friday." — Rico, trolley overflowing: "Black Friday, baby! Seventy percent off!" At home the boxes keep
// arriving: a flamingo shaker, six bottles of blue curaçao, his third ice-ball maker, a cocktail karaoke machine, a pineapple
// ice bucket, a swan float (Gerald's cousin). SAVED €214 · SPENT €640. Nina, holding water: "…We don't even like blue
// curaçao." — "It was SEVENTY percent off!" Eleven months of dust: UNOPENED 6/6. Next Black Friday: "Ooh! Sixty percent off!"
// Voices: Higgsfield TTS (Rico: Miles; Nina: Isla).
export const meta = {
  id: "sk43-black-friday",
  images: { cart: "cutouts/rico_cart.webp", present: "cutouts/friend_present.webp", flip: "cutouts/friend_flip.webp", point: "cutouts/friend_point.webp", nina: "cutouts/nina_water.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", RED = "#e5202e", GRN = "#1f9a5a";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const R1 = .4, HOME = 3.9, BOX0 = 4.5, N1 = 9.5, R2 = 12.0, LAPSE = 14.2, NEXT = 17.2, R3 = 17.5, STAMP = 19.0, DUR = 21.8;
  E.music({ bpm: 124, root: 57, seed: 43, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: N1 });
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const FL = 1820;

  // ================= scene 1: the store =================
  const A = E.scene("store", 0, HOME, "dark"); E.cur = A; const P = A.el;
  E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#0e0e12,#1e1e26)");
  const sale = E.el(P, "abs", "left:0;top:420px;width:1080px;height:300px;overflow:hidden");
  sale.innerHTML = `<div style="white-space:nowrap;font-weight:900;font-size:130px;color:${RED};letter-spacing:.04em;line-height:150px">BLACK FRIDAY · −70% · BLACK FRIDAY · −70% ·</div><div style="white-space:nowrap;font-weight:900;font-size:130px;color:#fff;letter-spacing:.04em;line-height:150px">SALE · SALE · EVERYTHING MUST GO · SALE ·</div>`;
  const rows = [...sale.children];
  E.F(t => { rows[0].style.transform = `translateX(${-(t * 220) % 900}px)`; rows[1].style.transform = `translateX(${-900 + (t * 220) % 900}px)`; });
  const shelves = E.el(P, "abs", "left:0;top:760px;width:1080px;height:700px;opacity:.5");
  let s = ""; for (let r = 0; r < 3; r++) { s += `<rect x="0" y="${r * 230 + 200}" width="1080" height="14" fill="#555"/>`; for (let i = 0; i < 9; i++) s += `<rect x="${20 + i * 118}" y="${r * 230 + 90}" width="90" height="110" rx="8" fill="${["#e53935", "#1e88e5", "#fdd835", "#43a047"][(i + r) % 4]}" opacity=".6"/><rect x="${40 + i * 118}" y="${r * 230 + 60}" width="54" height="36" rx="6" fill="${RED}"/><text x="${67 + i * 118}" y="${r * 230 + 86}" text-anchor="middle" font-family="Noto Sans" font-weight="900" font-size="20" fill="#fff">-${[70, 50, 60, 80][(i + r) % 4]}%</text>`; }
  shelves.innerHTML = `<svg viewBox="0 0 1080 700" width="1080" height="700">${s}</svg>`;
  E.el(P, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background:#2a2a32`);
  const CH = 1060, CW = CH * 646 / 1003;
  const cart = E.el(P, "abs", `left:${520 - CW / 2}px;top:${FL + 30 - CH}px;width:${CW}px;height:${CH}px;z-index:3`);
  const cIn = E.el(cart, "abs", `left:0;top:0;width:${CW}px;height:${CH}px`);
  E.img(cIn, "cart", `width:${CW}px;height:${CH}px`);
  E.K(cart, "x", [[0, 600], [.6, 0, "out"]]);
  E.F(t => { cIn.style.transform = `translateY(${Math.abs(Math.sin(t * 8)) * -6}px)`; });
  E.clip(0, "sfx/elx-trolley.wav", { vol: .6, to: 1.4 }); E.clip(.5, "sfx/elx-register.wav", { vol: .5 });

  // ================= scene 2: home, the boxes arrive =================
  const B = E.scene("home", HOME, DUR, "light"); E.cur = B; const Q = B.el;
  E.wipe(HOME);
  E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#eef0ea,#dfe3d8)");
  E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.35) 0 50px,transparent 50px 100px)");
  E.el(Q, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background:#b8905e`);
  // the calendar on the wall
  const cal = E.el(Q, "abs", `left:780px;top:400px;width:230px;height:250px;border-radius:12px;background:#fff;box-shadow:0 10px 24px rgba(0,0,0,.18);z-index:1;overflow:hidden`);
  const calM = E.el(cal, "", `height:70px;background:${RED};color:#fff;font-weight:900;font-size:40px;text-align:center;line-height:70px;letter-spacing:.1em`);
  const calD = E.el(cal, "", `font-weight:900;font-size:120px;color:${INK};text-align:center;line-height:170px`);
  const MONTHS = ["NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV"];
  E.F(t => { const k = Math.floor(12 * seg(t, LAPSE, NEXT - LAPSE - .2)); const m = MONTHS[k]; if (calM.textContent !== m) { calM.textContent = m; calD.textContent = k === 0 || k === 12 ? "27" : String(1 + (k * 7) % 28); } });
  // the boxes, stacking up (right of centre)
  const ITEMS = [["🦩", "Flamingo shaker", 60], ["💙", "Blue curaçao ×6", 70], ["🧊", "Ice-ball maker (3rd)", 50], ["🎤", "Cocktail karaoke", 65], ["🍍", "Pineapple ice bucket", 40], ["🦢", "Swan float (Gerald’s cousin)", 80]];
  const boxes = ITEMS.map(([ic, name, pct], i) => {
    const t0 = BOX0 + i * .75, w = 300 + (i % 2) * 40, h = 150;
    const col = i % 3, row = Math.floor(i / 3);
    const b = E.el(Q, "abs", `left:${380 + (i % 2) * 20 + row * 10}px;top:${FL - 150 - i * 150}px;width:${w}px;height:${h}px;z-index:${3 + i};opacity:0`);
    b.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><rect x="0" y="0" width="${w}" height="${h}" rx="6" fill="#c89b62"/><rect x="${w / 2 - 20}" y="0" width="40" height="${h}" fill="rgba(255,255,255,.35)"/><rect x="0" y="0" width="${w}" height="10" fill="#b88a52"/></svg>` +
      `<div style="position:absolute;left:14px;top:22px;font-size:54px">${ic}</div><div style="position:absolute;left:84px;top:30px;width:${w - 96}px;font-weight:800;font-size:26px;color:${INK};line-height:1.1">${name}</div>` +
      `<div style="position:absolute;right:12px;bottom:12px;padding:4px 10px;border-radius:8px;background:${RED};color:#fff;font-weight:900;font-size:26px">−${pct}%</div>`;
    E.K(b, "o", [[t0, 0], [t0 + .05, 1]]); E.K(b, "y", [[t0, -900], [t0 + .35, 0, "in"], [t0 + .45, -14, "out"], [t0 + .55, 0, "in"]]); E.K(b, "r", [[t0, (i % 2 ? 8 : -8)], [t0 + .45, (i % 2 ? 1.5 : -1.5)]]);
    E.S(t0 + .35, "thud", .7); E.S(t0 - .15, "ding", .35);
    return b;
  });
  // dust + cobwebs over the unopened boxes during the time-lapse
  const dust = E.el(Q, "abs", `left:360px;top:${FL - 1060}px;width:420px;height:1060px;z-index:10;opacity:0;background:repeating-radial-gradient(circle at 30% 30%,rgba(140,130,110,.35) 0 2px,transparent 2px 14px);mix-blend-mode:multiply`);
  E.K(dust, "o", [[LAPSE, 0], [NEXT - .3, 1]]);
  const cob = E.el(Q, "abs", `left:360px;top:${FL - 1060}px;width:200px;height:200px;z-index:11;opacity:0`);
  cob.innerHTML = `<svg viewBox="0 0 200 200" width="200" height="200" fill="none" stroke="rgba(120,120,120,.8)" stroke-width="2">${Array.from({ length: 6 }, (_, i) => `<line x1="0" y1="0" x2="${200 * Math.cos(i * Math.PI / 10)}" y2="${200 * Math.sin(i * Math.PI / 10)}"/>`).join("")}${[40, 80, 120, 160].map(r => `<path d="M${r} 0 A${r} ${r} 0 0 1 0 ${r}"/>`).join("")}</svg>`;
  E.K(cob, "o", [[LAPSE + 1, 0], [NEXT - .3, 1]]);
  const unop = E.el(Q, "abs", `left:0;top:560px;width:1080px;text-align:center;z-index:12;opacity:0`, `<span style="display:inline-block;padding:12px 28px;border-radius:18px;background:${INK};color:#fff;font-weight:900;font-size:46px">⏩ 11 months later · UNOPENED: 6/6</span>`);
  E.K(unop, "o", [[LAPSE + .2, 0], [LAPSE + .4, 1], [NEXT - .2, 1], [NEXT, 0]]);
  // saved vs spent
  const tally = E.el(Q, "abs", "left:40px;top:400px;display:flex;flex-direction:column;gap:10px;z-index:12;opacity:0");
  const tS = E.el(tally, "", `padding:10px 22px;border-radius:16px;background:${GRN};color:#fff;font-weight:900;font-size:44px;font-variant-numeric:tabular-nums`);
  const tP = E.el(tally, "", `padding:10px 22px;border-radius:16px;background:${RED};color:#fff;font-weight:900;font-size:44px;font-variant-numeric:tabular-nums`);
  E.K(tally, "o", [[BOX0, 0], [BOX0 + .2, 1], [LAPSE, 1], [LAPSE + .2, 0]]);
  E.F(t => { const n = ITEMS.filter((_, i) => t >= BOX0 + i * .75 + .35).length; tS.textContent = `SAVED €${Math.round(214 * n / 6)}`; tP.textContent = `SPENT €${Math.round(640 * n / 6)}`; });
  // Rico (left) and Nina (right)
  const RH = 880, RW = RH * 861 / 1124;
  const rico = E.el(Q, "abs", `left:-60px;top:${FL + 40 - RH}px;width:${RW}px;height:${RH}px;z-index:13`);
  const rIn = E.el(rico, "abs", `left:0;top:0;width:${RW}px;height:${RH}px;transform-origin:50% 100%`);
  const rEls = { present: E.img(rIn, "present", `position:absolute;left:0;top:0;width:${RW}px;height:${RH}px`), flip: E.img(rIn, "flip", `position:absolute;left:0;top:0;width:${RH * 809 / 1053}px;height:${RH}px`), point: E.img(rIn, "point", `position:absolute;left:0;top:0;width:${RW}px;height:${RH}px`) };
  const RP = [[0, "present"], [R2 - .1, "flip"], [R3 - .1, "point"]];
  E.K(rico, "o", [[LAPSE, 1], [LAPSE + .2, 0], [NEXT - .1, 0], [NEXT + .1, 1]]); E.K(rico, "x", [[HOME, 0], [LAPSE, 0], [NEXT - .1, -400], [NEXT + .3, 0, "out"]]);
  E.F(t => { const f = at(RP, t); for (const n in rEls) rEls[n].style.opacity = n === f ? 1 : 0; let y = Math.sin(t * 2.4) * 4; for (const [k] of RP.slice(1)) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 20; rIn.style.transform = `translateY(${y}px)`; });
  const NH = 820, NW = NH * 768 / 1137;
  const nina = E.el(Q, "abs", `left:${1080 - NW + 60}px;top:${FL + 40 - NH}px;width:${NW}px;height:${NH}px;z-index:13`);
  E.img(nina, "nina", `width:${NW}px;height:${NH}px`);
  E.K(nina, "o", [[N1 - .5, 0], [N1 - .3, 1], [LAPSE, 1], [LAPSE + .2, 0]]); E.K(nina, "x", [[N1 - .5, 300], [N1 - .1, 0, "out"]]);

  // ================= bubbles & voices =================
  const bubble = (Pn, html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 52, italic = false, dark = false } = o;
    const b = E.el(Pn, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:14;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.3);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble(P, "Black Friday, baby!<br>SEVENTY percent off!", { left: 240, top: 760, w: 600, tail: 200, t0: R1, t1: HOME, size: 56 });
  bubble(Q, "…We don’t even like<br>blue curaçao.", { left: 400, top: 820, w: 560, tail: 440, t0: N1, t1: R2 - .05, dark: true, italic: true });
  bubble(Q, "It was SEVENTY<br>percent off!", { left: 60, top: 820, w: 520, tail: 200, t0: R2, t1: LAPSE, size: 56 });
  bubble(Q, "Ooh! Sixty<br>percent off!", { left: 60, top: 820, w: 480, tail: 200, t0: R3, t1: DUR, size: 56 });
  E.clip(R1 + .05, "voices/sk43/r1.wav", { vol: 1.5 }); E.clip(N1 + .05, "voices/sk43/n1.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk43/r2.wav", { vol: 1.5 }); E.clip(R3 + .05, "voices/sk43/r3.wav", { vol: 1.5 });
  for (let t = LAPSE; t < NEXT - .2; t += .23) E.S(t, "tick", .35);
  E.clip(NEXT, "sfx/elx-msg-pop.wav", { vol: .8 });

  // phone notification at the next Black Friday
  const note = E.el(Q, "abs", `left:140px;top:520px;width:800px;padding:18px 24px;border-radius:26px;background:rgba(255,255,255,.97);box-shadow:0 18px 40px rgba(0,0,0,.25);z-index:14;opacity:0;display:flex;gap:16px;align-items:center`);
  note.innerHTML = `<div style="width:64px;height:64px;border-radius:16px;background:${RED};color:#fff;font-weight:900;font-size:40px;display:flex;align-items:center;justify-content:center">%</div><div><div style="font-weight:900;font-size:34px;color:${INK}">BLACK FRIDAY IS BACK 🔥</div><div style="font-weight:600;font-size:28px;color:#556">Blue curaçao −60%. Limited stock!</div></div>`;
  E.K(note, "o", [[NEXT, 0], [NEXT + .15, 1], [STAMP - .2, 1], [STAMP, 0]]); E.K(note, "y", [[NEXT, -120], [NEXT + .3, 0, "out"]]);

  // ================= stamp + title =================
  const stampBox = E.el(Q, "abs", "left:0;top:1260px;width:1080px;display:flex;flex-direction:column;z-index:15");
  const st = E.stamp(stampBox, "SAVED: €0. AGAIN.", STAMP, { size: 84, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  E.cur = A;
  const titleBox = E.el(P, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "*Black Friday.*", { size: 76, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = RED; e.style.color = "#fff"; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
