// SK.63 "How I dance after 4 drinks." — head vs reality. Rico, at the edge of the dance floor: "Alright. Watch this."
// IN MY HEAD: spotlight, gold sparkles, slow-mo, the crowd going wild — the point. "I've still got it." REALITY (record
// scratch): knees bent, arms like wet noodles, cocktail flying onto a stranger. IN MY HEAD: the flying split, a standing
// ovation. REALITY: the worm. On the floor. Like a fish. "…Ow." The music stops. The DJ, into the mic: "Mate… what was that?"
// The friends: "…Should we call someone?" "Let him have this." IN MY HEAD: A LEGEND.
// Voices: ElevenLabs (Rico: Liam; DJ: Brian; Nina: Sarah; Jess: Jessica).
export const meta = {
  id: "sk63-how-i-dance",
  images: { club: "bg/club.jpg", point: "cutouts/dance_point.webp", split: "cutouts/dance_split.webp", flail: "cutouts/dance_flail.webp", worm: "cutouts/dance_worm.webp",
    dj: "cutouts/dj_stare.webp", crowd: "cutouts/crowd_hands.webp", friends: "cutouts/friends5_shock.webp", stand: "cutouts/friend_point.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", VIOLET = "#9b5cff";
  E.episode(-16);
  const R1 = .6, H1 = 2.4, R2 = 3.4, Q1 = 6.0, H2 = 9.4, Q2 = 12.8, OW = 13.8, STOP = 15.2, D1 = 15.6, N1 = 17.5, J1 = 18.8, STAMP = 20.2, DUR = 23.6;
  // phases: 0 = normal, 1 = head (fantasy), 2 = reality
  const PH = [[0, 0], [H1, 1], [Q1, 2], [H2, 1], [Q2, 2]];
  const ph = t => { let p = 0; for (const [k, v] of PH) if (t >= k) p = v; return p; };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const S = E.scene("club", 0, DUR, "dark"); E.cur = S; const R = S.el;

  const bg = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "club", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 60%");
  E.F(t => { const p = ph(t); bgI.style.transform = `scale(${1.05 + (p === 1 ? .04 + Math.sin(t) * .01 : 0)})`; bgI.style.filter = p === 1 ? "saturate(1.4) brightness(1.1) hue-rotate(-20deg)" : t >= STOP ? "brightness(.8) saturate(.5)" : "none"; });
  // fantasy overlays: a warm spotlight + gold sparkles; reality: harsh flat light
  const spot = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:2;pointer-events:none;background:radial-gradient(ellipse 380px 900px at 50% 70%,rgba(255,230,160,.45),rgba(0,0,0,.55) 80%)");
  const sparkles = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:5;pointer-events:none");
  const SP = Array.from({ length: 26 }, (_, i) => E.el(sparkles, "abs", `left:${(i * 131) % 1040}px;top:0;font-size:${30 + (i % 4) * 12}px;opacity:0`, i % 3 ? "✨" : "⭐"));
  E.F(t => { const f = ph(t) === 1; spot.style.opacity = f ? 1 : 0; SP.forEach((s, i) => { s.style.opacity = f ? .9 : 0; if (f) s.style.transform = `translateY(${((t * (120 + (i % 5) * 40) + i * 260) % 2000) - 80}px) rotate(${t * 90 + i * 30}deg)`; }); });
  const tag = E.el(R, "abs", `left:40px;top:360px;padding:12px 26px;border-radius:18px;font-weight:900;font-size:46px;z-index:9;letter-spacing:.04em`);
  E.F(t => { const p = ph(t); const h = p === 1 ? "💭 IN MY HEAD" : p === 2 ? "📹 REALITY" : "🍹 DRINKS: 4"; if (tag.textContent !== h) tag.textContent = h; tag.style.background = p === 1 ? VIOLET : p === 2 ? CORAL : INK; tag.style.color = "#fff"; });
  [H1, H2].forEach(t => { E.flash(t, "#fff4c0", .6, .25); E.S(t, "sparkle", .8); E.clip(t, "sfx/elx-slowmo.wav", { vol: .5, to: 1.6 }); E.clip(t + .2, "sfx/applause-cheer.wav", { vol: .5, to: 3 }); });
  [Q1, Q2].forEach(t => { E.clip(t - .05, "sfx/record-silence.wav", { vol: .8, to: .9 }); E.flash(t, "#ffffff", .5, .1); E.shake(t, 10, .25); });

  // ================= the crowd (fantasy) and the friends (reality) =================
  const crowd = E.el(R, "abs", "left:-40px;top:1400px;width:1160px;height:784px;z-index:6;opacity:0");
  const cIn = E.el(crowd, "abs", "left:0;top:0;width:1160px;height:784px;transform-origin:50% 100%");
  E.img(cIn, "crowd", "width:1160px;height:784px");
  E.F(t => { const f = ph(t) === 1; crowd.style.opacity = f ? 1 : 0; if (f) cIn.style.transform = `translateY(${-Math.abs(Math.sin(t * 6)) * 24}px)`; });
  const FH = 560, FW = FH * 1013 / 910;
  const friends = E.el(R, "abs", `left:${1080 - FW + 40}px;top:${1680 - FH}px;width:${FW}px;height:${FH}px;z-index:3;opacity:0`);
  E.img(friends, "friends", `width:${FW}px;height:${FH}px`);
  E.F(t => { friends.style.opacity = ph(t) === 2 && t >= Q2 + .4 ? 1 : 0; });
  // the DJ, at the back
  const DJH = 520, DJW = DJH * 688 / 988;
  const dj = E.el(R, "abs", `left:${540 - DJW / 2}px;top:600px;width:${DJW}px;height:${DJH}px;z-index:1;opacity:0`);
  E.img(dj, "dj", `width:${DJW}px;height:${DJH}px`);
  E.K(dj, "o", [[STOP - .1, 0], [STOP, 1]]); E.K(dj, "y", [[STOP - .1, 80], [STOP + .3, 0, "out"]]);

  // ================= Rico =================
  const RICO = { stand: [861, 1124, 1000, 540, 1990, [[0, H1]]], point: [542, 975, 1080, 540, 1990, [[H1, Q1]]], flail: [649, 903, 1000, 520, 1990, [[Q1, H2]]],
    split: [671, 398, 520, 540, 1480, [[H2, Q2]]], worm: [925, 274, 290, 500, 1930, [[Q2, DUR]]] };
  const rEls = Object.entries(RICO).map(([n, [w, h, H, cx, bottom, wins]]) => {
    const W = H * w / h;
    const e = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${n === "worm" ? 7 : 4};opacity:0`);
    const eIn = E.el(e, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`);
    E.img(eIn, n === "stand" ? "stand" : n, `width:${W}px;height:${H}px`);
    return [n, e, eIn, wins];
  });
  E.F(t => rEls.forEach(([n, e, eIn, wins]) => {
    const on = wins.some(([a, b]) => t >= a && t < b); e.style.opacity = on ? 1 : 0; if (!on) return;
    let tr = "";
    if (n === "point") tr = `rotate(${Math.sin(t * 2.2) * 3}deg) scale(${1 + Math.sin(t * 2.2) * .02})`;
    if (n === "flail") tr = `rotate(${Math.sin(t * 13) * 8}deg) translateX(${Math.sin(t * 6.5) * 40}px)`;
    if (n === "split") tr = `translateY(${-60 - Math.sin((t - H2) * 1.2) * 40}px)`;
    if (n === "worm") tr = t < OW ? `translateY(${-Math.abs(Math.sin(t * 8)) * 26}px) rotate(${Math.sin(t * 8) * 5}deg)` : "none";
    if (n === "stand") tr = `translateY(${Math.sin(t * 2) * 4}px)`;
    eIn.style.transform = tr;
  }));
  // reality: the splash
  const splash = E.el(R, "abs", `left:640px;top:980px;font-size:120px;z-index:7;opacity:0`, "💦");
  E.K(splash, "o", [[Q1 + .6, 0], [Q1 + .7, 1], [Q1 + 1.4, 1], [Q1 + 1.6, 0]]); E.K(splash, "x", [[Q1 + .6, 0], [Q1 + 1.4, 160, "out"]]); E.clip(Q1 + .6, "sfx/splash.wav", { vol: .6 }); E.S(Q1 + .7, "crack", .5);
  const chip = (html, t0, t1, top) => { const c = E.el(R, "abs", `left:40px;top:${top}px;padding:10px 20px;border-radius:16px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:36px;z-index:9;opacity:0;white-space:nowrap`, html); E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .3, 1, "back"]]); E.S(t0, "pop", .35); };
  chip("🍹 a stranger’s drink: gone", Q1 + 1.0, H2, 460);
  chip("🧍 personal space: 3 m", Q1 + 1.8, H2, 534);
  chip("🐟 “the worm”", Q2 + .5, STAMP, 460);
  chip("🦴 lower back: gone", OW + .3, STAMP, 534);
  // the music
  E.clip(0, "sfx/club-bass.wav", { vol: .35, to: STOP, duck: true });
  E.music({ bpm: 124, root: 57, seed: 63, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: STOP });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Alright.<br>Watch this. 😎", { left: 560, top: 720, w: 420, tail: 120, t0: R1, t1: H1 });
  bubble("I’ve still<br>got it. 🕺", { left: 600, top: 700, w: 400, tail: 100, t0: R2, t1: Q1, dark: true, italic: true });
  bubble("…Ow.", { left: 60, top: 1500, w: 240, tail: 120, t0: OW, t1: STOP + 1, italic: true, size: 60 });
  bubble("🎤 Mate…<br>what was that?", { left: 520, top: 440, w: 500, tail: 120, t0: D1, t1: N1 + .4, dark: true });
  bubble("…Should we<br>call someone?", { left: 300, top: 920, w: 460, tail: 330, t0: N1, t1: J1 + .2 });
  bubble("Let him<br>have this.", { left: 380, top: 920, w: 380, tail: 280, t0: J1, t1: DUR, italic: true });
  E.clip(R1 + .05, "voices/sk63/r1.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk63/r2.wav", { vol: 1.4 }); E.clip(OW + .05, "voices/sk63/r3.wav", { vol: 1.6 });
  E.clip(D1 + .05, "voices/sk63/d1.wav", { vol: 1.6 }); E.clip(N1 + .05, "voices/sk63/n1.wav", { vol: 1.6 }); E.clip(J1 + .05, "voices/sk63/j1.wav", { vol: 1.6 });
  E.clip(STOP, "sfx/record-silence.wav", { vol: .8 }); E.S(STOP + .1, "slam", .4);

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:640px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "IN MY HEAD: A LEGEND.", STAMP, { size: 80, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "How I dance after *4 drinks.*", { size: 58, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
