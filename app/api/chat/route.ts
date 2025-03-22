import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { messages, stream = false } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    // Extract the latest user message
    const latestUserMessage = messages.filter((msg) => msg.role === "user").pop()?.content || ""

    // Fetch relevant knowledge base entries
    const knowledgeBaseResponse = await fetch(
      `${request.nextUrl.origin}/api/knowledge?query=${encodeURIComponent(latestUserMessage)}`,
    )
    const knowledgeBaseData = await knowledgeBaseResponse.json()
    const relevantKnowledge = knowledgeBaseData.items || []

    // Create context from knowledge base
    let contextPrompt = ""
    if (relevantKnowledge.length > 0) {
      contextPrompt =
        "Here is some relevant information from our knowledge base:\n\n" +
        relevantKnowledge.map((item: any) => `Q: ${item.question}\nA: ${item.answer}`).join("\n\n") +
        "\n\nPlease use this information if relevant to answer the user's question."
    }

    // Create system prompt with knowledge base context
    const systemPrompt = `You are the AI Sentinel of Knowledge, an assistant for the IDMS ERP system. 
    Provide helpful, concise responses about ERP functionality, modules like Sales, HR, and Finance.
    ${contextPrompt}
    
    If you're not sure about something, be honest about your limitations.
    If the question requires escalation to human support, suggest that option.`

    // Format messages for the AI model
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }))

    // If streaming is requested
    if (stream) {
      // In a real implementation, you would stream the response
      // This is a simplified version
      const { text } = await generateText({
        model: openai("gpt-4o"),
        messages: formattedMessages,
        system: systemPrompt,
      })

      return NextResponse.json({ text })
    } else {
      // Non-streaming response
      const { text } = await generateText({
        model: openai("gpt-4o"),
        messages: formattedMessages,
        system: systemPrompt,
      })

      // Log this interaction
      await fetch(`${request.nextUrl.origin}/api/analytics/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: latestUserMessage,
          response: text,
          usedKnowledgeBase: relevantKnowledge.length > 0,
          timestamp: new Date().toISOString(),
        }),
      })

      return NextResponse.json({ text })
    }
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}

