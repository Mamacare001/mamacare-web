"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const audiences = [
  {
    id: "mothers",
    eyebrow: "For mothers",
    title: "Describe how you feel, in your own words.",
    text: "No forms, no medical language. Tell MamaCare what is happening — a headache, swelling, less movement — and it will ask the right follow-up questions and tell you what to do next. Core check-ins by SMS and WhatsApp are always free.",
    image: "/images/mother-home-phone.jpg",
    cta: "Start a check-in",
  },
  {
    id: "families",
    eyebrow: "For families",
    title: "You notice things she might not mention.",
    text: "A partner, a mother, a sister can report what they see — with her consent — so a sign noticed at home reaches the people who can act on it.",
    image: "/images/family-together.jpg",
    cta: "Support someone",
  },
  {
    id: "health-workers",
    eyebrow: "For CHWs & providers",
    title: "One timeline. No retyping. A closed loop.",
    text: "See every pregnancy in your caseload, review escalations, record visit observations in seconds and get feedback from the clinic on what happened next — the gap 100% of interviewed CHWs identified.",
    image: "/images/provider-tablet.jpg",
    cta: "Request access",
  },
];

export function Audiences() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-x space-y-24 md:space-y-32">
        {audiences.map((a, i) => (
          <div key={a.id} id={a.id} className="grid scroll-mt-28 items-center gap-10 md:grid-cols-12 md:gap-12">
            <Reveal className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft md:aspect-[5/4]">
                <Image
                  src={a.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 45vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-emerald/0 transition-colors duration-500 group-hover:bg-emerald/15" />
              </figure>
            </Reveal>
            <Reveal delay={0.1} className={`md:col-span-6 ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <Eyebrow>{a.eyebrow}</Eyebrow>
              <h2 className="text-h2 mt-5 text-emerald">{a.title}</h2>
              <p className="text-lead mt-5 text-muted">{a.text}</p>
              <div className="mt-8">
                <Button href="/login?mode=signup" variant="primary" arrow>
                  {a.cta}
                </Button>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
