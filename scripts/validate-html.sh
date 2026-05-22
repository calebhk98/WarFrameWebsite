#!/usr/bin/env bash
# validate-html.sh -- Run html-validate against all pages in dist/.
# Only checks a representative sample to keep CI fast:
#   - Top-level pages (index.html, 404.html, etc.)
#   - First page of each collection sub-directory
# Exits non-zero on any validation error.
set -euo pipefail

DIST="${1:-dist}"
ERRORS=0
CHECKED=0

validate_file() {
  local f="$1"
  local rel
  rel=$(realpath --relative-to="$DIST" "$f")
  if ! pnpm exec html-validate --config .htmlvalidate.json "$f" 2>&1; then
    ERRORS=$(( ERRORS + 1 ))
    echo "  ^ in ${rel}" >&2
  else
    CHECKED=$(( CHECKED + 1 ))
  fi
}

# Top-level HTML pages
while IFS= read -r -d '' f; do
  validate_file "$f"
done < <(find "$DIST" -maxdepth 1 -name "*.html" -print0 2>/dev/null)

# First index.html from each immediate subdirectory
while IFS= read -r -d '' d; do
  f="${d}/index.html"
  if [[ -f "$f" ]]; then
    validate_file "$f"
  fi
done < <(find "$DIST" -maxdepth 1 -mindepth 1 -type d -print0 2>/dev/null \
  | grep -zv "/_\|/pagefind")

echo "Validated ${CHECKED} HTML files."

if (( ERRORS > 0 )); then
  echo "HTML validation FAILED with ${ERRORS} file(s) containing errors." >&2
  exit 1
fi

echo "HTML validation PASSED."
