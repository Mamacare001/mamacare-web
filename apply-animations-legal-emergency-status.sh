#!/usr/bin/env bash
# Applies scroll/fade animations to Privacy, Terms, Emergency, and Status pages.
#
# What this does:
#   - Privacy & Terms: wraps each legal section in a scroll-triggered fade-up (Reveal)
#   - Emergency: fast, non-scroll-gated fade-in for the critical top content (title,
#     lead, Call 912 / Nearest facility buttons), normal scroll-reveal for the
#     below-the-fold signs grid and disclaimer
#   - Status: fast fade-in for the overall status banner, scroll-reveal for the
#     components list, incident history, and footer
#   - Reveal.tsx: extends RevealGroup/RevealItem with an `as` prop so wrapped
#     <ul>/<li> lists keep proper semantics (accessibility fix, not just cosmetic)
#
# Usage:
#   cd /path/to/your/mamacare-web
#   bash apply-animations-legal-emergency-status.sh
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PATCH_FILE="$SCRIPT_DIR/animations-legal-emergency-status.patch"

if [ ! -f "$PATCH_FILE" ]; then
  echo "Error: $PATCH_FILE not found. Keep this script next to the .patch file." >&2
  exit 1
fi

if [ ! -d .git ]; then
  echo "Error: run this from the root of your mamacare-web git checkout." >&2
  exit 1
fi

echo "==> Pulling latest main..."
git pull

echo "==> Checking patch applies cleanly (dry run)..."
if ! git apply --check "$PATCH_FILE"; then
  echo "Error: patch does not apply cleanly against your current tree." >&2
  echo "This usually means these files changed since this patch was made." >&2
  exit 1
fi

echo "==> Applying patch..."
git apply "$PATCH_FILE"

echo "==> Staging changed files..."
git add src/app/emergency/page.tsx \
        src/components/pages/PrivacyContent.tsx \
        src/components/pages/StatusContent.tsx \
        src/components/pages/TermsContent.tsx \
        src/components/pages/EmergencyContent.tsx \
        src/components/ui/Reveal.tsx

echo "==> Committing..."
git commit -m "$(cat <<'EOF'
Add scroll/fade-in animations to Privacy, Terms, Emergency, and Status

Extends the site's existing Reveal/RevealGroup/RevealItem scroll-trigger
system to the four remaining public pages:

- Privacy & Terms: each legal section fades/slides in on scroll.
- Emergency: critical above-the-fold content (title, lead, Call 912 and
  Nearest facility buttons) fades in fast on mount, never gated behind a
  scroll trigger, so it's visible immediately for someone in a hurry. The
  below-the-fold signs grid and disclaimer use the normal scroll-reveal.
- Status: the overall status banner fades in fast on mount for the same
  reason; the components list, incident history, and footer use the
  normal scroll-reveal.

Also extends RevealGroup/RevealItem with an `as` prop ("ul"/"li") so
wrapping list content in these animations no longer downgrades it from
semantic <ul>/<li> to generic <div>s.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_013h1MTU2QKeCJDgdG1v23Px
EOF
)"

echo "==> Pushing to origin/main..."
if ! git push; then
  echo ""
  echo "Push failed. If this is a permissions/auth issue, try:"
  echo "  gh auth switch --user Mamacare001"
  echo "  git push"
  exit 1
fi

echo ""
echo "Done. Deployed changes are live once Vercel finishes building."
