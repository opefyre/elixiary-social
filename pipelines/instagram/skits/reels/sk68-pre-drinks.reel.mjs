// SK.68 "The pre-drinks." — 20:00, Nina: "Quick drink at mine before we go out?" The best night of the year happens in her
// living room: 20:30 "one quick drink", 21:45 karaoke into a hairbrush, 22:50 the group toast, 23:40 pizza. 00:40, Rico:
// "Right! Let's GO OUT!" 01:10: the queue, in the rain. The bouncer: "Forty minutes." €20 entry. 01:52: inside at last —
// the lights come on. "Last song, everybody!" Time inside: 8 minutes. 02:10, walking home, soaked, eating chips: "…We
// should've stayed at yours." THE PRE-DRINKS WERE THE PARTY.
// Voices: ElevenLabs (Nina: Sarah; Rico: Liam; bouncer Sal: Chris; DJ: Brian).
export const meta = {
  id: "sk68-pre-drinks",
  images: { home: "bg/night.jpg", street: "bg/queue.jpg", club: "bg/club.jpg", cheer: "cutouts/split_cheer.webp", kar: "cutouts/kar_sing.webp", toast: "cutouts/cheers_up.webp",
    go: "cutouts/friend_point.webp", queue: "cutouts/queue4.webp", bouncer: "cutouts/sal_bouncer.webp", walk: "cutouts/walkhome4.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const N1 = .5, M1 = 2.3, M2 = 4.2, M3 = 6.1, M4 = 8.0, R1 = 9.3, QUEUE = 11.0, B1 = 12.0, CLUB = 15.4, D1 = 15.9, WALK = 18.6, N2 = 19.4, STAMP = 21.0, DUR = 24.4;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("night", 0, DUR, "dark"); E.cur = S; const R = S.el;
  const phase = t => t >= WALK ? 3 : t >= CLUB ? 2 : t >= QUEUE ? 1 : 0;

  // ================= backgrounds =================
  const BGS = [["home", "brightness(1.35) saturate(1.2)"], ["street", "none"], ["club", "brightness(1.5) saturate(.35)"], ["street", "brightness(.8) saturate(.8)"]].map(([img, f], i) => {
    const b = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden;opacity:0");
    const im = E.img(b, img, `position:absolute;left:0;top:0;width:1080px;height:1920px;filter:${f};transform-origin:50% 55%`); return [b, im];
  });
  E.F(t => { const p = phase(t); BGS.forEach(([b, im], i) => { b.style.opacity = i === p ? 1 : 0; if (i === p) im.style.transform = `scale(${1.04 + (t % 6) * .006})`; }); });
  [QUEUE, CLUB, WALK].forEach(k => { E.wipe(k); E.clip(k - .3, "sfx/elx-trailer-whoosh.wav", { vol: .35 }); });
  // party lights at home, rain outside
  const party = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:1;pointer-events:none;mix-blend-mode:screen");
  E.F(t => { if (t < QUEUE) { const h = (t * 90) % 360; party.style.background = `radial-gradient(ellipse at ${50 + Math.sin(t * 1.7) * 30}% 40%,hsla(${h},85%,60%,.28),transparent 55%),radial-gradient(ellipse at ${50 - Math.sin(t * 1.3) * 30}% 75%,hsla(${(h + 140) % 360},85%,60%,.22),transparent 50%)`; } else party.style.background = "none"; });
  const rain = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:7;pointer-events:none;opacity:0");
  rain.innerHTML = `<svg viewBox="0 0 1080 1920" width="1080" height="1920">${Array.from({ length: 90 }, (_, i) => `<line class="rd" x1="${(i * 71) % 1080}" y1="0" x2="${(i * 71) % 1080 - 14}" y2="60" stroke="rgba(200,220,255,.55)" stroke-width="3"/>`).join("")}</svg>`;
  const rds = [...rain.querySelectorAll(".rd")];
  E.F(t => { const on = phase(t) === 1 || phase(t) === 3; rain.style.opacity = on ? 1 : 0; if (!on) return; rds.forEach((d, i) => { const y = ((t * 1900 + i * 211) % 2000) - 60; d.setAttribute("transform", `translate(0 ${y})`); }); });
  E.clip(QUEUE, "sfx/rain-heavy.wav", { vol: .35, to: CLUB - QUEUE }); E.clip(WALK, "sfx/rain-heavy.wav", { vol: .3, to: DUR - WALK });
  // the clock
  const clk = E.el(R, "abs", `left:40px;top:360px;padding:10px 24px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:44px;z-index:9;font-variant-numeric:tabular-nums`);
  const TIMES = [[0, "20:00"], [M1, "20:30"], [M2, "21:45"], [M3, "22:50"], [M4, "23:40"], [R1, "00:40"], [QUEUE, "01:10"], [CLUB, "01:52"], [WALK, "02:10"]];
  E.F(t => { let h = TIMES[0][1]; for (const [k, v] of TIMES) if (t >= k) h = v; h = `🕘 ${h}`; if (clk.textContent !== h) clk.textContent = h; });
  TIMES.slice(1).forEach(([k]) => E.S(k, "tick", .5));
  const chip = (html, t0, t1, top, bg = "rgba(255,255,255,.95)", fg = INK) => { const c = E.el(R, "abs", `left:40px;top:${top}px;padding:10px 20px;border-radius:16px;background:${bg};color:${fg};font-weight:900;font-size:38px;z-index:9;opacity:0;white-space:nowrap`, html); E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .3, 1, "back"]]); E.S(t0, "pop", .35); };

  // ================= the living room montage =================
  const card = (img, w, h, H, cx, bottom, t0, t1, cap, z = 3) => {
    const W = H * w / h;
    const c = E.el(R, "abs", `left:${cx - W / 2}px;top:${bottom - H}px;width:${W}px;height:${H}px;z-index:${z};opacity:0`);
    const cIn = E.el(c, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`);
    E.img(cIn, img, `width:${W}px;height:${H}px`);
    E.K(c, "o", [[t0 - .05, 0], [t0 + .05, 1], [t1 - .05, 1], [t1, 0]]); E.K(c, "s", [[t0 - .05, 1.12], [t0 + .3, 1, "out"]]);
    E.F(t => { if (t >= t0 && t < t1) cIn.style.transform = `translateY(${-Math.abs(Math.sin(t * 6)) * 16}px) rotate(${Math.sin(t * 3) * 1.5}deg)`; });
    if (cap) chip(cap, t0 + .2, t1, 450);
    E.S(t0, "whoosh", .35);
  };
  card("cheer", 1024, 515, 540, 540, 1900, M1, M2, "🍹 “just one quick drink”");
  card("kar", 878, 1098, 1000, 540, 1990, M2, M3, "🎤 karaoke into a hairbrush");
  card("toast", 1024, 625, 620, 540, 1900, M3, M4, "💃 best night of the year");
  card("cheer", 1024, 515, 540, 540, 1900, M4, R1, "🍕 pizza #2 ordered");
  card("go", 861, 1124, 1000, 540, 1990, R1, QUEUE, "");
  const text = E.el(R, "abs", `left:60px;top:560px;width:960px;padding:22px 28px;border-radius:30px;background:rgba(255,255,255,.96);box-shadow:0 18px 40px rgba(0,0,0,.3);z-index:9;opacity:0;color:${INK}`,
    `<div style="font-weight:900;font-size:28px;color:#667">💬 Nina · 19:58</div><div style="font-weight:800;font-size:44px;margin-top:6px">Quick drink at mine before we go out? 🍸</div>`);
  E.K(text, "o", [[N1, 0], [N1 + .15, 1], [M1 - .1, 1], [M1, 0]]); E.K(text, "y", [[N1, -60], [N1 + .35, 0, "out"]]); E.clip(N1, "sfx/elx-phone-buzz.wav", { vol: .6 });
  E.clip(M1, "sfx/elx-party-music.wav", { vol: .3, to: 6, duck: true }); E.clip(M1 + 6, "sfx/elx-party-music.wav", { vol: .3, to: QUEUE - M1 - 6, duck: true });

  // ================= the queue =================
  const QH = 700, QW = QH * 1014 / 675;
  const queue = E.el(R, "abs", `left:${420 - QW / 2}px;top:${1990 - QH}px;width:${QW}px;height:${QH}px;z-index:4;opacity:0`);
  const qIn = E.el(queue, "abs", `left:0;top:0;width:${QW}px;height:${QH}px`);
  E.img(qIn, "queue", `width:${QW}px;height:${QH}px`);
  E.F(t => { const p = phase(t); queue.style.opacity = p === 1 || p === 2 ? 1 : 0; qIn.style.transform = p === 1 ? `translateX(${Math.sin(t * 60) * 2}px)` : `translateY(${p === 2 ? 60 : 0}px)`; });
  const BH = 820, BW = BH * 543 / 994;
  const bouncer = E.el(R, "abs", `left:${900 - BW / 2}px;top:${1500 - BH}px;width:${BW}px;height:${BH}px;z-index:3;opacity:0`);
  E.img(bouncer, "bouncer", `width:${BW}px;height:${BH}px`);
  E.K(bouncer, "o", [[QUEUE, 0], [QUEUE + .1, 1], [CLUB - .1, 1], [CLUB, 0]]);
  chip("🌧️ queue: 40 minutes", B1 + 1.0, CLUB, 450);
  chip("💸 entry: €20 each", B1 + 1.8, CLUB, 526);
  chip("⏱ time inside: 8 minutes", D1 + 1.4, WALK, 450, CORAL, "#fff");
  E.clip(CLUB, "sfx/record-silence.wav", { vol: .6 });
  const houseLights = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:2;pointer-events:none;background:rgba(255,250,235,.38);opacity:0");
  E.K(houseLights, "o", [[CLUB, 0], [CLUB + .1, 1], [WALK - .1, 1], [WALK, 0]]);
  chip("💡 lights: ON", CLUB + .3, WALK, 526); E.flash(CLUB, "#ffffff", .5, .15); E.S(CLUB + .1, "buzz", .4);

  // ================= walking home =================
  const WH = 760, WW = WH * 1014 / 679;
  const walk = E.el(R, "abs", `left:${540 - WW / 2}px;top:${1990 - WH}px;width:${WW}px;height:${WH}px;z-index:4;opacity:0`);
  const wIn = E.el(walk, "abs", `left:0;top:0;width:${WW}px;height:${WH}px`);
  E.img(wIn, "walk", `width:${WW}px;height:${WH}px`);
  E.K(walk, "o", [[WALK, 0], [WALK + .1, 1]]);
  E.F(t => { if (t >= WALK) wIn.style.transform = `translate(${(t - WALK) * -14}px,${-Math.abs(Math.sin(t * 4)) * 8}px)`; });

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 50, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Right! Let’s<br>GO OUT! 🎉", { left: 520, top: 760, w: 440, tail: 120, t0: R1, t1: QUEUE, size: 56 });
  bubble("Forty minutes.", { left: 500, top: 560, w: 420, tail: 330, t0: B1, t1: CLUB, dark: true });
  bubble("🎤 Last song,<br>everybody!", { left: 300, top: 620, w: 480, tail: 240, t0: D1, t1: WALK, dark: true });
  bubble("…We should’ve<br>stayed at yours.", { left: 60, top: 960, w: 480, tail: 170, t0: N2, t1: DUR, italic: true });
  E.clip(N1 + .2, "voices/sk68/n1.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk68/r1.wav", { vol: 1.5 }); E.clip(B1 + .05, "voices/sk68/b1.wav", { vol: 1.6 });
  E.clip(D1 + .05, "voices/sk68/d1.wav", { vol: 1.5 }); E.clip(N2 + .05, "voices/sk68/n2.wav", { vol: 1.6 });
  E.music({ bpm: 112, root: 62, seed: 68, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: QUEUE });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:640px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "THE PRE-DRINKS<br>WERE THE PARTY.", STAMP, { size: 78, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "“Quick *pre-drinks*”", { size: 66, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
