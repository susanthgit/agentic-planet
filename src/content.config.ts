import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Lifecycle status — applied to every content collection (Session 1 Phase A2, 2026-05-07).
 *
 * - draft       : not linked from primary nav, not counted, noindex
 * - review      : visible-with-banner; off-counts, off-sitemap, noindex
 * - published   : counted, indexed, primary-nav-eligible (Sush has voice-passed)
 * - archived    : visible but excluded from "current" / "freshness" claims
 *
 * `countable` and `noindex` are derived from `status` by default in the count engine
 * but can be overridden per-file when needed (e.g. a published page intentionally noindex'd).
 */
const lifecycle = {
  status: z.enum(['draft', 'review', 'published', 'archived']).default('draft'),
  countable: z.boolean().optional(),  // derived from status if absent
  noindex: z.boolean().optional(),    // derived from status if absent
  lastReviewedAt: z.coerce.date().optional(),
  nextReviewDue: z.coerce.date().optional(),
};

// Recipes — chained workflows with measured before/after
const recipes = defineCollection({
  loader: glob({ base: 'src/content/recipes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    components: z.array(z.string()),
    before: z.string(),
    after: z.string(),
    cost: z.string().optional(),
    domain: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    runs: z.number().optional(),
    risk: z.enum(['low', 'medium', 'high']).optional(),
    sushVerdictNeeded: z.boolean().default(true),
    ...lifecycle,
  }),
});

// MCP servers — curated reviews
const mcps = defineCollection({
  loader: glob({ base: 'src/content/mcps', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    name: z.string(),
    repo: z.string().url(),
    category: z.string(),
    summary: z.string(),
    verdict: z.string().optional(),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
    setupTime: z.string().optional(),
    catch: z.string().optional(),
    dataAccess: z.array(z.string()).default([]),
    health: z.enum(['alive', 'slowing', 'abandoned', 'unknown']).default('unknown'),
    recommend: z.boolean().default(false),
    sushVerdictNeeded: z.boolean().default(true),
    reviewedAt: z.coerce.date().optional(),
    ...lifecycle,
  }),
});

// Tools — agent tools (Cursor, Cline, etc.)
const tools = defineCollection({
  loader: glob({ base: 'src/content/tools', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'coding-agent', 'general-agent', 'browser-agent', 'voice-agent',
      'orchestration', 'self-hosted', 'other',
    ]),
    summary: z.string(),
    verdict: z.string().optional(),
    pricing: z.string().optional(),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
    catch: z.string().optional(),
    homepage: z.string().url().optional(),
    repo: z.string().url().optional(),
    sushVerdictNeeded: z.boolean().default(true),
    ...lifecycle,
  }),
});

// Vendors — Microsoft, Anthropic, OpenAI, Google, Meta
const vendors = defineCollection({
  loader: glob({ base: 'src/content/vendors', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    vendor: z.enum(['microsoft', 'anthropic', 'openai', 'google', 'meta', 'other']),
    productName: z.string().optional(),
    summary: z.string(),
    publishedAt: z.coerce.date().optional(),
    sushVerdictNeeded: z.boolean().default(true),
    disclosureRequired: z.boolean().default(false),
    ...lifecycle,
  }),
});

// Standards — MCP, A2A, Apps SDK, etc.
const standards = defineCollection({
  loader: glob({ base: 'src/content/standards', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    standard: z.string(),
    publisher: z.string(),
    summary: z.string(),
    specUrl: z.string().url().optional(),
    adoption: z.enum(['draft', 'emerging', 'established', 'fading']).default('emerging'),
    sushVerdictNeeded: z.boolean().default(true),
    ...lifecycle,
  }),
});

// Explainers — plain English concepts
const explainers = defineCollection({
  loader: glob({ base: 'src/content/explainers', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    depth: z.enum(['90-sec', '5-min', 'deep']).default('5-min'),
    concept: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sushReviewNeeded: z.boolean().default(true),
    ...lifecycle,
  }),
});

// FAQ — honest big-question answers
const faq = defineCollection({
  loader: glob({ base: 'src/content/faq', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    question: z.string(),
    summary: z.string(),
    category: z.enum(['big-picture', 'technical', 'career', 'safety', 'cost', 'protocol']).default('big-picture'),
    sushReviewNeeded: z.boolean().default(true),
    ...lifecycle,
  }),
});

// Scorecards — MCP Security Scorecard JSON entries (Session 2).
// Each entry mirrors the spec from /methodology/mcp-security-scorecard/.
// 22 measured dimensions + verdict band + sources + correction URL.
// Bands: ADOPT / ADOPT WITH LIMITS / REVIEW FIRST / DO NOT USE FOR SENSITIVE WORK.
const scorecards = defineCollection({
  loader: glob({ base: 'src/content/scorecards', pattern: '**/*.json' }),
  schema: z.object({
    slug: z.string(),
    displayName: z.string(),
    lastReviewedAt: z.coerce.date(),
    nextReviewDue: z.coerce.date(),
    reviewedBy: z.string(),
    methodologyVersion: z.string(),
    confidence: z.enum(['high', 'medium', 'low']),
    sushReviewNeeded: z.boolean().default(true),
    scorecard: z.object({
      licence:            z.object({ value: z.string().optional(), note: z.string().optional() }).optional(),
      securityPolicy:     z.object({ value: z.enum(['yes', 'no', 'unknown']), contact: z.string().optional(), note: z.string().optional() }).optional(),
      signedReleases:     z.object({ value: z.enum(['yes', 'no', 'partial', 'unknown']), note: z.string().optional() }).optional(),
      installMethods:     z.array(z.string()).optional(),
      codeReview:         z.object({ value: z.enum(['yes', 'partial', 'no', 'unknown']), note: z.string().optional() }),
      secretsHandling:    z.object({ value: z.enum(['scoped', 'env-only', 'leaky', 'unknown']), note: z.string().optional() }),
      credentialStorage:  z.object({ value: z.enum(['os-keychain', 'file', 'memory', 'unknown']), note: z.string().optional() }).optional(),
      oauthHandling:      z.object({ value: z.enum(['scoped', 'broad', 'n/a', 'unknown']), note: z.string().optional() }).optional(),
      sandboxModel:       z.object({ value: z.enum(['container', 'subprocess', 'process', 'none']), note: z.string().optional() }),
      filesystemAccess:   z.object({ value: z.enum(['scoped', 'home', 'root', 'none']), note: z.string().optional() }).optional(),
      shellAccess:        z.object({ value: z.enum(['yes', 'no', 'sandboxed']), note: z.string().optional() }).optional(),
      networkEgress:      z.object({ value: z.enum(['none', 'allow-list', 'open']), note: z.string().optional() }).optional(),
      telemetry:          z.object({ value: z.enum(['none', 'opt-in', 'opt-out', 'forced']), note: z.string().optional() }).optional(),
      dataResidency:      z.object({ value: z.enum(['local', 'cloud', 'mixed']), note: z.string().optional() }).optional(),
      defaultPermissions: z.object({ value: z.enum(['minimal', 'moderate', 'broad']), note: z.string().optional() }).optional(),
      destructiveTools:   z.object({ present: z.array(z.string()).default([]), humanApproval: z.enum(['yes', 'no', 'optional']) }).optional(),
      promptInjectionExposure: z.object({ value: z.enum(['low', 'medium', 'high']), note: z.string().optional() }),
      supplyChainSurface: z.object({ value: z.enum(['low', 'medium', 'high']), depCount: z.number().optional(), directDeps: z.number().optional(), note: z.string().optional() }),
      depCveSurface:      z.object({ value: z.enum(['clean', 'warnings', 'critical', 'unknown']), lastScannedAt: z.coerce.date().optional(), note: z.string().optional() }).optional(),
      rateLimitRisk:      z.object({ value: z.enum(['low', 'medium', 'high']), note: z.string().optional() }).optional(),
      maintainerType:     z.object({ value: z.enum(['corp', 'indie', 'community', 'abandoned']), busFactor: z.number().optional(), releaseCadence: z.string().optional(), note: z.string().optional() }),
      issueResponseMedianDays: z.number().optional(),
      incidents:          z.array(z.object({ date: z.coerce.date(), severity: z.enum(['low', 'medium', 'high', 'critical']), summary: z.string(), sourceUrl: z.string().url(), status: z.enum(['monitoring', 'resolved', 'false-alarm']) })).default([]),
    }),
    verdict: z.enum(['ADOPT', 'ADOPT WITH LIMITS', 'REVIEW FIRST', 'DO NOT USE FOR SENSITIVE WORK']),
    verdictScope: z.string(),
    verdictNote: z.string(),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    correctionUrl: z.string().url(),
    ...lifecycle,
  }),
});

// Builder Log — Sush's desk weekly entries (Session 2 scaffold; entries land in Session 6).
const desk = defineCollection({
  loader: glob({ base: 'src/content/desk', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    weekOf: z.coerce.date(),
    publishedAt: z.coerce.date().optional(),
    summary: z.string().optional(),
    entries: z.number().optional(),
    sushReviewNeeded: z.boolean().default(true),
    ...lifecycle,
  }),
});

// Safety — risk catalog, decision trees
const safety = defineCollection({
  loader: glob({ base: 'src/content/safety', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['injection', 'data-flow', 'failure-mode', 'privacy', 'decision-tree']).default('failure-mode'),
    severity: z.enum(['info', 'low', 'medium', 'high', 'critical']).default('medium'),
    sushReviewNeeded: z.boolean().default(false),
    ...lifecycle,
  }),
});

// Landscape entries (timeline events, state-of snapshots)
const landscape = defineCollection({
  loader: glob({ base: 'src/content/landscape', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    eventDate: z.coerce.date().optional(),
    type: z.enum(['timeline-event', 'state-of', 'prediction', 'vendor-move']).default('timeline-event'),
    ...lifecycle,
  }),
});

// Open source projects (frameworks, indie projects)
const open = defineCollection({
  loader: glob({ base: 'src/content/open', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    name: z.string(),
    repo: z.string().url(),
    summary: z.string(),
    category: z.string(),
    health: z.enum(['alive', 'slowing', 'abandoned', 'unknown']).default('unknown'),
    ...lifecycle,
  }),
});

export const collections = {
  recipes,
  mcps,
  tools,
  vendors,
  standards,
  explainers,
  faq,
  safety,
  landscape,
  open,
  scorecards,
  desk,
};
