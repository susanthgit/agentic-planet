# 🪐 The Agentic Planet

> Tools, MCPs, recipes, and honest reviews for techies building with agents. Plain English. No vendor spin.

**Live (Phase 1):** https://agents.aguidetocloud.com
**Status:** Early build · pre-launch

---

## What this is

A curated, opinionated, honest field guide to the agentic AI ecosystem — for technical professionals — in plain English.

- 🍳 **Recipes** — real workflows combining multiple agents/MCPs, with measured before/after
- 🔌 **MCP servers** — top 30 reviewed, with live health signals
- 🛠️ **Tools** — honest reviews of agentic tools from someone who actually uses them
- 💼 **Vendors** — Microsoft, Anthropic, OpenAI, Google compared side-by-side
- 🛡️ **Safety** — what does this agent actually access? Plain English risk lens
- 🏛️ **Standards** — MCP, A2A, Apps SDK explained in plain English
- 📚 **Explainers** — concepts in plain English with diagrams

## What this is not

- ❌ Not a registry (Smithery / MCP.so cover that)
- ❌ Not exhaustive (opinionated curation only)
- ❌ Not vendor-sponsored
- ❌ Not a newsletter or forum

## Stack

| Layer | Choice |
|---|---|
| SSG | [Astro](https://astro.build/) + MDX + React islands |
| Hosting | Cloudflare Pages |
| Search | [Pagefind](https://pagefind.app/) (static, client-side) |
| Diagrams | Excalidraw |
| Health data | GitHub Actions cron → JSON in repo |
| Analytics | Cloudflare Web Analytics (privacy-respecting) |

## Local dev

```bash
npm install
npm run dev   # localhost:4323
```

## Build

```bash
npm run build
npm run preview
```

## Project plan

See [`PROJECT-PLAN.md`](./PROJECT-PLAN.md) for the master plan — pillars, IA, design system, phasing, automation strategy, and risks.

## Disclosure

[Sush (Susanth Sutheesh)](https://github.com/susanthgit) works at Microsoft as a Copilot Solution Engineer. Vendor pages on this site state their independent take — not Microsoft's official position.

## License

- **Code:** [MIT](./LICENSE)
- **Content** (articles, recipes, reviews, diagrams): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## Contributing

Open to PRs that fix typos, factual errors, broken links, or stale data. Voice and editorial direction are author-led — open an issue to propose new content rather than submitting unsolicited articles.
