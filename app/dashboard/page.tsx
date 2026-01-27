"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, DollarSign, Users, ArrowUpRight, ArrowDownRight, Copy, Share2, Plus, Minus, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import useSWR from "swr"

interface DashboardData {
  profile: {
    id: string
    full_name: string
    email: string
    balance: number
    total_invested: number
    total_returns: number
    referral_code: string
    referral_earnings: number
  }
  investments: any[]
  active_investments: any[]
  transactions: any[]
  referral_count: number
  referral_earnings: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [copied, setCopied] = useState(false)
  const [dayChange, setDayChange] = useState(0)
  const [dayChangePercent, setDayChangePercent] = useState(0)
  const [totalReturnPercent, setTotalReturnPercent] = useState(0)
  const [referralTotalDeposits, setReferralTotalDeposits] = useState(0)
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])

  // Fetch dashboard data
  const { data, error, isLoading } = useSWR<DashboardData>("/api/dashboard", fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
  })

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/signin")
      }
    }
    checkAuth()
  }, [supabase.auth, router])

  useEffect(() => {
    if (data) {
      setDayChange(data.profile.day_change || 0)
      setDayChangePercent(data.profile.day_change_percent || 0)
      setTotalReturnPercent(data.profile.total_return_percent || 0)
      setReferralTotalDeposits(data.profile.referral_total_deposits || 0)
      setRecentActivity(data.transactions || [])
      setTransactions(data.transactions || [])
    }
  }, [data])

  const profile = data?.profile
  const userName = profile?.full_name?.split(" ")[0] || "User"
  const totalInvestment = profile?.total_invested || 0
  const totalReturn = profile?.total_returns || 0
  const balance = profile?.balance || 0
  const referralCount = data?.referral_count || 0
  const referralEarnings = data?.referral_earnings || 0
  const referralCode = profile?.referral_code || ""
  const referralLink = `${typeof window !== "undefined" ? window.location.origin : ""}/signup?ref=${referralCode}`

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-red-500">Failed to load dashboard data</p>
        </div>
      </div>
    )
  }

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
              <div className="text-xl sm:text-2xl font-bold">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
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
                    3% from ${referralTotalDeposits.toLocaleString()} in total deposits
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
                  {transactions.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                  ) : (
                    transactions.slice(0, 4).map((tx: any) => (
                      <div key={tx.id} className="flex items-center justify-between text-xs sm:text-sm gap-2">
                        <div className="flex items-center space-x-2 min-w-0">
                          {tx.type === "deposit" && <ArrowUpRight className="h-3 w-3 text-green-500 flex-shrink-0" />}
                          {tx.type === "withdrawal" && <ArrowDownRight className="h-3 w-3 text-red-500 flex-shrink-0" />}
                          {tx.type === "investment" && <TrendingUp className="h-3 w-3 text-blue-500 flex-shrink-0" />}
                          {tx.type === "return" && <DollarSign className="h-3 w-3 text-green-500 flex-shrink-0" />}
                          {tx.type === "referral_bonus" && <Users className="h-3 w-3 text-purple-500 flex-shrink-0" />}
                          <span className="font-medium truncate capitalize">{tx.type.replace("_", " ")}</span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className={tx.amount >= 0 ? "text-green-500" : "text-red-500"}>
                            {tx.amount >= 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
