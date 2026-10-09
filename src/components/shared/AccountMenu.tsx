"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  CircleHelp,
  Globe,
  LogOut,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

type Item = { href: string; icon: LucideIcon; label: string };

/**
 * The avatar in every app top bar opens this. On phones the sidebar – and
 * with it Sign out, Switch role and any way back to the public site – is
 * hidden, so this is the one place those always live, on every screen size.
 * Bottom sheet on small screens, dropdown on large.
 */
export function AccountMenu({
  name,
  subtitle,
  signOutAction,
  lang = "en",
  extraItems = [],
  dark = false,
}: {
  name: string;
  subtitle?: string;
  signOutAction: () => Promise<void>;
  lang?: "en" | "rw";
  extraItems?: Item[];
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const rw = lang === "rw";

  // portal target only exists on the client
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // close when the route changes (same pattern the site Nav uses)
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setOpen(false));
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const items: Item[] = [
    ...extraItems,
    { href: "/help", icon: CircleHelp, label: rw ? "Ubufasha" : "Help" },
    {
      href: "/switch-role",
      icon: ArrowLeftRight,
      label: rw ? "Hindura uruhare" : "Switch role",
    },
    {
      href: "/home",
      icon: Globe,
      label: rw ? "Subira ku rubuga rwa MamaRindwa" : "Back to MamaRindwa site",
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={rw ? "Konti yawe" : "Your account"}
        className={cn(
          "grid size-9 place-items-center rounded-full text-xs font-bold transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green",
          dark ? "bg-gold text-midnight" : "bg-emerald text-ivory",
        )}
      >
        {name.slice(0, 1).toUpperCase()}
      </button>

      {/* Portalled to <body>: the app header's backdrop-filter would otherwise
          become the containing block for these fixed layers. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-[60] bg-midnight/40 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={rw ? "Konti yawe" : "Your account"}
                  className="fixed inset-x-0 bottom-0 z-[70] rounded-t-2xl bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-float sm:inset-auto sm:right-4 sm:top-16 sm:w-72 sm:rounded-2xl sm:p-2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <div
                    className="mx-auto mb-3 h-1 w-10 rounded-full bg-emerald/15 sm:hidden"
                    aria-hidden
                  />
                  <div className="flex items-center gap-3 px-2 py-2">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald text-sm font-bold text-ivory"
                      aria-hidden
                    >
                      {name.slice(0, 1).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-emerald">
                        {name}
                      </p>
                      {subtitle && (
                        <p className="truncate text-xs text-muted">
                          {subtitle}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close"
                      className="grid size-8 place-items-center rounded-full text-muted hover:bg-emerald/5 sm:hidden"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <ul className="mt-1 border-t border-emerald/10 pt-1">
                    {items.map((i) => (
                      <li key={i.href}>
                        <Link
                          href={i.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-medium text-ink hover:bg-emerald/5 hover:text-emerald sm:py-2.5 sm:text-sm"
                        >
                          <i.icon className="size-4 text-emerald" aria-hidden />{" "}
                          {i.label}
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-emerald/10 pt-1">
                      <form action={signOutAction}>
                        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[15px] font-semibold text-coral hover:bg-coral-100/60 sm:py-2.5 sm:text-sm">
                          <LogOut className="size-4" aria-hidden />{" "}
                          {rw ? "Sohoka" : "Sign out"}
                        </button>
                      </form>
                    </li>
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
