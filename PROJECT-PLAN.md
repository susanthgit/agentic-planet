# 🪐 The Agentic Planet — Master Project Plan

> A curated, opinionated, honest field guide to the agentic AI ecosystem — for techies. Plain English throughout.

| | |
|---|---|
| **Working domain (Phase 1)** | `agents.aguidetocloud.com` |
| **Future domain (Phase 2)** | TBD — standalone (e.g. `agentic.dev`, `theagenticatlas.com`) |
| **Audience** | Tech professionals — devs, IT pros, architects, infra folks, builders |
| **Voice** | Plain English. Opinionated. Honest. No vendor spin. Day-job lens. |
| **Brand parent** | aguidetocloud.com (sub-domain) — NOT Plain AI Curriculum |
| **Tech stack** | Astro + MDX + React islands, Cloudflare Pages |
| **Design system** | Zen System (inherited) + tech extensions |
| **Status** | Planning — not scaffolded |
| **Owner** | Sush (Susanth Sutheesh) |
| **Doc version** | 1.0 — created 6 May 2026 |

---

## 0. North Star

A curated, opinionated, honest **field guide** for the agentic AI ecosystem — for techies — in plain English.

**Single competitive claim:**
> *"Recipes you can trust, reviews you can act on, in plain English."*

**What we are NOT:**
- ❌ Not a registry (Smithery / MCP.so cover that)
- ❌ Not exhaustive (opinionated curation only)
- ❌ Not a newsletter (Pillar 13 cut)
- ❌ Not a forum/community (Pillar 14 cut — cross-link instead)
- ❌ Not Plain AI Curriculum (different audience, different brand rules)
- ❌ Not vendor-sponsored content

**What we ARE:**
- ✅ Tech-only audience
- ✅ Plain English voice
- ✅ Opinionated — every page has a take
- ✅ Recipe-first — measurable before/after workflows
- ✅ Vendor-neutral honest comparisons
- ✅ Privacy/safety lens for actual users
- ✅ Live signals (cron-fed, not real-time)

---

## 1. Audience

**Primary:** Tech professionals already in or adjacent to the agentic AI space.
- Devs evaluating MCPs / agent frameworks for real projects
- IT pros / architects asked to assess "agentic AI" for their orgs
- Solution engineers / consultants positioning agentic to customers
- Builders & indie hackers wiring agents into workflows
- Researchers & students wanting an opinionated tour

**NOT primary:** general public, non-technical end-users, AI researchers writing papers, marketers chasing AI hype.

**Reader's question we always answer:** *"Should I actually use this? What will it cost me in time/risk? What's the catch?"*

---

## 2. Voice & Brand

### Voice rules (inherit from Sush's voice library)
- **Plain English** — even for technical concepts. Reference: Plain AI Voice Guardrail (`~/.copilot/plain-ai-voice-guardrail.md`).
- **Honest take** — call out hype, vapor, broken promises.
- **No brag-blocks** — no "I have X years experience" headers. Voices and recipes do the trust-building.
- **Day-job framing allowed** — "I deploy this for Microsoft customers" is positioning, not bragging.
- **Comparison tables > prose** for tools/vendors/MCPs.
- **Mental models / analogies first**, then technical depth.

### Brand rules (specific to Agentic Planet — NOT Plain AI Curriculum)
- ✅ Monetisation eventually allowed (sponsored sections, courses, books, premium content) — but **not at launch**, and only with full transparency
- ✅ Vendor relationships allowed if disclosed (e.g., Sush is a Microsoft employee — say so on every Microsoft page)
- ✅ Affiliate links allowed if disclosed and the product is genuinely recommended
- ❌ No "AI-generated" content without human editing pass
- ❌ No "growth hacks" that compromise voice (clickbait titles, fake urgency, dark patterns)
- ❌ No login walls, paid tiers, or email-capture popups for at least Phase 1

### What if the Plain AI constitution conflicts?
This is **not** Plain AI. Plain AI is for everyone (no profit, no growth tactics). Agentic Planet is for techies and may eventually generate revenue. The two stay separate properties with different rules. Voice is shared (plain English); brand rules are not.

---

## 3. The 14 Pillars

> Pillars 13 (Pulse/Newsletter) and 14 (Community) are explicitly excluded.

### 🌍 Pillar 1 — The Landscape

**One-liner:** Where the agentic ecosystem came from, where it is now, where it's going.

**Why it exists:** Techies need a fast orientation map. Most onboarding to "agentic AI" is via Twitter threads or vendor blog posts — both biased.

**Page types:**
- `/landscape/` — visual home: timeline + vendor map + state-of overview
- `/landscape/timeline/` — interactive timeline (chatbots → tool use → MCP → agents → multi-agent)
- `/landscape/state-of/2026-q2/` — quarterly snapshot (versioned URL, archived old ones)
- `/landscape/vendors/` — high-level vendor map (links to Pillar 9)
- `/landscape/predictions/` — Sush's predictions log + revisits (rare trust-building content)

**Content automation:** Quarterly snapshot = manual. Timeline = manual (slow-moving). Vendor map = data-driven.

**Day 1 minimum:** Timeline, current state-of, vendor map.

**Cross-links:** Pillars 7 (Standards), 9 (Vendors), 16 (FAQ).

---

### 📚 Pillar 2 — Plain English Explainers

**One-liner:** The concepts, in language that respects the reader's time.

**Why it exists:** Even technical readers don't have time to sift through Anthropic's MCP spec to understand what MCP really is. Plain English wins.

**Page types:**
- `/learn/` — explainer index, organised by depth (90 sec / 5 min / deep)
- `/learn/{topic}/` — individual explainers
- `/learn/glossary/` — searchable jargon decoder
- `/learn/diagrams/` — visual library (links to Pillar 15)

**Day 1 explainer set (10 articles):**
1. What is an agent? (vs chatbot vs copilot vs assistant)
2. What is MCP — in 90 seconds
3. What is "agentic" — what the word actually means
4. Tool calling vs function calling vs MCP
5. The agentic stack — visual breakdown
6. RAG, in plain English
7. Agentic loops — how they actually work
8. Context windows and why they matter
9. The role of memory in agents
10. Multi-agent systems — when they're useful, when they're not

**Content automation:** Hand-written. Evergreen. Updated when concepts shift.

**Cross-links:** All other pillars link back to relevant explainer.

---

### 🛠️ Pillar 3 — Current Agentic Tools

**One-liner:** Honest reviews of the tools techies actually use.

**Why it exists:** Most "tool reviews" are sponsored or surface-level. We test, we use, we tell.

**Categories:**
- Coding agents (Cursor, Cline, Continue, Aider, Claude Code, Copilot CLI, Codex, Roo Code, Windsurf)
- General agents (Claude Desktop, ChatGPT, Copilot, Gemini, Perplexity)
- Browser agents (Operator, Browser Use, Playwright MCP, Stagehand)
- Voice agents (Vapi, Retell, OpenAI Realtime)
- Workflow / orchestration (n8n, LangFlow, CrewAI, AutoGen, LangGraph, Pipedream)
- Self-hosted / local (Ollama, LM Studio, Open WebUI, LocalAI)

**Page types:**
- `/tools/` — catalog with filters
- `/tools/{slug}/` — review page (verdict, pros, cons, who-it's-for, what-it-costs, screenshots)
- `/tools/compare/?a=cursor&b=cline` — side-by-side comparator (interactive, Pillar 10 muscle)

**Review format (template):**
- TL;DR verdict (one sentence)
- Who this is for / not for
- What it does (plain English)
- Pricing reality (free tier limits, real costs)
- Setup time (measured)
- The catch (every tool has one)
- Better alternative if any
- Sush's day-job take

**Content automation:** Reviews = hand. Catalog metadata (last updated, pricing tier) = data file with cron-checked external links.

**Day 1 minimum:** 12 reviews across 4 categories.

**Cross-links:** Pillar 6 (Recipes — "Cursor + GitHub MCP recipe"), Pillar 4 (MCPs they support).

---

### 🔌 Pillar 4 — MCP Servers

**One-liner:** The 30 MCPs worth your time, with health signals.

**Why it exists:** MCP space is the wild west. New servers daily, half abandoned within months. Techies need a curated, honest, *health-signalled* list.

**Categories:**
- Dev tools (GitHub, GitLab, file system, Git ops)
- Productivity (Calendar, email, notes, Slack, Teams)
- Browser automation (Playwright, Browserbase, Puppeteer)
- Data (Postgres, MongoDB, S3, Cloudflare R2)
- Cloud (Azure, AWS, GCP, Cloudflare)
- AI services (vector DBs, embeddings, search)
- Personal (YouTube, Spotify, Notion, Obsidian)

**Page types:**
- `/mcp/` — catalog with health board
- `/mcp/health-board/` — detailed health table (THE signature page)
- `/mcp/{slug}/` — individual MCP detail page
- `/mcp/build-your-own/` — starter guide
- `/mcp/badges/` — embeddable health badges (public good)

**MCP detail page format:**
- TL;DR + verdict
- What it does
- Health: stars, Δ7d, last commit, issue response time
- Setup walkthrough that actually works
- **What data does it touch?** (privacy section)
- Combinations: "Works great with X, Y, Z"
- Sush's recipe-link if any
- Honest issues / known bugs

**Health board fields:**
| Server | Stars | Δ7d | Last commit | Issue response | Verdict |
|---|---|---|---|---|---|
| github-mcp | 12.4k | +320 | 2d ago | <24h | 🟢 Alive |
| legacy-mcp-x | 1.1k | -2 | 8mo ago | none | 🔴 Abandoned |

**Content automation:**
- Stars / commits / issue response = **GitHub Actions cron** every 6 hours
- Badge generation = static SVG generated by GitHub Action
- Reviews / verdicts = hand
- Auto-flag in our Slack if a featured MCP goes 90 days without commits → review trigger

**Day 1 minimum:** 30 MCPs with full reviews. Health board live.

**Cross-links:** Pillar 6 (Recipes use these), Pillar 8 (Safety per MCP), Pillar 11 (Templates for building your own).

---

### 🧪 Pillar 5 — Open Source Projects

**One-liner:** Beyond MCPs — the wider open-source agent ecosystem worth knowing.

**Why it exists:** Frameworks, indie projects, self-hosted alternatives, "Open Claw" projects all live here. MCPs alone don't cover it.

**Sub-categories:**
- Frameworks (LangChain, LlamaIndex, Haystack, Semantic Kernel, AutoGen, CrewAI, Mastra)
- Open-source agents (AutoGPT successors, BabyAGI descendants, indie LLM agents)
- Self-hosted alternatives (replacement for closed-source agentic tools)
- Indie hacker projects (the cool weekend-builds)
- Research projects worth tracking

**Page types:**
- `/open/` — gallery with filters
- `/open/{slug}/` — project detail (stars, contributors, vibe, who-it's-for)
- `/open/spotlight/` — monthly project spotlight (one well-written piece per month)

**Content automation:** Catalog metadata = cron. Spotlight = hand.

**Phase:** Phase 2 (not Day 1).

**Cross-links:** Pillar 4 (MCPs are a subset), Pillar 11 (Templates often build on these), Pillar 9 (Vendors fund some of these).

---

### 🍳 Pillar 6 — Recipes (THE MOAT)

**One-liner:** Real workflows. Multiple agents/MCPs combined. Measured before/after. The thing nobody else does.

**Why it exists:** This is the differentiation. Lists exist everywhere. *Measurable, narrative, multi-component recipes do not.*

**Recipe format (template):**
- Title — outcome-focused ("Automate YouTube SEO across 30 videos in 8 minutes")
- TL;DR — one paragraph
- The problem (plain English, not technical)
- The components (which tools/MCPs/agents)
- Architecture diagram (Excalidraw)
- Before / After table — **with measured numbers**
- Step-by-step build (with code snippets in MDX)
- The catch — what could go wrong
- Cost (tokens, API calls, time)
- Sush's take — would I run this again?
- Variants / alternatives

**Page types:**
- `/recipes/` — catalog with filters (by domain, by tools used, by time saved)
- `/recipes/{slug}/` — full recipe
- `/recipes/templates/` — boilerplates derived from recipes (links to Pillar 11)

**Day 1 launch recipes (5 — all real Sush workflows):**
1. **YouTube SEO automation** — Playwright MCP + YouTube MCP + Cloudflare MCP. Time save: 2h → 8min.
2. **PR triage workflow** — GitHub MCP + Slack MCP + Claude. Time save: 45min → 4min.
3. **Toolkit data freshness check** — TOML data files + GitHub MCP + cron. Manual save: 4h/month → 0.
4. **Blog SEO audit** — Web search MCP + Cloudflare MCP + Claude. Time save: 1h per post → 5min.
5. **MCP health monitoring** (meta — uses our own health board)

**Content automation:** All hand-written. The voice is the value.

**Cadence:** 1-2 new recipes per month after launch.

**Cross-links:** Every recipe links back to its component tools (P3) and MCPs (P4).

---

### 🏛️ Pillar 7 — Standards & Protocols

**One-liner:** MCP, A2A, Apps SDK, Agent Protocols — what they are, when they matter.

**Why it exists:** Multiple competing protocols. Techies need to know which to bet on, when, why.

**Page types:**
- `/standards/` — overview + comparison
- `/standards/mcp/` — Anthropic's Model Context Protocol
- `/standards/a2a/` — Google's Agent-to-Agent
- `/standards/apps-sdk/` — OpenAI's Apps SDK
- `/standards/{other-emerging}/` — placeholder for future
- `/standards/comparison/` — side-by-side table
- `/standards/protocol-war/` — opinionated take ("which to bet on")

**Content per standard:**
- What it is (plain English)
- Who's behind it
- Adoption signals (vendor support, ecosystem size)
- Spec link + plain-English summary
- Pros / cons
- Where it's heading
- Sush's "should you care?" verdict

**Content automation:** Hand. Quarterly review for spec changes.

**Day 1 minimum:** MCP, A2A, Apps SDK + comparison.

**Cross-links:** Pillar 4 (MCP catalog), Pillar 9 (Vendors push different protocols).

---

### 🛡️ Pillar 8 — Safety, Privacy, Honest Risks

**One-liner:** What does this agent actually access? What can go wrong? Plain English, with examples.

**Why it exists:** Massive gap. Most "AI safety" content is enterprise-grade or academic. Nothing for techies who just want to know if it's safe to let an agent touch their email.

**Page types:**
- `/safety/` — overview + risk catalog
- `/safety/prompt-injection/` — what it is, real examples, how to spot
- `/safety/data-flow/` — "what does this agent actually touch" (with diagrams per common tool)
- `/safety/decision-trees/` — interactive: "should I let this agent X my Y?"
- `/safety/failure-modes/` — context exhaustion, tool-call loops, prompt drift, hallucination
- `/safety/privacy/` — where does my data go, per provider
- `/safety/threat-models/` — enterprise vs hobbyist (different threats, different advice)

**Content automation:** Hand. Updated when major incidents/breaches surface.

**Day 1 minimum:** Prompt injection explainer, data flow diagrams for top 5 tools, decision tree.

**Cross-links:** Every Pillar 4 MCP page links to its safety profile here.

---

### 💼 Pillar 9 — Vendor Deep-Dives

**One-liner:** Microsoft, Anthropic, OpenAI, Google, Meta — honest, side-by-side, no spin.

**Why it exists:** Sush's day-job edge. He actually deploys all of these. No one else can write this with this credibility AND independence.

**Vendors (Day 1 launch — 2 vendors only):**
- **Microsoft** (Sush's day job — disclose on every page): Copilot Studio, Connectors, Foundry, Agent 365, Declarative Agents, MCP plugins, Apps SDK adoption
- **Anthropic**: Claude, Skills, MCP, Computer Use, Agent SDK

**Phase 2 vendors:**
- **OpenAI**: GPTs, Apps SDK, Agents SDK, Operator, Realtime API
- **Google**: Gemini agents, A2A, Vertex Agents, Notebook LM
- **Meta**: Llama Stack, agentic frameworks

**Per-vendor structure:**
- `/vendors/{name}/` — overview
- `/vendors/{name}/products/` — product map
- `/vendors/{name}/strategy/` — what's their agentic play, honest read
- `/vendors/{name}/{product}/` — individual product deep-dives
- `/vendors/{name}/changelog/` — what shipped recently

**Cross-vendor pages:**
- `/vendors/compare/` — side-by-side table (capabilities, ecosystem, pricing model)
- `/vendors/who-leads/` — opinionated take per use case

**Disclosure rule:** Microsoft pages MUST display "Sush works at Microsoft. This is his independent take, not Microsoft's official position." Footer on every Microsoft page.

**Content automation:** Hand. Auto-changelog from vendor RSS/blog feeds where available.

**Cross-links:** Every product links back to relevant Pillar 3 (tool review), Pillar 4 (MCP), Pillar 7 (standards).

---

### 🧰 Pillar 10 — Interactive Tools (the Lab)

**One-liner:** Calculators, comparators, wizards — answer real questions interactively.

**Why it exists:** Sush's existing toolkit muscle. Interactive tools rank well in search and become reference utilities.

**Tools to build:**
- **Pick your stack wizard** — 5-question flow → recommended tools/MCPs (Licence Picker pattern)
- **Cost calculator** — tokens × calls × days → projected monthly cost (Claude / GPT / Gemini)
- **Model comparator** — task vs latency vs cost vs context (live data fed)
- **MCP combination explorer** — pick 2-3 MCPs → see existing recipes
- **Decision tree: "MCP vs Skills vs Copilot Studio"** — interactive flowchart
- **Health badge generator** — paste a GitHub URL → get embeddable SVG badge

**Page types:**
- `/lab/` — index of all tools
- `/lab/{tool}/` — individual interactive tool

**Tech:** React islands within Astro. State stays client-side (zero-cost principle).

**Phase:** Phase 2 (not Day 1). Phase 1 ships *one* signature tool: the **Pick Your Stack wizard**.

**Cross-links:** Linked from every relevant pillar.

---

### 📐 Pillar 11 — Templates & Starters

**One-liner:** Copy-paste boilerplates that actually work.

**Why it exists:** Recipe shows the workflow. Template is the executable starting point.

**Categories:**
- Boilerplate Copilot Studio agents
- Boilerplate Claude Skills
- Boilerplate MCP servers (Python, Node, Go)
- Boilerplate declarative agents
- Reusable system prompts library
- Recipe-derived templates

**Page types:**
- `/templates/` — catalog
- `/templates/{slug}/` — README + "view on GitHub" + "fork this"

**Tech:** Each template is a public GitHub repo. Site embeds the README + provides metadata.

**Phase:** Phase 3.

**Cross-links:** Pillar 6 (Recipes link to their template), Pillar 4 (MCP build-your-own links here).

---

### 🎓 Pillar 12 — Career & Skills

**One-liner:** What an agentic-AI-fluent techie should learn, do, become.

**Why it exists:** Tech professionals want a learning roadmap. Most career advice is generic ("learn AI"). Specific is rare.

**Page types:**
- `/career/` — overview
- `/career/skills-2026/` — what to learn this year
- `/career/roles/` — emerging roles (agent ops, agent designer, prompt engineer reality check)
- `/career/for-it-pros/` — specific path
- `/career/for-devs/` — specific path
- `/career/for-architects/` — specific path
- `/career/honest-faq/` — "is my job safe?" "is prompt engineer real?" "do I need to learn X?"

**Content automation:** Hand. Refreshed yearly.

**Phase:** Phase 3.

**Cross-links:** Pillar 16 (FAQ overlap), Pillar 9 (vendor cert paths).

---

### 🎨 Pillar 15 — Visual Library

**One-liner:** Reusable diagrams, embeddable, MIT-licenced.

**Why it exists:** Sush's Excalidraw skill is real. Visuals are scarce in this space and people will embed them — viral SEO.

**Content:**
- The agentic stack diagram
- How MCP works (visual)
- Tool calling vs function calling
- Multi-agent architecture patterns
- Prompt injection examples (visual)
- Each pillar gets one signature diagram

**Page types:**
- `/diagrams/` — gallery
- `/diagrams/{slug}/` — diagram + embed code + "Open in Excalidraw" button + downloadable SVG/PNG

**Tech:** Excalidraw JSON files in repo, rendered via Excalidraw embed library.

**Phase:** Day 1 (lightweight — 8 diagrams to start).

**Cross-links:** Pillars 2, 7, 8 use these heavily.

---

### ❓ Pillar 16 — Honest FAQ

**One-liner:** The big questions, answered without vendor spin.

**Why it exists:** Trust-building. Nobody answers these honestly in plain English.

**Day 1 questions:**
1. Is agentic AI hype?
2. Will MCP survive 18 months or get replaced?
3. What can I actually build right now with $0?
4. Why do agents still hallucinate?
5. Is "prompt engineer" still a real role?
6. Should I build on Anthropic, OpenAI, or both?
7. Is local/self-hosted agents practical yet?
8. How much does running an agent workflow really cost?
9. What's the difference between Claude Skills and a Copilot Studio agent?
10. Is agentic AI going to replace SaaS?

**Page types:**
- `/faq/` — index, categorised
- `/faq/{slug}/` — individual answer (long-form, not 2-line)

**Content format per question:**
- One-paragraph honest answer at top
- Then expansion with nuance
- Counter-take if relevant
- Last reviewed date

**Content automation:** Hand. Reviewed quarterly.

**Cross-links:** Linked from homepage hero, every pillar landing.

---

## 4. Information Architecture

### Top-level navigation

```
Landscape   Tools   MCPs   Recipes   Vendors   Safety   Standards   Lab   Learn   Diagrams   FAQ
```

### URL hierarchy

```
agents.aguidetocloud.com/
├── /                              # homepage
├── /landscape/
├── /learn/                        # explainers (Pillar 2)
│   ├── /glossary/
│   └── /{topic}/
├── /tools/                        # Pillar 3
│   ├── /compare/
│   └── /{slug}/
├── /mcp/                          # Pillar 4
│   ├── /health-board/
│   ├── /build-your-own/
│   ├── /badges/
│   └── /{slug}/
├── /open/                         # Pillar 5
├── /recipes/                      # Pillar 6
│   └── /{slug}/
├── /standards/                    # Pillar 7
│   └── /{slug}/
├── /safety/                       # Pillar 8
├── /vendors/                      # Pillar 9
│   └── /{vendor}/
├── /lab/                          # Pillar 10
│   └── /{tool}/
├── /templates/                    # Pillar 11
├── /career/                       # Pillar 12
├── /diagrams/                     # Pillar 15
└── /faq/                          # Pillar 16
```

### Cross-link graph (the magic)
Every entity (tool, MCP, vendor product, recipe) has cross-references. Example MCP page links to: tools that support it, recipes that use it, safety profile, related MCPs, vendor that backs it, build-your-own template.

This dense cross-linking is the difference between "list" and "atlas."

---

## 5. Design System

### Inheritance — Zen System base
- `--accent: #6366F1` (indigo) light / `#818CF8` dark
- 8px spacing grid, type scale, border-radius scale
- Inter for body, Geist Mono for code
- One Body, Two Organs rule applies — shared chrome (nav, footer, theme toggle) syncs with main aguidetocloud.com

### Tech extensions (additions for this site only)
- `--mono-accent` — for terminal/data accents (use sparingly)
- `--panel-border-tech` — slightly heavier border for terminal-style panels
- `--health-green / --health-yellow / --health-red` — status badges
- `--data-positive / --data-negative` — for delta indicators (+320 / -2)
- Optional `--scanline` overlay (used only on hero, signature elements)

### Components to build
| Component | Used by | Notes |
|---|---|---|
| `<HealthBadge>` | Pillar 4, 5 | 🟢🟡🔴 + hover for details |
| `<DeltaPill>` | Pillar 4 | +320 / -2 with sign-coloured |
| `<TerminalPanel>` | Hero, signature pages | Box-art frame |
| `<CompareTable>` | Pillars 3, 4, 7, 9 | Sortable, filterable |
| `<RecipeCard>` | Pillar 6 | TL;DR + before/after numbers |
| `<VendorBadge>` | Pillar 9 | With Microsoft disclosure |
| `<DiagramEmbed>` | Pillars 2, 8, 15 | Excalidraw renderer |
| `<DecisionTree>` | Pillars 8, 10 | Interactive flowchart |
| `<SafetyProfile>` | Pillar 4 detail pages | Data-flow diagram + risk score |
| `<HealthBoard>` | Pillar 4 | The flagship table |

### Design DNA principles
- **Density without overwhelm** — every panel scannable in 2 sec
- **Live signals everywhere** — stars Δ, last commit, freshness
- **Box-art / panel layout** — terminal-ish without going full hacker
- **Indigo + monospace accents**
- **Progressive disclosure** — homepage = peek, detail pages = depth
- **⌘K command palette** is hero search

### Anti-patterns (forbidden, per Zen System)
- ❌ Hardcoded colours
- ❌ Per-tool accent colours — one accent only
- ❌ Backdrop filters
- ❌ Decorative gradients/glows/glassmorphism/shimmer
- ❌ Arbitrary spacing values
- ❌ Animations > 200ms
- ❌ Animations on anything other than `transform / opacity / color / background-color / border-color / box-shadow`

---

## 6. Mockups

### 🖥️ Mockup 1 — Homepage

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [logo]  Landscape  Tools  MCPs  Recipes  Vendors  Safety  more ▼       │
│  ─────────────────────────────────────────────────────  search ⌘K  ☼   │
└─────────────────────────────────────────────────────────────────────────┘

  ╔══════════════════════════════════════════════════════════════════════╗
  ║   THE AGENTIC PLANET                                                  ║
  ║   ────────────────────                                                ║
  ║   Tools, MCPs, recipes, and honest reviews for techies                ║
  ║   building with agents. Plain English. No vendor spin.                ║
  ║                                                                        ║
  ║   [Explore the landscape →]   [Browse recipes →]                      ║
  ╚══════════════════════════════════════════════════════════════════════╝

  ┌─ THE PULSE ─────────────────────────────────────────────  3h ago ─┐
  │  ▲ Anthropic ships Computer Use v3      ▲ MCP spec 2.0 RFC drops │
  │  ▼ AutoGen archived (last commit 4mo)   ● Claude Skills GA       │
  └────────────────────────────────────────────────────────────────────┘

  ┌─ LANDSCAPE ────────────────┐  ┌─ TOP RECIPES ───────────────────┐
  │ ▓▓▓▓▓▓░░ Coding agents (12)│  │ 🍳 YouTube SEO automation       │
  │ ▓▓▓▓░░░░ Browser agents (8)│  │    playwright + youtube + cf    │
  │ ▓▓▓░░░░░ Voice agents  (5) │  │    ⏱ 2h → 8min · ⭐ 124         │
  │ ▓▓▓▓▓▓▓░ MCP servers (348) │  │                                  │
  │ ▓▓░░░░░░ Frameworks   (9)  │  │ 🍳 PR triage with 3 MCPs         │
  │ → Browse landscape          │  │    ⏱ 45min → 4min · ⭐ 89       │
  └────────────────────────────┘  └──────────────────────────────────┘

  ┌─ MCP HEALTH BOARD ───────────────────────────────────────────────┐
  │  Server                Stars   Δ7d   LastCommit   Health         │
  │  ──────────────────────────────────────────────────────────────  │
  │  github-mcp            12.4k   +320  2d ago       🟢 Alive       │
  │  playwright-mcp         8.1k   +180  6h ago       🟢 Alive       │
  │  cloudflare-mcp         3.2k   +45   3w ago       🟡 Slowing     │
  │  legacy-mcp-x           1.1k   -2    8mo ago      🔴 Abandoned   │
  │  → Full health board (top 30)                                    │
  └──────────────────────────────────────────────────────────────────┘

  ┌─ HONEST FAQ ─────────────────┐  ┌─ VENDOR DEEP DIVES ────────────┐
  │ Is agentic AI hype?          │  │ MS · Anthropic                 │
  │ Will MCP survive 18mo?       │  │ Side-by-side honest comparison │
  │ What can I build with $0?    │  │ → Compare vendors              │
  │ → Read the FAQ               │  │                                │
  └──────────────────────────────┘  └────────────────────────────────┘

  ┌─ LATEST EXPLAINERS ──────────────────────────────────────────────┐
  │  · MCP in 90 seconds         · Agentic loops, simply             │
  │  · Tool calling vs MCP       · Prompt injection — examples       │
  │  · The agentic stack         · Should I let it touch my email?   │
  └──────────────────────────────────────────────────────────────────┘

  ┌─ FOOTER ─────────────────────────────────────────────────────────┐
  │  Part of aguidetocloud.com  ·  Built by Sush  ·  Open source     │
  │  Disclosure: Sush works at Microsoft. Independent takes only.    │
  └──────────────────────────────────────────────────────────────────┘
```

### 🍳 Mockup 2 — Recipe detail page

```
  ┌── breadcrumb ───────────────────────────────────────────────────┐
  │  Recipes / YouTube SEO automation                                │
  └──────────────────────────────────────────────────────────────────┘

  ╔══════════════════════════════════════════════════════════════════╗
  ║  AUTOMATE YOUTUBE SEO ACROSS 30 VIDEOS IN 8 MINUTES               ║
  ║                                                                    ║
  ║  ⏱ 2h → 8min       💰 ~$0.40/run     🟢 Production-ready         ║
  ║  Components: playwright-mcp · youtube-mcp · cloudflare-mcp        ║
  ╚══════════════════════════════════════════════════════════════════╝

  ┌─ TL;DR ──────────────────────────────────────────────────────────┐
  │  Three MCPs chained: rewrite titles, push updates, verify CTR.   │
  │  Manual: 2h. Automated: 8min. Cost: $0.40/run.                   │
  └──────────────────────────────────────────────────────────────────┘

  ┌─ ARCHITECTURE ───────────────────────────────────────────────────┐
  │                                                                   │
  │   [Claude] ──► [youtube-mcp] ──► fetch 30 video titles           │
  │      │                                                            │
  │      ▼                                                            │
  │   rewrite (Claude prompt)                                        │
  │      │                                                            │
  │      ▼                                                            │
  │   [youtube-mcp] ──► push title updates                           │
  │      │                                                            │
  │      ▼                                                            │
  │   [cloudflare-mcp] ──► purge cache                               │
  │                                                                   │
  └──────────────────────────────────────────────────────────────────┘

  ┌─ BEFORE / AFTER (measured over 3 runs) ──────────────────────────┐
  │                              Before        After                  │
  │  Time per title              4min          16sec                  │
  │  Titles processed/hour       15            450                    │
  │  Cost per run                $0 (time)     $0.40 (API)            │
  │  Manual touchpoints          30            1                      │
  │  Risk of typos               High          Low (review pass)      │
  └──────────────────────────────────────────────────────────────────┘

  ┌─ STEP-BY-STEP BUILD ─────────────────────────────────────────────┐
  │  1. Install MCPs                                                  │
  │  2. Configure auth (links → setup walkthroughs)                  │
  │  3. The orchestration prompt (with full prompt code)             │
  │  4. Run it                                                        │
  │  5. Review the diff before pushing                                │
  └──────────────────────────────────────────────────────────────────┘

  ┌─ THE CATCH ──────────────────────────────────────────────────────┐
  │  ⚠ YouTube rate limits at 50 video updates / day                 │
  │  ⚠ Always review the diff — Claude sometimes drops emojis        │
  │  ⚠ Cache purge can take 30s on Cloudflare free tier              │
  └──────────────────────────────────────────────────────────────────┘

  ┌─ SUSH'S TAKE ────────────────────────────────────────────────────┐
  │  I run this monthly. Caught a typo once that I'd missed manually │
  │  for 3 months. The review step is non-negotiable. Worth it.      │
  └──────────────────────────────────────────────────────────────────┘

  Related recipes  ·  Component MCPs  ·  Build the template  ·  Share
```

### 🔌 Mockup 3 — MCP Health Board (signature page)

```
  ┌── breadcrumb ───────────────────────────────────────────────────┐
  │  MCPs / Health Board                                             │
  └──────────────────────────────────────────────────────────────────┘

  ╔══════════════════════════════════════════════════════════════════╗
  ║  MCP HEALTH BOARD                                  Updated: 3h ago║
  ║  The 30 MCP servers worth your time, with live signals.          ║
  ╚══════════════════════════════════════════════════════════════════╝

  Filter: [All] [Dev] [Productivity] [Browser] [Cloud] [Data] [AI]
  Sort:   [Stars ▼] [Δ7d] [LastCommit] [Health]

  ┌──────────────────────────────────────────────────────────────────┐
  │ Server               Cat       Stars   Δ7d    Last     Health    │
  │ ────────────────────────────────────────────────────────────────  │
  │ 🟢 github-mcp        Dev       12.4k   +320   2d       Alive     │
  │ 🟢 playwright-mcp    Browser   8.1k    +180   6h       Alive     │
  │ 🟢 postgres-mcp      Data      6.7k    +95    1d       Alive     │
  │ 🟡 cloudflare-mcp    Cloud     3.2k    +45    3w       Slowing   │
  │ 🟡 figma-mcp         Design    2.1k    +12    6w       Slowing   │
  │ 🔴 legacy-mcp-x      Misc      1.1k    -2     8mo      Abandoned │
  │ ...                                                                │
  └──────────────────────────────────────────────────────────────────┘

  ┌─ HEALTH SIGNAL DEFINITIONS ──────────────────────────────────────┐
  │  🟢 Alive       commit < 30d, issue response < 7d                │
  │  🟡 Slowing     commit 30-90d OR issue response > 14d            │
  │  🔴 Abandoned   commit > 90d AND no issue response               │
  │                                                                    │
  │  Data refreshed every 6h via GitHub API.                          │
  │  Dispute or correct → email or open issue on our repo.            │
  └──────────────────────────────────────────────────────────────────┘

  [Embed this board on your site →]   [Subscribe to MCP-of-the-month]
```

---

## 7. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Static site generator | **Astro** | MDX support, React islands for interactive Lab tools, fast builds |
| Content format | **MDX** | Rich content, embedded components, code blocks |
| UI framework (islands only) | **React** | Sush's existing muscle, ecosystem |
| Hosting | **Cloudflare Pages** | Free tier, edge cache, parity with main site |
| Domain (Phase 1) | **agents.aguidetocloud.com** | DNS via Cloudflare |
| Search | **Pagefind** (static) | Zero infra, client-side, fast |
| Diagrams | **Excalidraw** + custom JSON loader | Sush's existing skill |
| Health data | **GitHub Actions cron** → JSON files in repo | Zero infra, transparent |
| Forms (if any) | None Phase 1 | No email capture, no login |
| Analytics | **Cloudflare Web Analytics** | Privacy-respecting, cookieless |
| Repo | **Public GitHub** (eat own dog food) | Open source, attracts MCP authors |

### Build pipeline
- Local dev: `npm run dev` (Astro on port 4323 — keep separate from `guided` 4322)
- Build: `npm run build`
- Health data: GitHub Action every 6h writes `src/data/mcp-health.json`
- Deploy: Cloudflare Pages auto-deploy on push to `main`

---

## 8. Phasing

### Phase 1 — Day 1 launch (the cherry blossom)
**Goal:** ship 6 pillars done well, not 14 done weakly.

| Pillar | Day 1 minimum |
|---|---|
| 1 — Landscape | Timeline + state-of + vendor map |
| 2 — Plain Explainers | 10 articles + glossary |
| 6 — Recipes | 5 measurable recipes |
| 8 — Safety | Prompt injection + data flow + decision tree |
| 9 — Vendors | Microsoft + Anthropic deep-dives |
| 16 — FAQ | 10 honest answers |
| 4 — MCPs (lite) | Health board + 30 reviewed MCPs |
| 15 — Diagrams (lite) | 8 signature diagrams |
| 10 — Lab (1 tool only) | Pick Your Stack wizard |

### Phase 2 — Add depth
| Pillar | Phase 2 |
|---|---|
| 3 — Tools | Full catalog with reviews (12+ tools) |
| 4 — MCPs | Build-your-own guide, badges public |
| 5 — Open Source | Gallery + monthly spotlight |
| 7 — Standards | Full coverage incl. emerging |
| 9 — Vendors | Add OpenAI + Google + Meta |
| 10 — Lab | Cost calculator, model comparator |

### Phase 3 — The atlas matures
- Pillar 11 — Templates with public GitHub repos
- Pillar 12 — Career & skills
- Pillar 10 — Remaining Lab tools
- Pillar 15 — Full diagram library (30+)

---

## 9. Content Inventory — what already exists

Sush has substantial existing material that can be repurposed.

| Source | Becomes |
|---|---|
| YouTube tutorials (workflows) | Pillar 6 Recipes |
| aguidetocloud toolkit (56 tools) | Pillar 10 Lab cross-links |
| Study guides (Microsoft certs) | Pillar 9 Microsoft vendor pages |
| Plain AI articles (where tech-relevant) | Pillar 2 Explainers (re-voiced) |
| Existing MCP integrations (work-iq, youtube-channel-mcp, etc.) | Pillar 4 MCP reviews + recipes |
| Excalidraw diagrams (deployment, etc.) | Pillar 15 (some directly reusable) |
| Connect tracking framework | Could become Pillar 12 career insight |
| Session journal incident playbooks | Pillar 8 Safety failure modes |

**Estimate:** ~60% of Day 1 content seeds already exist in some form.

---

## 10. Automation Strategy

### Auto-fed (cron + scripts)
- MCP health data (GitHub Actions, every 6h)
- Tool catalog metadata (last-updated, link-rot check, weekly)
- Vendor changelog feeds (where RSS available)
- Pulse panel ("3h ago" data) — every 6h
- Stars trend / Δ7d calculation — daily

### Hand-curated (the voice work)
- All explainers (Pillar 2)
- All recipes (Pillar 6)
- All FAQ answers (Pillar 16)
- All safety content (Pillar 8)
- All vendor deep-dives (Pillar 9)
- All standards write-ups (Pillar 7)
- Tool reviews + verdicts (Pillar 3)
- MCP reviews + verdicts (Pillar 4 — only metadata is auto)

### Hybrid
- Recipe before/after numbers (auto-collected over multiple runs, hand-narrated)
- Predictions log (hand-written, auto-prompted for revisits)

### Anti-pattern guardrail
> If a pillar can't be sustained without manual weekly work AND has no automation hook, do not ship it.

---

## 11. SEO & Discovery Strategy

### Phase 1 — leverage parent domain
- `agents.aguidetocloud.com` inherits aguidetocloud.com authority
- Cross-link from main site (toolkit, blog, study guides) to relevant agent pages
- Cross-link FROM agent pages to main site (avoid orphan structure)

### Content patterns that win
- **"X vs Y"** comparison pages (Pillar 3, 7, 9) — high search intent
- **"How to use [popular tool]"** recipes
- **"Is X worth it?"** review pages
- **Glossary entries** (Pillar 2) — long-tail traffic
- **"What is [protocol]?"** explainers (Pillar 7)

### Embeddable assets (viral SEO)
- Health badges (`<img src="agents.aguidetocloud.com/badge/github-mcp">`)
- Diagrams (Pillar 15) — others embed → backlinks
- Comparison tables — sometimes copied → attribution links

### Schema markup
- Article schema on explainers/recipes/reviews
- BreadcrumbList everywhere
- HowTo schema on recipes
- FAQPage schema on Pillar 16

### Phase 2 — own domain
- 301 redirects from agents.aguidetocloud.com → new domain
- Maintain cross-links to keep parent SEO benefit

---

## 12. Domain & Migration Plan

### Phase 1 (now)
- Subdomain: `agents.aguidetocloud.com`
- Cloudflare DNS: `CNAME agents → agents-aguidetocloud-com.pages.dev`
- Cloudflare Pages project: `agents-aguidetocloud-com`

### Phase 2 (later — when it earns it)
**Trigger criteria for domain migration:**
- ≥ 50 indexed pages
- ≥ 5k monthly organic visits
- ≥ 100 backlinks
- ≥ 6 months old

**Domain candidates (check availability before deciding):**
- `agentic.dev` (cleanest, dev-friendly)
- `theagenticatlas.com`
- `planetofagents.com`
- `agentcraft.dev`
- `the-agentic.com`

**Migration plan:**
- Buy domain + set up Cloudflare
- 301 redirects from `agents.aguidetocloud.com/*` → `newdomain.com/*`
- Update all internal links
- Submit new sitemap to Google
- Maintain cross-link from main aguidetocloud.com to new domain (preserve SEO juice)

---

## 13. Risks, Guardrails, "Don't Do X"

### 🛡️ Hard guardrails

**G1 — One Body, Two (now Three) Organs.** Shared chrome (nav, footer, fonts, theme toggle, tokens) syncs with aguidetocloud.com main site. Adding a third organ does NOT break the rule — it extends it.

**G2 — Microsoft disclosure.** Every Microsoft vendor page MUST display "Sush works at Microsoft. Independent take." footer.

**G3 — No vendor-sponsored content Phase 1.** Earn the trust first. Phase 2 only with full disclosure.

**G4 — Voice is the moat.** Plain English voice rules apply. Forbidden words list (`~/.copilot/plain-ai-voice-guardrail.md`) applies.

**G5 — Opinionated, not exhaustive.** If we can't review it honestly, we don't list it. Better 30 well-reviewed MCPs than 300 unrated.

**G6 — No login walls, no paid tier, no email capture popups Phase 1.**

**G7 — All claims (time saved, cost, etc.) must be measured and dated.** No vibes.

**G8 — Data freshness signals must be honest.** "Updated 3h ago" must be true. Never fake live-ness.

### ⚠️ Risks to monitor

**R1 — Maintenance debt.** If the cron pipeline breaks and stale data shows live timestamps, trust dies. Add automated alert when health-data write fails.

**R2 — Voice drift.** As content scales, voice can dilute. Quarterly voice audit — random sample 10 pages, score against guardrail, fix outliers.

**R3 — Over-coverage temptation.** Pressure to "cover everything" leads to weak pages. Resist. 30 great > 300 mediocre.

**R4 — Vendor pressure.** Microsoft (and others) may want input on their pages. Polite "no — independent take only" is the answer. Disclosure handles the conflict-of-interest question.

**R5 — MCP/protocol churn.** If MCP gets replaced by a successor, large rewrite needed. Mitigation: structure pillars around capabilities, not specific protocols.

**R6 — Sush's bandwidth.** He's running 56 tools + Plain AI + AGTC + YouTube + study guides + day job. This adds load. Mitigation: phasing (don't ship all 14 Day 1), automation (auto-fed pillars), and content reuse (60% Day 1 from existing material).

**R7 — Brand confusion.** Readers may wonder if this is Plain AI. Mitigation: clear "Part of aguidetocloud.com" footer + visual differentiation from Plain AI's softer aesthetic.

### ❌ Anti-patterns (do not do)
- ❌ Don't try to compete on speed-of-news (Twitter wins)
- ❌ Don't run a newsletter Phase 1 (Pillar 13 cut)
- ❌ Don't open a forum (Pillar 14 cut — cross-link instead)
- ❌ Don't list MCPs we haven't tested
- ❌ Don't write reviews from documentation alone
- ❌ Don't accept guest posts without editorial control
- ❌ Don't use AI-generated content without human pass

---

## 14. Open Questions / Decisions Still to Make

| # | Question | Owner | Blocking |
|---|---|---|---|
| Q1 | Final name (working name "Agentic Planet") | Sush | Phase 2 (Phase 1 launches as `agents.aguidetocloud.com`) |
| Q2 | Logo / wordmark direction | Sush + designer | Phase 1 polish |
| Q3 | Repo name + license (suggest MIT) | Sush | Phase 1 scaffold |
| Q4 | Recipe #1 to launch with — confirm 5 pick | Sush | Phase 1 content |
| Q5 | Should diagrams be CC BY 4.0 or MIT? | Sush | Phase 1 |
| Q6 | Footer disclosure wording (legal-safe phrasing for Microsoft disclosure) | Sush | Phase 1 |
| Q7 | Search: Pagefind vs Algolia DocSearch (free for OSS docs) | Sush | Phase 1 build |
| Q8 | Phase 2 trigger metrics — confirm 50 pages / 5k visits / 100 backlinks / 6 months | Sush | Phase 2 |
| Q9 | Will any Microsoft-internal insights ever appear here? (Default: no — public-only.) | Sush | Phase 1 launch |
| Q10 | Do we want monthly "MCP of the month" deep-dive cadence? | Sush | Post-launch |

---

## 15. Cross-link to other Sush properties

| Property | Relationship |
|---|---|
| aguidetocloud.com (main) | Parent domain. Toolkit + blog + study guides cross-link to Agentic Planet for agent topics. |
| learn.aguidetocloud.com | Gated learning portal. Some agent-related courses may live there; Agentic Planet is public/free. |
| plainai.aguidetocloud.com | Sister property, separate brand rules (no monetisation). Plain English voice shared. Cross-link in footer. |
| Plain AI Curriculum | Separate brand. Different audience (everyone vs techies). Different rules. No monetisation. Cross-link only. |
| YouTube channels | Recipes embed YouTube videos. YouTube descriptions link to recipe pages. |
| Connect tracking | Internal — not public. May inform vendor deep-dives anonymously. |

---

## 16. Appendices

### A. Naming options for Phase 2 domain

| Name | Pros | Cons |
|---|---|---|
| `agentic.dev` | Cleanest, dev-friendly, short | May not be available; "dev" narrows audience |
| `theagenticatlas.com` | Memorable, atlas metaphor matches | Long; "the" is awkward in URLs |
| `planetofagents.com` | Matches working concept | Long; could feel like a movie reference |
| `agentcraft.dev` | Builder vibe | "craft" is overused |
| `the-agentic.com` | Bold, brand-able | Hyphen is awkward |
| `agents-atlas.com` | Descriptive | Hyphen, may not feel premium |

### B. Reference sources (Sush's existing playbooks)
- `~/.copilot/copilot-instructions.md` — global instructions
- `~/.copilot/copilot-instructions-reference.md` — reference annex
- `~/.copilot/plain-ai-voice-guardrail.md` — voice rules
- `C:\ssClawy\learning-docs\docs\reference\zen-system-quickref.md` — design tokens
- `C:\ssClawy\learning-docs\docs\reference\deployment-playbook.md` — deploy discipline
- `C:\ssClawy\learning-docs\docs\reference\tool-integration-checklist.md` — 14-touchpoint checklist
- `C:\ssClawy\learning-docs\docs\reference\voice-and-tone.md` — Sush's voice library

### C. Initial todos (mirrored to SQL `todos` table)
See SQL `todos` table for live status. Top-level structure:
- Phase 0: Approve plan, lock name, register repo
- Phase 1 foundation: Astro scaffold, Zen System integration, Cloudflare Pages setup, GitHub Actions cron
- Phase 1 content: 10 explainers, 5 recipes, 30 MCP reviews, 2 vendor deep-dives, 10 FAQs, 8 diagrams, Pick Your Stack wizard
- Phase 1 launch: SEO checklist, sitemap, analytics, soft launch, hard launch

---

## 17. Sush's voice — one example to anchor

When in doubt, write like this. From the homepage:

> **The Agentic Planet**
>
> Tools, MCPs, recipes, and honest reviews for techies building with agents.
> Plain English. No vendor spin.
>
> If you're trying to figure out which agent tools are worth your time, what data they actually touch, and how to chain them together for real workflows — you're in the right place. We test, we use, we tell.

Not:
> ~~The premier ecosystem hub for agentic AI capabilities, empowering developers to leverage cutting-edge multimodal frontier capabilities for mass-market deployment.~~

(Forbidden words: ecosystem, capabilities, leverage, cutting-edge, multimodal, frontier, mass-market.)

---

**End of master plan v1.0.**

Living document. Update as decisions land. Track changes via git history once repo exists.
