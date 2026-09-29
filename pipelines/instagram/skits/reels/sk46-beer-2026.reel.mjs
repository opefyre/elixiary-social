// SK.46 "Ordering a beer in 2026." (the trending "POV: [ordinary thing] in 2026" format) — "Hi! Can I get a beer?" Sal:
// "Scan the QR code." The phone takes over: scan → download SipApp (214 MB) → create account (password must contain an
// emoji and your mother's maiden name) → 6-digit code → 1,284 cookie partners → notifications → SipClub loyalty tiers →
// "rate your experience" (before ordering) → customise foam → tip 25/30/40% before anything is poured → preparing 3 of 47…
// SESSION EXPIRED. "…Can I just… get a beer?" Sal: "Scan the QR code."  Voices: ElevenLabs (him: Alex; Sal: Chris).
export const meta = {
  id: "sk46-beer-2026",
  images: { smile: "cutouts/guy_smile.webp", stare: "cutouts/guy_stare.webp", order: "cutouts/guy_order.webp", sal: "cutouts/salc_wait.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", BLUE = "#3a7bff", RED = "#e5484d";
  E.episode(-16);
  const G1 = .4, S1 = 1.9, PHONE = 3.1, STEP = 1.02, EXPIRE = 16.1, G2 = 17.0, S2 = 19.9, STAMP = 21.2, DUR = 24.0;
  E.music({ bpm: 118, root: 62, seed: 46, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: EXPIRE });
  const S = E.scene("bar", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1500;

  // ================= the bar =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#232a33,#2c3440 60%,#1a1f26)");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.03) 0 4px,transparent 4px 120px)");
  const SH = 820, SW = SH * 754 / 1104;
  const sal = E.el(R, "abs", `left:${820 - SW / 2}px;top:${TOP + 40 - SH}px;width:${SW}px;height:${SH}px;z-index:1`);
  const sIn = E.el(sal, "abs", `left:0;top:0;width:${SW}px;height:${SH}px`);
  E.img(sIn, "sal", `width:${SW}px;height:${SH}px`);
  E.F(t => { sIn.style.transform = `translateY(${Math.sin(t * 1.6) * 3}px)`; });
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;z-index:2;background:linear-gradient(180deg,#5a4636,#3a2c22);box-shadow:inset 0 10px 0 #7a5e48`);
  // the QR sticker on the counter
  const qr = E.el(R, "abs", `left:600px;top:${TOP - 130}px;width:120px;height:140px;z-index:3;background:#fff;border-radius:8px;padding:8px;box-sizing:border-box;box-shadow:0 6px 14px rgba(0,0,0,.4)`);
  let q = ""; for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) if (((i * 7 + j * 13 + i * j) % 3 === 0) || (i < 3 && j < 3) || (i < 3 && j > 8) || (i > 8 && j < 3)) q += `<rect x="${j * 8.5}" y="${i * 8.5}" width="8.5" height="8.5" fill="#111"/>`;
  qr.innerHTML = `<svg viewBox="0 0 102 102" width="104" height="104">${q}</svg><div style="font-weight:900;font-size:13px;color:#111;text-align:center">SCAN TO ORDER</div>`;
  const ptr = E.el(R, "abs", `left:640px;top:${TOP - 230}px;font-size:70px;z-index:4;opacity:0`, "👇");
  E.K(ptr, "o", [[S1, 0], [S1 + .1, 1], [PHONE, 1], [PHONE + .1, 0], [S2, 0], [S2 + .1, 1]]); E.K(ptr, "y", [[S1, -30], [S1 + .3, 0, "back"], [S2, -30], [S2 + .3, 0, "back"]]);

  // ================= him =================
  const GH = 940;
  const him = E.el(R, "abs", `left:0;top:0;width:1080px;height:1920px;z-index:5`);
  const hIn = E.el(him, "abs", "left:0;top:0;width:1080px;height:1920px");
  const P = { smile: [821, 1122], stare: [873, 1030], order: [872, 1121] };
  const hEls = Object.fromEntries(Object.entries(P).map(([n, [w, h]]) => [n, E.img(hIn, n, `position:absolute;left:${280 - GH * w / h / 2}px;top:${1960 - GH}px;width:${GH * w / h}px;height:${GH}px`)]));
  const HP = [[0, "smile"], [PHONE + 2 * STEP, "stare"], [PHONE + 6 * STEP, "order"], [PHONE + 7 * STEP, "stare"], [G2 - .1, "order"], [S2 + .3, "stare"]];
  E.F(t => { const f = at(HP, t); for (const n in hEls) hEls[n].style.opacity = n === f ? 1 : 0; let y = Math.sin(t * 2) * 3; for (const [k] of HP.slice(1)) if (t >= k && t < k + .2) y -= Math.sin((t - k) / .2 * Math.PI) * 14; hIn.style.transform = `translateY(${y}px)`; });

  // ================= the phone =================
  const phone = E.el(R, "abs", "left:250px;top:380px;width:580px;height:1000px;border-radius:56px;background:#0b0b0e;box-shadow:0 0 0 12px #1d1d22,0 40px 80px rgba(0,0,0,.6);z-index:6;opacity:0;overflow:hidden");
  E.K(phone, "o", [[PHONE, 0], [PHONE + .2, 1], [S2 - .3, 1], [S2, 0]]); E.K(phone, "y", [[PHONE, 400], [PHONE + .45, 0, "out"], [S2 - .3, 0], [S2, 400, "in"]]);
  const scr = E.el(phone, "abs", "left:14px;top:14px;width:552px;height:972px;border-radius:44px;background:#f6f7fb;overflow:hidden;font-family:Inter,'Noto Sans',sans-serif");
  const bar = E.el(scr, "abs", `left:0;top:0;width:552px;height:110px;background:${BLUE};color:#fff;display:flex;align-items:flex-end;justify-content:space-between;padding:0 28px 18px;box-sizing:border-box`);
  E.el(bar, "", "font-weight:900;font-size:34px", "🍺 SipApp");
  const stepEl = E.el(bar, "", "font-weight:800;font-size:24px;opacity:.9;font-variant-numeric:tabular-nums");
  const body = E.el(scr, "abs", "left:0;top:82px;width:409px;height:638px;padding:26px 24px;box-sizing:border-box;zoom:1.35;color:" + INK);   // zoom scales left/top too: 82×1.35 ≈ 110
  const btn = (txt, col = BLUE) => `<div style="margin-top:26px;padding:22px;border-radius:18px;background:${col};color:#fff;font-weight:900;font-size:32px;text-align:center">${txt}</div>`;
  const bar2 = (p, col = BLUE) => `<div style="margin-top:26px;height:26px;border-radius:13px;background:#dde2ee;overflow:hidden"><div style="width:${p}%;height:100%;background:${col}"></div></div>`;
  const h = (t, s = 44) => `<div style="font-weight:900;font-size:${s}px;line-height:1.1">${t}</div>`;
  const p_ = (t) => `<div style="margin-top:16px;font-size:28px;color:#556;line-height:1.3">${t}</div>`;
  const field = (t) => `<div style="margin-top:18px;padding:18px 20px;border-radius:14px;border:3px solid #cfd6e4;font-size:28px;color:#889">${t}</div>`;
  const SCREENS = [
    (u) => h("📷 Scanning…") + `<div style="margin:40px auto 0;width:320px;height:320px;border:8px solid ${BLUE};border-radius:24px;position:relative"><div style="position:absolute;left:0;top:${Math.round(u * 300)}px;width:100%;height:6px;background:${RED}"></div></div>`,
    (u) => h("Download SipApp") + p_("214 MB · Free · Contains ads") + bar2(Math.round(u * 100)),
    () => h("Create account") + field("email@…") + field("Password") + p_("Must contain: 1 capital · 1 symbol · 1 emoji · your mother’s maiden name"),
    () => h("Check your email ✉️") + p_("Enter the 6-digit code we sent you") + `<div style="margin-top:30px;display:flex;gap:12px;justify-content:center">${[4, 8, 1, "", "", ""].map(d => `<div style="width:62px;height:84px;border-radius:12px;border:3px solid #cfd6e4;font-weight:900;font-size:48px;text-align:center;line-height:84px">${d}</div>`).join("")}</div>`,
    () => h("🍪 We value your privacy", 40) + p_("We and our <b>1,284 partners</b> use cookies to improve your beer.") + btn("Accept all") + `<div style="margin-top:14px;text-align:center;font-size:22px;color:#aab">manage 1,284 settings</div>`,
    () => h("🔔 Allow notifications?", 40) + p_("Get updates about your beer, other beers, and beers near you.") + btn("Allow") ,
    () => h("👑 Join SipClub!", 42) + ["🥉 Bronze — free", "🥈 Silver — €4.99/mo", "🥇 Gold — €9.99/mo", "💎 Platinum — ask"].map(s => `<div style="margin-top:16px;padding:16px 20px;border-radius:14px;background:#eef1f8;font-size:28px;font-weight:700">${s}</div>`).join(""),
    () => h("How was your experience?", 38) + `<div style="margin-top:34px;font-size:78px;text-align:center;letter-spacing:6px">⭐⭐⭐⭐⭐</div>` + p_("(you haven’t ordered yet)"),
    () => h("🍺 House Lager") + p_("Customise:") + ["Foam thickness", "Glass temperature", "Bubble density"].map(s => `<div style="margin-top:22px;font-size:26px;font-weight:700">${s}</div><div style="margin-top:10px;height:12px;border-radius:6px;background:#dde2ee;position:relative"><div style="position:absolute;left:${30 + (s.length * 7) % 50}%;top:-10px;width:32px;height:32px;border-radius:50%;background:${BLUE}"></div></div>`).join(""),
    () => h("Add a tip? 🙏", 46) + p_("Nothing has been poured yet.") + ["25%", "30%", "40%"].map((s, i) => `<div style="display:inline-block;margin:26px 12px 0 0;width:140px;padding:26px 0;border-radius:18px;background:${i === 2 ? CORAL : "#eef1f8"};color:${i === 2 ? "#fff" : INK};font-weight:900;font-size:38px;text-align:center">${s}</div>`).join("") + `<div style="margin-top:22px;font-size:22px;color:#aab">custom (discouraged)</div>`,
    (u) => h("Your beer is being prepared…", 38) + p_(`Step ${3 + Math.round(u * 0)} of 47 · estimated 45 min`) + bar2(6) + `<div style="margin-top:40px;font-size:120px;text-align:center">⏳</div>`,
  ];
  const T0 = PHONE + .3;
  E.F(t => {
    let html, k;
    if (t >= EXPIRE) { html = h("⚠️ Session expired", 46) + p_("Please start again.") + btn("Scan QR code", RED); k = 1; }
    else { const i = clamp(Math.floor((t - T0) / STEP), 0, SCREENS.length - 1); const u = seg(t, T0 + i * STEP, STEP); html = SCREENS[i](u); k = Math.min(47, 1 + i * 4 + Math.floor(u * 4)); }
    if (body.__h !== html) { body.innerHTML = html; body.__h = html; }
    const st = t >= EXPIRE ? "Step 1 of 47" : `Step ${k} of 47`; if (stepEl.__s !== st) { stepEl.textContent = st; stepEl.__s = st; }
    bar.style.background = t >= EXPIRE ? RED : BLUE;
  });
  for (let i = 0; i < SCREENS.length; i++) E.S(T0 + i * STEP, "tick", .6);
  E.S(EXPIRE, "nope", 1); E.shake(EXPIRE, 12, .3); E.clip(EXPIRE + .05, "sfx/record-silence.wav", { vol: .6 });
  const tipFlash = E.el(R, "abs", `left:0;top:0;width:1080px;height:1920px;z-index:5;background:rgba(229,72,77,.18);opacity:0`);
  const TIP = T0 + 9 * STEP; E.K(tipFlash, "o", [[TIP, 0], [TIP + .1, 1], [TIP + STEP, 1], [TIP + STEP + .1, 0]]); E.clip(TIP, "sfx/elx-register.wav", { vol: .5 });
  const exp = E.el(R, "abs", `left:0;top:1420px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 26px;border-radius:18px;background:${RED};color:#fff;font-weight:900;font-size:44px">⏱ 14 minutes. 0 beers.</span>`);
  E.K(exp, "o", [[EXPIRE + .3, 0], [EXPIRE + .5, 1], [S2 - .2, 1], [S2, 0]]);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 52, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Hi! Can I get<br>a beer? 🍺", { left: 60, top: 900, w: 460, tail: 220, t0: G1, t1: S1 - .05 });
  bubble("Scan the QR code.", { left: 560, top: 540, w: 460, tail: 260, t0: S1, t1: PHONE, dark: true });
  bubble("…Can I just…<br>get a beer?", { left: 60, top: 900, w: 460, tail: 220, t0: G2, t1: S2 - .05, italic: true });
  bubble("Scan the QR code.", { left: 560, top: 540, w: 460, tail: 260, t0: S2, t1: DUR, dark: true });
  E.clip(G1 + .05, "voices/sk46/g1.wav", { vol: 1.5 }); E.clip(S1 + .05, "voices/sk46/s1.wav", { vol: 1.6 }); E.clip(G2 + .05, "voices/sk46/g2.wav", { vol: 1.6 }); E.clip(S2 + .05, "voices/sk46/s1.wav", { vol: 1.6 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-lounge.wav", { vol: .18, to: Math.min(6, DUR - t), duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1560px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "STEP 1 OF 47.", STAMP, { size: 96, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Ordering a beer *in 2026.*", { size: 62, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, PHONE, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
