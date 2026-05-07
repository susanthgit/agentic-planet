/**
 * /rss/incidents.xml — Incidents change-log feed.
 */

import type { APIRoute } from 'astro';
import incidents from '@data/incidents.json';

const SITE = 'https://agents.aguidetocloud.com';

function escapeXml(s: string): string {
  return (s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

const rfc822 = (date: Date) => new Date(date).toUTCString();

export const GET: APIRoute = async () => {
  const items = (incidents.items ?? []).slice().sort((a: any, b: any) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const xmlItems = items.map((it: any) => {
    const url = `${SITE}/this-week/incidents/#${it.id}`;
    return `    <item>
      <title>[${(it.severity ?? 'low').toUpperCase()}] ${escapeXml(it.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="false">${escapeXml(it.id)}</guid>
      <pubDate>${rfc822(new Date(it.date))}</pubDate>
      <description>${escapeXml(`${it.what ?? ''} — Recommended: ${it.recommendedAction ?? ''}. Status: ${it.status ?? 'unknown'}.`)}</description>
      <category>${escapeXml(it.vendor ?? 'unknown')}</category>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Incidents · Agentic Planet</title>
    <link>${SITE}/this-week/incidents/</link>
    <atom:link href="${SITE}/rss/incidents.xml" rel="self" type="application/rss+xml" />
    <description>Operational change log for the agentic stack. Sourced and precise.</description>
    <language>en-NZ</language>
    <lastBuildDate>${rfc822(new Date())}</lastBuildDate>
${xmlItems}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
