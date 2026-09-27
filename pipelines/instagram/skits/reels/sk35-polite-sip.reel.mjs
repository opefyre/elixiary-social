// SK.35 "The host's signature cocktail." — the recipe card: gin, pickle juice, kombucha, cinnamon, ✨a secret✨. "So? What
// do you think?" Sip. "Mmm! Delicious!" — subtitles: SAYS / MEANS. The host pops out for snacks: both glasses tip into the
// pot plant. The plant wilts: 100%… 40%… 5%. She's back, they smile with empty glasses. "Oh, good! Because I made a whole
// jug!" Refills. The plant keels over. RIP, FERN.  Voices: Higgsfield TTS (host: Mabel; guests: Emily).
export const meta = {
  id: "sk35-polite-sip",
  images: { fake: "cutouts/couple_fake.webp", pour: "cutouts/couple_pour.webp", happy: "cutouts/mum_happy.webp", jug: "cutouts/mum_pour.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", MUD = "#7a7a3a";
  E.episode(-16);
  const H1 = 3.2, SIP = 4.9, G1 = 5.4, M1 = 5.5, M2 = 6.9, EXIT = 8.3, POUR = 8.9, BACK = 11.7, H2 = 12.3, REFILL = 13.4, FALL = 15.4, STAMP = 16.6, DUR = 19.8;
  E.music({ bpm: 96, root: 62, seed: 35, prog: [[0, 4, 7], [5, 9, 12], [2, 5, 9], [7, 11, 14]], until: FALL });
  const S = E.scene("lounge", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const FL = 1760;

  // ================= a cosy living room, evening =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#e9d8c4,#dcc6ac)");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.12) 0 4px,transparent 4px 70px)");
  // painting + floor lamp
  const art = E.el(R, "abs", "left:340px;top:560px;width:380px;height:260px;border:12px solid #6e4a34;background:#f4ead8;box-shadow:0 12px 24px rgba(0,0,0,.2)");
  art.innerHTML = `<svg viewBox="0 0 356 236" width="356" height="236"><circle cx="110" cy="120" r="70" fill="${CORAL}" opacity=".85"/><rect x="170" y="50" width="120" height="130" fill="#6aa0b8" opacity=".85"/><path d="M40 200 L320 60" stroke="${INK}" stroke-width="6"/></svg>`;
  const lamp = E.el(R, "abs", `left:60px;top:${FL - 900}px;width:200px;height:900px`);
  lamp.innerHTML = `<svg viewBox="0 0 200 900" width="200" height="900"><path d="M40 0 H160 L190 150 H10 Z" fill="#f4e0b0"/><rect x="95" y="150" width="10" height="730" fill="#5a4a3a"/><ellipse cx="100" cy="885" rx="60" ry="14" fill="#5a4a3a"/></svg>`;
  E.el(R, "abs", "left:-40px;top:720px;width:380px;height:380px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,230,160,.5),transparent)");
  E.el(R, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background:#9a7454`);
  E.el(R, "abs", `left:120px;top:${FL - 10}px;width:840px;height:60px;border-radius:50%;background:rgba(0,0,0,.12)`);
  // the sofa
  const sofa = E.el(R, "abs", `left:190px;top:${FL - 520}px;width:760px;height:520px;z-index:2`);
  sofa.innerHTML = `<svg viewBox="0 0 760 520" width="760" height="520"><rect x="40" y="40" width="680" height="300" rx="50" fill="#4a7a8a"/><rect x="0" y="200" width="110" height="280" rx="40" fill="#3f6b7a"/><rect x="650" y="200" width="110" height="280" rx="40" fill="#3f6b7a"/>` +
    `<rect x="80" y="300" width="600" height="160" rx="30" fill="#558896"/><rect x="60" y="460" width="30" height="60" fill="#3a2a1a"/><rect x="670" y="460" width="30" height="60" fill="#3a2a1a"/>` +
    `<rect x="110" y="120" width="140" height="130" rx="30" fill="${GOLD}" transform="rotate(-8 180 185)"/></svg>`;

  // ================= the fern (code-drawn, wilts) =================
  const fern = E.el(R, "abs", `left:840px;top:${FL - 700}px;width:260px;height:700px;z-index:4;transform-origin:50% 100%`);
  const LEAVES = Array.from({ length: 9 }, (_, i) => ({ a: -70 + i * 17.5, len: 300 + (i % 3) * 60 }));
  fern.innerHTML = `<svg viewBox="0 0 260 700" width="260" height="700" style="overflow:visible">${LEAVES.map((l, i) => `<g class="leaf" data-a="${l.a}" style="transform-box:view-box;transform-origin:0 0" transform="translate(130 480) rotate(${l.a})"><path d="M0 0 Q14 ${-l.len / 2} 0 ${-l.len} Q-14 ${-l.len / 2} 0 0" fill="#3f8f4a"/>${Array.from({ length: 7 }, (_, k) => `<path d="M0 ${-30 - k * l.len / 8} l${22 - k * 2} -12 M0 ${-30 - k * l.len / 8} l${-22 + k * 2} -12" stroke="#3f8f4a" stroke-width="7" stroke-linecap="round"/>`).join("")}</g>`).join("")}` +
    `<path d="M50 470 H210 L190 690 H70 Z" fill="#c86a4a"/><rect x="40" y="460" width="180" height="30" rx="8" fill="#b85a3a"/><ellipse id="soil" cx="130" cy="468" rx="78" ry="10" fill="#4a3020"/></svg>`;
  const leaves = [...fern.querySelectorAll(".leaf")], soil = fern.querySelector("#soil");
  E.F(t => {
    const h = 1 - seg(t, POUR + .4, 2.2) * .6 - seg(t, REFILL + .3, 1.6) * .35;          // health 1 → .05
    leaves.forEach((g, i) => {
      const a0 = +g.dataset.a, droop = (1 - h) * (a0 < 0 ? -85 : 85) * (0.7 + (i % 3) * .15);
      const fall = i === 4 && t >= POUR + 2 ? seg(t, POUR + 2, .8) : 0;
      g.setAttribute("transform", `translate(130 480) rotate(${a0 + droop + fall * 120}) translate(0 ${fall * -40})`);
      const c = `rgb(${Math.round(63 + (1 - h) * 90)},${Math.round(143 - (1 - h) * 70)},${Math.round(74 - (1 - h) * 40)})`;
      g.querySelectorAll("path").forEach(p => { p.getAttribute("fill") === "none" || p.getAttribute("stroke") ? p.setAttribute("stroke", c) : p.setAttribute("fill", c); });
      g.style.opacity = i === 4 && t >= POUR + 2.8 ? 0 : 1;
    });
    soil.setAttribute("fill", t >= POUR + .3 ? MUD : "#4a3020");
  });
  E.K(fern, "r", [[FALL, 0], [FALL + .45, 78, "in"]]); E.S(FALL + .45, "thud", 1); E.shake(FALL + .45, 12, .3);
  const hp = E.el(R, "abs", `left:780px;top:${FL - 790}px;padding:8px 18px;border-radius:14px;background:#fff;box-shadow:0 8px 20px rgba(0,0,0,.15);font-weight:900;font-size:34px;color:${INK};z-index:6;opacity:0;white-space:nowrap;font-variant-numeric:tabular-nums`);
  E.K(hp, "o", [[POUR + .3, 0], [POUR + .5, 1], [FALL + .8, 1], [FALL + 1, 0]]);
  E.F(t => { const h = Math.round(100 * (1 - seg(t, POUR + .4, 2.2) * .6 - seg(t, REFILL + .3, 1.6) * .35)); hp.textContent = `🌿 FERN: ${h}%`; hp.style.color = h < 50 ? "#c8102e" : INK; });

  // ================= the couple =================
  const CW = 660, CH = CW * 981 / 845, PW = CH * 892 / 959;
  const cpl = E.el(R, "abs", `left:230px;top:${FL + 20 - CH}px;width:${CW}px;height:${CH}px;z-index:3`);
  const cIn = E.el(cpl, "abs", `left:0;top:0;width:${CW}px;height:${CH}px`);
  const cFake = E.img(cIn, "fake", `position:absolute;left:0;top:0;width:${CW}px;height:${CH}px`);
  const cPour = E.img(cIn, "pour", `position:absolute;left:${CW - PW + 20}px;top:0;width:${PW}px;height:${CH}px`);
  const CP = [[0, "fake"], [POUR, "pour"], [BACK - .3, "fake"]];
  E.F(t => {
    const f = at(CP, t); cFake.style.opacity = f === "fake" ? 1 : 0; cPour.style.opacity = f === "pour" ? 1 : 0;
    let y = Math.sin(t * 2) * 3; if (t >= SIP && t < SIP + .5) y -= Math.sin((t - SIP) / .5 * Math.PI) * 10;
    for (const k of [POUR, BACK - .3]) if (t >= k && t < k + .2) y -= Math.sin((t - k) / .2 * Math.PI) * 14;
    cIn.style.transform = `translateY(${y}px)`;
  });
  E.clip(SIP, "sfx/elx-sip.wav", { vol: .9, to: .9 }); E.S(SIP + .8, "nope", .35);
  E.clip(POUR + .1, "sfx/elx-pour-splash.wav", { vol: .7, to: 1.6 });
  // the stream into the pot
  const stream = E.el(R, "abs", `left:880px;top:${FL - 560}px;width:100px;height:320px;z-index:3;opacity:0`);
  stream.innerHTML = `<svg viewBox="0 0 100 320" width="100" height="320"><path d="M0 0 Q60 40 80 160 T90 320" stroke="${MUD}" stroke-width="14" fill="none" stroke-linecap="round" opacity=".9"/></svg>`;
  E.K(stream, "o", [[POUR + .1, 0], [POUR + .2, 1], [BACK - .5, 1], [BACK - .4, 0]]);

  // ================= the host =================
  const HH = 900, HW = HH * 796 / 1158, JW = HH * 849 / 1158;
  const host = E.el(R, "abs", `left:${480 - HW * .45}px;top:${1570 - HH}px;width:${HW}px;height:${HH}px;z-index:1`);
  const hIn = E.el(host, "abs", `left:0;top:0;width:${HW}px;height:${HH}px`);
  const hHappy = E.img(hIn, "happy", `position:absolute;left:0;top:0;width:${HW}px;height:${HH}px`);
  const hJug = E.img(hIn, "jug", `position:absolute;left:0;top:0;width:${JW}px;height:${HH}px`);
  E.K(host, "x", [[EXIT, 0], [EXIT + .6, -900, "in"], [BACK - .6, -900], [BACK, 0, "out"]]);
  E.F(t => { const j = t >= H2 + .6; hHappy.style.opacity = j ? 0 : 1; hJug.style.opacity = j ? 1 : 0; hIn.style.transform = `translateY(${Math.sin(t * 1.9) * 4}px)`; });
  E.clip(REFILL, "sfx/elx-pour-splash.wav", { vol: .6, to: 1.4 });
  // the recipe card (frame 0 → first beat)
  const card = E.el(R, "abs", `left:130px;top:360px;width:820px;padding:24px 30px;border-radius:26px;background:rgba(255,255,255,.95);box-shadow:0 20px 40px rgba(0,0,0,.18);z-index:8;opacity:0`);
  E.el(card, "", `font-weight:900;font-size:34px;letter-spacing:.12em;color:${CORAL};margin-bottom:10px`, "🍸 THE HOST’S SIGNATURE");
  const ING = ["gin", "pickle juice", "kombucha", "cinnamon", "✨ a secret ✨"];
  const ingEls = ING.map((s, i) => { const e = E.el(card, "", `display:inline-block;margin:6px 10px 6px 0;padding:8px 18px;border-radius:30px;background:#f2ead8;font-weight:800;font-size:38px;color:${INK};opacity:0`, s); E.K(e, "o", [[.5 + i * .35, 0], [.6 + i * .35, 1]]); E.K(e, "s", [[.5 + i * .35, .6], [.8 + i * .35, 1, "back"]]); E.S(.5 + i * .35, "tick", .5); return e; });
  E.K(card, "o", [[.3, 0], [.45, 1], [H1 + 1.2, 1], [H1 + 1.4, 0]]);

  // ================= SAYS / MEANS subtitles =================
  const sub = (says, means, t0, t1) => {
    const b = E.el(R, "abs", `left:80px;top:420px;width:920px;z-index:8;opacity:0`);
    E.el(b, "", `padding:14px 24px;border-radius:20px 20px 0 0;background:#fff;font-weight:800;font-size:42px;color:${INK}`, `<span style="color:#8a979c;font-size:28px;letter-spacing:.12em">SAYS </span>${says}`);
    E.el(b, "", `padding:14px 24px 18px;border-radius:0 0 20px 20px;background:${INK};font-weight:800;font-size:42px;color:${GOLD}`, `<span style="color:#8ee3c8;font-size:28px;letter-spacing:.12em">MEANS </span>${means}`);
    E.K(b, "o", [[t0, 0], [t0 + .12, 1], [t1 - .12, 1], [t1, 0]]); E.K(b, "y", [[t0, 30], [t0 + .3, 0, "out"]]);
  };
  sub("“Mmm! Delicious!”", "It tastes like a pond.", M1, M2 - .05);
  sub("👍", "I can see sounds now.", M2, EXIT + .2);
  sub("“Mmm! So good!”", "Please. No more.", BACK + .1, H2 + .1);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#2a2440" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(60,40,20,.3);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#2a2440" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("So? What do<br>you think?", { left: 300, top: 600, w: 440, tail: 240, t0: H1, t1: M1 - .05, dark: true });
  bubble("I’ll get snacks!", { left: 320, top: 640, w: 420, tail: 220, t0: EXIT - .7, t1: EXIT + .3, dark: true, size: 44 });
  bubble("Oh, good! Because I<br>made a whole jug!", { left: 250, top: 600, w: 580, tail: 290, t0: H2, t1: FALL, dark: true });
  E.clip(H1 + .05, "voices/sk35/h1.wav", { vol: 1.5 }); E.clip(G1 + .05, "voices/sk35/g1.wav", { vol: 1.5 }); E.clip(H2 + .05, "voices/sk35/h2.wav", { vol: 1.5 });
  for (let t = 0; t < FALL; t += 6) E.clip(t, "sfx/elx-dinner-party.wav", { vol: .25, to: Math.min(6, FALL - t), duck: true });

  // ================= stamp =================
  const stampBox = E.el(R, "abs", "left:0;top:1320px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "RIP, FERN. 🌿", STAMP, { size: 96, rot: -5, bg: CORAL, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The host’s *signature cocktail.*", { size: 56, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, M1 - .2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
