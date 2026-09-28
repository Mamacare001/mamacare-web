import type { Metadata } from "next";
import { ContactContent } from "@/components/site/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Partner with MamaCare, join the pilot, or collaborate on research.",
};

type Search = Promise<{ topic?: string }>;

export default async function ContactPage({ searchParams }: { searchParams: Search }) {
  const { topic } = await searchParams;
  return <ContactContent topic={topic} />;
}
