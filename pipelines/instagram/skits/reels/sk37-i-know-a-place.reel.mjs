// SK.37 "I know a place." — outside The Lime Bar, Rico: "Trust me. I know a place. It's just around the corner!" The map:
// the route draws itself — a "shortcut", a bridge, a recalculation, a hill, rain; 0.2 km becomes 4.7 km, the phone drops to
// 3%. "It's literally right here!" — CLOSED. Thanks for 12 amazing years. The couple reaches for his neck. The walk back.
// The Lime Bar's bartender: "Oh! Welcome back!"  Voices: Higgsfield TTS (Rico: Miles; bartender: Brooks).
export const meta = {
  id: "sk37-i-know-a-place",
  images: { point: "cutouts/friend_point.webp", flip: "cutouts/friend_flip.webp", lime: "cutouts/friend_lime.webp", bored: "cutouts/pals_bored.webp", reach: "cutouts/pals_reach.webp", barman: "cutouts/bar_talk.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", NEON = "#9bff6a";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const R1 = .4, MAP = 4.3, RAIN = 8.6, R2 = 10.6, CLOSED = 13.0, BACKMAP = 16.2, HOME = 17.8, B1 = 18.2, STAMP = 19.6, DUR = 22.4;
  E.music({ bpm: 116, root: 62, seed: 37, prog: [[0, 4, 7], [7, 11, 14], [9, 12, 16], [5, 9, 12]], until: CLOSED });
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TABLE = 1520;

  // ================= The Lime Bar, outside (used at the start and the end) =================
  const limeBar = (P, wet) => {
    E.el(P, "abs", `left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#1a1830,#2a2440 50%,#1a1624)`);
    E.el(P, "abs", "left:0;top:560px;width:1080px;height:1000px;background-color:#6a3a2e;background-image:linear-gradient(#5a2e24 4px,transparent 4px),linear-gradient(90deg,#5a2e24 4px,transparent 4px);background-size:120px 50px");
    const win = E.el(P, "abs", "left:120px;top:780px;width:500px;height:420px;border-radius:10px;background:radial-gradient(ellipse at 50% 60%,#ffd98a,#e89a4a 70%);box-shadow:0 0 0 14px #2a1a14,0 0 80px rgba(255,190,90,.5)");
    win.innerHTML = `<svg viewBox="0 0 500 420" width="500" height="420"><g fill="rgba(60,30,20,.55)"><circle cx="120" cy="230" r="40"/><rect x="80" y="270" width="80" height="150" rx="30"/><circle cx="330" cy="220" r="42"/><rect x="290" y="262" width="84" height="160" rx="30"/></g><rect x="0" y="300" width="500" height="18" fill="rgba(60,30,20,.4)"/></svg>`;
    E.el(P, "abs", "left:700px;top:820px;width:260px;height:700px;border-radius:130px 130px 0 0;background:#2a4a3a;box-shadow:0 0 0 14px #1a2a20");
    const sign = E.el(P, "abs", `left:0;top:640px;width:1080px;text-align:center;font-family:'Pacifico','Noto Sans',cursive;font-weight:800;font-size:76px;color:#eaffd8;text-shadow:0 0 12px ${NEON},0 0 34px ${NEON},0 0 60px #4fd03a`, "The Lime Bar 🍋");
    E.F(t => { sign.style.opacity = Math.floor(t * 8) % 29 === 0 ? .5 : 1; });
    E.el(P, "abs", `left:0;top:${TABLE + 220}px;width:1080px;height:200px;background:#2a2a30`);
    E.el(P, "abs", `left:40px;top:${TABLE}px;width:1000px;height:40px;border-radius:12px;background:#8a6a4a;box-shadow:0 10px 0 #5a4430;z-index:5`);
    E.el(P, "abs", `left:500px;top:${TABLE + 40}px;width:40px;height:240px;background:#3a3030;z-index:5`);
    if (wet) {
      const rain = E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6;opacity:.5;background-image:repeating-linear-gradient(105deg,rgba(200,220,255,.5) 0 2px,transparent 2px 40px)");
      E.F(t => { rain.style.backgroundPosition = `${t * 60}px ${t * 900}px`; });
    }
  };

  // ================= scene 1: "I know a place" =================
  const A = E.scene("out1", 0, MAP, "dark"); E.cur = A;
  limeBar(A.el, false);
  const BW = 560, BH = BW * 647 / 953;
  const cpl1 = E.el(A.el, "abs", `left:-20px;top:${TABLE + 60 - BH}px;width:${BW}px;height:${BH}px;z-index:3`);
  E.img(cpl1, "bored", `width:${BW}px;height:${BH}px`);
  const RH = 860, RW = RH * 861 / 1124;
  const rico1 = E.el(A.el, "abs", `left:${760 - RW / 2}px;top:${TABLE + 40 - RH}px;width:${RW}px;height:${RH}px;z-index:4`);
  const rIn1 = E.el(rico1, "abs", `left:0;top:0;width:${RW}px;height:${RH}px;transform-origin:50% 100%`);
  E.img(rIn1, "point", `width:${RW}px;height:${RH}px`);
  E.F(t => { rIn1.style.transform = `translateY(${Math.sin(t * 2.4) * 5}px) rotate(${Math.sin(t * 1.7) * 1.5}deg)`; });

  // ================= scene 2: the map =================
  const M = E.scene("map", MAP, CLOSED, "dark"); E.cur = M; const Q = M.el;
  E.wipe(MAP);
  E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:#1c2230");
  const PTS = [[250, 1560], [250, 1400], [420, 1400], [420, 1500], [640, 1500], [640, 1250], [300, 1250], [300, 1040], [520, 900], [760, 900], [760, 1120], [900, 1120], [900, 760], [620, 700], [620, 560], [820, 480]];
  const d = "M" + PTS.map(p => p.join(" ")).join(" L");
  const map = E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px");
  let blocks = ""; for (let y = 380; y < 1760; y += 110) for (let x = 20; x < 1060; x += 130) if ((x * 7 + y * 3) % 5) blocks += `<rect x="${x}" y="${y}" width="${100 - (x + y) % 23}" height="${80 - (x * y) % 17}" rx="10" fill="#262e40"/>`;
  map.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920">${blocks}` +
    `<path d="M-40 1180 Q300 1080 540 1150 T1120 1060" stroke="#2a5a8a" stroke-width="80" fill="none"/><text x="120" y="1150" font-family="Noto Sans" font-size="26" fill="#6a9ac8" transform="rotate(-8 120 1150)">RIVER</text>` +
    `<rect x="560" y="590" width="300" height="200" rx="30" fill="#2a4a32"/><text x="610" y="700" font-family="Noto Sans" font-size="26" fill="#6ab07a">PARK</text>` +
    `<path d="M540 1090 V1210" stroke="#8a8a9a" stroke-width="30"/>` +
    `<path id="route" d="${d}" stroke="#4ea0ff" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" pathLength="1" style="stroke-dasharray:1;stroke-dashoffset:1;filter:drop-shadow(0 0 8px #4ea0ff)"/>` +
    `<path id="home" d="M820 480 L250 1560" stroke="${CORAL}" stroke-width="12" fill="none" stroke-dasharray="1" stroke-dashoffset="1" pathLength="1" stroke-linecap="round"/></svg>`;
  const route = map.querySelector("#route"), home = map.querySelector("#home");
  const WALK0 = MAP + .5, WALK1 = R2;
  E.K(route, "draw", [[WALK0, 0], [WALK1, 1, "io"]]);
  E.K(home, "draw", [[BACKMAP + .2, 0], [BACKMAP + 1.3, 1, "lin"]]);
  // pins
  const pin = (x, y, label, col) => { const p = E.el(Q, "abs", `left:${x - 30}px;top:${y - 70}px;z-index:3;text-align:center`); p.innerHTML = `<div style="width:60px;height:60px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${col};box-shadow:0 6px 14px rgba(0,0,0,.4)"></div><div style="position:absolute;left:-120px;top:66px;width:300px;font-weight:800;font-size:28px;color:#fff;text-shadow:0 2px 6px #000">${label}</div>`; return p; };
  pin(250, 1560, "🍋 The Lime Bar", NEON);
  const dest = pin(820, 480, "📍 “the place”", CORAL);
  // the group marker (Rico's face in a circle)
  const mk = E.el(Q, "abs", "left:0;top:0;width:96px;height:96px;border-radius:50%;overflow:hidden;border:6px solid #fff;box-shadow:0 0 0 6px #4ea0ff,0 10px 20px rgba(0,0,0,.5);z-index:4;background:#f2c9a0");
  E.img(mk, "point", "position:absolute;left:-46px;top:-6px;width:190px;height:auto");
  const L = route.getTotalLength();
  E.F(t => {
    let pt;
    if (t < BACKMAP) { const p = seg(t, WALK0, WALK1 - WALK0); const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; pt = route.getPointAtLength(e * L); }
    else { const p = seg(t, BACKMAP + .2, 1.1); pt = { x: 820 + (250 - 820) * p, y: 480 + (1560 - 480) * p }; }
    mk.style.transform = `translate(${pt.x - 48}px,${pt.y - 48}px)`;
  });
  // the HUD: distance, time, battery, weather
  const hud = E.el(Q, "abs", "left:60px;top:360px;width:960px;display:flex;gap:14px;z-index:5;flex-wrap:wrap");
  const chip = () => E.el(hud, "", "padding:10px 20px;border-radius:18px;background:rgba(255,255,255,.95);font-weight:900;font-size:36px;color:" + INK + ";font-variant-numeric:tabular-nums");
  const cD = chip(), cT = chip(), cB = chip(), cW = chip();
  E.F(t => {
    const p = t < BACKMAP ? seg(t, WALK0, WALK1 - WALK0) : 1 + seg(t, BACKMAP + .2, 1.1);
    cD.textContent = `🚶 ${(p * 4.7).toFixed(1)} km`; cD.style.color = p > .15 ? "#c8102e" : INK;
    const m = 22 * 60 + 10 + Math.round(p * 98); cT.textContent = `🕙 ${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    const b = Math.max(1, Math.round(34 - p * 31)); cB.textContent = `🔋 ${b}%`; cB.style.color = b < 10 ? "#c8102e" : INK;
    cW.textContent = t >= RAIN ? "🌧 11°" : "☁️ 14°";
  });
  const promise = E.el(Q, "abs", `left:60px;top:470px;padding:10px 20px;border-radius:16px;background:${GOLD};font-weight:900;font-size:34px;color:${INK};z-index:5`, "“just around the corner” (0.2 km)");
  E.K(promise, "o", [[MAP + .4, 0], [MAP + .6, 1], [MAP + 3.2, 1], [MAP + 3.6, 0]]);
  // commentary chips popping along the route
  [["↪ “shortcut!”", 470, 1560, .14], ["🌉 “it’s across the bridge”", 180, 1300, .34], ["🔁 recalculating…", 560, 830, .55], ["⛰ “almost there”", 700, 1180, .68], ["🤔 “was it left?”", 560, 620, .86]].forEach(([s, x, y, f]) => {
    const t0 = WALK0 + f * (WALK1 - WALK0);
    const c = E.el(Q, "abs", `left:${x}px;top:${y}px;padding:8px 18px;border-radius:14px;background:#fff;font-weight:800;font-size:32px;color:${INK};z-index:5;opacity:0;white-space:nowrap;box-shadow:0 8px 20px rgba(0,0,0,.4)`, s);
    E.pop(c, t0, { from: .4, dur: .3 }); E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t0 + 1.6, 1], [t0 + 1.9, 0]]); E.S(t0, "pop", .4);
  });
  const rainM = E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6;opacity:0;background-image:repeating-linear-gradient(105deg,rgba(200,220,255,.45) 0 2px,transparent 2px 38px)");
  E.K(rainM, "o", [[RAIN, 0], [RAIN + .4, .6]]); E.F(t => { rainM.style.backgroundPosition = `${t * 60}px ${t * 900}px`; });
  E.clip(RAIN, "sfx/rain-heavy.wav", { vol: .35, to: CLOSED - RAIN + 3, duck: true }); E.S(RAIN, "crack", .5);
  // Rico's inset near the pin: "It's literally right here!"
  const ins = E.el(Q, "abs", `left:40px;top:560px;width:300px;height:300px;border-radius:50%;overflow:hidden;border:8px solid #fff;z-index:7;opacity:0;background:#2a3040`);
  E.img(ins, "flip", "position:absolute;left:-40px;top:0;width:380px;height:auto");
  E.K(ins, "o", [[R2 - .2, 0], [R2, 1], [CLOSED, 1]]); E.K(ins, "s", [[R2 - .2, .4], [R2 + .15, 1, "back"]]);
  // scene 2b: the return (drawn on the same map) comes after the closed shopfront, so it's its own scene below

  // ================= scene 3: CLOSED =================
  const C = E.scene("closed", CLOSED, BACKMAP, "dark"); E.cur = C; const K = C.el;
  E.wipe(CLOSED);
  E.el(K, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#141824,#20263a)");
  const shop = E.el(K, "abs", "left:90px;top:520px;width:900px;height:1000px");
  shop.innerHTML = `<svg viewBox="0 0 900 1000" width="900" height="1000"><rect x="0" y="0" width="900" height="1000" fill="#3a3a44"/><rect x="0" y="0" width="900" height="140" fill="#2a2a32"/><text x="450" y="95" text-anchor="middle" font-family="Noto Sans" font-weight="900" font-size="64" fill="#6a6a78">THE HIDDEN GEM</text>` +
    Array.from({ length: 22 }, (_, i) => `<rect x="60" y="${170 + i * 36}" width="780" height="30" fill="${i % 2 ? "#8a8a96" : "#9a9aa6"}"/>`).join("") +
    `<rect x="220" y="360" width="460" height="300" rx="10" fill="#fffbe8" transform="rotate(-3 450 510)"/><text x="450" y="450" text-anchor="middle" font-family="Noto Sans" font-weight="900" font-size="64" fill="#c8102e" transform="rotate(-3 450 510)">CLOSED</text>` +
    `<text x="450" y="520" text-anchor="middle" font-family="Noto Sans" font-weight="700" font-size="30" fill="#333" transform="rotate(-3 450 510)">PERMANENTLY.</text><text x="450" y="580" text-anchor="middle" font-family="Noto Sans" font-size="26" fill="#333" transform="rotate(-3 450 510)">Thanks for 12 amazing years ❤</text></svg>`;
  const rainC = E.el(K, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6;opacity:.55;background-image:repeating-linear-gradient(105deg,rgba(200,220,255,.45) 0 2px,transparent 2px 38px)");
  E.F(t => { rainC.style.backgroundPosition = `${t * 60}px ${t * 900}px`; });
  const rico3 = E.el(K, "abs", `left:${720 - RW / 2}px;top:${1940 - RH}px;width:${RW}px;height:${RH}px;z-index:4`);
  E.img(rico3, "lime", `width:${RW}px;height:${RH}px`);
  const PRW = 620, PRH = PRW * 588 / 938;
  const reach = E.el(K, "abs", `left:-60px;top:${1940 - PRH}px;width:${PRW}px;height:${PRH}px;z-index:5`);
  E.img(reach, "reach", `width:${PRW}px;height:${PRH}px`);
  E.K(reach, "x", [[CLOSED + 1.2, -300], [CLOSED + 1.8, 0, "out"]]); E.K(reach, "y", [[CLOSED + 1.2, 200], [CLOSED + 1.8, 0, "out"]]);
  E.S(CLOSED + .1, "nope", .8); E.clip(CLOSED + .1, "sfx/crowd-groan.wav", { vol: .5 });

  // ================= scene 4: the walk back (map) =================
  const D = E.scene("mapback", BACKMAP, HOME, "dark"); E.cur = D;
  E.wipe(BACKMAP);
  E.el(D.el, "abs", "left:0;top:0;width:1080px;height:1920px;background:#1c2230");
  const back = E.el(D.el, "abs", "left:0;top:0;width:1080px;height:1920px");
  back.innerHTML = map.innerHTML.replace('id="route"', 'id="r2"').replace('id="home"', 'id="h2"');
  const r2 = back.querySelector("#r2"), h2 = back.querySelector("#h2");
  r2.style.strokeDashoffset = 0; r2.style.opacity = .5;
  E.K(h2, "draw", [[BACKMAP + .3, 0], [HOME - .2, 1, "lin"]]);
  const mk2 = E.el(D.el, "abs", "left:0;top:0;width:96px;height:96px;border-radius:50%;overflow:hidden;border:6px solid #fff;box-shadow:0 0 0 6px " + CORAL + ";z-index:4;background:#f2c9a0");
  E.img(mk2, "lime", "position:absolute;left:-46px;top:-6px;width:190px;height:auto");
  E.F(t => { const p = seg(t, BACKMAP + .3, HOME - BACKMAP - .5); mk2.style.transform = `translate(${820 + (250 - 820) * p - 48}px,${480 + (1560 - 480) * p - 48}px)`; });
  E.el(D.el, "abs", `left:0;top:420px;width:1080px;text-align:center;z-index:5`, `<span style="display:inline-block;padding:12px 26px;border-radius:18px;background:${CORAL};color:#fff;font-weight:900;font-size:48px">↩ 4.7 km back. 🌧</span>`);
  const rainD = E.el(D.el, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6;opacity:.5;background-image:repeating-linear-gradient(105deg,rgba(200,220,255,.45) 0 2px,transparent 2px 38px)");
  E.F(t => { rainD.style.backgroundPosition = `${t * 60}px ${t * 900}px`; });

  // ================= scene 5: back at The Lime Bar =================
  const F = E.scene("out2", HOME, DUR, "dark"); E.cur = F;
  E.wipe(HOME);
  limeBar(F.el, true);
  const cpl2 = E.el(F.el, "abs", `left:-20px;top:${TABLE + 60 - BH}px;width:${BW}px;height:${BH}px;z-index:3;filter:saturate(.8) brightness(.9)`);
  E.img(cpl2, "bored", `width:${BW}px;height:${BH}px`);
  const BMH = 900, BMW = BMH * 827 / 1111;
  const bm = E.el(F.el, "abs", `left:${800 - BMW / 2}px;top:${TABLE + 40 - BMH}px;width:${BMW}px;height:${BMH}px;z-index:4`);
  E.img(bm, "barman", `width:${BMW}px;height:${BMH}px`);
  E.K(bm, "x", [[HOME + .3, 400], [HOME + .7, 0, "out"]]);

  // ================= bubbles & voices =================
  const bubble = (P, html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(P, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble(A.el, "Trust me. I know a place.<br>It’s just around the corner!", { left: 180, top: 420, w: 720, tail: 520, t0: R1, t1: MAP });
  bubble(M.el, "It’s literally<br>right here!", { left: 300, top: 600, w: 440, tail: 60, t0: R2, t1: CLOSED });
  bubble(F.el, "Oh! Welcome back!", { left: 440, top: 460, w: 520, tail: 340, t0: B1, t1: DUR, dark: true, size: 54 });
  E.clip(R1 + .05, "voices/sk37/r1.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk37/r2.wav", { vol: 1.5 }); E.clip(B1 + .05, "voices/sk37/b1.wav", { vol: 1.5 });
  E.clip(0, "sfx/crowd-murmur.wav", { vol: .25, to: MAP, duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(F.el, "abs", "left:0;top:1320px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "9.4 km. 0 NEW BARS.", STAMP, { size: 76, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  E.cur = A;
  const titleBox = E.el(A.el, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "“I know a *place.*”", { size: 70, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
