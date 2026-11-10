#!/usr/bin/env node
// GEO-SEO audit script
// Usage:
//   node audit.mjs --url https://example.com
//   node audit.mjs --file app/page.tsx
//   node audit.mjs --dir app/
//
// Exits 1 if any CRITICAL finding, 0 otherwise. Zero deps by default;
// uses cheerio when available for better HTML parsing.

import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const args = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      out[a.slice(2)] = argv[i + 1];
      i++;
    }
  }
  return out;
}

let cheerio = null;
try {
  cheerio = (await import('cheerio')).default ?? (await import('cheerio'));
} catch {
  // fallback to regex
}

const findings = [];
const titlesSeen = new Map();
const descsSeen = new Map();

function report(priority, category, detail, location) {
  findings.push({ priority, category, detail, location });
}

function measurePixelWidth(text) {
  if (!text) return 0;
  let units = 0;
  for (const c of text) {
    if ('ilft1.,:;|'.includes(c)) units += 0.5;
    else if ('WMmw'.includes(c)) units += 1.5;
    else units += 1;
  }
  return Math.round(units * 8);
}

function attr(html, name) {
  const re = new RegExp(`\\b${name}=["']([^"']*)["']`, 'i');
  return html.match(re)?.[1];
}

async function auditHTML(html, location) {
  const $ = cheerio && typeof cheerio.load === 'function' ? cheerio.load(html) : null;

  const title = $
    ? $('title').first().text().trim()
    : (html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '').trim();

  if (!title) {
    report('CRITICAL', 'missing-title', '<title> tag missing', location);
  } else {
    if (title.length > 70) report('MEDIUM', 'title-too-long', `${title.length} chars`, location);
    else if (title.length < 30) report('LOW', 'title-too-short', `${title.length} chars, weak for CTR`, location);
    const px = measurePixelWidth(title);
    if (px > 600) report('MEDIUM', 'title-pixel-truncation', `${px}px exceeds 600px SERP cap`, location);
    const prev = titlesSeen.get(title);
    if (prev) report('HIGH', 'duplicate-title', `also in ${prev}`, location);
    else titlesSeen.set(title, location);
  }

  const desc = $
    ? $('meta[name="description"]').attr('content')
    : attr(html.match(/<meta\s+name=["']description["'][^>]*>/i)?.[0] ?? '', 'content');

  if (!desc) {
    report('HIGH', 'missing-description', 'meta description missing', location);
  } else {
    if (desc.length > 170) report('MEDIUM', 'description-too-long', `${desc.length} chars`, location);
    else if (desc.length < 100) report('LOW', 'description-too-short', `${desc.length} chars`, location);
    const prev = descsSeen.get(desc);
    if (prev) report('HIGH', 'duplicate-description', `also in ${prev}`, location);
    else descsSeen.set(desc, location);
  }

  const canonical = $
    ? $('link[rel="canonical"]').attr('href')
    : attr(html.match(/<link\s+rel=["']canonical["'][^>]*>/i)?.[0] ?? '', 'href');
  if (!canonical) report('CRITICAL', 'missing-canonical', 'link rel=canonical missing', location);

  const ogTitle = $
    ? $('meta[property="og:title"]').attr('content')
    : attr(html.match(/<meta\s+property=["']og:title["'][^>]*>/i)?.[0] ?? '', 'content');
  if (!ogTitle) report('MEDIUM', 'missing-og-title', 'og:title missing', location);

  const ogImage = $
    ? $('meta[property="og:image"]').attr('content')
    : attr(html.match(/<meta\s+property=["']og:image["'][^>]*>/i)?.[0] ?? '', 'content');
  if (!ogImage) report('HIGH', 'missing-og-image', 'og:image missing, will break social shares', location);

  const ogUrl = $
    ? $('meta[property="og:url"]').attr('content')
    : attr(html.match(/<meta\s+property=["']og:url["'][^>]*>/i)?.[0] ?? '', 'content');
  if (canonical && ogUrl && canonical !== ogUrl) {
    report('HIGH', 'og-canonical-mismatch', `canonical=${canonical} og:url=${ogUrl}`, location);
  }

  const twCard = $
    ? $('meta[name="twitter:card"]').attr('content')
    : attr(html.match(/<meta\s+name=["']twitter:card["'][^>]*>/i)?.[0] ?? '', 'content');
  if (!twCard) report('LOW', 'missing-twitter-card', 'twitter:card missing', location);

  let jsonLdCount;
  if ($) jsonLdCount = $('script[type="application/ld+json"]').length;
  else jsonLdCount = (html.match(/<script[^>]*application\/ld\+json[^>]*>/gi) ?? []).length;
  if (jsonLdCount === 0) {
    report('CRITICAL', 'missing-json-ld', 'No JSON-LD schema blocks found', location);
  } else if (jsonLdCount < 3) {
    report('MEDIUM', 'sparse-json-ld', `Only ${jsonLdCount} schema block(s); target 3+ (Org + WebSite + FAQPage minimum)`, location);
  }

  // Double-escaped HTML entities inside JSON-LD.
  // Googlebot applies ONE pass of HTML unescaping as of 2026-08-20, so `&amp;amp;`
  // and `&amp;#10004;` no longer unroll. Inside a URL this silently drops the value.
  // Fix: JSON.stringify() a real object, or use Unicode escapes (&).
  const ldBlocks = $
    ? $('script[type="application/ld+json"]').toArray().map((el) => $(el).html() ?? '')
    : (html.match(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi) ?? [])
        .map((b) => b.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, ''));
  const DOUBLE_ESCAPED = /&amp;(?:amp|lt|gt|quot|apos|nbsp|#x?[0-9a-f]+);/gi;
  for (const block of ldBlocks) {
    const hits = [...new Set(block.match(DOUBLE_ESCAPED) ?? [])];
    if (!hits.length) continue;
    // Inside a URL the value stops matching the real URL and the link drops out.
    const inUrl = new RegExp(`"(?:url|logo|image|@id)"\\s*:\\s*"[^"]*${DOUBLE_ESCAPED.source}`, 'i').test(block)
      || /"sameAs"\s*:\s*\[[^\]]*&amp;(?:amp|#x?[0-9a-f]+);/i.test(block);
    report(
      inUrl ? 'CRITICAL' : 'HIGH',
      'json-ld-double-escaped',
      `${hits.length} double-escaped entity type(s) in JSON-LD (${hits.slice(0, 3).join(', ')})${inUrl ? ' — inside a URL field, value will not resolve' : ''}; Googlebot stopped unrolling these 2026-08-20. Use JSON.stringify() or \\u escapes.`,
      location,
    );
  }

  // Images
  const imgTags = $
    ? $('img').toArray().map((el) => $.html(el))
    : (html.match(/<img\b[^>]*>/gi) ?? []);
  for (const img of imgTags) {
    const alt = attr(img, 'alt');
    const src = attr(img, 'src') ?? '';
    if (alt === undefined) {
      report('CRITICAL', 'missing-alt', `img src="${src}" has no alt attribute`, location);
    } else if (alt && (/\.(jpg|jpeg|png|webp|gif)$/i.test(alt) || /^(IMG_|DSC_|Screenshot)/i.test(alt))) {
      report('HIGH', 'filename-as-alt', `alt="${alt}" is the filename`, location);
    } else if (alt && /^(image|picture|photo)\s+of\b/i.test(alt)) {
      report('MEDIUM', 'alt-redundancy', `alt starts with "${alt.split(' ').slice(0, 2).join(' ')}..."`, location);
    } else if (alt && alt.length > 125) {
      report('MEDIUM', 'alt-too-long', `${alt.length} chars exceeds 125 cap`, location);
    }
    if (!/\bwidth=/i.test(img) || !/\bheight=/i.test(img)) {
      report('LOW', 'img-missing-dimensions', `img src="${src}" missing width or height (CLS risk)`, location);
    }
  }

  // H1
  const h1Count = $ ? $('h1').length : ((html.match(/<h1\b/gi) ?? []).length);
  if (h1Count === 0) report('HIGH', 'missing-h1', 'No H1 on page', location);
  else if (h1Count > 1) report('MEDIUM', 'multiple-h1', `${h1Count} H1 tags; use only 1`, location);

  // Robots
  const robots = $
    ? $('meta[name="robots"]').attr('content')
    : attr(html.match(/<meta\s+name=["']robots["'][^>]*>/i)?.[0] ?? '', 'content');
  if (robots && /noindex/i.test(robots)) {
    report('CRITICAL', 'noindex-detected', `robots="${robots}" blocks indexing`, location);
  }

  // hreflang
  const hreflangs = $
    ? $('link[rel="alternate"][hreflang]').length
    : ((html.match(/hreflang=["'][^"']*/gi) ?? []).length);
  const hasXDefault = $
    ? $('link[rel="alternate"][hreflang="x-default"]').length > 0
    : /hreflang=["']x-default["']/i.test(html);
  if (hreflangs > 0 && !hasXDefault) {
    report('MEDIUM', 'hreflang-no-xdefault', 'hreflang set but x-default missing', location);
  }

  // Click-here anchors
  const clickHereMatches = html.match(/>\s*(click here|read more|learn more)\s*</gi);
  if (clickHereMatches && clickHereMatches.length > 0) {
    report('MEDIUM', 'generic-anchor-text', `${clickHereMatches.length} generic anchor(s) ("click here" etc.)`, location);
  }

  // theme-color
  const themeColor = $ ? $('meta[name="theme-color"]').length > 0 : /meta\s+name=["']theme-color["']/i.test(html);
  if (!themeColor) report('LOW', 'missing-theme-color', 'theme-color meta missing', location);
}

async function auditUrl(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'geo-seo-audit/1.0' } });
  if (!res.ok) {
    report('CRITICAL', 'http-error', `${res.status} ${res.statusText}`, url);
    return;
  }
  const html = await res.text();
  await auditHTML(html, url);
}

async function auditFile(path) {
  const html = await readFile(path, 'utf8');
  await auditHTML(html, path);
}

async function auditDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules') {
      await auditDir(p);
    } else if (e.isFile() && /\.(html|htm|tsx|jsx)$/.test(e.name)) {
      await auditFile(p);
    }
  }
}

function printReport() {
  const groups = { CRITICAL: [], HIGH: [], MEDIUM: [], LOW: [] };
  for (const f of findings) groups[f.priority]?.push(f);
  const icons = { CRITICAL: '[X]', HIGH: '[!]', MEDIUM: '[-]', LOW: '[.]' };
  for (const prio of ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']) {
    if (!groups[prio].length) continue;
    console.log(`\n${prio} (${groups[prio].length})`);
    for (const f of groups[prio]) {
      console.log(`  ${icons[prio]} ${f.category.padEnd(28)} ${f.detail}`);
      console.log(`      at ${f.location}`);
    }
  }
  if (!findings.length) {
    console.log('\nNo issues found. Site passes GEO-SEO baseline audit.');
  } else {
    const total = findings.length;
    const crit = groups.CRITICAL.length;
    const high = groups.HIGH.length;
    console.log(`\nTotal: ${total} issues (${crit} critical, ${high} high).`);
  }
}

if (args.url) await auditUrl(args.url);
else if (args.file) await auditFile(args.file);
else if (args.dir) await auditDir(args.dir);
else {
  console.log('Usage: audit.mjs --url <url> | --file <path> | --dir <path>');
  process.exit(1);
}

printReport();
process.exit(findings.some((f) => f.priority === 'CRITICAL') ? 1 : 0);
