// snap-agentic-about.mjs — Agentic is dark-only, snap dark only
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const BASE = (process.argv[2] || 'http://localhost:1323').replace(/\/$/, '');
const OUT = resolve(process.argv[3] || 'C:/ssClawy/agentic-planet/qa/about-tour');
mkdirSync(OUT, { recursive: true });
const URL = BASE + '/about/';
const cases = [
  { name: 'desktop-1440', w: 1440, h: 900 },
  { name: 'mobile-390',   w: 390,  h: 844 },
];
const browser = await chromium.launch();
for (const c of cases) {
  const ctx = await browser.newContext({ viewport: { width: c.w, height: c.h }, colorScheme: 'dark', deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  if (BASE.startsWith('http://localhost')) await page.route('**/cosmos-bar.js', r => r.abort());
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/agentic-about__${c.name}.png`, fullPage: true });
  console.log('shot:', c.name);
  await ctx.close();
}
await browser.close();
console.log('done.');
