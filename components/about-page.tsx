"use client"

import {
  ArrowLeft,
  Building2,
  GraduationCap,
  Briefcase,
  School,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AboutPageProps {
  onBack: () => void
}

const formations = [
  {
    icon: GraduationCap,
    title: "Formations courtes spécialisées",
    text: "Des modules intensifs, conçus pour répondre rapidement aux besoins opérationnels :",
    items: [
      "Gestion financière",
      "Leadership",
      "Normes environnementales",
      "Gestion des ressources humaines",
      "Ingénierie",
    ],
  },
  {
    icon: Briefcase,
    title: "Formations continues en entreprise",
    text: "Des programmes hybrides (en présentiel et en ligne), personnalisés selon votre organisation.",
    items: [],
  },
  {
    icon: School,
    title: "Cursus universitaire en Belgique",
    text: "Cursus complet en Belgique francophone pour obtenir un diplôme reconnu :",
    items: ["Master spécialisés", "Bachelier", "PHD", "Échanges académiques"],
  },
]

const avantages = [
  "Enseignement en français",
  "Formations modulables et hybrides",
  "Universités et établissements d'enseignement supérieur reconnus internationalement",
  "Partenariat avec les entreprises",
  "Accompagnement personnalisé",
]

const contacts = [
  {
    ville: "Lubumbashi",
    mail: "lubumbashi@walbru.cd",
    telephones: ["+243 972 605 152", "+243 828 858 300"],
    adresse: "115/3, avenue Sandoa coin Maniema",
  },
  {
    ville: "Kinshasa",
    mail: "r.kabona@walbru.cd",
    telephones: ["+243 971 000 178"],
    adresse: "206, avenue de la Nation - Kinshasa Gombe",
  },
]

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="min-h-dvh bg-background lg:flex items-center justify-center lg:p-4 overflow-x-hidden">
      <Card className="w-full lg:max-w-md overflow-hidden lg:shadow-2xl border-0 p-0 rounded-none lg:rounded-lg">
        {/* Header */}
        <div className="bg-primary p-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center shadow-lg mb-4 overflow-hidden">
            <Image
              src="/apple-icon.png"
              width={180}
              height={180}
              className="h-10 w-auto"
              alt="logo"
            />

          </div>
          <h1 className="text-2xl font-bold text-primary-foreground text-center text-balance">
            Qui sommes-nous ?
          </h1>
          <p className="text-primary-foreground/80 text-sm mt-2 text-center">
            Délégation générale Wallonie-Bruxelles
          </p>
        </div>

        {/* Hero photo */}
        <div className="relative h-42 w-full">
          <img
            src="/about/hero-cooperation.png"
            alt="Bâtiment de la Délégation générale Wallonie-Bruxelles"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        <CardContent className="p-6 space-y-8">
          {/* Intro */}
          <section className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
              La Délégation générale Wallonie-Bruxelles en République Démocratique
              du Congo est le reflet de la Belgique francophone à côté de chez vous,
              près de chez vous.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
              Notre coopération avec la République démocratique du Congo porte sur la
              Culture, l&apos;Innovation, l&apos;Environnement durable,
              l&apos;Agriculture, la Formation professionnelle et l&apos;Enseignement
              supérieur, en construisant des passerelles entre nos sociétés.
            </p>
            <p className="text-sm text-foreground leading-relaxed text-pretty font-medium">
              Cette année, nous mettons en avant un atout stratégique clé : la
              formation professionnelle, conçue pour répondre à vos besoins.
            </p>
          </section>

          {/* Formations */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-foreground">Nos formations</h2>

            {/* Formation photo */}
            <div className="relative rounded-xl overflow-hidden h-40 w-full">
              <img
                src="/about/formation.png"
                alt="Étudiants et professionnels en session de formation"
                className="h-full w-full object-cover"
              />
            </div>

            {formations.map((formation) => (
              <div
                key={formation.title}
                className="rounded-xl border border-border p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <formation.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground leading-snug text-balance">
                    {formation.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
                  {formation.text}
                </p>
                {formation.items.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {formation.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs text-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Graduation photo */}
            <div className="relative rounded-xl overflow-hidden h-40 w-full">
              <img
                src="/about/graduation.png"
                alt="Cérémonie de remise de diplômes universitaires"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent flex items-end p-4">
                <p className="text-xs font-medium text-card text-pretty">
                  Un diplôme reconnu internationalement, délivré en Belgique francophone.
                </p>
              </div>
            </div>
          </section>

          {/* Pourquoi choisir */}
          <section className="rounded-xl bg-foreground p-5 mt-4">
            <h2 className="text-base font-bold text-card text-balance">
              Pourquoi choisir Wallonie-Bruxelles ?
            </h2>
            <ul className="mt-3 space-y-2">
              {avantages.map((avantage) => (
                <li key={avantage} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-card leading-relaxed text-pretty">
                    {avantage}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Contacts */}
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-foreground">
                Envie d&apos;en savoir plus ?
              </h2>
              <p className="text-xs text-muted-foreground mt-1">Nos contacts :</p>
            </div>
            {contacts.map((contact) => (
              <div
                key={contact.ville}
                className="rounded-xl border border-border p-4 space-y-2"
              >
                <h3 className="text-sm font-semibold text-primary">
                  {contact.ville}
                </h3>
                <a
                  href={`mailto:${contact.mail}`}
                  className="flex items-center gap-2 text-xs text-foreground hover:text-primary transition-colors break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                  {contact.mail}
                </a>
                {contact.telephones.map((tel) => (
                  <a
                    key={tel}
                    href={`tel:${tel.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-xs text-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                    {tel}
                  </a>
                ))}
                <p className="flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  {contact.adresse}
                </p>
              </div>
            ))}
          </section>

          {/* Back button */}
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full h-14 text-base font-medium border-2 border-foreground text-foreground hover:bg-foreground hover:text-card transition-all duration-200 active:scale-95 mt-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l&apos;agenda
          </Button>

          {/* Footer */}
          <div className="pt-2 border-t border-border">
            <p className="text-center text-xs text-muted-foreground">
              © 2026 Délégation générale Wallonie-Bruxelles
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
