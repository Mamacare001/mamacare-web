import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const columns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "For mothers", href: "/how-it-works#mothers" },
      { label: "For families", href: "/how-it-works#families" },
      { label: "For health workers", href: "/how-it-works#health-workers" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Research", href: "/research" },
      { label: "Team", href: "/about#team" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Safety & ethics", href: "/how-it-works#safety" },
      { label: "Consent", href: "/consent" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Emergency", href: "/emergency" },
      { label: "System status", href: "/status" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-midnight text-ivory">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="container-x relative py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <h2 className="text-display max-w-[12ch]">
              No warning sign should go unheard.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="coral" size="lg" arrow>
                Start a conversation
              </Button>
              <Button href="/login?mode=signup" variant="light" size="lg">
                Create an account
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
                <p className="mt-1 text-xs text-ivory/50">Connected for healthier pregnancies</p>
              </div>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-ivory/45">
              MamaCare is a decision-support tool. It does not diagnose and does not replace doctors, midwives or Community
              Health Workers. In an emergency, <Link href="/emergency" className="text-gold underline underline-offset-2">call 912</Link>.
            </p>
            <p className="text-xs text-ivory/45">© {new Date().getFullYear()} MamaCare · Kigali, Rwanda</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
