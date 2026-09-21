"use client";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const team = [
  { initials: "PI", name: "Patrice Iradukunda", role: "Data Scientist", text: "AI engineering, partnerships and social impact.", tone: "bg-emerald text-ivory" },
  { initials: "DI", name: "Donatien Iranshubije", role: "Business Developer", text: "Strategy and operational planning.", tone: "bg-coral text-white" },
  { initials: "PD", name: "Pascal Dukundane", role: "Software Developer", text: "Backend and frontend engineering, technology advancement.", tone: "bg-gold text-midnight" },
];

const milestones = [
  { when: "Months 1–6", title: "Prototype & clinical validation", text: "Build the intake, risk and rules layers; review with midwives and CHWs." },
  { when: "Months 7–12", title: "Two-district pilot", text: "~5,000 mothers, ~200 CHWs, 5 facilities, with ethics approval." },
  { when: "Months 13–18", title: "Evaluate & refine", text: "Independent evaluation, then the first insurer and research partnerships." },
];

export function Team() {
  return (
    <>
      <section id="team" className="bg-ivory py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <Eyebrow>The team</Eyebrow>
            <h2 className="text-h1 mt-5 max-w-3xl text-emerald">Three disciplines. One shared conviction.</h2>
            <p className="text-lead mt-5 max-w-2xl text-muted">The data already exists to save her.</p>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {team.map((m) => (
              <RevealItem key={m.name}>
                <div className="group h-full rounded-lg bg-white p-6 ring-1 ring-emerald/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float">
                  <span className={`grid size-16 place-items-center rounded-full font-display text-2xl ${m.tone}`}>{m.initials}</span>
                  <h3 className="text-h3 mt-5 text-emerald">{m.name}</h3>
                  <p className="text-eyebrow mt-1 text-coral">{m.role}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="research" className="relative overflow-hidden bg-midnight py-24 text-ivory md:py-32">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container-x relative">
          <Reveal>
            <Eyebrow tone="gold">Roadmap</Eyebrow>
            <h2 className="text-h1 mt-5 max-w-3xl">From research to a deployable innovation.</h2>
          </Reveal>
          <RevealGroup className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.12}>
            {milestones.map((m, i) => (
              <RevealItem key={m.when}>
                <div className="relative border-t border-ivory/15 pt-6">
                  <span className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-gold" aria-hidden />
                  <p className="text-eyebrow text-gold">{m.when}</p>
                  <h3 className="mt-3 font-display text-2xl">
                    <span className="mr-2 text-ivory/40">0{i + 1}</span>
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ivory/65">{m.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
