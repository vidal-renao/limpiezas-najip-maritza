import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkliste Endreinigung Umzug Basel | D'Namar",
  description:
    "Vollständige Checkliste für die Endreinigung beim Umzug in Basel. Alle Punkte für eine erfolgreiche Wohnungsabgabe – mit Abgabegarantie von D'Namar.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Checkliste für die Endreinigung bei einem Umzug in Basel",
  description:
    "Vollständige Checkliste für die Umzugsreinigung in Basel. Kein Abzug bei der Wohnungsabgabe dank gründlicher Endreinigung.",
  author: { "@type": "Organization", name: "D'Namar Reinigungsdienst Basel" },
  publisher: { "@type": "Organization", name: "D'Namar Reinigungsdienst Basel", url: "https://dnamar.ch" },
  datePublished: "2025-02-25",
  mainEntityOfPage: "https://dnamar.ch/blog/umzug-endreinigung-checkliste-basel",
};

const CHECKLIST: { room: string; items: string[] }[] = [
  {
    room: "Allgemein – alle Räume",
    items: [
      "Böden vollständig saugen und feucht wischen",
      "Steckdosen und Lichtschalter abwischen",
      "Fensterrahmen und Fensterbänke innen reinigen",
      "Fenster innen und aussen putzen (streifenfrei)",
      "Türen, Türrahmen und Türgriffe reinigen",
      "Heizkörper und Heizungsrippen entstauben",
      "Wandschränke und Einbauschränke innen reinigen",
      "Alle Glühbirnen und Leuchten auf Funktion prüfen",
    ],
  },
  {
    room: "Küche",
    items: [
      "Herd, Glaskeramik und Ceranfeld entfetten und polieren",
      "Backofen innen und aussen gründlich reinigen (inkl. Türglas)",
      "Dunstabzugshaube: Filter, Haubeninnenseite und Aussenblende",
      "Kühlschrank abtauen, innen & aussen reinigen",
      "Geschirrspüler innen reinigen und entkalken",
      "Unterschränke innen & aussen reinigen",
      "Arbeitsflächen und Spritzschutz reinigen",
      "Waschbecken und Armaturen entkalken und polieren",
    ],
  },
  {
    room: "Badezimmer & WC",
    items: [
      "Dusche oder Badewanne: Kalkentfernung, Dichtungen reinigen",
      "WC komplett desinfizieren (Schüssel, Deckel, Aussenbereich, Spülkasten)",
      "Waschbecken und Armaturen entkalken",
      "Spiegel streifenfrei reinigen",
      "Fliesenfugen reinigen",
      "Badezimmerschränke innen & aussen",
      "Lüftungsschlitze entstauben",
      "Bodenablauf reinigen",
    ],
  },
  {
    room: "Schlafzimmer & Wohnzimmer",
    items: [
      "Einbauschränke und Garderobenschränke innen reinigen",
      "Fensterläden oder Rollläden innen reinigen",
      "Jalousien entstauben",
      "Parkettböden oder Laminat pflegen",
      "Teppichböden gründlich saugen",
    ],
  },
  {
    room: "Balkon & Terrasse",
    items: [
      "Balkonboden kehren und nass wischen",
      "Balkongeländer abwischen",
      "Drainage reinigen",
      "Markise abstauben (falls vorhanden)",
    ],
  },
  {
    room: "Keller & Nebenräume",
    items: [
      "Kellerboden kehren und wischen",
      "Regale und Wände entstauben",
      "Lüftungsöffnungen prüfen und entstauben",
    ],
  },
];

export default function BlogUmzugChecklistePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER */}
      <section className="bg-navy pt-28 pb-14">
        <div className="section-container max-w-3xl">
          <div className="flex items-center gap-2 text-brand text-sm font-semibold mb-4">
            <Link href="/blog" className="hover:text-brand-light transition-colors">Blog</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/60">Umzugsreinigung</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Checkliste für die Endreinigung bei einem Umzug in Basel
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span>25. Februar 2025</span>
            <span>·</span>
            <span>7 Min. Lesezeit</span>
            <span>·</span>
            <span>D&apos;Namar Reinigungsdienst Basel</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <article className="bg-white py-14">
        <div className="section-container max-w-3xl">

          <p className="text-lg text-foreground/75 leading-relaxed mb-8">
            Ein Umzug in Basel ist oft mit Stress verbunden – Umzugskartons,
            Behördengänge, Ummeldungen. Und dann steht noch die Wohnungsabgabe
            bevor. Die Endreinigung ist dabei einer der kritischsten Punkte:
            Verwaltungen und Vermieter in Basel haben hohe Anforderungen und
            monieren kleinste Mängel im Abnahmeprotokoll. Wir haben eine
            vollständige Checkliste zusammengestellt, damit Sie keinen Punkt vergessen.
          </p>

          <div className="prose prose-slate prose-headings:text-navy prose-headings:font-bold prose-a:text-brand prose-strong:text-navy max-w-none">

            <h2>Was erwartet die Verwaltung bei der Wohnungsabgabe?</h2>
            <p>
              Bei der Wohnungsabgabe in Basel führt die Liegenschaftsverwaltung
              oder der private Vermieter eine detaillierte Begehung durch. Dabei
              wird jeder Raum nach einem Abnahmeprotokoll geprüft. Typische
              Mängelpunkte, die zu Kosten führen, sind:
            </p>
            <ul>
              <li>Fettablagerungen im Backofen oder auf dem Herd</li>
              <li>Kalkflecken in Bad und Küche</li>
              <li>Nicht streifenfreie Fenster</li>
              <li>Schmutzige Einbauschränke</li>
              <li>Nicht geleerte oder gereinigte Dunstabzugshaube</li>
              <li>Verschmutzte Fugen und Silikonfugen im Badezimmer</li>
            </ul>
            <p>
              Ein professioneller Reinigungsdienst wie D&apos;Namar kennt diese
              Anforderungen genau und stellt sicher, dass die Wohnung nach dem
              Reinigungseinsatz abgabebereit ist – wir bieten eine
              <strong> Abgabegarantie</strong>: Falls die Verwaltung Beanstandungen
              hat, kommen wir kostenlos ein zweites Mal.
            </p>

            <h2>Wann sollte man mit der Endreinigung beginnen?</h2>
            <p>
              Idealerweise beginnen Sie mit der Endreinigung erst, nachdem
              <strong> alle Möbel und persönlichen Gegenstände ausgeräumt</strong> sind.
              Planen Sie mindestens <strong>einen vollen Tag</strong> ein – oder
              überlassen Sie es einem professionellen Team, das die Arbeit effizienter
              erledigt. Bei D&apos;Namar in Basel können wir die Endreinigung oft innerhalb
              von 4–8 Stunden abschliessen, je nach Grösse der Wohnung.
            </p>

            <h2>Die vollständige Checkliste für die Endreinigung</h2>
            <p>
              Verwenden Sie diese Checkliste als Grundlage. Je nach Wohnung und
              Mietvertrag können zusätzliche Punkte gefordert sein.
            </p>
          </div>

          {/* Checklist cards */}
          <div className="space-y-6 mt-8">
            {CHECKLIST.map(({ room, items }) => (
              <div
                key={room}
                className="bg-muted rounded-2xl border border-border overflow-hidden"
              >
                <div className="bg-navy px-5 py-3">
                  <h3 className="font-bold text-white text-sm">{room}</h3>
                </div>
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 px-5 py-3 bg-white">
                      <span className="w-5 h-5 rounded border-2 border-brand/40 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-brand" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm text-foreground/75">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="prose prose-slate prose-headings:text-navy prose-headings:font-bold prose-a:text-brand prose-strong:text-navy max-w-none mt-10">

            <h2>Selbst reinigen oder Profis beauftragen?</h2>
            <p>
              Diese Frage stellen sich viele Umziehende in Basel. Die ehrliche
              Antwort: Es kommt auf die Wohnung und die eigenen Kapazitäten an.
            </p>
            <p>
              <strong>Selbst reinigen lohnt sich</strong>, wenn Sie Zeit haben, die
              richtigen Reinigungsmittel besitzen und die Anforderungen Ihres Vermieters
              kennen. Bedenken Sie aber: Ein Backofen, eine verkalkte Dusche oder
              Fenster mit hartnäckigen Ablagerungen können sehr zeitaufwändig sein.
            </p>
            <p>
              <strong>Profis beauftragen lohnt sich</strong> fast immer, wenn Sie:
            </p>
            <ul>
              <li>Keine Zeit für eine gründliche Eigenreinigung haben</li>
              <li>Sicher sein möchten, dass die Abnahme beim ersten Termin klappt</li>
              <li>Eine Abgabegarantie wünschen</li>
              <li>Eine grosse Wohnung (3+ Zimmer) reinigen lassen möchten</li>
            </ul>

            <h2>Was kostet eine Umzugsreinigung in Basel?</h2>
            <p>
              Die Kosten hängen von der Grösse der Wohnung und dem Zustand ab.
              Bei D&apos;Namar beginnen die Preise für Endreinigungen bei kleinen
              Wohnungen ab <strong>CHF 180</strong> und bei grossen Wohnungen
              ab <strong>CHF 320</strong>. Für ein genaues Angebot empfehlen
              wir eine kostenlose Anfrage – wir reagieren innerhalb von 24 Stunden.
            </p>

            <h2>Fazit</h2>
            <p>
              Die Endreinigung bei einem Umzug in Basel ist zeitaufwändig, aber
              entscheidend für eine reibungslose Wohnungsabgabe. Mit dieser Checkliste
              haben Sie alle wichtigen Punkte im Blick. Wer sicher gehen möchte,
              dass die Verwaltung keine Mängel beanstandet, ist mit einem
              professionellen Reinigungsdienst mit Abgabegarantie auf der sicheren Seite.
            </p>
            <p>
              D&apos;Namar reinigt Ihre Wohnung in Basel nach Verwaltungsstandard –
              pünktlich zu Ihrem Übergabetermin. Fordern Sie jetzt Ihre kostenlose
              Offerte an.
            </p>
          </div>

        </div>
      </article>

      {/* CTA */}
      <section className="bg-muted py-12 border-t border-border">
        <div className="section-container max-w-3xl">
          <div className="bg-navy rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
            <div>
              <p className="font-bold text-lg mb-1">Umzugsreinigung mit Abgabegarantie</p>
              <p className="text-white/65 text-sm">Kostenlose Offerte – Antwort in 24 Stunden.</p>
            </div>
            <Link href="/anfrage" className="btn-primary shrink-0">
              Jetzt Offerte anfordern
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
