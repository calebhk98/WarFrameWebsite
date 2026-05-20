#!/usr/bin/env bash
# check-bundle-size.sh -- Asserts dist bundle stays within budget.
# Budgets (all sizes are gzip-compressed wire size):
#   total dist/_astro/*.js compressed < 500 KB
#   each individual JS file compressed < 100 KB
#   each HTML page compressed < 200 KB
set -euo pipefail

DIST="${1:-dist}"
ERRORS=0

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
compressed_size() {
  gzip --stdout "$1" | wc -c
}

kb() {
  echo "$(( $1 / 1024 )) KB"
}

fail() {
  echo "FAIL: $1" >&2
  ERRORS=$(( ERRORS + 1 ))
}

# ---------------------------------------------------------------------------
# 1. Individual JS files compressed < 100 KB
# ---------------------------------------------------------------------------
while IFS= read -r -d '' f; do
  sz=$(compressed_size "$f")
  if (( sz > 102400 )); then
    fail "$(basename "$f") is $(kb "$sz") compressed (limit 100 KB)"
  fi
done < <(find "$DIST/_astro" -name "*.js" -print0 2>/dev/null)

while IFS= read -r -d '' f; do
  sz=$(compressed_size "$f")
  if (( sz > 102400 )); then
    fail "$(basename "$f") is $(kb "$sz") compressed (limit 100 KB)"
  fi
done < <(find "$DIST" -maxdepth 1 -name "*.js" -print0 2>/dev/null)

# ---------------------------------------------------------------------------
# 2. Total dist/_astro/*.js compressed < 500 KB
# ---------------------------------------------------------------------------
ASTRO_JS=0
while IFS= read -r -d '' f; do
  sz=$(compressed_size "$f")
  ASTRO_JS=$(( ASTRO_JS + sz ))
done < <(find "$DIST/_astro" -name "*.js" -print0 2>/dev/null)

if (( ASTRO_JS > 512000 )); then
  fail "Total dist/_astro/*.js is $(kb "$ASTRO_JS") compressed (limit 500 KB)"
else
  echo "OK: Total _astro JS = $(kb "$ASTRO_JS") compressed"
fi

# ---------------------------------------------------------------------------
# 3. Individual HTML pages compressed < 200 KB
# ---------------------------------------------------------------------------
HTML_OVER=0
while IFS= read -r -d '' f; do
  sz=$(compressed_size "$f")
  if (( sz > 204800 )); then
    HTML_OVER=$(( HTML_OVER + 1 ))
    rel=$(realpath --relative-to="$DIST" "$f")
    fail "${rel} is $(kb "$sz") compressed (limit 200 KB)"
  fi
done < <(find "$DIST" -name "*.html" -print0 2>/dev/null)

if (( HTML_OVER == 0 )); then
  COUNT=$(find "$DIST" -name "*.html" | wc -l)
  echo "OK: All ${COUNT} HTML files under 200 KB compressed"
fi

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
if (( ERRORS > 0 )); then
  echo "Bundle size check FAILED with ${ERRORS} error(s)." >&2
  exit 1
fi

echo "Bundle size check PASSED."
