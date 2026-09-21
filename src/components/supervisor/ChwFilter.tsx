"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Chw } from "@/lib/mock/supervisor";

export function ChwFilter({ chws }: { chws: Chw[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  return (
    <select
      value={sp.get("chw") ?? ""}
      onChange={(e) => {
        const p = new URLSearchParams(sp.toString());
        if (e.target.value) p.set("chw", e.target.value); else p.delete("chw");
        router.push(`/supervisor/mothers?${p.toString()}`);
      }}
      className="ml-auto h-9 rounded-full border border-emerald/15 bg-white px-3 text-sm"
      aria-label="Filter by CHW"
    >
      <option value="">All CHWs</option>
      {chws.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
    </select>
  );
}
