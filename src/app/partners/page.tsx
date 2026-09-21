import type { Metadata } from "next";
import Image from "next/image";
import { Building2, ShieldCheck, FlaskConical, HeartHandshake, BarChart3, Lock, Users, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Partners",
  description: "How the Ministry of Health, insurers, NGOs and research institutions work with MamaCare.",
};

const partners = [
  {
    icon: Building2,
    title: "Ministry of Health & RBC",
    who: "District health teams, RBC, health centres",
    gets: ["An early-warning layer on top of e-Ubuzima and the CHW network — not a parallel system", "Escalation and time-to-care data by district, sector and facility", "A documented CHW-to-clinic feedback loop, the gap 100% of interviewed CHWs identified"],
    gives: "Pilot districts, facility access, clinical reviewers, and a pathway to national scale.",
    tone: "bg-green-100 text-green",
  },
  {
    icon: ShieldCheck,
    title: "Insurers",
    who: "RSSB, Mutuelle de Santé, private insurers",
    gets: ["A consent-based care-management list: which members need follow-up, before the emergency claim", "Aggregate outcomes for covered lives — escalations reaching care within 24 h, avoided emergency admissions", "Never individual risk scores for pricing or underwriting. Care sees individuals; pricing sees aggregates."],
    gives: "A per-covered-life partnership funded by reduced emergency claims.",
    tone: "bg-gold-100 text-[#8a6a10]",
  },
  {
    icon: HeartHandshake,
    title: "NGOs & CHW cooperatives",
    who: "Maternal-health programmes, CHW cooperatives, community organisations",
    gets: ["Tools their CHWs already understand: a caseload sorted by risk, a visit form, a referral that gets answered", "Training material in Kinyarwanda, offline-tolerant mobile app", "Programme-level dashboards without touching individual records"],
    gives: "Field presence, CHW training capacity, and trusted relationships with mothers.",
    tone: "bg-coral-100 text-coral",
  },
  {
    icon: FlaskConical,
    title: "Research institutions",
    who: "Universities, AIMS, public-health institutes",
    gets: ["Ethics-approved, de-identified longitudinal maternal-health data", "Co-authorship on validation studies of multilingual clinical AI", "A live platform to test risk models and Kinyarwanda language understanding responsibly"],
    gives: "Clinical validation design, statistical rigour, and independent evaluation of outcomes.",
    tone: "bg-violet-100 text-violet",
  },
];

const principles = [
  { icon: Lock, title: "Consent first", text: "A mother decides who is linked to her record. Partner access is opt-in, logged and revocable." },
  { icon: BarChart3, title: "Aggregates for payers", text: "Insurers and analysts see de-identified figures with a minimum cell size of 20. No names, no scores." },
  { icon: Users, title: "Humans stay in charge", text: "Every action MamaCare recommends passes through medically reviewed rules and a named health worker." },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title={
          <>
            We ride the network Rwanda <span className="text-coral">already built</span>.
          </>
        }
        lead="MamaCare complements e-Ubuzima and the 45,000-strong Community Health Worker network. Here is what each kind of partner gets, and what we ask in return."
        image="/images/chw-visit.jpg"
        imageAlt="A Community Health Worker with a pregnant woman"
      />

      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Eyebrow>Who we work with</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">Four kinds of partner. One shared incentive: fewer emergencies.</h2>
          </Reveal>
          <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2" stagger={0.1}>
            {partners.map((p) => (
              <RevealItem key={p.title}>
                <article className="flex h-full flex-col rounded-lg bg-ivory p-7 ring-1 ring-emerald/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float md:p-9">
                  <div className="flex items-center gap-4">
                    <span className={`grid size-12 place-items-center rounded-full ${p.tone}`}>
                      <p.icon className="size-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-h3 text-emerald">{p.title}</h3>
                      <p className="text-sm text-muted">{p.who}</p>
                    </div>
                  </div>
                  <p className="text-eyebrow mt-7 text-green">What you get</p>
                  <ul className="mt-3 space-y-2.5">
                    {p.gets.map((g) => (
                      <li key={g} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" aria-hidden />
                        {g}
                      </li>
                    ))}
                  </ul>
                  <p className="text-eyebrow mt-6 text-coral">What we ask</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.gives}</p>
                  <div className="mt-auto pt-7">
                    <Button href={`/contact?topic=partnership`} variant="ghost" size="sm" arrow>
                      Talk to us
                    </Button>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative overflow-hidden bg-midnight py-24 text-ivory md:py-32">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow tone="gold">How partnerships stay safe</Eyebrow>
            <h2 className="text-h1 mt-5">Care sees individuals. Payment sees aggregates.</h2>
            <p className="text-lead mt-6 text-ivory/70">
              This line is written into every data-sharing agreement, and enforced in the platform, not just on paper.
            </p>
          </Reveal>
          <RevealGroup className="grid gap-4 lg:col-span-7" stagger={0.1}>
            {principles.map((p) => (
              <RevealItem key={p.title}>
                <div className="flex gap-5 rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-midnight">
                    <p.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ivory/70">{p.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-x grid items-center gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <Eyebrow>Where we are</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">Pre-prototype today. A two-district pilot next.</h2>
            <ol className="mt-8 space-y-5">
              {[
                ["Months 1–6", "Prototype build and clinical validation with midwife and CHW review."],
                ["Months 7–12", "Two-district pilot: ~5,000 mothers, ~200 CHWs, 5 facilities, under ethics approval."],
                ["Months 13–18", "Independent evaluation, refinement, first insurer and research partnerships."],
              ].map(([when, what], i) => (
                <li key={when} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald text-xs font-bold text-ivory">{i + 1}</span>
                  <div>
                    <p className="text-eyebrow text-coral">{when}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{what}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact?topic=pilot" variant="coral" arrow>
                Join the pilot
              </Button>
              <Button href="/research" variant="secondary">
                Research & validation
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-float">
              <Image src="/images/provider-tablet.jpg" alt="A clinician reviewing a case on a tablet" fill sizes="(min-width: 768px) 45vw, 92vw" className="object-cover object-[50%_25%]" />
            </figure>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
