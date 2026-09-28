import type { Metadata } from "next";
import { EmergencyContent } from "@/components/pages/EmergencyContent";

export const metadata: Metadata = {
  title: "Emergency",
  description: "If you or someone near you is in danger: call 912 or go to the nearest health facility now.",
};

export default function EmergencyPage() {
  return <EmergencyContent />;
}
