// One-time backfill: add pubDate to each Markdown file's frontmatter using
// the first-commit ISO date from git. Run after major rewrites; idempotent —
// existing pubDate values are left alone.
//
// Run from repo root: node scripts/backfill-pubdate.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const files = execSync(
  `find src/content/docs -name "*.md" -o -name "*.mdx"`,
  { shell: '/bin/bash' }
)
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

let added = 0;
let skipped = 0;
let nogit = 0;

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) {
    skipped++;
    continue;
  }
  const frontmatter = fmMatch[1];
  if (/^pubDate:/m.test(frontmatter)) {
    skipped++;
    continue;
  }

  // First-commit date (author date, ISO 8601). Empty if file is not yet tracked.
  let firstCommit;
  try {
    firstCommit = execSync(
      `git log --diff-filter=A --follow --reverse --format=%aI -- '${file}' | head -1`,
      { shell: '/bin/bash' }
    ).toString().trim();
  } catch {
    firstCommit = '';
  }

  if (!firstCommit) {
    // Fall back to most-recent commit (covers files that exist only as
    // amended commits or follow renames poorly)
    try {
      firstCommit = execSync(
        `git log --reverse --format=%aI -- '${file}' | head -1`,
        { shell: '/bin/bash' }
      ).toString().trim();
    } catch {
      firstCommit = '';
    }
  }

  if (!firstCommit) {
    nogit++;
    console.log(`no git history: ${file}`);
    continue;
  }

  const date = firstCommit.slice(0, 10); // YYYY-MM-DD

  // Insert pubDate as the last frontmatter line before any `head:` block.
  // If `head:` exists, insert before it; otherwise append at end of frontmatter.
  let newFrontmatter;
  if (/^head:\s*$/m.test(frontmatter)) {
    newFrontmatter = frontmatter.replace(/^(head:\s*)$/m, `pubDate: ${date}\n$1`);
  } else {
    newFrontmatter = frontmatter + `\npubDate: ${date}`;
  }

  const newText = `---\n${newFrontmatter}\n---\n${text.slice(fmMatch[0].length)}`;
  writeFileSync(file, newText);
  added++;
  console.log(`added pubDate: ${date} -> ${file}`);
}

console.log(`\nDone. Added: ${added}, Skipped: ${skipped} (already had pubDate or no frontmatter), No git history: ${nogit}`);
