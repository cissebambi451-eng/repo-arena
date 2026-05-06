# Challenge Arena API

## Lancer le projet

```bash
npm install
npm run dev
```

Le serveur tourne sur **http://localhost:3000**

## Les routes

- GET /challenges
- POST /challenges
- POST /challenges/:id/validate

## Créer un défi

```json
{
  "title": "Hello World",
  "difficulty": "easy",
  "points": 10
}
```