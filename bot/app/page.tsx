"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = useAuth();
  const isSignedIn = !!userId;

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">AI Sentinel of Knowledge</h1>
          <p className="text-xl mb-8 text-muted-foreground">Your intelligent IDMS ERP assistant</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isSignedIn ? (
              <Button asChild size="lg">
                <Link href="/chat">Start Chatting</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/sign-up">Create Account</Link>
                </Button>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-2">Instant Answers</h3>
              <p className="text-muted-foreground">Get immediate responses to your ERP questions using advanced AI.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-2">Knowledge Base</h3>
              <p className="text-muted-foreground">
                Access a comprehensive database of ERP information and best practices.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-2">Multi-Channel Support</h3>
              <p className="text-muted-foreground">
                Connect via chat, email, Slack, Teams, and more for seamless support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}