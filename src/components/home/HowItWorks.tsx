"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MessageSquareText, Brain, Gauge, ClipboardCheck, BellRing } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const steps = [
  {
    n: "01",
    title: "Speak",
    icon: MessageSquareText,
    text: "In Kinyarwanda or English — by web, app, WhatsApp or SMS. Text, voice or a photo.",
    image: "/images/chat-on-phone.jpg",
    accent: "text-green",
  },
  {
    n: "02",
    title: "Understand",
    icon: Brain,
    text: "A language model listens, asks useful follow-up questions and turns the conversation into structured health information.",
    image: "/images/mother-home-phone.jpg",
    accent: "text-violet",
  },
  {
    n: "03",
    title: "Assess",
    icon: Gauge,
    text: "A medically reviewed risk model weighs symptoms, pregnancy stage, history, measurements and what CHWs and clinicians have observed.",
    image: "/images/provider-tablet.jpg",
    accent: "text-violet",
  },
  {
    n: "04",
    title: "Guide",
    icon: ClipboardCheck,
    text: "Clinical rules decide the next step: safe information, a recommendation to contact a professional, or an escalation.",
    image: "/images/telehealth-call.jpg",
    accent: "text-green",
  },
  {
    n: "05",
    title: "Act",
    icon: BellRing,
    text: "The right person is alerted through the right care pathway — and the loop is closed back to the CHW.",
    image: "/images/chw-visit.jpg",
    accent: "text-coral",
  },
];

/** Section 4 — interactive list; hovering/focusing a step swaps the large visual (ivory). */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow tone="violet">How it works</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">From conversation to action.</h2>
          </div>
          <p className="max-w-md text-muted md:text-right">
            <span className="font-semibold text-emerald">The language model understands.</span> A risk model evaluates.
            Clinical rules guide the action.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <ol className="lg:col-span-6" role="list">
            {steps.map((s, i) => (
              <li key={s.n}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={cn(
                    "group flex w-full items-start gap-5 border-t border-emerald/10 py-6 text-left transition-colors md:py-7",
                    active === i ? "text-emerald" : "text-ink/60 hover:text-emerald",
                  )}
                >
                  <span className={cn("mt-1.5 font-mono text-sm tabular-nums", active === i ? s.accent : "text-muted")}>
                    {s.n}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center justify-between gap-4">
                      <span className="font-display text-3xl md:text-4xl">{s.title}</span>
                      <ArrowUpRight
                        className={cn(
                          "size-6 shrink-0 transition-all duration-200",
                          active === i ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:opacity-60",
                        )}
                        aria-hidden
                      />
                    </span>
                    <AnimatePresence initial={false}>
                      {active === i && (
                        <motion.span
                          key="text"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="block overflow-hidden"
                        >
                          <span className="block max-w-md pt-3 text-[15px] leading-relaxed text-muted">{s.text}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              </li>
            ))}
            <li className="border-t border-emerald/10 pt-8">
              <Button href="/how-it-works" variant="primary" arrow>
                Explore the full flow
              </Button>
            </li>
          </ol>

          <div className="relative lg:col-span-6">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-xl shadow-float sm:aspect-[5/4] lg:aspect-[4/5]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={current.image}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={current.image} alt="" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover object-[50%_25%]" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-lg bg-ivory/95 p-4 text-emerald shadow-soft backdrop-blur">
                <span className={cn("grid size-10 place-items-center rounded-full bg-emerald/5", current.accent)}>
                  <current.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-eyebrow text-muted">Step {current.n}</p>
                  <p className="font-display text-xl">{current.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
