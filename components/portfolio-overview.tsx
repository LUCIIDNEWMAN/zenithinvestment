"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react"

const portfolioData = [
  { name: "AAPL", value: 45250, change: 2.4, shares: 150 },
  { name: "GOOGL", value: 32100, change: -1.2, shares: 25 },
  { name: "TSLA", value: 28900, change: 5.7, shares: 120 },
  { name: "MSFT", value: 38750, change: 1.8, shares: 100 },
]

export function PortfolioOverview() {
  const totalValue = portfolioData.reduce((sum, stock) => sum + stock.value, 0)
  const totalChange = portfolioData.reduce((sum, stock) => sum + (stock.value * stock.change) / 100, 0)
  const changePercent = (totalChange / totalValue) * 100

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Portfolio Dashboard</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your investments in real-time with comprehensive analytics and performance metrics.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {changePercent >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={changePercent >= 0 ? "text-green-500" : "text-red-500"}>
                  {changePercent >= 0 ? "+" : ""}
                  {changePercent.toFixed(2)}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Day's Change</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+$1,247</div>
              <p className="text-xs text-muted-foreground">+2.1% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Holdings</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioData.length}</div>
              <p className="text-xs text-muted-foreground">Active positions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+12.8%</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioData.map((stock) => (
                <div key={stock.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">{stock.name.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-sm text-muted-foreground">{stock.shares} shares</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${stock.value.toLocaleString()}</div>
                    <Badge variant={stock.change >= 0 ? "default" : "destructive"} className="text-xs">
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
