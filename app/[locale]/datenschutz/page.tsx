import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | D'Namar Reinigungsdienst Basel",
  description: "Datenschutzerklärung von D'Namar Reinigungsdienst Basel gemäss Schweizer Datenschutzgesetz (DSG).",
  robots: { index: false, follow: false },
};

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="bg-muted min-h-screen py-20 lg:py-28">
      <div className="section-container max-w-2xl">
        <h1 className="text-4xl font-bold text-navy mb-10">Datenschutzerklärung</h1>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/75">
          <div>
            <h2 className="text-base font-bold text-navy mb-2">1. Verantwortliche Stelle</h2>
            <p>
              D&apos;Namar Reinigungsdienst<br />
              Basel, Schweiz<br />
              E-Mail: <a href="mailto:info@dnamar.ch" className="text-brand hover:underline">info@dnamar.ch</a><br />
              Tel.: <a href="tel:+41792527557" className="text-brand hover:underline">+41 79 252 75 57</a>
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-navy mb-2">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <p>
              Wir erheben personenbezogene Daten nur, wenn Sie uns diese freiwillig mitteilen –
              zum Beispiel über unser Kontaktformular oder die Offerten-Anfrage. Diese Daten verwenden
              wir ausschliesslich zur Bearbeitung Ihrer Anfrage und für die Erbringung unserer
              Dienstleistungen.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-navy mb-2">3. Welche Daten wir erheben</h2>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Name und Vorname</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer (optional)</li>
              <li>Adresse des zu reinigenden Objekts</li>
              <li>Angaben zur gewünschten Leistung</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-navy mb-2">4. Weitergabe an Dritte</h2>
            <p>
              Ihre personenbezogenen Daten werden nicht an Dritte weitergegeben, verkauft oder
              vermietet, ausser dies ist zur Erbringung unserer Dienstleistung erforderlich oder
              gesetzlich vorgeschrieben.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-navy mb-2">5. Cookies</h2>
            <p>
              Diese Website verwendet keine Tracking-Cookies oder Analyse-Tools Dritter. Es werden
              ausschliesslich technisch notwendige Cookies eingesetzt, um die korrekte Funktion der
              Website zu gewährleisten.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-navy mb-2">6. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
              Verarbeitung Ihrer personenbezogenen Daten. Bitte wenden Sie sich dazu an:{" "}
              <a href="mailto:info@dnamar.ch" className="text-brand hover:underline">
                info@dnamar.ch
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-navy mb-2">7. Anwendbares Recht</h2>
            <p>
              Diese Datenschutzerklärung unterliegt dem Schweizer Datenschutzgesetz (DSG) sowie, soweit
              anwendbar, der Datenschutz-Grundverordnung (DSGVO) der Europäischen Union.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-navy mb-2">8. Änderungen</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen. Die jeweils
              aktuelle Version ist auf dieser Seite abrufbar.
            </p>
            <p className="mt-2 text-foreground/50">Stand: März 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
