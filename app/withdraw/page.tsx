"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Wallet, AlertTriangle, DollarSign, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function WithdrawPage() {
  const router = useRouter()
  const supabase = createClient()
  const [withdrawData, setWithdrawData] = useState({
    address: "",
    amount: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [currentBalance, setCurrentBalance] = useState(0)
  const [isLoadingBalance, setIsLoadingBalance] = useState(true)

  const minWithdraw = 20
  const maxWithdraw = currentBalance
  const networkFee = 1.5

  useEffect(() => {
    // Check Supabase authentication and fetch user balance
    const checkAuthAndFetchBalance = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push("/signin")
          return
        }

        // Fetch user balance from API
        const response = await fetch("/api/user/profile")
        if (response.ok) {
          const profileData = await response.json()
          setCurrentBalance(profileData.balance || 0)
        } else {
          console.error("Failed to fetch balance")
          setCurrentBalance(0)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/signin")
      } finally {
        setIsCheckingAuth(false)
        setIsLoadingBalance(false)
      }
    }
    checkAuthAndFetchBalance()
  }, [router, supabase.auth])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    // Validate USDT address (basic TRC-20 address validation)
    if (!withdrawData.address) {
      newErrors.address = "USDT address is required"
    } else if (!withdrawData.address.startsWith("T") || withdrawData.address.length !== 34) {
      newErrors.address = "Please enter a valid USDT (TRC-20) address"
    }

    // Validate amount
    const amount = Number.parseFloat(withdrawData.amount)
    if (!withdrawData.amount) {
      newErrors.amount = "Amount is required"
    } else if (isNaN(amount) || amount <= 0) {
      newErrors.amount = "Please enter a valid amount"
    } else if (amount < minWithdraw) {
      newErrors.amount = `Minimum withdrawal is $${minWithdraw} USDT`
    } else if (amount + networkFee > maxWithdraw) {
      newErrors.amount = `Insufficient balance (including $${networkFee} network fee)`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleWithdraw = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate withdrawal process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      alert(`Withdrawal request submitted! $${withdrawData.amount} USDT will be sent to your address within 24 hours.`)
      router.push("/dashboard")
    } catch (error) {
      console.error("Withdrawal error:", error)
      alert("Withdrawal failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setWithdrawData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const setMaxAmount = () => {
    const maxAmount = Math.max(0, currentBalance - networkFee)
    setWithdrawData((prev) => ({ ...prev, amount: maxAmount.toFixed(2) }))
  }

  if (isCheckingAuth || isLoadingBalance) {
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
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-2">Withdraw Funds</h1>
            <p className="text-muted-foreground">Withdraw USDT to your external wallet</p>
          </div>

          <div className="space-y-6">
            {/* Available Balance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Available Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">${currentBalance.toLocaleString()} USDT</div>
                <p className="text-sm text-muted-foreground">Available for withdrawal (excluding network fees)</p>
              </CardContent>
            </Card>

            {/* Withdrawal Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2" />
                  Withdrawal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> Only withdraw to USDT (TRC-20) addresses. Withdrawals to other networks
                    may result in permanent loss.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="address">USDT (TRC-20) Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your USDT wallet address (starts with T)"
                    value={withdrawData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                  <p className="text-xs text-muted-foreground">
                    Make sure this is a valid TRC-20 USDT address. Withdrawals cannot be reversed.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Withdrawal Amount (USDT)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={withdrawData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                      className={`pl-8 ${errors.amount ? "border-red-500" : ""}`}
                      min={minWithdraw}
                      max={maxWithdraw}
                      step="0.01"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent"
                      onClick={setMaxAmount}
                    >
                      Max
                    </Button>
                  </div>
                  {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
                  <p className="text-xs text-muted-foreground">
                    Min: ${minWithdraw} • Max: ${(maxWithdraw - networkFee).toFixed(2)} (after fees)
                  </p>
                </div>

                {/* Fee Breakdown */}
                {withdrawData.amount && !errors.amount && (
                  <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Withdrawal Amount:</span>
                      <span>${withdrawData.amount} USDT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Network Fee:</span>
                      <span>${networkFee} USDT</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>You will receive:</span>
                        <span>${(Number.parseFloat(withdrawData.amount) || 0).toFixed(2)} USDT</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleWithdraw}
                  className="w-full"
                  disabled={!withdrawData.address || !withdrawData.amount || isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? "Processing Withdrawal..." : "Withdraw USDT"}
                </Button>
              </CardContent>
            </Card>

            {/* Network Information */}
            <Card>
              <CardHeader>
                <CardTitle>Network Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Network</div>
                    <div className="font-semibold">TRON (TRC-20)</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Network Fee</div>
                    <div className="font-semibold">${networkFee} USDT</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Processing Time</div>
                    <div className="font-semibold">1-24 hours</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Minimum Withdrawal</div>
                    <div className="font-semibold">${minWithdraw} USDT</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Withdrawals */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium">$200.00 USDT</div>
                        <div className="text-sm text-muted-foreground">Jan 10, 2024 • 3:45 PM</div>
                        <div className="text-xs text-muted-foreground font-mono">TQn9Y2...cbLSE</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  </div>

                  <div className="text-center py-4">
                    <Button variant="outline" size="sm">
                      View All Transactions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
