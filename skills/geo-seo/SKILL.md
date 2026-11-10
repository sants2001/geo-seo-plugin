---
name: geo-seo
description: >
  Get a site found, cited and recommended by ChatGPT, Perplexity, Gemini and Google
  (GEO, AEO, AI visibility, SEO). Starts with the field-tested Answer Library playbook
  behind a 100+ person waitlist built with zero social posts (/geo-seo playbook). Generates JSON-LD schema, meta tags, Open
  Graph / Twitter / hreflang / PWA tags, alt text, sitemap.xml, robots.txt, Google
  Knowledge Panel setup, Google Ads landing-page alignment, press release patterns,
  LLMs.txt + per-page .md.txt companion files, and content that earns AI citations.
  Includes an audit script (scripts/audit.mjs, PRESENT/MISSING/WRONG) and a
  priority-queue fix loop (/geo-seo fix). Grounded in the Princeton GEO Study, Muck
  Rack Generative Pulse (Dec 2025), Averi B2B SaaS Citation Benchmarks (2026),
  Foglift Q3 2026 benchmark, and Google's AI optimization guide. Platform facts
  verified through 2026-09-12.
user-invocable: true
trigger: /geo-seo
---

# GEO + SEO Optimization Skill

Triggered by `/geo-seo [target]` where target is a page, component, or project directory.

Reference implementation: **pressbeat.io**, audited 2026-04-16, full schema stack documented below.

**Research foundations:**
- **Princeton GEO Study** (Aggarwal et al., arXiv:2311.09735): citing authoritative sources increases AI citation rate by **+115%**.
- **Muck Rack Generative Pulse, "What Is AI Reading?" (Dec 2025)**: analyzed 1M+ citations across ChatGPT, Gemini, Perplexity, Claude (Jul–Dec 2025). Key findings: 94% of AI citations come from non-paid sources, 82% from earned media, press release citations grew **5x** in 6 months, and only **2% overlap** between journalists PR teams pitch and journalists AI cites.
- **Averi B2B SaaS Citation Benchmarks Report (2026)**: on-page/HTML structure experiments across ChatGPT vs Perplexity vs Google AI Mode. Key findings: proper H1→H2→H3 hierarchy = +40% citation lift, 120–180 word sections = +70% citations, comparison tables with descriptive headers = +47%, descriptive headings beat question-style (4.3 vs 3.4 citations).

---

## Field-Tested Playbook: the Answer Library (start here for a new product)

This is the playbook behind Vouched (vouched.ph), a Philippine creator
marketplace that filled a **100+ person waitlist with zero social posts**. Ask its
signups where they found it, and the #1 answer is ChatGPT, ahead of Google. No ads,
no following: the site answered the questions people were already asking AI, and
AI sent them over.

It was built in stages. The first AI-referred signups arrived while the site had
only its core question pages (how it works, FAQ, pricing); the larger guide library
came later. The sources are self-reported and nothing here is a controlled test, so
treat it as a setup that worked, not a guaranteed result.

Use it for a new product, a new category, or a local market with no audience and
no budget. Run it before the research rules below, which come mostly from studies
of sites that already have press and backlinks. Where it departs from the rest of
this skill, the Departures list at the end says so.

**Why it might work (reasoning, not proven).** When someone asks an AI engine a
question the web barely covers, the engine has few pages to retrieve. A site that
answers that exact question plainly, with specifics, may be the only usable
source. The goal is not to out-rank incumbents; it is to be the complete answer
where there is none.

### 1. Find the thin query space

- Write the 30 questions your users would type into ChatGPT, in their words, with their place and their money in them ("how to get paid for clipping in the Philippines", "do I need followers to do UGC").
- Ask 5 to 10 of them in ChatGPT search, Perplexity and Google today. Where the answer is generic, global, outdated, or "I am not aware of a local option", that question is open.
- Cover every side of your market. One side may find you far more than the other, and you will not know in advance which.

### 2. One page per job, each answering its cluster of questions

A landing page answers one question. Give each job or audience its own page, with
every question about that job answered on it (Step 4.5's "one page per topic"
rule, applied to tasks). The library is made of these page types:

| Page type | Answers | Schema to add |
|---|---|---|
| How it works, per audience and per use case | "How does this work for someone like me" | `FAQPage` for the questions on the page, `BreadcrumbList` |
| Pricing, with figures read from the code or table that charges | "What does it cost, what is the cut" | `FAQPage` if it has a Q&A block |
| FAQ in the user's words | "Is it live?", "How do I get paid, and when?", "Do I need a big following?" | `FAQPage` |
| Task guides, one job each | "How do I do this specific thing" | `Article` + `BreadcrumbList`, plus `FAQPage` for its common questions |
| Honest comparisons | "This or doing it myself", "this or an agency" | `BlogPosting` |
| Free tools and templates, no sign-in | "Calculate my rate", "give me a template" | none needed |
| A method or research series with dated, linked sources | "Can I trust how they measure" | `Article` |
| Live listings (jobs, campaigns, products) | "Is there something available now" | per type |

The schema column is what to add, not a record of what the case site shipped.

### 3. Write product truth, including the limits

Every guide follows one anatomy:

1. The title is the task or the answer; the summary gives the direct answer in one or two sentences.
2. A visible line with status, audience, byline and "Reviewed <date>". Prefer a named person who reviewed the page (the Who test in Step 4.5).
3. "Before you start": who the page is for and what access it needs.
4. One section per step, with a descriptive heading, short paragraphs and numbered steps.
5. "Common questions": 3 to 5 real questions with short answers.
6. Links to related pages.
7. A private `sources` list: the code or documents each claim was checked against. It is never rendered. A test checks the paths still exist; a person re-checks the claims on each review date.

Rules: state what the product does not do. Never present demo figures as results.
Never invent a case study. Link external research next to the claim it supports.
If the product is early, say so in the sitewide description, for example by
opening it with "Closed alpha." The reasoning (not tested): an engine recommending you to a
stranger has to quote something specific, and a page that states its own limits
gives it specific, low-risk sentences to quote.

### 4. Content as data, one source of truth

Store each article as a typed record in one file: `slug`, `title`, `summary`,
`category` (guide or blog), `audience`, `topic`, `status`, `access`, `published`,
`updated`, `reviewed`, `sections`, `questions`, `related`, `sources`. `updated`
moves only when the content changes; `reviewed` moves whenever someone re-checks
it. Build everything from those records:

- The page HTML.
- `Article` (guide) or `BlogPosting` (blog) JSON-LD with `datePublished` (from `published`) and `dateModified` (from `updated`), plus `lastReviewed` (from `reviewed`) on the `WebPage` in `mainEntityOfPage` (`lastReviewed` is a WebPage property, not an Article one).
- `article:published_time` and `article:modified_time` meta tags.
- The sitemap entry, with `lastModified` from `updated`. A review that changes nothing must not bump it: Google uses `lastmod` only when it is consistently accurate.
- llms.txt (step 5).

Every date then comes from the same record, which is what TL;DR rule 8 needs:
the published date reads the same everywhere, and so does the modified date.

Guard the library with tests so a bad edit fails the build: slugs are unique;
every related link, destination and anchor resolves; the machine-readable index
lists every public article; every `sources` path exists; no guide sends readers to
a retracted piece or to a case study that does not exist; a phrase blocklist
catches copy that contradicts the stated limits.

### 5. llms.txt: optional, cheap, with a boundaries block

llms.txt does not get you discovered (Platform Changelog, 2026-06-15), and nothing
in the case shows it mattered. It is cheap once the records exist, and it
puts the product's limits in one place for any engine that does read it. Use
Step 17a's structure, generate it from the records in a route (in Next.js,
`app/llms.txt/route.ts`), and link it from `<head>` per Step 17e. Links can point
at the HTML pages when they server-render cleanly, or at
`.md.txt` companions per Step 17. A generated route and HTML links are a named
departure (see Departures).

```markdown
# <Brand>

> <One sentence: what it is, for whom, where.>

## Pages

- [<title>](<url>): <summary> Audience: <audience>. Reviewed: <date>.

## About

Each page answers one job. Its audience, review date, limits, common questions
and related pages are context for reading it. A review date is not a live
status check.

## Product boundaries

- <Stage, e.g. closed alpha; a waitlist entry is not account access.>
- <Demo figures are not customer results.>
- <What the product does not do, in plain sentences.>
- <Measures that are different things and must not be merged.>
```

### 6. Technical floor

Every item here has to be right before the content can count.

- **Server-rendered HTML.** Every public page is static or server-rendered (`generateStaticParams` over the records). Answers inside tabs or accordions must be in the HTML; with Radix, use `forceMount` and hide inactive panels with CSS.
- **A canonical on every page, never in the root layout.** A root-layout canonical is inherited by every page that sets none, which tells engines every page is the home page. The home page sets its own too (`app/page.tsx`: `alternates.canonical` of `/` and `openGraph.url`). It is an easy bug to ship and a hard one to notice. Check every public route.
- **`og:url` and `og:locale` on every page.** In Next.js a page's `openGraph` object replaces the layout's whole object, so a page that sets only `openGraph.title` loses the layout's `locale` and `siteName`. Build page metadata with one helper that always fills them.
- **`metadataBase` set**, so canonicals and share cards resolve to absolute URLs.
- **A sitemap generated from the route list and the records, not typed by hand.** A hand-kept list drifts, and tends to miss the pages people search for by name, such as Pricing and FAQ. Add live listings (recommended, not tested in the case). If the database read fails, fail the sitemap so the crawler keeps the last good one, instead of publishing it without the dynamic pages.
- **robots.** For a brand or content site, allow all AI crawlers (the Step 14d default). Never block the retrieval and live-fetch crawlers (`OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Claude-SearchBot`); blocking them is what removes a site from AI answers. Disallow only signed-in areas and `/api/`. Check that bot protection (Cloudflare and similar) does not challenge crawlers.
- **Sitewide `Organization` JSON-LD** with `areaServed`, `knowsLanguage` and a `sameAs` list (TL;DR rule 5: at least four authoritative profile URLs). `<html lang>` and `og:locale` match the market (`en-PH`, `en_PH`).
- **JSON-LD** serialized with `JSON.stringify` from a real object, with `<` escaped as `\u003c` (the Step 9 helper does this). Check in the raw page source that every `ld+json` block parses as JSON.

### 7. Measure from the first signup

- Add a **required** multi-select "Where did you find us?" to the signup form, naming the AI engines next to the usual channels (Instagram, Facebook, X, Google, ChatGPT, Friend, Other), with free text for Other. It counts everyone who signs up, including visitors that consent-gated analytics never see. Left optional, most people skip it.
- Store the raw answer and report it as self-reported, never as traffic. Listing "ChatGPT" as an option can prime it, so compare against a free-text period or cohort.
- Tag your own social bios and invites (a fixed path per bio, a code per invite) so they can be told apart from discovery; a profile with a bio link can draw signups even when you never post.
- Turn on referrer analytics and Search Console at launch (Search Console is the first-party read for Google; see the Platform Changelog).
- Keep the two clocks in "Measuring GEO" apart: run the citability test (hand an engine the URL) after each content change, and a surfacing check monthly (ask the step 1 questions with no URL; record whether you are cited and which page). Never credit a surfacing change to one edit without a control.

### Departures from the rest of this skill

Where the playbook overrides an older rule:

- **FAQPage:** only on pages where the questions are visible, per Google's rule against marking up content readers cannot see. This replaces the sitewide FAQPage in Block 4.
- **Canonical:** per page only, home page included. Step 9's layout template and the Step 16 sample log no longer put it in the layout.
- **llms.txt:** may be a generated route instead of `public/llms.txt`, and may link HTML pages instead of `.md.txt` companions. The two Quick-Fire lines that check those will read MISSING; that is expected.

What the case did not test (keep these, and layer them on after the floor):

- **PR and press** (TL;DR rules 1 and 2).
- **On-page density** (rules 10, 12, 13 and 14: section length, comparison tables, entity count, stat density). The case's guides use short sections.
- **Cadence** (rule 15): consistent with the case rather than tested by it; the case library was large for a site its age.

### Playbook audit (`/geo-seo playbook <target>`)

Report each line PRESENT / MISSING / WRONG with the file or URL as evidence:

- [ ] Question list exists, with what each engine answers today
- [ ] One page per job or audience, covering its questions; pricing and FAQ are public pages
- [ ] Guides carry a direct-answer summary, visible reviewed date, byline, audience, stated limits, common questions and related links
- [ ] Guides are typed records; HTML, JSON-LD (with `datePublished` and `dateModified`), article meta, sitemap and llms.txt are built from them
- [ ] Tests guard slugs, links, anchors, source paths and index sync
- [ ] Every public page has its own canonical; the root layout has none
- [ ] Answers in tabs or accordions are in the server HTML
- [ ] The sitemap is generated and lists every public page
- [ ] robots allows the AI retrieval crawlers
- [ ] Organization JSON-LD has area served, languages and `sameAs`; every `ld+json` block parses
- [ ] The signup form requires "where did you find us", naming the AI engines; bios and invites are tagged
- [ ] Search Console and referrer analytics are on

---

## TL;DR: The 15 Rules That Matter Most

New product: run the Field-Tested Playbook above first, then these rules. The
playbook did not test rules 1 and 2 (PR) and departs from a few others; see its
Departures list.

If you only remember this page, remember these:

1. **94% of AI citations are non-paid, 82% earned media**: invest in PR, not SEO content farms.
2. **Press releases grew 5x as an AI citation source (Jul–Dec 2025)**: write more, ship weekly.
3. **Citation rate peaks within 7 days of publication**: plan distribution for the same week.
4. **50% of AI citations come from articles < 11 months old**: refresh or republish annually.
5. **Schema has a `sameAs` array with ≥ 4 authoritative URLs**: LinkedIn + Twitter + ProductHunt + Crunchbase minimum.
6. **Canonical URL + `og:url` must match exactly on every page**: one www/non-www variant, enforced sitewide.
7. **Title tag < 60 chars with primary keyword in first 40**: `titlematchScore` rewards it.
8. **All four date sources (URL, JSON-LD, byline, meta) must agree within 7 days**: otherwise Google discards freshness entirely.
9. **Headings: descriptive in the body (4.3 citations avg), questions ONLY inside FAQ block (3.4 avg)**: counterintuitive but measured.
10. **Sections of 120–180 words between headings**: `+70%` citation lift vs sections under 50 words.
11. **Lead paragraph 40–60 words with the direct answer up top**: Perplexity extracts from the opener.
12. **Every page has a comparison table with descriptive column headers**: `+47%` on Google AI.
13. **15+ named entities per page**: `4.8x` higher AI selection probability.
14. **25–40 hyperlinked stats per long-form piece, each with source citation**: `+22–30%` visibility per platform.
15. **Publishing cadence: 8–12+ pieces/month**: the threshold for "high AI visibility" (Averi 2026).

**The three things never to do:** fabricate `aggregateRating`, use "click here" internal anchors, publish auto-generated/spun text.

**First-visit workflow:** for a new product, start with `/geo-seo playbook`. For an existing site, run `/geo-seo audit` → fix all CRITICAL gaps (schema, canonical, title) → then generate net-new content per the platform template below.

**Sub-modes available:**
- `/geo-seo playbook <target>`: audit and build against the Field-Tested Playbook (start here for a new product)
- `/geo-seo` or `/geo-seo <target>`: full generation from the One-Shot Page Brief
- `/geo-seo audit <target>`: PRESENT/MISSING/WRONG gap report (Quick-Fire Audit Mode below, plus scripts/audit.mjs)
- `/geo-seo fix <target>`: run audit, apply fixes in priority order (Step 16)
- `/geo-seo metadata <target>`: title/description/OG/Twitter optimization only (Step 10)
- `/geo-seo alt <target>`: alt text audit and bulk generation (Step 11)
- `/geo-seo ads <target>`: Google Ads landing-page alignment check (Step 13)

---

## Platform Changelog: read before quoting any benchmark below

Search and AI-answer surfaces move faster than this file. Verified through **2026-09-12**. Anything below this section carrying an older date is a snapshot, not a standing fact.

### 2026-08-20, Googlebot JSON-LD: single pass of HTML unescaping (BREAKING, silent)

Google changed JSON-LD extraction to apply **only one pass of HTML unescaping**, "to bring our parser up to JSON and other standards" (Google Search Central, 2026-08-20). Double-escaped entities in the HTML source are no longer unrolled. Google's guidance: use standard JSON escapes or Unicode hexadecimal escapes, e.g. `&` rather than a double-escaped ampersand.

Why this outranks everything else in this skill right now:

- It fails **silently**. No Search Console error, no validator complaint, nothing wrong in the CMS preview. The value simply reads differently to the parser.
- The dangerous case is a double-escaped entity **inside a URL** in `sameAs`, `offers.url`, `url`, or `logo`. After one unescape the string no longer matches the real URL, so the link or offer drops out of the rich result with no signal.
- Highest-risk generators: CMS themes and plugins that build JSON-LD by string concatenation (Shopify, WooCommerce, WordPress SEO plugins), and any template that HTML-escapes a field before injecting it into a `<script type="application/ld+json">` block.

**Rule for every schema block this skill emits:** serialize with `JSON.stringify()` on a real object. Never hand-assemble JSON-LD from HTML-escaped strings. Verify against raw page source, not a validator, and grep the `ld+json` block for HTML entities.

Carry one caveat into GEO work: a third-party conformance measurement (`fabio-rovai/jsonld-escaping-conformance`, Aug 2026) argues JSON-LD 1.1 §7.2 implies **zero** unescaping passes, so Google's single pass still differs from most other parsers. A value that now reads correctly to Googlebot can still read wrong to non-Google AI crawlers. That is a third-party claim, not Google guidance, but it is another reason to prefer Unicode escapes: they are unambiguous to every parser.

### 2026-08-18 to 2026-08-21: Google August 2026 spam update

Rolled out 2026-08-18, completed 2026-08-21, with unconfirmed volatility before and after. Separately, Google will **not enforce site reputation abuse manual actions for searchers in the EEA**. If a site lost traffic in that window, check the spam-policy surface (parasite or third-party hosted sections, scaled content) before touching anything in this skill.

### 2026-08: Search Console is the first-party GEO measurement surface

- The **generative AI performance report** expanded to more properties. It had a data bug mid-August, and performance reports showed an impressions/clicks drop around 2026-08-12 that was a reporting artifact, not a ranking move.
- **AI Mode queries appear in Search Console performance data but are NOT broken out in the generative AI report.** Never tell a client that report is their full AI Mode picture.

Surfacing now has a first-party read. Report from it, and label every other number Estimated per the metric-labeling rule below.

### 2026-06-15: llms.txt cannot do discovery (Google, John Mueller)

Mueller's position: an LLM system cannot use `llms.txt` to decide **which** site to surface for a query, because it is self-reported and every site can assert the same thing. He compares it to the meta keywords tag. He allows one narrow use: once an agent is already on the site, a machine-readable index helps it navigate. He and Martin Splitt both restated that **HTML plus internal links is the discovery layer**. Agent-navigation standards (WebMCP and friends) had not settled as of mid-2026.

Step 17 is still worth shipping, but for **navigation and clean extraction after arrival**, not for discovery. Never sell llms.txt as a ranking or citation lever.

### 2026-08/09: AI Mode and crawler mechanics

- Google began **pushing AI Overviews into AI Mode responses** and dropped the "Show more" button. AI Mode gained link carousels for developing topics and is partially powered by **Gemini 3.7 Flash**.
- Google restated: **nothing special to do for generative AI responses in Search**, and **Reddit gets no special preference** in rankings. Both confirm the scope rule in Step 4.5.
- Google rolled out **`google.com/goto` tracking parameters** on result URLs to frustrate third-party SERP scrapers. Rank-tracking numbers sourced from scrapers around this change are suspect; prefer Search Console.
- Google crawlers now send **HEAD, OPTIONS, PUT, PATCH, DELETE** (HTTP QUERY support is coming), and **Google's crawlers do not parse JSON responses**: a JSON API endpoint is not a content surface.
- **Misconfigured Cloudflare** was a repeat cause of self-inflicted SEO damage this cycle. Check bot-protection rules before diagnosing anything else.

### Benchmark half-life warning (measured, not opinion)

Foglift's Q3 2026 benchmark (75 frozen buyer-intent prompts, 5 engines, 375 responses, run 2026-08-01 to 2026-08-10) measured **mean pairwise domain overlap of 0.094 across engines, down from 0.180 in Q2**, a 47.8% drop in one quarter. Reddit moved 11th to 2nd, G2 moved 24th to 5th, YouTube stayed first and hit 69.3% of Perplexity responses. Their own caveat: models and indexes changed between quarters, so this is observational, not causal.

Two consequences:

1. **A per-outlet target list expires in roughly a quarter.** The Muck Rack Dec 2025 "top AI-cited publications" table below is a historical snapshot. Re-measure before using it as a pitch list.
2. **A citation win on one engine is not visibility on the others.** Of 92 domains in the combined top-25 lists, 69 appeared in only one engine's top 25 and none appeared in all five. Report per engine, never as a single "AI visibility" number.

---

## Skill Routing: When to Use What

This skill owns the document `<head>`, schema, meta tags, alt text, sitemap, robots, and AI-citation signals. When the task spills beyond the head, hand off to these companion skills if you have them installed:

| Task | Skill | Why |
|---|---|---|
| Full content audit of a live URL (body copy, E-E-A-T, keyword gaps) | `market-seo` | Has a Python scraper plus expert review flow |
| Google, Meta, LinkedIn, TikTok ad campaign generation (copy, targeting, budget) | `market-ads` | Multi-platform ad creative engine |
| Landing page CRO, funnel drop-off, button copy, form friction | `market-landing` | Conversion-rate focused |
| Multi-brand marketing orchestration across audit, SEO, ads, email, social | `market` | Orchestrator, launches parallel subagents |
| Source quality gating before citing a stat | `source-validation` | Tier 1/2/3 classification |
| Structured prose (lead, body, FAQ) following SCQA | `scqa-writing` | Situation, Complication, Question, Answer |

Use this skill for: JSON-LD schema, meta tags, Open Graph, Twitter cards, hreflang, sitemap.xml, robots.txt, alt text, Google Knowledge Panel, Google Ads landing-page alignment, GEO citation engineering.

---

## Writing Style: No Em Dashes (MANDATORY for all generated web copy)

When writing or rewriting website content, landing pages, blog posts, press releases, meta descriptions, schema descriptions, FAQ answers, or any prose that ships to a live site, **do not use em dashes (—)**.

**Why this matters for GEO/SEO specifically:**
- The em dash is the single strongest "AI tell" flagged by human readers, content editors, and AI-detection tools (GPTZero, Originality.ai, Copyleaks).
- Pages flagged as AI-generated lose trust signals, get deprioritized in Google's Helpful Content system, and are less likely to earn journalist citations (which drive 82% of AI citations per Muck Rack 2025).
- Muck Rack + Averi data shows AI engines increasingly weight author credibility and human-voice signals; em-dash-heavy prose reads as machine-written and suppresses citation probability.

**Replacement rules (apply in this priority order):**
1. **Comma**: for brief pauses, parenthetical asides, or appositives.
2. **Period**: split into two sentences when the second clause is a complete thought.
3. **Semicolon**: for linking two closely related independent clauses.
4. **Parentheses**: for true asides or clarifications.
5. **Colon**: when the second part defines, lists, or expands the first.

**Scope:**
- Applies to: H1/H2/H3 headings, body copy, lead paragraphs, meta titles, meta descriptions, OG descriptions, JSON-LD `description`/`about` fields, FAQ answers, press releases, alt text, image captions, comparison table cells.
- Exempt: URLs, file paths, code blocks, technical identifiers, numeric ranges where a hyphen is standard (e.g., `120-180 words`, `2024-2026`), and quoted material from external sources (preserve fidelity).

**Before shipping any generated content, scan for `—` and `--` and replace every instance.** This is a hard gate, not a preference.

---

## What This Skill Does

1. **Schema**: generates a full JSON-LD stack (Organization, WebSite, SoftwareApplication or Service, FAQPage, BreadcrumbList, Article where applicable)
2. **Metadata**: title, description, Open Graph, Twitter Card, article:\* tags, canonical, with pixel-width enforcement and A/B variant generation (Step 10)
3. **Alt text system**: 4-type classification, generation templates, audit rules, bulk vision-model generation (Step 11)
4. **Extended meta stack**: theme-color, color-scheme, PWA, apple-\*, msapplication-\*, hreflang, verification tokens, geo meta (Step 12)
5. **Knowledge Panel**: `sameAs` array with 4+ platforms to trigger Google entity disambiguation
6. **Google Ads alignment**: Quality Score checklist, triplet coherence (ad/H1/title), UTM convention, DKI safety, message match scorer (Step 13)
7. **Sitemap and robots.txt**: Next.js 15 dynamic generation, multi-sitemap split, AI crawler allow/block policy (Step 14)
8. **Internal linking graph**: hub/spoke model, orphan audit, anchor text rules (Step 15)
9. **Content signals**: inline citations, stat callouts, comparison tables, FAQ sections engineered for AI citation
10. **Technical hygiene**: canonical URL, image alt/size attributes, font preloads, robots meta
11. **Earned-media playbook**: press release structure plus journalist-citation alignment (Muck Rack Dec 2025)
12. **Community seeding**: Reddit / Medium / Quora / YouTube signals now weighted heavily by AI engines
13. **Audit script**: `scripts/audit.mjs`, zero-dep Node, runs against URL or local files, reports CRITICAL/HIGH/MEDIUM/LOW findings with `file:line` precision
14. **Deterministic fix loop**: `/geo-seo fix <target>` runs audit, applies fixes in priority order, re-runs audit, idempotent (Step 16)
15. **LLMs.txt + .md.txt layer**: generates `llms.txt` discovery index and per-page `.md.txt` companions for ChatGPT, Claude, Perplexity discoverability (Step 17); also fixes robots.txt to allow AI crawlers for brand/content sites

---

## 2025–2026 Research Benchmarks (quote verbatim WITH the study date attached)

Empirically-validated numbers as of each study's date. When generating pages, quote them with source attribution **and the measurement date**, so the page itself becomes a citable GEO artifact rather than an undated claim.

**Two of these classes decay at different speeds. Do not treat them the same:**

| Class | Examples | Half-life | Rule |
|---|---|---|---|
| **Structural**: how a page should be built | heading hierarchy, section length, lead-paragraph length, entity count, table presence | Years | Safe to quote as-is |
| **Surface**: which engines cite whom | top-cited publications, per-platform source mix, outlet target lists | **~1 quarter** (see Benchmark half-life warning above) | Re-measure before quoting; label Estimated if you cannot

### AI citation source mix (Muck Rack, Dec 2025, n=1M+ citations)

| Signal | Stat | Implication |
|---|---|---|
| Non-paid sources | **94%** of AI citations | Paid placements barely move the needle; earn, don't buy |
| Earned media | **82%** | Press coverage is the dominant citation class |
| Journalism share | 20–30% per period | Real reporting outweighs SEO content |
| Press release citation growth | **5x** since Jul 2025 | Press releases are a fast-growing AI signal; ChatGPT + Gemini especially |
| Third-party corporate/blogs | 37% → **24%** (Jul→Dec 2025) | SEO blog spam losing ground |
| Wikipedia reliance | Declining | Still required for entity disambiguation, no longer a growth lever |
| PR-pitch vs AI-citation overlap | **2%** | Traditional media lists are nearly decoupled from AI visibility; rebuild around AI-cited journalists |

### Recency thresholds (Muck Rack, Dec 2025)

- **50%** of AI citations come from articles published within the last **11 months**
- **4%** come from the prior **week**, and citation rate peaks within **7 days** of publication
- **60.5%** of ChatGPT's most-cited pages were published within the last **2 years** (Averi, 2026)
- Visible "last updated" timestamps give up to **+95 position boost** on ChatGPT (Averi, 2026)

### On-page HTML structure (Averi, 2026)

| Tactic | Citation lift |
|---|---|
| Proper H1→H2→H3 hierarchy | **+40%** likelihood of being cited |
| 120–180 word sections between headers | **+70%** vs sections under 50 words |
| Descriptive headings (vs question-style) | 4.3 vs 3.4 avg citations; descriptive WINS |
| Lead paragraph 40–60 words, direct answer | Critical for Perplexity extraction |
| Comparison tables with descriptive headers | **+47%** on Google AI |
| 15+ recognized entities per page | **4.8x** higher selection probability |
| Statistics with proper attribution | **+22–28%** ChatGPT, **+30%** Perplexity |
| 25–40 hyperlinked stats per piece | Correlates with top-decile citation volume |

### Authority signals (Averi, 2026)

- Domains with **32,000+ referring domains** double their citation rate (2.9 → 5.6)
- Domain Trust ≥ **91** correlates with **6+** average citations
- **Brand mentions** correlate more strongly with AI visibility than backlinks (r = 0.664)
- **92.36%** of Google AI Mode citations come from **top-10 ranking** domains; traditional SEO is still the foundation

### Top AI-cited publications (Muck Rack, Dec 2025)

- **Claude**: U.S. News & World Report, Nature, Yahoo Finance
- **ChatGPT**: Reuters, The Verge, The Guardian
- **Gemini**: Forbes, Investopedia, NerdWallet

Use these as the target outlets for earned-media campaigns. Pitching outside this list is low-leverage for AI visibility.

### Publishing cadence (Averi, 2026)

- Low AI visibility: 1–4 pieces/month
- Moderate: 4–8 pieces/month
- **High visibility: 8–12+ pieces/month**, with ~1–2 hours per piece using AI assistance

---

## Step 0: Gather Context

Before generating anything, read or ask for:

- [ ] **Brand name** and tagline
- [ ] **Type**: SaaS / service / agency / blog / e-commerce / other
- [ ] **Primary URL** (canonical base, www vs non-www)
- [ ] **One-sentence description** (used verbatim in schema `description` fields)
- [ ] **Founder name + LinkedIn URL** (for `founder` Person node)
- [ ] **Social profiles**: LinkedIn company, Twitter/X, ProductHunt, Crunchbase, GitHub (for `sameAs`)
- [ ] **Logo URL** (webp preferred, ~7–32KB)
- [ ] **Pricing** (if applicable, goes into `Offer` node)
- [ ] **Rating/review data** (if applicable, goes into `aggregateRating`)
- [ ] **Blog?** (yes → add Blog + BlogPosting schemas)
- [ ] **Features list** (3–10 bullet points for `featureList`)
- [ ] **FAQ pairs** (3–6 Q&A pairs for `FAQPage`)

If working from a codebase, read the existing `<head>` component and any existing schema before generating.

---

## Step 1: JSON-LD Schema Stack

### 1a. Sitewide Schema (inject on EVERY page)

Generate all 5 blocks. Inject as `<script type="application/ld+json">` in `<head>`.

#### Block 1: Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{{BRAND_NAME}}",
  "alternateName": "{{BRAND_NAME}}.{{TLD}}",
  "url": "{{CANONICAL_URL}}",
  "logo": "{{LOGO_URL}}",
  "description": "{{ONE_SENTENCE_DESCRIPTION}}",
  "foundingDate": "{{YEAR}}",
  "founder": {
    "@type": "Person",
    "name": "{{FOUNDER_NAME}}",
    "jobTitle": "{{FOUNDER_TITLE}}",
    "url": "{{FOUNDER_LINKEDIN_URL}}"
  },
  "sameAs": [
    "{{LINKEDIN_COMPANY_URL}}",
    "{{TWITTER_URL}}",
    "{{PRODUCTHUNT_URL}}",
    "{{CRUNCHBASE_URL}}"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "url": "{{CONTACT_URL}}",
    "availableLanguage": ["English"]
  },
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  }
}
```

**`sameAs` rule:** Minimum 4 URLs. Google uses this array for Knowledge Panel entity disambiguation. LinkedIn + Twitter + ProductHunt + one of (Crunchbase, GitHub, AngelList, Wikipedia) = minimum viable set.

#### Block 2: WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{BRAND_NAME}}",
  "alternateName": "{{BRAND_NAME}}: {{TAGLINE}}",
  "url": "{{CANONICAL_URL}}",
  "description": "{{ONE_SENTENCE_DESCRIPTION}}",
  "publisher": {
    "@type": "Organization",
    "name": "{{BRAND_NAME}}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{LOGO_URL}}"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "{{CANONICAL_URL}}/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

#### Block 3: SoftwareApplication or Service

Use `SoftwareApplication` for SaaS tools. Use `Service` for agencies/consultancies.

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{{BRAND_NAME}}",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "{{SUBCATEGORY}}",
  "operatingSystem": "Web Browser",
  "url": "{{CANONICAL_URL}}",
  "description": "{{DETAILED_DESCRIPTION}}",
  "featureList": ["{{FEATURE_1}}", "{{FEATURE_2}}", "{{FEATURE_3}}"],
  "offers": [
    {
      "@type": "Offer",
      "name": "{{PLAN_NAME}}",
      "price": "{{PRICE}}",
      "priceCurrency": "USD",
      "priceValidUntil": "{{NEXT_YEAR}}-12-31",
      "description": "{{OFFER_DESCRIPTION}}",
      "availability": "https://schema.org/InStock",
      "url": "{{PRICING_URL}}"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{AVG_RATING}}",
    "reviewCount": "{{REVIEW_COUNT}}",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

**Only include `aggregateRating` if you have real review data.** Never fabricate. Fake ratings are a Google rich result violation.

#### Block 4: FAQPage (sitewide)

> Prefer the Field-Tested Playbook rule: put `FAQPage` only on pages where the questions are visible. Google's structured data guidelines forbid marking up content readers cannot see.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "{{BRAND_NAME}} FAQ",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{QUESTION_1}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ANSWER_1}}"
      }
    },
    {
      "@type": "Question",
      "name": "{{QUESTION_2}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ANSWER_2}}"
      }
    },
    {
      "@type": "Question",
      "name": "{{QUESTION_3}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{ANSWER_3}}"
      }
    }
  ]
}
```

**Minimum 3, maximum 10 FAQ items.** Questions should be phrased exactly as users search them (question format, natural language). Each answer should be 2–4 sentences: complete, self-contained, no links.

#### Block 5: SiteNavigationElement

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "{{BRAND_NAME}} Site Navigation",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Home",
      "url": "{{CANONICAL_URL}}"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Features",
      "url": "{{CANONICAL_URL}}/features"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Pricing",
      "url": "{{CANONICAL_URL}}/pricing"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Blog",
      "url": "{{CANONICAL_URL}}/blog"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 5,
      "name": "About",
      "url": "{{CANONICAL_URL}}/about"
    }
  ]
}
```

---

### 1b. Blog Index Schema (inject on /blog only)

```json
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "{{BRAND_NAME}} Blog",
  "description": "{{BLOG_DESCRIPTION}}",
  "url": "{{CANONICAL_URL}}/blog",
  "publisher": {
    "@type": "Organization",
    "name": "{{BRAND_NAME}}",
    "logo": { "@type": "ImageObject", "url": "{{LOGO_URL}}" }
  }
}
```

---

### 1c. Article Schema (inject on each blog post)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{ARTICLE_TITLE}}",
  "description": "{{ARTICLE_META_DESCRIPTION}}",
  "image": "{{ARTICLE_OG_IMAGE_URL}}",
  "datePublished": "{{ISO_PUBLISHED_DATE}}",
  "dateModified": "{{ISO_MODIFIED_DATE}}",
  "author": {
    "@type": "Person",
    "name": "{{AUTHOR_NAME}}",
    "url": "{{AUTHOR_PROFILE_URL}}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{BRAND_NAME}}",
    "logo": { "@type": "ImageObject", "url": "{{LOGO_URL}}" }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ARTICLE_CANONICAL_URL}}"
  },
  "keywords": "{{KEYWORD_1}}, {{KEYWORD_2}}, {{KEYWORD_3}}"
}
```

Plus BreadcrumbList (3-level: Home → Blog → Article):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "{{CANONICAL_URL}}"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "{{CANONICAL_URL}}/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{ARTICLE_TITLE}}",
      "item": "{{ARTICLE_CANONICAL_URL}}"
    }
  ]
}
```

---

## Step 2: Meta Tags

### Homepage head template

```html
<!-- Primary -->
<title>{{BRAND_NAME}}: {{TAGLINE}}</title>
<meta name="description" content="{{150_CHAR_DESCRIPTION}}" />
<meta name="author" content="{{BRAND_NAME}}" />
<meta
  name="keywords"
  content="{{KEYWORD_1}}, {{KEYWORD_2}}, {{KEYWORD_3}}, {{KEYWORD_4}}, {{KEYWORD_5}}"
/>
<meta name="robots" content="index, follow" />
<link rel="canonical" href="{{CANONICAL_URL}}" />

<!-- Open Graph -->
<meta property="og:title" content="{{BRAND_NAME}}: {{TAGLINE}}" />
<meta property="og:description" content="{{150_CHAR_DESCRIPTION}}" />
<meta property="og:url" content="{{CANONICAL_URL}}" />
<meta property="og:site_name" content="{{BRAND_NAME}}" />
<meta property="og:locale" content="en_US" />
<meta property="og:image" content="{{OG_IMAGE_URL}}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="{{BRAND_NAME}}: {{TAGLINE}}" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{{BRAND_NAME}}: {{TAGLINE}}" />
<meta name="twitter:description" content="{{150_CHAR_DESCRIPTION}}" />
<meta name="twitter:image" content="{{OG_IMAGE_URL}}" />
<meta name="twitter:site" content="@{{TWITTER_HANDLE}}" />
```

### Article head additions

```html
<!-- Override og:type to article -->
<meta property="og:type" content="article" />
<meta property="og:image" content="{{ARTICLE_OG_IMAGE_1200x630}}" />
<meta property="og:image:alt" content="{{ARTICLE_TITLE}}" />

<!-- Article-specific -->
<meta property="article:published_time" content="{{ISO_PUBLISHED_DATE}}" />
<meta property="article:modified_time" content="{{ISO_MODIFIED_DATE}}" />
<meta property="article:author" content="{{AUTHOR_NAME}}" />
<meta property="article:tag" content="{{PRIMARY_KEYWORD}}" />
<meta property="article:tag" content="{{SECONDARY_KEYWORD}}" />
<meta property="article:tag" content="{{TERTIARY_KEYWORD}}" />

<!-- Article-specific description (NOT sitewide default) -->
<meta name="description" content="{{ARTICLE_UNIQUE_DESCRIPTION}}" />
<link rel="canonical" href="{{ARTICLE_CANONICAL_URL}}" />
<meta name="robots" content="index, follow" />
```

**Canonical rule:** Every page MUST have a canonical. Homepage canonical must match `og:url` exactly, same www/non-www. Pick one and enforce it sitewide.

---

## Step 3: Google Knowledge Panel Setup

Google's Knowledge Panel for a brand requires entity disambiguation. The schema signals that drive it:

### Required for Knowledge Panel

1. **`sameAs` with 4+ authoritative profiles.** Minimum viable set:
   - `https://www.linkedin.com/company/{{SLUG}}`
   - `https://twitter.com/{{HANDLE}}`
   - `https://www.producthunt.com/products/{{SLUG}}`
   - `https://www.crunchbase.com/organization/{{SLUG}}`

2. **Consistent NAP** (Name, Address/URL, Phone) across all platforms, must match the schema exactly

3. **Wikipedia or Wikidata entry**: strongest signal; create a Wikidata item if the brand doesn't have Wikipedia coverage yet (wikidata.org/wiki/Special:NewItem)

4. **Google Business Profile**: for service businesses; link it from `sameAs`

5. **Press mentions**: AI cites 31% press (per Princeton GEO Study); press mentions establish the entity as real and notable

### Implementation checklist

- [ ] Organization schema has `sameAs` array with 4+ URLs
- [ ] LinkedIn company page exists and name matches schema exactly
- [ ] Twitter/X profile exists and bio matches brand description
- [ ] ProductHunt product page exists
- [ ] Crunchbase org page exists (free to create)
- [ ] Wikidata item created with `instance of: company` and `official website` property set

---

## Step 4: Content GEO Signals

These go in the **page body content**, not just the head. AI models read the full page.

### 4a. Cite Authoritative Sources (+115% citation rate)

> **Source validation:** Before embedding any citation, run `/source-validate <url>` to verify the source meets authority standards. One weak source (DR < 20, no methodology, anonymous author) can reduce the credibility signal of the entire page. The source-validation skill provides tier classification (Tier 1 / Tier 2 / Tier 3 / Reject) and a pre-validated source library.

**Minimum bar for citations used in GEO content:**
- Domain Rating ≥ 40 (Ahrefs scale), or recognized Tier 1 publication
- Author name present and verifiable
- Published within 2 years for fast-moving topics (AI, marketing, tech)
- Primary source (not a secondary citation of a citation)
- Sample size ≥ 100 for survey data, ≥ 1,000 for market-scale claims

**Never cite:** content farms, anonymous "statistics" pages without methodology, roundup articles that cite other roundups, or sources older than 5 years on fast-moving topics.

**Rule:** Every factual claim needs an inline citation. Format:

```html
<p>
  Generative engines cite organic press in
  <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener"
    >31% of responses</a
  >, making earned media the highest-weight citation category.
</p>
```

**Key sources to cite** (verified academic/authority):

- Princeton GEO Study: `https://arxiv.org/abs/2311.09735`: Aggarwal et al., "GEO: Generative Engine Optimization"
- Google Search Central docs: `https://developers.google.com/search/docs/fundamentals/seo-starter-guide`
- Schema.org vocabulary: `https://schema.org`
- Moz Domain Authority definition: `https://moz.com/learn/seo/domain-authority`

**Pattern:** Cite the source in the anchor text, not as "[1]" footnotes. AI models read anchor text as context.

<!-- added by skill-radar 2026-08-25 from sanity-io/agent-toolkit@seo-aeo-best-practices -->
**Anti-pattern: circular citation networks.** Citing out earns the +115% lift only when the destinations are independent authorities. Reciprocal citation (your site cites a partner, the partner cites you back) and closed loops inside one owned network read as manufactured authority, not earned. Rule: every citation in the stack above must point to a source that has no incentive to cite you back. Audit the outbound set for reciprocity before shipping, not after.


### 4b. Stats Callout Pattern

Add an H2 on the homepage that leads with a statistic:

```html
<h2>{{STAT_NUMBER}}% of {{AI_ENGINE}} Sources Come From {{YOUR_CATEGORY}}</h2>
<p>
  According to the Princeton GEO Study (Aggarwal et al., 2023), content that
  cites authoritative sources receives a
  <strong>115% higher citation rate</strong>
  from generative AI engines. {{BRAND_NAME}} {{CONNECTS_TO_STAT}}.
</p>
```

### 4c. Google Helpful Content Self-Assessment (16 Questions)

Google's helpful content system uses these questions internally. Run every page through this before publishing. A "no" on any of the first seven is a ranking risk.

**Content and quality signals:**

1. Does it provide original information, reporting, research, or analysis not found elsewhere?
2. Is the description substantial, complete, and comprehensive rather than thin?
3. Does it offer insightful analysis or interesting information that is beyond the obvious?
4. If it draws from other sources, does it add substantial value rather than merely copying?
5. Does the headline provide a descriptive, helpful summary without being sensationalized?
6. Would you bookmark, share, or recommend this page to a friend?
7. Does it read like it was written by someone who knows the topic well?
8. Are there spelling errors, stylistic issues, or signs of sloppy production?
9. Is the content mass-produced across many topics or by many creators?

**Expertise and authority signals:**

10. Does it establish trustworthiness through sourcing and author background?
11. Is the site recognized as an authority for this topic by others in the field?
12. Does it contain easily-verifiable factual errors?

**People-first vs. search-engine-first signals (red flags):**

13. Was it produced primarily to attract search engine visits rather than help a real reader?
14. Does it summarize others' findings without adding value?
15. Was it created following content trends without genuine audience interest or expertise?
16. Would a reader need to search elsewhere to get a better answer?

**The "Who, How, Why" transparency check (Google's 2025 framework):**
- **Who**: Is there a named author with verifiable background?
- **How**: Is the content creation process transparent (including whether AI was used)?
- **Why**: Was it created primarily to help people, or to manipulate rankings?

Content that answers yes to any of questions 13-16 is at risk of the Helpful Content System demotion regardless of other signals.

### 4d. Comparison Table (highly citable format)

AI models prefer tabular data for summarization. Include at least one comparison table per key page:

```html
<table>
  <thead>
    <tr>
      <th>Dimension</th>
      <th>Traditional SEO</th>
      <th>GEO (Generative Engine Optimization)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Primary signal</td>
      <td>Backlinks + keyword density</td>
      <td>Citations + entity authority + recency</td>
    </tr>
    <tr>
      <td>Target platform</td>
      <td>Google Search</td>
      <td>ChatGPT, Perplexity, Claude, Gemini</td>
    </tr>
    <tr>
      <td>Content type that wins</td>
      <td>Keyword-optimized pages</td>
      <td>Source-citing, stat-dense, expert-quoted</td>
    </tr>
    <tr>
      <td>Top citation source</td>
      <td>Any indexed page</td>
      <td>Organic press (31% of AI citations)</td>
    </tr>
  </tbody>
</table>
```

### 4d. FAQ Section (visible + schema)

Every key page should have a visible FAQ section **AND** a matching per-page `FAQPage` schema block. The sitewide FAQ covers product questions; page-level FAQs cover topic queries.

> **⚠️ 2026 update (Averi):** In the FAQ block itself, keep H3s phrased as questions. But for **main page content H2/H3s**, use **descriptive** phrasing, not questions. Descriptive headings average **4.3 citations** vs **3.4** for question-style headings. Reserve question phrasing for the FAQ block only.

**Answer length:** 40–60 words per answer; this is the extraction sweet spot for Perplexity and ChatGPT. Under 30 words loses context; over 80 words gets truncated.

```html
<section>
  <h2>Frequently Asked Questions About {{PAGE_TOPIC}}</h2>

  <h3>{{QUESTION_PHRASED_AS_NATURAL_LANGUAGE_SEARCH}}</h3>
  <p>{{COMPLETE_SELF_CONTAINED_ANSWER_40_TO_60_WORDS}}</p>

  <h3>{{QUESTION_2}}</h3>
  <p>{{ANSWER_2}}</p>
</section>
```

Then inject a matching `FAQPage` schema block in the page head for the same Q&A pairs.

### 4e. Expert Quotes

Quote named experts with attribution. AI models weight content higher when it contains attributed expert opinions:

```html
<blockquote>
  <p>"{{QUOTE_TEXT}}"</p>
  <cite
    > {{EXPERT_NAME}}, {{EXPERT_TITLE}},
    <a href="{{SOURCE_URL}}">{{SOURCE_NAME}}</a></cite
  >
</blockquote>
```

---

<!-- added by skill-radar 2026-08-16 from agricidaniel/claude-seo@seo-content, @seo-content-brief, kostja94/marketing-skills@content-strategy -->

## Step 4.5: Content Quality Gates (Google-official, apply before any GEO tactic)

Everything above optimizes *how* a page is packaged. These gates decide whether it deserves to be cited at all. Run them first; a page that fails Who/How/Why does not get rescued by schema.

### Google's Who / How / Why test (canonical heuristic)

Google's own three-question test from the helpful-content guide. Run it on every page before scoring anything else.

| Question | What to look for |
|---|---|
| **Who** created it? | Visible byline, author bio page, professional credentials. Non-negotiable for YMYL, and clinic and finance content is YMYL. |
| **How** was it created? | Process disclosure where a reader would reasonably ask, especially for AI-assisted content. Original research, first-hand evidence, lived experience. |
| **Why** does it exist? | "To help people" rather than "to attract search clicks." Red flags: entering a niche without expertise, churning content for freshness signals, writing to a word-count target. |

Source: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

Weak answers on all three put the page at risk under the core ranking system's helpfulness signals. The standalone Helpful Content System was **merged into core during the March 2024 update** and no longer runs as a separate classifier, so enforcement is continuous rather than arriving as a named HCU event. Google also now documents smaller unannounced core updates between the major ones.

### AI content is judged as content, not as AI (Sept 2025 QRG)

Raters assess low-quality, scaled, or copied main content patterns. AI authorship is not itself the issue.

**Passes:** genuine E-E-A-T, unique value, human oversight and editing, original insight.
**Fails:** generic phrasing, no original insight, repetitive structure across pages, no author attribution, factual inaccuracies.

### Information gain is the non-negotiable brief field

Every content brief must state exactly what new value the page adds that no currently-ranking page provides. It must be one of:

- proprietary data or original research
- a case study with real outcomes
- expert quotes or first-hand experience
- original synthesis or a unique framework

"More detail" and "better formatting" are **not** information gain. A brief without a specific answer here should not be written to.

### Topic clusters beat standalone pages, with numbers

One pillar page per core topic, cluster articles per subtopic, pillar to cluster and cluster to cluster internal links.

- Clustered content earns roughly **42% more AI citations** than standalone pages
- Roughly **30% more organic traffic**, and rankings hold about **2.5x longer**
- One page per topic prevents cannibalization, which is the failure mode of publishing many near-duplicate posts

Build order: choose 3-7 core topics, map subtopics from People Also Ask and competitor gaps, audit existing pages for pillar and cluster candidates, **ship clusters first** (they often rank before the pillar does), publish the pillar, wire the links, revisit quarterly.

### Scope honestly: GEO is rebranded SEO, per Google

Google's "optimizing for generative AI features" guide (2026-06-29) states plainly that you do **not** need AI-specific files, AI-specific markup, Markdown versions, content chunking, or AI-targeted rewrites, and that chasing inauthentic "mentions" is unhelpful. AI Overviews and AI Mode are grounded in the same ranking and quality systems as classic Search.

Two consequences for this skill:

1. Treat **Step 17 (LLMs.txt + per-page .md.txt)** as speculative upside, not a requirement. Ship it only after the Who/How/Why gates and the schema stack are clean, and never present it to a client as something Google asks for.
2. Per Google's "using third-party SEO tools, services, and advice" guidance (2026-06-05), no tool has access to Google's internal ranking data. **Every score this skill emits is a heuristic, so say so in the report**, and validate GEO findings against Search Console as the first-party source.

---

## Step 5: Technical Hygiene Checklist

Run through this for every page generated or audited:

### Images

- [ ] All images have `width` and `height` attributes (prevents CLS)
- [ ] All images have descriptive `alt` text (not empty, not "image")
- [ ] Images below the fold use `loading="lazy"`
- [ ] Logo / hero image above the fold uses `loading="eager"` (NOT lazy; pressbeat.io has this wrong)
- [ ] OG image is 1200×630px

### Performance

- [ ] Web fonts preloaded: `<link rel="preload" href="{{FONT_URL}}" as="font" type="font/woff2" crossorigin>`
- [ ] Critical CSS inlined or render-blocking CSS deferred
- [ ] Third-party scripts loaded with `async` or `defer`

### Canonical + Crawl

- [ ] Every page has `<link rel="canonical" href="{{EXACT_URL}}" />`
- [ ] www and non-www are consistent: pick one and 301 the other
- [ ] `og:url` matches canonical exactly
- [ ] `sitemap.xml` exists and submitted to Google Search Console
- [ ] `robots.txt` exists and does not block `/`

### Recency signals

- [ ] `datePublished` and `dateModified` in Article schema
- [ ] `dateModified` surfaced visibly in article UI (not just schema)
- [ ] Blog posts published at consistent cadence (weekly minimum for freshness signal)

### Agent-friendly UX (WebMCP era, Google web.dev 2025)

As AI agents move from reading pages to operating them (booking, purchasing, form submission),
these signals affect whether agents can successfully complete tasks on your site. Google has
proposed **WebMCP** as a standard for structured agent-website interaction; these hygiene items
future-proof your site regardless of which protocol wins.

- [ ] Interactive elements use semantic HTML: `<button>`, `<a>`, `<input>`, not styled `<div>` or `<span>`
- [ ] When semantic HTML is not possible, provide `role="button"` and `tabindex="0"` via ARIA
- [ ] All interactive elements have `cursor: pointer` in CSS (signals actionability)
- [ ] All `<label>` elements use `for="inputId"` to associate with their input (helps agents understand form fields)
- [ ] Every interactive element has a visible area larger than 8 square pixels (agent visual analysis filters smaller elements)
- [ ] Layouts are stable across page states (avoid shifting elements that break agent screenshot analysis)
- [ ] No hidden or transparent overlays obscuring interactive elements
- [ ] All actions taken by a user are reflected clearly in the interface state (state visibility principle)

**Emerging: Universal Commerce Protocol (UCP)** -- Google is piloting an agentic commerce layer
where agents can complete bookings and purchases via declared endpoints. If your site has
e-commerce or bookings, check https://web.dev/articles/ai-agent-site-ux for the early adopter
program. Not required today; worth watching.

---

## Step 6: Google Content Warehouse API Leak (2024), Signal Intelligence

Source: the 2024 Google Content Warehouse API leak exposed 2,596 modules and 14,014 attributes. Combined with the 2025–2026 GEO data above, these attributes tell you **what Google's systems actually read**, so structuring HTML to match pays off in both SEO and GEO (since AI engines scrape what Google indexes).

> **Caveat:** the leak confirms attributes *exist*; exact weights are not confirmed. Treat these as confirmed factors, impact as informed estimates.

### 6a. Title tag: match `titlematchScore`

- Primary keyword in **first 40 characters**
- Brand token at end
- Total **< 60 characters** to avoid SERP truncation

```html
<title>X Core SEO Tactics for [Entity] | [Brand]</title>
```

### 6b. Date reconciliation: avoid `trustSyntacticDateInRanking = false`

Google extracts publish dates from **four** places: URL slug, JSON-LD `datePublished`, visible byline, `<meta>` tags. If any two disagree by **more than 7 days**, the freshness signal is discarded entirely, meaning your recency advantage evaporates.

**Rule:** all four must match. Copyright-year and sidebar edits do NOT reset `lastSignificantUpdate`; only substantive content rewrites do.

```html
<p class="byline">
  By
  <span itemscope itemtype="https://schema.org/Person">
    <a href="/author/jane-doe" itemprop="url">
      <span itemprop="name">Jane Doe</span>
    </a>
  </span>
  | <time datetime="2026-04-18">April 18, 2026</time>
</p>
```

### 6c. Update-log pattern (boosts `contentEffort`)

Transparent revision history is a quality signal. Show it visibly:

```html
<p class="update-log">
  <strong>Last updated:</strong> April 18, 2026
  | Added section on <a href="#ai-seo">AI & SEO trends</a>
  | <a href="/changelog/2026-04">See all updates</a>
</p>
```

### 6d. Above-the-fold answer placement (NavBoost: `goodClicks`, `lastLongestClicks`, `badClicks`)

- Place the answer-bearing paragraph in the **first 500px**: reduces pogo-stick bounces (`badClicks`) and lengthens dwell (`lastLongestClicks`)
- NavBoost runs a **13-month rolling window**: new content needs 2–3 months of sustained positive clicks to compete with aged pages
- Add related-content in-body links to extend session depth (`pnav` signal)

### 6e. Entity-density via Article `about`

Beyond `author` and `publisher`, link to the entities the page discusses. Reinforces `topicalityScore` and `annotatedEntityId`:

```json
{
  "@type": "Article",
  "about": [
    { "@type": "Thing", "name": "Generative Engine Optimization", "url": "https://en.wikipedia.org/wiki/Generative_engine_optimization" },
    { "@type": "Thing", "name": "Schema.org", "url": "https://schema.org" }
  ],
  "datePublished": "2026-04-18",
  "dateModified": "2026-04-18"
}
```

Target: **15+ recognized entities per page** (Averi 2026): page schema + body mentions + backlinks combined.

### 6f. Internal anchor text: descriptive, not generic

- ❌ "click here", "learn more", "read more": wastes the anchor slot
- ✅ "5 actionable SEO tactics for local rankings": specific, keyword-rich, topical

Google's `AnchorsAnchor` and `droppedAnchorCount` attributes track anchor quality. Generic anchors get discarded.

### 6g. New-domain sandbox (`hostAge`)

New domains face `~3 month` sandbox suppressing competitive query rankings. Counter with:
- Fast authoritative backlinks (PR via Muck Rack's top-cited outlets)
- Wikidata + Wikipedia entity creation
- Branded search volume (ads, social, launch)

### 6h. Core Web Vitals thresholds

`chromeInTotal` + NavBoost read real browser data. CWV pass ranges:

- **LCP** < 2.5s
- **CLS** < 0.1
- **INP** < 200ms

Poor CWV → inflated `badClicks` → NavBoost downgrade.

### 6i. Demotions to AVOID (pre-computed penalties)

| Demotion attribute | Trigger | Avoidance |
|---|---|---|
| `pandaDemotion` / `babyPandaDemotion` | Thin/low-quality page ratio | Audit all pages; consolidate or delete thin ones; target `siteQualityStddev` < 0.2 |
| `exactMatchDomainDemotion` | Keyword EMD with no brand/authority | Build brand mentions, branded search, editorial links |
| `anchorMismatchDemotion` | Inbound anchors don't match page content | Audit backlinks; disavow or request changes |
| `navDemotion` | Doorway/funnel-only pages | Each page must have standalone, substantive value |
| `scamness` > 512 (0–1023 scale) | Fake urgency, hidden contact info, fake testimonials | Real contact info, no countdowns, honest claims |
| `unauthoritativeScore` > 512 | YMYL page lacking credentials | Author Person schema + verifiable credentials + Tier 1 backlinks |
| `productReviewPDemotePage` | Affiliate review with no hands-on testing | Original photos, measurements, comparative tests, evidence |
| `uacSpamScore` ≥ 64 (0–127) | Automated spam classification | Human-written, unique, no spun/AI-gibberish |
| `GibberishScore` high | Machine-generated or spun text | All copy must be coherent and human-edited |
| `KeywordStuffingScore` high | Unnatural keyword density | One primary keyword per ~100 words; no synonym stuffing |
| `vlq` (Very Low Quality) | Page-level floor breach | Minimum **300 words** substantive content |

### 6j. Author entity consolidation (`authorObfuscatedGaiaStr`)

Link author reputation across sites by using the **same Google account** for: Search Console verification, author bylines, YouTube channel, social profiles listed in `sameAs`. Google accumulates author signal across properties.

### 6k. E-E-A-T clarification (Google 2025 SEO Starter Guide)

**E-E-A-T is NOT a direct algorithmic ranking signal.** Google explicitly states this in the 2025 SEO Starter Guide. It is a quality framework used by human quality raters and informs how ranking systems are trained, but there is no `eeat_score` attribute being read in real time. The practical implication: building genuine expertise, demonstrating experience, and earning authoritative backlinks lifts the underlying signals that DO feed the algorithm (NavBoost click quality, `topicalityScore`, `unauthoritativeScore`). Do not optimize for "E-E-A-T" as a target; optimize for the signals E-E-A-T is a proxy for.

Exceptions: YMYL pages (health, finance, safety) face elevated `unauthoritativeScore` scrutiny because their quality rater pass rate directly shapes model training data. Credentials + verifiable author Person schema + Tier 1 backlinks are effectively mandatory here even if not a "direct signal."

### 6l. AI-generated content and scaled content abuse

Google does not ban AI-generated content. The penalty trigger is **scaled content abuse**: generating many pages with AI tools without adding user value. Specifically flagged:

- Multiple pages on similar topics with only slight variation (synonym-swap, city-swap, template fill)
- Summarizing other sources' findings without any original analysis or data
- Content written to a specific word count rather than to answer a question
- Pages without a named, verifiable author on topics requiring expertise
- Images with no IPTC metadata labeling on AI-generated visuals

The `uacSpamScore` and `GibberishScore` attributes (Step 6i) are the algorithmic gates. Human-written or heavily-edited AI content that adds genuine value does not trigger these; automated content farms that generate hundreds of thin variations do.

**Safe AI content practice:** use AI to draft, then add original data, first-hand examples, expert quotes, or analysis not found elsewhere. The diff between the AI draft and the published version should be substantive.

---

## Step 7: Press Release Playbook (Muck Rack, Dec 2025)

Press release citations grew **5x** in 6 months (Jul–Dec 2025), the fastest-growing AI citation source. The Dec 2025 study identified exactly what makes a press release get cited.

### 7a. Structural profile of cited press releases

Against non-cited baselines, cited PRs had:

- **2x** more statistics per piece
- **30%** more action verbs
- **2.5x** more bullet points
- **30%** higher rate of objective (fact-based) sentences
- More unique company/product mentions (build a named-entity mesh)

### 7b. Template: AI-optimized press release

```markdown
# {{Brand}} {{Action Verb}} {{Noun}}: {{Specific Outcome Number}}

**{{City, State, Date}}**: {{One-sentence lead with primary stat, entity name, and timeframe.}}

## Key Findings
- **{{Stat 1}}**: {{source / methodology}}
- **{{Stat 2}}**: {{source / methodology}}
- **{{Stat 3}}**: {{source / methodology}}
- **{{Stat 4}}**: {{source / methodology}}
- **{{Stat 5}}**: {{source / methodology}}
- **{{Stat 6}}**: {{source / methodology}}

## Background
{{2–3 objective sentences. No adjectives of self-promotion. Active voice.}}

## Expert Quote
> "{{Quote citing one specific stat, one implication.}}"
> {{Name}}, {{Title}}, {{Brand}}

## About {{Brand}}
{{50-word boilerplate with canonical URL, founding year, HQ, sameAs-matching description.}}

**Media contact:** {{Name}} · {{email}} · {{phone}}
```

### 7c. Distribution targets (AI-cited outlets, Dec 2025)

- **Claude priority:** U.S. News & World Report, Nature, Yahoo Finance
- **ChatGPT priority:** Reuters, The Verge, The Guardian
- **Gemini priority:** Forbes, Investopedia, NerdWallet

### 7d. PR-journalist rebuild

**Only 2% overlap** between traditional pitched journalists and those AI cites. Action: audit your existing media list. For any journalist you currently pitch, check whether their articles show up in ChatGPT/Perplexity/Gemini when you query for your category. If not, they do not count for AI visibility. Rebuild the list around AI-cited bylines.

### 7e. 7-day window

Citation rate peaks within **7 days** of publication and decays fast. Schedule the press release, the blog post embedding it, and the social/LinkedIn amplification within the same week. Earn coverage that links back to the press release URL inside that window.

---

## Step 8: Community Platform Signals (Reddit, Medium, Quora, YouTube)

The Dec 2025 Muck Rack data flagged Reddit, Medium, and Quora as **rising AI power players**. They provide signals AI engines weight heavily:

- **Human engagement at scale**: upvotes, comments, shares
- **First-person authentic perspectives**: which AI models prefer over marketing copy
- **High crawlability**: these platforms have zero anti-bot friction
- **Journalist sourcing validation**: reporters source quotes from these platforms, which then get cited

### 8a. Reddit strategy

- Own (or co-own) a subreddit for your category
- Seed founder AMAs with substantive answers (no link-spam)
- Answer "best X" and "X vs Y" threads with data-backed, cited responses that mention your brand name in a neutral/comparative context, not as the only option
- Let natural upvotes validate; never buy or manipulate votes (Reddit's detection + Google's `unauthoritativeScore` both punish it)

### 8b. Medium strategy

- Founder/expert byline publishing technical deep-dives
- Cross-publish blog content to Medium with canonical tag back to site (avoids duplicate-content penalty, still earns Medium's domain authority signal)
- Follow Medium's distribution format: 3–7 min read, 1 main image, code/quote blocks, H2/H3 hierarchy

### 8c. Quora strategy

- One expert answer per category question that you could credibly answer
- Lead with a direct 40–60 word answer (same format as Perplexity-optimized lead paragraphs)
- Cite your own research and link back once per answer

### 8d. YouTube strategy

- Publish the video version of every Tier 1 blog post: YouTube is Google's #2 property, and transcripts get indexed
- Upload SRT captions (not auto-generated) for higher transcript quality
- Include a structured description with timestamps and source links

### 8e. Fan-out content (Generative Pulse Summit, 2025)

Anticipate follow-up questions AI users ask after the primary query. Create "fan-out" content: 5–10 satellite pieces per hub page, each answering one specific follow-up. Seed answers across the 4 platforms above **before competitors** publish. This captures the multi-turn conversation in AI engines.

---

## Step 9: Next.js 15 App Router Implementation

For Next.js 15 App Router projects:

### `app/layout.tsx`: sitewide metadata via Next.js Metadata API

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "{{BRAND_NAME}}: {{TAGLINE}}",
    template: "%s | {{BRAND_NAME}}",
  },
  description: "{{150_CHAR_DESCRIPTION}}",
  keywords: ["{{KW1}}", "{{KW2}}", "{{KW3}}"],
  authors: [{ name: "{{BRAND_NAME}}", url: "{{CANONICAL_URL}}" }],
  metadataBase: new URL("{{CANONICAL_URL}}"),
  // No alternates.canonical and no openGraph.url in the root layout: every page that
  // sets neither inherits them, which tells engines every page is the home page.
  // Set both in each page's metadata (Field-Tested Playbook, step 6).
  // The home page sets its own canonical and og:url in app/page.tsx.
  openGraph: {
    type: "website",
    locale: "{{OG_LOCALE}}", // e.g. en_US, en_PH; match <html lang>
    siteName: "{{BRAND_NAME}}",
    title: "{{BRAND_NAME}}: {{TAGLINE}}",
    description: "{{150_CHAR_DESCRIPTION}}",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "{{BRAND_NAME}}: {{TAGLINE}}",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "{{BRAND_NAME}}: {{TAGLINE}}",
    description: "{{150_CHAR_DESCRIPTION}}",
    images: ["/og-image.png"],
    creator: "@{{TWITTER_HANDLE}}",
  },
  robots: { index: true, follow: true },
};
```

### JSON-LD injection in layout: use a `JsonLd` helper component

Create `components/json-ld.tsx`:

```tsx
// Safe JSON-LD injection component: content is static schema, not user input
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Static schema object serialized server-side: not derived from user input
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
```

Use in `app/layout.tsx`:

```tsx
import { JsonLd } from "@/components/json-ld";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "{{BRAND_NAME}}",
  // ... rest of schema
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd schema={organizationSchema} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Article page metadata (dynamic)

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        { url: post.ogImage, width: 1200, height: 630, alt: post.title },
      ],
    },
  };
}
```

---

## Step 10: Metadata Audit and Optimization

Meta tags are the highest-leverage, lowest-effort SEO surface. A 5-char change in a title can lift CTR by 15%. Google truncates by **pixel width**, not character count; Bing uses character count; AI engines read the full tag but weight the first clause.

### 10a. Length rules (pixel-width enforced)

| Tag | Pixel limit (Google SERP) | Char target | Hard cap |
|---|---|---|---|
| `<title>` | ~600px desktop, ~480px mobile | 50 to 60 chars | 70 chars |
| `<meta name="description">` | ~920px desktop, ~680px mobile | 140 to 160 chars | 170 chars |
| `og:title` | n/a (platform renders own size) | 55 to 70 chars | 95 chars (LinkedIn cap) |
| `og:description` | n/a | 150 to 300 chars | 300 chars (LinkedIn cap) |
| `twitter:title` | ~70 chars visible | 55 to 70 chars | 70 chars |
| `twitter:description` | ~200 chars visible | 150 to 200 chars | 200 chars |

**Pixel-width rule of thumb:** narrow chars (i, l, f, t, 1) count as 0.5; wide chars (W, M, m, w) count as 1.5; all others count as 1. Any title exceeding 600px gets a trailing ellipsis in SERP. The audit script measures this automatically.

### 10b. Title tag anatomy

```
<Primary Keyword> <Modifier> <Year if relevant> | <Brand>
```

Four CTR-tested patterns:

1. **Question format** (informational, long-tail): `How to Fix X in Y: 2026 Guide | Brand`
2. **List format** (evergreen, BOFU): `7 Proven Ways to X | Brand`
3. **Value-prop format** (homepage, BOFU): `X Without Y. Ship in Z Minutes | Brand`
4. **Comparison format** (intent-match, MOFU): `X vs Y: Which Is Better for Z? | Brand`

Primary keyword goes in the **first 40 characters**. Brand token goes at the end unless the brand IS the search query.

### 10c. Meta description anatomy

Three-part structure, 150 chars:

1. **Lead benefit or stat** (first 40 chars, visible on truncation): `Cut churn 40% with X.`
2. **Proof or mechanism** (next 60 chars): `Trusted by 200 SaaS teams, no engineering required.`
3. **Call to action** (last 40 chars): `Start your free trial today.`

The description does not rank on its own, but directly impacts CTR, which feeds NavBoost. A better description without keyword changes can lift organic CTR 20 to 30%.

### 10d. A/B variant generation (always produce 3)

For every page, generate three title and three description variants by rotating:

- Axis 1: benefit-led vs outcome-led vs curiosity-led
- Axis 2: number present vs no number
- Axis 3: question format vs statement format

Deploy variant A, measure CTR in Google Search Console over 2 weeks with ≥ 1,000 impressions, pick the winner.

### 10e. Uniqueness audit

Every page needs a unique title AND unique description. Duplicates cause `navDemotion` and confuse AI engines picking which page to cite. Audit script checks for duplicates within the crawled set.

### 10f. Robots directive matrix

| Directive | When to use | Example |
|---|---|---|
| `index, follow` | Default for all public pages | `<meta name="robots" content="index, follow">` |
| `noindex, follow` | Thin pages, tag archives, filter pages | `<meta name="robots" content="noindex, follow">` |
| `noindex, nofollow` | Staging, admin, thank-you pages | `<meta name="robots" content="noindex, nofollow">` |
| `max-snippet:160` | Cap SERP snippet length | `<meta name="robots" content="index, follow, max-snippet:160">` |
| `max-image-preview:large` | News, blog, force large preview | `<meta name="robots" content="index, follow, max-image-preview:large">` |
| `max-video-preview:30` | Cap video preview seconds | `<meta name="robots" content="index, follow, max-video-preview:30">` |
| `noai, noimageai` | Block AI training (respected by some crawlers) | `<meta name="robots" content="index, follow, noai, noimageai">` |

**Next.js 15 equivalent:**

```tsx
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': 160, 'max-image-preview': 'large' },
  },
};
```

### 10g. Truncation preview rule

Simulate the SERP snippet before shipping:

```
[Favicon] Brand Name
https://example.com/page
<Title truncates at ~60 chars and trails off like thi...>
<Description truncates at ~155 chars, usually mid-sente...>
```

If truncation cuts the value prop or CTA, rewrite. Front-load every tag.

---

## Step 11: Alt Text System

Alt text serves two masters: screen readers (accessibility) and search/AI engines (context). The rules that satisfy both:

### 11a. Classification first

Every image is one of four types. Alt rule depends on type.

| Type | Purpose | Alt rule |
|---|---|---|
| **Decorative** | Purely visual, adds no meaning (bg shapes, dividers) | `alt=""` (empty, NOT missing). Screen reader skips it. |
| **Informative** | Conveys info the text does not | Describe what the image shows, 5 to 15 words |
| **Functional** | Triggers an action (logo links, icon buttons) | Describe the action, not the image. Logo link home: `alt="Home"`, not `alt="Company logo"` |
| **Complex** | Charts, infographics, data viz | 10-word alt plus long description via `aria-describedby` or visible caption |

### 11b. Length rules

- **Hard cap: 125 chars.** JAWS and NVDA truncate longer strings.
- **Target: 8 to 15 words** for informative, 3 to 7 words for functional.
- **Do not stuff keywords.** Google confirmed (2022 Search Off the Record) that stuffed alt text is treated as spam.

### 11c. What NOT to write

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| `alt="image"` or `alt="photo"` | Zero information | Describe content |
| `alt="IMG_4521.jpg"` | Filename as alt | Describe content |
| `alt=""` on informative image | Hidden from screen readers | Write real alt |
| Missing `alt` attribute entirely | Browser falls back to filename | Always include, even if empty |
| `alt="best seo tool best seo agency best seo saas"` | Keyword stuffing | One natural phrase |
| `alt="Picture of a dog on a porch"` | `Picture of` is redundant (screen readers announce "image") | `alt="Golden retriever on a wooden porch"` |

### 11d. Generation templates by context

**Product image:**
`alt="<Product name> in <color/variant>, <key visual feature>"`
Example: `alt="Acme stand mixer in matte black, 5-quart bowl attached"`

**Team / founder headshot:**
`alt="<Full name>, <title> at <Brand>"`
Example: `alt="Maria Santos, head of growth at Example Co"`

**Screenshot (UI):**
`alt="<Product name> <screen name> showing <key element>"`
Example: `alt="Acme dashboard showing the invoice form with three export previews"`

**Chart / data viz:**
`alt="<Chart type> comparing <metric> across <categories>, <top-line insight>"`
Example: `alt="Bar chart comparing AI citation rate across five publishers, Reuters leads at 18%"`, plus a longer visible caption.

**Logo:**

- Standalone: `alt="<Brand> logo"`
- Linked to home: `alt="<Brand>"` (functional, describe the destination)

**Decorative element:**
`alt=""` with `role="presentation"` when in doubt.

### 11e. Audit script output

`scripts/audit.mjs` flags every image with:

- `CRITICAL`: missing `alt` attribute entirely
- `HIGH`: filename-as-alt (`.jpg`, `.png`, `IMG_`, `DSC_`, `Screenshot` present in alt)
- `HIGH`: `alt=""` on an image with a caption or inside `<figure>` (probably informative)
- `MEDIUM`: alt > 125 chars
- `MEDIUM`: alt text redundancy (`image of`, `picture of`, `photo of`)
- `LOW`: missing `width` or `height` attributes (CLS risk)

### 11f. Bulk generation via Claude vision

For projects with 20+ images lacking alt, pipe each image to Claude with:

```
Write alt text for this image following these rules:
- 8 to 15 words for informative content, 3 to 7 for functional
- No "image of", "picture of", or filename references
- Start with the subject, describe the key visual, end with context
- 125 char hard cap
- Match this page context: <page topic>
Return ONLY the alt text, no quotes, no explanation.
```

---

## Step 12: Extended Meta Tag Stack

The `<head>` tags most sites skip. Each adds a small signal; cumulatively they matter.

### 12a. PWA and mobile UX tags

```html
<!-- Color theme picked up by Android Chrome, iOS Safari, Edge -->
<meta name="theme-color" content="#0A0A0A" media="(prefers-color-scheme: dark)" />
<meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
<meta name="color-scheme" content="light dark" />

<!-- iOS home-screen install -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="{{BRAND}}" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

<!-- Android / Windows -->
<meta name="mobile-web-app-capable" content="yes" />
<meta name="application-name" content="{{BRAND}}" />
<meta name="msapplication-TileColor" content="#0A0A0A" />
<meta name="msapplication-TileImage" content="/mstile-144x144.png" />
<meta name="msapplication-config" content="/browserconfig.xml" />

<!-- Disable automatic phone-number linking on iOS -->
<meta name="format-detection" content="telephone=no" />

<!-- Referrer policy, protects outbound query strings, UTM, auth -->
<meta name="referrer" content="strict-origin-when-cross-origin" />
```

### 12b. hreflang matrix (multi-language / multi-region)

If the site serves multiple locales, declare every locale in every version. Omission triggers duplicate-content issues.

```html
<link rel="alternate" hreflang="en-US" href="https://example.com/" />
<link rel="alternate" hreflang="en-GB" href="https://example.com/en-gb/" />
<link rel="alternate" hreflang="fil-PH" href="https://example.com/ph/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

**Rules:**

- `x-default` is required, points to the fallback locale
- Every locale page lists every other locale (N locales = N entries per page)
- URLs are absolute and canonical
- Locale code is ISO 639-1 language plus ISO 3166-1 region (`en-US`, not `en_US`, not `english`)

### 12c. Platform-specific share cards

```html
<!-- LinkedIn, respects og:image:secure_url -->
<meta property="og:image:secure_url" content="https://example.com/og.png" />
<meta property="og:image:type" content="image/png" />

<!-- Facebook, uses Open Graph plus fb:app_id for analytics -->
<meta property="fb:app_id" content="{{FB_APP_ID}}" />

<!-- Pinterest rich pins (product / article / recipe) -->
<meta property="og:type" content="product" />
<meta property="product:price:amount" content="29.00" />
<meta property="product:price:currency" content="USD" />

<!-- Discord, Slack, WhatsApp: all use og:image + og:title + og:description (1200x630 or 1200x1200) -->
```

### 12d. Geo meta (local SEO)

```html
<meta name="geo.region" content="PH-00" />
<meta name="geo.placename" content="Manila" />
<meta name="geo.position" content="14.5995;120.9842" />
<meta name="ICBM" content="14.5995, 120.9842" />
```

Reinforces `LocalBusiness` schema for Google Maps and Apple Maps.

### 12e. Verification tags

```html
<meta name="google-site-verification" content="{{TOKEN}}" />
<meta name="msvalidate.01" content="{{BING_TOKEN}}" />
<meta name="yandex-verification" content="{{YANDEX_TOKEN}}" />
<meta name="facebook-domain-verification" content="{{FB_TOKEN}}" />
<meta name="p:domain_verify" content="{{PINTEREST_TOKEN}}" />
```

Required for Google Search Console, Bing Webmaster, Facebook Business, Pinterest verified merchant.

### 12f. Next.js 15 equivalent

```tsx
export const metadata: Metadata = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  colorScheme: 'light dark',
  appleWebApp: { capable: true, title: '{{BRAND}}', statusBarStyle: 'black-translucent' },
  formatDetection: { telephone: false },
  referrer: 'strict-origin-when-cross-origin',
  verification: {
    google: '{{TOKEN}}',
    other: { 'msvalidate.01': '{{BING_TOKEN}}', 'facebook-domain-verification': '{{FB_TOKEN}}' },
  },
  // alternates (canonical and hreflang languages) go in each page's metadata, not the
  // root layout, or every page inherits the home page's. Per page, for example:
  // alternates: { canonical: '/pricing', languages: { 'en-US': '/pricing', 'en-PH': '/ph/pricing' } }
};
```

---

## Step 13: Google Ads Landing Page Alignment

Google Ads Quality Score determines cost-per-click and ad position. Three factors feed it: **Expected CTR (40%)**, **Ad Relevance (30%)**, **Landing Page Experience (30%)**. This skill owns the landing-page side, which the `market-ads` skill plugs ad copy into.

### 13a. Quality Score: the landing-page checklist

- [ ] H1 contains the exact primary keyword from the ad group
- [ ] Meta title contains the primary keyword in the first 40 chars
- [ ] Page LCP under 2.5s (Google penalizes slow landers in Quality Score directly)
- [ ] No intrusive interstitials (cookie banner fine, full-screen popup not fine)
- [ ] CTA verbatim-matches the ad promise (`Start free trial` on ad = `Start free trial` on page)
- [ ] Trust signals above the fold (logos, ratings, testimonials, "trusted by")
- [ ] Privacy policy linked in footer (required for any ad that collects data)
- [ ] Contact info visible (required for Google Ads Local Service verification)
- [ ] No auto-play audio or video (landing page experience penalty)
- [ ] Mobile load time under 3s (70%+ of paid traffic is mobile)

### 13b. Triplet coherence rule

Ad headline, page H1, and meta title share the same primary keyword and same promise. Example:

| Surface | Text |
|---|---|
| **Google Ad headline** | Generate Shopee Listings in 60s |
| **Landing page H1** | Generate Shopee Listings in 60 Seconds |
| **Meta title** | Shopee Listing Generator: 60-Second AI Tool \| Acme |

Mismatch costs 10 to 40% in Quality Score. Test the triplet before launching any ad set.

### 13c. UTM convention

Standardize every paid URL. Inconsistent UTMs break attribution.

```
?utm_source=google
 &utm_medium=cpc
 &utm_campaign=<campaign-name-kebab>
 &utm_term=<keyword-targeted>
 &utm_content=<ad-variant-id>
```

**Rules:**

- All lowercase, hyphens not underscores, no spaces
- `utm_source`: platform (google, meta, linkedin, tiktok, reddit)
- `utm_medium`: channel type (cpc, paid-social, display, video, email)
- `utm_campaign`: matches the platform campaign name exactly
- `utm_term`: search ads only, contains the targeted keyword
- `utm_content`: specific ad creative variant (A, B, C or semantic label)

### 13d. Dynamic Keyword Insertion (DKI) safety

If the ad uses `{Keyword:default}` DKI, the landing page must handle ANY keyword in the ad group without looking mismatched. Rules:

- Keyword list is curated, no negatives missed (otherwise junk keywords render)
- Default text is always usable if keyword substitution fails
- Page H1 may echo the keyword via URL param (`?kw=`) when safe
- Never echo user-supplied strings without sanitization (XSS risk)

### 13e. Message match scorer (0 to 50)

Rate each ad-to-page pairing across five dimensions. Ship only pairings scoring ≥ 40:

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| **Keyword match** | Keyword absent from page | In body only | In H1 + title + body |
| **Promise match** | CTA differs from ad | Similar intent | Verbatim CTA match |
| **Audience match** | Wrong persona addressed | Generic copy | Persona named in H1 |
| **Proof match** | No proof | Generic ("trusted by many") | Named logos, specific metrics |
| **Speed match** | LCP > 4s | LCP 2.5 to 4s | LCP < 2.5s |

### 13f. Performance Max vs Search: landing page differences

- **Search ads:** single intent, lands on a keyword-matched page. Use 13a checklist directly.
- **Performance Max:** Google spreads creative across all channels. Page must work for warm AND cold traffic. Add: broad value prop above the fold, secondary nurture CTA for cold traffic, trust signals dense enough to convert without prior context.
- **Demand Gen / YouTube:** video-first traffic. Page must reinforce the video message within 3 seconds. Use the video thumbnail as the hero.

### 13g. Post-click tracking

```html
<!-- Google Ads conversion tag (gtag) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{GADS_ID}}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{GADS_ID}}');
</script>

<!-- Trigger on conversion -->
<script>
  gtag('event', 'conversion', {
    send_to: '{{GADS_ID}}/{{CONVERSION_LABEL}}',
    value: 0.0,
    currency: 'USD',
  });
</script>
```

For Next.js 15, use `next/script` with `strategy="afterInteractive"`, and load via Google Tag Manager if more than one ad platform is active.

### 13h. Handoff to market-ads

This skill stops at the landing page. For ad copy, audience targeting, bidding strategy, and budget allocation, hand off to `market-ads`. Invoke: `/market ads <landing-url>`.

---

## Step 14: Sitemap and robots.txt

### 14a. sitemap.xml requirements

- List every indexable page
- Under 50 MB and under 50,000 URLs per sitemap file
- Over that, split into a sitemap index
- `lastmod` must be accurate (falsified timestamps trigger `scamness` score)
- Submit to Google Search Console and Bing Webmaster Tools

### 14b. Next.js 15 dynamic sitemap

```tsx
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://example.com';
  const staticRoutes = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
  ];

  const posts = await getAllPosts();
  const postRoutes = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
```

### 14c. Multi-sitemap split

When content exceeds 10,000 URLs or crosses content types, split into:

- `sitemap-pages.xml`
- `sitemap-blog.xml`
- `sitemap-products.xml`
- `sitemap-images.xml`

Register them in `sitemap-index.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-pages.xml</loc>
    <lastmod>2026-04-23</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-blog.xml</loc>
    <lastmod>2026-04-23</lastmod>
  </sitemap>
</sitemapindex>
```

### 14d. robots.txt patterns

<!-- added by skill-radar 2026-08-31 from kostja94/marketing-skills@generative-engine-optimization -->
#### Crawler taxonomy first: blocking training does not block citation

AI crawlers fall into three classes with different GEO consequences. Conflating them is the most common robots.txt mistake.

| Class | Purpose | Named agents | GEO consequence |
|---|---|---|---|
| **Training** | Gather corpus for model pre-training | `GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`, Meta crawlers | Blocking keeps the site out of training data. It does **not** stop the same vendor's real-time retrieval. |
| **Index / RAG** | Build the retrieval index the model cites from | `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `Bytespider`, `AppleBot` | **Must be allowed.** Blocking these is what actually kills AI citation. |
| **Real-time fetch** | Fetch the page at query time | `ChatGPT-User` | Content must render without a login. Paywalls and auth walls block citation here. |

Practical rule: a proprietary-data site can block `GPTBot` / `ClaudeBot` / `CCBot` to protect the training moat **and still keep** `OAI-SearchBot` / `PerplexityBot` / `Claude-SearchBot` on Allow, and stay citable. The Disallow-everything-AI posture in the table below is almost never what the client actually wants.

#### Retrieval supply: which index each surface reads from

Citation is a retrieval problem, not a ranking problem. What a surface can cite is bounded by the index it queries.

| Surface | Retrieval supply | What this implies |
|---|---|---|
| Google AI Overviews / AI Mode | Google Search, with query fan-out | Strong classic SEO plus structured data is the most reliable path |
| Bing Copilot | Bing index | Requires Bing indexing specifically; only ~9.81% domain overlap with Google's cited set, so a Google-only strategy misses it. LinkedIn presence matters for B2B |
| ChatGPT web search | `OAI-SearchBot` index plus partners | Favors high-authority, frequently updated pages; backlinks carry |
| Perplexity | Own crawl, self-built index | Freshness and semantic alignment; the best surface for a mid-authority domain to win |
| Claude web search | Not publicly disclosed | Optimize for general crawlability and clean structure |
| Smaller AI tools and custom agents | Third-party search APIs (Tavily, Exa, You.com, Brave) | Reached indirectly by being indexed in standard web search |

Domain-age skew worth knowing before promising a client results: AI Overviews cite domains over 15 years old ~49% of the time, while Copilot skews younger (~18.85%). A new domain has a materially better shot at Perplexity and Copilot than at AI Overviews.

#### Push submission: there is almost none

- **Bing IndexNow** is the only general-purpose push channel for new or updated URLs. Use it.
- **Google's Indexing API is not general purpose**: it accepts `JobPosting` and `BroadcastEvent` pages only. Any vendor claiming to "submit your pages to Google" for other page types is selling nothing.
- OpenAI, Anthropic, Perplexity, xAI, Meta, and DeepSeek operate **no public submission portal**. Their crawlers find content through ordinary crawl and `sitemap.xml` only. Sitemap hygiene is the entire submission strategy for those surfaces.

#### Decision matrix: block or allow AI crawlers?

| Site type | Recommendation | Reason |
|---|---|---|
| Brand or content site (app landing page, blog, docs) | **Allow all AI crawlers** | AI citations = free distribution; blocking hurts GEO with no upside |
| Proprietary data / paid database / subscription content | **Block training crawlers** | Protects the data moat; keep GPTBot/ClaudeBot/CCBot on Disallow |
| E-commerce catalog | Allow product pages, block checkout/account | Indexing drives discovery; protecting private pages still matters |

**Default for brand and content sites: allow all AI crawlers.** The AI training moat argument applies only when the data itself is the product. For apps, SaaS, and content marketing sites, blocking AI crawlers reduces citation probability with no compensating benefit.

```
# Standard brand / content site -- AI crawlers allowed for citation probability
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/internal/
Disallow: /*?*utm_
Disallow: /thank-you
Disallow: /*?preview=

# Slow audit crawlers -- rate-limit, don't block
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

# AI crawlers: allow for brand / content sites
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

Sitemap: https://example.com/sitemap.xml
```

```
# Proprietary data site -- block AI training crawlers
User-agent: *
Allow: /
Disallow: /admin/

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

Sitemap: https://example.com/sitemap.xml
```

### 14e. Next.js 15 dynamic robots.txt

```tsx
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/thank-you'] },
      { userAgent: 'GPTBot', disallow: '/' },
    ],
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

---

## Step 15: Internal Linking Graph

Internal links distribute PageRank, establish hub/spoke topicality, and feed NavBoost dwell signals. Google's leaked `AnchorsAnchor` attribute weights internal anchor text quality heavily.

### 15a. Hub-and-spoke model

For every major topic, designate one **hub page** (the definitive pillar) and 5 to 15 **spoke pages** (specific sub-topics). Every spoke links UP to the hub. The hub links DOWN to every spoke. Spokes cross-link when semantically relevant.

Example (a marketplace listing tool):

- **Hub:** `/blog/shopee-listing-optimization-guide`
- **Spokes:** `/blog/shopee-title-length`, `/blog/shopee-image-requirements`, `/blog/shopee-keyword-research`, `/blog/shopee-seo-2026`

### 15b. Anchor text rules

- Use descriptive anchors that match the destination page's primary keyword
- No `click here`, `read more`, `learn more`, `this article`
- Vary anchors across inbound links (over-optimization trips `anchorMismatchDemotion`)
- Target 3 to 8 inbound internal links per page; more for hub pages

### 15c. Orphan page audit

An orphan is any page with zero inbound internal links. Orphans crawl slowly, rank poorly, and drop out of AI citation eligibility. The audit script flags every page with inbound count < 2.

### 15d. Link depth (crawl depth from home)

Important pages sit ≤ 3 clicks from the homepage. Pages > 5 clicks deep get crawled rarely. Restructure navigation if key content is buried.

### 15e. Related-posts block (footer of every article)

3 to 5 semantically related posts at the bottom of every article. Extends session depth (`pnav` signal) and creates dense internal cross-linking. Use semantic similarity (tag overlap or vector similarity), not recency.

---

## Step 16: Deterministic Audit-to-Fix Loop

When invoked as `/geo-seo fix <target>`, run the audit, then apply fixes in priority order. Never skip the audit step; never fix out of priority order.

### 16a. Priority queue

| Priority | Category | Why |
|---|---|---|
| **CRITICAL** | Missing canonical, missing `<title>`, missing Organization schema, duplicate titles, 4xx/5xx on key pages | Blocks indexing or confuses entity resolution |
| **HIGH** | `alt=""` on informative images, missing meta description, date mismatch > 7 days, missing H1, H1 duplicates title | Major CTR, accessibility, and freshness hits |
| **MEDIUM** | `sameAs` < 4, FAQ schema missing, description > 160 chars, title > 60 chars, no hreflang on multilingual site | Cumulative small wins |
| **LOW** | `theme-color` missing, missing PWA icons, suboptimal robots directive, sitemap `changefreq` wrong | Polish, not blockers |

### 16b. Fix workflow

1. Run audit: `node <skill-dir>/scripts/audit.mjs --dir app/`
2. Generate report in memory (PRESENT / MISSING / WRONG, grouped by priority)
3. Ask user: "Apply all CRITICAL fixes automatically? (y/n)"
4. Apply fixes one at a time with `file:line` precision, not wholesale rewrites
5. Re-run audit, verify each fix landed
6. Continue with HIGH, then MEDIUM, then LOW
7. Log every fix to `<skill-dir>/logs/fixes.tsv`:

```
2026-04-23T10:15:00Z  example.com  CRITICAL  missing-canonical  app/page.tsx:12  FIXED
```

### 16c. Guardrails

- Never touch pages outside the target directory
- Never rewrite body copy (use `market-seo` or a blog-writer skill for content)
- Never change canonical URLs without confirmation (may break backlinks)
- Always run `npm run build` or `next build` after structural fixes
- If a fix requires external verification (e.g., schema validator), surface `https://validator.schema.org/` and wait

### 16d. Idempotence

Re-running `/geo-seo fix` on a clean site is a no-op. The script checks PRESENT status before touching anything, so the loop runs safely in CI on every commit.

---

## Step 17: LLMs.txt + Per-Page .md.txt Machine-Readable Content Layer

### The Google AI optimization scope distinction

Google says "you don't need LLMs.txt" -- and that is true for **Google Search features only**
(AI Overviews, AI Mode). Standard HTML indexing is sufficient for Google to extract content.

Google separately maintains `https://ai.google.dev/api/llms.txt` for **non-Google AI systems**
(ChatGPT, Claude, Perplexity, Gemini API users). The pattern: `llms.txt` as a site index +
`.md.txt` companion per page at the same URL with the extension appended.

Two distinct optimization targets:
- **Google Search + AI Overviews**: standard HTML, correct schema, good indexing. No LLMs.txt needed.
- **Non-Google AI systems (ChatGPT, Claude, Perplexity)**: LLMs.txt + .md.txt companions help crawlers get clean, structured content without navigating JS-heavy or server-rendered HTML.

**Scope ceiling (Mueller, 2026-06-15): state this to any client before building the layer.**
`llms.txt` is a **navigation and extraction** aid for an agent that has already arrived. It is **not a discovery mechanism**: an LLM cannot use a self-reported file to decide which of two competing sites to surface, because both can assert the same thing. Google's comparison is the meta keywords tag. Discovery still runs on HTML plus internal links.

So the honest value proposition for Step 17 is: *cheaper, cleaner extraction once a crawler is on the page, and fewer garbled quotes in an answer.* It is not a ranking lever, not a citation lever, and any vendor selling it as one is selling a keywords tag. Build it when the site is JS-heavy or the HTML is noisy; skip it when clean server-rendered HTML already extracts well. Agent-navigation standards (WebMCP and successors) had not settled as of mid-2026, so expect this layer's format to change.

### Three-layer architecture

```
Layer 1 (humans)  →  HTML pages         ← unchanged, normal web
Layer 2 (AI index) →  /llms.txt          ← discovery index for AI crawlers
Layer 3 (AI pages) →  /page.md.txt      ← clean Markdown version of each HTML page
```

Each `.md.txt` is the same-path companion to its HTML counterpart:
- HTML:   `https://example.com/faq`
- Clean:  `https://example.com/faq.md.txt`

### 17a. llms.txt structure (llmstxt.org spec)

```markdown
# Brand Name

> One-paragraph description of the site for AI context.

## Pages

- [Page Title](https://example.com/page.md.txt): brief description of that page's content.
- [FAQ](https://example.com/faq.md.txt): frequently asked questions about the product.
- [Pricing](https://example.com/pricing.md.txt): plan tiers and what each includes.

## About

Additional brand context: what the product does, who it is for, key facts for AI citation.
```

**Rules:**
- H1 = site name
- Blockquote = brief site description
- `## Pages` section with markdown links pointing to `.md.txt` files
- One file, kept under 2,000 lines
- Place at: `public/llms.txt` (served at `https://example.com/llms.txt`)

### 17b. Per-page .md.txt companion format

Each companion is the page stripped to clean Markdown: no nav, no footer, no JS, no layout.

```markdown
# Page Title | Brand Name

> One-sentence description of what this page covers.

URL: https://example.com/page

## Section Heading

Body content in plain prose. No HTML. No React JSX. No Tailwind classes.
Keep the same headings and factual content as the HTML page.
Target 200-600 words per companion file.

## Links

- Related page: https://example.com/related
```

**What to include:**
- The actual page content (headings, body, key facts)
- Relevant links at the bottom

**What to exclude:**
- Navigation, header, footer
- CTA buttons (keep the text, strip the markup)
- Classes, attributes, JavaScript
- Cookie banners, popups, sidebars

### 17c. Next.js 15 implementation

**Option A -- Static files (recommended for stable content)**

Place `.md.txt` files in `public/`:
- `public/llms.txt` served at `/llms.txt`
- `public/faq.md.txt` served at `/faq.md.txt`
- `public/check.md.txt` served at `/check.md.txt`

No build step, no route handler, served directly by the CDN. Best for content that does
not change frequently.

**Option B -- Route handlers (for dynamic content)**

```tsx
// app/faq/route.ts  (handles GET /faq with Accept: text/markdown or .md.txt extension)
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const accept = request.headers.get('accept') ?? '';
  const url = request.nextUrl.pathname;

  // Serve .md.txt when explicitly requested
  if (url.endsWith('.md.txt') || accept.includes('text/markdown')) {
    const content = `# FAQ | Example\n\n> Frequently asked questions.\n\n## Is it free?\nYes.\n`;
    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  // Otherwise serve the normal HTML page (fall through to page.tsx)
  return NextResponse.next();
}
```

For the `.md.txt` URL pattern, create a catch-all route handler:

```tsx
// app/[...slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMdTxt } from '@/lib/md-txt';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const path = params.slug.join('/');
  if (!path.endsWith('.md.txt')) return NextResponse.next();

  const page = path.replace(/\.md\.txt$/, '');
  const content = await getMdTxt(page); // implement per-page Markdown lookup
  if (!content) return new NextResponse('Not Found', { status: 404 });

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
```

**Option C -- Vercel Edge Config or static export**

If the site is fully static, generate `.md.txt` files at build time alongside each page using
a custom `next.config.ts` build hook or a `scripts/generate-md-txt.ts` post-build script.

### 17d. What pages need companions

Prioritize pages that answer the questions AI users ask:

| Page | Priority | Why |
|---|---|---|
| Homepage (index) | CRITICAL | First context AI gets about the brand |
| FAQ | CRITICAL | Clean Q&A is exactly what AI engines extract |
| Pricing | HIGH | "How much does X cost?" is a top AI query type |
| About / How It Works | HIGH | Entity and brand context |
| Feature pages | MEDIUM | Specific capability questions |
| Blog posts | LOW | Already good HTML; priority if indexing is blocked |
| Legal (Privacy, Terms) | LOW | Useful for trust signals but rarely cited |

### 17e. Linking llms.txt from the HTML head

Add a `<link>` in `layout.tsx` so AI crawlers that parse HTML can also discover the LLMs.txt:

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  // ... existing metadata
};

// In the <head> via layout return:
<link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
```

Or inline in the metadata object (Next.js 15):

```tsx
export const metadata: Metadata = {
  other: {
    'llms-txt': 'https://example.com/llms.txt',
  },
};
```

### 17f. Audit checklist (added to Quick-Fire Audit)

- [ ] `public/llms.txt` exists and is reachable at `/llms.txt`
- [ ] `llms.txt` has H1 title + blockquote description + `## Pages` section
- [ ] Every page in `## Pages` links to a `.md.txt` companion
- [ ] All linked `.md.txt` files exist and return 200
- [ ] Companion files are clean Markdown (no JSX, no Tailwind classes, no navigation)
- [ ] `robots.txt` allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot) for brand/content sites
- [ ] AI crawlers get a `Crawl-delay` only if server capacity is a concern, not blocked
- [ ] `<link rel="alternate" type="text/plain" href="/llms.txt">` in `<head>`

### 17g. When NOT to create .md.txt files

- Pages with highly dynamic content (real-time prices, live dashboards): serve a static
  description of what the page does rather than trying to reflect live data
- Admin or authenticated pages: exclude from llms.txt entirely
- Duplicate or thin content pages: do not create companions for pages that have no unique
  information; it dilutes the signal

---

<!-- added by skill-radar 2026-08-08 from calm-north/seojuice-skills@recover-content -->
<!-- added by skill-radar 2026-09-02 from aaron-he-zhu/aaron-marketing-skills@geo-content-optimizer -->
## Measuring GEO: citability vs surfacing (do not conflate these)

Every GEO engagement eventually gets asked "did it work". There are two different questions hiding in that, on two different clocks, and reporting one as the other is the most common way a GEO audit loses credibility.

| Signal | What it measures | Clock | Confounded by |
|---|---|---|---|
| **Citability** | Given the page, will an answer engine use it to answer the target query | **Minutes.** Testable immediately after deploy | Almost nothing. It is a property of the content itself |
| **Surfacing** | Does an engine cite you *unprompted* when a real user asks | **Weeks.** Gated by each engine's crawl and index refresh | Competitor changes, index refresh timing, query volume, engine model updates |

The work this skill does (extractable answer blocks, quotable statements, sourced facts, FAQ schema) moves **citability**. Citability is a necessary condition for surfacing, not a sufficient one. Never promise fast surfacing on the back of a citability win, and never report a surfacing delta without a control group, because a week-scale window contains too many other moving parts to attribute.

### Same-day citability test (no API key)

Hand a live-fetch answer engine the URL and ask the target query, then check whether the synthesized answer cites your domain and where the page ranks among the sources it scored. Two keyless routes:

```bash
# Route 1: via Jina Reader, confirm the page is fetchable
# and reads as answer-shaped to a machine before testing whether an engine will use it
/usr/bin/curl -sL "https://r.jina.ai/https://<your-domain>/<page>" | head -60
```

Route 2: run the target query through any live-retrieval surface you have (Exa, or a Perplexity or ChatGPT search session) and record: does the answer cite the URL, at what position among sources, and which passage did it lift. Re-run after each content change for a minutes-scale read.

This result is **Measured** for the surface you actually tested and an **Estimated proxy** for every other engine. ChatGPT, Perplexity, and Google AI Overviews query different indexes with different retrieval, so a win on one is evidence, not proof, for the others. See the retrieval-supply table in Step 14d for which index each surface reads.

### Metric labeling rule (applies to every GEO deliverable)

Label every number in an audit or report as exactly one of:

- **Measured**: came from a tool export, an analytics API, or a test you ran and can re-run
- **User-provided**: the client told you
- **Estimated**: model inference, benchmark extrapolation, or an industry average applied to this client

Never present an Estimated number as Measured. If a required metric is unavailable, mark it **N/A** and say why. Do not fill the gap with a plausible figure. An audit whose estimates are visibly labeled survives a client challenging one number; an audit that silently mixes the two does not survive it at all.

---

## Content Decay: Triage Existing Pages

Publishing is only half the job; existing pages decay. Signals: clicks declining
month-over-month for 3+ months, position slipping off page 1, impressions stable but CTR
dropping (competitors have better titles), or impressions themselves declining. Find them in
Search Console → Performance → Pages, sorted by click change over the last 6 months.

### Composite Decay Score

| Signal | Weight | How to score (0-100) |
|--------|--------|----------------------|
| Traffic decline | 30% | 0 = none, 50 = 20-40% drop, 100 = >60% drop |
| Position drops | 25% | 0 = stable, 50 = lost 3-5 positions, 100 = off page 1 |
| CTR decline | 15% | 0 = stable, 50 = 20% decline, 100 = >40% decline |
| Content freshness | 15% | 0 = updated this quarter, 50 = 6-12 months stale, 100 = >2 years |
| Competitive displacement | 15% | 0 = none, 50 = new entrants on page 1, 100 = displaced from top 3 |

```
Decay = (Traffic × 0.30) + (Position × 0.25) + (CTR × 0.15)
      + (Freshness × 0.15) + (Displacement × 0.15)
```

| Score | Stage | Response |
|-------|-------|----------|
| 0-20 | Healthy | Continue monitoring |
| 21-40 | Early decay | Add to refresh queue (next month) |
| 41-60 | Active decay | Schedule refresh this week |
| 61-80 | Significant decay | Immediate refresh or rewrite decision |
| 81-100 | Terminal decay | Rewrite, redirect, or retire |

Escalate when signals combine: traffic decline + position drop, or traffic decline + CTR
decline, is P1: act within 48 hours. Position drop + competitor displacement is P2, one
week. CTR decline alone or freshness alone is P3.

### Decay Triage Decision Tree

1. **Is the topic still relevant?** No (product discontinued, event passed, tech obsolete)
   → **Retire**: 301 to the closest relevant page or parent category. Yes → 2.
2. **Is another page on the site targeting the same topic?** Yes → **Consolidate**: merge the
   best of both into one, 301 the weaker page. No → 3.
3. **Has search intent shifted?** Check what currently ranks: listicles → long-form,
   blog → product page, text → video, general → specific. Yes → **Rewrite** to match current
   intent, keep the URL. No → 4.
4. **Is the content simply outdated?** (stale stats, old screenshots, deprecated tools, old
   dates in the title, broken external links) Yes → **Refresh**. No → investigate technical
   (lost backlinks, page speed, mobile) or competitive causes.

### Blog Refresh Playbook (3-4 hours)

Update the title with a current year or fresh hook → rewrite the intro with a new angle →
update every statistic with a current source → add 1-2 sections covering gaps competitors
address → update screenshots → refresh the FAQ with current PAA questions → refresh internal
links to recent related content → update the meta description → update `dateModified` in
Article schema at minimum → republish and re-submit to Search Console.

This pairs with the recency benchmark above: 50% of AI citations come from articles under 11
months old, so a refresh cadence is a GEO lever, not just an SEO one.

---

## Quick-Fire Audit Mode (`/geo-seo audit`)

When invoked as `/geo-seo audit`, read the existing head component + page files and output a gap report:

**Schema gaps:**

- [ ] **No double-escaped HTML entities anywhere in a `ld+json` block** (2026-08-20 parser change; check raw page source, not a validator; a double-escaped entity inside `sameAs` / `offers.url` / `url` / `logo` silently drops the value)?
- [ ] Schema serialized via `JSON.stringify()` on an object, not concatenated from HTML-escaped strings?
- [ ] Organization schema present?
- [ ] `sameAs` has 4+ URLs?
- [ ] FAQPage schema present?
- [ ] Article schema on blog posts?
- [ ] BreadcrumbList on inner pages?
- [ ] Article has `about` array with 2+ entity links?
- [ ] Author byline uses `Person` itemscope?

**Meta gaps:**

- [ ] Canonical on every page?
- [ ] `og:url` matches canonical?
- [ ] `og:type: article` on blog posts?
- [ ] `article:published_time` and `article:modified_time` on blog posts?
- [ ] Unique description per page (not sitewide default)?
- [ ] Title tag < 60 chars with primary keyword in first 40?

**Date integrity gaps (new, Google Leak):**

- [ ] URL slug date, JSON-LD `datePublished`, visible byline, `<meta>` tags all agree within 7 days?
- [ ] `dateModified` only updated on substantive content changes (not copyright/widget edits)?
- [ ] Visible update-log on high-value pages?

**Content gaps:**

- [ ] Lead paragraph 40–60 words with direct answer?
- [ ] Sections 120–180 words between headers?
- [ ] Main-content headings are **descriptive** (FAQ block headings can be questions)?
- [ ] At least 15 recognized entities on page?
- [ ] At least one stat cited with source link per section (target 25–40 per piece)?
- [ ] Comparison table with descriptive column headers present?
- [ ] FAQ section visible in body with 40–60 word answers?
- [ ] Expert quote with attribution?
- [ ] Min 300 words substantive content (avoid `vlq` flag)?

**Demotion risk (new, Google Leak):**

- [ ] No "click here" / "read more" internal anchors?
- [ ] No fake urgency / hidden contact / unverifiable testimonials (scamness risk)?
- [ ] Product reviews include original photos + hands-on testing evidence?
- [ ] No auto-generated/spun content (GibberishScore risk)?
- [ ] Keyword density natural (no synonym stuffing)?

**Technical gaps:**

- [ ] Logo uses `loading="eager"` above fold?
- [ ] All other images have `alt` and dimensions?
- [ ] `dateModified` visible in article UI?
- [ ] Blog publishing cadence **8–12+ pieces/month** (Averi high-visibility tier)?
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms?

**LLMs.txt + machine-readable content layer (Step 17):**

- [ ] `public/llms.txt` exists and returns 200 at `/llms.txt`?
- [ ] `llms.txt` has H1 title + blockquote description + `## Pages` section?
- [ ] Every URL in `## Pages` links to a `.md.txt` companion (not the HTML page)?
- [ ] All linked `.md.txt` companion files exist and return 200?
- [ ] Companion `.md.txt` files are clean Markdown (no JSX, no Tailwind, no nav)?
- [ ] `robots.txt` allows AI crawlers for brand/content sites (GPTBot, ClaudeBot, PerplexityBot)?
- [ ] `<link rel="alternate" type="text/plain" href="/llms.txt">` present in `<head>`?

**Earned-media gaps (new, Muck Rack Dec 2025):**

- [ ] Press release pipeline established (targeting AI-cited outlets per platform)?
- [ ] Media list audited against AI-cited bylines (not just pitched journalists)?
- [ ] Reddit / Medium / Quora / YouTube presence for category?
- [ ] Fan-out content covering follow-up questions?

Output as: PRESENT / MISSING / WRONG, with specific file:line for each issue.

---

## Academic & Industry References

Embed these in content where relevant. The first four are the highest-authority anchors for GEO-optimized pages (2025–2026 data).

| Source                    | Citation                                                                        | URL                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Princeton GEO Study       | Aggarwal et al. (2023). "GEO: Generative Engine Optimization." arXiv:2311.09735 | https://arxiv.org/abs/2311.09735                                                                            |
| Muck Rack Generative Pulse | Muck Rack (Dec 2025). "What Is AI Reading? Generative Pulse 2025." 1M+ citations analyzed | https://generativepulse.ai/report/ · https://muckrack.com/blog/more-stats-from-what-is-ai-reading           |
| Averi B2B SaaS Benchmarks | Averi (2026). "ChatGPT vs Perplexity vs Google AI Mode: B2B SaaS Citation Benchmarks" | https://www.averi.ai/how-to/chatgpt-vs.-perplexity-vs.-google-ai-mode-the-b2b-saas-citation-benchmarks-report-(2026) |
| Google Content Warehouse Leak | May 2024 leak of 2,596 internal modules + 14,014 attributes (`siteAuthority`, NavBoost, etc.) | https://github.com/schoberg/google-ranking-signals-plugin                                                   |
| Google AI Optimization Guide | Google (2025). "AI optimization guide"; official guidance on optimizing for Google AI features. Scope: Google Search / AI Overviews only, NOT for non-Google AI systems. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide |
| LLMstxt.org Spec | Ansgar Grunseid et al. (2024). Standard for llms.txt and per-page .md.txt companions for non-Google AI crawler discoverability. | https://llmstxt.org |
| Google E-E-A-T Guidelines | Google Search Quality Rater Guidelines                                          | https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf |
| Schema.org                | Schema.org Vocabulary Reference                                                 | https://schema.org                                                                                          |
| Google Structured Data    | Google Search Central: Structured Data                                         | https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data                  |
| Google Knowledge Panel    | Google: Manage your Knowledge Panel                                            | https://support.google.com/knowledgepanel/answer/9163198                                                    |

---

## One-Shot Page Brief Template

When generating a new page for any project, fill this brief once and hand it to the skill; it captures every input the schema stack, content blocks, and audit checklist need.

```yaml
# ==== Brand inputs (used by Organization / WebSite / SoftwareApplication schema) ====
brand_name: ""
tagline: ""                     # 6–10 words
canonical_url: "https://"       # no trailing slash, pick www or non-www, enforce sitewide
one_sentence_description: ""    # 140–160 chars, used verbatim in schema + og:description
logo_url: ""                    # webp, 7–32 KB, square
founding_year: 20
founder:
  name: ""
  title: ""
  linkedin: ""
same_as:                        # minimum 4, ordered by authority
  - "https://www.linkedin.com/company/SLUG"
  - "https://twitter.com/HANDLE"
  - "https://www.producthunt.com/products/SLUG"
  - "https://www.crunchbase.com/organization/SLUG"

# ==== Page inputs ====
page_type: "homepage | article | pricing | comparison | faq"
page_canonical: "https://"
page_title: ""                  # < 60 chars, primary keyword in first 40
page_meta_description: ""       # 140–160 chars, page-specific (not sitewide default)
page_og_image: "https://"       # 1200x630
publish_date_iso: "2026-04-18"
modified_date_iso: "2026-04-18"
author_name: ""
author_profile_url: ""

# ==== Entities (target ≥ 15) ====
# Wikipedia/Wikidata links preferred; schema.org Thing URLs acceptable
entities:
  - name: ""
    url: ""

# ==== Content blocks (each one maps to a required output) ====
lead_paragraph: ""              # 40–60 words, direct answer to the page's primary question
stat_callout:
  stat: ""                      # one number with unit
  source_name: ""
  source_url: ""                # Tier 1 / DR ≥ 40
comparison_table:
  dimensions: ["", "", "", ""]
  columns: ["", "", ""]
faq:                            # 3–6 pairs, answers 40–60 words
  - q: ""
    a: ""
expert_quote:
  text: ""
  attributed_to: ""
  title: ""
  source_url: ""
cited_sources:                  # 25–40 for long-form, 10–15 for standard pages
  - anchor: ""                  # descriptive anchor text, no "click here"
    url: ""

# ==== Technical ====
core_web_vitals_budget:
  lcp_ms: 2500
  cls: 0.1
  inp_ms: 200
images_above_fold_eager: true   # logo + hero only
images_below_fold_lazy: true

# ==== Earned-media plan (Muck Rack Dec 2025) ====
press_release:
  headline: ""                  # action verb + entity + outcome number
  key_stats: ["", "", "", "", ""]
  target_outlets_by_platform:
    chatgpt: ["Reuters", "The Verge", "The Guardian"]
    claude: ["U.S. News & World Report", "Nature", "Yahoo Finance"]
    gemini: ["Forbes", "Investopedia", "NerdWallet"]
community_seeding:
  reddit_subreddit: ""
  medium_publication: ""
  quora_topic: ""
  youtube_channel: ""
```

Once the brief is filled, the skill produces: full JSON-LD stack → page-level metadata → visible content blocks → audit checklist report. Reject any page that fails canonical, date-integrity, or 300-word minimum checks.

---

## Pressbeat.io Reference Pattern (Audited 2026-04-16)

Full schema stack observed on pressbeat.io:

**Sitewide (every page):** Organization + WebSite + SoftwareApplication (with aggregateRating) + FAQPage + SiteNavigationElement (5 blocks)

**Blog index:** Blog + BreadcrumbList (2-level)

**Article pages:** Article + BreadcrumbList (3-level) + `og:type: article` + `article:published_time/modified_time/author/tag`

**Homepage H2 targeting AI stat:** "27% of ChatGPT Sources Come From Organic Press": stat as headline, not buried in body

**Internal linking:** Inline contextual links with descriptive anchor text (no "click here")

**Known gaps in pressbeat.io (do better than this):**

- No canonical on homepage
- Only 2 `sameAs` entries; needs 2 more
- No per-article FAQPage schema (FAQ in body only; add schema too)
- Logo above fold uses `loading="lazy"`: should be `eager`
- No hreflang despite multilingual claims

---

## Common Issues

### JSON-LD placement

JSON-LD must be inside a `<script type="application/ld+json">` tag placed in the `<head>`. Putting it in the body or passing it as a React prop does nothing. Next.js `generateMetadata()` does **not** auto-add JSON-LD; you must insert it manually as a `<script>` tag in your layout or page component:

```tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({ post }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    // ...
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {/* page content */}
    </>
  );
}
```

### Schema.org type name casing

Type names are case-sensitive. Use the exact PascalCase names from schema.org:

- `"Article"` not `"article"`
- `"BreadcrumbList"` not `"breadcrumblist"`
- `"FAQPage"` not `"faqpage"` or `"FaqPage"`
- `"BlogPosting"` not `"blogposting"`
- `"SoftwareApplication"` not `"softwareapplication"`

### Open Graph image must be absolute

`og:image` must be a fully qualified absolute URL (`https://...`). Relative paths render as blank previews when shared on LinkedIn, Twitter/X, iMessage, and Slack. Use your domain:

```html
<!-- WRONG -->
<meta property="og:image" content="/images/og-cover.png" />

<!-- CORRECT -->
<meta property="og:image" content="https://example.com/images/og-cover.png" />
```

### Twitter/X card tags are not inferred from og: tags

Twitter/X requires its own `name="twitter:*"` meta tags even when `og:` equivalents are present. Both sets must exist:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://..." />
```

### hreflang must be bidirectional

Every language variant of a page must declare `hreflang` links to **all** other variants, including itself. Missing any one direction causes GSC hreflang errors:

```html
<!-- On the English page -->
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="fil" href="https://example.com/fil/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/page" />

<!-- On the Filipino page: must also declare both -->
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="fil" href="https://example.com/fil/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/page" />
```

### GEO: AI citation engines ignore thin pages

Perplexity, ChatGPT, and Claude prefer pages with clear entity declarations, structured data, and first-party citations. Thin content with no schema and under 300 words is routinely ignored. To earn citations: add `Article` or `FAQPage` schema, include named entities (people, organizations, products), cite authoritative sources with descriptive anchor text, and target 120 to 180 words per section.

### GSC crawl delay after schema changes

Google Search Console takes 3 to 7 days to reflect structured data changes after a deploy. Do not assume the schema is broken after one day. Use GSC's URL Inspection tool to request a recrawl and check back after 72 hours minimum.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Structured data not detected in Rich Results Test | JSON-LD in wrong place (body, or passed as a React prop) | Move to `<head>` via a `<script type="application/ld+json">` tag in the Next.js layout or page component |
| Social preview shows no image on LinkedIn/Twitter/iMessage | `og:image` is a relative URL | Use an absolute URL with full domain: `https://example.com/...` |
| AI engines (Perplexity, ChatGPT, Claude) ignore the page | No structured data, thin content, no citations | Add `Article` or `FAQPage` schema, add authoritative citations, increase word count above 300 words minimum |
| hreflang errors in GSC ("Return tag missing") | Missing bidirectional declarations; one language page does not reference all variants | Every language page must declare `hreflang` links to all variants including itself |
| GSC shows 0 impressions after schema change | Normal crawl delay | Wait 3 to 7 days; use GSC URL Inspection to force a recrawl |
| Twitter/X share shows no card image | Missing `twitter:*` meta tags | Add `name="twitter:card"`, `name="twitter:image"` etc. separately from `og:` tags |
| Schema type not recognized by validators | Wrong casing on `@type` | Use exact PascalCase from schema.org: `"Article"`, `"BreadcrumbList"`, `"FAQPage"` |
| `generateMetadata()` in Next.js does not produce JSON-LD | `generateMetadata()` only handles `<head>` meta tags, not script tags | Add JSON-LD as a `<script dangerouslySetInnerHTML>` tag directly in the page or layout JSX |
