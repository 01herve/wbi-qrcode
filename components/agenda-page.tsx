"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Clock, ArrowRight, Share2, Info, ArrowLeft, Bell, BellRing, Check, Ticket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Activity {
  id: string
  title: string
  description: string
  image: string
  date: string
  day: string
  month: string
  time: string
  location: string
  type: "Éducation" | "Éloquence" | "Formation" | "Culture" | "Musique"
  entry?: string
}

const activities: Activity[] = [

  {
    id: "2",
    title: "Formation Vidéo / Tech Audio Live",
    description:
      "Formation technique et pratique animée par Mathias Delvecchio, vidéaste et réalisateur belge, et Amaury Ruell, ingénieur du son et producteur musical belge. Ces ateliers intensifs offriront à 20 jeunes techniciens et vidéastes de Lubumbashi l'opportunité d'améliorer leurs techniques de captation vidéo, de sonorisation live et de production audiovisuelle appliquées aux événements culturels, artistiques et médiatiques, à travers des exercices pratiques et des mises en situation réelles. Cette démarche valorise la collaboration entre la Belgique et la RDC, tout en favorisant la transmission des compétences, le partage d'expertise et le renforcement des capacités des jeunes professionnels du secteur audiovisuel.",
    image: "/activities/video-audio.png",
    date: "2026-06-11",
    day: "11",
    month: "Juin",
    time: "Du 11 au 19 juin, 9h00 - 15h00",
    location: "Bureau Wallonie-Bruxelles",
    type: "Formation",
  },
  {
    id: "6",
    title: "Fête de la Musique",
    description:
      "Dans le cadre de la célébration de la Journée Internationale de la Musique célébrée le 21 juin, le Bureau Wallonie-Bruxelles organise un concert musical avec l'orchestre Negro Spiritual, l'orchestre Golden et l'artiste Mjoe ZUKA. Cette soirée sera l'occasion pour le public de découvrir des univers musicaux variés à travers des prestations mettant à l'honneur le talent, la créativité et la richesse des expressions musicales. Un rendez-vous placé sous le signe du partage, de la convivialité et de la célébration de la musique dans toute sa diversité.",
    image: "/activities/fete-musique.png",
    date: "2026-06-21",
    day: "21",
    month: "Juin",
    time: "Dimanche 21 juin, 18h00",
    location: "Bureau Wallonie-Bruxelles",
    type: "Musique",
  },
  {
    id: "7",
    title: "Slam : Spectacle « La Vie en Prose »",
    description:
      "Le quotidien mis en mots et partagé à cœur ouvert. L'artiste Jordy Mandé monte sur scène pour donner vie aux réalités, aux joies et aux épreuves de tous les jours à travers le slam. « La Vie en Prose » met en valeur la richesse de la langue française et valorise le slam comme un art de partage et d'écoute mutuelle.",
    image: "/activities/slam.png",
    date: "2026-06-24",
    day: "24",
    month: "Juin",
    time: "Mercredi 24 juin, 16h00",
    location: "Bureau Wallonie-Bruxelles",
    type: "Éloquence",
  },
  {
    id: "8",
    title: "Soirée Rumba — Park Musica",
    description:
      "Célébrons la rumba congolaise ! L'orchestre du Park Musica propose une soirée unique pour honorer ce patrimoine culturel vivant. Venez partager un moment festif et convivial autour d'un répertoire qui mélange grands classiques, sonorités contemporaines et nouveautés. Un rendez-vous idéal pour tous les passionnés de la Rumba et de danse.",
    image: "/activities/rumba.png",
    date: "2026-06-26",
    day: "26",
    month: "Juin",
    time: "Vendredi 26 juin, 18h00",
    location: "Bureau Wallonie-Bruxelles",
    type: "Musique",
  },
  {
    id: "3",
    title: "Soirée d'Éloquence — Édition 8",
    description:
      "Congo Culture présente : La Soirée d'Éloquence. Un grand rendez-vous de la parole et de la réflexion ! Pour sa 8ᵉ édition, la Soirée d'Éloquence s'inspire du « Procès de Valentin-Yves Mudimbe », figure majeure de la pensée africaine contemporaine, pour proposer au public un moment de débat captivant. À travers des prises de parole percutantes et des performances artistiques, l'activité met en valeur l'art de convaincre ainsi que la transmission des idées et du savoir.",
    image: "/activities/eloquence.png",
    date: "2026-06-30",
    day: "30",
    month: "Juin",
    time: "Samedi 30 juin 2026",
    location: "Pullman Grand Karavia",
    type: "Éloquence",
  },
  {
    id: "4",
    title: "Concours Scrabble Indépendance",
    description:
      "Pour bien célébrer la fête de l'indépendance de la RDC, le Bureau Wallonie-Bruxelles et la Ligue de Scrabble du Katanga organisent une compétition qui rassemble les passionnés de la langue française. Ce tournoi dédié aux mots croisés propose un moment de réflexion et de stratégie, où les participants mesurent leur maîtrise du vocabulaire, leur rapidité d'esprit et leur sens du jeu. Au-delà du jeu, le tournoi permet aux participants de partager un instant convivial tout en mettant à l'honneur la promotion de la culture.",
    image: "/activities/scrabble.png",
    date: "2026-06-30",
    day: "30",
    month: "Juin",
    time: "12h00",
    location: "Bureau Wallonie-Bruxelles",
    type: "Culture",
  },
]

const typeColors: Record<Activity["type"], string> = {
  "Éducation": "bg-primary/10 text-primary",
  "Éloquence": "bg-foreground/10 text-foreground",
  "Formation": "bg-[#0A66C2]/10 text-[#0A66C2]",
  "Culture": "bg-[#25D366]/15 text-[#1a9c4b]",
  "Musique": "bg-[#E1306C]/10 text-[#E1306C]",
}

interface AgendaPageProps {
  userName?: string
  userKey?: string
  onNavigateSocial: () => void
  onNavigateAbout: () => void
}

export function AgendaPage({ userName, userKey, onNavigateSocial, onNavigateAbout }: AgendaPageProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [reminders, setReminders] = useState<Record<string, boolean>>({})

  // Build a storage key unique to this user so reminders are personal
  const storageKey = `wb-reminders-${userKey || "invite"}`

  // Load this user's reminders on mount / when the user changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      setReminders(saved ? JSON.parse(saved) : {})
    } catch {
      setReminders({})
    }
  }, [storageKey])

  const toggleReminder = (id: string) => {
    setReminders((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      if (!next[id]) delete next[id]
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        // ignore storage errors
      }
      return next
    })
  }

  const reminderActivities = activities.filter((a) => reminders[a.id])

  // Detail view
  if (selectedActivity) {
    const isReminderOn = !!reminders[selectedActivity.id]
    return (
      <div className="min-h-dvh bg-background lg:flex items-center justify-center lg:p-4 overflow-x-hidden">
        <Card className="w-full lg:max-w-md overflow-hidden lg:shadow-2xl border-0 p-0 rounded-none lg:rounded-lg">
          {/* Photo header */}
          <div className="relative w-full bg-foreground/5 flex items-center justify-center">
            <img
              src={selectedActivity.image || "/placeholder.svg"}
              alt={selectedActivity.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <button
              onClick={() => setSelectedActivity(null)}
              aria-label="Retour à l'agenda"
              className="absolute top-3 left-3 flex items-center justify-center w-10 h-10 rounded-full bg-card/90 text-foreground shadow-lg hover:bg-card transition-colors active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${typeColors[selectedActivity.type]}`}
            >
              {selectedActivity.type}
            </span>
            {/* Date block */}
            <div className="absolute -bottom-6 left-5 flex flex-col items-center justify-center bg-primary rounded-xl w-16 h-16 shadow-lg">
              <span className="text-primary-foreground text-xl font-bold leading-none">
                {selectedActivity.day}
              </span>
              <span className="text-primary-foreground/80 text-[10px] uppercase mt-1">
                {selectedActivity.month}
              </span>
            </div>
          </div>

          <CardContent className="p-5 pt-9 space-y-5">
            <div>
              <h1 className="text-xl font-bold text-foreground leading-snug text-balance">
                {selectedActivity.title}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2 text-pretty">
                {selectedActivity.description}
              </p>
            </div>

            {/* Info rows */}
            <div className="space-y-3 rounded-xl border border-border p-4">
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Calendar className="w-5 h-5 text-primary shrink-0" />
                <span>{selectedActivity.day} {selectedActivity.month} 2026</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span>{selectedActivity.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>{selectedActivity.location}</span>
              </div>
              {selectedActivity.entry && (
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <Ticket className="w-5 h-5 text-primary shrink-0" />
                  <span>Entrée : {selectedActivity.entry}</span>
                </div>
              )}
            </div>

            {/* Reminder toggle */}
            <Button
              onClick={() => toggleReminder(selectedActivity.id)}
              className={`w-full h-14 text-base font-medium transition-all duration-200 active:scale-95 justify-center ${isReminderOn
                  ? "bg-foreground text-card hover:bg-foreground/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
            >
              {isReminderOn ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Rappel activé
                </>
              ) : (
                <>
                  <Bell className="w-5 h-5 mr-2" />
                  Activer un rappel
                </>
              )}
            </Button>
            {isReminderOn && (
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground -mt-2 text-center">
                <BellRing className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>
                  Rappel personnel activé{userName ? ` pour ${userName}` : ""} — vous serez notifié avant
                  «&nbsp;{selectedActivity.title}&nbsp;»
                </span>
              </p>
            )}

            {/* Back link */}
            <div className="pt-2 border-t border-border">
              <Button
                onClick={() => setSelectedActivity(null)}
                variant="outline"
                className="w-full h-12 text-sm font-medium border-2 border-foreground text-foreground hover:bg-foreground hover:text-card transition-all duration-200 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l&apos;agenda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
      <div className="min-h-dvh bg-background lg:flex items-center justify-center lg:p-4 overflow-x-hidden">
        <Card className="w-full lg:max-w-md overflow-hidden lg:shadow-2xl border-0 p-0 rounded-none lg:rounded-lg">
        {/* Header */}
        <div className="bg-primary p-6 flex flex-col items-center">
          <div className="flex items-center gap-2 text-primary-foreground/80 text-xs uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            Agenda du mois
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground text-center text-balance">
            Activités prévues
          </h1>
          {userName && (
            <p className="text-primary-foreground/80 text-sm mt-2 text-center">
              Bonjour, {userName}
            </p>
          )}
        </div>

        <CardContent className="p-5 space-y-5">
          {/* My reminders */}
          {reminderActivities.length > 0 && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <BellRing className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">
                  Mes rappels ({reminderActivities.length})
                </h2>
              </div>
              <div className="space-y-2">
                {reminderActivities.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity)}
                    className="w-full flex items-center gap-3 text-left rounded-lg bg-card p-2.5 border border-border hover:border-primary/40 transition-colors active:scale-[0.99]"
                  >
                    <div className="flex flex-col items-center justify-center bg-primary rounded-md w-10 h-10 shrink-0">
                      <span className="text-primary-foreground text-sm font-bold leading-none">
                        {activity.day}
                      </span>
                      <span className="text-primary-foreground/80 text-[8px] uppercase">
                        {activity.month}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                        <Clock className="w-3 h-3 text-primary" />
                        {activity.time}
                      </span>
                    </div>
                    <BellRing className="w-4 h-4 text-primary shrink-0" />
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-3 text-pretty">
                Ces rappels sont personnels{userName ? ` à ${userName}` : ""} et ne sont visibles que par vous.
              </p>
            </div>
          )}

          {/* Activities list */}
          <div className="space-y-4">
            {activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => setSelectedActivity(activity)}
                className="w-full text-left rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-colors active:scale-[0.99]"
              >
                {/* Photo */}
                <div className="relative h-36 w-full">
                  <img
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Date block overlay */}
                  <div className="absolute top-3 left-3 flex flex-col items-center justify-center bg-primary rounded-lg w-14 h-14 shadow-lg">
                    <span className="text-primary-foreground text-lg font-bold leading-none">
                      {activity.day}
                    </span>
                    <span className="text-primary-foreground/80 text-[10px] uppercase mt-1">
                      {activity.month}
                    </span>
                  </div>
                  {/* Type badge overlay */}
                  <span
                    className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-medium ${typeColors[activity.type]}`}
                  >
                    {activity.type}
                  </span>
                  {/* Reminder indicator */}
                  {reminders[activity.id] && (
                    <span className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium bg-card/90 text-primary shadow">
                      <BellRing className="w-3 h-3" />
                      Rappel
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-foreground leading-snug text-balance">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 text-pretty line-clamp-2">
                    {activity.description}
                  </p>
                  <div className="flex flex-col gap-1.5 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {activity.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {activity.location}
                    </span>
                    {activity.entry && (
                      <span className="flex items-center gap-1.5">
                        <Ticket className="w-3.5 h-3.5 text-primary" />
                        Entrée : {activity.entry}
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 mt-3 text-xs font-medium text-primary">
                    Voir le détail
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={onNavigateSocial}
              className="w-full h-14 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 active:scale-95 justify-between"
            >
              <span className="flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Réseaux sociaux
              </span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={onNavigateAbout}
              variant="outline"
              className="w-full h-14 text-base font-medium border-2 border-foreground text-foreground hover:bg-foreground hover:text-card transition-all duration-200 active:scale-95 justify-between"
            >
              <span className="flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Qui sommes-nous
              </span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-border">
            <p className="text-center text-xs text-muted-foreground">
              © 2026 Bureau Wallonie-Bruxelles
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
