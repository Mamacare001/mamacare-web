import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Partner with MamaCare, join the pilot, or collaborate on research.",
};

type Search = Promise<{ topic?: string }>;

export default async function ContactPage({ searchParams }: { searchParams: Search }) {
  const { topic } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s build something <span className="text-coral">meaningful</span>.
          </>
        }
        lead="Clinical partners, researchers, CHW cooperatives, insurers and funders — we would love to talk."
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
                  <p className="text-eyebrow text-muted">Email</p>
                  <a href="mailto:patrice.iradukunda@aims.ac.rw" className="link-underline mt-1 inline-block font-semibold text-emerald">patrice.iradukunda@aims.ac.rw</a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-green-100 text-green"><Phone className="size-5" /></span>
                <div>
                  <p className="text-eyebrow text-muted">Phone</p>
                  <a href="tel:+250788850439" className="link-underline mt-1 inline-block font-semibold text-emerald">+250 788 850 439</a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-green-100 text-green"><MapPin className="size-5" /></span>
                <div>
                  <p className="text-eyebrow text-muted">Where</p>
                  <p className="mt-1 font-semibold text-emerald">Kigali, Rwanda</p>
                </div>
              </div>
              <div className="rounded-lg border-l-4 border-coral bg-coral-100/60 p-5 text-sm leading-relaxed text-ink/80">
                <strong className="text-emerald">This form is not for medical emergencies.</strong> If you or someone near you is in
                danger, call <strong>912</strong> or go to the nearest health facility now.
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
