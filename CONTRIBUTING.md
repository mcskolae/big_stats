# Contribuer à MyBigStats

## Git Flow

Ce projet suit le **Git Flow** :

| Branche | Rôle |
|---|---|
| `main` | Code de production, protégée |
| `develop` | Intégration des features, protégée |
| `feature/<nom>` | Nouvelle fonctionnalité |
| `fix/<nom>` | Correction de bug |

## Workflow

1. Crée une issue décrivant le travail à faire
2. Crée une branche depuis `develop` : `git switch -c feature/ma-feature`
3. Développe et commits **signés** : `git commit -S -m "feat: ..."`
4. Ouvre une Pull Request vers `develop`
5. La PR doit passer le CI (lint) avant merge

## Convention de commits

Format : `<type>(<scope>): <description>`

Types : `feat`, `fix`, `refactor`, `chore`, `docs`

Exemple : `feat(athletes): add search handler`

## Linter

```bash
npm run lint       # vérification
npm run lint:fix   # correction automatique
```

Le hook pre-commit lance automatiquement le linter avant chaque commit.
