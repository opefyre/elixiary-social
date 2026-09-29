// SK.48 "The group that orders one at a time." (a top bartender pet peeve + the Sal-hates-mojitos callback) — five friends
// at the bar. "Can I get a mojito, please?" Muddle, shake, serve. "Oh! Me too!" Another trip. "Actually, make that two!"
// "Wait, is it sugar-free?" (remake). "Ooh, can I get what they're having?" MOJITOS 6 · TRIPS 6 · MINT 0% — Sal's eye
// twitch grows with every order. Then: "Can we get the bill? …Separately." — "…Of course." Six card beeps.
// Voices: ElevenLabs (Jessica; Alex; Rico: Liam; Laura; Nina: Sarah; Sal: Chris).
export const meta = {
  id: "sk48-one-at-a-time",
  images: { wait: "cutouts/salc_wait.webp", twitch: "cutouts/sal_twitch.webp", jess: "cutouts/cust_ask.webp", alex: "cutouts/guy_order.webp",
    rico: "cutouts/friend_point.webp", laura: "cutouts/inf_selfie.webp", nina: "cutouts/nina_order.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", MINT = "#5fbf6a";
  E.episode(-16);
  const J1 = .4, M1 = 2.0, A1 = 3.6, M2 = 5.0, R1 = 6.4, M3 = 7.8, L1 = 9.4, M5 = 11.4, N1 = 12.4, M6 = 13.8, J2 = 15.0, S1 = 17.6, BEEPS = 18.1, STAMP = 19.6, DUR = 22.6;
  const MAKES = [M1, M2, M3, M3 + .6, M5, M6];                         // six mojitos, six trips
  E.music({ bpm: 112, root: 62, seed: 48, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: J2 });
  const S = E.scene("bar", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1180;

  // ================= the bar =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2c1f1a,#3d2a22 60%,#1e1512)");
  const shelf = E.el(R, "abs", "left:0;top:420px;width:1080px;height:520px;opacity:.55");
  let s = ""; for (let r = 0; r < 2; r++) for (let i = 0; i < 12; i++) { const c = ["#c77d3a", "#7ab04c", "#e4d4a8", "#9a2a3a", "#4a82b8"][(i + r) % 5], h = 100 + ((i * 29 + r * 7) % 50); s += `<rect x="${24 + i * 88}" y="${r * 220 + 190 - h}" width="42" height="${h}" rx="9" fill="${c}"/>`; }
  shelf.innerHTML = `<svg viewBox="0 0 1080 520" width="1080" height="520">${s}<rect x="0" y="190" width="1080" height="12" fill="#7a5238"/><rect x="0" y="410" width="1080" height="12" fill="#7a5238"/></svg>`;
  // Sal behind the bar, centre
  const SH = 760, SW = SH * 754 / 1104;
  const sal = E.el(R, "abs", `left:${560 - SW / 2}px;top:${TOP + 40 - SH}px;width:${SW}px;height:${SH}px;z-index:1`);
  const sIn = E.el(sal, "abs", `left:0;top:0;width:${SW}px;height:${SH}px`);
  const sW = E.img(sIn, "wait", `position:absolute;left:0;top:0;width:${SW}px;height:${SH}px`);
  const sT = E.img(sIn, "twitch", `position:absolute;left:${(SW - SH * 865 / 1133) / 2}px;top:0;width:${SH * 865 / 1133}px;height:${SH}px`);
  E.F(t => {
    const tw = t >= A1 + .8; sW.style.opacity = tw ? 0 : 1; sT.style.opacity = tw ? 1 : 0;
    const busy = MAKES.some(k => t >= k && t < k + 1.0);
    sIn.style.transform = `translateY(${busy ? Math.sin(t * 30) * 5 : Math.sin(t * 1.6) * 3}px) rotate(${busy ? Math.sin(t * 22) * 2 : 0}deg)`;
  });
  // the growing eye twitch (drawn next to his eye)
  const tw = E.el(R, "abs", `left:640px;top:${TOP + 40 - SH + 150}px;width:140px;height:110px;z-index:2`);
  tw.innerHTML = `<svg viewBox="0 0 140 110" width="140" height="110"><path d="M10 30 l24 -14 l12 18 l22 -16 M14 70 l28 -8 l8 18 l26 -10 M70 50 l30 -10 l10 20 l24 -12" stroke="${CORAL}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`;
  E.F(t => { const lvl = [A1 + .8, R1 + .8, L1 + 1, N1 + .8, J2 + 1.4].filter(k => t >= k).length; tw.style.opacity = lvl ? (Math.floor(t * (4 + lvl * 3)) % 2 ? 1 : .2) : 0; tw.style.transform = `scale(${.6 + lvl * .15})`; });
  // the bar top
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;z-index:2;background:linear-gradient(180deg,#6e4630,#4a2e1f);box-shadow:inset 0 10px 0 #8a5a3c`);
  // the mint bunch (shrinks) + mojitos lining up on the bar
  const mint = E.el(R, "abs", `left:830px;top:${TOP - 120}px;width:180px;height:130px;z-index:3;transform-origin:50% 100%`);
  mint.innerHTML = `<svg viewBox="0 0 180 130" width="180" height="130">${Array.from({ length: 14 }, (_, i) => `<ellipse class="lf" cx="${30 + (i * 37) % 120}" cy="${30 + (i * 23) % 70}" rx="22" ry="14" fill="${i % 2 ? "#4aa04a" : "#6ac06a"}" transform="rotate(${(i * 40) % 180} ${30 + (i * 37) % 120} ${30 + (i * 23) % 70})"/>`).join("")}<rect x="60" y="100" width="70" height="30" rx="8" fill="#c8b08a"/></svg>`;
  const leaves = [...mint.querySelectorAll(".lf")];
  E.F(t => { const n = MAKES.filter(k => t >= k + .3).length; leaves.forEach((l, i) => { l.style.opacity = i < 14 - n * 2.4 ? 1 : 0; }); });
  MAKES.forEach((k, i) => {
    const g = E.el(R, "abs", `left:${70 + i * 118}px;top:${TOP - 170}px;width:90px;height:170px;z-index:3;opacity:0`);
    g.innerHTML = `<svg viewBox="0 0 90 170" width="90" height="170"><path d="M8 20 H82 L76 164 H14 Z" fill="rgba(220,245,220,.55)" stroke="rgba(255,255,255,.8)" stroke-width="3"/>${[0, 1, 2].map(j => `<rect x="${20 + j * 18}" y="${60 + (j % 2) * 30}" width="22" height="22" rx="5" fill="rgba(255,255,255,.8)"/>`).join("")}<ellipse cx="46" cy="40" rx="20" ry="11" fill="${MINT}"/><circle cx="72" cy="28" r="14" fill="#9bd14a" stroke="#6a9a2a" stroke-width="3"/><rect x="54" y="0" width="7" height="60" fill="#f4f1e8" transform="rotate(14 57 30)"/></svg>`;
    E.K(g, "o", [[k + .8, 0], [k + .85, 1]]); E.K(g, "y", [[k + .8, -60], [k + 1.0, 0, "back"]]);
    E.clip(k, "sfx/elx-muddle.wav", { vol: .7, to: .8 }); E.S(k + .85, "tick", .6);
  });
  // the HUD
  const hud = E.el(R, "abs", "left:40px;top:370px;display:flex;flex-direction:column;gap:10px;z-index:8;opacity:0");
  const chip = () => E.el(hud, "", `padding:10px 20px;border-radius:16px;background:rgba(20,35,29,.9);color:#fff;font-weight:900;font-size:40px;font-variant-numeric:tabular-nums`);
  const cM = chip(), cT = chip(), cL = chip();
  E.K(hud, "o", [[M1, 0], [M1 + .2, 1]]);
  E.F(t => { const n = MAKES.filter(k => t >= k + .8).length; cM.textContent = `🍹 MOJITOS: ${n}`; cT.textContent = `🚶 TRIPS: ${n}`; const m = Math.max(0, 100 - n * 17 - (n === 6 ? 2 : 0)); cL.textContent = `🌿 MINT: ${m}%`; cL.style.color = m < 20 ? CORAL : "#fff"; });

  // ================= the five friends (front row) =================
  const ROW = [["jess", 718, 1113, 120, J1, J2], ["alex", 872, 1121, 330, A1], ["rico", 861, 1124, 560, R1], ["laura", 880, 1132, 790, L1], ["nina", 846, 1164, 990, N1]];
  const CH = 760;
  const speaking = (t) => at([[0, -1], [J1, 0], [A1, 1], [R1, 2], [L1, 3], [N1, 4], [J2, 0], [S1, -1]], t);
  ROW.forEach(([n, w, h, cx], i) => {
    const W = CH * w / h;
    const c = E.el(R, "abs", `left:${cx - W / 2}px;top:${1960 - CH}px;width:${W}px;height:${CH}px;z-index:${4 + (i % 2)};transform-origin:50% 100%`);
    const cIn = E.el(c, "abs", `left:0;top:0;width:${W}px;height:${CH}px`);
    E.img(cIn, n, `width:${W}px;height:${CH}px`);
    E.F(t => {
      const on = speaking(t) === i;
      c.style.zIndex = on ? 7 : 4 + (i % 2);
      c.style.filter = on || t < J1 ? "none" : "brightness(.72)";
      cIn.style.transform = `translateY(${on ? -24 + Math.sin(t * 6) * 3 : Math.sin(t * 2 + i) * 3}px) scale(${on ? 1.06 : 1})`;
    });
  });

  // ================= the bill: six card beeps =================
  const term = E.el(R, "abs", `left:470px;top:${TOP - 190}px;width:140px;height:200px;border-radius:18px;background:#1a1d22;box-shadow:0 0 0 5px #3a3f48;z-index:3;opacity:0`);
  term.innerHTML = `<div id="scr" style="margin:14px;height:70px;border-radius:8px;background:#9adfb0;font-family:'Courier New',monospace;font-weight:900;font-size:24px;color:#14231d;text-align:center;line-height:70px"></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:0 16px">${Array.from({ length: 9 }, () => `<div style="height:22px;border-radius:5px;background:#4a505a"></div>`).join("")}</div>`;
  const scr = term.querySelector("#scr");
  E.K(term, "o", [[S1 + .2, 0], [S1 + .3, 1]]); E.K(term, "y", [[S1 + .2, 60], [S1 + .5, 0, "back"]]);
  E.F(t => { const n = Array.from({ length: 6 }, (_, i) => BEEPS + .3 + i * .28).filter(k => t >= k).length; const v = n ? `${n}/6 ✓` : "€ ?"; if (scr.__v !== v) { scr.textContent = v; scr.__v = v; } });
  for (let i = 0; i < 6; i++) E.S(BEEPS + .3 + i * .28, "ding", .6);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const Y = 1040;
  bubble("Can I get a<br>mojito, please?", { left: 30, top: Y, w: 420, tail: 90, t0: J1, t1: A1 - .1 });
  bubble("Oh! Me too!", { left: 140, top: Y + 40, w: 360, tail: 190, t0: A1, t1: R1 - .1 });
  bubble("Actually, make<br>that two!", { left: 320, top: Y, w: 440, tail: 240, t0: R1, t1: L1 - .1 });
  bubble("Wait, is it<br>sugar-free? 🤳", { left: 540, top: Y, w: 440, tail: 250, t0: L1, t1: N1 - .1 });
  bubble("Ooh, can I get what<br>they’re having?", { left: 460, top: Y, w: 580, tail: 500, t0: N1, t1: J2 - .1, size: 46 });
  bubble("Can we get the bill?<br>…Separately.", { left: 30, top: Y, w: 560, tail: 90, t0: J2, t1: S1 - .05 });
  bubble("…Of course.", { left: 640, top: 600, w: 380, tail: 90, t0: S1, t1: DUR, dark: true, italic: true });
  E.clip(J1 + .05, "voices/sk48/j1.wav", { vol: 1.5 }); E.clip(A1 + .05, "voices/sk48/a1.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk48/r1.wav", { vol: 1.5 });
  E.clip(L1 + .05, "voices/sk48/l1.wav", { vol: 1.5 }); E.clip(N1 + .05, "voices/sk48/n1.wav", { vol: 1.5 }); E.clip(J2 + .05, "voices/sk48/j2.wav", { vol: 1.5 });
  E.clip(S1 + .05, "voices/sk48/s1.wav", { vol: 1.7 });
  const remake = E.el(R, "abs", `left:0;top:900px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:8px 22px;border-radius:14px;background:${CORAL};color:#fff;font-weight:900;font-size:38px">♻️ REMAKE (sugar-free)</span>`);
  E.K(remake, "o", [[M5, 0], [M5 + .1, 1], [N1 - .2, 1], [N1, 0]]);
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-lounge.wav", { vol: .2, to: Math.min(6, DUR - t), duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:760px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "1 ROUND. 6 TRIPS. 6 BILLS.", STAMP, { size: 64, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Ordering *one at a time.*", { size: 64, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, A1, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
