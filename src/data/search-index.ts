/**
 * Search index — every page on the site, organised by category.
 * Built statically at build time. Used by the command palette.
 */

export interface SearchEntry {
  title: string;
  url: string;
  category: 'pillar' | 'explainer' | 'faq' | 'recipe' | 'mcp' | 'tool' | 'vendor' | 'lab' | 'meta';
  kicker?: string;
  shortcut?: string;
  description?: string;
}

export const SEARCH_INDEX: SearchEntry[] = [
  // Pillars (with G+letter shortcuts)
  { title: 'Landscape', url: '/landscape/', category: 'pillar', kicker: 'L01', shortcut: 'G L', description: 'Where the agentic ecosystem came from' },
  { title: 'Recipes', url: '/recipes/', category: 'pillar', kicker: 'R02', shortcut: 'G R', description: 'Real workflows with measured before/after' },
  { title: 'MCP Servers', url: '/mcp/', category: 'pillar', kicker: 'M03', shortcut: 'G M', description: 'Health board with live signals' },
  { title: 'Tools', url: '/tools/', category: 'pillar', kicker: 'T04', shortcut: 'G T', description: 'Honest reviews of agentic tools' },
  { title: 'Vendors', url: '/vendors/', category: 'pillar', kicker: 'V05', shortcut: 'G V', description: 'Microsoft, Anthropic, OpenAI, Google' },
  { title: 'Safety', url: '/safety/', category: 'pillar', kicker: 'S06', shortcut: 'G S', description: 'Risk catalog and decision trees' },
  { title: 'Standards', url: '/standards/', category: 'pillar', kicker: 'P07', shortcut: 'G P', description: 'MCP, A2A, Apps SDK' },
  { title: 'Learn', url: '/learn/', category: 'pillar', kicker: 'L08', shortcut: 'G H', description: 'Plain English explainers' },
  { title: 'Lab', url: '/lab/', category: 'pillar', kicker: 'X09', shortcut: 'G X', description: 'Interactive tools' },
  { title: 'FAQ', url: '/faq/', category: 'pillar', kicker: 'Q10', shortcut: 'G Q', description: 'Honest big-question answers' },
  { title: 'Open Source', url: '/open/', category: 'pillar', kicker: 'O11', description: 'Frameworks and OSS projects' },
  { title: 'Templates', url: '/templates/', category: 'pillar', kicker: 'T12', description: 'Boilerplate starters' },
  { title: 'Career', url: '/career/', category: 'pillar', kicker: 'C13', description: 'Skills and emerging roles' },
  { title: 'Diagrams', url: '/diagrams/', category: 'pillar', kicker: 'D14', description: 'Embeddable visuals' },

  // Explainers
  { title: 'MCP in 90 seconds', url: '/learn/mcp-in-90-seconds/', category: 'explainer', kicker: '90s', description: 'Model Context Protocol explained without jargon' },
  { title: 'What is an agent?', url: '/learn/what-is-an-agent/', category: 'explainer', kicker: '5m', description: 'Agent vs chatbot vs copilot vs assistant' },
  { title: 'What "agentic" means', url: '/learn/what-is-agentic/', category: 'explainer', kicker: '5m', description: 'Marketing version vs engineering reality' },
  { title: 'Tool calling vs MCP', url: '/learn/tool-calling-vs-mcp/', category: 'explainer', kicker: '5m', description: 'Three things people conflate' },
  { title: 'How agentic loops work', url: '/learn/agentic-loops/', category: 'explainer', kicker: 'DEEP', description: 'ReAct, plan-and-execute, reflexion' },
  { title: 'Glossary', url: '/learn/glossary/', category: 'explainer', kicker: 'A–Z', description: '26 terms, jargon decoded' },

  // FAQs
  { title: 'Is agentic AI hype?', url: '/faq/is-agentic-ai-hype/', category: 'faq', kicker: 'Q.01', description: 'Some of it. Here is how to tell.' },
  { title: 'Will MCP survive 18 months?', url: '/faq/will-mcp-survive/', category: 'faq', kicker: 'Q.02', description: 'Probably yes. Here is why.' },
  { title: 'What can I build with $0?', url: '/faq/build-with-zero-dollars/', category: 'faq', kicker: 'Q.03', description: 'More than you think.' },
  { title: 'Why do agents still hallucinate?', url: '/faq/why-still-hallucinate/', category: 'faq', kicker: 'Q.04', description: 'Pattern completion vs truth.' },

  // Recipes
  { title: 'Automate YouTube SEO across many videos', url: '/recipes/youtube-seo-automation/', category: 'recipe', kicker: 'DRAFT', description: 'Three MCPs chained for content workflow' },

  // MCPs
  { title: 'github-mcp-server', url: '/mcp/github-mcp/', category: 'mcp', kicker: 'DEV', description: 'Official GitHub MCP server' },
  { title: 'playwright-mcp', url: '/mcp/playwright-mcp/', category: 'mcp', kicker: 'BROWSER', description: 'Microsoft Playwright wrapped as MCP' },

  // Lab
  { title: 'Pick Your Stack', url: '/lab/pick-your-stack/', category: 'lab', kicker: 'X.01', description: '5 questions, recommended stack' },

  // Meta
  { title: 'Pulse · live stream', url: '/pulse/', category: 'meta', kicker: 'PULSE', description: 'All recent agentic ecosystem updates' },
  { title: 'This week · MCP movers', url: '/this-week/', category: 'meta', kicker: 'DELTAS', description: 'Top star deltas + recently committed' },
  { title: 'Colophon', url: '/colophon/', category: 'meta', description: 'How this site is built' },
  { title: 'GitHub repo', url: 'https://github.com/susanthgit/agentic-planet', category: 'meta', description: 'View source on GitHub' },
];

export const CATEGORY_LABELS: Record<SearchEntry['category'], string> = {
  pillar: 'PILLARS',
  explainer: 'EXPLAINERS',
  faq: 'FAQ',
  recipe: 'RECIPES',
  mcp: 'MCP SERVERS',
  tool: 'TOOLS',
  vendor: 'VENDORS',
  lab: 'LAB',
  meta: 'META',
};

export const CATEGORY_ORDER: Array<SearchEntry['category']> = [
  'pillar', 'recipe', 'explainer', 'faq', 'mcp', 'lab', 'meta',
];
