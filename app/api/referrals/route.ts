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

  // Get user profile with referral code
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("referral_code, referral_earnings")
    .eq("id", user.id)
    .single()

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  // Get referrals where this user is the referrer
  const { data: referrals, error: referralsError } = await supabase
    .from("referrals")
    .select(`
      id,
      status,
      earnings,
      created_at,
      referred:profiles!referrals_referred_id_fkey(full_name, email, created_at)
    `)
    .eq("referrer_id", user.id)
    .order("created_at", { ascending: false })

  if (referralsError) {
    return NextResponse.json({ error: referralsError.message }, { status: 500 })
  }

  // Calculate total referral deposits (for the 3% earnings display)
  const { data: referralDeposits, error: depositsError } = await supabase
    .from("deposits")
    .select("amount")
    .in(
      "user_id",
      referrals?.map((r: any) => r.referred?.id).filter(Boolean) || []
    )
    .eq("status", "confirmed")

  const totalReferralDeposits = referralDeposits?.reduce((sum, d) => sum + d.amount, 0) || 0

  return NextResponse.json({
    referral_code: profile.referral_code,
    referral_link: `${process.env.NEXT_PUBLIC_SITE_URL || "https://zenith.com"}/signup?ref=${profile.referral_code}`,
    total_referrals: referrals?.length || 0,
    total_earnings: profile.referral_earnings,
    total_referral_deposits: totalReferralDeposits,
    referrals: referrals || [],
  })
}
