"use client";

import { PageHero } from "@/components/site/PageHero";
import { Prose } from "@/components/pages/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";

export function TermsContent() {
  const { t } = useLang();
  const p = t.terms;

  return (
    <>
      <PageHero
        eyebrow={p.hero.eyebrow}
        segments={[p.hero.titlePre, { text: p.hero.titleHighlight, className: "text-coral" }, p.hero.titleSuffix]}
        lead={p.hero.lead}
      />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Prose>
            <Reveal as="div" variant="blur" distance={28} duration={0.8}>
              <h2>{p.s1.h}</h2>
              <p>{p.s1.pre}<strong>{p.s1.strong}</strong>{p.s1.post}</p>
            </Reveal>

            <Reveal as="div" variant="blur" distance={28} duration={0.8}>
              <h2>{p.s2.h}</h2>
              <p>{p.s2.body}</p>
            </Reveal>

            <Reveal as="div" variant="blur" distance={28} duration={0.8}>
              <h2>{p.s3.h}</h2>
              <ul>
                {p.s3.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </Reveal>

            <Reveal as="div" variant="blur" distance={28} duration={0.8}>
              <h2>{p.s4.h}</h2>
              <ul>
                {p.s4.items.map((it) => <li key={it}>{it}</li>)}
                <li>{p.s4.linkPre}<a href="/privacy">{p.s4.linkText}</a>{p.s4.linkPost}</li>
                <li>{p.s4.last}</li>
              </ul>
            </Reveal>

            <Reveal as="div" variant="blur" distance={28} duration={0.8}>
              <h2>{p.s5.h}</h2>
              <p>{p.s5.body}</p>
            </Reveal>

            <Reveal as="div" variant="blur" distance={28} duration={0.8}>
              <h2>{p.s6.h}</h2>
              <p>{p.s6.body}</p>
            </Reveal>

            <Reveal as="div" variant="blur" distance={28} duration={0.8}>
              <h2>{p.s7.h}</h2>
              <p>{p.s7.body}</p>
            </Reveal>

            <Reveal as="div" variant="blur" distance={28} duration={0.8}>
              <h2>{p.s8.h}</h2>
              <p>{p.s8.body}</p>
            </Reveal>
          </Prose>
        </div>
      </section>
    </>
  );
}
