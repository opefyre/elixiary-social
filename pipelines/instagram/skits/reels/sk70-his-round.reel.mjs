// SK.70 "When it's his round." — The pub scoreboard: Mia buys a round, Joe buys a round, Mia again… "Dan… it's your round."
// Dan: "Oh! Just nipping to the loo!" (Dan in the loo: 14 min 37 s.) Mia buys another. "Dan. It's your round, mate." "Sorry,
// gotta take this… Hello? Yeah?" (his phone: not ringing.) Joe buys another. "Dan? Your round." "Hang on… shoelace." (his
// shoes: slip-ons.) The bell: bar closed. Dan: "Right! Next round's on me!" EVERY GROUP HAS A DAN.
// Voices: ElevenLabs (Mia: Sarah; Joe: Liam; Dan: Callum).
export const meta = {
  id: "sk70-his-round",
  images: { bg: "bg/pub.jpg", bored: "cutouts/pals_bored.webp", reach: "cutouts/pals_reach.webp",
    loo: "cutouts/dan_loo.webp", phone: "cutouts/dan_phone.webp", shoe: "cutouts/dan_shoe.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const RD1 = .3, RD2 = 1.2, RD3 = 2.1, N1 = 3.1, D1 = 5.2, OFF = 6.3, RD4 = 7.8, BACK = 9.0, J1 = 9.2, D2 = 11.2, RD5 = 14.4,
    N2 = 14.7, D3 = 16.8, RD6 = 18.8, BELL = 19.3, D4 = 20.3, STAMP = 22.7, DUR = 25.6;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("pub", 0, DUR, "dark"); E.cur = S; const R = S.el;

  // ================= the pub =================
  const bgBox = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bg = E.img(bgBox, "bg", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 60%;filter:brightness(1.2) saturate(1.1)");
  E.F(t => { bg.style.transform = `scale(${1.04 + t * .003})`; bg.style.filter = t >= BELL && t < STAMP ? "brightness(1.6) saturate(.5)" : "brightness(1.2) saturate(1.1)"; });
  E.clip(0, "sfx/elx-pub-chatter.wav", { vol: .2, to: 6, duck: false }); E.clip(6, "sfx/elx-pub-chatter.wav", { vol: .2, to: 6, duck: false });
  E.clip(12, "sfx/elx-pub-chatter.wav", { vol: .2, to: BELL - 12, duck: false });

  // the clock
  const clk = E.el(R, "abs", `left:40px;top:360px;padding:10px 24px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:44px;z-index:9;font-variant-numeric:tabular-nums`);
  const TIMES = [[0, "20:10"], [RD2, "20:45"], [RD3, "21:20"], [RD4, "22:05"], [RD5, "22:50"], [RD6, "23:35"], [BELL, "23:59"]];
  E.F(t => { let h = TIMES[0][1]; for (const [k, v] of TIMES) if (t >= k) h = v; h = `🕘 ${h}`; if (clk.textContent !== h) clk.textContent = h; });

  // ================= the scoreboard =================
  const board = E.el(R, "abs", `left:40px;top:450px;width:560px;padding:20px 26px;border-radius:26px;background:rgba(20,14,8,.9);box-shadow:0 18px 40px rgba(0,0,0,.4);color:#fff;z-index:9`);
  E.K(board, "s", [[0, .7], [.35, 1, "back"]]); E.K(board, "o", [[0, 0], [.1, 1], [STAMP - .2, 1], [STAMP, 0]]);
  E.el(board, "", `font-weight:900;font-size:30px;letter-spacing:.12em;color:${GOLD};margin-bottom:6px`, "🍺 ROUNDS BOUGHT");
  const ROUNDS = [[RD1, 0], [RD2, 1], [RD3, 0], [RD4, 0], [RD5, 1], [RD6, 1]];
  const rowEl = ["Mia", "Joe", "Dan"].map(n => {
    const r = E.el(board, "", "display:flex;align-items:center;justify-content:space-between;margin-top:8px;font-weight:900;font-size:40px");
    E.el(r, "", "", n); return E.el(r, "", "font-size:38px;white-space:nowrap", "");
  });
  E.F(t => {
    [0, 1].forEach(i => { const c = ROUNDS.filter(([k, w]) => w === i && t >= k).length; const h = "🍺".repeat(c) + ` <span style="color:${GOLD}">${c}</span>`; if (rowEl[i].innerHTML !== h) rowEl[i].innerHTML = h; });
    const pulse = Math.floor(t * 3) % 2; rowEl[2].innerHTML = `<span style="color:${CORAL};opacity:${pulse ? 1 : .55}">0</span>`;
  });
  ROUNDS.forEach(([k]) => { E.clip(k, "sfx/elx-chaching.wav", { vol: .22 }); E.S(k + .05, "pop", .3); });
  const buyer = (name, t0, t1) => { const c = E.el(R, "abs", `left:40px;top:730px;padding:10px 20px;border-radius:16px;background:rgba(255,255,255,.95);color:${INK};font-weight:900;font-size:36px;z-index:9;opacity:0;white-space:nowrap`, `💳 ${name} gets this one`); E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .3, 1, "back"]]); };
  buyer("Mia", RD1, RD2); buyer("Joe", RD2, RD3); buyer("Mia", RD3, N1); buyer("Mia… again", RD4, BACK); buyer("Joe… again", RD5, N2); buyer("Joe… AGAIN", RD6, BELL);

  // ================= Mia & Joe =================
  const PH = 560, PW = PH * 953 / 647, QH = PH * 588 / 647, QW = QH * 938 / 588;
  const pals = E.el(R, "abs", `left:-60px;top:${1900 - PH}px;width:${PW}px;height:${PH}px;z-index:4`);
  const bored = E.img(pals, "bored", `position:absolute;left:0;top:0;width:${PW}px;height:${PH}px`);
  const reach = E.img(pals, "reach", `position:absolute;left:${(PW - QW) / 2}px;top:${PH - QH}px;width:${QW}px;height:${QH}px;opacity:0`);
  const ASKS = [[N1, D1], [J1, D2], [N2, D3]];
  E.F(t => { const r = ASKS.some(([a, b]) => t >= a && t < b + .3) || (t >= D4 && t < STAMP); reach.style.opacity = r ? 1 : 0; bored.style.opacity = r ? 0 : 1; pals.style.transform = `translateY(${Math.sin(t * 1.2) * 4}px)`; });

  // ================= Dan =================
  const DH = 820, dims = { loo: [237, 654], phone: [252, 660], shoe: [238, 459] };
  const dan = E.el(R, "abs", `left:0;top:0;width:400px;height:${DH}px;z-index:5`);
  const dIn = E.el(dan, "abs", `left:0;top:0;width:400px;height:${DH}px;transform-origin:50% 100%`);
  const poses = Object.fromEntries(Object.entries(dims).map(([k, [w, h]]) => { const H = DH * h / 654, W = H * w / h; return [k, E.img(dIn, k, `position:absolute;left:${200 - W / 2}px;top:${DH - H}px;width:${W}px;height:${H}px;opacity:0`)]; }));
  const poseAt = t => t < OFF ? "loo" : t < BACK ? "loo" : t < D2 ? "loo" : t < D3 ? "phone" : t < BELL ? "shoe" : "loo";
  const xAt = t => t < OFF ? 740 : t < BACK ? 740 + 700 * seg(t, OFF, .6) : t < BELL ? 1440 - 700 * seg(t, BACK, .5) : 740;
  E.F(t => {
    const p = poseAt(t); Object.entries(poses).forEach(([k, im]) => im.style.opacity = k === p ? 1 : 0);
    dan.style.left = `${xAt(t) - 200}px`; dan.style.top = `${1905 - DH}px`;
    const walking = (t > OFF && t < OFF + .6) || (t > BACK && t < BACK + .5);
    const flip = t > BACK && t < BACK + .5 ? -1 : 1;
    const hop = t >= D4 && t < D4 + .5 ? Math.sin(seg(t, D4, .5) * Math.PI) * 30 : 0;
    dIn.style.transform = `translateY(${-(walking ? Math.abs(Math.sin(t * 14)) * 14 : Math.sin(t * 1.6) * 3) - hop}px) scaleX(${flip})`;
  });
  E.clip(OFF, "sfx/elx-trailer-whoosh.wav", { vol: .3 }); E.S(BACK, "swish", .35); E.S(D4, "sparkle", .35);

  // ================= the evidence chips =================
  const chip = (html, t0, t1, top, left = 620, bg = "rgba(255,255,255,.95)", fg = INK, size = 36) => { const c = E.el(R, "abs", `left:${left}px;top:${top}px;padding:10px 20px;border-radius:16px;background:${bg};color:${fg};font-weight:900;font-size:${size}px;z-index:9;opacity:0;white-space:nowrap`, html); E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .3, 1, "back"]]); E.S(t0, "pop", .35); return c; };
  const loo = chip("", OFF + .6, BACK, 810, 40, CORAL, "#fff", 38);
  E.F(t => { if (t < OFF + .6 || t > BACK) return; const s = Math.floor(seg(t, OFF + .6, 1.6) * 877); const h = `🚻 Dan in the loo: ${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; if (loo.textContent !== h) loo.textContent = h; });
  for (let t = OFF + .6; t < OFF + 2.2; t += .2) E.S(t, "tick", .25);
  chip("📱 his phone: not ringing", D2 + 1.6, RD5 + .3, 810, 40, CORAL, "#fff", 38);
  chip("👟 his shoes: slip-ons", D3 + 1.1, BELL, 810, 40, CORAL, "#fff", 38);
  chip("🔔 BAR CLOSED", BELL, STAMP, 810, 40, INK, "#fff", 44);
  E.clip(BELL, "sfx/elx-pub-bell.wav", { vol: .8 }); E.shake(BELL, 6, .3);
  // the phone screen, zoomed: home screen, no call
  const scr = E.el(R, "abs", `left:810px;top:600px;width:220px;height:400px;border-radius:34px;background:linear-gradient(160deg,#6a7cff,#b06aff);border:8px solid #111;z-index:10;opacity:0;box-shadow:0 18px 40px rgba(0,0,0,.45);overflow:hidden`);
  scr.innerHTML = `<div style="color:#fff;font-weight:800;font-size:44px;text-align:center;margin-top:30px">21:58</div><div style="display:flex;flex-wrap:wrap;justify-content:center;gap:14px;padding:30px 16px;font-size:36px">${["📷","💬","🎵","🗺️","☀️","📧","🎮","📅","⚙️"].map(e => `<span style="width:46px;text-align:center">${e}</span>`).join("")}</div><div style="position:absolute;left:0;right:0;bottom:18px;text-align:center;color:#fff;font-weight:800;font-size:22px">no calls</div>`;
  E.K(scr, "o", [[D2 + 1.6, 0], [D2 + 1.7, 1], [RD5 + .2, 1], [RD5 + .3, 0]]); E.K(scr, "s", [[D2 + 1.6, .4], [D2 + 1.9, 1, "back"]]);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:#fff;border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:#fff;transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Dan… it’s <b>your</b> round.", { left: 60, top: 1110, w: 520, tail: 200, t0: N1, t1: D1 + .1 });
  bubble("Oh! Just nipping<br>to the loo! 🚻", { left: 420, top: 860, w: 480, tail: 320, t0: D1, t1: OFF + .3 });
  bubble("Dan. It’s your<br>round, mate.", { left: 60, top: 1080, w: 460, tail: 330, t0: J1, t1: D2 + .1 });
  bubble("Sorry, gotta take this…<br>Hello? Yeah? 📱", { left: 200, top: 880, w: 560, tail: 500, t0: D2, t1: RD5 + .2, size: 42 });
  bubble("Dan? Your round.", { left: 60, top: 1140, w: 440, tail: 200, t0: N2, t1: D3 + .1 });
  bubble("Hang on…<br>shoelace. 👟", { left: 420, top: 1070, w: 400, tail: 320, t0: D3, t1: BELL });
  bubble("Right! Next round’s<br>on <b>me!</b> 🍻", { left: 380, top: 860, w: 560, tail: 360, t0: D4, t1: STAMP });
  E.clip(N1 + .05, "voices/sk70/n1.wav", { vol: 1.5 }); E.clip(D1 + .05, "voices/sk70/d1.wav", { vol: 1.5 }); E.clip(J1 + .05, "voices/sk70/r1.wav", { vol: 1.5 });
  E.clip(D2 + .05, "voices/sk70/d2.wav", { vol: 1.5 }); E.clip(N2 + .05, "voices/sk70/n2.wav", { vol: 1.5 }); E.clip(D3 + .05, "voices/sk70/d3.wav", { vol: 1.5 });
  E.clip(D4 + .05, "voices/sk70/d4.wav", { vol: 1.5 });
  E.music({ bpm: 104, root: 60, seed: 70, prog: [[0, 4, 7], [7, 11, 14], [9, 12, 16], [5, 9, 12]], until: BELL });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:640px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "EVERY GROUP<br>HAS A DAN.", STAMP, { size: 96, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "When it’s *his* round.", { size: 66, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
