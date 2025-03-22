"use client"

import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { KnowledgeBaseManager } from "@/components/knowledge-base-manager"

export default function KnowledgeBasePage() {
  const { userId } = auth()

  // If not signed in, redirect to sign-in page
  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Knowledge Base Management</h1>
      <KnowledgeBaseManager />
    </div>
  )
}

