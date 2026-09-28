"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Parallax } from "@/components/ui/ImageReveal";
import { useLang } from "@/components/providers/LanguageProvider";

/** Section 8 — large colour section (coral). */
export function CtaBand() {
  const { t } = useLang();
  const c = t.ctaBand;
  return (
    <section className="relative overflow-hidden bg-coral py-28 text-white md:py-40">
      <div className="grain absolute inset-0" aria-hidden />
      <Parallax speed={-90} className="absolute -right-32 -top-32" >
        <div className="size-[420px] rounded-full bg-gold/30 blur-3xl" aria-hidden />
      </Parallax>
      <Parallax speed={70} className="absolute -bottom-40 -left-24" >
        <div className="size-[360px] rounded-full bg-white/15 blur-3xl" aria-hidden />
      </Parallax>
      <div className="container-x relative text-center">
        <TextReveal as="h2" className="text-display mx-auto max-w-[16ch]" stagger={0.06} duration={1}>
          {c.heading}
        </TextReveal>
        <Reveal variant="scale" delay={0.5}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/login?mode=signup" variant="light" size="lg" arrow className="!text-coral">
              {c.primary}
            </Button>
            <Button href="/contact" variant="ghost" size="lg" className="!text-white ring-1 ring-white/40 hover:!bg-white/10">
              {c.secondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
