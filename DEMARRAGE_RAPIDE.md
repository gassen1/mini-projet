# 🚀 Guide de Démarrage Rapide

## Démarrage Automatique (Recommandé)

### Option 1 : Démarrer les deux projets ensemble
```bash
.\start-all.bat
```

Ce script démarre automatiquement :
- ✅ Backend Spring Boot sur le port **8081**
- ✅ Frontend Angular sur le port **4200**

### Option 2 : Démarrer séparément

**Backend uniquement :**
```bash
.\start-backend.bat
```

**Frontend uniquement :**
```bash
.\start-frontend.bat
```

## ⏱️ Temps de Démarrage

- **Backend** : 30-60 secondes (compilation Maven + démarrage Spring Boot)
- **Frontend** : 1-2 minutes (compilation Angular)

## 🌐 URLs d'Accès

Une fois démarrés :

- **Frontend Angular** : http://localhost:4200
- **Backend API** : http://localhost:8081/api
- **Backend Health Check** : http://localhost:8081/actuator/health (si configuré)

## ✅ Vérification

### Backend démarré correctement si vous voyez :
```
Started ReservationApplication in X.XXX seconds
```

### Frontend démarré correctement si vous voyez :
```
✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4200 **
```

## 🔧 Prérequis

### Backend
- ✅ Java JDK 17 ou supérieur
- ✅ Apache Maven
- ✅ MySQL démarré et accessible
- ✅ Base de données `padel_db` créée (ou sera créée automatiquement)

### Frontend
- ✅ Node.js 18 ou supérieur
- ✅ npm (inclus avec Node.js)

## 📋 Vérification des Prérequis

### Vérifier Java
```bash
java -version
```
Doit afficher : `openjdk version "17.x.x"` ou supérieur

### Vérifier Maven
```bash
mvn --version
```
Doit afficher : `Apache Maven 3.x.x`

### Vérifier Node.js
```bash
node --version
npm --version
```
Doit afficher les versions de Node.js et npm

### Vérifier MySQL
```bash
mysql --version
```
Ou vérifiez que le service MySQL est démarré dans les services Windows

## 🐛 Dépannage

### Backend ne démarre pas

1. **Erreur de connexion MySQL**
   - Vérifiez que MySQL est démarré
   - Vérifiez les identifiants dans `backend/src/main/resources/application.properties`
   - Vérifiez que le port 3306 est accessible

2. **Port 8081 déjà utilisé**
   - Arrêtez l'autre application utilisant le port 8081
   - Ou changez le port dans `application.properties` : `server.port=8082`

3. **Erreur de compilation Maven**
   - Vérifiez que Java 17+ est installé
   - Exécutez : `mvn clean install` dans le dossier backend

### Frontend ne démarre pas

1. **Port 4200 déjà utilisé**
   - Arrêtez l'autre application Angular
   - Ou changez le port : `npm start -- --port 4201`

2. **Erreur npm install**
   - Supprimez `node_modules` et `package-lock.json`
   - Réexécutez : `npm install`

3. **Erreur de compilation TypeScript**
   - Vérifiez que Node.js 18+ est installé
   - Vérifiez les erreurs dans la console

### Erreur CORS

Si vous voyez des erreurs CORS dans la console du navigateur :
- Vérifiez que le backend est démarré sur le port 8081
- Vérifiez la configuration CORS dans `SecurityConfiguration.java`
- Le backend doit autoriser `http://localhost:4200`

## 📱 Première Utilisation

1. Ouvrez http://localhost:4200 dans votre navigateur
2. Cliquez sur "Inscription" pour créer un compte
3. Connectez-vous avec vos identifiants
4. Explorez les fonctionnalités !

## 🛑 Arrêter les Serveurs

- **Backend** : Appuyez sur `Ctrl+C` dans la fenêtre du backend
- **Frontend** : Appuyez sur `Ctrl+C` dans la fenêtre du frontend

## 📝 Notes Importantes

- Le backend doit démarrer **avant** le frontend pour éviter les erreurs de connexion
- MySQL doit être démarré avant le backend
- Les deux serveurs doivent rester ouverts pendant l'utilisation de l'application
