// Frame-by-frame capture of timeline.html through headless Chrome.
//
// One browser, one page: render(t) positions every element for time t, then a
// screenshot. ~50ms a frame, so a 15s reel at 30fps is under a minute — versus
// one Chrome launch per frame, which was ~2s each.
//
//   node capture.js <html> <outdir> --fps 30 --duration 15 [--chrome path] [--guides]
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const html = path.resolve(args[0]);
const out = path.resolve(args[1]);
const opt = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };
const FPS = +opt('--fps', 30), DUR = +opt('--duration', 15);
const CHROME = opt('--chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
const GUIDES = args.includes('--guides');

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
           '--allow-file-access-from-files'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.goto('file://' + html, { waitUntil: 'load' });
  // fonts and every tile must be decoded before frame 0, or early frames
  // render with fallback type and empty cells
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(i => i.complete ? 0 :
      new Promise(r => { i.onload = i.onerror = r; })));
  });
  if (GUIDES) await page.evaluate(() => window.showGuides(true));

  const n = Math.round(DUR * FPS);
  const t0 = Date.now();
  for (let f = 0; f < n; f++) {
    await page.evaluate(t => window.render(t), f / FPS);
    await page.screenshot({ path: path.join(out, `f${String(f).padStart(5, '0')}.png`), type: 'png' });
    if (f % 60 === 0) process.stdout.write(`  frame ${f}/${n}\n`);
  }
  await browser.close();
  console.log(`captured ${n} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s -> ${out}`);
})().catch(e => { console.error(e); process.exit(1); });
