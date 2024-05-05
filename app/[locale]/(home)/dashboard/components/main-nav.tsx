import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/students"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Students
      </Link>
      <Link
            href="/teachers"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Teachers
      </Link>
      <Link
        href="/teachers"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Parents
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Classes
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Billing
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    
    </nav>
  )
}