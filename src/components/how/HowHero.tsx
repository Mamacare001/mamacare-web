"use client";

import { PageHero } from "@/components/site/PageHero";
import { useLang } from "@/components/providers/LanguageProvider";

export function HowHero() {
  const { t } = useLang();
  const h = t.how.hero;
  return (
    <PageHero
      eyebrow={h.eyebrow}
      segments={[h.titlePre, { text: h.titleHighlight, className: "text-violet" }, h.titleSuffix]}
      lead={h.lead}
    />
  );
}
