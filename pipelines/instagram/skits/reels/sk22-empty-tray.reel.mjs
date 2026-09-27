// SK.22 "Who put the ice tray back empty?" — a black-and-white film-noir investigation. Rain, sax, venetian-blind shadows.
// Gravelly narrator (ElevenLabs, Callum): "It was a Tuesday. The ice tray… was empty." EXHIBIT A. "Everyone had a motive." —
// a police line-up: Rico (always brings ice), the cat (no thumbs), Maya (only drinks wine). "So I checked the tape." — green
// CCTV, TUE 03:12, a figure in a hoodie empties the tray and puts it back. Zoom. It's the detective. "…it was me." CASE CLOSED.
export const meta = {
  id: "sk22-empty-tray",
  images: { look: "cutouts/det_look.webp", shock: "cutouts/det_shock.webp", cctv: "cutouts/hb_ice.webp", rico: "cutouts/tropic_ice.webp", cat: "cutouts/cat_sit.webp", maya: "cutouts/cust_flat.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  const N1 = .4, N2 = 5.4, N3 = 8.8, N4 = 11.4, TAPE = 12.4, ZOOM = 15.2, N5 = 16.2, STAMP = 17.6, DUR = 20.4;
  E.music({ bpm: 70, root: 45, seed: 22, prog: [[0, 3, 7, 10], [5, 8, 12, 15], [3, 7, 10, 14], [7, 10, 14, 17]], off: true });
  const S = E.scene("noir", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const win = (t, a, b) => t >= a && t < b;
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:#000");
  const noir = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;filter:grayscale(1) contrast(1.15)");
  const shot = (a, b, parent = noir) => { const el = E.el(parent, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden;opacity:0"); E.F(t => { el.style.opacity = win(t, a, b) ? Math.min(1, seg(t, a, .2), 1 - seg(t, b - .2, .2)) : 0; }); return el; };
  const blinds = (el, a = .55) => { const b = E.el(el, "abs", `left:-200px;top:0;width:1500px;height:1920px;background:repeating-linear-gradient(180deg,rgba(0,0,0,${a}) 0 46px,transparent 46px 96px);transform:skewY(-14deg);pointer-events:none`); return b; };

  // ---------- shot A: the kitchen at night, the detective with the empty tray ----------
  const A = shot(0, N2);
  E.el(A, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#3a3a3a,#1a1a1a)");
  const fz = E.el(A, "abs", "left:620px;top:520px;width:400px;height:1100px;border-radius:14px;background:linear-gradient(90deg,#8a8a8a,#c8c8c8 40%,#9a9a9a);box-shadow:0 20px 40px rgba(0,0,0,.6)");
  E.el(fz, "abs", "left:20px;top:20px;width:360px;height:360px;border-radius:8px;background:#e8eef2;box-shadow:inset 0 0 40px rgba(255,255,255,.8)");   // open freezer glow
  E.el(fz, "abs", "left:30px;top:410px;width:12px;height:120px;border-radius:6px;background:#555");
  const glow = E.el(A, "abs", "left:420px;top:420px;width:700px;height:700px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.35),transparent)");
  const rainW = E.el(A, "abs", "left:60px;top:440px;width:420px;height:520px;overflow:hidden;background:#2a2a2a;box-shadow:0 0 0 12px #111");
  const drops = []; for (let i = 0; i < 30; i++) drops.push(E.el(rainW, "abs", `left:${(i * 53) % 400}px;top:0;width:3px;height:40px;background:rgba(255,255,255,.5)`));
  E.F(t => drops.forEach((d, i) => { d.style.transform = `translateY(${((t * 900 + i * 97) % 600) - 60}px)`; }));
  E.F(t => { rainW.style.background = Math.sin(t * 7) > .985 ? "#eee" : "#2a2a2a"; });                // lightning flicker
  const DH = 1150, DW = 387 * DH / 1010;
  const det = E.el(A, "abs", `left:${300 - DW / 2}px;top:${1800 - DH}px;width:${DW}px;height:${DH}px`); E.img(det, "look", `width:${DW}px;height:${DH}px`);
  E.F(t => { det.style.transform = `translateY(${Math.sin(t * 1.5) * 4}px)`; });
  blinds(A);
  E.el(A, "abs", "left:0;top:1780px;width:1080px;height:140px;background:#111");

  // ---------- shot B: EXHIBIT A — the tray, back in the freezer, empty ----------
  const B = shot(N2, N3);
  E.el(B, "abs", "left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse at 50% 50%,#d8dde0 0%,#8a9094 55%,#2a2a2a 100%)");
  const tray = E.el(B, "abs", "left:190px;top:780px;width:700px;height:360px;transform:perspective(900px) rotateX(38deg)");
  tray.innerHTML = `<svg viewBox="0 0 700 360" width="700" height="360"><rect x="0" y="0" width="700" height="360" rx="30" fill="#5a8fc9"/>` +
    Array.from({ length: 14 }, (_, i) => `<rect x="${30 + (i % 7) * 94}" y="${40 + Math.floor(i / 7) * 150}" width="80" height="130" rx="16" fill="#3d6fa8"/>`).join("") + `</svg>`;
  E.F(t => { tray.style.transform = `perspective(900px) rotateX(38deg) scale(${1 + seg(t, N2, 3.4) * .12})`; });
  const exA = E.el(B, "abs", `left:360px;top:1220px;padding:14px 30px;background:#f4f0e6;font-family:"Courier New",monospace;font-weight:700;font-size:48px;color:#111;transform:rotate(-4deg);box-shadow:0 10px 20px rgba(0,0,0,.5)`, "EXHIBIT A");
  E.K(exA, "o", [[N2 + .4, 0], [N2 + .5, 1]]); E.K(exA, "s", [[N2 + .4, 1.6], [N2 + .7, 1, "back"]]); E.S(N2 + .5, "thud", .7);
  blinds(B, .35);

  // ---------- shot C: the line-up ----------
  const C = shot(N3, N4 + .1);
  E.el(C, "abs", "left:0;top:0;width:1080px;height:1920px;background:#bdbdbd");
  for (let i = 0; i < 9; i++) { E.el(C, "abs", `left:0;top:${560 + i * 120}px;width:1080px;height:3px;background:#222`); E.el(C, "abs", `left:20px;top:${520 + i * 120}px;font-family:"Courier New",monospace;font-weight:700;font-size:32px;color:#222`, `${7 - i * .5}'`); }
  const sus = [["rico", 523, 1003, 950, 200, "1", "RICO — ALWAYS BRINGS ICE"], ["cat", 549, 985, 560, 540, "2", "THE CAT — NO THUMBS"], ["maya", 751, 1160, 880, 860, "3", "MAYA — 'ONLY DRINKS WINE'"]];
  sus.forEach(([n, w, h, H, cx, num, label], i) => {
    const W = w * H / h, el = E.el(C, "abs", `left:${cx - W / 2}px;top:${1640 - H}px;width:${W}px;height:${H}px;opacity:0`); E.img(el, n, `width:${W}px;height:${H}px`);
    const t0 = N3 + .1 + i * .45; E.K(el, "o", [[t0, 0], [t0 + .15, 1]]); E.K(el, "y", [[t0, 40], [t0 + .3, 0, "out"]]); E.S(t0, "thud", .5);
    const card = E.el(C, "abs", `left:${cx - 50}px;top:1560px;width:100px;height:90px;background:#111;color:#fff;font-family:"Courier New",monospace;font-weight:700;font-size:64px;text-align:center;line-height:90px;opacity:0`, num);
    E.K(card, "o", [[t0 + .1, 0], [t0 + .2, 1]]);
    const lab = E.el(C, "abs", `left:40px;top:${400 + i * 56}px;width:1000px;font-family:"Courier New",monospace;font-weight:700;font-size:36px;color:#111;opacity:0`, `#${num} ${label}`);
    E.K(lab, "o", [[t0 + .3, 0], [t0 + .45, 1]]);
  });
  E.clip(N3 + 1.6, "sfx/elx-cat-mrrp.wav", { vol: .8 });

  // ---------- shot D: the CCTV tape (green, outside the grayscale layer) ----------
  const D = shot(TAPE, ZOOM + 1, R);
  E.el(D, "abs", "left:0;top:0;width:1080px;height:1920px;background:#000");
  const cam = E.el(D, "abs", "left:40px;top:420px;width:1000px;height:1100px;overflow:hidden;background:#0c1a10;filter:sepia(1) hue-rotate(60deg) saturate(2.2) brightness(.9) contrast(1.2)");
  const camIn = E.el(cam, "abs", "left:0;top:0;width:1000px;height:1100px;transform-origin:500px 330px");
  E.el(camIn, "abs", "left:0;top:0;width:1000px;height:1100px;background:linear-gradient(180deg,#556,#223)");
  const fz2 = E.el(camIn, "abs", "left:620px;top:160px;width:320px;height:900px;background:#999;border-radius:10px");
  E.el(fz2, "abs", "left:16px;top:16px;width:288px;height:290px;background:#ddd");
  const CH = 780, CW2 = 507 * CH / 1001;
  const perp = E.el(camIn, "abs", `left:${330 - CW2 / 2}px;top:${1060 - CH}px;width:${CW2}px;height:${CH}px`); E.img(perp, "cctv", `width:${CW2}px;height:${CH}px`);
  E.F(t => { perp.style.transform = `translateX(${Math.sin(t * 40) * (t < ZOOM ? 3 : 0)}px)`; camIn.style.transform = `scale(${1 + seg(t, ZOOM - .6, .8) * 1.3}) translate(${seg(t, ZOOM - .6, .8) * 120}px,${seg(t, ZOOM - .6, .8) * 60}px)`; });
  E.el(cam, "abs", "left:0;top:0;width:1000px;height:1100px;background:repeating-linear-gradient(180deg,rgba(0,0,0,.25) 0 3px,transparent 3px 6px);pointer-events:none");
  const hud = E.el(D, "abs", `left:80px;top:460px;font-family:"Courier New",monospace;font-weight:700;font-size:40px;color:#fff;text-shadow:0 0 6px #0f0`, "● REC  CAM 2 · KITCHEN");
  const ts = E.el(D, "abs", `left:80px;top:1440px;font-family:"Courier New",monospace;font-weight:700;font-size:44px;color:#fff;text-shadow:0 0 6px #0f0;font-variant-numeric:tabular-nums`, "");
  E.F(t => { const s = Math.floor((t - TAPE) * 3) % 60; const v = `TUE 03:12:${String(Math.max(0, s)).padStart(2, "0")}`; if (ts.textContent !== v) ts.textContent = v; hud.style.opacity = Math.floor(t * 2) % 2 ? 1 : .5; });
  const noise = E.el(D, "abs", "left:40px;top:420px;width:1000px;height:1100px;opacity:.12;background-image:radial-gradient(#fff 1px,transparent 1.3px);background-size:6px 6px;pointer-events:none");
  E.F(t => { noise.style.transform = `translate(${(Math.floor(t * 30) * 7) % 12}px,${(Math.floor(t * 30) * 5) % 12}px)`; });
  E.clip(N4 + .6, "sfx/elx-vhs.wav", { vol: 1 });

  // ---------- shot F: his face ----------
  const F = shot(ZOOM + 1, DUR);
  E.el(F, "abs", "left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse at 50% 40%,#555,#111 70%)");
  const SH = 1250, SW = 466 * SH / 1004;
  const sh = E.el(F, "abs", `left:${540 - SW / 2}px;top:${1880 - SH}px;width:${SW}px;height:${SH}px`); E.img(sh, "shock", `width:${SW}px;height:${SH}px`);
  E.F(t => { sh.style.transform = `scale(${1 + seg(t, ZOOM + 1, 3) * .08})`; sh.style.transformOrigin = "50% 20%"; });
  blinds(F, .45);
  E.S(ZOOM + 1, "thud", .9); E.shake(ZOOM + 1, 16, .4);

  // ---------- subtitles, sound, stamp ----------
  const SUBS = [[N1, 4.68, "It was a Tuesday. The ice tray… was empty."], [N2, 2.89, "Somebody put it back. Empty."], [N3, 1.95, "Everyone had a motive."], [N4, 1.37, "So I checked the tape."], [N5, 1.16, "…it was me."]];
  SUBS.forEach(([t0, d, txt]) => { const s = E.el(E.ui, "abs", `left:60px;top:1600px;width:960px;text-align:center;font-family:"Courier New",monospace;font-weight:700;font-size:44px;color:#fff;text-shadow:0 2px 0 #000,0 0 14px #000;opacity:0`, txt); E.K(s, "o", [[t0 - .05, 0], [t0 + .1, 1], [t0 + d + .3, 1], [t0 + d + .45, 0]]); });
  [[N1, "n1"], [N2, "n2"], [N3, "n3"], [N4, "n4"], [N5, "n5"]].forEach(([t, n]) => E.clip(t, `voices/sk22/${n}.wav`, { vol: 1.6 }));
  E.clip(0, "sfx/elx-noir-sax.wav", { vol: .45, duck: true, to: 6 }); E.clip(6, "sfx/elx-noir-sax.wav", { vol: .4, duck: true, to: TAPE - 6 });
  for (let t = 0; t < TAPE; t += 6) E.clip(t, "sfx/elx-rain-window.wav", { vol: .6, to: Math.min(6, TAPE - t), duck: false });
  E.clip(ZOOM + 1.2, "sfx/elx-noir-sax.wav", { vol: .5, from: 0, to: 4 });
  const stampBox = E.el(R, "abs", "left:100px;top:360px;width:880px;display:flex;justify-content:center;z-index:10");
  const st = E.stamp(stampBox, "CASE CLOSED.", STAMP, { size: 110, rot: -6, bg: CORAL, fg: INK, shake: 12 }); st.style.alignSelf = "center";

  // letterbox + title
  E.el(E.ui, "abs", "left:0;top:0;width:1080px;height:150px;background:#000"); E.el(E.ui, "abs", "left:0;top:1770px;width:1080px;height:150px;background:#000");
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Who emptied the *ice tray?*", { size: 60, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, N2 - .1, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
