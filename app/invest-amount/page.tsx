"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function InvestAmountPage() {
  const router = useRouter()
  const supabase = createClient()
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [currentBalance, setCurrentBalance] = useState(1549.33)
  const minInvestment = 20

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        // First check localStorage
        const isSignedIn = localStorage.getItem("isSignedIn") === "true"
        
        // Then check Supabase auth as backup
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!isSignedIn && !user) {
          router.push("/signin")
          return
        }

        // Fetch user balance from API if available
        try {
          const response = await fetch("/api/user/profile")
          if (response.ok) {
            const profileData = await response.json()
            setCurrentBalance(profileData.balance || currentBalance)
          }
        } catch (error) {
          console.log("Could not fetch balance from API, using default")
        }

        setIsCheckingAuth(false)
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/signin")
      }
    }

    checkAuth()
  }, [router, supabase.auth])

  const handleInvest = async () => {
    const investAmount = Number.parseFloat(amount)

    if (!investAmount || investAmount < minInvestment) {
      alert(`Minimum investment is $${minInvestment}`)
      return
    }

    if (investAmount > currentBalance) {
      alert("Insufficient balance. Please deposit more funds.")
      return
    }

    setIsLoading(true)

    try {
      // Simulate investment process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      localStorage.setItem("investmentAmount", amount)
      router.push("/invest-lock-in")
    } catch (error) {
      console.error("Investment error:", error)
      alert("Investment failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/invest">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Investment Program
              </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-2">Initial Investment</h1>
            <p className="text-muted-foreground">Specify your investment amount to proceed</p>
          </div>

          <div className="grid gap-6">
            {/* Program Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Core Investment Portfolio</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  A balanced investment program designed to generate consistent returns with flexible capital access
                  options.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Initial Return</div>
                    <div className="font-semibold text-green-600">25%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Investment Period</div>
                    <div className="font-semibold">4 weeks</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Minimum</div>
                    <div className="font-semibold">${minInvestment}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Balance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Available Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">${currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <p className="text-sm text-muted-foreground">Ready to invest</p>
              </CardContent>
            </Card>

            {/* Investment Amount */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Amount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount to Invest</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8"
                      min={minInvestment}
                      max={currentBalance}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Minimum: ${minInvestment} • Maximum: ${currentBalance.toLocaleString()}
                  </p>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[20, 100, 500, 1000].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      disabled={quickAmount > currentBalance}
                    >
                      ${quickAmount}
                    </Button>
                  ))}
                </div>

                <Button onClick={handleInvest} className="w-full" disabled={!amount || isLoading} size="lg">
                  {isLoading ? "Processing..." : "Continue to Lock-in Options"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
