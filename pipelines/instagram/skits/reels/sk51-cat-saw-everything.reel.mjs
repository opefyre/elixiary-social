// SK.51 "The cat saw everything." — 3 AM, the cat's inner monologue (posh, deadpan). Keys miss the lock six times: "Three
// a.m. He said he'd have one drink." He shushes the cat: "He is shushing me. I haven't said a word." Fridge light, cheese:
// "Cheese. In the dark. Like a raccoon." A proud nightcap: "A nightcap. Of course." "You're my best friend. You know that?" —
// "He'll forget this. I won't." Close-up: the glass of water he left for the morning. A paw. A push. "Hydration… is a
// privilege."  Voices: ElevenLabs (cat: Daniel; him: Will).
export const meta = {
  id: "sk51-cat-saw-everything",
  images: { cat: "cutouts/cat_sit.webp", paw: "cutouts/cat_paw.webp", shh: "cutouts/cat_guy_warn.webp", cheese: "cutouts/cat_guy_cheese.webp", proud: "cutouts/cat_guy_proud.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const C1 = .5, OPEN = 3.2, G1 = 3.9, C2 = 5.7, FRIDGE = 9.4, C3 = 9.7, CAP = 13.0, C4 = 13.2, G2 = 15.2, C5 = 17.5, NS = 19.8, PUSH = 20.9, C6 = 21.6, STAMP = 24.3, DUR = 27.0;
  E.music({ bpm: 76, root: 57, seed: 51, prog: [[0, 3, 7], [5, 8, 12], [3, 7, 10], [7, 10, 14]], until: PUSH });
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const FL = 1780;

  // ================= scene 1: the flat at 3 AM =================
  const A = E.scene("flat", 0, NS, "dark"); E.cur = A; const P = A.el;
  E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#141a2e,#1c2440)");
  E.el(P, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background:#2a2238`);
  // the window: city at night, moon
  const win = E.el(P, "abs", "left:620px;top:470px;width:360px;height:420px;border-radius:8px;overflow:hidden;box-shadow:0 0 0 12px #2a3050");
  win.innerHTML = `<svg viewBox="0 0 360 420" width="360" height="420"><rect width="360" height="420" fill="#0e1430"/><circle cx="270" cy="80" r="34" fill="#e8ecf4"/><path d="M0 420 V300 h40 v-50 h50 v80 h30 v-120 h60 v90 h40 v-40 h50 v70 h40 v-100 h50 V420 Z" fill="#070a18"/>${Array.from({ length: 16 }, (_, i) => `<rect x="${(i * 53) % 340 + 8}" y="${280 + (i * 31) % 120}" width="8" height="10" fill="#ffd98a" opacity=".6"/>`).join("")}</svg>`;
  E.el(win, "abs", "left:176px;top:0;width:8px;height:420px;background:#2a3050");
  // the front door (left), a hall light that spills in when it opens
  const door = E.el(P, "abs", `left:30px;top:${FL - 900}px;width:320px;height:900px;background:#3a2a24;box-shadow:inset 0 0 0 14px #2a1e18`);
  const keyhole = E.el(door, "abs", "left:250px;top:470px;width:26px;height:40px;border-radius:13px 13px 4px 4px;background:#c8a040");
  const spill = E.el(P, "abs", `left:30px;top:${FL - 900}px;width:320px;height:900px;background:linear-gradient(90deg,rgba(255,230,160,.55),rgba(255,230,160,0));opacity:0;z-index:1`);
  E.K(spill, "o", [[OPEN, 0], [OPEN + .2, 1], [OPEN + 1.2, 1], [OPEN + 1.8, 0]]); E.K(door, "sx", [[OPEN, 1], [OPEN + .3, .15, "out"], [OPEN + 1.2, .15], [OPEN + 1.6, 1, "in"]]); door.style.transformOrigin = "0 50%";
  // the key missing the lock (keyhole-side scratch marks + a jiggle)
  const key = E.el(P, "abs", `left:230px;top:${FL - 440}px;font-size:60px;z-index:2;opacity:0`, "🔑");
  E.K(key, "o", [[C1 + .3, 0], [C1 + .4, 1], [OPEN - .1, 1], [OPEN, 0]]);
  E.F(t => { const u = t - C1 - .3; key.style.transform = u > 0 ? `translate(${Math.sin(u * 9) * 40}px,${Math.cos(u * 7) * 30}px) rotate(${Math.sin(u * 11) * 25}deg)` : "none"; });
  for (let i = 0; i < 6; i++) E.S(C1 + .5 + i * .38, "tick", .7);
  const tries = E.el(P, "abs", `left:60px;top:${FL - 1000}px;padding:8px 18px;border-radius:14px;background:rgba(255,255,255,.12);color:#fff;font-weight:900;font-size:36px;z-index:3;opacity:0;font-variant-numeric:tabular-nums`);
  E.K(tries, "o", [[C1 + .5, 0], [C1 + .6, 1], [OPEN, 1], [OPEN + .2, 0]]);
  E.F(t => { tries.textContent = `🔑 attempts: ${Math.min(6, Math.floor((t - C1 - .5) / .38) + 1)}`; });
  E.S(OPEN, "creak", .8);
  // the fridge (right of centre) — its light cone at FRIDGE
  const fridge = E.el(P, "abs", `left:400px;top:${FL - 820}px;width:300px;height:820px;border-radius:16px;background:linear-gradient(180deg,#d8dde2,#b8c0c8);box-shadow:inset 0 -10px 0 rgba(0,0,0,.1)`);
  E.el(fridge, "abs", "left:0;top:300px;width:300px;height:6px;background:#9aa2aa");
  E.el(fridge, "abs", "left:30px;top:180px;width:12px;height:90px;border-radius:6px;background:#8a9298");
  const cone = E.el(P, "abs", `left:260px;top:${FL - 820}px;width:560px;height:900px;z-index:1;opacity:0;background:radial-gradient(ellipse at 50% 30%,rgba(200,235,255,.55),rgba(200,235,255,0) 70%)`);
  E.K(cone, "o", [[FRIDGE, 0], [FRIDGE + .15, 1], [CAP - .2, 1], [CAP, 0]]); E.clip(FRIDGE, "sfx/elx-fridge.wav", { vol: .6, to: 2.5 });
  // the armchair + the cat (right, the narrator)
  const chair = E.el(P, "abs", `left:700px;top:${FL - 420}px;width:400px;height:420px;z-index:3`);
  chair.innerHTML = `<svg viewBox="0 0 400 420" width="400" height="420"><rect x="30" y="40" width="340" height="260" rx="50" fill="#5a3a5a"/><rect x="0" y="160" width="90" height="220" rx="36" fill="#4a2e4a"/><rect x="310" y="160" width="90" height="220" rx="36" fill="#4a2e4a"/><rect x="60" y="250" width="280" height="130" rx="30" fill="#6a4a6a"/><rect x="40" y="380" width="30" height="40" fill="#2a1a2a"/><rect x="330" y="380" width="30" height="40" fill="#2a1a2a"/></svg>`;
  const CH = 560, CW = CH * 549 / 985;
  const cat = E.el(P, "abs", `left:${900 - CW / 2}px;top:${FL - 150 - CH}px;width:${CW}px;height:${CH}px;z-index:4`);
  const catIn = E.el(cat, "abs", `left:0;top:0;width:${CW}px;height:${CH}px;transform-origin:50% 100%`);
  E.img(catIn, "cat", `width:${CW}px;height:${CH}px`);
  E.F(t => { catIn.style.transform = `scale(${1 + Math.sin(t * 1.4) * .01}) rotate(${Math.sin(t * .7) * 1}deg)`; });
  // him (left-centre), three states
  const GH = 1000;
  const him = E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:2;opacity:0");
  const hIn = E.el(him, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:360px 1780px");
  const POS = { shh: [427, 980, 330], cheese: [309, 991, 540], proud: [409, 991, 360] };
  const hEls = Object.fromEntries(Object.entries(POS).map(([n, [w, h, cx]]) => [n, E.img(hIn, n, `position:absolute;left:${cx - GH * w / h / 2}px;top:${FL + 20 - GH}px;width:${GH * w / h}px;height:${GH}px`)]));
  E.K(him, "o", [[OPEN + .3, 0], [OPEN + .5, 1]]);
  const HP = [[0, "shh"], [FRIDGE, "cheese"], [CAP, "proud"]];
  E.F(t => {
    const f = at(HP, t); for (const n in hEls) hEls[n].style.opacity = n === f ? 1 : 0;
    hIn.style.transform = `translateX(${t < OPEN + .9 ? -300 * (1 - seg(t, OPEN + .3, .6)) : 0}px) rotate(${Math.sin(t * 1.9) * 3.5}deg)`;   // a permanent drunk sway
  });
  E.clip(FRIDGE + .6, "sfx/elx-muddle.wav", { vol: .3, to: .6 }); E.clip(CAP + .2, "sfx/elx-ice-clink.wav", { vol: .6, to: .8 });
  // the clock
  const clk = E.el(P, "abs", `left:60px;top:390px;padding:8px 20px;border-radius:14px;background:#0a0a0e;color:#ff4a4a;font-family:'Courier New',monospace;font-weight:900;font-size:56px;z-index:5;text-shadow:0 0 10px #ff4a4a`);
  E.F(t => { const m = 3 * 60 + 12 + Math.floor(t / 2.4); clk.textContent = `0${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`; });

  // ================= scene 2: the nightstand =================
  const B = E.scene("nightstand", NS, DUR, "dark"); E.cur = B; const Q = B.el;
  E.wipe(NS);
  E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse at 40% 45%,#2a3050,#141a2e 70%)");
  const lamp = E.el(Q, "abs", "left:-40px;top:500px;width:520px;height:520px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,220,150,.35),rgba(255,220,150,0))");
  const stand = E.el(Q, "abs", "left:80px;top:1180px;width:760px;height:740px");
  stand.innerHTML = `<svg viewBox="0 0 760 740" width="760" height="740"><rect x="0" y="0" width="760" height="50" rx="10" fill="#8a6a52"/><rect x="30" y="50" width="700" height="690" fill="#6e523e"/><rect x="80" y="130" width="600" height="14" rx="7" fill="#5a4230"/><rect x="330" y="190" width="100" height="16" rx="8" fill="#c8a040"/></svg>`;
  // a phone at 3% and a note
  const note = E.el(Q, "abs", "left:140px;top:1110px;width:220px;height:80px;background:#fffbe8;transform:rotate(-4deg);box-shadow:0 4px 10px rgba(0,0,0,.3);font-family:'Comic Sans MS','Noto Sans',cursive;font-size:24px;font-weight:800;color:#2a2a8a;text-align:center;padding-top:10px;box-sizing:border-box", "water = tomorrow<br>me says thanks 🙏");
  // the glass of water
  const glass = E.el(Q, "abs", "left:520px;top:960px;width:140px;height:230px;z-index:3;transform-origin:50% 100%");
  glass.innerHTML = `<svg viewBox="0 0 140 230" width="140" height="230"><defs><clipPath id="wg"><path d="M10 10 H130 L118 224 H22 Z"/></clipPath></defs><rect x="0" y="60" width="140" height="170" fill="rgba(160,210,255,.55)" clip-path="url(#wg)"/><path d="M10 10 H130 L118 224 H22 Z" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="5"/><path d="M30 40 V200" stroke="rgba(255,255,255,.35)" stroke-width="8"/></svg>`;
  E.K(glass, "x", [[PUSH, 0], [PUSH + .5, 110, "in"], [PUSH + .7, 260, "in"]]); E.K(glass, "r", [[PUSH + .45, 0], [PUSH + .9, 95, "in"]]); E.K(glass, "y", [[PUSH + .5, 0], [PUSH + 1.0, 720, "in"]]);
  E.K(glass, "o", [[PUSH + .98, 1], [PUSH + 1.0, 0]]);
  const splash = E.el(Q, "abs", "left:620px;top:1780px;width:420px;height:120px;z-index:4;opacity:0");
  splash.innerHTML = `<svg viewBox="0 0 420 120" width="420" height="120"><ellipse cx="210" cy="90" rx="200" ry="26" fill="rgba(160,210,255,.6)"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${40 + i * 42} 90 l${(i % 2 ? 12 : -12)} -${30 + (i % 3) * 20} l14 6 Z" fill="rgba(230,245,255,.9)"/>`).join("")}</svg>`;
  E.K(splash, "o", [[PUSH + 1.0, 0], [PUSH + 1.05, 1]]); E.K(splash, "s", [[PUSH + 1.0, .3], [PUSH + 1.25, 1, "out"]]);
  E.clip(PUSH + 1.0, "sfx/elx-glass-smash.wav", { vol: .9 }); E.shake(PUSH + 1.0, 14, .3);
  // the paw (the cat reaching in from the right)
  const PH = 900, PW = PH * 938 / 976;
  const paw = E.el(Q, "abs", `left:${1080 - PW + 380}px;top:${1400 - PH}px;width:${PW}px;height:${PH}px;z-index:5`);
  E.img(paw, "paw", `width:${PW}px;height:${PH}px;transform:scaleX(-1)`);
  E.K(paw, "x", [[NS + .3, 300], [NS + .9, 0, "out"], [PUSH - .3, 0], [PUSH + .4, -170, "in"], [PUSH + .9, -150, "out"]]);
  const zz = E.el(Q, "abs", `left:60px;top:560px;font-weight:900;font-size:40px;color:#9aa8c8;opacity:.8`, "(he’s asleep. 😴)");

  // ================= the cat's monologue (captions) + his lines =================
  const vo = (Pn, html, t0, t1, top = 1060) => {
    const c = E.el(Pn, "abs", `left:60px;top:${top}px;width:960px;z-index:9;opacity:0;text-align:center`);
    E.el(c, "", `display:inline-block;padding:16px 28px 20px;border-radius:26px;background:rgba(10,12,24,.82);color:#f4f1e8;font-weight:700;font-style:italic;font-size:48px;line-height:1.12;box-shadow:0 14px 34px rgba(0,0,0,.45)`, `<span style="font-style:normal;color:${GOLD};font-weight:900;font-size:30px;letter-spacing:.14em">🐱 THE CAT</span><br>${html}`);
    E.K(c, "o", [[t0, 0], [t0 + .15, 1], [t1 - .15, 1], [t1, 0]]); E.K(c, "y", [[t0, 20], [t0 + .3, 0, "out"]]);
  };
  vo(P, "Three a.m. He said<br>he’d have one drink.", C1, OPEN + .3, 560);
  vo(P, "He is shushing me.<br>I haven’t said a word.", C2, FRIDGE, 560);
  vo(P, "Cheese. In the dark.<br>Like a raccoon.", C3, CAP, 560);
  vo(P, "A nightcap. Of course.", C4, G2, 560);
  vo(P, "He’ll forget this.<br>I won’t.", C5, NS, 560);
  vo(Q, "Hydration…<br>is a privilege.", C6, DUR, 700);
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 52 } = o;
    const b = E.el(P, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:#fff;border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${INK};text-align:center;transform:rotate(-2deg)`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:#fff;transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Shhh! Shhhh! 🤫", { left: 80, top: 760, w: 440, tail: 220, t0: G1, t1: C2 - .1 });
  bubble("You’re my best friend.<br>You know that? 🥹", { left: 60, top: 760, w: 560, tail: 280, t0: G2, t1: C5 - .1, size: 46 });
  E.clip(C1 + .05, "voices/sk51/c1.wav", { vol: 1.5 }); E.clip(G1 + .05, "voices/sk51/g1.wav", { vol: 1.5 }); E.clip(C2 + .05, "voices/sk51/c2.wav", { vol: 1.5 });
  E.clip(C3 + .05, "voices/sk51/c3.wav", { vol: 1.5 }); E.clip(C4 + .05, "voices/sk51/c4.wav", { vol: 1.5 }); E.clip(G2 + .05, "voices/sk51/g2.wav", { vol: 1.5 });
  E.clip(C5 + .05, "voices/sk51/c5.wav", { vol: 1.5 }); E.clip(C6 + .05, "voices/sk51/c6.wav", { vol: 1.5 });
  E.clip(NS + .4, "sfx/elx-snore.wav", { vol: .4, to: PUSH - NS });
  E.clip(0, "sfx/elx-rain-window.wav", { vol: .15, to: NS, duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(Q, "abs", "left:0;top:1380px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "THE CAT SAW EVERYTHING.", STAMP, { size: 70, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  E.cur = A;
  const titleBox = E.el(P, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The cat saw *everything.*", { size: 62, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
