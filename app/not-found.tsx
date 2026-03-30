import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 30% 60%, #4caf82 0%, transparent 55%)" }}
      />
      <div className="relative z-10 text-center max-w-lg">
        {/* 404 number */}
        <p className="text-[120px] sm:text-[160px] font-bold leading-none text-brand/20 select-none">
          404
        </p>

        {/* Icon */}
        <div className="flex justify-center -mt-8 mb-6">
          <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Seite nicht gefunden
        </h1>
        <p className="text-white/55 mb-8 leading-relaxed">
          Die gesuchte Seite existiert nicht oder wurde verschoben.<br />
          Kehren Sie zur Startseite zurück oder kontaktieren Sie uns direkt.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white font-semibold px-8 py-3 hover:bg-brand/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Zur Startseite
          </Link>
          <a
            href="tel:+41792527557"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white font-semibold px-8 py-3 hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +41 79 252 75 57
          </a>
        </div>
      </div>
    </div>
  );
}
