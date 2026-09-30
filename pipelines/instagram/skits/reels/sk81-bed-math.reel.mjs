// SK.81 "Five more minutes." — 07:00, the alarm. Rico "does the math" in bed: each snooze he finds a new plan that still gets him out on time:
// 7:30 everything · 7:45 skip breakfast · 8:00 skip the shower · 8:10 yesterday's clothes · 8:25 pyjamas. He falls asleep on the last one.
// 8:31: "WHAT TIME IS IT?!" — he runs out in pyjamas + coat, one shoe, coffee. Stamp: 5 MORE MINUTES.
// Voices: ElevenLabs (Rico: Liam). SFX: phone alarm (ElevenLabs).
export const meta = {
  id: "sk81-bed-math",
  images: { room: "bg/bedroom.jpg", sleep: "cutouts/rico_bed_sleep.webp", calc: "cutouts/rico_bed_calc.webp", up: "cutouts/rico_bed_up.webp", rush: "cutouts/rico_rush.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", GREEN = "#1a9c5b";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const R1 = 1.5, R2 = 3.1, R3 = 7.0, R4 = 10.9, R5 = 14.4, R6 = 17.6, R7 = 21.8, RUSH = 23.6, STAMP = 24.6, DUR = 28.0;
  const AL = [6.6, 10.6, 14.2, 17.4, 20.4];          // alarms ring again
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("bed", 0, DUR, "dark"); E.cur = S; const R = S.el;

  // ================= the room =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bg = E.img(bgBox, "room", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 50%");
  const tmin = t => t < R1 + 1.4 ? 420 : t < 6.6 ? 425 + 25 * seg(t, R1 + 1.4, 6.6 - R1 - 1.4) : t < 10.6 ? 450 + 15 * seg(t, 6.6, 4) : t < 14.2 ? 465 + 15 * seg(t, 10.6, 3.6) : t < 17.4 ? 480 + 10 * seg(t, 14.2, 3.2) : t < 20.4 ? 490 + 15 * seg(t, 17.4, 3) : t < 21.7 ? 505 + 6 * seg(t, 20.4, 1.3) : 511;
  E.F(t => { const late = tmin(t) >= 510; bg.style.transform = `scale(${1.03 + (t % 10) * .004})`; bg.style.filter = `brightness(${.78 + .3 * seg(t, 0, 20)}) saturate(${1.05})`; });
  // morning light ramps up as the clock runs (code overlay)
  const sun = E.el(R, "abs", "left:0;top:0;width:1080px;height:1000px;z-index:1;pointer-events:none;background:radial-gradient(ellipse at 20% 15%,rgba(255,225,150,.55),transparent 65%);opacity:0");
  E.F(t => { sun.style.opacity = .15 + .7 * seg(t, 0, 21); });

  // ================= the clock =================
  const clk = E.el(R, "abs", `left:40px;top:340px;padding:6px 26px 8px;border-radius:22px;background:rgba(10,8,12,.88);color:#fff;font-weight:900;font-size:92px;z-index:9;font-variant-numeric:tabular-nums;white-space:nowrap;letter-spacing:-.02em;transform-origin:0 50%`, "⏰ 7:00");
  const dead = E.el(R, "abs", `left:640px;top:362px;padding:8px 20px;border-radius:14px;background:${CORAL};color:#fff;font-weight:900;font-size:36px;z-index:9;white-space:nowrap`, "🚪 Must leave: 8:30");
  E.K(clk, "s", [[0, .7], [.3, 1, "back"]]); E.K(dead, "s", [[0, .7], [.3, 1, "back"]]);
  E.F(t => {
    const m = Math.floor(tmin(t)), h = Math.floor(m / 60), mm = m % 60; const s = `⏰ ${h}:${String(mm).padStart(2, "0")}`; if (clk.textContent !== s) clk.textContent = s;
    const ring = t < 1.4 || AL.some(a => t >= a && t < a + 1.0) || (t >= 21.2 && t < 21.9);
    clk.style.transform = ring ? `translateX(${Math.sin(t * 70) * 7}px) rotate(${Math.sin(t * 55) * 1.5}deg)` : "none";
    clk.style.background = m >= 510 ? "rgba(200,40,30,.95)" : "rgba(10,8,12,.88)";
  });
  E.clip(0, "sfx/elx-alarm.wav", { vol: .55, to: 1.4 }); AL.forEach(a => E.clip(a, "sfx/elx-alarm.wav", { vol: .5, to: 1.0 })); E.clip(21.2, "sfx/elx-alarm.wav", { vol: .7, to: 1.3 });
  [R1, ...AL.slice(0, 4).map(a => a + 1.0)].forEach(tt => E.S(tt, "tick", .5));

  // ================= the bed math board =================
  const board = E.el(R, "abs", `left:50px;top:470px;width:980px;padding:14px 26px 10px;border-radius:28px;background:rgba(255,255,255,.96);box-shadow:0 18px 44px rgba(0,0,0,.4);z-index:8;color:${INK}`);
  E.K(board, "o", [[R2 + .3, 0], [R2 + .5, 1], [R7 - .3, 1], [R7, 0]]); E.K(board, "s", [[R2 + .3, .85], [R2 + .7, 1, "back"]]);
  E.el(board, "", "font-weight:900;font-size:30px;letter-spacing:.1em;color:#a06a00;margin-bottom:2px", "🧮 BED MATH");
  const ROWS = [["7:30", "Do everything", "✔ plenty of time", R2 + 1.6], ["7:45", "No breakfast", "✔ fine", R3 + 1.3], ["8:00", "No shower", "✔ also fine", R4 + 1.3], ["8:10", "Yesterday’s clothes", "✔ fine-ish", R5 + 1.3], ["8:25", "Pyjamas", "✔ …fine", R6 + 1.0]];
  ROWS.forEach(([tm, plan, res, t0]) => {
    const row = E.el(board, "", "display:flex;align-items:center;gap:18px;font-weight:900;font-size:38px;height:0;overflow:hidden;opacity:0;white-space:nowrap;position:relative");
    E.el(row, "", "width:110px;font-variant-numeric:tabular-nums", tm); E.el(row, "", "", plan);
    const tag = E.el(row, "", `position:absolute;right:0;padding:1px 14px;border-radius:12px;background:${GREEN};color:#fff;font-size:30px;opacity:0`, res);
    E.F(t => { const a = seg(t, t0, .22); row.style.height = `${Math.round(54 * a)}px`; row.style.opacity = a; const v = seg(t, t0 + .35, .2); tag.style.opacity = v; tag.style.transform = `translateX(${(1 - v) * 40}px)`; });
    E.S(t0, "pop", .35); E.S(t0 + .35, "ding", .3);
  });

  // ================= Rico =================
  const fig = (img, W, w, h, cx, bottom, z, show) => {
    const H = W * h / w; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px`);
    E.F(t => { f.style.opacity = show(t) ? 1 : 0; }); return [f, fi];
  };
  const BOT = 1880;
  const [sf, sfi] = fig("sleep", 860, 472, 544, 540, BOT, 6, t => t < R2 - .1 || (t >= AL[4] + .05 && t < R7 - .1));
  const [cf, cfi] = fig("calc", 860, 470, 559, 540, BOT, 6, t => (t >= R2 - .1 && t < AL[4] + .05));
  const [uf, ufi] = fig("up", 760, 462, 657, 540, BOT, 6, t => t >= R7 - .1 && t < RUSH);
  E.F(t => { sfi.style.transform = `translateY(${Math.sin(t * 1.6) * 6}px) scale(${1 + Math.sin(t * 1.6) * .006})`; const ringShake = AL.some(a => t >= a && t < a + .5) ? Math.sin(t * 60) * 6 : 0; cfi.style.transform = `translate(${ringShake}px,${Math.sin(t * 1.7) * 3}px)`;
    ufi.style.transform = `translateY(${t < R7 + .4 ? -Math.abs(Math.sin((t - R7 + .1) * 8)) * 26 : Math.sin(t * 30) * 3}px)`; });
  // the rush: pyjamas, coat, one shoe, coffee
  const [rf, rfi] = fig("rush", 1000, 412, 672, 540, 1900, 6, t => t >= RUSH && t < RUSH + 1.6);
  E.F(t => { const k = seg(t, RUSH, 1.6); rf.style.transform = `translateX(${-520 + k * 1150}px)`; rfi.style.transform = `translateY(${-Math.abs(Math.sin(k * 26)) * 40}px) rotate(${Math.sin(k * 26) * 3}deg)`; });
  E.S(RUSH, "whoosh", .5); E.S(R7 - .05, "thud", .6);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:14px 22px 18px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Five more<br><b>minutes.</b>", { left: 330, top: 640, w: 420, tail: 210, t0: R1, t1: R2 - .1, size: 54 });
  bubble("<b>WHAT TIME<br>IS IT?!</b>", { left: 250, top: 640, w: 560, tail: 280, t0: R7, t1: RUSH - .1, size: 64 });
  const V = (t, f, v = 1.5) => E.clip(t + .05, `voices/sk81/${f}.wav`, { vol: v });
  V(R1, "r1"); V(R2, "r2"); V(R3, "r3"); V(R4, "r4"); V(R5, "r5"); V(R6, "r6"); V(R7, "r7", 1.7);
  E.music({ bpm: 96, root: 55, seed: 81, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: R7 - .5 });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:760px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "5 MORE<br>MINUTES.", STAMP, { size: 130, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "Bed *math*, every morning.", { size: 58, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
