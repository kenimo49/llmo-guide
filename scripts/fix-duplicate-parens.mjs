// Cleanup pass after translate-component-names.mjs.
//
// The original /public/ai/<lang>/framework.md and friends had patterns like
// "## 1. Wissensklarheit (Knowledge Clarity)" — a translation followed by
// the EN proper noun in parens. The translation script turned those into
// "## 1. Wissensklarheit (Wissensklarheit)" duplicates.
//
// This script collapses any "<phrase> (<phrase>)" or "<phrase>（<phrase>）"
// pattern down to "<phrase>" where the parenthetical exactly matches the
// preceding word/phrase. Conservative: requires exact case match.
//
// Run from repo root: node scripts/fix-duplicate-parens.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const files = execSync(
  `find src/content/docs public/ai -type f \\( -name "*.md" -o -name "*.mdx" \\)`,
  { shell: '/bin/bash' }
).toString().trim().split('\n').filter(Boolean);

const phrases = {
  // Component names per locale that may have produced duplicates.
  ja: ['ナレッジクラリティ', '構造化フォーマット', '検索シグナル', '権威性シグナル', '引用シグナル'],
  zh: ['知识清晰度', '结构化格式', '检索信号', '权威信号', '引用信号'],
  ko: ['지식 명확성', '구조화 포맷', '검색 신호', '권위 신호', '인용 신호'],
  de: ['Wissensklarheit', 'Strukturierte Formatierung', 'Abrufsignale', 'Autoritätssignale', 'Zitiersignale'],
  fr: ['Clarté des connaissances', 'Formatage structuré', 'Signaux de recherche', "Signaux d'autorité", 'Signaux de citation'],
};

let totalFixes = 0;

for (const file of files) {
  const text = readFileSync(file, 'utf8');

  // Only process files under a known locale tree.
  let phraseList = [];
  for (const [loc, list] of Object.entries(phrases)) {
    if (file.includes(`/${loc}/`)) {
      phraseList = list;
      break;
    }
  }
  if (phraseList.length === 0) continue;

  let changed = text;
  let fileFixes = 0;
  for (const p of phraseList) {
    const escaped = p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match both ASCII parens "(X)" and CJK full-width parens "（X）"
    const reAscii = new RegExp(`(${escaped})\\s*\\(${escaped}\\)`, 'g');
    const reCjk = new RegExp(`(${escaped})\\s*（${escaped}）`, 'g');
    const before = changed;
    changed = changed.replace(reAscii, '$1').replace(reCjk, '$1');
    const fixes = (before.match(reAscii) || []).length + (before.match(reCjk) || []).length;
    fileFixes += fixes;
  }
  if (fileFixes > 0) {
    writeFileSync(file, changed);
    totalFixes += fileFixes;
    console.log(`${file}: collapsed ${fileFixes} duplicate parens`);
  }
}

console.log(`\nDone. Total fixes: ${totalFixes}`);
