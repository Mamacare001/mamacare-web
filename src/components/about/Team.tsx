"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const team = [
  {
    name: "Patrice Iradukunda",
    role: "Data Scientist",
    text: "AI engineering, partnerships and social impact.",
    photo: "/images/team/patrice.jpg",
    accent: "ring-emerald",
  },
  {
    name: "Donatien Iranshubije",
    role: "Business Developer",
    text: "Strategy and operational planning.",
    photo: "/images/team/donatien.png",
    accent: "ring-coral",
  },
  {
    name: "Pascal Dukundane",
    role: "Software Developer",
    text: "Backend and frontend engineering, technology advancement.",
    photo: "/images/team/pascal.jpg",
    accent: "ring-gold",
  },
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
                <article className="group h-full overflow-hidden rounded-lg bg-white ring-1 ring-emerald/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float">
                  <figure className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(min-width: 768px) 30vw, 92vw"
                      className="object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-transparent" />
                  </figure>
                  <div className="p-6">
                    <h3 className="text-h3 text-emerald">{m.name}</h3>
                    <p className="text-eyebrow mt-1 text-coral">{m.role}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.text}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-ivory pb-24 md:pb-32">
        <div className="container-x">
          <Reveal>
            <a href="/join" className="group flex flex-col gap-4 rounded-2xl bg-coral p-8 text-white shadow-float transition-transform duration-500 hover:-translate-y-1 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="text-eyebrow text-white/70">There is a chair for you</p>
                <p className="mt-2 font-display text-3xl leading-tight md:text-4xl">Three of us is not enough. Apply, or write your own role.</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-coral">Join us <span className="transition-transform group-hover:translate-x-1">→</span></span>
            </a>
          </Reveal>
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
