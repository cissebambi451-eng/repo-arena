import express from "express";
import {
  participantsController,
  createParticipantController,
  leaderboardController
} from "./controllers/participantsController.js"; 

import {
  challengesController,
  createChallengeController,
  validateChallengeController
} from "./controllers/challengesController.js";

const app = express();

app.use(express.json());

// Participants
app.get("/participants", participantsController);
app.post("/participants", createParticipantController);

// Classement
app.get("/leaderboard", leaderboardController);

// Challenges
app.get("/challenges", challengesController);
app.post("/challenges", createChallengeController);
app.post("/challenges/:id/validate", validateChallengeController);

app.listen(3000, () => {
  console.log("Server listening on 3000");
});