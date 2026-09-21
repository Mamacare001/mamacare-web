"use client";

import { Info, PhoneCall, Siren } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const levels = [
  {
    level: "Low",
    icon: Info,
    color: "bg-green text-ivory",
    ring: "ring-green/20",
    action: "Provide safe information and self-care advice",
    text: "Reassurance, what to watch for, and a scheduled follow-up check-in.",
  },
  {
    level: "Moderate",
    icon: PhoneCall,
    color: "bg-gold text-midnight",
    ring: "ring-gold/40",
    action: "Recommend contact with a healthcare professional",
    text: "The CHW is notified and a visit or call is arranged within an agreed time window.",
  },
  {
    level: "High",
    icon: Siren,
    color: "bg-coral text-white",
    ring: "ring-coral/30",
    action: "Escalate through the right care pathway",
    text: "Immediate alert to the CHW and the linked health facility, with clear instructions for the family.",
  },
];

export function RiskLevels() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="coral">Guided by medical rules</Eyebrow>
          <h2 className="text-h1 mt-5 text-emerald">Three levels. One clear next step.</h2>
          <p className="text-lead mt-5 text-muted">
            The risk model produces an interpretable score. Medically reviewed rules translate it into an action — never a
            diagnosis.
          </p>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.12}>
          {levels.map((l) => (
            <RevealItem key={l.level}>
              <div className={`group flex h-full flex-col rounded-lg bg-ivory p-6 ring-1 ${l.ring} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float`}>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${l.color}`}>
                    <l.icon className="size-4" aria-hidden />
                    {l.level} risk
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
