import { requireAdminMfa } from "@/lib/admin-guard";
import { featureFlags, system } from "@/lib/mock/admin";
import { toggleFlag } from "@/app/admin/actions";
import { Head, Panel } from "@/components/admin/ui";
import { Toggle } from "@/components/admin/Buttons";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  await requireAdminMfa("/admin/settings");
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <Head eyebrow={system.env} title="Settings & feature flags" note="Flags change behaviour without a deploy and are audit-logged. Anything that touches risk logic (e.g. the learned model) also needs the clinical lead’s approval before it can be turned on." />
      <Panel title="Feature flags">
        <ul className="divide-y divide-emerald/10">
          {featureFlags.map((f) => (
            <li key={f.key} className="flex items-center justify-between gap-4 py-3"><div><p className="font-mono text-sm text-emerald">{f.key}</p><p className="text-sm text-muted">{f.desc}</p></div><Toggle on={f.on} label={f.key} onChange={async (v) => { "use server"; await toggleFlag(f.key, v); }} /></li>
          ))}
        </ul>
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Environments"><ul className="space-y-1.5 text-sm text-ink/85"><li><strong className="text-emerald">production</strong> — real data, SSO + MFA, break-glass only</li><li><strong className="text-emerald">staging</strong> — synthetic data, rules/models/content review</li><li><strong className="text-emerald">development</strong> — synthetic data only, no production credentials</li></ul></Panel>
        <Panel title="Retention policy"><ul className="space-y-1.5 text-sm text-ink/85"><li>Pregnancy record: duration of care + period agreed with MoH</li><li>Conversation text: minimised after structuring; full text 90 d</li><li>Audit log: 7 years, append-only</li><li>Research extracts: deleted at protocol expiry</li></ul></Panel>
      </div>
    </div>
  );
}
