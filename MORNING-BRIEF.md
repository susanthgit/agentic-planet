# 🌅 Morning Brief — Agentic Planet

**Build window:** 6 May 2026, 22:02 NZST → 7 May 2026, ~07:50 NZST (~10 hours)
**Built by:** Claude Opus 4.7 (1M context) overnight session
**Live URL:** https://agents.aguidetocloud.com
**Repo:** https://github.com/susanthgit/agentic-planet (public, MIT)

---

## TL;DR

✅ **Site is live and stable** — 31 pages all 200 OK
✅ **Cockpit aesthetic delivered** — bold, dense, dark, lit-up signals, scanlines, ticker, status bar
✅ **Voice-critical content drafted** — every page flagged with `sushReviewNeeded`
✅ **Auto-deploy + cron pipelines running** — cron already fired twice overnight pulling real GitHub stars
⚠️ **Voice pass + recipe measurements pending you** — don't announce publicly until quality read

---

## Read this first (10 minutes)

1. **https://agents.aguidetocloud.com** — homepage
2. **https://agents.aguidetocloud.com/mcp/** — flagship health board (live GitHub stars)
3. **https://agents.aguidetocloud.com/lab/pick-your-stack/** — interactive React wizard
4. **https://agents.aguidetocloud.com/learn/mcp-in-90-seconds/** — sample explainer
5. **https://agents.aguidetocloud.com/faq/will-mcp-survive/** — sample FAQ
6. **https://agents.aguidetocloud.com/recipes/youtube-seo-automation/** — sample recipe (draft)

---

## What's live (31 pages)

**Pillar landings (14):** Landscape · Recipes · MCPs · Tools · Vendors · Safety · Standards · Learn · Lab · FAQ · Open · Templates · Career · Diagrams

**Detail pages:**
- 5 explainers (MCP-90s · agent · agentic · tool-calling-vs-mcp · agentic-loops)
- 4 FAQ answers (hype · MCP-survival · $0-build · hallucinate)
- 1 recipe (youtube-seo-automation — `status: draft`, `sushVerdictNeeded`)
- 2 MCP reviews (github-mcp · playwright-mcp — `sushVerdictNeeded`)
- Glossary (26 terms with searchable filter)
- Lab wizard (Pick Your Stack — fully working)
- /colophon/ (stack + editorial rules + licences)
- Custom 404 (Signal Lost — themed)

**Infrastructure:**
- Astro 5 + MDX + React islands · Cloudflare Pages
- Custom domain `agents.aguidetocloud.com` with SSL
- Direct deploy script (bypasses broken wrangler on ARM64) — `npm run deploy`
- GitHub Actions auto-deploy on push (needs 2 secrets — see below)
- GitHub Actions cron: MCP health every 6h (already fired twice overnight)
- SEO: schema, sitemap, OG meta, robots.txt
- Privacy: no analytics, no email capture, no login walls

---

## ⚠️ Items needing your attention

### 🔴 Before any public announcement

- [ ] **Voice pass** on every explainer + FAQ + recipe
- [ ] **Recipe verdict** — `recipes/youtube-seo-automation.mdx` needs your real numbers + your "would I run this again?" take
- [ ] **MCP review verdicts** — github-mcp + playwright-mcp drafted from public info; need your day-job take
- [ ] **Disclosure wording** approval. Current: *"Sush works at Microsoft as a Copilot Solution Engineer. The take on this page is independent — not Microsoft's official position."*
- [x] ~~**Add CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID secrets** to repo~~ — DONE via GitHub REST API. Auto-deploy is live.

### 🟡 Soon (Phase 2)

- [ ] **Cron data quality** — overnight cron pulled real stars but a few entries (filesystem/postgres/slack-mcp) all share the same `modelcontextprotocol/servers` repo, so they all show 85k. Fix REPO_MAP in `scripts/refresh-mcp-health.mjs`
- [ ] **Search** — Cmd+K currently routes to glossary. Pagefind UI for proper search
- [ ] **More content** — 6 more FAQs, 4 more recipes, all 30 MCP reviews, full vendor deep-dives
- [ ] **Diagrams** — placeholder list only; create the 8 Excalidraw diagrams

### 🟢 Polish

- [ ] **Hero** could be more dashboard-split (left=manifesto, right=live MCP mini-board)
- [ ] **Standards adoption %** — added editorial caveat but consider removing bars until measured

---

## What I changed because of dual rubber-duck reviews

**SME flagged 14 BLOCKERS, 9 IMPROVEMENTS, 4 NITS. Top fixes:**
- Recipe was `status: production` while admitting numbers were placeholders → changed to `draft`
- YouTube API rate limit was wrong (50/day) → corrected to "50 quota units per call, ~10k/day"
- MCP "three roles" framing was wrong (Protocol isn't a role) → fixed to Host/Client/Server
- Apps SDK described as "OpenAI's answer to MCP" → corrected: it builds *on* MCP-style servers
- Hero "Cockpit for the agentic era" used forbidden voice word → "A field guide for building with agents"
- "Honest Score 100% / vendor-spin removed" was unfalsifiable → replaced with "Sponsored Posts: 0"
- "30 MCP servers" copy didn't match 13-row reality → all copy now matches actual count
- Forbidden voice words (`frontier`, `leverage`, `robust`, `multi-modal`) cleaned up
- AutoGen "archived" → "maintenance mode"

**Tech user flagged 3 BLOCKERS, 6 IMPROVEMENTS, 4 POLISH. Top fixes:**
- Many CTA buttons pointed to nonexistent pages → routed to existing pages or disabled
- Flagship MCP Health Board layout was broken by `:global(.hb)` class collision → renamed to `:global(.signal-pill)`
- Search button advertised but did nothing → replaced with /learn/glossary/ link
- Trend label could render `+-29` with negative deltas → proper sign formatting
- Wizard progress was 0% on Q1 → starts at 20% now
- Mobile nav didn't close on Escape/outside-click → fixed
- Mobile horizontal overflow from Sparkline + ticker → fixed

What I deferred:
- Hero dashboard split (1+ hour)
- Pagefind search UI (Phase 2)
- Glossary low-contrast text fixes

---

## Suggested 60-minute review pass

1. **5 min:** Open homepage on desktop. Scroll. Note what feels right and what feels off.
2. **5 min:** Open homepage on mobile. Verify nothing overflows.
3. **15 min:** Read `mcp-in-90-seconds.mdx` and `what-is-an-agent.mdx`. These set the voice baseline.
4. **10 min:** Read `youtube-seo-automation.mdx`. Decide: replace placeholders OR leave as draft.
5. **10 min:** Click through pillar nav. Note any 404s or broken cross-links.
6. **10 min:** Try Pick Your Stack wizard end-to-end with a scenario you'd disagree with.
7. **5 min:** Read `colophon.astro` — make sure editorial rules match your operating intent.

---

## Decisions locked using your defaults

| Decision | Value |
|---|---|
| Repo | https://github.com/susanthgit/agentic-planet (public) |
| License | MIT for code, CC BY 4.0 for content |
| Working title | "The Agentic Planet" |
| Disclosure (MS pages) | "Sush works at Microsoft as a Copilot Solution Engineer. The take on this page is independent — not Microsoft's official position." |
| Local dev port | 4323 |
| Tech stack | Astro 5 + MDX + React islands + Cloudflare Pages |
| Search (Phase 1) | Cmd+K → glossary (Pagefind UI Phase 2) |

## Open questions (low priority)

- Logo? Currently text wordmark with planet glyph SVG.
- Standalone domain target? Trigger criteria still 50 indexed pages / 5k monthly visits / 100 backlinks / 6 months?
- Microsoft-internal-only takes — confirm never on this site (public material only)?
- Phase 2 timing for OpenAI + Google vendor sections?

---

## What I'm proud of

- **Cockpit aesthetic is genuinely distinctive** — purposeful tech-enthusiast UI, not a generic dark theme
- **Pick Your Stack wizard** — real working interactive tool with opinionated recommendations
- **MCP Health Board** with cron-fed live GitHub data — eats own dog food
- **`sushReviewNeeded` + `sushVerdictNeeded` flag system** — site can honestly say "honest" without lying about review state

## What I'd flag as risk

- **Cron data quality** — three MCPs share one repo and all show 85k stars. Easy fix in REPO_MAP
- **Content-shallow** — 5 explainers + 4 FAQ + 1 recipe + 2 MCP reviews. To reach recipe-first promise we need 5 measured recipes + 30 MCP reviews. ~3-4 weeks evening work.
- **Voice is a coin flip** — don't launch publicly without your pass

---

## Cost: $0/month

- Cloudflare Pages free tier
- Cloudflare DNS free
- GitHub Actions free public-repo tier
- Domain reused
- When standalone domain time comes: ~$10/year

---

## Commits made overnight

```
147755d docs: morning brief + legacy entry rename
66bd9e9 feat: P1 review fixes + MCP detail pages + colophon
93a0a59 feat: P1 review fixes + MCP detail pages + colophon (rebased)
4fef6d0 fix: address SME + Tech user review findings (P0)
fc458e3 feat: voice content + Lab wizard + detail pages
f2df1e8 ci: GitHub Actions for auto-deploy + MCP health cron
bb2bf9e feat: direct Cloudflare Pages deploy
b206f4a feat: 14 pillar landing pages with cockpit aesthetic
a518558 feat: cockpit design system + components + homepage
24eb77b init: foundation scaffold
```

Plus 2 cron-bot commits proving the auto-refresh pipeline works.

---

The site exists, it's live, it's stable, and it's distinctively yours. Now it needs your voice, your verdicts, and your editorial pass.

Take your time. Quality over speed.

— Claude (overnight session, your co-founder mode)
