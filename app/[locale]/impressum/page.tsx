import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Impressum | D'Namar GmbH Basel",
  description: "Rechtliche Angaben und Impressum der D'Namar GmbH, Reinigungsdienst Basel.",
  robots: { index: false, follow: false },
};

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="bg-muted min-h-screen py-20 lg:py-28">
      <div className="section-container max-w-2xl">
        {/* Header */}
        <div className="mb-10">
          <span className="text-brand font-semibold text-sm uppercase tracking-widest">
            Rechtliches
          </span>
          <h1 className="text-4xl font-bold text-navy mt-2">Impressum</h1>
          <p className="text-sm text-foreground/50 mt-2">
            Angaben gemäss Art. 3 lit. s UWG und Schweizer Recht
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8 shadow-sm space-y-8 text-sm leading-relaxed text-foreground/75">

          {/* Unternehmensangaben */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">Unternehmensangaben</h2>
            <div className="rounded-xl border border-border bg-muted p-5 space-y-1">
              <p className="font-semibold text-navy">D&apos;Namar GmbH</p>
              <p>Wiesenstrasse 14</p>
              <p>4057 Basel</p>
              <p>Schweiz</p>
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">Kontakt</h2>
            <ul className="space-y-2">
              <li>
                Tel.:{" "}
                <a href="tel:+41792527557" className="text-brand hover:underline">
                  +41 79 252 75 57
                </a>
              </li>
              <li>
                Tel.:{" "}
                <a href="tel:+41782410031" className="text-brand hover:underline">
                  +41 78 241 00 31
                </a>
              </li>
              <li>
                E-Mail:{" "}
                <a href="mailto:info@dnamar.ch" className="text-brand hover:underline">
                  info@dnamar.ch
                </a>
              </li>
              <li>
                Website:{" "}
                <span className="text-brand">dnamar.ch</span>
              </li>
            </ul>
          </div>

          {/* Gesellschaftsform & Register */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">
              Gesellschaftsform &amp; Handelsregister
            </h2>
            <ul className="space-y-2">
              <li>
                <strong className="text-navy">Rechtsform:</strong> Gesellschaft mit beschränkter
                Haftung (GmbH), Schweiz
              </li>
              <li>
                <strong className="text-navy">Gründungsjahr:</strong> 2015
              </li>
              <li>
                <strong className="text-navy">UID:</strong>{" "}
                <span className="font-mono text-foreground/60">[UID eintragen, z. B. CHE-XXX.XXX.XXX]</span>
              </li>
              <li>
                <strong className="text-navy">Handelsregisternummer:</strong>{" "}
                <span className="font-mono text-foreground/60">[HR-Nummer eintragen]</span>
              </li>
              <li>
                <strong className="text-navy">Handelsregister:</strong> Kanton Basel-Stadt
              </li>
            </ul>
            <p className="mt-3 text-xs text-foreground/40">
              * UID und HR-Nummer bitte vor dem Launch eintragen. Abrufbar unter zefix.ch.
            </p>
          </div>

          {/* Verantwortlich für den Inhalt */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">
              Verantwortlich für den Inhalt
            </h2>
            <p>
              Nadjib Rasuly &amp; Maritza Rodriguez<br />
              D&apos;Namar GmbH<br />
              Wiesenstrasse 14, 4057 Basel, Schweiz
            </p>
          </div>

          {/* Haftungsausschluss */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine
              Gewähr. Als Diensteanbieter sind wir gemäss den geltenden Schweizer Gesetzen
              für eigene Inhalte auf diesen Seiten verantwortlich. Für fremde Inhalte, auf
              die wir verweisen, sind wir nicht verantwortlich.
            </p>
          </div>

          {/* Urheberrecht */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">Urheberrecht</h2>
            <p>
              Sämtliche auf dieser Website veröffentlichten Inhalte (Texte, Bilder,
              Grafiken, Layout) unterliegen dem Schweizer Urheberrecht. Eine Vervielfältigung,
              Bearbeitung oder Verbreitung ausserhalb der gesetzlichen Schranken bedarf der
              schriftlichen Zustimmung der D&apos;Namar GmbH.
            </p>
          </div>

          {/* Externe Links */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">Externe Links</h2>
            <p>
              Diese Website enthält Links zu externen Webseiten. Für die Inhalte verlinkter
              Seiten ist ausschliesslich deren Betreiber verantwortlich. Zum Zeitpunkt der
              Verlinkung waren keine Rechtsverstösse erkennbar.
            </p>
          </div>

          {/* Streitschlichtung */}
          <div>
            <h2 className="text-base font-bold text-navy mb-3">Streitschlichtung</h2>
            <p>
              D&apos;Namar GmbH ist nicht verpflichtet und nicht bereit, an einem
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              Bei Streitigkeiten gilt Schweizer Recht unter Ausschluss des
              internationalen Privatrechts. Gerichtsstand ist Basel.
            </p>
          </div>

          <p className="text-xs text-foreground/40 pt-2 border-t border-border">
            Stand: April 2026
          </p>
        </div>
      </div>
    </section>
  );
}
