import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center bg-ivory pt-24">
      <div className="container-x py-20">
        <p className="text-eyebrow text-coral">404</p>
        <h1 className="text-display mt-4 max-w-[14ch] text-emerald">This page is not on our map.</h1>
        <p className="text-lead mt-6 max-w-xl text-muted">The link may be old, or the page may have moved. Nothing to worry about.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/" variant="primary" arrow>Back to home</Button>
          <Button href="/contact" variant="secondary">Tell us what you were looking for</Button>
        </div>
        <p className="mt-12 text-sm text-muted">
          In an emergency, this page cannot help you: <Link href="/emergency" className="font-semibold text-coral underline underline-offset-4">call 912</Link>.
        </p>
      </div>
    </section>
  );
}
