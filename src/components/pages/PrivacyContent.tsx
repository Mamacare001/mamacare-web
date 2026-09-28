"use client";

import { PageHero } from "@/components/site/PageHero";
import { Prose } from "@/components/pages/Prose";
import { useLang } from "@/components/providers/LanguageProvider";

export function PrivacyContent() {
  const { t } = useLang();
  const p = t.privacy;
  const s = p.sections;

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
            <h2>{s[0].h}</h2>
            <p>{s[0].body?.[0]}<a href="/contact">{s[0].link}</a>{s[0].after}</p>

            <h2>{s[1].h}</h2>
            <ul>
              {s[1].items?.map((it) => (
                <li key={it.strong}><strong>{it.strong}</strong>{it.text}</li>
              ))}
            </ul>

            <h2>{s[2].h}</h2>
            <ul>
              {s[2].items2?.map((it) => <li key={it}>{it}</li>)}
            </ul>
            <p>{s[2].extra}</p>

            <h2>{s[3].h}</h2>
            <p>{s[3].body?.[0]}</p>

            <h2>{s[4].h}</h2>
            <p>{s[4].pre}<a href="/consent">{s[4].bodyLink}</a>{s[4].post}</p>
            <p>{s[4].extraPre}<strong>{s[4].extraStrong}</strong>{s[4].extraPost}</p>

            <h2>{s[5].h}</h2>
            <p>{s[5].pre}<strong>{s[5].strong}</strong>{s[5].post}</p>

            <h2>{s[6].h}</h2>
            <p>{s[6].body?.[0]}</p>

            <h2>{s[7].h}</h2>
            <p>{s[7].body?.[0]}</p>

            <h2>{s[8].h}</h2>
            <ul>
              {s[8].items2?.map((it) => <li key={it}>{it}</li>)}
            </ul>

            <h2>{s[9].h}</h2>
            <p>{s[9].body?.[0]}</p>
          </Prose>
        </div>
      </section>
    </>
  );
}
