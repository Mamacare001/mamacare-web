"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLang } from "@/components/providers/LanguageProvider";

function Word({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

/** Large statement whose words reveal as the user scrolls. */
export function Statement() {
  const { t } = useLang();
  const text = t.about.statement;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="container-x">
        <div ref={ref} className="mx-auto max-w-5xl">
          <p className="text-h1 text-emerald" aria-label={text}>
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1) / words.length + 0.05)]}>
                {w}
              </Word>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
