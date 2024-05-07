"use client"

import { Link } from "@/navigation"
import { usePathname } from "@/navigation"
import { pathnames } from "@/app/[locale]/components/config"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useTranslations } from "next-intl"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string | any;
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const t=useTranslations()
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {t(item.title)}
        </Link>
      ))}
    </nav>
  )
}