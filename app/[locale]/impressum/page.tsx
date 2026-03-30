import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Impressum | D'Namar Reinigungsdienst Basel",
  description: "Impressum und rechtliche Angaben zu D'Namar Reinigungsdienst Basel.",
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
        <h1 className="text-4xl font-bold text-navy mb-10">Impressum</h1>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/75">
          <div>
            <h2 className="text-base font-bold text-navy mb-2">Angaben gemäss Schweizer Recht</h2>
            <p>
              D&apos;Namar GmbH<br />
              Wiesenstrasse 14<br />
              4057 Basel<br />
              Schweiz<br />
              Tel.: <a href="tel:+41792527557" className="text-brand hover:underline">+41 79 252 75 57</a><br />
              Tel.: <a href="tel:+41782410031" className="text-brand hover:underline">+41 78 241 00 31</a><br />
              E-Mail: <a href="mailto:info@dnamar.ch" className="text-brand hover:underline">info@dnamar.ch</a>
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-navy mb-2">Verantwortlich für den Inhalt</h2>
            <p>
              Nadjib Rasuly &amp; Maritza Rodriguez<br />
              D&apos;Namar GmbH<br />
              Wiesenstrasse 14<br />
              4057 Basel, Schweiz
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-navy mb-2">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              Als Diensteanbieter sind wir gemäss den geltenden Schweizer Gesetzen für eigene Inhalte
              auf diesen Seiten verantwortlich.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-navy mb-2">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem Schweizer Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung ausserhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-navy mb-2">Externe Links</h2>
            <p>
              Diese Website enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
              Betreiber der Seiten verantwortlich.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
