import { requireAdminMfa } from "@/lib/admin-guard";
import { content } from "@/lib/mock/admin";
import { Head, Badge, statusTone } from "@/components/admin/ui";
import { ContentForm } from "@/components/admin/ContentForm";

export const metadata = { title: "Content" };

export default async function ContentPage() {
  await requireAdminMfa("/admin/content");
  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <Head eyebrow={`${content.length} strings · ${content.filter((c) => c.status !== "published").length} awaiting review`} title="Content · English / Kinyarwanda" note="Guidance, notification templates and consent text. A content-editor drafts; a translator reviews Kinyarwanda; only reviewed strings publish. Clinical guidance also needs the clinical lead." />
      <ul className="space-y-3">
        {content.map((c) => (
          <li key={c.key} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2"><p className="font-mono text-xs text-emerald">{c.key}</p><div className="flex items-center gap-2 text-xs text-muted"><Badge tone={statusTone(c.status)}>{c.status}</Badge>updated {c.updated} · reviewer {c.reviewer}</div></div>
            <ContentForm k={c.key} en={c.en} rw={c.rw} />
          </li>
        ))}
      </ul>
    </div>
  );
}
