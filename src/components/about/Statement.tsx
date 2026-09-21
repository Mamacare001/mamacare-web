"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "We believe the information needed to keep a mother safe already exists. It lives with her, her family, her Community Health Worker and her clinic. Our job is to connect it --- in time.";

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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="container-x">
        <div ref={ref} className="mx-auto max-w-5xl">
          <p className="text-h1 text-emerald" aria-label={TEXT}>
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
