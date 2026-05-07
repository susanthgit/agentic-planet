/**
 * /data/incidents.json — public static data endpoint for the incident change log.
 */

import type { APIRoute } from 'astro';
import incidents from '@data/incidents.json';

const SITE = 'https://agents.aguidetocloud.com';

export const GET: APIRoute = async () => {
  const items = (incidents.items ?? []).slice().sort((a: any, b: any) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const payload = {
    _generatedAt: new Date().toISOString(),
    _source: SITE,
    _surface: `${SITE}/this-week/incidents/`,
    _licence: 'CC BY 4.0 — attribute "Agentic Planet" with a link',
    _schema: 'v1',
    _lastUpdated: incidents._lastUpdated ?? new Date().toISOString().slice(0, 10),
    totals: {
      total: items.length,
      monitoring: items.filter((i: any) => i.status === 'monitoring').length,
      resolved:   items.filter((i: any) => i.status === 'resolved').length,
    },
    items,
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
