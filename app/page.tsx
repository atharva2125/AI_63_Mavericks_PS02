import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">AI Sentinel of Knowledge</h1>
        <p className="text-center mb-8 text-muted-foreground">Your IDMS ERP assistant</p>

        <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden border">
          <ChatInterface />
        </div>
      </div>
    </main>
  )
}

