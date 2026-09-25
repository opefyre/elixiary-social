// SK.7 "The home bartender, in the wild." — a nature documentary. A calm British narrator (ElevenLabs, Bradford) watches a man
// make his first cocktail for guests: "Here, in his natural habitat… the male attempts a cocktail." He studies a phone
// tutorial ("He has watched one video."), wrestles an ice tray until it explodes ("The ice… resists."), performs a shaking
// dance ("The courtship display. Rarely successful."), and presents his offering. The guests sip, freeze into polite smiles,
// and one quietly types on his phone: "As the sun sets… the pack quietly orders pizza." ORDER CONFIRMED.
export const meta = {
  id: "sk7-wild-bartender",
  images: {
    m_video: "cutouts/hb_video.webp", m_ice: "cutouts/hb_ice.webp", m_shake: "cutouts/hb_shake.webp", m_present: "cutouts/hb_present.webp",
    g_hope: "cutouts/guests.webp", g_fake: "cutouts/guests_fake.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  E.music({ bpm: 70, root: 50, seed: 8, prog: [[0, 7, 12, 16], [5, 12, 17, 21], [3, 10, 15, 19], [7, 14, 19, 22]] });
  const N1 = .5, N2 = 5.2, N3 = 7.5, ICE = 9.9, N4 = 10.6, PRESENT = 13.6, WIPE = 14.2, SIP = 14.9, FAKE = 15.4, N7 = 15.7, PIZZA = 18.3;
  const DUR = 20.2;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };

  // ================= scene 1: the kitchen =================
  const S1 = E.scene("kitchen", 0, WIPE, "light"); E.cur = S1; const K = S1.el;
  const cam = E.el(K, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:540px 900px");      // the "telephoto" camera drift
  E.F(t => { cam.style.transform = `scale(${1.02 + t * .004}) translate(${Math.sin(t * .6) * 6}px,${Math.cos(t * .5) * 5}px)`; });
  const FL = 1600;
  E.el(cam, "abs", "left:0;top:0;width:1080px;height:1920px;background:#f2ede4");
  // subway tiles
  E.el(cam, "abs", `left:0;top:560px;width:1080px;height:560px;background-color:#fbfaf6;background-image:linear-gradient(0deg,#d9d4ca 3px,transparent 3px),linear-gradient(90deg,#d9d4ca 3px,transparent 3px),linear-gradient(90deg,#d9d4ca 3px,transparent 3px);background-size:100% 52px,104px 104px,104px 104px;background-position:0 0,0 0,52px 52px`);
  // upper cabinets and a range hood
  [[0, 320], [700, 380]].forEach(([x, w]) => { const c = E.el(cam, "abs", `left:${x}px;top:240px;width:${w}px;height:300px;background:#6f8f7a;box-shadow:inset 0 0 0 10px #5f7f6a,0 10px 20px rgba(0,0,0,.12)`); E.el(c, "abs", `left:${w / 2 - 70}px;top:230px;width:140px;height:12px;border-radius:6px;background:#d9c38a`); });
  const hood = E.el(cam, "abs", "left:360px;top:240px;width:320px;height:330px");
  hood.innerHTML = `<svg viewBox="0 0 320 330" width="320" height="330"><rect x="120" y="0" width="80" height="200" fill="#b8bec3"/><path d="M20 200 H300 L270 300 H50 Z" fill="#cfd4d8"/><rect x="40" y="296" width="240" height="14" fill="#9aa1a8"/></svg>`;
  // window with afternoon light
  const win = E.el(cam, "abs", "left:760px;top:600px;width:260px;height:300px;border-radius:8px;overflow:hidden;box-shadow:0 0 0 12px #fbfaf6,0 0 0 16px #d9d4ca");
  win.innerHTML = `<svg viewBox="0 0 260 300" width="260" height="300"><rect width="260" height="300" fill="#bfe3f2"/><circle cx="190" cy="90" r="36" fill="#fff4c4"/><path d="M0 220 Q70 170 130 210 T260 190 V300 H0 Z" fill="#8bc48a"/><path d="M0 250 Q90 220 160 250 T260 240 V300 H0 Z" fill="#6aa86a"/></svg>`;
  E.el(win, "abs", "left:124px;top:0;width:12px;height:300px;background:#fbfaf6");
  // counter behind him, with a messy set-up
  const CT = 1130;
  E.el(cam, "abs", `left:0;top:${CT}px;width:1080px;height:40px;background:linear-gradient(180deg,#e9e6df,#cfcac0);box-shadow:0 8px 14px rgba(0,0,0,.15)`);
  E.el(cam, "abs", `left:0;top:${CT + 40}px;width:1080px;height:${FL - CT - 40}px;background:#6f8f7a;box-shadow:inset 0 0 0 10px #5f7f6a`);
  for (let i = 0; i < 5; i++) E.el(cam, "abs", `left:${24 + i * 212}px;top:${CT + 70}px;width:190px;height:${FL - CT - 110}px;border-radius:8px;box-shadow:inset 0 0 0 6px #5f7f6a`);
  const stuff = E.el(cam, "abs", `left:0;top:${CT - 230}px;width:1080px;height:240px`);
  stuff.innerHTML = `<svg viewBox="0 0 1080 240" width="1080" height="240">
    <rect x="40" y="70" width="46" height="160" rx="12" fill="#8a4a1e"/><rect x="50" y="30" width="26" height="50" rx="6" fill="#8a4a1e"/><rect x="46" y="130" width="34" height="46" fill="#efe6d2"/>
    <rect x="100" y="90" width="52" height="140" rx="6" fill="rgba(210,235,225,.85)"/><rect x="112" y="50" width="28" height="44" rx="6" fill="rgba(210,235,225,.85)"/><rect x="104" y="140" width="44" height="40" fill="#1f4b3a"/>
    <rect x="170" y="200" width="200" height="26" rx="8" fill="#b07a4a"/><circle cx="220" cy="196" r="22" fill="#7cc242"/><circle cx="220" cy="196" r="15" fill="#d8f0a8"/><circle cx="270" cy="198" r="22" fill="#7cc242"/><path d="M300 212 L360 190" stroke="#9aa1a8" stroke-width="8" stroke-linecap="round"/>
    <rect x="850" y="150" width="90" height="80" rx="10" fill="#c9774a"/>${[-24, -8, 8, 24].map(d => `<ellipse cx="${895 + d}" cy="${140 - Math.abs(d)}" rx="12" ry="22" fill="#4f8a4a" transform="rotate(${d} ${895 + d} ${140 - Math.abs(d)})"/>`).join("")}
    <rect x="960" y="120" width="80" height="110" rx="6" fill="#e25b5b"/><rect x="966" y="130" width="68" height="16" fill="#f7efe4"/>
  </svg>`;
  E.el(cam, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background-color:#c9b79c;background-image:linear-gradient(90deg,rgba(0,0,0,.08) 2px,transparent 2px),linear-gradient(0deg,rgba(0,0,0,.08) 2px,transparent 2px);background-size:120px 120px`);

  // the male
  const M = { m_video: [313, 1000], m_ice: [507, 1001], m_shake: [462, 1004], m_present: [501, 989] };
  const man = E.el(cam, "abs", "left:0;top:0;width:1080px;height:1920px");
  const manIn = E.el(man, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:520px 1620px");
  const mEls = Object.entries(M).map(([n, [w, h]]) => { const H = 1000, W = w * H / h; return [n, E.img(manIn, n, `position:absolute;left:${520 - W / 2}px;top:${FL + 30 - H}px;width:${W}px;height:${H}px`)]; });
  const MP = [[0, "m_video"], [N3 + .3, "m_ice"], [N4, "m_shake"], [PRESENT, "m_present"]];
  E.F(t => {
    const f = at(MP, t); mEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    let r = 0, dx = 0, dy = 0;
    if (t >= N3 + .3 && t < ICE) { dx = Math.sin(t * 50) * 4 * clamp((t - N3) / 2, 0, 1); }                    // straining
    if (t >= N4 && t < PRESENT) { r = Math.sin(t * 9) * 6; dy = -Math.abs(Math.sin(t * 9)) * 26; dx = Math.sin(t * 4.5) * 30; }   // the dance
    manIn.style.transform = `translate(${dx}px,${dy}px) rotate(${r}deg)`;
  });
  // the tutorial on his phone, blown up as a picture-in-picture card
  const pip = E.el(K, "abs", `left:620px;top:360px;width:340px;height:230px;border-radius:26px;background:#111;box-shadow:0 18px 40px rgba(0,0,0,.35);z-index:6;overflow:hidden;opacity:0`);
  pip.innerHTML = `<svg viewBox="0 0 340 230" width="340" height="230"><rect width="340" height="230" fill="#222"/><rect x="0" y="0" width="340" height="190" fill="#3a2f28"/><circle cx="170" cy="96" r="44" fill="rgba(255,255,255,.14)"/><path d="M158 74 L192 96 L158 118 Z" fill="#fff"/>` +
    `<path d="M40 150 L70 60 L100 150 Z" fill="rgba(240,200,120,.5)"/><rect x="230" y="70" width="40" height="90" rx="8" fill="rgba(200,220,230,.4)"/><rect x="16" y="204" width="308" height="8" rx="4" fill="#555"/><rect class="bar" x="16" y="204" width="20" height="8" rx="4" fill="${CORAL}"/>` +
    `<text x="16" y="186" font-family="Inter" font-size="16" fill="#fff" opacity=".85">0:47 / 0:59</text></svg>`;
  const bar = pip.querySelector(".bar");
  E.K(pip, "o", [[N2, 0], [N2 + .2, 1], [N3 + .2, 1], [N3 + .4, 0]]); E.K(pip, "s", [[N2, .7], [N2 + .3, 1, "back"]]);
  E.F(t => bar.setAttribute("width", String(20 + clamp((t - N2) / 2.2, 0, 1) * 260)));
  // the ice explodes out of the tray
  const cubes = [];
  for (let i = 0; i < 14; i++) {
    const c = E.el(K, "abs", `left:0;top:0;width:${56 + (i % 3) * 14}px;height:${56 + (i % 3) * 14}px;border-radius:12px;background:linear-gradient(135deg,rgba(255,255,255,.95),rgba(190,225,245,.75));box-shadow:inset 0 0 0 3px rgba(255,255,255,.9),0 4px 8px rgba(0,0,0,.12);z-index:5;opacity:0`);
    const a = -Math.PI / 2 + (i - 6.5) * .22, v = 700 + (i % 4) * 160;
    const x0 = 500, y0 = 1040, tx = Math.cos(a) * v * .9, ty = Math.sin(a) * v * .6;
    E.K(c, "o", [[ICE, 0], [ICE + .02, 1], [ICE + 1.3, 1], [ICE + 1.5, 0]]);
    E.K(c, "x", [[ICE, x0], [ICE + 1.2, x0 + tx, "out"]]);
    E.K(c, "y", [[ICE, y0], [ICE + .45, y0 + ty, "out"], [ICE + 1.2, FL + 20 - (i % 3) * 10, "in"]]);
    E.K(c, "r", [[ICE, 0], [ICE + 1.2, (i % 2 ? 1 : -1) * (200 + i * 30)]]);
    cubes.push(c);
  }
  E.clip(ICE - .05, "sfx/elx-ice-scatter.wav", { vol: 1 }); E.shake(ICE, 14, .3);
  // the shaker: rattle
  for (let t = N4 + .1; t < PRESENT - .2; t += .19) E.S(t, t % .38 < .19 ? "swish" : "tick", .4);

  // documentary chrome: lower third with a species name, subtitles, vignette, grain
  const chyron = E.el(K, "abs", `left:80px;top:1250px;padding:18px 30px 20px;border-left:8px solid ${GOLD};background:rgba(10,12,10,.72);z-index:7;opacity:0`,
    `<div style="font-weight:800;font-size:44px;color:#fff;letter-spacing:.01em">THE HOME BARTENDER</div><div style="font-family:Inter;font-style:italic;font-size:30px;color:#e9e3d2;margin-top:4px">Homo mixologus · natural habitat: the kitchen</div>`);
  E.K(chyron, "o", [[1.0, 0], [1.3, 1], [4.8, 1], [5.1, 0]]); E.K(chyron, "x", [[1.0, -60], [1.4, 0, "out"]]);

  // ================= scene 2: the living room at sunset =================
  const S2 = E.scene("lounge", WIPE, DUR, "light"); E.cur = S2; const R = S2.el;
  E.wipe(WIPE);
  const cam2 = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:540px 1000px");
  E.F(t => { cam2.style.transform = `scale(${1.02 + (t - WIPE) * .006}) translate(${Math.sin(t * .6) * 5}px,${Math.cos(t * .5) * 4}px)`; });
  const wall = E.el(cam2, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#e7d3b6,#dcc29b)");
  // big window: the sun goes down while the narrator speaks
  const bw = E.el(cam2, "abs", "left:120px;top:420px;width:840px;height:560px;border-radius:12px;overflow:hidden;box-shadow:0 0 0 16px #fbf5ea,0 0 0 20px #cdb795");
  const sky = E.el(bw, "abs", "left:0;top:0;width:840px;height:560px");
  const sun = E.el(bw, "abs", "left:520px;top:120px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,#fff3c4 0 45%,#ffc36b 60%,rgba(255,160,90,0) 72%)");
  const hills = E.el(bw, "abs", "left:0;top:360px;width:840px;height:200px");
  hills.innerHTML = `<svg viewBox="0 0 840 200" width="840" height="200"><path d="M0 80 Q140 20 280 70 T560 60 T840 50 V200 H0 Z" fill="#6b5a7a"/><path d="M0 120 Q200 80 420 120 T840 110 V200 H0 Z" fill="#4a3d5a"/>` +
    `<path d="M560 110 v-40 M548 80 l12 -14 l12 14 M600 118 v-50 M586 82 l14 -18 l14 18" stroke="#2e2638" stroke-width="6" fill="none"/></svg>`;   // acacia-ish silhouettes
  E.el(bw, "abs", "left:414px;top:0;width:12px;height:560px;background:#fbf5ea");
  E.F(t => {
    const u = clamp((t - N7) / 3.6, 0, 1);
    sky.style.background = `linear-gradient(180deg,rgb(${Math.round(120 - 60 * u)},${Math.round(170 - 110 * u)},${Math.round(220 - 90 * u)}),rgb(255,${Math.round(190 - 60 * u)},${Math.round(130 - 20 * u)}))`;
    sun.style.transform = `translateY(${u * 300}px)`;
    wall.style.filter = `brightness(${1 - u * .22}) saturate(${1 + u * .2})`;
  });
  E.el(cam2, "abs", "left:0;top:1560px;width:1080px;height:360px;background:#8a5a3a;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.12) 0 3px,transparent 3px 150px)");
  // sofa
  const sofa = E.el(cam2, "abs", "left:100px;top:1080px;width:700px;height:500px");
  sofa.innerHTML = `<svg viewBox="0 0 700 500" width="700" height="500"><rect x="30" y="0" width="640" height="260" rx="50" fill="#b5553f"/><rect x="0" y="180" width="110" height="280" rx="44" fill="#a44a36"/><rect x="590" y="180" width="110" height="280" rx="44" fill="#a44a36"/>` +
    `<rect x="80" y="250" width="540" height="190" rx="30" fill="#c96450"/><rect x="60" y="440" width="20" height="60" fill="#4a2c1a"/><rect x="620" y="440" width="20" height="60" fill="#4a2c1a"/></svg>`;
  const G = { g_hope: [598, 660], g_fake: [665, 656] };
  const guests = E.el(cam2, "abs", "left:0;top:0;width:1080px;height:1920px");
  const gEls = Object.entries(G).map(([n, [w, h]]) => { const H = 740, W = w * H / h; return [n, E.img(guests, n, `position:absolute;left:${370 - W / 2}px;top:${1540 - H}px;width:${W}px;height:${H}px`)]; });
  E.F(t => { const f = at([[0, "g_hope"], [FAKE, "g_fake"]], t); gEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; }); });
  // he stands to the right, still presenting
  const pres = E.el(cam2, "abs", `left:${900 - 501 * .98 / 2}px;top:${1600 - 980}px;width:${501 * .98}px;height:980px`);
  E.img(pres, "m_present", `width:${501 * .98}px;height:980px`);
  E.F(t => { pres.style.transform = `translateY(${-Math.abs(Math.sin(t * 2.2)) * 6}px)`; });
  E.clip(SIP, "sfx/elx-sip.wav", { vol: .9 }); E.clip(SIP + .25, "sfx/elx-sip.wav", { vol: .6 });
  // the pizza order, confirmed on the guest's phone
  const order = E.el(R, "abs", `left:90px;top:900px;width:540px;border-radius:30px;background:#fff;box-shadow:0 20px 44px rgba(0,0,0,.35);padding:22px 26px;z-index:8;opacity:0`,
    `<div style="display:flex;align-items:center;gap:16px"><div style="width:64px;height:64px;border-radius:18px;background:${CORAL};display:flex;align-items:center;justify-content:center;font-size:38px">🍕</div>` +
    `<div><div style="font-weight:800;font-size:34px;color:${INK}">Order confirmed</div><div style="font-family:Inter;font-size:24px;color:#666">2 large pizzas · arriving in 25 min</div></div></div>`);
  E.K(order, "o", [[PIZZA, 0], [PIZZA + .1, 1]]); E.K(order, "y", [[PIZZA, 60], [PIZZA + .35, 0, "back"]]);
  E.clip(PIZZA + .05, "sfx/elx-msg-pop.wav", { vol: 1 }); E.S(PIZZA + .1, "ding", .5);

  // ================= subtitles (every narrator line, for sound-off viewers) =================
  const SUBS = [[N1, 4.43, "Here, in his natural habitat… the male attempts a cocktail."], [N2, 1.93, "He has watched one video."],
    [N3, 2.25, "The ice… resists."], [N4, 2.86, "The courtship display. Rarely successful."], [N7, 3.79, "As the sun sets… the pack quietly orders pizza."]];
  const subsLayer = E.el(E.ui, "abs", "left:0;top:0;width:1080px;height:1920px;pointer-events:none");
  SUBS.forEach(([t0, d, txt]) => {
    const s = E.el(subsLayer, "abs", `left:90px;top:1420px;width:900px;text-align:center;font-family:Inter;font-weight:600;font-style:italic;font-size:40px;line-height:1.25;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.7),0 0 18px rgba(0,0,0,.6);opacity:0`, txt);
    E.K(s, "o", [[t0 - .05, 0], [t0 + .1, 1], [t0 + d + .35, 1], [t0 + d + .5, 0]]);
  });
  // vignette + faint grain over both scenes
  E.el(E.ui, "abs", "left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse at 50% 45%,transparent 55%,rgba(0,0,0,.38) 100%);pointer-events:none");
  const grain = E.el(E.ui, "abs", "left:-40px;top:-40px;width:1160px;height:2000px;opacity:.06;pointer-events:none;background-image:radial-gradient(#000 1px,transparent 1.2px),radial-gradient(#fff 1px,transparent 1.2px);background-size:7px 7px,11px 11px;background-position:0 0,3px 5px");
  E.F(t => { grain.style.transform = `translate(${(Math.floor(t * 24) * 13) % 30}px,${(Math.floor(t * 24) * 7) % 30}px)`; });

  // ================= narration =================
  [[N1, "n1"], [N2, "n2"], [N3, "n3"], [N4, "n4"], [N7, "n7"]].forEach(([t, n]) => E.clip(t, `voices/sk7/${n}.wav`, { vol: 1.35 }));

  // title (frame 0)
  E.cur = S1;
  const titleBox = E.el(K, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The home bartender, *in the wild.*", { size: 48, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, 3.0, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
