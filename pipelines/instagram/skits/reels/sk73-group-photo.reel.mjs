// SK.73 "The group photo." — Sunset on the beach. Nina: "Everyone squeeze in! Three, two, one!" Photo #1. Jess: "my eyes are closed!"
// Photo #2: Rico "I have no neck." #3: Leo "I wasn't ready!" #4: Frank "I blinked. Again." Then a burst of retakes up to #14 (Maya:
// "this one's perfect! Wait… my chin."). The gallery: 14 photos, all IDENTICAL. Nina: "Fine. Let's just use the first one." Posted.
// Stamp: WE PICKED THE FIRST ONE.
// Voices: ElevenLabs (Nina: Sarah; Jess: Jessica; Rico: Liam; Leo: Alex; Frank: Bill; Maya: Laura).
export const meta = {
  id: "sk73-group-photo",
  images: { bg: "bg/beach.jpg", group: "cutouts/friends6.webp",
    nina: "cutouts/av_nina.webp", jess: "cutouts/av_jess.webp", rico: "cutouts/av_rico.webp", leo: "cutouts/av_leo.webp", frank: "cutouts/av_frank.webp", maya: "cutouts/av_maya.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const N1 = .4, SH1 = 3.6, J1 = 4.2, SH2 = 8.4, R1 = 8.8, SH3 = 10.6, A1 = 10.9, SH4 = 13.2, F1 = 13.6, BURST = 15.4, M1 = 16.0, N2 = 20.0, POST = 22.4, STAMP = 23.6, DUR = 26.8;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("beach", 0, DUR, "dark"); E.cur = S; const R = S.el;

  // ================= beach at sunset =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bg = E.img(bgBox, "bg", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 50%;filter:brightness(.95) saturate(1.15)");
  E.F(t => { bg.style.transform = `scale(${1.04 + t * .003})`; });
  E.clip(0, "sfx/elx-waves.wav", { vol: .3, to: 8, duck: true }); E.clip(8, "sfx/elx-waves.wav", { vol: .3, to: 8, duck: true }); E.clip(16, "sfx/elx-waves.wav", { vol: .3, to: DUR - 16, duck: true });

  // photo-taking log: [time, count, verdict]
  const SHOTS = [[SH1, 1, "🚫 eyes closed"], [SH2, 2, "🚫 no neck"], [SH3, 3, "🚫 “wasn’t ready”"], [SH4, 4, "🚫 blinked. again."]];
  const BURSTS = []; for (let i = 0; i < 9; i++) BURSTS.push([BURST + i * .55, 5 + i]);      // 5..13
  const ALL = [...SHOTS.map(s => [s[0], s[1]]), ...BURSTS, [M1 + 3.0, 14]];
  const countAt = t => { let n = 0; for (const [k, v] of ALL) if (t >= k) n = v; return n; };
  ALL.forEach(([k]) => { E.clip(k, "sfx/elx-camera-shutter.wav", { vol: .55 }); E.flash(k, "#ffffff", .3, .1); });

  // top chips: count + verdict (motion from frame 0: pulsing count)
  const cnt = E.el(R, "abs", `left:40px;top:360px;padding:10px 24px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:44px;z-index:9;font-variant-numeric:tabular-nums;white-space:nowrap`);
  E.F(t => { const h = `📸 photos taken: ${countAt(t)}`; if (cnt.textContent !== h) cnt.textContent = h; const n = countAt(t); const k = ALL.find(a => a[1] === n); const pulse = k ? Math.max(0, 1 - (t - k[0]) / .25) : 0; cnt.style.transform = `scale(${1 + pulse * .12})`; cnt.style.background = t < SH1 ? "rgba(10,8,12,.85)" : n >= 10 ? "rgba(200,60,40,.92)" : "rgba(10,8,12,.85)"; });
  E.K(cnt, "s", [[0, .7], [.3, 1, "back"]]);
  const verdict = E.el(R, "abs", `left:40px;top:450px;padding:10px 22px;border-radius:16px;background:${CORAL};color:#fff;font-weight:900;font-size:38px;z-index:9;opacity:0;white-space:nowrap`);
  E.F(t => { let v = null; for (const s of SHOTS) if (t >= s[0] + .2) v = s; const lim = t >= BURST - .1 && t < N2 ? "🚫 “now my chin”" : null; const txt = t >= N2 ? "" : t >= M1 + 2.6 ? lim : (v ? v[2] : ""); verdict.style.opacity = txt ? 1 : 0; if (txt && verdict.textContent !== txt) verdict.textContent = txt; });

  // ================= the phone =================
  const PW = 600, PHt = 660;
  const phone = E.el(R, "abs", `left:${(1080 - PW) / 2}px;top:520px;width:${PW}px;height:${PHt}px;border-radius:44px;background:#0b0b0e;border:8px solid #16161a;z-index:6;overflow:hidden;box-shadow:0 26px 60px rgba(0,0,0,.55)`);
  E.K(phone, "s", [[0, .85], [.35, 1, "back"]]);
  const screen = E.el(phone, "abs", `left:0;top:0;width:${PW}px;height:${PHt}px;overflow:hidden`);
  const pbg = E.img(screen, "bg", `position:absolute;left:-260px;top:-360px;width:1080px;height:1920px`);
  const GW = 560, GH = GW * 670 / 1002;
  E.img(screen, "group", `position:absolute;left:${(PW - GW) / 2 - 8}px;top:${PHt - GH - 60}px;width:${GW}px;height:${GH}px`);
  // viewfinder grid + countdown
  const grid = E.el(screen, "abs", "left:0;top:0;width:100%;height:100%;pointer-events:none;background:linear-gradient(90deg,transparent 33%,rgba(255,255,255,.35) 33% 33.4%,transparent 33.4% 66%,rgba(255,255,255,.35) 66% 66.4%,transparent 66.4%),linear-gradient(0deg,transparent 33%,rgba(255,255,255,.35) 33% 33.4%,transparent 33.4% 66%,rgba(255,255,255,.35) 66% 66.4%,transparent 66.4%)");
  const cd = E.el(screen, "abs", "left:0;top:120px;width:100%;text-align:center;font-weight:900;font-size:230px;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.6)");
  E.F(t => { const k = t < SH1 - 1.2 ? "" : t < SH1 - .6 ? "3" : t < SH1 - .2 ? "2" : t < SH1 + .1 ? "1" : ""; cd.textContent = k; cd.style.transform = `scale(${1 + (t % .5) * .1})`; grid.style.opacity = t < SH1 + .2 ? 1 : 0; });
  [SH1 - 1.2, SH1 - .6, SH1 - .2].forEach(k => E.S(k, "tick", .5));
  // shutter flash on the phone itself + red annotations on the photo
  const mark = (t0, t1, cx, cy, w, h, label) => {
    const m = E.el(screen, "abs", `left:${cx - w / 2}px;top:${cy - h / 2}px;width:${w}px;height:${h}px;border:6px solid #ff3b30;border-radius:50%;opacity:0;box-shadow:0 0 18px rgba(255,59,48,.7)`);
    const l = E.el(screen, "abs", `left:${cx - 130}px;top:${cy - h / 2 - 54}px;width:260px;text-align:center;font-weight:900;font-size:34px;color:#fff;background:#ff3b30;border-radius:12px;padding:4px 0;opacity:0`, label);
    [m, l].forEach(e => { E.K(e, "o", [[t0, 0], [t0 + .08, 1], [t1 - .1, 1], [t1, 0]]); E.K(e, "s", [[t0, 1.6], [t0 + .25, 1, "out"]]); });
    E.S(t0, "pop", .4);
  };
  mark(J1 + 1.6, SH2, 490, 250, 90, 90, "eyes closed");
  mark(R1 + .6, SH3, 300, 250, 90, 90, "no neck");
  mark(A1 + .6, SH4, 120, 240, 90, 90, "not ready");
  mark(F1 + .5, BURST, 360, 250, 90, 90, "blinked");
  mark(M1 + 2.4, N2, 400, 240, 80, 80, "chin");
  // a tiny "recording" dot for life
  const dot = E.el(phone, "abs", "right:22px;top:22px;width:22px;height:22px;border-radius:50%;background:#ff3b30;z-index:5");
  E.F(t => dot.style.opacity = t < N2 ? (Math.floor(t * 2) % 2 ? 1 : .2) : 0);

  // ================= the gallery: identical thumbnails =================
  const gal = E.el(R, "abs", "left:40px;top:1610px;width:1000px;display:flex;flex-wrap:wrap;gap:8px;z-index:6");
  const th = [];
  for (let i = 0; i < 14; i++) {
    const c = E.el(gal, "", "position:relative;width:126px;height:132px;border-radius:14px;overflow:hidden;opacity:0;transform:scale(.4);border:4px solid transparent;background:#000");
    const im = E.img(c, "bg", "position:absolute;left:-330px;top:-380px;width:1080px;height:1920px");
    const gr = E.img(c, "group", "position:absolute;left:0;top:64px;width:126px;height:84px");
    E.el(c, "abs", "right:6px;top:4px;font-weight:900;font-size:22px;color:#fff;text-shadow:0 1px 4px #000", String(i + 1));
    th.push(c);
  }
  E.F(t => { th.forEach((c, i) => { const k = ALL.find(a => a[1] === i + 1); const on = k && t >= k[0] + .1; const s = on ? Math.min(1, .4 + (t - k[0] - .1) * 6) : .4; c.style.opacity = on ? 1 : 0; c.style.transform = `scale(${s})`; const pick = t >= N2 + 1.2 && i === 0; const dim = t >= N2 + 1.2 && i !== 0; c.style.borderColor = pick ? GOLD : "transparent"; c.style.filter = dim ? "grayscale(.8) brightness(.55)" : "none"; }); });

  // ================= the six friends =================
  const AV = 150, avs = [["nina", "Nina"], ["jess", "Jess"], ["rico", "Rico"], ["leo", "Leo"], ["frank", "Frank"], ["maya", "Maya"]];
  const SPEAK = { nina: [[N1, SH1 - .1], [N2, POST]], jess: [[J1, J1 + 3.9]], rico: [[R1, R1 + 1.8]], leo: [[A1, A1 + 2.4]], frank: [[F1, F1 + 1.9]], maya: [[M1, M1 + 3.9]] };
  const avEls = avs.map(([k, name], i) => {
    const left = 30 + i * 172;
    const w = E.el(R, "abs", `left:${left}px;top:1300px;width:${AV}px;z-index:7;text-align:center;opacity:0`);
    const c = E.el(w, "", `width:${AV}px;height:${AV}px;border-radius:50%;overflow:hidden;border:6px solid #fff;box-shadow:0 12px 26px rgba(0,0,0,.45)`); E.img(c, k, `width:${AV}px;height:${AV}px`);
    E.el(w, "", `margin-top:6px;font-weight:900;font-size:28px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.8)`, name);
    E.K(w, "o", [[.1 + i * .06, 0], [.2 + i * .06, 1]]); E.K(w, "s", [[.1 + i * .06, .5], [.4 + i * .06, 1, "back"]]);
    return [w, c, SPEAK[k]];
  });
  E.F(t => avEls.forEach(([w, c, sp], i) => { const on = sp.some(([a, b]) => t >= a && t < b); c.style.borderColor = on ? GOLD : "#fff"; w.style.transform = `translateY(${on ? -Math.abs(Math.sin(t * 9)) * 14 : 0}px)`; }));

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 44, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:#fff;border-radius:30px;padding:14px 22px 18px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:#fff;transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  const TOP = 1085;
  bubble("Everyone squeeze in!<br>Three, two, one! 📸", { left: 30, top: TOP, w: 560, tail: 100, t0: N1, t1: SH1 + .3, size: 40 });
  bubble("Wait wait wait. Let me see…<br>my eyes are <b>closed!</b>", { left: 150, top: TOP, w: 720, tail: 190, t0: J1, t1: J1 + 3.9, size: 40 });
  bubble("Delete that.<br>I have <b>no neck.</b>", { left: 280, top: TOP, w: 520, tail: 260, t0: R1, t1: R1 + 1.9 });
  bubble("One more!<br>I wasn’t <b>ready!</b>", { left: 400, top: TOP, w: 500, tail: 340, t0: A1, t1: A1 + 2.4 });
  bubble("I blinked. <b>Again.</b>", { left: 500, top: TOP + 20, w: 470, tail: 340, t0: F1, t1: F1 + 1.9 });
  bubble("Okay, this one’s perfect!<br>Wait… my <b>chin.</b>", { left: 380, top: TOP, w: 640, tail: 520, t0: M1, t1: M1 + 3.9, size: 40 });
  bubble("Fine. Let’s just use<br>the <b>first one.</b>", { left: 30, top: TOP, w: 520, tail: 100, t0: N2, t1: STAMP });
  E.clip(N1 + .05, "voices/sk73/n1.wav", { vol: 1.5 }); E.clip(J1 + .05, "voices/sk73/j1.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk73/r1.wav", { vol: 1.5 });
  E.clip(A1 + .05, "voices/sk73/a1.wav", { vol: 1.5 }); E.clip(F1 + .05, "voices/sk73/f1.wav", { vol: 1.5 }); E.clip(M1 + .05, "voices/sk73/m1.wav", { vol: 1.5 });
  E.clip(N2 + .05, "voices/sk73/n2.wav", { vol: 1.5 });
  E.music({ bpm: 108, root: 60, seed: 73, prog: [[0, 4, 7], [7, 11, 14], [9, 12, 16], [5, 9, 12]], until: N2 });

  // ================= reveal: identical + posted =================
  const ident = E.el(R, "abs", `left:40px;top:450px;padding:10px 22px;border-radius:16px;background:#fff;color:${INK};font-weight:900;font-size:38px;z-index:9;opacity:0;white-space:nowrap`, "🔍 14 photos. 14 identical.");
  E.K(ident, "o", [[N2 - .4, 0], [N2 - .3, 1], [STAMP - .1, 1], [STAMP, 0]]); E.K(ident, "s", [[N2 - .4, .6], [N2 - .1, 1, "back"]]); E.S(N2 - .4, "ding", .45);
  const posted = E.el(R, "abs", `left:640px;top:450px;padding:10px 22px;border-radius:16px;background:#1a9c5b;color:#fff;font-weight:900;font-size:38px;z-index:9;opacity:0;white-space:nowrap`, "✅ posted · ❤️ 212");
  E.K(posted, "o", [[POST, 0], [POST + .1, 1], [STAMP - .1, 1], [STAMP, 0]]); E.K(posted, "s", [[POST, .6], [POST + .3, 1, "back"]]); E.S(POST, "sparkle", .4); E.clip(POST, "sfx/elx-msg-pop.wav", { vol: .5 });
  for (let i = 0; i < 6; i++) {
    const h = E.el(R, "abs", `left:${140 + i * 150}px;top:1560px;font-size:64px;z-index:9;opacity:0`, "❤️");
    const t0 = POST + .1 + i * .18; E.K(h, "o", [[t0, 0], [t0 + .1, 1], [t0 + 1.1, 0]]); E.K(h, "y", [[t0, 0], [t0 + 1.1, -420, "out"]]);
  }

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:700px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "WE PICKED<br>THE FIRST ONE.", STAMP, { size: 92, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "The *group photo.*", { size: 68, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
