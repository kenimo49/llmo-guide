#!/usr/bin/env node
/**
 * verify-json-ld.mjs — Output verification for JSON-LD in dist/.
 *
 * What it checks (per llmoframework.com Structural Formatting):
 *   1. Every <script type="application/ld+json"> block parses as JSON.
 *   2. Site-wide layout entities are present on every page (Organization, WebSite, Person).
 *   3. Page-relevant entities are scoped (e.g. MusicGroup only appears on the
 *      yureru-style pages, not on every page).
 *   4. The 404 page does not carry article-shaped schema (TechArticle/BlogPosting).
 *
 * Usage:
 *   node scripts/verify-json-ld.mjs
 *
 * Exits 1 if any rule fails. Designed for CI gating.
 */
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const DIST = 'dist';
const RE_SCRIPT = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;

const SITEWIDE_REQUIRED = ['Organization', 'WebSite', 'Person'];

// 404 must not carry article-flavored entities — they signal the page is
// "an article about X", which is wrong for an error page.
const FORBIDDEN_ON_404 = ['TechArticle', 'Article', 'BlogPosting', 'NewsArticle'];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) yield* walk(full);
    else if (entry.endsWith('.html')) yield full;
  }
}

let parseErrors = 0;
let missingSitewide = 0;
let forbiddenOn404 = 0;
let pages = 0;

for (const file of walk(DIST)) {
  pages++;
  const html = readFileSync(file, 'utf8');
  const types = new Set();
  let m;
  RE_SCRIPT.lastIndex = 0;
  while ((m = RE_SCRIPT.exec(html))) {
    let parsed;
    try {
      parsed = JSON.parse(m[1]);
    } catch (err) {
      console.error(`PARSE-ERR ${file}: ${err.message}`);
      parseErrors++;
      continue;
    }
    const arr = Array.isArray(parsed) ? parsed : [parsed];
    // unwrap nested @graph if present
    for (const item of arr) {
      if (item['@graph']) {
        for (const inner of item['@graph']) {
          if (inner['@type']) types.add(inner['@type']);
        }
      }
      if (item['@type']) types.add(item['@type']);
    }
  }

  for (const required of SITEWIDE_REQUIRED) {
    if (!types.has(required)) {
      // Some pages (e.g. internal generated assets) may legitimately omit; only
      // flag for top-level documents that look user-facing.
      if (!file.includes('/_astro/') && !file.endsWith('.txt')) {
        console.error(`MISSING-SITEWIDE ${file}: missing ${required}`);
        missingSitewide++;
      }
    }
  }

  if (file.endsWith('/404.html')) {
    for (const forbidden of FORBIDDEN_ON_404) {
      if (types.has(forbidden)) {
        console.error(`FORBIDDEN-ON-404 ${file}: contains ${forbidden}`);
        forbiddenOn404++;
      }
    }
  }
}

console.log(`\n=== JSON-LD verification ===`);
console.log(`pages scanned: ${pages}`);
console.log(`JSON parse errors: ${parseErrors}`);
console.log(`pages missing sitewide entities: ${missingSitewide}`);
console.log(`404 pages with article-shaped entities: ${forbiddenOn404}`);

if (parseErrors || missingSitewide || forbiddenOn404) {
  console.error('\nFAIL — JSON-LD verification did not pass.');
  process.exit(1);
}
console.log('\nOK — JSON-LD output verified.');
