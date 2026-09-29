// SK.60 "I'm never drinking again." — a week in five days. SUNDAY 11:00, hungover, hand raised like an oath (angel choir):
// "I am never. Drinking. Again." 🤞 NEVER AGAIN · the counter starts. MONDAY: lime-green athleisure, celery smoothie: "New
// me." TUESDAY: the gym, a 2 kg dumbbell, drenched: "I'm… thriving." WEDNESDAY: kombucha #6, eye twitching: "Mmm.
// Kombucha." THURSDAY: a text from Nina — "Drinks on Friday?" — "…Maybe one." FRIDAY 23:40: tie round his head, cocktail
// in the air: "WHO WANTS SHOTS?!" The counter stops: NEVER AGAIN lasted 4 days, 12 hours, 40 minutes. Sal: "See you
// Sunday." NEVER AGAIN: 4.5 DAYS.  Voices: ElevenLabs (Rico: Liam; Nina: Sarah; Sal: Chris).
export const meta = {
  id: "sk60-never-again",
  images: { bedroom: "bg/bedroom.jpg", kitchen: "bg/kitchen.jpg", gym: "bg/gym.jpg", night: "bg/night.jpg", bar: "bg/speakeasy.jpg",
    oath: "cutouts/rico_oath.webp", smoothie: "cutouts/rico_smoothie.webp", gymr: "cutouts/rico_gym.webp", komb: "cutouts/rico_kombucha.webp", nod: "cutouts/rico_nod.webp", party: "cutouts/rico_party.webp", sal: "cutouts/sal_twitch.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const MON = 5.0, TUE = 8.2, WED = 11.4, THU = 14.2, FRI = 17.8, STOP = 19.4, S1 = 21.0, STAMP = 22.2, DUR = 25.4;
  const R1 = .6, R2 = MON + .6, R3 = TUE + .6, R4 = WED + .6, N1 = THU + .5, R5 = THU + 2.2, R6 = FRI + .5;
  const S = E.scene("week", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const DAYS = [[0, "bedroom", "☀️ SUNDAY · 11:00", "none"], [MON, "kitchen", "🥬 MONDAY · 07:00", "brightness(1.5) saturate(.9)"], [TUE, "gym", "🏋️ TUESDAY · 18:30", "none"],
    [WED, "kitchen", "🫖 WEDNESDAY · 20:00", "brightness(1.2)"], [THU, "night", "📱 THURSDAY · 22:15", "brightness(1.15)"], [FRI, "bar", "🎉 FRIDAY · 23:40", "saturate(1.2)"]];
  const dayAt = t => { let d = 0; DAYS.forEach(([k], i) => { if (t >= k) d = i; }); return d; };

  // ================= backgrounds, one per day =================
  const bgs = DAYS.map(([k, img, , filt], i) => {
    const b = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden;opacity:0");
    const im = E.img(b, img, `position:absolute;left:0;top:0;width:1080px;height:1920px;filter:${filt};transform-origin:50% 55%`);
    return [b, im, k];
  });
  E.F(t => { const d = dayAt(t); bgs.forEach(([b, im, k], i) => { b.style.opacity = i === d ? 1 : 0; if (i === d) im.style.transform = `scale(${1.04 + (t - k) * .01})`; }); });
  DAYS.slice(1).forEach(([k]) => { E.wipe(k); E.clip(k - .3, "sfx/elx-trailer-whoosh.wav", { vol: .35 }); });
  E.el(R, "abs", "left:0;top:0;width:1080px;height:640px;z-index:2;pointer-events:none;background:linear-gradient(180deg,rgba(10,14,20,.7),rgba(10,14,20,.35) 60%,rgba(10,14,20,0))");
  // party lights on Friday
  const disco = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:1;pointer-events:none;mix-blend-mode:screen");
  E.F(t => { if (t >= FRI) { const h = (t * 140) % 360; disco.style.background = `radial-gradient(ellipse at ${50 + Math.sin(t * 2.4) * 30}% 40%,hsla(${h},90%,60%,.3),transparent 55%),radial-gradient(ellipse at ${50 - Math.sin(t * 1.8) * 30}% 70%,hsla(${(h + 150) % 360},90%,60%,.25),transparent 50%)`; } else disco.style.background = "none"; });

  // ================= Rico, a different man every day =================
  const POSES = [["oath", 688, 913, 1000, 540, 0], ["smoothie", 637, 982, 1080, 540, 1], ["gymr", 579, 1010, 1100, 540, 2], ["komb", 688, 1001, 1000, 540, 3], ["nod", 688, 989, 1000, 540, 4], ["party", 584, 957, 1180, 420, 5]];
  const people = POSES.map(([img, w, h, H, cx, d]) => {
    const W = H * w / h;
    const p = E.el(R, "abs", `left:${cx - W / 2}px;top:${1990 - H}px;width:${W}px;height:${H}px;z-index:3;opacity:0`);
    const pIn = E.el(p, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`);
    E.img(pIn, img, `width:${W}px;height:${H}px`);
    return [p, pIn, d];
  });
  E.F(t => {
    const d = dayAt(t), k = DAYS[d][0];
    people.forEach(([p, pIn, pd]) => {
      p.style.opacity = pd === d ? 1 : 0; if (pd !== d) return;
      const pop = t - k < .3 ? 1.08 - (t - k) / .3 * .08 : 1;
      let rot = Math.sin(t * 1.5) * 1.2, y = Math.sin(t * 2) * 4;
      if (pd === 2) { rot = Math.sin(t * 40) * .8; }                       // trembling
      if (pd === 3) { rot = Math.sin(t * 60) * (Math.floor(t * 2) % 2 ? 1.2 : 0); }  // twitching
      if (pd === 5) { rot = Math.sin(t * 7) * 6; y = -Math.abs(Math.sin(t * 7)) * 30; }  // dancing
      pIn.style.transform = `translateY(${y}px) rotate(${rot}deg) scale(${pop})`;
    });
  });
  // the day pill + the never-again counter
  const pill = E.el(R, "abs", `left:40px;top:360px;padding:10px 24px;border-radius:18px;background:${INK};color:#fff;font-weight:900;font-size:42px;z-index:8`);
  E.F(t => { const h = DAYS[dayAt(t)][2]; if (pill.textContent !== h) pill.textContent = h; });
  const counter = E.el(R, "abs", `left:40px;top:450px;padding:10px 22px;border-radius:16px;background:${GOLD};color:${INK};font-weight:900;font-size:36px;z-index:8;opacity:0;font-variant-numeric:tabular-nums`);
  E.K(counter, "o", [[R1 + 2.6, 0], [R1 + 2.8, 1], [STAMP, 1], [STAMP + .2, 0]]);
  E.F(t => { // 11:00 Sunday → 23:40 Friday = 4d 12h 40m, spread over the week
    const mins = Math.round((4 * 1440 + 12 * 60 + 40) * seg(t, R1 + 2.8, STOP - R1 - 2.8));
    const s = `🤞 NEVER AGAIN: ${Math.floor(mins / 1440)}d ${Math.floor(mins % 1440 / 60)}h ${mins % 60}m`;
    if (counter.textContent !== s) counter.textContent = s; counter.style.background = t >= STOP ? CORAL : GOLD; counter.style.color = t >= STOP ? "#fff" : INK;
  });
  E.S(STOP, "blare", .6); E.K(counter, "s", [[STOP, 1], [STOP + .15, 1.25, "out"], [STOP + .4, 1, "io"]]);
  // little day details
  const chip = (html, t0, t1, top, left = 40) => { const c = E.el(R, "abs", `left:${left}px;top:${top}px;padding:8px 18px;border-radius:14px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:34px;z-index:8;opacity:0;white-space:nowrap`, html); E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .3, 1, "back"]]); E.S(t0, "pop", .35); };
  chip("🥬 celery smoothie", MON + 1.5, TUE, 540); chip("🧘 yoga (7 minutes)", MON + 2.0, TUE, 612);
  chip("🏋️ 2 kg", TUE + 1.4, WED, 540); chip("💦 sweat: 4 litres", TUE + 1.9, WED, 612);
  chip("🫖 kombucha #6", WED + 1.4, THU, 540); chip("👁️ eye: twitching", WED + 1.9, THU, 612);
  chip("🍹 cocktails: 7", FRI + 1.3, STAMP - .2, 540);
  // Thursday's text
  const note = E.el(R, "abs", `left:60px;top:560px;width:960px;padding:22px 28px;border-radius:30px;background:rgba(255,255,255,.96);box-shadow:0 18px 40px rgba(0,0,0,.3);z-index:9;opacity:0;color:${INK}`,
    `<div style="font-weight:900;font-size:28px;color:#667">💬 Nina · now</div><div style="font-weight:800;font-size:44px;margin-top:6px">Drinks on Friday? 🍸</div>`);
  E.K(note, "o", [[N1, 0], [N1 + .15, 1], [FRI - .1, 1], [FRI, 0]]); E.K(note, "y", [[N1, -60], [N1 + .35, 0, "out"]]); E.clip(N1, "sfx/elx-phone-buzz.wav", { vol: .6 });
  // Friday: confetti + Sal
  const conf = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:4;pointer-events:none;opacity:0");
  conf.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920">${Array.from({ length: 40 }, (_, i) => `<rect class="cf" x="${(i * 97) % 1080}" y="0" width="14" height="22" fill="${["#ff5fa2", GOLD, "#8ee3c8", "#9b8cf0"][i % 4]}"/>`).join("")}</svg>`;
  const cfs = [...conf.querySelectorAll(".cf")];
  E.K(conf, "o", [[FRI, 0], [FRI + .1, 1]]);
  E.F(t => { if (t < FRI) return; cfs.forEach((c, i) => { const y = ((t - FRI) * (240 + (i % 5) * 60) + i * 137) % 1920; c.setAttribute("y", y); }); });
  const SH = 760, SW = SH * 0.72;
  const sal = E.el(R, "abs", `left:1080px;top:${1990 - SH}px;width:${SW}px;height:${SH}px;z-index:2`);
  E.img(sal, "sal", `width:${SW}px;height:${SH}px`);
  E.K(sal, "x", [[S1 - .5, 0], [S1 - .1, -SW + 20, "out"]]);
  E.clip(FRI, "sfx/club-bass.wav", { vol: .3, to: DUR - FRI, duck: true }); E.clip(FRI + .2, "sfx/elx-bar-cheer.wav", { vol: .45, to: 2.2 });
  E.clip(R1 - .2, "sfx/angel-choir.wav", { vol: .35, to: 3.8 });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.35);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("I am never.<br>Drinking. Again. ✋", { left: 360, top: 700, w: 520, tail: 200, t0: R1, t1: MON - .1 });
  bubble("New me. 💚", { left: 560, top: 760, w: 360, tail: 100, t0: R2, t1: TUE - .1, size: 58 });
  bubble("I’m… thriving. 💦", { left: 520, top: 740, w: 440, tail: 120, t0: R3, t1: WED - .1, italic: true });
  bubble("Mmm. Kombucha. 🙂", { left: 520, top: 760, w: 460, tail: 120, t0: R4, t1: THU - .1, italic: true });
  bubble("…Maybe one.", { left: 560, top: 820, w: 380, tail: 100, t0: R5, t1: FRI - .1, italic: true });
  bubble("WHO WANTS<br>SHOTS?! 🥃", { left: 560, top: 640, w: 440, tail: 120, t0: R6, t1: S1 - .2, size: 58 });
  bubble("See you Sunday.", { left: 600, top: 1060, w: 420, tail: 300, t0: S1, t1: DUR, dark: true, italic: true });
  E.clip(R1 + .05, "voices/sk60/r1.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk60/r2.wav", { vol: 1.5 }); E.clip(R3 + .05, "voices/sk60/r3.wav", { vol: 1.5 }); E.clip(R4 + .05, "voices/sk60/r4.wav", { vol: 1.5 });
  E.clip(N1 + .2, "voices/sk60/n1.wav", { vol: 1.5 }); E.clip(R5 + .05, "voices/sk60/r5.wav", { vol: 1.6 }); E.clip(R6 + .05, "voices/sk60/r6.wav", { vol: 1.5 }); E.clip(S1 + .05, "voices/sk60/s1.wav", { vol: 1.6 });
  E.music({ bpm: 96, root: 60, seed: 60, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: FRI });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:640px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "NEVER AGAIN: 4.5 DAYS.", STAMP, { size: 78, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“I’m *never* drinking again.”", { size: 58, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, MON, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
