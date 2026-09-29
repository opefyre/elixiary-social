// SK.49 "5 minutes away!" (the trending fake-text "where are you" format) — the group chat: "Tonight 9 PM at Sal's! Don't
// be late!!" Then the replies, each cut against REALITY: "5 min away! 🏃‍♀️" (on the sofa, frozen drink), "Leaving now!!"
// (still in bed), "Parking 🚗" (pyjamas, cookie), "Almost there! 💅" (mirror selfie #47), "Walking in!!" (still choosing
// shoes). Sal at the empty table — RESERVED 21:00 · 6 — the clock races to 22:47. They all burst in at once: "Sorry!
// Traffic!" Sal: "…Kitchen's closed."  Voices: ElevenLabs (Jessica, Alex, Rico: Liam, Laura, Nina: Sarah; Sal: Chris).
export const meta = {
  id: "sk49-five-min-away",
  images: { sofa: "cutouts/nina_sip.webp", bed: "cutouts/rico_squint.webp", pj: "cutouts/xm_dad.webp", selfie: "cutouts/inf_selfie.webp", oops: "cutouts/cust_oops.webp",
    sal: "cutouts/salc_wait.webp", twitch: "cutouts/sal_twitch.webp", nina: "cutouts/nina_order.webp", rico: "cutouts/friend_point.webp", alex: "cutouts/guy_smile.webp", laura: "cutouts/inf_wait.webp", jess: "cutouts/cust_ask.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", BLUE = "#2f7bf6";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const M0 = .3, STEP = 2.35, M1 = 1.7, BAR = 13.9, BURST = 16.4, S1 = 18.6, STAMP = 19.8, DUR = 22.8;
  E.music({ bpm: 112, root: 60, seed: 49, prog: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], until: BURST });
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);

  // ================= scene 1: the chat vs reality =================
  const A = E.scene("chat", 0, BAR, "light"); E.cur = A; const P = A.el;
  E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#eef1f6,#dfe4ec)");
  const chat = E.el(P, "abs", "left:40px;top:350px;width:1000px;height:640px;border-radius:34px;background:#fff;box-shadow:0 18px 40px rgba(20,35,60,.15);overflow:hidden");
  E.K(chat, "y", [[0, 60], [.45, 0, "out"]]); E.K(chat, "o", [[0, 0], [.2, 1]]);
  const hdr = E.el(chat, "abs", "left:0;top:0;width:1000px;height:86px;z-index:2;background:#f7f8fb;border-bottom:2px solid #e6e9f0;display:flex;align-items:center;gap:16px;padding:0 26px;box-sizing:border-box");
  E.el(hdr, "", `width:54px;height:54px;border-radius:50%;background:${GOLD};display:flex;align-items:center;justify-content:center;font-size:30px`, "🍸");
  E.el(hdr, "", `font-weight:900;font-size:34px;color:${INK}`, "Friday drinks 🍸 <span style='font-weight:600;color:#889;font-size:26px'>· 6 people</span>");
  const list = E.el(chat, "abs", "left:0;top:96px;width:1000px;padding:0 22px;box-sizing:border-box");
  const MSGS = [["Jess", "jess", "Tonight 9 PM at Sal’s! Don’t be late!! 🍸", "20:15", M0],
    ["Nina", "nina", "5 min away! 🏃‍♀️", "21:02", M1], ["Rico", "rico", "Leaving now!!", "21:14", M1 + STEP], ["Alex", "alex", "Parking 🚗", "21:31", M1 + 2 * STEP],
    ["Laura", "laura", "Almost there! 💅", "21:48", M1 + 3 * STEP], ["Jess", "jess", "Walking in!!", "22:05", M1 + 4 * STEP]];
  MSGS.forEach(([who, img, txt, time, t0], i) => {
    const row = E.el(list, "", "display:flex;align-items:flex-end;gap:14px;margin-top:12px;opacity:0");
    const av = E.el(row, "", "position:relative;width:62px;height:62px;border-radius:50%;overflow:hidden;background:#e6e9f0;flex:none");
    E.img(av, img, "position:absolute;left:-22px;top:-4px;width:110px;height:auto");
    const bub = E.el(row, "", "padding:12px 20px 14px;border-radius:26px 26px 26px 8px;background:#e9ebf1;max-width:760px");
    E.el(bub, "", `font-weight:700;font-size:22px;color:${["#c0392b", "#2f7bf6", "#16a085", "#8e44ad", "#d35400"][i % 5]}`, who);
    E.el(bub, "", `font-weight:700;font-size:36px;color:${INK};line-height:1.15`, txt);
    E.el(row, "", "font-size:22px;color:#99a;padding-bottom:6px", time);
    E.K(row, "o", [[t0, 0], [t0 + .1, 1]]); E.K(row, "x", [[t0, -40], [t0 + .3, 0, "out"]]);
    E.clip(t0, "sfx/elx-msg-pop.wav", { vol: .7 });
  });
  E.F(t => { const n = MSGS.filter(m => t >= m[4]).length; const off = Math.max(0, n - 5) * 112 + (n > 4 ? 112 * seg(t, MSGS[n - 1][4], .3) : 0); list.style.transform = `translateY(${-off}px)`; });
  // the clock
  const clk = E.el(P, "abs", `left:760px;top:260px;padding:6px 18px;border-radius:14px;background:${INK};color:#fff;font-weight:900;font-size:36px;font-variant-numeric:tabular-nums;z-index:5`);
  const TIMES = [[0, 20 * 60 + 15], [M1, 21 * 60 + 2], [M1 + STEP, 21 * 60 + 14], [M1 + 2 * STEP, 21 * 60 + 31], [M1 + 3 * STEP, 21 * 60 + 48], [M1 + 4 * STEP, 22 * 60 + 5]];
  E.F(t => { let m = TIMES[0][1]; for (const [k, v] of TIMES) if (t >= k) m = v; clk.textContent = `🕘 ${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`; });
  // the reality panel
  const REAL = [["sofa", 860, 1165, "🛋️ on the sofa. Frozen margarita.", "linear-gradient(180deg,#e8d8c4,#d8c0a4)"],
    ["bed", 865, 1155, "🛏️ still in bed.", "linear-gradient(180deg,#b8c4d8,#9aa8c0)"],
    ["pj", 440, 995, "👖 hasn’t found his trousers.", "linear-gradient(180deg,#d8e0cc,#c0cab0)"],
    ["selfie", 880, 1132, "🤳 mirror selfie #47.", "linear-gradient(180deg,#f0d8e4,#e0bcd0)"],
    ["oops", 650, 1131, "👟 still choosing shoes.", "linear-gradient(180deg,#f4e4c8,#e4cca4)"]];
  const panel = E.el(P, "abs", "left:40px;top:1010px;width:1000px;height:860px;border-radius:34px;overflow:hidden;box-shadow:0 18px 40px rgba(20,35,60,.2);opacity:0");
  E.K(panel, "o", [[M1 + .5, 0], [M1 + .7, 1]]);
  REAL.forEach(([img, w, h, cap, bg], i) => {
    const t0 = M1 + .55 + i * STEP, t1 = i < 4 ? M1 + .55 + (i + 1) * STEP : BAR + 1;
    const pane = E.el(panel, "abs", `left:0;top:0;width:1000px;height:860px;background:${bg};opacity:0`);
    const H = img === "pj" ? 820 : 760, W = H * w / h;
    const ch = E.el(pane, "abs", `left:${500 - W / 2}px;top:${900 - H}px;width:${W}px;height:${H}px`);
    E.img(ch, img, `width:${W}px;height:${H}px`);
    E.el(pane, "abs", `left:24px;top:24px;padding:10px 20px;border-radius:16px;background:${CORAL};color:#fff;font-weight:900;font-size:34px;letter-spacing:.04em`, "📍 REALITY");
    E.el(pane, "abs", `left:0;top:760px;width:1000px;text-align:center`, `<span style="display:inline-block;padding:10px 24px;border-radius:16px;background:rgba(20,35,29,.9);color:#fff;font-weight:900;font-size:40px">${cap}</span>`);
    E.K(pane, "o", [[t0, 0], [t0 + .05, 1], [t1 - .05, 1], [t1, 0]]); E.K(ch, "s", [[t0, 1.1], [t0 + .3, 1, "out"]]);
    E.S(t0, "whoosh", .4); E.flash(t0, "#ffffff", .25, .1);
  });

  // ================= scene 2: Sal and the empty table =================
  const B = E.scene("bar", BAR, DUR, "dark"); E.cur = B; const Q = B.el;
  E.wipe(BAR);
  E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2c1f1a,#3d2a22 60%,#1e1512)");
  const shelf = E.el(Q, "abs", "left:0;top:460px;width:1080px;height:520px;opacity:.5");
  let s = ""; for (let r = 0; r < 2; r++) for (let i = 0; i < 12; i++) { const c = ["#c77d3a", "#7ab04c", "#e4d4a8", "#9a2a3a", "#4a82b8"][(i + r) % 5], h = 100 + ((i * 29 + r * 7) % 50); s += `<rect x="${24 + i * 88}" y="${r * 220 + 190 - h}" width="42" height="${h}" rx="9" fill="${c}"/>`; }
  shelf.innerHTML = `<svg viewBox="0 0 1080 520" width="1080" height="520">${s}<rect x="0" y="190" width="1080" height="12" fill="#7a5238"/><rect x="0" y="410" width="1080" height="12" fill="#7a5238"/></svg>`;
  E.el(Q, "abs", "left:0;top:1560px;width:1080px;height:360px;background:#2a1e18");
  // the reserved table with six empty chairs
  const tbl = E.el(Q, "abs", "left:60px;top:1260px;width:960px;height:360px;z-index:2");
  tbl.innerHTML = `<svg viewBox="0 0 960 360" width="960" height="360">${[0, 1, 2, 3, 4, 5].map(i => `<g transform="translate(${60 + i * 150} 30)"><rect x="0" y="0" width="90" height="16" rx="6" fill="#6a4a36"/><rect x="6" y="-110" width="14" height="120" fill="#6a4a36"/><rect x="70" y="-110" width="14" height="120" fill="#6a4a36"/><rect x="6" y="-110" width="78" height="16" fill="#7a5a44"/><rect x="8" y="16" width="10" height="120" fill="#5a3a26"/><rect x="72" y="16" width="10" height="120" fill="#5a3a26"/></g>`).join("")}` +
    `<rect x="20" y="150" width="920" height="40" rx="12" fill="#8a5a3c"/><rect x="60" y="190" width="30" height="170" fill="#5a3a26"/><rect x="870" y="190" width="30" height="170" fill="#5a3a26"/>` +
    `<g transform="translate(400 70)"><path d="M0 80 L20 0 H140 L160 80 Z" fill="#fffbe8"/><text x="80" y="42" text-anchor="middle" font-family="Noto Sans" font-weight="900" font-size="24" fill="${INK}">RESERVED</text><text x="80" y="70" text-anchor="middle" font-family="Noto Sans" font-weight="700" font-size="20" fill="#8a5a3c">21:00 · party of 6</text></g></svg>`;
  const SH = 820, SW = SH * 754 / 1104;
  const sal = E.el(Q, "abs", `left:${820 - SW / 2}px;top:${1300 - SH}px;width:${SW}px;height:${SH}px;z-index:1`);
  const sIn = E.el(sal, "abs", `left:0;top:0;width:${SW}px;height:${SH}px`);
  const sW = E.img(sIn, "sal", `position:absolute;left:0;top:0;width:${SW}px;height:${SH}px`);
  const sT = E.img(sIn, "twitch", `position:absolute;left:${(SW - SH * 865 / 1133) / 2}px;top:0;width:${SH * 865 / 1133}px;height:${SH}px`);
  E.F(t => { const tw = t >= BAR + 1.3; sW.style.opacity = tw ? 0 : 1; sT.style.opacity = tw ? 1 : 0; sIn.style.transform = `translateY(${Math.sin(t * 1.5) * 3}px)`; });
  const clk2 = E.el(Q, "abs", `left:40px;top:380px;padding:10px 24px;border-radius:18px;background:#0a0a0e;color:#ff4a4a;font-family:'Courier New',monospace;font-weight:900;font-size:64px;z-index:5;text-shadow:0 0 12px #ff4a4a`);
  E.F(t => { const m = Math.round(22 * 60 + 5 + 42 * seg(t, BAR + .3, BURST - BAR - .6)); clk2.textContent = `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`; });
  for (let t = BAR + .4; t < BURST - .2; t += .25) E.S(t, "tick", .3);
  // everyone bursts in at once
  const ROW = [["nina", 846, 1164, 120], ["rico", 861, 1124, 330], ["alex", 821, 1122, 560], ["laura", 433, 1008, 760], ["jess", 718, 1113, 960]];
  ROW.forEach(([n, w, h, cx], i) => {
    const H = n === "laura" ? 900 : 700, W = H * w / h;
    const c = E.el(Q, "abs", `left:${cx - W / 2}px;top:${1970 - H}px;width:${W}px;height:${H}px;z-index:${4 + (i % 2)};opacity:0`);
    const cIn = E.el(c, "abs", `left:0;top:0;width:${W}px;height:${H}px`);
    E.img(cIn, n, `width:${W}px;height:${H}px`);
    const t0 = BURST + i * .06;
    E.K(c, "o", [[t0, 0], [t0 + .05, 1]]); E.K(c, "y", [[t0, 400], [t0 + .35, 0, "back"]]);
    E.F(t => { cIn.style.transform = `translateY(${t < S1 ? -Math.abs(Math.sin((t - t0) * 9)) * 10 : 0}px)`; });
  });
  E.S(BURST, "slam", .7); E.shake(BURST, 12, .3);
  [["c_nina", 0], ["c_rico", .1], ["c_alex", .18], ["c_laura", .26], ["c_jess", .33]].forEach(([f, d]) => E.clip(BURST + .1 + d, `voices/sk49/${f}.wav`, { vol: 1.1 }));
  const chorus = E.el(Q, "abs", `left:0;top:1000px;width:1080px;text-align:center;z-index:9;opacity:0`, `<span style="display:inline-block;padding:16px 30px 20px;border-radius:30px;background:#fff;color:${INK};font-weight:900;font-size:64px;box-shadow:0 14px 34px rgba(0,0,0,.45)">“Sorry! Traffic!” ×5</span>`);
  E.K(chorus, "o", [[BURST + .2, 0], [BURST + .3, 1], [S1 - .1, 1], [S1 + .1, 0]]); E.K(chorus, "s", [[BURST + .2, .4], [BURST + .5, 1, "back"]]);
  const kc = E.el(Q, "abs", "left:600px;top:560px;width:420px;z-index:9;transform-origin:120px 100%");
  const kcb = E.el(kc, "", `position:relative;background:#1b2330;border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:52px;line-height:1.08;color:#fff;text-align:center;font-style:italic`, "…Kitchen’s<br>closed.");
  E.el(kcb, "abs", "left:98px;bottom:-20px;width:44px;height:44px;background:#1b2330;transform:rotate(45deg);border-radius:6px");
  E.pop(kc, S1, { from: .3, dur: .3 }); E.S(S1 + .02, "pop", .4);
  E.clip(S1 + .05, "voices/sk49/s1.wav", { vol: 1.7 });
  E.clip(BAR, "sfx/elx-lounge.wav", { vol: .2, to: DUR - BAR, duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(Q, "abs", "left:0;top:800px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "“5 MIN AWAY” = 1H 47M", STAMP, { size: 72, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  E.cur = A;
  const titleBox = E.el(P, "abs", "left:100px;top:252px;width:640px;z-index:8");
  const title = E.text(titleBox, "“5 minutes *away!*”", { size: 64, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
