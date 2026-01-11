"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, DollarSign, Users, ArrowUpRight, ArrowDownRight, Copy, Share2, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      // Extract first name from full name
      const firstName = storedName.split(" ")[0]
      setUserName(firstName)
    }
  }, [])
  const [copied, setCopied] = useState(false)
  const totalInvestment = 12450.67
  const dayChange = 247.32
  const dayChangePercent = 2.03
  const totalReturn = 1450.67
  const totalReturnPercent = 13.2
  const referralCount = 12
  const referralTotalDeposits = 8500 // Total deposits from referred users
  const referralEarnings = referralTotalDeposits * 0.03 // 3% of referred deposits
  const referralLink = "https://zenith.com/ref/john-doe-2024"

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const recentActivity = [
    { type: "buy", symbol: "AAPL", shares: 2, price: 175.43, date: "2024-01-15", time: "10:30 AM" },
    { type: "sell", symbol: "GOOGL", shares: 1, price: 125.3, date: "2024-01-14", time: "2:15 PM" },
    { type: "dividend", symbol: "MSFT", amount: 15.6, date: "2024-01-12", time: "9:00 AM" },
    { type: "referral", name: "Sarah M.", bonus: 25, date: "2024-01-10", time: "11:45 AM" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 sm:py-8 px-4 sm:px-6">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Here's how your investments are performing today.
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">${totalInvestment.toLocaleString()}</div>
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
              <CardTitle className="text-xs sm:text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-green-600">+${totalReturn.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+{totalReturnPercent}% all time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Referral Count</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{referralCount}</div>
              <p className="text-xs text-muted-foreground">Friends referred</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Cash Available</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">$1,549.33</div>
              <p className="text-xs text-muted-foreground">Ready to invest</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Referral Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Refer Friends & Earn</CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs sm:text-sm">
                  3% of deposits
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-lg">
                  <Share2 className="h-10 sm:h-12 w-10 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Share ZENITH with Friends</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    Earn 3% of every deposit made by friends you refer. No limits on earnings!
                  </p>
                  <div className="text-xl sm:text-2xl font-bold text-green-600 mb-2">
                    ${referralEarnings.toFixed(2)} earned
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    3% from ${referralTotalDeposits.toLocaleString()} in referred deposits
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="referral-link" className="text-sm">
                    Your Personal Referral Link
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input id="referral-link" value={referralLink} readOnly className="font-mono text-xs sm:text-sm" />
                    <Button
                      onClick={copyReferralLink}
                      variant="outline"
                      size="icon"
                      className="w-full sm:w-auto bg-transparent"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {copied && <p className="text-xs text-green-600">Link copied to clipboard!</p>}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
                  <div className="text-center p-3 sm:p-4 border rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-primary">{referralCount}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Total Referrals</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 border rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">${referralEarnings.toFixed(2)}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Total Earned (3%)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <Button className="w-full text-sm sm:text-base" asChild>
                  <Link href="/invest">Invest More</Link>
                </Button>
                <Button variant="outline" className="w-full text-sm sm:text-base bg-transparent" asChild>
                  <Link href="/deposit">
                    <Plus className="h-4 w-4 mr-2" />
                    Deposit
                  </Link>
                </Button>
                <Button variant="outline" className="w-full text-sm sm:text-base bg-transparent" asChild>
                  <Link href="/withdraw">
                    <Minus className="h-4 w-4 mr-2" />
                    Withdraw
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  {recentActivity.slice(0, 4).map((activity, index) => (
                    <div key={index} className="flex items-center justify-between text-xs sm:text-sm gap-2">
                      <div className="flex items-center space-x-2 min-w-0">
                        {activity.type === "buy" && <ArrowUpRight className="h-3 w-3 text-green-500 flex-shrink-0" />}
                        {activity.type === "sell" && <ArrowDownRight className="h-3 w-3 text-red-500 flex-shrink-0" />}
                        {activity.type === "dividend" && <DollarSign className="h-3 w-3 text-blue-500 flex-shrink-0" />}
                        {activity.type === "referral" && <Users className="h-3 w-3 text-purple-500 flex-shrink-0" />}
                        <span className="font-medium truncate">
                          {activity.type === "buy" && "Bought"}
                          {activity.type === "sell" && "Sold"}
                          {activity.type === "dividend" && "Dividend"}
                          {activity.type === "referral" && "Referral"}
                        </span>
                        <span className="truncate">
                          {activity.type === "referral" ? activity.name : activity.symbol}
                        </span>
                      </div>
                      <div className="text-right text-muted-foreground flex-shrink-0">{activity.date}</div>
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
