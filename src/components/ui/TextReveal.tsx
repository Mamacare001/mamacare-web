"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE, VIEWPORT } from "@/components/ui/Reveal";

type Line = string | { text: string; className?: string };

type Props = {
  /** Plain text. For a multi-line headline (or one with a coloured line) pass `lines` instead. */
  children?: string;
  /** Each entry becomes its own line (block). */
  lines?: Line[];
  /** Entries flow inline on one line – for a headline with a coloured phrase in the middle. */
  segments?: Line[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** "mount" for above-the-fold headlines, "view" for anything the reader scrolls to. */
  trigger?: "mount" | "view";
  delay?: number;
  stagger?: number;
  duration?: number;
  /** "word" masks each word; "line" masks each line as one piece (calmer, for long headings). */
  by?: "word" | "line";
};

/**
 * Headline reveal: every word (or line) rises out of its own mask, one after
 * another, the way premium editorial sites introduce a title. Screen readers
 * get the plain text once; the animated fragments are hidden from them.
 */
export function TextReveal({
  children,
  lines,
  segments,
  as = "h2",
  className,
  trigger = "view",
  delay = 0,
  stagger = 0.045,
  duration = 0.9,
  by = "word",
}: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const source = lines ?? segments;
  const items: { text: string; className?: string }[] = source
    ? source.map((l) => (typeof l === "string" ? { text: l } : l))
    : [{ text: children ?? "" }];
  const plain = items.map((l) => l.text).join(lines ? " " : "");
  const block = !!lines && items.length > 1;

  const piece = {
    hidden: reduce ? { opacity: 0 } : { y: "115%", opacity: 0, rotate: 1.5 },
    show: { y: "0%", opacity: 1, rotate: 0, transition: { duration, ease: EASE } },
  };

  const trig =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: VIEWPORT };

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      {...trig}
      variants={{ hidden: {}, show: { transition: { staggerChildren: by === "line" ? stagger * 3 : stagger, delayChildren: delay } } }}
    >
      <span className="sr-only">{plain}</span>
      {items.map((line, li) => {
        const parts = by === "line" ? [line.text.trim()] : line.text.split(/\s+/).filter(Boolean);
        const next = items[li + 1];
        const gap = !block && next && (/\s$/.test(line.text) || /^\s/.test(next.text)) ? " " : null;
        return (
          <span key={li} className={cn(block ? "block" : "inline", line.className)} aria-hidden>
            {parts.map((w, wi) => (
              <span key={wi}>
                <span className="inline-block overflow-hidden align-bottom [padding-block:0.16em] [margin-block:-0.16em]">
                  <motion.span className="inline-block origin-bottom-left will-change-transform" variants={piece}>
                    {w}
                  </motion.span>
                </span>
                {wi < parts.length - 1 ? " " : null}
              </span>
            ))}
            {gap}
          </span>
        );
      })}
    </Tag>
  );
}
