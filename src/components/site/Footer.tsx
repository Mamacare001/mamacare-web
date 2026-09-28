"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem, GrowRule } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Parallax } from "@/components/ui/ImageReveal";
import { SocialLinks } from "@/components/site/Social";
import { useLang } from "@/components/providers/LanguageProvider";

const hrefs = [
  {
    links: [
      { href: "/how-it-works" },
      { href: "/how-it-works#mothers" },
      { href: "/how-it-works#families" },
      { href: "/how-it-works#health-workers" },
      { href: "/faq" },
    ],
  },
  {
    links: [
      { href: "/about" },
      { href: "/partners" },
      { href: "/research" },
      { href: "/about#team" },
      { href: "/join" },
      { href: "/contact" },
    ],
  },
  {
    links: [
      { href: "/how-it-works#safety" },
      { href: "/consent" },
      { href: "/privacy" },
      { href: "/terms" },
      { href: "/emergency" },
      { href: "/status" },
    ],
  },
];

export function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const columns = f.columns.map((col, i) => ({
    title: col.title,
    links: col.links.map((l, j) => ({ label: l.label, href: hrefs[i].links[j].href })),
  }));

  return (
    <footer className="relative overflow-hidden bg-midnight text-ivory">
      <div className="grain absolute inset-0" aria-hidden />
      {/* slow-moving colour fields give the dark footer depth as it scrolls into view */}
      <Parallax speed={-80} className="pointer-events-none absolute -right-40 -top-40" >
        <div className="size-[520px] rounded-full bg-[radial-gradient(circle,rgb(46_139_112/0.28),transparent_65%)]" aria-hidden />
      </Parallax>
      <Parallax speed={60} className="pointer-events-none absolute -bottom-48 -left-32" >
        <div className="size-[460px] rounded-full bg-[radial-gradient(circle,rgb(255_107_94/0.16),transparent_65%)]" aria-hidden />
      </Parallax>
      <div className="container-x relative py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <TextReveal as="h2" className="text-display max-w-[12ch]" stagger={0.06} duration={1}>
              {f.headline}
            </TextReveal>
            <Reveal variant="scale" delay={0.45} className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="coral" size="lg" arrow>
                {f.startConversation}
              </Button>
              <Button href="/login?mode=signup" variant="light" size="lg">
                {f.createAccount}
              </Button>
            </Reveal>
          </div>

          <RevealGroup className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-5 md:pt-4" variant="up" stagger={0.12} delay={0.2}>
            {columns.map((col) => (
              <RevealItem key={col.title}>
                <p className="text-eyebrow text-gold">{col.title}</p>
                <RevealGroup as="ul" className="mt-4 space-y-2.5" variant="left" distance={14} stagger={0.05} duration={0.6}>
                  {col.links.map((l) => (
                    <RevealItem as="li" key={l.label}>
                      <Link href={l.href} className="link-underline text-[15px] text-ivory/75 hover:text-ivory">
                        {l.label}
                      </Link>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-16 md:mt-24">
          <GrowRule className="text-ivory" />
          <Reveal variant="fade" delay={0.3} duration={1} className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Image src="/brand/mark.png" alt="" width={36} height={42} className="h-9 w-auto" />
              <div>
                <Image src="/brand/wordmark-white.png" alt="MamaCare" width={120} height={18} className="h-4 w-auto" />
                <p className="mt-1 text-xs text-ivory/50">{f.tagline}</p>
              </div>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-ivory/45">
              {f.disclaimerLead}
              <Link href="/emergency" className="text-gold underline underline-offset-2">{f.call912}</Link>.
            </p>
            <div className="flex flex-col gap-4 md:items-end">
              <SocialLinks />
              <p className="text-xs text-ivory/45">© {new Date().getFullYear()} {f.copyright}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
