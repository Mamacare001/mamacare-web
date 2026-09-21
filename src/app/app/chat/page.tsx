import { Chat } from "@/components/app/Chat";

export const metadata = { title: "Chat" };

export default async function ChatPage({ searchParams }: { searchParams: Promise<{ quick?: string }> }) {
  const { quick } = await searchParams;
  return <Chat initial={quick === "fine" ? "I feel fine today" : undefined} />;
}
