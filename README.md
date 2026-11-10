# geo-seo-plugin

### Get your site recommended by ChatGPT.

A Claude Code skill for **GEO, AEO and SEO**. It makes ChatGPT, Perplexity, Gemini and Google find your site, cite it, and send people to it.

> **100+ waitlist signups. Zero social posts.**
> This is the playbook behind them. When we asked those signups where they found us, the #1 answer was **ChatGPT**.

```
/geo-seo playbook    new product, no audience yet: start here
/geo-seo audit       existing site: find every gap
```

---

## How we got 100+ signups without posting once

[Vouched](https://www.vouched.ph) is a creator marketplace in the Philippines. We never posted on social media and ran no ads. Instead, we built pages that answered the exact questions people were already typing into ChatGPT. ChatGPT started sending them to us.

The idea is simple. When someone asks AI a question the web barely covers, it has almost nothing to pull from. Be the one page that answers it plainly, and you become the answer.

The skill turns that into seven steps:

1. **Find the questions AI can't answer yet.** Ask ChatGPT what your users ask. Every vague, global or "I'm not aware of one" reply is a page you can own.
2. **Give every job its own page.** How it works for each audience, pricing, an FAQ in your users' own words, task guides, honest comparisons, free tools.
3. **Tell the truth, including the limits.** A direct answer up top, a visible review date, what the product does *not* do. Specifics get quoted. Hype gives an engine nothing to quote.
4. **Write once, publish everywhere.** Guides live as data. Pages, schema, sitemap and llms.txt are all generated from them, with tests guarding every link and date.
5. **Tell AI what you are not.** An llms.txt with a boundaries block, so any engine that reads it knows your limits.
6. **Nail the boring stuff.** Answers in the server HTML, a canonical on every page, a generated sitemap, robots that welcome AI crawlers, schema for your market.
7. **Ask every signup where they found you.** One required field that names the AI engines. That field is how we know ChatGPT was #1.

**No hype in the skill itself.** Our sources are self-reported, and this was not a controlled experiment. The skill labels what was measured and what is reasoning, and lists where the playbook departs from the textbook rules. You always know which is which.

---

## Everything else inside

The playbook sits on top of a full GEO and SEO toolkit:

- **Schema that engines read:** Organization, WebSite, SoftwareApplication or Service, FAQPage, BreadcrumbList, Article and BlogPosting, with safe JSON-LD injection
- **Metadata that survives the share:** titles and descriptions sized by pixel width, Open Graph, Twitter cards, hreflang, PWA and verification tags
- **A crawl layer built for AI:** generated sitemaps, robots.txt with an AI crawler matrix, llms.txt and per-page `.md.txt` companions
- **Content that gets cited:** direct-answer leads, stat callouts, comparison tables, visible FAQs, expert quotes
- **Alt text at scale:** classification, length rules and bulk generation
- **Earned media:** an AI-optimized press release template and distribution targets
- **A dated Platform Changelog:** what Google and the AI engines changed, and when, so stale advice never ships
- **Measurement that tells the truth:** same-day citability tests, monthly surfacing checks, and the signup-source field

---

## Commands

| Command | What it does |
|---|---|
| `/geo-seo playbook <target>` | Audit and build against the Answer Library playbook |
| `/geo-seo <target>` | Full generation from the one-shot page brief |
| `/geo-seo audit <target>` | PRESENT / MISSING / WRONG gap report with `file:line` references |
| `/geo-seo fix <target>` | Audit, then apply fixes in priority order |
| `/geo-seo metadata <target>` | Title, description, Open Graph and Twitter only |
| `/geo-seo alt <target>` | Alt text audit and bulk generation |
| `/geo-seo ads <target>` | Google Ads landing-page alignment |

The audit script also runs on its own, with zero dependencies:

```bash
node skills/geo-seo/scripts/audit.mjs --url https://example.com
node skills/geo-seo/scripts/audit.mjs --dir app/
```

It exits 1 on any CRITICAL finding, so you can drop it into CI.

---

## Install

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

## Built on research, tested in the field

The playbook is what worked for us. Underneath it, every rule traces to a source:

| Source | What it adds |
|---|---|
| [Princeton GEO Study](https://arxiv.org/abs/2311.09735) (Aggarwal et al.) | Citing authoritative sources: **+115% citation rate** |
| [Muck Rack Generative Pulse, "What Is AI Reading?" (Dec 2025)](https://generativepulse.ai/report/) | 1M+ citations analyzed; press releases grew **5x**; 94% non-paid; 82% earned media |
| [Averi B2B SaaS Citation Benchmarks (2026)](https://www.averi.ai/how-to/chatgpt-vs.-perplexity-vs.-google-ai-mode-the-b2b-saas-citation-benchmarks-report-(2026)) | Clean heading hierarchy **+40%**; 120 to 180 word sections **+70%**; comparison tables **+47%** |
| [Google Content Warehouse API Leak (2024)](https://github.com/schoberg/google-ranking-signals-plugin) | 2,596 modules and 14,014 attributes: confirmed ranking factors and demotions to avoid |

The skill also draws on the Foglift Q3 2026 multi-engine benchmark and Google's own AI optimization guidance. Every benchmark carries its date, because in this field numbers go stale within a quarter.

<details>
<summary><strong>The 15 research rules</strong> (run the playbook first; these come from studies of sites that already have press)</summary>

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

</details>

---

## Tech stack

Examples target **Next.js 15 App Router, React 19 and TypeScript**. The schema, content and measurement rules work anywhere: WordPress, Astro, SvelteKit or plain HTML.

---

## Contributing

PRs welcome, especially:

- Platform-specific playbooks (Astro, Hugo, WordPress, Webflow)
- New citation benchmarks as they publish, with their dates
- **Your field results:** what you shipped, and where your signups said they found you

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
