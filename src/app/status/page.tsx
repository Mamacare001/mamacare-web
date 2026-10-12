import type { Metadata } from "next";
import { StatusContent } from "@/components/pages/StatusContent";

export const metadata: Metadata = { title: "System status", description: "Live status of IjwiCare channels and services." };

export default function StatusPage() {
  return <StatusContent />;
}
