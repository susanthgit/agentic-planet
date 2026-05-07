/**
 * /data/mcps.json — public static data endpoint for the MCP catalog.
 * License: CC BY 4.0 — attribute "Agentic Planet".
 */

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import mcpHealth from '@data/mcp-health.json';

const SITE = 'https://agents.aguidetocloud.com';

export const GET: APIRoute = async () => {
  const reviewed = await getCollection('mcps');
  const reviewedSlugs = new Set(reviewed.map((m) => m.id));

  const rows = (mcpHealth.rows ?? []).map((r: any) => {
    const slug = r.slug;
    const review = reviewed.find((m) => m.id === slug);
    return {
      slug,
      name: r.name ?? slug,
      category: r.category,
      sourceType: r.sourceType ?? 'repo',
      repo: r.repo ?? null,
      packagePath: r.packagePath ?? null,
      stars: r.stars ?? 0,
      repoStars: r.repoStars ?? r.stars ?? 0,
      representativeStars: r.representativeStars ?? null,
      lastCommit: r.lastCommit ?? null,
      lastCommitDays: r.lastCommitDays ?? null,
      health: r.health ?? 'unknown',
      reviewed: reviewedSlugs.has(slug),
      reviewUrl: reviewedSlugs.has(slug) ? `${SITE}/mcp/${slug}/` : null,
      verdict: review?.data.verdict ?? null,
      reviewedAt: review?.data.reviewedAt ?? null,
    };
  });

  const payload = {
    _generatedAt: new Date().toISOString(),
    _source: SITE,
    _licence: 'CC BY 4.0 — attribute "Agentic Planet" with a link',
    _schema: 'v1',
    totals: {
      tracked: rows.length,
      reviewed: rows.filter((r) => r.reviewed).length,
    },
    mcps: rows,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
