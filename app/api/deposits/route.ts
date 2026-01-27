import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// USDT TRC-20 deposit address (this should be configured in env or database)
const DEPOSIT_ADDRESS = "TYDzsYUEpvnYmQk4zGP9sWWcTEd2MiAtW7"

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: deposits, error } = await supabase
    .from("deposits")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ deposits, depositAddress: DEPOSIT_ADDRESS })
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
  const { amount, tx_hash } = body

  // Validate minimum deposit
  if (amount < 20) {
    return NextResponse.json({ error: "Minimum deposit is $20 USDT" }, { status: 400 })
  }

  // Create deposit record (pending confirmation)
  const { data: deposit, error } = await supabase
    .from("deposits")
    .insert({
      user_id: user.id,
      amount,
      currency: "USDT",
      wallet_address: DEPOSIT_ADDRESS,
      tx_hash: tx_hash || null,
      status: "pending",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ deposit, depositAddress: DEPOSIT_ADDRESS }, { status: 201 })
}
