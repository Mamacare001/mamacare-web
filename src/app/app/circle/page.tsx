import { circle, profile } from "@/lib/mock/mother";
import { PageTitle, Card } from "@/components/app/ui";
import { CircleList, ShareCode } from "@/components/app/CircleList";

export const metadata = { title: "My circle" };

export default function CirclePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Who can see your information" title="My circle" />
      <Card className="mb-6">
        <p className="text-eyebrow text-muted">Your code · Kode yawe</p>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <ShareCode code={profile.code} />
          <p className="max-w-sm text-sm text-muted">Give this to a family member so they can ask to join. Nothing is shared until you approve them here.</p>
        </div>
      </Card>
      <CircleList members={circle} />
      <p className="mt-6 text-xs text-muted">Your CHW and facility are your care team; ask the health centre if you need a change. Family members can be removed at any time. See the <a href="/consent" className="underline underline-offset-4">consent page</a> for details.</p>
    </div>
  );
}
