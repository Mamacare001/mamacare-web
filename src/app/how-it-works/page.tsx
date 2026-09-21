import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Audiences } from "@/components/how/Audiences";
import { RiskLevels } from "@/components/how/RiskLevels";
import { Safety } from "@/components/home/Safety";
import { ChatPreview } from "@/components/home/ChatPreview";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "How it works",
  description: "Speak, understand, assess, guide, act — how MamaCare turns a conversation into timely, medically reviewed action.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            The language model <span className="text-violet">understands</span>. Clinical rules guide the action.
          </>
        }
        lead="MamaCare is a hybrid system — not a chatbot alone. Every recommendation passes through medically reviewed rules, and a human is always in the loop."
      />
      <HowItWorks />
      <RiskLevels />
      <Audiences />
      <ChatPreview />
      <Safety />
      <CtaBand />
    </>
  );
}
