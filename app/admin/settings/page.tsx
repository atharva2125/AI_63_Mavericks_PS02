"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [aiSettings, setAiSettings] = useState({
    model: "gpt-4o",
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt:
      "You are the AI Sentinel of Knowledge, an assistant for the IDMS ERP system. Provide helpful, concise responses about ERP functionality, modules like Sales, HR, and Finance. If you're not sure about something, be honest about your limitations. If the question requires escalation to human support, suggest that option.",
    useKnowledgeBase: true,
    fallbackToAI: true,
    logInteractions: true,
  })

  const [integrationSettings, setIntegrationSettings] = useState({
    ticketingSystem: "zendesk",
    ticketingApiKey: "",
    slackWebhook: "",
    teamsWebhook: "",
    whatsappEnabled: false,
    emailEnabled: true,
  })

  const handleAiSettingsChange = (field: string, value: any) => {
    setAiSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleIntegrationSettingsChange = (field: string, value: any) => {
    setIntegrationSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">AI Sentinel Settings</h1>

      <Tabs defaultValue="ai" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ai">AI Configuration</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Settings</CardTitle>
              <CardDescription>Configure the AI model and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model">AI Model</Label>
                <Select value={aiSettings.model} onValueChange={(value) => handleAiSettingsChange("model", value)}>
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="temperature">Temperature: {aiSettings.temperature}</Label>
                </div>
                <Slider
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[aiSettings.temperature]}
                  onValueChange={(value) => handleAiSettingsChange("temperature", value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Lower values make responses more deterministic, higher values more creative.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxTokens">Max Tokens</Label>
                <Input
                  id="maxTokens"
                  type="number"
                  value={aiSettings.maxTokens}
                  onChange={(e) => handleAiSettingsChange("maxTokens", Number.parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Maximum length of the AI response.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="systemPrompt">System Prompt</Label>
                <Textarea
                  id="systemPrompt"
                  value={aiSettings.systemPrompt}
                  onChange={(e) => handleAiSettingsChange("systemPrompt", e.target.value)}
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">
                  Instructions that guide the AI's behavior and responses.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="useKnowledgeBase"
                  checked={aiSettings.useKnowledgeBase}
                  onCheckedChange={(checked) => handleAiSettingsChange("useKnowledgeBase", checked)}
                />
                <Label htmlFor="useKnowledgeBase">Use Knowledge Base for Context</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="logInteractions"
                  checked={aiSettings.logInteractions}
                  onCheckedChange={(checked) => handleAiSettingsChange("logInteractions", checked)}
                />
                <Label htmlFor="logInteractions">Log AI Interactions for Analytics</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save AI Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ticketing System</CardTitle>
              <CardDescription>Configure integration with your support ticketing system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ticketingSystem">Ticketing System</Label>
                <Select
                  value={integrationSettings.ticketingSystem}
                  onValueChange={(value) => handleIntegrationSettingsChange("ticketingSystem", value)}
                >
                  <SelectTrigger id="ticketingSystem">
                    <SelectValue placeholder="Select ticketing system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zendesk">Zendesk</SelectItem>
                    <SelectItem value="jira">Jira Service Desk</SelectItem>
                    <SelectItem value="freshdesk">Freshdesk</SelectItem>
                    <SelectItem value="servicenow">ServiceNow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticketingApiKey">API Key</Label>
                <Input
                  id="ticketingApiKey"
                  type="password"
                  value={integrationSettings.ticketingApiKey}
                  onChange={(e) => handleIntegrationSettingsChange("ticketingApiKey", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Test Connection</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication Channels</CardTitle>
              <CardDescription>Configure additional communication channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                <Input
                  id="slackWebhook"
                  value={integrationSettings.slackWebhook}
                  onChange={(e) => handleIntegrationSettingsChange("slackWebhook", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamsWebhook">Microsoft Teams Webhook URL</Label>
                <Input
                  id="teamsWebhook"
                  value={integrationSettings.teamsWebhook}
                  onChange={(e) => handleIntegrationSettingsChange("teamsWebhook", e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="whatsappEnabled"
                  checked={integrationSettings.whatsappEnabled}
                  onCheckedChange={(checked) => handleIntegrationSettingsChange("whatsappEnabled", checked)}
                />
                <Label htmlFor="whatsappEnabled">Enable WhatsApp Integration</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="emailEnabled"
                  checked={integrationSettings.emailEnabled}
                  onCheckedChange={(checked) => handleIntegrationSettingsChange("emailEnabled", checked)}
                />
                <Label htmlFor="emailEnabled">Enable Email Notifications</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Channel Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chat Widget Appearance</CardTitle>
              <CardDescription>Customize how the chat widget appears to users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="widgetTitle">Widget Title</Label>
                <Input id="widgetTitle" defaultValue="AI Sentinel of Knowledge" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea
                  id="welcomeMessage"
                  defaultValue="Hello! I'm the AI Sentinel of Knowledge. How can I help you with your IDMS ERP system today?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input id="primaryColor" type="color" defaultValue="#0284c7" className="w-12 h-10 p-1" />
                  <Input defaultValue="#0284c7" className="flex-1" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="darkMode" defaultChecked={false} />
                <Label htmlFor="darkMode">Default to Dark Mode</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Appearance</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

