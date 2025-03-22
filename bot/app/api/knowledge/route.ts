import { type NextRequest, NextResponse } from "next/server"

// This would be replaced with your actual knowledge base integration
const knowledgeBase = [
  {
    id: "kb-001",
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the login screen and click 'Forgot Password'. Follow the instructions sent to your registered email.",
    category: "Authentication",
    keywords: ["login", "password", "reset", "forgot"],
  },
  {
    id: "kb-002",
    question: "How do I create a new sales order?",
    answer:
      "To create a new sales order, navigate to Sales > Orders > New. Fill in the customer details, add line items, and click Save.",
    category: "Sales",
    keywords: ["sales", "order", "create", "new"],
  },
  {
    id: "kb-003",
    question: "How can I check inventory levels?",
    answer:
      "You can check inventory levels by going to Inventory > Stock Levels. Filter by product, warehouse, or category to see specific items.",
    category: "Inventory",
    keywords: ["inventory", "stock", "level", "check"],
  },
  {
    id: "kb-004",
    question: "How do I generate a financial report?",
    answer:
      "To generate a financial report, go to Finance > Reports. Select the report type, specify the date range, and click Generate.",
    category: "Finance",
    keywords: ["finance", "report", "generate", "financial"],
  },
  {
    id: "kb-005",
    question: "How do I add a new employee to the system?",
    answer: "To add a new employee, navigate to HR > Employees > Add New. Fill in the required details and click Save.",
    category: "HR",
    keywords: ["hr", "employee", "add", "new"],
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")?.toLowerCase() || ""

  if (!query) {
    return NextResponse.json({ items: knowledgeBase })
  }

  // Search for matching knowledge base entries
  const results = knowledgeBase.filter((item) => {
    return item.question.toLowerCase().includes(query) || item.keywords.some((keyword) => query.includes(keyword))
  })

  return NextResponse.json({ items: results })
}

export async function POST(request: NextRequest) {
  try {
    const { question, answer, category, keywords } = await request.json()

    // Validate required fields
    if (!question || !answer || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, this would save to a database
    const newEntry = {
      id: `kb-${Date.now()}`,
      question,
      answer,
      category,
      keywords: keywords || [],
    }

    // For demo purposes, we're just returning the new entry
    return NextResponse.json({
      message: "Knowledge base entry created successfully",
      entry: newEntry,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

