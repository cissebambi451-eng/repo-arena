import { readFile, writeFile } from "node:fs/promises";

import { participantsPath, challengesPath, completionsPath } from "../config/app.js";
//CA lit le ficier participants.json et aussi ca transforme le json en object//
export const readParticipants = async (encode = "utf-8") => {
  const data = await readFile(participantsPath, encode);
  return JSON.parse(data);
};
//ca lit les participants depuis le fichier participants.json//
export const writeParticipants = async (participants, encode = "utf-8") => {
  await writeFile(participantsPath, JSON.stringify(participants, null, 2), encode);
};
//CA lit le ficier CHallenges.json et aussi ca transforme le json en object//
export const readChallenges = async (encode = "utf-8") => {
  const data = await readFile(challengesPath, encode);
  return JSON.parse(data);
};

//ca lit les challenches depuis le fichier challenges.json//
export const writeChallenges = async (challenges, encode = "utf-8") => {
  await writeFile(challengesPath, JSON.stringify(challenges, null, 2), encode);
};
//LIT le fichier des bvalidations des validations de challenges
export const readCompletions = async (encode = "utf-8") => {
  try {
    const data = await readFile(completionsPath, encode);
    return JSON.parse(data);
  } catch (error) {//si le tabeau n'exixte pas ?REtourne un tableau vide
    if (error.code === "ENOENT") {
      return [];
    }//renvoie une erreur differente
    throw error;
  }
};
//sauvegarde les validations dans completions.json
export const writeCompletions = async (completions, encode = "utf-8") => {
  await writeFile(completionsPath, JSON.stringify(completions, null, 2), encode);
};