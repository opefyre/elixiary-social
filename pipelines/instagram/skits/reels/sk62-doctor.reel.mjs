// SK.62 "The doctor asks how much you drink." — "So… how many drinks do you have a week?" Alex, fingers pinched: "Oh, not
// much. Two… three, maybe?" The lie detector in the corner goes wild. The doctor's notes: 3. "And how big is 'a glass'?"
// "Normal size." REALITY: a glass the size of a vase — a whole bottle glugs in. ×3. "And your week starts on…?" "Friday.
// …Ish. Wednesday." REALITY: the calendar — the weekend runs Wednesday to Sunday. ×2 (he hesitated: ×2). = 36. "Is that
// bad?" The doctor, sipping from her mug: "Honestly? Less than me." EVERYONE LIES TO THE DOCTOR.
// Voices: ElevenLabs (doctor: Matilda; Alex).
export const meta = {
  id: "sk62-doctor",
  images: { clinic: "bg/clinic.jpg", skeptic: "cutouts/doc_skeptic.webp", sip: "cutouts/doc_sip.webp", pinch: "cutouts/alex_pinch.webp", stare: "cutouts/guy_stare.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", RED = "#e0342b";
  E.episode(-16);
  const D1 = .6, A1 = 3.3, LIE = 4.4, D2 = 6.8, A2 = 8.4, GLASS = 9.5, D3 = 12.0, A3 = 13.4, CAL = 16.4, A4 = 18.4, SIP = 19.3, D4 = 19.5, STAMP = 21.6, DUR = 24.8;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("clinic", 0, DUR, "light"); E.cur = S; const R = S.el;

  const bg = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "clinic", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 55%");
  E.F(t => { bgI.style.transform = `scale(${1.04 + t * .003})`; });
  // the doctor (right) and Alex (left)
  const DH = 1000, DW1 = DH * 594 / 995, DW2 = DH * 621 / 993;
  const doc = E.el(R, "abs", `left:${820 - DW1 / 2}px;top:${1980 - DH}px;width:${DW1}px;height:${DH}px;z-index:3`);
  const dIn = E.el(doc, "abs", `left:0;top:0;width:${DW1}px;height:${DH}px;transform-origin:50% 100%`);
  const dA = E.img(dIn, "skeptic", `position:absolute;left:0;top:0;width:${DW1}px;height:${DH}px`);
  const dB = E.img(dIn, "sip", `position:absolute;left:${(DW1 - DW2) / 2}px;top:0;width:${DW2}px;height:${DH}px`);
  const AH = 960, AW1 = AH * 587 / 955, AW2 = AH * 873 / 1030;
  const alex = E.el(R, "abs", `left:${260 - AW1 / 2}px;top:${1990 - AH}px;width:${AW1}px;height:${AH}px;z-index:4`);
  const aIn = E.el(alex, "abs", `left:0;top:0;width:${AW1}px;height:${AH}px;transform-origin:50% 100%`);
  const aA = E.img(aIn, "pinch", `position:absolute;left:0;top:0;width:${AW1}px;height:${AH}px`);
  const aB = E.img(aIn, "stare", `position:absolute;left:${(AW1 - AW2 * .85) / 2}px;top:${AH * .15}px;width:${AW2 * .85}px;height:${AH * .85}px`);
  E.F(t => {
    const sip = t >= SIP; dA.style.opacity = sip ? 0 : 1; dB.style.opacity = sip ? 1 : 0;
    const worried = t >= A4 + .8; aA.style.opacity = worried ? 0 : 1; aB.style.opacity = worried ? 1 : 0;
    dIn.style.transform = `translateY(${Math.sin(t * 1.4) * 3}px) rotate(${Math.sin(t * 1.1) * 1}deg)`;
    const sweat = t > LIE && t < A4 + .8 ? Math.sin(t * 30) * 1.2 : 0;
    aIn.style.transform = `translateY(${Math.sin(t * 1.9) * 4}px) rotate(${sweat}deg)`;
  });
  // the lie detector
  const ld = E.el(R, "abs", "left:40px;top:450px;width:420px;height:210px;border-radius:22px;background:#f6f2e6;box-shadow:0 12px 28px rgba(0,0,0,.25);z-index:8;overflow:hidden;opacity:0");
  ld.innerHTML = `<div style="position:absolute;left:16px;top:10px;font-weight:900;font-size:26px;color:${INK}">🤥 LIE DETECTOR</div><div id="led" style="position:absolute;right:16px;top:14px;width:22px;height:22px;border-radius:50%;background:#3c3"></div><svg viewBox="0 0 420 160" width="420" height="160" style="position:absolute;left:0;top:50px"><path id="trace" d="" stroke="${RED}" stroke-width="4" fill="none"/></svg>`;
  const trace = ld.querySelector("#trace"), led = ld.querySelector("#led");
  E.K(ld, "o", [[A1, 0], [A1 + .15, 1], [A4, 1], [A4 + .2, 0]]);
  E.F(t => {
    let d = ""; for (let x = 0; x <= 420; x += 6) { const tt = t - (420 - x) / 420 * 2; const amp = tt >= LIE ? 60 : 6; d += `${x ? "L" : "M"}${x} ${80 + Math.sin(tt * 38 + x) * amp * Math.abs(Math.sin(tt * 7))}`; } trace.setAttribute("d", d);
    led.style.background = t >= LIE ? (Math.floor(t * 6) % 2 ? RED : "#700") : "#3c3";
  });
  E.S(LIE, "blare", .45); E.S(LIE + .5, "blare", .3);
  // the doctor's notes
  const notes = E.el(R, "abs", `left:600px;top:450px;width:440px;padding:18px 22px;border-radius:18px;background:#fffdf3;box-shadow:0 12px 28px rgba(0,0,0,.25);z-index:8;opacity:0;font-family:'Caveat','Comic Sans MS',cursive;color:#1a2a6a;transform:rotate(2deg)`);
  E.K(notes, "o", [[A1 + 2.2, 0], [A1 + 2.35, 1], [SIP, 1], [SIP + .2, 0]]);
  const LINES = [[A1 + 2.3, "Drinks / week: <b>3</b>"], [A2 + 1.0, "× 3 <span style='font-size:26px'>(“normal” glass)</span>"], [A3 + 2.5, "× 2 <span style='font-size:26px'>(Wed = weekend)</span>"], [A3 + 3.0, "× 2 <span style='font-size:26px'>(he hesitated)</span>"], [CAL + 1.2, `<b style="color:${RED};font-size:56px">= 36</b>`]];
  E.F(t => { const h = LINES.filter(([k]) => t >= k).map(([, s]) => `<div style="font-size:40px;line-height:1.2">${s}</div>`).join(""); if (notes.__h !== h) { notes.innerHTML = h; notes.__h = h; } });
  LINES.forEach(([k]) => E.S(k, "scratch", .3)); E.S(CAL + 1.2, "ding", .7);
  // REALITY 1: the "glass"
  const real = (t0, t1, label) => {
    const p = E.el(R, "abs", "left:60px;top:700px;width:960px;height:700px;border-radius:34px;background:linear-gradient(180deg,#2a1f2e,#1a1320);box-shadow:0 24px 60px rgba(0,0,0,.5);z-index:9;opacity:0;overflow:hidden");
    E.el(p, "abs", `left:24px;top:24px;padding:10px 20px;border-radius:16px;background:${CORAL};color:#fff;font-weight:900;font-size:34px;letter-spacing:.04em`, "📍 REALITY");
    E.el(p, "abs", "left:0;top:620px;width:960px;text-align:center;color:#fff;font-weight:900;font-size:40px", label);
    E.K(p, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(p, "s", [[t0, .85], [t0 + .3, 1, "back"]]); E.S(t0, "whoosh", .5); E.flash(t0, "#ffffff", .25, .1);
    return p;
  };
  const g = real(GLASS, D3 - .1, "“a glass” = one whole bottle 🍷");
  g.insertAdjacentHTML("beforeend", `<svg viewBox="0 0 960 600" width="960" height="600" style="position:absolute;left:0;top:30px"><defs><clipPath id="bowl"><path d="M330 90 H630 Q660 330 480 400 Q300 330 330 90 Z"/></clipPath></defs>` +
    `<rect id="wine" x="300" y="400" width="360" height="0" fill="#8e1a2e" clip-path="url(#bowl)"/><path d="M330 90 H630 Q660 330 480 400 Q300 330 330 90 Z" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.85)" stroke-width="7"/><rect x="470" y="400" width="20" height="130" fill="rgba(255,255,255,.8)"/><ellipse cx="480" cy="540" rx="120" ry="18" fill="rgba(255,255,255,.8)"/>` +
    `<g id="bottle" transform="translate(600 -40) rotate(130 0 0)"><rect x="-38" y="0" width="76" height="200" rx="16" fill="#1f4a2a"/><rect x="-14" y="-70" width="28" height="80" rx="6" fill="#1f4a2a"/><rect x="-38" y="60" width="76" height="60" fill="#e8dcc0"/></g><path id="stream" d="M540 60 Q520 120 500 400" stroke="#8e1a2e" stroke-width="16" fill="none" opacity="0"/></svg>`);
  const wine = g.querySelector("#wine"), stream = g.querySelector("#stream");
  E.F(t => { const p = seg(t, GLASS + .4, 1.6); wine.setAttribute("y", 400 - p * 300); wine.setAttribute("height", p * 300); stream.setAttribute("opacity", p > 0 && p < 1 ? 1 : 0); });
  E.clip(GLASS + .4, "sfx/elx-pour-splash.wav", { vol: .6, to: 1.6 });
  // REALITY 2: the week
  const c = real(CAL, A4 - .1, "the weekend: Wednesday → Sunday 🥂");
  const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const cal = E.el(c, "abs", "left:40px;top:180px;width:880px;display:flex;gap:10px");
  const cells = DAYS.map((d, i) => E.el(cal, "", `flex:1;height:300px;border-radius:18px;background:#f4f5f9;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;font-weight:900;font-size:30px;color:${INK}`, `${d}<span style="font-size:60px">${i >= 2 ? "🍷" : "💼"}</span>`));
  E.F(t => cells.forEach((el, i) => { const on = i >= 2 && t >= CAL + .3 + (i - 2) * .15; el.style.background = on ? GOLD : "#f4f5f9"; el.style.transform = on && t < CAL + .6 + (i - 2) * .15 ? "scale(1.08)" : "none"; }));
  for (let i = 2; i < 7; i++) E.S(CAL + .3 + (i - 2) * .15, "tick", .5);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.3);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const dq = { left: 520, top: 780, w: 500, tail: 290, dark: true };
  const aq = { left: 40, top: 800, w: 500, tail: 230 };
  bubble("So… how many drinks<br>do you have a week?", { ...dq, t0: D1, t1: A1 - .1, size: 44 });
  bubble("Oh, not much. 🤏<br>Two… three, maybe?", { ...aq, t0: A1, t1: D2 - .1, size: 44 });
  bubble("And how big<br>is “a glass”?", { ...dq, t0: D2, t1: A2 - .1 });
  bubble("Normal size. 🙂", { ...aq, t0: A2, t1: GLASS });
  bubble("And your week<br>starts on…?", { ...dq, t0: D3, t1: A3 - .1 });
  bubble("Friday. …Ish.<br>Wednesday.", { ...aq, t0: A3, t1: CAL, italic: true });
  bubble("…Is that bad?", { ...aq, top: 740, t0: A4, t1: DUR, italic: true });
  bubble("Honestly?<br>Less than me. ☕", { ...dq, top: 700, t0: D4, t1: DUR, italic: true });
  E.clip(D1 + .05, "voices/sk62/d1.wav", { vol: 1.5 }); E.clip(A1 + .05, "voices/sk62/a1.wav", { vol: 1.5 }); E.clip(D2 + .05, "voices/sk62/d2.wav", { vol: 1.5 }); E.clip(A2 + .05, "voices/sk62/a2.wav", { vol: 1.5 });
  E.clip(D3 + .05, "voices/sk62/d3.wav", { vol: 1.5 }); E.clip(A3 + .05, "voices/sk62/a3.wav", { vol: 1.5 }); E.clip(A4 + .05, "voices/sk62/a4.wav", { vol: 1.6 }); E.clip(D4 + .15, "voices/sk62/d4.wav", { vol: 1.6 });
  E.clip(SIP, "sfx/elx-sip.wav", { vol: .7, to: .8 });
  const mug = E.el(R, "abs", `left:640px;top:1580px;padding:8px 18px;border-radius:14px;background:${INK};color:#fff;font-weight:900;font-size:32px;z-index:9;opacity:0`, "☕ (it’s not coffee)");
  E.K(mug, "o", [[D4 + 1.6, 0], [D4 + 1.7, 1]]); E.S(D4 + 1.6, "pop", .4);
  E.music({ bpm: 92, root: 60, seed: 62, prog: [[0, 4, 7], [5, 9, 12], [2, 5, 9], [7, 11, 14]], until: A4 });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1680px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "EVERYONE LIES<br>TO THE DOCTOR.", STAMP, { size: 80, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“How much do *you drink?*”", { size: 60, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
