import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Review = {
  id: string;
  name: string;
  rating: number;
  service: string;
  comment: string;
  locale: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

// Lazy singleton — avoids build-time errors when env vars are not yet defined.
let _client: SupabaseClient | undefined;

function getClient(): SupabaseClient {
  return (_client ??= createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  ));
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop: string | symbol) {
    return (getClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
