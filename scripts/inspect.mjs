#!/usr/bin/env node
/**
 * inspect.mjs — Playwright screenshots of the homepage at multiple viewports.
 * Saves to .cache/screenshots/ for review.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE_URL || 'https://agents.aguidetocloud.com';
const OUT = '.cache/screenshots';

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

async function shoot(viewport, label) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
  // Wait extra for fonts + animations to settle
  await page.waitForTimeout(800);

  // Full page
  await page.screenshot({ path: `${OUT}/home-${label}-full.png`, fullPage: true });
  console.log(`  ✓ ${label}-full.png`);

  // Above the fold
  await page.screenshot({ path: `${OUT}/home-${label}-fold.png`, fullPage: false });
  console.log(`  ✓ ${label}-fold.png`);

  // Stack diagram region
  const diag = await page.locator('.stackdiag').first();
  if (await diag.count()) {
    await diag.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await diag.screenshot({ path: `${OUT}/home-${label}-diagram.png` });
    console.log(`  ✓ ${label}-diagram.png`);
  }

  // Pillars region
  const pillars = await page.locator('.pillars-bento').first();
  if (await pillars.count()) {
    await pillars.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await pillars.screenshot({ path: `${OUT}/home-${label}-pillars.png` });
    console.log(`  ✓ ${label}-pillars.png`);
  }

  // Hero (command bridge)
  const bridge = await page.locator('.bridge').first();
  if (await bridge.count()) {
    await bridge.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await bridge.screenshot({ path: `${OUT}/home-${label}-hero.png` });
    console.log(`  ✓ ${label}-hero.png`);
  }

  await ctx.close();
}

console.log(`▸ Screenshotting ${BASE}`);
console.log('▸ Desktop @ 1440x900');
await shoot({ width: 1440, height: 900 }, 'desktop');
console.log('▸ Tablet @ 1024x768');
await shoot({ width: 1024, height: 768 }, 'tablet');
console.log('▸ Mobile @ 390x844');
await shoot({ width: 390, height: 844 }, 'mobile');

await browser.close();
console.log('✓ Done.');
