"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Clock, Trash2, LogOut, Star, RefreshCw } from "lucide-react";
import type { Review } from "@/lib/supabase";

type Filter = Review["status"] | "all";

const STATUS_CONFIG = {
  pending: { label: "Ausstehend", color: "bg-amber-100 text-amber-700 border-amber-200" },
  approved: { label: "Genehmigt", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  rejected: { label: "Abgelehnt", color: "bg-red-100 text-red-700 border-red-200" },
} as const;

export default function ReviewsClient({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filter, setFilter] = useState<Filter>("pending");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  const visible = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  async function updateStatus(id: string, status: Review["status"]) {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      }
    } finally {
      setLoadingId(null);
    }
  }

  async function deleteReview(id: string) {
    if (!confirm("Bewertung unwiderruflich löschen?")) return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } finally {
      setLoadingId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-[#1a2e4a] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/N.webp" alt="D'Namar" className="w-8 h-8 rounded-lg object-cover" />
          <div>
            <p className="font-bold text-sm leading-none">D&apos;Namar Admin</p>
            <p className="text-white/50 text-xs mt-0.5">Bewertungsverwaltung</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Abmelden
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {(["all", "pending", "approved", "rejected"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-2xl p-4 text-left border transition-all ${
                filter === f
                  ? "bg-[#1a2e4a] text-white border-[#1a2e4a] shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#4caf82]/50"
              }`}
            >
              <p className="text-2xl font-bold">{counts[f]}</p>
              <p className="text-xs mt-0.5 opacity-70 capitalize">
                {f === "all" ? "Gesamt" : STATUS_CONFIG[f].label}
              </p>
            </button>
          ))}
        </div>

        {/* Reviews list */}
        {visible.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <RefreshCw className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Keine Bewertungen in dieser Kategorie.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((review) => {
              const isLoading = loadingId === review.id;
              return (
                <article
                  key={review.id}
                  className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-opacity ${
                    isLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <div className="flex flex-wrap gap-3 items-start justify-between mb-4">
                    {/* Left: name + meta */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-[#1a2e4a]">{review.name}</p>
                        <span
                          className={`text-xs font-medium border rounded-full px-2.5 py-0.5 ${
                            STATUS_CONFIG[review.status].color
                          }`}
                        >
                          {STATUS_CONFIG[review.status].label}
                        </span>
                        <span className="text-xs text-slate-400 uppercase border border-slate-200 rounded-full px-2 py-0.5">
                          {review.locale}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                        <span className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"
                              }`}
                            />
                          ))}
                        </span>
                        <span>{review.service}</span>
                        <span>·</span>
                        <span>{new Date(review.created_at).toLocaleDateString("de-CH")}</span>
                      </div>
                    </div>

                    {/* Right: actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {review.status !== "approved" && (
                        <button
                          onClick={() => updateStatus(review.id, "approved")}
                          className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5 hover:bg-emerald-100 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Genehmigen
                        </button>
                      )}
                      {review.status !== "pending" && (
                        <button
                          onClick={() => updateStatus(review.id, "pending")}
                          className="flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 hover:bg-amber-100 transition-colors"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          Ausstehend
                        </button>
                      )}
                      {review.status !== "rejected" && (
                        <button
                          onClick={() => updateStatus(review.id, "rejected")}
                          className="flex items-center gap-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-full px-3 py-1.5 hover:bg-red-100 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Ablehnen
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 hover:bg-slate-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Löschen
                      </button>
                    </div>
                  </div>

                  <blockquote className="text-sm text-slate-600 leading-relaxed border-l-2 border-[#4caf82]/40 pl-4 italic">
                    &ldquo;{review.comment}&rdquo;
                  </blockquote>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
