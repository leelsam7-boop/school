import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your')) {
    throw new Error(
      '⚠️ Missing Supabase credentials! Please:\n' +
      '1. Create a Supabase project at https://supabase.com\n' +
      '2. Copy your Project URL and anon key\n' +
      '3. Update .env.local with your actual values\n' +
      '4. See SUPABASE_SETUP.md for detailed instructions'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
