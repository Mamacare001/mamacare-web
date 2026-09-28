"use client";

import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion, type QA } from "@/components/pages/Accordion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/components/providers/LanguageProvider";

export function FaqContent() {
  const { t } = useLang();
  const f = t.faq;

  const mothers: QA[] = [
    ...f.mothersItems.slice(0, 4),
    {
      q: f.mothersLinked.q,
      a: (
        <>
          {f.mothersLinked.aLead}
          <Link href="/consent">{f.mothersLinked.aLinkText}</Link>
          {f.mothersLinked.aSuffix}
        </>
      ),
    },
    ...f.mothersItems.slice(4),
  ];
  const workers: QA[] = [...f.workersItems];
  const general: QA[] = [...f.generalItems];

  return (
    <>
      <PageHero
        eyebrow={f.hero.eyebrow}
        title={
          <>
            {f.hero.titlePre}<span className="text-coral">{f.hero.titleHighlight}</span>{f.hero.titleSuffix}
          </>
        }
        lead={f.hero.lead}
      />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x space-y-20">
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow tone="coral">{f.sections.mothers.eyebrow}</Eyebrow>
              <h2 className="text-h2 mt-4 text-emerald">{f.sections.mothers.heading}</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <Accordion name="mothers" items={mothers} />
            </Reveal>
          </div>
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>{f.sections.workers.eyebrow}</Eyebrow>
              <h2 className="text-h2 mt-4 text-emerald">{f.sections.workers.heading}</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <Accordion name="workers" items={workers} />
            </Reveal>
          </div>
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow tone="violet">{f.sections.general.eyebrow}</Eyebrow>
              <h2 className="text-h2 mt-4 text-emerald">{f.sections.general.heading}</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <Accordion name="general" items={general} />
            </Reveal>
          </div>
          <Reveal className="rounded-xl bg-ivory p-8 text-center md:p-12">
            <p className="font-display text-2xl text-emerald md:text-3xl">{f.stillQuestion}</p>
            <div className="mt-6">
              <Button href="/contact" variant="coral" arrow>{f.askUs}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
