#!/usr/bin/env bash
set -euo pipefail

# Makes "/" always show the language splash — the auto-skip-to-/home
# behavior for returning visitors is removed. Previously, once someone
# had picked a language, opening the main link would sometimes send
# them straight to /home instead of showing the splash, which read as
# inconsistent/broken. Now "/" is deterministic: it always shows the
# splash gate, every time, for everyone. Picking a language still saves
# it (so the rest of the site opens in that language) and still routes
# to /home — that part is unchanged.
#
# Touches ONLY src/components/home/LanguageSplash.tsx.
#
# Run this from the ROOT of your MamaRindwa-web repo checkout
# (the folder that contains package.json, src/, etc).

PATCH_FILE="always-show-splash.patch"

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

git commit -m "Always show the language splash at /

Removes the auto-redirect that sometimes sent returning visitors
straight to /home, skipping the splash. / now always shows the
language gate, deterministically, for every visitor. Choosing a
language still saves it and still routes to /home."

echo ""
echo "Pushing to origin/main..."
if ! git push; then
  echo ""
  echo "Push failed — likely a GitHub account/permission mismatch."
  echo "Try: gh auth switch --user MamaRindwa001"
  echo "Then run: git push"
  exit 1
fi

echo ""
echo "Done. The main link now always shows the language splash."
