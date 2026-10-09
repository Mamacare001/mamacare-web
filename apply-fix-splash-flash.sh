#!/usr/bin/env bash
set -euo pipefail

# Fixes the flash where the site nav/footer briefly appear on "/" before
# the language splash covers them (happens on every visit, for a split
# second, no matter how fast the connection is).
#
# Touches ONLY:
#   src/components/home/LanguageSplash.tsx
#   src/components/site/Chrome.tsx
#
# Run this from the ROOT of your mamacare-web repo checkout
# (the folder that contains package.json, src/, etc).

PATCH_FILE="fix-splash-flash.patch"

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
  echo "src/components/home/LanguageSplash.tsx or src/components/site/Chrome.tsx."
  exit 1
fi

echo "Patch check passed. Applying..."
git apply "$PATCH_FILE"

echo ""
echo "Changed files (should be exactly these two):"
git status --short

echo ""
echo "Staging and committing..."
git add src/components/home/LanguageSplash.tsx src/components/site/Chrome.tsx

git commit -m "Stop the homepage nav/footer from flashing under the splash

/ rendered the splash gate one tick after the page loaded, so for a
brief moment (however fast your connection, this always happened)
visitors saw the ordinary site nav and footer underneath, then the
splash snapped on top - reading as a flash back and forth between
the homepage and the splash.

Two fixes: the splash now renders on the very first paint instead of
waiting for a client-side effect, and the marketing nav/footer are
now hidden on \"/\" entirely, the same way they already are on
app-style routes, so there is nothing behind the splash to flash in
the first place."

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
echo "Done. The flash is fixed. Once Vercel redeploys (usually automatic on"
echo "push to main - check your Vercel dashboard's Deployments tab), reload"
echo "mamacare-web.vercel.app to confirm."
