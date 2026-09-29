// SK.61 "Checking your camera roll the morning after." — 10:14, Nina in bed, phone an inch from her face. Photos · last
// night · 247 items. "Two hundred and forty-seven photos?" 1–38: the ceiling. 39: a selfie with a golden retriever:
// "…Whose dog is this?" 40: a voice note, 03:27, 4 minutes 12, sent to… 💼 WORK TEAM: "I just… I love you guys so much…"
// (Boss: 👍). 41: her, hugging a traffic cone — "KEVIN ❤️ my new bestie". "…Who's Kevin?" She turns. On the other
// pillow, under her duvet, in her sunglasses: Kevin. KEVIN LIVES HERE NOW.  Voices: ElevenLabs (Nina: Sarah).
export const meta = {
  id: "sk61-camera-roll",
  images: { room: "bg/bedroom.jpg", nina: "cutouts/nina_morning.webp", kevin: "cutouts/kevin.webp", dog: "photos/dog_selfie.jpg", cone: "photos/cone_hug.jpg" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", BLUE = "#2f7bf6";
  E.episode(-16);
  const N1 = .8, CEIL = 3.4, DOG = 5.9, N2 = 6.4, VN = 8.6, N3 = 9.4, BOSS = 12.2, CONE = 13.2, N4 = 15.4, TURN = 16.6, STAMP = 18.8, DUR = 22.4;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const S = E.scene("bed", 0, DUR, "light"); E.cur = S; const R = S.el;

  // ================= the bedroom (pans right on the reveal) =================
  const world = E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;overflow:hidden");
  const cam = E.el(world, "abs", "left:0;top:0;width:1080px;height:1920px;transform-origin:50% 50%");
  E.img(cam, "room", "position:absolute;left:0;top:0;width:1080px;height:1920px");
  E.F(t => { const p = seg(t, TURN, .7), e = p * p * (3 - 2 * p); cam.style.transform = `scale(${1.04 + t * .002 + e * .12}) translateX(${-e * 60}px)`; });
  // Nina, and Kevin on the other pillow
  const NH = 900, NW = NH * 491 / 819;
  const nina = E.el(cam, "abs", `left:${330 - NW / 2}px;top:${1660 - NH}px;width:${NW}px;height:${NH}px`);
  const nIn = E.el(nina, "abs", `left:0;top:0;width:${NW}px;height:${NH}px;transform-origin:50% 100%`);
  E.img(nIn, "nina", `width:${NW}px;height:${NH}px`);
  E.F(t => { const turn = seg(t, TURN, .3); nIn.style.transform = `translateY(${Math.sin(t * 1.6) * 3}px) rotate(${turn * 4}deg)`; });
  const KH = 560, KW = KH * 545 / 877;
  const kevin = E.el(cam, "abs", `left:${820 - KW / 2}px;top:${1640 - KH}px;width:${KW}px;height:${KH}px;opacity:0`);
  E.img(kevin, "kevin", `width:${KW}px;height:${KH}px;transform:rotate(-6deg)`);
  E.K(kevin, "o", [[TURN, 0], [TURN + .05, 1]]);
  // the duvet (foreground)
  const duvet = E.el(cam, "abs", "left:-60px;top:1560px;width:1200px;height:560px;filter:drop-shadow(0 -10px 24px rgba(40,30,60,.35))");
  duvet.innerHTML = `<svg viewBox="0 0 1200 560" width="1200" height="560"><path d="M0 120 Q150 40 300 90 Q450 150 600 70 Q760 0 900 90 Q1050 160 1200 80 V560 H0 Z" fill="url(#dv)"/><defs><linearGradient id="dv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f1fa"/><stop offset=".35" stop-color="#ddd6ec"/><stop offset="1" stop-color="#b8aed0"/></linearGradient></defs><path d="M0 170 Q200 110 360 160 Q520 210 700 130 Q880 60 1200 150" stroke="#d4d8e4" stroke-width="10" fill="none"/><path d="M60 300 Q300 240 520 300 Q760 360 1140 280" stroke="#dde1ec" stroke-width="8" fill="none"/></svg>`;
  E.clip(TURN, "sfx/elx-braam.wav", { vol: .7 }); E.S(TURN + .1, "thud", .6);
  const kevTag = E.el(R, "abs", `left:560px;top:880px;padding:10px 22px;border-radius:16px;background:${CORAL};color:#fff;font-weight:900;font-size:42px;z-index:9;opacity:0`, "😎 KEVIN");
  E.K(kevTag, "o", [[TURN + .6, 0], [TURN + .7, 1]]); E.K(kevTag, "s", [[TURN + .6, .5], [TURN + .9, 1, "back"]]); E.S(TURN + .6, "ding", .6);
  const clk = E.el(R, "abs", `left:40px;top:360px;padding:10px 22px;border-radius:16px;background:${INK};color:#fff;font-weight:900;font-size:40px;z-index:8`, "☀️ Sunday · 10:14");

  // ================= the phone =================
  const phW = E.el(R, "abs", "left:520px;top:460px;width:540px;height:960px;z-index:6;transform:scale(.94);transform-origin:50% 0");
  const phone = E.el(phW, "abs", "left:0;top:0;width:540px;height:960px;border-radius:52px;background:#0b0b0e;box-shadow:0 0 0 10px #1d1d22,0 40px 80px rgba(0,0,0,.5);overflow:hidden");
  E.K(phW, "o", [[.3, 0], [.5, 1], [TURN - .2, 1], [TURN, 0]]); E.K(phW, "y", [[.3, 300], [.7, 0, "out"]]);
  const scr = E.el(phone, "abs", "left:12px;top:12px;width:516px;height:936px;border-radius:40px;background:#000;overflow:hidden;font-family:Inter,'Noto Sans',sans-serif");
  // gallery grid
  const grid = E.el(scr, "abs", "left:0;top:0;width:516px;height:936px;background:#fff");
  let cells = ""; for (let i = 0; i < 24; i++) { const l = 20 + ((i * 37) % 30); cells += `<div style="width:170px;height:170px;background:radial-gradient(circle at ${30 + (i * 23) % 50}% ${30 + (i * 41) % 40}%,hsl(${(i * 47) % 360},40%,${l + 20}%),hsl(${(i * 31) % 360},30%,${l}%));filter:blur(${i % 3 ? 2 : 0}px)"></div>`; }
  grid.innerHTML = `<div style="height:150px;padding:56px 24px 0;box-sizing:border-box;font-weight:900;font-size:40px;color:${INK}">Last night<div style="font-weight:700;font-size:26px;color:#889">Saturday · <span style="color:${CORAL}">247 items</span></div></div><div style="display:flex;flex-wrap:wrap;gap:3px">${cells}</div>`;
  const shot = (t0, t1, html) => { const s = E.el(scr, "abs", "left:0;top:0;width:516px;height:936px;background:#000;opacity:0;overflow:hidden", html); E.K(s, "o", [[t0, 0], [t0 + .08, 1], [t1 - .05, 1], [t1, 0]]); E.K(s, "x", [[t0, 200], [t0 + .25, 0, "out"]]); E.S(t0, "swish", .4); return s; };
  const counterTop = (n) => `<div style="position:absolute;left:0;top:50px;width:516px;text-align:center;color:#fff;font-weight:800;font-size:28px;z-index:2">${n} of 247</div>`;
  // 1–38: the ceiling
  const ceil = shot(CEIL, DOG, `<div id="cl" style="position:absolute;left:0;top:0;width:516px;height:936px;background:radial-gradient(circle at 50% 40%,#fff6d0 0,#e8c070 8%,#6a5a50 30%,#2a2420 70%);filter:blur(10px)"></div><div id="cn" style="position:absolute;left:0;top:50px;width:516px;text-align:center;color:#fff;font-weight:800;font-size:28px"></div>`);
  const cl = ceil.querySelector("#cl"), cn = ceil.querySelector("#cn");
  E.F(t => { const n = 1 + Math.floor(37 * seg(t, CEIL, 1.6)); cn.textContent = `${n} of 247 · the ceiling`; cl.style.transform = `rotate(${n * 23}deg) scale(${1 + (n % 4) * .1})`; });
  for (let t = CEIL + .1; t < CEIL + 1.6; t += .09) E.S(t, "tick", .18);
  // 39: the dog
  const dog = shot(DOG, VN, counterTop(39));
  E.img(dog, "dog", "position:absolute;left:-42px;top:168px;width:600px;height:600px");
  // 40: the voice note, sent to the WORK TEAM
  const vn = shot(VN, CONE, "");
  vn.style.background = "#f4f5f9";
  vn.innerHTML = counterTop(40).replace("color:#fff", `color:${INK}`) +
    `<div style="position:absolute;left:0;top:110px;width:516px;height:90px;background:#fff;border-bottom:2px solid #e6e9f0;display:flex;align-items:center;gap:14px;padding:0 20px;box-sizing:border-box"><div style="width:56px;height:56px;border-radius:50%;background:#dfe7ff;display:flex;align-items:center;justify-content:center;font-size:30px">💼</div><div style="font-weight:900;font-size:32px;color:${INK}">Work team <span style="font-weight:600;color:#889;font-size:24px">· 23 people</span></div></div>` +
    `<div style="position:absolute;right:20px;top:260px;width:400px;padding:18px 20px;border-radius:26px;background:${BLUE};color:#fff;box-sizing:border-box"><div style="display:flex;align-items:center;gap:14px"><div style="font-size:40px">▶</div><div id="wave" style="flex:1;height:44px;display:flex;align-items:center;gap:4px"></div></div><div style="font-size:24px;margin-top:8px;opacity:.9">4:12 · sent 03:27 ✓✓</div></div>` +
    `<div id="boss" style="position:absolute;left:20px;top:460px;padding:14px 20px;border-radius:24px;background:#e9ebf1;color:${INK};font-size:56px;font-weight:700;opacity:0"><div style="font-size:26px;color:#c0392b;font-weight:800">Boss</div>👍</div>`;
  const wave = vn.querySelector("#wave"); wave.innerHTML = Array.from({ length: 22 }, (_, i) => `<div class="wb" style="width:6px;border-radius:3px;background:#fff;height:${10 + (i * 37 % 30)}px"></div>`).join("");
  const wbs = [...wave.querySelectorAll(".wb")], boss = vn.querySelector("#boss");
  E.F(t => { if (t >= N3 && t < N3 + 2.6) wbs.forEach((w, i) => { w.style.height = `${8 + Math.abs(Math.sin(t * 14 + i)) * 36}px`; }); boss.style.opacity = t >= BOSS ? 1 : 0; });
  E.clip(BOSS, "sfx/elx-msg-pop.wav", { vol: .7 });
  // 41: Kevin
  const cone = shot(CONE, TURN, counterTop(41));
  E.img(cone, "cone", "position:absolute;left:-42px;top:168px;width:600px;height:600px");
  E.el(cone, "abs", "left:0;top:620px;width:516px;text-align:center;font-family:'Pacifico','Noto Sans',cursive;font-size:54px;color:#fff;text-shadow:0 3px 0 #ff3d7f,0 6px 14px rgba(0,0,0,.5);transform:rotate(-6deg)", "KEVIN ❤️<br><span style='font-size:36px'>my new bestie</span>");
  E.clip(CONE + .2, "sfx/elx-camera-shutter.wav", { vol: .5 });
  // captions under the phone
  const chip = (html, t0, t1, top, bg = "rgba(20,35,29,.9)") => { const c = E.el(R, "abs", `left:40px;top:${top}px;padding:10px 22px;border-radius:16px;background:${bg};color:#fff;font-weight:900;font-size:36px;z-index:8;opacity:0;white-space:nowrap`, html); E.K(c, "o", [[t0, 0], [t0 + .1, 1], [t1 - .1, 1], [t1, 0]]); E.K(c, "s", [[t0, .6], [t0 + .3, 1, "back"]]); E.S(t0, "pop", .35); };
  chip("🐕 not your dog", DOG + .5, VN, 450);
  chip("🎙️ sent to: 💼 WORK TEAM", VN + .4, CONE, 450, CORAL);
  chip("🚧 who is Kevin", CONE + .5, TURN, 450);

  // ================= bubbles & voices =================
  const bubble = (html, o) => {
    const { left, top, w: bw, tail, t0, t1, size = 48, italic = false, dark = false } = o;
    const b = E.el(R, "abs", `left:${left}px;top:${top}px;width:${bw}px;z-index:10;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${dark ? "#1b2330" : "#fff"};border-radius:30px;padding:16px 24px 20px;box-shadow:0 14px 34px rgba(0,0,0,.3);font-weight:800;font-size:${size}px;line-height:1.08;letter-spacing:-.02em;color:${dark ? "#fff" : INK};text-align:center;${italic ? "font-style:italic;" : ""}`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${dark ? "#1b2330" : "#fff"};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .4);
  };
  bubble("Two hundred and<br>forty-seven photos?!", { left: 40, top: 540, w: 470, tail: 240, t0: N1, t1: CEIL + 1.4, size: 44, italic: true });
  bubble("…Whose dog<br>is this?", { left: 40, top: 560, w: 440, tail: 240, t0: N2, t1: VN - .1, italic: true });
  bubble("🎙️ “I just… I love<br>you guys so much…”", { left: 40, top: 1430, w: 520, tail: 400, t0: N3, t1: BOSS + .8, size: 40, dark: true, italic: true });
  bubble("…Who’s Kevin?", { left: 40, top: 560, w: 440, tail: 240, t0: N4, t1: TURN + 1.4, italic: true });
  E.clip(N1 + .05, "voices/sk61/n1.wav", { vol: 1.5 }); E.clip(N2 + .05, "voices/sk61/n2.wav", { vol: 1.5 }); E.clip(N3 + .05, "voices/sk61/n3.wav", { vol: 1.3 }); E.clip(N4 + .05, "voices/sk61/n4.wav", { vol: 1.6 });
  E.music({ bpm: 88, root: 62, seed: 61, prog: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]], until: TURN });

  // ================= stamp + title =================
  const stampBox = E.el(R, "abs", "left:0;top:1640px;width:1080px;display:flex;flex-direction:column;z-index:11");
  const st = E.stamp(stampBox, "KEVIN LIVES HERE NOW.", STAMP, { size: 80, rot: -5, bg: GOLD, fg: INK, shake: 10, css: "white-space:nowrap" }); st.style.alignSelf = "center";
  const titleBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:9");
  const title = E.text(titleBox, "The *camera roll,* next morning.", { size: 54, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.6)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, DOG, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
