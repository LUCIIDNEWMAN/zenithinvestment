import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  // Get active investments
  const { data: investments, error: investmentsError } = await supabase
    .from("investments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Get recent transactions
  const { data: transactions, error: transactionsError } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  // Get referral count
  const { count: referralCount } = await supabase
    .from("referrals")
    .select("*", { count: "exact", head: true })
    .eq("referrer_id", user.id)

  // Calculate totals
  const totalInvested = investments?.reduce((sum, inv) => sum + inv.amount, 0) || 0
  const totalReturns = investments
    ?.filter((inv) => inv.status === "matured")
    .reduce((sum, inv) => sum + inv.projected_return, 0) || 0
  const activeInvestments = investments?.filter((inv) => inv.status === "active") || []

  return NextResponse.json({
    profile: {
      ...profile,
      total_invested: totalInvested,
      total_returns: totalReturns,
    },
    investments: investments || [],
    active_investments: activeInvestments,
    transactions: transactions || [],
    referral_count: referralCount || 0,
    referral_earnings: profile.referral_earnings || 0,
  })
}
