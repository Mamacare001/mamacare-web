"use client";

/**
 * On-device queue for work done without network (visits, referrals, enrolments).
 * Stored in localStorage; each item is replayed against its server action when online.
 * Replace localStorage with IndexedDB if payloads (e.g. photos) grow.
 */
import { useCallback, useEffect, useState } from "react";

export type QueuedItem = { id: string; kind: "visit" | "referral" | "enrol" | "escalation" | "supporter"; label: string; at: number; payload: Record<string, string> };
const KEY = "mc.chw.queue";
const EVENT = "mc-queue-change";

export function readQueue(): QueuedItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as QueuedItem[];
  } catch {
    return [];
  }
}
function writeQueue(items: QueuedItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}
export function enqueue(item: Omit<QueuedItem, "id" | "at">): QueuedItem {
  const full: QueuedItem = { ...item, id: Math.random().toString(36).slice(2), at: Date.now() };
  writeQueue([...readQueue(), full]);
  return full;
}
export function dequeue(id: string) {
  writeQueue(readQueue().filter((i) => i.id !== id));
}

export function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    const id = requestAnimationFrame(update);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return online;
}

export function useQueue() {
  const [items, setItems] = useState<QueuedItem[]>([]);
  useEffect(() => {
    const load = () => setItems(readQueue());
    const id = requestAnimationFrame(load);
    window.addEventListener(EVENT, load);
    window.addEventListener("storage", load);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener(EVENT, load);
      window.removeEventListener("storage", load);
    };
  }, []);
  const remove = useCallback((id: string) => dequeue(id), []);
  return { items, remove };
}

/** Form payload → plain object so it can be serialised. */
export function formToPayload(fd: FormData): Record<string, string> {
  const o: Record<string, string> = {};
  fd.forEach((v, k) => {
    if (typeof v === "string") o[k] = v;
  });
  return o;
}
export function payloadToForm(p: Record<string, string>): FormData {
  const fd = new FormData();
  Object.entries(p).forEach(([k, v]) => fd.append(k, v));
  return fd;
}
