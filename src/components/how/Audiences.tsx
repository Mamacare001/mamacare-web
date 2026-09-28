"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/components/providers/LanguageProvider";

const meta = [
  { id: "mothers", image: "/images/mother-home-phone.jpg" },
  { id: "families", image: "/images/family-together.jpg" },
  { id: "health-workers", image: "/images/provider-tablet.jpg" },
];

export function Audiences() {
  const { t } = useLang();
  const audiences = t.how.audiences.map((a, i) => ({ ...a, ...meta[i] }));

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
                  className="object-cover object-[50%_25%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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
