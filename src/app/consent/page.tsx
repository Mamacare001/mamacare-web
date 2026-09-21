import type { Metadata } from "next";
import { Users, Eye, XCircle, ClipboardList, Baby, HeartHandshake, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Prose } from "@/components/pages/Prose";

export const metadata: Metadata = { title: "Consent", description: "Who can see your information on MamaCare, in plain language." };

const circle = [
  { icon: Baby, who: "You (the mother)", sees: "Everything about your own pregnancy, and who has looked at it.", control: "You are in charge. You approve or remove everyone below." },
  { icon: HeartHandshake, who: "Family member you approve", sees: "The guidance MamaCare gives you. Not your conversation. Not your risk score, unless you turn that on.", control: "Remove them at any time." },
  { icon: Users, who: "Your Community Health Worker", sees: "Your risk level, warning signs, visits and referrals, so they can act.", control: "Ask for a different CHW through your facility." },
  { icon: Stethoscope, who: "Your health facility", sees: "Your full record when you are referred or registered there, so they can treat you.", control: "Your record moves with you if you change facility." },
];

export default function ConsentPage() {
  return (
    <>
      <PageHero eyebrow="Consent · Uburenganzira bwawe" title={<>Who can see <span className="text-coral">your</span> information.</>} lead="Before you use MamaCare, this is what you are agreeing to. Written to be read, not skimmed. Kinyarwanda version in progress." />

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Eyebrow>Your care circle</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">Four kinds of people. You decide each one.</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2" stagger={0.08}>
            {circle.map((c) => (
              <RevealItem key={c.who}>
                <div className="h-full rounded-lg bg-ivory p-6 ring-1 ring-emerald/5">
                  <span className="grid size-11 place-items-center rounded-full bg-green-100 text-green">
                    <c.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-h3 mt-4 text-emerald">{c.who}</h3>
                  <p className="text-eyebrow mt-4 text-muted">Sees</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{c.sees}</p>
                  <p className="text-eyebrow mt-4 text-coral">Your control</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{c.control}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow tone="coral">What you are agreeing to</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">In plain words.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Prose>
              <p><strong>I understand that:</strong></p>
              <ol>
                <li>MamaCare is not a doctor and does not diagnose. It helps me and my care circle notice warning signs and act sooner. In an emergency I call 912 or go to a facility.</li>
                <li>What I share will be seen by my Community Health Worker and my health facility, so they can help me, and by any family member I approve.</li>
                <li>A computer system reads my messages to understand them and to assess risk. A person always decides what happens next.</li>
                <li>My information is protected under Rwanda’s data-protection law and is never sold or used for advertising.</li>
                <li>Partners such as the Ministry of Health, insurers or researchers only ever receive numbers about many women together, never my name or my record, unless I separately choose to join a programme.</li>
                <li>I can see who has looked at my record, remove anyone from my care circle, export my data, or ask for it to be deleted, at any time.</li>
              </ol>
              <p>When you continue in MamaCare and tick “I agree”, you are agreeing to these six points, our <a href="/privacy">privacy policy</a> and <a href="/terms">terms of use</a>.</p>
            </Prose>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <RevealGroup className="grid gap-4 sm:grid-cols-3" stagger={0.1}>
            {[
              { icon: Eye, t: "See who looked", d: "Every view of your record is logged. Ask for the list any time." },
              { icon: XCircle, t: "Change your mind", d: "Withdraw consent for any person or programme in one step." },
              { icon: ClipboardList, t: "Take your data", d: "Export a copy, or ask for deletion, from your settings or by contacting us." },
            ].map((x) => (
              <RevealItem key={x.t}>
                <div className="flex gap-4 rounded-lg bg-ivory p-6 ring-1 ring-emerald/5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-coral-100 text-coral">
                    <x.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-emerald">{x.t}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{x.d}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
