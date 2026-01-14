import { createClient } from '@supabase/supabase-js'

// Use the Secret Service Role key to bypass RLS
// Make sure this key is in your .env.local
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use the Secret Key here
)