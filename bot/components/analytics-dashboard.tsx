"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for analytics
const queryStats = {
  totalQueries: 1248,
  resolvedQueries: 1052,
  escalatedQueries: 196,
  resolutionRate: 84.3,
}

const topQueries = [
  { id: 1, query: "How do I reset my password?", count: 87, category: "Authentication" },
  { id: 2, query: "How do I create a new sales order?", count: 64, category: "Sales" },
  { id: 3, query: "Where can I find the inventory report?", count: 52, category: "Inventory" },
  { id: 4, query: "How do I approve a purchase order?", count: 43, category: "Purchasing" },
  { id: 5, query: "How do I generate a financial report?", count: 38, category: "Finance" },
]

const knowledgeGaps = [
  { id: 1, query: "How do I set up automated inventory alerts?", count: 23, status: "Unresolved" },
  { id: 2, query: "Can I customize the dashboard for my department?", count: 19, status: "Unresolved" },
  { id: 3, query: "How do I integrate with our CRM system?", count: 17, status: "In Progress" },
  { id: 4, query: "Is there a mobile app for approvals?", count: 15, status: "Unresolved" },
  { id: 5, query: "How do I set up multi-currency support?", count: 12, status: "In Progress" },
]

const departmentUsage = [
  { id: 1, department: "Sales", queries: 342, resolutionRate: 88.6 },
  { id: 2, department: "Finance", queries: 287, resolutionRate: 82.9 },
  { id: 3, department: "Inventory", queries: 231, resolutionRate: 85.7 },
  { id: 4, department: "HR", queries: 198, resolutionRate: 79.3 },
  { id: 5, department: "IT", queries: 190, resolutionRate: 91.1 },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queryStats.totalQueries}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queryStats.resolvedQueries}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Escalated Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queryStats.escalatedQueries}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queryStats.resolutionRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="top-queries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="top-queries">Top Queries</TabsTrigger>
          <TabsTrigger value="knowledge-gaps">Knowledge Gaps</TabsTrigger>
          <TabsTrigger value="department-usage">Department Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="top-queries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Frequent Queries</CardTitle>
              <CardDescription>The most commonly asked questions across the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topQueries.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.query}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">{item.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge-gaps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Gaps</CardTitle>
              <CardDescription>Queries that couldn't be answered from the knowledge base</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {knowledgeGaps.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.query}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell className="text-right">{item.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department-usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Usage</CardTitle>
              <CardDescription>Query volume and resolution rates by department</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Queries</TableHead>
                    <TableHead className="text-right">Resolution Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentUsage.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.department}</TableCell>
                      <TableCell className="text-right">{item.queries}</TableCell>
                      <TableCell className="text-right">{item.resolutionRate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

