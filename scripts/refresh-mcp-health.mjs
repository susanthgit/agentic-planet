#!/usr/bin/env node
/**
 * refresh-mcp-health.mjs — Pulls latest GitHub stats for tracked MCP repos.
 *
 * Reads:  src/data/mcp-health.json  (existing manifest with repo URLs / categories)
 * Writes: src/data/mcp-health.json  (with refreshed stars, last commit, delta)
 *
 * Required env (in Actions):
 *   GITHUB_TOKEN — auto-provided by Actions
 */

import { readFile, writeFile } from 'node:fs/promises';

const TOKEN = process.env.GITHUB_TOKEN;
const HEALTH_PATH = 'src/data/mcp-health.json';

// Map slug → owner/repo. Update as catalog grows.
const REPO_MAP = {
  'github-mcp': 'github/github-mcp-server',
  'playwright-mcp': 'microsoft/playwright-mcp',
  'filesystem-mcp': 'modelcontextprotocol/servers',
  'postgres-mcp': 'modelcontextprotocol/servers',
  'slack-mcp': 'modelcontextprotocol/servers',
  'cloudflare-mcp': 'cloudflare/mcp-server-cloudflare',
  'notion-mcp': 'makenotion/notion-mcp-server',
  'figma-mcp': 'GLips/Figma-Context-MCP',
  'azure-mcp': 'Azure/azure-mcp',
  'stripe-mcp': 'stripe/agent-toolkit',
  'browserbase-mcp': 'browserbase/mcp-server-browserbase',
  'linear-mcp': 'linear/linear-mcp',
  'legacy-agent-x': null, // intentionally absent — example abandoned
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

  for (const row of data.rows) {
    const repo = REPO_MAP[row.slug];
    if (!repo) {
      // Preserve existing row (e.g., abandoned example)
      updatedRows.push(row);
      continue;
    }
    const apiData = await fetchRepo(repo);
    if (!apiData) {
      updatedRows.push(row);
      continue;
    }
    const newStars = apiData.stargazers_count ?? row.stars;
    const days = daysSince(apiData.pushed_at);
    const oldStars = row.stars;
    const delta7d = newStars - (row.trend?.[0] ?? oldStars);
    const trend = (row.trend ?? []).slice(-6).concat([newStars]);
    updatedRows.push({
      ...row,
      stars: newStars,
      delta7d,
      lastCommit: lastCommitLabel(days),
      lastCommitDays: days,
      health: healthFromDays(days),
      trend,
    });
  }

  data.rows = updatedRows;
  data._lastUpdated = new Date().toISOString();
  data._source = 'GitHub API · refreshed by GitHub Actions cron';

  await writeFile(HEALTH_PATH, JSON.stringify(data, null, 2));
  console.log(`✅ Refreshed ${updatedRows.length} MCP rows`);
}

main().catch((e) => {
  console.error('❌', e);
  process.exit(1);
});
