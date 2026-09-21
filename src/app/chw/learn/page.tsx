import { BookOpen, Phone } from "lucide-react";
import { learnCards } from "@/lib/mock/chw";
import { PageTitle, Card } from "@/components/app/ui";

export const metadata = { title: "Learn" };

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle eyebrow="Kwiga · works offline" title="Protocol cards" />
      <Card className="mb-5 flex items-center gap-3 border-l-4 border-coral"><Phone className="size-5 text-coral" /><p className="text-sm text-ink/90"><strong>Emergency: 912.</strong> Bleeding, fits, unconscious, or no fetal movement — refer first, record later.</p></Card>
      <div className="grid gap-3 sm:grid-cols-2">
        {learnCards.map((c) => (
          <Card key={c.id}>
            <span className="grid size-9 place-items-center rounded-full bg-green-100 text-green"><BookOpen className="size-4" /></span>
            <p className="mt-3 font-display text-xl text-emerald">{c.title}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{c.summary}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{c.tags.map((t) => <span key={t} className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${t === "Danger sign" || t === "Emergency" ? "bg-coral-100 text-coral" : "bg-ivory text-muted"}`}>{t}</span>)}</div>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted">Content follows Rwanda CHW maternal-health protocols and is reviewed by MamaCare’s clinical lead. Rule set v0.4.</p>
    </div>
  );
}
