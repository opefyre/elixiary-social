// SK.8 "Who's bringing what?" — the whole setup plays on a phone: a party group chat. The host asks who's bringing what.
// Wine. Wine. Wine too. Both kinds of wine. Wine. A long "typing…" — "wine." FOOD: 0 · WINE: 6. "…and food??" Seen by 6.
// Cut to the party: a table buried in wine bottles and one sad bowl of crisps, the friends staring at it. Rico walks in
// proudly: "I brought ice!" — one cube. ICE: 1 CUBE.
// Chat UI drawn in code (generic app, no brand). Avatars cropped from the recurring six-friends image. Voice: Liam (ElevenLabs).
export const meta = {
  id: "sk8-bringing-what",
  images: {
    av_maya: "cutouts/av_maya.webp", av_leo: "cutouts/av_leo.webp", av_rico: "cutouts/av_rico.webp", av_jess: "cutouts/av_jess.webp",
    av_frank: "cutouts/av_frank.webp", av_nina: "cutouts/av_nina.webp",
    table: "cutouts/wine_table.webp", shock: "cutouts/friends5_shock.webp", rico: "cutouts/tropic_ice.webp",
  },
};

export default function (E) {
  const INK = "#14231d", GOLD = "#F5C451", CORAL = "#ff6b57", GREEN = "#d9fdd3";
  E.episode(-16);
  E.wipeColors = [INK, GOLD];
  E.music({ bpm: 112, root: 60, seed: 57, prog: [[0, 4, 7], [5, 9, 12], [9, 12, 16], [7, 11, 14]] });
  const DUR = 18.2, WIPE = 11.7;
  const S1 = E.scene("chat", 0, WIPE, "light"); E.cur = S1;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const ease = u => 1 - Math.pow(1 - clamp(u, 0, 1), 3);
  const P = S1.el;

  // ================= backdrop: a blurred living room behind the phone =================
  E.el(P, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#3b2a3f,#5a3d4a 50%,#2e2233)");
  const bok = []; for (let i = 0; i < 18; i++) bok.push(E.el(P, "abs", `left:${(i * 173) % 1080 - 60}px;top:${(i * 97) % 1800}px;width:${120 + (i % 4) * 60}px;height:${120 + (i % 4) * 60}px;border-radius:50%;background:radial-gradient(circle,${["rgba(255,196,120,.35)", "rgba(255,120,160,.25)", "rgba(140,200,255,.22)"][i % 3]},transparent 70%);filter:blur(6px)`));
  E.F(t => bok.forEach((b, i) => { b.style.transform = `translate(${Math.sin(t * .5 + i) * 30}px,${Math.cos(t * .4 + i * 2) * 24}px)`; }));

  // ================= the phone =================
  const PX = 70, PY = 360, PW = 940, PH = 1440;
  const phone = E.el(P, "abs", `left:${PX}px;top:${PY}px;width:${PW}px;height:${PH}px;border-radius:78px;background:#111;box-shadow:0 40px 80px rgba(0,0,0,.55),inset 0 0 0 3px #3a3a3a`);
  const scr = E.el(phone, "abs", `left:18px;top:18px;width:${PW - 36}px;height:${PH - 36}px;border-radius:62px;overflow:hidden;background:#efe7de`);
  const SW = PW - 36, SH = PH - 36;
  // wallpaper doodles
  const wp = E.el(scr, "abs", `left:0;top:0;width:${SW}px;height:${SH}px;opacity:.08`);
  wp.innerHTML = `<svg width="${SW}" height="${SH}"><defs><pattern id="dd" width="140" height="140" patternUnits="userSpaceOnUse"><path d="M20 30 q10 -14 20 0 t20 0" stroke="#000" stroke-width="3" fill="none"/><circle cx="100" cy="40" r="10" stroke="#000" stroke-width="3" fill="none"/><path d="M30 100 l14 -20 l14 20 z" stroke="#000" stroke-width="3" fill="none"/><path d="M92 96 h24 v24 h-24 z" stroke="#000" stroke-width="3" fill="none"/></pattern></defs><rect width="${SW}" height="${SH}" fill="url(#dd)"/></svg>`;
  // status bar + header
  const head = E.el(scr, "abs", `left:0;top:0;width:${SW}px;height:190px;background:#f7f7f7;box-shadow:0 2px 0 rgba(0,0,0,.06);z-index:3`);
  E.el(head, "abs", "left:60px;top:20px;font-weight:800;font-size:30px;color:#111", "19:42");
  E.el(head, "abs", `left:${SW / 2 - 90}px;top:14px;width:180px;height:42px;border-radius:21px;background:#111`);            // camera island
  const sb = E.el(head, "abs", `left:${SW - 190}px;top:22px;width:150px;height:30px`);
  sb.innerHTML = `<svg viewBox="0 0 150 30" width="150" height="30">${[0, 1, 2, 3].map(i => `<rect x="${i * 9}" y="${20 - i * 5}" width="6" height="${8 + i * 5}" rx="1.5" fill="#111"/>`).join("")}<path d="M52 18 q14 -14 28 0 M57 22 q9 -8 18 0" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="66" cy="25" r="3" fill="#111"/><rect x="96" y="6" width="44" height="20" rx="5" fill="none" stroke="#111" stroke-width="2.5"/><rect x="99" y="9" width="30" height="14" rx="2.5" fill="#111"/><rect x="141" y="12" width="4" height="8" rx="1.5" fill="#111"/></svg>`;
  E.el(head, "abs", "left:34px;top:100px;width:22px;height:22px;border-left:5px solid #0a84ff;border-bottom:5px solid #0a84ff;transform:rotate(45deg)");
  const grp = E.el(head, "abs", "left:78px;top:82px;width:100px;height:74px");
  ["av_maya", "av_leo", "av_jess"].forEach((n, i) => { const a = E.el(grp, "abs", `left:${i * 26}px;top:${i % 2 ? 14 : 4}px;width:58px;height:58px;border-radius:50%;overflow:hidden;box-shadow:0 0 0 3px #f7f7f7`); E.img(a, n, "width:58px;height:58px;object-fit:cover"); });
  E.el(head, "abs", "left:196px;top:84px;font-weight:800;font-size:38px;color:#111;letter-spacing:-.01em", "Saturday party 🎉");
  E.el(head, "abs", "left:198px;top:132px;font-family:Inter;font-weight:500;font-size:24px;color:#777", "Maya, Leo, Rico, Jess, Frank, Nina, You");
  // input bar
  const inp = E.el(scr, "abs", `left:0;top:${SH - 130}px;width:${SW}px;height:130px;background:#f7f7f7;z-index:3`);
  E.el(inp, "abs", "left:30px;top:30px;width:46px;height:46px;font-size:52px;line-height:40px;color:#0a84ff;font-weight:400", "+");
  E.el(inp, "abs", `left:100px;top:24px;width:${SW - 220}px;height:62px;border-radius:31px;background:#fff;box-shadow:inset 0 0 0 2px #e2e2e2;font-family:Inter;font-size:28px;color:#aaa;padding:14px 26px`, "Message");
  const mic = E.el(inp, "abs", `left:${SW - 96}px;top:26px;width:60px;height:60px`);
  mic.innerHTML = `<svg viewBox="0 0 60 60" width="60" height="60"><rect x="22" y="8" width="16" height="28" rx="8" fill="#0a84ff"/><path d="M14 30 q0 16 16 16 q16 0 16 -16 M30 46 v8" stroke="#0a84ff" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;

  // ================= messages =================
  // [time, who, text, height] — who "me" is the host (right, green)
  const WHO = { maya: ["Maya", "#c2410c"], leo: ["Leo", "#1d4ed8"], rico: ["Rico", "#0f766e"], jess: ["Jess", "#a21caf"], frank: ["Frank", "#b45309"], nina: ["Nina", "#be123c"] };
  const TYPE0 = 6.5, TYPE1 = 8.4;
  const MSG = [
    [.3, "me", "Party Saturday! 🎉<br>Who's bringing what?", 150],
    [1.9, "maya", "I'll bring wine 🍷", 142],
    [3.0, "leo", "wine!", 142],
    [4.0, "jess", "I'll bring wine too", 142],
    [4.9, "frank", "Red or white? I'll bring both 👍", 142],
    [5.7, "nina", "bringing wine", 142],
    [TYPE0, "typing", "", 142],
    [TYPE1, "rico", "wine.", 142],
    [9.4, "me", "…and food??", 110],
  ];
  const feed = E.el(scr, "abs", `left:0;top:0;width:${SW}px;height:${SH}px;z-index:2`);
  const AREA_BOTTOM = SH - 150;
  let y = 0; const items = [];
  const stamp = (t) => `19:${String(42 + Math.floor(t / 2.2)).padStart(2, "0")}`;
  MSG.forEach(([t, who, text, h]) => {
    const row = E.el(feed, "abs", `left:0;top:${y}px;width:${SW}px;height:${h}px;opacity:0`);
    if (who === "me") {
      const b = E.el(row, "abs", `right:34px;top:14px;max-width:640px;background:${GREEN};border-radius:30px 30px 8px 30px;padding:18px 26px 34px;font-family:Inter;font-weight:500;font-size:36px;line-height:1.2;color:#111;box-shadow:0 2px 2px rgba(0,0,0,.08)`, text);
      const tk = E.el(b, "abs", "right:18px;bottom:8px;font-size:20px;color:#6b7b6b;font-family:Inter", `${stamp(t)} <span class="tk" style="color:#8a9a8a;font-weight:700">✓✓</span>`);
      items.push({ t, h, row, ticks: tk.querySelector(".tk") });
    } else if (who === "typing") {
      const a = E.el(row, "abs", "left:30px;top:40px;width:74px;height:74px;border-radius:50%;overflow:hidden"); E.img(a, "av_rico", "width:74px;height:74px;object-fit:cover");
      const b = E.el(row, "abs", "left:124px;top:30px;width:150px;height:84px;background:#fff;border-radius:30px 30px 30px 8px;box-shadow:0 2px 2px rgba(0,0,0,.08)");
      const dots = [0, 1, 2].map(i => E.el(b, "abs", `left:${36 + i * 30}px;top:34px;width:18px;height:18px;border-radius:50%;background:#999`));
      E.el(row, "abs", "left:292px;top:62px;font-family:Inter;font-style:italic;font-size:24px;color:#888", "Rico is typing…");
      E.F(tt => dots.forEach((d, i) => { d.style.transform = `translateY(${-Math.max(0, Math.sin(tt * 7 - i * .7)) * 10}px)`; }));
      items.push({ t, h, row, typing: true });
    } else {
      const [name, col] = WHO[who];
      const a = E.el(row, "abs", "left:30px;top:52px;width:74px;height:74px;border-radius:50%;overflow:hidden"); E.img(a, "av_" + who, "width:74px;height:74px;object-fit:cover");
      const b = E.el(row, "abs", "left:124px;top:12px;max-width:640px;background:#fff;border-radius:30px 30px 30px 8px;padding:12px 26px 32px;font-family:Inter;font-weight:500;font-size:36px;line-height:1.2;color:#111;box-shadow:0 2px 2px rgba(0,0,0,.08)",
        `<div style="font-weight:700;font-size:24px;color:${col};margin-bottom:4px">${name}</div>${text}`);
      E.el(b, "abs", "right:18px;bottom:8px;font-size:20px;color:#999;font-family:Inter", stamp(t));
      items.push({ t, h, row });
    }
    y += h;
  });
  // the typing row is replaced by Rico's message (it collapses as the message lands)
  const typ = items.find(i => i.typing), rico = items[7];
  E.F(t => {
    let off = 0;
    items.forEach(it => {
      let h = it.h * ease((t - it.t) / .28);
      if (it.typing) h *= 1 - ease((t - TYPE1) / .2);
      off += h;
      const inn = it.typing ? (t >= it.t && t < TYPE1 ? 1 : 0) : ease((t - it.t) / .28);
      it.row.style.opacity = inn;
    });
    // rows sit where they would in the final list; the feed slides so the newest row touches the input bar
    let yy = 0; items.forEach(it => { let h = it.h; if (it.typing) h = t < TYPE1 ? it.h : it.h * (1 - ease((t - TYPE1) / .2)); it.row.style.top = `${yy}px`; if (t >= it.t) yy += h; });
    feed.style.transform = `translateY(${AREA_BOTTOM - off}px)`;
    items.forEach(it => { if (it.row.style.opacity > 0 && !it.typing) it.row.style.transform = `translateY(${(1 - ease((t - it.t) / .28)) * 30}px)`; });
    items.filter(i => i.ticks).forEach(i => { i.ticks.style.color = t > i.t + .8 ? "#34b7f1" : "#8a9a8a"; });
  });
  MSG.forEach(([t, who]) => { if (who !== "typing") E.clip(t, "sfx/elx-msg-pop.wav", { vol: .8 }); });
  for (let t = TYPE0 + .1; t < TYPE1 - .1; t += .16) E.S(t, "tick", .18);
  // "Seen by 6" under the last message, then a typing flicker that gives up
  const seen = E.el(scr, "abs", `right:40px;top:${SH - 176}px;padding:6px 16px;border-radius:14px;background:rgba(255,255,255,.85);font-family:Inter;font-weight:600;font-size:24px;color:#555;z-index:4;opacity:0`, "Seen by 6");
  E.K(seen, "o", [[10.2, 0], [10.35, 1]]);
  const flick = E.el(scr, "abs", `left:40px;top:${SH - 176}px;padding:6px 16px;border-radius:14px;background:rgba(255,255,255,.85);font-family:Inter;font-style:italic;font-size:24px;color:#666;z-index:4;opacity:0`, "Leo is typing…");
  E.K(flick, "o", [[10.6, 0], [10.65, 1], [11.05, 1], [11.1, 0]]);
  E.S(11.2, "nope", .3);

  // ================= counter pill =================
  const pill = E.el(P, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:50px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0;transform-origin:0 50%`, "FOOD: 0 · WINE: 0");
  const WINES = [1.9, 3.0, 4.0, 4.9, 5.7, TYPE1];
  E.K(pill, "o", [[2.2, 0], [2.35, 1]]);
  E.F(t => { const n = WINES.filter(k => t >= k).length; const s = `FOOD: 0 · WINE: ${n}`; if (pill.textContent !== s) pill.textContent = s; pill.style.background = n >= 5 ? CORAL : INK; pill.style.color = n >= 5 ? INK : "#fff"; });
  WINES.forEach(k => E.K(pill, "s", [[k - .01, 1], [k, 1.14], [k + .2, 1, "back"]]));

  // title
  const titleBox = E.el(P, "abs", "left:100px;top:252px;width:880px;z-index:8");
  const title = E.text(titleBox, "Who's *bringing* what?", { size: 66, lh: 1.04, instant: true, id: "hook", nowrap: true, color: "#fff", css: "text-shadow:0 4px 20px rgba(0,0,0,.5)" });
  title.el.querySelectorAll(".em").forEach(e => { e.style.background = GOLD; e.style.color = INK; });
  E.until(title, 2.1, .2);

  // ================= scene 2: the party =================
  const S2 = E.scene("party", WIPE, DUR, "light"); E.cur = S2;
  const Q = S2.el;
  E.wipe(WIPE);
  E.el(Q, "abs", "left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,#f1dcc0,#e9cfab 60%,#dcbb90)");
  E.el(Q, "abs", "left:0;top:1560px;width:1080px;height:360px;background:#9a6a44;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.12) 0 3px,transparent 3px 140px)");
  // bunting and fairy lights
  const bunt = E.el(Q, "abs", "left:0;top:360px;width:1080px;height:140px");
  bunt.innerHTML = `<svg viewBox="0 0 1080 140" width="1080" height="140"><path d="M0 20 Q540 110 1080 20" stroke="#6b4a2a" stroke-width="3" fill="none"/>${Array.from({ length: 12 }, (_, i) => { const x = 40 + i * 88, yy = 20 + Math.sin(i / 11 * Math.PI) * 58; return `<path d="M${x} ${yy} l36 2 l-18 44 z" fill="${["#ff6b57", "#F5C451", "#3fa7d6", "#8bc48a"][i % 4]}"/>`; }).join("")}</svg>`;
  const bulbs = []; for (let i = 0; i < 14; i++) bulbs.push(E.el(Q, "abs", `left:${30 + i * 76}px;top:${560 + Math.sin(i / 13 * Math.PI) * 40}px;width:18px;height:24px;border-radius:50%;background:#ffe28a;box-shadow:0 0 18px #ffd35c`));
  E.F(t => bulbs.forEach((b, i) => { b.style.opacity = .55 + .45 * Math.abs(Math.sin(t * 2 + i)); }));
  // the five friends behind the table, staring at it
  const SWd = 1013, SHd = 910, sc = 1.0;
  const shock = E.el(Q, "abs", `left:${540 - SWd * sc / 2 - 40}px;top:${1520 - SHd * sc}px;width:${SWd * sc}px;height:${SHd * sc}px`);
  E.img(shock, "shock", `width:${SWd * sc}px;height:${SHd * sc}px`);
  E.K(shock, "y", [[WIPE + .2, 16], [WIPE + .6, 0, "back"]]);
  // the table, in front of them
  const TW = 1040, TH = 646 * TW / 982;
  const table = E.el(Q, "abs", `left:${540 - TW / 2}px;top:${1760 - TH}px;width:${TW}px;height:${TH}px`);
  E.img(table, "table", `width:${TW}px;height:${TH}px`);
  // Rico walks in from the right with his one ice cube
  const RH = 980, RW = 523 * RH / 1003, RICO = 13.2;
  const ricoEl = E.el(Q, "abs", `left:${1080 - RW + 60}px;top:${1760 - RH}px;width:${RW}px;height:${RH}px`);
  E.img(ricoEl, "rico", `width:${RW}px;height:${RH}px`);
  E.K(ricoEl, "x", [[RICO - .6, 520], [RICO, 0, "out"]]);
  E.F(t => { ricoEl.style.opacity = t > RICO - .6 ? 1 : 0; });
  const glint = E.el(Q, "abs", "left:865px;top:830px;width:60px;height:60px;opacity:0");
  glint.innerHTML = `<svg viewBox="0 0 60 60" width="60" height="60"><path d="M30 0 L34 26 L60 30 L34 34 L30 60 L26 34 L0 30 L26 26 Z" fill="#fff"/></svg>`;
  E.K(glint, "o", [[RICO + .4, 0], [RICO + .5, 1], [RICO + 1.2, 0]]); E.K(glint, "s", [[RICO + .4, .3], [RICO + .7, 1.2, "back"], [RICO + 1.2, .6]]); E.S(RICO + .45, "sparkle", .7);
  E.clip(WIPE + .3, "sfx/crowd-murmur.wav", { vol: .35, duck: false });

  const bubble = (html, o) => {
    const { left, top, w, tail, t0, t1, size = 60, bg = "#fff", fg = INK } = o;
    const b = E.el(E.cur.el, "abs", `left:${left}px;top:${top}px;width:${w}px;z-index:9;transform-origin:${tail}px 100%`);
    const box = E.el(b, "", `position:relative;background:${bg};border-radius:30px;padding:20px 28px 24px;box-shadow:0 14px 34px rgba(0,0,0,.3);font-weight:800;font-size:${size}px;line-height:1.04;letter-spacing:-.02em;color:${fg};text-align:center`, html);
    E.el(box, "abs", `left:${tail - 22}px;bottom:-20px;width:44px;height:44px;background:${bg};transform:rotate(45deg);border-radius:6px`);
    E.pop(b, t0, { from: .3, dur: .3 }); E.K(b, "o", [[t0, 0], [t0 + .08, 1], [t1 - .12, 1], [t1, 0]]); E.S(t0 + .02, "pop", .5);
    return b;
  };
  bubble("I brought ice!", { left: 560, top: 540, w: 460, tail: 330, t0: RICO + .2, t1: DUR, size: 66, bg: GOLD });
  E.clip(RICO + .25, "voices/sk8/ice.wav", { vol: 1.4 });
  const tag = E.el(Q, "abs", `left:100px;top:258px;display:inline-block;background:${INK};color:#fff;font-weight:800;font-size:50px;padding:.1em .42em .12em;border-radius:.34em;white-space:nowrap;z-index:8;opacity:0`, "FOOD: 1 bag · WINE: 14");
  E.K(tag, "o", [[WIPE + .6, 0], [WIPE + .8, 1], [15.2, 1], [15.35, 0]]);
  const stampBox = E.el(Q, "abs", "left:100px;top:340px;width:880px;display:flex;justify-content:center;z-index:9");
  const st = E.stamp(stampBox, "ICE: 1 CUBE.", 15.2, { size: 110, rot: -5, bg: CORAL, fg: INK, shake: 10 });
  st.style.alignSelf = "center";

  E.finish(DUR);
  E.K(E.logo, "s", [[17.4, 1], [17.65, 1.18, "out"], [17.95, 1, "io"]]);
}
