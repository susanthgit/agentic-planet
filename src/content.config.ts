import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    status: z.enum(['production', 'experimental', 'draft']).default('draft'),
    domain: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    runs: z.number().optional(),
    risk: z.enum(['low', 'medium', 'high']).optional(),
    sushVerdictNeeded: z.boolean().default(false),
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
    sushVerdictNeeded: z.boolean().default(false),
    reviewedAt: z.coerce.date().optional(),
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
    sushVerdictNeeded: z.boolean().default(false),
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
    sushVerdictNeeded: z.boolean().default(false),
    disclosureRequired: z.boolean().default(false),
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
    sushVerdictNeeded: z.boolean().default(false),
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
    lastReviewedAt: z.coerce.date().optional(),
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
};
