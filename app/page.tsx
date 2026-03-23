import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ServiceSlider from "@/components/ui/ServiceSlider";
import {
  ShieldCheck,
  Clock,
  MapPin,
  Star,
  BadgeCheck,
  ChevronDown,
  Droplets,
  Sparkles,
  ThumbsUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Professioneller Reinigungsdienst Basel | D'Namar",
  description:
    "D'Namar – Ihr zuverlässiger Reinigungsprofi in Basel. Haushalts-, Büro-, Umzugs- und Treppenhausreinigung mit Kalkschutz-Expertise. Kostenlose Offerte in 24 Stunden.",
  keywords: [
    "Reinigung Basel",
    "Reinigungsservice Basel",
    "Kalkschutz Basel",
    "Haushaltsreinigung Basel",
    "Büroreinigung Basel",
    "Umzugsreinigung Basel",
    "Treppenhausreinigung Basel",
    "Glasreinigung Basel",
    "Reinigungsdienst Basel",
  ],
};

/* ─── Data ──────────────────────────────────────────────────────────────── */
const TRUST_BAR = [
  { icon: Clock, label: "10+ Jahre Erfahrung" },
  { icon: ShieldCheck, label: "Versichert & Geprüft" },
  { icon: MapPin, label: "Lokales Team Basel" },
  { icon: BadgeCheck, label: "Festpreis-Garantie" },
];

const WHY_POINTS = [
  {
    title: "Kalkexperten für Basel",
    desc: "Das Basler Leitungswasser ist bekannt für seinen hohen Kalkgehalt. Unser Team kennt die richtigen Mittel und Techniken, um hartnäckige Kalkablagerungen in Bad, Küche und an Glasflächen effektiv zu entfernen.",
    icon: Droplets,
  },
  {
    title: "Massgeschneiderte Lösungen",
    desc: "Jeder Auftrag wird individuell auf Ihre Bedürfnisse abgestimmt – ob einmalige Tiefenreinigung oder regelmässige Unterhaltsreinigung.",
    icon: Star,
  },
  {
    title: "Flexibel & zuverlässig",
    desc: "Wir reinigen nach Ihrem Zeitplan – frühmorgens, abends oder am Wochenende. Kurzfristige Termine sind auf Anfrage möglich.",
    icon: Clock,
  },
  {
    title: "Transparent & fair",
    desc: "Keine versteckten Kosten. Sie erhalten eine klare Offerte vor dem Auftrag und zahlen nur, was vereinbart wurde.",
    icon: ShieldCheck,
  },
];

const TESTIMONIALS = [
  {
    name: "Petra M.",
    location: "Gundeldingen, Basel",
    service: "Haushaltsreinigung",
    rating: 5,
    text: "D'Namar reinigt unsere Wohnung seit über einem Jahr. Immer pünktlich, immer gründlich – und der Kalk in unserem Bad ist endlich Geschichte. Sehr empfehlenswert!",
    date: "Februar 2025",
  },
  {
    name: "Thomas K.",
    location: "Kleinbasel",
    service: "Büroreinigung",
    rating: 5,
    text: "Wir haben unser Büro (12 Mitarbeitende) zu D'Namar gewechselt. Der Unterschied war sofort spürbar. Das Team arbeitet diskret, effizient und zu fairen Konditionen.",
    date: "Januar 2025",
  },
  {
    name: "Sandra B.",
    location: "St. Alban, Basel",
    service: "Umzugsreinigung",
    rating: 5,
    text: "Dank der Abgabegarantie war ich entspannt. Die Verwaltung hatte keine einzige Beanstandung – nicht mal am Backofen. Absolut professionell und unkompliziert.",
    date: "März 2025",
  },
];

const DISTRICTS = [
  "Grossbasel", "Kleinbasel", "Gundeldingen", "St. Alban",
  "Riehen", "Bettingen", "Allschwil", "Binningen", "Birsfelden", "Muttenz",
];

const FAQ = [
  {
    q: "Wie schnell kann D'Namar einen Termin anbieten?",
    a: "In der Regel können wir innerhalb von 3–5 Werktagen einen Termin anbieten. Bei dringendem Bedarf – z. B. vor einer Wohnungsübergabe – setzen wir alles daran, kurzfristig zu helfen.",
  },
  {
    q: "Sind Reinigungsmittel und Geräte inklusive?",
    a: "Ja. Wir bringen alle professionellen Reinigungsmittel und Maschinen mit. Sie müssen nichts vorbereiten oder bereitstellen.",
  },
  {
    q: "Was kostet eine Haushaltsreinigung in Basel?",
    a: "Die Preise richten sich nach Grösse und Zustand des Objekts. Als Orientierung: kleine Wohnungen ab CHF 180, grosse Wohnungen ab CHF 320. Stundenweise Reinigung ab CHF 45/Stunde. Wir erstellen gerne eine kostenlose Offerte.",
  },
  {
    q: "Was bedeutet die Abgabegarantie bei der Umzugsreinigung?",
    a: "Wenn die Liegenschaftsverwaltung nach unserer Endreinigung Beanstandungen hat, kommen wir kostenlos ein zweites Mal – bis zur erfolgreichen Abnahme.",
  },
  {
    q: "Reinigt D'Namar auch regelmässig (Unterhaltsreinigung)?",
    a: "Ja. Viele unserer Kunden buchen uns wöchentlich oder zweiwöchentlich. Regelmässige Kunden profitieren von festen Teams und bevorzugten Terminen.",
  },
];

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-navy overflow-hidden"
        aria-label="Hero"
      >
        {/* Background decoration */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, #4caf82 0%, transparent 55%), radial-gradient(circle at 10% 80%, #4caf82 0%, transparent 40%)",
          }}
        />

        <div className="section-container relative z-10 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand mb-6">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                Reinigungsprofi in Basel seit 2015
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Sauberkeit,{" "}
                <span className="text-brand">die man sieht</span>
                {" –"}
                <br />
                Qualität, die{" "}
                <span className="text-brand">man spürt</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed mb-8">
                Maritza Rodriguez und Nadjib Rasuly und ihr Team bieten professionelle
                Reinigungsdienstleistungen für Privathaushalte und Unternehmen im ganzen
                Kanton Basel – gründlich, diskret und persönlich.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/anfrage" className="btn-primary text-base px-8 py-4">
                  Kostenlose Offerte anfordern
                </Link>
                <a
                  href="tel:+41792527557"
                  className="btn-secondary text-base px-8 py-4"
                >
                  +41 79 252 75 57
                </a>
              </div>

              {/* Quick signals */}
              <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-white/55">
                {["Keine Vorauszahlung", "Abgabegarantie inklusive", "Antwort in 24 Stunden", "Lokal & versichert"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-brand shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Right: team photos */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4 h-[500px]">
                {/* Maritza */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy-dark/50">
                  <Image
                    src="/images/Maritza-Rodrigeuz-771x1024.jpeg"
                    alt="Maritza Rodriguez – Reinigungsprofi und Mitgründerin D'Namar Basel"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1280px) 30vw, 280px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-semibold text-sm">Maritza Rodriguez</p>
                    <p className="text-white/65 text-xs">Mitgründerin</p>
                  </div>
                </div>

                {/* Nadjib – offset down */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy-dark/50 mt-14 self-start h-[calc(100%-56px)]">
                  <Image
                    src="/images/Rasuly-bild.jpeg"
                    alt="Nadjib Rasuly – Reinigungsprofi und Mitgründer D'Namar Basel"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1280px) 30vw, 280px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-semibold text-sm">Nadjib Rasuly</p>
                    <p className="text-white/65 text-xs">Mitgründer</p>
                  </div>
                </div>
              </div>

              {/* Stats floating card */}
              <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 px-6 py-4 flex justify-between">
                {[
                  { val: "500+", label: "Kunden" },
                  { val: "10+", label: "Jahre" },
                  { val: "4.9★", label: "Bewertung" },
                  { val: "24h", label: "Antwortzeit" },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-xl font-bold text-white">{val}</p>
                    <p className="text-xs text-white/55 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal divider */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-border py-6" aria-label="Vertrauenssignale">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_BAR.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand" />
                </div>
                <span className="text-sm font-semibold text-navy">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE SLIDER ────────────────────────────────────────────────── */}
      <section className="bg-muted py-20 lg:py-28" aria-labelledby="slider-heading">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">
              Was wir anbieten
            </span>
            <h2
              id="slider-heading"
              className="mt-2 text-3xl sm:text-4xl font-bold text-navy"
            >
              Unsere Reinigungsleistungen
            </h2>
            <p className="mt-4 text-foreground/65 max-w-xl mx-auto leading-relaxed">
              Von der wöchentlichen Unterhaltsreinigung bis zur Endreinigung mit
              Abgabegarantie – massgeschneiderte Lösungen für ganz Basel.
            </p>
          </div>

          <ServiceSlider />

          <div className="text-center mt-8">
            <Link href="/anfrage" className="btn-primary text-base px-8 py-4">
              Jetzt Offerte anfordern
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY D'NAMAR ───────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28" aria-labelledby="why-heading">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left: value points */}
            <div>
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">
                Warum D&apos;Namar?
              </span>
              <h2
                id="why-heading"
                className="mt-2 text-3xl sm:text-4xl font-bold text-navy leading-snug mb-8"
              >
                Reinigung mit Herz
                <br />und Präzision
              </h2>

              <ul className="space-y-6">
                {WHY_POINTS.map(({ title, desc, icon: Icon }) => (
                  <li key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">{title}</h3>
                      <p className="text-sm text-foreground/65 leading-relaxed">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/ueber-uns" className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-dark transition-colors">
                  Mehr über uns erfahren
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: team photos collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                  <Image
                    src="/images/Maritza-Rodrigeuz-771x1024.jpeg"
                    alt="Maritza Rodriguez, D'Namar Reinigungsdienst Basel"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, 280px"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                    <Image
                      src="/images/Rasuly-bild.jpeg"
                      alt="Nadjib Rasuly, D'Namar Reinigungsdienst Basel"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 50vw, 280px"
                    />
                  </div>
                  {/* Quote card */}
                  <div className="bg-navy rounded-2xl p-5 text-white">
                    <svg className="w-6 h-6 text-brand mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-sm text-white/85 leading-relaxed italic">
                      «Sauberkeit ist für uns nicht nur ein Job – es ist unser
                      Versprechen an jeden Kunden in Basel.»
                    </p>
                    <p className="mt-3 text-xs text-brand font-semibold">— Maritza & Nadjib</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KALKSCHUTZ SEO SECTION ────────────────────────────────────────── */}
      <section
        className="relative bg-navy overflow-hidden py-20 lg:py-28"
        aria-labelledby="kalk-heading"
      >
        {/* Subtle glow */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #4caf82 0%, transparent 55%), radial-gradient(circle at 85% 20%, #4caf82 0%, transparent 40%)",
          }}
        />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left: image with floating badge */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="/images/Fenster-blauer-Himmel-768x512.jpg"
                  alt="Kalkfreie Fensterreinigung Basel – D'Namar Glasreinigung mit Kalkschutz"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 lg:bottom-8 lg:-right-8 bg-brand rounded-2xl px-5 py-4 shadow-xl shadow-brand/30 flex items-center gap-3">
                <Droplets className="w-7 h-7 text-white shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm leading-none">Kalkschutz-Experten</p>
                  <p className="text-white/75 text-xs mt-0.5">Spezialisiert auf Basler Leitungswasser</p>
                </div>
              </div>

              {/* Logo accent */}
              <div className="absolute -top-5 -left-5 lg:-top-6 lg:-left-6 w-16 h-16 rounded-2xl overflow-hidden border-2 border-brand/40 shadow-lg bg-navy">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/N.jpeg"
                  alt="D'Namar Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: SEO-rich copy */}
            <div>
              <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm text-brand font-semibold mb-5">
                Unsere Kalkschutz-Expertise
              </span>

              <h2
                id="kalk-heading"
                className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6"
              >
                Hartes Wasser. <span className="text-brand">Weiche Ergebnisse.</span>
                <br />Kalkschutz in Basel.
              </h2>

              <div className="space-y-5 text-white/75 leading-relaxed text-[15px]">
                <p>
                  Basler Leitungswasser zählt zu den härtesten in der Deutschschweiz – mit einem
                  Kalkgehalt von bis zu <strong className="text-white">35 französischen Härtegraden</strong>.
                  Das bedeutet: Ohne professionelle Pflege bilden sich auf Armaturen, Duschen,
                  Glasflächen und Küchengeräten hartnäckige Kalkflecken, die mit gewöhnlichen
                  Haushaltsmitteln kaum zu entfernen sind.
                </p>
                <p>
                  D&apos;Namar hat sich seit 2015 auf genau dieses Problem spezialisiert. Wir setzen
                  geprüfte <strong className="text-white">Kalklöser und Schutzversiegelungen</strong> ein,
                  die speziell für hartes Wasser entwickelt wurden – schonend für Oberflächen,
                  wirksam gegen Ablagerungen. Nach jeder Reinigung tragen wir auf Wunsch einen
                  Kalkschutzfilm auf Glas, Chrom und Naturstein auf, der neue Ablagerungen
                  bis zu <strong className="text-white">8 Wochen</strong> fernhält.
                </p>
                <p>
                  Ob Duschkabine in Gundeldingen, Edelstahlküche in Riehen oder Glasfront in
                  einem Basler Gewerbeobjekt – unser Team kennt die richtige Methode für jede
                  Oberfläche und jeden Kalkgrad.
                </p>
              </div>

              {/* Feature bullets */}
              <ul className="mt-8 space-y-3">
                {[
                  { icon: Droplets, text: "pH-neutrale Kalklöser – schonend & hochwirksam" },
                  { icon: Sparkles, text: "Kalkschutzversiegelung auf Wunsch inklusive" },
                  { icon: ShieldCheck, text: "Geprüfte Mittel – sicher für Mensch & Haustier" },
                  { icon: ThumbsUp, text: "Ergebnis-Garantie oder kostenlose Nachbesserung" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="w-7 h-7 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-brand" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/anfrage" className="btn-primary px-8 py-4 text-base">
                  Kalkschutz-Beratung anfragen
                </Link>
                <Link
                  href="/glasreinigung"
                  className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-light transition-colors pt-2"
                >
                  Mehr zur Glasreinigung
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="bg-muted py-20 lg:py-24" aria-labelledby="reviews-heading">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">
              Kundenstimmen
            </span>
            <h2
              id="reviews-heading"
              className="mt-2 text-3xl sm:text-4xl font-bold text-navy"
            >
              Was unsere Kunden sagen
            </h2>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-foreground/60">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </span>
              <span>4.9 / 5 – Basierend auf 90+ Bewertungen</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, location, service, rating, text, date }) => (
              <div
                key={name}
                className="bg-white rounded-2xl border border-border p-7 shadow-sm flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <blockquote className="text-sm text-foreground/75 leading-relaxed flex-1 mb-5">
                  &ldquo;{text}&rdquo;
                </blockquote>

                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-navy text-sm">{name}</p>
                    <p className="text-xs text-foreground/50">{location}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-brand/10 text-brand text-xs font-semibold px-2.5 py-0.5">
                      {service}
                    </span>
                    <p className="text-xs text-foreground/40 mt-1">{date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/referenzen"
              className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-dark transition-colors"
            >
              Alle Referenzen ansehen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DISTRICT COVERAGE ─────────────────────────────────────────────── */}
      <section className="bg-white py-14 border-y border-border" aria-label="Einsatzgebiete">
        <div className="section-container">
          <div className="text-center mb-8">
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">
              Einsatzgebiet
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy">
              Wir reinigen in ganz Basel
            </h2>
            <p className="mt-2 text-foreground/60 text-sm">
              Von Grossbasel bis Riehen – Ihr lokales Reinigungsteam.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {DISTRICTS.map((d) => (
              <span
                key={d}
                className="rounded-full border border-border bg-muted px-4 py-2 text-sm text-foreground/70 font-medium"
              >
                📍 {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-muted py-20 lg:py-24" aria-labelledby="faq-heading">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-brand font-semibold text-sm uppercase tracking-widest">
                FAQ
              </span>
              <h2
                id="faq-heading"
                className="mt-2 text-3xl sm:text-4xl font-bold text-navy"
              >
                Häufig gestellte Fragen
              </h2>
            </div>

            <dl className="space-y-4">
              {FAQ.map(({ q, a }) => (
                <div
                  key={q}
                  className="bg-white rounded-2xl border border-border px-7 py-6 shadow-sm"
                >
                  <dt className="font-semibold text-navy flex items-start justify-between gap-4">
                    <span>{q}</span>
                    <ChevronDown className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  </dt>
                  <dd className="mt-3 text-sm text-foreground/65 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 text-center">
              <p className="text-foreground/60 text-sm mb-4">
                Haben Sie weitere Fragen? Wir helfen gerne persönlich weiter.
              </p>
              <Link href="/kontakt" className="btn-primary px-8 py-3">
                Jetzt Frage stellen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="relative bg-navy py-20 lg:py-24 overflow-hidden" aria-label="Kontakt-Aufruf">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 80% 50%, #4caf82 0%, transparent 60%)",
          }}
        />

        <div className="section-container relative z-10 text-center">
          <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-4 py-1 text-sm text-brand font-semibold mb-5">
            Kostenlos & unverbindlich
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Bereit für ein saubereres Basel?
          </h2>
          <p className="text-white/65 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
            Kontaktieren Sie uns noch heute. Wir erstellen Ihre persönliche Offerte
            und melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/anfrage" className="btn-primary text-base px-8 py-4">
              Offerte anfordern
            </Link>
            <a
              href="tel:+41792527557"
              className="btn-secondary text-base px-8 py-4"
            >
              +41 79 252 75 57
            </a>
          </div>
          <p className="mt-6 text-white/40 text-sm">
            Mo–Fr 08–18 Uhr · Sa 09–14 Uhr
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />
    </>
  );
}
