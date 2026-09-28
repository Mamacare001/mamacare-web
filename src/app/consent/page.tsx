import type { Metadata } from "next";
import { ConsentContent } from "@/components/pages/ConsentContent";

export const metadata: Metadata = { title: "Consent", description: "Who can see your information on MamaCare, in plain language." };

export default function ConsentPage() {
  return <ConsentContent />;
}
