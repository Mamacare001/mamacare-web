"use client";

import { PageHero } from "@/components/site/PageHero";
import { useLang } from "@/components/providers/LanguageProvider";

export function AboutHero() {
  const { t } = useLang();
  const h = t.about.hero;
  return (
    <PageHero
      eyebrow={h.eyebrow}
      segments={[h.titlePre, { text: h.titleHighlight, className: "text-coral" }, h.titleSuffix]}
      lead={h.lead}
      image="/images/chw-visit.jpg"
      imageAlt="A Community Health Worker visiting a pregnant woman at home"
    />
  );
}
