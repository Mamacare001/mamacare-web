"use client";

import { createContext, useContext } from "react";
import { motion, useReducedMotion, type Variants, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------
   MamaCare motion language
   One easing, one viewport rule, a handful of named moves. Every public
   page draws from this file so the whole site feels like one hand made it.
------------------------------------------------------------------- */

export const EASE = [0.16, 1, 0.3, 1] as const;
export const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

/**
 * up    – rises 36px and fades (the default, for body copy and small things)
 * fade  – opacity only
 * blur  – rises out of a soft blur (leads, quotes, big statements)
 * scale – settles down from 94% (cards, phone mocks, badges)
 * left / right – slides in from the side (alternating image/text rows)
 * clip  – wiped in from the bottom with a straight edge (rules, bands)
 * tilt  – tips up from a 3D lean, like a card being laid on a table
 */
export type RevealVariant = "up" | "fade" | "blur" | "scale" | "left" | "right" | "clip" | "tilt";

export function motionPair(
  variant: RevealVariant,
  distance: number,
  reduce: boolean,
): { hidden: TargetAndTransition; show: TargetAndTransition } {
  if (reduce) return { hidden: { opacity: 0 }, show: { opacity: 1 } };
  switch (variant) {
    case "fade":
      return { hidden: { opacity: 0 }, show: { opacity: 1 } };
    case "blur":
      return {
        hidden: { opacity: 0, y: distance * 0.6, filter: "blur(12px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      };
    case "scale":
      return { hidden: { opacity: 0, y: distance * 0.5, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1 } };
    case "left":
      return { hidden: { opacity: 0, x: -distance * 1.4 }, show: { opacity: 1, x: 0 } };
    case "right":
      return { hidden: { opacity: 0, x: distance * 1.4 }, show: { opacity: 1, x: 0 } };
    case "clip":
      return {
        hidden: { clipPath: "inset(100% 0 0 0)", y: distance * 0.4 },
        show: { clipPath: "inset(0% 0 0 0)", y: 0 },
      };
    case "tilt":
      return {
        hidden: { opacity: 0, y: distance, rotateX: -12, transformPerspective: 1000 },
        show: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000 },
      };
    default:
      return { hidden: { opacity: 0, y: distance }, show: { opacity: 1, y: 0 } };
  }
}

type Tag = "div" | "section" | "li" | "span" | "p" | "h1" | "h2" | "h3" | "figure" | "article" | "blockquote";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  /** travel distance in px for the moving variants */
  distance?: number;
  once?: boolean;
  as?: Tag;
  /** kept for backwards compatibility – prefer `distance` */
  y?: number;
};

/** Reveal an element when it enters the viewport, using one of the named moves. */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  duration = 0.9,
  distance,
  once = true,
  as = "div",
  y,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const { hidden, show } = motionPair(variant, distance ?? y ?? 36, !!reduce);
  const variants: Variants = {
    hidden,
    show: { ...show, transition: { duration, ease: EASE, delay } },
  };
  return (
    <Tag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ ...VIEWPORT, once }}
    >
      {children}
    </Tag>
  );
}

/* ---- Stagger groups ------------------------------------------------ */

const GroupCtx = createContext<{ variant: RevealVariant; distance: number; duration: number }>({
  variant: "up",
  distance: 32,
  duration: 0.8,
});

/**
 * Stagger container: wrap several <RevealItem /> children. Set `variant`
 * once here and every item inherits it (an item can still override).
 * `as` takes "ul"/"ol" so a semantic list stays a list.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  variant = "up",
  distance = 32,
  duration = 0.8,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  variant?: RevealVariant;
  distance?: number;
  duration?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const Tag = motion[as];
  return (
    <GroupCtx.Provider value={{ variant, distance, duration }}>
      <Tag
        className={cn(variant === "tilt" && "[perspective:1200px]", className)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {children}
      </Tag>
    </GroupCtx.Provider>
  );
}

export function RevealItem({
  children,
  className,
  variant,
  distance,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  distance?: number;
  as?: "div" | "li" | "article" | "figure" | "span";
}) {
  const reduce = useReducedMotion();
  const group = useContext(GroupCtx);
  const Tag = motion[as];
  const { hidden, show } = motionPair(variant ?? group.variant, distance ?? group.distance, !!reduce);
  return (
    <Tag
      className={className}
      variants={{ hidden, show: { ...show, transition: { duration: group.duration, ease: EASE } } }}
    >
      {children}
    </Tag>
  );
}

/** A 1px rule that grows from 0 → 100% width on view. */
export function GrowRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={cn("rule-grow", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    />
  );
}
