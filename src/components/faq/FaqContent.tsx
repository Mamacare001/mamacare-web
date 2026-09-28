"use client";

import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/ui/TextReveal";
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
        segments={[f.hero.titlePre, { text: f.hero.titleHighlight, className: "text-coral" }, f.hero.titleSuffix]}
        lead={f.hero.lead}
      />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x space-y-20">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
            <Reveal variant="fade" duration={0.6}><Eyebrow tone="coral">{f.sections.mothers.eyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h2 mt-4 text-emerald" delay={0.1}>{f.sections.mothers.heading}</TextReveal>
          </div>
            <Reveal variant="right" distance={24} delay={0.2} className="lg:col-span-8">
              <Accordion name="mothers" items={mothers} />
            </Reveal>
          </div>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
            <Reveal variant="fade" duration={0.6}><Eyebrow>{f.sections.workers.eyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h2 mt-4 text-emerald" delay={0.1}>{f.sections.workers.heading}</TextReveal>
          </div>
            <Reveal variant="right" distance={24} delay={0.2} className="lg:col-span-8">
              <Accordion name="workers" items={workers} />
            </Reveal>
          </div>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
            <Reveal variant="fade" duration={0.6}><Eyebrow tone="violet">{f.sections.general.eyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h2 mt-4 text-emerald" delay={0.1}>{f.sections.general.heading}</TextReveal>
          </div>
            <Reveal variant="right" distance={24} delay={0.2} className="lg:col-span-8">
              <Accordion name="general" items={general} />
            </Reveal>
          </div>
          <Reveal variant="scale" className="rounded-xl bg-ivory p-8 text-center md:p-12">
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
