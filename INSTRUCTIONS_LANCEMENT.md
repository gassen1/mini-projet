# 🚀 Guide de Lancement du Projet Padel Reservation

Ce guide vous explique étape par étape comment configurer, lancer et vérifier le bon fonctionnement du projet (Backend Spring Boot + Frontend Angular) et la création de la base de données.

## 1. Prérequis
Assurez-vous que les serveurs de base de données sont démarrés (via WAMP ou MySQL Workbench).
- **Port visé** : 3306 (MySQL par défaut)
- **Base de données** : `padel_db` (sera créée automatiquement)

## 2. Configuration de la Base de Données 🔧
Le point le plus critique est la connexion à la base de données.
Le fichier de configuration se trouve ici :
`backend/src/main/resources/application.properties`

### Vérification du Mot de Passe
Par défaut, la configuration est :
```properties
spring.datasource.username=root
spring.datasource.password=
```
👉 **Si votre MySQL a un mot de passe** (ce qui semble être le cas d'après les erreurs `Access denied`), vous DEVEZ l'ajouter dans ce fichier après `spring.datasource.password=`.

Exemple si votre mot de passe est "root" :
`spring.datasource.password=root`

*Si vous utilisez WAMP sans mot de passe, laissez le champ vide.*

## 3. Lancement du Backend (Serveur API) 🐘
1. Ouvrez un terminal dans le dossier `backend`.
2. Lancez la commande suivante pour nettoyer et démarrer le serveur :
   ```bash
   mvn clean spring-boot:run
   ```
3. **Surveillez les logs**.
   - ✅ Si vous voyez `Started ReservationApplication in ...`, c'est gagné !
   - ❌ Si vous voyez `Access denied` ou `Communications link failure`, vérifiez à nouveau votre mot de passe ou le port (3306 vs 3307) dans `application.properties`.

**Vérification de la création de la BDD :**
Une fois le backend démarré avec succès, Spring Boot créera automatiquement la base `padel_db`. Vous pouvez retourner dans MySQL Workbench, faire un "Refresh" des schémas, et vous devriez voir `padel_db`.

## 4. Lancement du Frontend (Interface Web) 🅰️
1. Ouvrez un **nouveau** terminal dans le dossier `frontend`.
2. Installez les dépendances (si ce n'est pas déjà fait) :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   ng serve
   ```
4. Une fois compilé, ouvrez votre navigateur à l'adresse : [http://localhost:4200](http://localhost:4200)

## 5. Résumé des Ports
- **Frontend** : http://localhost:4200
- **Backend** : http://localhost:8081
- **Base de données** : localhost:3306 (user: root)

---
*En cas de problème persistant de connexion MySQL, essayez de changer le port dans `application.properties` de 3306 à 3307 si vous utilisez l'instance "MySQL80".*
