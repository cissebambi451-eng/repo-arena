import crypto from "node:crypto";
// ON IMPORTE toutes les fonctions de lecture et écriture des fichiers JSON
import { readChallenges, writeChallenges, readCompletions, writeCompletions, readParticipants, writeParticipants } from "./fileService.js";

// Récupérer tous les défis
export const getChallenges = async () => {
  // ON LIT le fichier challenges.json et on le transforme en objet
  const challenges = await readChallenges();

  // ON VÉRIFIE que le tableau existe et qu'il n'est pas vide
  if (!Array.isArray(challenges) || challenges.length === 0) {
    return { status: 404, body: { error: "challenges not found" } };
  }

  return { status: 200, body: challenges };
};

// Créer un nouveau défi
export const createChallenge = async ({ title, difficulty, points }) => {
  // ON LIT le fichier challenges.json pour avoir la liste actuelle
  const challenges = await readChallenges();

  // error first : ON VÉRIFIE que le format des données est valide
  if (!Array.isArray(challenges)) {
    return { status: 500, body: { error: "Format de données invalide" } };
  }

  // error first : ON VÉRIFIE que les 3 champs obligatoires sont présents
  if (!title || !difficulty || !points) {
    return { status: 400, body: { error: "Les champs title, difficulty et points sont requis" } };
  }

  
  // ON CRÉE le nouvel objet défi avec un id unique
  const newChallenge = {
    id: crypto.randomUUID(), // génère un id unique
    title,
    difficulty,
    points,
    createdAt: new Date().toISOString() // date de création
  };

  // ON AJOUTE le nouveau défi dans le tableau
  challenges.push(newChallenge);
  // ON SAUVEGARDE dans le fichier challenges.json
  await writeChallenges(challenges);

  // ON RETOURNE le nouveau défi avec un status 201 (créé)
  return { status: 201, body: newChallenge };
};

// Valider un défi pour un participant (ajout des points)
export const validateChallenge = async ({ participantId, challengeId }) => {
  // ON LIT les 3 fichiers JSON dont on a besoin
  const participants = await readParticipants();
  const challenges = await readChallenges();
  const completions = await readCompletions();

  // error first : ON VÉRIFIE que les 2 champs obligatoires sont présents
  if (!participantId || !challengeId) {
    return { status: 400, body: { error: "Les champs participantId et challengeId sont requis" } };
  }

  // ON VÉRIFIE que le participant existe dans la liste
  const participant = participants.find((p) => p.id === participantId);
  if (!participant) {
    return { status: 404, body: { error: "Participant non trouvé" } };
  }

  // ON VÉRIFIE que le défi existe dans la liste
  const challenge = challenges.find((c) => c.id === challengeId);
  if (!challenge) {
    return { status: 404, body: { error: "Défi non trouvé" } };
  }

  // ON VÉRIFIE que le participant n'a pas déjà validé ce défi
  const alreadyDone = completions.find(
    (c) => c.participantId === participantId && c.challengeId === challengeId
  );
  if (alreadyDone) {
    return { status: 400, body: { error: "Ce défi a déjà été validé par ce participant" } };
  }

  // ON CRÉE la nouvelle validation avec un id unique
  const newCompletion = {
    id: crypto.randomUUID(),
    participantId,
    challengeId,
    points: challenge.points, // ON RÉCUPÈRE les points du défi
    completedAt: new Date().toISOString()
  };

  // ON AJOUTE la validation dans le tableau
  completions.push(newCompletion);
  // ON SAUVEGARDE dans le fichier completions.json
  await writeCompletions(completions);

  // ON AJOUTE les points au participant (s'il n'a pas encore de points, on part de 0)
  participant.points = (participant.points || 0) + challenge.points;
  // ON SAUVEGARDE le participant mis à jour dans participants.json
  await writeParticipants(participants);

  return { status: 201, body: newCompletion };
};