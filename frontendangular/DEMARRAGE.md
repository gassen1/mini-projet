# Guide de Démarrage - Frontend Angular

## Prérequis

Avant de démarrer le projet, assurez-vous d'avoir installé :

1. **Node.js** (version 18 ou supérieure)
   - Télécharger depuis : https://nodejs.org/
   - Vérifier l'installation : `node --version`
   - Vérifier npm : `npm --version`

2. **Backend Spring Boot** démarré sur le port 8081

## Installation des Dépendances

```bash
cd frontend
npm install
```

## Démarrage du Serveur de Développement

```bash
npm start
```

ou

```bash
ng serve
```

L'application sera accessible sur : **http://localhost:4200**

## Vérification

1. Ouvrez votre navigateur sur http://localhost:4200
2. Vous devriez voir la page de connexion
3. Pour tester :
   - Créez un compte utilisateur via "Inscription"
   - Ou connectez-vous si vous avez déjà un compte

## Comptes de Test

Si le backend a des données initialisées, vous pouvez utiliser :
- **Admin** : email/password configurés dans le backend
- **Utilisateur** : créez un compte via l'interface d'inscription

## Structure des Routes

- `/login` - Connexion
- `/register` - Inscription
- `/dashboard` - Tableau de bord utilisateur
- `/profile` - Profil utilisateur
- `/reservations/new` - Créer une réservation
- `/admin` - Tableau de bord administrateur
- `/admin/terrains` - Gestion des terrains
- `/admin/creneaux` - Gestion des créneaux
- `/admin/promotions` - Gestion des promotions
- `/admin/reservations` - Liste des réservations

## Dépannage

### Erreur : "npm n'est pas reconnu"
- Installez Node.js depuis https://nodejs.org/
- Redémarrez votre terminal après l'installation

### Erreur : "Port 4200 déjà utilisé"
- Changez le port : `ng serve --port 4201`
- Ou arrêtez l'autre processus utilisant le port 4200

### Erreur de connexion au backend
- Vérifiez que le backend Spring Boot est démarré sur le port 8081
- Vérifiez l'URL dans `src/environments/environment.ts`

### Erreurs de compilation TypeScript
- Supprimez `node_modules` et `package-lock.json`
- Réinstallez : `npm install`

## Build pour Production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/padel-reservation-frontend/`
