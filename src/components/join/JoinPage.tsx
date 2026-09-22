"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Lightbulb, MapPin, Clock, ArrowRight, Sparkles, X } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { roles, type Role } from "@/lib/mock/careers";
import { submitApplication, submitIdea } from "@/app/join/actions";
import { Conversation, Done, type Q } from "@/components/join/Conversation";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

const applyQs = (role?: Role): Q[] => [
  { name: "name", ask: "First things first — what should we call you?", kind: "text", placeholder: "Your name" },
  { name: "contact", ask: "And how do we reach you?", hint: "Email or phone. We reply to everyone, within 14 days.", kind: "contact", placeholder: "you@example.com · 078 …" },
  { name: "where", ask: "Where are you based?", hint: "Most roles are in Kigali or in the field; some can be hybrid.", kind: "text", placeholder: "Kigali, Huye, Nairobi…" },
  role
    ? { name: "pitch", ask: `What would you do in your first 90 days as ${role.title.toLowerCase()}?`, hint: "Not a CV summary. Tell us what you would actually change.", kind: "textarea", placeholder: "In my first month I would…" }
    : { name: "pitch", ask: "Write your own role. What would you do here, and why does it matter for a mother in Gasabo?", hint: "The best people here invented their job. Be specific.", kind: "textarea", placeholder: "I would…" },
  { name: "link", ask: "Anything we should look at?", hint: "LinkedIn, GitHub, a portfolio, a paper, a video. Optional.", kind: "text", placeholder: "https://", optional: true },
  { name: "cv", ask: "A CV, if you have one.", hint: "Optional. We read the answer above first.", kind: "file", accept: ".pdf", optional: true },
];

const ideaQs: Q[] = [
  { name: "who", ask: "Who is speaking?", hint: "Ideas from mothers and CHWs go to the top of the pile.", kind: "choice", options: ["Mother", "Family member", "CHW", "Clinician", "Researcher", "Developer", "Other"] },
  { name: "title", ask: "Give your idea a name.", kind: "text", placeholder: "e.g. ‘Cover me’ button for sick CHWs" },
  { name: "problem", ask: "What is the problem you keep running into?", hint: "One real moment is better than a theory.", kind: "textarea", placeholder: "Last week…" },
  { name: "idea", ask: "What would you build, change or stop doing?", kind: "textarea", placeholder: "It would…" },
  { name: "involved", ask: "If we build it, do you want to be part of it?", hint: "Testing, co-designing, or simply your name on it.", kind: "yesno" },
  { name: "name", ask: "Your name — or ‘Anonymous’.", kind: "text", placeholder: "Name" },
  { name: "contact", ask: "How do we reply?", hint: "Phone, WhatsApp or email. Optional if anonymous.", kind: "contact", placeholder: "078 … · you@example.com", optional: true },
];

export function JoinPage() {
  const [door, setDoor] = useState<"work" | "idea" | null>(null);
  const [role, setRole] = useState<Role | undefined>();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (door) setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, [door, role]);

  const openRole = (r?: Role) => { setRole(r); setDoor("work"); };

  return (
    <>
      {/* Hero — two doors */}
      <section className="bg-ivory pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="container-x">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease }}>
            <Eyebrow>Join the loop</Eyebrow>
            <h1 className="text-display mt-6 max-w-[16ch] text-emerald">Some people apply. Some people arrive with an idea.</h1>
            <p className="text-lead mt-6 max-w-[56ch] text-muted">Both doors lead to the same room. Pick the one that feels like you — we answer everyone within 14 days, and we mean everyone.</p>
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
            {[
              { k: "work" as const, icon: Briefcase, eyebrow: "Door one", title: "I want to work here.", text: `${roles.length} open roles — or write your own. We have hired people for jobs that did not exist until they described them.`, tone: "bg-emerald text-ivory", ring: "group-hover:ring-emerald" },
              { k: "idea" as const, icon: Lightbulb, eyebrow: "Door two", title: "I have an idea.", text: "You are a mother, a CHW, a nurse, a developer, a neighbour. You saw something we missed. Tell us — in three questions.", tone: "bg-coral text-white", ring: "group-hover:ring-coral" },
            ].map((d, i) => (
              <motion.button
                key={d.k}
                type="button"
                onClick={() => (d.k === "work" ? openRole(undefined) : setDoor("idea"))}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease }}
                className={cn("group relative overflow-hidden rounded-2xl p-8 text-left shadow-soft ring-4 ring-transparent transition-[transform,box-shadow,--tw-ring-color] duration-500 hover:-translate-y-1 hover:shadow-float md:p-10", d.tone, d.ring)}
              >
                <div className="grain absolute inset-0 opacity-50" aria-hidden />
                <div className="relative">
                  <span className="grid size-12 place-items-center rounded-full bg-white/15"><d.icon className="size-6" /></span>
                  <p className="mt-6 text-eyebrow opacity-70">{d.eyebrow}</p>
                  <p className="mt-2 font-display text-3xl leading-tight md:text-4xl">{d.title}</p>
                  <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed opacity-85">{d.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Open the door <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="roles" className="bg-ivory-200/60 py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow tone="coral">Open roles</Eyebrow>
            <h2 className="text-h1 mt-5 text-emerald">Jobs written as what you would do — not what you must have.</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2" stagger={0.08}>
            {roles.map((r) => (
              <RevealItem key={r.id}>
                <article className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-emerald/10 transition-shadow hover:shadow-float md:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald/5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald">{r.team}</span>
                    {r.urgent && <span className="rounded-full bg-coral-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-coral">Hiring now</span>}
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-emerald">{r.title}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted"><span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {r.type}</span><span className="inline-flex items-center gap-1"><MapPin className="size-3.5" /> {r.where}</span></p>
                  <p className="mt-4 text-eyebrow text-muted">You would</p>
                  <ul className="mt-1 space-y-1 text-sm text-ink/85">{r.youWould.map((y) => <li key={y} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-coral" />{y}</li>)}</ul>
                  <p className="mt-4 text-eyebrow text-muted">You might be</p>
                  <ul className="mt-1 space-y-1 text-sm text-ink/85">{r.youMightBe.map((y) => <li key={y} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" />{y}</li>)}</ul>
                  <div className="mt-auto pt-6">
                    <Button variant="primary" size="sm" onClick={() => openRole(r)} arrow>Apply in 6 questions</Button>
                  </div>
                </article>
              </RevealItem>
            ))}
            <RevealItem>
              <button type="button" onClick={() => openRole(undefined)} className="group flex h-full w-full flex-col justify-between rounded-2xl border-2 border-dashed border-emerald/25 p-6 text-left transition-colors hover:border-coral md:p-7">
                <div>
                  <span className="grid size-12 place-items-center rounded-full bg-gold-100 text-[#8a6a10]"><Sparkles className="size-6" /></span>
                  <h3 className="mt-4 font-display text-2xl text-emerald">None of these? Write your own role.</h3>
                  <p className="mt-2 text-sm text-muted">Tell us what you would do and why it matters for a mother in Gasabo. Three of our best conversations started this way.</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-coral">Start <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </button>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* The conversation */}
      <div ref={formRef} className="scroll-mt-24" />
      <AnimatePresence>
        {door && (
          <motion.section key={`${door}-${role?.id ?? "open"}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.6, ease }} className="overflow-hidden bg-emerald/[0.04]">
            <div className="container-x py-20 md:py-28">
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <Eyebrow tone="coral">{door === "work" ? (role ? role.title : "Write your own role") : "The idea box"}</Eyebrow>
                    <h2 className="text-h2 mt-4 text-emerald">{door === "work" ? "Six questions. One at a time — the way we talk to mothers." : "Seven questions. The way we ask mothers."}</h2>
                  </div>
                  <button type="button" onClick={() => setDoor(null)} aria-label="Close" className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-emerald ring-1 ring-emerald/10 hover:bg-coral hover:text-white"><X className="size-5" /></button>
                </div>
                {door === "work" ? (
                  <Conversation
                    key={role?.id ?? "open"}
                    questions={applyQs(role)}
                    action={submitApplication}
                    hidden={{ roleId: role?.id ?? "open", roleTitle: role?.title ?? "Write your own role" }}
                    submitLabel="Send it"
                    done={(ref) => (
                      <Done refCode={ref} title="We have it. A human will read it." text="Not a filter, not a keyword scan — one of us reads every application. Expect a reply within 14 days. If you do not hear from us, write to us with that reference and we will apologise properly.">
                        <Button href="/about#team" variant="light">Meet who reads it</Button>
                        <Button href="/join" variant="ghost" className="!text-ivory">Back to roles</Button>
                      </Done>
                    )}
                  />
                ) : (
                  <Conversation
                    key="idea"
                    questions={ideaQs}
                    action={submitIdea}
                    submitLabel="Drop it in the box"
                    done={(ref) => (
                      <Done refCode={ref} title="Thank you. That is exactly how MamaCare gets better." text="Every idea gets a reply within 14 days — adopted, parked, or ‘tell us more’. If we build it, your name goes on it, unless you asked us not to.">
                        <Button href="/how-it-works" variant="light">See what exists today</Button>
                      </Done>
                    )}
                  />
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* How we hire */}
      <section className="relative overflow-hidden bg-midnight py-20 text-ivory md:py-28">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container-x relative">
          <Reveal><Eyebrow tone="gold">How we hire</Eyebrow><h2 className="text-h1 mt-5 max-w-3xl">No trick questions. No ghosting. One field day.</h2></Reveal>
          <RevealGroup className="mt-12 grid gap-8 md:grid-cols-4" stagger={0.1}>
            {[
              ["01", "A human reads it", "Within 14 days you hear from a person, with a name, whatever the answer."],
              ["02", "A conversation", "45 minutes with someone you would work with. We talk about a real problem, not your weaknesses."],
              ["03", "A field day", "You spend a day with a CHW or at a health centre — with us, paid. You will know if this is for you."],
              ["04", "An honest offer", "Clear pay band, clear role, clear first 90 days. Written in plain language, in both languages."],
            ].map(([n, t, x]) => (
              <RevealItem key={n}>
                <div className="border-t border-ivory/15 pt-5"><p className="text-eyebrow text-gold">{n}</p><h3 className="mt-2 font-display text-2xl">{t}</h3><p className="mt-2 text-sm leading-relaxed text-ivory/65">{x}</p></div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
