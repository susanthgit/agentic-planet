#!/usr/bin/env node
/*
 * audit-claims.mjs — Session 1 Phase A inventory + claim matrix
 *
 * Walks routes, content collections, data files, and template counts.
 * Produces a markdown report at docs/inventory-<date>.md.
 *
 * No external deps. Run: node scripts/audit-claims.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), '..');

const SRC_PAGES = path.join(ROOT, 'src', 'pages');
const SRC_CONTENT = path.join(ROOT, 'src', 'content');
const SRC_DATA = path.join(ROOT, 'src', 'data');
const SRC_COMPONENTS = path.join(ROOT, 'src', 'components');
const SRC_LAYOUTS = path.join(ROOT, 'src', 'layouts');
const PUBLIC = path.join(ROOT, 'public');

const TODAY = new Date().toISOString().slice(0, 10);
const OUT_FILE = path.join(ROOT, 'docs', `inventory-${TODAY}.md`);

// Collections defined in src/content.config.ts (kept in sync manually)
const COLLECTIONS = [
  'recipes', 'mcps', 'tools', 'vendors', 'standards',
  'explainers', 'faq', 'safety', 'landscape', 'open',
  'scorecards', 'desk',
];

// ---------- helpers ----------

async function walk(dir, ext = null) {
  let out = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) out = out.concat(await walk(full, ext));
      else if (!ext || full.endsWith(ext)) out.push(full);
    }
  } catch {
    /* dir missing — return [] */
  }
  return out;
}

function rel(p) {
  return path.relative(ROOT, p).replaceAll('\\', '/');
}

// Convert a src/pages path to a URL route (Astro-style)
function pageToRoute(p) {
  let r = rel(p)
    .replace(/^src\/pages\//, '/')
    .replace(/\.(astro|md|mdx|ts|js|tsx)$/, '');
  if (r.endsWith('/index')) r = r.slice(0, -'/index'.length) || '/';
  // Trailing slash convention
  if (r !== '/' && !r.endsWith('/')) r += '/';
  return r;
}

function isDynamicRoute(route) {
  return /\[[^\]]+\]/.test(route);
}

// Extract simple frontmatter fields without yaml dep
function parseFrontmatter(src) {
  const m = src.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_][\w]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    if (v.startsWith("'") && v.endsWith("'")) v = v.slice(1, -1);
    if (v === 'true') v = true;
    else if (v === 'false') v = false;
    else if (/^\d+$/.test(v)) v = Number(v);
    fm[kv[1]] = v;
  }
  return fm;
}

// Extract all internal links from astro/mdx/ts content
function extractInternalLinks(src) {
  const links = new Set();
  // href="/foo/" or href='/foo/' or href={`/foo/${slug}/`}
  const patterns = [
    /href=["']([^"']+)["']/g,
    /url:\s*["']([^"']+)["']/g, // for data-driven tiles like { url: "/mcp/..." }
    /url:\s*`([^`]+)`/g,
    /["'`](\/[a-zA-Z0-9_\-/\[\]]+\/?)["'`]/g, // bare path-like strings (loose)
  ];
  for (const re of patterns) {
    for (const m of src.matchAll(re)) {
      const u = m[1];
      // Filter to internal URLs only
      if (!u || !u.startsWith('/')) continue;
      if (u.startsWith('//')) continue; // protocol-relative external
      // Strip query/hash for routing comparison
      const clean = u.split('#')[0].split('?')[0];
      if (clean.length < 2) continue;
      links.add(clean);
    }
  }
  return [...links];
}

// Extract hardcoded count claims from content like ">10 explainers<" or "10 answers"
function extractCountClaims(src) {
  const claims = [];
  const re = /(?<![\w-])(\d{1,3})\s+(MCP servers|MCP reviews|MCPs|recipes|recipe|explainers|explainer|FAQ|FAQs|answers|vendors|vendor|standards|safety|tools|tool|diagrams|tracked)\b/gi;
  for (const m of src.matchAll(re)) {
    claims.push({ count: Number(m[1]), thing: m[2].toLowerCase(), context: src.slice(Math.max(0, m.index - 30), m.index + 60).replace(/\s+/g, ' ').trim() });
  }
  return claims;
}

// ---------- main pipeline ----------

const report = [];
const log = (...args) => report.push(args.join(' '));

log(`# Agentic Planet — Inventory & claim matrix`);
log(`*Generated ${new Date().toISOString()} by \`scripts/audit-claims.mjs\`*`);
log('');
log(`This report is the Session 1 Phase A artefact. It captures every claim, link, count, route, and data row in the repo so Phases B–E have a baseline to fix against.`);
log('');

// 1. Routes
const pageFiles = await walk(SRC_PAGES, '.astro');
const routes = pageFiles.map(p => ({ file: rel(p), route: pageToRoute(p), dynamic: isDynamicRoute(pageToRoute(p)) }));

// 2. Content collections
// Walk content collections — note JSON files are valid here for collections
// like `scorecards` (defineCollection { loader: glob({ pattern: '**/*.json' }) }).
async function walkCollection(dir) {
  const all = [];
  for (const ext of ['.mdx', '.md', '.json']) {
    all.push(...await walk(dir, ext));
  }
  return all;
}

const collectionStats = {};
for (const c of COLLECTIONS) {
  const dir = path.join(SRC_CONTENT, c);
  const files = await walkCollection(dir);
  const items = [];
  for (const f of files) {
    const src = await fs.readFile(f, 'utf8');
    let fm = {};
    if (f.endsWith('.json')) {
      try {
        fm = JSON.parse(src);
      } catch (e) {
        items.push({ file: rel(f), slug: path.basename(f, '.json'), title: '(invalid JSON)', status: 'invalid', sushReviewNeeded: false, sushVerdictNeeded: false });
        continue;
      }
    } else {
      fm = parseFrontmatter(src);
    }
    const ext = path.extname(f);
    const base = path.basename(f, ext);
    items.push({
      file: rel(f),
      slug: fm.slug || base,
      title: fm.title || fm.displayName || '(untitled)',
      status: fm.status || (fm.sushVerdictNeeded || fm.sushReviewNeeded ? 'review' : 'unspecified'),
      sushReviewNeeded: fm.sushReviewNeeded === true,
      sushVerdictNeeded: fm.sushVerdictNeeded === true,
    });
  }
  collectionStats[c] = items;
}

// 3. Data files
const dataFiles = await walk(SRC_DATA);

// 4. Public assets
const publicFiles = await walk(PUBLIC);

// 5. All template files (for hardcoded count + link extraction)
const templateFiles = [
  ...await walk(SRC_PAGES, '.astro'),
  ...await walk(SRC_COMPONENTS, '.astro'),
  ...await walk(SRC_LAYOUTS, '.astro'),
  ...await walk(SRC_CONTENT, '.mdx'),
  ...await walk(SRC_DATA),
];

// Build link map
const linkRefs = new Map(); // url -> [{ file, count }]
const countClaims = []; // { file, count, thing, context }

for (const f of templateFiles) {
  if (!/\.(astro|mdx|ts|tsx|js|mjs|json)$/.test(f)) continue;
  const src = await fs.readFile(f, 'utf8');
  for (const link of extractInternalLinks(src)) {
    const arr = linkRefs.get(link) || [];
    arr.push(rel(f));
    linkRefs.set(link, arr);
  }
  for (const claim of extractCountClaims(src)) {
    countClaims.push({ file: rel(f), ...claim });
  }
}

// Resolve which static routes exist
const staticRoutes = new Set(routes.filter(r => !r.dynamic).map(r => r.route));
// Dynamic routes: we know src/pages/mcp/[slug].astro renders any /mcp/<x>/ URL,
// but only if a matching content file exists (since [slug].astro reads the collection).
// For audit purposes, treat dynamic prefixes as "needs content match".
const dynamicPrefixes = routes.filter(r => r.dynamic).map(r => {
  // /mcp/[slug]/  -> /mcp/
  const prefix = r.route.replace(/\[[^\]]+\]\/?$/, '');
  // Map dynamic dir to its content collection (by convention)
  const collection = prefix.replace(/^\//, '').replace(/\/$/, '');
  return { prefix, collection, file: r.file, route: r.route };
});

// Static-list-driven dynamic routes (not content-collection-backed).
// These resolve via getStaticPaths() against a hand-listed set in the page itself.
const STATIC_DYNAMIC_SLUGS = {
  '/compare/': ['llms', 'hosts', 'frameworks', 'vendors', 'protocols'],
  '/badge/':   [], // populated below from scorecards collection
};

// For each dynamic prefix, list slugs present in the matching collection
function slugsForPrefix(prefix) {
  // Static-list dynamic routes (e.g. /compare/[category])
  if (STATIC_DYNAMIC_SLUGS[prefix]) {
    if (prefix === '/badge/') {
      return (collectionStats.scorecards || []).map(s => s.slug);
    }
    return STATIC_DYNAMIC_SLUGS[prefix];
  }
  // /faq/ → faq · /mcp/ → mcps (singular path → plural collection? real mapping)
  // Astro repo uses /mcp/[slug] but collection name is "mcps"; /recipes/[slug] → "recipes"; /faq/[slug] → "faq"; /learn/[slug] → "explainers"; /desk/[slug] → "desk"
  const segment = prefix.replace(/^\/|\/$/g, '');
  const map = { mcp: 'mcps', recipes: 'recipes', faq: 'faq', learn: 'explainers', desk: 'desk' };
  const collection = map[segment] || segment;
  return (collectionStats[collection] || []).map(item => item.slug);
}

function looksLikeFilePath(url) {
  // Filter URL-like strings that are actually file system paths in code snippets
  // (e.g. /Users/you/code/repo, /home/user, /etc/passwd, /var/log)
  if (/^\/(Users|home|etc|var|opt|tmp|root|mnt|srv|usr|bin|sbin|lib|boot|dev|proc|sys|run)(\/|$)/.test(url)) return true;
  // Windows-style absolute paths
  if (/^\/[A-Z]:[/\\]/i.test(url)) return true;
  return false;
}

function routeExists(url) {
  // Filter out file-system paths in code snippets — they're not internal URLs
  if (looksLikeFilePath(url)) return { exists: true, kind: 'filesystem-path-not-a-url' };
  // Normalise trailing slash
  const trimmed = url.endsWith('/') ? url : url + '/';
  if (staticRoutes.has(trimmed)) return { exists: true, kind: 'static' };
  // Match dynamic prefix
  for (const dp of dynamicPrefixes) {
    if (trimmed.startsWith(dp.prefix) && trimmed !== dp.prefix) {
      const slug = trimmed.slice(dp.prefix.length).replace(/\/$/, '');
      const slugs = slugsForPrefix(dp.prefix);
      if (slugs.includes(slug)) return { exists: true, kind: 'dynamic-matched', collection: dp.collection };
      // Special handling: /badge/<slug>/security.svg shape — also valid
      if (dp.prefix === '/badge/' && slug.includes('/security.svg')) {
        const slugOnly = slug.split('/')[0];
        if (slugs.includes(slugOnly)) return { exists: true, kind: 'badge-svg-matched' };
      }
      return { exists: false, kind: 'dynamic-no-content', collection: dp.collection, slug };
    }
  }
  // Also accept /static-asset patterns from /public
  // crude check: does file exist under public/?
  return { exists: false, kind: 'unknown' };
}

// Audit links
const brokenLinks = [];
const externalIsh = []; // links we can't resolve
for (const [url, files] of linkRefs.entries()) {
  // Skip mailto / tel / # / static assets
  if (/^\/(api|sitemap|robots|favicon|og)/.test(url)) continue;
  if (/\.(png|jpg|jpeg|svg|webp|css|js|json|xml|txt|woff2?|ico)$/i.test(url)) continue;
  const r = routeExists(url);
  if (!r.exists) {
    brokenLinks.push({ url, files: [...new Set(files)], detail: r });
  }
}

// ---------- emit report ----------

log('## Routes (static + dynamic)');
log('');
log('| Route | File | Dynamic |');
log('|-------|------|---------|');
for (const r of routes.sort((a, b) => a.route.localeCompare(b.route))) {
  log(`| \`${r.route}\` | \`${r.file}\` | ${r.dynamic ? '✓' : ''} |`);
}
log('');

log('## Content collections — actual vs declared');
log('');
log('Schemas declared in `src/content.config.ts`. Actual files counted below.');
log('');
log('| Collection | Files | Slugs | Sush-review-needed | Sush-verdict-needed |');
log('|------------|-------|-------|--------------------|---------------------|');
for (const c of COLLECTIONS) {
  const items = collectionStats[c] || [];
  const slugs = items.map(i => `\`${i.slug}\``).join(' · ') || '_(empty)_';
  const review = items.filter(i => i.sushReviewNeeded).length;
  const verdict = items.filter(i => i.sushVerdictNeeded).length;
  log(`| \`${c}\` | ${items.length} | ${slugs} | ${review} | ${verdict} |`);
}
log('');

log('## Hardcoded count claims in templates');
log('');
log('Numbers typed directly in `.astro` / `.mdx` / `.json` that should be replaced with computed values.');
log('');
log('| Count | Thing | File | Context |');
log('|------:|-------|------|---------|');
for (const c of countClaims.sort((a, b) => a.file.localeCompare(b.file))) {
  log(`| ${c.count} | ${c.thing} | \`${c.file}\` | …${c.context.replaceAll('|', '\\|')}… |`);
}
log('');

log('## Broken / missing internal links');
log('');
log('Links referenced from templates / data that don\'t resolve to a real route.');
log('');
if (brokenLinks.length === 0) {
  log('_None._');
} else {
  log('| URL | Detail | Referenced from |');
  log('|-----|--------|------------------|');
  for (const b of brokenLinks.sort((a, b) => a.url.localeCompare(b.url))) {
    const detail = b.detail.kind === 'dynamic-no-content'
      ? `dynamic /${b.detail.collection}/[slug] · slug \`${b.detail.slug}\` not in collection`
      : b.detail.kind;
    log(`| \`${b.url}\` | ${detail} | ${b.files.map(f => `\`${f}\``).join(' · ')} |`);
  }
}
log('');

log('## Public assets');
log('');
log('| File | Size |');
log('|------|------|');
for (const f of publicFiles) {
  const stats = await fs.stat(f);
  log(`| \`${rel(f)}\` | ${stats.size} bytes |`);
}
log('');

log('## Data files');
log('');
log('| File | Size |');
log('|------|------|');
for (const f of dataFiles) {
  const stats = await fs.stat(f);
  log(`| \`${rel(f)}\` | ${stats.size} bytes |`);
}
log('');

log('## Pillars metadata claims (`src/data/pillars.json`)');
log('');
try {
  const pj = JSON.parse(await fs.readFile(path.join(SRC_DATA, 'pillars.json'), 'utf8'));
  log('| Code | Title | count | target | href |');
  log('|------|-------|------:|------:|------|');
  for (const p of pj.pillars) {
    log(`| ${p.code} | ${p.title} | ${p.count} | ${p.target} | \`${p.href}\` |`);
  }
} catch (e) {
  log(`(failed to parse pillars.json: ${e.message})`);
}
log('');

log('## Featured recipes (`src/data/featured-recipes.json`)');
log('');
try {
  const fr = JSON.parse(await fs.readFile(path.join(SRC_DATA, 'featured-recipes.json'), 'utf8'));
  log('| Slug | Status | Before | After | Cost |');
  log('|------|--------|--------|-------|------|');
  for (const r of fr.recipes) {
    log(`| \`${r.slug}\` | \`${r.status}\` | ${r.before} | ${r.after} | ${r.cost} |`);
  }
  log('');
  // Compare to actual content
  const actualRecipeSlugs = (collectionStats.recipes || []).map(r => r.slug);
  const claimedSlugs = fr.recipes.map(r => r.slug);
  const phantom = claimedSlugs.filter(s => !actualRecipeSlugs.includes(s));
  if (phantom.length) {
    log(`**⚠ Phantom production recipes (claimed in data, no content file):** ${phantom.map(s => `\`${s}\``).join(' · ')}`);
  }
} catch (e) {
  log(`(failed to parse featured-recipes.json: ${e.message})`);
}
log('');

log('## MCP health rows vs MCP review pages');
log('');
try {
  const mh = JSON.parse(await fs.readFile(path.join(SRC_DATA, 'mcp-health.json'), 'utf8'));
  const reviewedSlugs = (collectionStats.mcps || []).map(m => m.slug);
  log('| Health row slug | Stars | URL claimed | Review file? |');
  log('|----------|------:|-------------|--------------|');
  for (const r of mh.rows) {
    const has = reviewedSlugs.includes(r.slug);
    log(`| \`${r.slug}\` | ${r.stars} | \`${r.url}\` | ${has ? '✓' : '✗ (404 risk)'} |`);
  }
  // Star duplication detection
  const starsBySource = {};
  for (const r of mh.rows) {
    const key = r.stars;
    starsBySource[key] = (starsBySource[key] || 0) + 1;
  }
  const dupes = Object.entries(starsBySource).filter(([_, n]) => n > 1).map(([s]) => Number(s));
  if (dupes.length) {
    log('');
    log(`**⚠ Duplicate star counts (likely monorepo collision):** ${dupes.join(', ')}`);
  }
} catch (e) {
  log(`(failed to parse mcp-health.json: ${e.message})`);
}
log('');

// ---------- claim matrix ----------

log('## Claim matrix (the big one)');
log('');
log('Source of truth: counts in `src/data/pillars.json` are the *promises*; collection file counts are *live*; `status === "published"` count is *publishable*. Status field is not yet on most collections — this is the Phase A2 deliverable.');
log('');
log('| Pillar | Promised (target) | Tracked / claimed | Live files | Reviewable | Notes |');
log('|--------|------------------:|------------------:|-----------:|-----------:|-------|');
try {
  const pj = JSON.parse(await fs.readFile(path.join(SRC_DATA, 'pillars.json'), 'utf8'));
  for (const p of pj.pillars) {
    let live = '—';
    let notes = [];
    const segment = p.href.replace(/\//g, '');
    const colMap = { mcp: 'mcps', recipes: 'recipes', faq: 'faq', learn: 'explainers', vendors: 'vendors', standards: 'standards', safety: 'safety', tools: 'tools', landscape: 'landscape', open: 'open' };
    const col = colMap[segment];
    if (col) {
      const items = collectionStats[col] || [];
      live = items.length;
      const reviewable = items.filter(i => i.sushReviewNeeded || i.sushVerdictNeeded).length;
      if (live < p.count) notes.push(`pillars.json claims ${p.count} but only ${live} live`);
      if (reviewable > 0) notes.push(`${reviewable} flagged for Sush`);
      log(`| ${p.code} ${p.title} | ${p.target} | ${p.count} | ${live} | ${items.length - reviewable} | ${notes.join(' · ') || '—'} |`);
    } else {
      log(`| ${p.code} ${p.title} | ${p.target} | ${p.count} | (no collection) | — | — |`);
    }
  }
} catch (e) {
  log(`(failed: ${e.message})`);
}

log('');
log('## Phase A → Phase B handoff');
log('');
log('Phase B fixes target:');
log('');
log('1. **Hero rewrite** — drop pillars.json or hero copy that promises 30 MCPs / 4 vendors / 5 recipes.');
log('2. **Recipe trust fix** — `src/data/featured-recipes.json` lists phantom production recipes (see table above).');
log('3. **MCP row links** — health-board rows that link to non-existent /mcp/<slug>/ pages (see ✗ marks above).');
log('4. **Pillar landing counts** — every "10 X" / "13 Y" hardcoded claim in templates (see hardcoded-counts table).');
log('5. **Dead sub-page links** — broken-links table above lists every internal 404 candidate.');
log('6. **Missing static assets** — public/ has only favicon.svg + robots.txt; BaseLayout references /og/default.png and /favicon.ico.');
log('');
log('Phase C will replace the typed counts with computed-at-build queries against content collections, gated by lifecycle status (Phase A2).');

// ---------- scorecard integrity (Session 2) ----------

log('');
log('## Scorecard integrity (Session 2)');
log('');
log('Every scorecard JSON must point to an existing MCP review file. Orphan scorecards are forbidden.');
log('');

const scorecardItems = collectionStats.scorecards ?? [];
const mcpSlugs = new Set((collectionStats.mcps ?? []).map(m => m.slug));
const orphanScorecards = scorecardItems.filter(s => !mcpSlugs.has(s.slug));

let scorecardOrphans = 0;
if (scorecardItems.length === 0) {
  log('_(no scorecards yet)_');
} else if (orphanScorecards.length === 0) {
  log(`✓ All ${scorecardItems.length} scorecard(s) have a matching MCP review file.`);
} else {
  log('| Scorecard slug | Status | Issue |');
  log('|----------------|--------|-------|');
  for (const s of orphanScorecards) {
    log(`| \`${s.slug}\` | ${s.status} | **ORPHAN** — no MCP review file at \`src/content/mcps/${s.slug}.mdx\` |`);
  }
  scorecardOrphans = orphanScorecards.length;
}
log('');
log(`Scorecard orphans: ${scorecardOrphans}`);

// ---------- write report ----------

await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
await fs.writeFile(OUT_FILE, report.join('\n'), 'utf8');

console.log(`Inventory written to ${rel(OUT_FILE)}`);
console.log(`Routes: ${routes.length}`);
console.log(`Collections: ${COLLECTIONS.length} (${COLLECTIONS.map(c => `${c}=${(collectionStats[c] || []).length}`).join(' ')})`);
console.log(`Hardcoded count claims: ${countClaims.length}`);
console.log(`Broken internal links: ${brokenLinks.length}`);
console.log(`Scorecard orphans: ${scorecardOrphans}`);
