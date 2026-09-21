"use server";

import { revalidatePath } from "next/cache";

export async function markRead(id: string) { void id; await new Promise((r) => setTimeout(r, 150)); revalidatePath("/notifications"); } // TODO: PATCH /notifications/{id}
export async function markAllRead() { await new Promise((r) => setTimeout(r, 250)); revalidatePath("/notifications"); } // TODO: POST /notifications/read-all
