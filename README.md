# geo-seo-plugin

A Claude Code skill that gets a website found, cited and recommended by **ChatGPT, Perplexity, Gemini and Google**: GEO, AEO, AI visibility and SEO in one place.

- New product with no audience? Run `/geo-seo playbook`.
- Existing site? Run `/geo-seo audit`.

---

## Field-tested: the Answer Library playbook

Version 2 leads with a method that worked in practice, not only a summary of studies.

It is the setup behind **[Vouched](https://www.vouched.ph)**, a Philippine creator marketplace. Its closed-alpha waitlist filled with no social posting, and **ChatGPT was the most common answer to "where did you find us"**, ahead of Google. That is self-reported and correlational, not a controlled test, and the skill says so wherever it matters.

The idea: when someone asks an AI a question the web barely covers, the engine has few pages to pull from. Be the page that answers it plainly.

1. **Find the thin query space.** List the questions your users would type into ChatGPT, then see where today's answers are generic, global or empty.
2. **One page per job.** How it works per audience, pricing, an FAQ in your users' words, task guides, honest comparisons, free tools.
3. **Write product truth, including the limits.** A direct answer up top, a visible review date, what the product does not do, and no invented results.
4. **Content as data.** Guides live as typed records; the pages, JSON-LD, sitemap and llms.txt are all built from them, with tests guarding links and dates.
5. **llms.txt with a boundaries block** (optional and cheap).
6. **The technical floor.** Server-rendered answers, a canonical on every page and never in the root layout, a generated sitemap, robots that allow AI crawlers, and Organization JSON-LD for your market.
7. **Measure from the first signup.** A required "Where did you find us?" field that names the AI engines.

The skill also lists exactly where the playbook departs from the research rules below, and what the case did not test.

---

## Commands

| Command | What it does |
|---|---|
| `/geo-seo playbook <target>` | Audit and build against the Answer Library playbook. Start here for a new product |
| `/geo-seo <target>` | Full generation from the One-Shot Page Brief |
| `/geo-seo audit <target>` | PRESENT / MISSING / WRONG gap report, with `file:line` references |
| `/geo-seo fix <target>` | Run the audit, then apply fixes in priority order |
| `/geo-seo metadata <target>` | Title, description, Open Graph and Twitter optimization only |
| `/geo-seo alt <target>` | Alt text audit and bulk generation |
| `/geo-seo ads <target>` | Google Ads landing-page alignment check |

The audit script also runs on its own, with zero dependencies:

```bash
node skills/geo-seo/scripts/audit.mjs --url https://example.com
node skills/geo-seo/scripts/audit.mjs --dir app/
```

It exits 1 on any CRITICAL finding, so it can gate CI.

---

## Research foundations

| Source | Contribution |
|---|---|
| [Princeton GEO Study](https://arxiv.org/abs/2311.09735) (Aggarwal et al.) | Citing authoritative sources: **+115% citation rate** |
| [Muck Rack Generative Pulse, "What Is AI Reading?" (Dec 2025)](https://generativepulse.ai/report/) | 1M+ citations analyzed; press releases grew **5x**; 94% non-paid; 82% earned media |
| [Averi B2B SaaS Citation Benchmarks (2026)](https://www.averi.ai/how-to/chatgpt-vs.-perplexity-vs.-google-ai-mode-the-b2b-saas-citation-benchmarks-report-(2026)) | H1, H2, H3 hierarchy **+40%**; 120 to 180 word sections **+70%**; comparison tables **+47%** |
| [Google Content Warehouse API Leak (2024)](https://github.com/schoberg/google-ranking-signals-plugin) | 2,596 modules and 14,014 attributes: confirmed ranking factors and demotions to avoid |

The skill also cites the Foglift Q3 2026 multi-engine benchmark and Google's own AI optimization guidance, and keeps a dated **Platform Changelog** of search changes (for example Googlebot's 2026-08-20 JSON-LD unescaping change). Every benchmark carries its date, because they go stale within a quarter.

---

## The 15 research rules

Run the playbook first for a new product; these come mostly from studies of sites that already have press and backlinks.

1. **94% of AI citations are non-paid, 82% earned media.** Invest in PR, not content farms.
2. **Press releases grew 5x as an AI citation source.** Write more, ship weekly.
3. **Citation rate peaks within 7 days of publication.** Plan distribution for the same week.
4. **50% of AI citations come from articles under 11 months old.** Refresh or republish yearly.
5. **Schema has a `sameAs` array with at least 4 authoritative URLs.**
6. **Canonical URL and `og:url` match exactly on every page.** One www or non-www variant sitewide.
7. **Title tag under 60 characters, primary keyword in the first 40.**
8. **All four date sources (URL, JSON-LD, byline, meta) agree within 7 days.**
9. **Descriptive body headings beat question-style ones** (4.3 vs 3.4 citations). Questions only in FAQ blocks.
10. **Sections of 120 to 180 words between headings.**
11. **Lead paragraph of 40 to 60 words with the direct answer up top.**
12. **A comparison table with descriptive column headers.**
13. **15+ named entities per page.**
14. **25 to 40 hyperlinked stats per long-form piece**, each with its source.
15. **Publishing cadence of 8 to 12+ pieces a month.**

**Never:** fabricate `aggregateRating`, use "click here" anchors, or publish auto-generated text.

---

## What it generates

- **Schema stack**: Organization, WebSite, SoftwareApplication or Service, FAQPage, BreadcrumbList, Article and BlogPosting, as applicable
- **Metadata**: title, description, Open Graph, Twitter Card, `article:*` tags, hreflang, PWA and verification tags
- **Crawl layer**: generated sitemap, robots.txt with an AI crawler matrix, llms.txt and per-page `.md.txt` companions
- **Content blocks**: direct-answer leads, stat callouts, comparison tables, visible FAQs, expert quotes
- **Alt text**: classification, length rules and bulk generation
- **Earned media**: an AI-optimized press release template and distribution targets
- **Measurement**: citability tests, surfacing checks and a signup-source field

---

## Installation

### As a plugin (recommended)

In Claude Code:

```
/plugin marketplace add sants2001/geo-seo-plugin
/plugin install geo-seo-plugin@geo-seo-plugin
```

### As a single skill

```bash
mkdir -p ~/.claude/skills/geo-seo/scripts
curl -L https://raw.githubusercontent.com/sants2001/geo-seo-plugin/main/skills/geo-seo/SKILL.md \
  -o ~/.claude/skills/geo-seo/SKILL.md
curl -L https://raw.githubusercontent.com/sants2001/geo-seo-plugin/main/skills/geo-seo/scripts/audit.mjs \
  -o ~/.claude/skills/geo-seo/scripts/audit.mjs
```

Restart Claude Code, then run `/geo-seo`.

---

## Tech stack assumption

Examples target **Next.js 15 App Router, React 19 and TypeScript**, but the schema, content and measurement rules are framework-agnostic. They translate directly to WordPress, Astro, SvelteKit or plain HTML.

---

## Contributing

PRs welcome, especially:

- Platform-specific playbooks (Astro, Hugo, WordPress, Webflow)
- New citation benchmarks as they publish, with their dates
- More field results: what you shipped, and where your signups said they found you

See [CHANGELOG.md](CHANGELOG.md) for what changed in each version.

---

## License

MIT, see [LICENSE](LICENSE).

## Credits

- **Santino Gatmaytan** ([@sants2001](https://github.com/sants2001)), author
- **schoberg**, [google-ranking-signals-plugin](https://github.com/schoberg/google-ranking-signals-plugin) structure and Google Leak reference material
- **Muck Rack**, Generative Pulse research
- **Averi AI**, citation benchmarks research
- **Aggarwal et al.**, Princeton GEO Study

Built for [Claude Code](https://claude.com/claude-code).
