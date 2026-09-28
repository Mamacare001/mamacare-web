"use client";

import { Users, Eye, XCircle, ClipboardList, Baby, HeartHandshake, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Prose } from "@/components/pages/Prose";
import { useLang } from "@/components/providers/LanguageProvider";

const circleMeta = [{ icon: Baby }, { icon: HeartHandshake }, { icon: Users }, { icon: Stethoscope }];
const controlMeta = [{ icon: Eye }, { icon: XCircle }, { icon: ClipboardList }];

export function ConsentContent() {
  const { t } = useLang();
  const c = t.consent;
  const circle = c.circle.map((it, i) => ({ ...it, ...circleMeta[i] }));
  const controls = c.controls.map((it, i) => ({ ...it, ...controlMeta[i] }));

  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={
          <>
            {c.hero.titlePre}<span className="text-coral">{c.hero.titleHighlight}</span>{c.hero.titleSuffix}
          </>
        }
        lead={c.hero.lead}
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Eyebrow>{c.careCircle.eyebrow}</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">{c.careCircle.heading}</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2" stagger={0.08}>
            {circle.map((it) => (
              <RevealItem key={it.who}>
                <div className="h-full rounded-lg bg-ivory p-6 ring-1 ring-emerald/5">
                  <span className="grid size-11 place-items-center rounded-full bg-green-100 text-green">
                    <it.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-h3 mt-4 text-emerald">{it.who}</h3>
                  <p className="text-eyebrow mt-4 text-muted">{c.seesLabel}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{it.sees}</p>
                  <p className="text-eyebrow mt-4 text-coral">{c.controlLabel}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{it.control}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow tone="coral">{c.agreeing.eyebrow}</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">{c.agreeing.heading}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Prose>
              <p><strong>{c.understand}</strong></p>
              <ol>
                {c.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
              <p>
                {c.closingPre}
                <a href="/privacy">{c.closingPrivacyLink}</a>
                {c.closingMid}
                <a href="/terms">{c.closingTermsLink}</a>
                {c.closingSuffix}
              </p>
            </Prose>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <RevealGroup className="grid gap-4 sm:grid-cols-3" stagger={0.1}>
            {controls.map((x) => (
              <RevealItem key={x.t}>
                <div className="flex gap-4 rounded-lg bg-ivory p-6 ring-1 ring-emerald/5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-coral-100 text-coral">
                    <x.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-emerald">{x.t}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{x.d}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
