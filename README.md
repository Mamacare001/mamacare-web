# MamaCare --- web frontend

> The warning can come before the emergency.

Marketing site + authentication shell for MamaCare, the AI-supported maternal-health early-warning platform (Rwanda).

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Auth.js v5 (Google OAuth + demo credentials) · lucide-react · self-hosted variable fonts (Fraunces + Manrope).

---

## 1. Run locally

```bash
# Node 20+ recommended (built with Node 22)
npm install
cp .env.example .env.local        # then fill in the values (see §3)
npm run dev                       # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

Lint / type-check:

```bash
npm run lint
npx tsc --noEmit
```

## 2. Pages

| Route            | What it is                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `/`              | Landing: sequenced hero, story, four voices, interactive "how it works", bilingual chat demo, stats, safety, CTA |
| `/about`         | Scroll-revealed statement, story slider, team, roadmap                                            |
| `/how-it-works`  | The 5-step flow, risk levels, audiences (mothers / families / health workers), safety            |
| `/contact`       | Contact form (server action --- wire to email/CRM in `src/app/contact/actions.ts`)                 |
| `/login`         | Sign in / sign up (`?mode=signup`) with Google + email/password                                   |
| `/dashboard`     | Protected placeholder CHW dashboard (redirects to `/login` when signed out)                       |

Marketing chrome (nav, footer, mobile sticky CTA) is hidden on `/login` and `/dashboard` (see `src/components/site/Chrome.tsx`).

## 3. Environment variables

| Variable               | Required | Notes                                                                                              |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `AUTH_SECRET`          | prod     | `npx auth secret` or `openssl rand -base64 32`. A dev-only fallback is used when unset locally.     |
| `AUTH_GOOGLE_ID`       | optional | From Google Cloud Console → *APIs & Services → Credentials → OAuth client ID (Web application)*.    |
| `AUTH_GOOGLE_SECRET`   | optional | Same place. When both Google vars are set the "Continue with Google" button becomes active.         |
| `NEXT_PUBLIC_SITE_URL` | optional | Used for `metadataBase` (Open Graph URLs).                                                          |

**Google OAuth --- authorised redirect URIs to add:**

```
http://localhost:3000/api/auth/callback/google
https://<your-project>.vercel.app/api/auth/callback/google
https://<your-custom-domain>/api/auth/callback/google
```

**Demo credentials (no backend yet):** `demo@mamacare.rw` / `mamacare`. Replace the `authorize()` function in `src/auth.ts` with a call to the MamaCare API when it exists.

## 4. Deploy to Vercel

1. Push this folder to a Git repository (GitHub / GitLab / Bitbucket).
2. In Vercel: **Add New → Project → Import** the repo. Framework preset is detected as Next.js --- no build settings to change.
3. Under **Settings → Environment Variables** add `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `NEXT_PUBLIC_SITE_URL` (Production + Preview).
4. Deploy. Then add the Vercel URL to your Google OAuth redirect URIs (§3).

Or from the CLI: `npx vercel` (preview) → `npx vercel --prod`.

`trustHost: true` is already set in `src/auth.ts`, so Auth.js works behind Vercel's proxy without extra config.

## 5. Project structure

```
src/
  app/
    layout.tsx            fonts, metadata, providers, nav/footer
    template.tsx          page transition (fade + lift, 350 ms)
    globals.css           design tokens (@theme), type scale, utilities
    page.tsx              landing
    about/  how-it-works/  contact/  login/  dashboard/
    api/auth/[...nextauth]/route.ts
  auth.ts                 Auth.js config (Google + credentials)
  proxy.ts                Next 16 proxy (formerly middleware) --- protects /dashboard
  lib/i18n.ts             EN / RW dictionary
  components/
    ui/        Button, Reveal (scroll animations), CountUp, Eyebrow
    site/      Nav (transparent → blurred, right-slide mobile drawer), Footer, StickyCta, PageHero, ContactForm, Chrome
    home/      Hero, Story, Connects, HowItWorks, ChatPreview, Stats, Safety, CtaBand
    about/     Statement, StorySlider, Team
    how/       RiskLevels, Audiences
    auth/      LoginForm
    providers/ LanguageProvider
  fonts/                  self-hosted Manrope + Fraunces (woff2)
public/
  brand/                  mark.png, wordmark.png, wordmark-white.png, logo.png, logo-horizontal.png
  images/                 the seven photos used across the site
```

## 6. Design system (from the creative brief)

| Token      | Hex       | Used for                                             |
| ---------- | --------- | ---------------------------------------------------- |
| `emerald`  | `#123C35` | primary buttons, headings, nav, strong sections      |
| `green`    | `#2E8B70` | secondary buttons, icons, positive states, hover     |
| `coral`    | `#FF6B5E` | important CTAs, highlights, high-risk                |
| `gold`     | `#F4C95D` | statistics, moderate-risk, small accents             |
| `violet`   | `#7357E8` | AI / intelligence features only                      |
| `ivory`    | `#F8F7F2` | page background                                      |
| `midnight` | `#102522` | dark sections, footer                                |

Radii: 8 / 16 / 24 / 32 / 40 px. Motion: micro 100–180 ms, hover 150–250 ms, drawer 300–450 ms, section reveal 500–800 ms, hero sequence 0.3 → 1.6 s. `prefers-reduced-motion` is respected globally.

## 7. Content notes

- **Kinyarwanda copy** (`src/lib/i18n.ts`, chat demo in `ChatPreview.tsx`) is a first draft --- please have a native speaker review before launch.
- Photos are ~500 px on the short side. For the hero on large screens, swap in higher-resolution originals in `public/images/`.
- Stats on the landing page come from the 20-interview user research; the MMR figure used elsewhere is 105/100k (HSSP V, 2023).
- MamaCare is decision support. The "does not diagnose" line appears in the hero, footer and how-it-works page on purpose --- keep it.
