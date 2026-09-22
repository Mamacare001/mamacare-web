import type { Metadata } from "next";
import { JoinPage } from "@/components/join/JoinPage";

export const metadata: Metadata = {
  title: "Join us",
  description: "Work at MamaCare, write your own role, or drop an idea in the box. We answer everyone within 14 days.",
};

export default function Page() {
  return <JoinPage />;
}
