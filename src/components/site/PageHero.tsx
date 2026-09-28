"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/ui/TextReveal";
import { ImageReveal } from "@/components/ui/ImageReveal";

const ease = [0.16, 1, 0.3, 1] as const;

type Segment = string | { text: string; className?: string };

/**
 * Shared hero for the inner pages. The title unmasks word by word; the lead
 * rises out of a soft blur; the photo is wiped in from the bottom, settles out
 * of a zoom and then drifts as the reader scrolls on.
 *
 * Pass `title` as a string (or `segments` for a title with a coloured phrase)
 * to get the word reveal. A ReactNode title still works and gets a plain lift.
 */
export function PageHero({
  eyebrow,
  title,
  segments,
  lead,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title?: React.ReactNode;
  segments?: Segment[];
  lead?: string;
  image?: string;
  imageAlt?: string;
}) {
  const animatedTitle = segments ?? (typeof title === "string" ? [title] : null);

  return (
    <section className="relative overflow-hidden bg-ivory pb-16 pt-32 md:pb-20 md:pt-44">
      {/* soft colour field behind the hero – gives the wipe and blur something to play against */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-[radial-gradient(circle,rgb(46_139_112/0.14),transparent_65%)]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
      />
      <div className="container-x grid items-end gap-10 md:grid-cols-12">
        <div className={image ? "md:col-span-7" : "md:col-span-10"}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7, ease }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          {animatedTitle ? (
            <TextReveal as="h1" trigger="mount" delay={0.45} className="text-display mt-6 text-emerald" segments={animatedTitle} />
          ) : (
            <motion.h1
              className="text-display mt-6 text-emerald"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
            >
              {title}
            </motion.h1>
          )}
          {lead && (
            <motion.p
              className="text-lead mt-6 max-w-2xl text-muted"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.95, duration: 0.9, ease }}
            >
              {lead}
            </motion.p>
          )}
        </div>
        {image && (
          <motion.div
            className="md:col-span-5"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.8, duration: 1.1, ease }}
          >
            <ImageReveal from="bottom" parallax={40} delay={0.8} duration={1.2} className="aspect-[4/3] rounded-xl shadow-float md:aspect-[4/5]">
              <Image src={image} alt={imageAlt} fill priority quality={90} sizes="(min-width: 768px) 40vw, 92vw" className="object-cover object-[50%_25%]" />
            </ImageReveal>
          </motion.div>
        )}
      </div>
    </section>
  );
}
