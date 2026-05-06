import { createParticipant, getParticipants,getLeaderboard} from "../services/participantsService.js";
//controllers gere la recuperation d'un participants//
export const participantsController = async (_req, res) => {
  try {
    //ON APPELLE UN SERVICE POUR recuperer un participants 
    const result = await getParticipants();
    return res.status(result.status).json(result.body)
  } catch (_error) {
    return res.status(500).json({ error: "Erreur serveur" });
  }//ON Fait un try catch pour les cas d'exeption//
};
//meme logique mais pour la creation//
export const createParticipantController = async (req, res) => {
  try {
    const result = await createParticipant(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
export const leaderboardController = async (_req, res) => {
  try {
    const result = await getLeaderboard();
    return res.status(result.status).json(result.body);
  } catch (_error) {
    return res.status(500).json({ error: "Erreur serveur" });
  }
}//bambi//
