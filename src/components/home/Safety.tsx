"use client";

import { Lock, FileCheck2, UserCheck, Languages, Route } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const pillars = [
  { icon: UserCheck, title: "Humans decide", text: "MamaCare supports — never replaces — doctors, midwives and CHWs. It does not diagnose." },
  { icon: FileCheck2, title: "Medically reviewed rules", text: "Every recommended action follows clinical rules reviewed by health professionals, fully auditable." },
  { icon: Lock, title: "Data protection", text: "Consent first. Health data handled under Rwanda's data-protection law, with independent ethics review." },
  { icon: Languages, title: "Built for Kinyarwanda", text: "Misunderstanding is a safety risk. When the system is unsure, it asks — or hands over to a person." },
  { icon: Route, title: "A clear care pathway", text: "Escalations go to a named CHW and facility, through a defined channel, with the loop closed back." },
];

/** Section 7 — responsible AI pillars (ivory). */
export function Safety() {
  return (
    <section id="safety" className="bg-ivory py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Responsible by design</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">Safety is not a caveat. It’s the architecture.</h2>
            <p className="text-lead mt-6 text-muted">
              For a maternal-health tool, trust is the product. These are the commitments we build against.
            </p>
          </Reveal>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-8" stagger={0.08}>
            {pillars.map((p, i) => (
              <RevealItem key={p.title} className={i === 0 ? "sm:col-span-2" : ""}>
                <div className="group flex h-full gap-4 rounded-lg bg-white p-6 ring-1 ring-emerald/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-green-100 text-green transition-colors group-hover:bg-emerald group-hover:text-ivory">
                    <p.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-h3 text-emerald">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
