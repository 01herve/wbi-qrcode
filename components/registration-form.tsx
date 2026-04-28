"use client"

import { useState } from "react"
import { User, Phone, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import Image from "next/image"

interface RegistrationFormProps {
    onSubmit: (data: { fullName: string; phoneNumber: string }) => void
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [errors, setErrors] = useState<{ fullName?: string; phoneNumber?: string }>({})

    const validateForm = () => {
        const newErrors: { fullName?: string; phoneNumber?: string } = {}

        if (!fullName.trim()) {
            newErrors.fullName = "Le nom complet est requis"
        } else if (fullName.trim().length < 3) {
            newErrors.fullName = "Le nom doit contenir au moins 3 caractères"
        }

        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = "Le numéro de téléphone est requis"
        } else if (!/^[+]?[\d\s-]{8,}$/.test(phoneNumber.trim())) {
            newErrors.phoneNumber = "Numéro de téléphone invalide"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit({ fullName: fullName.trim(), phoneNumber: phoneNumber.trim() })
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <Card className="w-full overflow-hidden shadow-2xl border-0">
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
                    <h1 className="text-xl font-bold text-primary-foreground text-center text-balance">
                        Bureau Wallonie-Bruxelles
                    </h1>
                    <p className="text-primary-foreground/80 text-sm mt-2 text-center">
                        Bienvenue
                    </p>
                </div>

                <CardContent className="p-6">
                    <div className="mb-6 text-center">
                        <h2 className="text-lg font-semibold text-foreground">
                            Identifiez-vous
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Veuillez remplir vos informations pour accéder au profil
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="fullName">Nom complet</FieldLabel>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="Entrez votre nom complet"
                                        value={fullName}
                                        onChange={(e) => {
                                            setFullName(e.target.value)
                                            if (errors.fullName) setErrors({ ...errors, fullName: undefined })
                                        }}
                                        className={`pl-10 h-12 ${errors.fullName ? "border-destructive" : ""}`}
                                    />
                                </div>
                                {errors.fullName && (
                                    <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="phoneNumber">Numéro de téléphone</FieldLabel>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="phoneNumber"
                                        type="tel"
                                        placeholder="+243 XXX XX XX XX"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value)
                                            if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined })
                                        }}
                                        className={`pl-10 h-12 ${errors.phoneNumber ? "border-destructive" : ""}`}
                                    />
                                </div>
                                {errors.phoneNumber && (
                                    <p className="text-sm text-destructive mt-1">{errors.phoneNumber}</p>
                                )}
                            </Field>
                        </FieldGroup>

                        <Button
                            type="submit"
                            className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 active:scale-95"
                        >
                            Continuer
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </form>

                    <div className="pt-6 border-t border-border mt-6">
                        <p className="text-center text-xs text-muted-foreground">
                            Vos informations restent confidentielles
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
