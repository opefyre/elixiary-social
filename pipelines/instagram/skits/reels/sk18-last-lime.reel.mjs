// SK.18 "THE LAST LIME" — an epic movie trailer. Deep trailer voice (ElevenLabs, Brian): "In a world… where the party… has just
// begun… there is only… one lime." BRAAM. THIS SUMMER. "Friendships… will be tested." — slow-motion dives across the kitchen,
// the lime spinning in the air. "Trust… no one." "One hero… will rise." — the host holds it aloft, choir, light rays. He
// squeezes it over the glass. Nothing. Not one drop. "…it was dry." THE LAST LIME — Rated PG: Pretty Garnish-dependent.
export const meta = {
  id: "sk18-last-lime",
  images: { friends: "cutouts/friends6.webp", shock: "cutouts/friends5_shock.webp", dive: "cutouts/rico_dive.webp", lunge: "cutouts/maya_lunge.webp", hero: "cutouts/hb_triumph.webp", dry: "cutouts/hb_dry.webp" },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", LIME = "#8bd13f";
  E.episode(-16);
  E.wipeColors = ["#000", GOLD];
  const T1 = .5, PARTY = 2.4, T2 = 5.0, BOWL = 5.1, BRAAM1 = 6.6, CARD = 7.4, T3 = 8.3, T4 = 10.9, T5 = 12.9, SQUEEZE = 15.5, T6 = 16.6, END = 18.0, DUR = 21.2;
  E.music({ bpm: 70, root: 38, seed: 99, prog: [[0, 7, 12], [3, 10, 15], [5, 12, 17], [-2, 5, 10]], until: SQUEEZE });
  const S = E.scene("trailer", 0, DUR, "dark"); E.cur = S; const R = S.el;
  E.el(R, "abs", "left:0;top:0;width:1080px;height:1920px;background:#000");
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
  const eo = u => 1 - Math.pow(1 - u, 3);
  const win = (t, a, b) => t >= a && t < b;
  const shot = (a, b, css = "") => { const el = E.el(R, "abs", `left:0;top:0;width:1080px;height:1920px;overflow:hidden;opacity:0;${css}`); E.F(t => { el.style.opacity = win(t, a, b) ? Math.min(1, seg(t, a, .15), 1 - seg(t, b - .15, .15)) : 0; }); return el; };

  // ================= the kitchen, reused by every shot =================
  const kitchen = (el, tint) => {
    E.el(el, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#f2ede4,#e5dccb)");
    E.el(el, "abs", "left:0;top:620px;width:1080px;height:520px;background-color:#fbfaf6;background-image:linear-gradient(0deg,#d9d4ca 3px,transparent 3px),linear-gradient(90deg,#d9d4ca 3px,transparent 3px),linear-gradient(90deg,#d9d4ca 3px,transparent 3px);background-size:100% 52px,104px 104px,104px 104px;background-position:0 0,0 0,52px 52px");
    [[0, 320], [700, 380]].forEach(([x, w]) => E.el(el, "abs", `left:${x}px;top:300px;width:${w}px;height:300px;background:#6f8f7a;box-shadow:inset 0 0 0 10px #5f7f6a`));
    E.el(el, "abs", "left:0;top:1140px;width:1080px;height:40px;background:linear-gradient(180deg,#e9e6df,#cfcac0)");
    E.el(el, "abs", "left:0;top:1180px;width:1080px;height:740px;background:#6f8f7a;box-shadow:inset 0 0 0 10px #5f7f6a");
    // cinematic grade: teal shadows, orange highlights
    E.el(el, "abs", `left:0;top:0;width:1080px;height:1920px;background:${tint};mix-blend-mode:multiply;pointer-events:none`);
  };
  const GRADE = "linear-gradient(180deg,rgba(20,90,110,.55),rgba(255,140,60,.35))";

  // shot A — the party (friends dancing)
  const A = shot(PARTY, T2);
  kitchen(A, GRADE);
  const FW = 1000, FH = 670 * FW / 1002;
  const fr = E.el(A, "abs", `left:40px;top:${1700 - FH}px;width:${FW}px;height:${FH}px;transform-origin:50% 100%`);
  E.img(fr, "friends", `width:${FW}px;height:${FH}px`);
  E.F(t => { fr.style.transform = `translateY(${-Math.abs(Math.sin(t * 5)) * 16}px) scale(${1 + (t - PARTY) * .02})`; });
  const disco = []; for (let i = 0; i < 16; i++) disco.push(E.el(A, "abs", `left:0;top:0;width:40px;height:40px;border-radius:50%;background:hsl(${i * 45},90%,65%);mix-blend-mode:screen;opacity:.6`));
  E.F(t => disco.forEach((d, i) => { d.style.transform = `translate(${(i * 173 + t * 180) % 1080}px,${400 + (i * 97 + t * 70) % 1100}px)`; }));

  // shot B — the fruit bowl: one lime under a spotlight, the friends turn to look
  const B = shot(BOWL, CARD);
  kitchen(B, "linear-gradient(180deg,rgba(0,0,0,.6),rgba(0,0,0,.45))");
  const spot = E.el(B, "abs", "left:240px;top:0;width:600px;height:1500px;background:linear-gradient(180deg,rgba(255,240,200,.45),rgba(255,240,200,0));clip-path:polygon(40% 0,60% 0,100% 100%,0 100%)");
  const bowl = E.el(B, "abs", "left:340px;top:1260px;width:400px;height:220px");
  bowl.innerHTML = `<svg viewBox="0 0 400 220" width="400" height="220"><ellipse cx="200" cy="70" rx="190" ry="40" fill="#8a5a33"/><path d="M10 70 Q20 210 200 214 Q380 210 390 70 Z" fill="#b07a4a"/><path d="M40 100 Q200 150 360 100" stroke="#8a5a33" stroke-width="6" fill="none"/>` +
    `<ellipse cx="200" cy="66" rx="170" ry="30" fill="#5a3a24"/><ellipse cx="200" cy="54" rx="52" ry="40" fill="${LIME}"/><ellipse cx="184" cy="40" rx="16" ry="10" fill="#d8f59a"/><circle cx="246" cy="52" r="5" fill="#4f8a1c"/></svg>`;
  const lt = E.el(B, "abs", "left:360px;top:1150px;width:360px;height:260px;border-radius:50%;background:radial-gradient(closest-side,rgba(200,255,140,.5),transparent)");
  E.F(t => { bowl.style.transform = `scale(${1 + seg(t, BOWL, 2.3) * .25})`; bowl.style.transformOrigin = "50% 30%"; lt.style.opacity = .6 + .4 * Math.sin(t * 6); });
  const shW = 900, shH = 910 * shW / 1013;
  const sh = E.el(B, "abs", `left:90px;top:${1000 - shH + 300}px;width:${shW}px;height:${shH}px;opacity:0`);
  E.img(sh, "shock", `width:${shW}px;height:${shH}px`);
  E.K(sh, "o", [[BRAAM1 - .1, 0], [BRAAM1, 1]]); E.K(sh, "y", [[BRAAM1, -40], [BRAAM1 + .3, 0, "out"]]);
  E.shake(BRAAM1, 20, .5);

  // shot C — slow-motion: Rico dives from the left, Maya lunges from the right, the lime spins between them
  const C = shot(T3, T4 + .1);
  kitchen(C, GRADE);
  const DW = 820, DH = 429 * DW / 1003;
  const dv = E.el(C, "abs", `left:0;top:840px;width:${DW}px;height:${DH}px`);
  E.img(dv, "dive", `width:${DW}px;height:${DH}px`);
  E.K(dv, "x", [[T3, -560], [T4, -20, "lin"]]); E.K(dv, "y", [[T3, 40], [T4, -30, "lin"]]);
  const LW = 681 * 900 / 980;
  const lg = E.el(C, "abs", `left:${1080 - LW + 200}px;top:${1760 - 900}px;width:${LW}px;height:900px`);
  E.img(lg, "lunge", `width:${LW}px;height:900px`);
  E.K(lg, "x", [[T3, 60], [T4, -260, "lin"]]);
  const flyLime = E.el(C, "abs", "left:500px;top:720px;width:110px;height:92px");
  flyLime.innerHTML = `<svg viewBox="0 0 96 80" width="110" height="92"><ellipse cx="48" cy="40" rx="44" ry="34" fill="${LIME}"/><ellipse cx="34" cy="28" rx="14" ry="8" fill="#d8f59a"/><circle cx="90" cy="40" r="5" fill="#4f8a1c"/></svg>`;
  E.F(t => { flyLime.style.transform = `translate(${Math.sin(t * 2) * 20}px,${-seg(t, T3, 2.6) * 120}px) rotate(${t * 120}deg)`; });
  const streaks = []; for (let i = 0; i < 10; i++) streaks.push(E.el(C, "abs", `left:0;top:${700 + i * 60}px;width:${240 + (i % 3) * 100}px;height:4px;border-radius:2px;background:rgba(255,255,255,.7)`));
  E.F(t => streaks.forEach((s, i) => { s.style.transform = `translateX(${1100 - ((t * 300 + i * 173) % 1500)}px)`; }));

  // shot D — "Trust no one": quick flashes of hands on the lime
  const D = shot(T4, T5);
  E.el(D, "abs", "left:0;top:0;width:1080px;height:1920px;background:#000");
  const flashTxt = ["WHO", "TOOK", "IT?"];
  flashTxt.forEach((w, i) => { const f = E.el(D, "abs", `left:0;top:${860}px;width:1080px;text-align:center;font-weight:800;font-size:150px;letter-spacing:.08em;color:#fff;opacity:0`, w); E.K(f, "o", [[T4 + .2 + i * .5, 0], [T4 + .22 + i * .5, 1], [T4 + .6 + i * .5, 1], [T4 + .62 + i * .5, 0]]); E.S(T4 + .2 + i * .5, "thud", .7); });

  // shot E — the hero rises; shot F — the squeeze
  const Esh = shot(T5, SQUEEZE);
  kitchen(Esh, "linear-gradient(180deg,rgba(255,170,70,.45),rgba(120,50,20,.35))");
  const rays = E.el(Esh, "abs", "left:-260px;top:-60px;width:1600px;height:1600px;border-radius:50%;background:repeating-conic-gradient(rgba(255,230,160,.35) 0 8deg,transparent 8deg 20deg);mix-blend-mode:screen");
  E.F(t => { rays.style.transform = `rotate(${t * 10}deg)`; });
  const HH = 1300, HW = 566 * HH / 1003;
  const hero = E.el(Esh, "abs", `left:${540 - HW / 2}px;top:${1880 - HH}px;width:${HW}px;height:${HH}px;transform-origin:50% 100%`);
  E.img(hero, "hero", `width:${HW}px;height:${HH}px`);
  E.F(t => { hero.style.transform = `scale(${1 + seg(t, T5, 2.6) * .08})`; });
  const glow = E.el(Esh, "abs", "left:250px;top:420px;width:280px;height:280px;border-radius:50%;background:radial-gradient(closest-side,rgba(210,255,150,.9),transparent)");
  E.F(t => { glow.style.opacity = .6 + .4 * Math.sin(t * 5); });
  const F = shot(SQUEEZE, END);
  kitchen(F, "linear-gradient(180deg,rgba(40,40,50,.35),rgba(40,40,50,.35))");
  const dH = 1300, dW = 362 * dH / 1004;
  E.img(E.el(F, "abs", `left:${540 - dW / 2}px;top:${1880 - dH}px;width:${dW}px;height:${dH}px`), "dry", `width:${dW}px;height:${dH}px`);
  const oneDrop = E.el(F, "abs", "left:600px;top:760px;width:14px;height:20px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#d8f59a;opacity:0");
  E.K(oneDrop, "o", [[SQUEEZE + .6, 0], [SQUEEZE + .65, 1], [SQUEEZE + .75, 1], [SQUEEZE + .8, 0]]); E.K(oneDrop, "y", [[SQUEEZE + .6, 0], [SQUEEZE + .8, -30, "out"]]);   // it goes back UP

  // ================= trailer title cards (black, gold type) =================
  const card = (html, a, b, size = 84) => { const el = E.el(R, "abs", `left:0;top:0;width:1080px;height:1920px;background:#000;display:flex;align-items:center;justify-content:center;text-align:center;opacity:0`); E.el(el, "", `font-weight:800;font-size:${size}px;letter-spacing:.14em;line-height:1.2;color:${GOLD};text-shadow:0 0 30px rgba(245,196,81,.35)`, html); E.F(t => { el.style.opacity = win(t, a, b) ? Math.min(1, seg(t, a, .2), 1 - seg(t, b - .2, .2)) : 0; }); E.S(a, "whoosh", .5); return el; };
  card("IN A WORLD…", T1, PARTY);
  card("THIS SUMMER", CARD, T3);
  const endCard = card(`<div style="font-size:40px;letter-spacing:.3em;color:#ddd">A FILM ABOUT A FRUIT</div><div style="font-size:130px;letter-spacing:.06em;margin:24px 0">THE LAST<br>LIME</div><div style="font-size:30px;letter-spacing:.12em;color:#bbb">IN KITCHENS · NEVER</div>`, END, DUR + 1);
  const rating = E.el(R, "abs", `left:140px;top:1500px;width:800px;padding:18px 24px;border:4px solid #fff;display:flex;gap:20px;align-items:center;opacity:0`, `<div style="font-weight:800;font-size:80px;color:#fff;border-right:4px solid #fff;padding-right:20px">PG</div><div style="font-family:Inter;font-size:28px;color:#fff;line-height:1.3">PRETTY GARNISH-DEPENDENT.<br>Contains scenes of intense squeezing.</div>`);
  E.K(rating, "o", [[END + .5, 0], [END + .8, 1]]);

  // letterbox bars over everything, and film grain
  E.el(E.ui, "abs", "left:0;top:0;width:1080px;height:170px;background:#000"); E.el(E.ui, "abs", "left:0;top:1750px;width:1080px;height:170px;background:#000");
  const grain = E.el(E.ui, "abs", "left:-40px;top:-40px;width:1160px;height:2000px;opacity:.07;pointer-events:none;background-image:radial-gradient(#fff 1px,transparent 1.2px);background-size:9px 9px");
  E.F(t => { grain.style.transform = `translate(${(Math.floor(t * 24) * 13) % 30}px,${(Math.floor(t * 24) * 7) % 30}px)`; });
  // subtitles for the narrator
  const SUBS = [[T1, 4.25, "In a world… where the party… has just begun…"], [T2, 2.21, "there is only… one lime."], [T3, 1.96, "Friendships… will be tested."], [T4, 1.53, "Trust… no one."], [T5, 2.06, "One hero… will rise."], [T6, .87, "…it was dry."]];
  SUBS.forEach(([t0, d, txt]) => { const s = E.el(E.ui, "abs", `left:60px;top:1620px;width:960px;text-align:center;font-family:Inter;font-weight:600;font-style:italic;font-size:40px;color:#fff;text-shadow:0 2px 0 #000,0 0 14px #000;opacity:0`, txt); E.K(s, "o", [[t0 - .05, 0], [t0 + .1, 1], [t0 + d + .3, 1], [t0 + d + .45, 0]]); });

  // ================= sound =================
  [[T1, "t1"], [T2, "t2"], [T3, "t3"], [T4, "t4"], [T5, "t5"], [T6, "t6"]].forEach(([t, n]) => E.clip(t, `voices/sk18/${n}.wav`, { vol: 1.5 }));
  [BRAAM1, CARD, T5, END].forEach(t => E.clip(t, "sfx/elx-braam.wav", { vol: .9, duck: false }));
  [PARTY, T3, T4].forEach(t => E.clip(t - .1, "sfx/elx-trailer-whoosh.wav", { vol: .8 }));
  E.clip(PARTY, "sfx/club-bass.wav", { vol: .5, to: T2 - PARTY, duck: false });
  E.clip(T3, "sfx/elx-slowmo.wav", { vol: .9 }); E.clip(T5 + .2, "sfx/angel-choir.wav", { vol: .9 });
  E.clip(SQUEEZE + .2, "sfx/squish.wav", { vol: .8 }); E.clip(SQUEEZE + .05, "sfx/record-silence.wav", { vol: .6 });

  // hook (frame 0) sits over the first card
  const hookBox = E.el(R, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const hook = E.text(hookBox, "A *movie trailer.*", { size: 56, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff" });
  hook.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(hook, PARTY - .3, .2);

  E.finish(DUR);
  E.K(E.logo, "s", [[DUR - .8, 1], [DUR - .55, 1.18, "out"], [DUR - .25, 1, "io"]]);
}
