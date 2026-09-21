import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion, type QA } from "@/components/pages/Accordion";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers for mothers, families and health workers about how MamaCare works and how your information is protected.",
};

const mothers: QA[] = [
  { q: "Is MamaCare a doctor?", a: "No. MamaCare does not diagnose and does not replace your doctor, midwife or Community Health Worker. It helps you notice warning signs earlier and reach the right person faster. In an emergency, call 912 or go to the nearest health facility." },
  { q: "Does it cost money?", a: "Core check-ins by SMS and WhatsApp are free for mothers and will stay free. Your normal call and data charges may apply depending on your network." },
  { q: "Can I use it in Kinyarwanda?", a: "Yes. You can write or speak in Kinyarwanda or English, and switch at any time. If MamaCare does not understand something, it will ask again or hand you to a person rather than guess." },
  { q: "What if I don't have a smartphone?", a: "MamaCare works by SMS on any phone. You send a message, MamaCare asks short follow-up questions, and tells you what to do next." },
  { q: "Who can see what I share?", a: (<>Only the people you have linked: your Community Health Worker, your health facility, and any family member you approve. You can see the full list, remove someone, and see who viewed your record at any time. Read more in our <Link href="/consent">consent page</Link>.</>) },
  { q: "Can my family report for me?", a: "Yes, if you approve them. A partner, parent or sister can report what they notice, and you decide whether they see your guidance. You can remove them at any time." },
  { q: "What happens when I report a warning sign?", a: "MamaCare asks a few follow-up questions, then a medically reviewed set of rules decides the next step: safe information, a recommendation to contact a health worker, or an alert to your CHW and facility. A named person is always responsible for the alert." },
];

const workers: QA[] = [
  { q: "Does this replace e-Ubuzima or RapidSMS?", a: "No. Those systems record what happened. MamaCare listens to the mother, her family and you between visits, and warns before something happens. Where possible, MamaCare will feed structured data into the systems you already use rather than asking you to type twice." },
  { q: "Will it work offline?", a: "The CHW app is designed to work without a connection: you can view your caseload, record a visit and queue a referral. It syncs when you are back on network. Alerts arrive by SMS as a fallback." },
  { q: "How does an escalation reach me?", a: "By app notification and SMS, with the mother's name, the reason, and what the rules recommend. You acknowledge it, act, and record what happened. Your supervisor sees anything that stalls." },
  { q: "Will I get feedback from the clinic?", a: "Yes. Closing the loop is a core feature: when a mother you referred is seen at the facility, the outcome comes back to you. This was the single largest gap in our field interviews." },
  { q: "Who decides the risk rules?", a: "A clinical lead and reviewing midwives and obstetricians. Rules are versioned, reviewed and deployed by separate people, and every recommendation records which rule version produced it." },
  { q: "Am I liable if the system is wrong?", a: "MamaCare is decision support. The clinical decision remains with the health worker, following normal protocols. We log what the system recommended and why, so that if it is wrong the error is on record and gets reviewed, not hidden." },
];

const general: QA[] = [
  { q: "Where is my data stored?", a: "In line with Rwanda's data-protection law (Law No. 058/2021). We work with the Data Protection Office and RNEC on where and how health data is stored and for how long. Details are on our privacy page." },
  { q: "Is MamaCare approved by the Ministry of Health?", a: "Not yet. We are at the pre-prototype stage and building toward a two-district pilot under ethics approval, in partnership with public health authorities. We will say clearly on this site when that changes." },
  { q: "How is the AI kept safe?", a: "The language model only understands and structures what people say. It never decides on its own. A separate risk model scores the situation, and medically reviewed rules choose the action. Every step is attributed and auditable." },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Questions people <span className="text-coral">actually ask</span> us.
          </>
        }
        lead="From mothers, families, CHWs and midwives across our interviews. If yours is not here, write to us."
      />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x space-y-20">
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow tone="coral">For mothers & families</Eyebrow>
              <h2 className="text-h2 mt-4 text-emerald">Using MamaCare</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <Accordion name="mothers" items={mothers} />
            </Reveal>
          </div>
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>For CHWs & providers</Eyebrow>
              <h2 className="text-h2 mt-4 text-emerald">Working with it</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <Accordion name="workers" items={workers} />
            </Reveal>
          </div>
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow tone="violet">Data & safety</Eyebrow>
              <h2 className="text-h2 mt-4 text-emerald">Trust</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <Accordion name="general" items={general} />
            </Reveal>
          </div>
          <Reveal className="rounded-xl bg-ivory p-8 text-center md:p-12">
            <p className="font-display text-2xl text-emerald md:text-3xl">Still have a question?</p>
            <div className="mt-6">
              <Button href="/contact" variant="coral" arrow>Ask us</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
