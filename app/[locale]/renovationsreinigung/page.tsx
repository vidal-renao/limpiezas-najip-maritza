import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, ArrowRight, Hammer } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Renovationsreinigung Basel | D'Namar",
    description:
      "Professionelle Renovationsreinigung in Basel nach Umbau und Neubau. Baustaub, Farbreste, Schutzfolien entfernen – gründlich und termingerecht. Offerte anfragen.",
  };
}

const TASKS = [
  "Baustaub und Schmutz entfernen",
  "Farb- und Lackreste beseitigen",
  "Schutzfolien und Kleberückstände entfernen",
  "Böden, Wände und Decken reinigen",
  "Fenster und Glasflächen blank putzen",
  "Sanitäranlagen und Küche endreinigen",
  "Kalkschutzbehandlung nach Wasserbauarbeiten",
];

export default async function RenovationsreinigungPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, #4caf82 0%, transparent 55%)",
          }}
        />
        <div className="section-container relative z-10 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
              <Link href="/" className="hover:text-brand transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">Renovationsreinigung</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 mb-5">
              <Hammer className="w-4 h-4 text-brand" />
              <span className="text-brand text-sm font-semibold">Nach Umbau &amp; Neubau</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Renovations&shy;reinigung Basel
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              Ihr Umbau ist fertig – jetzt sorgen wir für das perfekte Finish. Baustaub, Farbreste
              und Schutzfolien verschwinden spurlos. Mit Kalkschutz-Behandlung inklusive.
            </p>
            <Link
              href="/anfrage?service=renovationsreinigung"
              className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2"
            >
              Kostenlose Offerte anfordern
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-16 bg-muted"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* LEISTUNGEN */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <h2 className="text-3xl font-bold text-navy mb-3">Was wir reinigen</h2>
          <p className="text-foreground/60 mb-10 max-w-xl">
            Von kleinen Renovationen bis zum Neubau – wir übernehmen die komplette Endreinigung.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 max-w-2xl">
            {TASKS.map((task) => (
              <li key={task} className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-border">
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-navy">{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-14 lg:py-16">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Jetzt Offerte anfordern</h2>
          <p className="text-white/65 mb-8 max-w-md mx-auto">
            Kostenlos, unverbindlich, innerhalb von 24 Stunden – persönlich und massgeschneidert.
          </p>
          <Link
            href="/anfrage?service=renovationsreinigung"
            className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2"
          >
            Zur Offerte
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
