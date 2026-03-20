import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt | D'Namar Reinigungsdienst Basel",
  description:
    "Kontaktieren Sie D'Namar in Basel. Telefon: +41 79 252 75 57. Kostenlose Offerte innerhalb von 24 Stunden.",
};

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Telefon & WhatsApp",
    value: "+41 79 252 75 57",
    href: "tel:+41792527557",
  },
  {
    icon: Mail,
    label: "E-Mail",
    value: "info@dnamar.ch",
    href: "mailto:info@dnamar.ch",
  },
  {
    icon: MapPin,
    label: "Einsatzgebiet",
    value: "Basel & Umgebung",
    href: null,
  },
  {
    icon: Clock,
    label: "Erreichbarkeit",
    value: "Mo–Fr 08:00–18:00 · Sa 09:00–14:00",
    href: null,
  },
];

export default function KontaktPage() {
  return (
    <>
      {/* HEADER */}
      <section className="bg-navy pt-28 pb-16">
        <div className="section-container">
          <span className="text-brand font-semibold text-sm uppercase tracking-widest">
            Wir freuen uns auf Sie
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Kontakt
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Schreiben Sie uns oder rufen Sie an – wir erstellen Ihnen innerhalb
            von 24 Stunden eine kostenlose, unverbindliche Offerte.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* LEFT – contact info + map */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-border p-7 shadow-sm">
                <h2 className="font-bold text-navy text-lg mb-5">Kontaktdaten</h2>
                <ul className="space-y-4">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-brand" />
                      </span>
                      <div>
                        <p className="text-xs text-foreground/50 font-semibold uppercase tracking-wide mb-0.5">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-navy font-medium hover:text-brand transition-colors text-sm"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-navy font-medium text-sm">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                <iframe
                  title="D'Namar Einsatzgebiet Basel"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43386.35898697948!2d7.531249!3d47.559601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b9b2a82e65a1%3A0x64d6ae1c6e9fa612!2sBasel%2C%20Switzerland!5e0!3m2!1sen!2sch!4v1700000000000"
                  width="100%"
                  height="240"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* RIGHT – form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-border p-7 shadow-sm">
                <h2 className="font-bold text-navy text-lg mb-1">
                  Offerte oder Frage senden
                </h2>
                <p className="text-sm text-foreground/60 mb-6">
                  Alle Felder mit <span className="text-red-500">*</span> sind
                  Pflichtfelder.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
