# Frontend Angular - Système de Réservation de Terrains de Padel

Application Angular complète pour la gestion des réservations de terrains de padel.

## Fonctionnalités

### Pour les Utilisateurs (ADHERENT)
- ✅ Inscription et connexion
- ✅ Consultation du profil
- ✅ Modification du profil
- ✅ Consultation des terrains disponibles
- ✅ Création de réservations
- ✅ Sélection de créneaux multiples
- ✅ Application de codes promotionnels
- ✅ Consultation des réservations personnelles
- ✅ Annulation de réservations

### Pour les Administrateurs (ADMIN)
- ✅ Tableau de bord avec statistiques
- ✅ Gestion complète des terrains (CRUD)
- ✅ Gestion complète des créneaux (CRUD)
- ✅ Gestion complète des promotions (CRUD)
- ✅ Consultation de toutes les réservations
- ✅ Modification du statut des réservations
- ✅ Statistiques détaillées (revenus, réservations par statut, etc.)

## Installation

```bash
cd frontend
npm install
```

## Démarrage

```bash
npm start
```

L'application sera accessible sur http://localhost:4200

**Important**: Assurez-vous que le backend Spring Boot est démarré sur http://localhost:8081

## Structure du Projet

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Composants Angular
│   │   │   ├── login/            # Page de connexion
│   │   │   ├── register/         # Page d'inscription
│   │   │   ├── user-dashboard/   # Tableau de bord utilisateur
│   │   │   ├── profile/          # Profil utilisateur
│   │   │   ├── create-reservation/ # Création de réservation
│   │   │   ├── admin-dashboard/  # Tableau de bord admin
│   │   │   ├── terrain-management/ # Gestion terrains
│   │   │   ├── creneau-management/ # Gestion créneaux
│   │   │   ├── promotion-management/ # Gestion promotions
│   │   │   ├── admin-reservations/ # Liste réservations admin
│   │   │   └── navbar/           # Barre de navigation
│   │   ├── guards/               # Guards de routage
│   │   │   ├── auth.guard.ts    # Protection des routes
│   │   │   ├── jwt.interceptor.ts # Intercepteur JWT
│   │   │   └── error.interceptor.ts # Gestion des erreurs
│   │   ├── models/               # Modèles TypeScript
│   │   │   ├── user.model.ts
│   │   │   ├── terrain.model.ts
│   │   │   ├── creneau.model.ts
│   │   │   ├── promotion.model.ts
│   │   │   └── reservation.model.ts
│   │   ├── services/             # Services Angular
│   │   │   ├── auth.service.ts
│   │   │   ├── terrain.service.ts
│   │   │   ├── creneau.service.ts
│   │   │   ├── promotion.service.ts
│   │   │   ├── reservation.service.ts
│   │   │   ├── user.service.ts
│   │   │   └── statistics.service.ts
│   │   ├── app.component.ts      # Composant principal
│   │   └── app.routes.ts         # Configuration des routes
│   ├── environments/
│   │   └── environment.ts        # Configuration API
│   └── styles.css                # Styles globaux
```

## Configuration

L'URL de l'API backend est configurée dans `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api'
};
```

## Routes

- `/login` - Page de connexion
- `/register` - Page d'inscription
- `/dashboard` - Tableau de bord utilisateur (protégé)
- `/profile` - Profil utilisateur (protégé)
- `/reservations/new` - Créer une réservation (protégé)
- `/admin` - Tableau de bord admin (protégé, admin uniquement)
- `/admin/terrains` - Gestion des terrains (protégé, admin uniquement)
- `/admin/creneaux` - Gestion des créneaux (protégé, admin uniquement)
- `/admin/promotions` - Gestion des promotions (protégé, admin uniquement)
- `/admin/reservations` - Liste des réservations (protégé, admin uniquement)

## Authentification

L'application utilise JWT (JSON Web Tokens) pour l'authentification. Le token est stocké dans le localStorage et ajouté automatiquement à toutes les requêtes HTTP via l'intercepteur JWT.

## Build pour Production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`.
