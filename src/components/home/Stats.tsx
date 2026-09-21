"use client";

import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem, GrowRule } from "@/components/ui/Reveal";

const stats = [
  { value: 20, suffix: "", label: "field interviews across 5 facilities", note: "Mothers, families, CHWs and midwives" },
  { value: 80, suffix: "%", label: "of mothers don't seek care for “minor” signs", note: "Headache, swollen feet, blurred vision" },
  { value: 100, suffix: "%", label: "of midwives saw minor signs become critical", note: "From our interviews" },
  { value: 45000, suffix: "+", label: "Community Health Workers in Rwanda", note: "The network we build on" },
];

/** Section 6 — dark statistics with animated counters. */
export function Stats() {
  return (
    <section className="relative overflow-hidden bg-midnight py-24 text-ivory md:py-32">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="container-x relative">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="gold">What we heard</Eyebrow>
          <h2 className="text-h1 mt-5">Not a guess. A gap we heard directly.</h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
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
        <Reveal delay={0.2} className="mt-16 max-w-3xl">
          <p className="font-display text-2xl leading-snug text-ivory/85 md:text-3xl">
            The problem isn’t awareness. It’s that the warning sign has nowhere to go in real time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
