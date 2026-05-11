import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:5173';
const LABEL = process.argv[2] || 'shot';
const OUT_DIR = resolve(process.cwd(), 'screenshots', LABEL);

const routes = [
  { path: '/', name: '01-home' },
  { path: '/food-map', name: '02-food-map' },
  { path: '/street-map', name: '03-street-map' },
  { path: '/challenge', name: '04-challenge' },
  { path: '/survival-tools', name: '05-survival-tools' },
  { path: '/contact', name: '06-contact' },
  { path: '/music', name: '07-music' },
];

const viewports = [
  { name: 'mobile', width: 414, height: 896, deviceScaleFactor: 2 },
  { name: 'desktop', width: 1280, height: 900, deviceScaleFactor: 1 },
];

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    for (const vp of viewports) {
      const page = await browser.newPage();
      await page.setViewport(vp);
      for (const r of routes) {
        const url = `${BASE}${r.path}`;
        try {
          await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        } catch (e) {
          console.warn(`networkidle0 timeout for ${url}, falling back to networkidle2`);
          await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        }
        await new Promise((r) => setTimeout(r, 600));
        // Scroll through the page so whileInView animations all trigger.
        await page.evaluate(async () => {
          const step = window.innerHeight * 0.6;
          const total = document.documentElement.scrollHeight;
          for (let y = 0; y <= total; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 250));
        });
        const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        if (pageHeight > vp.height) {
          await page.setViewport({ ...vp, height: Math.min(pageHeight + 40, 8000) });
          await new Promise((r) => setTimeout(r, 350));
        }
        const file = `${OUT_DIR}/${r.name}.${vp.name}.png`;
        await page.screenshot({ path: file, fullPage: false });
        await page.setViewport(vp);
        console.log(`✓ ${vp.name.padEnd(8)} ${r.path.padEnd(18)} → ${file}`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
