import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, googleEnabled } from "@/auth";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Sign in" };

type Search = Promise<{ mode?: string; callbackUrl?: string; error?: string }>;

export default async function LoginPage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const session = await auth();
  if (session?.user) redirect(sp.callbackUrl ?? "/dashboard");

  const mode = sp.mode === "signup" ? "signup" : "signin";

  return (
    <section className="min-h-[100svh] bg-ivory md:grid md:grid-cols-12">
      {/* Visual panel */}
      <aside className="relative hidden overflow-hidden bg-midnight text-ivory md:col-span-5 md:block lg:col-span-6">
        <Image
          src="/images/mother-outdoors.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
        <div className="grain absolute inset-0" aria-hidden />
        <div className="relative flex h-full flex-col justify-between p-10 lg:p-14">
          <Link href="/" aria-label="MamaCare home" className="inline-flex items-center gap-2.5">
            <Image src="/brand/mark.png" alt="" width={40} height={46} className="h-10 w-auto" />
            <Image src="/brand/wordmark-white.png" alt="MamaCare" width={135} height={20} className="h-5 w-auto" />
          </Link>
          <div>
            <p className="text-h2 max-w-[16ch]">The warning can come before the emergency.</p>
            <p className="mt-4 max-w-md text-ivory/70">
              One continuous picture of every pregnancy — for mothers, families, CHWs and clinics.
            </p>
          </div>
        </div>
      </aside>

      {/* Form panel */}
      <div className="flex min-h-[100svh] flex-col px-5 pb-10 pt-6 sm:px-10 md:col-span-7 md:min-h-0 lg:col-span-6">
        <div className="flex items-center justify-between md:hidden">
          <Link href="/" aria-label="MamaCare home" className="inline-flex items-center gap-2">
            <Image src="/brand/mark.png" alt="" width={36} height={42} className="h-9 w-auto" />
            <Image src="/brand/wordmark.png" alt="MamaCare" width={120} height={18} className="h-[18px] w-auto" />
          </Link>
          <Link href="/" className="text-sm font-semibold text-emerald">
            ← Home
          </Link>
        </div>
        <div className="hidden justify-end md:flex">
          <Link href="/" className="link-underline text-sm font-semibold text-emerald">
            ← Back to site
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <LoginForm mode={mode} googleEnabled={googleEnabled} callbackUrl={sp.callbackUrl ?? "/dashboard"} error={sp.error} />
        </div>
        <p className="text-center text-xs text-muted">
          By continuing you agree to our terms and consent to MamaCare handling your data under Rwanda’s data-protection law.
        </p>
      </div>
    </section>
  );
}
