// SK.79 "12% is plenty." — Rico, smug, at the bar: "Twelve percent. That's plenty." Nina messages: "Text me when you're home!" Camera, maps and
// a video later the battery is 3% ("It was twelve a minute ago!"). The charger hunt: Sal's is the other kind of plug, Nina's cable is the other
// kind too, Barry's power bank is dead. 1:32 AM: Rico on the floor by the only outlet, phone at 4% for an hour. Stamp: 12% IS A LIE.
// Voices: ElevenLabs (Rico: Liam; Sal: Chris; Nina: Sarah; Barry: Charlie). SFX: low-battery beeps, plug-in chime, power-down.
export const meta = {
  id: "sk79-twelve-percent",
  images: { bar: "bg/cocktailbar.jpg", smug: "cutouts/rico_smug.webp", shock: "cutouts/rico_shock.webp", floor: "cutouts/rico_floor.webp", nina: "cutouts/av_nina.webp",
    barry: "cutouts/barry_snap.webp", flat: "cutouts/sal_flat.webp", host: "cutouts/sal_host.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", GREEN = "#1a9c5b";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const R1 = .5, N1 = 2.4, LOW = 6.0, R2 = 6.3, R3 = 8.7, S1 = 10.4, N2 = 12.4, N3 = 13.1, BR = 14.6, B1 = 15.0, B2 = 15.8, WIPE = 17.4, R4 = 18.6, N4 = 21.3, R5 = 22.6, STAMP = 24.2, DUR = 27.8;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("bar", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const late = t => t >= WIPE + .15;

  // ================= the bar =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bg = E.img(bgBox, "bar", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 50%");
  E.F(t => { bg.style.transform = `scale(${1.03 + (t % 10) * .004})`; bg.style.filter = late(t) ? "brightness(.72) saturate(.9)" : "brightness(1.0) saturate(1.05)"; });
  E.clip(0, "sfx/elx-lounge.wav", { vol: .2, to: 7, duck: true }); E.clip(7, "sfx/elx-lounge.wav", { vol: .2, to: 7, duck: true });
  E.clip(14, "sfx/elx-lounge.wav", { vol: .2, to: 7, duck: true }); E.clip(21, "sfx/elx-lounge.wav", { vol: .2, to: DUR - 21, duck: true });
  E.clip(0, "sfx/crowd-murmur.wav", { vol: .14, to: 7, duck: false }); E.clip(7, "sfx/crowd-murmur.wav", { vol: .14, to: 7, duck: false });
  E.clip(14, "sfx/crowd-murmur.wav", { vol: .14, to: WIPE - 14, duck: false });

  // ================= battery HUD + clock =================
  const bat = t => t < 3.9 ? 12 : t < 4.4 ? 12 - 3 * seg(t, 3.9, .5) : t < 4.8 ? 9 : t < 5.2 ? 9 - 2 * seg(t, 4.8, .4) : t < 5.6 ? 7 : t < 6.0 ? 7 - 4 * seg(t, 5.6, .4) : t < WIPE + .2 ? 3 : t < R4 ? 3 + seg(t, WIPE + .2, .5) : 4;
  const hud = E.el(R, "abs", `left:40px;top:360px;display:flex;align-items:center;gap:16px;z-index:9;transform-origin:0 50%`);
  const pill = E.el(hud, "", "position:relative;width:190px;height:88px;border-radius:20px;background:rgba(10,8,12,.85);border:5px solid #fff;box-sizing:border-box");
  const fill = E.el(pill, "abs", "left:6px;top:6px;height:66px;border-radius:12px");
  E.el(pill, "abs", "right:-16px;top:24px;width:11px;height:32px;border-radius:0 6px 6px 0;background:#fff");
  const num = E.el(hud, "", "font-weight:900;font-size:76px;color:#fff;text-shadow:0 4px 16px rgba(0,0,0,.7);font-variant-numeric:tabular-nums;letter-spacing:-.02em", "12%");
  const clk = E.el(R, "abs", `left:660px;top:372px;padding:8px 20px;border-radius:14px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:38px;z-index:9;font-variant-numeric:tabular-nums;white-space:nowrap`, "🕛 12:10 AM");
  E.K(hud, "s", [[0, .7], [.3, 1, "back"]]); E.K(clk, "s", [[0, .7], [.3, 1, "back"]]);
  E.F(t => {
    const b = bat(t), r = Math.round(b), chg = late(t), red = b <= 8 && !chg;
    fill.style.width = `${Math.max(6, 172 * b / 100 * 100 / 100)}px`; fill.style.width = `${Math.max(8, 166 * b / 100)}px`;
    fill.style.background = chg ? "#3fc46b" : red ? (Math.floor(t * 4) % 2 && t > LOW ? "#ff9a8a" : "#e5493a") : "#e5493a";
    const tx = `${r}%${chg ? " ⚡" : ""}`; if (num.textContent !== tx) num.textContent = tx;
    num.style.color = chg ? "#7dffa4" : b <= 8 ? "#ff8a7a" : "#fff";
    const sh = t > LOW && t < LOW + .7 ? Math.sin(t * 60) * 8 : 0; hud.style.transform = `translateX(${sh}px) scale(${1 + (t > LOW && t < R3 ? Math.sin(t * 8) * .025 : 0)})`;
    let mins; if (!late(t)) mins = 10 + Math.floor(seg(t, 0, WIPE) * 8); else mins = 92 + Math.floor(seg(t, R4, R5 - R4) * 75);
    const h = late(t) ? 1 + Math.floor(mins / 60) : 12, m = mins % 60, ap = "AM"; const s = `🕛 ${h}:${String(m).padStart(2, "0")} ${ap}`; if (clk.textContent !== s) clk.textContent = s;
  });
  E.clip(LOW, "sfx/elx-lowbatt.wav", { vol: .9 }); E.clip(LOW + 1.2, "sfx/elx-lowbatt.wav", { vol: .7 });

  // battery drains: app badges
  const badge = (txt, t0, left, top) => { const b = E.el(R, "abs", `left:${left}px;top:${top}px;padding:8px 22px;border-radius:16px;background:${CORAL};color:#fff;font-weight:900;font-size:44px;z-index:9;white-space:nowrap;opacity:0`, txt);
    E.K(b, "o", [[t0, 0], [t0 + .05, 1], [t0 + 1.0, 1], [t0 + 1.25, 0]]); E.K(b, "y", [[t0, 0], [t0 + 1.25, -60]]); E.K(b, "s", [[t0, .5], [t0 + .25, 1, "back"]]); E.S(t0, "pop", .4); };
  badge("📸 −3%", 3.9, 40, 470); badge("🗺️ −2%", 4.7, 300, 470); badge("🎥 −4%", 5.5, 100, 570);

  // ================= Nina’s messages =================
  const AV = 96;
  const note = (txt, t0, t1) => {
    const n = E.el(R, "abs", `left:400px;top:440px;width:640px;padding:12px 20px 14px 14px;border-radius:26px;background:rgba(255,255,255,.97);box-shadow:0 14px 34px rgba(0,0,0,.4);z-index:12;display:flex;gap:16px;align-items:center;color:${INK};opacity:0`);
    const av = E.el(n, "", `width:${AV}px;height:${AV}px;border-radius:50%;overflow:hidden;flex:none;background:#eee`); E.img(av, "nina", `width:${AV}px;height:${AV}px;object-fit:cover;object-position:50% 30%`);
    const tb = E.el(n, "", ""); E.el(tb, "", "font-size:24px;font-weight:800;color:#777;letter-spacing:.05em", "NINA"); E.el(tb, "", "font-size:38px;font-weight:800;line-height:1.05;letter-spacing:-.02em", txt);
    E.K(n, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.K(n, "y", [[t0, -60], [t0 + .3, 0, "back"]]); E.S(t0 + .02, "pop", .4); return n;
  };
  note("Text me when<br>you’re home!", N1, N1 + 2.0);
  note("I’ve got one!", N2, N2 + .9);
  note("Oh. Mine’s the other<br>kind too.", N3, N3 + 2.2);
  note("It’s been an hour.", N4, N4 + 1.5);

  // ================= the charger hunt panel =================
  const panel = E.el(R, "abs", `left:40px;top:570px;width:560px;padding:14px 22px 10px;border-radius:26px;background:rgba(20,26,32,.94);box-shadow:0 18px 44px rgba(0,0,0,.45);z-index:8;color:#fff`);
  E.K(panel, "o", [[R3 - .1, 0], [R3 + .1, 1], [WIPE - .1, 1], [WIPE + .1, 0]]); E.K(panel, "s", [[R3 - .1, .8], [R3 + .3, 1, "back"]]);
  E.el(panel, "", `font-weight:900;font-size:28px;letter-spacing:.1em;color:${GOLD};margin-bottom:2px`, "🔋 CHARGER SEARCH");
  const ROWS = [["🔌", "Sal’s charger", S1 + .6, S1 + 1.9, "✖ other plug", CORAL], ["🔌", "Nina’s cable", N2 + .2, N3 + 1.9, "✖ other plug", CORAL], ["🔋", "Barry’s power bank", B1 + .1, B2 + 1.0, "✖ 0%", CORAL], ["⚡", "Outlet by the floor", B2 + 1.3, B2 + 1.9, "✔ found", GREEN]];
  ROWS.forEach(([em, name, tAdd, tRes, res, col]) => {
    const row = E.el(panel, "", "display:flex;align-items:center;gap:10px;font-weight:900;font-size:33px;height:0;overflow:hidden;opacity:0;white-space:nowrap;position:relative");
    E.el(row, "", "width:48px;text-align:center", em); E.el(row, "", "", name);
    const tag = E.el(row, "", `position:absolute;right:0;padding:1px 12px;border-radius:10px;background:${col};color:#fff;font-size:26px;opacity:0`, res);
    E.F(t => { const a = seg(t, tAdd, .2); row.style.height = `${Math.round(46 * a)}px`; row.style.opacity = a; const v = seg(t, tRes, .18); tag.style.opacity = v; tag.style.transform = `translateX(${(1 - v) * 50}px)`; });
    E.S(tAdd, "pop", .3); E.S(tRes, col === GREEN ? "ding" : "nope", .35);
  });

  // ================= Sal behind the bar =================
  const SH = 720, SVIS = .8;
  const salBox = E.el(R, "abs", `left:0;top:${1125 - SH * SVIS}px;width:1080px;height:${SH * SVIS}px;overflow:hidden;z-index:2`);
  const salPose = t => (t >= S1 - .1 && t < S1 + 1.9) || (t >= B2 + 1.2 && t < WIPE) ? "host" : "flat";
  const SAL = {}; [["flat", 733, 1105], ["host", 827, 1104]].forEach(([k, w, h]) => { const W = SH * w / h; SAL[k] = E.img(salBox, k, `position:absolute;left:${800 - W / 2}px;top:0;width:${W}px;height:${SH}px;opacity:0`); });
  E.F(t => { const p = salPose(t); Object.entries(SAL).forEach(([k, im]) => { im.style.opacity = k === p ? 1 : 0; }); salBox.style.transform = `translateY(${Math.sin(t * 1.5) * 2}px)`; });

  // ================= Rico (standing → on the floor), Barry =================
  const fig = (img, H, w, h, cx, bottom, z, show) => {
    const W = H * w / h; const f = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const fi = E.el(f, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`); E.img(fi, img, `width:${W}px;height:${H}px`);
    E.F(t => { f.style.opacity = show(t) ? 1 : 0; }); return [f, fi];
  };
  const [sm, smi] = fig("smug", 820, 325, 667, 300, 1945, 6, t => t < R2 - .1);
  const [sh, shi] = fig("shock", 840, 863, 1155, 330, 1935, 6, t => t >= R2 - .1 && t < WIPE + .1);
  const [fl, fli] = fig("floor", 640, 343, 536, 400, 1880, 6, t => late(t));
  E.F(t => { smi.style.transform = `translateY(${Math.sin(t * 1.7) * 4}px)`; shi.style.transform = `translate(${t < R3 ? Math.sin(t * 34) * 5 : 0}px,${Math.sin(t * 1.9) * 4}px)`; fli.style.transform = `translateY(${Math.sin(t * 1.4) * 3}px)`; });
  const [bf, bfi] = fig("barry", 780, 287, 661, 820, 1950, 5, t => t >= BR && t < WIPE + .1);
  E.F(t => { bf.style.transform = `translateX(${(1 - seg(t, BR, .35)) * 420}px)`; });
  const pbank = E.el(R, "abs", `left:632px;top:1195px;width:96px;height:160px;border-radius:18px;background:linear-gradient(160deg,#2c3540,#141a20);border:3px solid #56606c;z-index:7;opacity:0;transform:rotate(-14deg);box-shadow:0 8px 20px rgba(0,0,0,.5)`);
  E.el(pbank, "abs", "left:14px;top:14px;right:14px;height:14px;border-radius:7px;background:#414b57");
  const pb0 = E.el(pbank, "abs", "left:0;right:0;top:60px;text-align:center;color:#ff6b57;font-weight:900;font-size:34px", "0%");
  E.K(pbank, "o", [[BR + .3, 0], [BR + .35, 1], [WIPE, 1], [WIPE + .1, 0]]);
  E.S(B1 + .1, "pop", .4);

  // the floor scene: outlet, cable, charging
  const cable = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:7;pointer-events:none;opacity:0", "");
  cable.innerHTML = `<svg width="1080" height="1920" viewBox="0 0 1080 1920"><path d="M330 1655 C300 1800 180 1830 110 1790" fill="none" stroke="#f4f4f4" stroke-width="7" stroke-linecap="round"/></svg>`;
  const outlet = E.el(R, "abs", "left:40px;top:1700px;width:96px;height:130px;border-radius:14px;background:linear-gradient(#f3f0e8,#d9d4c7);box-shadow:0 8px 18px rgba(0,0,0,.5);z-index:6;opacity:0");
  [22, 76].forEach(y => { const s = E.el(outlet, "abs", `left:26px;top:${y - 8}px;width:44px;height:40px;border-radius:10px;background:#3a3a3a`); E.el(s, "abs", "left:12px;top:10px;width:5px;height:16px;background:#111"); E.el(s, "abs", "left:27px;top:10px;width:5px;height:16px;background:#111"); });
  const chg = E.el(R, "abs", "left:470px;top:1290px;padding:10px 24px;border-radius:16px;background:#1a9c5b;color:#fff;font-weight:900;font-size:40px;z-index:9;opacity:0;white-space:nowrap", "⚡ charging… slowly");
  E.K(cable, "o", [[WIPE + .2, 0], [WIPE + .3, 1]]); E.K(outlet, "o", [[WIPE + .2, 0], [WIPE + .3, 1]]); E.K(chg, "o", [[R4 - .2, 0], [R4, 1]]); E.K(chg, "s", [[R4 - .2, .6], [R4 + .2, 1, "back"]]);
  E.wipe(WIPE); E.clip(WIPE + .3, "sfx/elx-plug-in.wav", { vol: .7 }); E.clip(WIPE - .2, "sfx/elx-powerdown.wav", { vol: .35 });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:14px 22px 18px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const BT = 900;
  bubble("Twelve percent.<br><b>That’s plenty.</b>", { left: 90, top: BT, w: 560, tail: 210, t0: R1, t1: N1 - .1, size: 48 });
  bubble("What?! It was <b>twelve</b><br>a minute ago!", { left: 40, top: BT - 60, w: 620, tail: 270, t0: R2, t1: R3 - .2, size: 46 });
  bubble("Sal! Do you have<br>a <b>charger?</b>", { left: 40, top: BT - 60, w: 560, tail: 250, t0: R3, t1: S1 - .1, size: 46 });
  bubble("Sure! It’s the other<br>kind of plug.", { left: 590, top: 400, w: 470, tail: 280, t0: S1, t1: N2 - .1, size: 42, dark: true });
  bubble("Power bank!", { left: 420, top: 880, w: 380, tail: 260, t0: B1, t1: B2 - .05, size: 48 });
  bubble("It’s also <b>dead.</b>", { left: 400, top: 880, w: 420, tail: 300, t0: B2, t1: WIPE - .1, size: 48 });
  bubble("Five minutes…<br>I’m on <b>four</b> percent.", { left: 140, top: 1040, w: 600, tail: 300, t0: R4, t1: N4 - .1, size: 44 });
  bubble("<b>Four percent!</b>", { left: 130, top: 1060, w: 500, tail: 260, t0: R5, t1: STAMP - .1, size: 52 });
  const V = (t, f, v = 1.5) => E.clip(t + .05, `voices/sk79/${f}.wav`, { vol: v });
  V(R1, "r1"); V(N1, "n1"); V(R2, "r2"); V(R3, "r3"); V(S1, "s1"); V(N2, "n2"); V(N3, "n3"); V(B1, "b1"); V(B2, "b2"); V(R4, "r4"); V(N4, "n4"); V(R5, "r5");
  E.music({ bpm: 110, root: 55, seed: 79, prog: [[0, 3, 7], [5, 8, 12], [7, 10, 14], [3, 7, 10]], until: LOW });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:860px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "12% IS<br>A LIE.", STAMP, { size: 130, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“12% is *plenty*.”", { size: 64, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
