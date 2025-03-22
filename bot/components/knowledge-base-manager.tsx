"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2 } from "lucide-react"

type KnowledgeItem = {
  id: string
  question: string
  answer: string
  category: string
  keywords: string[]
}

export function KnowledgeBaseManager() {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [newItem, setNewItem] = useState({
    question: "",
    answer: "",
    category: "",
    keywords: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchKnowledgeBase()
  }, [])

  const fetchKnowledgeBase = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/knowledge")
      const data = await response.json()
      setKnowledgeItems(data.items)
    } catch (error) {
      console.error("Error fetching knowledge base:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddItem = async () => {
    try {
      const response = await fetch("/api/knowledge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: newItem.question,
          answer: newItem.answer,
          category: newItem.category,
          keywords: newItem.keywords.split(",").map((k) => k.trim()),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Add the new item to the list
        setKnowledgeItems([...knowledgeItems, data.entry])

        // Reset form
        setNewItem({
          question: "",
          answer: "",
          category: "",
          keywords: "",
        })

        setIsDialogOpen(false)
      } else {
        console.error("Error adding knowledge item:", data.error)
      }
    } catch (error) {
      console.error("Error adding knowledge item:", error)
    }
  }

  const filteredItems = knowledgeItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search knowledge base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add Knowledge Base Entry</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  value={newItem.question}
                  onChange={(e) => setNewItem({ ...newItem, question: e.target.value })}
                  placeholder="Enter the question"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  value={newItem.answer}
                  onChange={(e) => setNewItem({ ...newItem, answer: e.target.value })}
                  placeholder="Enter the answer"
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  placeholder="E.g., Sales, HR, Finance"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="keywords">Keywords (comma separated)</Label>
                <Input
                  id="keywords"
                  value={newItem.keywords}
                  onChange={(e) => setNewItem({ ...newItem, keywords: e.target.value })}
                  placeholder="E.g., login, password, reset"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Save Entry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center">Loading knowledge base...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Base Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.question}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.keywords.join(", ")}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No knowledge base entries found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  )
}

