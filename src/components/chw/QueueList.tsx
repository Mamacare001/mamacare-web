"use client";

import { Trash2, CloudUpload } from "lucide-react";
import { useQueue } from "@/lib/offline/queue";
import { SyncStatus } from "@/components/chw/SyncStatus";

export function QueueList() {
  const { items, remove } = useQueue();
  if (items.length === 0) return <p className="rounded-lg bg-white p-4 text-sm text-muted ring-1 ring-emerald/5">Nothing waiting to sync.</p>;
  return (
    <div className="rounded-lg bg-white ring-1 ring-emerald/5">
      <div className="flex items-center justify-between border-b border-emerald/10 p-3"><p className="text-sm font-semibold text-emerald">{items.length} item{items.length > 1 ? "s" : ""} waiting</p><SyncStatus /></div>
      <ul className="divide-y divide-emerald/10">
        {items.map((it) => (
          <li key={it.id} className="flex items-center gap-3 p-3">
            <CloudUpload className="size-4 text-muted" />
            <div className="flex-1"><p className="text-sm font-semibold text-emerald">{it.label}</p><p className="text-xs text-muted">{new Date(it.at).toLocaleString("en-GB")}</p></div>
            <button type="button" onClick={() => { if (confirm("Discard this saved item? It has not been sent.")) remove(it.id); }} className="rounded-full p-2 text-coral hover:bg-coral-100" aria-label="Discard"><Trash2 className="size-4" /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
