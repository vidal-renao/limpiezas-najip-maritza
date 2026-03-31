import { createServerClient } from "@/lib/supabase-server";
import ReviewsClient from "./ReviewsClient";
import type { Review } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-red-200 p-8 max-w-sm text-center">
          <p className="text-red-600 font-semibold mb-2">Datenbankfehler</p>
          <p className="text-slate-500 text-sm">{error.message}</p>
          <p className="text-slate-400 text-xs mt-4">
            Überprüfen Sie die Supabase-Umgebungsvariablen.
          </p>
        </div>
      </div>
    );
  }

  return <ReviewsClient initialReviews={(data as Review[]) ?? []} />;
}
