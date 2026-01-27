"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function InvestmentOptions() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      // Check localStorage first
      const signedInLocal = localStorage.getItem("isSignedIn") === "true"
      
      // Check Supabase auth as backup
      const { data: { user } } = await supabase.auth.getUser()
      
      setIsSignedIn(signedInLocal || !!user)
    }
    
    checkAuth()
  }, [supabase.auth])

  const investmentPlan = {
    title: "Core Investment Portfolio",
    description:
      "A balanced investment program designed to generate consistent returns with flexible capital access options.",
    expectedReturn: "25%",
    minInvestment: "$20",
    investmentPeriod: "4 weeks",
    icon: TrendingUp,
    features: ["Algorithmic trading", "Risk-managed approach", "Flexible withdrawals"],
  }

  const handleStartInvesting = () => {
    if (isSignedIn) {
      router.push("/invest-amount")
    } else {
      localStorage.setItem("redirectAfterSignup", "invest-page")
      router.push("/signup")
    }
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Investment Program</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access our professionally managed investment program with transparent returns and flexible capital lock-in
            terms.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">{investmentPlan.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{investmentPlan.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Initial Return</div>
                  <div className="font-semibold text-green-600">{investmentPlan.expectedReturn}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Investment Period</div>
                  <div className="font-semibold">{investmentPlan.investmentPeriod}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Minimum Investment</div>
                  <div className="font-semibold">{investmentPlan.minInvestment}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Program Features:</div>
                <div className="flex flex-wrap gap-2">
                  {investmentPlan.features.map((feature) => (
                    <div
                      key={feature}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full group-hover:bg-primary/90 transition-colors" onClick={handleStartInvesting}>
                Start Investing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
