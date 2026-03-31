import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 * Uses the service role key when available (bypasses RLS for admin ops).
 * Falls back to the anon key in local development if service role is not set.
 * NEVER import this in client components.
 */
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
