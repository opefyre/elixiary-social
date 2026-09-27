// SK.19 "The hotel minibar." — an absurd-rule skit. A card on the minibar: "Items are charged automatically when lifted."
// He lifts a tiny bottle to read it: +€14. "I'm just looking!" He puts it back: +€14 restocking. The fine print zooms in:
// "…when lifted, moved, or looked at." He tiptoes away: +€6 proximity. The phone rings. Front desk, very calm: "Good evening,
// sir. We noticed you looked at the minibar. That's nine euros." — "I didn't even open it!" +€5 raised-voice surcharge.
// MINIBAR: €48. OPENED: 0.  Voices: ElevenLabs (him: Callum; front desk: Lily).
export const meta = {
  id: "sk19-minibar",
  images: { look: "cutouts/mb_look.webp", shock: "cutouts/mb_shock.webp", phone: "cutouts/mb_phone.webp", tiptoe: "cutouts/mb_tiptoe.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  const LIFT = 1.4, G1 = 2.0, PUT = 4.0, G2 = 4.3, ZOOM = 6.2, TIP = 9.0, RING = 10.8, PICK = 11.9, D1 = 12.2, D2 = 16.2, G3 = 17.9, STAMP = 19.9, DUR = 22.4;
  E.music({ bpm: 92, root: 57, seed: 19, prog: [[0, 4, 7, 11], [5, 9, 12, 16], [2, 5, 9, 12], [7, 11, 14, 17]], until: RING });
  const S = E.scene("room", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const eo = u => 1 - Math.pow(1 - u, 3);
  const FL = 1640;

  // ================= hotel room at night =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2c2530,#3a3038 60%,#2a2228)");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1640px;opacity:.12;background:repeating-linear-gradient(90deg,#fff 0 2px,transparent 2px 64px)");
  // window with a city skyline and heavy curtains
  const win = E.el(R, "abs", "left:560px;top:400px;width:460px;height:560px;overflow:hidden;box-shadow:0 0 0 14px #1d181c");
  win.innerHTML = `<svg viewBox="0 0 460 560" width="460" height="560"><defs><linearGradient id="nk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1330"/><stop offset="1" stop-color="#3a2d5c"/></linearGradient></defs><rect width="460" height="560" fill="url(#nk)"/>` +
    [[0, 300, 80], [70, 220, 70], [140, 330, 90], [230, 180, 80], [310, 280, 70], [380, 240, 80]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${560 - y}" fill="#1a1d3a"/>` +
      Array.from({ length: 14 }, (_, k) => `<rect x="${x + 8 + (k % 3) * (w / 3.4)}" y="${y + 14 + Math.floor(k / 3) * 36}" width="12" height="16" fill="#ffd98a" opacity="${(k * 7 + x) % 3 ? .85 : .12}"/>`).join("")).join("") + `</svg>`;
  E.el(R, "abs", "left:520px;top:380px;width:90px;height:620px;border-radius:0 0 30px 0;background:linear-gradient(90deg,#6e2f3a,#8a3c49 50%,#6e2f3a)");
  E.el(R, "abs", "left:980px;top:380px;width:100px;height:620px;border-radius:0 0 0 30px;background:linear-gradient(90deg,#6e2f3a,#8a3c49 50%,#6e2f3a)");
  // bed with headboard (right), bedside lamp
  const bed = E.el(R, "abs", "left:560px;top:1060px;width:560px;height:600px");
  bed.innerHTML = `<svg viewBox="0 0 560 600" width="560" height="600"><rect x="40" y="0" width="520" height="260" rx="24" fill="#5a3d2e"/><rect x="60" y="20" width="480" height="220" rx="18" fill="#6e4b38"/>` +
    `<rect x="0" y="240" width="560" height="360" rx="20" fill="#f4f1ea"/><rect x="0" y="330" width="560" height="120" fill="#b88a5a"/><ellipse cx="170" cy="230" rx="110" ry="46" fill="#fff"/><ellipse cx="400" cy="230" rx="110" ry="46" fill="#fff"/>` +
    `<rect x="40" y="340" width="480" height="18" fill="#9a7048"/></svg>`;
  const lamp = E.el(R, "abs", "left:440px;top:980px;width:120px;height:200px");
  lamp.innerHTML = `<svg viewBox="0 0 120 200" width="120" height="200"><path d="M20 0 H100 L88 80 H32 Z" fill="#f6e3b8"/><rect x="56" y="80" width="8" height="100" fill="#b8893a"/><ellipse cx="60" cy="188" rx="36" ry="10" fill="#b8893a"/></svg>`;
  E.el(R, "abs", "left:280px;top:760px;width:440px;height:440px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,214,140,.35),transparent)");
  // carpet
  E.el(R, "abs", `left:0;top:${FL}px;width:1080px;height:${1920 - FL}px;background:#4a3b44;background-image:radial-gradient(circle,rgba(255,255,255,.05) 2px,transparent 2.5px);background-size:16px 16px`);

  // ================= the minibar (left) =================
  const MX = 60, MY = 1180;
  const cab = E.el(R, "abs", `left:${MX}px;top:${MY}px;width:340px;height:${FL - MY}px;background:linear-gradient(180deg,#6b4a34,#553a28);border-radius:10px 10px 0 0;box-shadow:0 20px 40px rgba(0,0,0,.4)`);
  const fr = E.el(R, "abs", `left:${MX + 30}px;top:${MY + 40}px;width:280px;height:380px;border-radius:12px;background:linear-gradient(180deg,#f7fbff,#dfe8ef);box-shadow:inset 0 0 0 8px #c9d3db,inset 0 0 40px rgba(170,210,255,.5)`);
  fr.innerHTML = `<svg viewBox="0 0 280 380" width="280" height="380">
    <rect x="20" y="130" width="240" height="8" fill="#c9d3db"/><rect x="20" y="260" width="240" height="8" fill="#c9d3db"/>
    ${[[40, "#8a4a1e"], [84, "#27402f"], [128, "#c9a24a"], [172, "#7a1e28"], [216, "#3f6d8c"]].map(([x, c], i) => i === 2 ? "" : `<rect x="${x}" y="64" width="26" height="66" rx="6" fill="${c}"/><rect x="${x + 7}" y="46" width="12" height="22" rx="3" fill="${c}"/><rect x="${x + 3}" y="92" width="20" height="16" fill="#efe6d2"/>`).join("")}
    <rect x="40" y="200" width="70" height="60" rx="6" fill="#6b3a1e"/><rect x="44" y="210" width="62" height="14" fill="#c9a24a"/>
    <rect x="130" y="186" width="44" height="74" rx="8" fill="#ffcf4a"/><rect x="190" y="194" width="50" height="66" rx="8" fill="#e25b5b"/>
    <rect x="40" y="290" width="40" height="80" rx="8" fill="rgba(170,220,255,.8)"/><rect x="100" y="290" width="40" height="80" rx="8" fill="rgba(170,220,255,.8)"/><rect x="170" y="300" width="70" height="70" rx="10" fill="#9bd14a"/></svg>`;
  const glow = E.el(R, "abs", `left:${MX - 40}px;top:${MY}px;width:420px;height:460px;border-radius:50%;background:radial-gradient(closest-side,rgba(190,225,255,.35),transparent)`);
  // the rules card on top of the minibar
  const card = E.el(R, "abs", `left:${MX + 50}px;top:${MY - 150}px;width:240px;height:150px;border-radius:8px;background:#fffdf6;box-shadow:0 10px 20px rgba(0,0,0,.35);padding:14px 16px;transform-origin:50% 100%`,
    `<div style="font-weight:800;font-size:22px;color:${INK};letter-spacing:.06em">MINIBAR</div><div style="font-family:Inter;font-size:15px;line-height:1.3;color:#333;margin-top:6px">Items are charged automatically when lifted.</div><div style="font-family:Inter;font-size:9px;line-height:1.25;color:#999;margin-top:8px">…lifted, moved, or looked at.</div>`);
  // the zoom on the fine print
  const zoom = E.el(R, "abs", `left:100px;top:620px;width:880px;padding:34px 40px;border-radius:26px;background:#fffdf6;box-shadow:0 30px 60px rgba(0,0,0,.55);z-index:8;opacity:0`,
    `<div style="font-weight:800;font-size:44px;color:${INK};letter-spacing:.08em">MINIBAR</div><div style="font-family:Inter;font-size:40px;line-height:1.3;color:#333;margin-top:10px">Items are charged automatically when lifted,</div><div style="font-family:Inter;font-weight:700;font-size:52px;line-height:1.2;color:${CORAL};margin-top:16px">moved, or looked at.</div>`);
  E.K(zoom, "o", [[ZOOM, 0], [ZOOM + .25, 1], [TIP - .3, 1], [TIP, 0]]); E.K(zoom, "s", [[ZOOM, .4], [ZOOM + .35, 1, "back"]]);
  E.S(ZOOM, "whoosh", .6); E.S(ZOOM + .9, "thud", .6);
  // the lifted bottle floats up in his hand position, goes back
  // (his "look" pose holds his own bottle; the fridge gap shows it is missing)
  const gap = E.el(R, "abs", `left:${MX + 30 + 128}px;top:${MY + 40 + 46}px;width:26px;height:84px;opacity:0`);
  E.F(t => { gap.style.opacity = 0; });

  // ================= him =================
  const HIM = { look: [574, 991], shock: [521, 994], tiptoe: [549, 986], phone: [508, 1003] };
  const him = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:3");
  const himIn = E.el(him, "abs", "left:0;top:0;width:1080px;height:1920px");
  const hEls = Object.entries(HIM).map(([n, [w, h]]) => { const H = 1000, W = w * H / h; return [n, E.img(himIn, n, `position:absolute;left:${-W / 2}px;top:${FL + 40 - H}px;width:${W}px;height:${H}px`)]; });
  const HP = [[0, "look"], [PUT, "shock"], [TIP, "tiptoe"], [PICK, "phone"], [G3, "shock"]];
  E.K(him, "x", [[0, 560], [TIP, 560], [RING - .2, 700, "io"], [PICK, 560, "io"]]);
  E.F(t => {
    const f = at(HP, t); hEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; });
    hEls[2][1].style.transform = "scaleX(-1)";
    let y = Math.sin(t * 2) * 3; for (const [k] of HP.slice(1)) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 18;
    if (t >= TIP && t < RING) y = -Math.abs(Math.sin(t * 6)) * 8;
    if (t >= RING && t < PICK) y += Math.sin(t * 60) * 4;                        // jumps at the ring
    himIn.style.transform = `translateY(${y}px)`;
  });
  // the phone on the nightstand (right of him)
  const ph = E.el(R, "abs", "left:760px;top:1480px;width:140px;height:90px");
  ph.innerHTML = `<svg viewBox="0 0 140 90" width="140" height="90"><rect x="0" y="40" width="140" height="50" rx="10" fill="#e8dcc6"/><path d="M14 40 Q14 8 40 8 H100 Q126 8 126 40 Z" fill="#d9ccb2"/><rect x="40" y="52" width="60" height="30" rx="4" fill="#c9bb9c"/></svg>`;
  E.F(t => { ph.style.transform = t >= RING && t < PICK ? `rotate(${Math.sin(t * 70) * 6}deg)` : "none"; ph.style.opacity = t >= PICK ? .4 : 1; });
  E.clip(RING, "sfx/elx-phone-ring.wav", { vol: 1 });

  // ================= the bill =================
  let bill = 0;
  const CHARGES = [[LIFT + .35, 14, "LIFTED"], [PUT + .4, 14, "RESTOCKING"], [TIP + .8, 6, "PROXIMITY"], [D2 + .8, 9, "LOOKED AT"], [G3 + 1.3, 5, "RAISED VOICE"]];
  const pill = E.el(R, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:54px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;transform-origin:0 50%;font-variant-numeric:tabular-nums`, "MINIBAR: €0");
  E.K(pill, "o", [[1.95, 0], [2.1, 1]]);
  E.F(t => { const v = CHARGES.filter(([k]) => t >= k).reduce((a, [, x]) => a + x, 0); const s = `MINIBAR: €${v}`; if (pill.textContent !== s) pill.textContent = s; pill.style.background = v >= 30 ? CORAL : INK; pill.style.color = v >= 30 ? INK : "#fff"; });
  CHARGES.forEach(([k, v, why], i) => {
    E.K(pill, "s", [[k - .01, 1], [k, 1.2], [k + .22, 1, "back"]]);
    const f = E.el(R, "abs", `left:${[90, 90, 90, 90, 90][i]}px;top:${[720, 720, 720, 720, 720][i]}px;z-index:9;opacity:0;text-align:center`,
      `<div style="font-weight:800;font-size:72px;color:${CORAL};text-shadow:0 4px 0 #000,0 0 20px rgba(0,0,0,.6)">+€${v}</div><div style="font-weight:800;font-size:26px;letter-spacing:.14em;color:#fff;text-shadow:0 2px 0 #000">${why}</div>`);
    E.K(f, "o", [[k, 0], [k + .08, 1], [k + 1.2, 1], [k + 1.5, 0]]); E.K(f, "y", [[k, 30], [k + 1.5, -60, "out"]]);
    E.clip(k - .05, "sfx/elx-chaching.wav", { vol: .9 });
  });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 58, bg = "#fff", fg = INK, desk = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${desk ? "#1b2330" : bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.06;letter-spacing:-.02em;color:${desk ? "#fff" : fg};text-align:center`,
      (desk ? `<div style="font-weight:800;font-size:22px;letter-spacing:.22em;color:${GOLD};margin-bottom:6px">☎ FRONT DESK</div>` : "") + html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${desk ? "#1b2330" : bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  bubble("I'm just<br>looking!", { left: 460, top: 470, w: 420, tail: 150, t0: G1, t1: PUT - .1 });
  bubble("I put it<br>back!", { left: 480, top: 470, w: 380, tail: 140, t0: G2, t1: ZOOM - .1 });
  bubble("Good evening, sir. We<br>noticed you looked at<br>the minibar.", { left: 150, top: 380, w: 780, tail: 520, t0: D1, t1: D2 - .1, size: 50, desk: true });
  bubble("That's nine euros.", { left: 220, top: 420, w: 640, tail: 460, t0: D2, t1: G3 - .1, size: 56, desk: true });
  bubble("I didn't even<br>open it!", { left: 420, top: 470, w: 460, tail: 150, t0: G3, t1: STAMP, size: 60, bg: GOLD });
  [[G1, "g1"], [G2, "g2"], [G3, "g3"]].forEach(([t, n]) => E.clip(t + .05, `voices/sk19/${n}.wav`, { vol: 1.4 }));
  [[D1, "d1"], [D2, "d2"]].forEach(([t, n]) => E.clip(t + .05, `voices/sk19/${n}.wav`, { vol: 1.5 }));
  E.clip(LIFT - .2, "sfx/elx-fridge.wav", { vol: .9 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-hotel-room.wav", { vol: .6, to: Math.min(6, DUR - t), duck: false });
  for (let t = TIP + .1; t < RING - .2; t += .45) E.S(t, "creak", .25);
  const stampBox = E.el(R, "abs", "left:100px;top:360px;width:880px;display:flex;justify-content:center;z-index:10");
  const st = E.stamp(stampBox, "MINIBAR: €48. OPENED: 0.", STAMP, { size: 64, rot: -5, bg: CORAL, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "The hotel *minibar.*", { size: 70, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, 1.85, .15);
  E.F(t => { glow.style.opacity = .7 + .3 * Math.sin(t * 3); });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
