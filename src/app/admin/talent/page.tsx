import { requireAdminMfa } from "@/lib/admin-guard";
import { applications, ideas, roles } from "@/lib/mock/careers";
import { setApplicationStatus, setIdeaStatus } from "@/app/admin/actions";
import { Head, Panel, Badge, dt } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/Buttons";

export const metadata = { title: "Talent & ideas" };

const appTone = (s: string) => (s === "hired" || s === "offer" ? "green" : s === "interview" || s === "reviewing" ? "gold" : s === "declined" ? "coral" : "violet") as "green" | "gold" | "coral" | "violet";
const ideaTone = (s: string) => (s === "adopted" ? "green" : s === "piloting" || s === "discussing" ? "gold" : s === "parked" ? "muted" : "violet") as "green" | "gold" | "coral" | "violet" | "muted";
/** Kept outside render so the purity rule is satisfied; server-side, once per request. */
async function currentTime() { return Date.now(); }

const APP_FLOW: Record<string, string> = { new: "reviewing", reviewing: "interview", interview: "offer", offer: "hired" };
const IDEA_FLOW: Record<string, string> = { new: "discussing", discussing: "piloting", piloting: "adopted" };

export default async function TalentPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await requireAdminMfa("/admin/talent");
  const { tab = "applications" } = await searchParams;
  const openApps = applications.filter((a) => !["hired", "declined"].includes(a.status)).length;
  const openIdeas = ideas.filter((i) => ["new", "discussing"].includes(i.status)).length;
  const now = await currentTime();
  const slaBreaches = [...applications.filter((a) => a.status === "new"), ...ideas.filter((i) => i.status === "new")].filter((x) => now - new Date(x.at).getTime() > 14 * 864e5).length;

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <Head
        eyebrow={`${openApps} open applications · ${openIdeas} ideas awaiting a reply${slaBreaches ? ` · ${slaBreaches} past the 14-day promise` : ""}`}
        title="Talent & ideas"
        note="Everything that came through /join. The public promise is a reply from a named human within 14 days — this page is where that promise is kept. Candidate data is personal data: visible to hiring owners only, deleted 6 months after a decision unless they ask us to keep it."
        action={<div className="flex gap-1 rounded-full bg-white p-1 ring-1 ring-emerald/10">{[["applications", `Applications (${applications.length})`], ["ideas", `Idea box (${ideas.length})`], ["roles", `Open roles (${roles.length})`]].map(([k, l]) => <a key={k} href={`/admin/talent?tab=${k}`} className={`rounded-full px-3 py-1.5 text-xs font-bold ${tab === k ? "bg-emerald text-ivory" : "text-emerald hover:bg-emerald/5"}`}>{l}</a>)}</div>}
      />

      {tab === "applications" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <ul className="space-y-3">
            {applications.map((a) => (
              <li key={a.id} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-xl text-emerald">{a.name} <span className="font-sans text-sm font-normal text-muted">· {a.where}</span></p>
                    <p className="text-xs text-muted">{a.id} · {dt(a.at)} · {a.contact}</p>
                    <p className="mt-1 text-sm font-semibold text-emerald">{a.roleId === "open" ? "✦ " : ""}{a.roleTitle}</p>
                  </div>
                  <div className="flex items-center gap-2"><Badge tone={appTone(a.status)}>{a.status}</Badge>{a.owner && <span className="text-xs text-muted">owner {a.owner}</span>}</div>
                </div>
                <p className="mt-3 rounded-md bg-ivory p-3 text-sm leading-relaxed text-ink/85">“{a.pitch}”</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">{a.link && <span>↗ {a.link}</span>}{a.cv && <span>📎 {a.cv}</span>}{a.notes && <span className="text-emerald">Note: {a.notes}</span>}</div>
                {!["hired", "declined"].includes(a.status) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <ActionButton label={`Move to ${APP_FLOW[a.status]}`} doneLabel="Moved" action={async () => { "use server"; await setApplicationStatus(a.id, APP_FLOW[a.status]); }} />
                    <ActionButton label="Decline with a kind note" doneLabel="Declined" tone="ghost" reason confirm={`Decline ${a.name}? They receive your note by email.`} action={async (r) => { "use server"; await setApplicationStatus(a.id, "declined", r); }} />
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Panel title="Pipeline">
            <ul className="space-y-2 text-sm">{["new", "reviewing", "interview", "offer", "hired", "declined"].map((s) => <li key={s} className="flex items-center justify-between"><Badge tone={appTone(s)}>{s}</Badge><span className="font-mono text-emerald">{applications.filter((a) => a.status === s).length}</span></li>)}</ul>
            <p className="mt-4 text-xs text-muted">Roles are edited in <code>src/lib/mock/careers.ts</code> until the API exists. Every status change emails the candidate; declines include your note verbatim — write it as you would say it.</p>
          </Panel>
        </div>
      )}

      {tab === "ideas" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <ul className="space-y-3">
            {ideas.map((i) => (
              <li key={i.id} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-xl text-emerald">{i.title}</p>
                    <p className="text-xs text-muted">{i.id} · {dt(i.at)} · <span className="font-semibold text-emerald">{i.who}</span> · {i.name} · {i.contact}{i.involved && " · wants to be involved"}</p>
                  </div>
                  <div className="flex items-center gap-2"><Badge tone={ideaTone(i.status)}>{i.status}</Badge>{i.owner && <span className="text-xs text-muted">owner {i.owner}</span>}</div>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-md bg-ivory p-3 text-sm"><p className="text-eyebrow text-muted">Problem</p><p className="mt-1 text-ink/85">{i.problem}</p></div>
                  <div className="rounded-md bg-ivory p-3 text-sm"><p className="text-eyebrow text-muted">Idea</p><p className="mt-1 text-ink/85">{i.idea}</p></div>
                </div>
                {i.reply && <p className="mt-2 rounded-md bg-green-100/70 p-3 text-sm text-emerald"><span className="text-eyebrow text-green">Our reply · </span>{i.reply}</p>}
                {!["adopted", "parked"].includes(i.status) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <ActionButton label={`Move to ${IDEA_FLOW[i.status]}`} doneLabel="Moved" action={async () => { "use server"; await setIdeaStatus(i.id, IDEA_FLOW[i.status]); }} />
                    <ActionButton label="Reply & adopt" doneLabel="Adopted" reason confirm="Send this reply and mark as adopted?" action={async (r) => { "use server"; await setIdeaStatus(i.id, "adopted", r); }} />
                    <ActionButton label="Reply & park" doneLabel="Parked" tone="ghost" reason confirm="Send this reply and park the idea?" action={async (r) => { "use server"; await setIdeaStatus(i.id, "parked", r); }} />
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Panel title="Where ideas come from">
            <ul className="space-y-2 text-sm">{["Mother", "Family member", "CHW", "Clinician", "Researcher", "Developer", "Other"].map((w) => <li key={w} className="flex items-center justify-between"><span className="text-ink/80">{w}</span><span className="font-mono text-emerald">{ideas.filter((i) => i.who === w).length}</span></li>)}</ul>
            <p className="mt-4 text-xs text-muted">Adopted ideas credit the submitter in release notes unless they asked to stay anonymous.</p>
          </Panel>
        </div>
      )}

      {tab === "roles" && (
        <ul className="grid gap-3 md:grid-cols-2">
          {roles.map((r) => (
            <li key={r.id} className="rounded-lg bg-white p-4 ring-1 ring-emerald/5">
              <div className="flex items-start justify-between gap-2"><div><p className="font-semibold text-emerald">{r.title}</p><p className="text-xs text-muted">{r.type} · {r.where} · {r.team}</p></div>{r.urgent && <Badge tone="coral">hiring now</Badge>}</div>
              <p className="mt-2 text-xs text-muted">{applications.filter((a) => a.roleId === r.id).length} application(s) · public at <code>/join#roles</code></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
