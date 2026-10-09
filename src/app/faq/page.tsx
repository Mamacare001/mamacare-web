import type { Metadata } from "next";
import { FaqContent } from "@/components/faq/FaqContent";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers for mothers, families and health workers about how MamaRindwa works and how your information is protected.",
};

export default function FaqPage() {
  return <FaqContent />;
}
