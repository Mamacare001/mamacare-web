"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // TODO: send to your error tracker (Sentry, etc.)
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[100svh] items-center bg-ivory pt-24">
      <div className="container-x py-20">
        <p className="text-eyebrow text-coral">Something went wrong</p>
        <h1 className="text-display mt-4 max-w-[14ch] text-emerald">We hit a problem on our side.</h1>
        <p className="text-lead mt-6 max-w-xl text-muted">It has been recorded. You can try again, or go back to the home page.</p>
        {error.digest && <p className="mt-3 font-mono text-xs text-muted">Reference: {error.digest}</p>}
        <div className="mt-9 flex flex-wrap gap-3">
          <Button variant="primary" onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">Home</Button>
        </div>
        <p className="mt-12 text-sm text-muted">
          In an emergency, do not wait for this page: <Link href="/emergency" className="font-semibold text-coral underline underline-offset-4">call 912</Link>.
        </p>
      </div>
    </section>
  );
}
