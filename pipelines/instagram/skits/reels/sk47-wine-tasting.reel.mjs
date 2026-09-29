// SK.47 "What did I pray for?" wine-tasting edition (the trending calm-partner/chaos-partner format) — golden hour at the
// vineyard. Her: serene swirl while the sommelier purrs "Notes of dark cherry… with a long, elegant finish." Then: "…what did
// HE pray for?" — Rico drinks from the spit bucket ("Sir… that's the spit bucket." — "…Why is it warm?"), asks "Do you have
// this in a can?", fills his pockets with the free cheese, clinks the sommelier's water jug. Back to her, still serene — the
// camera pulls back: twelve empty tasting glasses and an upside-down bottle in front of her. MATCH MADE IN HEAVEN.
// Voices: ElevenLabs (sommelier: George; Rico: Liam).
export const meta = {
  id: "sk47-wine-tasting",
  images: { nina: "cutouts/w_nina.webp", spit: "cutouts/w_spit.webp", cheese: "cutouts/w_cheese.webp", point: "cutouts/friend_point.webp", flip: "cutouts/friend_flip.webp", somm: "cutouts/waiter.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", WINE = "#7a1030";
  E.episode(-16);
  const W1 = .8, HE = 4.7, CA = 5.2, W2 = 6.1, R1 = 8.3, CB = 9.7, R2 = 9.9, CC = 11.6, CD = 13.2, ME = 14.8, PULL = 15.8, STAMP = 18.2, DUR = 21.2;
  E.music({ bpm: 92, root: 60, seed: 47, prog: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], until: STAMP + 2 });
  const S = E.scene("vineyard", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TT = 1500;

  // ================= golden-hour vineyard =================
  const world = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:540px 1300px");
  E.el(world, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#f7c98a 0%,#f4a86a 30%,#e8b48a 50%,#c9a07a 60%)");
  E.el(world, "abs", "left:640px;top:760px;width:260px;height:260px;border-radius:50%;background:radial-gradient(closest-side,#fff6d0,#ffd88a 60%,rgba(255,216,138,0))");
  const hills = E.el(world, "abs", "left:0;top:880px;width:1080px;height:700px");
  hills.innerHTML = `<svg viewBox="0 0 1080 700" width="1080" height="700"><path d="M0 120 Q270 40 540 110 T1080 90 V700 H0 Z" fill="#8a9a5a"/><path d="M0 220 Q300 150 620 230 T1080 200 V700 H0 Z" fill="#6f8446"/>` +
    Array.from({ length: 9 }, (_, i) => `<path d="M${-100 + i * 150} 700 Q${40 + i * 120} 420 ${540} 240" stroke="#4e6632" stroke-width="10" stroke-dasharray="4 16" fill="none" stroke-linecap="round"/>`).join("") + `</svg>`;
  // a pergola beam with vines + string lights
  E.el(world, "abs", "left:0;top:560px;width:1080px;height:26px;background:#7a5a3a");
  const vines = E.el(world, "abs", "left:0;top:560px;width:1080px;height:140px");
  vines.innerHTML = `<svg viewBox="0 0 1080 140" width="1080" height="140">${Array.from({ length: 24 }, (_, i) => `<ellipse cx="${i * 46 + 20}" cy="${30 + (i % 3) * 14}" rx="26" ry="16" fill="${i % 2 ? "#5e7e36" : "#6f9444"}"/>`).join("")}${[180, 520, 860].map(x => `<g transform="translate(${x} 60)">${Array.from({ length: 9 }, (_, k) => `<circle cx="${(k % 3) * 12}" cy="${Math.floor(k / 3) * 12}" r="7" fill="#5a2a5a"/>`).join("")}</g>`).join("")}</svg>`;
  // the tasting table
  E.el(world, "abs", `left:-20px;top:${TT}px;width:1120px;height:${1920 - TT}px;background:linear-gradient(180deg,#fbf8f0,#e8e0d0);box-shadow:0 -6px 20px rgba(0,0,0,.15);z-index:3`);
  const props = E.el(world, "abs", `left:0;top:${TT - 190}px;width:1080px;height:230px;z-index:4`);
  props.innerHTML = `<svg viewBox="0 0 1080 230" width="1080" height="230"><g transform="translate(40 40)"><rect x="0" y="120" width="220" height="40" rx="10" fill="#9a6a3a"/><path d="M20 120 L70 90 L90 120 Z" fill="#f2c94c"/><path d="M110 120 L160 96 L170 120 Z" fill="#f7e3a0"/><circle cx="190" cy="108" r="12" fill="#6b2f90"/></g>` +
    `<g transform="translate(860 20)"><path d="M20 30 H100 L90 180 H30 Z" fill="#c0c6cc"/><rect x="14" y="20" width="92" height="16" rx="6" fill="#d8dde2"/></g>` +
    `<g transform="translate(700 0)"><path d="M26 0 H48 V60 Q70 80 70 110 V200 H4 V110 Q4 80 26 60 Z" fill="#3a0a18"/><rect x="10" y="120" width="54" height="50" fill="#f2ead6"/></g></svg>`;
  // twelve empty tasting glasses — hidden until the pull-back
  const empties = E.el(world, "abs", `left:40px;top:${TT - 150}px;width:1000px;height:170px;z-index:5;opacity:0`);
  empties.innerHTML = `<svg viewBox="0 0 1000 170" width="1000" height="170">${Array.from({ length: 12 }, (_, i) => `<g transform="translate(${20 + i * 80} ${(i % 2) * 14})"><path d="M4 10 Q30 70 56 10 Z" fill="rgba(255,255,255,.35)" stroke="#8a8a90" stroke-width="3"/><path d="M30 64 V130 M14 134 H46" stroke="#8a8a90" stroke-width="4"/><ellipse cx="30" cy="54" rx="10" ry="4" fill="${WINE}" opacity=".5"/></g>`).join("")}</svg>`;
  E.K(empties, "o", [[PULL + .3, 0], [PULL + .6, 1]]);

  // ================= her (centre) =================
  const NH = 1080, NW = NH * 502 / 1010;
  const nina = E.el(world, "abs", `left:${520 - NW / 2}px;top:${TT + 160 - NH}px;width:${NW}px;height:${NH}px;z-index:2`);
  const nIn = E.el(nina, "abs", `left:0;top:0;width:${NW}px;height:${NH}px;transform-origin:50% 100%`);
  E.img(nIn, "nina", `width:${NW}px;height:${NH}px`);
  E.F(t => { nIn.style.transform = `rotate(${Math.sin(t * 1.3) * 1.5}deg) translateY(${Math.sin(t * 1.1) * 4}px)`; });
  E.K(nina, "o", [[HE, 1], [HE + .05, 0], [ME, 0], [ME + .05, 1]]);
  // the sommelier (right)
  const SMH = 1060, SMW = SMH * 526 / 1010;
  const somm = E.el(world, "abs", `left:${900 - SMW / 2}px;top:${TT + 160 - SMH}px;width:${SMW}px;height:${SMH}px;z-index:1`);
  const smIn = E.el(somm, "abs", `left:0;top:0;width:${SMW}px;height:${SMH}px;transform-origin:50% 100%`);
  E.img(smIn, "somm", `width:${SMW}px;height:${SMH}px`);
  E.F(t => { let r = 0; if (t >= W2 - .2 && t < W2 + 1.8) r = -6; if (t >= R2 + .4 && t < CC) r = Math.sin(t * 30) * 2; smIn.style.transform = `rotate(${r}deg) translateY(${Math.sin(t * 1.4) * 3}px)`; });
  // world pull-back at the end
  E.K(world, "s", [[0, 1.08], [PULL, 1.08], [PULL + 1.2, 1, "io"]]);

  // ================= his montage (hard cuts) =================
  const CUTS = [["spit", 642, 906, CA, CB, "🪣 the spit bucket"], ["point", 861, 1124, CB, CC, "🥫 the upgrade"], ["cheese", 688, 1017, CC, CD, "🧀 the “free” cheese"], ["flip", 809, 1053, CD, ME, "🥂 cheers-ing the water jug"]];
  CUTS.forEach(([n, w, h, t0, t1, cap], i) => {
    const H = 980, W = H * w / h;
    const c = E.el(world, "abs", `left:${420 - W / 2}px;top:${TT + 150 - H}px;width:${W}px;height:${H}px;z-index:2;opacity:0`);
    const cIn = E.el(c, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`);
    E.img(cIn, n, `width:${W}px;height:${H}px`);
    E.K(c, "o", [[t0, 0], [t0 + .03, 1], [t1 - .03, 1], [t1, 0]]); E.K(c, "s", [[t0, 1.12], [t0 + .25, 1, "out"]]);
    E.F(t => { cIn.style.transform = `translateY(${Math.sin(t * 3 + i) * 5}px)`; });
    const tag = E.el(R, "abs", `left:0;top:1020px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 24px;border-radius:16px;background:${INK};color:#fff;font-weight:900;font-size:42px">${cap}</span>`);
    E.K(tag, "o", [[t0 + .1, 0], [t0 + .25, 1], [t1 - .1, 1], [t1, 0]]);
    E.S(t0, "whoosh", .45); E.flash(t0, "#ffffff", .35, .12);
  });
  // cheese count + the jug clink
  const cc = E.el(R, "abs", `left:700px;top:880px;padding:8px 18px;border-radius:14px;background:${GOLD};color:${INK};font-weight:900;font-size:38px;z-index:8;opacity:0;font-variant-numeric:tabular-nums`);
  E.K(cc, "o", [[CC + .3, 0], [CC + .4, 1], [CD - .1, 1], [CD, 0]]); E.F(t => { cc.textContent = `🧀 × ${Math.round(14 * seg(t, CC + .3, 1))}`; });
  for (let i = 0; i < 5; i++) E.S(CC + .3 + i * .22, "crack", .35);
  E.clip(CD + .3, "sfx/elx-glass-clink.wav", { vol: .8 }); E.clip(CA + .3, "sfx/elx-slurp-empty.wav", { vol: .6, to: .9 });

  // ================= the trend captions =================
  const cap = (html, t0, t1) => { const c = E.el(R, "abs", `left:60px;top:360px;width:960px;text-align:center;z-index:9;opacity:0`, `<span style="display:inline-block;padding:14px 30px 16px;border-radius:20px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:52px;box-shadow:0 12px 30px rgba(0,0,0,.18)">${html}</span>`); E.K(c, "o", [[t0, 0], [t0 + .12, 1], [t1 - .12, 1], [t1, 0]]); };
  cap("Me at a wine tasting 🍷✨", .1, HE);
  cap("…what did HE pray for? 🙏", HE, ME);
  cap("…and me, 2 hours in 🍷✨", ME, DUR);
  const tally = E.el(R, "abs", `left:0;top:1080px;width:1080px;text-align:center;z-index:9;opacity:0`, `<span style="display:inline-block;padding:10px 26px;border-radius:18px;background:${WINE};color:#fff;font-weight:900;font-size:44px">TASTING GLASSES: 12 / 4</span>`);
  E.K(tally, "o", [[PULL + .8, 0], [PULL + 1, 1], [STAMP - .1, 1], [STAMP + .1, 0]]); E.S(PULL + .8, "ding", .6);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.25);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Notes of dark cherry… with<br>a long, elegant finish.", { left: 300, top: 500, w: 740, tail: 580, t0: W1, t1: HE, dark: true, italic: true, size: 42 });
  bubble("Sir… that’s the<br>spit bucket.", { left: 560, top: 500, w: 480, tail: 340, t0: W2, t1: R1 - .05, dark: true });
  bubble("…Why is it warm?", { left: 60, top: 520, w: 480, tail: 260, t0: R1, t1: CB - .05, italic: true });
  bubble("Do you have this<br>in a can? 🥫", { left: 60, top: 520, w: 480, tail: 260, t0: R2, t1: CC - .05 });
  E.clip(W1 + .05, "voices/sk47/w1.wav", { vol: 1.5 }); E.clip(W2 + .05, "voices/sk47/w2.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk47/r1.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk47/r2.wav", { vol: 1.5 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/cicadas.wav", { vol: .18, to: Math.min(6, DUR - t), duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1640px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "MATCH MADE IN HEAVEN 🙏", STAMP, { size: 68, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "What did I *pray* for?", { size: 66, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK, css: "text-shadow:0 2px 14px rgba(255,255,255,.7)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, HE, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
