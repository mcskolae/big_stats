# MyBigStats

Plateforme de statistiques sportives (Football, Basketball, MMA) développée en TypeScript vanilla.

## Fonctionnalités

- Page d'accueil avec les événements en cours
- Page dédiée par sport avec onglets (Stats / Historique / Athlètes)
- Recherche et filtrage d'athlètes (sport, position, nom)
- Comparateur entre deux athlètes avec visualisation graphique
- Notifications d'erreur (API indisponible, sports différents, etc.)

## Stack

- **TypeScript** — typage strict, utility types
- **Vite** — bundler
- **ESLint + typescript-eslint** — linter
- Architecture **DDD** (Domain / Application / Infrastructure)

## Installation

```bash
npm install
npm run prepare   # active le hook pre-commit
```

## Développement

```bash
npm run dev
npm run lint      # linter
npm run build     # build de production
```

## Contribution

Voir [CONTRIBUTING.md](./CONTRIBUTING.md).

## Code de conduite

Voir [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
