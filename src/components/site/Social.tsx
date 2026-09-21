import { Mail } from "lucide-react";
import { siFacebook, siInstagram, siWhatsapp, siX, siYoutube } from "simple-icons";
import { cn } from "@/lib/cn";

/** Update these once the official MamaCare accounts exist. */
export const socials = [
  { label: "X (Twitter)", href: "https://x.com/mamacare_rw", path: siX.path },
  { label: "Instagram", href: "https://instagram.com/mamacare.rw", path: siInstagram.path },
  { label: "Facebook", href: "https://facebook.com/mamacare.rw", path: siFacebook.path },
  { label: "YouTube", href: "https://youtube.com/@mamacare_rw", path: siYoutube.path },
  { label: "WhatsApp", href: "https://wa.me/250780000000", path: siWhatsapp.path },
];

export function SocialLinks({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const btn =
    tone === "dark"
      ? "border-ivory/15 text-ivory/70 hover:border-coral hover:bg-coral hover:text-white"
      : "border-emerald/15 text-emerald hover:border-coral hover:bg-coral hover:text-white";
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)} aria-label="MamaCare on social media">
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className={cn("flex size-10 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-0.5", btn)}
          >
            <svg viewBox="0 0 24 24" className="size-[18px] fill-current" aria-hidden>
              <path d={s.path} />
            </svg>
          </a>
        </li>
      ))}
      <li>
        <a
          href="mailto:patrice.iradukunda@aims.ac.rw"
          aria-label="Email"
          title="Email"
          className={cn("flex size-10 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-0.5", btn)}
        >
          <Mail className="size-[18px]" />
        </a>
      </li>
    </ul>
  );
}
