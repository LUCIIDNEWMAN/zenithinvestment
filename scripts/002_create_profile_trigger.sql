-- Auto-create profile when a new user signs up
-- This trigger creates a profile row with a unique referral code

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_referral_code TEXT;
  referrer_user_id UUID;
BEGIN
  -- Generate unique referral code based on user id
  new_referral_code := UPPER(SUBSTRING(REPLACE(NEW.id::TEXT, '-', ''), 1, 8));
  
  -- Check if user was referred by someone (referral code stored in metadata)
  IF NEW.raw_user_meta_data->>'referred_by' IS NOT NULL THEN
    SELECT id INTO referrer_user_id 
    FROM public.profiles 
    WHERE referral_code = NEW.raw_user_meta_data->>'referred_by';
  END IF;
  
  -- Insert new profile
  INSERT INTO public.profiles (id, full_name, email, referral_code, referred_by, balance)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    new_referral_code,
    referrer_user_id,
    0.00
  )
  ON CONFLICT (id) DO NOTHING;
  
  -- If user was referred, create referral record
  IF referrer_user_id IS NOT NULL THEN
    INSERT INTO public.referrals (referrer_id, referred_id, earnings)
    VALUES (referrer_user_id, NEW.id, 0.00)
    ON CONFLICT (referrer_id, referred_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- Function to update referral earnings when a deposit is confirmed
CREATE OR REPLACE FUNCTION public.handle_deposit_referral_bonus()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  referrer_id UUID;
  bonus_amount DECIMAL(15, 2);
BEGIN
  -- Only process confirmed deposits
  IF NEW.status = 'confirmed' AND (OLD.status IS NULL OR OLD.status != 'confirmed') THEN
    -- Find if user has a referrer
    SELECT p.referred_by INTO referrer_id
    FROM public.profiles p
    WHERE p.id = NEW.user_id;
    
    -- If user has a referrer, give them 3% bonus
    IF referrer_id IS NOT NULL THEN
      bonus_amount := NEW.amount * 0.03;
      
      -- Update referrer's balance
      UPDATE public.profiles
      SET balance = balance + bonus_amount,
          updated_at = NOW()
      WHERE id = referrer_id;
      
      -- Update referral earnings
      UPDATE public.referrals
      SET earnings = earnings + bonus_amount
      WHERE referrer_id = referrer_id AND referred_id = NEW.user_id;
      
      -- Log the referral bonus transaction
      INSERT INTO public.transactions (user_id, type, amount, description, reference_id, status)
      VALUES (referrer_id, 'referral_bonus', bonus_amount, 'Referral bonus from deposit', NEW.id, 'completed');
    END IF;
    
    -- Update user's balance with deposit amount
    UPDATE public.profiles
    SET balance = balance + NEW.amount,
        updated_at = NOW()
    WHERE id = NEW.user_id;
    
    -- Log the deposit transaction
    INSERT INTO public.transactions (user_id, type, amount, description, reference_id, status)
    VALUES (NEW.user_id, 'deposit', NEW.amount, 'USDT Deposit', NEW.id, 'completed');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_deposit_confirmed ON public.deposits;

-- Create trigger for deposit confirmations
CREATE TRIGGER on_deposit_confirmed
  AFTER INSERT OR UPDATE ON public.deposits
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_deposit_referral_bonus();
