"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StoryReader } from "@/components/home/StoryReader";
import { Reveal, RevealGroup, RevealItem, GrowRule } from "@/components/ui/Reveal";

const signs = [
  { when: "Day 1", what: "Her wedding ring feels a little tight." },
  { when: "A few days later", what: "A headache." },
  { when: "The next week", what: "The window blurs. She blinks — it's gone." },
  { when: "Two days later", what: "The baby has gone quiet." },
];

/** Section 2 — the problem, told as a story (ivory). */
export function Story() {
  const [reader, setReader] = useState<{ open: boolean; chapter?: number }>({ open: false });
  const openAt = (chapter?: number) => setReader({ open: true, chapter });
  const close = useCallback(() => setReader((r) => ({ ...r, open: false })), []);
  return (
    <section id="story" className="bg-ivory py-24 md:py-32">
      <StoryReader open={reader.open} chapter={reader.chapter} onClose={close} />
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow tone="coral">The problem</Eyebrow>
              <h2 className="text-h1 mt-5 text-emerald">Every sign looked ordinary.</h2>
              <p className="text-lead mt-6 text-muted">
                A mother feels one sign at home. A family member notices a second. A Community Health Worker hears a third.
                A clinic sees a fourth. They never meet in one place, in time.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 space-y-0">
              {signs.map((s, i) => (
                <RevealItem key={s.when}>
                  <button
                    type="button"
                    onClick={() => openAt(i + 1)}
                    title="Read what was really happening"
                    className="group flex w-full gap-5 py-4 text-left transition-transform duration-300 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
                  >
                    <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-emerald text-xs font-bold text-ivory transition-colors duration-300 group-hover:bg-coral">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-eyebrow text-muted">{s.when}</p>
                      <p className="mt-1 font-display text-xl text-ink md:text-2xl">{s.what}</p>
                    </div>
                  </button>
                  <GrowRule className="text-emerald" />
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2} className="mt-8 rounded-lg border-l-4 border-coral bg-coral-100/60 p-5">
              <p className="text-eyebrow text-coral">What was actually happening</p>
              <p className="mt-2 font-display text-2xl text-emerald">Preeclampsia.</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                Four ordinary signs. One dangerous, treatable condition — missed until it was severe.
              </p>
              <button type="button" onClick={() => openAt()} className="link-underline mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald">
                <BookOpen className="size-4" /> Read the whole week
              </button>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.1} className="relative pb-24 md:pb-28">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <figure className="group relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src="/images/mother-outdoors.jpg"
                    alt="A pregnant woman outdoors, holding her belly"
                    fill
                    sizes="(min-width: 768px) 30vw, 45vw"
                    className="object-cover object-[50%_25%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-emerald/0 transition-colors duration-500 group-hover:bg-emerald/15" />
                </figure>
                <figure className="group relative mt-10 aspect-[3/4] overflow-hidden rounded-xl md:mt-16">
                  <Image
                    src="/images/family-together.jpg"
                    alt="A family looking at a phone together"
                    fill
                    sizes="(min-width: 768px) 30vw, 45vw"
                    className="object-cover object-[50%_25%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-emerald/0 transition-colors duration-500 group-hover:bg-emerald/15" />
                </figure>
              </div>
              <button
                type="button"
                onClick={() => openAt()}
                aria-label="Read Aline’s whole story"
                className="group absolute bottom-0 left-1/2 w-[min(90%,380px)] -translate-x-1/2 text-left [perspective:1200px] focus-visible:outline-none"
              >
                <span className="relative block min-h-[150px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
                  <span className="absolute inset-0 block rounded-lg bg-midnight p-5 text-ivory shadow-float [backface-visibility:hidden]">
                    <span className="block font-display text-xl leading-snug md:text-2xl">“Babies rest before they’re born, dear. It’s a good sign.”</span>
                    <span className="mt-3 block text-xs text-ivory/60"> — what her aunt said. So she waited.</span>
                  </span>
                  <span className="absolute inset-0 block rounded-lg bg-coral p-5 text-white shadow-float [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="block text-eyebrow text-white/70">That’s what her aunt said.</span>
                    <span className="mt-2 block font-display text-xl leading-snug md:text-2xl">Here is what her body was saying.</span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold"><BookOpen className="size-4" /> Read the whole week ↗</span>
                  </span>
                </span>
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
