"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, TrendingUp, User } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              ZENITH
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/signin" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/markets" className="text-sm font-medium hover:text-primary transition-colors">
            Markets
          </Link>
          <Link href="/invest" className="text-sm font-medium hover:text-primary transition-colors">
            Invest
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/how-we-work" className="text-sm font-medium hover:text-primary transition-colors">
            How We Work
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
            <Link href="/signin">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild className="hidden md:flex">
            <Link href="/signup">Get Started</Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/signin" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/markets" onClick={() => setIsOpen(false)}>
                  Markets
                </Link>
                <Link href="/invest" onClick={() => setIsOpen(false)}>
                  Invest
                </Link>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  About Us
                </Link>
                <Link href="/how-we-work" onClick={() => setIsOpen(false)}>
                  How We Work
                </Link>
                <Button asChild className="mt-4">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
