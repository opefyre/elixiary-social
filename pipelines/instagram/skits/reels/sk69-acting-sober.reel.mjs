// SK.69 "Acting sober in front of Mum." — 01:47. Keys: attempt 1… 2… 3… 4. The kitchen light clicks on: Mum, dressing gown,
// tea. "Oh, you're back! Good night, love?" SOBER MODE: ACTIVATED ("be normal. be NORMAL."). Rico, robot-walking, enormous
// smile: "Good evening… Mother. It was a… most reasonable evening." The checklist: voice ✓, eye contact ✓✓✓ (too much),
// walking ⚠️. "Did you eat something?" "I had… a salad." (it was a kebab). He heads for the hall and walks into the door
// frame. "Ow… sorry, door." Mum sips: "Night, love. Water's on your bedside table." SHE KNEW.
// Voices: ElevenLabs (Mum: Laura; Rico: Liam).
export const meta = {
  id: "sk69-acting-sober",
  images: { bg: "bg/kitchen_night.jpg", mum: "cutouts/mum_tea.webp", robot: "cutouts/rico_robot.webp", bonk: "cutouts/rico_bonk.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", TERM = "#39ff88";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const KEYS = .2, LIGHT = 2.0, M1 = 2.4, SOBER = 4.5, R1 = 6.3, M2 = 12.0, R2 = 13.3, KEB = 15.0, TURN = 15.9, BONK = 16.7, R3 = 17.2, M3 = 18.9, STAMP = 21.4, DUR = 24.4;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("kitchen", 0, DUR, "dark"); E.cur = S; const R = S.el;

  // ================= kitchen, dark until the switch =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bg = E.img(bgBox, "bg", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 55%");
  E.F(t => { bg.style.transform = `scale(${1.04 + t * .004})`; bg.style.filter = t < LIGHT ? "brightness(.5) saturate(.7)" : "brightness(1.15) saturate(1.1)"; });
  const dark = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6;pointer-events:none;background:radial-gradient(ellipse at 18% 62%,rgba(0,0,0,0) 0,rgba(0,0,0,.25) 22%,rgba(0,0,0,.7) 55%)");
  E.K(dark, "o", [[0, 1], [LIGHT, 1], [LIGHT + .05, 0]]);
  E.clip(LIGHT - .3, "sfx/elx-light-switch.wav", { vol: .9 }); E.flash(LIGHT, "#fff4d6", .35, .15);
  // a warm pool of lamp light over the table once it's on
  const lamp = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:1;pointer-events:none;mix-blend-mode:screen;background:radial-gradient(ellipse at 50% 30%,rgba(255,200,120,.28),transparent 45%)");
  E.K(lamp, "o", [[LIGHT, 0], [LIGHT + .1, 1]]);

  // the clock + the key attempts (motion from frame 0)
  const clk = E.el(R, "abs", `left:40px;top:360px;padding:10px 24px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:44px;z-index:9;font-variant-numeric:tabular-nums`, "🕐 01:47");
  E.K(clk, "s", [[0, .7], [.3, 1, "back"]]);
  const keys = E.el(R, "abs", `left:40px;top:450px;padding:10px 22px;border-radius:16px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:40px;z-index:9;white-space:nowrap`);
  const KT = [[KEYS, "🔑 attempt 1…"], [KEYS + .45, "🔑 attempt 2…"], [KEYS + .9, "🔑 attempt 3…"], [KEYS + 1.35, "🔑 attempt 4 ✅"]];
  E.F(t => { let h = ""; for (const [k, v] of KT) if (t >= k) h = v; if (keys.textContent !== h) keys.textContent = h; keys.style.opacity = t < LIGHT + .4 ? 1 : 0; keys.style.transform = `rotate(${Math.sin(t * 30) * (t < KEYS + 1.35 ? 2 : 0)}deg)`; });
  KT.forEach(([k]) => E.S(k, "tick", .45));
  E.clip(0, "sfx/elx-keys-fumble.wav", { vol: .9 });
  const bigKey = E.el(R, "abs", "left:200px;top:1000px;width:680px;text-align:center;font-size:220px;z-index:7;filter:drop-shadow(0 0 30px rgba(255,210,120,.6))", "🔑");
  E.F(t => { bigKey.style.opacity = t < LIGHT ? 1 : 0; bigKey.style.transform = `translateX(${Math.sin(t * 38) * 14}px) rotate(${Math.sin(t * 23) * 14}deg) scale(${1 + Math.sin(t * 6) * .04})`; });
  const keyhole = E.el(R, "abs", "left:360px;top:1260px;width:360px;text-align:center;color:rgba(255,220,150,.85);font-weight:900;font-size:40px;z-index:7;font-style:italic", "*scrape* *scrape* *jingle*");
  E.F(t => keyhole.style.opacity = t < LIGHT ? (Math.floor(t * 3) % 2 ? 1 : .5) : 0);

  // ================= Mum =================
  const MH = 1000, MW = MH * 364 / 1012;
  const mum = E.el(R, "abs", `left:${830 - MW / 2}px;top:${1890 - MH}px;width:${MW}px;height:${MH}px;z-index:4;opacity:0`);
  const mIn = E.el(mum, "abs", `left:0;top:0;width:${MW}px;height:${MH}px;transform-origin:50% 100%`);
  E.img(mIn, "mum", `width:${MW}px;height:${MH}px`);
  E.K(mum, "o", [[LIGHT, 0], [LIGHT + .05, 1]]);
  E.F(t => { const sip = (t > M3 + 2.3 && t < STAMP) ? Math.sin(seg(t, M3 + 2.3, .8) * Math.PI) : 0; mIn.style.transform = `translateY(${Math.sin(t * 1.4) * 4 - sip * 10}px) rotate(${sip * -2}deg)`; });
  E.clip(M3 + 2.3, "sfx/elx-sip.wav", { vol: .6 });
  // Mum's knowing eyebrow meter
  const brow = E.el(R, "abs", `left:660px;top:360px;padding:10px 20px;border-radius:16px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:34px;z-index:9;opacity:0;white-space:nowrap`);
  E.F(t => { const lvl = t < R1 + 2 ? 1 : t < R2 + 1 ? 2 : t < BONK ? 3 : 4; brow.innerHTML = `🤨 Mum knows: ${"▮".repeat(lvl)}${"▯".repeat(4 - lvl)}`; brow.style.opacity = t > M1 + 1 && t < STAMP ? 1 : 0; });
  [R1 + 2, R2 + 1, BONK].forEach(k => E.S(k, "tick", .4));

  // ================= Rico =================
  const RH = 880, RW = RH * 242 / 665, BH = 880, BW = BH * 303 / 655;
  const rico = E.el(R, "abs", `left:0;top:${1900 - RH}px;width:${BW}px;height:${RH}px;z-index:5;opacity:0`);
  const rIn = E.el(rico, "abs", `left:0;top:0;width:${BW}px;height:${RH}px;transform-origin:50% 100%`);
  const robot = E.img(rIn, "robot", `position:absolute;left:${(BW - RW) / 2}px;top:0;width:${RW}px;height:${RH}px`);
  const bonk = E.img(rIn, "bonk", `position:absolute;left:0;top:0;width:${BW}px;height:${BH}px;opacity:0`);
  E.K(rico, "o", [[SOBER, 0], [SOBER + .05, 1]]);
  const xAt = t => t < SOBER ? -300 : t < R1 ? -300 + 500 * seg(t, SOBER, 1.2) : t < TURN ? 200 + 160 * seg(t, R1, TURN - R1) : t < BONK ? 360 - 300 * seg(t, TURN, BONK - TURN) : 60 + 8 * Math.sin(seg(t, BONK, .3) * Math.PI);
  E.F(t => {
    const walking = (t > SOBER && t < R1 + 5.4) || (t > TURN && t < BONK);
    const step = walking ? Math.floor(t * 3) % 2 : 0;               // stiff, robotic two-step bob
    const flip = t >= TURN && t < BONK ? -1 : 1;
    rico.style.left = `${xAt(t) + BW / 2 - BW / 2}px`;
    rIn.style.transform = `translateY(${-step * 10}px) scaleX(${flip}) rotate(${t > BONK && t < BONK + .5 ? -6 * (1 - seg(t, BONK, .5)) : 0}deg)`;
    const b = t >= BONK; robot.style.opacity = b ? 0 : 1; bonk.style.opacity = b ? 1 : 0;
  });
  for (let t = SOBER; t < R1 + 5.4; t += 1 / 3) E.S(t, "tick", .12);
  // the big fake smile sparkle
  const spark = E.el(R, "abs", "left:0;top:0;font-size:60px;z-index:7;opacity:0", "✨");
  E.F(t => { spark.style.left = `${xAt(t) + 170}px`; spark.style.top = `${1900 - RH + 60}px`; spark.style.opacity = t > R1 && t < R1 + 1.5 ? (Math.floor(t * 4) % 2 ? 1 : .3) : 0; });
  E.S(R1 + .1, "sparkle", .35);
  // the bonk
  E.clip(BONK, "sfx/elx-door-bonk.wav", { vol: 1 }); E.shake(BONK, 16, .35);
  const stars = E.el(R, "abs", "left:60px;top:960px;font-size:70px;z-index:8;opacity:0;white-space:nowrap", "💫 ⭐ 💫");
  E.K(stars, "o", [[BONK, 0], [BONK + .05, 1], [M3 + .5, 1], [M3 + .8, 0]]);
  E.F(t => { if (t > BONK) stars.style.transform = `rotate(${(t - BONK) * 200}deg)`; });
  const doorEdge = E.el(R, "abs", "left:-30px;top:560px;width:110px;height:1400px;z-index:6;border-radius:8px;background:linear-gradient(90deg,#5a3a24,#8a5a38 60%,#6a4228);box-shadow:8px 0 18px rgba(0,0,0,.45);opacity:0");
  E.K(doorEdge, "o", [[TURN, 0], [TURN + .2, 1], [M3 + .5, 1], [M3 + .8, 0]]);

  // ================= SOBER MODE HUD =================
  const hud = E.el(R, "abs", `left:40px;top:450px;width:600px;padding:18px 24px;border-radius:22px;background:rgba(6,14,10,.9);border:3px solid ${TERM};color:${TERM};font-family:ui-monospace,Menlo,monospace;font-weight:800;z-index:9;opacity:0;box-shadow:0 0 30px rgba(57,255,136,.35)`);
  const hudHead = E.el(hud, "", "font-size:34px;letter-spacing:.04em", "▶ SOBER MODE: ACTIVATED");
  const rows = [["🗣 voice", "✓ very normal", R1 + .8], ["👀 eye contact", "✓✓✓ (too much)", R1 + 2.2], ["🚶 walking", "⚠️ checking…", R1 + 3.8], ["🥙 alibi", "✓ “a salad”", KEB]];
  const rowEls = rows.map(([a, b, t0]) => { const r = E.el(hud, "", "font-size:30px;margin-top:10px;display:flex;justify-content:space-between;opacity:0", `<span>${a}</span><span>${b}</span>`); E.K(r, "o", [[t0, 0], [t0 + .1, 1]]); E.S(t0, "ding", .3); return r; });
  E.F(t => {
    hud.style.opacity = t > SOBER && t < M3 ? 1 : 0;
    const fail = t >= BONK;
    hud.style.borderColor = fail ? CORAL : TERM; hud.style.color = fail ? CORAL : TERM;
    hudHead.textContent = fail ? "✖ SOBER MODE: FAILED" : (Math.floor(t * 2) % 2 ? "▶ SOBER MODE: ACTIVATED" : "▶ SOBER MODE: ACTIVATED_");
    rowEls[2].lastChild.textContent = fail ? "❌ door frame" : "⚠️ checking…";
    hud.style.transform = fail && t < BONK + .4 ? `translateX(${Math.sin(t * 90) * 8}px)` : "none";
  });
  E.S(SOBER, "blare", .25); E.S(BONK + .05, "nope", .45);
  // inner voice thought
  const think = E.el(R, "abs", `left:60px;top:880px;width:520px;padding:16px 22px;border-radius:26px;background:rgba(20,30,40,.92);color:#fff;font-weight:800;font-style:italic;font-size:42px;text-align:center;z-index:10;opacity:0`, "💭 be normal.<br>be <b>NORMAL.</b>");
  E.pop(think, SOBER + .3, { from: .3, dur: .3 }); E.K(think, "o", [[SOBER + .3, 0], [SOBER + .4, 1], [R1 - .1, 1], [R1, 0]]); E.S(SOBER + .3, "pop", .35);
  // the kebab truth
  const keb = E.el(R, "abs", `left:40px;top:895px;padding:12px 22px;border-radius:18px;background:${CORAL};color:#fff;font-weight:900;font-size:40px;z-index:10;opacity:0;white-space:nowrap`, "🥙 (it was a kebab. with extra garlic sauce.)");
  E.K(keb, "o", [[KEB, 0], [KEB + .1, 1], [BONK - .1, 1], [BONK, 0]]); E.K(keb, "s", [[KEB, .6], [KEB + .3, 1, "back"]]); E.S(KEB, "pop", .4);
  // the bedside table, already sorted
  const bed = E.el(R, "abs", `left:40px;top:880px;padding:14px 24px;border-radius:18px;background:rgba(255,255,255,.96);color:${INK};font-weight:900;font-size:40px;z-index:10;opacity:0;white-space:nowrap`, "🛏️ bedside: 💧 water · 💊 · 🍞 toast");
  E.K(bed, "o", [[M3 + 1.2, 0], [M3 + 1.3, 1], [STAMP - .1, 1], [STAMP, 0]]); E.K(bed, "s", [[M3 + 1.2, .6], [M3 + 1.5, 1, "back"]]); E.S(M3 + 1.2, "sparkle", .35);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:#fff;border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:#fff;transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Oh, you’re back!<br>Good night, love?", { left: 500, top: 720, w: 520, tail: 330, t0: M1, t1: SOBER + .2 });
  bubble("Good evening… <i>Mother.</i><br>It was a… most<br><b>reasonable</b> evening.", { left: 180, top: 770, w: 620, tail: 170, t0: R1, t1: M2 - .1, size: 44 });
  bubble("Did you eat<br>something?", { left: 600, top: 735, w: 420, tail: 230, t0: M2, t1: R2 + .2 });
  bubble("I had… a <b>salad.</b> 🥗", { left: 200, top: 770, w: 520, tail: 220, t0: R2, t1: TURN });
  bubble("Ow… sorry, door.", { left: 60, top: 790, w: 440, tail: 120, t0: R3, t1: M3 + .3, italic: true });
  bubble("Night, love.<br>Water’s on your<br>bedside table. 😌", { left: 500, top: 660, w: 520, tail: 330, t0: M3, t1: STAMP });
  E.clip(M1 + .05, "voices/sk69/m1.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk69/r1.wav", { vol: 1.5 }); E.clip(M2 + .05, "voices/sk69/m2.wav", { vol: 1.5 });
  E.clip(R2 + .05, "voices/sk69/r2.wav", { vol: 1.5 }); E.clip(R3 + .05, "voices/sk69/r3.wav", { vol: 1.5 }); E.clip(M3 + .05, "voices/sk69/m3.wav", { vol: 1.5 });
  E.music({ bpm: 96, root: 57, seed: 69, prog: [[0, 3, 7], [5, 8, 12], [7, 10, 14], [3, 7, 10]], until: DUR });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:660px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "SHE KNEW.", STAMP, { size: 110, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "Acting *sober* in front of Mum.", { size: 55, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
