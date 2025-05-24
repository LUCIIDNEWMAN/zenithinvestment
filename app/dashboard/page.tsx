"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Plus, Eye } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const portfolioValue = 12450.67
  const dayChange = 247.32
  const dayChangePercent = 2.03
  const totalReturn = 1450.67
  const totalReturnPercent = 13.2

  const holdings = [
    { symbol: "AAPL", name: "Apple Inc.", shares: 15, value: 2625.45, change: 2.4, allocation: 21.1 },
    { symbol: "GOOGL", name: "Alphabet Inc.", shares: 8, value: 2100.32, change: -1.2, allocation: 16.9 },
    { symbol: "MSFT", name: "Microsoft Corp.", shares: 12, value: 1875.6, change: 1.8, allocation: 15.1 },
    { symbol: "TSLA", name: "Tesla Inc.", shares: 6, value: 1492.8, change: -0.5, allocation: 12.0 },
    { symbol: "NVDA", name: "NVIDIA Corp.", shares: 3, value: 1356.5, change: 3.2, allocation: 10.9 },
  ]

  const recentActivity = [
    { type: "buy", symbol: "AAPL", shares: 2, price: 175.43, date: "2024-01-15", time: "10:30 AM" },
    { type: "sell", symbol: "GOOGL", shares: 1, price: 125.3, date: "2024-01-14", time: "2:15 PM" },
    { type: "dividend", symbol: "MSFT", amount: 15.6, date: "2024-01-12", time: "9:00 AM" },
    { type: "buy", symbol: "NVDA", shares: 1, price: 875.28, date: "2024-01-10", time: "11:45 AM" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's how your investments are performing today.</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
              <div className="flex items-center space-x-1 text-xs">
                {dayChange >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span className={dayChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {dayChange >= 0 ? "+" : ""}${Math.abs(dayChange).toFixed(2)} ({dayChange >= 0 ? "+" : ""}
                  {dayChangePercent}%)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+${totalReturn.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+{totalReturnPercent}% all time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Holdings</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{holdings.length}</div>
              <p className="text-xs text-muted-foreground">Active positions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cash Available</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,549.33</div>
              <p className="text-xs text-muted-foreground">Ready to invest</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Holdings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Holdings</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/invest">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Investment
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding) => (
                    <div
                      key={holding.symbol}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-primary text-sm">{holding.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{holding.symbol}</div>
                          <div className="text-sm text-muted-foreground">{holding.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {holding.shares} shares • {holding.allocation}% of portfolio
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${holding.value.toLocaleString()}</div>
                        <Badge variant={holding.change >= 0 ? "default" : "destructive"} className="text-xs">
                          {holding.change >= 0 ? "+" : ""}
                          {holding.change}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/analytics">
                      <Eye className="h-4 w-4 mr-2" />
                      View Detailed Analytics
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/invest">Invest More</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/markets">View Markets</Link>
                </Button>
                <Button variant="outline" className="w-full">
                  Withdraw Funds
                </Button>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>This Month</span>
                    <span className="text-green-600">+5.2%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>This Year</span>
                    <span className="text-green-600">+13.2%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>All Time</span>
                    <span className="text-green-600">+13.2%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.slice(0, 4).map((activity, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        {activity.type === "buy" && <ArrowUpRight className="h-3 w-3 text-green-500" />}
                        {activity.type === "sell" && <ArrowDownRight className="h-3 w-3 text-red-500" />}
                        {activity.type === "dividend" && <DollarSign className="h-3 w-3 text-blue-500" />}
                        <span className="font-medium">
                          {activity.type === "buy" && "Bought"}
                          {activity.type === "sell" && "Sold"}
                          {activity.type === "dividend" && "Dividend"}
                        </span>
                        <span>{activity.symbol}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
