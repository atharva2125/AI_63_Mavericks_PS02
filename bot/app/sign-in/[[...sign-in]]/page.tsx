import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="mx-auto max-w-md w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground mt-2">Sign in to access the AI Sentinel of Knowledge</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
              card: "shadow-md rounded-lg border border-border",
            },
          }}
          redirectUrl="/chat"
        />
      </div>
    </div>
  )
}

