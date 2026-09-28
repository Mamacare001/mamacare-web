"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { isMarketingPath } from "@/components/site/Chrome";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Page transition. On the marketing site an emerald curtain carrying the
 * MamaCare mark lifts off the new page (top edge first, so the headline is the
 * first thing to appear) while the content settles up into place.
 *
 * The curtain is painted by CSS in the server HTML, so it is on screen from the
 * very first frame; it starts lifting once React has mounted. On a fast
 * connection that is a 0.9s brand moment; on a slow phone it is a branded
 * loading screen instead of a blank page. `prefers-reduced-motion` removes it
 * entirely (globals.css). App routes keep a bare, fast fade – a health worker
 * moving between screens shouldn't wait on theatre.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const curtain = isMarketingPath(pathname);
  const [lift, setLift] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setLift(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {curtain && (
        <div aria-hidden className={cn("route-curtain", lift && "is-lifting")}>
          {/* eslint-disable-next-line @next/next/no-img-element -- must paint before hydration, no optimisation wrapper */}
          <img src="/brand/mark.png" alt="" width={56} height={65} className="route-curtain__mark" />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: curtain ? 28 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: curtain ? 0.8 : 0.35, ease, delay: curtain ? 0.25 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}
