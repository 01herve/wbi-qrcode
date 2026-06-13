"use client"

// import { useEffect, useState } from "react"
// import { RegistrationForm } from "@/components/registration-form"
// import ProfileCard from "@/components/profile-card"
// import { addProfile } from "./actions/actions"

// export type UserData = {
//   fullName: string
//   phoneNumber: string
// }

// type View = "register" | "agenda" | "social" | "about"

// export default function Home() {
//   const [userData, setUserData] = useState<UserData | null>(null)
//   const [view, setView] = useState<View>("register")

//   // Charger au démarrage
//   useEffect(() => {
//     const savedUser = localStorage.getItem("userData")

//     if (savedUser) {
//       setUserData(JSON.parse(savedUser))
//     }
//   }, [])

//   const handleRegistration = (data: UserData) => {
//     setView("agenda")
//     addProfile(data)
//       .then((res) => {
//         setUserData(res)

//         localStorage.setItem("userData", JSON.stringify(res))
//       })
//       .catch((err) => {
//         console.error("Erreur lors de l'ajout du contact :", err)

//         alert(
//           "Une erreur est survenue. Veuillez réessayer ou contactez-nous au numéro +243828858300"
//         )
//       })
//   }

//   return (
//     <main>
//       {userData ? (
//         <ProfileCard userName={userData.fullName} />
//       ) : (
//         <RegistrationForm onSubmit={handleRegistration} />
//       )}
//     </main>
//   )
// }


import { useEffect, useState } from "react"
import { RegistrationForm } from "@/components/registration-form"
import { AgendaPage } from "@/components/agenda-page"
import ProfileCard from "@/components/profile-card"
import { AboutPage } from "@/components/about-page"
import { addProfile } from "./actions/actions"

export interface UserData {
  fullName: string
  phoneNumber: string
}

type View = "register" | "agenda" | "social" | "about"

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [view, setView] = useState<View>("register")

  //   // Charger au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem("userData")

    if (savedUser) {
      setUserData(JSON.parse(savedUser))
    }
  }, [])

  const handleRegistration = (data: UserData) => {
    addProfile(data)
      .then((res) => {
        setUserData(res)
        localStorage.setItem("userData", JSON.stringify(res))
        setView("agenda")
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout du contact :", err)
        alert(
          "Une erreur est survenue. Veuillez réessayer ou contactez-nous au numéro +243828858300"
        )
      })
  }

  return (
    <main>
      {userData ? (
        <>
          {view === "agenda" && (
            <AgendaPage
              userName={userData?.fullName}
              userKey={userData?.phoneNumber}
              onNavigateSocial={() => setView("social")}
              onNavigateAbout={() => setView("about")}
            />
          )}

          {view === "social" && (
            <ProfileCard userName={userData?.fullName} onBack={() => setView("agenda")} />
            // <ProfileCard userName={userData?.fullName} />
          )}

          {view === "about" && <AboutPage onBack={() => setView("agenda")} />}
        </>
      ) : (
        <RegistrationForm onSubmit={handleRegistration} />
      )}
    </main>

  )
}
