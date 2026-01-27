import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

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
  const { deposit_id, tx_hash } = body

  // Get the deposit
  const { data: deposit, error: depositError } = await supabase
    .from("deposits")
    .select("*")
    .eq("id", deposit_id)
    .eq("user_id", user.id)
    .single()

  if (depositError || !deposit) {
    return NextResponse.json({ error: "Deposit not found" }, { status: 404 })
  }

  if (deposit.status !== "pending") {
    return NextResponse.json({ error: "Deposit already processed" }, { status: 400 })
  }

  // Update deposit with tx_hash (admin will verify and confirm)
  const { data: updatedDeposit, error: updateError } = await supabase
    .from("deposits")
    .update({
      tx_hash: tx_hash || deposit.tx_hash,
    })
    .eq("id", deposit_id)
    .select()
    .single()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ 
    deposit: updatedDeposit,
    message: "Deposit submitted for confirmation. Please wait for admin approval."
  })
}
