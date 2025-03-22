"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Send, Mic, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { useUser } from "@clerk/nextjs"

type Message = {
  id: string
  content: string
  role: "user" | "assistant" | "system"
  timestamp?: Date
}

export function ChatInterface() {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      content: `Hello${user?.firstName ? ` ${user.firstName}` : ""}! I'm the AI Sentinel of Knowledge. How can I help you with your IDMS ERP system today?`,
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Update welcome message when user data loads
  useEffect(() => {
    if (user && messages.length === 1 && messages[0].id === "welcome-message") {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === "welcome-message"
            ? {
                ...msg,
                content: `Hello ${user.firstName || ""}! I'm the AI Sentinel of Knowledge. How can I help you with your IDMS ERP system today?`,
              }
            : msg
        )
      );
    }
  }, [user]);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  async function handleSendMessage() {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Fetch relevant knowledge base entries to use as context
      const relevantKnowledge = await fetchRelevantKnowledgeBase(input)
      let contextPrompt = ""

      if (relevantKnowledge.length > 0) {
        contextPrompt =
          "Here is some relevant information from our knowledge base:\n\n" +
          relevantKnowledge.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join("\n\n") +
          "\n\nPlease use this information if relevant to answer the user's question."
      }

      // Create a system prompt that includes knowledge base context and user info
      const userInfo = user ? `The user's name is ${user.firstName} ${user.lastName}.` : ""

      const systemPrompt = `You are the AI Sentinel of Knowledge, an assistant for the IDMS ERP system. 
    ${userInfo}
    Provide helpful, concise responses about ERP functionality, modules like Sales, HR, and Finance.
    ${contextPrompt}
    
    If you're not sure about something, be honest about your limitations.
    If the question requires escalation to human support, suggest that option.`

      // Use the AI SDK to generate a response with streaming
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: input,
        system: systemPrompt,
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: text,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Log this interaction for analytics
      logInteraction(input, text, relevantKnowledge.length > 0)
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please try again or contact support.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch relevant knowledge base entries based on the query
  const fetchRelevantKnowledgeBase = async (query: string): Promise<any[]> => {
    try {
      const response = await fetch(`/api/knowledge?query=${encodeURIComponent(query)}`)
      const data = await response.json()
      return data.items || []
    } catch (error) {
      console.error("Error fetching knowledge base:", error)
      return []
    }
  }

  // Log interaction for analytics
  const logInteraction = async (query: string, response: string, usedKnowledgeBase: boolean) => {
    try {
      await fetch("/api/analytics/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          response,
          usedKnowledgeBase,
          timestamp: new Date().toISOString(),
          userId: user?.id || null,
        }),
      })
    } catch (error) {
      console.error("Error logging interaction:", error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex items-start gap-3 max-w-[80%]", message.role === "user" ? "ml-auto" : "")}
          >
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8">
                <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full text-xs">
                  AI
                </div>
              </Avatar>
            )}

            <Card className={cn("p-3", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp ? message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
              </div>
            </Card>

            {message.role === "user" && (
              <Avatar className="h-8 w-8">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl || "/placeholder.svg"}
                    alt={user.firstName || "User"}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <div className="bg-secondary text-secondary-foreground flex items-center justify-center h-full w-full">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full text-xs">
                AI
              </div>
            </Avatar>
            <Card className="p-3 bg-muted">
              <p className="text-sm">Thinking...</p>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

