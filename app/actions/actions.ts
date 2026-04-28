"use server";

import { db } from "@/lib/db";
import { UserData } from "../page";

export async function addProfile(params: UserData) {
  const { fullName, phoneNumber } = params;

  // Vérifier si le numéro existe déjà
  const existingProfile = await db.profile.findFirst({
    where: {
      phoneNumber,
    },
  });

  // Si existe déjà, retourner ses infos sans enregistrer
  if (existingProfile) {
    return {
      exists: true,
      fullName: existingProfile.fullName,
      phoneNumber: existingProfile.phoneNumber,
    };
  }

  // Sinon créer nouveau profil
  const res = await db.profile.create({
    data: {
      fullName,
      phoneNumber,
    },
  });

  if (!res) {
    throw new Error("Impossible d'ajouter le profil. Veuillez réessayer.");
  }

  return {
    exists: false,
    fullName: res.fullName,
    phoneNumber: res.phoneNumber,
  };
}