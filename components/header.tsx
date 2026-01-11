"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, TrendingUp, User, Settings, LogOut, Plus, Minus } from "lucide-react"
import { useRouter } from "next/navigation"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentPath, setCurrentPath] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is signed in
    const signedIn = localStorage.getItem("isSignedIn") === "true"
    setIsSignedIn(signedIn)

    // Get current path
    setCurrentPath(window.location.pathname)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("isSignedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    setIsSignedIn(false)
    router.push("/")
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isSignedIn) {
      e.preventDefault()
      handleSignOut()
    }
  }

  const getNavItems = () => {
    const isLandingPage = currentPath === "/"

    if (isLandingPage && !isSignedIn) {
      return [
        { href: "/markets", label: "Markets" },
        { href: "/about", label: "About Us" },
        { href: "/how-we-work", label: "How We Work" },
      ]
    }

    if (isSignedIn) {
      // Authenticated: Markets and Invest only
      return [
        { href: "/markets", label: "Markets" },
        { href: "/invest", label: "Invest" },
      ]
    }

    // Default (other pages): All nav items except Dashboard
    return [
      { href: "/markets", label: "Markets" },
      { href: "/invest", label: "Invest" },
      { href: "/about", label: "About Us" },
      { href: "/how-we-work", label: "How We Work" },
    ]
  }

  const navItems = getNavItems()

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-smooth ${
        isScrolled
          ? "border-b shadow-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "border-b/0 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/40"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            onClick={handleLogoClick}
            className={`flex items-center space-x-2 group ${isSignedIn ? "cursor-pointer" : ""}`}
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <TrendingUp className="h-8 w-8 text-primary transition-smooth group-hover:scale-110 group-hover:text-accent" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-smooth group-hover:from-accent group-hover:to-primary">
                ZENITH
              </span>
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium px-4 py-2 rounded-lg transition-smooth hover:bg-accent/10 hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex transition-smooth hover-scale hover:bg-accent/10"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-scale-in">
                <DropdownMenuItem className="transition-smooth hover:bg-accent/10 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="transition-smooth hover:bg-accent/10 cursor-pointer">
                  <Link href="/deposit">
                    <Plus className="mr-2 h-4 w-4" />
                    Deposit Funds
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="transition-smooth hover:bg-accent/10 cursor-pointer">
                  <Link href="/withdraw">
                    <Minus className="mr-2 h-4 w-4" />
                    Withdraw Funds
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="transition-smooth hover:bg-destructive/10 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex transition-smooth hover-scale hover:bg-accent/10"
                asChild
              >
                <Link href="/signin">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild className="hidden md:flex transition-smooth hover-lift">
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden transition-smooth hover-scale">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="transition-smooth hover:text-accent"
                  >
                    {item.label}
                  </Link>
                ))}
                {isSignedIn && (
                  <>
                    <Link
                      href="/deposit"
                      onClick={() => setIsOpen(false)}
                      className="transition-smooth hover:text-accent"
                    >
                      Deposit Funds
                    </Link>
                    <Link
                      href="/withdraw"
                      onClick={() => setIsOpen(false)}
                      className="transition-smooth hover:text-accent"
                    >
                      Withdraw Funds
                    </Link>
                  </>
                )}
                {!isSignedIn && (
                  <Button asChild className="mt-4 transition-smooth hover-lift">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                )}
                {isSignedIn && (
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="mt-4 transition-smooth hover-lift bg-transparent"
                  >
                    Sign Out
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
