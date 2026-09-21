"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Mic, ShieldAlert, ShieldCheck, Info, Phone } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/components/providers/LanguageProvider";
import type { Risk } from "@/lib/mock/mother";
import { cn } from "@/lib/cn";

type Msg = { id: string; from: "user" | "assistant" | "system"; text: string; at: number; risk?: Risk; quick?: string[] };

/**
 * Demo assistant. A tiny rule-based script that mimics the real flow:
 *   understand → ask follow-ups → assess → recommend an action.
 * Replace `reply()` with a call to the MamaCare API (streaming) — the UI stays the same.
 */
const SIGNS = {
  headache: /headache|umutwe|head/i,
  vision: /blur|spots|flash|amaso|vision|see/i,
  swelling: /swell|puff|byabyimbye|ibirenge|feet|hands|face/i,
  bleeding: /bleed|blood|amaraso/i,
  movement: /not mov|less mov|quiet|kunyeganyega|stopped/i,
  fever: /fever|hot|umuriro|chills/i,
  pain: /pain|cramp|kubabara|inda/i,
  fits: /fit|seizure|convuls|igicuri/i,
  fine: /fine|well|good|neza|ok|nothing/i,
};

function detect(text: string) {
  return Object.fromEntries(Object.entries(SIGNS).map(([k, re]) => [k, re.test(text)])) as Record<keyof typeof SIGNS, boolean>;
}

function reply(history: Msg[], lang: "en" | "rw"): Msg[] {
  const user = history.filter((m) => m.from === "user");
  const all = user.map((m) => m.text).join(" ");
  const last = user[user.length - 1]?.text ?? "";
  const s = detect(all);
  const now = Date.now();
  const id = () => Math.random().toString(36).slice(2);
  const t = (en: string, rw: string) => (lang === "rw" ? rw : en);

  // Immediate escalation signs
  if (s.bleeding || s.fits || (s.movement && user.length >= 1 && /stopped|not/i.test(all))) {
    return [
      { id: id(), from: "assistant", at: now, text: t("Thank you for telling me straight away. This needs to be seen by a health worker now, not later.", "Urakoze kubimbwira ako kanya. Ibi bikeneye kurebwa n’umukozi w’ubuzima ubu, si nyuma.") },
      { id: id(), from: "system", at: now + 1, risk: "high", text: t("High risk · Marie (CHW) and Kinyinya Health Centre alerted · Go to the facility now. If you cannot, call 912.", "Ingaruka nyinshi · Marie n’ikigo nderabuzima cya Kinyinya bamenyeshejwe · Jya ku kigo nderabuzima ubu. Niba bidashoboka, hamagara 912.") },
    ];
  }

  // Preeclampsia pattern: headache + (vision or swelling)
  if (s.headache && (s.vision || s.swelling)) {
    const askedVision = history.some((m) => m.from === "assistant" && /vision|blur|amaso/i.test(m.text));
    if (!s.vision && !askedVision) {
      return [{ id: id(), from: "assistant", at: now, text: t("I’m sorry you’re feeling this. Is your vision blurred, or do you see spots or flashes of light?", "Mbabajwe n’uko umeze. Ese amaso yawe abona bidasobanutse, cyangwa ubona utudomo cyangwa umucyo?"), quick: [t("Yes, blurry", "Yego, bidasobanutse"), t("No, I see fine", "Oya, mbona neza")] }];
    }
    if (s.vision || /yes|yego/i.test(last)) {
      return [
        { id: id(), from: "assistant", at: now, text: t("Headache with blurred vision and swelling together can be a sign of high blood pressure in pregnancy. It is treatable, but it must be checked today.", "Umutwe uhujwe n’amaso atabona neza no kubyimba bishobora kuba ikimenyetso cy’umuvuduko w’amaraso mu gihe utwite. Biravurwa, ariko bigomba gusuzumwa uyu munsi.") },
        { id: id(), from: "system", at: now + 1, risk: "high", text: t("Elevated risk · Marie (CHW) notified · Kinyinya Health Centre alerted · Please go to the health centre today.", "Ingaruka ziri hejuru · Marie yamenyeshejwe · Ikigo nderabuzima cya Kinyinya cyamenyeshejwe · Jya ku kigo nderabuzima uyu munsi.") },
      ];
    }
    return [
      { id: id(), from: "assistant", at: now, text: t("Thank you. Rest, drink water, and avoid salty food today. Marie will contact you within 2 days. If your vision changes or the headache gets much worse, message me again or go to the facility.", "Urakoze. Ruhuka, unywe amazi, wirinde ibiryo birimo umunyu uyu munsi. Marie azakuvugisha mu minsi 2. Amaso nahinduka cyangwa umutwe ukarushaho kuryana, ongera unyandikire cyangwa ujye ku kigo nderabuzima.") },
      { id: id(), from: "system", at: now + 1, risk: "moderate", text: t("Moderate risk · Marie (CHW) notified · follow-up within 2 days", "Ingaruka ziciriritse · Marie yamenyeshejwe · gukurikirana mu minsi 2") },
    ];
  }

  if (s.headache) {
    return [{ id: id(), from: "assistant", at: now, text: t("Thank you for telling me. Two quick questions: is your vision blurred or do you see spots, and are your feet, hands or face swollen?", "Urakoze kubimbwira. Ibibazo bibiri: ese amaso yawe abona bidasobanutse cyangwa ubona utudomo, kandi ibirenge, ibiganza cyangwa mu maso byabyimbye?"), quick: [t("Blurred vision", "Amaso ntabona neza"), t("Swelling", "Byabyimbye"), t("Neither", "Nta na kimwe")] }];
  }
  if (s.swelling) {
    return [{ id: id(), from: "assistant", at: now, text: t("Swelling in the feet is common late in pregnancy, but I want to check: do you also have a headache, or is your face or hands swollen?", "Kubyimba ibirenge biramenyerewe mu mezi ya nyuma, ariko ndashaka kumenya: ese ufite n’umutwe uryana, cyangwa mu maso cyangwa ibiganza byabyimbye?"), quick: [t("Yes, headache too", "Yego, n’umutwe"), t("Only my feet", "Ibirenge gusa")] }];
  }
  if (s.movement) {
    return [{ id: id(), from: "assistant", at: now, text: t("Let’s check on the baby. Lie on your left side, and count movements for the next hour. Has the baby moved at all today?", "Reka turebe umwana. Ryama ku rubavu rw’ibumoso, ubare uko anyeganyega mu isaha. Ese uyu munsi yigeze anyeganyega?"), quick: [t("Yes, a little", "Yego, gake"), t("No, not at all", "Oya, nta na rimwe")] }];
  }
  if (s.fever) {
    return [
      { id: id(), from: "assistant", at: now, text: t("A fever in pregnancy should be checked. Do you also have pain when passing urine, or a bad smell, or chills?", "Umuriro mu gihe utwite ugomba gusuzumwa. Ese unababara wihagarika, cyangwa hari umunuko, cyangwa ufite imbeho?") },
      { id: id(), from: "system", at: now + 1, risk: "moderate", text: t("Moderate risk · Marie (CHW) notified · visit the health centre within 24 hours", "Ingaruka ziciriritse · Marie yamenyeshejwe · jya ku kigo nderabuzima mu masaha 24") },
    ];
  }
  if (s.pain) {
    return [{ id: id(), from: "assistant", at: now, text: t("Where is the pain, and is it constant or does it come and go? Is there any bleeding?", "Ububabare buri he, kandi burahoraho cyangwa buza bukagenda? Hari amaraso ava?"), quick: [t("Comes and goes", "Buraza bukagenda"), t("Constant", "Burahoraho"), t("There is bleeding", "Amaraso arava")] }];
  }
  if (s.fine) {
    return [
      { id: id(), from: "assistant", at: now, text: t("That’s good to hear. Keep noticing the baby’s movements, and message me any time something feels different. Your next ANC visit is on 3 October.", "Ni byiza kubyumva. Komeza wite ku kunyeganyega k’umwana, unyandikire igihe cyose hari ikintu gihindutse. Isura rikurikira ni ku ya 3 Ukwakira.") },
      { id: id(), from: "system", at: now + 1, risk: "low", text: t("Low risk · next check-in in 3 days", "Ingaruka nke · isuzuma rikurikira mu minsi 3") },
    ];
  }
  return [{ id: id(), from: "assistant", at: now, text: t("I’m here. Tell me how you are feeling today, in your own words — for example a headache, swelling, bleeding, fever, or how the baby is moving.", "Ndi hano. Mbwira uko umerewe uyu munsi mu magambo yawe — urugero: umutwe uryana, kubyimba, kuva amaraso, umuriro, cyangwa uko umwana anyeganyega."), quick: [t("I feel fine", "Meze neza"), t("I have a headache", "Umutwe urandya"), t("Baby is moving less", "Umwana ntanyeganyega cyane")] }];
}

export function Chat({ initial }: { initial?: string } = {}) {
  const { lang } = useLang();
  const t = (en: string, rw: string) => (lang === "rw" ? rw : en);
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    { id: "w", from: "assistant", at: Date.now(), text: t("Muraho Uwase. How are you feeling today?", "Muraho Uwase. Umeze ute uyu munsi?"), quick: [t("I feel fine", "Meze neza"), t("I have a headache", "Umutwe urandya"), t("My feet are swollen", "Ibirenge byabyimbye")] },
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const lastRisk = [...msgs].reverse().find((m) => m.risk)?.risk;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing]);


  const send = (value: string) => {
    const v = value.trim();
    if (!v || typing) return;
    const userMsg: Msg = { id: Math.random().toString(36).slice(2), from: "user", text: v, at: Date.now() };
    const next = [...msgs, userMsg];
    setMsgs(next);
    setText("");
    setTyping(true);
    // TODO: POST to the API and stream the reply instead of the local script.
    const replies = reply(next, lang);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, ...replies]);
    }, 900 + Math.min(1200, v.length * 20));
  };

  const sentInitial = useRef(false);
  useEffect(() => {
    if (!initial || sentInitial.current) return;
    sentInitial.current = true;
    const id = setTimeout(() => send(initial), 600);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const quick = [...msgs].reverse().find((m) => m.from === "assistant")?.quick;

  return (
    <div className="mx-auto flex h-[calc(100svh-8.5rem)] max-w-3xl flex-col overflow-hidden rounded-xl bg-white ring-1 ring-emerald/5 lg:h-[calc(100svh-9.5rem)]">
      <header className="flex items-center gap-3 border-b border-emerald/10 px-4 py-3">
        <span className="grid size-10 place-items-center rounded-full bg-emerald text-sm font-bold text-ivory">M</span>
        <div className="flex-1">
          <p className="font-semibold text-emerald">MamaCare</p>
          <p className="text-xs text-muted">{t("Understands Kinyarwanda and English · a person always decides", "Yumva Ikinyarwanda n’Icyongereza · umuntu ni we ufata umwanzuro")}</p>
        </div>
        {lastRisk && (
          <span className={cn("hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold sm:inline-flex", lastRisk === "high" ? "bg-coral text-white" : lastRisk === "moderate" ? "bg-gold text-midnight" : "bg-green text-ivory")}>
            {lastRisk === "low" ? <ShieldCheck className="size-3.5" /> : <ShieldAlert className="size-3.5" />}
            {lastRisk === "high" ? t("High risk", "Ingaruka nyinshi") : lastRisk === "moderate" ? t("Moderate", "Ziciriritse") : t("Low risk", "Ingaruka nke")}
          </span>
        )}
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <AnimatePresence initial={false}>
          {msgs.map((m) =>
            m.from === "system" ? (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex items-start gap-2 rounded-md border p-3 text-sm", m.risk === "high" ? "border-coral/40 bg-coral-100/70" : m.risk === "moderate" ? "border-gold/50 bg-gold-100/70" : "border-green/30 bg-green-100/70")}>
                {m.risk === "low" ? <ShieldCheck className="mt-0.5 size-4 shrink-0 text-green" /> : <ShieldAlert className={cn("mt-0.5 size-4 shrink-0", m.risk === "high" ? "text-coral" : "text-[#8a6a10]")} />}
                <div className="flex-1">
                  <p className="font-semibold text-ink">{m.text}</p>
                  {m.risk === "high" && (
                    <Link href="/emergency" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-coral px-3 py-1.5 text-xs font-bold text-white">
                      <Phone className="size-3.5" /> {t("Call 912", "Hamagara 912")}
                    </Link>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }} className={cn("flex flex-col", m.from === "user" ? "items-end" : "items-start")}>
                <div className={cn("max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed", m.from === "user" ? "rounded-br-sm bg-green text-ivory" : "rounded-bl-sm bg-ivory text-ink")}>{m.text}</div>
                <span className="mt-1 text-[10px] text-muted">{new Date(m.at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
              </motion.div>
            ),
          )}
        </AnimatePresence>
        {typing && (
          <div className="inline-flex gap-1 rounded-2xl rounded-bl-sm bg-ivory px-4 py-3">
            {[0, 1, 2].map((d) => <span key={d} className="size-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 120}ms` }} />)}
          </div>
        )}
        <div ref={endRef} />
      </div>

      {quick && !typing && (
        <div className="flex gap-2 overflow-x-auto px-4 pb-2 no-scrollbar">
          {quick.map((q) => (
            <button key={q} type="button" onClick={() => send(q)} className="shrink-0 rounded-full border border-emerald/20 bg-white px-3.5 py-1.5 text-sm font-semibold text-emerald transition-colors hover:bg-emerald hover:text-ivory">
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(text);
        }}
        className="flex items-center gap-2 border-t border-emerald/10 p-3"
      >
        <button type="button" className="grid size-10 shrink-0 place-items-center rounded-full text-muted hover:bg-emerald/5 hover:text-emerald" aria-label={t("Record a voice message", "Fata ijwi")} title="Voice messages: coming with the mobile app">
          <Mic className="size-5" />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("Type how you feel…", "Andika uko umerewe…")}
          className="h-11 flex-1 rounded-full border border-emerald/15 bg-ivory px-4 text-[15px] text-ink placeholder:text-muted/70 focus:border-green focus:outline-none"
          aria-label={t("Message", "Ubutumwa")}
        />
        <button type="submit" disabled={!text.trim() || typing} className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald text-ivory transition-colors disabled:opacity-40" aria-label={t("Send", "Ohereza")}>
          <Send className="size-5" />
        </button>
      </form>
      <p className="flex items-center gap-1.5 border-t border-emerald/10 px-4 py-2 text-[11px] text-muted">
        <Info className="size-3.5" /> {t("MamaCare does not diagnose. In an emergency call 912.", "MamaCare ntisuzuma indwara. Mu byihutirwa hamagara 912.")}
      </p>
    </div>
  );
}
