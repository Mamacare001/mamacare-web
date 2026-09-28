"use client";

import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem, GrowRule } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { useLang } from "@/components/providers/LanguageProvider";

const values = [
  { value: 20, suffix: "" },
  { value: 80, suffix: "%" },
  { value: 100, suffix: "%" },
  { value: 45000, suffix: "+" },
];

/** Section 6 — dark statistics with animated counters. */
export function Stats() {
  const { t } = useLang();
  const st = t.stats;
  const stats = st.items.map((it, i) => ({ ...it, ...values[i] }));

  return (
    <section className="relative overflow-hidden bg-midnight py-24 text-ivory md:py-32">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="container-x relative">
        <div className="max-w-2xl">
          <Reveal variant="fade" duration={0.6}>
            <Eyebrow tone="gold">{st.eyebrow}</Eyebrow>
          </Reveal>
          <TextReveal as="h2" className="text-h1 mt-5" delay={0.1}>
            {st.heading}
          </TextReveal>
        </div>
        <RevealGroup className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" stagger={0.14} variant="blur" distance={48} duration={1}>
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <GrowRule className="mb-6 text-ivory" />
              <p className="font-display text-6xl tabular-nums text-gold md:text-7xl">
                <CountUp to={s.value} suffix={s.suffix} duration={1.6} />
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug">{s.label}</p>
              <p className="mt-1 text-sm text-ivory/55">{s.note}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <TextReveal as="p" by="line" delay={0.2} className="mt-16 max-w-3xl font-display text-2xl leading-snug text-ivory/85 md:text-3xl">
          {st.closing}
        </TextReveal>
      </div>
    </section>
  );
}
