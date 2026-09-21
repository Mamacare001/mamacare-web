"use client";

import { useEffect, useState, useTransition } from "react";
import { Wifi, WifiOff, RefreshCw, CloudUpload, Check } from "lucide-react";
import { useOnline, useQueue } from "@/lib/offline/queue";
import { syncQueued } from "@/app/chw/actions";
import { cn } from "@/lib/cn";

/** Shown in the CHW shell: online/offline, pending items, and a sync button. Auto-syncs when back online. */
export function SyncStatus({ compact }: { compact?: boolean }) {
  const online = useOnline();
  const { items, remove } = useQueue();
  const [syncing, start] = useTransition();
  const [done, setDone] = useState(false);

  const sync = () => {
    if (!online || items.length === 0) return;
    start(async () => {
      for (const it of items) {
        try {
          await syncQueued(it.kind, it.payload);
          remove(it.id);
        } catch {
          break; // stop on first failure; remaining items stay queued
        }
      }
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    });
  };

  // auto-sync when connectivity returns
  useEffect(() => {
    if (online && items.length > 0 && !syncing) {
      const id = setTimeout(sync, 800);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  // register the service worker once
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  const pending = items.length;
  return (
    <button
      type="button"
      onClick={sync}
      disabled={!online || pending === 0 || syncing}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold transition-colors",
        !online ? "bg-gold-100 text-[#8a6a10]" : pending > 0 ? "bg-coral-100 text-coral" : "bg-green-100 text-green",
      )}
      aria-live="polite"
      title={!online ? "Offline — work is saved on this phone and will sync when you are back online" : pending > 0 ? "Tap to sync now" : "All synced"}
    >
      {!online ? <WifiOff className="size-3.5" /> : syncing ? <RefreshCw className="size-3.5 animate-spin" /> : done ? <Check className="size-3.5" /> : pending > 0 ? <CloudUpload className="size-3.5" /> : <Wifi className="size-3.5" />}
      {!compact && (!online ? `Offline${pending ? ` · ${pending} saved` : ""}` : syncing ? "Syncing…" : done ? "Synced" : pending > 0 ? `Sync ${pending}` : "Online")}
      {compact && pending > 0 && <span>{pending}</span>}
    </button>
  );
}
