import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | D'Namar Reinigungsdienst Basel",
  description:
    "Datenschutzerklärung von D'Namar GmbH Basel gemäss dem revidierten Schweizer Datenschutzgesetz (nDSG, in Kraft seit 1. September 2023).",
  robots: { index: false, follow: false },
};

/* ─── Shared layout styles ───────────────────────────────────────────────── */
const H2 = "text-base font-bold text-navy mb-2 mt-6 first:mt-0";
const P  = "text-sm leading-relaxed text-foreground/75";
const LI = "text-sm leading-relaxed text-foreground/75";

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
        {/* Header */}
        <div className="mb-10">
          <span className="text-brand font-semibold text-sm uppercase tracking-widest">
            Rechtliches
          </span>
          <h1 className="text-4xl font-bold text-navy mt-2">
            Datenschutzerklärung
          </h1>
          <p className="text-sm text-foreground/50 mt-2">
            Gemäss nDSG (CH) &amp; DSGVO (EU) — Stand: April 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8 shadow-sm space-y-6 text-sm leading-relaxed text-foreground/75">

          {/* 1 – Verantwortliche Stelle */}
          <div>
            <h2 className={H2}>1. Verantwortliche Stelle</h2>
            <p className={P}>
              D&apos;Namar GmbH<br />
              Wiesenstrasse 14, 4057 Basel, Schweiz<br />
              E-Mail:{" "}
              <a href="mailto:info@dnamar.ch" className="text-brand hover:underline">
                info@dnamar.ch
              </a>
              <br />
              Tel.:{" "}
              <a href="tel:+41792527557" className="text-brand hover:underline">
                +41 79 252 75 57
              </a>
            </p>
            <p className={`${P} mt-2`}>
              Verantwortliche Personen: Nadjib Rasuly &amp; Maritza Rodriguez
            </p>
          </div>

          {/* 2 – Welche Daten wir verarbeiten */}
          <div>
            <h2 className={H2}>2. Welche Daten wir verarbeiten</h2>

            <p className="font-semibold text-navy text-sm mb-1 mt-3">2.1 Kontakt- &amp; Offertenanfragen</p>
            <p className={P}>
              Wenn Sie unser Kontaktformular oder die Offerten-Anfrage ausfüllen, erheben wir:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li className={LI}>Vor- und Nachname</li>
              <li className={LI}>E-Mail-Adresse</li>
              <li className={LI}>Telefonnummer (optional)</li>
              <li className={LI}>Adresse des zu reinigenden Objekts</li>
              <li className={LI}>Angaben zur gewünschten Leistung sowie Datum und Uhrzeit</li>
            </ul>

            <p className="font-semibold text-navy text-sm mb-1 mt-4">2.2 Bewertungen</p>
            <p className={P}>
              Beim Absenden einer öffentlichen Bewertung speichern wir: Name (oder Pseudonym),
              Sternebewertung, Kommentartext, gewählte Dienstleistung, Datum/Uhrzeit sowie die
              Sprache der Bewertung. Bewertungen mit 1–3 Sternen werden vor der Veröffentlichung
              manuell geprüft.
            </p>

            <p className="font-semibold text-navy text-sm mb-1 mt-4">2.3 Besuchsdaten &amp; Analytik</p>
            <p className={P}>
              Diese Website verwendet{" "}
              <strong className="text-navy">Vercel Analytics</strong>, einen datenschutzfreundlichen
              Analysedienst, der keine Cookies setzt und keine personenbezogenen IP-Adressen
              speichert. Es werden ausschliesslich anonymisierte Aggregatdaten (Seitenaufrufe,
              Referrer, Geräteklasse) erhoben. Eine Identifizierung einzelner Personen ist nicht
              möglich.
            </p>

            <p className="font-semibold text-navy text-sm mb-1 mt-4">2.4 Cookies</p>
            <p className={P}>
              Diese Website setzt <strong className="text-navy">keine Tracking-Cookies</strong>{" "}
              und verwendet keine Analyse-Tools Dritter, die persönliche Daten speichern.
              Technisch notwendige Session-Cookies (z. B. für den Admin-Bereich) werden nur nach
              erfolgreichem Login gesetzt und automatisch nach 8 Stunden gelöscht.
            </p>
          </div>

          {/* 3 – Zweck der Verarbeitung */}
          <div>
            <h2 className={H2}>3. Zweck der Datenverarbeitung</h2>
            <ul className="list-disc list-inside space-y-1">
              <li className={LI}>Bearbeitung von Anfragen und Erstellung von Angeboten</li>
              <li className={LI}>Erbringung der vereinbarten Reinigungsdienstleistungen</li>
              <li className={LI}>Verwaltung und Veröffentlichung von Kundenbewertungen</li>
              <li className={LI}>Verbesserung der Website und Nutzererfahrung (anonymisierte Analytik)</li>
              <li className={LI}>Erfüllung gesetzlicher Pflichten (Buchhaltung, Steuern)</li>
            </ul>
          </div>

          {/* 4 – Rechtsgrundlage */}
          <div>
            <h2 className={H2}>4. Rechtsgrundlage (nDSG &amp; DSGVO)</h2>
            <p className={P}>
              Die Verarbeitung personenbezogener Daten stützt sich auf:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li className={LI}>
                <strong className="text-navy">Vertragsvorbereitung / -erfüllung</strong> (Art. 6 Abs. 1 lit. b DSGVO, Art. 31 Abs. 2 nDSG): Anfragen und Auftragsabwicklung.
              </li>
              <li className={LI}>
                <strong className="text-navy">Berechtigtes Interesse</strong> (Art. 6 Abs. 1 lit. f DSGVO): Anonymisierte Websiteanalyse zur Verbesserung unserer Online-Präsenz.
              </li>
              <li className={LI}>
                <strong className="text-navy">Einwilligung</strong> (Art. 6 Abs. 1 lit. a DSGVO): Veröffentlichung von Bewertungen, die Sie freiwillig einsenden.
              </li>
            </ul>
          </div>

          {/* 5 – Auftragsverarbeiter */}
          <div>
            <h2 className={H2}>5. Datenempfänger &amp; Auftragsverarbeiter</h2>
            <p className={P}>
              Wir geben Ihre Daten nicht an Dritte zu Werbezwecken weiter. Zur Erbringung
              unserer Dienste setzen wir folgende Auftragsverarbeiter ein, die einem angemessenen
              Datenschutzniveau verpflichtet sind:
            </p>

            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-border p-4 bg-muted">
                <p className="font-semibold text-navy text-sm">Vercel Inc.</p>
                <p className={`${P} mt-1`}>
                  Hosting der Website und Vercel Analytics. Sitz: San Francisco, USA.
                  Datenübermittlung in die USA auf Basis von Standardvertragsklauseln (SCC).
                  <br />
                  Datenschutz:{" "}
                  <span className="text-brand">vercel.com/legal/privacy-policy</span>
                </p>
              </div>

              <div className="rounded-xl border border-border p-4 bg-muted">
                <p className="font-semibold text-navy text-sm">Supabase Inc.</p>
                <p className={`${P} mt-1`}>
                  Speicherung und Verwaltung von Kundenbewertungen. Daten werden in der
                  EU-Region (Frankfurt, AWS eu-central-1) gehostet. Sitz: San Francisco, USA.
                  <br />
                  Datenschutz:{" "}
                  <span className="text-brand">supabase.com/privacy</span>
                </p>
              </div>

              <div className="rounded-xl border border-border p-4 bg-muted">
                <p className="font-semibold text-navy text-sm">Resend Inc. (E-Mail-Benachrichtigungen)</p>
                <p className={`${P} mt-1`}>
                  Interne E-Mail-Benachrichtigungen bei neuen Bewertungen. Keine Kundendaten
                  werden an Resend weitergegeben ausser Name, Service und Kommentar der Bewertung.
                  Sitz: San Francisco, USA.
                  <br />
                  Datenschutz:{" "}
                  <span className="text-brand">resend.com/privacy</span>
                </p>
              </div>
            </div>
          </div>

          {/* 6 – Speicherdauer */}
          <div>
            <h2 className={H2}>6. Speicherdauer</h2>
            <ul className="list-disc list-inside space-y-1">
              <li className={LI}>
                <strong className="text-navy">Anfragen / Offerten:</strong> 10 Jahre (gesetzliche
                Aufbewahrungspflicht nach OR Art. 958f).
              </li>
              <li className={LI}>
                <strong className="text-navy">Bewertungen:</strong> Bis auf Widerruf oder
                Löschungsanfrage, maximal 5 Jahre.
              </li>
              <li className={LI}>
                <strong className="text-navy">Anonymisierte Analytikdaten:</strong> 90 Tage
                (Vercel-Standardeinstellung).
              </li>
              <li className={LI}>
                <strong className="text-navy">Admin-Sitzungs-Cookie:</strong> 8 Stunden.
              </li>
            </ul>
          </div>

          {/* 7 – Ihre Rechte */}
          <div>
            <h2 className={H2}>7. Ihre Rechte nach nDSG / DSGVO</h2>
            <p className={P}>Sie haben das Recht auf:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li className={LI}><strong className="text-navy">Auskunft</strong> über Ihre gespeicherten Daten (Art. 25 nDSG / Art. 15 DSGVO)</li>
              <li className={LI}><strong className="text-navy">Berichtigung</strong> unrichtiger Daten (Art. 32 nDSG / Art. 16 DSGVO)</li>
              <li className={LI}><strong className="text-navy">Löschung</strong> Ihrer Daten (Art. 32 nDSG / Art. 17 DSGVO)</li>
              <li className={LI}><strong className="text-navy">Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
              <li className={LI}><strong className="text-navy">Datenübertragbarkeit</strong> in einem gängigen Format (Art. 20 DSGVO)</li>
              <li className={LI}><strong className="text-navy">Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li className={LI}><strong className="text-navy">Widerruf</strong> einer erteilten Einwilligung jederzeit</li>
            </ul>
            <p className={`${P} mt-3`}>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte schriftlich an:{" "}
              <a href="mailto:info@dnamar.ch" className="text-brand hover:underline">
                info@dnamar.ch
              </a>
              . Wir beantworten Anfragen innerhalb von 30 Tagen.
            </p>
            <p className={`${P} mt-2`}>
              Sie haben ausserdem das Recht, eine Beschwerde beim{" "}
              <strong className="text-navy">
                Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB)
              </strong>{" "}
              einzureichen: edoeb.admin.ch.
            </p>
          </div>

          {/* 8 – Internationale Übermittlung */}
          <div>
            <h2 className={H2}>8. Internationale Datenübermittlung</h2>
            <p className={P}>
              Einige der unter Abschnitt 5 genannten Dienstleister sitzen in den USA. Die
              Übermittlung erfolgt auf der Grundlage von EU-Standardvertragsklauseln (SCC) sowie
              dem EU-US Data Privacy Framework. Für die Schweiz erfolgt die Übermittlung gemäss
              Art. 16 nDSG auf Basis angemessener Garantien.
            </p>
          </div>

          {/* 9 – Datensicherheit */}
          <div>
            <h2 className={H2}>9. Datensicherheit</h2>
            <p className={P}>
              Alle Verbindungen zur Website sind TLS-verschlüsselt (HTTPS). Zugang zum
              Admin-Bereich ist durch ein geheimes Passwort und ein HttpOnly-Session-Cookie
              gesichert. Datenbankzugriffe erfolgen über row-level security (RLS) auf
              Datenbankebene. Wir treffen angemessene technische und organisatorische
              Massnahmen zum Schutz Ihrer Daten.
            </p>
          </div>

          {/* 10 – Anwendbares Recht */}
          <div>
            <h2 className={H2}>10. Anwendbares Recht</h2>
            <p className={P}>
              Diese Datenschutzerklärung unterliegt dem revidierten Schweizer
              Datenschutzgesetz (<strong className="text-navy">nDSG</strong>, in Kraft seit
              1. September 2023) sowie, soweit anwendbar, der Datenschutz-Grundverordnung
              (<strong className="text-navy">DSGVO</strong>) der Europäischen Union.
            </p>
          </div>

          {/* 11 – Änderungen */}
          <div>
            <h2 className={H2}>11. Änderungen dieser Erklärung</h2>
            <p className={P}>
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die
              jeweils aktuelle Fassung ist auf dieser Seite abrufbar. Bei wesentlichen
              Änderungen werden registrierte Nutzer informiert.
            </p>
            <p className="mt-3 text-xs text-foreground/40">Stand: April 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
