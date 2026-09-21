import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { Connects } from "@/components/home/Connects";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ChatPreview } from "@/components/home/ChatPreview";
import { Stats } from "@/components/home/Stats";
import { Safety } from "@/components/home/Safety";
import { CtaBand } from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Connects />
      <HowItWorks />
      <ChatPreview />
      <Stats />
      <Safety />
      <CtaBand />
    </>
  );
}
