/**
 * /badge/[slug]/security.svg — embeddable scorecard badge.
 *
 * Format: stroke-style SVG · slug · band · methodology version · last-reviewed date.
 * MCP authors paste this in their README:
 *   <a href="https://agents.aguidetocloud.com/scorecards/{slug}/">
 *     <img src="https://agents.aguidetocloud.com/badge/{slug}/security.svg"
 *          alt="MCP Security Scorecard for {slug}: {band}">
 *   </a>
 *
 * If the slug isn't scored yet, the page returns 404 (honest — we don't
 * publish badges for things we haven't reviewed). MCP authors who want
 * a badge can request scoring via the GitHub issue template.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths: GetStaticPaths = async () => {
  const scorecards = await getCollection('scorecards');
  return scorecards.map((s) => ({
    params: { slug: s.id },
    props: { scorecard: s },
  }));
};

const BAND_COLORS: Record<string, { fg: string; bg: string }> = {
  'ADOPT':                          { fg: '#4ADE80', bg: '#0F1A12' },
  'ADOPT WITH LIMITS':              { fg: '#67E8F9', bg: '#0E1A1B' },
  'REVIEW FIRST':                   { fg: '#FBBF24', bg: '#1A150A' },
  'DO NOT USE FOR SENSITIVE WORK':  { fg: '#F87171', bg: '#1A0E0E' },
};

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = ({ props }) => {
  const sc = props.scorecard as { id: string; data: any };
  const d = sc.data;
  const colors = BAND_COLORS[d.verdict] ?? BAND_COLORS['REVIEW FIRST'];
  const lastReviewed = new Date(d.lastReviewedAt).toISOString().slice(0, 10);
  const slug = escapeXml(d.slug);
  const verdict = escapeXml(d.verdict);
  const methodology = escapeXml(`v${d.methodologyVersion}`);
  const titleText = `MCP Security Scorecard · ${slug} · ${verdict} · methodology ${methodology} · reviewed ${lastReviewed}`;

  // Width: leftSection (label) + rightSection (band). Calculated from text length.
  const leftLabel = `MCP SECURITY · ${slug.toUpperCase()}`;
  const leftWidth = Math.max(180, leftLabel.length * 7 + 20);
  const rightWidth = Math.max(140, verdict.length * 7 + 20);
  const totalWidth = leftWidth + rightWidth;
  const height = 28;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}" role="img" aria-label="${escapeXml(titleText)}">
  <title>${escapeXml(titleText)}</title>
  <defs>
    <linearGradient id="bgGrad" x2="0" y2="100%">
      <stop offset="0" stop-color="#0B0E15" stop-opacity="1"/>
      <stop offset="1" stop-color="#07090E" stop-opacity="1"/>
    </linearGradient>
  </defs>

  <!-- Border -->
  <rect width="${totalWidth - 1}" height="${height - 1}" x="0.5" y="0.5" rx="2" fill="url(#bgGrad)" stroke="#2A3340" stroke-width="1"/>

  <!-- Left: label -->
  <text x="10" y="18" font-family="JetBrains Mono, ui-monospace, monospace" font-size="11" fill="#7D8590" letter-spacing="0.5">
    ${escapeXml(leftLabel)}
  </text>

  <!-- Divider -->
  <line x1="${leftWidth}" y1="4" x2="${leftWidth}" y2="${height - 4}" stroke="#2A3340" stroke-width="1"/>

  <!-- Right: verdict band -->
  <rect x="${leftWidth + 1}" y="1" width="${rightWidth - 2}" height="${height - 2}" fill="${colors.bg}" stroke="${colors.fg}" stroke-width="1" rx="1"/>
  <text x="${leftWidth + 10}" y="18" font-family="JetBrains Mono, ui-monospace, monospace" font-size="11" font-weight="700" fill="${colors.fg}" letter-spacing="0.5">
    ${verdict}
  </text>

  <!-- Methodology + reviewed (small bottom strip) -->
  <text x="${leftWidth + 10}" y="${height - 4}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="6" fill="${colors.fg}" opacity="0.7">
    ${methodology} · ${lastReviewed}
  </text>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Methodology': `v${d.methodologyVersion}`,
      'X-Last-Reviewed': lastReviewed,
    },
  });
};
