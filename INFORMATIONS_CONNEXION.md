# 🔐 Informations de Connexion - Padel Reservation System

## 📊 Base de Données MySQL

### URL de Connexion
```
jdbc:mysql://127.0.0.1:3306/padel_db?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
```

### Paramètres de Connexion
- **Host**: 127.0.0.1 (localhost)
- **Port**: 3306
- **Database**: padel_db
- **Username**: root
- **Password**: root

### Accès via MySQL Workbench
1. Ouvrez MySQL Workbench
2. Créez une nouvelle connexion avec les paramètres suivants:
   - Connection Name: Padel DB
   - Hostname: 127.0.0.1
   - Port: 3306
   - Username: root
   - Password: root
3. Cliquez sur "Test Connection" puis "OK"
4. La base de données `padel_db` sera créée automatiquement au premier démarrage du backend

---

## 👤 Compte Administrateur

### Identifiants Admin
- **Email**: admin@padel.com
- **Mot de passe**: admin123
- **Rôle**: ADMIN

### Accès à l'Application
1. Ouvrez votre navigateur
2. Allez sur: http://localhost:4200
3. Cliquez sur "Login"
4. Entrez les identifiants ci-dessus
5. Vous aurez accès à toutes les fonctionnalités administrateur

### Fonctionnalités Admin
Avec le compte admin, vous pouvez:
- ✅ Gérer les terrains (créer, modifier, supprimer)
- ✅ Gérer les créneaux horaires
- ✅ Voir toutes les réservations
- ✅ Gérer les promotions
- ✅ Voir les statistiques
- ✅ Gérer tous les utilisateurs

---

## 🆕 Inscription d'un Nouvel Utilisateur

### Processus d'Inscription
1. Allez sur http://localhost:4200
2. Cliquez sur "Register" ou "Join the Padel Community"
3. Remplissez tous les champs:
   - First Name (Prénom)
   - Last Name (Nom)
   - Email
   - Phone Number (Téléphone)
   - Password (Mot de passe)
4. Cliquez sur "REGISTER NOW"
5. **Après une inscription réussie**, vous verrez:
   - ✅ Une icône de succès (check vert)
   - ✅ Le message "Registration Successful!"
   - ✅ Un bouton "GO TO LOGIN" pour vous connecter

### Note Importante
Le problème de chargement infini après l'inscription a été corrigé. Maintenant:
- Le spinner de chargement s'arrête automatiquement
- Un message de succès s'affiche clairement
- Les erreurs sont affichées avec des messages précis

---

## 🌐 URLs de l'Application

- **Frontend (Interface Web)**: http://localhost:4200
- **Backend (API)**: http://localhost:8081
- **Base de Données**: localhost:3306

---

## 📧 Configuration Email (Mailtrap)

L'application utilise Mailtrap pour les emails de test:
- **Host**: sandbox.smtp.mailtrap.io
- **Port**: 2525
- **Username**: 5c1f6b15e4a8dc
- **Password**: 9ed547f8ddc641

Les emails ne sont pas réellement envoyés, ils sont capturés par Mailtrap pour les tests.

---

## 🔧 Dépannage

### Si l'inscription ne fonctionne pas:
1. Vérifiez que le backend est bien démarré (http://localhost:8081)
2. Vérifiez que le frontend est bien démarré (http://localhost:4200)
3. Ouvrez la console du navigateur (F12) pour voir les erreurs
4. Vérifiez que MySQL est bien démarré

### Si vous ne voyez pas le message de succès:
1. Actualisez la page (F5)
2. Vérifiez la console du navigateur pour les erreurs
3. Le code a été mis à jour pour garantir l'affichage du message de succès

---

**Date de création**: 2026-02-03
**Version**: 1.0
