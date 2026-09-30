// SK.82 "We should catch up soon!" — Nina and Rico bump into each other on the street: "It's been forever!" — "We should totally grab a coffee
// sometime!" — "Yes! Definitely! Let's do it!" — "I'll text you!" — "Please do!" They walk off, smiles dropping. A calendar flips through the years
// (DAYS SINCE "WE SHOULD CATCH UP": 0 → 1,900). Street again: "Rico?! Oh my gosh, it's been forever!" — "We should totally grab a coffee sometime!"
// Stamp: WE SHOULD CATCH UP SOON. Voices: ElevenLabs (Nina: Sarah; Rico: Liam).
export const meta = {
  id: "sk82-catch-up-soon",
  images: { st: "bg/street.jpg", nw: "cutouts/nina_wave.webp", nf: "cutouts/nina_fake.webp", rw: "cutouts/rico_wave.webp", rf: "cutouts/rico_fake.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", GREEN = "#1a9c5b";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const N1 = .5, R1 = 3.2, N2 = 5.5, R2 = 8.1, N3 = 10.0, R3 = 11.1, LEAVE = 12.9, C0 = 13.4, C1 = 19.6, BACK = 20.0, N1B = 20.8, N2B = 23.5, STAMP = 26.2, DUR = 29.8;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const ease = k => k * k * (3 - 2 * k);
  const S = E.scene("st", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const onCal = t => t >= LEAVE + 1.0 && t < C1 + .2;

  // ================= the street =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bg = E.img(bgBox, "st", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 50%");
  E.F(t => { bg.style.transform = `scale(${1.03 + (t % 12) * .003})`; bg.style.filter = onCal(t) ? "brightness(.45) blur(3px)" : "brightness(1.02) saturate(1.05)"; });
  E.clip(0, "sfx/elx-cafe.wav", { vol: .3, to: 10, duck: true }); E.clip(10, "sfx/elx-cafe.wav", { vol: .3, to: 10, duck: true }); E.clip(20, "sfx/elx-cafe.wav", { vol: .3, to: DUR - 20, duck: true });

  // ================= figures =================
  const fig = (img, H, w, h, cx, bottom, z, show) => {
    const W = H * w / h; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px`);
    E.F(t => { f.style.opacity = show(t) ? 1 : 0; }); return [f, fi];
  };
  const fake = t => (t >= R3 + .5 && t < LEAVE + 1.0);
  const meet1 = t => t < LEAVE + 1.0, meet2 = t => t >= BACK;
  const HH = 1000, NX = 270, RX = 800, BOT = 1935;
  const nw = fig("nw", HH, 250, 666, NX, BOT, 6, t => (meet1(t) && !fake(t)) || meet2(t));
  const nf = fig("nf", HH, 190, 671, NX, BOT, 6, t => fake(t));
  const rw = fig("rw", HH, 402, 656, RX, BOT, 6, t => (meet1(t) && !fake(t)) || meet2(t));
  const rf = fig("rf", HH, 301, 652, RX, BOT, 6, t => fake(t));
  // nw/rw are hidden while the calendar shows
  E.F(t => {
    const slideIn = t >= BACK ? 1 - seg(t, BACK, .7) : 0, out = t >= R3 + .5 && t < LEAVE + 1.0 ? seg(t, R3 + 1.0, 1.9) : 0, calc = onCal(t);
    const dx = out * 700;
    [nw, nf].forEach(([f, fi]) => { f.style.transform = `translateX(${t >= BACK ? -slideIn * 600 : -dx}px)`; fi.style.transform = `translateY(${Math.sin(t * 1.8) * 4 + (out > 0 ? -Math.abs(Math.sin(t * 9)) * 18 : 0)}px)`; });
    [rw, rf].forEach(([f, fi]) => { f.style.transform = `translateX(${t >= BACK ? slideIn * 600 : dx}px)`; fi.style.transform = `translateY(${Math.sin(t * 1.8 + 2) * 4 + (out > 0 ? -Math.abs(Math.sin(t * 9 + 1)) * 18 : 0)}px)`; });
    [nw, nf, rw, rf].forEach(([f]) => { if (calc) f.style.opacity = 0; });
  });

  // ================= chips =================
  const card = E.el(R, "abs", `left:40px;top:340px;padding:10px 26px 10px;border-radius:22px;background:rgba(10,8,12,.86);z-index:9;color:#fff;white-space:nowrap;transform-origin:0 50%`);
  const big = E.el(card, "", "font-weight:900;font-size:44px;letter-spacing:-.01em;line-height:1.1", "☕ Coffee plans made: 0");
  const sub = E.el(card, "", `font-weight:800;font-size:34px;color:${GOLD};margin-top:2px`, "Coffee plans kept: 0");
  E.K(card, "s", [[0, .7], [.3, 1, "back"]]);
  E.F(t => { const m = t >= R2 + .9 ? 1 : 0; const s = `☕ Coffee plans made: ${m}`; if (big.textContent !== s) big.textContent = s; card.style.opacity = onCal(t) ? 0 : 1; });
  E.S(R2 + .9, "ding", .4);

  // ================= calendar flip =================
  const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const NF = 62;
  const cal = E.el(R, "abs", `left:190px;top:560px;width:700px;height:700px;z-index:10;opacity:0;perspective:1400px`);
  const page = E.el(cal, "abs", "left:0;top:0;width:700px;height:700px;border-radius:30px;background:#fff;box-shadow:0 30px 70px rgba(0,0,0,.6);overflow:hidden;transform-origin:50% 0%");
  const hdr = E.el(page, "abs", `left:0;top:0;width:700px;height:200px;background:${CORAL};color:#fff;font-weight:900;font-size:120px;display:flex;align-items:center;justify-content:center;letter-spacing:.06em`, "OCT");
  E.el(page, "abs", "left:60px;top:-14px;width:30px;height:70px;border-radius:14px;background:#222;z-index:3"); E.el(page, "abs", "right:60px;top:-14px;width:30px;height:70px;border-radius:14px;background:#222;z-index:3");
  const yr = E.el(page, "abs", `left:0;top:200px;width:700px;text-align:center;font-weight:900;font-size:170px;color:${INK};letter-spacing:-.03em;font-variant-numeric:tabular-nums`, "2026");
  const soon = E.el(page, "abs", `left:0;top:440px;width:700px;text-align:center;font-weight:800;font-size:54px;color:#888;font-style:italic`, "“we should catch up soon”");
  E.K(cal, "o", [[LEAVE + .9, 0], [LEAVE + 1.1, 1], [C1 - .1, 1], [C1 + .15, 0]]); E.K(cal, "s", [[LEAVE + .9, .7], [LEAVE + 1.3, 1, "back"]]);
  const days = E.el(R, "abs", `left:60px;top:1330px;width:960px;padding:14px 10px;text-align:center;border-radius:26px;background:rgba(10,8,12,.9);color:#fff;font-weight:900;font-size:44px;z-index:10;opacity:0;font-variant-numeric:tabular-nums`, "");
  E.K(days, "o", [[LEAVE + 1.2, 0], [LEAVE + 1.4, 1], [C1 - .1, 1], [C1 + .15, 0]]);
  const msgs = [["Nina", "Coffee soon?? 😍", LEAVE + 1.6, false], ["Rico", "YES!! Let’s!!", LEAVE + 2.2, true], ["Nina", "Will check my week & let you know!", LEAVE + 3.0, false]];
  msgs.forEach(([who, txt, t0, right]) => { const m = E.el(R, "abs", `${right ? "right" : "left"}:40px;top:${right ? 520 : 430}px;max-width:520px;padding:10px 22px;border-radius:24px;background:${right ? "#1b7cf6" : "#fff"};color:${right ? "#fff" : INK};font-weight:800;font-size:36px;z-index:11;opacity:0;box-shadow:0 10px 24px rgba(0,0,0,.4)`, txt);
    E.K(m, "o", [[t0, 0], [t0 + .1, 1], [C1 - .3, 1], [C1 - .1, 0]]); E.K(m, "y", [[t0, 30], [t0 + .25, 0, "back"]]); E.S(t0, "pop", .35); });
  const seen = E.el(R, "abs", "right:48px;top:600px;font-weight:800;font-size:28px;color:#aaa;z-index:11;opacity:0", "Seen ✓✓");
  E.K(seen, "o", [[LEAVE + 3.8, 0], [LEAVE + 3.9, 1], [C1 - .3, 1], [C1 - .1, 0]]);
  E.F(t => {
    const p = seg(t, LEAVE + 1.3, C1 - LEAVE - 1.5), e = Math.pow(p, 1.25), k = Math.min(NF, Math.floor(NF * e)), fr = NF * e - k;
    const idx = 9 + k, mon = idx % 12, year = 2026 + Math.floor(idx / 12);
    if (onCal(t)) { hdr.textContent = MON[mon]; yr.textContent = year; const flip = Math.abs(Math.cos(fr * Math.PI * .5)); page.style.transform = `scaleY(${.35 + .65 * (1 - Math.sin(fr * Math.PI) * .6)})`;
      const d = Math.round(1900 * ease(p)); days.textContent = `DAYS SINCE “WE SHOULD CATCH UP”: ${d.toLocaleString("en-US")}`; }
  });
  for (let i = 0; i < 12; i++) E.S(LEAVE + 1.4 + i * .42, "swish", .35);
  E.clip(LEAVE + 1.2, "sfx/elx-trailer-whoosh.wav", { vol: .4 }); E.S(C1 - .4, "riser", .4);
  E.wipe(BACK - .2);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:14px 22px 18px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const BL = 560, BR = 590;
  const nb = (html, t0, t1, size = 46) => bubble(html, { left: 30, top: BL, w: 520, tail: 290, t0, t1, size });
  const rb = (html, t0, t1, size = 46) => bubble(html, { left: 530, top: BR, w: 520, tail: 250, t0, t1, size, dark: true });
  nb("Rico?! Oh my gosh,<br><b>it’s been forever!</b>", N1, R1 - .1, 44);
  rb("Nina! Wow,<br>you look great!", R1, N2 - .1);
  nb("We should <b>totally</b> grab<br>a coffee sometime!", N2, R2 - .1, 42);
  rb("Yes! <b>Definitely!</b><br>Let’s do it!", R2, N3 - .1);
  nb("I’ll text you!", N3, R3 - .05, 50);
  rb("Please do!", R3, LEAVE - .2, 50);
  nb("Rico?! Oh my gosh,<br><b>it’s been forever!</b>", N1B, N2B - .1, 44);
  nb("We should <b>totally</b> grab<br>a coffee sometime!", N2B, STAMP - .1, 42);
  const V = (t, who, f, v = 1.5) => E.clip(t + .05, `voices/sk82/${f}.wav`, { vol: v });
  V(N1, 0, "n1"); V(R1, 0, "r1"); V(N2, 0, "n2"); V(R2, 0, "r2"); V(N3, 0, "n3"); V(R3, 0, "r3"); V(N1B, 0, "n1"); V(N2B, 0, "n2");
  E.music({ bpm: 100, root: 52, seed: 82, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: DUR - 3 });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1230px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "WE SHOULD<br>CATCH UP SOON.", STAMP, { size: 96, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“We should catch up *soon*!”", { size: 56, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
