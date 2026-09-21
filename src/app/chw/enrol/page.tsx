import { PageTitle } from "@/components/app/ui";
import { EnrolForm } from "@/components/chw/ReferEnrolForms";

export const metadata = { title: "Enrol a mother" };

export default function EnrolPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Kwandika umubyeyi" title="Enrol a mother" />
      <p className="mb-6 text-sm text-muted">Two minutes. She gets an SMS with her link and code; she confirms and consents on her own phone.</p>
      <EnrolForm />
    </div>
  );
}
