import { ArrowRight, Baby, HeartHandshake, Users, ShieldCheck, Stethoscope, BarChart3, Database, Settings } from "lucide-react";
import { RoleShell, currentRole } from "@/components/shared/RoleShell";
import { roleLabel, homeByRole } from "@/lib/mock/shared";
import { switchRole } from "@/app/switch-role/actions";
import { PageTitle } from "@/components/app/ui";

export const metadata = { title: "Switch role" };

const icons: Record<string, typeof Baby> = { mother: Baby, family: HeartHandshake, chw: Users, supervisor: ShieldCheck, provider: Stethoscope, analyst: BarChart3, "care-manager": HeartHandshake, researcher: Database, admin: Settings };
/** Demo: which extra roles each demo account "also holds". Real data comes from the API (a midwife who is also pregnant; a CHW who supports a relative). */
const extra: Record<string, string[]> = { provider: ["mother"], chw: ["family"], supervisor: ["chw"], admin: ["analyst"] };

export default async function SwitchRolePage() {
  const { role, name } = await currentRole();
  const roles = [role, ...(extra[role] ?? [])];
  return (
    <RoleShell callback="/switch-role">
      <div className="mx-auto max-w-2xl">
        <PageTitle eyebrow={name} title="Switch role" />
        <p className="mb-6 text-muted">One identity, several roles. Each role sees only what it needs — a midwife who is also pregnant sees her own record as a mother, not as a provider.</p>
        <ul className="space-y-2">
          {roles.map((r) => { const I = icons[r] ?? Users; return (
            <li key={r}><form action={switchRole}><input type="hidden" name="role" value={r} /><button className={`flex w-full items-center gap-4 rounded-lg p-4 text-left ring-1 transition-colors ${r === role ? "bg-emerald text-ivory ring-emerald" : "bg-white text-emerald ring-emerald/10 hover:bg-ivory"}`}><span className={`grid size-11 place-items-center rounded-full ${r === role ? "bg-white/15" : "bg-green-100 text-green"}`}><I className="size-5" /></span><span className="flex-1"><span className="block font-display text-xl">{roleLabel[r]}</span><span className={`block text-xs ${r === role ? "text-ivory/70" : "text-muted"}`}>{homeByRole[r]}{r === role && " · current"}</span></span><ArrowRight className="size-5 opacity-60" /></button></form></li>
          ); })}
        </ul>
        <p className="mt-6 text-xs text-muted">Switching is logged. Permissions are evaluated per action against the active role and your relationship to the record, never inherited from who you are.</p>
      </div>
    </RoleShell>
  );
}
