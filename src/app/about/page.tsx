import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { Statement } from "@/components/about/Statement";
import { StorySlider } from "@/components/about/StorySlider";
import { Manifesto } from "@/components/about/Manifesto";
import { Team } from "@/components/about/Team";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description: "Why MamaRindwa exists, what we learned from mothers, families, CHWs and midwives, and where we are going.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Statement />
      <Manifesto />
      <StorySlider />
      <Team />
      <CtaBand />
    </>
  );
}
