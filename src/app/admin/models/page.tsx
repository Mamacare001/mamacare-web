import { requireAdminMfa } from "@/lib/admin-guard";
import { models } from "@/lib/mock/admin";
import { promoteModel } from "@/app/admin/actions";
import { Head, Panel, Badge, statusTone } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/Buttons";

export const metadata = { title: "Models" };

export default async function ModelsPage() {
  await requireAdminMfa("/admin/models");
  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <Head eyebrow="Model registry" title="Models" note="Production is rules-only until a learned model has a signed validation report (ds-lead), a clinical safety review (clinical-lead) and a bias audit. Promotion is a release-manager action that checks all three." />
      <div className="grid gap-4 lg:grid-cols-3">
        {models.map((m) => (
          <Panel key={m.id}>
            <div className="flex items-start justify-between gap-2"><p className="font-display text-xl text-emerald">{m.name}</p><Badge tone={statusTone(m.stage)}>{m.stage}</Badge></div>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div><dt className="text-eyebrow text-muted">Trained</dt><dd className="text-ink/85">{m.trained}</dd></div>
              <div><dt className="text-eyebrow text-muted">Validation</dt><dd className="text-ink/85">{m.validation}</dd></div>
              <div><dt className="text-eyebrow text-muted">Bias audit</dt><dd className={m.bias.includes("review") ? "text-[#8a6a10]" : "text-ink/85"}>{m.bias}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-muted">{m.note}</p>
            {m.stage === "staging" && <div className="mt-3"><ActionButton label="Promote to shadow mode" doneLabel="Blocked: sign-offs missing" tone="ghost" action={async () => { "use server"; await promoteModel(m.id); }} /></div>}
          </Panel>
        ))}
      </div>
    </div>
  );
}
