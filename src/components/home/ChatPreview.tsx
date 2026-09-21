"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Smartphone, MessageCircle, MessageSquare, ShieldAlert } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";

type Msg = { from: "user" | "bot" | "system"; text: string; time?: string };

const scripts: Record<"en" | "rw", Msg[]> = {
  en: [
    { from: "user", text: "Hello MamaCare. I'm 7 months pregnant and I have a headache since yesterday.", time: "10:24" },
    { from: "bot", text: "Thank you for telling me. Is your vision blurred, or do you see spots or flashes?", time: "10:24" },
    { from: "user", text: "Yes, sometimes things look blurry. My feet are also swollen.", time: "10:26" },
    { from: "bot", text: "I'm sorry you're feeling this way. These signs together need to be checked by a health worker today.", time: "10:26" },
    { from: "system", text: "Elevated risk · CHW Marie notified · Health centre Kinyinya alerted" },
  ],
  rw: [
    { from: "user", text: "Muraho MamaCare. Ndatwite amezi 7, umutwe urandya kuva ejo.", time: "10:24" },
    { from: "bot", text: "Murakoze kutubwira. Ese amaso yanyu abona bidasobanutse cyangwa mubona utudomo?", time: "10:24" },
    { from: "user", text: "Yego, rimwe na rimwe mbona bidasobanutse. Ibirenge byanjye nabyo byabyimbye.", time: "10:26" },
    { from: "bot", text: "Mbabajwe n'uko mumeze. Ibi bimenyetso hamwe bikeneye kurebwa n'umukozi w'ubuzima uyu munsi.", time: "10:26" },
    { from: "system", text: "Ingaruka ziri hejuru · Umujyanama Marie yamenyeshejwe · Ikigo nderabuzima cya Kinyinya cyamenyeshejwe" },
  ],
};

const channels = [
  { icon: Globe, label: "Web application" },
  { icon: Smartphone, label: "Mobile application" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: MessageSquare, label: "SMS" },
];

/** Section 5 — emerald band with an animated mock conversation. */
export function ChatPreview() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [progress, setProgress] = useState<{ lang: string; count: number }>({ lang, count: 0 });
  const count = progress.lang === lang ? progress.count : 0;
  const script = scripts[lang];

  useEffect(() => {
    if (!inView || count >= script.length) return;
    const id = setTimeout(() => setProgress({ lang, count: count + 1 }), count === 0 ? 400 : 1100);
    return () => clearTimeout(id);
  }, [inView, count, lang, script.length]);

  return (
    <section className="relative overflow-hidden bg-emerald text-ivory">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="container-x relative grid items-center gap-14 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-6">
          <Reveal>
            <Eyebrow tone="gold">Any device. Any channel. Any time.</Eyebrow>
            <h2 className="text-h1 mt-5">Chat in Kinyarwanda or English.</h2>
            <p className="text-lead mt-6 max-w-[48ch] text-ivory/75">
              Mothers use whatever phone they already have. CHWs and clinicians see the same conversation, structured — no
              retyping, no lost messages.
            </p>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4">
            {channels.map((c) => (
              <RevealItem key={c.label}>
                <div className="flex items-center gap-3 rounded-md bg-white/5 p-3 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-green text-ivory">
                    <c.icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold">{c.label}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* phone mock */}
        <div ref={ref} className="md:col-span-6">
          <Reveal delay={0.1} className="mx-auto w-full max-w-[380px]">
            <div className="rounded-[36px] bg-midnight p-2.5 shadow-float ring-1 ring-white/10">
              <div className="flex h-[600px] flex-col sm:h-[580px] overflow-hidden rounded-[28px] bg-ivory text-ink">
                <header className="flex items-center gap-3 border-b border-emerald/10 bg-white px-4 py-3">
                  <span className="grid size-9 place-items-center rounded-full bg-emerald text-ivory text-sm font-bold">M</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-emerald">MamaCare</p>
                    <p className="text-[11px] text-muted">{lang === "en" ? "Kinyarwanda | English" : "Ikinyarwanda | Icyongereza"}</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green">Online</span>
                </header>

                <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-4">
                  <AnimatePresence initial={false}>
                    {script.slice(0, count).map((m, i) =>
                      m.from === "system" ? (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="mt-1 flex items-start gap-2 rounded-md border border-coral/30 bg-coral-100/70 p-3 text-xs text-ink"
                        >
                          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-coral" aria-hidden />
                          <span className="font-semibold">{m.text}</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className={m.from === "user" ? "self-end" : "self-start"}
                        >
                          <div
                            className={
                              m.from === "user"
                                ? "max-w-[85%] rounded-2xl rounded-br-sm bg-green px-3.5 py-2.5 text-sm text-ivory"
                                : "max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-sm text-ink shadow-soft"
                            }
                          >
                            {m.text}
                          </div>
                          <p className={`mt-1 text-[10px] text-muted ${m.from === "user" ? "text-right" : ""}`}>{m.time}</p>
                        </motion.div>
                      ),
                    )}
                  </AnimatePresence>
                  {count < script.length && count > 0 && (
                    <div className="self-start rounded-2xl bg-white px-3.5 py-2.5 shadow-soft">
                      <span className="inline-flex gap-1">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="size-1.5 animate-bounce rounded-full bg-muted"
                            style={{ animationDelay: `${d * 120}ms` }}
                          />
                        ))}
                      </span>
                    </div>
                  )}
                </div>

                <footer className="border-t border-emerald/10 bg-white p-3">
                  <div className="flex items-center gap-2 rounded-full bg-ivory px-4 py-2.5 text-sm text-muted">
                    <span className="flex-1">{lang === "en" ? "Type a message…" : "Andika ubutumwa…"}</span>
                    <span className="grid size-7 place-items-center rounded-full bg-emerald text-ivory">›</span>
                  </div>
                </footer>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
