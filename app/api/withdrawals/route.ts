import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const WITHDRAWAL_FEE = 1.5 // USDT

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: withdrawals, error } = await supabase
    .from("withdrawals")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ withdrawals })
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { amount, wallet_address } = body

  // Validate minimum withdrawal
  if (amount < 10) {
    return NextResponse.json({ error: "Minimum withdrawal is $10 USDT" }, { status: 400 })
  }

  // Validate wallet address (basic TRC-20 validation)
  if (!wallet_address || !wallet_address.startsWith("T") || wallet_address.length !== 34) {
    return NextResponse.json({ error: "Invalid TRC-20 wallet address" }, { status: 400 })
  }

  // Get user profile to check balance
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("balance")
    .eq("id", user.id)
    .single()

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 })
  }

  const totalAmount = amount + WITHDRAWAL_FEE

  if (profile.balance < totalAmount) {
    return NextResponse.json({ error: "Insufficient balance (including network fee)" }, { status: 400 })
  }

  // Deduct balance and create withdrawal request
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ balance: profile.balance - totalAmount })
    .eq("id", user.id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // Create withdrawal record
  const { data: withdrawal, error: withdrawalError } = await supabase
    .from("withdrawals")
    .insert({
      user_id: user.id,
      amount,
      currency: "USDT",
      wallet_address,
      fee: WITHDRAWAL_FEE,
      status: "pending",
    })
    .select()
    .single()

  if (withdrawalError) {
    // Rollback balance update
    await supabase
      .from("profiles")
      .update({ balance: profile.balance })
      .eq("id", user.id)

    return NextResponse.json({ error: withdrawalError.message }, { status: 500 })
  }

  // Create transaction record
  await supabase.from("transactions").insert({
    user_id: user.id,
    type: "withdrawal",
    amount: -totalAmount,
    description: `Withdrawal to ${wallet_address.slice(0, 8)}...${wallet_address.slice(-4)}`,
    reference_id: withdrawal.id,
  })

  return NextResponse.json({ withdrawal }, { status: 201 })
}
