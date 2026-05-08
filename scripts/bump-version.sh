#!/usr/bin/env bash
# bump-version.sh — bump the framework version, update changelog, tag git.
#
# Usage:
#   scripts/bump-version.sh <major|minor|patch> "Headline summary"
#
# What it does (in order, transactionally):
#   1. Reads current version from package.json
#   2. Computes the new version per the bump type
#   3. Updates package.json
#   4. Updates src/data/version.ts (VERSION constant + RELEASES head entry)
#   5. Prepends a CHANGELOG.md entry (template; you fill in details)
#   6. Asks you to edit CHANGELOG.md, then commits, then tags.
#
# Versioning policy:
#   MAJOR — breaking framework change (component renamed/removed, scoring change)
#   MINOR — new framework component, new guide article, new case study
#   PATCH — substantive section added to an existing article
#   Design tweaks / typos / translation backfills do NOT bump.

set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "usage: $0 <major|minor|patch> \"Headline summary\"" >&2
  exit 2
fi

BUMP_TYPE="$1"
SUMMARY="$2"

case "$BUMP_TYPE" in
  major|minor|patch) ;;
  *)
    echo "error: bump type must be one of: major, minor, patch" >&2
    exit 2
    ;;
esac

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

CURRENT="$(node -p "require('./package.json').version")"
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT"

case "$BUMP_TYPE" in
  major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
  minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
  patch) PATCH=$((PATCH + 1)) ;;
esac
NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"
TODAY="$(date -u +%Y-%m-%d)"

echo "Bumping $CURRENT -> $NEW_VERSION ($BUMP_TYPE) — $SUMMARY"

# 1. package.json
node --input-type=module -e "
import { readFileSync, writeFileSync } from 'fs';
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
pkg.version = '${NEW_VERSION}';
writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# 2. src/data/version.ts
VERSION_FILE="src/data/version.ts"
if [[ -f "$VERSION_FILE" ]]; then
  # replace VERSION constant
  perl -i -pe "s/^export const VERSION = '[^']+';/export const VERSION = '${NEW_VERSION}';/" "$VERSION_FILE"
  # prepend a new RELEASES entry (template; user fills highlights)
  python3 - <<PYEOF
import re, pathlib
p = pathlib.Path("${VERSION_FILE}")
src = p.read_text()
entry = """  {
    version: '${NEW_VERSION}',
    date: '${TODAY}',
    summary:
      '${SUMMARY}',
    highlights: [
      // TODO: fill in 1-line highlights
    ],
  },
"""
src = re.sub(r'(export const RELEASES = \\[\n)', r'\\1' + entry, src, count=1)
p.write_text(src)
PYEOF
fi

# 3. CHANGELOG.md — prepend new section
CHANGELOG="CHANGELOG.md"
if [[ -f "$CHANGELOG" ]]; then
  python3 - <<PYEOF
import re, pathlib
p = pathlib.Path("${CHANGELOG}")
src = p.read_text()
new_section = """## [${NEW_VERSION}] — ${TODAY}

### Headline

${SUMMARY}

### Added / Changed / Re-scored

- TODO: fill in details before tagging.

"""
# Insert after the policy paragraph (find first '## [')
src = re.sub(r'(\n## \\[)', '\n' + new_section + r'\\1', src, count=1)
p.write_text(src)
PYEOF
fi

cat <<EOF

✓ package.json    -> ${NEW_VERSION}
✓ version.ts      -> updated (highlights TODO)
✓ CHANGELOG.md    -> new section prepended (details TODO)

Next steps:
  1. Edit CHANGELOG.md and src/data/version.ts to fill in TODOs.
  2. Add and commit:
       git add package.json CHANGELOG.md src/data/version.ts
       git commit -m "chore(release): v${NEW_VERSION} — ${SUMMARY}"
  3. Tag:
       git tag -a v${NEW_VERSION} -m "v${NEW_VERSION} — ${SUMMARY}"
       git push origin main --follow-tags

EOF
