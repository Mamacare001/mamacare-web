"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Lightbulb, MapPin, Clock, ArrowRight, Sparkles, X } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { roles, type Role } from "@/lib/mock/careers";
import { submitApplication, submitIdea } from "@/app/join/actions";
import { Conversation, Done, type Q } from "@/components/join/Conversation";
import { cn } from "@/lib/cn";
import { useLang } from "@/components/providers/LanguageProvider";
import type { Dict } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

const applyQs = (j: Dict["join"], role?: Role): Q[] => [
  { name: "name", ask: j.applyQ.name.ask, kind: "text", placeholder: j.applyQ.name.placeholder },
  { name: "contact", ask: j.applyQ.contact.ask, hint: j.applyQ.contact.hint, kind: "contact", placeholder: j.applyQ.contact.placeholder },
  { name: "where", ask: j.applyQ.where.ask, hint: j.applyQ.where.hint, kind: "text", placeholder: j.applyQ.where.placeholder },
  role
    ? { name: "pitch", ask: `${j.applyQ.pitchRolePre}${role.title.toLowerCase()}${j.applyQ.pitchRoleSuffix}`, hint: j.applyQ.pitchRoleHint, kind: "textarea", placeholder: j.applyQ.pitchRolePlaceholder }
    : { name: "pitch", ask: j.applyQ.pitchOwn.ask, hint: j.applyQ.pitchOwn.hint, kind: "textarea", placeholder: j.applyQ.pitchOwn.placeholder },
  { name: "link", ask: j.applyQ.link.ask, hint: j.applyQ.link.hint, kind: "text", placeholder: j.applyQ.link.placeholder, optional: true },
  { name: "cv", ask: j.applyQ.cv.ask, hint: j.applyQ.cv.hint, kind: "file", accept: ".pdf", optional: true },
];

const ideaQs = (j: Dict["join"]): Q[] => [
  { name: "who", ask: j.ideaQ.who.ask, hint: j.ideaQ.who.hint, kind: "choice", options: ["Mother", "Family member", "CHW", "Clinician", "Researcher", "Developer", "Other"] },
  { name: "title", ask: j.ideaQ.title.ask, kind: "text", placeholder: j.ideaQ.title.placeholder },
  { name: "problem", ask: j.ideaQ.problem.ask, hint: j.ideaQ.problem.hint, kind: "textarea", placeholder: j.ideaQ.problem.placeholder },
  { name: "idea", ask: j.ideaQ.idea.ask, kind: "textarea", placeholder: j.ideaQ.idea.placeholder },
  { name: "involved", ask: j.ideaQ.involved.ask, hint: j.ideaQ.involved.hint, kind: "yesno" },
  { name: "name", ask: j.ideaQ.name.ask, kind: "text", placeholder: j.ideaQ.name.placeholder },
  { name: "contact", ask: j.ideaQ.contact.ask, hint: j.ideaQ.contact.hint, kind: "contact", placeholder: j.ideaQ.contact.placeholder, optional: true },
];

export function JoinPage() {
  const { t } = useLang();
  const j = t.join;
  const [door, setDoor] = useState<"work" | "idea" | null>(null);
  const [role, setRole] = useState<Role | undefined>();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (door) setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, [door, role]);

  const openRole = (r?: Role) => { setRole(r); setDoor("work"); };

  const doors = [
    { k: "work" as const, icon: Briefcase, eyebrow: j.doorWork.eyebrow, title: j.doorWork.title, text: `${roles.length}${j.doorWork.textSuffix}`, tone: "bg-emerald text-ivory", ring: "group-hover:ring-emerald" },
    { k: "idea" as const, icon: Lightbulb, eyebrow: j.doorIdea.eyebrow, title: j.doorIdea.title, text: j.doorIdea.text, tone: "bg-coral text-white", ring: "group-hover:ring-coral" },
  ];

  return (
    <>
      {/* Hero — two doors */}
      <section className="bg-ivory pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="container-x">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7, ease }}>
            <Eyebrow>{j.hero.eyebrow}</Eyebrow>
          </motion.div>
          <TextReveal as="h1" trigger="mount" delay={0.45} className="text-display mt-6 max-w-[16ch] text-emerald">
            {j.hero.title}
          </TextReveal>
          <motion.p
            className="text-lead mt-6 max-w-[56ch] text-muted"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.95, duration: 0.9, ease }}
          >
            {j.hero.lead}
          </motion.p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
            {doors.map((d, i) => (
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
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">{j.openDoor} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="roles" className="bg-ivory-200/60 py-20 md:py-28">
        <div className="container-x">
          <div>
            <Reveal variant="fade" duration={0.6}><Eyebrow tone="coral">{j.rolesEyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5 text-emerald" delay={0.1}>{j.rolesHeading}</TextReveal>
          </div>
          <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2" stagger={0.08} variant="tilt" distance={44} duration={0.95}>
            {roles.map((r) => (
              <RevealItem key={r.id}>
                <article className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-emerald/10 transition-shadow hover:shadow-float md:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald/5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald">{r.team}</span>
                    {r.urgent && <span className="rounded-full bg-coral-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-coral">{j.hiringNow}</span>}
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-emerald">{r.title}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted"><span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {r.type}</span><span className="inline-flex items-center gap-1"><MapPin className="size-3.5" /> {r.where}</span></p>
                  <p className="mt-4 text-eyebrow text-muted">{j.youWouldLabel}</p>
                  <ul className="mt-1 space-y-1 text-sm text-ink/85">{r.youWould.map((y) => <li key={y} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-coral" />{y}</li>)}</ul>
                  <p className="mt-4 text-eyebrow text-muted">{j.youMightBeLabel}</p>
                  <ul className="mt-1 space-y-1 text-sm text-ink/85">{r.youMightBe.map((y) => <li key={y} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" />{y}</li>)}</ul>
                  <div className="mt-auto pt-6">
                    <Button variant="primary" size="sm" onClick={() => openRole(r)} arrow>{j.applyBtn}</Button>
                  </div>
                </article>
              </RevealItem>
            ))}
            <RevealItem>
              <button type="button" onClick={() => openRole(undefined)} className="group flex h-full w-full flex-col justify-between rounded-2xl border-2 border-dashed border-emerald/25 p-6 text-left transition-colors hover:border-coral md:p-7">
                <div>
                  <span className="grid size-12 place-items-center rounded-full bg-gold-100 text-[#8a6a10]"><Sparkles className="size-6" /></span>
                  <h3 className="mt-4 font-display text-2xl text-emerald">{j.writeOwn.title}</h3>
                  <p className="mt-2 text-sm text-muted">{j.writeOwn.text}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-coral">{j.writeOwn.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
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
                    <Eyebrow tone="coral">{door === "work" ? (role ? role.title : j.conversationWork.writeOwnRoleTitle) : j.conversationIdea.ideaEyebrow}</Eyebrow>
                    <h2 className="text-h2 mt-4 text-emerald">{door === "work" ? j.conversationWork.sixQuestions : j.conversationIdea.sevenQuestions}</h2>
                  </div>
                  <button type="button" onClick={() => setDoor(null)} aria-label={j.closeAria} className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-emerald ring-1 ring-emerald/10 hover:bg-coral hover:text-white"><X className="size-5" /></button>
                </div>
                {door === "work" ? (
                  <Conversation
                    key={role?.id ?? "open"}
                    questions={applyQs(j, role)}
                    action={submitApplication}
                    hidden={{ roleId: role?.id ?? "open", roleTitle: role?.title ?? j.conversationWork.writeOwnRoleTitle }}
                    submitLabel={j.applySubmitLabel}
                    done={(ref) => (
                      <Done refCode={ref} title={j.doneApply.title} text={j.doneApply.text}>
                        <Button href="/about#team" variant="light">{j.doneApply.meetBtn}</Button>
                        <Button href="/join" variant="ghost" className="!text-ivory">{j.doneApply.backBtn}</Button>
                      </Done>
                    )}
                  />
                ) : (
                  <Conversation
                    key="idea"
                    questions={ideaQs(j)}
                    action={submitIdea}
                    submitLabel={j.ideaSubmitLabel}
                    done={(ref) => (
                      <Done refCode={ref} title={j.doneIdea.title} text={j.doneIdea.text}>
                        <Button href="/how-it-works" variant="light">{j.doneIdea.seeBtn}</Button>
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
          <div>
            <Reveal variant="fade" duration={0.6}><Eyebrow tone="gold">{j.howWeHire.eyebrow}</Eyebrow></Reveal>
            <TextReveal as="h2" className="text-h1 mt-5 max-w-3xl" delay={0.1}>{j.howWeHire.heading}</TextReveal>
          </div>
          <RevealGroup className="mt-12 grid gap-8 md:grid-cols-4" stagger={0.1} variant="up">
            {j.howWeHire.steps.map((s) => (
              <RevealItem key={s.n}>
                <div className="border-t border-ivory/15 pt-5"><p className="text-eyebrow text-gold">{s.n}</p><h3 className="mt-2 font-display text-2xl">{s.title}</h3><p className="mt-2 text-sm leading-relaxed text-ivory/65">{s.text}</p></div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
