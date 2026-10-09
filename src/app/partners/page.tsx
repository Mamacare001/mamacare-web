import type { Metadata } from "next";
import { PartnersContent } from "@/components/partners/PartnersContent";

export const metadata: Metadata = {
  title: "Partners",
  description: "How the Ministry of Health, insurers, NGOs and research institutions work with MamaRindwa.",
};

export default function PartnersPage() {
  return <PartnersContent />;
}
