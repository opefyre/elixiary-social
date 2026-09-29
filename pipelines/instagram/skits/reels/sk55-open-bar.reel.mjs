// SK.55 "The open bar." — a wedding reception. DJ: "Ladies and gentlemen… the bar is OPEN!" The easel sign: OPEN BAR 🥂. The
// auntie: "Oh, I don't really drink… Make it a double!" Grandpa: "Tequila! For everyone!" The dance floor erupts; the BAR TAB
// races up. The bride's dad reads the receipt that reaches the floor: "…How much?!" (€11,480). DJ: "The open bar… is now
// closed." The sign flips: CASH BAR 💳. Record scratch — the lights come up, the dance floor empties, a tumbleweed rolls
// through. CASH BAR = PARTY OVER.  Voices: ElevenLabs (DJ: Brian; auntie: Matilda; Grandpa: Bill; dad: Callum).
export const meta = {
  id: "sk55-open-bar",
  images: { hall: "bg/wedding.jpg", aunt: "cutouts/mum_happy.webp", gramps: "cutouts/gramps_joy.webp", dancers: "cutouts/wed_dancers.webp", dad: "cutouts/fob_receipt.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  const D1 = .5, A1 = 4.2, U1 = 7.0, FLOOR = 9.2, F1 = 11.6, D2 = 13.2, FLIP = 15.8, EMPTY = 16.4, STAMP = 18.2, DUR = 21.4;
  E.music({ bpm: 124, root: 57, seed: 55, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: FLIP });
  const S = E.scene("wedding", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);

  // ================= the hall =================
  const bg = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "hall", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 55%");
  E.F(t => { bgI.style.transform = `scale(${1.03 + (t < FLIP ? Math.abs(Math.sin(t * Math.PI / (60 / 124))) * .006 : 0)})`; });
  // party lights, then the house lights at the end
  const disco = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:1;pointer-events:none;mix-blend-mode:screen");
  E.F(t => { if (t < FLIP && t > D1 + 2) { const h = (t * 120) % 360; disco.style.background = `radial-gradient(ellipse at ${50 + Math.sin(t * 2) * 30}% 55%,hsla(${h},90%,60%,.28),transparent 55%),radial-gradient(ellipse at ${50 - Math.sin(t * 1.6) * 30}% 70%,hsla(${(h + 140) % 360},90%,60%,.22),transparent 50%)`; } else disco.style.background = "none"; });
  const house = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6;pointer-events:none;background:rgba(255,255,240,.22);opacity:0");
  E.K(house, "o", [[FLIP, 0], [FLIP + .15, 1]]);
  // the easel sign (sits on the blank easel in the art)
  const sign = E.el(R, "abs", "left:838px;top:990px;width:200px;height:250px;z-index:2;transform:rotate(3deg);display:flex;align-items:center;justify-content:center;text-align:center;border-radius:6px;font-family:'Pacifico','Noto Sans',cursive;font-weight:800;line-height:1.1");
  E.F(t => { const cash = t >= FLIP; const h = cash ? "CASH<br>BAR 💳" : "OPEN<br>BAR 🥂"; if (sign.__h !== h) { sign.innerHTML = h; sign.__h = h; } sign.style.background = cash ? "#fff4f0" : "#fffbe8"; sign.style.color = cash ? "#c8102e" : "#8a5a1a"; sign.style.fontSize = "46px"; });
  E.K(sign, "sx", [[FLIP - .15, 1], [FLIP, 0], [FLIP + .15, 1]]); E.S(FLIP, "swish", .6);
  // confetti on "the bar is open"
  const conf = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:7;pointer-events:none;opacity:0");
  conf.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920">${Array.from({ length: 50 }, (_, i) => `<rect class="cf" x="${(i * 97) % 1080}" y="0" width="14" height="22" fill="${["#ff5fa2", GOLD, "#8ee3c8", "#9b8cf0"][i % 4]}"/>`).join("")}</svg>`;
  const cfs = [...conf.querySelectorAll(".cf")];
  E.K(conf, "o", [[D1 + 2.4, 0], [D1 + 2.5, 1], [FLIP - .1, 1], [FLIP, 0]]);
  E.F(t => cfs.forEach((c, i) => { const y = ((t - D1 - 2.4) * (260 + (i % 5) * 60) + i * 137) % 1920; c.setAttribute("y", y); c.setAttribute("transform", `rotate(${(t * 200 + i * 40) % 360} ${(i * 97) % 1080 + 7} ${y + 11})`); }));
  E.clip(D1 + 2.5, "sfx/elx-bar-cheer.wav", { vol: .7, to: 2.4 });

  // ================= the guests =================
  const guest = (name, w, h, H, cx, t0, t1, z = 3) => {
    const W = H * w / h;
    const g = E.el(R, "abs", `left:${cx - W / 2}px;top:${1960 - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const gIn = E.el(g, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`);
    E.img(gIn, name, `width:${W}px;height:${H}px`);
    E.K(g, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(g, "y", [[t0, 260], [t0 + .35, 0, "back"]]);
    E.F(t => { gIn.style.transform = `translateY(${t < FLIP ? -Math.abs(Math.sin(t * Math.PI / (60 / 124))) * 12 : 0}px) rotate(${t < FLIP ? Math.sin(t * 4) * 3 : 0}deg)`; });
    E.S(t0, "whoosh", .35);
  };
  guest("aunt", 796, 1158, 980, 380, A1, U1);
  guest("gramps", 431, 1013, 1080, 520, U1, FLOOR);
  guest("dancers", 974, 591, 620, 520, FLOOR, FLIP, 3);
  guest("dad", 610, 997, 1000, 520, F1, D2 + 1.2, 4);
  // the tab
  const tab = E.el(R, "abs", `left:40px;top:370px;padding:12px 24px;border-radius:18px;background:rgba(20,35,29,.9);color:#fff;font-weight:900;font-size:48px;z-index:8;opacity:0;font-variant-numeric:tabular-nums`);
  E.K(tab, "o", [[D1 + 3, 0], [D1 + 3.2, 1], [FLIP + 1.4, 1], [FLIP + 1.6, 0]]);
  E.F(t => { const v = Math.round(11480 * Math.pow(seg(t, D1 + 3, F1 - D1 - 3), 1.7)); tab.innerHTML = `🧾 BAR TAB: <span style="color:${v > 8000 ? CORAL : GOLD}">€${v.toLocaleString("en-US")}</span>`; });
  const shots = E.el(R, "abs", `left:40px;top:470px;padding:8px 20px;border-radius:14px;background:${GOLD};color:${INK};font-weight:900;font-size:36px;z-index:8;opacity:0`, "🥃 tequila × 64");
  E.K(shots, "o", [[U1 + 1.2, 0], [U1 + 1.3, 1], [FLIP, 1], [FLIP + .2, 0]]); E.S(U1 + 1.2, "pop", .5);
  // after the flip: an empty floor + a tumbleweed
  const empty = E.el(R, "abs", `left:0;top:760px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 26px;border-radius:18px;background:${INK};color:#fff;font-weight:900;font-size:44px">💃 dance floor: 0 people</span>`);
  E.K(empty, "o", [[EMPTY + .4, 0], [EMPTY + .6, 1], [STAMP - .1, 1], [STAMP + .1, 0]]);
  const tw = E.el(R, "abs", "left:0;top:1560px;width:160px;height:160px;z-index:5;opacity:0");
  tw.innerHTML = `<svg viewBox="0 0 160 160" width="160" height="160" fill="none" stroke="#a88a5a" stroke-width="5">${Array.from({ length: 10 }, (_, i) => `<ellipse cx="80" cy="80" rx="${70 - i * 3}" ry="${40 + i * 3}" transform="rotate(${i * 18} 80 80)"/>`).join("")}</svg>`;
  E.K(tw, "o", [[EMPTY, 0], [EMPTY + .1, 1]]); E.K(tw, "x", [[EMPTY, -200], [DUR, 1200, "lin"]]); E.F(t => { if (t > EMPTY) tw.querySelector("svg").style.transform = `rotate(${(t - EMPTY) * 240}deg)`; });
  E.clip(FLIP - .05, "sfx/record-silence.wav", { vol: .8 }); E.clip(EMPTY, "sfx/wind-gust.wav", { vol: .4 });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const dj = (html, t0, t1) => { const c = E.el(R, "abs", `left:0;top:600px;width:1080px;text-align:center;z-index:9;opacity:0`, `<span style="display:inline-block;padding:14px 30px 18px;border-radius:24px;background:#1b1030;border:4px solid #ff5fa2;color:#fff;font-weight:900;font-size:50px;line-height:1.1;box-shadow:0 0 30px rgba(255,95,162,.5)">🎤 DJ: ${html}</span>`); E.K(c, "o", [[t0, 0], [t0 + .12, 1], [t1 - .12, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .3, 1, "back"]]); };
  dj("Ladies and gentlemen…<br>the bar is OPEN!", D1, A1 - .2);
  bubble("Oh, I don’t really drink…<br>Make it a double! 🥂", { left: 300, top: 900, w: 640, tail: 200, t0: A1 + .1, t1: U1 - .1, size: 46 });
  bubble("Tequila!<br>For everyone! 🥃", { left: 560, top: 820, w: 460, tail: 120, t0: U1 + .1, t1: FLOOR });
  bubble("…How much?!", { left: 560, top: 900, w: 420, tail: 120, t0: F1, t1: D2, size: 60 });
  dj("The open bar…<br>is now closed.", D2, FLIP + .2);
  E.clip(D1 + .05, "voices/sk55/d1.wav", { vol: 1.5 }); E.clip(A1 + .15, "voices/sk55/a1.wav", { vol: 1.5 }); E.clip(U1 + .15, "voices/sk55/u1.wav", { vol: 1.5 });
  E.clip(F1 + .05, "voices/sk55/f1.wav", { vol: 1.6 }); E.clip(D2 + .05, "voices/sk55/d2.wav", { vol: 1.5 });
  E.clip(0, "sfx/elx-party-music.wav", { vol: .3, to: 6, duck: true }); E.clip(6, "sfx/elx-party-music.wav", { vol: .3, to: 6, duck: true }); E.clip(12, "sfx/elx-party-music.wav", { vol: .3, to: FLIP - 12, duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1100px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "CASH BAR = PARTY OVER.", STAMP, { size: 74, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The *open bar.*", { size: 70, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, A1, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
