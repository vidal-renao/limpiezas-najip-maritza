import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Heart,
  ShieldCheck,
  Clock3,
  Users,
  MapPin,
  Star,
  BadgeCheck,
  Droplets,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Über uns – D'Namar Reinigungsdienst Basel",
  description:
    "Lernen Sie Maritza Rodriguez und Nadjib Rasuly kennen – die Gründer von D'Namar. Professionelle Reinigung in Basel mit persönlichem Einsatz, Schweizer Qualität und Abgabegarantie.",
  alternates: { canonical: "https://dnamar.ch/ueber-uns" },
};

/* ─── Data ──────────────────────────────────────────────────────────────── */
const VALUES = [
  {
    icon: Clock3,
    title: "Schweizer Pünktlichkeit",
    desc: "Termine werden eingehalten – ohne Ausnahme. Ihr Vertrauen ist unser wichtigstes Kapital.",
  },
  {
    icon: Heart,
    title: "Familiärer Einsatz",
    desc: "Wir behandeln Ihr Zuhause so, als wäre es unser eigenes – mit Sorgfalt, Diskretion und echtem Respekt.",
  },
  {
    icon: ShieldCheck,
    title: "Vollständig versichert",
    desc: "Unser Team arbeitet mit Berufshaftpflicht. Für Ihre Sicherheit – und für unsere Professionalität.",
  },
  {
    icon: Users,
    title: "Persönliche Betreuung",
    desc: "Kein Callcenter, keine anonymen Teams. Bei D'Namar wissen Sie, wer zu Ihnen kommt – bei jedem Besuch.",
  },
  {
    icon: Droplets,
    title: "Kalk-Expertise Basel",
    desc: "Wir kennen den Basler Kalk und wissen genau, wie man ihn effektiv und materialschonend entfernt.",
  },
  {
    icon: Star,
    title: "Qualitätsgarantie",
    desc: "Wenn etwas nicht passt, kommen wir kostenlos zurück – bis Sie vollständig zufrieden sind. Unser Wort gilt.",
  },
];

const TIMELINE = [
  {
    year: "Die Gründung",
    period: "2015",
    text: "Maritza Rodriguez und Nadjib Rasuly gründen D'Namar in Basel – mit einem klaren Ziel: professionelle Reinigung persönlich, verlässlich und ohne versteckte Kosten anzubieten. Die ersten Kunden kommen über Mundpropaganda.",
  },
  {
    year: "Das Wachstum",
    period: "2018–2021",
    text: "Dank konstanter Qualität und persönlicher Empfehlungen wächst der Kundenstamm stetig. D'Namar erweitert das Angebot auf Büros, Treppenhäuser und Umzugsreinigung mit Abgabegarantie.",
  },
  {
    year: "Heute",
    period: "2025",
    text: "D'Namar ist ein etabliertes Reinigungsunternehmen in Basel mit über 500 zufriedenen Kunden, einem eingespielten Team und dem gleichen Herzblut wie am ersten Tag.",
  },
];

const STATS = [
  { value: "500+", label: "Zufriedene Kunden" },
  { value: "10+", label: "Jahre Erfahrung" },
  { value: "4.9 ★", label: "Kundenbewertung" },
  { value: "100%", label: "Abgabegarantie" },
];

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function UeberUnsPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-28 pb-24 overflow-hidden">
        {/* Soft radial glow */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 40%, #4caf82 0%, transparent 60%), radial-gradient(circle at 10% 70%, #4caf82 0%, transparent 50%)",
          }}
        />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-6">
              Das Team hinter D&apos;Namar
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Reinigung als{" "}
              <span className="text-brand">Versprechen</span>.
              <br />Nicht als Routine.
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed mb-10">
              Hinter D&apos;Namar stehen keine anonymen Mitarbeitenden, sondern
              Menschen, die ihren Namen für ihre Arbeit einsetzen. Maritza
              Rodriguez und Nadjib Rasuly haben dieses Unternehmen aufgebaut,
              weil sie an echte Qualität glauben – und an den Unterschied,
              den persönlicher Einsatz macht.
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center sm:text-left">
                  <p className="text-3xl font-bold text-brand">{value}</p>
                  <p className="text-sm text-white/55 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFEST ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Text */}
            <div>
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">
                Unsere Geschichte
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy leading-snug mb-7">
                Gegründet in Basel.
                <br />Verwurzelt in Basel.
              </h2>

              <div className="space-y-5 text-foreground/70 leading-relaxed">
                <p>
                  Alles begann mit einem einfachen Gedanken: Reinigung soll kein
                  anonymer Service sein – sondern ein persönliches Versprechen.
                  Maritza Rodriguez und Nadjib Rasuly gründeten D&apos;Namar mit
                  dem Ziel, Basler Haushalten und Unternehmen genau das zu geben,
                  was viele Grossunternehmen nicht bieten können:{" "}
                  <strong className="text-navy">Verlässlichkeit mit Gesicht.</strong>
                </p>
                <p>
                  Basel ist unsere Heimat. Wir kennen die Häuser, die
                  Liegenschaftsverwaltungen und die hohen Ansprüche der Basler
                  Mieter und Eigentümer. Wir wissen, was der harte Basler Kalk
                  aus Armaturen, Duschen und Glasflächen macht – und wir haben
                  die richtigen Mittel und das Fachwissen, um ihn schonend und
                  wirkungsvoll zu entfernen.
                </p>
                <p>
                  Was uns vom ersten Tag an antreibt: der Moment, wenn ein Kunde
                  seine frisch gereinigte Wohnung betritt und sieht, was echte
                  Sorgfalt bedeutet. Dieses Vertrauen ist unser Antrieb – und
                  unser grösster Lohn.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <Link href="/anfrage" className="btn-primary">
                  Offerte anfordern
                </Link>
                <Link
                  href="/referenzen"
                  className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-dark transition-colors"
                >
                  Referenzen lesen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Service photo */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/images/Boden-wischen-768x512.jpg"
                alt="D'Namar Reinigungsteam bei der Arbeit in Basel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 shadow-md">
                <BadgeCheck className="w-4 h-4 text-brand" />
                <span className="text-xs font-semibold text-navy">Versichert & Geprüft</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM PORTRAITS ───────────────────────────────────────────────── */}
      <section className="bg-muted py-20 lg:py-28" aria-labelledby="team-heading">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">
              Die Menschen dahinter
            </span>
            <h2
              id="team-heading"
              className="mt-2 text-3xl sm:text-4xl font-bold text-navy"
            >
              Unser Gründungsteam
            </h2>
            <p className="mt-4 text-foreground/65 max-w-xl mx-auto leading-relaxed">
              Zwei Menschen, eine Mission: Reinigung auf einem Niveau, das man
              in Basel nicht erwartet – und das man nie mehr missen möchte.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* ── Maritza ── */}
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col">
              {/* Photo */}
              <div className="relative h-80 w-full">
                <Image
                  src="/images/Maritza-Rodrigeuz-771x1024.jpeg"
                  alt="Maritza Rodriguez – Gründerin D'Namar Reinigungsdienst Basel"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-white font-bold text-xl">Maritza Rodriguez</p>
                  <p className="text-brand text-sm font-medium">Gründerin & Reinigungsprofi</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1 gap-5">
                <blockquote className="relative pl-5 border-l-4 border-brand italic text-foreground/70 text-sm leading-relaxed">
                  «Sauberkeit bedeutet für mich mehr als nur putzen – es ist ein
                  Ausdruck von Respekt gegenüber dem Menschen, für den ich arbeite.
                  Ich gehe erst, wenn ich selbst zufrieden wäre.»
                </blockquote>

                <p className="text-sm text-foreground/70 leading-relaxed">
                  Maritza bringt über zehn Jahre Erfahrung in der professionellen
                  Haushalts- und Gewerbereinigung mit. Ihr Auge fürs Detail ist
                  legendär unter Stammkunden: Kein Kalkfleck, kein Fettrand, kein
                  übersehener Winkel. Dazu kommt ihre freundliche, diskrete Art –
                  sie ist die erste Ansprechperson für Privatkunden in ganz Basel.
                </p>

                <p className="text-sm text-foreground/70 leading-relaxed">
                  Besonders am Herzen liegen ihr Umzugsreinigungen: «Die Wohnungsabgabe
                  ist oft stressig. Ich möchte, dass meine Kunden entspannt zum
                  Abgabetermin gehen – weil sie wissen, dass alles sitzt.»
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {["Haushaltsreinigung", "Umzugsreinigung", "Tiefenreinigung", "Privatkunden"].map((s) => (
                    <span
                      key={s}
                      className="text-xs font-medium bg-brand/10 text-brand rounded-full px-3 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Nadjib ── */}
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col">
              {/* Photo */}
              <div className="relative h-80 w-full">
                <Image
                  src="/images/Rasuly-bild.jpeg"
                  alt="Nadjib Rasuly – Mitgründer D'Namar Reinigungsdienst Basel"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-white font-bold text-xl">Nadjib Rasuly</p>
                  <p className="text-brand text-sm font-medium">Mitgründer & Reinigungsprofi</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1 gap-5">
                <blockquote className="relative pl-5 border-l-4 border-brand italic text-foreground/70 text-sm leading-relaxed">
                  «Qualität erkennt man nicht nur im Glanz – sondern im Vertrauen,
                  das Kunden uns schenken, indem sie uns wieder buchen. Das ist
                  der Massstab, an dem ich meine Arbeit messe.»
                </blockquote>

                <p className="text-sm text-foreground/70 leading-relaxed">
                  Nadjib ist die operative Kraft hinter D&apos;Namar. Er koordiniert
                  Einsätze, ist erster Ansprechpartner für Gewerbekunden und sorgt
                  dafür, dass jeder Auftrag reibungslos abläuft – pünktlich,
                  vollständig und nach Vereinbarung. Seine Präzision hat dazu
                  beigetragen, dass viele Unternehmen in Basel D&apos;Namar als
                  festen Partner für die Unterhaltsreinigung gewählt haben.
                </p>

                <p className="text-sm text-foreground/70 leading-relaxed">
                  Sein Anspruch: «Jede Büroreinigung, jedes Treppenhaus, jede
                  Praxis – alles wird so behandelt wie das Wichtigste, was wir
                  heute machen. Weil es das für unsere Kunden ist.»
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {["Büroreinigung", "Treppenhausreinigung", "Gewerbereinigung", "B2B-Kunden"].map((s) => (
                    <span
                      key={s}
                      className="text-xs font-medium bg-brand/10 text-brand rounded-full px-3 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALITY PROMISE ──────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-24">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Photo */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl order-2 lg:order-1">
              <Image
                src="/images/Fenster-blauer-Himmel-768x512.jpg"
                alt="Glasreinigung Basel – streifenfreie Fenster von D'Namar"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-navy/40 to-transparent" />
              {/* Kalk badge */}
              <div className="absolute bottom-5 right-5 bg-white rounded-2xl shadow-lg p-4 max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="w-4 h-4 text-brand" />
                  <span className="text-xs font-bold text-navy uppercase tracking-wide">Kalk-Expertise</span>
                </div>
                <p className="text-xs text-foreground/65 leading-snug">
                  Wir entfernen Basler Kalkablagerungen schonend und dauerhaft.
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">
                Unser Qualitätsversprechen
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy leading-snug mb-7">
                Was «sauber» in Basel
                <br />wirklich bedeutet
              </h2>

              <div className="space-y-5 text-foreground/70 leading-relaxed text-sm sm:text-base">
                <p>
                  Das Basler Leitungswasser ist für seinen hohen Kalkgehalt bekannt.
                  Das bedeutet: Armaturen verkalken schneller, Glasduschen zeigen
                  früher weisse Schlieren, und Küchenoberflächen brauchen spezifische
                  Pflege. Viele Reinigungsdienste kennen das Problem – aber nicht alle
                  haben das Fachwissen, um damit richtig umzugehen.
                </p>
                <p>
                  Bei D&apos;Namar ist die Kalkbehandlung ein{" "}
                  <strong className="text-navy">fester Bestandteil jedes Einsatzes</strong>. Wir
                  arbeiten mit professionellen, materialschonenden Entkalkungsmitteln
                  und kennen die Grenzen jedes Oberfläcbentyps – Chrom, Glas, Keramik,
                  Naturstein. Das Ergebnis: Armaturen, die wieder glänzen. Duschen,
                  die aussehen wie neu.
                </p>
                <p>
                  Das ist nur ein Beispiel für das, was uns auszeichnet. Unser
                  Qualitätsversprechen gilt für jeden Handgriff:{" "}
                  <strong className="text-navy">Wenn wir fertig sind, ist es wirklich sauber.</strong>{" "}
                  Nicht «gut genug» – sondern so, wie Sie es sich vorstellen.
                </p>
              </div>

              {/* Promise chips */}
              <ul className="mt-8 space-y-3">
                {[
                  "Professionelle Entkalkungsmittel – schonend & wirksam",
                  "Kontrolle nach jedem Einsatz durch das Gründerteam",
                  "Abgabegarantie bei Umzugsreinigung – ohne Aufpreis",
                  "Zufriedenheitsgarantie: Wir kommen kostenlos zurück",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-brand/15 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-brand" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section className="bg-muted py-20" aria-labelledby="values-heading">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">
              Was uns antreibt
            </span>
            <h2
              id="values-heading"
              className="mt-2 text-3xl sm:text-4xl font-bold text-navy"
            >
              Unsere Werte
            </h2>
            <p className="mt-4 text-foreground/65 max-w-xl mx-auto leading-relaxed">
              Sechs Grundsätze, die unser Handeln täglich bestimmen –
              in jedem Haushalt, in jedem Büro, in jedem Treppenhaus.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-border shadow-sm hover:shadow-md hover:border-brand/20 transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                  <Icon className="w-5 h-5 text-brand" />
                </div>
                <h3 className="font-bold text-navy mb-2">{title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-24">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-14">
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">
              Unsere Geschichte
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">
              Wie alles begann
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-brand/20" aria-hidden />

            <div className="space-y-10">
              {TIMELINE.map(({ year, period, text }, i) => (
                <div key={i} className="relative flex gap-8 pl-16">
                  {/* Dot */}
                  <span
                    className="absolute left-0 top-1 w-12 h-12 rounded-full bg-navy flex items-center justify-center shrink-0 shadow-md"
                    aria-hidden
                  >
                    <span className="text-brand font-bold text-xs">{period}</span>
                  </span>

                  <div className="pb-2">
                    <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1.5">
                      {year}
                    </p>
                    <p className="text-foreground/70 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy py-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, #4caf82 0%, transparent 60%)",
          }}
        />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-snug">
                Überzeugen Sie sich selbst –
                <br />
                <span className="text-brand">persönlich und kostenlos.</span>
              </h2>
              <p className="text-white/65 leading-relaxed text-lg">
                Fordern Sie Ihre unverbindliche Offerte an. Wir melden uns
                innerhalb von 24 Stunden – persönlich, nicht automatisiert.
              </p>
            </div>

            <div className="lg:text-right flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
              <Link href="/anfrage" className="btn-primary text-base px-8 py-4">
                Kostenlose Offerte anfordern
              </Link>
              <Link href="/kontakt" className="btn-secondary text-base px-8 py-4">
                Direkt kontaktieren
              </Link>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: BadgeCheck, label: "Abgabegarantie" },
              { icon: ShieldCheck, label: "Berufshaftpflicht" },
              { icon: MapPin, label: "Lokal in Basel" },
              { icon: Clock3, label: "Antwort in 24 h" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-brand" />
                </div>
                <span className="text-white/60 text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
