# geo-seo-plugin

A Claude Code skill that optimizes any website for **Generative Engine Optimization (GEO)** and **SEO** — generating full JSON-LD schema stacks, earned-media playbooks, AI-citation-optimized content structure, and audit reports grounded in the latest empirical research.

Trigger it with `/geo-seo <target>` or `/geo-seo audit` inside Claude Code.

---

## Why this exists

Most "SEO" tooling still optimizes for the 2015 Google SERP. But in 2026, if your content isn't getting cited by ChatGPT, Perplexity, Gemini, Google AI Mode, and Claude — you're invisible to a growing share of your market.

This skill codifies four research sources into one actionable playbook:

| Source | Contribution |
|---|---|
| [Princeton GEO Study](https://arxiv.org/abs/2311.09735) (Aggarwal et al.) | Citing authoritative sources = **+115% citation rate** |
| [Muck Rack Generative Pulse — "What Is AI Reading?" (Dec 2025)](https://generativepulse.ai/report/) | 1M+ citations analyzed; press releases grew **5x**; 94% non-paid; 82% earned media |
| [Averi B2B SaaS Citation Benchmarks (2026)](https://www.averi.ai/how-to/chatgpt-vs.-perplexity-vs.-google-ai-mode-the-b2b-saas-citation-benchmarks-report-(2026)) | H1→H2→H3 hierarchy = **+40%**; 120–180 word sections = **+70%**; comparison tables = **+47%** |
| [Google Content Warehouse API Leak (2024)](https://github.com/schoberg/google-ranking-signals-plugin) | 2,596 modules + 14,014 attributes — confirmed ranking factors + demotions to avoid |

---

## The 15 rules that matter most

1. **94% of AI citations are non-paid, 82% earned media** — invest in PR, not SEO content farms.
2. **Press releases grew 5x as an AI citation source** — write more, ship weekly.
3. **Citation rate peaks within 7 days of publication** — plan distribution for the same week.
4. **50% of AI citations come from articles < 11 months old** — refresh or republish annually.
5. **Schema has a `sameAs` array with ≥ 4 authoritative URLs** — LinkedIn + Twitter + ProductHunt + Crunchbase minimum.
6. **Canonical URL + `og:url` must match exactly on every page** — one www/non-www variant sitewide.
7. **Title tag < 60 chars with primary keyword in first 40**.
8. **All four date sources (URL, JSON-LD, byline, meta) must agree within 7 days** — otherwise Google discards freshness entirely.
9. **Descriptive body headings (4.3 citations avg) > question-style (3.4)** — reverse the common advice. Questions only in FAQ blocks.
10. **Sections of 120–180 words between headings** — +70% citation lift.
11. **Lead paragraph 40–60 words with direct answer up top**.
12. **Comparison table with descriptive column headers** — +47% on Google AI.
13. **15+ named entities per page** — 4.8x higher selection probability.
14. **25–40 hyperlinked stats per long-form piece**, each with source citation — +22–30% visibility per platform.
15. **Publishing cadence: 8–12+ pieces/month** — threshold for "high AI visibility".

**Never:** fabricate `aggregateRating`, use "click here" internal anchors, publish auto-generated text.

---

## What it generates

When you run `/geo-seo <target>`, the skill produces:

- **Schema stack** — Organization, WebSite, SoftwareApplication/Service, FAQPage, SiteNavigationElement, BreadcrumbList, Article, Blog (as applicable)
- **Metadata** — title, description, Open Graph, Twitter Card, `article:*` tags, canonical
- **Knowledge Panel kit** — `sameAs` array + Wikidata seeding instructions
- **Body content blocks** — stat callouts, comparison tables, FAQ (visible + schema), expert quotes, entity-dense prose
- **Press-release playbook** — AI-optimized template + distribution target map (Claude / ChatGPT / Gemini)
- **Community seeding plan** — Reddit / Medium / Quora / YouTube fan-out content
- **Technical hygiene** — image dimensions, font preloads, CWV thresholds, robots + sitemap

When you run `/geo-seo audit`, the skill outputs a gap report: PRESENT / MISSING / WRONG per signal, with file:line references.

---

## Installation

### As a Claude Code plugin

```bash
# Clone into your Claude Code plugins directory
git clone https://github.com/sants2001/geo-seo-plugin ~/.claude/plugins/geo-seo-plugin
```

### As a single skill

```bash
# Copy just the skill into your user-scoped skills directory
mkdir -p ~/.claude/skills/geo-seo
curl -L https://raw.githubusercontent.com/sants2001/geo-seo-plugin/main/skills/geo-seo/SKILL.md \
  -o ~/.claude/skills/geo-seo/SKILL.md
```

Restart Claude Code, then invoke with `/geo-seo`.

---

## Tech stack assumption

Examples target **Next.js 15 App Router + React 19 + TypeScript**, but the underlying schema + content rules are framework-agnostic. Snippets translate directly to WordPress, Astro, SvelteKit, plain HTML, etc.

---

## Contributing

PRs welcome — especially for:

- Platform-specific playbooks (Astro, Hugo, WordPress, Webflow)
- New empirical data / citation benchmarks as they publish
- Additional reference patterns from audited production sites

---

## License

MIT — see [LICENSE](LICENSE).

## Credits

- **Santino Gatmaytan** ([@sants2001](https://github.com/sants2001)) — author
- **schoberg** — [google-ranking-signals-plugin](https://github.com/schoberg/google-ranking-signals-plugin) structure + Google Leak reference material
- **Muck Rack** — Generative Pulse research
- **Averi AI** — citation benchmarks research
- **Aggarwal et al.** — Princeton GEO Study

Built for [Claude Code](https://claude.com/claude-code).
