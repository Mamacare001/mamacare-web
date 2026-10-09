import type { Metadata } from "next";
import { HowHero } from "@/components/how/HowHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Audiences } from "@/components/how/Audiences";
import { RiskLevels } from "@/components/how/RiskLevels";
import { Safety } from "@/components/home/Safety";
import { ChatPreview } from "@/components/home/ChatPreview";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "How it works",
  description: "Speak, understand, assess, guide, act — how MamaRindwa turns a conversation into timely, medically reviewed action.",
};

export default function HowItWorksPage() {
  return (
    <>
      <HowHero />
      <HowItWorks />
      <RiskLevels />
      <Audiences />
      <ChatPreview />
      <Safety />
      <CtaBand />
    </>
  );
}
