import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center bg-ivory pt-24">
      <div className="container-x py-20">
        <Reveal variant="fade" duration={0.6} as="p" className="text-eyebrow text-coral">404</Reveal>
        <TextReveal as="h1" trigger="mount" delay={0.35} className="text-display mt-4 max-w-[14ch] text-emerald">
          This page is not on our map.
        </TextReveal>
        <Reveal variant="blur" delay={0.8} as="p" className="text-lead mt-6 max-w-xl text-muted">
          The link may be old, or the page may have moved. Nothing to worry about.
        </Reveal>
        <Reveal variant="scale" delay={1} className="mt-9 flex flex-wrap gap-3">
          <Button href="/" variant="primary" arrow>Back to home</Button>
          <Button href="/contact" variant="secondary">Tell us what you were looking for</Button>
        </Reveal>
        <Reveal variant="fade" delay={1.2} as="p" className="mt-12 text-sm text-muted">
          In an emergency, this page cannot help you: <Link href="/emergency" className="font-semibold text-coral underline underline-offset-4">call 912</Link>.
        </Reveal>
      </div>
    </section>
  );
}
