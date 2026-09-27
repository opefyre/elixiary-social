// SK.25 "Your drink order says everything." — Sal, fingers on his temples, reads each customer from their order.
// Aperol spritz: "Four photos already. You've never been to Italy." Espresso martini: "You said 'just one' three hours ago."
// Tap water (Nina): "You'll drink everyone else's." Then Nina reads HIM: "Bartender. Hates mojitos. Owns one apron. That one."
// Sal's eye twitches. "…how?"   Callbacks to SK.16 (mojito), SK.24 (sips). Voices: ElevenLabs (Sal: Chris; Nina: Sarah).
export const meta = {
  id: "sk25-drink-reading",
  images: { psychic: "cutouts/sal_psychic.webp", twitch: "cutouts/sal_twitch.webp", inf: "cutouts/inf_selfie.webp", rico: "cutouts/tropic_ice.webp", nina: "cutouts/nina_water.webp", nina2: "cutouts/nina_order.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", MYST = "#b58cff";
  E.episode(-16);
  const S0 = .4, C1 = 3.7, R1 = 4.4, C2 = 8.8, R2 = 9.4, C3 = 12.9, R3 = 13.5, FLIP = 16.3, N1 = 16.6, HOW = 20.8, DUR = 23.0;
  E.music({ bpm: 84, root: 50, seed: 25, prog: [[0, 3, 7, 10], [5, 8, 12, 15], [3, 7, 10, 14], [7, 10, 14, 17]], until: FLIP });
  const S = E.scene("bar", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1440;

  // ================= the bar, gone mystical =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse at 30% 40%,#3a2458 0%,#1a1026 60%,#0d0814 100%)");
  const stars = []; for (let i = 0; i < 60; i++) stars.push(E.el(R, "abs", `left:${(i * 173) % 1060}px;top:${380 + (i * 97) % 1000}px;width:${3 + (i % 3) * 2}px;height:${3 + (i % 3) * 2}px;border-radius:50%;background:#fff`));
  E.F(t => stars.forEach((s, i) => { s.style.opacity = t < FLIP ? .2 + .8 * Math.abs(Math.sin(t * 2 + i)) : .1; }));
  // shelves of bottles as dark silhouettes with a violet rim
  const shelf = E.el(R, "abs", "left:0;top:640px;width:1080px;height:560px;opacity:.55");
  shelf.innerHTML = `<svg viewBox="0 0 1080 560" width="1080" height="560">${[180, 400].map(y => `<rect x="20" y="${y}" width="1040" height="8" fill="${MYST}" opacity=".6"/>` + Array.from({ length: 15 }, (_, k) => { const x = 40 + k * 68, h = 110 + (k % 4) * 22; return `<path d="M${x + 16} ${y - h} h16 v${h * .3} q18 8 18 28 V${y} h-52 V${y - h * .7 + 28} q0 -20 18 -28 Z" fill="#120a1c" stroke="${MYST}" stroke-opacity=".5" stroke-width="2"/>`; }).join("")).join("")}</svg>`;
  // swirling mystic aura behind Sal
  const aura = E.el(R, "abs", "left:-120px;top:500px;width:760px;height:760px;border-radius:50%;background:conic-gradient(from 0deg,rgba(181,140,255,.0),rgba(181,140,255,.45),rgba(90,209,255,.3),rgba(181,140,255,0));filter:blur(20px)");
  E.F(t => { aura.style.transform = `rotate(${t * 40}deg)`; aura.style.opacity = t < FLIP ? .9 : .15; });
  // Sal
  const SAL = { psychic: [876, 1143], twitch: [865, 1133] };
  const sal = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px");
  const sEls = Object.entries(SAL).map(([n, [w, h]]) => { const H = 900, W = w * H / h; return [n, E.img(sal, n, `position:absolute;left:${280 - W / 2}px;top:${TOP + 40 - H}px;width:${W}px;height:${H}px`)]; });
  E.F(t => { const f = t >= FLIP + 1.6 ? "twitch" : "psychic"; sEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; }); });
  const tw = E.el(R, "abs", "left:330px;top:720px;width:120px;height:100px;opacity:0;z-index:4");
  tw.innerHTML = `<svg viewBox="0 0 120 100" width="120" height="100"><path d="M10 20 l20 -12 l10 16 l18 -14 M20 60 l24 -6 l6 16 l22 -8" stroke="${CORAL}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`;
  E.F(t => { tw.style.opacity = t >= FLIP + 1.8 ? (Math.floor(t * 12) % 2 ? 1 : .2) : 0; });

  // the bar top
  E.el(R, "abs", `left:0;top:${TOP}px;width:1080px;height:46px;z-index:5;background:linear-gradient(180deg,#4a2e5c,#2a1838);box-shadow:0 -2px 0 ${MYST}66 inset,0 10px 24px rgba(0,0,0,.6)`);
  E.el(R, "abs", `left:0;top:${TOP + 46}px;width:1080px;height:${1920 - TOP - 46}px;z-index:5;background:repeating-linear-gradient(90deg,#1e1228 0 86px,#150c1d 86px 90px)`);
  // a crystal ball on the bar
  const ball = E.el(R, "abs", `left:420px;top:${TOP - 170}px;width:190px;height:200px;z-index:6`);
  ball.innerHTML = `<svg viewBox="0 0 190 200" width="190" height="200"><defs><radialGradient id="cb" cx=".4" cy=".35"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".3" stop-color="#d9c2ff" stop-opacity=".6"/><stop offset="1" stop-color="#5a3a8c" stop-opacity=".8"/></radialGradient></defs>` +
    `<circle cx="95" cy="80" r="76" fill="url(#cb)"/><path d="M40 150 H150 L165 196 H25 Z" fill="#b8893a"/><ellipse cx="95" cy="150" rx="55" ry="10" fill="#8a6526"/></svg>`;
  const ballGlow = E.el(R, "abs", `left:340px;top:${TOP - 260}px;width:350px;height:350px;border-radius:50%;background:radial-gradient(closest-side,rgba(200,170,255,.6),transparent);z-index:5`);
  E.F(t => { const reading = [R1, R2, R3].some(r => t >= r && t < r + 3.6); ballGlow.style.opacity = t >= FLIP ? .1 : reading ? .7 + .3 * Math.sin(t * 8) : .35; });

  // ================= customers, one at a time =================
  const CUST = [["inf", 880, 1132, 860, C1, C2 - .2, "An Aperol spritz,<br>please!"], ["rico", 523, 1003, 1000, C2, C3 - .2, "Espresso martini!"], ["nina", 768, 1137, 820, C3, DUR + 1, "Just tap<br>water, thanks."]];
  const custEls = CUST.map(([n, w, h, H, t0, t1, order], i) => {
    const W = w * H / h, el = E.el(R, "abs", `left:${800 - W / 2}px;top:${TOP + (n === "rico" ? 280 : 60) - H}px;width:${W}px;height:${H}px;opacity:0`);
    E.img(el, n, `width:${W}px;height:${H}px`);
    E.K(el, "o", [[t0, 0], [t0 + .15, 1], [t1 - .15, 1], [t1, 0]]); E.K(el, "x", [[t0, 400], [t0 + .4, 0, "out"], [t1 - .3, 0], [t1, 400, "in"]]);
    E.S(t0, "swish", .5);
    return el;
  });
  const n2 = E.el(R, "abs", `left:${800 - 846 * 820 / 1164 / 2}px;top:${TOP + 60 - 820}px;width:${846 * 820 / 1164}px;height:820px;opacity:0`);
  E.img(n2, "nina2", `width:${846 * 820 / 1164}px;height:820px`);
  E.K(n2, "o", [[FLIP, 0], [FLIP + .05, 1]]); E.K(custEls[2], "o", [[C3, 0], [C3 + .15, 1], [FLIP, 1], [FLIP + .05, 0]]);

  // ================= the reading cards =================
  const card = (lines, t0, t1, left, color) => {
    const c = E.el(R, "abs", `left:${left}px;top:420px;width:620px;padding:22px 30px 26px;border-radius:26px;background:rgba(20,10,34,.88);box-shadow:0 0 0 3px ${color}88,0 0 40px ${color}55,0 20px 40px rgba(0,0,0,.5);z-index:8;opacity:0`);
    E.el(c, "", `font-weight:800;font-size:24px;letter-spacing:.3em;color:${color};margin-bottom:10px`, "🔮 THE READING");
    lines.forEach(([txt, dt], i) => { const l = E.el(c, "", `font-weight:800;font-size:44px;line-height:1.15;color:#fff;margin-top:8px;opacity:0`, txt); E.K(l, "o", [[t0 + dt, 0], [t0 + dt + .2, 1]]); E.K(l, "x", [[t0 + dt, -20], [t0 + dt + .3, 0, "out"]]); });
    E.K(c, "o", [[t0, 0], [t0 + .2, 1], [t1 - .2, 1], [t1, 0]]); E.K(c, "s", [[t0, .8], [t0 + .3, 1, "back"]]);
    E.clip(t0, "sfx/elx-mystic.wav", { vol: .7 });
  };
  card([["Aperol spritz.", 0], ["Four photos already.", 1.2], ["Never been to Italy.", 2.6]], R1, C2 - .1, 420, MYST);
  card([["Espresso martini.", 0], ["Said \"just one\"…", 1.3], ["…three hours ago.", 2.2]], R2, C3 - .1, 420, MYST);
  card([["Tap water.", 0], ["Will drink everyone", 1.0], ["else's.", 1.6]], R3, FLIP - .1, 420, MYST);
  card([["Bartender.", 0], ["Hates mojitos.", .9], ["Owns one apron.", 1.9], ["That one.", 3.0]], N1, HOW - .1, 420, GOLD);
  // when Nina turns it round, the spotlight flips to Sal
  const spot = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse 360px 700px at 280px 900px,transparent 60%,rgba(0,0,0,.6));opacity:0;pointer-events:none;z-index:4");
  E.K(spot, "o", [[FLIP, 0], [FLIP + .3, 1]]); E.clip(FLIP - .05, "sfx/record-silence.wav", { vol: .8 });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 54, bg = "#fff", fg = INK, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.06;letter-spacing:-.02em;color:${fg};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  CUST.forEach(([n, , , , t0, , order]) => bubble(order, { left: 560, top: 1000, w: 460, tail: 260, t0: t0 + .3, t1: t0 + .9 + (n === "nina" ? .2 : 0), size: 48 }));
  bubble("Don't tell me.<br>I know your drink.", { left: 60, top: 420, w: 560, tail: 220, t0: S0, t1: C1 - .1, size: 56, bg: GOLD });
  bubble("…how?", { left: 60, top: 460, w: 280, tail: 200, t0: HOW, t1: DUR, size: 64, italic: true });
  E.clip(S0 + .05, "voices/sk25/s0f.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk25/s1f.wav", { vol: 1.5 });
  E.clip(R2 + .05, "voices/sk25/s3f.wav", { vol: 1.5 }); E.clip(R3 + .05, "voices/sk25/s4f.wav", { vol: 1.5 });
  E.clip(N1 + .05, "voices/sk25/n1f.wav", { vol: 1.6 }); E.clip(HOW + .05, "voices/sk25/s5.wav", { vol: 1.9 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-lounge.wav", { vol: .25, to: Math.min(6, DUR - t), duck: false });

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Your drink order *says everything.*", { size: 50, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
