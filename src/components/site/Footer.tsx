"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
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
      <div className="container-x relative py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <h2 className="text-display max-w-[12ch]">{f.headline}</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="coral" size="lg" arrow>
                {f.startConversation}
              </Button>
              <Button href="/login?mode=signup" variant="light" size="lg">
                {f.createAccount}
              </Button>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-5 md:pt-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-eyebrow text-gold">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="link-underline text-[15px] text-ivory/75 hover:text-ivory">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-ivory/10 pt-8 md:mt-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
