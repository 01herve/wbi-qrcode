"use client"

import { useEffect, useState } from "react"
import { RegistrationForm } from "@/components/registration-form"
import ProfileCard from "@/components/profile-card"
import { addProfile } from "./actions/actions"

export type UserData = {
  fullName: string
  phoneNumber: string
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)

  // Charger au démarrage
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
        <ProfileCard userName={userData.fullName} />
      ) : (
        <RegistrationForm onSubmit={handleRegistration} />
      )}
    </main>
  )
}