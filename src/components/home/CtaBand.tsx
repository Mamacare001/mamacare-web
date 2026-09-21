"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Section 8 — large colour section (coral). */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-coral py-28 text-white md:py-40">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="absolute -right-32 -top-32 size-[420px] rounded-full bg-gold/30 blur-3xl" aria-hidden />
      <div className="container-x relative text-center">
        <Reveal>
          <h2 className="text-display mx-auto max-w-[16ch]">Let’s make sure the warning is not missed.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/login?mode=signup" variant="light" size="lg" arrow className="!text-coral">
              Get started
            </Button>
            <Button href="/contact" variant="ghost" size="lg" className="!text-white ring-1 ring-white/40 hover:!bg-white/10">
              Partner with us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
