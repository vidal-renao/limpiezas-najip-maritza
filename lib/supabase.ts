import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

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
