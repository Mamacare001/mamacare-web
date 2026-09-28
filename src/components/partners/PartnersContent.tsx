"use client";

import Image from "next/image";
import { Building2, ShieldCheck, FlaskConical, HeartHandshake, BarChart3, Lock, Users, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { useLang } from "@/components/providers/LanguageProvider";

const partnerMeta = [
  { icon: Building2, tone: "bg-green-100 text-green" },
  { icon: ShieldCheck, tone: "bg-gold-100 text-[#8a6a10]" },
  { icon: HeartHandshake, tone: "bg-coral-100 text-coral" },
  { icon: FlaskConical, tone: "bg-violet-100 text-violet" },
];

const principleMeta = [{ icon: Lock }, { icon: BarChart3 }, { icon: Users }];

export function PartnersContent() {
  const { t } = useLang();
  const p = t.partners;
  const partners = p.items.map((it, i) => ({ ...it, ...partnerMeta[i] }));
  const principles = p.principles.map((pr, i) => ({ ...pr, ...principleMeta[i] }));

  return (
    <>
      <PageHero
        eyebrow={p.hero.eyebrow}
        title={
          <>
            {p.hero.titlePre}<span className="text-coral">{p.hero.titleHighlight}</span>{p.hero.titleSuffix}
          </>
        }
        lead={p.hero.lead}
        image="/images/chw-visit.jpg"
        imageAlt="A Community Health Worker with a pregnant woman"
      />

      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Eyebrow>{p.whoWeWorkWith.eyebrow}</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">{p.whoWeWorkWith.heading}</h2>
          </Reveal>
          <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2" stagger={0.1}>
            {partners.map((pt) => (
              <RevealItem key={pt.title}>
                <article className="flex h-full flex-col rounded-lg bg-ivory p-7 ring-1 ring-emerald/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float md:p-9">
                  <div className="flex items-center gap-4">
                    <span className={`grid size-12 place-items-center rounded-full ${pt.tone}`}>
                      <pt.icon className="size-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-h3 text-emerald">{pt.title}</h3>
                      <p className="text-sm text-muted">{pt.who}</p>
                    </div>
                  </div>
                  <p className="text-eyebrow mt-7 text-green">{p.getsLabel}</p>
                  <ul className="mt-3 space-y-2.5">
                    {pt.gets.map((g) => (
                      <li key={g} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" aria-hidden />
                        {g}
                      </li>
                    ))}
                  </ul>
                  <p className="text-eyebrow mt-6 text-coral">{p.asksLabel}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{pt.gives}</p>
                  <div className="mt-auto pt-7">
                    <Button href={`/contact?topic=partnership`} variant="ghost" size="sm" arrow>
                      {p.talkToUs}
                    </Button>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative overflow-hidden bg-midnight py-24 text-ivory md:py-32">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow tone="gold">{p.safe.eyebrow}</Eyebrow>
            <h2 className="text-h1 mt-5">{p.safe.heading}</h2>
            <p className="text-lead mt-6 text-ivory/70">{p.safe.lead}</p>
          </Reveal>
          <RevealGroup className="grid gap-4 lg:col-span-7" stagger={0.1}>
            {principles.map((pr) => (
              <RevealItem key={pr.title}>
                <div className="flex gap-5 rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-midnight">
                    <pr.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">{pr.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ivory/70">{pr.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-x grid items-center gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <Eyebrow>{p.whereWeAre.eyebrow}</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">{p.whereWeAre.heading}</h2>
            <ol className="mt-8 space-y-5">
              {p.timeline.map((step, i) => (
                <li key={step.when} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald text-xs font-bold text-ivory">{i + 1}</span>
                  <div>
                    <p className="text-eyebrow text-coral">{step.when}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{step.what}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact?topic=pilot" variant="coral" arrow>
                {p.joinPilot}
              </Button>
              <Button href="/research" variant="secondary">
                {p.researchValidation}
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-float">
              <Image src="/images/provider-tablet.jpg" alt="A clinician reviewing a case on a tablet" fill sizes="(min-width: 768px) 45vw, 92vw" className="object-cover object-[50%_25%]" />
            </figure>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
