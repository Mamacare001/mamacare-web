"use client";

import { FileText, CheckCircle2, Clock, Circle, Database, Scale, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { useLang } from "@/components/providers/LanguageProvider";

type Status = "done" | "active" | "planned";
const statusCls: Record<Status, { icon: typeof CheckCircle2; cls: string }> = {
  done: { icon: CheckCircle2, cls: "bg-green-100 text-green" },
  active: { icon: Clock, cls: "bg-gold-100 text-[#8a6a10]" },
  planned: { icon: Circle, cls: "bg-ivory-200 text-muted" },
};

const statNums = [20, 5, 0];
const dataStepIcons = [FileText, Scale, Database];

export function ResearchContent() {
  const { t } = useLang();
  const r = t.research;

  return (
    <>
      <PageHero
        eyebrow={r.hero.eyebrow}
        segments={[r.hero.titlePre, { text: r.hero.titleHighlight, className: "text-violet" }, r.hero.titleSuffix]}
        lead={r.hero.lead}
      />

      <section className="bg-white py-20 md:py-24">
        <div className="container-x grid gap-8 sm:grid-cols-3">
          {r.stats.map((s, i) => (
            <Reveal key={s.label} variant="blur" delay={i * 0.12} className="border-t border-emerald/10 pt-6">
              <p className="font-display text-6xl text-emerald">
                <CountUp to={statNums[i]} suffix="" />
              </p>
              <p className="mt-2 text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal variant="fade" duration={0.6}><Eyebrow tone="violet">{r.validationEyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5 text-emerald" delay={0.1}>{r.validationHeading}</TextReveal>
            <Reveal variant="blur" delay={0.35}>
            <p className="text-lead mt-5 text-muted">{r.validationLead}</p>
            </Reveal>
          </div>
          <RevealGroup className="lg:col-span-8" stagger={0.06} variant="left">
            {r.milestones.map((m, i) => {
              const status = m.status as Status;
              const s = statusCls[status];
              return (
                <RevealItem key={m.title}>
                  <div className="flex gap-5 border-t border-emerald/10 py-6">
                    <span className="mt-0.5 font-mono text-sm text-muted">0{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-display text-2xl text-emerald">{m.title}</h3>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${s.cls}`}>
                          <s.icon className="size-3.5" aria-hidden /> {r.statusLabels[status]}
                        </span>
                      </div>
                      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{m.text}</p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-3xl">
            <Reveal variant="fade" duration={0.6}><Eyebrow>{r.questionsEyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5 text-emerald" delay={0.1}>{r.questionsHeading}</TextReveal>
          </div>
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2" stagger={0.08} variant="tilt" distance={44} duration={0.95}>
            {r.questions.map((q, i) => (
              <RevealItem key={q.area} className={i === 0 ? "md:col-span-2" : ""}>
                <div className="h-full rounded-lg bg-ivory p-6 ring-1 ring-emerald/5">
                  <p className="text-eyebrow text-violet">{q.area}</p>
                  <p className="mt-3 font-display text-xl leading-snug text-emerald md:text-2xl">{q.q}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative overflow-hidden bg-emerald py-24 text-ivory md:py-32">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal variant="fade" duration={0.6}><Eyebrow tone="gold">{r.dataEyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5" delay={0.1}>{r.dataHeading}</TextReveal>
            <Reveal variant="blur" delay={0.35}>
            <p className="text-lead mt-5 text-ivory/75">{r.dataLead}</p>
            <div className="mt-8">
              <Button href="/contact?topic=research" variant="coral" arrow>
                {r.proposeBtn}
              </Button>
            </div>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-4 lg:col-span-7" stagger={0.1} variant="scale">
            {r.dataSteps.map((s, i) => {
              const Icon = dataStepIcons[i];
              return (
                <RevealItem key={s.t}>
                  <div className="flex gap-5 rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-midnight">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl">{s.t}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ivory/70">{s.d}</p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-3xl">
            <Reveal variant="fade" duration={0.6}><Eyebrow>{r.pubEyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5 text-emerald" delay={0.1}>{r.pubHeading}</TextReveal>
            <Reveal variant="blur" delay={0.35}>
            <p className="text-lead mt-5 text-muted">{r.pubLead}</p>
            <div className="mt-8">
              <Button href="/contact?topic=research" variant="secondary">
                {r.getNotifiedBtn}
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
