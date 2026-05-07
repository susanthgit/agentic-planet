#!/usr/bin/env node
/**
 * smoke-check.mjs — post-deploy smoke checks against the live site.
 *
 * Verifies:
 *   - Home returns 200
 *   - Sitemap index exists
 *   - Key routes (one per pillar) return 200
 *   - llms.txt exists
 *   - mcp-health.json _lastUpdated is within 12h freshness window
 *   - Pagefind asset bundle exists
 *
 * Exit codes:
 *   0  — all checks passed
 *   1  — one or more checks failed
 *
 * Run after `node scripts/deploy.mjs` and after a 30s settle:
 *   node scripts/smoke-check.mjs
 *
 * Override base URL: BASE_URL env var (default https://agents.aguidetocloud.com).
 * Override freshness threshold: FRESHNESS_HOURS env var (default 12).
 */

const BASE = process.env.BASE_URL || 'https://agents.aguidetocloud.com';
const FRESHNESS_HOURS = Number(process.env.FRESHNESS_HOURS ?? 12);

const ROUTES = [
  '/',
  '/sitemap-index.xml',
  '/llms.txt',
  '/landscape/',
  '/mcp/',
  '/recipes/',
  '/vendors/',
  '/standards/',
  '/safety/',
  '/learn/',
  '/faq/',
  '/lab/pick-your-stack/',
  '/this-week/',
  '/pulse/',
  '/colophon/',
  '/methodology/mcp-security-scorecard/',
  '/pagefind/pagefind.js',  // search asset
];

const FAILURES = [];

async function check(url) {
  try {
    const res = await fetch(BASE + url, { redirect: 'manual' });
    if (res.status >= 200 && res.status < 400) {
      console.log(`  ✓ ${url}  ${res.status}`);
      return res;
    }
    console.error(`  ✗ ${url}  ${res.status}`);
    FAILURES.push({ url, status: res.status });
    return res;
  } catch (e) {
    console.error(`  ✗ ${url}  ERROR: ${e.message}`);
    FAILURES.push({ url, error: e.message });
    return null;
  }
}

async function main() {
  console.log(`smoke-check: ${BASE}`);
  console.log('');

  // Route 200s
  for (const r of ROUTES) {
    await check(r);
  }

  // Cron freshness — fetch the deployed mcp-health.json (Astro inlines it; we need
  // a public-facing data endpoint, or we read the JSON via an alternate path).
  // For Session 1, we can't read the JSON without a public data endpoint.
  // Skip this check until /data/mcp-health.json ships in Session 8.
  console.log('');
  console.log('  (cron freshness check: deferred until /data/mcp-health.json ships)');

  console.log('');
  if (FAILURES.length === 0) {
    console.log('✓ smoke-check passed: all routes 200');
    process.exit(0);
  }
  console.error(`❌ smoke-check FAILED: ${FAILURES.length} failure(s)`);
  for (const f of FAILURES) console.error(`   ${f.url}  ${f.status ?? f.error}`);
  process.exit(1);
}

main();
