// SK.44 "The snack left for Santa." — Christmas Eve. The kid sets out cookies and milk: "These are for Santa! Don't touch!"
// 23:58. Dad tiptoes in. COOKIES 6 → 0, MILK 100% → 0%. He forges the note (THANKS! — SANTA 🎅) and stamps floury boot prints
// to the fireplace. The lights snap on: "Dad?!" Milk moustache, mouth full: "…Santa… said I could." MERRY CHRISTMAS.
// Voices: Higgsfield TTS (kid: Pixie; dad: Julian).
export const meta = {
  id: "sk44-christmas",
  images: { dad: "cutouts/xm_dad.webp", kid: "cutouts/xm_kid.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", XRED = "#c8102e", XGRN = "#1f7a4a";
  E.episode(-16);
  const K1 = .5, KOUT = 3.4, DARK = 3.8, DAD = 4.4, EAT = 5.4, FORGE = 8.8, PRINTS = 9.8, LIGHTS = 11.4, K2 = 11.7, D1 = 13.4, STAMP = 15.8, DUR = 19.2;
  E.music({ bpm: 88, root: 62, seed: 44, prog: [[0, 4, 7], [5, 9, 12], [2, 5, 9], [7, 11, 14]], until: LIGHTS });
  const S = E.scene("eve", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const FL = 1800;

  // ================= the living room on Christmas Eve =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#3a2a2a,#2a1e22)");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0 40px,transparent 40px 80px)");
  E.el(R, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background:#6a4a34;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.14) 0 3px,transparent 3px 140px)`);
  // snowy window
  const win = E.el(R, "abs", "left:60px;top:420px;width:300px;height:380px;border-radius:10px;overflow:hidden;box-shadow:0 0 0 14px #5a3e2e");
  win.innerHTML = `<svg viewBox="0 0 300 380" width="300" height="380"><rect width="300" height="380" fill="#1a2440"/><path d="M0 300 Q150 260 300 300 V380 H0 Z" fill="#e8eef8"/>${Array.from({ length: 30 }, (_, i) => `<circle class="sn" cx="${(i * 53) % 300}" cy="${(i * 37) % 380}" r="${2 + i % 3}" fill="#fff"/>`).join("")}</svg>`;
  E.el(win, "abs", "left:146px;top:0;width:8px;height:380px;background:#5a3e2e");
  const flakes = [...win.querySelectorAll(".sn")];
  E.F(t => flakes.forEach((f, i) => { f.setAttribute("cy", ((i * 37 + t * (30 + i % 4 * 10)) % 380)); f.setAttribute("cx", ((i * 53) + Math.sin(t + i) * 10) % 300); }));
  // fireplace with stockings
  const fp = E.el(R, "abs", `left:640px;top:${FL - 560}px;width:420px;height:560px`);
  fp.innerHTML = `<svg viewBox="0 0 420 560" width="420" height="560"><rect x="0" y="0" width="420" height="60" rx="8" fill="#8a5a3c"/><rect x="20" y="60" width="380" height="500" fill="#a86a4a"/><rect x="100" y="200" width="220" height="360" rx="100" fill="#1a0e0a"/>` +
    `<g id="fire"><path d="M150 560 Q170 420 210 470 Q230 380 260 480 Q290 430 280 560 Z" fill="#ff8a1a"/><path d="M180 560 Q200 470 220 500 Q240 450 255 560 Z" fill="#ffd44a"/></g>` +
    [60, 190, 320].map((x, i) => `<g transform="translate(${x} 40)"><path d="M0 0 H40 V80 Q40 110 10 110 H-20 Q-30 90 -10 80 H0 Z" fill="${i % 2 ? XGRN : XRED}"/><rect x="-4" y="0" width="48" height="18" fill="#fff"/></g>`).join("") + `</svg>`;
  const fire = fp.querySelector("#fire");
  E.F(t => { fire.setAttribute("transform", `translate(210 560) scale(${1 + Math.sin(t * 11) * .05},${1 + Math.sin(t * 7) * .1}) translate(-210 -560)`); });
  // the Christmas tree with twinkling lights
  const tree = E.el(R, "abs", `left:340px;top:${FL - 820}px;width:360px;height:820px`);
  tree.innerHTML = `<svg viewBox="0 0 360 820" width="360" height="820"><rect x="160" y="700" width="40" height="80" fill="#5a3a24"/><rect x="110" y="760" width="140" height="60" rx="8" fill="${XRED}"/>` +
    [[180, 60, 90, 260], [180, 200, 130, 440], [180, 360, 170, 640], [180, 520, 180, 740]].map(([cx, top, hw, bot]) => `<path d="M${cx} ${top} L${cx + hw} ${bot} H${cx - hw} Z" fill="#1f6a3a"/>`).join("") +
    `<path d="M180 20 l12 30 h32 l-26 18 l10 30 l-28 -18 l-28 18 l10 -30 l-26 -18 h32 Z" fill="${GOLD}"/>` +
    Array.from({ length: 26 }, (_, i) => { const y = 140 + i * 22, w = 30 + i * 6; return `<circle class="lt" cx="${180 + ((i % 2) ? w : -w) * ((i * 37) % 10) / 10}" cy="${y}" r="8" fill="${["#ff4a4a", "#ffd44a", "#4ad4ff", "#7aff7a"][i % 4]}"/>`; }).join("") + `</svg>`;
  const lts = [...tree.querySelectorAll(".lt")];
  E.F(t => lts.forEach((l, i) => l.setAttribute("opacity", Math.floor(t * 3 + i) % 3 === 0 ? .35 : 1)));
  // the coffee table: cookies, milk, the note
  const table = E.el(R, "abs", `left:100px;top:${FL - 230}px;width:480px;height:230px;z-index:4`);
  table.innerHTML = `<svg viewBox="0 0 480 230" width="480" height="230"><rect x="0" y="40" width="480" height="30" rx="8" fill="#8a5a3c"/><rect x="30" y="70" width="24" height="160" fill="#6a4430"/><rect x="426" y="70" width="24" height="160" fill="#6a4430"/><ellipse cx="170" cy="36" rx="110" ry="16" fill="#f4efe4"/></svg>`;
  const cookies = Array.from({ length: 6 }, (_, i) => {
    const c = E.el(R, "abs", `left:${170 + (i % 3) * 60}px;top:${FL - 232 - Math.floor(i / 3) * 22}px;width:56px;height:30px;z-index:5`);
    c.innerHTML = `<svg viewBox="0 0 56 30" width="56" height="30"><ellipse cx="28" cy="15" rx="26" ry="13" fill="#c8894a"/>${[[18, 12], [32, 9], [36, 18], [22, 20]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#4a2a14"/>`).join("")}</svg>`;
    const t0 = EAT + .3 + i * .5; E.K(c, "o", [[t0, 1], [t0 + .05, 0]]); E.S(t0, "crack", .5);
    return c;
  });
  const milk = E.el(R, "abs", `left:370px;top:${FL - 330}px;width:80px;height:130px;z-index:5`);
  milk.innerHTML = `<svg viewBox="0 0 80 130" width="80" height="130"><defs><clipPath id="mg"><path d="M6 6 H74 L68 126 H12 Z"/></clipPath></defs><g clip-path="url(#mg)"><rect id="mk" x="0" y="20" width="80" height="110" fill="#fbfbf6"/></g><path d="M6 6 H74 L68 126 H12 Z" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="4"/></svg>`;
  const mk = milk.querySelector("#mk");
  E.F(t => mk.setAttribute("y", 20 + 110 * seg(t, EAT + 3.2, .6)));
  E.clip(EAT + 3.2, "sfx/elx-slurp-empty.wav", { vol: .6, to: .7 });
  const noteEl = E.el(R, "abs", `left:450px;top:${FL - 300}px;width:170px;height:120px;z-index:5;transform:rotate(6deg);background:#fffbe8;box-shadow:0 6px 14px rgba(0,0,0,.3);padding:10px;box-sizing:border-box;font-weight:900;font-size:24px;color:${XRED};text-align:center;line-height:1.15`);
  E.F(t => { const h = t >= FORGE + .5 ? `<span style="font-family:'Comic Sans MS','Noto Sans',cursive;font-size:26px;color:#2a2a8a">THANKS!<br>— SANTA 🎅</span>` : "FOR SANTA 🎅<br><span style='font-size:18px;color:#555'>love, Max</span>"; if (noteEl.__h !== h) { noteEl.innerHTML = h; noteEl.__h = h; } });
  E.K(noteEl, "s", [[FORGE + .4, 1], [FORGE + .6, 1.6, "out"], [FORGE + 1.4, 1.6], [FORGE + 1.7, 1, "io"]]); E.S(FORGE + .5, "scratch", .4);
  // floury boot prints to the fireplace
  for (let i = 0; i < 6; i++) {
    const p = E.el(R, "abs", `left:${420 + i * 90}px;top:${FL + 20 + (i % 2) * 36}px;width:44px;height:30px;border-radius:50%;background:rgba(245,245,240,.9);z-index:3;opacity:0;transform:rotate(-10deg)`);
    const t0 = PRINTS + i * .18; E.K(p, "o", [[t0, 0], [t0 + .05, 1]]); E.S(t0, "tick", .5);
  }
  const ev = E.el(R, "abs", `left:0;top:640px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span style="display:inline-block;padding:10px 24px;border-radius:18px;background:#fff;color:${INK};font-weight:900;font-size:40px">🕵️ EVIDENCE: PLANTED</span>`);
  E.K(ev, "o", [[PRINTS + .4, 0], [PRINTS + .6, 1], [LIGHTS, 1], [LIGHTS + .1, 0]]);
  // HUD: clock + counters
  const hud = E.el(R, "abs", "left:60px;top:860px;display:flex;flex-direction:column;gap:10px;z-index:8;opacity:0");
  const cClock = E.el(hud, "", `padding:8px 18px;border-radius:14px;background:rgba(0,0,0,.6);color:${GOLD};font-weight:900;font-size:40px;font-variant-numeric:tabular-nums`);
  const cCook = E.el(hud, "", `padding:8px 18px;border-radius:14px;background:rgba(0,0,0,.6);color:#fff;font-weight:900;font-size:36px;font-variant-numeric:tabular-nums`);
  const cMilk = E.el(hud, "", `padding:8px 18px;border-radius:14px;background:rgba(0,0,0,.6);color:#fff;font-weight:900;font-size:36px;font-variant-numeric:tabular-nums`);
  E.K(hud, "o", [[DARK, 0], [DARK + .2, 1], [LIGHTS, 1], [LIGHTS + .1, 0]]);
  E.F(t => {
    const m = 23 * 60 + 58 + Math.round(seg(t, DARK, LIGHTS - DARK) * 9); cClock.textContent = `🕛 ${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    const n = 6 - [0, 1, 2, 3, 4, 5].filter(i => t >= EAT + .3 + i * .5).length; cCook.textContent = `🍪 COOKIES: ${n}`; cCook.style.color = n ? "#fff" : CORAL;
    const mm = Math.round(100 * (1 - seg(t, EAT + 3.2, .6))); cMilk.textContent = `🥛 MILK: ${mm}%`; cMilk.style.color = mm ? "#fff" : CORAL;
  });
  // the lights: a dark night filter, then snapped on
  const night = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6;background:rgba(10,16,40,.55);opacity:0;pointer-events:none");
  E.K(night, "o", [[DARK, 0], [DARK + .4, 1], [LIGHTS - .02, 1], [LIGHTS, 0]]);
  E.S(LIGHTS, "slam", .7); E.flash(LIGHTS, "#fff6d0", .6, .25); E.clip(LIGHTS + .1, "sfx/record-silence.wav", { vol: .6 });

  // ================= the kid =================
  const KH = 820, KW = KH * 396 / 1007;
  const kid = E.el(R, "abs", `left:40px;top:${FL + 40 - KH}px;width:${KW}px;height:${KH}px;z-index:3`);
  const kIn = E.el(kid, "abs", `left:0;top:0;width:${KW}px;height:${KH}px`);
  E.img(kIn, "kid", `width:${KW}px;height:${KH}px`);
  E.K(kid, "x", [[KOUT - .3, 0], [KOUT + .2, -500, "in"], [LIGHTS - .3, -500], [LIGHTS + .1, 0, "out"]]);
  E.F(t => { kIn.style.transform = `translateY(${Math.sin(t * 2.4) * 4}px)`; });

  // ================= Dad =================
  const DH = 1040, DW = DH * 440 / 995;
  const dad = E.el(R, "abs", `left:${840 - DW / 2}px;top:${FL + 40 - DH}px;width:${DW}px;height:${DH}px;z-index:7`);
  const dIn = E.el(dad, "abs", `left:0;top:0;width:${DW}px;height:${DH}px;transform-origin:50% 100%`);
  E.img(dIn, "dad", `width:${DW}px;height:${DH}px`);
  E.K(dad, "x", [[DAD, 500], [DAD + .9, 0, "out"]]);
  E.F(t => {
    let y = 0, r = 0;
    if (t < LIGHTS) { y = -Math.abs(Math.sin(t * 5)) * 16; r = Math.sin(t * 2.5) * 3; }                    // tiptoe
    else if (t < LIGHTS + .3) y = -Math.sin((t - LIGHTS) / .3 * Math.PI) * 40;                                   // caught — jolt
    dIn.style.transform = `translateY(${y}px) rotate(${r}deg)`;
  });
  E.clip(DAD, "sfx/elx-sniff.wav", { vol: .3 });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 52, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("These are for Santa!<br>Don’t touch!", { left: 40, top: 800, w: 520, tail: 120, t0: K1, t1: KOUT });
  bubble("Dad?!", { left: 40, top: 800, w: 300, tail: 120, t0: K2, t1: D1 - .05, size: 72 });
  bubble("…Santa…<br>said I could.", { left: 440, top: 540, w: 460, tail: 300, t0: D1, t1: DUR, dark: true, italic: true });
  E.clip(K1 + .05, "voices/sk44/k1.wav", { vol: 1.5 }); E.clip(K2 + .05, "voices/sk44/k2.wav", { vol: 1.6 }); E.clip(D1 + .05, "voices/sk44/d1.wav", { vol: 1.6 });
  E.clip(DARK, "sfx/elx-hotel-room.wav", { vol: .2, to: LIGHTS - DARK, duck: false });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1180px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "MERRY CHRISTMAS 🎄", STAMP, { size: 84, rot: -5, bg: XRED, fg: "#fff", shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The snacks left for *Santa.*", { size: 60, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = XRED; e.style.color = "#fff"; });
  E.until(title, DAD, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
