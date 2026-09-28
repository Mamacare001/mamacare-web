"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE } from "@/components/ui/Reveal";

type Edge = "bottom" | "top" | "left" | "right" | "none";

const CLIP: Record<Edge, string> = {
  bottom: "inset(100% 0 0 0)",
  top: "inset(0 0 100% 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  none: "inset(0 0 0 0)",
};

type Props = {
  /** Usually a `<Image fill />`; anything absolutely positioned to fill works. */
  children: React.ReactNode;
  /** Sizing, radius and shadow live here – the clip mask is applied inside so shadows survive. */
  className?: string;
  /** Which edge the photo is wiped in from. */
  from?: Edge;
  /** Pixels of vertical drift as the reader scrolls past. 0 disables. */
  parallax?: number;
  /** Extra settle-from-zoom on reveal. */
  zoom?: boolean;
  delay?: number;
  duration?: number;
  once?: boolean;
  /** Placeholder shimmer while the photo decodes. */
  shimmer?: boolean;
  /** Extra classes for the moving inner layer (e.g. hover scale via `group-hover:`). */
  innerClassName?: string;
};

/**
 * A photo that arrives with intent: wiped in behind a straight edge, settling
 * out of a slight zoom, then drifting gently upward as the page scrolls past.
 * A soft shimmer sits underneath until the image has decoded.
 */
export function ImageReveal({
  children,
  className,
  from = "bottom",
  parallax = 28,
  zoom = true,
  delay = 0,
  duration = 1.1,
  once = true,
  shimmer = true,
  innerClassName,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = reduce ? 0 : parallax;
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        className={cn("absolute inset-0 overflow-hidden rounded-[inherit]", shimmer && "shimmer")}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "0px 0px -12% 0px" }}
        variants={{
          hidden: { clipPath: reduce ? CLIP.none : CLIP[from] },
          show: { clipPath: CLIP.none, transition: { duration, ease: EASE, delay } },
        }}
      >
        {/* parallax layer – oversized vertically so the drift never shows an edge */}
        <motion.div className="absolute inset-x-0" style={{ y, top: -drift, bottom: -drift }}>
          <motion.div
            className={cn("absolute inset-0", innerClassName)}
            variants={{
              hidden: { scale: reduce ? 1 : zoom ? 1.18 : 1.06 },
              show: { scale: 1, transition: { duration: duration + 0.5, ease: EASE, delay } },
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Wrap anything to give it a scroll-linked vertical drift (depth between layers). */
export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : speed, reduce ? 0 : -speed]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
