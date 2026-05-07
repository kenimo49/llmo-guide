// Strip the head: section that only contains a legacy @type=Article JSON-LD.
// Keeps head: blocks that contain other schemas (HowTo, FAQPage, etc.) intact.
//
// Run from repo root: node scripts/strip-article-schema.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const files = execSync(
  `grep -lE '"@type":\\s*"Article"' $(find src/content/docs -name "*.md") || true`,
  { shell: '/bin/bash' }
)
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

let changed = 0;
let skipped = 0;

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) {
    skipped++;
    continue;
  }
  const frontmatter = fmMatch[1];
  const body = text.slice(fmMatch[0].length);

  // Look for head: ... block. We only auto-strip when the whole head: block
  // contains exactly one script entry whose content is an @type=Article schema.
  const headMatch = frontmatter.match(/\nhead:\n([\s\S]*?)(?=\n[a-zA-Z]|\n*$)/);
  if (!headMatch) {
    skipped++;
    continue;
  }
  const headBlock = headMatch[1];

  // Count script entries (each starts with "  - tag: script")
  const entryCount = (headBlock.match(/^\s*- tag: /gm) || []).length;
  const hasArticle = /"@type":\s*"Article"/.test(headBlock);
  const hasOther = /"@type":\s*"(HowTo|FAQPage|SoftwareApplication|Product|Book|Event|Course)"/.test(headBlock);

  if (entryCount === 1 && hasArticle && !hasOther) {
    // Remove the whole head: block.
    const newFrontmatter = frontmatter.replace(/\nhead:\n[\s\S]*$/, '');
    const newText = `---\n${newFrontmatter}\n---\n${body}`;
    writeFileSync(file, newText);
    changed++;
    console.log(`stripped: ${file}`);
  } else {
    skipped++;
    console.log(`skipped (mixed schemas or not single-article): ${file}`);
  }
}

console.log(`\nDone. Changed: ${changed}, Skipped: ${skipped}`);
