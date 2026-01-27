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

  const { data: investments, error } = await supabase
    .from("investments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ investments })
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
  const { amount, lock_in_period } = body

  // Validate minimum investment
  if (amount < 20) {
    return NextResponse.json({ error: "Minimum investment is $20" }, { status: 400 })
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

  if (profile.balance < amount) {
    return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
  }

  // Calculate return percentage and maturity date based on lock-in period
  let return_percentage: number
  let maturityDays: number

  switch (lock_in_period) {
    case "flexible":
      return_percentage = 25
      maturityDays = 28 // 4 weeks
      break
    case "two_months":
      return_percentage = 50
      maturityDays = 60
      break
    case "four_months":
      return_percentage = 100
      maturityDays = 120
      break
    default:
      return NextResponse.json({ error: "Invalid lock-in period" }, { status: 400 })
  }

  const projected_return = amount * (return_percentage / 100)
  const maturity_date = new Date()
  maturity_date.setDate(maturity_date.getDate() + maturityDays)

  // Start a transaction: deduct balance and create investment
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      balance: profile.balance - amount,
      total_invested: profile.balance + amount,
    })
    .eq("id", user.id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // Create the investment
  const { data: investment, error: investmentError } = await supabase
    .from("investments")
    .insert({
      user_id: user.id,
      amount,
      lock_in_period,
      return_percentage,
      projected_return,
      maturity_date: maturity_date.toISOString(),
      status: "active",
    })
    .select()
    .single()

  if (investmentError) {
    // Rollback balance update
    await supabase
      .from("profiles")
      .update({ balance: profile.balance })
      .eq("id", user.id)

    return NextResponse.json({ error: investmentError.message }, { status: 500 })
  }

  // Create transaction record
  await supabase.from("transactions").insert({
    user_id: user.id,
    type: "investment",
    amount: -amount,
    description: `Investment - ${lock_in_period} lock-in`,
    reference_id: investment.id,
  })

  return NextResponse.json({ investment }, { status: 201 })
}
