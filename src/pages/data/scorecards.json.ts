/**
 * /data/scorecards.json — full scorecard data, machine-readable.
 * License: CC BY 4.0 — attribute "Agentic Planet".
 */

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://agents.aguidetocloud.com';

export const GET: APIRoute = async () => {
  const all = await getCollection('scorecards');
  const published = all.filter((s) => s.data.status === 'published');

  const cards = published.map((s) => ({
    slug: s.id,
    displayName: s.data.displayName,
    methodologyVersion: s.data.methodologyVersion,
    confidence: s.data.confidence,
    lastReviewedAt: s.data.lastReviewedAt,
    nextReviewDue: s.data.nextReviewDue,
    reviewedBy: s.data.reviewedBy,
    verdict: s.data.verdict,
    verdictScope: s.data.verdictScope,
    verdictNote: s.data.verdictNote,
    sources: s.data.sources,
    correctionUrl: s.data.correctionUrl,
    badgeUrl: `${SITE}/badge/${s.id}/security.svg`,
    scorecardUrl: `${SITE}/mcp/${s.id}/#scorecard`,
    scorecard: s.data.scorecard,
  }));

  const payload = {
    _generatedAt: new Date().toISOString(),
    _source: SITE,
    _methodology: `${SITE}/methodology/mcp-security-scorecard/`,
    _licence: 'CC BY 4.0 — attribute "Agentic Planet" with a link',
    _schema: 'v1',
    totals: { published: cards.length },
    scorecards: cards,
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
