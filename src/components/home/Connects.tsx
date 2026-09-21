"use client";

import Image from "next/image";
import { Baby, Users, Stethoscope, HeartHandshake } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const people = [
  {
    icon: Baby,
    title: "Mother",
    text: "Shares symptoms and concerns in her own words — by chat, WhatsApp or SMS.",
    image: "/images/mother-home-phone.jpg",
    tone: "bg-coral-100 text-coral",
  },
  {
    icon: Users,
    title: "Family",
    text: "Notices changes at home and provides support between visits.",
    image: "/images/family-together.jpg",
    tone: "bg-gold-100 text-[#b8860b]",
  },
  {
    icon: HeartHandshake,
    title: "Community Health Worker",
    text: "Observes on home visits and shares key information with the clinic.",
    image: "/images/chw-visit.jpg",
    tone: "bg-green-100 text-green",
  },
  {
    icon: Stethoscope,
    title: "Healthcare provider",
    text: "Adds clinical data, reviews escalations and closes the loop.",
    image: "/images/provider-tablet.jpg",
    tone: "bg-violet-100 text-violet",
  },
];

/** Section 3 — the four voices → one picture (white). */
export function Connects() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <Eyebrow>Our insight</Eyebrow>
          <h2 className="text-h1 mt-5 text-emerald">One continuous picture of every pregnancy.</h2>
          <p className="text-lead mt-6 text-muted">
            The information already exists — it is just held by four different people. MamaCare brings it together into a
            single timeline that everyone caring for her can act on.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {people.map((p, i) => (
            <RevealItem key={p.title}>
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-ivory ring-1 ring-emerald/5 transition-shadow duration-300 hover:shadow-float"
                style={{ marginTop: i % 2 === 1 ? undefined : 0 }}
              >
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-emerald/0 transition-colors duration-500 group-hover:bg-emerald/15" />
                  <span
                    className={`absolute left-4 top-4 grid size-11 place-items-center rounded-full ${p.tone} shadow-soft`}
                  >
                    <p.icon className="size-5" aria-hidden />
                  </span>
                </figure>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-eyebrow text-muted">0{i + 1}</p>
                  <h3 className="text-h3 mt-2 text-emerald">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.15} className="mx-auto mt-14 flex max-w-2xl flex-col items-center text-center">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-green/20 animate-pulse-ring" aria-hidden />
            <Image src="/brand/mark.png" alt="" width={72} height={84} className="relative h-20 w-auto" />
          </div>
          <p className="mt-5 font-display text-2xl text-emerald md:text-3xl">
            Four voices. One early-warning signal.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
