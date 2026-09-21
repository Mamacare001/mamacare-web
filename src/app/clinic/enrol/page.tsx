import { PageTitle } from "@/components/app/ui";
import { ClinicEnrolForm } from "@/components/clinic/ClinicEnrolForm";

export const metadata = { title: "Enrol a mother" };

export default function ClinicEnrolPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="ANC booking · Kwandika umubyeyi" title="Enrol a mother" />
      <p className="mb-6 text-sm text-muted">For a woman booking ANC here who is not yet on MamaCare. She gets an SMS with her link and code; the CHW you assign is notified and follows her at home between visits.</p>
      <ClinicEnrolForm />
    </div>
  );
}
