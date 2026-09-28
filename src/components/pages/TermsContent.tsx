"use client";

import { PageHero } from "@/components/site/PageHero";
import { Prose } from "@/components/pages/Prose";
import { useLang } from "@/components/providers/LanguageProvider";

export function TermsContent() {
  const { t } = useLang();
  const p = t.terms;

  return (
    <>
      <PageHero
        eyebrow={p.hero.eyebrow}
        title={
          <>
            {p.hero.titlePre}<span className="text-coral">{p.hero.titleHighlight}</span>{p.hero.titleSuffix}
          </>
        }
        lead={p.hero.lead}
      />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Prose>
            <h2>{p.s1.h}</h2>
            <p>{p.s1.pre}<strong>{p.s1.strong}</strong>{p.s1.post}</p>

            <h2>{p.s2.h}</h2>
            <p>{p.s2.body}</p>

            <h2>{p.s3.h}</h2>
            <ul>
              {p.s3.items.map((it) => <li key={it}>{it}</li>)}
            </ul>

            <h2>{p.s4.h}</h2>
            <ul>
              {p.s4.items.map((it) => <li key={it}>{it}</li>)}
              <li>{p.s4.linkPre}<a href="/privacy">{p.s4.linkText}</a>{p.s4.linkPost}</li>
              <li>{p.s4.last}</li>
            </ul>

            <h2>{p.s5.h}</h2>
            <p>{p.s5.body}</p>

            <h2>{p.s6.h}</h2>
            <p>{p.s6.body}</p>

            <h2>{p.s7.h}</h2>
            <p>{p.s7.body}</p>

            <h2>{p.s8.h}</h2>
            <p>{p.s8.body}</p>
          </Prose>
        </div>
      </section>
    </>
  );
}
