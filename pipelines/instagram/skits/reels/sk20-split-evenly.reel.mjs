// SK.20 "Let's just split it evenly." — the table has lobster, steak, three rounds of cocktails and a bottle of champagne.
// Nina had a glass of tap water. The bill: €412. Rico: "Let's just split it evenly, it's easier!" — cheers. Nina, sweetly:
// "Sure. Evenly." Then she raises one finger: "Could I get the entire dessert menu? To go." The waiter arrives with a
// tower of boxes. The bill rolls on: €412 → €689. Rico: "…wait, what?" Stamp: EVENLY.
// Voices: ElevenLabs (Rico: Liam; Nina: Sarah). Table, food, receipt drawn in code.
export const meta = {
  id: "sk20-split-evenly",
  images: { cheer: "cutouts/split_cheer.webp", water: "cutouts/nina_water.webp", order: "cutouts/nina_order.webp", tower: "cutouts/waiter_tower.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const TABLE = .6, BILL = 3.0, R1 = 4.4, CHEER = 6.3, N1 = 7.0, N2 = 9.6, TOWER = 12.8, ROLL = 14.2, R2 = 16.2, STAMP = 17.4, DUR = 20.4;
  E.music({ bpm: 104, root: 55, seed: 20, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: N2 });
  const S = E.scene("dinner", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1480;

  // ================= restaurant =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2a1b17,#3b261f 55%,#221612)");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1300px;opacity:.18;background-image:linear-gradient(0deg,rgba(0,0,0,.9) 3px,transparent 3px),linear-gradient(90deg,rgba(0,0,0,.9) 3px,transparent 3px),linear-gradient(90deg,rgba(0,0,0,.9) 3px,transparent 3px);background-size:100% 52px,120px 104px,120px 104px;background-position:0 0,0 0,60px 52px;background-color:#8a4a34");
  // string lights and bokeh
  const bulbs = []; for (let i = 0; i < 12; i++) bulbs.push(E.el(R, "abs", `left:${40 + i * 90}px;top:${420 + Math.sin(i / 11 * Math.PI) * 50}px;width:22px;height:28px;border-radius:50%;background:#ffe28a;box-shadow:0 0 22px #ffd35c`));
  E.el(R, "abs", "left:0;top:400px;width:1080px;height:80px;border-bottom:3px solid #5b4a3a;border-radius:0 0 50% 50%;opacity:.6");
  E.F(t => bulbs.forEach((b, i) => { b.style.opacity = .6 + .4 * Math.abs(Math.sin(t * 1.8 + i)); }));
  // the four friends across the table (left/centre), Nina on the right
  const CW = 1000, CH = 515 * CW / 1024;
  const cheer = E.el(R, "abs", `left:-150px;top:${TOP + 40 - CH}px;width:${CW}px;height:${CH}px;transform-origin:50% 100%`);
  E.img(cheer, "cheer", `width:${CW}px;height:${CH}px`);
  E.F(t => { const u = t >= CHEER && t < CHEER + .8 ? Math.abs(Math.sin((t - CHEER) * 12)) : 0; cheer.style.transform = `translateY(${-u * 16 + Math.sin(t * 2) * 3}px)`; cheer.style.filter = t >= R2 ? "saturate(.6) brightness(.85)" : "none"; });
  const NIN = { water: [768, 1137], order: [846, 1164] };
  const nina = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px");
  const nEls = Object.entries(NIN).map(([n, [w, h]]) => { const H = 780, W = w * H / h; return [n, E.img(nina, n, `position:absolute;left:${900 - W / 2}px;top:${TOP + 60 - H}px;width:${W}px;height:${H}px`)]; });
  E.F(t => { const f = at([[0, "water"], [N2 - .1, "order"]], t); nEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; }); nina.style.transform = `translateY(${Math.sin(t * 2.2 + 1) * 3}px)`; });
  // halo of calm around Nina
  const halo = E.el(R, "abs", `left:760px;top:${TOP - 700}px;width:340px;height:340px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,240,190,.35),transparent);opacity:0`);
  E.K(halo, "o", [[N1, 0], [N1 + .3, 1]]);

  // ================= the table: their feast vs her water =================
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;background:linear-gradient(180deg,#fbf7ee,#e6dcc6);z-index:3`);
  const feast = E.el(R, "abs", `left:0;top:${TOP - 90}px;width:1080px;height:200px;z-index:4`);
  feast.innerHTML = `<svg viewBox="0 0 1080 200" width="1080" height="200">
    <ellipse cx="160" cy="170" rx="130" ry="24" fill="#fff" stroke="#ddd" stroke-width="3"/>
    <path d="M80 160 Q100 110 160 104 Q230 100 250 150 Q200 170 160 168 Q110 170 80 160 Z" fill="#e2573a"/>
    ${[0, 1, 2, 3].map(i => `<path d="M${110 + i * 24} 116 q-18 -26 -6 -46" stroke="#c8402a" stroke-width="7" fill="none" stroke-linecap="round"/>`).join("")}
    <path d="M235 140 q40 -30 58 -10 q-20 10 -40 20" fill="#e2573a"/><circle cx="130" cy="130" r="6" fill="#1a1a1a"/>
    <ellipse cx="430" cy="172" rx="110" ry="22" fill="#fff" stroke="#ddd" stroke-width="3"/><path d="M360 164 Q380 120 440 122 Q500 124 500 162 Z" fill="#7a3b20"/><path d="M380 150 L480 132 M384 158 L486 142" stroke="#4e2412" stroke-width="5"/>
    <circle cx="470" cy="160" r="12" fill="#6fa83f"/><circle cx="392" cy="162" r="10" fill="#f2c14e"/>
    <rect x="560" y="20" width="44" height="150" rx="12" fill="#1f3a24"/><rect x="570" y="0" width="24" height="30" rx="4" fill="#c9a24a"/><rect x="566" y="80" width="32" height="40" fill="#f2e6c2"/>
    ${[[640, "#e9a23b"], [690, "#c0283a"], [735, "#8fd0f5"]].map(([x, c]) => `<path d="M${x} 110 Q${x + 20} 150 ${x + 40} 110 Z" fill="${c}"/><rect x="${x + 18}" y="148" width="4" height="22" fill="#ccc"/><ellipse cx="${x + 20}" cy="172" rx="16" ry="4" fill="#ccc"/>`).join("")}
    <rect x="880" y="90" width="60" height="82" rx="6" fill="rgba(200,230,250,.55)" stroke="#fff" stroke-width="3"/><rect x="884" y="120" width="52" height="48" rx="4" fill="rgba(170,215,245,.6)"/>
  </svg>`;
  E.K(feast, "o", [[TABLE, 0], [TABLE + .3, 1]]);
  // labels on the table
  const lab = (txt, x, y, t0) => { const l = E.el(R, "abs", `left:${x}px;top:${y}px;padding:6px 14px 8px;border-radius:10px;background:rgba(20,35,29,.85);color:#fff;font-weight:800;font-size:26px;white-space:nowrap;opacity:0;z-index:6`, txt); E.K(l, "o", [[t0, 0], [t0 + .15, 1], [N2, 1], [N2 + .2, 0]]); E.S(t0, "tick", .5); };
  lab("LOBSTER €68", 70, TOP + 130, 1.0); lab("WAGYU €74", 360, TOP + 130, 1.3); lab("CHAMPAGNE €120", 520, TOP + 190, 1.6); lab("TAP WATER €0", 820, TOP + 130, 2.1);

  // ================= the bill =================
  const bill = E.el(R, "abs", `left:260px;top:560px;width:560px;border-radius:16px;background:#fffdf6;box-shadow:0 26px 50px rgba(0,0,0,.5);padding:24px 32px 26px;z-index:7;opacity:0`);
  const bTotal = E.el(bill, "", `font-weight:800;font-size:92px;color:${INK};text-align:center;font-variant-numeric:tabular-nums;letter-spacing:-.02em`, "€412");
  E.el(bill, "", "font-family:Inter;font-size:26px;color:#777;text-align:center;margin-top:4px", "TOTAL · 5 PEOPLE");
  const bEach = E.el(bill, "", `font-weight:800;font-size:40px;color:${CORAL};text-align:center;margin-top:10px;font-variant-numeric:tabular-nums`, "");
  E.K(bill, "o", [[BILL, 0], [BILL + .2, 1], [R1 + 1.6, 1], [R1 + 1.8, 0], [ROLL - .2, 0], [ROLL, 1]]);
  E.K(bill, "y", [[BILL, -60], [BILL + .35, 0, "back"], [ROLL - .2, -60], [ROLL + .2, 0, "back"]]);
  E.F(t => {
    const total = t < ROLL ? 412 : Math.round(412 + 277 * seg(t, ROLL + .2, 1.4));
    const s = `€${total}`; if (bTotal.textContent !== s) bTotal.textContent = s;
    const e = t >= R1 + .3 ? `€${(total / 5).toFixed(2)} EACH` : ""; if (bEach.textContent !== e) bEach.textContent = e;
    bTotal.style.color = total > 412 ? CORAL : INK;
  });
  E.clip(BILL, "sfx/elx-register.wav", { vol: .6, to: 1 });
  for (let t = ROLL + .2; t < ROLL + 1.6; t += .1) E.S(t, "tick", .35);
  E.clip(ROLL + 1.6, "sfx/elx-chaching.wav", { vol: 1 });

  // ================= the dessert tower =================
  const WH = 1100, WW = 365 * WH / 1004;
  const w = E.el(R, "abs", `left:${1080 - WW + 40}px;top:${TOP + 300 - WH}px;width:${WW}px;height:${WH}px;z-index:6;opacity:0`);
  E.img(w, "tower", `width:${WW}px;height:${WH}px`);
  E.K(w, "o", [[TOWER, 0], [TOWER + .05, 1], [R2 - .3, 1], [R2, 0]]); E.K(w, "x", [[TOWER, 500], [TOWER + .7, 0, "out"]]);
  E.F(t => { w.style.transform = (w.style.transform || "").replace(/ rotate\([^)]*\)/, "") + ` rotate(${t >= TOWER && t < R2 ? Math.sin(t * 5) * 3 : 0}deg)`; });
  E.clip(TOWER + .7, "sfx/elx-dessert-crash.wav", { vol: 1 });
  const boxes = E.el(R, "abs", `left:720px;top:${TOP - 330}px;width:320px;height:340px;z-index:5;opacity:0`);
  boxes.innerHTML = `<svg viewBox="0 0 320 340" width="320" height="340">${Array.from({ length: 7 }, (_, i) => `<rect x="${40 + (i % 2) * 20}" y="${300 - i * 44}" width="${240 - (i % 3) * 20}" height="40" rx="4" fill="${i % 2 ? "#fff" : "#f4e8f0"}" stroke="#d6c6cf" stroke-width="3"/><path d="M${150 + (i % 2) * 20} ${300 - i * 44} v40" stroke="#e25b8a" stroke-width="4"/>`).join("")}</svg>`;
  E.K(boxes, "o", [[R2 - .3, 0], [R2, 1]]);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 58, bg = "#fff", fg = INK, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.06;letter-spacing:-.02em;color:${fg};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  bubble("Let's just split it<br>evenly, it's easier!", { left: 60, top: 900, w: 600, tail: 360, t0: R1, t1: N1 - .1, size: 54, bg: GOLD });
  bubble("Sure. Evenly.", { left: 560, top: 620, w: 440, tail: 360, t0: N1, t1: N2 - .1, size: 58 });
  bubble("Could I get the entire<br>dessert menu? To go.", { left: 360, top: 560, w: 640, tail: 520, t0: N2, t1: TOWER, size: 52 });
  bubble("…wait, what?", { left: 120, top: 900, w: 420, tail: 300, t0: R2, t1: DUR, size: 58, italic: true });
  E.clip(R1 + .05, "voices/sk20/r1.wav", { vol: 1.4 }); E.clip(N1 + .05, "voices/sk20/n1.wav", { vol: 1.5 });
  E.clip(N2 + .05, "voices/sk20/n2.wav", { vol: 1.5 }); E.clip(R2 + .05, "voices/sk20/r2.wav", { vol: 1.4 });
  E.clip(CHEER, "sfx/applause-cheer.wav", { vol: .5, to: 1.2 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-restaurant.wav", { vol: .3, to: Math.min(6, DUR - t), duck: false });
  const stampBox = E.el(R, "abs", "left:100px;top:380px;width:880px;display:flex;justify-content:center;z-index:10");
  const st = E.stamp(stampBox, "EVENLY.", STAMP, { size: 130, rot: -5, bg: CORAL, fg: INK, shake: 12 }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Splitting the *bill.*", { size: 70, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, STAMP - .2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
