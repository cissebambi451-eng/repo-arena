import path from "node:path";

const ROOT = process.cwd();

const cleanEnv = (value, fallback) => {
  const text = String(value ?? "").trim();
  if (!text) return fallback;
  return text.replace(/^['"]|['"]$/g, "");
};

const dataDir = cleanEnv(process.env.NAME_DATA, "data");

export const participantsPath = path.join(ROOT, dataDir, "participants.json");
export const challengesPath = path.join(ROOT, dataDir, "challenges.json");
export const completionsPath = path.join(ROOT, dataDir, "completions.json");