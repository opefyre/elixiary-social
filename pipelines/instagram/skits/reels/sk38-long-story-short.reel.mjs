// SK.38 "Long story short…" — at the bar, he starts: "Okay. Long story short…" Time-lapse: the window goes night → dawn →
// day → night, the clock spins, the candle burns down, the ice melts, the bartender mops and stacks chairs, a cobweb grows on
// his listeners. Story fragments float by (…my cousin's dentist… the goat… this was 2009… wait, 2008…). Finally: "…and
// THAT'S how I met Dave!" — "…who's Dave?" — "Okay, so—" They lunge across the table. PART 1 OF 14.
// Voices: Higgsfield TTS (him: Reid; her: Isla).
export const meta = {
  id: "sk38-long-story-short",
  images: { finger: "cutouts/guy_order.webp", proud: "cutouts/guy_smile.webp", polite: "cutouts/couple_fake.webp", bored: "cutouts/pals_bored.webp", nooo: "cutouts/pals_reach.webp", mop: "cutouts/sal_mop.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  const G1 = .4, LAPSE = 2.8, BORED = 5.6, END = 11.8, G2 = 12.2, L1 = 14.4, G3 = 15.7, NOOO = 16.3, STAMP = 17.6, DUR = 20.6;
  E.music({ bpm: 92, root: 57, seed: 38, prog: [[0, 3, 7], [5, 8, 12], [3, 7, 10], [7, 10, 14]], until: END });
  const S = E.scene("pub", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1480;
  // lapse progress: 0 → 1 across the story, then again after "Okay, so—"
  const lp = t => seg(t, LAPSE, END - LAPSE) + seg(t, NOOO, DUR - NOOO) * .5;

  // ================= the bar =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#3a2a22,#2a1e18)");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:repeating-linear-gradient(90deg,rgba(0,0,0,.12) 0 6px,transparent 6px 140px)");
  // the window: sky cycles through a day and a night
  const win = E.el(R, "abs", "left:80px;top:420px;width:380px;height:460px;border-radius:190px 190px 10px 10px;overflow:hidden;box-shadow:0 0 0 16px #5a3e2e");
  const sky = E.el(win, "abs", "left:0;top:0;width:380px;height:460px");
  const orb = E.el(win, "abs", "left:0;top:0;width:70px;height:70px;border-radius:50%");
  E.el(win, "abs", "left:0;top:340px;width:380px;height:120px;background:#1a1a24", `<svg viewBox="0 0 380 120" width="380" height="120"><path d="M0 120 V60 h40 v-30 h50 v50 h40 v-70 h60 v40 h50 v-20 h60 v60 h80 V120 Z" fill="#12121a"/></svg>`);
  E.el(win, "abs", "left:186px;top:0;width:8px;height:460px;background:#5a3e2e"); E.el(win, "abs", "left:0;top:220px;width:380px;height:8px;background:#5a3e2e");
  const SKY = [[0, [20, 24, 48]], [.2, [20, 24, 48]], [.32, [240, 140, 110]], [.45, [140, 200, 240]], [.7, [150, 210, 245]], [.82, [240, 130, 90]], [.92, [20, 24, 48]], [1, [20, 24, 48]]];
  const lerpC = (list, v) => { for (let i = 1; i < list.length; i++) if (v <= list[i][0]) { const [a, ca] = list[i - 1], [b, cb] = list[i], u = (v - a) / (b - a || 1); return ca.map((c, k) => Math.round(c + (cb[k] - c) * u)); } return list[list.length - 1][1]; };
  E.F(t => {
    const v = lp(t) % 1, c = lerpC(SKY, v); sky.style.background = `rgb(${c})`;
    const day = v > .28 && v < .86, a = day ? (v - .28) / .58 : ((v + (v < .28 ? .14 : -.86)) / .42);
    orb.style.transform = `translate(${-20 + a * 360}px,${300 - Math.sin(a * Math.PI) * 260}px)`;
    orb.style.background = day ? "#fff4b0" : "#e8ecf4"; orb.style.boxShadow = day ? "0 0 40px 10px rgba(255,240,160,.7)" : "0 0 20px rgba(230,236,244,.5)";
  });
  // wall clock
  const clk = E.el(R, "abs", "left:760px;top:430px;width:200px;height:200px;border-radius:50%;background:#f4efe4;box-shadow:0 0 0 12px #5a3e2e");
  clk.innerHTML = `<svg viewBox="0 0 200 200" width="200" height="200">${Array.from({ length: 12 }, (_, i) => `<rect x="97" y="12" width="6" height="18" fill="#333" transform="rotate(${i * 30} 100 100)"/>`).join("")}<line id="hh" x1="100" y1="100" x2="100" y2="55" stroke="#222" stroke-width="10" stroke-linecap="round" style="transform-box:view-box;transform-origin:100px 100px"/><line id="mh" x1="100" y1="100" x2="100" y2="30" stroke="#c8102e" stroke-width="6" stroke-linecap="round" style="transform-box:view-box;transform-origin:100px 100px"/><circle cx="100" cy="100" r="8" fill="#222"/></svg>`;
  const hh = clk.querySelector("#hh"), mh = clk.querySelector("#mh");
  E.F(t => { const h = 21.1 + lp(t) * 24 + (t < LAPSE ? t * .01 : 0); hh.style.transform = `rotate(${h * 30}deg)`; mh.style.transform = `rotate(${h * 360}deg)`; });
  // the bartender in the background: mopping, chairs going up
  const MH = 760, MW = MH * 0.72;
  const mop = E.el(R, "abs", `left:600px;top:${TOP - MH + 60}px;width:${MW}px;height:${MH}px;opacity:0;filter:brightness(.7)`);
  E.img(mop, "mop", `width:${MW}px;height:auto`);
  E.K(mop, "o", [[LAPSE + 1.2, 0], [LAPSE + 1.5, 1], [LAPSE + 5, 1], [LAPSE + 5.4, 0]]); E.K(mop, "x", [[LAPSE + 1.2, 200], [LAPSE + 5.4, -300, "lin"]]);
  const chairs = E.el(R, "abs", `left:560px;top:${TOP - 340}px;width:500px;height:260px;opacity:0`);
  chairs.innerHTML = `<svg viewBox="0 0 500 260" width="500" height="260"><rect x="0" y="200" width="500" height="20" fill="#4a3226"/>${[40, 200, 360].map(x => `<g transform="translate(${x} 60)"><path d="M0 0 H90 V20 H0 Z M8 20 V130 M82 20 V130 M0 -60 V0 M90 -60 V0" stroke="#6a4a36" stroke-width="12" fill="#6a4a36"/></g>`).join("")}</svg>`;
  E.K(chairs, "o", [[LAPSE + 4.4, 0], [LAPSE + 4.8, .9]]);
  const closed = E.el(R, "abs", `left:500px;top:440px;padding:10px 22px;border-radius:12px;background:#fffbe8;border:6px solid #c8102e;font-weight:900;font-size:40px;color:#c8102e;opacity:0;transform:rotate(-4deg)`, "CLOSED");
  E.K(closed, "o", [[LAPSE + 4.0, 0], [LAPSE + 4.2, 1]]); E.S(LAPSE + 4.0, "tick", .6);

  // ================= the listeners (left) =================
  const PW = 560;
  const pol = E.el(R, "abs", `left:-30px;top:${TOP + 120 - PW * 981 / 845}px;width:${PW}px;height:${PW * 981 / 845}px;z-index:3`);
  E.img(pol, "polite", `width:${PW}px;height:auto`);
  const bor = E.el(R, "abs", `left:-40px;top:${TOP + 40 - PW * 647 / 953}px;width:${PW}px;height:${PW * 647 / 953}px;z-index:3`);
  E.img(bor, "bored", `width:${PW}px;height:auto`);
  const noo = E.el(R, "abs", `left:-20px;top:${TOP + 60 - 600 * 588 / 938}px;width:600px;height:${600 * 588 / 938}px;z-index:6`);
  E.img(noo, "nooo", "width:600px;height:auto");
  const LP = [[0, "polite"], [BORED, "bored"], [NOOO, "nooo"]];
  E.F(t => { const f = at(LP, t); pol.style.opacity = f === "polite" ? 1 : 0; bor.style.opacity = f === "bored" ? 1 : 0; noo.style.opacity = f === "nooo" ? 1 : 0; bor.style.transform = `translateY(${Math.sin(t * .8) * 3 + 20 * seg(t, BORED, 6)}px)`; });
  E.K(noo, "x", [[NOOO, -40], [NOOO + .25, 60, "out"]]); E.S(NOOO, "blare", .4);
  // a growing cobweb on them
  const web = E.el(R, "abs", `left:10px;top:${TOP - 420}px;width:260px;height:260px;z-index:4;opacity:0`);
  web.innerHTML = `<svg viewBox="0 0 260 260" width="260" height="260" fill="none" stroke="rgba(235,235,245,.85)" stroke-width="2">${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="0" x2="${260 * Math.cos(i * Math.PI / 16)}" y2="${260 * Math.sin(i * Math.PI / 16)}"/>`).join("")}${[50, 100, 150, 200, 250].map(r => `<path d="M${r} 0 A${r} ${r} 0 0 1 0 ${r}"/>`).join("")}</svg>`;
  E.F(t => { const v = seg(t, BORED + 1, 4); web.style.opacity = t < NOOO ? v : 0; web.style.transform = `scale(${.3 + .7 * v})`; web.style.transformOrigin = "0 0"; });

  // ================= the storyteller (right) =================
  const SH = 900, SW = SH * 872 / 1121;
  const him = E.el(R, "abs", `left:${800 - SW / 2}px;top:${TOP + 60 - SH}px;width:${SW}px;height:${SH}px;z-index:4`);
  const hIn = E.el(him, "abs", `left:0;top:0;width:${SW}px;height:${SH}px;transform-origin:50% 100%`);
  const hF = E.img(hIn, "finger", `position:absolute;left:0;top:0;width:${SW}px;height:${SH}px`);
  const hP = E.img(hIn, "proud", `position:absolute;left:${(SW - SH * 821 / 1122) / 2}px;top:0;width:${SH * 821 / 1122}px;height:${SH}px`);
  const HP = [[0, "finger"], [LAPSE, "proud"], [LAPSE + 1.4, "finger"], [LAPSE + 2.8, "proud"], [LAPSE + 4.2, "finger"], [LAPSE + 5.6, "proud"], [LAPSE + 7, "finger"], [G2 - .1, "proud"], [G3 - .1, "finger"]];
  E.F(t => {
    const f = at(HP, t); hF.style.opacity = f === "finger" ? 1 : 0; hP.style.opacity = f === "proud" ? 1 : 0;
    const talk = (t > G1 && t < END) || t > G3;
    hIn.style.transform = `translateY(${Math.sin(t * (talk ? 9 : 2)) * (talk ? 5 : 3)}px) rotate(${talk ? Math.sin(t * 4) * 2 : 0}deg)`;
  });
  // the table: candle burning down, drinks melting
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;z-index:5;background:linear-gradient(180deg,#6e4630,#4a2e1f);box-shadow:inset 0 10px 0 #8a5a3c`);
  const candle = E.el(R, "abs", `left:500px;top:${TOP - 170}px;width:60px;height:170px;z-index:6`);
  const wax = E.el(candle, "abs", "left:14px;bottom:0;width:32px;height:140px;border-radius:6px 6px 0 0;background:linear-gradient(90deg,#f4efe4,#d8d0c0)");
  const flame = E.el(candle, "abs", "left:20px;width:20px;height:34px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(ellipse at 50% 70%,#fff6c8,#ffb640 60%,rgba(255,120,40,0));box-shadow:0 0 30px 10px rgba(255,190,80,.35)");
  E.F(t => { const h = 140 * (1 - .9 * seg(t, LAPSE, END - LAPSE)) + (t > NOOO ? 0 : 0); wax.style.height = `${h}px`; flame.style.bottom = `${h - 4}px`; flame.style.transform = `scale(${1 + Math.sin(t * 13) * .08},${1 + Math.sin(t * 9) * .12})`; flame.style.opacity = t > END + .2 && t < G3 ? 0 : 1; });
  const glass = (x, col) => {
    const g = E.el(R, "abs", `left:${x}px;top:${TOP - 150}px;width:90px;height:150px;z-index:6`);
    g.innerHTML = `<svg viewBox="0 0 90 150" width="90" height="150"><defs><clipPath id="gc${x}"><path d="M8 8 H82 L74 142 H16 Z"/></clipPath></defs><g clip-path="url(#gc${x})"><rect class="liq" x="0" y="40" width="90" height="110" fill="${col}"/>${[0, 1, 2].map(i => `<rect class="ice" x="${16 + i * 20}" y="${44 + (i % 2) * 14}" width="26" height="26" rx="6" fill="rgba(235,248,255,.85)"/>`).join("")}</g><path d="M8 8 H82 L74 142 H16 Z" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="4"/></svg>`;
    const liq = g.querySelector(".liq"), ice = [...g.querySelectorAll(".ice")];
    E.F(t => { const v = seg(t, LAPSE, END - LAPSE); ice.forEach((c, i) => { const s = Math.max(0, 1 - v * (1.4 - i * .15)); c.setAttribute("width", 26 * s); c.setAttribute("height", 26 * s); }); liq.setAttribute("fill", v > .6 ? "rgba(220,200,160,.55)" : col); });
  };
  glass(250, "rgba(230,120,60,.85)"); glass(360, "rgba(220,60,90,.85)"); glass(700, "rgba(240,180,60,.85)");

  // ================= the story timer + fragments =================
  const tmr = E.el(R, "abs", `left:0;top:1000px;width:1080px;text-align:center;z-index:8;opacity:0`, `<span id="tm" style="display:inline-block;padding:12px 28px;border-radius:18px;background:${INK};color:#fff;font-weight:900;font-size:52px;font-variant-numeric:tabular-nums"></span>`);
  const tm = tmr.querySelector("#tm");
  E.K(tmr, "o", [[LAPSE, 0], [LAPSE + .2, 1], [END + 1.8, 1], [END + 2.0, 0], [NOOO, 0], [NOOO + .1, 1]]);
  E.F(t => { const m = Math.round(3 + lp(t) * 560); tm.textContent = `⏱ “SHORT” STORY: ${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`; });
  const ff = E.el(R, "abs", `left:860px;top:980px;padding:6px 14px;border-radius:12px;background:${GOLD};color:${INK};font-weight:900;font-size:34px;z-index:8;opacity:0`, "⏩ ×2000");
  E.K(ff, "o", [[LAPSE, 0], [LAPSE + .1, 1], [END, 1], [END + .1, 0], [NOOO, 0], [NOOO + .1, 1]]);
  const FR = ["…so my cousin’s dentist…", "…this was 2009…", "…wait, 2008.", "…anyway, the goat…", "…the goat was FINE…", "…where was I?", "…right. The goat."];
  FR.forEach((s, i) => {
    const t0 = LAPSE + .3 + i * 1.25;
    const b = E.el(R, "abs", `left:${420 + (i % 2) * 40}px;top:${560 + (i % 3) * 110}px;padding:12px 22px;border-radius:24px;background:#fff;color:${INK};font-weight:800;font-style:italic;font-size:40px;z-index:8;opacity:0;white-space:nowrap;box-shadow:0 10px 24px rgba(0,0,0,.4)`, s);
    E.K(b, "o", [[t0, 0], [t0 + .1, 1], [t0 + 1.0, 1], [t0 + 1.15, 0]]); E.K(b, "s", [[t0, .6], [t0 + .2, 1, "back"]]); E.clip(t0, "sfx/crowd-murmur.wav", { vol: .18, to: 1 });
  });
  for (let t = LAPSE; t < END; t += .5) E.S(t, "tick", .25);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 52, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Okay. Long story short…", { left: 380, top: 600, w: 620, tail: 420, t0: G1, t1: LAPSE });
  bubble("…and THAT’S how<br>I met Dave!", { left: 420, top: 600, w: 560, tail: 380, t0: G2, t1: L1 - .05 });
  bubble("…who’s Dave?", { left: 60, top: 880, w: 400, tail: 150, t0: L1, t1: G3, dark: true, italic: true });
  bubble("Okay, so—", { left: 520, top: 620, w: 400, tail: 280, t0: G3, t1: DUR });
  E.clip(G1 + .05, "voices/sk38/g1.wav", { vol: 1.5 }); E.clip(G2 + .05, "voices/sk38/g2.wav", { vol: 1.5 }); E.clip(L1 + .05, "voices/sk38/l1.wav", { vol: 1.6 }); E.clip(G3 + .05, "voices/sk38/g3.wav", { vol: 1.5 });
  E.clip(END + .2, "sfx/elx-yawn.wav", { vol: .6 });
  E.clip(NOOO, "sfx/crowd-groan.wav", { vol: .6 });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1600px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "PART 1 OF 14.", STAMP, { size: 96, rot: -5, bg: CORAL, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "“Long story *short…*”", { size: 70, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, LAPSE + .4, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
