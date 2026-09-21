"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";

const ease = [0.16, 1, 0.3, 1] as const;

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="bg-ivory pb-16 pt-32 md:pb-20 md:pt-44">
      <div className="container-x grid items-end gap-10 md:grid-cols-12">
        <div className={image ? "md:col-span-7" : "md:col-span-10"}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7, ease }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            className="text-display mt-6 text-emerald"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
          >
            {title}
          </motion.h1>
          {lead && (
            <motion.p
              className="text-lead mt-6 max-w-2xl text-muted"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease }}
            >
              {lead}
            </motion.p>
          )}
        </div>
        {image && (
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-float md:col-span-5 md:aspect-[4/5]"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.9, ease }}
          >
            <Image src={image} alt={imageAlt} fill priority quality={90} sizes="(min-width: 768px) 40vw, 92vw" className="object-cover object-[50%_25%]" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
