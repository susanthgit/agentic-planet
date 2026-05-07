/**
 * counts.ts — Computed counts for content collections and tracked data.
 *
 * Single source of truth for "what's actually live, what's in review, what's a target".
 * Phase C of Session 1 — replaces hand-typed counts in templates and pillars.json.
 *
 * Conventions:
 *   - `tracked`   — declared in data (e.g. health-board rows, inline cards)
 *   - `reviewed`  — has a content file in the matching collection
 *   - `published` — has a content file with status === 'published' (Sush voice-passed)
 *   - `inReview`  — has a content file with status === 'review'
 *   - `draft`     — has a content file with status === 'draft'
 *   - `target`    — the future-state goal from src/data/targets.json
 */

import { getCollection } from 'astro:content';
import type { CollectionKey } from 'astro:content';

type StatusableEntry = {
  data?: {
    status?: 'draft' | 'review' | 'published' | 'archived';
    countable?: boolean;
  };
};

export interface PillarCount {
  tracked: number;
  reviewed: number;
  published: number;
  inReview: number;
  draft: number;
  target: number;
}

/** Count entries in a collection by lifecycle status. */
async function countByStatus(name: CollectionKey): Promise<{ reviewed: number; published: number; inReview: number; draft: number }> {
  let entries: StatusableEntry[] = [];
  try {
    entries = (await getCollection(name)) as unknown as StatusableEntry[];
  } catch {
    entries = [];
  }
  const reviewed = entries.length;
  const published = entries.filter((e) => e.data?.status === 'published').length;
  const inReview = entries.filter((e) => e.data?.status === 'review').length;
  const draft = entries.filter((e) => e.data?.status === 'draft').length;
  return { reviewed, published, inReview, draft };
}

/** All pillar counts in one call. `tracked` numbers come from data files / inline templates. */
export async function getPillarCounts(opts: {
  trackedMcps: number;
  trackedRecipes: number;
  inlineSafetyRisks: number;
  inlineStandards: number;
  inlineVendors: number;
  inlineLandscape: number;
  inlineTools: number;
  inlineLab: number;
  inlineDiagrams?: number;
}): Promise<Record<string, PillarCount>> {
  const [recipes, mcps, vendors, standards, explainers, faq, safety, landscape, tools, open] = await Promise.all([
    countByStatus('recipes' as CollectionKey),
    countByStatus('mcps' as CollectionKey),
    countByStatus('vendors' as CollectionKey),
    countByStatus('standards' as CollectionKey),
    countByStatus('explainers' as CollectionKey),
    countByStatus('faq' as CollectionKey),
    countByStatus('safety' as CollectionKey),
    countByStatus('landscape' as CollectionKey),
    countByStatus('tools' as CollectionKey),
    countByStatus('open' as CollectionKey),
  ]);

  // Targets — single place to update as the catalog grows
  const targets = {
    L01: 4, R02: 5, M03: 30, T04: 12, V05: 4,
    S06: 14, P07: 4, L08: 10, X09: 6, Q10: 10,
    D13: 30, // diagrams
  } as const;

  const wrap = (collection: { reviewed: number; published: number; inReview: number; draft: number }, tracked: number, target: number): PillarCount => ({
    tracked,
    reviewed: collection.reviewed,
    published: collection.published,
    inReview: collection.inReview,
    draft: collection.draft,
    target,
  });

  return {
    L01: wrap(landscape, opts.inlineLandscape, targets.L01),                  // Landscape
    R02: wrap(recipes, opts.trackedRecipes, targets.R02),                     // Recipes
    M03: wrap(mcps, opts.trackedMcps, targets.M03),                           // MCP Servers
    T04: wrap(tools, opts.inlineTools, targets.T04),                          // Tools
    V05: wrap(vendors, opts.inlineVendors, targets.V05),                      // Vendors
    S06: wrap(safety, opts.inlineSafetyRisks, targets.S06),                   // Safety
    P07: wrap(standards, opts.inlineStandards, targets.P07),                  // Standards
    L08: wrap(explainers, explainers.reviewed, targets.L08),                  // Learn / Explainers
    X09: wrap(open, opts.inlineLab, targets.X09),                             // Lab
    Q10: wrap(faq, faq.reviewed, targets.Q10),                                // FAQ
  };
}

/* ----- MCP-stars helper (Phase C of Session 1) -----
 * Avoids triple-counting monorepo packages.
 * Each repo contributes its repoStars once, regardless of how many MCPs share it.
 */

export interface McpHealthRow {
  slug: string;
  stars?: number;
  sourceType?: 'repo' | 'monorepo-subdir';
  repo?: string | null;
  repoStars?: number;
  representativeStars?: number | null;
}

export function computeUniqueRepoStars(rows: McpHealthRow[]): { totalStars: number; distinctRepos: number } {
  const repoTotals = new Map<string, number>();
  for (const r of rows) {
    if (r.sourceType === 'monorepo-subdir') {
      const key = r.repo ?? `__monorepo_${repoTotals.size}`;
      // Each shared repo contributes its repoStars exactly once
      if (!repoTotals.has(key)) repoTotals.set(key, r.repoStars ?? 0);
    } else {
      const key = r.repo ?? `__row_${r.slug ?? repoTotals.size}`;
      const stars = r.representativeStars ?? r.stars ?? 0;
      repoTotals.set(key, stars);
    }
  }
  const totalStars = [...repoTotals.values()].reduce((s, n) => s + n, 0);
  return { totalStars, distinctRepos: repoTotals.size };
}
