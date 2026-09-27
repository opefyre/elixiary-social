// SK.29 "The cheers eye-contact rule." — five friends raise their glasses. "Wait! Eye contact! Or it's seven years of bad
// luck!" Every pair must lock eyes: lines draw face to face, EYE CONTACT 1/10 … 10/10 ✓. Then Nina arrives: "Sorry I'm late!
// Did I miss the cheers?" — the counter resets to 0/15. Faster, messier… 14/15. The one missing line: Grandpa ↔ Nina.
// Everyone turns to him. "…Seven years it is." Sip.  Voices: ElevenLabs (Laura; Nina: Sarah; Grandpa: Bill).
export const meta = {
  id: "sk29-eye-contact",
  images: { up: "cutouts/cheers_up.webp", done: "cutouts/cheers_done.webp", nina: "cutouts/nina_water.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", RED = "#e5484d";
  E.episode(-16);
  const L1 = .4, R1 = 4.4, DONE1 = 8.7, NINA = 9.6, N1 = 10.0, RESET = 12.4, R2 = 13.0, MISS = 15.6, TIRED = 16.2, O1 = 16.9, SIP = 18.4, STAMP = 19.2, DUR = 21.8;
  E.music({ bpm: 118, root: 62, seed: 29, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: TIRED });
  const S = E.scene("bar", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1500;

  // ================= a warm cocktail bar =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse at 50% 40%,#5a3424,#2a1812 65%,#1a0f0b)");
  // back bar: shelves of bottles, a neon sign, bokeh
  const back = E.el(R, "abs", "left:0;top:560px;width:1080px;height:520px;opacity:.55");
  let bottles = "";
  for (let s = 0; s < 2; s++) for (let i = 0; i < 14; i++) {
    const x = 20 + i * 76 + (s ? 30 : 0), y = s * 250, h = 110 + ((i * 37 + s * 11) % 60), c = ["#b8743a", "#6aa04c", "#d8c9a0", "#8a2a3a", "#4a7aa8", "#e0b040"][(i + s * 2) % 6];
    bottles += `<rect x="${x}" y="${y + 200 - h}" width="40" height="${h}" rx="8" fill="${c}" opacity=".8"/><rect x="${x + 13}" y="${y + 170 - h}" width="14" height="34" fill="${c}" opacity=".8"/>`;
  }
  back.innerHTML = `<svg viewBox="0 0 1080 520" width="1080" height="520">${bottles}<rect x="0" y="200" width="1080" height="14" fill="#7a4a30"/><rect x="0" y="450" width="1080" height="14" fill="#7a4a30"/></svg>`;
  const neon = E.el(R, "abs", `left:0;top:530px;width:1080px;text-align:center;font-family:'Pacifico','Noto Sans',cursive;font-weight:800;font-size:64px;color:#ffd6e8;text-shadow:0 0 12px #ff5fa2,0 0 32px #ff5fa2,0 0 60px #ff2f86`, "cheers!");
  E.F(t => { neon.style.opacity = (Math.floor(t * 7) % 23 === 0) ? .4 : 1; });
  const bokeh = [];
  for (let i = 0; i < 14; i++) bokeh.push(E.el(R, "abs", `left:${(i * 173) % 1040}px;top:${400 + (i * 97) % 600}px;width:${40 + (i % 4) * 20}px;height:${40 + (i % 4) * 20}px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,200,120,.35),transparent)`));
  E.F(t => bokeh.forEach((b, i) => { b.style.transform = `translateY(${Math.sin(t * .8 + i) * 10}px)`; }));

  // ================= Nina (arrives later, stands behind the right end) =================
  const NH = 600, NW = NH * 768 / 1137;
  const nina = E.el(R, "abs", `left:560px;top:730px;width:${NW}px;height:${NH}px;z-index:2;opacity:0`);
  const ninaIn = E.el(nina, "abs", `left:0;top:0;width:${NW}px;height:${NH}px`);
  E.img(ninaIn, "nina", `width:${NW}px;height:${NH}px`);
  E.K(nina, "o", [[NINA, 0], [NINA + .1, 1]]); E.K(nina, "x", [[NINA, 500], [NINA + .45, 0, "back"]]); E.K(nina, "y", [[TIRED, 0], [TIRED + .5, 300, "in"]]); E.S(NINA, "swish", .6);
  E.F(t => { ninaIn.style.transform = `translateY(${Math.sin(t * 2.4) * 4}px)`; });

  // ================= the five friends =================
  const GW = 1000, GH = GW * 625 / 1024, GL = -10, GT = 960;
  const grp = E.el(R, "abs", `left:${GL}px;top:${GT}px;width:${GW}px;height:${GH}px;z-index:3`);
  const grpIn = E.el(grp, "abs", `left:0;top:0;width:${GW}px;height:${GH}px;transform-origin:50% 100%`);
  const up = E.img(grpIn, "up", `position:absolute;left:0;top:0;width:${GW}px;height:${GH}px`);
  const done = E.img(grpIn, "done", `position:absolute;left:0;top:${GH - GW * 643 / 1024}px;width:${GW}px;height:${GW * 643 / 1024}px`);
  E.F(t => {
    up.style.opacity = t < TIRED ? 1 : 0; done.style.opacity = t < TIRED ? 0 : 1;
    let y = Math.sin(t * 2) * 3, r = 0;
    if (t >= R2 && t < MISS) { r = Math.sin(t * 40) * 1.2; y += Math.sin(t * 33) * 3; }          // round two: frantic
    if (t >= TIRED && t < TIRED + .3) y += Math.sin((t - TIRED) / .3 * Math.PI) * 18;
    grpIn.style.transform = `translateY(${y}px) rotate(${r}deg)`;
  });
  // the table
  const table = E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;z-index:5`);
  table.innerHTML = `<svg viewBox="0 0 1120 420" width="1120" height="420"><rect x="0" y="0" width="1120" height="420" fill="#5a3422"/><rect x="0" y="0" width="1120" height="26" fill="#7a4a30"/>` +
    [0, 1, 2, 3, 4, 5].map(i => `<path d="M0 ${60 + i * 60} Q560 ${40 + i * 60} 1120 ${70 + i * 60}" stroke="rgba(0,0,0,.18)" stroke-width="4" fill="none"/>`).join("") +
    `<g transform="translate(470 40)"><ellipse cx="60" cy="70" rx="70" ry="20" fill="#3a2016"/><path d="M0 40 Q60 110 120 40 Z" fill="#c9a36a"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<ellipse cx="${20 + i * 13}" cy="${40 + (i % 2) * 6}" rx="9" ry="6" fill="#b07a3a"/>`).join("")}</g>` +
    `<g transform="translate(860 30)"><rect x="0" y="0" width="60" height="60" rx="8" fill="rgba(255,255,255,.2)"/><rect x="20" y="-20" width="20" height="40" rx="4" fill="#f4efe4"/><ellipse cx="30" cy="-28" rx="8" ry="14" fill="#ffc452"/></g></svg>`;

  // ================= eye-contact lines =================
  const F = [[.147, .28], [.305, .27], [.48, .18], [.69, .26], [.88, .30]].map(([fx, fy]) => [GL + GW * fx, GT + GH * fy]);
  F.push([560 + NW * .55, 730 + NH * .23]);                     // Nina
  const svg = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:6;pointer-events:none");
  svg.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="overflow:visible"></svg>`;
  const G = svg.firstChild;
  const line = (a, b, t0, color, hold) => {
    const [x1, y1] = F[a], [x2, y2] = F[b], mid = (x1 + x2) / 2, top = Math.min(y1, y2) - 60 - Math.abs(x2 - x1) * .18;
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", `M${x1} ${y1} Q${mid} ${top} ${x2} ${y2}`); p.setAttribute("pathLength", "1");
    p.setAttribute("style", `fill:none;stroke:${color};stroke-width:7;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;filter:drop-shadow(0 0 6px ${color})`);
    G.appendChild(p);
    E.K(p, "draw", [[t0, 0], [t0 + .18, 1, "out"]]);
    E.K(p, "o", [[t0, 0], [t0 + .02, 1], [t0 + hold, 1], [t0 + hold + .3, .3]]);
    return p;
  };
  const PAIRS5 = []; for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) PAIRS5.push([i, j]);
  const r1 = PAIRS5.map((_, k) => R1 + (k < 3 ? k * .7 : 2.1 + (k - 3) * .3));
  const lines1 = PAIRS5.map(([a, b], k) => { const p = line(a, b, r1[k], GOLD, .5); E.clip(r1[k], "sfx/elx-glass-clink.wav", { vol: k < 3 ? .6 : .35, to: .5 }); return p; });
  lines1.forEach(p => E.K(p, "o", [[RESET, .3], [RESET + .2, 0]]));
  const PAIRS6 = []; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (!(i === 4 && j === 5)) PAIRS6.push([i, j]);
  const r2 = PAIRS6.map((_, k) => R2 + k * .17);
  PAIRS6.forEach(([a, b], k) => { const p2 = line(a, b, r2[k], k % 2 ? "#8ee3c8" : GOLD, .25); E.K(p2, "o", [[TIRED - .2, .3], [TIRED, 0]]); E.S(r2[k], "tick", .5); if (k % 3 === 0) E.clip(r2[k], "sfx/elx-glass-clink.wav", { vol: .3, to: .4 }); });
  // the missing one: Grandpa ↔ Nina
  const miss = line(4, 5, MISS, RED, 6);
  E.K(miss, "o", [[TIRED, 1], [TIRED + .2, 0]]);
  miss.style.strokeDasharray = ".04 .04";
  E.F(t => { if (t >= MISS) miss.style.opacity = (Math.floor(t * 5) % 2 ? 1 : .35) * (t < TIRED ? 1 : 0); });
  const x = E.el(R, "abs", `left:${(F[4][0] + F[5][0]) / 2 - 36}px;top:${Math.min(F[4][1], F[5][1]) - 150}px;width:72px;height:72px;border-radius:50%;background:${RED};color:#fff;font-weight:900;font-size:52px;line-height:72px;text-align:center;z-index:7;opacity:0`, "✗");
  E.pop(x, MISS + .1, { from: .3, dur: .3 }); E.K(x, "o", [[SIP, 1], [SIP + .2, 0]]); E.S(MISS + .1, "nope", .8);

  // ================= the counter =================
  const ctr = E.el(R, "abs", `left:0;top:380px;width:1080px;text-align:center;z-index:8;opacity:0`);
  const chip = E.el(ctr, "", `display:inline-block;padding:12px 30px 14px;border-radius:22px;background:rgba(20,35,29,.9);box-shadow:0 12px 30px rgba(0,0,0,.4);font-weight:800;font-size:52px;color:#fff;font-variant-numeric:tabular-nums`, "");
  E.K(ctr, "o", [[R1 - .2, 0], [R1, 1], [TIRED + 2.4, 1], [TIRED + 2.7, 0]]);
  E.F(t => {
    let s;
    if (t < RESET) { const n = r1.filter(k => t >= k + .1).length; s = `👀 EYE CONTACT <span style="color:${n === 10 ? "#8ee3c8" : GOLD}">${n}/10${n === 10 ? " ✓" : ""}</span>`; }
    else { const n = r2.filter(k => t >= k + .1).length; s = `👀 EYE CONTACT <span style="color:${t >= MISS ? RED : GOLD}">${n}/15${t >= MISS ? " ✗" : ""}</span>`; }
    if (chip.__s !== s) { chip.innerHTML = s; chip.__s = s; }
  });
  E.K(chip, "s", [[DONE1, 1], [DONE1 + .15, 1.2, "out"], [DONE1 + .4, 1], [RESET, 1], [RESET + .15, 1.25, "out"], [RESET + .4, 1], [MISS, 1], [MISS + .15, 1.2, "out"], [MISS + .4, 1]]);
  E.clip(DONE1, "sfx/elx-bar-cheer.wav", { vol: .6, to: 1.6 });
  E.clip(RESET, "sfx/crowd-groan.wav", { vol: .8 }); E.S(RESET, "slam", .6);
  const ff = E.el(R, "abs", `left:840px;top:470px;padding:6px 16px;border-radius:14px;background:${GOLD};color:${INK};font-weight:900;font-size:36px;z-index:8;opacity:0`, "⏩ ×4");
  E.K(ff, "o", [[R2, 0], [R2 + .1, 1], [MISS - .1, 1], [MISS, 0]]);
  E.clip(SIP, "sfx/elx-sip.wav", { vol: .9, to: 1 });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o; const bg = dark ? "#1b2330" : (o.bg || "#fff");
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Wait! Eye contact!<br>Or it’s 7 years of bad luck!", { left: 40, top: 790, w: 640, tail: 110, t0: L1, t1: R1 + .6, bg: GOLD });
  bubble("Sorry I’m late!<br>Did I miss the cheers?", { left: 360, top: 580, w: 560, tail: 420, t0: N1, t1: RESET + .2 });
  bubble("…Seven years it is.", { left: 540, top: 880, w: 520, tail: 320, dark: true, t0: O1, t1: DUR, italic: true, size: 52 });
  E.clip(L1 + .05, "voices/sk29/l1.wav", { vol: 1.5 }); E.clip(N1 + .05, "voices/sk29/n1.wav", { vol: 1.5 }); E.clip(O1 + .05, "voices/sk29/o1.wav", { vol: 1.6 });

  // ================= stamp =================
  const stampBox = E.el(R, "abs", "left:0;top:1600px;width:1080px;display:flex;flex-direction:column;z-index:10");
  const st = E.stamp(stampBox, "BAD LUCK: ACCEPTED.", STAMP, { size: 78, rot: -5, bg: CORAL, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The cheers *eye-contact rule.*", { size: 56, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, R2 - .2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
