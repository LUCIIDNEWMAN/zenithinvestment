export interface Profile {
  id: string
  email: string
  full_name: string
  balance: number
  total_invested: number
  total_returns: number
  referral_code: string
  referred_by: string | null
  referral_earnings: number
  created_at: string
  updated_at: string
}

export interface Investment {
  id: string
  user_id: string
  amount: number
  lock_in_period: 'flexible' | 'two_months' | 'four_months'
  return_percentage: number
  projected_return: number
  status: 'active' | 'matured' | 'withdrawn'
  start_date: string
  maturity_date: string
  created_at: string
  updated_at: string
}

export interface Deposit {
  id: string
  user_id: string
  amount: number
  currency: string
  wallet_address: string
  tx_hash: string | null
  status: 'pending' | 'confirmed' | 'failed'
  created_at: string
  confirmed_at: string | null
}

export interface Withdrawal {
  id: string
  user_id: string
  amount: number
  currency: string
  wallet_address: string
  tx_hash: string | null
  fee: number
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
  created_at: string
  processed_at: string | null
}

export interface Referral {
  id: string
  referrer_id: string
  referred_id: string
  status: 'pending' | 'active'
  earnings: number
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  type: 'deposit' | 'withdrawal' | 'investment' | 'return' | 'referral_bonus'
  amount: number
  description: string
  reference_id: string | null
  created_at: string
}

export interface WalletAddress {
  id: string
  user_id: string
  currency: string
  network: string
  address: string
  is_active: boolean
  created_at: string
}
