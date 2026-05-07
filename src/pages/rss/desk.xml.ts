/**
 * /rss/desk.xml — Builder Log RSS feed.
 */

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://agents.aguidetocloud.com';

function escapeXml(s: string): string {
  return (s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

const rfc822 = (date: Date) => new Date(date).toUTCString();

export const GET: APIRoute = async () => {
  const entries = await getCollection('desk');
  const visible = entries
    .filter((e) => e.data.status === 'published')
    .sort((a, b) => new Date(b.data.weekOf).getTime() - new Date(a.data.weekOf).getTime());

  const items = visible.map((e) => {
    const url = `${SITE}/desk/${e.id}/`;
    const pubDate = e.data.publishedAt ?? e.data.weekOf;
    return `    <item>
      <title>${escapeXml(e.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(new Date(pubDate))}</pubDate>
      <description>${escapeXml(e.data.summary ?? '')}</description>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sush's desk · Agentic Planet</title>
    <link>${SITE}/desk/</link>
    <atom:link href="${SITE}/rss/desk.xml" rel="self" type="application/rss+xml" />
    <description>Weekly builder log. What I built, deployed, broke, and learned.</description>
    <language>en-NZ</language>
    <lastBuildDate>${rfc822(new Date())}</lastBuildDate>
${items}
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
