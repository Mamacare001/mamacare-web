"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const slides = [
  {
    n: "01",
    title: "Our beginning",
    text: "A sister's ordinary symptoms --- a tight ring, a headache, a blurred window --- turned out to be preeclampsia, missed until it was severe. That story is why MamaCare exists.",
    image: "/images/mother-outdoors.jpg",
  },
  {
    n: "02",
    title: "Listening first",
    text: "Before writing code we spoke with pregnant women, family members, Community Health Workers and midwives across five facilities in Northern and Western Province.",
    image: "/images/chw-visit.jpg",
  },
  {
    n: "03",
    title: "What we learned",
    text: "The gap is not awareness or effort. It is that no one holds the full picture --- and the CHW-to-clinic feedback loop is where warnings most often go quiet.",
    image: "/images/provider-tablet.jpg",
  },
  {
    n: "04",
    title: "Where we are going",
    text: "A clinically validated prototype, an ethics-approved two-district pilot, and a platform that complements Rwanda's existing health systems rather than competing with them.",
    image: "/images/telehealth-call.jpg",
  },
];

const ease = [0.65, 0, 0.35, 1] as const;

export function StorySlider() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const go = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i + d + slides.length) % slides.length);
    },
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const s = slides[index];

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="text-h1 mt-5 max-w-3xl text-emerald">Built from the ground up, with the people it serves.</h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-float lg:col-span-8 lg:aspect-[16/9]">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={s.image}
                custom={dir}
                initial={{ x: dir > 0 ? "8%" : "-8%", opacity: 0, scale: 1.03 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: dir > 0 ? "-8%" : "8%", opacity: 0 }}
                transition={{ duration: 0.7, ease }}
                className="absolute inset-0"
              >
                <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-4 flex gap-1.5" aria-hidden>
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-gold" : "w-3 bg-white/60"}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between lg:col-span-4">
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-mono text-sm text-coral">{s.n} --- </p>
                  <h3 className="text-h2 mt-2 text-emerald">{s.title}</h3>
                  <p className="text-lead mt-4 text-muted">{s.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="grid size-12 place-items-center rounded-full border border-emerald/15 text-emerald transition-colors hover:bg-emerald hover:text-ivory"
                aria-label="Previous"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="grid size-12 place-items-center rounded-full border border-emerald/15 text-emerald transition-colors hover:bg-emerald hover:text-ivory"
                aria-label="Next"
              >
                <ArrowRight className="size-5" />
              </button>
              <span className="ml-2 font-mono text-sm text-muted">
                {index + 1} / {slides.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
