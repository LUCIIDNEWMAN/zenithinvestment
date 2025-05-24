"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, Zap, Globe } from "lucide-react"
import Link from "next/link"

const investmentOptions = [
  {
    title: "Growth Portfolio",
    description: "High-growth potential stocks and emerging markets",
    risk: "High",
    expectedReturn: "15-25%",
    minInvestment: "$500",
    icon: TrendingUp,
    features: ["Tech stocks", "Emerging markets", "Growth companies"],
  },
  {
    title: "Balanced Portfolio",
    description: "Mix of stocks, bonds, and diversified assets",
    risk: "Medium",
    expectedReturn: "8-15%",
    minInvestment: "$200",
    icon: Shield,
    features: ["Diversified", "Stable returns", "Lower volatility"],
  },
  {
    title: "Global Markets",
    description: "International exposure across developed markets",
    risk: "Medium",
    expectedReturn: "10-18%",
    minInvestment: "$50",
    icon: Globe,
    features: ["International stocks", "Currency diversification", "Global exposure"],
  },
  {
    title: "AI Trading",
    description: "Algorithm-driven investment strategies",
    risk: "High",
    expectedReturn: "12-30%",
    minInvestment: "$1,000",
    icon: Zap,
    features: ["AI algorithms", "Automated trading", "Advanced analytics"],
  },
]

export function InvestmentOptions() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Investment Strategies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our curated investment portfolios designed to match your risk tolerance and financial goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentOptions.map((option) => {
            const Icon = option.icon
            return (
              <Card key={option.title} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge
                      variant={
                        option.risk === "High" ? "destructive" : option.risk === "Medium" ? "default" : "secondary"
                      }
                    >
                      {option.risk} Risk
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Expected Return</div>
                      <div className="font-semibold text-green-600">{option.expectedReturn}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Min. Investment</div>
                      <div className="font-semibold">{option.minInvestment}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {option.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-primary/90 transition-colors" asChild>
                    <Link href="/signup">Start Investing</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
