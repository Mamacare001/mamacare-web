import type { Metadata } from "next";
import { PrivacyContent } from "@/components/pages/PrivacyContent";

export const metadata: Metadata = { title: "Privacy", description: "How MamaCare collects, uses, protects and shares information." };

export default function PrivacyPage() {
  return <PrivacyContent />;
}
