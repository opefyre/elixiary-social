// SK.13 "The boss's toast." — office party. Everyone raises a glass; the boss says "Before we toast… just a few words." The
// projector wakes up: Q1 REVIEW, Q2, CORE VALUES 1/47… GLASSES RAISED: 0:05 → 23:10. Arms tremble, the balloon deflates, the
// sun sets outside, someone falls asleep. "And… one more thing." Groan. Finally: "Cheers!" — every glass is already empty.
// SPEECH: 23 MINUTES.  Voice: ElevenLabs (Bill, pompous). Office, projector slides, chart, balloon, window all drawn in code.
export const meta = {
  id: "sk13-the-toast",
  images: { boss: "cutouts/boss_speech.webp", raised: "cutouts/crew_raised.webp", strain: "cutouts/crew_strain.webp", empty: "cutouts/crew_empty.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", BLUE = "#2f6db5";
  E.episode(-16);
  E.music({ bpm: 90, root: 57, seed: 71, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]], until: 1.0 });
  const B1 = .6, B2 = 4.2, STRAIN = 7.2, B3 = 7.8, LATER = 10.6, B4 = 13.0, B5 = 15.8, EMPTY = 16.1, STAMP = 16.9, DUR = 20.0;
  const S = E.scene("office", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const lerp = (a, b, u) => a + (b - a) * u;
  // speech minutes elapsed, for the timer, the window and the clock
  const mins = t => t < B2 ? t * .05 : t < LATER ? .2 + (t - B2) / (LATER - B2) * 8 : t < B4 ? 8.2 + (t - LATER) / (B4 - LATER) * 13 : 21.2 + Math.min(t - B4, 3) * .65;

  // ================= office =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#e8eaee,#dfe2e7)");
  E.el(R, "abs", "left:0;top:1560px;width:1080px;height:360px;background:#7d8591;background-image:radial-gradient(circle,rgba(0,0,0,.08) 2px,transparent 2.5px);background-size:14px 14px");   // carpet tiles
  E.el(R, "abs", "left:0;top:1548px;width:1080px;height:14px;background:#c5cad2");
  // window with skyline (right): the sun goes down during the speech
  const win = E.el(R, "abs", "left:600px;top:470px;width:440px;height:430px;border-radius:6px;overflow:hidden;box-shadow:0 0 0 12px #f6f7f9,0 12px 24px rgba(0,0,0,.12)");
  const sky = E.el(win, "abs", "left:0;top:0;width:440px;height:430px");
  const sun = E.el(win, "abs", "left:280px;top:60px;width:90px;height:90px;border-radius:50%;background:radial-gradient(circle,#fff3c4 0 45%,#ffc36b 62%,rgba(255,160,90,0) 72%)");
  const city = E.el(win, "abs", "left:0;top:200px;width:440px;height:230px");
  city.innerHTML = `<svg viewBox="0 0 440 230" width="440" height="230">${[[0, 90, 70], [60, 40, 60], [120, 110, 80], [190, 20, 70], [255, 70, 90], [335, 50, 105]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${230 - y}" fill="#8793a6"/>` +
    Array.from({ length: 12 }, (_, k) => `<rect class="wl" x="${x + 8 + (k % 3) * (w / 3.3)}" y="${y + 14 + Math.floor(k / 3) * 34}" width="12" height="16" fill="#ffd98a" opacity="0"/>`).join("")).join("")}</svg>`;
  const wl = [...city.querySelectorAll(".wl")];
  [[0, 214, 440, 12], [214, 0, 12, 430]].forEach(([x, y, w, h]) => E.el(win, "abs", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:#f6f7f9`));
  E.F(t => {
    const u = clamp(mins(t) / 23, 0, 1);
    sky.style.background = `linear-gradient(180deg,rgb(${lerp(140, 30, u)},${lerp(195, 40, u)},${lerp(240, 90, u)}),rgb(${lerp(215, 240, u)},${lerp(235, 130, u)},${lerp(250, 110, u)}))`;
    sun.style.transform = `translateY(${u * 320}px)`; city.querySelector("svg").style.filter = `brightness(${1 - u * .55})`;
    wl.forEach((w, i) => w.setAttribute("opacity", String(u > .45 + (i % 7) * .06 ? .95 : 0)));
  });
  // wall clock
  const clk = E.el(R, "abs", "left:880px;top:330px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,#fff 0 64%,#3a3f48 65%)");
  clk.innerHTML = `<svg viewBox="0 0 120 120" width="120" height="120"><g class="h" style="transform-box:view-box;transform-origin:0 0"><line x1="60" y1="60" x2="60" y2="36" stroke="#222" stroke-width="6" stroke-linecap="round"/></g><g class="m" style="transform-box:view-box;transform-origin:0 0"><line x1="60" y1="60" x2="60" y2="22" stroke="#222" stroke-width="4" stroke-linecap="round"/></g><circle cx="60" cy="60" r="5" fill="${CORAL}"/></svg>`;
  const [ch, cm] = ["h", "m"].map(c => clk.querySelector("." + c));
  E.F(t => { const m = 30 + mins(t) * 6; cm.setAttribute("transform", `rotate(${m * 6} 60 60)`); ch.setAttribute("transform", `rotate(${(17 + m / 60) * 30} 60 60)`); });
  // bunting "HAPPY Q3!" across the top
  const bunt = E.el(R, "abs", "left:40px;top:360px;width:800px;height:110px");
  bunt.innerHTML = `<svg viewBox="0 0 800 110" width="800" height="110"><path d="M0 10 Q400 70 800 10" stroke="#555" stroke-width="3" fill="none"/>${"HAPPY Q3!".split("").map((ch2, i) => { const x = 40 + i * 84, y = 10 + Math.sin((i + .5) / 9 * Math.PI) * 50; return `<path d="M${x} ${y} h56 l-28 52 z" fill="${[CORAL, GOLD, BLUE, "#39d98a"][i % 4]}"/><text x="${x + 28}" y="${y + 28}" text-anchor="middle" font-family="Noto Sans" font-weight="800" font-size="24" fill="#fff">${ch2 === " " ? "" : ch2}</text>`; }).join("")}</svg>`;

  // projector screen (left) with slides
  const scr = E.el(R, "abs", "left:60px;top:500px;width:500px;height:360px;background:#fbfbfb;box-shadow:0 0 0 8px #d5d9df,0 12px 24px rgba(0,0,0,.14);overflow:hidden");
  E.el(R, "abs", "left:40px;top:480px;width:540px;height:22px;border-radius:11px;background:#3a3f48");
  const slide = E.el(scr, "abs", "left:0;top:0;width:500px;height:360px;opacity:0");
  const sTitle = E.el(slide, "abs", `left:30px;top:24px;font-weight:800;font-size:40px;color:${INK}`, "");
  const sBody = E.el(slide, "abs", "left:30px;top:90px;width:440px;height:250px");
  const chart = `<svg viewBox="0 0 440 250" width="440" height="250">${[60, 110, 80, 150, 190].map((h, i) => `<rect x="${20 + i * 84}" y="${230 - h}" width="56" height="${h}" rx="6" fill="${[BLUE, "#39d98a", GOLD, CORAL, BLUE][i]}"/>`).join("")}<path d="M20 232 H430" stroke="#999" stroke-width="3"/><path d="M40 200 L130 130 L220 160 L300 90 L400 50" stroke="${INK}" stroke-width="5" fill="none"/></svg>`;
  const bullets = n => `<div style="font-family:Inter;font-size:26px;line-height:1.55;color:#333">${["Synergy", "Ownership", "Bold humility", "Proactive listening", "Circle back", "Move the needle"].slice(n % 3, n % 3 + 4).map(b => `• ${b}`).join("<br>")}</div>`;
  const SLIDES = [[B2 + .3, "Q1 REVIEW", chart], [B2 + 1.8, "Q2 REVIEW", chart], [B3 + .4, "CORE VALUES 1/47", bullets(0)], [LATER, "CORE VALUES 12/47", bullets(1)],
    [LATER + .8, "CORE VALUES 31/47", bullets(2)], [LATER + 1.5, "CORE VALUES 47/47", bullets(0)], [B4 + .2, "ONE MORE THING", `<div style="font-size:120px;text-align:center;margin-top:10px">🙂</div>`]];
  E.K(slide, "o", [[B2 + .2, 0], [B2 + .35, 1]]);
  let last = -1;
  E.F(t => { let k = -1; SLIDES.forEach(([s], i) => { if (t >= s) k = i; }); if (k !== last && k >= 0) { sTitle.textContent = SLIDES[k][1]; sBody.innerHTML = SLIDES[k][2]; last = k; } });
  SLIDES.forEach(([s]) => E.S(s, "tick", .45));
  const beam = E.el(R, "abs", "left:60px;top:500px;width:500px;height:360px;background:linear-gradient(115deg,rgba(255,255,255,.18),transparent 40%);pointer-events:none");

  // snack table and a balloon that slowly deflates
  const snacks = E.el(R, "abs", "left:520px;top:1320px;width:520px;height:240px");
  snacks.innerHTML = `<svg viewBox="0 0 520 240" width="520" height="240"><rect x="0" y="60" width="520" height="20" rx="4" fill="#f4f4f4"/><rect x="0" y="80" width="520" height="160" fill="#e9e9e9"/>` +
    `<ellipse cx="90" cy="54" rx="60" ry="16" fill="#e0c060"/><ellipse cx="90" cy="46" rx="44" ry="12" fill="#f2c14e"/><ellipse cx="250" cy="54" rx="56" ry="14" fill="#fff"/><path d="M210 50 Q250 10 290 50" fill="#f59ac0"/>` +
    `<rect x="380" y="10" width="40" height="50" rx="6" fill="#39d98a"/><rect x="430" y="0" width="40" height="60" rx="6" fill="${CORAL}"/></svg>`;
  const bal = E.el(R, "abs", "left:980px;top:700px;width:90px;height:700px;transform-origin:50% 100%");
  bal.innerHTML = `<svg viewBox="0 0 90 700" width="90" height="700"><path d="M45 110 Q30 300 50 480 Q60 600 45 700" stroke="#888" stroke-width="2" fill="none"/><ellipse class="b" cx="45" cy="55" rx="42" ry="52" fill="${CORAL}"/><path d="M40 106 L45 114 L50 106 Z" fill="${CORAL}"/><ellipse cx="30" cy="36" rx="10" ry="16" fill="#fff" opacity=".45"/></svg>`;
  const bb = bal.querySelector(".b");
  E.F(t => { const u = seg(t, STRAIN, B5 - STRAIN); bb.setAttribute("rx", String(42 - u * 18)); bb.setAttribute("ry", String(52 - u * 24)); bal.style.transform = `translateY(${u * 520}px) rotate(${Math.sin(t * 1.3) * 3}deg)`; });

  // ================= the people =================
  const BH = 780, BW = 666 * BH / 1001;
  const boss = E.el(R, "abs", `left:${250 - BW / 2}px;top:${1740 - BH}px;width:${BW}px;height:${BH}px;z-index:3;transform-origin:50% 100%`);
  E.img(boss, "boss", `width:${BW}px;height:${BH}px`);
  E.F(t => { let r = Math.sin(t * 3.1) * 1.4, y = Math.sin(t * 6.2) * 3; if (t >= B5 && t < B5 + .3) y = -Math.sin((t - B5) / .3 * Math.PI) * 26; boss.style.transform = `translateY(${y}px) rotate(${r}deg)`; });
  const CREW = { raised: [954, 665], strain: [966, 674], empty: [952, 668] };
  const crew = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:2");
  const CH = 540;
  const cEls = Object.entries(CREW).map(([n, [w, h]]) => { const W = w * CH / h; return [n, E.img(crew, n, `position:absolute;left:${1060 - W}px;top:${1580 - CH}px;width:${W}px;height:${CH}px`)]; });
  const CP = [[0, "raised"], [STRAIN, "strain"], [EMPTY, "empty"]];
  E.F(t => {
    const f = at(CP, t); cEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    let dx = 0, dy = 0;
    if (t >= STRAIN && t < EMPTY) { dx = Math.sin(t * 38) * 2.5 * seg(t, STRAIN, 5); dy = seg(t, STRAIN, 8) * 18; }                 // trembling, sagging
    for (const [k] of CP.slice(1)) if (t >= k && t < k + .22) dy -= Math.sin((t - k) / .22 * Math.PI) * 14;
    crew.style.transform = `translate(${dx}px,${dy}px)`;
  });
  // Zzz over the sleeper at the end, a sweat drop earlier
  const zz = E.el(R, "abs", "left:600px;top:960px;font-weight:800;font-size:54px;color:#7b7fc4;z-index:6;opacity:0", "Z<span style='font-size:40px'>z</span><span style='font-size:30px'>z</span>");
  E.K(zz, "o", [[EMPTY + .2, 0], [EMPTY + .5, 1]]); E.F(t => { zz.style.transform = `translate(${Math.sin(t * 2) * 8}px,${-((t * 20) % 40)}px)`; });
  E.clip(EMPTY + .3, "sfx/elx-snore.wav", { vol: .7 }); E.clip(LATER + .6, "sfx/elx-yawn.wav", { vol: .5 });

  // ================= timer pill =================
  const pill = E.el(R, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:48px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;font-variant-numeric:tabular-nums;transform-origin:0 50%`, "GLASSES RAISED: 0:00");
  E.K(pill, "o", [[B1 + 2.6, 0], [B1 + 2.8, 1]]);
  E.F(t => { const m = t >= STAMP ? 23.17 : Math.min(23.17, mins(t)); const s = `GLASSES RAISED: ${Math.floor(m)}:${String(Math.floor((m % 1) * 60)).padStart(2, "0")}`; if (pill.textContent !== s) pill.textContent = s; pill.style.background = m > 8 ? CORAL : INK; pill.style.color = m > 8 ? INK : "#fff"; });
  const later = E.el(R, "abs", `left:0;top:1640px;width:1080px;text-align:center;z-index:7;opacity:0`, `<span style="display:inline-block;padding:10px 26px 12px;border-radius:14px;background:rgba(20,35,29,.85);color:#fff;font-weight:700;font-style:italic;font-size:40px">…14 minutes later…</span>`);
  E.K(later, "o", [[LATER + .1, 0], [LATER + .3, 1], [B4 - .4, 1], [B4 - .2, 0]]);
  for (let t = LATER; t < B4 - .3; t += .18) E.S(t, "tick", .18);

  const oops = E.el(R, "abs", `left:0;top:1640px;width:1080px;text-align:center;z-index:7;opacity:0`, `<span style="display:inline-block;padding:10px 26px 12px;border-radius:14px;background:rgba(20,35,29,.88);color:#fff;font-weight:700;font-style:italic;font-size:40px">…they finished theirs 20 minutes ago.</span>`);
  E.K(oops, "o", [[EMPTY + .5, 0], [EMPTY + .7, 1]]);
  // ================= bubbles & sound =================
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 54, bg = "#fff", fg = INK } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.25);font-weight:800;font-size:${size}px;line-height:1.06;letter-spacing:-.02em;color:${fg};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  const BB = { left: 250, top: 880, w: 560, tail: 110 };
  bubble("Before we toast…<br>just a few words.", { ...BB, t0: B1, t1: B2 - .2 });
  bubble("Now, Q1.<br>What a journey.", { ...BB, t0: B2, t1: B3 - .1 });
  bubble("Which brings me to<br>our core values.", { ...BB, t0: B3, t1: LATER - .05 });
  bubble("And… one<br>more thing.", { ...BB, t0: B4, t1: B5 - .1 });
  bubble("CHEERS!", { ...BB, w: 380, t0: B5, t1: DUR, size: 72, bg: GOLD });
  [[B1, "b1"], [B2, "b2"], [B3, "b3"], [B4, "b4"], [B5, "b5"]].forEach(([t, n]) => E.clip(t + .05, `voices/sk13/${n}.wav`, { vol: 1.4 }));
  for (let t = 0; t < DUR; t += 5) E.clip(t, "sfx/elx-office-murmur.wav", { vol: t < 5 ? .5 : .3, from: 1, to: 6, duck: false });
  E.clip(B4 + 1.9, "sfx/crowd-groan.wav", { vol: .7 });
  E.clip(EMPTY - .05, "sfx/record-silence.wav", { vol: .7 });
  const stampBox = E.el(R, "abs", "left:100px;top:360px;width:880px;display:flex;justify-content:center;z-index:9");
  const st = E.stamp(stampBox, "SPEECH: 23 MINUTES.", STAMP, { size: 64, css: "white-space:nowrap", rot: -5, bg: CORAL, fg: INK, shake: 10 }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The boss's *toast.*", { size: 72, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, B1 + 2.5, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
