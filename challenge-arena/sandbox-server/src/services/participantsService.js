import crypto from "node:crypto";
import { readParticipants, writeParticipants } from "./fileService.js";

// single responsability 
export const getParticipants = async () => {
  const participants = await readParticipants();
// ON VERIFIE que le tableau participants existe et qu'il est pas vide/
  if (!Array.isArray(participants) || participants.length === 0) {
    return { status: 404, body: { error: "participants not found" } };
  }

  return { status: 200, body: participants };
};

export const createParticipant = async ({ name }) => {
  const participants = await readParticipants(); // un service peut utiliser un autre service //

  // error first 
  if (!Array.isArray(participants)) {
    return { status: 500, body: { response: "Format de données invalide" } };
  }

  // error first//rendre le champs name obligatoire//bambi 
  if (!name) {
    return { status: 400, body: { response: "Le champ name est requis" } };
  }
//le champs pour le nouveau participants//bambi
  const newParticipants = {
    id: crypto.randomUUID(),
    name,
    createdAt: new Date().toISOString()
  };
//On fait un push pour ajouter le nouveau participanst//bambi
  participants.push(newParticipants);
  await writeParticipants(participants); // on utilise un autre service //ON Sauvegarde

  return { status: 201, body: newParticipants};//et on retourne un 201 et le nouveau participants
};

  // Ajouter a ton fichier 
export const getLeaderboard = async () => {
  const participants = await readParticipants();

  if (!Array.isArray(participants) || participants.length === 0) {
    return { status: 404, body: { error: "Aucun participant trouvé" } };
  }

  // Trie par points du plus grand au plus petit
  const sorted = [...participants].sort((a, b) => (b.points || 0) - (a.points || 0));

  return { status: 200, body: sorted };
};
