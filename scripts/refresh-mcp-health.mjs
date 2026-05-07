#!/usr/bin/env node
/**
 * refresh-mcp-health.mjs — Pulls latest GitHub stats for tracked MCP repos.
 *
 * Reads:  src/data/mcp-health.json  (existing manifest with repo URLs / categories)
 * Writes: src/data/mcp-health.json  (with refreshed stars, last commit, delta)
 *
 * Required env (in Actions):
 *   GITHUB_TOKEN — auto-provided by Actions
 *
 * 2026-05-07 (Session 1 Phase C): schema reworked to distinguish
 *   - sourceType: 'repo' (whole repo is the MCP) vs 'monorepo-subdir' (one of many MCPs in a shared repo)
 *   - repo (owner/name) and packagePath (subdir within monorepo) are stored separately
 *   - For 'monorepo-subdir' rows, stars are recorded as `repoStars` (the shared repo total) and
 *     `representativeStars` is null until per-package metrics are available. The UI must not
 *     display `representativeStars` when null — show '(monorepo)' instead.
 *   - This stops the previous bug of three rows all showing 85,152 stars from the shared
 *     `modelcontextprotocol/servers` repo.
 */

import { readFile, writeFile } from 'node:fs/promises';

const TOKEN = process.env.GITHUB_TOKEN;
const HEALTH_PATH = 'src/data/mcp-health.json';

// Map slug → { repo, sourceType, packagePath? }
const REPO_MAP = {
  'github-mcp':       { repo: 'github/github-mcp-server',          sourceType: 'repo' },
  'playwright-mcp':   { repo: 'microsoft/playwright-mcp',          sourceType: 'repo' },
  'filesystem-mcp':   { repo: 'modelcontextprotocol/servers',      sourceType: 'monorepo-subdir', packagePath: 'src/filesystem' },
  'postgres-mcp':     { repo: 'modelcontextprotocol/servers',      sourceType: 'monorepo-subdir', packagePath: 'src/postgres' },
  'slack-mcp':        { repo: 'modelcontextprotocol/servers',      sourceType: 'monorepo-subdir', packagePath: 'src/slack' },
  'cloudflare-mcp':   { repo: 'cloudflare/mcp-server-cloudflare',  sourceType: 'repo' },
  'notion-mcp':       { repo: 'makenotion/notion-mcp-server',      sourceType: 'repo' },
  'figma-mcp':        { repo: 'GLips/Figma-Context-MCP',           sourceType: 'repo' },
  'azure-mcp':        { repo: 'Azure/azure-mcp',                   sourceType: 'repo' },
  'stripe-mcp':       { repo: 'stripe/agent-toolkit',              sourceType: 'repo' },
  'browserbase-mcp':  { repo: 'browserbase/mcp-server-browserbase', sourceType: 'repo' },
  'linear-mcp':       { repo: 'linear/linear-mcp',                 sourceType: 'repo' },
  'legacy-agent-x':   null, // intentionally absent — example abandoned
};

async function fetchRepo(repo) {
  if (!repo) return null;
  const headers = TOKEN ? { Authorization: `Bearer ${TOKEN}`, 'User-Agent': 'agentic-planet-bot' } : { 'User-Agent': 'agentic-planet-bot' };
  const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
  if (!res.ok) {
    console.warn(`Failed ${repo}: ${res.status}`);
    return null;
  }
  return res.json();
}

function daysSince(iso) {
  if (!iso) return 999;
  const ms = Date.now() - new Date(iso).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function lastCommitLabel(days) {
  if (days < 1) return '<1d ago';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function healthFromDays(days) {
  if (days < 30) return 'alive';
  if (days < 90) return 'slowing';
  return 'abandoned';
}

async function main() {
  const data = JSON.parse(await readFile(HEALTH_PATH, 'utf8'));
  const updatedRows = [];

  // Cache repo API responses so monorepo-subdir rows share the call
  const repoCache = new Map();

  for (const row of data.rows) {
    const cfg = REPO_MAP[row.slug];
    if (!cfg) {
      // Preserve existing row (e.g., abandoned example)
      updatedRows.push(row);
      continue;
    }
    const { repo, sourceType, packagePath } = cfg;
    let apiData = repoCache.get(repo);
    if (apiData === undefined) {
      apiData = await fetchRepo(repo);
      repoCache.set(repo, apiData);
    }
    if (!apiData) {
      updatedRows.push(row);
      continue;
    }
    const repoStars = apiData.stargazers_count ?? row.repoStars ?? row.stars ?? 0;
    const days = daysSince(apiData.pushed_at);
    // For monorepo-subdir, representative stars = null (we cannot attribute repo stars to one package).
    // For 'repo' source type, representativeStars === repoStars.
    const representativeStars = sourceType === 'repo' ? repoStars : null;
    // delta7d only meaningful for `repo` rows where the displayed value moves.
    const oldDisplayedStars = sourceType === 'repo' ? (row.stars ?? row.representativeStars ?? 0) : 0;
    const delta7d = sourceType === 'repo' ? repoStars - (row.trend?.[0] ?? oldDisplayedStars) : 0;
    const trend = sourceType === 'repo'
      ? (row.trend ?? []).slice(-6).concat([repoStars])
      : (row.trend ?? []);
    updatedRows.push({
      ...row,
      sourceType,
      repo,
      packagePath: packagePath ?? null,
      repoStars,
      representativeStars,
      // Backwards-compat: keep `stars` as the displayed value (representativeStars or 0 for monorepo)
      stars: representativeStars ?? 0,
      delta7d,
      lastCommit: lastCommitLabel(days),
      lastCommitDays: days,
      health: healthFromDays(days),
      trend,
      healthSignalsMeasured: ['repoStars', 'lastCommitDays'],
      healthSignalsMissing: sourceType === 'monorepo-subdir'
        ? ['per-package stars', 'per-package commit cadence', 'issue-response time']
        : ['issue-response time'],
    });
  }

  data.rows = updatedRows;
  data._lastUpdated = new Date().toISOString();
  data._source = 'GitHub API · refreshed by GitHub Actions cron';
  data._schemaVersion = 2;

  await writeFile(HEALTH_PATH, JSON.stringify(data, null, 2));
  console.log(`✅ Refreshed ${updatedRows.length} MCP rows`);
}

main().catch((e) => {
  console.error('❌', e);
  process.exit(1);
});

