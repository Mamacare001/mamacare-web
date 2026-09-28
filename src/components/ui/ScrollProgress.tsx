"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A hairline in the brand gradient that fills across the top as the reader moves down the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-coral via-gold to-green"
    />
  );
}
