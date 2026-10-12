import type { Metadata } from "next";
import { TermsContent } from "@/components/pages/TermsContent";

export const metadata: Metadata = { title: "Terms of use", description: "The terms under which IjwiCare is provided." };

export default function TermsPage() {
  return <TermsContent />;
}
