import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChatInterface } from "@/components/chat-interface";

export default async function ChatPage() {
  const { userId } = await auth();

  // If not signed in, redirect to sign-in page
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="container-lg mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Sentinel Chat</h1>
      <div className="w-full max-w-4xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden border">
        <ChatInterface />
      </div>
    </div>
  );
}