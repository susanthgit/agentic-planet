// Measure right-cell gaps on the agentic-planet home.
// Usage: node scripts/gap-audit.mjs [URL] [desktop|mobile]
import { chromium } from 'playwright';

const URL = process.argv[2] || 'http://localhost:4323/';
const VIEWPORT = process.argv[3] || 'desktop';

const sizes = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};
const viewport = sizes[VIEWPORT] || sizes.desktop;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport });
await page.goto(URL, { waitUntil: 'networkidle' });

const sections = await page.evaluate(() => {
  const out = [];
  const bentos = document.querySelectorAll('.bento');
  bentos.forEach((bento, idx) => {
    const cells = bento.querySelectorAll(':scope > .bento__cell');
    if (cells.length !== 2) return;
    const l = cells[0].getBoundingClientRect();
    const r = cells[1].getBoundingClientRect();
    const findLabel = (el) => {
      const k = el.querySelector('.panel__kicker, .pulse-rail__kicker, .tw__kicker, .featured__kicker, .startrail__kicker, .rmap__kicker, .cmat__kicker, .stackdiag__kicker, .tsm__kicker');
      if (k) return k.textContent.trim().slice(0, 60);
      const t = el.querySelector('h2, h3, h4');
      return t ? t.textContent.trim().slice(0, 60) : '(no label)';
    };
    out.push({
      idx,
      bentoClasses: bento.className,
      leftLabel: findLabel(cells[0]),
      rightLabel: findLabel(cells[1]),
      leftHeight: Math.round(l.height),
      rightHeight: Math.round(r.height),
      diff: Math.round(l.height - r.height),
    });
  });
  return out;
});

console.log(`\n=== BENTO HEIGHT AUDIT (${viewport.width}x${viewport.height}) ===\n`);
sections.forEach((s, i) => {
  const tag = Math.abs(s.diff) > 60 ? (s.diff > 0 ? '⚠ R-GAP' : '⚠ L-GAP') : '✓ ok';
  console.log(`${tag.padEnd(10)} #${i + 1}  ${s.bentoClasses.padEnd(28)}  L:${String(s.leftHeight).padStart(4)}px R:${String(s.rightHeight).padStart(4)}px  diff:${String(s.diff).padStart(5)}px`);
  console.log(`              L = ${s.leftLabel}`);
  console.log(`              R = ${s.rightLabel}`);
  console.log('');
});

const screenshotPath = `home-audit-${VIEWPORT}.png`;
await page.screenshot({ path: screenshotPath, fullPage: true });
console.log(`Screenshot saved to ${screenshotPath}`);

await browser.close();
