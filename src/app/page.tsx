import type { Metadata } from "next";
import { LanguageSplash } from "@/components/home/LanguageSplash";

export const metadata: Metadata = {
  title: "MamaRindwa — Maternal Health Early-Warning Platform for Rwanda",
  description:
    "MamaRindwa connects mothers, families, Community Health Workers and clinics into one continuous picture of every pregnancy — catching danger signs like preeclampsia early, in Kinyarwanda and English. No warning sign should go unheard.",
  keywords: [
    "MamaRindwa",
    "maternal health Rwanda",
    "pregnancy warning signs",
    "preeclampsia Rwanda",
    "Community Health Worker app",
    "CHW digital health",
    "antenatal care Rwanda",
    "maternal health AI",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "MamaRindwa — The warning can come before the emergency",
    description:
      "An AI-supported maternal-health early-warning platform connecting mothers, families, CHWs and clinics across Rwanda.",
    url: "/",
    images: ["/images/mother-home-phone.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MamaRindwa — The warning can come before the emergency",
    description:
      "An AI-supported maternal-health early-warning platform connecting mothers, families, CHWs and clinics across Rwanda.",
    images: ["/images/mother-home-phone.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MamaRindwa",
  url: "https://MamaRindwa.rw",
  logo: "https://MamaRindwa.rw/brand/mark.png",
  description:
    "MamaRindwa connects mothers, families, Community Health Workers and clinics into one continuous picture of every pregnancy, catching danger signs early, in Kinyarwanda and English.",
  areaServed: { "@type": "Country", name: "Rwanda" },
  sameAs: [] as string[],
};

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LanguageSplash />
    </>
  );
}
