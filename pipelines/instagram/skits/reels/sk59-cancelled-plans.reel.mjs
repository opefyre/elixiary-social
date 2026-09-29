// SK.59 "When someone cancels first." (the "staying in > going out" trend) — Friday 18:02, the group chat: Nina: "Tonight 9 PM
// at Sal's! Table booked 🍸". Everyone is secretly praying: Rico is typing… (deleted). Nina is typing… (deleted). Then Jess:
// "Guys… I'm so sorry. I can't make it tonight 😢". The replies land in 0.4 seconds: "Nooo! Totally fine!!", "Next time,
// babe! 💔", "Actually I'm exhausted too 😅". Plan cancelled. REALITY: Jess — face mask, wine, pyjamas: "Yesss." Nina —
// blanket, popcorn: "Freedom!" Rico — bathrobe, cat: "PYJAMAS!" 21:00 at Sal's: Alex, shirt ironed, alone. "…Guys?" Sal:
// "Table for four, was it?" Alex's phone: 94 unread messages. READ THE GROUP CHAT.
// Voices: ElevenLabs (Jess: Jessica; Nina: Sarah; Rico: Liam; Alex; Sal: Chris).
export const meta = {
  id: "sk59-cancelled-plans",
  images: { av_nina: "cutouts/av_nina.webp", av_rico: "cutouts/av_rico.webp", av_jess: "cutouts/av_jess.webp", jpj: "cutouts/jess_pj.webp", npop: "cutouts/nina_popcorn.webp", robe: "cutouts/rico_robe.webp",
    bar: "bg/speakeasy.jpg", alex: "cutouts/guy_smile.webp", stare: "cutouts/guy_stare.webp", sal: "cutouts/salc_wait.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", BLUE = "#2f7bf6";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  const M0 = .5, TY1 = 1.8, TY2 = 3.0, J1 = 4.2, FAST = 8.2, N1 = 8.3, R1 = 10.6, HOME = 12.0, P1 = 12.3, P2 = 13.9, P3 = 15.5, BAR = 17.4, A1 = 18.6, S1 = 19.8, BUZZ = 21.2, STAMP = 22.3, DUR = 25.4;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const bubble = (Pn, html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false } = o;
    const b = E.el(Pn, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.35);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };

  // ================= scene 1: the group chat =================
  const A = E.scene("chat", 0, HOME, "light"); E.cur = A; const P = A.el;
  E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#eef1f6,#dfe4ec)");
  const clk = E.el(P, "abs", `left:40px;top:360px;padding:8px 20px;border-radius:14px;background:${INK};color:#fff;font-weight:900;font-size:36px;z-index:5`, "🗓️ Friday · 18:02");
  E.K(clk, "o", [[.2, 0], [.35, 1]]);
  const chat = E.el(P, "abs", "left:40px;top:450px;width:1000px;height:1000px;border-radius:34px;background:#fff;box-shadow:0 18px 40px rgba(20,35,60,.15);overflow:hidden");
  E.K(chat, "y", [[0, 60], [.45, 0, "out"]]); E.K(chat, "o", [[0, 0], [.2, 1]]);
  const hdr = E.el(chat, "abs", "left:0;top:0;width:1000px;height:90px;z-index:2;background:#f7f8fb;border-bottom:2px solid #e6e9f0;display:flex;align-items:center;gap:16px;padding:0 26px;box-sizing:border-box");
  E.el(hdr, "", `width:56px;height:56px;border-radius:50%;background:${GOLD};display:flex;align-items:center;justify-content:center;font-size:30px`, "🍸");
  E.el(hdr, "", `font-weight:900;font-size:34px;color:${INK}`, "Friday drinks 🍸 <span style='font-weight:600;color:#889;font-size:26px'>· Nina, Rico, Jess, Alex</span>");
  const list = E.el(chat, "abs", "left:0;top:100px;width:1000px;padding:0 22px;box-sizing:border-box");
  const COL = { Nina: "#2f7bf6", Rico: "#16a085", Jess: "#c0392b" };
  const MSGS = [["Nina", "av_nina", "Tonight 9 PM at Sal’s! Table booked 🍸🎉", M0], ["Jess", "av_jess", "Guys… I’m so sorry 😢 I can’t make it tonight", J1],
    ["Nina", "av_nina", "Nooo! Totally fine!! 🥺", FAST], ["Rico", "av_rico", "Next time, babe! 💔", FAST + .15], ["Nina", "av_nina", "Actually I’m exhausted too 😅", FAST + .3], ["Rico", "av_rico", "Same honestly", FAST + .45]];
  MSGS.forEach(([who, img, txt, t0]) => {
    const row = E.el(list, "", "display:flex;align-items:flex-end;gap:14px;margin-top:18px;opacity:0");
    const av = E.el(row, "", "width:80px;height:80px;border-radius:50%;overflow:hidden;background:#e6e9f0;flex:none");
    E.img(av, img, "width:80px;height:80px");
    const bub = E.el(row, "", "padding:12px 20px 14px;border-radius:26px 26px 26px 8px;background:#e9ebf1;max-width:800px");
    E.el(bub, "", `font-weight:800;font-size:28px;color:${COL[who]}`, who);
    E.el(bub, "", `font-weight:700;font-size:44px;color:${INK};line-height:1.15`, txt);
    E.K(row, "o", [[t0, 0], [t0 + .1, 1]]); E.K(row, "x", [[t0, -40], [t0 + .25, 0, "out"]]);
    E.clip(t0, "sfx/elx-msg-pop.wav", { vol: .6 });
  });
  // typing… then deleted
  const typing = E.el(chat, "abs", `left:26px;top:940px;font-size:34px;color:#889;font-style:italic;font-weight:700`);
  E.F(t => { let h = ""; if (t >= TY1 && t < TY1 + 1.0) h = "Rico is typing…"; else if (t >= TY1 + 1.0 && t < TY2) h = "<span style='color:#c33'>Rico deleted a draft</span>"; else if (t >= TY2 && t < TY2 + .9) h = "Nina is typing…"; else if (t >= TY2 + .9 && t < J1) h = "<span style='color:#c33'>Nina deleted a draft</span>"; else if (t >= J1 - .8 && t < J1) h = "Jess is typing…"; if (typing.innerHTML !== h) typing.innerHTML = h; });
  const draft = (t0, txt, top) => { const d = E.el(P, "abs", `left:80px;top:${top}px;padding:10px 22px;border-radius:18px;background:#fff3f0;border:3px dashed ${CORAL};color:${INK};font-weight:800;font-size:34px;z-index:6;opacity:0`, `✏️ <s>${txt}</s>`); E.K(d, "o", [[t0, 0], [t0 + .1, 1], [t0 + 1.0, 1], [t0 + 1.15, 0]]); E.S(t0 + .7, "nope", .4); };
  draft(TY1, "hey guys, I’m feeling a bit…", 1480); draft(TY2, "so sorry, my cat is sick…", 1480);
  // the relief meter
  const relief = E.el(P, "abs", `left:40px;top:1560px;width:1000px;padding:20px 26px;border-radius:26px;background:${INK};color:#fff;z-index:5;opacity:0`);
  relief.innerHTML = `<div style="font-weight:900;font-size:32px">😮‍💨 group relief</div><div style="margin-top:12px;height:34px;border-radius:17px;background:#2c3b34;overflow:hidden"><div id="bar" style="height:34px;width:0;background:linear-gradient(90deg,${GOLD},#8ee3a8)"></div></div>`;
  const rb = relief.querySelector("#bar");
  E.K(relief, "o", [[J1 + 1.0, 0], [J1 + 1.2, 1]]);
  E.F(t => { const p = seg(t, FAST, 1.0); rb.style.width = `${4 + p * 96}%`; });
  const done = E.el(P, "abs", `left:0;top:1720px;width:1080px;text-align:center;z-index:6;opacity:0`, `<span style="display:inline-block;padding:10px 26px;border-radius:18px;background:${CORAL};color:#fff;font-weight:900;font-size:42px">❌ plan cancelled in 0.4 s</span>`);
  E.K(done, "o", [[FAST + .8, 0], [FAST + .9, 1]]); E.S(FAST + .8, "ding", .7);
  E.clip(J1 + .05, "voices/sk59/j1.wav", { vol: 1.5 }); E.clip(N1 + .05, "voices/sk59/n1.wav", { vol: 1.5 }); E.clip(R1 + .05, "voices/sk59/r1.wav", { vol: 1.5 });
  E.music({ bpm: 100, root: 60, seed: 59, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]], until: BAR });

  // ================= scene 2: reality — three living rooms =================
  const B = E.scene("home", HOME, BAR, "light"); E.cur = B; const Q = B.el;
  E.wipe(HOME); E.clip(HOME - .3, "sfx/elx-trailer-whoosh.wav", { vol: .45 });
  E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:#f3e9dc");
  const PAN = [["jpj", 482, 1003, P1, "🧖‍♀️ Jess · 21:00", "linear-gradient(180deg,#f6d8e6,#e8bcd2)", "Yesss. 🍷", "voices/sk59/j2.wav"],
    ["npop", 677, 784, P2, "🍿 Nina · 21:00", "linear-gradient(180deg,#d6e8d0,#b8d4b0)", "Freedom! 🙌", "voices/sk59/n2.wav"],
    ["robe", 555, 926, P3, "🐈 Rico · 21:00", "linear-gradient(180deg,#d4def0,#b4c4e0)", "PYJAMAS!", "voices/sk59/r2.wav"]];
  PAN.forEach(([img, w, h, t0, cap, bg, line, voice], i) => {
    const top = 350 + i * 520;
    const pane = E.el(Q, "abs", `left:40px;top:${top}px;width:1000px;height:500px;border-radius:30px;overflow:hidden;background:${bg};box-shadow:0 14px 30px rgba(0,0,0,.18);opacity:0`);
    E.K(pane, "o", [[t0 - .1, 0], [t0, 1]]); E.K(pane, "x", [[t0 - .1, i % 2 ? 300 : -300], [t0 + .25, 0, "out"]]); E.S(t0, "whoosh", .4);
    const H = 480, W = H * w / h;
    const ch = E.el(pane, "abs", `left:${310 - W / 2}px;top:${510 - H}px;width:${W}px;height:${H}px`);
    const cIn = E.el(ch, "abs", `left:0;top:0;width:${W}px;height:${H}px;transform-origin:50% 100%`);
    E.img(cIn, img, `width:${W}px;height:${H}px`);
    E.F(t => { cIn.style.transform = t >= t0 ? `translateY(${-Math.abs(Math.sin((t - t0) * 5)) * 14}px) rotate(${Math.sin((t - t0) * 5) * 3}deg)` : "none"; });
    E.el(pane, "abs", `left:560px;top:30px;padding:8px 18px;border-radius:14px;background:rgba(20,35,29,.85);color:#fff;font-weight:900;font-size:30px`, cap);
    const b = E.el(pane, "abs", `left:560px;top:190px;width:400px;text-align:center;padding:16px 20px;border-radius:26px;background:#fff;font-weight:900;font-size:54px;color:${INK};box-shadow:0 10px 24px rgba(0,0,0,.2);opacity:0`, line);
    E.K(b, "o", [[t0 + .15, 0], [t0 + .25, 1]]); E.K(b, "s", [[t0 + .15, .5], [t0 + .45, 1, "back"]]);
    E.clip(t0 + .2, voice, { vol: 1.5 });
  });

  // ================= scene 3: Alex at Sal's =================
  const C = E.scene("bar", BAR, DUR, "dark"); E.cur = C; const X = C.el;
  E.wipe(BAR);
  const bg = E.el(X, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "bar", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 60%");
  E.F(t => { bgI.style.transform = `scale(${1.04 + (t - BAR) * .004})`; });
  const SH = 860, SW = SH * 754 / 1104;
  const sal = E.el(X, "abs", `left:${760 - SW / 2}px;top:${1330 - SH}px;width:${SW}px;height:${SH}px;z-index:2`);
  E.img(sal, "sal", `width:${SW}px;height:${SH}px`);
  E.el(X, "abs", "left:-20px;top:1300px;width:1120px;height:120px;z-index:3;background:linear-gradient(180deg,rgba(40,40,44,0),rgba(30,28,32,.85) 40%,rgba(22,20,24,.95))");
  const card = E.el(X, "abs", `left:640px;top:1250px;padding:10px 20px;border-radius:10px;background:#fffbe8;color:#8a5a1a;font-family:Georgia,serif;font-weight:700;font-size:34px;z-index:4;transform:rotate(-3deg)`, "RESERVED · 4 🍸");
  const AH = 900;
  const alex = E.el(X, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:5");
  const aE = { alex: [821, 1122], stare: [873, 1030] };
  const aEls = Object.fromEntries(Object.entries(aE).map(([n, [w, h]]) => [n, E.img(alex, n, `position:absolute;left:${280 - AH * w / h / 2}px;top:${1980 - AH}px;width:${AH * w / h}px;height:${AH}px`)]));
  E.F(t => { const f = t >= A1 - .1 ? "stare" : "alex"; for (const n in aEls) aEls[n].style.opacity = n === f ? 1 : 0; });
  E.K(alex, "x", [[BAR, -500], [BAR + .5, 0, "out"]]);
  const tag = E.el(X, "abs", `left:40px;top:360px;padding:10px 22px;border-radius:16px;background:rgba(10,8,12,.85);color:#fff;font-weight:900;font-size:36px;z-index:8;opacity:0`, `🕘 21:00 · Alex <span style="color:${GOLD}">(shirt: ironed)</span>`);
  E.K(tag, "o", [[BAR + .3, 0], [BAR + .45, 1]]);
  const unread = E.el(X, "abs", `left:40px;top:450px;width:500px;box-sizing:border-box;padding:18px 24px;border-radius:26px;background:rgba(255,255,255,.96);box-shadow:0 14px 34px rgba(0,0,0,.4);z-index:9;opacity:0;color:${INK}`, `<div style="font-weight:900;font-size:28px;color:#667">🍸 Friday drinks · 94 unread</div><div style="font-weight:800;font-size:34px;margin-top:6px">Jess: “Guys… I’m so sorry 😢”<br><span style="color:#99a;font-size:26px">3 hours ago</span></div>`);
  E.K(unread, "o", [[BUZZ, 0], [BUZZ + .15, 1]]); E.K(unread, "y", [[BUZZ, -60], [BUZZ + .35, 0, "out"]]); E.clip(BUZZ, "sfx/elx-phone-buzz.wav", { vol: .7 });
  bubble(X, "…Guys?", { left: 80, top: 960, w: 300, tail: 180, t0: A1, t1: DUR, italic: true, size: 56 });
  bubble(X, "Table for four,<br>was it?", { left: 560, top: 380, w: 440, tail: 220, t0: S1, t1: DUR, dark: true, italic: true });
  E.clip(A1 + .05, "voices/sk59/a1.wav", { vol: 1.6 }); E.clip(S1 + .05, "voices/sk59/s1.wav", { vol: 1.6 });
  for (let t = BAR; t < DUR; t += 6) E.clip(t, "sfx/elx-lounge.wav", { vol: .16, to: Math.min(6, DUR - t), duck: true });

  // ================= stamp + title =================
  const stampBox = E.el(X, "abs", "left:0;top:1560px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "READ THE GROUP CHAT.", STAMP, { size: 80, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  E.cur = A;
  const titleBox = E.el(P, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "When someone *cancels first.*", { size: 54, lh: 1.04, instant: true, id: "hook", nowrap: true, color: INK });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
