import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

// In a real application, this would save to a database
const interactionLogs: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    const { query, response, usedKnowledgeBase, timestamp, userId: clientUserId } = await request.json()

    // Validate required fields
    if (!query || !response) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new log entry
    const logEntry = {
      id: Date.now().toString(),
      query,
      response,
      usedKnowledgeBase,
      timestamp,
      userId: userId || clientUserId || null,
    }

    // Store the log (in a real app, this would go to a database)
    interactionLogs.push(logEntry)

    // For demo purposes, we're just returning success
    return NextResponse.json({
      message: "Interaction logged successfully",
      logId: logEntry.id,
    })
  } catch (error) {
    console.error("Error logging interaction:", error)
    return NextResponse.json({ error: "Failed to log interaction" }, { status: 500 })
  }
}

// For demo purposes, we'll add a GET endpoint to retrieve logs
export async function GET() {
  const { userId } = auth()

  // In a real app, you would check if the user has admin permissions
  // For now, we'll just return all logs
  return NextResponse.json({ logs: interactionLogs })
}

