#!/usr/bin/env bash
set -euo pipefail

# Fixes two responsive bugs:
#  1. (Critical) The nav bar broke - wrapping, overlapping text - on every
#     iPad in portrait mode (768-950px wide), because it switched from the
#     mobile hamburger to the full desktop layout too early.
#  2. Ultrawide monitors (1920px+) showed the site as a small column
#     floating in a lot of empty dark space. Widened the content container
#     at large breakpoints and let the Hero image/text grow with it.
#
# Touches ONLY:
#   src/app/globals.css
#   src/components/home/Hero.tsx
#   src/components/site/Nav.tsx
#
# Run this from the ROOT of your mamacare-web repo checkout
# (the folder that contains package.json, src/, etc).

PATCH_FILE="fix-tablet-ultrawide-responsive.patch"

if [ ! -f "package.json" ]; then
  echo "ERROR: run this script from the root of your mamacare-web checkout (no package.json found here)."
  exit 1
fi

if [ ! -f "$PATCH_FILE" ]; then
  echo "ERROR: $PATCH_FILE not found next to this script. Put both files in the same folder and run from there."
  exit 1
fi

echo "Checking for uncommitted changes to tracked files..."
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "ERROR: you have uncommitted changes to tracked files. Commit or stash them first, then re-run this script."
  git status --short
  exit 1
fi

echo ""
echo "Pulling latest main..."
git checkout main
git pull

echo ""
echo "Checking that the patch applies cleanly..."
if ! git apply --check "$PATCH_FILE"; then
  echo ""
  echo "ERROR: the patch does not apply cleanly against your current checkout."
  echo "Make sure you're up to date (git pull) and haven't hand-edited"
  echo "src/app/globals.css, src/components/home/Hero.tsx, or src/components/site/Nav.tsx."
  exit 1
fi

echo "Patch check passed. Applying..."
git apply "$PATCH_FILE"

echo ""
echo "Changed files (should be exactly these three):"
git status --short

echo ""
echo "Staging and committing..."
git add src/app/globals.css src/components/home/Hero.tsx src/components/site/Nav.tsx

git commit -m "Fix broken tablet nav and give ultrawide screens a real layout, not just margin

Two separate responsive bugs, found by testing at real breakpoints
rather than just resizing a browser window:

Tablet (critical): the header switched from the mobile hamburger to
the full desktop nav at 768px, but the five links plus language
switcher plus two buttons need roughly 950px to actually fit on one
line. Every iPad in portrait - Mini (768), Air (820), Pro 11\" (834) -
showed wrapping, overlapping nav text. Moved the breakpoint from md
(768px) to lg (1024px) across the nav's links, buttons, hamburger
trigger and drawer, with margin to spare below 1024.

Ultrawide: content was capped at a flat 80rem (1280px) with hard
pixel caps on the Hero image and text, so anything wider than a
typical laptop just added empty margin - on a 3440px monitor the
whole page read as a small site stranded in a dark void. The
content-column pattern itself is sound (line length stays readable),
so rather than going full-bleed: widened .container-x in two steps
past 1536px and 1920px viewports (every fractional grid - Connects,
Safety, Stats - gets proportionally larger for free), and raised the
Hero image and lead-paragraph caps specifically at 2xl so the visual
grows along with the extra room instead of floating in it.

Verified against a production build (not dev mode) at 360, 390, 768,
820, 834, 900, 1000, 1024, 1440, 1920, 2560 and 3440px, plus the
mobile drawer's actual open/close interaction - no console errors,
no hydration mismatches."

echo ""
echo "Pushing to origin/main..."
if ! git push; then
  echo ""
  echo "Push failed - likely a GitHub account/permission mismatch."
  echo "Try: gh auth switch --user Mamacare001"
  echo "Then run: git push"
  exit 1
fi

echo ""
echo "Done. Once Vercel redeploys (usually automatic on push to main - check"
echo "your Vercel dashboard's Deployments tab), check the site on an iPad or"
echo "a wide monitor to see the difference."
