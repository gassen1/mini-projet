# ⚡ Commandes Rapides - Padel Reservation

## 🚀 Démarrage du Projet

### Terminal 1 - Backend
```bash
cd c:\Users\LENOVO\Desktop\mini-projet\backend
java -jar target/reservation-0.0.1-SNAPSHOT.jar
```

### Terminal 2 - Frontend
```bash
cd c:\Users\LENOVO\Desktop\mini-projet\frontend
ng serve
```

---

## 📊 URL de la Base de Données

### URL JDBC Complète
```
jdbc:mysql://127.0.0.1:3306/padel_db
```

### Connexion Simple
```
Host:     127.0.0.1
Port:     3306
Database: padel_db
Username: root
Password: root
```

---

## 👤 Compte Admin

```
Email:    admin@padel.com
Password: admin123
```

---

## 🌐 URLs de l'Application

```
Frontend: http://localhost:4200
Backend:  http://localhost:8081
Database: localhost:3306
```

---

## 🔧 Recompiler le Backend (si nécessaire)

```bash
cd c:\Users\LENOVO\Desktop\mini-projet\backend
mvn clean package -DskipTests
```

---

## 🛑 Arrêter les Services

Dans chaque terminal:
```
Ctrl + C
```

---

## ⚠️ Tuer un Port Bloqué

### Port 8081 (Backend)
```bash
netstat -ano | findstr :8081
taskkill /F /PID [NUMERO_PID]
```

### Port 4200 (Frontend)
```bash
netstat -ano | findstr :4200
taskkill /F /PID [NUMERO_PID]
```

---

## 📦 Réinstaller les Dépendances

### Frontend
```bash
cd c:\Users\LENOVO\Desktop\mini-projet\frontend
npm install
```

### Backend
```bash
cd c:\Users\LENOVO\Desktop\mini-projet\backend
mvn clean install -DskipTests
```
