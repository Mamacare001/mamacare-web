import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { StickyCta } from "@/components/site/StickyCta";
import { MarketingOnly } from "@/components/site/Chrome";

const manrope = localFont({
  src: "../fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});
const fraunces = localFont({
  src: "../fonts/fraunces-latin.woff2",
  variable: "--font-fraunces",
  display: "swap",
  weight: "100 900",
});

/** Resolve the canonical site URL: explicit env → Vercel deployment URL → placeholder. Empty strings are treated as unset. */
function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  const raw = explicit || (vercel ? `https://${vercel}` : "https://mamacare.rw");
  try {
    return new URL(raw);
  } catch {
    return new URL("https://mamacare.rw");
  }
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: "MamaCare — The warning can come before the emergency", template: "%s · MamaCare" },
  description:
    "MamaCare connects mothers, families, Community Health Workers and clinics into one continuous picture of every pregnancy, in Kinyarwanda and English.",
  openGraph: {
    title: "MamaCare",
    description: "AI-supported maternal health early-warning platform for Rwanda.",
    images: ["/images/mother-home-phone.jpg"],
    type: "website",
  },
  icons: { icon: "/icon.png", apple: "/icon.png" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#123C35",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LanguageProvider>
          <MarketingOnly>
            <Nav />
          </MarketingOnly>
          <main className="flex-1">{children}</main>
          <MarketingOnly>
            <Footer />
            <StickyCta />
          </MarketingOnly>
        </LanguageProvider>
      </body>
    </html>
  );
}
