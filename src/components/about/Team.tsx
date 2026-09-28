"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";

const meta = [
  { name: "Patrice Iradukunda", photo: "/images/team/patrice.jpg", accent: "ring-emerald" },
  { name: "Donatien Iranshubije", photo: "/images/team/donatien.png", accent: "ring-coral" },
  { name: "Pascal Dukundane", photo: "/images/team/pascal.jpg", accent: "ring-gold" },
];

export function Team() {
  const { t } = useLang();
  const tm = t.about.team;
  const team = tm.members.map((m, i) => ({ ...m, ...meta[i] }));

  return (
    <>
      <section id="team" className="bg-ivory py-24 md:py-32">
        <div className="container-x">
          <div>
            <Reveal variant="fade" duration={0.6}><Eyebrow>{tm.eyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5 max-w-3xl text-emerald" delay={0.1}>{tm.heading}</TextReveal>
            <Reveal variant="blur" delay={0.35}>
            <p className="text-lead mt-5 max-w-2xl text-muted">{tm.lead}</p>
            </Reveal>
          </div>
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1} variant="tilt" distance={44} duration={0.95}>
            {team.map((m) => (
              <RevealItem key={m.name}>
                <article className="group h-full overflow-hidden rounded-lg bg-white ring-1 ring-emerald/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float">
                  <figure className="relative mx-auto size-48 overflow-hidden rounded-full ring-4 ring-white shadow-float md:size-52">
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
                <p className="text-eyebrow text-white/70">{tm.joinEyebrow}</p>
                <p className="mt-2 font-display text-3xl leading-tight md:text-4xl">{tm.joinTitle}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-coral">{tm.joinCta} <span className="transition-transform group-hover:translate-x-1">→</span></span>
            </a>
          </Reveal>
        </div>
      </section>
      <section id="research" className="relative overflow-hidden bg-midnight py-24 text-ivory md:py-32">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container-x relative">
          <div>
            <Reveal variant="fade" duration={0.6}><Eyebrow tone="gold">{tm.roadmapEyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5 max-w-3xl" delay={0.1}>{tm.roadmapHeading}</TextReveal>
          </div>
          <RevealGroup className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.12} variant="blur">
            {tm.milestones.map((m, i) => (
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
