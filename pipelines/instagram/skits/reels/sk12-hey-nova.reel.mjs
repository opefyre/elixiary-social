// SK.12 "Asking the smart speaker for a recipe." — "Hey Nova, how do I make a margarita?" — it plays a party track. "No! The
// recipe!" — "Adding forty limes to your basket." BASKET: 0 → 40 LIMES. "Cancel! Cancel!" — "Order placed. Arriving… now."
// The doorbell; the door bursts open and an avalanche of limes buries him. "Would you like the recipe?" — "…yes."
// Voices: ElevenLabs (him: Alex; Nova: Alice, flat). The speaker, its light ring, the room and every lime are drawn in code.
export const meta = {
  id: "sk12-hey-nova",
  images: { relax: "cutouts/nova_guy.webp", argue: "cutouts/nova_argue.webp", panic: "cutouts/nova_panic.webp", buried: "cutouts/nova_buried.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", NOVA = "#5ad1ff";
  E.episode(-16);
  const H1 = .6, N1 = 2.7, H2 = 6.8, N2 = 9.9, H3 = 12.5, N3 = 14.6, NOW = 16.7, N4 = 18.5, H4 = 19.9, STAMP = 20.5, DUR = 22.4;
  E.music({ bpm: 88, root: 55, seed: 5, prog: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], until: N1 + .3 });
  const S = E.scene("lounge", 0, DUR, "light"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const FLOOR = 1540;
  const party = t => t >= N1 + .3 && t < H2;                                  // the wrong song is playing

  // ================= living room at dusk =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#d9dde3,#c9ced6)");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1540px;opacity:.35;background:repeating-linear-gradient(90deg,rgba(255,255,255,.5) 0 2px,transparent 2px 120px)");
  const win = E.el(R, "abs", "left:70px;top:420px;width:460px;height:420px;border-radius:12px;overflow:hidden;box-shadow:0 0 0 14px #f4f5f7,0 16px 30px rgba(0,0,0,.18)");
  win.innerHTML = `<svg viewBox="0 0 460 420" width="460" height="420"><defs><linearGradient id="dk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4d8f"/><stop offset=".6" stop-color="#e98a6b"/><stop offset="1" stop-color="#ffc98a"/></linearGradient></defs><rect width="460" height="420" fill="url(#dk)"/>` +
    `<path d="M0 300 H50 V230 H110 V270 H160 V200 H230 V280 H280 V240 H340 V290 H400 V250 H460 V420 H0 Z" fill="#2b2a44"/>` +
    [[70, 250], [130, 290], [180, 230], [200, 300], [300, 260], [360, 310], [420, 280]].map(([x, y]) => `<rect x="${x}" y="${y}" width="14" height="18" fill="#ffd98a"/>`).join("") + `</svg>`;
  E.el(win, "abs", "left:224px;top:0;width:12px;height:420px;background:#f4f5f7");
  // floor lamp, a framed poster, a TV on a sideboard (off)
  const lamp = E.el(R, "abs", "left:10px;top:860px;width:120px;height:690px");
  lamp.innerHTML = `<svg viewBox="0 0 120 690" width="120" height="690"><path d="M16 0 H104 L90 100 H30 Z" fill="#f6e3b8"/><rect x="56" y="100" width="8" height="570" fill="#333"/><ellipse cx="60" cy="676" rx="46" ry="10" fill="#333"/></svg>`;
  E.el(R, "abs", "left:-120px;top:700px;width:520px;height:520px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,214,140,.4),transparent)");
  // the front door (right)
  const doorWrap = E.el(R, "abs", `left:840px;top:${FLOOR - 820}px;width:240px;height:820px;background:#3a3f48;overflow:hidden`);
  const door = E.el(doorWrap, "abs", "left:0;top:0;width:240px;height:820px;background:#2f5d8a;box-shadow:inset 0 0 0 14px #264d73;transform-origin:100% 50%");
  [[40, 60, 160, 320], [40, 430, 160, 330]].forEach(([x, y, w, h]) => E.el(door, "abs", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:6px;box-shadow:inset 0 0 0 6px #264d73`));
  E.el(door, "abs", "left:26px;top:410px;width:20px;height:56px;border-radius:10px;background:linear-gradient(90deg,#b8893a,#f2d27a,#b8893a)");
  E.el(R, "abs", `left:820px;top:${FLOOR - 840}px;width:24px;height:840px;background:#f4f5f7`);
  E.el(R, "abs", `left:0;top:${FLOOR}px;width:1080px;height:${1920 - FLOOR}px;background:#a8835e;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.12) 0 3px,transparent 3px 150px)`);
  E.el(R, "abs", `left:120px;top:${FLOOR + 50}px;width:640px;height:150px;border-radius:50%;background:radial-gradient(ellipse,#5b6b7c 0 55%,#4a5968 56% 62%,transparent 63%)`);
  // sofa
  const sofa = E.el(R, "abs", `left:40px;top:${FLOOR - 420}px;width:640px;height:420px`);
  sofa.innerHTML = `<svg viewBox="0 0 640 420" width="640" height="420"><rect x="20" y="0" width="600" height="240" rx="46" fill="#6f7f8f"/><rect x="0" y="150" width="100" height="240" rx="40" fill="#5f6f7f"/><rect x="540" y="150" width="100" height="240" rx="40" fill="#5f6f7f"/>` +
    `<rect x="70" y="220" width="500" height="160" rx="28" fill="#7d8d9d"/><rect x="60" y="380" width="18" height="40" fill="#333"/><rect x="562" y="380" width="18" height="40" fill="#333"/><rect x="420" y="120" width="120" height="100" rx="26" fill="#f2c14e"/></svg>`;
  // side table with Nova
  const tbl = E.el(R, "abs", `left:690px;top:${FLOOR - 300}px;width:140px;height:300px`);
  tbl.innerHTML = `<svg viewBox="0 0 140 300" width="140" height="300"><ellipse cx="70" cy="16" rx="70" ry="14" fill="#8a5a33"/><rect x="62" y="20" width="16" height="260" fill="#6d4526"/><ellipse cx="70" cy="288" rx="46" ry="10" fill="#6d4526"/></svg>`;
  const spk = E.el(R, "abs", `left:710px;top:${FLOOR - 470}px;width:100px;height:170px`);
  spk.innerHTML = `<svg viewBox="0 0 100 170" width="100" height="170"><defs><linearGradient id="fab" x1="0" x2="1"><stop offset="0" stop-color="#2a2d33"/><stop offset=".4" stop-color="#4a4f58"/><stop offset="1" stop-color="#23262b"/></linearGradient></defs>` +
    `<rect x="4" y="16" width="92" height="150" rx="30" fill="url(#fab)"/>${Array.from({ length: 9 }, (_, i) => `<line x1="14" y1="${50 + i * 12}" x2="86" y2="${50 + i * 12}" stroke="#1b1d21" stroke-width="3"/>`).join("")}` +
    `<ellipse cx="50" cy="18" rx="46" ry="12" fill="#1b1d21"/><ellipse class="ring" cx="50" cy="18" rx="40" ry="9" fill="none" stroke="${NOVA}" stroke-width="6" opacity=".2"/></svg>`;
  const ring = spk.querySelector(".ring");
  const glow = E.el(R, "abs", `left:640px;top:${FLOOR - 540}px;width:240px;height:160px;border-radius:50%;background:radial-gradient(closest-side,rgba(90,209,255,.55),transparent);opacity:0`);
  // when Nova listens: the ring spins; when she speaks: it pulses; while the party track plays: rainbow
  const talk = [[N1, 3.66], [N2, 2.35], [N3, 2.4], [N4, 1.15]];
  const listen = [[H1 + 1.8, .7], [H2 + .2, 2.8], [H3 + .2, 1.9], [H4 - .1, .8]];
  E.F(t => {
    const sp = talk.find(([a, d]) => t >= a && t < a + d), li = listen.find(([a, d]) => t >= a && t < a + d);
    let o = .2, col = NOVA, g = 0;
    if (party(t)) { o = 1; col = `hsl(${(t * 240) % 360},90%,60%)`; g = .9; }
    else if (sp) { o = .6 + .4 * Math.abs(Math.sin(t * 13)); g = o; }
    else if (li) { o = .5 + .5 * Math.abs(Math.sin(t * 6)); g = .4; }
    ring.setAttribute("opacity", String(o)); ring.setAttribute("stroke", col); glow.style.opacity = g;
    glow.style.background = `radial-gradient(closest-side,${party(t) ? `hsla(${(t * 240) % 360},90%,60%,.55)` : "rgba(90,209,255,.55)"},transparent)`;
  });
  // the party track: disco dots over the room, music notes from the speaker
  const disco = [];
  for (let i = 0; i < 24; i++) disco.push(E.el(R, "abs", `left:0;top:0;width:${24 + (i % 3) * 10}px;height:${24 + (i % 3) * 10}px;border-radius:50%;background:hsl(${i * 37},90%,65%);opacity:0;mix-blend-mode:screen`));
  const notes = [];
  for (let i = 0; i < 6; i++) { const n = E.el(R, "abs", `left:740px;top:${FLOOR - 500}px;font-size:54px;color:${["#ff6b8a", NOVA, GOLD][i % 3]};opacity:0`, i % 2 ? "♪" : "♫"); notes.push(n); }
  E.F(t => {
    const on = party(t);
    disco.forEach((d, i) => { d.style.opacity = on ? .55 : 0; d.style.transform = `translate(${(i * 181 + t * 160) % 1080}px,${300 + (i * 97 + t * 60) % 1200}px)`; });
    notes.forEach((n, i) => { const u = ((t * .8 + i / 6) % 1); n.style.opacity = on ? 1 - u : 0; n.style.transform = `translate(${Math.sin(u * 6 + i) * 60 - 20}px,${-u * 300}px)`; });
  });
  for (let t = N1 + .3; t < H2 - .1; t += 4) E.clip(t, "sfx/elx-party-music.wav", { vol: .3, to: Math.min(4, H2 - t), duck: false });
  E.clip(H2 - .02, "sfx/record-silence.wav", { vol: .7 });

  // ================= him =================
  const HIM = { relax: [685, 970, 820], argue: [616, 1000, 800], panic: [596, 993, 820] };
  const him = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px");
  const hEls = Object.entries(HIM).map(([n, [w, h, H]]) => { const W = w * H / h; return [n, E.img(him, n, `position:absolute;left:${360 - W / 2}px;top:${FLOOR + 30 - H}px;width:${W}px;height:${H}px`)]; });
  const HP = [[0, "relax"], [H2 - .1, "argue"], [H3 - .1, "panic"]];
  E.F(t => {
    const f = at(HP, t); hEls.forEach(([n, el]) => { el.style.opacity = n === f && t < N4 - .1 ? 1 : 0; });
    let dy = Math.sin(t * 2) * 4, dx = 0;
    if (party(t)) dy = -Math.abs(Math.sin(t * 9)) * 10;                                                 // he can't help bopping
    if (t >= H3 && t < N4) dx = Math.sin(t * 40) * (t > NOW + .5 ? 10 : 5);
    for (const [k] of HP.slice(1)) if (t >= k && t < k + .22) dy = -Math.sin((t - k) / .22 * Math.PI) * 16;
    him.style.transform = `translate(${dx}px,${dy}px)`;
  });

  // ================= basket counter =================
  const pill = E.el(R, "abs", `left:100px;top:258px;display:inline-flex;align-items:center;gap:14px;background:${INK};color:#fff;font-weight:800;font-size:50px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;transform-origin:0 50%`);
  pill.innerHTML = `<svg viewBox="0 0 40 40" width="44" height="44"><path d="M4 10 H10 L15 28 H32 L36 14 H12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"/><circle cx="17" cy="34" r="3" fill="#fff"/><circle cx="30" cy="34" r="3" fill="#fff"/></svg><span>BASKET: 0 LIMES</span>`;
  const ptxt = pill.querySelector("span");
  const CNT0 = N2 + 1.1, CNT1 = N2 + 2.2;
  E.K(pill, "o", [[N2 + .9, 0], [N2 + 1.05, 1], [N4 - .1, 1], [N4 + .1, 0]]);
  E.F(t => { const v = t < CNT0 ? 0 : Math.round(40 * seg(t, CNT0, CNT1 - CNT0)); const s = t >= N3 + 1 ? "ORDER PLACED ✓" : `BASKET: ${v} LIMES`; if (ptxt.textContent !== s) ptxt.textContent = s; pill.style.background = v >= 40 ? CORAL : INK; ptxt.style.color = v >= 40 ? INK : "#fff"; });
  for (let i = 0; i < 14; i++) E.S(CNT0 + i * (CNT1 - CNT0) / 14, "tick", .35);
  E.K(pill, "s", [[CNT1 - .01, 1], [CNT1, 1.18], [CNT1 + .22, 1, "back"]]);

  // ================= the avalanche =================
  E.clip(NOW - .05, "sfx/doorbell.wav", { vol: .9 });
  E.K(door, "sx", [[NOW + .45, 1], [NOW + .6, .05, "out"]]); E.S(NOW + .45, "slam", .9); E.shake(NOW + .5, 22, .6);
  const LIMES = [];
  for (let i = 0; i < 90; i++) {
    const r = 28 + (i * 7) % 18;
    const l = E.el(R, "abs", `left:0;top:0;width:${r * 2}px;height:${r * 2}px;border-radius:50%;z-index:5;opacity:0;background:radial-gradient(circle at 35% 30%,#d8f59a 0 12%,#8bd13f 30%,#4f9a1c 75%,#3f7d14 100%);box-shadow:inset -4px -6px 0 rgba(0,0,0,.12)`);
    const t0 = NOW + .5 + (i % 30) * .025 + Math.floor(i / 30) * .08;             // all in flight by ~18.1 s
    const x1 = 840 - (i * 131) % 900, y1 = 1400 + (i * 53) % 440;
    E.K(l, "o", [[t0, 0], [t0 + .02, 1], [N4 - .1, 1], [N4 + .2, 0]]);
    E.K(l, "x", [[t0, 900 + (i % 5) * 20], [t0 + .7, x1, "out"]]);
    E.K(l, "y", [[t0, 900 + (i % 7) * 70], [t0 + .35, y1 - 200 - (i % 4) * 60, "out"], [t0 + .7, y1, "in"]]);
    E.K(l, "r", [[t0, 0], [t0 + .7, (i % 2 ? 1 : -1) * 360]]);
    LIMES.push(l);
  }
  E.clip(NOW + .5, "sfx/elx-lime-avalanche.wav", { vol: 1.2 });
  const PW = 1000, PH = 853 * PW / 1150;
  const pile = E.el(R, "abs", `left:${540 - PW / 2 - 60}px;top:${1880 - PH}px;width:${PW}px;height:${PH}px;z-index:6;opacity:0`);
  E.img(pile, "buried", `width:${PW}px;height:${PH}px`);
  E.K(pile, "o", [[N4 - .3, 0], [N4, 1]]);
  E.F(t => { pile.style.transform = t > H4 && t < H4 + .3 ? `translateY(${-Math.sin((t - H4) / .3 * Math.PI) * 10}px)` : "none"; });

  // ================= bubbles =================
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 56, bg = "#fff", fg = INK, nova = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${nova ? "#10202c" : bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.3)${nova ? `,inset 0 0 0 3px ${NOVA}` : ""};` +
      `font-weight:${nova ? 600 : 800};font-size:${size}px;line-height:1.08;letter-spacing:-.01em;color:${nova ? "#dff6ff" : fg};text-align:center`,
      (nova ? `<div style="font-weight:800;font-size:22px;letter-spacing:.24em;color:${NOVA};margin-bottom:6px">NOVA</div>` : "") + html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${nova ? "#10202c" : bg};transform:rotate(45deg);border-radius:6px;${nova ? `box-shadow:inset -3px -3px 0 ${NOVA}` : ""}`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  const NB = { left: 480, top: 470, w: 560, tail: 300, nova: true, size: 50 };
  bubble("Hey Nova, how do<br>I make a margarita?", { left: 60, top: 470, w: 620, tail: 260, t0: H1, t1: N1 - .1 });
  bubble("Now playing:<br>“Margarita Time”<br>(Extended Remix)", { ...NB, t0: N1, t1: H2 - .1 });
  bubble("No! The RECIPE!<br>Margarita recipe!", { left: 60, top: 470, w: 560, tail: 260, t0: H2, t1: N2 - .1, size: 58 });
  bubble("Adding 40 limes<br>to your basket.", { ...NB, t0: N2, t1: H3 - .1 });
  bubble("What? No!<br>Cancel! CANCEL!", { left: 60, top: 470, w: 520, tail: 260, t0: H3, t1: N3 - .1, size: 62, bg: GOLD });
  bubble("Order placed.<br>Arriving… now.", { ...NB, t0: N3, t1: N4 - .1 });
  bubble("Would you like<br>the recipe?", { ...NB, top: 520, t0: N4, t1: DUR });
  bubble("…yes.", { left: 330, top: 900, w: 240, tail: 90, t0: H4, t1: DUR, size: 54 });
  [[H1, "h1", 1.3], [H2, "h2", 1.3], [H3, "h3", 1.3], [H4, "h4", 2.0]].forEach(([t, n, v]) => E.clip(t + .05, `voices/sk12/${n}.wav`, { vol: v }));
  [[N1, "n1"], [N2, "n2"], [N3, "n3"], [N4, "n4"]].forEach(([t, n]) => { E.clip(t - .25, "sfx/elx-speaker-chime.wav", { vol: .6 }); E.clip(t + .05, `voices/sk12/${n}.wav`, { vol: 1.7 }); });
  const stampBox = E.el(R, "abs", "left:100px;top:340px;width:880px;display:flex;justify-content:center;z-index:9");
  const st = E.stamp(stampBox, "40 LIMES. 0 RECIPES.", STAMP, { size: 76, rot: -5, bg: CORAL, fg: INK, shake: 10 }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Asking the *smart speaker*", { size: 62, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, N2 + .8, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
