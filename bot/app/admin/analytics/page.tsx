import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function AnalyticsPage() {
  const { userId } = auth()

  // If not signed in, redirect to sign-in page
  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">AI Sentinel Analytics</h1>
      <AnalyticsDashboard />
    </div>
  )
}

