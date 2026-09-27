// SK.33 "No corkscrew? No problem." — a wine-hack video plays on his phone. HACK #1: THE SHOE — thud, thud, a picture falls
// off the wall, the cork moves 0.5 mm. HACK #2: YOUR KEYS — he digs at it with his keyring; the cork turns to crumbs. He
// tosses the keys on the island. HACK #3: JUST PUSH IT IN — SPLASH. Red wine everywhere. His flatmate, deadpan: "…there's a
// corkscrew. On your keys." The keyring's corkscrew unfolds. CORK 1 — HIM 0.
// Voices: Higgsfield TTS (the hack video host; the flatmate). The home bartender stays wordless.
export const meta = {
  id: "sk33-no-corkscrew",
  images: { phone: "cutouts/hb_video.webp", shoe: "cutouts/hb_shoe.webp", keys: "cutouts/hb_hexkey.webp", wine: "cutouts/hb_wine.webp", mate: "cutouts/guy_stare.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", YT = "#ff0033", WINE = "#7a0f2a";
  E.episode(-16);
  const Y1 = .4, H1 = 3.3, Y2 = 3.4, BANG = 5.2, FRAME = 6.9, H2 = 7.8, Y3 = 7.9, DIG = 9.4, TOSS = 10.8, H3 = 11.4, Y4 = 11.5, SPLASH = 13.8, MATE = 15.4, F1 = 15.9, UNFOLD = 17.6, STAMP = 19.2, DUR = 21.8;
  E.music({ bpm: 112, root: 62, seed: 33, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: SPLASH });
  const S = E.scene("kitchen", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const FL = 1860, WT = 1250;

  // ================= a small flat kitchen =================
  E.el(R, "abs", `left:0;top:0;width:1080px;height:${WT}px;background:#f2efe8`);
  E.el(R, "abs", `left:0;top:700px;width:1080px;height:${WT - 700}px;background-color:#e8f0ee;background-image:linear-gradient(#cfdcd8 2px,transparent 2px),linear-gradient(90deg,#cfdcd8 2px,transparent 2px);background-size:90px 45px`);
  // wall cabinets + a shelf with a plant
  E.el(R, "abs", "left:560px;top:360px;width:500px;height:300px;border-radius:8px;background:#7fa89a;box-shadow:inset 0 0 0 10px #6f988a");
  E.el(R, "abs", "left:806px;top:380px;width:6px;height:260px;background:#5f887a");
  [[770, 490], [830, 490]].forEach(([x, y]) => E.el(R, "abs", `left:${x}px;top:${y}px;width:12px;height:50px;border-radius:6px;background:#d8c9a0`));
  // the picture that falls
  const pic = E.el(R, "abs", "left:110px;top:430px;width:220px;height:170px;border:10px solid #b08a3a;background:linear-gradient(170deg,#9ed4f0,#fce3a8);z-index:1;transform-origin:50% 0");
  pic.innerHTML = `<svg viewBox="0 0 200 150" width="200" height="150"><path d="M0 110 L60 60 L100 90 L140 50 L200 100 V150 H0 Z" fill="#6aa04c"/><circle cx="160" cy="36" r="16" fill="#fff4c4"/></svg>`;
  E.K(pic, "r", [[BANG + .4, 0], [BANG + .5, 8], [BANG + 1.1, -6], [FRAME, 4], [FRAME + .15, 20]]);
  E.K(pic, "y", [[FRAME, 0], [FRAME + .45, 1180, "in"]]); E.K(pic, "o", [[FRAME + .44, 1], [FRAME + .46, 0]]);
  E.clip(FRAME + .45, "sfx/elx-glass-smash.wav", { vol: .6 });
  const nail = E.el(R, "abs", "left:214px;top:420px;width:12px;height:12px;border-radius:50%;background:#555");
  // a crack spreading on the wall where he whacks
  const crack = E.el(R, "abs", "left:10px;top:820px;width:200px;height:220px;opacity:0");
  crack.innerHTML = `<svg viewBox="0 0 200 220" width="200" height="220" fill="none" stroke="#6a6a6a" stroke-width="4" stroke-linecap="round"><path d="M20 110 L60 90 L80 40 L110 20 M60 90 L120 110 L170 90 M120 110 L130 170 L100 210 M80 40 L60 10"/></svg>`;
  E.K(crack, "o", [[BANG + .4, 0], [BANG + .5, .5], [BANG + 1.3, .9]]);
  // the back counter, the island (front right), floor
  E.el(R, "abs", `left:0;top:${WT}px;width:1080px;height:40px;background:#e4ddd0;box-shadow:0 6px 0 #cfc6b6`);
  E.el(R, "abs", `left:0;top:${WT + 40}px;width:1080px;height:${FL - WT - 40}px;background:#7fa89a;background-image:linear-gradient(90deg,#6f988a 4px,transparent 4px);background-size:270px 100%`);
  E.el(R, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background:#c9b08a`);
  const kettle = E.el(R, "abs", `left:420px;top:${WT - 130}px;width:130px;height:130px`);
  kettle.innerHTML = `<svg viewBox="0 0 130 130" width="130" height="130"><path d="M20 40 H100 L110 125 H10 Z" fill="#e05a4a"/><path d="M100 60 Q128 60 124 90" stroke="#e05a4a" stroke-width="10" fill="none"/><rect x="45" y="22" width="30" height="20" rx="6" fill="#333"/></svg>`;

  // ================= him =================
  const POSE = { phone: [313, 1000, 1180], shoe: [667, 987, 1165], keys: [611, 967, 1000], wine: [368, 1002, 1180] };
  const him = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:3");
  const himIn = E.el(him, "abs", "left:0;top:0;width:1080px;height:1920px");
  const hEls = Object.fromEntries(Object.entries(POSE).map(([n, [w, h, H]]) => { const W = w * H / h, cx = n === "shoe" ? 300 : 330; return [n, E.img(himIn, n, `position:absolute;left:${cx - W / 2}px;top:${FL + 20 - H}px;width:${W}px;height:${H}px`)]; }));
  const HP = [[0, "phone"], [Y2 + .2, "shoe"], [Y3 + .2, "keys"], [SPLASH, "wine"]];
  E.F(t => {
    const f = at(HP, t); for (const n in hEls) hEls[n].style.opacity = n === f ? 1 : 0;
    let y = Math.sin(t * 2) * 3, x = 0, r = 0;
    if (f === "shoe" && t >= BANG) { const k = (t - BANG) % .42; x = -Math.sin(k / .42 * Math.PI) * 30; r = -Math.sin(k / .42 * Math.PI) * 3; }
    if (f === "keys") { x = Math.sin(t * 30) * 3; if (t >= Y4 + .6) { y += 8 * Math.abs(Math.sin(t * 9)); r = Math.sin(t * 24) * 1.5; } }
    for (const [k] of HP.slice(1)) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 18;
    himIn.style.transform = `translate(${x}px,${y}px) rotate(${r}deg)`;
  });
  for (let t = BANG, i = 0; t < H2 - .3; t += .42, i++) { E.S(t + .2, "thud", .8); if (i % 2 === 0) E.shake(t + .2, 6, .15); }

  // ================= the kitchen island + flatmate =================
  const MH = 760, MW = MH * 873 / 1030;
  const mate = E.el(R, "abs", `left:1080px;top:${1560 - MH + 100}px;width:${MW}px;height:${MH}px;z-index:4`);
  E.img(mate, "mate", `width:${MW}px;height:${MH}px`);
  E.K(mate, "x", [[MATE, 0], [MATE + .5, -MW + 60, "out"]]); E.S(MATE, "swish", .6);
  const island = E.el(R, "abs", "left:640px;top:1560px;width:460px;height:360px;z-index:5;background:#e4ddd0;box-shadow:inset 0 30px 0 #f2ede4,0 -6px 20px rgba(0,0,0,.15)");
  E.el(island, "abs", "left:0;top:30px;width:460px;height:330px;background:#6f988a;background-image:linear-gradient(90deg,#5f887a 4px,transparent 4px);background-size:150px 100%");
  // the keys, tossed onto the island (the corkscrew is on the ring all along)
  const keys = E.el(R, "abs", "left:760px;top:1500px;width:200px;height:120px;z-index:6;opacity:0");
  keys.innerHTML = `<svg viewBox="0 0 200 120" width="200" height="120"><circle cx="60" cy="60" r="26" fill="none" stroke="#c0c0c8" stroke-width="7"/>` +
    `<path d="M80 50 L150 40 L152 52 L140 54 L142 62 L132 62 L134 70 L82 72 Z" fill="#d8b04a"/><path d="M40 80 L10 110 L20 116 L28 108 L34 112 L44 100 Z" fill="#b8b8c0"/>` +
    `<g id="tool" transform="translate(66 78)"><rect x="0" y="-10" width="80" height="22" rx="11" fill="#c8102e"/><path d="M10 0 h20" stroke="#fff" stroke-width="4"/><g id="screw"><path d="M60 0 Q70 -8 64 -16 Q58 -24 68 -32 Q78 -40 70 -48" stroke="#c0c0c8" stroke-width="6" fill="none" stroke-linecap="round"/></g></g></svg>`;
  E.K(keys, "o", [[TOSS, 0], [TOSS + .05, 1]]); E.K(keys, "x", [[TOSS, -420], [TOSS + .45, 0, "out"]]); E.K(keys, "y", [[TOSS, -300], [TOSS + .25, -380, "out"], [TOSS + .45, 0, "in"]]); E.K(keys, "r", [[TOSS, -200], [TOSS + .45, 0, "out"]]);
  E.S(TOSS + .45, "tick", .9); E.clip(TOSS + .45, "sfx/elx-ice-clink.wav", { vol: .5, to: .4 });
  const screw = keys.querySelector("#screw");
  E.F(t => { screw.setAttribute("transform", `rotate(${-150 + 150 * seg(t, UNFOLD, .35)} 60 0)`); screw.style.opacity = t >= UNFOLD ? 1 : 0; });
  // a zoom ring on the keys at the reveal
  const ring = E.el(R, "abs", `left:740px;top:1440px;width:240px;height:240px;border-radius:50%;border:8px solid ${GOLD};z-index:7;opacity:0;box-shadow:0 0 30px ${GOLD}`);
  E.K(ring, "o", [[UNFOLD - .1, 0], [UNFOLD, 1], [DUR, 1]]); E.K(ring, "s", [[UNFOLD - .1, 2], [UNFOLD + .25, 1, "out"]]);
  E.K(keys, "s", [[UNFOLD - .1, 1], [UNFOLD + .3, 1.35, "back"]]); E.clip(UNFOLD + .1, "sfx/elx-cabin-ding.wav", { vol: .8 });

  // ================= the bottle close-up (cork meter) =================
  const cu = E.el(R, "abs", "left:650px;top:700px;width:380px;height:520px;border-radius:30px;background:rgba(255,255,255,.92);box-shadow:0 20px 50px rgba(0,0,0,.25);z-index:6;opacity:0;overflow:hidden");
  cu.innerHTML = `<svg viewBox="0 0 380 520" width="380" height="520"><defs><clipPath id="neck"><rect x="150" y="60" width="80" height="400"/></clipPath></defs>` +
    `<path d="M150 40 H230 V200 Q300 240 300 320 V520 H80 V320 Q80 240 150 200 Z" fill="#2a3a24"/><rect x="150" y="40" width="80" height="40" fill="#8a1a2a"/>` +
    `<rect x="160" y="210" width="60" height="310" fill="${WINE}" opacity=".9"/><rect x="96" y="340" width="188" height="120" rx="6" fill="#f2ead6"/><text x="190" y="392" text-anchor="middle" font-family="Noto Sans" font-weight="800" font-size="26" fill="${WINE}">VINO</text><text x="190" y="424" text-anchor="middle" font-family="Noto Sans" font-size="18" fill="#6a5a4a">Tinto · 2024</text>` +
    `<g clip-path="url(#neck)"><rect id="cork" x="158" y="60" width="64" height="90" rx="8" fill="#c9965a"/><g id="crumbs">${Array.from({ length: 10 }, (_, i) => `<circle cx="${165 + (i * 23) % 55}" cy="${70 + (i * 17) % 60}" r="${4 + i % 3}" fill="#b07a40"/>`).join("")}</g></g></svg>` +
    `<div id="lab" style="position:absolute;left:0;top:10px;width:380px;text-align:center;font-weight:900;font-size:30px;color:${INK}"></div>`;
  const cork = cu.querySelector("#cork"), crumbs = cu.querySelector("#crumbs"), lab = cu.querySelector("#lab");
  E.K(cu, "o", [[BANG - .2, 0], [BANG, 1], [SPLASH, 1], [SPLASH + .1, 0]]); E.K(cu, "s", [[BANG - .2, .7], [BANG + .1, 1, "back"]]);
  E.F(t => {
    let s;
    if (t < H2) { const mm = Math.min(.5, Math.floor((t - BANG) / .42) * .1); cork.setAttribute("y", 60 - mm * 8); cork.style.opacity = 1; crumbs.style.opacity = 0; s = `CORK MOVED: ${Math.max(0, mm).toFixed(1)} mm`; }
    else if (t < H3) { const c = Math.round(100 * seg(t, DIG, 1.2)); cork.setAttribute("height", 90 - c * .5); cork.setAttribute("y", 60 + c * .5); crumbs.style.opacity = c / 100; s = `CORK: ${c}% CRUMBS`; }
    else { const p = seg(t, Y4 + .6, SPLASH - Y4 - .6); cork.setAttribute("y", 110 + p * 120); s = p < 1 ? `PUSHING… ${Math.round(p * 100)}%` : ""; }
    if (lab.__s !== s) { lab.textContent = s; lab.__s = s; }
  });

  // ================= SPLASH =================
  const splat = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:8;opacity:0;pointer-events:none");
  splat.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920">${[[330, 760, 120], [520, 600, 70], [180, 980, 90], [700, 900, 60], [260, 520, 50], [880, 700, 80], [430, 1100, 60], [120, 700, 40], [620, 1180, 45]].map(([x, y, r], i) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${WINE}" opacity=".85"/>${Array.from({ length: 6 }, (_, k) => `<circle cx="${Math.cos(k + i) * r * 1.5}" cy="${Math.sin(k + i) * r * 1.5}" r="${r * .22}" fill="${WINE}" opacity=".85"/>`).join("")}<rect x="${-r * .15}" y="0" width="${r * .3}" height="${r * 1.8}" rx="${r * .15}" fill="${WINE}" opacity=".8"/></g>`).join("")}</svg>`;
  E.K(splat, "o", [[SPLASH, 0], [SPLASH + .05, 1], [SPLASH + .5, 1], [SPLASH + 1.3, 0]]); E.K(splat, "s", [[SPLASH, .3], [SPLASH + .15, 1, "out"]]);
  E.clip(SPLASH - .05, "sfx/elx-pour-splash.wav", { vol: 1 }); E.S(SPLASH, "splat", 1); E.shake(SPLASH, 18, .35); E.flash(SPLASH, "#ffdddd", .5, .2);
  E.clip(SPLASH + .8, "sfx/record-silence.wav", { vol: .5 });

  // ================= the hack-video UI =================
  const ui = E.el(R, "abs", "left:60px;top:190px;width:960px;z-index:9;display:flex;align-items:center;gap:14px;opacity:0");
  E.el(ui, "", `width:64px;height:44px;border-radius:12px;background:${YT};display:flex;align-items:center;justify-content:center;color:#fff;font-size:26px`, "▶");
  E.el(ui, "", `font-weight:800;font-size:32px;color:${INK}`, "3 WINE HACKS THAT ACTUALLY WORK");
  E.K(ui, "o", [[H1 - .2, 0], [H1, 1], [MATE, 1], [MATE + .2, 0]]);
  const chapter = (txt, t0, t1) => {
    const c = E.el(R, "abs", `left:0;top:520px;width:1080px;text-align:center;z-index:9;opacity:0`, `<span style="display:inline-block;padding:12px 28px 14px;border-radius:14px;background:${YT};color:#fff;font-weight:900;font-size:50px;box-shadow:0 12px 30px rgba(0,0,0,.25)">${txt}</span>`);
    E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, 1.3], [t0 + .25, 1, "back"]]); E.S(t0, "whoosh", .5);
  };
  chapter("HACK #1 · THE SHOE 👟", H1, BANG + .3);
  chapter("HACK #2 · YOUR KEYS 🔑", H2, DIG + .2);
  chapter("HACK #3 · JUST PUSH IT IN 🥄", H3, Y4 + 1.4);
  // the phone speaker bubble for the video host (small, phone-shaped)
  const vbub = (html, t0, t1) => {
    const b = E.el(R, "abs", `left:40px;top:620px;width:560px;z-index:9;transform-origin:120px 100%`);
    const box = E.el(b, "", `position:relative;background:#111;border-radius:26px;padding:14px 22px 18px;box-shadow:0 12px 30px rgba(0,0,0,.35);font-weight:800;font-size:44px;line-height:1.08;color:#fff;text-align:center`, `<span style="color:${YT}">▶</span> ${html}`);
    E.el(box, "abs", "left:100px;bottom:-18px;width:40px;height:40px;background:#111;transform:rotate(45deg);border-radius:6px");
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]);
  };
  vbub("Hey guys! No corkscrew?<br>No problem!", Y1, H1 - .05);
  E.clip(Y1 + .05, "voices/sk33/y1.wav", { vol: 1.4 }); E.clip(Y2 + .05, "voices/sk33/y2.wav", { vol: 1.3 }); E.clip(Y3 + .05, "voices/sk33/y3.wav", { vol: 1.3 }); E.clip(Y4 + .05, "voices/sk33/y4.wav", { vol: 1.3 });
  // the flatmate
  const fb = E.el(R, "abs", `left:420px;top:760px;width:560px;z-index:9;transform-origin:420px 100%`);
  const fbb = E.el(fb, "", `position:relative;background:#1b2330;border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.35);font-weight:800;font-size:52px;line-height:1.08;color:#fff;text-align:center;font-style:italic`, "…there’s a corkscrew.<br>On your keys.");
  E.el(fbb, "abs", "left:398px;bottom:-20px;width:44px;height:44px;background:#1b2330;transform:rotate(45deg);border-radius:6px");
  E.pop(fb, F1, { from: .3, dur: .3 }); E.K(fb, "o", [[F1, 0], [F1 + .08, 1], [STAMP - .1, 1], [STAMP + .1, 0]]); E.S(F1 + .02, "pop", .4);
  E.clip(F1 + .05, "voices/sk33/f1.wav", { vol: 1.5 });

  // ================= stamp =================
  const stampBox = E.el(R, "abs", "left:0;top:700px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "CORK 1 — HIM 0", STAMP, { size: 96, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "No corkscrew? *No problem.*", { size: 56, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, H1 - .2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
