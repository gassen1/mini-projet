# 🚀 Guide de Démarrage Rapide - Padel Reservation System

## 📊 URL de la Base de Données

### URL Complète JDBC
```
jdbc:mysql://127.0.0.1:3306/padel_db?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
```

### Paramètres de Connexion
```
Host:     127.0.0.1
Port:     3306
Database: padel_db
Username: root
Password: root
```

### Connexion via MySQL Workbench
```
1. Ouvrir MySQL Workbench
2. Nouvelle connexion:
   - Hostname: 127.0.0.1
   - Port: 3306
   - Username: root
   - Password: root
3. La base 'padel_db' sera créée automatiquement
```

---

## 🔧 Commandes pour Lancer le Projet

### Méthode 1: Démarrage Rapide (Recommandée)

#### 1️⃣ Démarrer le Backend
```bash
# Ouvrir un terminal dans le dossier backend
cd c:\Users\LENOVO\Desktop\mini-projet\backend

# Compiler le projet (première fois seulement)
mvn package -DskipTests

# Lancer le backend
java -jar target/reservation-0.0.1-SNAPSHOT.jar
```

#### 2️⃣ Démarrer le Frontend
```bash
# Ouvrir un NOUVEAU terminal dans le dossier frontend
cd c:\Users\LENOVO\Desktop\mini-projet\frontend

# Lancer le frontend
ng serve
```

---

### Méthode 2: Avec Maven (Alternative)

#### Backend
```bash
cd c:\Users\LENOVO\Desktop\mini-projet\backend

# Option 1: Nettoyer et compiler
mvn clean package -DskipTests

# Option 2: Lancer directement (peut échouer parfois)
mvn spring-boot:run
```

#### Frontend
```bash
cd c:\Users\LENOVO\Desktop\mini-projet\frontend

# Installer les dépendances (première fois seulement)
npm install

# Lancer le serveur de développement
ng serve
```

---

## 🌐 URLs de l'Application

Une fois les deux services démarrés:

- **Frontend (Interface Web)**: http://localhost:4200
- **Backend (API REST)**: http://localhost:8081
- **Base de Données MySQL**: localhost:3306

---

## 👤 Compte Administrateur

```
Email:        admin@padel.com
Mot de passe: admin123
Rôle:         ADMIN
```

---

## ⚠️ Résolution de Problèmes

### Problème: Port 8081 déjà utilisé
```bash
# Trouver le processus qui utilise le port
netstat -ano | findstr :8081

# Tuer le processus (remplacer PID par le numéro trouvé)
taskkill /F /PID [PID]

# Relancer le backend
java -jar target/reservation-0.0.1-SNAPSHOT.jar
```

### Problème: Port 4200 déjà utilisé
```bash
# Trouver le processus
netstat -ano | findstr :4200

# Tuer le processus
taskkill /F /PID [PID]

# Relancer le frontend
ng serve
```

### Problème: MySQL n'est pas démarré
```
1. Ouvrir WAMP ou MySQL Workbench
2. Démarrer le service MySQL
3. Vérifier que le port 3306 est accessible
4. Relancer le backend
```

### Problème: Erreur de compilation Maven
```bash
# Nettoyer complètement le projet
mvn clean

# Recompiler
mvn package -DskipTests

# Si ça échoue encore, utiliser directement le JAR
java -jar target/reservation-0.0.1-SNAPSHOT.jar
```

---

## 📝 Ordre de Démarrage Recommandé

```
1. ✅ Démarrer MySQL (WAMP/MySQL Workbench)
2. ✅ Démarrer le Backend (port 8081)
3. ✅ Démarrer le Frontend (port 4200)
4. ✅ Ouvrir le navigateur sur http://localhost:4200
```

---

## 🔄 Arrêter les Services

### Arrêter le Backend
```
Dans le terminal du backend:
Ctrl + C
```

### Arrêter le Frontend
```
Dans le terminal du frontend:
Ctrl + C
```

---

## 📦 Commandes Utiles

### Vérifier si les services sont en cours d'exécution
```bash
# Vérifier le backend
curl http://localhost:8081

# Vérifier le frontend
curl http://localhost:4200
```

### Vérifier les ports utilisés
```bash
# Voir tous les ports en écoute
netstat -ano | findstr LISTENING

# Voir un port spécifique
netstat -ano | findstr :8081
netstat -ano | findstr :4200
netstat -ano | findstr :3306
```

### Recompiler le Backend
```bash
cd c:\Users\LENOVO\Desktop\mini-projet\backend
mvn clean package -DskipTests
```

### Réinstaller les dépendances Frontend
```bash
cd c:\Users\LENOVO\Desktop\mini-projet\frontend
npm install
```

---

## 🎯 Commandes en Une Ligne

### Démarrage Complet (PowerShell)
```powershell
# Terminal 1 - Backend
cd c:\Users\LENOVO\Desktop\mini-projet\backend ; java -jar target/reservation-0.0.1-SNAPSHOT.jar

# Terminal 2 - Frontend
cd c:\Users\LENOVO\Desktop\mini-projet\frontend ; ng serve
```

---

## 📧 Configuration Email (Mailtrap)

Les emails sont capturés par Mailtrap (pas d'envoi réel):
```
Host:     sandbox.smtp.mailtrap.io
Port:     2525
Username: 5c1f6b15e4a8dc
Password: 9ed547f8ddc641
```

---

## ✅ Vérification du Démarrage Réussi

### Backend Démarré ✓
```
Vous devriez voir dans le terminal:
"Started ReservationApplication in X.XXX seconds"
```

### Frontend Démarré ✓
```
Vous devriez voir dans le terminal:
"Application bundle generation complete"
"➜  Local:   http://localhost:4200/"
```

### Base de Données Connectée ✓
```
Dans les logs du backend:
"HikariPool-1 - Start completed"
```

---

**Date**: 2026-02-03  
**Version**: 1.0  
**Projet**: Padel Reservation System
