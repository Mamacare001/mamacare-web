import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { Connects } from "@/components/home/Connects";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ChatPreview } from "@/components/home/ChatPreview";
import { Stats } from "@/components/home/Stats";
import { Safety } from "@/components/home/Safety";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "MamaCare — Maternal Health Early-Warning Platform for Rwanda",
  description:
    "MamaCare connects mothers, families, Community Health Workers and clinics into one continuous picture of every pregnancy — catching danger signs like preeclampsia early, in Kinyarwanda and English. No warning sign should go unheard.",
  keywords: [
    "MamaCare",
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
    title: "MamaCare — The warning can come before the emergency",
    description:
      "An AI-supported maternal-health early-warning platform connecting mothers, families, CHWs and clinics across Rwanda.",
    url: "/",
    images: ["/images/mother-home-phone.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MamaCare — The warning can come before the emergency",
    description:
      "An AI-supported maternal-health early-warning platform connecting mothers, families, CHWs and clinics across Rwanda.",
    images: ["/images/mother-home-phone.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MamaCare",
  url: "https://mamacare.rw",
  logo: "https://mamacare.rw/brand/mark.png",
  description:
    "MamaCare connects mothers, families, Community Health Workers and clinics into one continuous picture of every pregnancy, catching danger signs early, in Kinyarwanda and English.",
  areaServed: { "@type": "Country", name: "Rwanda" },
  sameAs: [] as string[],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Story />
      <Connects />
      <HowItWorks />
      <ChatPreview />
      <Stats />
      <Safety />
      <CtaBand />
    </>
  );
}
