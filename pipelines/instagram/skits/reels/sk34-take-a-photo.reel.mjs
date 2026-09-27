// SK.34 "Can you take a photo of us?" — rooftop drinks at sunset. "Excuse me! Could you take a photo of us?" A tourist,
// thrilled: "Okay! Say cheeeese!" The shots pop up one by one: a thumb, a tilt, a forehead, a bin, a flash. The group's
// smiles strain. He hands the phone back and leaves. They scroll the camera roll: 5 bad group shots… then selfies. Selfies.
// SELFIES: 47. "…forty-seven selfies."  Voices: Higgsfield TTS (friend: Maya; tourist: Bob).
export const meta = {
  id: "sk34-take-a-photo",
  images: { up: "cutouts/crew_raised.webp", strain: "cutouts/crew_strain.webp", shoot: "cutouts/tourist_shoot.webp", selfie: "cutouts/tourist_selfie.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  const F1 = .4, T1 = 3.9, SNAP = 6.2, GAP = 1.0, BACK = 11.6, ROLL = 12.4, SCROLL = 13.2, F2 = 15.8, STAMP = 17.6, DUR = 20.8;
  E.music({ bpm: 104, root: 60, seed: 34, prog: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], until: ROLL + 3 });
  const S = E.scene("roof", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);

  // ================= a rooftop bar at sunset =================
  const sky = `linear-gradient(180deg,#2b2a5a 0%,#8a4a7a 38%,#f08a5a 62%,#ffd08a 78%)`;
  E.el(R, "abs", `left:0;top:0;width:1080px;height:1920px;background:${sky}`);
  E.el(R, "abs", "left:620px;top:1060px;width:220px;height:220px;border-radius:50%;background:radial-gradient(closest-side,#fff4c4,#ffd08a 60%,rgba(255,208,138,0))");
  const city = `<svg viewBox="0 0 1080 420" width="1080" height="420"><path d="M0 420 V250 h60 v-60 h50 v90 h40 v-160 h70 v120 h30 v-60 h60 v100 h50 v-200 l30 -40 l30 40 v200 h40 v-90 h70 v130 h40 v-70 h60 v-120 h50 v160 h50 v-80 h60 v110 h40 v-150 h60 v190 h40 V420 Z" fill="#2a1f3a"/>` +
    Array.from({ length: 40 }, (_, i) => `<rect x="${(i * 97) % 1060 + 10}" y="${260 + (i * 53) % 140}" width="10" height="14" fill="#ffd98a" opacity="${.4 + (i % 3) * .2}"/>`).join("") + `</svg>`;
  E.el(R, "abs", "left:0;top:1000px;width:1080px;height:420px", city);
  // string lights
  const lights = E.el(R, "abs", "left:0;top:560px;width:1080px;height:200px");
  lights.innerHTML = `<svg viewBox="0 0 1080 200" width="1080" height="200"><path d="M0 20 Q540 170 1080 20" stroke="#3a2a2a" stroke-width="3" fill="none"/>${Array.from({ length: 15 }, (_, i) => { const x = 20 + i * 74, y = 20 + 150 * (1 - Math.pow((x - 540) / 540, 2)) * .9; return `<circle class="b" cx="${x}" cy="${y + 12}" r="10" fill="#ffe28a"/>`; }).join("")}</svg>`;
  const bulbs = [...lights.querySelectorAll(".b")];
  E.F(t => bulbs.forEach((b, i) => b.setAttribute("opacity", .6 + .4 * Math.abs(Math.sin(t * 2 + i)))));
  // glass railing + deck
  E.el(R, "abs", "left:0;top:1380px;width:1080px;height:160px;background:rgba(200,230,255,.18);border-top:8px solid #c8d0d8");
  E.el(R, "abs", "left:0;top:1540px;width:1080px;height:380px;background:#8a6448;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.14) 0 3px,transparent 3px 120px)");

  // ================= the group (back) =================
  const GW = 720, GH = GW * 665 / 954;
  const grp = E.el(R, "abs", `left:-10px;top:${1570 - GH}px;width:${GW}px;height:${GH}px;z-index:2`);
  const gIn = E.el(grp, "abs", `left:0;top:0;width:${GW}px;height:${GH}px;transform-origin:50% 100%`);
  const gUp = E.img(gIn, "up", `position:absolute;left:0;top:0;width:${GW}px;height:${GH}px`);
  const gSt = E.img(gIn, "strain", `position:absolute;left:0;top:${GH - GW * 674 / 966}px;width:${GW}px;height:${GW * 674 / 966}px`);
  const STRAIN = SNAP + GAP * 2.6;
  E.F(t => { const st = t >= STRAIN; gUp.style.opacity = st ? 0 : 1; gSt.style.opacity = st ? 1 : 0; gIn.style.transform = `translateY(${Math.sin(t * 2) * 3 + (st ? Math.sin(t * 25) * 2 : 0)}px)`; });
  E.K(grp, "o", [[ROLL - .2, 1], [ROLL + .2, .35]]);

  // ================= the tourist (front right) =================
  const TH = 1060, TW = TH * 563 / 1002;
  const tour = E.el(R, "abs", `left:${800 - TW / 2}px;top:${1940 - TH}px;width:${TW}px;height:${TH}px;z-index:4`);
  const tIn = E.el(tour, "abs", `left:0;top:0;width:${TW}px;height:${TH}px;transform-origin:50% 100%`);
  E.img(tIn, "shoot", `width:${TW}px;height:${TH}px`);
  E.K(tour, "x", [[T1 - .6, 800], [T1 - .1, 0, "out"], [BACK, 0], [BACK + .6, 600, "in"]]); E.S(T1 - .6, "swish", .6);
  E.F(t => { tIn.style.transform = `translateY(${Math.sin(t * 2.4) * 4}px) rotate(${t > SNAP - .3 && t < BACK ? Math.sin(t * 6) * 4 : 0}deg)`; });

  // ================= the shots =================
  const shot = (i, fx) => {
    const t0 = SNAP + i * GAP;
    const f = E.el(R, "abs", `left:140px;top:${400 + (i % 2) * 20}px;width:800px;height:540px;border-radius:26px;overflow:hidden;background:${sky};box-shadow:0 0 0 12px #111,0 30px 60px rgba(0,0,0,.5);z-index:7;opacity:0`);
    E.el(f, "abs", "left:0;top:300px;width:800px;height:240px;background:#8a6448");
    const inner = E.el(f, "abs", "left:0;top:0;width:800px;height:540px");
    E.img(inner, i >= 3 ? "strain" : "up", "position:absolute;left:60px;top:40px;width:680px;height:auto");
    fx(f, inner);
    E.el(f, "abs", `right:18px;top:14px;padding:4px 12px;border-radius:10px;background:rgba(0,0,0,.6);color:#fff;font-weight:800;font-size:28px`, `📸 ${i + 1}`);
    E.K(f, "o", [[t0, 0], [t0 + .05, 1], [t0 + GAP - .1, 1], [t0 + GAP, 0]]); E.K(f, "r", [[t0, (i % 2 ? 4 : -4)], [t0 + .25, (i % 2 ? 1.5 : -1.5), "out"]]); E.K(f, "s", [[t0, 1.1], [t0 + .25, 1, "out"]]);
    E.clip(t0, "sfx/elx-camera-shutter.wav", { vol: .8 }); E.flash(t0, "#ffffff", .35, .12);
  };
  shot(0, (f) => { const th = E.el(f, "abs", "left:-120px;top:120px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle at 60% 40%,#f2b8a0,#c9806a);filter:blur(14px)"); });
  shot(1, (f, inner) => { inner.style.transform = "rotate(-28deg) scale(1.2)"; inner.style.filter = "blur(5px)"; });
  shot(2, (f, inner) => { inner.style.transform = "scale(4.2)"; inner.style.transformOrigin = "40% 6%"; });
  shot(3, (f, inner) => {
    inner.style.transform = "scale(.28) translate(900px,-300px)";
    const bin = E.el(f, "abs", "left:70px;top:120px;width:360px;height:440px");
    bin.innerHTML = `<svg viewBox="0 0 360 440" width="360" height="440"><rect x="20" y="40" width="320" height="400" rx="20" fill="#3a4a3a"/><rect x="0" y="10" width="360" height="50" rx="14" fill="#2a3a2a"/><path d="M90 120 V380 M180 120 V380 M270 120 V380" stroke="#2a3a2a" stroke-width="12"/></svg>`;
  });
  shot(4, (f) => { E.el(f, "abs", "left:0;top:0;width:800px;height:540px;background:radial-gradient(circle at 55% 45%,#fff 0,#fff 18%,rgba(255,255,255,.7) 34%,rgba(255,255,255,0) 60%)"); });

  // ================= the camera roll =================
  const phone = E.el(R, "abs", "left:190px;top:360px;width:700px;height:1220px;border-radius:60px;background:#0b0b0e;box-shadow:0 0 0 14px #1d1d22,0 40px 80px rgba(0,0,0,.6);z-index:8;opacity:0;overflow:hidden");
  E.el(phone, "abs", "left:0;top:0;width:700px;height:120px;background:#0b0b0e;z-index:2;color:#fff;font-weight:800;font-size:40px;padding:40px 36px 0;box-sizing:border-box", "Recents");
  const cnt = E.el(phone, "abs", "right:36px;top:48px;z-index:3;color:#8a8a96;font-weight:700;font-size:30px", "52 photos");
  const grid = E.el(phone, "abs", "left:14px;top:130px;width:672px");
  const TW3 = 218;
  const cell = (k) => {
    const c = E.el(grid, "", `position:absolute;left:${(k % 3) * (TW3 + 9)}px;top:${Math.floor(k / 3) * (TW3 + 9)}px;width:${TW3}px;height:${TW3}px;overflow:hidden;background:${k < 5 ? sky : "linear-gradient(180deg,#8ac8f0,#f0d8a8)"}`);
    if (k < 5) { const im = E.img(c, k >= 3 ? "strain" : "up", `position:absolute;left:10px;top:30px;width:200px;height:auto;${["filter:blur(3px)", "transform:rotate(-28deg)", "transform:scale(3.5);transform-origin:40% 6%", "transform:scale(.3)", "filter:brightness(2.2)"][k]}`); }
    else E.img(c, "selfie", `position:absolute;left:${20 + (k * 13) % 40}px;top:${-10 + (k * 7) % 30}px;width:${170 + (k % 3) * 30}px;height:auto;transform:rotate(${(k % 5) - 2}deg)`);
    return c;
  };
  for (let k = 0; k < 52; k++) cell(k);
  E.K(phone, "o", [[ROLL, 0], [ROLL + .2, 1]]); E.K(phone, "y", [[ROLL, 300], [ROLL + .45, 0, "out"]]);
  E.K(grid, "y", [[SCROLL, 0], [SCROLL + 2.2, -(Math.ceil(52 / 3) * (TW3 + 9)) + 1080, "io"]]);
  const tag = E.el(R, "abs", `left:0;top:1620px;width:1080px;text-align:center;z-index:9;opacity:0`, `<span style="display:inline-block;padding:12px 28px 14px;border-radius:18px;background:${CORAL};color:#fff;font-weight:900;font-size:50px">🤳 SELFIES: <span id="n">0</span></span>`);
  const nEl = tag.querySelector("#n");
  E.K(tag, "o", [[SCROLL + .2, 0], [SCROLL + .4, 1], [STAMP - .2, 1], [STAMP, 0]]);
  E.F(t => { nEl.textContent = String(Math.round(47 * seg(t, SCROLL + .3, 2))); });
  for (let t = SCROLL + .3; t < SCROLL + 2.3; t += .12) E.S(t, "tick", .35);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Excuse me! Could you<br>take a photo of us?", { left: 60, top: 820, w: 600, tail: 300, t0: F1, t1: T1 - .05 });
  bubble("Okay! Say<br>cheeeese!", { left: 560, top: 600, w: 420, tail: 250, t0: T1, t1: SNAP - .05, dark: true, size: 56 });
  bubble("Here you go! 👍", { left: 540, top: 700, w: 440, tail: 250, t0: BACK - .5, t1: ROLL, dark: true });
  bubble("…forty-seven<br>selfies.", { left: 280, top: 1400, w: 520, tail: 260, t0: F2, t1: DUR, italic: true, size: 56 });
  E.clip(F1 + .05, "voices/sk34/f1.wav", { vol: 1.5 }); E.clip(T1 + .05, "voices/sk34/t1.wav", { vol: 1.5 }); E.clip(F2 + .05, "voices/sk34/f2.wav", { vol: 1.6 });

  // ================= stamp =================
  const stampBox = E.el(R, "abs", "left:0;top:1640px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "47 SELFIES. 0 OF US.", STAMP, { size: 76, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "“Can you take a *photo* of us?”", { size: 54, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.5)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, SNAP - .2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
