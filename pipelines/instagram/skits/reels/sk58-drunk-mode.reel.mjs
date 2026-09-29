// SK.58 "Texting at 2 AM." — 02:07, the sofa, one glass too many. Rico: "She misses me. I know it." He types "hey u up? 🥺"
// to Ex 💔 — SEND — and a tiny bouncer pops out of the phone, velvet rope and all: "Not tonight, mate." 🚫. "Fine. I'll just
// call her." — "Line's closed." 📵. "Just one… little like." (her beach photo, 2019) — the bouncer DIVES across the screen:
// "Absolutely not!" 09:40, daylight. 🛡️ DRUNK MODE: last night I blocked 3 texts, 1 call, 1 like (2019). You're welcome 🫡.
// "…Oh, thank god." DING-DONG. "Six large pizzas for Rico?" (ordered 03:12, €94). 🛡️ "I only block exes." "…Six?"
// BLOCKED THE EX. NOT THE PIZZA.  Voices: ElevenLabs (Rico: Liam; bouncer Sal: Chris; delivery: Will).
export const meta = {
  id: "sk58-drunk-mode",
  images: { room: "bg/night.jpg", drunk: "cutouts/rico_drunk.webp", relief: "cutouts/rico_relief.webp", shock: "cutouts/rico_shock.webp", bouncer: "cutouts/sal_bouncer.webp", pizza: "cutouts/pizza_guy.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", BLUE = "#2f7bf6";
  E.episode(-16);
  const R1 = .6, TYPE = 2.5, SEND = 4.0, B1 = 4.3, R2 = 5.9, CALL = 7.1, B2 = 7.5, R3 = 9.0, LIKE = 10.9, B3 = 11.3, MORN = 13.4, NOTE = 13.9, R4 = 15.6, BELL = 17.0, P1 = 17.6, R5 = 19.6, NOTE2 = 20.4, STAMP = 21.6, DUR = 24.6;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("room", 0, DUR, "dark"); E.cur = S; const R = S.el;

  // ================= the room: night → morning =================
  const bg = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const bgI = E.img(bg, "room", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 60%");
  E.F(t => { bgI.style.transform = `scale(${1.04 + t * .003})`; bgI.style.filter = t >= MORN ? "brightness(1.55) saturate(1.1) hue-rotate(-12deg)" : "none"; });
  const sunBeam = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:1;pointer-events:none;opacity:0;background:linear-gradient(200deg,rgba(255,220,150,.55),rgba(255,220,150,0) 60%)");
  E.K(sunBeam, "o", [[MORN, 0], [MORN + .2, 1]]);
  E.wipeColors = [INK, GOLD]; E.wipe(MORN);
  const clk = E.el(R, "abs", `left:40px;top:360px;padding:10px 22px;border-radius:16px;background:rgba(10,12,24,.85);color:#fff;font-weight:900;font-size:40px;z-index:8;font-variant-numeric:tabular-nums`);
  E.F(t => { const h = t >= MORN ? "☀️ 09:40" : `🌙 02:${String(7 + Math.floor(t / 3)).padStart(2, "0")}`; if (clk.textContent !== h) clk.textContent = h; });

  // ================= Rico =================
  const RH = 1000;
  const rico = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;z-index:3");
  const rIn = E.el(rico, "abs", "left:0;top:0;width:1080px;height:1920px");
  const POSE = { drunk: [686, 994, 300], relief: [684, 999, 300], shock: [863, 1155, 300] };
  const rEls = Object.fromEntries(Object.entries(POSE).map(([n, [w, h, cx]]) => [n, E.img(rIn, n, `position:absolute;left:${cx - RH * w / h / 2}px;top:${1970 - RH}px;width:${RH * w / h}px;height:${RH}px`)]));
  E.F(t => {
    const f = t >= R5 - .1 ? "shock" : t >= MORN ? "relief" : "drunk";
    for (const n in rEls) rEls[n].style.opacity = n === f ? 1 : 0;
    const sway = t < MORN ? Math.sin(t * 1.6) * 3 : 0;
    rIn.style.transform = `rotate(${sway}deg) translateY(${Math.sin(t * 2) * 4}px)`; rIn.style.transformOrigin = "300px 1900px";
  });

  // ================= the phone =================
  const phW = E.el(R, "abs", "left:500px;top:470px;width:540px;height:900px;z-index:6;transform:scale(.92);transform-origin:50% 0");
  const phone = E.el(phW, "abs", "left:0;top:0;width:540px;height:900px;border-radius:52px;background:#0b0b0e;box-shadow:0 0 0 10px #1d1d22,0 40px 80px rgba(0,0,0,.6);overflow:hidden");
  E.K(phW, "o", [[R1 + .6, 0], [R1 + .8, 1], [MORN - .2, 1], [MORN, 0]]); E.K(phW, "y", [[R1 + .6, 300], [R1 + 1.0, 0, "out"]]);
  const scr = E.el(phone, "abs", "left:12px;top:12px;width:516px;height:876px;border-radius:40px;background:#f4f5f9;overflow:hidden;font-family:Inter,'Noto Sans',sans-serif");
  // screen 1: the chat
  const chat = E.el(scr, "abs", "left:0;top:0;width:516px;height:876px");
  chat.innerHTML = `<div style="height:120px;background:#fff;border-bottom:2px solid #e6e9f0;display:flex;align-items:flex-end;padding:0 24px 16px;box-sizing:border-box;gap:14px"><div style="width:56px;height:56px;border-radius:50%;background:#ffd0dc;display:flex;align-items:center;justify-content:center;font-size:30px">💔</div><div style="font-weight:900;font-size:34px;color:${INK}">Ex</div></div>` +
    `<div style="text-align:center;color:#99a;font-size:22px;margin-top:22px">14 March 2019</div><div style="margin:14px 20px;display:inline-block;padding:14px 20px;border-radius:24px;background:#e9ebf1;font-size:30px;color:${INK}">ok.</div>`;
  const typed = E.el(chat, "abs", `right:20px;top:300px;padding:14px 22px;border-radius:24px;background:${BLUE};color:#fff;font-size:34px;font-weight:700;opacity:0`);
  const blocked = E.el(chat, "abs", `left:0;top:400px;width:516px;text-align:center;font-weight:900;font-size:30px;color:${CORAL};opacity:0`, "🚫 BLOCKED BY DRUNK MODE");
  const input = E.el(chat, "abs", `left:16px;bottom:24px;width:484px;height:78px;border-radius:40px;background:#fff;border:2px solid #dde;display:flex;align-items:center;padding:0 22px;box-sizing:border-box;font-size:32px;color:${INK}`);
  const sendB = E.el(chat, "abs", `right:26px;bottom:34px;width:58px;height:58px;border-radius:50%;background:${BLUE};color:#fff;display:flex;align-items:center;justify-content:center;font-size:30px`, "➤");
  const MSG = "hey u up? 🥺";
  E.F(t => { const n = t < SEND ? Math.floor(seg(t, TYPE, 1.3) * [...MSG].length) : 0; const v = [...MSG].slice(0, n).join("") + (t >= TYPE && t < SEND && Math.floor(t * 4) % 2 ? "|" : ""); if (input.textContent !== v) input.textContent = v; typed.textContent = MSG; typed.style.opacity = t >= SEND ? 1 : 0; typed.style.textDecoration = t >= B1 ? "line-through" : "none"; typed.style.background = t >= B1 ? "#b8bcc8" : BLUE; blocked.style.opacity = t >= B1 ? 1 : 0; sendB.style.transform = t >= SEND - .1 && t < SEND + .1 ? "scale(.8)" : "none"; });
  for (let t = TYPE; t < TYPE + 1.3; t += .12) E.S(t, "tick", .25);
  E.clip(SEND, "sfx/elx-msg-pop.wav", { vol: .6 });
  // screen 2: the call
  const call = E.el(scr, "abs", `left:0;top:0;width:516px;height:876px;background:linear-gradient(180deg,#2b3350,#141826);color:#fff;text-align:center;opacity:0`);
  call.innerHTML = `<div style="margin-top:150px;width:160px;height:160px;border-radius:50%;background:#ffd0dc;display:inline-flex;align-items:center;justify-content:center;font-size:80px">💔</div><div style="font-weight:900;font-size:48px;margin-top:24px">Ex</div><div id="cst" style="font-size:30px;margin-top:10px;color:#aab">calling…</div>`;
  const cst = call.querySelector("#cst");
  E.K(call, "o", [[CALL, 0], [CALL + .1, 1], [R3 + .8, 1], [R3 + .9, 0]]);
  E.F(t => { const h = t >= B2 ? `<span style="color:${CORAL};font-weight:900;font-size:36px">📵 LINE CLOSED</span>` : "calling…"; if (cst.innerHTML !== h) cst.innerHTML = h; });
  E.clip(CALL, "sfx/elx-phone-ring.wav", { vol: .4, to: B2 - CALL });
  // screen 3: the 2019 photo
  const insta = E.el(scr, "abs", "left:0;top:0;width:516px;height:876px;background:#fff;opacity:0");
  insta.innerHTML = `<div style="height:110px;display:flex;align-items:flex-end;padding:0 22px 14px;box-sizing:border-box;font-weight:900;font-size:30px;color:${INK}">💔 ex · <span style="color:#99a;font-weight:600;margin-left:8px">July 2019</span></div>` +
    `<div style="height:516px;background:linear-gradient(180deg,#ffb36a,#ff7a6a 48%,#4ac0d8 49%,#2a8ab0);position:relative"><div style="position:absolute;left:190px;top:90px;width:130px;height:130px;border-radius:50%;background:#ffe08a"></div><div style="position:absolute;left:0;bottom:0;width:516px;text-align:center;font-size:120px">🏖️</div></div>` +
    `<div style="padding:18px 22px;font-size:60px" id="heart">🤍</div><div style="padding:0 22px;color:#99a;font-size:26px">312 weeks ago</div>`;
  const heart = insta.querySelector("#heart");
  E.K(insta, "o", [[R3 + .8, 0], [R3 + .9, 1], [MORN - .2, 1]]);
  const thumb = E.el(scr, "abs", "left:60px;top:800px;width:90px;height:90px;border-radius:50%;background:rgba(200,160,130,.85);box-shadow:0 6px 16px rgba(0,0,0,.3);opacity:0;z-index:3");
  E.K(thumb, "o", [[LIKE - .6, 0], [LIKE - .5, 1], [B3 + .2, 1], [B3 + .4, 0]]); E.K(thumb, "y", [[LIKE - .6, 200], [LIKE + .3, -150, "out"], [B3 + .1, -150], [B3 + .4, 400, "in"]]);
  // ================= the bouncer =================
  const bouncer = E.el(R, "abs", "left:600px;top:1020px;width:380px;height:696px;z-index:7;opacity:0");
  const bIn = E.el(bouncer, "abs", "left:0;top:0;width:380px;height:696px;transform-origin:50% 100%");
  E.img(bIn, "bouncer", "width:380px;height:696px");
  E.K(bouncer, "o", [[B1 - .1, 0], [B1, 1], [B2 + 1.2, 1], [B2 + 1.3, 0], [B3 - .1, 0], [B3, 1], [MORN - .1, 1], [MORN, 0]]);
  E.K(bouncer, "y", [[B1 - .1, 400], [B1 + .25, 0, "back"], [B3 - .1, 0], [B3 + .4, -330, "out"], [MORN - .3, -330]]);
  E.K(bouncer, "x", [[0, 0], [B3 - .15, 0], [B3 - .1, 600], [B3 + .4, 20, "out"]]);
  E.F(t => { bIn.style.transform = t >= B3 && t < MORN ? "rotate(-70deg)" : "none"; });
  E.S(B1, "thud", .8); E.S(B2, "slam", .7); E.S(B3, "whoosh", .8); E.S(B3 + .35, "crack", .6); E.shake(B3 + .35, 12, .3);
  // the velvet rope over the phone
  const rope = E.el(R, "abs", "left:480px;top:1180px;width:580px;height:200px;z-index:6;opacity:0");
  rope.innerHTML = `<svg viewBox="0 0 580 200" width="580" height="200"><rect x="30" y="40" width="22" height="160" rx="8" fill="#d4a93a"/><circle cx="41" cy="36" r="18" fill="#f0c860"/><rect x="528" y="40" width="22" height="160" rx="8" fill="#d4a93a"/><circle cx="539" cy="36" r="18" fill="#f0c860"/><path d="M50 60 Q290 170 530 60" stroke="#b01030" stroke-width="22" fill="none" stroke-linecap="round"/></svg>`;
  E.K(rope, "o", [[B1, 0], [B1 + .1, 1], [MORN - .1, 1], [MORN, 0]]); E.K(rope, "y", [[B1, -300], [B1 + .3, 0, "out"]]);

  // ================= morning =================
  const note = (t0, t1, html, top) => {
    const n = E.el(R, "abs", `left:60px;top:${top}px;width:960px;padding:22px 28px;border-radius:30px;background:rgba(255,255,255,.96);box-shadow:0 18px 40px rgba(0,0,0,.3);z-index:9;opacity:0;font-family:Inter,'Noto Sans',sans-serif;color:${INK}`, html);
    E.K(n, "o", [[t0, 0], [t0 + .15, 1], [t1 - .15, 1], [t1, 0]]); E.K(n, "y", [[t0, -60], [t0 + .35, 0, "out"]]); E.clip(t0, "sfx/elx-phone-buzz.wav", { vol: .6 });
    return n;
  };
  note(NOTE, BELL + .2, `<div style="font-weight:900;font-size:30px;color:#667">🛡️ DRUNK MODE · 09:40</div><div style="font-weight:800;font-size:38px;line-height:1.25;margin-top:8px">Last night I blocked:<br>• 3 texts to Ex 💔<br>• 1 call<br>• 1 like (a photo from 2019)<br>You’re welcome. 🫡</div>`, 460);
  const pizza = E.el(R, "abs", "left:620px;top:960px;width:450px;height:681px;z-index:4;opacity:0");
  const pIn = E.el(pizza, "abs", "left:0;top:0;width:450px;height:681px;transform-origin:50% 100%");
  E.img(pIn, "pizza", "width:450px;height:681px");
  E.K(pizza, "o", [[P1 - .3, 0], [P1 - .2, 1]]); E.K(pizza, "x", [[P1 - .3, 500], [P1 + .1, 0, "out"]]);
  E.F(t => { pIn.style.transform = t > P1 ? `rotate(${Math.sin(t * 3) * 2}deg)` : "none"; });
  E.clip(BELL, "sfx/doorbell.wav", { vol: .8 });
  const bill = E.el(R, "abs", `left:560px;top:1660px;white-space:nowrap;padding:10px 20px;border-radius:14px;background:${GOLD};color:${INK};font-weight:900;font-size:34px;z-index:8;opacity:0`, "🍕 ×6 · ordered 03:12 · €94");
  E.K(bill, "o", [[P1 + 1.2, 0], [P1 + 1.3, 1]]); E.S(P1 + 1.2, "ding", .5);
  note(NOTE2, DUR, `<div style="font-weight:900;font-size:30px;color:#667">🛡️ DRUNK MODE</div><div style="font-weight:800;font-size:42px;margin-top:8px">I only block exes. 🍕</div>`, 460);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.4);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("She misses me.<br>I know it. 🥺", { left: 40, top: 700, w: 440, tail: 230, t0: R1, t1: SEND });
  bubble("Not tonight,<br>mate.", { left: 560, top: 860, w: 380, tail: 250, t0: B1, t1: R2, dark: true });
  bubble("Fine. I’ll just<br>call her. 😤", { left: 40, top: 700, w: 440, tail: 230, t0: R2, t1: B2 });
  bubble("Line’s closed.", { left: 560, top: 880, w: 380, tail: 250, t0: B2, t1: R3, dark: true });
  bubble("Just one…<br>little like. 🤏", { left: 40, top: 700, w: 420, tail: 230, t0: R3, t1: B3 });
  bubble("ABSOLUTELY<br>NOT!", { left: 40, top: 700, w: 420, tail: 380, t0: B3, t1: MORN - .1, dark: true, size: 56 });
  bubble("…Oh, thank god.", { left: 40, top: 860, w: 480, tail: 250, t0: R4, t1: BELL });
  bubble("Six large pizzas<br>for Rico? 🍕", { left: 540, top: 780, w: 480, tail: 320, t0: P1, t1: R5 });
  bubble("…Six?", { left: 120, top: 700, w: 280, tail: 150, t0: R5, t1: DUR, italic: true, size: 60 });
  E.clip(R1 + .05, "voices/sk58/r1.wav", { vol: 1.5 }); E.clip(B1 + .05, "voices/sk58/b1.wav", { vol: 1.6 }); E.clip(R2 + .05, "voices/sk58/r2.wav", { vol: 1.5 }); E.clip(B2 + .05, "voices/sk58/b2.wav", { vol: 1.6 });
  E.clip(R3 + .05, "voices/sk58/r3.wav", { vol: 1.5 }); E.clip(B3 + .05, "voices/sk58/b3.wav", { vol: 1.6 }); E.clip(R4 + .05, "voices/sk58/r4.wav", { vol: 1.5 }); E.clip(P1 + .05, "voices/sk58/p1.wav", { vol: 1.5 }); E.clip(R5 + .05, "voices/sk58/r5.wav", { vol: 1.6 });
  E.music({ bpm: 76, root: 57, seed: 58, prog: [[0, 3, 7], [5, 8, 12], [3, 7, 10], [7, 10, 14]], until: MORN });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1440px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "BLOCKED THE EX.<br>NOT THE PIZZA.", STAMP, { size: 76, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap;text-align:center" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "Texting at *2 AM.*", { size: 68, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, B1, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
