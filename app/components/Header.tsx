"use client"
import Link from "next/link"
import { CircleUser, Menu, Package2, SchoolIcon, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "../(home)/dashboard/components/theme-mode"
import { usePathname, useRouter } from "next/navigation"
export default function Header(){
const pathname=usePathname()
console.log(pathname);

    return(
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <SchoolIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/dashboard"
          className={`${pathname=== '/dashboard' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
          Dashboard
        </Link>
        <Link
          href="/students"
          className={`${pathname=== '/students' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
         Students
        </Link>
        <Link
          href="/teachers"
          className={`${pathname=== '/teachers' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
          Teachers
        </Link>
        <Link
           href="/parents"
           className={`${pathname=== '/parents' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
           >
          Parents
        </Link>
        <Link
          href="/classes"
          className={`${pathname=== '/classes' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
          Classes
        </Link>
        <Link
          href="/billing"
          className={`${pathname=== '/billing' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
          Billing
        </Link>
        <Link
          href="/settings"
          className={`${pathname=== '/settings' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
          Settings
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">

   
            <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <SchoolIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/dashboard"
          className={`${pathname=== '/dashboard' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
          Dashboard
        </Link>
        <Link
          href="/students"
          className={`${pathname=== '/students' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
         Students
        </Link>
        <Link
          href="/teachers"
          className={`${pathname=== '/teachers' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
          Teachers
        </Link>
        <Link
           href="/parents"
           className={`${pathname=== '/parents' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
           >
          Parents
        </Link>
        <Link
          href="/classes"
          className={`${pathname=== '/classes' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
          Classes
        </Link>
        <Link
          href="/billing"
          className={`${pathname=== '/billing' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
          Billing
        </Link>
        <Link
          href="/settings"
          className={`${pathname=== '/settings' ?'text-black-500 dark:text-white ' : 'text-muted-foreground hover:text-foreground foreground transition-colors'}`}
        >
          Settings
        </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle/>
      </div>
    </header>
    )
}
