import type { Metadata } from "next";
import { FileText, CheckCircle2, Clock, Circle, Database, Scale, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Research & validation",
  description: "MamaCare's research agenda, validation status, ethics approvals and how to request data.",
};

type Status = "done" | "active" | "planned";
const statusUi: Record<Status, { icon: typeof CheckCircle2; label: string; cls: string }> = {
  done: { icon: CheckCircle2, label: "Complete", cls: "bg-green-100 text-green" },
  active: { icon: Clock, label: "In progress", cls: "bg-gold-100 text-[#8a6a10]" },
  planned: { icon: Circle, label: "Planned", cls: "bg-ivory-200 text-muted" },
};

const milestones: { title: string; text: string; status: Status }[] = [
  { title: "User-discovery interviews", text: "20 interviews across 5 facilities in Northern and Western Province: 9 pregnant women, 2 family members, 5 CHWs, 4 midwives.", status: "done" },
  { title: "Clinical rule set v0", text: "Danger-sign criteria and escalation thresholds drafted from WHO and Rwanda ANC guidance, for midwife review.", status: "active" },
  { title: "Kinyarwanda language evaluation", text: "Benchmark of symptom extraction and follow-up questions on Kinyarwanda conversations, reviewed by native speakers.", status: "active" },
  { title: "Ethics review (RNEC)", text: "Protocol for the two-district pilot, consent materials in Kinyarwanda, data-protection impact assessment.", status: "planned" },
  { title: "Two-district pilot", text: "~5,000 mothers, ~200 CHWs, 5 facilities. Primary outcome: proportion of high-risk flags reaching a facility within 24 hours.", status: "planned" },
  { title: "Risk-model development", text: "Learned risk model trained on de-identified pilot data, evaluated against the rules-only baseline and for bias across districts.", status: "planned" },
  { title: "Independent evaluation", text: "External evaluation of outcomes, safety events and CHW workload, published openly.", status: "planned" },
];

const questions = [
  { area: "Maternal-risk prediction", q: "Can longitudinal signals from mother, family, CHW and clinic predict escalation-worthy risk earlier than facility-only data?" },
  { area: "Multilingual healthcare AI", q: "How reliably can a language model extract clinical signals from Kinyarwanda conversations, and where does it fail?" },
  { area: "Human + AI decision support", q: "Does an interpretable risk score plus medically reviewed rules improve CHW referral decisions without over-referral?" },
  { area: "Health-system integration", q: "What closes the CHW-to-clinic feedback loop in practice, and does closing it change outcomes?" },
  { area: "Responsible AI in Rwanda", q: "What consent, audit and governance model keeps mothers in control and partners accountable?" },
];

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research & validation"
        title={
          <>
            Built with scientific and clinical validation <span className="text-violet">from the beginning</span>.
          </>
        }
        lead="MamaCare is a research and technology project as much as a product. This page tracks what we have validated, what we are testing, and how researchers can work with us."
      />

      <section className="bg-white py-20 md:py-24">
        <div className="container-x grid gap-8 sm:grid-cols-3">
          {[
            { n: 20, suffix: "", label: "field interviews completed" },
            { n: 5, suffix: "", label: "facilities across two provinces" },
            { n: 0, suffix: "", label: "clinical claims made without validation" },
          ].map((s) => (
            <Reveal key={s.label} className="border-t border-emerald/10 pt-6">
              <p className="font-display text-6xl text-emerald">
                <CountUp to={s.n} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow tone="violet">Validation status</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">Where we are, honestly.</h2>
            <p className="text-lead mt-5 text-muted">
              This is early problem discovery, not clinical validation. We update this list as milestones move.
            </p>
          </Reveal>
          <RevealGroup className="lg:col-span-8" stagger={0.06}>
            {milestones.map((m, i) => {
              const s = statusUi[m.status];
              return (
                <RevealItem key={m.title}>
                  <div className="flex gap-5 border-t border-emerald/10 py-6">
                    <span className="mt-0.5 font-mono text-sm text-muted">0{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-display text-2xl text-emerald">{m.title}</h3>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${s.cls}`}>
                          <s.icon className="size-3.5" aria-hidden /> {s.label}
                        </span>
                      </div>
                      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{m.text}</p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Eyebrow>Research questions</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">Five questions we want to answer with partners.</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2" stagger={0.08}>
            {questions.map((q, i) => (
              <RevealItem key={q.area} className={i === 0 ? "md:col-span-2" : ""}>
                <div className="h-full rounded-lg bg-ivory p-6 ring-1 ring-emerald/5">
                  <p className="text-eyebrow text-violet">{q.area}</p>
                  <p className="mt-3 font-display text-xl leading-snug text-emerald md:text-2xl">{q.q}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative overflow-hidden bg-emerald py-24 text-ivory md:py-32">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow tone="gold">Working with our data</Eyebrow>
            <h2 className="text-h1 mt-5">Requesting access.</h2>
            <p className="text-lead mt-5 text-ivory/75">
              De-identified data is available to named investigators on an approved protocol, for the protocol’s duration, in a sandbox. Nothing leaves without ethics approval.
            </p>
            <div className="mt-8">
              <Button href="/contact?topic=research" variant="coral" arrow>
                Propose a collaboration
              </Button>
            </div>
          </Reveal>
          <RevealGroup className="grid gap-4 lg:col-span-7" stagger={0.1}>
            {[
              { icon: FileText, t: "1. Protocol", d: "Send a short protocol: question, variables needed, analysis plan, named investigators, institutional ethics status." },
              { icon: Scale, t: "2. Review", d: "Our ethics liaison and Data Protection Officer review against RNEC requirements and Law No. 058/2021. Typical turnaround: 4 weeks." },
              { icon: Database, t: "3. Sandboxed access", d: "A pseudonymised extract in an analysis sandbox. Minimum cell sizes enforced on exports. Access expires with the protocol." },
            ].map((s) => (
              <RevealItem key={s.t}>
                <div className="flex gap-5 rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-midnight">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">{s.t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ivory/70">{s.d}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Eyebrow>Publications</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">Nothing published yet. That is deliberate.</h2>
            <p className="text-lead mt-5 text-muted">
              We will publish the interview findings, the clinical rule set, and the pilot protocol before any results, so the methods can be criticised first. Follow this page or write to us to be notified.
            </p>
            <div className="mt-8">
              <Button href="/contact?topic=research" variant="secondary">
                Get notified
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
