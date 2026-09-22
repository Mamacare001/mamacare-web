import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Statement } from "@/components/about/Statement";
import { StorySlider } from "@/components/about/StorySlider";
import { Manifesto } from "@/components/about/Manifesto";
import { Team } from "@/components/about/Team";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description: "Why MamaCare exists, what we learned from mothers, families, CHWs and midwives, and where we are going.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About MamaCare"
        title={
          <>
            Connected for <span className="text-coral">healthier</span> pregnancies.
          </>
        }
        lead="MamaCare is an early-stage research and technology project from Kigali, Rwanda, at the intersection of AI, maternal health, multilingual care and responsible innovation."
        image="/images/chw-visit.jpg"
        imageAlt="A Community Health Worker visiting a pregnant woman at home"
      />
      <Statement />
      <Manifesto />
      <StorySlider />
      <Team />
      <CtaBand />
    </>
  );
}
