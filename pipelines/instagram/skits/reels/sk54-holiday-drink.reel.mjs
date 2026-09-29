// SK.54 "The holiday cocktail." — golden-hour beach bar: ☀️ 31°, steel drums, no emails. Rico: "Oh my god. This is the best
// drink I've ever had in my life." 10/10. "I'm buying a bottle!" (duty-free, €38). ✈️ Two weeks later: a grey kitchen, rain,
// Tuesday, 47 unread emails, the neighbour's drill. Sip. "…Tastes like cough syrup." 2/10 (somehow it's blue now). He tries to
// rebuild the vibe — paper umbrella, wave sounds on the phone, the desk lamp as a sun: 2/10. The phone: flight to paradise,
// €649. "…Book the flight." €649 FOR A €38 DRINK.  Voices: ElevenLabs (Rico: Liam).
export const meta = {
  id: "sk54-holiday-drink",
  images: { beach: "bg/beach.jpg", kitchen: "bg/kitchen.jpg", present: "cutouts/friend_present.webp", point: "cutouts/friend_point.webp", hoodie: "cutouts/rico_hoodie.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", BLUE = "#2f7bf6";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const R1 = 1.0, R2 = 6.6, HOME = 8.8, SIP = 10.0, R3 = 11.0, TRY = 12.8, PHONE = 15.6, R4 = 16.5, BOOKED = 17.9, STAMP = 19.0, DUR = 22.2;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };

  const rating = (P, t0, t1, name, score, stars, extra = "") => {
    const c = E.el(P, "abs", "left:60px;top:360px;width:960px;padding:18px 26px;border-radius:26px;background:rgba(255,255,255,.95);box-shadow:0 18px 40px rgba(0,0,0,.25);z-index:8;opacity:0;display:flex;justify-content:space-between;align-items:center");
    E.el(c, "", `font-weight:800;font-size:40px;color:${INK}`, `${name}${extra ? `<div style="font-size:26px;color:#889;font-weight:700">${extra}</div>` : ""}`);
    E.el(c, "", `font-weight:900;font-size:56px;color:${score >= 8 ? "#1f9a5a" : CORAL};white-space:nowrap`, `${score}/10 <span style="font-size:34px">${stars}</span>`);
    E.K(c, "o", [[t0, 0], [t0 + .15, 1], [t1 - .15, 1], [t1, 0]]); E.K(c, "s", [[t0, .7], [t0 + .3, 1, "back"]]); E.S(t0, "ding", .6);
  };
  const chips = (P, list, y) => list.forEach(([txt, t0, t1, x], i) => {
    const c = E.el(P, "abs", `left:${x}px;top:${y + (i % 2) * 70}px;padding:8px 18px;border-radius:16px;background:rgba(20,35,29,.85);color:#fff;font-weight:800;font-size:34px;z-index:8;opacity:0;white-space:nowrap`, txt);
    E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .25, 1, "back"]]); E.S(t0, "pop", .35);
  });

  // ================= scene 1: the beach bar =================
  const A = E.scene("beach", 0, HOME, "light"); E.cur = A; const P = A.el;
  const bg = E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "beach", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 60%");
  E.F(t => { bgI.style.transform = `scale(${1.04 + t * .004})`; });
  const RH = 980, RW = RH * 766 / 1126, PW = RH * 861 / 1124;
  const rico = E.el(P, "abs", `left:${540 - RW / 2}px;top:${1960 - RH}px;width:${RW}px;height:${RH}px;z-index:3`);
  const rIn = E.el(rico, "abs", `left:0;top:0;width:${RW}px;height:${RH}px;transform-origin:50% 100%`);
  const rP = E.img(rIn, "present", `position:absolute;left:0;top:0;width:${RW}px;height:${RH}px`);
  const rT = E.img(rIn, "point", `position:absolute;left:${(RW - PW) / 2}px;top:0;width:${PW}px;height:${RH}px`);
  E.F(t => { const p = t >= R2 - .1; rP.style.opacity = p ? 0 : 1; rT.style.opacity = p ? 1 : 0; rIn.style.transform = `translateY(${Math.sin(t * 2) * 5}px) rotate(${Math.sin(t * 1.2) * 1.5}deg)`; });
  rating(P, R1 + 2.4, HOME, "🍹 “Sunset Special”", 10, "⭐⭐⭐⭐⭐", "beach bar · 19:40");
  chips(P, [["☀️ 31°", .5, HOME, 60], ["🥁 live steel drums", .9, HOME, 300], ["🌅 sunset", 1.3, HOME, 700], ["📵 0 emails", 1.7, HOME, 640]], 560);
  const bag = E.el(P, "abs", `left:640px;top:1100px;padding:12px 22px;border-radius:18px;background:#fff;color:${INK};font-weight:900;font-size:38px;z-index:8;opacity:0;box-shadow:0 12px 30px rgba(0,0,0,.3)`, "🛍️ duty-free: 1 bottle · €38");
  E.K(bag, "o", [[R2 + 1.0, 0], [R2 + 1.1, 1], [HOME, 1]]); E.K(bag, "s", [[R2 + 1.0, .5], [R2 + 1.3, 1, "back"]]); E.clip(R2 + 1.0, "sfx/elx-register.wav", { vol: .5 });
  E.clip(0, "sfx/elx-waves.wav", { vol: .35, to: HOME, duck: true });
  E.music({ bpm: 104, root: 64, seed: 54, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: HOME });

  // ================= scene 2: home, two weeks later =================
  const B = E.scene("kitchen", HOME, DUR, "dark"); E.cur = B; const Q = B.el;
  E.wipe(HOME); E.clip(HOME - .3, "sfx/elx-trailer-whoosh.wav", { vol: .5 });
  const bg2 = E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  E.img(bg2, "kitchen", "position:absolute;left:0;top:0;width:1080px;height:1920px");
  const flick = E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:#000;opacity:0;pointer-events:none;z-index:1");
  E.F(t => { flick.style.opacity = (Math.floor(t * 9) % 23 === 0) ? .35 : 0; });
  const later = E.el(Q, "abs", `left:0;top:360px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:12px 28px;border-radius:18px;background:${INK};color:#fff;font-weight:900;font-size:48px">✈️ two weeks later</span>`);
  E.K(later, "o", [[HOME + .2, 0], [HOME + .35, 1], [SIP + .5, 1], [SIP + .7, 0]]);
  const HH = 940, HW = HH * 672 / 951;
  const home = E.el(Q, "abs", `left:${520 - HW / 2}px;top:${1960 - HH}px;width:${HW}px;height:${HH}px;z-index:3`);
  const hIn = E.el(home, "abs", `left:0;top:0;width:${HW}px;height:${HH}px;transform-origin:50% 100%`);
  E.img(hIn, "hoodie", `width:${HW}px;height:${HH}px`);
  E.F(t => { let y = Math.sin(t * 1.6) * 3; if (t >= SIP && t < SIP + .3) y -= Math.sin((t - SIP) / .3 * Math.PI) * 20; hIn.style.transform = `translateY(${y}px) rotate(${t > SIP && t < R3 + 1.2 ? Math.sin(t * 30) * 1.5 : 0}deg)`; });
  E.clip(SIP, "sfx/elx-sip.wav", { vol: .8, to: .8 });
  rating(Q, R3 + 1.3, PHONE, "🍹 “Sunset Special”", 2, "⭐☆☆☆☆", "kitchen · Tuesday · somehow it’s blue now");
  chips(Q, [["🌧️ 11°", HOME + .6, PHONE, 60], ["📅 Tuesday", HOME + .9, PHONE, 260], ["💼 47 unread emails", HOME + 1.2, PHONE, 600], ["🔨 the neighbour’s drill", HOME + 1.5, PHONE, 520]], 560);
  E.clip(HOME + 1.5, "sfx/rain-heavy.wav", { vol: .25, to: DUR - HOME - 1.5, duck: true });
  // rebuilding the vibe
  const umb = E.el(Q, "abs", "left:330px;top:1370px;width:120px;height:130px;z-index:4;opacity:0");
  umb.innerHTML = `<svg viewBox="0 0 120 130" width="120" height="130"><path d="M10 50 Q60 0 110 50 Z" fill="${CORAL}"/><path d="M30 50 Q40 30 60 26 M90 50 Q80 30 60 26" stroke="#fff" stroke-width="4" fill="none"/><path d="M60 50 V128" stroke="#8a6a3a" stroke-width="6"/></svg>`;
  E.K(umb, "o", [[TRY, 0], [TRY + .1, 1]]); E.K(umb, "y", [[TRY, -80], [TRY + .3, 0, "back"]]);
  const sun = E.el(Q, "abs", "left:700px;top:520px;width:300px;height:300px;border-radius:50%;z-index:2;opacity:0;background:radial-gradient(closest-side,rgba(255,230,140,.95),rgba(255,200,80,.4) 60%,rgba(255,200,80,0))");
  E.K(sun, "o", [[TRY + 1.4, 0], [TRY + 1.6, 1]]);
  [["🌂 + paper umbrella", TRY], ["🔊 + ‘ocean waves’ on YouTube", TRY + .7], ["💡 + desk lamp ‘sun’", TRY + 1.4]].forEach(([txt, t0], i) => chips(Q, [[txt, t0, PHONE, 40]], 1440 + i * 76));
  E.clip(TRY + .7, "sfx/elx-waves.wav", { vol: .3, to: PHONE - TRY - .7 });
  const still = E.el(Q, "abs", `left:640px;top:1100px;padding:10px 22px;border-radius:16px;background:${CORAL};color:#fff;font-weight:900;font-size:40px;z-index:8;opacity:0`, "still 2/10");
  E.K(still, "o", [[TRY + 2.2, 0], [TRY + 2.3, 1], [PHONE, 1], [PHONE + .1, 0]]); E.S(TRY + 2.2, "nope", .7);
  // the phone: booking the flight
  const phWrap = E.el(Q, "abs", "left:240px;top:340px;width:600px;height:900px;z-index:9;transform:scale(.74);transform-origin:50% 0");
  const phone = E.el(phWrap, "abs", "left:0;top:0;width:600px;height:900px;border-radius:52px;background:#0b0b0e;box-shadow:0 0 0 12px #1d1d22,0 40px 80px rgba(0,0,0,.6);z-index:9;opacity:0;overflow:hidden");
  phone.innerHTML = `<div style="position:absolute;left:14px;top:14px;width:572px;height:872px;border-radius:40px;background:#f6f7fb;overflow:hidden;font-family:Inter,'Noto Sans',sans-serif;color:${INK}">` +
    `<div style="height:110px;background:${BLUE};color:#fff;font-weight:900;font-size:40px;padding:48px 30px 0;box-sizing:border-box">✈️ SkyDeals</div>` +
    `<div style="padding:30px"><div style="font-weight:900;font-size:46px">Paradise Island</div><div style="font-size:30px;color:#667;margin-top:8px">Leaving Friday · 7 nights</div>` +
    `<div style="margin-top:30px;height:240px;border-radius:24px;background:linear-gradient(180deg,#ffb36a,#ff7a6a 50%,#4ac0d8 51%,#2a8ab0);position:relative"><div style="position:absolute;left:220px;top:60px;width:100px;height:100px;border-radius:50%;background:#ffe08a"></div></div>` +
    `<div style="margin-top:30px;font-weight:900;font-size:64px">€649</div><div id="bk" style="margin-top:24px;padding:26px;border-radius:20px;background:${BLUE};color:#fff;font-weight:900;font-size:40px;text-align:center">BOOK NOW</div></div></div>`;
  const bk = phone.querySelector("#bk");
  E.K(phone, "o", [[PHONE, 0], [PHONE + .2, 1]]); E.K(phone, "y", [[PHONE, 400], [PHONE + .45, 0, "out"]]);
  E.F(t => { const ok = t >= BOOKED; const h = ok ? "BOOKED ✓" : "BOOK NOW"; if (bk.textContent !== h) bk.textContent = h; bk.style.background = ok ? "#1f9a5a" : BLUE; });
  E.S(BOOKED, "ding", .9); E.clip(BOOKED, "sfx/elx-chaching.wav", { vol: .6 });

  // ================= bubbles & voices =================
  const bubble = (Pn, html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(Pn, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.35);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble(P, "Oh my god. This is the best<br>drink I’ve ever had in my life.", { left: 60, top: 760, w: 760, tail: 420, t0: R1, t1: R2 - .1, size: 44 });
  bubble(P, "I’m buying a bottle! 🛍️", { left: 160, top: 800, w: 560, tail: 330, t0: R2, t1: HOME });
  bubble(Q, "…Tastes like<br>cough syrup.", { left: 560, top: 820, w: 460, tail: 120, t0: R3, t1: TRY + 1, italic: true });
  bubble(Q, "…Book the<br>flight.", { left: 690, top: 1060, w: 360, tail: 70, t0: R4, t1: DUR, dark: true, italic: true });
  E.clip(R1 + .05, "voices/sk54/r1.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk54/r2.wav", { vol: 1.5 }); E.clip(R3 + .05, "voices/sk54/r3.wav", { vol: 1.6 }); E.clip(R4 + .05, "voices/sk54/r4.wav", { vol: 1.6 });

  // ================= stamp + title =================
  const stampBox = E.el(Q, "abs", "left:0;top:1560px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "€649 FOR A €38 DRINK.", STAMP, { size: 76, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  E.cur = A;
  const titleBox = E.el(P, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The *holiday* cocktail.", { size: 64, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.55)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
