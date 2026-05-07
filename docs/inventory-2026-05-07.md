# Agentic Planet — Inventory & claim matrix
*Generated 2026-05-07T03:29:44.044Z by `scripts/audit-claims.mjs`*

This report is the Session 1 Phase A artefact. It captures every claim, link, count, route, and data row in the repo so Phases B–E have a baseline to fix against.

## Routes (static + dynamic)

| Route | File | Dynamic |
|-------|------|---------|
| `/` | `src/pages/index.astro` |  |
| `/404/` | `src/pages/404.astro` |  |
| `/career/` | `src/pages/career/index.astro` |  |
| `/colophon/` | `src/pages/colophon.astro` |  |
| `/compare/` | `src/pages/compare/index.astro` |  |
| `/compare/[category]/` | `src/pages/compare/[category].astro` | ✓ |
| `/compare/stack/` | `src/pages/compare/stack.astro` |  |
| `/desk/` | `src/pages/desk/index.astro` |  |
| `/desk/[slug]/` | `src/pages/desk/[slug].astro` | ✓ |
| `/diagrams/` | `src/pages/diagrams/index.astro` |  |
| `/faq/` | `src/pages/faq/index.astro` |  |
| `/faq/[slug]/` | `src/pages/faq/[slug].astro` | ✓ |
| `/lab/` | `src/pages/lab/index.astro` |  |
| `/lab/pick-your-stack/` | `src/pages/lab/pick-your-stack.astro` |  |
| `/landscape/` | `src/pages/landscape/index.astro` |  |
| `/learn/` | `src/pages/learn/index.astro` |  |
| `/learn/[slug]/` | `src/pages/learn/[slug].astro` | ✓ |
| `/learn/glossary/` | `src/pages/learn/glossary.astro` |  |
| `/learn/your-first-agent/` | `src/pages/learn/your-first-agent.astro` |  |
| `/mcp/` | `src/pages/mcp/index.astro` |  |
| `/mcp/[slug]/` | `src/pages/mcp/[slug].astro` | ✓ |
| `/methodology/mcp-security-scorecard/` | `src/pages/methodology/mcp-security-scorecard.astro` |  |
| `/open/` | `src/pages/open/index.astro` |  |
| `/pulse/` | `src/pages/pulse.astro` |  |
| `/recipes/` | `src/pages/recipes/index.astro` |  |
| `/recipes/[slug]/` | `src/pages/recipes/[slug].astro` | ✓ |
| `/safety/` | `src/pages/safety/index.astro` |  |
| `/scorecards/` | `src/pages/scorecards/index.astro` |  |
| `/standards/` | `src/pages/standards/index.astro` |  |
| `/templates/` | `src/pages/templates/index.astro` |  |
| `/this-week/` | `src/pages/this-week.astro` |  |
| `/tools/` | `src/pages/tools/index.astro` |  |
| `/vendors/` | `src/pages/vendors/index.astro` |  |

## Content collections — actual vs declared

Schemas declared in `src/content.config.ts`. Actual files counted below.

| Collection | Files | Slugs | Sush-review-needed | Sush-verdict-needed |
|------------|-------|-------|--------------------|---------------------|
| `recipes` | 1 | `youtube-seo-automation` | 0 | 1 |
| `mcps` | 7 | `cloudflare-mcp` · `filesystem-mcp` · `github-mcp` · `notion-mcp` · `playwright-mcp` · `postgres-mcp` · `slack-mcp` | 0 | 2 |
| `tools` | 0 | _(empty)_ | 0 | 0 |
| `vendors` | 0 | _(empty)_ | 0 | 0 |
| `standards` | 0 | _(empty)_ | 0 | 0 |
| `explainers` | 5 | `agentic-loops` · `mcp-in-90-seconds` · `tool-calling-vs-mcp` · `what-is-agentic` · `what-is-an-agent` | 5 | 0 |
| `faq` | 4 | `build-with-zero-dollars` · `is-agentic-ai-hype` · `why-still-hallucinate` · `will-mcp-survive` | 4 | 0 |
| `safety` | 0 | _(empty)_ | 0 | 0 |
| `landscape` | 0 | _(empty)_ | 0 | 0 |
| `open` | 0 | _(empty)_ | 0 | 0 |
| `scorecards` | 7 | `cloudflare-mcp` · `filesystem-mcp` · `github-mcp` · `notion-mcp` · `playwright-mcp` · `postgres-mcp` · `slack-mcp` | 0 | 0 |
| `desk` | 0 | _(empty)_ | 0 | 0 |

## Hardcoded count claims in templates

Numbers typed directly in `.astro` / `.mdx` / `.json` that should be replaced with computed values.

| Count | Thing | File | Context |
|------:|-------|------|---------|
| 5 | explainers | `src/components/panels/RoadmapStrip.astro` | …tems: ['10 pillar surfaces', '5 explainers · 4 FAQ · 1 recipe', 'MCP cron pipeline', 'Cmd+… |
| 4 | faq | `src/components/panels/RoadmapStrip.astro` | …ar surfaces', '5 explainers · 4 FAQ · 1 recipe', 'MCP cron pipeline', 'Cmd+K palette', 'St… |
| 1 | recipe | `src/components/panels/RoadmapStrip.astro` | …ces', '5 explainers · 4 FAQ · 1 recipe', 'MCP cron pipeline', 'Cmd+K palette', 'Stack diag… |
| 30 | mcp reviews | `src/components/panels/RoadmapStrip.astro` | …tems: ['5 measured recipes', '30 MCP reviews', 'Vendor expansion (OpenAI + Google)', 'Sear… |
| 8 | diagrams | `src/pages/diagrams/index.astro` | …NCHING WITH" title="The first 8 diagrams (planning)" density="loose"> <ul class="dg… |
| 3 | mcps | `src/pages/lab/index.astro` | …lorer', summary: 'Pick 2–3 MCPs → see existing recipes that combine them.', stat… |

## Broken / missing internal links

Links referenced from templates / data that don't resolve to a real route.

_None._

## Public assets

| File | Size |
|------|------|
| `public/favicon.svg` | 500 bytes |
| `public/llms.txt` | 4112 bytes |
| `public/robots.txt` | 88 bytes |

## Data files

| File | Size |
|------|------|
| `src/data/compare/frameworks.json` | 4768 bytes |
| `src/data/compare/hosts.json` | 4813 bytes |
| `src/data/compare/llms.json` | 4607 bytes |
| `src/data/compare/protocols.json` | 4235 bytes |
| `src/data/compare/vendors.json` | 4662 bytes |
| `src/data/featured-recipes.json` | 768 bytes |
| `src/data/mcp-health.json` | 9606 bytes |
| `src/data/pillars.json` | 2363 bytes |
| `src/data/pulse.json` | 1149 bytes |
| `src/data/search-index.ts` | 5541 bytes |
| `src/data/targets.json` | 708 bytes |

## Pillars metadata claims (`src/data/pillars.json`)

| Code | Title | count | target | href |
|------|-------|------:|------:|------|
| L01 | Landscape | 1 | 4 | `/landscape/` |
| R02 | Recipes | 1 | 5 | `/recipes/` |
| M03 | MCP Servers | 13 | 30 | `/mcp/` |
| T04 | Tools | 0 | 12 | `/tools/` |
| V05 | Vendors | 2 | 4 | `/vendors/` |
| S06 | Safety | 14 | 14 | `/safety/` |
| P07 | Standards | 4 | 4 | `/standards/` |
| L08 | Learn | 5 | 10 | `/learn/` |
| X09 | Lab | 1 | 6 | `/lab/` |
| Q10 | FAQ | 4 | 10 | `/faq/` |

## Featured recipes (`src/data/featured-recipes.json`)

| Slug | Status | Before | After | Cost |
|------|--------|--------|-------|------|
| `youtube-seo-automation` | `draft` | Several hours / month manual | Single-digit minutes | Roughly low single-digit cents per video (token usage) |


## MCP health rows vs MCP review pages

| Health row slug | Stars | URL claimed | Review file? |
|----------|------:|-------------|--------------|
| `github-mcp` | 29550 | `undefined` | ✓ |
| `playwright-mcp` | 32090 | `undefined` | ✓ |
| `filesystem-mcp` | 0 | `undefined` | ✓ |
| `postgres-mcp` | 0 | `undefined` | ✓ |
| `slack-mcp` | 0 | `undefined` | ✓ |
| `cloudflare-mcp` | 3707 | `undefined` | ✓ |
| `notion-mcp` | 4301 | `undefined` | ✓ |
| `figma-mcp` | 14634 | `undefined` | ✗ (404 risk) |
| `azure-mcp` | 1213 | `undefined` | ✗ (404 risk) |
| `stripe-mcp` | 1528 | `undefined` | ✗ (404 risk) |
| `browserbase-mcp` | 3315 | `undefined` | ✗ (404 risk) |
| `linear-mcp` | 1280 | `undefined` | ✗ (404 risk) |
| `legacy-agent-x` | 1100 | `undefined` | ✗ (404 risk) |

**⚠ Duplicate star counts (likely monorepo collision):** 0

## Claim matrix (the big one)

Source of truth: counts in `src/data/pillars.json` are the *promises*; collection file counts are *live*; `status === "published"` count is *publishable*. Status field is not yet on most collections — this is the Phase A2 deliverable.

| Pillar | Promised (target) | Tracked / claimed | Live files | Reviewable | Notes |
|--------|------------------:|------------------:|-----------:|-----------:|-------|
| L01 Landscape | 4 | 1 | 0 | 0 | pillars.json claims 1 but only 0 live |
| R02 Recipes | 5 | 1 | 1 | 0 | 1 flagged for Sush |
| M03 MCP Servers | 30 | 13 | 7 | 5 | pillars.json claims 13 but only 7 live · 2 flagged for Sush |
| T04 Tools | 12 | 0 | 0 | 0 | — |
| V05 Vendors | 4 | 2 | 0 | 0 | pillars.json claims 2 but only 0 live |
| S06 Safety | 14 | 14 | 0 | 0 | pillars.json claims 14 but only 0 live |
| P07 Standards | 4 | 4 | 0 | 0 | pillars.json claims 4 but only 0 live |
| L08 Learn | 10 | 5 | 5 | 0 | 5 flagged for Sush |
| X09 Lab | 6 | 1 | (no collection) | — | — |
| Q10 FAQ | 10 | 4 | 4 | 0 | 4 flagged for Sush |

## Phase A → Phase B handoff

Phase B fixes target:

1. **Hero rewrite** — drop pillars.json or hero copy that promises 30 MCPs / 4 vendors / 5 recipes.
2. **Recipe trust fix** — `src/data/featured-recipes.json` lists phantom production recipes (see table above).
3. **MCP row links** — health-board rows that link to non-existent /mcp/<slug>/ pages (see ✗ marks above).
4. **Pillar landing counts** — every "10 X" / "13 Y" hardcoded claim in templates (see hardcoded-counts table).
5. **Dead sub-page links** — broken-links table above lists every internal 404 candidate.
6. **Missing static assets** — public/ has only favicon.svg + robots.txt; BaseLayout references /og/default.png and /favicon.ico.

Phase C will replace the typed counts with computed-at-build queries against content collections, gated by lifecycle status (Phase A2).

## Scorecard integrity (Session 2)

Every scorecard JSON must point to an existing MCP review file. Orphan scorecards are forbidden.

✓ All 7 scorecard(s) have a matching MCP review file.

Scorecard orphans: 0