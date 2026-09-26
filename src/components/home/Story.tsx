"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Mic, Play } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StoryReader } from "@/components/home/StoryReader";
import { Reveal, RevealGroup, RevealItem, GrowRule } from "@/components/ui/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";

/** A heartbeat trace that draws itself, then flattens for a breath before starting again. */
function Heartbeat() {
  const d = "M0 40 H120 L132 40 L140 14 L150 66 L160 40 H300 L312 40 L320 18 L330 62 L340 40 H520 L532 40 L540 20 L550 60 L560 40 H760";
  return (
    <svg viewBox="0 0 760 80" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-1/2 h-20 w-full -translate-y-1/2 opacity-40" aria-hidden>
      <path d={d} fill="none" stroke="rgb(248 247 242 / 0.15)" strokeWidth="1.5" />
      <path d={d} fill="none" stroke="#FF6B5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="[stroke-dasharray:0.25_1] [animation:ecg_4s_linear_infinite]" />
    </svg>
  );
}

/** Section 2 — the problem, told as a story (ivory). */
export function Story() {
  const { t } = useLang();
  const s = t.story;
  const [reader, setReader] = useState<{ open: boolean; chapter?: number; mode?: "pitch" | "read" }>({ open: false });
  const openAt = (chapter?: number, mode: "pitch" | "read" = "pitch") => setReader({ open: true, chapter, mode });
  const close = useCallback(() => setReader((r) => ({ ...r, open: false })), []);
  return (
    <section id="story" className="bg-ivory py-24 md:py-32">
      <StoryReader open={reader.open} chapter={reader.chapter} mode={reader.mode} onClose={close} />
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow tone="coral">{s.eyebrow}</Eyebrow>
              <h2 className="text-h1 mt-5 text-emerald">{s.heading}</h2>
              <p className="text-lead mt-6 text-muted">{s.lead}</p>
            </Reveal>

            <RevealGroup className="mt-10 space-y-0">
              {s.signs.map((sign, i) => (
                <RevealItem key={sign.when}>
                  <button
                    type="button"
                    onClick={() => openAt(i + 1, "read")}
                    title={s.readAria}
                    className="group flex w-full gap-5 py-4 text-left transition-transform duration-300 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
                  >
                    <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-emerald text-xs font-bold text-ivory transition-colors duration-300 group-hover:bg-coral">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-eyebrow text-muted">{sign.when}</p>
                      <p className="mt-1 font-display text-xl text-ink md:text-2xl">{sign.what}</p>
                    </div>
                  </button>
                  <GrowRule className="text-emerald" />
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2} className="mt-8 rounded-lg border-l-4 border-coral bg-coral-100/60 p-5">
              <p className="text-eyebrow text-coral">{s.diagnosisLabel}</p>
              <p className="mt-2 font-display text-2xl text-emerald">{s.diagnosisName}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{s.diagnosisText}</p>
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
                aria-label={s.readWholeAria}
                className="group absolute bottom-0 left-1/2 w-[min(90%,380px)] -translate-x-1/2 text-left [perspective:1200px] focus-visible:outline-none"
              >
                <span className="relative block min-h-[150px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
                  <span className="absolute inset-0 block rounded-lg bg-midnight p-5 text-ivory shadow-float [backface-visibility:hidden]">
                    <span className="block font-display text-xl leading-snug md:text-2xl">{s.quote}</span>
                    <span className="mt-3 block text-xs text-ivory/60"> {s.quoteAttribution}</span>
                  </span>
                  <span className="absolute inset-0 block rounded-lg bg-coral p-5 text-white shadow-float [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="block text-eyebrow text-white/70">{s.flipFront}</span>
                    <span className="mt-2 block font-display text-xl leading-snug md:text-2xl">{s.flipBack}</span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold"><Mic className="size-4" /> {s.flipCta}</span>
                  </span>
                </span>
              </button>
            </Reveal>

            {/* The invitation — a heartbeat that draws itself, and a single button. It never says what is behind it. */}
            <Reveal delay={0.2} className="mt-8">
              <button
                type="button"
                onClick={() => openAt(undefined, "pitch")}
                className="group relative block w-full overflow-hidden rounded-xl bg-emerald p-6 text-left text-ivory shadow-float transition-transform duration-500 hover:-translate-y-1 md:p-8"
              >
                <Heartbeat />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-eyebrow text-gold">{s.inviteEyebrow}</p>
                    <p className="mt-2 font-display text-2xl leading-snug md:text-3xl">{s.inviteTitle1}<br />{s.inviteTitle2}</p>
                    <p className="mt-2 text-sm text-ivory/70">{s.inviteText}</p>
                  </div>
                  <span className="relative grid size-16 shrink-0 place-items-center rounded-full bg-coral text-white shadow-float transition-transform duration-500 group-hover:scale-110">
                    <span className="absolute inset-0 animate-ping rounded-full bg-coral/60 [animation-duration:2.2s]" aria-hidden />
                    <span className="absolute -inset-2 rounded-full border border-coral/40 [animation:pulse-ring_2.2s_ease-out_infinite]" aria-hidden />
                    <Play className="relative ml-1 size-7" />
                  </span>
                </div>
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
