"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";

export function ContactContent({ topic }: { topic?: string }) {
  const { t } = useLang();
  const c = t.contact;
  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={
          <>
            {c.hero.titlePre}<span className="text-coral">{c.hero.titleHighlight}</span>{c.hero.titleSuffix}
          </>
        }
        lead={c.hero.lead}
      />
      <section className="bg-ivory pb-24 md:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-emerald/5 md:p-10">
              <ContactForm defaultTopic={topic} />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-green-100 text-green"><Mail className="size-5" /></span>
                <div>
                  <p className="text-eyebrow text-muted">{c.emailLabel}</p>
                  <a href="mailto:patrice.iradukunda@aims.ac.rw" className="link-underline mt-1 inline-block font-semibold text-emerald">patrice.iradukunda@aims.ac.rw</a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-green-100 text-green"><Phone className="size-5" /></span>
                <div>
                  <p className="text-eyebrow text-muted">{c.phoneLabel}</p>
                  <a href="tel:+250788850439" className="link-underline mt-1 inline-block font-semibold text-emerald">+250 788 850 439</a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-green-100 text-green"><MapPin className="size-5" /></span>
                <div>
                  <p className="text-eyebrow text-muted">{c.whereLabel}</p>
                  <p className="mt-1 font-semibold text-emerald">{c.whereValue}</p>
                </div>
              </div>
              <div className="rounded-lg border-l-4 border-coral bg-coral-100/60 p-5 text-sm leading-relaxed text-ink/80">
                <strong className="text-emerald">{c.noticeBold}</strong>{c.noticeTextPre}<strong>{c.noticeNumber}</strong>{c.noticeTextSuffix}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
