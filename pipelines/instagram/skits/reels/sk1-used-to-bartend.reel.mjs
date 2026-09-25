// SK.1 "He used to bartend." — Sal is mixing at his own house party when a friend in a tropical shirt shoulders him aside:
// "Move. I used to bartend." Bottle flip (barely caught), a shaker that sprays Sal, lime juice in his own eye, a counter of
// bottles that climbs to 11 — then the grand reveal: vodka and orange juice. "Two weeks. Summer 2011."
// Effects only: the words are in bubbles. Built on the Finkavo skit engine (see docs/character-skits.md there).
export const meta = {
  id: "sk1-used-to-bartend",
  images: {
    s_host: "cutouts/sal_host.webp", s_flat: "cutouts/sal_flat.webp",
    f_point: "cutouts/friend_point.webp", f_flip: "cutouts/friend_flip.webp", f_shake: "cutouts/friend_shake.webp",
    f_lime: "cutouts/friend_lime.webp", f_present: "cutouts/friend_present.webp",
    bottle: "props/bottle.webp", carton: "props/carton.webp", shaker: "props/shaker.webp", lime: "props/lime.webp",
    umbrella: "props/umbrella.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff7d63";
  E.episode(-16);
  E.music({ bpm: 112, root: 55, seed: 311, prog: [[0, 4, 7], [5, 9, 12], [2, 5, 9], [7, 11, 14]] });
  const DUR = 15.4;
  const S = E.scene("kitchen", 0, DUR, "light"); E.cur = S;
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };

  const ENTER = 1.0, MOVE = 1.4, FLIP = 3.4, CATCH = 4.6, SHAKE = 5.2, SPLASH = 6.4, LIME = 7.2, MONT = 8.4,
        REVEAL = 10.4, ASK = 11.0, PUNCH = 12.7;
  const TOP = 1390, FEET = 1500;              // counter top; characters are cut at the waist, their bottoms hidden behind it

  // ---------------- the kitchen ----------------
  E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#f3e2c4 0%,#ecd3aa 70%,#e3c393 100%)");
  // azulejo backsplash behind the counter
  E.el(S.el, "abs", `left:0;top:${TOP - 420}px;width:1080px;height:420px;background-color:#f7f3ea;` +
    "background-image:radial-gradient(circle at 50% 50%,#2f6db5 0 16px,transparent 17px),radial-gradient(circle at 0 0,#2f6db5 0 22px,transparent 23px)," +
    "radial-gradient(circle at 100% 0,#2f6db5 0 22px,transparent 23px),radial-gradient(circle at 0 100%,#2f6db5 0 22px,transparent 23px),radial-gradient(circle at 100% 100%,#2f6db5 0 22px,transparent 23px)," +
    "linear-gradient(#d9e3ef 2px,transparent 2px),linear-gradient(90deg,#d9e3ef 2px,transparent 2px);background-size:90px 90px;opacity:.9");
  // upper cabinets and a window at night
  for (let i = 0; i < 3; i++) E.el(S.el, "abs", `left:${520 + i * 190}px;top:430px;width:176px;height:420px;background:#8fa98a;border-radius:10px;box-shadow:inset 0 0 0 10px #7f9a7a`);
  const win = E.el(S.el, "abs", "left:60px;top:430px;width:400px;height:420px;background:linear-gradient(180deg,#1b2440,#34406b);border:14px solid #fff8ec;border-radius:12px;overflow:hidden");
  for (let i = 0; i < 14; i++) E.el(win, "abs", `left:${(i * 53) % 360 + 8}px;top:${200 + (i * 37) % 180}px;width:14px;height:20px;background:#ffd98a;opacity:${.5 + (i % 3) * .2}`);
  E.el(win, "abs", "left:180px;top:0;width:14px;height:420px;background:#fff8ec");
  // party string lights (they twinkle from frame 0)
  const bulbs = [];
  for (let i = 0; i < 12; i++) {
    const x = 40 + i * 90, y = 200 + Math.sin(i / 11 * Math.PI) * 60;
    const b = E.el(S.el, "abs", `left:${x}px;top:${y}px;width:30px;height:38px;border-radius:50% 50% 45% 45%;background:${["#ffd35c", "#ff8f6b", "#8fe3c0"][i % 3]};box-shadow:0 0 26px ${["#ffd35c", "#ff8f6b", "#8fe3c0"][i % 3]}`);
    bulbs.push(b);
  }
  E.el(S.el, "abs", "left:0;top:180px;width:1080px;height:120px;border-bottom:3px solid #5b4a3a;border-radius:0 0 50% 50%;opacity:.6");
  E.F(t => bulbs.forEach((b, i) => { b.style.opacity = .55 + .45 * Math.abs(Math.sin(t * 2.2 + i * 1.3)); }));

  // ---------------- Sal (left) ----------------
  const SH = 900;
  const sal = E.el(S.el, "abs", `left:0;top:0;width:1080px;height:1920px;z-index:2`);
  const salIn = E.el(sal, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:260px 1500px");
  const salImgs = { s_host: [827, 1104], s_flat: [733, 1105] };
  const salEls = Object.entries(salImgs).map(([n, [w, h]]) => {
    const W = w * SH / h; return [n, E.img(salIn, n, `position:absolute;left:${260 - W / 2}px;top:${FEET - SH}px;width:${W}px;height:${SH}px`)];
  });
  E.F(t => { const f = at([[0, "s_host"], [MOVE + .5, "s_flat"]], t); salEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; }); });
  E.K(sal, "x", [[MOVE + .3, 0], [MOVE + .6, -70, "out"]]);        // shouldered aside
  E.F(t => { salIn.style.transform = `rotate(${t < MOVE + .3 ? Math.sin(t * 3) * 1.2 : 0}deg)`; });
  // orange splash on Sal's face (stays)
  const drips = [];
  const SPOTS = [[196, 640, 30], [300, 660, 22], [228, 760, 18], [318, 790, 26], [176, 820, 20], [262, 850, 16]];   // forehead, cheeks, chin — clear of the eyes
  for (let i = 0; i < SPOTS.length; i++) {
    const [sx, sy, sz] = SPOTS[i];
    const d = E.el(sal, "abs", `left:${sx}px;top:${sy}px;width:${sz}px;height:${sz * 1.35}px;border-radius:50% 50% 50% 50% / 40% 40% 60% 60%;background:rgba(255,167,38,.85);opacity:0;box-shadow:inset -3px -3px 0 rgba(0,0,0,.08)`);
    E.K(d, "o", [[SPLASH + .25 + i * .015, 0], [SPLASH + .3 + i * .015, .95]]);
    E.K(d, "y", [[SPLASH + .4, 0], [DUR, 40 + (i % 3) * 20, "lin"]]);       // slow drip
    drips.push(d);
  }

  // ---------------- the friend (right) ----------------
  const FX = 800, FH = 960;
  const friend = E.el(S.el, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:3");
  const fIn = E.el(friend, "abs", `left:0;top:0;width:1080px;height:1920px;transform-origin:${FX}px ${FEET}px`);
  const fImgs = { f_point: [861, 1124, 1], f_flip: [809, 1053, .95], f_shake: [775, 1132, 1], f_lime: [867, 1122, 1], f_present: [766, 1126, 1] };
  const fEls = Object.entries(fImgs).map(([n, [w, h, k]]) => {
    const H2 = FH * k, W = w * H2 / h;
    return [n, E.img(fIn, n, `position:absolute;left:${FX - W / 2 + 40}px;top:${FEET - H2}px;width:${W}px;height:${H2}px`)];
  });
  const POSES = [[0, "f_point"], [FLIP, "f_flip"], [SHAKE, "f_shake"], [LIME, "f_lime"], [MONT, "f_shake"], [REVEAL, "f_present"]];
  E.F(t => { const f = at(POSES, t); fEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; }); });
  E.K(friend, "x", [[ENTER, 700], [ENTER + .4, 0, "back"]]);
  E.S(ENTER, "whoosh", .8);
  // squash-and-stretch on every pose change, frantic jitter while shaking
  E.F(t => {
    let sx = 1, sy = 1, dx = 0, r = 0;
    for (const [k] of POSES.slice(1)) if (t >= k && t < k + .25) { const u = (t - k) / .25; sy = 1 + .08 * Math.sin(u * Math.PI); sx = 1 - .05 * Math.sin(u * Math.PI); }
    if ((t >= SHAKE && t < SPLASH + .2) || (t >= MONT && t < REVEAL)) { dx = Math.sin(t * 60) * 9; r = Math.sin(t * 47) * 2.2; }
    if (t >= CATCH && t < CATCH + .45) r = Math.sin((t - CATCH) / .45 * Math.PI * 3) * 4 * (1 - (t - CATCH) / .45);
    fIn.style.transform = `translateX(${dx}px) rotate(${r}deg) scale(${sx},${sy})`;
  });
  POSES.slice(1).forEach(([k]) => E.S(k, "swish", .5));

  // ---------------- the counter ----------------
  E.el(S.el, "abs", `left:0;top:${TOP}px;width:1080px;height:54px;background:linear-gradient(180deg,#c99561,#a8723f);z-index:4;box-shadow:0 8px 16px rgba(0,0,0,.18)`);
  const front = E.el(S.el, "abs", `left:0;top:${TOP + 54}px;width:1080px;height:${1920 - TOP - 54}px;background:#8fa98a;z-index:4`);
  for (let i = 0; i < 4; i++) {
    const d = E.el(front, "abs", `left:${24 + i * 262}px;top:30px;width:240px;height:420px;border-radius:12px;box-shadow:inset 0 0 0 10px #7f9a7a`);
    E.el(d, "abs", "left:100px;top:34px;width:40px;height:10px;border-radius:5px;background:#c8b27a");
  }
  // Sal's glass on the counter at the start
  const onCounter = (name, x, h, w, z = 5) => { const el = E.el(S.el, "abs", `left:${x - w / 2}px;top:${TOP + 22 - h}px;width:${w}px;height:${h}px;z-index:${z};transform-origin:50% 100%`); E.img(el, name, `width:${w}px;height:${h}px`); return el; };

  // ---------------- beat 1: the bottle flip ----------------
  const fb = E.el(S.el, "abs", "left:0;top:0;width:60px;height:190px;z-index:6;opacity:0");
  E.img(fb, "bottle", "width:60px;height:190px");
  const HX = 598, HY = 560;                                  // above his raised hand
  E.K(fb, "o", [[FLIP + .05, 0], [FLIP + .1, 1], [CATCH + .6, 1], [CATCH + .7, 0]]);
  E.K(fb, "x", [[FLIP, HX - 30], [CATCH, HX - 30]]);
  E.K(fb, "y", [[FLIP + .1, HY - 60], [FLIP + .7, 240, "out"], [CATCH, HY - 110, "in"], [CATCH + .15, HY - 70, "out"], [CATCH + .3, HY - 110, "in"]]);
  E.K(fb, "r", [[FLIP + .1, 0], [CATCH, 900, "io"], [CATCH + .15, 940, "out"], [CATCH + .45, 900, "io"]]);
  E.S(FLIP + .1, "whoosh", .6); E.S(CATCH, "smack", .7);
  E.clip(CATCH + .05, "sfx/crowd-ooh.wav", { vol: .6 });

  // ---------------- beat 2: the shaker sprays Sal ----------------
  for (let i = 0; i < 10; i++) E.S(SHAKE + .1 + i * .12, i % 2 ? "tick" : "swish", .35);
  const lid = E.el(S.el, "abs", `left:960px;top:640px;width:74px;height:60px;border-radius:40% 40% 12px 12px;background:linear-gradient(90deg,#8d9399,#e8ecef,#9aa1a7);z-index:6;opacity:0`);
  E.K(lid, "o", [[SPLASH, 0], [SPLASH + .02, 1], [SPLASH + .9, 1], [SPLASH + 1, 0]]);
  E.K(lid, "y", [[SPLASH, 0], [SPLASH + .45, -420, "out"], [SPLASH + .9, 300, "in"]]);
  E.K(lid, "x", [[SPLASH, 0], [SPLASH + .9, 160]]);
  E.K(lid, "r", [[SPLASH, 0], [SPLASH + .9, 720]]);
  for (let i = 0; i < 12; i++) {                            // the arc of juice from the shaker to Sal's face
    const g = E.el(S.el, "abs", `left:0;top:0;width:${26 + (i % 3) * 8}px;height:${26 + (i % 3) * 8}px;border-radius:50%;background:#ffa726;z-index:6;opacity:0`);
    const t0 = SPLASH + i * .012, x0 = 960, y0 = 640, x1 = 180 + (i * 37) % 160, y1 = 700 + (i * 29) % 160;
    E.K(g, "o", [[t0, 0], [t0 + .02, 1], [t0 + .32, 1], [t0 + .36, 0]]);
    E.K(g, "x", [[t0, x0], [t0 + .34, x1 + (i - 6) * 4, "lin"]]);
    E.K(g, "y", [[t0, y0], [t0 + .17, y0 - 240 - (i % 4) * 30, "out"], [t0 + .34, y1, "in"]]);
  }
  E.S(SPLASH, "poof", .6); E.clip(SPLASH + .3, "sfx/splash.wav", { vol: .9 }); E.shake(SPLASH + .32, 10, .25);
  E.clip(SPLASH + .45, "sfx/crowd-groan.wav", { vol: .5 });

  // ---------------- beat 3: lime in his own eye ----------------
  for (let i = 0; i < 7; i++) {
    const g = E.el(S.el, "abs", `left:0;top:0;width:14px;height:14px;border-radius:50%;background:#c8f06a;z-index:6;opacity:0`);
    const t0 = LIME + .08 + i * .02;
    E.K(g, "o", [[t0, 0], [t0 + .02, 1], [t0 + .22, 1], [t0 + .26, 0]]);
    E.K(g, "x", [[t0, 480], [t0 + .24, 780 + (i - 3) * 10, "out"]]);
    E.K(g, "y", [[t0, 900], [t0 + .12, 780, "out"], [t0 + .24, 700 + (i % 3) * 12, "in"]]);
  }
  E.clip(LIME + .05, "sfx/squish.wav", { vol: .9 });
  E.S(LIME + .3, "nope", .4);

  // ---------------- montage: the kitchen fills with bottles ----------------
  const junk = [["bottle", 600, 300, 96, MONT], ["carton", 900, 230, 126, MONT + .45], ["lime", 460, 110, 108, MONT + .9], ["shaker", 1010, 250, 126, MONT + 1.35],
    ["bottle", 740, 280, 90, MONT + 1.8]];
  junk.forEach(([n, x, h, w, t]) => { const el = onCounter(n, x, h, w); E.pop(el, t, { from: .3, dy: -60 }); E.S(t + .05, "pop", .6); E.S(t + .1, "tick", .5); });
  E.clip(MONT, "sfx/crowd-murmur.wav", { vol: .35, duck: false });
  E.S(REVEAL - .9, "riser", .7);

  // ---------------- counter pill: BOTTLES OPENED ----------------
  const pill = E.el(S.el, "abs", `left:100px;top:260px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:52px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;transform-origin:0 50%;opacity:0`, "BOTTLES OPENED: 0");
  E.K(pill, "o", [[FLIP - .1, 0], [FLIP, 1], [REVEAL - .05, 1], [REVEAL + .1, 0]]);
  const cnt = t => t < FLIP ? 0 : t < SHAKE ? 1 : t < LIME ? 2 : t < MONT ? 3 : t < MONT + 2.0 ? 4 + Math.floor((t - MONT) / 2.0 * 8) : 11;
  E.F(t => { const s = "BOTTLES OPENED: " + cnt(t); if (pill.textContent !== s) pill.textContent = s; pill.style.background = cnt(t) >= 8 ? CORAL : INK; pill.style.color = cnt(t) >= 8 ? INK : "#fff"; });
  [FLIP, SHAKE, LIME, ...Array.from({ length: 8 }, (_, i) => MONT + i * .25)].forEach(t => E.K(pill, "s", [[t - .01, 1], [t, 1.18], [t + .18, 1, "back"]]));

  // ---------------- the reveal ----------------
  const umb = E.el(S.el, "abs", "left:846px;top:846px;width:104px;height:124px;z-index:6;opacity:0;transform-origin:30% 100%");
  E.img(umb, "umbrella", "width:104px;height:124px");
  E.pop(umb, REVEAL + .35, { from: .2 }); E.K(umb, "r", [[REVEAL + .35, -30], [REVEAL + .7, 8, "back"]]);
  E.S(REVEAL, "ding", .8); E.S(REVEAL + .05, "sparkle", .8); E.flash(REVEAL, "#fff6d8", .45, .25);
  const rays = E.el(S.el, "abs", "left:490px;top:360px;width:600px;height:600px;border-radius:50%;z-index:2;opacity:0;" +
    "background:repeating-conic-gradient(rgba(255,214,110,.55) 0 10deg,transparent 10deg 24deg)");
  E.K(rays, "o", [[REVEAL, 0], [REVEAL + .2, 1], [ASK, 1], [ASK + .15, 0]]);
  E.K(rays, "r", [[REVEAL, 0], [ASK + .2, 40]]);
  E.clip(ASK - .05, "sfx/record-silence.wav", { vol: .8 });

  // ---------------- speech bubbles ----------------
  const bubble = (html, left, top, w, tailX, t0, t1, size = 62) => {
    const b = E.el(S.el, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tailX}px 100%`);
    const box = E.el(b, "", `position:relative;background:#fff;border-radius:36px;padding:22px 30px 26px;box-shadow:0 12px 30px rgba(0,0,0,.2);font-weight:800;font-size:${size}px;line-height:1.06;letter-spacing:-.02em;color:${INK};text-align:center`, html);
    E.el(box, "abs", `left:${tailX - 22}px;bottom:-20px;width:44px;height:44px;background:#fff;transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 });
    E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]);
    E.S(t0 + .02, "pop", .6);
    return b;
  };
  bubble("Move.<br>I used to bartend.", 300, 400, 600, 440, MOVE, 3.25);
  bubble("OW!", 560, 470, 220, 150, LIME + .25, LIME + 1.1, 70);
  bubble("…vodka and<br>orange juice?", 100, 430, 520, 140, ASK, PUNCH - .1);
  bubble("Two weeks.<br>Summer 2011.", 420, 400, 560, 380, PUNCH, DUR);

  // ---------------- title (frame 0) ----------------
  const titleBox = E.el(S.el, "abs", "left:100px;top:258px;width:800px;z-index:8");
  const title = E.text(titleBox, `He *used to* bartend.`, { size: 76, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, FLIP - .25, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[14.55, 1], [14.8, 1.18, "out"], [15.1, 1, "io"]]);
}
