// SK.24 "I'm not drinking tonight." — Nina (from SK.20) orders nothing. Four cocktails land. "Can I just try a sip?" —
// sip. Then another friend's. Then faster: SIPS 1 → 14, every glass drained to the ice. The waiter: "And for you, madam?"
// Nina, hugging four empty glasses: "Oh, nothing for me. I'm not drinking." Callback: Rico, "Let's just split it evenly,
// it's easier!" — Nina, sweetly: "Sure. Evenly." SIPS: 14. PAID: €0.  Voices: ElevenLabs (Nina: Sarah; waiter: George; Rico: Liam).
export const meta = {
  id: "sk24-just-a-sip",
  images: { cheer: "cutouts/split_cheer.webp", water: "cutouts/nina_water.webp", sip: "cutouts/nina_sip.webp", empties: "cutouts/nina_empties.webp", waiter: "cutouts/waiter.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  const N1 = .4, ARRIVE = 2.4, N2 = 3.6, SIP1 = 4.8, FAST = 7.6, EMPTIES = 10.4, W1 = 10.8, N3 = 12.2, R1 = 14.6, N4 = 16.6, STAMP = 17.8, DUR = 20.6;
  E.music({ bpm: 108, root: 55, seed: 24, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]] });
  const S = E.scene("dinner", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const at = (list, t) => { let v = list[0][1]; for (const [k, x] of list) if (t >= k) v = x; return v; };
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const TOP = 1480;

  // ================= restaurant (same room as SK.20) =================
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#2a1b17,#3b261f 55%,#221612)");
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1480px;opacity:.18;background-image:linear-gradient(0deg,rgba(0,0,0,.9) 3px,transparent 3px),linear-gradient(90deg,rgba(0,0,0,.9) 3px,transparent 3px),linear-gradient(90deg,rgba(0,0,0,.9) 3px,transparent 3px);background-size:100% 52px,120px 104px,120px 104px;background-position:0 0,0 0,60px 52px;background-color:#8a4a34");
  const bulbs = []; for (let i = 0; i < 12; i++) bulbs.push(E.el(R, "abs", `left:${40 + i * 90}px;top:${420 + Math.sin(i / 11 * Math.PI) * 50}px;width:22px;height:28px;border-radius:50%;background:#ffe28a;box-shadow:0 0 22px #ffd35c`));
  E.F(t => bulbs.forEach((b, i) => { b.style.opacity = .6 + .4 * Math.abs(Math.sin(t * 1.8 + i)); }));
  const CW = 1000, CH = 515 * CW / 1024;
  const cheer = E.el(R, "abs", `left:-150px;top:${TOP + 40 - CH}px;width:${CW}px;height:${CH}px`);
  E.img(cheer, "cheer", `width:${CW}px;height:${CH}px`);
  E.F(t => { cheer.style.transform = `translateY(${Math.sin(t * 2) * 3}px)`; cheer.style.filter = t >= FAST ? `saturate(${1 - seg(t, FAST, 2) * .5}) brightness(${1 - seg(t, FAST, 2) * .2})` : "none"; });
  const NIN = { water: [768, 1137, 780], sip: [860, 1165, 780], empties: [764, 1165, 780] };
  const nina = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:2");
  const ninaIn = E.el(nina, "abs", "left:0;top:0;width:1080px;height:1920px");
  const nEls = Object.entries(NIN).map(([n, [w, h, H]]) => { const W = w * H / h; return [n, E.img(ninaIn, n, `position:absolute;left:${900 - W / 2}px;top:${TOP + 60 - H}px;width:${W}px;height:${H}px`)]; });
  const NP = [[0, "water"], [N2 + .6, "sip"], [EMPTIES, "empties"]];
  E.F(t => { const f = at(NP, t); nEls.forEach(([n, el]) => { el.style.opacity = n === f ? 1 : 0; }); let y = Math.sin(t * 2.2) * 3; for (const [k] of NP.slice(1)) if (t >= k && t < k + .22) y -= Math.sin((t - k) / .22 * Math.PI) * 14; ninaIn.style.transform = `translateY(${y}px)`; });

  // ================= the table and the four drinks =================
  E.el(R, "abs", `left:-20px;top:${TOP}px;width:1120px;height:${1920 - TOP}px;background:linear-gradient(180deg,#fbf7ee,#e6dcc6);z-index:3`);
  const COLORS = ["#ff8a5b", "#f2c14e", "#e86aa0", "#6fcf97"], XS = [120, 300, 480, 640];
  const glasses = XS.map((x, i) => {
    const g = E.el(R, "abs", `left:${x}px;top:${TOP - 170}px;width:110px;height:190px;z-index:4;opacity:0`);
    g.innerHTML = `<svg viewBox="0 0 110 190" width="110" height="190"><defs><clipPath id="gc${i}"><path d="M10 20 L18 184 H92 L100 20 Z"/></clipPath></defs>` +
      `<g clip-path="url(#gc${i})"><rect class="liq" x="0" y="30" width="110" height="160" fill="${COLORS[i]}"/>${[[26, 60], [60, 90], [34, 130]].map(([a, b]) => `<rect x="${a}" y="${b}" width="26" height="26" rx="5" fill="rgba(255,255,255,.7)"/>`).join("")}</g>` +
      `<path d="M6 16 L14 186 H96 L104 16" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="4"/><rect x="70" y="-24" width="6" height="80" fill="#ff8fb1" transform="rotate(14 73 16)"/>` +
      `<ellipse class="lip" cx="80" cy="18" rx="10" ry="5" fill="#d0304a" opacity="0"/></svg>`;
    E.K(g, "o", [[ARRIVE + i * .12, 0], [ARRIVE + .1 + i * .12, 1], [EMPTIES - .05, 1], [EMPTIES, 0]]); E.K(g, "y", [[ARRIVE + i * .12, -80], [ARRIVE + .35 + i * .12, 0, "back"]]);
    return g;
  });
  E.S(ARRIVE, "swish", .6); E.clip(ARRIVE + .3, "sfx/elx-glass-clink.wav", { vol: .8 });
  // the sips: first four slow (each glass slides to her and back), then a fast blur of the rest
  const SIPS = [SIP1, SIP1 + 1.0, SIP1 + 1.8, SIP1 + 2.4];
  for (let k = 0; k < 10; k++) SIPS.push(FAST + .2 + k * .22);
  const level = (i, t) => { let n = 0; SIPS.forEach((s, j) => { if (t >= s + .2 && (j < 4 ? j === i : j % 4 === i)) n++; }); return Math.min(1, n * .34); };
  E.F(t => glasses.forEach((g, i) => {
    const lv = level(i, t); const liq = g.querySelector(".liq"); liq.setAttribute("y", String(30 + lv * 150));
    g.querySelector(".lip").setAttribute("opacity", lv > 0 ? 1 : 0);
    const slow = SIPS.slice(0, 4)[i]; let dx = 0;
    if (t >= slow && t < slow + .7) dx = Math.sin(seg(t, slow, .7) * Math.PI) * (820 - XS[i] - 60);
    if (t >= FAST && t < EMPTIES - .2) dx = Math.sin((t - FAST) * 14 + i) * 18;
    g.style.transform = (g.style.transform || "").replace(/ translateX\([^)]*\)/, "") + ` translateX(${dx}px)`;
  }));
  SIPS.forEach((s, j) => E.clip(s + .1, j < 4 ? "sfx/elx-sip.wav" : "sfx/elx-slurp-empty.wav", { vol: j < 4 ? .9 : .5, to: j < 4 ? 1 : .3 }));

  // ================= counter =================
  const pill = E.el(R, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:54px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;transform-origin:0 50%;font-variant-numeric:tabular-nums`, "SIPS: 0");
  E.K(pill, "o", [[SIP1 - .1, 0], [SIP1 + .05, 1], [STAMP - .1, 1], [STAMP + .1, 0]]);
  E.F(t => { const n = SIPS.filter(s => t >= s + .1).length; const s = `SIPS: ${n} · ORDERED: 0`; if (pill.textContent !== s) pill.textContent = s; pill.style.background = n >= 6 ? CORAL : INK; pill.style.color = n >= 6 ? INK : "#fff"; });
  SIPS.forEach(s => E.K(pill, "s", [[s + .09, 1], [s + .1, 1.12], [s + .28, 1, "back"]]));

  // ================= the waiter =================
  const WH = 1180, WW = 526 * WH / 1010;
  const w = E.el(R, "abs", `left:${1080 - WW + 150}px;top:${TOP + 280 - WH}px;width:${WW}px;height:${WH}px;z-index:5;opacity:0`);
  E.img(w, "waiter", `width:${WW}px;height:${WH}px`);
  E.K(w, "o", [[W1 - .5, 0], [W1 - .45, 1], [R1 - .3, 1], [R1, 0]]); E.K(w, "x", [[W1 - .5, 400], [W1, 0, "out"]]);
  E.K(nina, "x", [[W1 - .5, 0], [W1, -300, "io"], [R1 - .3, -300], [R1, 0, "io"]]);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 58, bg = "#fff", fg = INK, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : bg};border-radius:30px;padding:18px 26px 22px;box-shadow:0 14px 34px rgba(0,0,0,.45);font-weight:800;font-size:${size}px;line-height:1.06;letter-spacing:-.02em;color:${dark ? "#fff" : fg};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .45);
  };
  bubble("I'm not drinking<br>tonight.", { left: 520, top: 640, w: 480, tail: 380, t0: N1, t1: N2 - .1 });
  bubble("Can I just<br>try a sip?", { left: 560, top: 640, w: 440, tail: 340, t0: N2, t1: SIP1 + 1.2 });
  bubble("And for you,<br>madam?", { left: 560, top: 560, w: 420, tail: 300, t0: W1, t1: N3 - .1, dark: true });
  bubble("Oh, nothing for me.<br>I'm not drinking.", { left: 260, top: 640, w: 580, tail: 300, t0: N3, t1: R1 - .1, italic: true });
  bubble("Let's just split it<br>evenly, it's easier!", { left: 60, top: 860, w: 600, tail: 360, t0: R1, t1: N4 - .1, size: 54, bg: GOLD });
  bubble("Sure. Evenly.", { left: 440, top: 640, w: 440, tail: 260, t0: N4, t1: DUR });
  E.clip(N1 + .05, "voices/sk24/n1.wav", { vol: 1.5 }); E.clip(N2 + .05, "voices/sk24/n2.wav", { vol: 1.5 }); E.clip(W1 + .05, "voices/sk24/w1.wav", { vol: 1.5 });
  E.clip(N3 + .05, "voices/sk24/n3.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk20/r1.wav", { vol: 1.4 }); E.clip(N4 + .05, "voices/sk20/n1.wav", { vol: 1.5 });
  for (let t = 0; t < DUR; t += 6) E.clip(t, "sfx/elx-restaurant.wav", { vol: .3, to: Math.min(6, DUR - t), duck: false });
  const stampBox = E.el(R, "abs", "left:100px;top:380px;width:880px;display:flex;justify-content:center;z-index:10");
  const st = E.stamp(stampBox, "SIPS: 14. PAID: €0.", STAMP, { size: 76, rot: -5, bg: CORAL, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";

  // title (frame 0)
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "\"I'm not *drinking* tonight.\"", { size: 58, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, SIP1 - .2, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
