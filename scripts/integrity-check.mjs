#!/usr/bin/env node
/**
 * integrity-check.mjs — CI gate runner.
 *
 * Wraps audit-claims.mjs to assert ZERO broken internal links.
 * Used by .github/workflows/integrity.yml on every PR/push.
 *
 * Exit codes:
 *   0  — pass (no broken internal links)
 *   1  — fail (broken internal links present)
 *   2  — bad invocation (audit script missing or threw)
 *
 * Override: `INTEGRITY_LINK_THRESHOLD` env var (default 0) — emergency
 *   only. Document any non-zero use in the commit message and a tracking issue.
 */

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const THRESHOLD = Number(process.env.INTEGRITY_LINK_THRESHOLD ?? 0);

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'inherit'], cwd: ROOT, ...opts });
    let out = '';
    p.stdout.on('data', d => { out += d.toString(); });
    p.on('close', code => resolve({ code, out }));
    p.on('error', reject);
  });
}

const { code, out } = await run(process.execPath, ['scripts/audit-claims.mjs']);
process.stdout.write(out);
if (code !== 0) {
  console.error(`integrity-check: audit-claims.mjs exited with code ${code}`);
  process.exit(2);
}

const m = out.match(/Broken internal links:\s*(\d+)/);
if (!m) {
  console.error('integrity-check: could not parse "Broken internal links:" from audit output');
  process.exit(2);
}
const broken = Number(m[1]);

const orphanMatch = out.match(/Scorecard orphans:\s*(\d+)/);
const orphans = orphanMatch ? Number(orphanMatch[1]) : 0;

console.log(`integrity-check: broken internal links = ${broken} (threshold: ${THRESHOLD})`);
console.log(`integrity-check: scorecard orphans = ${orphans} (threshold: 0)`);

let failed = false;

if (broken > THRESHOLD) {
  console.error(`❌ integrity-check FAILED: ${broken} broken internal link(s) > threshold ${THRESHOLD}`);
  console.error(`   See docs/inventory-*.md for the full list.`);
  console.error(`   Emergency override: set INTEGRITY_LINK_THRESHOLD env var (document why).`);
  failed = true;
}

if (orphans > 0) {
  console.error(`❌ integrity-check FAILED: ${orphans} scorecard(s) point to non-existent MCP review files.`);
  console.error(`   Either create the matching src/content/mcps/<slug>.mdx review or remove the scorecard.`);
  failed = true;
}

if (failed) process.exit(1);

console.log(`✓ integrity-check passed`);
process.exit(0);
