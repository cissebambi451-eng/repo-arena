# Challenge Arena – Ma partie (Bambi)

## Ce que j'ai fait

Dans ce projet j'ai géré tout ce qui concerne les participants et le classement.

---

## Les fichiers que j'ai créés

### `data/participants.json`

C'est le fichier qui stocke tous les participants. Au départ je l'ai rempli avec 5 participants de base, chacun avec un id unique (un vrai UUID généré par node), un nom, ses points à 0 et un tableau vide pour les défis qu'il a complétés.

```json
{
  "id": "f66834f3-1e49-4493-8350-fba73bcf73c4",
  "name": "Alice",
  "points": 0,
  "completedChallenges": []
}
```

### `src/services/participantService.js`

C'est là que j'ai mis toute la logique. J'ai fait 3 fonctions :

**`getParticipants`** – elle lit le fichier participants.json et renvoie la liste. Si le fichier est vide ou pas un tableau elle renvoie une erreur 404.

**`createParticipant`** – elle prend un nom dans le body, vérifie qu'il est bien présent (error first), crée un nouvel objet participant avec un UUID généré automatiquement, l'ajoute dans le fichier et renvoie le participant créé avec un status 201.

**`getLeaderboard`** – elle lit tous les participants et les trie par points du plus grand au plus petit avec un `.sort()`. Comme ça on obtient direct le classement sans avoir à le calculer à la main.

### `src/controllers/participantController.js`

J'ai créé un controller pour chaque route. Le controller sert juste à faire le lien entre la route express et le service. Il appelle le service, récupère le `{ status, body }` que le service renvoie, et l'envoie au client. Tout est dans un try/catch pour gérer les erreurs serveur.

```js
export const createParticipantController = async (req, res) => {
  try {
    const result = await createParticipant(req.body ?? {});
    return res.status(result.status).json(result.body);
  } catch (_error) {
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
```

---

## Les routes que j'ai ajoutées dans `server.js`

| Méthode/Route /Ce que ça fait |
|--------|-------|----------------|
| GET | `/participants` | Récupère tous les participants |
| POST | `/participants` | Crée un nouveau participant |
| GET | `/leaderboard` | Renvoie les participants triés par points |

---

## Comment tester mes routes

**Voir tous les participants :**

curl http://localhost:3000/participants

**Créer un participant :**

 POST http://localhost:3000/participants \

**Voir le classement :**

curl http://localhost:3000/leaderboard


---

## Ce que j'ai compris en faisant ça

La logique error first c'est important – on vérifie d'abord que tout va bien avant de faire quoi que ce soit. Si le nom est pas là on renvoie direct une erreur 400 sans aller plus loin.

Le service ne touche jamais à `req` ou `res`, ça c'est le boulot du controller. Le service travaille juste avec des données et renvoie un objet `{ status, body }`. C'est cette séparation qui rend le code plus propre et plus facile à relire.
