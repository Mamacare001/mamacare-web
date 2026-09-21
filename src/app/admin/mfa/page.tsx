import { KeyRound } from "lucide-react";
import { MfaForm } from "@/components/admin/MfaForm";

export const metadata = { title: "Verify" };

export default async function AdminMfaPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-gold-100 text-[#8a6a10]"><KeyRound className="size-7" /></span>
      <h1 className="text-h2 mt-6 text-emerald">Second factor required</h1>
      <p className="mt-2 text-muted">The admin console needs a fresh step-up every 30 minutes, on top of SSO. Enter the code from your authenticator.</p>
      <div className="mt-8 w-full text-left"><MfaForm next={next ?? "/admin"} /></div>
    </div>
  );
}
