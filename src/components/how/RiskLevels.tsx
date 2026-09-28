"use client";

import { Info, PhoneCall, Siren } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";

const meta = [
  { icon: Info, color: "bg-green text-ivory", ring: "ring-green/20" },
  { icon: PhoneCall, color: "bg-gold text-midnight", ring: "ring-gold/40" },
  { icon: Siren, color: "bg-coral text-white", ring: "ring-coral/30" },
];

export function RiskLevels() {
  const { t } = useLang();
  const rl = t.how.riskLevels;
  const levels = rl.levels.map((l, i) => ({ ...l, ...meta[i] }));

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
            <Reveal variant="fade" duration={0.6}><Eyebrow tone="coral">{rl.eyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5 text-emerald" delay={0.1}>{rl.heading}</TextReveal>
            <Reveal variant="blur" delay={0.35}>
          <p className="text-lead mt-5 text-muted">{rl.lead}</p>
            </Reveal>
          </div>
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.12} variant="tilt" distance={44} duration={0.95}>
          {levels.map((l) => (
            <RevealItem key={l.level}>
              <div className={`group flex h-full flex-col rounded-lg bg-ivory p-6 ring-1 ${l.ring} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float`}>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${l.color}`}>
                    <l.icon className="size-4" aria-hidden />
                    {l.level} {rl.riskSuffix}
                  </span>
                </div>
                <h3 className="text-h3 mt-6 text-emerald">{l.action}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{l.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
