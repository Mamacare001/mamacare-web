"use client";

import { PageHero } from "@/components/site/PageHero";
import { useLang } from "@/components/providers/LanguageProvider";

export function HowHero() {
  const { t } = useLang();
  const h = t.how.hero;
  return (
    <PageHero
      eyebrow={h.eyebrow}
      title={
        <>
          {h.titlePre}<span className="text-violet">{h.titleHighlight}</span>{h.titleSuffix}
        </>
      }
      lead={h.lead}
    />
  );
}
