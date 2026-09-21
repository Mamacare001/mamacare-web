import { Phone, MapPin, Users, Building2, Smartphone } from "lucide-react";
import { chw, caseload } from "@/lib/mock/chw";
import { PageTitle, Card } from "@/components/app/ui";
import { Button } from "@/components/ui/Button";
import { QueueList } from "@/components/chw/QueueList";

export const metadata = { title: "Profile" };

export default function ChwProfilePage() {
  const tel = (p: string) => `tel:${p.replace(/\s/g, "")}`;
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <PageTitle eyebrow="Umujyanama w’ubuzima" title={chw.name} />
      <Card>
        <div className="grid gap-3 sm:grid-cols-2">
          <p className="flex items-center gap-2 text-sm text-ink/85"><MapPin className="size-4 text-green" /> {chw.village} · {chw.cell} cell · {chw.sector} · {chw.district}</p>
          <p className="flex items-center gap-2 text-sm text-ink/85"><Users className="size-4 text-green" /> {caseload.length} mothers in caseload</p>
          <p className="flex items-center gap-2 text-sm text-ink/85"><Building2 className="size-4 text-green" /> {chw.facility.name}</p>
          <p className="flex items-center gap-2 text-sm text-ink/85"><Smartphone className="size-4 text-green" /> {chw.phone}</p>
        </div>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="flex items-center justify-between gap-3"><div><p className="font-semibold text-emerald">{chw.binome.name}</p><p className="text-sm text-muted">Your binôme</p></div><Button href={tel(chw.binome.phone)} variant="secondary" size="sm"><Phone className="size-4" /> Call</Button></Card>
        <Card className="flex items-center justify-between gap-3"><div><p className="font-semibold text-emerald">{chw.supervisor.name}</p><p className="text-sm text-muted">Supervisor · {chw.facility.name}</p></div><Button href={tel(chw.supervisor.phone)} variant="secondary" size="sm"><Phone className="size-4" /> Call</Button></Card>
      </div>
      <section>
        <h2 className="text-h3 mb-2 text-emerald">Saved on this phone</h2>
        <QueueList />
      </section>
      <p className="text-xs text-muted">Your access to mothers’ records is logged and reviewed by your supervisor. Only mothers assigned to your village appear here.</p>
    </div>
  );
}
