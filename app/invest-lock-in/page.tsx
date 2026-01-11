"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

interface LockInOption {
  id: string
  title: string
  withdrawalTiming: string
  totalLockPeriod: string
  baseReturn: number
  additionalReturn: number
  totalReturn: number
  description: string
}

export default function InvestLockInPage() {
  const router = useRouter()
  const [investmentAmount, setInvestmentAmount] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>("")

  const lockInOptions: LockInOption[] = [
    {
      id: "immediate",
      title: "Flexible Access",
      withdrawalTiming: "Immediate withdrawal after 4 weeks",
      totalLockPeriod: "4 weeks",
      baseReturn: 25,
      additionalReturn: 0,
      totalReturn: 25,
      description: "Access your capital immediately upon completion of the initial investment period",
    },
    {
      id: "two-months",
      title: "Growth Reinvestment",
      withdrawalTiming: "Lock for 2 months",
      totalLockPeriod: "8 weeks",
      baseReturn: 25,
      additionalReturn: 25,
      totalReturn: 50,
      description: "Maintain your investment for two months to earn additional returns",
    },
    {
      id: "four-months",
      title: "Maximum Returns",
      withdrawalTiming: "Lock for 4 months",
      totalLockPeriod: "16 weeks",
      baseReturn: 25,
      additionalReturn: 75,
      totalReturn: 100,
      description: "Long-term commitment for maximum compound growth and returns",
    },
  ]

  useEffect(() => {
    // Redirect if not signed in
    const isSignedIn = localStorage.getItem("isSignedIn") === "true"
    if (!isSignedIn) {
      router.push("/signin")
      return
    }

    const savedAmount = localStorage.getItem("investmentAmount")
    if (!savedAmount) {
      router.push("/invest-amount")
      return
    }

    setInvestmentAmount(savedAmount)
  }, [router])

  const handleConfirmInvestment = async () => {
    if (!selectedOption) {
      alert("Please select a lock-in option")
      return
    }

    setIsLoading(true)

    try {
      // Simulate investment confirmation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const selectedPlan = lockInOptions.find((opt) => opt.id === selectedOption)

      // Store investment details
      localStorage.setItem(
        "activeInvestment",
        JSON.stringify({
          amount: investmentAmount,
          lockInOption: selectedOption,
          plan: selectedPlan,
          createdAt: new Date().toISOString(),
        }),
      )

      // Show success and redirect
      alert(`Successfully invested $${investmentAmount} with ${selectedPlan?.title} option!`)
      router.push("/dashboard")
    } catch (error) {
      console.error("Investment confirmation error:", error)
      alert("Investment confirmation failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!investmentAmount) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
      </div>
    )
  }

  const selectedPlan = lockInOptions.find((opt) => opt.id === selectedOption)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/invest-amount">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Amount Selection
              </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-2">Select Capital Lock-in Period</h1>
            <p className="text-muted-foreground">
              Choose how long to maintain your investment to maximize returns. Investment amount: ${investmentAmount}
            </p>
          </div>

          {/* Lock-in Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {lockInOptions.map((option) => (
              <Card
                key={option.id}
                className={`relative cursor-pointer transition-all ${
                  selectedOption === option.id ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {option.totalLockPeriod}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{option.description}</p>

                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-muted-foreground">Initial Return</div>
                      <div className="text-lg font-semibold">{option.baseReturn}%</div>
                    </div>
                    {option.additionalReturn > 0 && (
                      <div>
                        <div className="text-xs text-muted-foreground">Additional Return</div>
                        <div className="text-lg font-semibold text-green-600">+{option.additionalReturn}%</div>
                      </div>
                    )}
                    <div className="pt-2 border-t">
                      <div className="text-xs text-muted-foreground">Total Return</div>
                      <div className="text-2xl font-bold text-primary">{option.totalReturn}%</div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-xs font-medium">
                      Projected Value: ${(Number(investmentAmount) * (1 + option.totalReturn / 100)).toFixed(2)}
                    </p>
                  </div>

                  <div
                    className={`p-2 rounded border text-xs font-medium transition-all ${
                      selectedOption === option.id
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-transparent border-muted text-muted-foreground"
                    }`}
                  >
                    {selectedOption === option.id ? "✓ Selected" : "Select option"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary and Confirmation */}
          {selectedPlan && (
            <Card className="mb-8 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Investment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment Amount:</span>
                  <span className="font-semibold">${investmentAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lock-in Period:</span>
                  <span className="font-semibold">{selectedPlan.totalLockPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Return Rate:</span>
                  <span className="font-semibold text-green-600">{selectedPlan.totalReturn}%</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-muted-foreground font-medium">Projected Value:</span>
                  <span className="font-bold text-lg text-primary">
                    ${(Number(investmentAmount) * (1 + selectedPlan.totalReturn / 100)).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/invest-amount">Back</Link>
            </Button>
            <Button
              onClick={handleConfirmInvestment}
              disabled={!selectedOption || isLoading}
              size="lg"
              className="flex-1"
            >
              {isLoading ? "Confirming Investment..." : "Confirm Investment"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
