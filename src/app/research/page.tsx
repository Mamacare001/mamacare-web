import type { Metadata } from "next";
import { ResearchContent } from "@/components/research/ResearchContent";

export const metadata: Metadata = {
  title: "Research & validation",
  description: "MamaCare's research agenda, validation status, ethics approvals and how to request data.",
};

export default function ResearchPage() {
  return <ResearchContent />;
}
