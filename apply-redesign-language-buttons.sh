#!/usr/bin/env bash
set -euo pipefail

# Redesigns the two language-choice buttons on the splash ("/") for
# equal visual weight and a more premium, editorial feel.
#
# Touches ONLY src/components/home/LanguageSplash.tsx.
#
# Run this from the ROOT of your MamaRindwa-web repo checkout
# (the folder that contains package.json, src/, etc).

PATCH_FILE="redesign-language-buttons.patch"

if [ ! -f "package.json" ]; then
  echo "ERROR: run this script from the root of your MamaRindwa-web checkout (no package.json found here)."
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
  echo "src/components/home/LanguageSplash.tsx."
  exit 1
fi

echo "Patch check passed. Applying..."
git apply "$PATCH_FILE"

echo ""
echo "Changed files (should be exactly this one):"
git status --short

echo ""
echo "Staging and committing..."
git add src/components/home/LanguageSplash.tsx

git commit -m "Redesign the language-choice buttons for equal visual weight and a more premium feel

The old buttons had a real hierarchy problem, not just a style one: a
saturated coral gradient for English next to a pale cream fill for
Kinyarwanda made English read as the 'primary' choice and Kinyarwanda
as the muted, secondary one - not the message a Rwanda-first product
wants to send. The heavy blurred color-halo shadows and diagonal
shine-sweep hover also read as a generic template rather than a
considered healthcare brand.

Replaced both with a single unified treatment: frosted-glass cards,
identical weight and size, refined flag chips, a small native-name
subtitle line, a restrained per-language accent that only appears on
hover, and an arrow affordance that nudges on hover instead of a
glossy sweep. The two choices now read as equals, and the whole thing
feels considerably more editorial against the photo backdrop."

echo ""
echo "Pushing to origin/main..."
if ! git push; then
  echo ""
  echo "Push failed - likely a GitHub account/permission mismatch."
  echo "Try: gh auth switch --user MamaRindwa001"
  echo "Then run: git push"
  exit 1
fi

echo ""
echo "Done. Once Vercel redeploys (usually automatic on push to main - check"
echo "your Vercel dashboard's Deployments tab), reload MamaRindwa-web.vercel.app"
echo "to see the new buttons."
