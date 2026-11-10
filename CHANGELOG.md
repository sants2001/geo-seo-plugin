# Changelog

## 2.0.0 (2026-11-10)

### Added

- **Field-Tested Playbook: the Answer Library**, now the first section of the skill, with a `/geo-seo playbook <target>` audit. It is the method behind Vouched (vouched.ph), which filled a 100+ person waitlist with zero social posts, with ChatGPT the #1 answer to "where did you find us". Seven steps: find the thin query space, one page per job, write product truth including the limits, content as data, llms.txt with a boundaries block, the technical floor, and measuring from the first signup.
- **Platform Changelog**: Googlebot's single-pass JSON-LD unescaping (2026-08-20), the August 2026 spam update, Search Console as the first-party GEO read, Google's position that llms.txt does not drive discovery, AI Mode and crawler mechanics, and a benchmark half-life warning.
- **Step 4.5, Content Quality Gates** (Google's Who / How / Why test, information gain, topic clusters).
- **Steps 10 to 17**: metadata audit, alt text system, extended meta tag stack, Google Ads landing-page alignment, sitemap and robots.txt with an AI crawler matrix, internal linking graph, a deterministic audit-to-fix loop, and llms.txt with per-page `.md.txt` companions.
- **Measuring GEO** (citability versus surfacing), **Content Decay** triage, **Common Issues** and **Troubleshooting**.
- `skills/geo-seo/scripts/audit.mjs`, a zero-dependency audit that reports PRESENT / MISSING / WRONG.
- `.claude-plugin/marketplace.json`, so the repo installs with `/plugin marketplace add`.

### Changed

- The Next.js root layout template no longer sets a canonical or `og:url`. Every page inherited them, which pointed every page at the home page. Each page sets its own.
- JSON-LD helpers escape `<` as a Unicode escape before injecting.
- `FAQPage` goes only on pages where the questions are visible.
- `og:locale` in the layout template is a placeholder instead of `en_US`.
- No em dashes left in the skill's prose, headings or templates; the only two left are where the writing-style rule quotes the character.

### Fixed

- `plugin.json` `author` is now an object. The 1.0.0 manifest used a string, which fails `claude plugin validate`.

## 1.0.0 (2026-04-18)

- First release.
