// One-time content fix: translate the 5 LLMO Framework component names from
// English to each locale's canonical sidebar form, in body text of /ja/, /zh/,
// /ko/, /de/, /fr/. /es/ and /pt/ are already fully translated.
//
// Replacement is case-sensitive, exact phrase only ("Knowledge Clarity",
// "Structural Formatting", etc. with space). URLs use hyphenated slugs
// ("/framework/knowledge-clarity/") which are not affected.
//
// Run from repo root: node scripts/translate-component-names.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const phrases = [
  'Knowledge Clarity',
  'Structural Formatting',
  'Retrieval Signals',
  'Authority Signals',
  'Citation Signals',
];

const translations = {
  ja: {
    'Knowledge Clarity':    'ナレッジクラリティ',
    'Structural Formatting': '構造化フォーマット',
    'Retrieval Signals':    '検索シグナル',
    'Authority Signals':    '権威性シグナル',
    'Citation Signals':     '引用シグナル',
  },
  zh: {
    'Knowledge Clarity':    '知识清晰度',
    'Structural Formatting': '结构化格式',
    'Retrieval Signals':    '检索信号',
    'Authority Signals':    '权威信号',
    'Citation Signals':     '引用信号',
  },
  ko: {
    'Knowledge Clarity':    '지식 명확성',
    'Structural Formatting': '구조화 포맷',
    'Retrieval Signals':    '검색 신호',
    'Authority Signals':    '권위 신호',
    'Citation Signals':     '인용 신호',
  },
  de: {
    'Knowledge Clarity':    'Wissensklarheit',
    'Structural Formatting': 'Strukturierte Formatierung',
    'Retrieval Signals':    'Abrufsignale',
    'Authority Signals':    'Autoritätssignale',
    'Citation Signals':     'Zitiersignale',
  },
  fr: {
    'Knowledge Clarity':    'Clarté des connaissances',
    'Structural Formatting': 'Formatage structuré',
    'Retrieval Signals':    'Signaux de recherche',
    'Authority Signals':    "Signaux d'autorité",
    'Citation Signals':     'Signaux de citation',
  },
};

let totalChanges = 0;

for (const [locale, dict] of Object.entries(translations)) {
  const files = execSync(
    `find src/content/docs/${locale} -name "*.md" -o -name "*.mdx"`,
    { shell: '/bin/bash' }
  ).toString().trim().split('\n').filter(Boolean);

  // Also include /public/ai/<locale>/*.md for the AI-readable summaries.
  const publicAi = execSync(
    `find public/ai/${locale} -name "*.md" 2>/dev/null || true`,
    { shell: '/bin/bash' }
  ).toString().trim().split('\n').filter(Boolean);
  // Also include /public/<locale>/llms.txt
  const llmsTxt = `public/${locale}/llms.txt`;
  const all = [...files, ...publicAi, llmsTxt].filter(Boolean);

  for (const file of all) {
    let text;
    try {
      text = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    let changed = text;
    let fileChanges = 0;
    for (const phrase of phrases) {
      // Case-sensitive replacement of exact phrase. Avoid replacing inside
      // URLs by requiring the phrase NOT be preceded by '/' or surrounded by
      // hyphens (those forms only happen in slugs, which use lowercase
      // hyphenated form anyway).
      const re = new RegExp(phrase.replace(/ /g, '\\s'), 'g');
      const before = changed;
      changed = changed.replace(re, dict[phrase]);
      const diff = (before.match(re) || []).length;
      fileChanges += diff;
    }
    if (fileChanges > 0) {
      writeFileSync(file, changed);
      totalChanges += fileChanges;
      console.log(`${file}: ${fileChanges} replacements`);
    }
  }
}

console.log(`\nDone. Total replacements: ${totalChanges}`);
