---
name: geo-seo
description: >
  Optimize any website for GEO (Generative Engine Optimization) and SEO.
  Generates JSON-LD schema, Open Graph + Twitter meta tags, Google Knowledge Panel
  setup, press release patterns, and content that earns AI citations across ChatGPT,
  Perplexity, Google AI Mode, Gemini, and Claude. Grounded in the Princeton GEO Study,
  Muck Rack Generative Pulse (Dec 2025), and the Averi B2B SaaS Citation Benchmarks (2026).
user-invocable: true
trigger: /geo-seo
---

# GEO + SEO Optimization Skill

Triggered by `/geo-seo [target]` where target is a page, component, or project directory.

Reference implementation: **pressbeat.io** — audited 2026-04-16, full schema stack documented below.

**Research foundations:**
- **Princeton GEO Study** (Aggarwal et al., arXiv:2311.09735) — citing authoritative sources increases AI citation rate by **+115%**.
- **Muck Rack Generative Pulse — "What Is AI Reading?" (Dec 2025)** — analyzed 1M+ citations across ChatGPT, Gemini, Perplexity, Claude (Jul–Dec 2025). Key findings: 94% of AI citations come from non-paid sources, 82% from earned media, press release citations grew **5x** in 6 months, and only **2% overlap** between journalists PR teams pitch and journalists AI cites.
- **Averi B2B SaaS Citation Benchmarks Report (2026)** — on-page/HTML structure experiments across ChatGPT vs Perplexity vs Google AI Mode. Key findings: proper H1→H2→H3 hierarchy = +40% citation lift, 120–180 word sections = +70% citations, comparison tables with descriptive headers = +47%, descriptive headings beat question-style (4.3 vs 3.4 citations).

---

## TL;DR — The 15 Rules That Matter Most

If you only remember this page, remember these:

1. **94% of AI citations are non-paid, 82% earned media** — invest in PR, not SEO content farms.
2. **Press releases grew 5x as an AI citation source (Jul–Dec 2025)** — write more, ship weekly.
3. **Citation rate peaks within 7 days of publication** — plan distribution for the same week.
4. **50% of AI citations come from articles < 11 months old** — refresh or republish annually.
5. **Schema has a `sameAs` array with ≥ 4 authoritative URLs** — LinkedIn + Twitter + ProductHunt + Crunchbase minimum.
6. **Canonical URL + `og:url` must match exactly on every page** — one www/non-www variant, enforced sitewide.
7. **Title tag < 60 chars with primary keyword in first 40** — `titlematchScore` rewards it.
8. **All four date sources (URL, JSON-LD, byline, meta) must agree within 7 days** — otherwise Google discards freshness entirely.
9. **Headings: descriptive in the body (4.3 citations avg), questions ONLY inside FAQ block (3.4 avg)** — counterintuitive but measured.
10. **Sections of 120–180 words between headings** — `+70%` citation lift vs sections under 50 words.
11. **Lead paragraph 40–60 words with the direct answer up top** — Perplexity extracts from the opener.
12. **Every page has a comparison table with descriptive column headers** — `+47%` on Google AI.
13. **15+ named entities per page** — `4.8x` higher AI selection probability.
14. **25–40 hyperlinked stats per long-form piece, each with source citation** — `+22–30%` visibility per platform.
15. **Publishing cadence: 8–12+ pieces/month** — the threshold for "high AI visibility" (Averi 2026).

**The three things never to do:** fabricate `aggregateRating`, use "click here" internal anchors, publish auto-generated/spun text.

**First-visit workflow for any project:** run `/geo-seo audit` → fix all CRITICAL gaps (schema, canonical, title) → then generate net-new content per the platform template below.

---

## What This Skill Does

1. **Schema** — generates a full JSON-LD stack (Organization, WebSite, SoftwareApplication or Service, FAQPage, BreadcrumbList, Article where applicable)
2. **Metadata** — title, description, Open Graph, Twitter Card, article:\* tags, canonical
3. **Knowledge Panel** — `sameAs` array with 4+ platforms to trigger Google entity disambiguation
4. **Content signals** — inline citations, stat callouts, comparison tables, FAQ sections engineered for AI citation
5. **Technical hygiene** — canonical URL, image alt/size attributes, font preloads, robots meta
6. **Earned-media playbook** — press release structure + journalist-citation alignment (new — Muck Rack Dec 2025)
7. **Community seeding** — Reddit / Medium / Quora / YouTube signals now weighted heavily by AI engines

---

## 2025–2026 Research Benchmarks (use these numbers verbatim)

These are the most recent empirically-validated numbers. When generating pages, quote them with source attribution so the page itself becomes a citable GEO artifact.

### AI citation source mix (Muck Rack, Dec 2025, n=1M+ citations)

| Signal | Stat | Implication |
|---|---|---|
| Non-paid sources | **94%** of AI citations | Paid placements barely move the needle — earn, don't buy |
| Earned media | **82%** | Press coverage is the dominant citation class |
| Journalism share | 20–30% per period | Real reporting outweighs SEO content |
| Press release citation growth | **5x** since Jul 2025 | Press releases are a fast-growing AI signal — ChatGPT + Gemini especially |
| Third-party corporate/blogs | 37% → **24%** (Jul→Dec 2025) | SEO blog spam losing ground |
| Wikipedia reliance | Declining | Still required for entity disambiguation, no longer a growth lever |
| PR-pitch vs AI-citation overlap | **2%** | Traditional media lists are nearly decoupled from AI visibility — rebuild around AI-cited journalists |

### Recency thresholds (Muck Rack, Dec 2025)

- **50%** of AI citations come from articles published within the last **11 months**
- **4%** come from the prior **week** — and citation rate peaks within **7 days** of publication
- **60.5%** of ChatGPT's most-cited pages were published within the last **2 years** (Averi, 2026)
- Visible "last updated" timestamps give up to **+95 position boost** on ChatGPT (Averi, 2026)

### On-page HTML structure (Averi, 2026)

| Tactic | Citation lift |
|---|---|
| Proper H1→H2→H3 hierarchy | **+40%** likelihood of being cited |
| 120–180 word sections between headers | **+70%** vs sections under 50 words |
| Descriptive headings (vs question-style) | 4.3 vs 3.4 avg citations — descriptive WINS |
| Lead paragraph 40–60 words, direct answer | Critical for Perplexity extraction |
| Comparison tables with descriptive headers | **+47%** on Google AI |
| 15+ recognized entities per page | **4.8x** higher selection probability |
| Statistics with proper attribution | **+22–28%** ChatGPT, **+30%** Perplexity |
| 25–40 hyperlinked stats per piece | Correlates with top-decile citation volume |

### Authority signals (Averi, 2026)

- Domains with **32,000+ referring domains** double their citation rate (2.9 → 5.6)
- Domain Trust ≥ **91** correlates with **6+** average citations
- **Brand mentions** correlate more strongly with AI visibility than backlinks (r = 0.664)
- **92.36%** of Google AI Mode citations come from **top-10 ranking** domains — traditional SEO is still the foundation

### Top AI-cited publications (Muck Rack, Dec 2025)

- **Claude** — U.S. News & World Report, Nature, Yahoo Finance
- **ChatGPT** — Reuters, The Verge, The Guardian
- **Gemini** — Forbes, Investopedia, NerdWallet

Use these as the target outlets for earned-media campaigns. Pitching outside this list is low-leverage for AI visibility.

### Publishing cadence (Averi, 2026)

- Low AI visibility: 1–4 pieces/month
- Moderate: 4–8 pieces/month
- **High visibility: 8–12+ pieces/month** — with ~1–2 hours per piece using AI assistance

---

## Step 0 — Gather Context

Before generating anything, read or ask for:

- [ ] **Brand name** and tagline
- [ ] **Type**: SaaS / service / agency / blog / e-commerce / other
- [ ] **Primary URL** (canonical base, www vs non-www)
- [ ] **One-sentence description** (used verbatim in schema `description` fields)
- [ ] **Founder name + LinkedIn URL** (for `founder` Person node)
- [ ] **Social profiles** — LinkedIn company, Twitter/X, ProductHunt, Crunchbase, GitHub (for `sameAs`)
- [ ] **Logo URL** (webp preferred, ~7–32KB)
- [ ] **Pricing** (if applicable — goes into `Offer` node)
- [ ] **Rating/review data** (if applicable — goes into `aggregateRating`)
- [ ] **Blog?** (yes → add Blog + BlogPosting schemas)
- [ ] **Features list** (3–10 bullet points for `featureList`)
- [ ] **FAQ pairs** (3–6 Q&A pairs for `FAQPage`)

If working from a codebase, read the existing `<head>` component and any existing schema before generating.

---

## Step 1 — JSON-LD Schema Stack

### 1a. Sitewide Schema (inject on EVERY page)

Generate all 5 blocks. Inject as `<script type="application/ld+json">` in `<head>`.

#### Block 1 — Organization

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

#### Block 2 — WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{BRAND_NAME}}",
  "alternateName": "{{BRAND_NAME}} — {{TAGLINE}}",
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

#### Block 3 — SoftwareApplication or Service

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

#### Block 4 — FAQPage (sitewide)

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

#### Block 5 — SiteNavigationElement

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

## Step 2 — Meta Tags

### Homepage head template

```html
<!-- Primary -->
<title>{{BRAND_NAME}} — {{TAGLINE}}</title>
<meta name="description" content="{{150_CHAR_DESCRIPTION}}" />
<meta name="author" content="{{BRAND_NAME}}" />
<meta
  name="keywords"
  content="{{KEYWORD_1}}, {{KEYWORD_2}}, {{KEYWORD_3}}, {{KEYWORD_4}}, {{KEYWORD_5}}"
/>
<meta name="robots" content="index, follow" />
<link rel="canonical" href="{{CANONICAL_URL}}" />

<!-- Open Graph -->
<meta property="og:title" content="{{BRAND_NAME}} — {{TAGLINE}}" />
<meta property="og:description" content="{{150_CHAR_DESCRIPTION}}" />
<meta property="og:url" content="{{CANONICAL_URL}}" />
<meta property="og:site_name" content="{{BRAND_NAME}}" />
<meta property="og:locale" content="en_US" />
<meta property="og:image" content="{{OG_IMAGE_URL}}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="{{BRAND_NAME}} — {{TAGLINE}}" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{{BRAND_NAME}} — {{TAGLINE}}" />
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

**Canonical rule:** Every page MUST have a canonical. Homepage canonical must match `og:url` exactly — same www/non-www. Pick one and enforce it sitewide.

---

## Step 3 — Google Knowledge Panel Setup

Google's Knowledge Panel for a brand requires entity disambiguation. The schema signals that drive it:

### Required for Knowledge Panel

1. **`sameAs` with 4+ authoritative profiles** — minimum viable set:
   - `https://www.linkedin.com/company/{{SLUG}}`
   - `https://twitter.com/{{HANDLE}}`
   - `https://www.producthunt.com/products/{{SLUG}}`
   - `https://www.crunchbase.com/organization/{{SLUG}}`

2. **Consistent NAP** (Name, Address/URL, Phone) across all platforms — must match the schema exactly

3. **Wikipedia or Wikidata entry** — strongest signal; create a Wikidata item if the brand doesn't have Wikipedia coverage yet (wikidata.org/wiki/Special:NewItem)

4. **Google Business Profile** — for service businesses; link it from `sameAs`

5. **Press mentions** — AI cites 31% press (per Princeton GEO Study); press mentions establish the entity as real and notable

### Implementation checklist

- [ ] Organization schema has `sameAs` array with 4+ URLs
- [ ] LinkedIn company page exists and name matches schema exactly
- [ ] Twitter/X profile exists and bio matches brand description
- [ ] ProductHunt product page exists
- [ ] Crunchbase org page exists (free to create)
- [ ] Wikidata item created with `instance of: company` and `official website` property set

---

## Step 4 — Content GEO Signals

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

- Princeton GEO Study: `https://arxiv.org/abs/2311.09735` — Aggarwal et al., "GEO: Generative Engine Optimization"
- Google Search Central docs: `https://developers.google.com/search/docs/fundamentals/seo-starter-guide`
- Schema.org vocabulary: `https://schema.org`
- Moz Domain Authority definition: `https://moz.com/learn/seo/domain-authority`

**Pattern:** Cite the source in the anchor text, not as "[1]" footnotes. AI models read anchor text as context.

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

### 4c. Comparison Table (highly citable format)

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

**Answer length:** 40–60 words per answer — this is the extraction sweet spot for Perplexity and ChatGPT. Under 30 words loses context; over 80 words gets truncated.

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
    >— {{EXPERT_NAME}}, {{EXPERT_TITLE}},
    <a href="{{SOURCE_URL}}">{{SOURCE_NAME}}</a></cite
  >
</blockquote>
```

---

## Step 5 — Technical Hygiene Checklist

Run through this for every page generated or audited:

### Images

- [ ] All images have `width` and `height` attributes (prevents CLS)
- [ ] All images have descriptive `alt` text (not empty, not "image")
- [ ] Images below the fold use `loading="lazy"`
- [ ] Logo / hero image above the fold uses `loading="eager"` (NOT lazy — pressbeat.io has this wrong)
- [ ] OG image is 1200×630px

### Performance

- [ ] Web fonts preloaded: `<link rel="preload" href="{{FONT_URL}}" as="font" type="font/woff2" crossorigin>`
- [ ] Critical CSS inlined or render-blocking CSS deferred
- [ ] Third-party scripts loaded with `async` or `defer`

### Canonical + Crawl

- [ ] Every page has `<link rel="canonical" href="{{EXACT_URL}}" />`
- [ ] www and non-www are consistent — pick one and 301 the other
- [ ] `og:url` matches canonical exactly
- [ ] `sitemap.xml` exists and submitted to Google Search Console
- [ ] `robots.txt` exists and does not block `/`

### Recency signals

- [ ] `datePublished` and `dateModified` in Article schema
- [ ] `dateModified` surfaced visibly in article UI (not just schema)
- [ ] Blog posts published at consistent cadence (weekly minimum for freshness signal)

---

## Step 6 — Google Content Warehouse API Leak (2024) — Signal Intelligence

Source: the 2024 Google Content Warehouse API leak exposed 2,596 modules and 14,014 attributes. Combined with the 2025–2026 GEO data above, these attributes tell you **what Google's systems actually read** — so structuring HTML to match pays off in both SEO and GEO (since AI engines scrape what Google indexes).

> **Caveat:** the leak confirms attributes *exist*; exact weights are not confirmed. Treat these as confirmed factors, impact as informed estimates.

### 6a. Title tag — match `titlematchScore`

- Primary keyword in **first 40 characters**
- Brand token at end
- Total **< 60 characters** to avoid SERP truncation

```html
<title>X Core SEO Tactics for [Entity] | [Brand]</title>
```

### 6b. Date reconciliation — avoid `trustSyntacticDateInRanking = false`

Google extracts publish dates from **four** places: URL slug, JSON-LD `datePublished`, visible byline, `<meta>` tags. If any two disagree by **more than 7 days**, the freshness signal is discarded entirely — meaning your recency advantage evaporates.

**Rule:** all four must match. Copyright-year and sidebar edits do NOT reset `lastSignificantUpdate` — only substantive content rewrites.

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

- Place the answer-bearing paragraph in the **first 500px** — reduces pogo-stick bounces (`badClicks`) and lengthens dwell (`lastLongestClicks`)
- NavBoost runs a **13-month rolling window** — new content needs 2–3 months of sustained positive clicks to compete with aged pages
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

Target: **15+ recognized entities per page** (Averi 2026) — page schema + body mentions + backlinks combined.

### 6f. Internal anchor text — descriptive, not generic

- ❌ "click here", "learn more", "read more" — wastes the anchor slot
- ✅ "5 actionable SEO tactics for local rankings" — specific, keyword-rich, topical

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

---

## Step 7 — Press Release Playbook (Muck Rack, Dec 2025)

Press release citations grew **5x** in 6 months (Jul–Dec 2025) — fastest-growing AI citation source. The Dec 2025 study identified exactly what makes a press release get cited.

### 7a. Structural profile of cited press releases

Against non-cited baselines, cited PRs had:

- **2x** more statistics per piece
- **30%** more action verbs
- **2.5x** more bullet points
- **30%** higher rate of objective (fact-based) sentences
- More unique company/product mentions (build a named-entity mesh)

### 7b. Template — AI-optimized press release

```markdown
# {{Brand}} {{Action Verb}} {{Noun}} — {{Specific Outcome Number}}

**{{City, State — Date}}** — {{One-sentence lead with primary stat, entity name, and timeframe.}}

## Key Findings
- **{{Stat 1}}** — {{source / methodology}}
- **{{Stat 2}}** — {{source / methodology}}
- **{{Stat 3}}** — {{source / methodology}}
- **{{Stat 4}}** — {{source / methodology}}
- **{{Stat 5}}** — {{source / methodology}}
- **{{Stat 6}}** — {{source / methodology}}

## Background
{{2–3 objective sentences. No adjectives of self-promotion. Active voice.}}

## Expert Quote
> "{{Quote citing one specific stat, one implication.}}"
> — {{Name}}, {{Title}}, {{Brand}}

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

## Step 8 — Community Platform Signals (Reddit, Medium, Quora, YouTube)

The Dec 2025 Muck Rack data flagged Reddit, Medium, and Quora as **rising AI power players**. They provide signals AI engines weight heavily:

- **Human engagement at scale** — upvotes, comments, shares
- **First-person authentic perspectives** — which AI models prefer over marketing copy
- **High crawlability** — these platforms have zero anti-bot friction
- **Journalist sourcing validation** — reporters source quotes from these platforms, which then get cited

### 8a. Reddit strategy

- Own (or co-own) a subreddit for your category
- Seed founder AMAs with substantive answers (no link-spam)
- Answer "best X" and "X vs Y" threads with data-backed, cited responses that mention your brand name in a neutral/comparative context — not as the only option
- Let natural upvotes validate — never buy/manipulate votes (Reddit's detection + Google's `unauthoritativeScore` both punish it)

### 8b. Medium strategy

- Founder/expert byline publishing technical deep-dives
- Cross-publish blog content to Medium with canonical tag back to site (avoids duplicate-content penalty, still earns Medium's domain authority signal)
- Follow Medium's distribution format: 3–7 min read, 1 main image, code/quote blocks, H2/H3 hierarchy

### 8c. Quora strategy

- One expert answer per category question that you could credibly answer
- Lead with a direct 40–60 word answer (same format as Perplexity-optimized lead paragraphs)
- Cite your own research and link back once per answer

### 8d. YouTube strategy

- Publish the video version of every Tier 1 blog post — YouTube is Google's #2 property, and transcripts get indexed
- Upload SRT captions (not auto-generated) for higher transcript quality
- Include a structured description with timestamps and source links

### 8e. Fan-out content (Generative Pulse Summit, 2025)

Anticipate follow-up questions AI users ask after the primary query. Create "fan-out" content — 5–10 satellite pieces per hub page, each answering one specific follow-up. Seed answers across the 4 platforms above **before competitors** publish. This captures the multi-turn conversation in AI engines.

---

## Step 9 — Next.js 15 App Router Implementation

For Next.js 15 App Router projects:

### `app/layout.tsx` — sitewide metadata via Next.js Metadata API

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "{{BRAND_NAME}} — {{TAGLINE}}",
    template: "%s | {{BRAND_NAME}}",
  },
  description: "{{150_CHAR_DESCRIPTION}}",
  keywords: ["{{KW1}}", "{{KW2}}", "{{KW3}}"],
  authors: [{ name: "{{BRAND_NAME}}", url: "{{CANONICAL_URL}}" }],
  metadataBase: new URL("{{CANONICAL_URL}}"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "{{CANONICAL_URL}}",
    siteName: "{{BRAND_NAME}}",
    title: "{{BRAND_NAME}} — {{TAGLINE}}",
    description: "{{150_CHAR_DESCRIPTION}}",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "{{BRAND_NAME}} — {{TAGLINE}}",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "{{BRAND_NAME}} — {{TAGLINE}}",
    description: "{{150_CHAR_DESCRIPTION}}",
    images: ["/og-image.png"],
    creator: "@{{TWITTER_HANDLE}}",
  },
  robots: { index: true, follow: true },
};
```

### JSON-LD injection in layout — use a `JsonLd` helper component

Create `components/json-ld.tsx`:

```tsx
// Safe JSON-LD injection component — content is static schema, not user input
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Static schema object serialized server-side — not derived from user input
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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

## Quick-Fire Audit Mode (`/geo-seo audit`)

When invoked as `/geo-seo audit`, read the existing head component + page files and output a gap report:

**Schema gaps:**

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

**Date integrity gaps (new — Google Leak):**

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

**Demotion risk (new — Google Leak):**

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

**Earned-media gaps (new — Muck Rack Dec 2025):**

- [ ] Press release pipeline established (targeting AI-cited outlets per platform)?
- [ ] Media list audited against AI-cited bylines (not just pitched journalists)?
- [ ] Reddit / Medium / Quora / YouTube presence for category?
- [ ] Fan-out content covering follow-up questions?

Output as: PRESENT / MISSING / WRONG — with specific file:line for each issue.

---

## Academic & Industry References

Embed these in content where relevant. The first four are the highest-authority anchors for GEO-optimized pages (2025–2026 data).

| Source                    | Citation                                                                        | URL                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Princeton GEO Study       | Aggarwal et al. (2023). "GEO: Generative Engine Optimization." arXiv:2311.09735 | https://arxiv.org/abs/2311.09735                                                                            |
| Muck Rack Generative Pulse | Muck Rack (Dec 2025). "What Is AI Reading? Generative Pulse 2025." 1M+ citations analyzed | https://generativepulse.ai/report/ · https://muckrack.com/blog/more-stats-from-what-is-ai-reading           |
| Averi B2B SaaS Benchmarks | Averi (2026). "ChatGPT vs Perplexity vs Google AI Mode: B2B SaaS Citation Benchmarks" | https://www.averi.ai/how-to/chatgpt-vs.-perplexity-vs.-google-ai-mode-the-b2b-saas-citation-benchmarks-report-(2026) |
| Google Content Warehouse Leak | May 2024 leak of 2,596 internal modules + 14,014 attributes (`siteAuthority`, NavBoost, etc.) | https://github.com/schoberg/google-ranking-signals-plugin                                                   |
| Google E-E-A-T Guidelines | Google Search Quality Rater Guidelines                                          | https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf |
| Schema.org                | Schema.org Vocabulary Reference                                                 | https://schema.org                                                                                          |
| Google Structured Data    | Google Search Central — Structured Data                                         | https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data                  |
| Google Knowledge Panel    | Google — Manage your Knowledge Panel                                            | https://support.google.com/knowledgepanel/answer/9163198                                                    |

---

## One-Shot Page Brief Template

When generating a new page for any project, fill this brief once and hand it to the skill — it captures every input the schema stack, content blocks, and audit checklist need.

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

**Sitewide (every page):** Organization + WebSite + SoftwareApplication (with aggregateRating) + FAQPage + SiteNavigationElement — 5 blocks

**Blog index:** Blog + BreadcrumbList (2-level)

**Article pages:** Article + BreadcrumbList (3-level) + `og:type: article` + `article:published_time/modified_time/author/tag`

**Homepage H2 targeting AI stat:** "27% of ChatGPT Sources Come From Organic Press" — stat as headline, not buried in body

**Internal linking:** Inline contextual links with descriptive anchor text (no "click here")

**Known gaps in pressbeat.io — do better than this:**

- No canonical on homepage
- Only 2 `sameAs` entries — needs 2 more
- No per-article FAQPage schema (FAQ in body only — add schema too)
- Logo above fold uses `loading="lazy"` — should be `eager`
- No hreflang despite multilingual claims
