import { getChallenges, createChallenge, validateChallenge } from "../services/challengesService.js";

// Le controller gère la récupération de tous les défis
export const challengesController = async (_req, res) => {
  try {
    // ON APPELLE LE SERVICE pour récupérer tous les défis
    const result = await getChallenges();
    // ON RETOURNE le résultat avec le bon status HTTP et le body
    return res.status(result.status).json(result.body);
  } catch (_error) {
    // SI une erreur inattendue arrive, on retourne une erreur 500
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

// Le controller gère la création d'un nouveau défi
export const createChallengeController = async (req, res) => {
  try {
    // ON RÉCUPÈRE les données envoyées dans le body de la requête (title, difficulty, points)
    const result = await createChallenge(req.body);
    // ON RETOURNE le nouveau défi créé avec le bon status
    return res.status(result.status).json(result.body);
  } catch (_error) {
    // SI une erreur inattendue arrive, on retourne une erreur 500
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

// Le controller gère la validation d'un défi pour un participant
export const validateChallengeController = async (req, res) => {
  try {
    // L'id du défi vient de l'URL (:id)
    // Le participantId vient du body de la requête
    const result = await validateChallenge({
      challengeId: req.params.id,
      participantId: req.body.participantId
    });
    // ON RETOURNE la validation avec le bon status
    return res.status(result.status).json(result.body);
  } catch (_error) {
    // SI une erreur inattendue arrive, on retourne une erreur 500
    return res.status(500).json({ error: "Erreur serveur" });
  }
};