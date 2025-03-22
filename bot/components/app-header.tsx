"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, HelpCircle, Search } from "lucide-react"
import Link from "next/link"
import { useAuth, UserButton } from "@clerk/nextjs"

export function AppHeader() {
  const { isSignedIn } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />

      <div className="flex-1">
        <h1 className="text-lg font-semibold">IDMS ERP System</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Button asChild variant="default" size="sm">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  )
}

