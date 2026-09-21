import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, Bell, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = { title: "Dashboard" };

const caseload = [
  { name: "Uwase C.", weeks: 31, risk: "High", last: "12 min ago", note: "Headache + blurred vision + swelling" },
  { name: "Mukamana J.", weeks: 24, risk: "Moderate", last: "2 h ago", note: "Reduced fetal movement reported by partner" },
  { name: "Ingabire A.", weeks: 18, risk: "Low", last: "Yesterday", note: "Routine check-in, no concerns" },
  { name: "Nyirahabimana D.", weeks: 36, risk: "Low", last: "2 days ago", note: "ANC visit 4 completed" },
];

const riskStyle: Record<string, string> = {
  High: "bg-coral text-white",
  Moderate: "bg-gold text-midnight",
  Low: "bg-green text-ivory",
};

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const { welcome } = await searchParams;
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard");
  const user = session.user;

  return (
    <div className="min-h-[100svh] bg-ivory">
      <header className="sticky top-0 z-30 border-b border-emerald/10 bg-ivory/85 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="MamaCare home">
            <Image src="/brand/mark.png" alt="" width={36} height={42} className="h-9 w-auto" />
            <Image src="/brand/wordmark.png" alt="MamaCare" width={120} height={18} className="hidden h-[18px] w-auto sm:block" />
          </Link>
          <div className="flex items-center gap-2">
            <button className="relative grid size-10 place-items-center rounded-full text-emerald hover:bg-emerald/5" aria-label="Notifications">
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-coral" />
            </button>
            <div className="hidden items-center gap-3 rounded-full bg-white py-1 pl-1 pr-4 ring-1 ring-emerald/10 sm:flex">
              {user.image ? (
                <Image src={user.image} alt="" width={32} height={32} className="size-8 rounded-full" />
              ) : (
                <span className="grid size-8 place-items-center rounded-full bg-emerald text-xs font-bold text-ivory">
                  {(user.name ?? user.email ?? "?").slice(0, 1).toUpperCase()}
                </span>
              )}
              <div className="leading-tight">
                <p className="text-sm font-semibold text-emerald">{user.name ?? user.email}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted">{user.role ?? "member"}</p>
              </div>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-emerald hover:bg-emerald/5">
                <LogOut className="size-4" /> <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container-x py-8 md:py-12">
        {welcome && (
          <div className="mb-8 flex items-start gap-3 rounded-lg border border-green/30 bg-green-100 p-5 text-emerald">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green" />
            <div>
              <p className="font-display text-2xl">Welcome to MamaCare, {user.name?.split(" ")[0]}.</p>
              <p className="mt-1 text-sm text-ink/80">
                Your account is set up as <strong>{user.role}</strong>. This dashboard is a placeholder until the role-specific apps are built —
                the mother, family and CHW experiences will replace it.
              </p>
            </div>
          </div>
        )}
        <p className="text-eyebrow text-green">Kinyinya sector · CHW caseload</p>
        <h1 className="text-h2 mt-2 text-emerald">Muraho, {user.name?.split(" ")[0] ?? "there"}.</h1>
        <p className="mt-2 text-muted">This is a placeholder dashboard — connect it to the MamaCare API to show live data.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, label: "Mothers followed", value: "24", tone: "text-green bg-green-100" },
            { icon: AlertTriangle, label: "Open escalations", value: "1", tone: "text-coral bg-coral-100" },
            { icon: CheckCircle2, label: "Check-ins this week", value: "37", tone: "text-violet bg-violet-100" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-lg bg-white p-5 ring-1 ring-emerald/5">
              <span className={`grid size-11 place-items-center rounded-full ${s.tone}`}>
                <s.icon className="size-5" />
              </span>
              <div>
                <p className="font-display text-3xl text-emerald">{s.value}</p>
                <p className="text-sm text-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-lg bg-white ring-1 ring-emerald/5">
          <div className="flex items-center justify-between border-b border-emerald/10 px-5 py-4">
            <h2 className="text-h3 text-emerald">Recent activity</h2>
            <span className="text-xs text-muted">Sorted by risk</span>
          </div>
          <ul className="divide-y divide-emerald/10">
            {caseload.map((c) => (
              <li key={c.name} className="grid gap-2 px-5 py-4 sm:grid-cols-12 sm:items-center">
                <div className="sm:col-span-4">
                  <p className="font-semibold text-emerald">{c.name}</p>
                  <p className="text-xs text-muted">{c.weeks} weeks · {c.last}</p>
                </div>
                <p className="text-sm text-ink/80 sm:col-span-6">{c.note}</p>
                <div className="sm:col-span-2 sm:text-right">
                  <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${riskStyle[c.risk]}`}>{c.risk}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
