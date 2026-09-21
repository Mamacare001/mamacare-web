"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/components/providers/LanguageProvider";

/** Mobile-only contextual CTA that appears after the hero and hides near the footer. */
export function StickyCta() {
  const pathname = usePathname();
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = y + window.innerHeight > document.body.scrollHeight - 560;
      setVisible(y > window.innerHeight * 0.7 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname.startsWith("/login") || pathname.startsWith("/dashboard")) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-4 bottom-4 z-40 md:hidden"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 rounded-full bg-midnight/95 p-2 pl-4 text-ivory shadow-float backdrop-blur">
            <MessageCircle className="size-5 text-gold" aria-hidden />
            <p className="flex-1 text-sm font-medium">{t.common.emergency}</p>
            <Button href="/login?mode=signup" variant="coral" size="sm" arrow>
              {t.hero.ctaPrimary}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
