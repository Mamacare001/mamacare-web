"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/cn";

const DARK_HERO_ROUTES = ["/"]; // routes whose hero is dark → light text over hero

export function Nav() {
  const pathname = usePathname();
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const onDark = DARK_HERO_ROUTES.includes(pathname) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setOpen(false));
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/how-it-works", label: t.nav.how },
    { href: "/partners", label: t.nav.partners },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled ? "bg-ivory/80 shadow-[0_1px_0_rgb(16_37_34/0.06),0_8px_30px_-16px_rgb(16_37_34/0.2)] backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <nav className="container-x flex h-[72px] items-center justify-between md:h-20" aria-label="Main">
          <Link href="/" className="flex items-center gap-2.5" aria-label="MamaCare home">
            <Image src="/brand/mark.png" alt="" width={40} height={46} priority className="h-10 w-auto" />
            <Image
              src={onDark ? "/brand/wordmark-white.png" : "/brand/wordmark.png"}
              alt="MamaCare"
              width={135}
              height={20}
              priority
              className="h-[18px] w-auto sm:h-5"
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className={cn(
                    "link-underline text-[15px] font-medium transition-colors",
                    onDark ? "text-ivory/85 hover:text-ivory" : "text-emerald/80 hover:text-emerald",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={toggle}
              className={cn(
                "inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-colors",
                onDark ? "text-ivory/85 hover:bg-white/10" : "text-emerald hover:bg-emerald/5",
              )}
              aria-label="Switch language"
            >
              <Globe className="size-4" aria-hidden />
              {lang === "en" ? "RW" : "EN"}
            </button>
            <Button href="/login" variant={onDark ? "light" : "secondary"} size="sm">
              {t.nav.signIn}
            </Button>
            <Button href="/login?mode=signup" variant="coral" size="sm" arrow>
              {t.nav.getStarted}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full md:hidden",
              onDark ? "text-ivory hover:bg-white/10" : "text-emerald hover:bg-emerald/5",
            )}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="size-6" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer ------------------------------------------------ */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[60] bg-midnight/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,380px)] flex-col bg-ivory p-6 shadow-float md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between">
                <Image src="/brand/logo-horizontal.png" alt="MamaCare" width={140} height={32} className="h-8 w-auto" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-11 items-center justify-center rounded-full text-emerald hover:bg-emerald/5"
                  aria-label="Close menu"
                >
                  <X className="size-6" />
                </button>
              </div>

              <ul className="mt-10 flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={l.href}
                      className={cn(
                        "block rounded-md px-3 py-3 font-display text-3xl text-emerald transition-colors hover:bg-emerald/5",
                        pathname === l.href && "text-coral",
                      )}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                <button
                  type="button"
                  onClick={toggle}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-emerald/15 text-sm font-semibold text-emerald"
                >
                  <Globe className="size-4" aria-hidden />
                  {lang === "en" ? "Kinyarwanda" : "English"}
                </button>
                <Button href="/login" variant="secondary" size="lg">
                  {t.nav.signIn}
                </Button>
                <Button href="/login?mode=signup" variant="coral" size="lg" arrow>
                  {t.nav.getStarted}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
