# 📦 Installation des Prérequis

## ✅ Checklist des Prérequis

Avant de démarrer le projet, vous devez installer :

- [ ] **Java JDK 17+** (pour le backend Spring Boot)
- [ ] **Apache Maven** (pour compiler le backend)
- [ ] **MySQL** (base de données)
- [ ] **Node.js 18+** (pour le frontend Angular)

## 1️⃣ Installation de Java JDK

### Option A : Téléchargement Direct (Recommandé)

1. **Téléchargez Java JDK 17** :
   - Oracle JDK : https://www.oracle.com/java/technologies/downloads/#java17
   - OpenJDK (gratuit) : https://adoptium.net/temurin/releases/?version=17
   - **Recommandé** : Adoptium OpenJDK 17 (gratuit et open source)

2. **Installez Java** :
   - Exécutez le fichier téléchargé (.msi pour Windows)
   - Suivez l'assistant d'installation
   - **Important** : Notez le chemin d'installation (par défaut : `C:\Program Files\Java\jdk-17`)

3. **Configurez les Variables d'Environnement** :
   - Ouvrez "Variables d'environnement" dans Windows
   - Ajoutez `JAVA_HOME` = `C:\Program Files\Java\jdk-17` (ou votre chemin)
   - Ajoutez au PATH : `%JAVA_HOME%\bin`

4. **Vérifiez l'installation** :
   ```bash
   java -version
   ```
   Doit afficher : `openjdk version "17.x.x"` ou similaire

### Option B : Via Chocolatey
```powershell
choco install openjdk17
```

### Option C : Via Winget
```powershell
winget install Microsoft.OpenJDK.17
```

## 2️⃣ Installation d'Apache Maven

### Option A : Téléchargement Direct

1. **Téléchargez Maven** :
   - https://maven.apache.org/download.cgi
   - Téléchargez le fichier `apache-maven-3.9.x-bin.zip`

2. **Extrayez Maven** :
   - Extrayez dans `C:\Program Files\Apache\maven` (ou autre emplacement)

3. **Configurez les Variables d'Environnement** :
   - Ajoutez `MAVEN_HOME` = `C:\Program Files\Apache\maven`
   - Ajoutez au PATH : `%MAVEN_HOME%\bin`

4. **Vérifiez l'installation** :
   ```bash
   mvn --version
   ```
   Doit afficher la version de Maven

### Option B : Via Chocolatey
```powershell
choco install maven
```

## 3️⃣ Installation de MySQL

### Option A : MySQL Installer (Recommandé)

1. **Téléchargez MySQL** :
   - https://dev.mysql.com/downloads/installer/
   - Téléchargez "MySQL Installer for Windows"

2. **Installez MySQL** :
   - Exécutez l'installer
   - Choisissez "Developer Default"
   - Configurez le mot de passe root (notez-le !)
   - Port par défaut : 3306

3. **Vérifiez l'installation** :
   ```bash
   mysql --version
   ```
   Ou vérifiez dans les Services Windows que MySQL est démarré

### Option B : Via Chocolatey
```powershell
choco install mysql
```

### Configuration MySQL pour le Projet

Le backend utilise ces paramètres (dans `application.properties`) :
- **Host** : localhost:3306
- **Database** : padel_db (sera créée automatiquement)
- **Username** : root
- **Password** : root

Si vos identifiants sont différents, modifiez `backend/src/main/resources/application.properties`

## 4️⃣ Installation de Node.js

1. **Téléchargez Node.js** :
   - https://nodejs.org/
   - Téléchargez la version **LTS** (18.x ou supérieur)

2. **Installez Node.js** :
   - Exécutez le fichier téléchargé (.msi)
   - Suivez l'assistant d'installation
   - Cochez "Add to PATH" si proposé

3. **Vérifiez l'installation** :
   ```bash
   node --version
   npm --version
   ```

## 🔄 Redémarrer le Terminal

**Important** : Après avoir installé Java, Maven ou Node.js, **fermez et rouvrez** votre terminal PowerShell/CMD pour que les changements de PATH soient pris en compte.

## ✅ Vérification Complète

Exécutez ces commandes pour vérifier que tout est installé :

```bash
# Java
java -version
javac -version

# Maven
mvn --version

# MySQL
mysql --version
# Ou vérifiez dans les Services Windows

# Node.js
node --version
npm --version
```

## 🚀 Après Installation

Une fois tous les prérequis installés :

1. **Redémarrez votre terminal**
2. **Démarrez MySQL** (si pas en service automatique)
3. **Démarrez les projets** :
   ```bash
   .\start-all.bat
   ```

## 🆘 Problèmes Courants

### "java n'est pas reconnu"
- Vérifiez que JAVA_HOME est défini
- Vérifiez que %JAVA_HOME%\bin est dans le PATH
- Redémarrez le terminal

### "mvn n'est pas reconnu"
- Vérifiez que MAVEN_HOME est défini
- Vérifiez que %MAVEN_HOME%\bin est dans le PATH
- Redémarrez le terminal

### "mysql n'est pas reconnu"
- MySQL peut être installé mais pas dans le PATH
- Utilisez le MySQL Workbench ou vérifiez les Services Windows
- Le backend se connectera automatiquement si MySQL est démarré

### "node n'est pas reconnu"
- Redémarrez le terminal après l'installation
- Vérifiez que Node.js est dans le PATH système

## 📚 Ressources

- **Java** : https://adoptium.net/
- **Maven** : https://maven.apache.org/
- **MySQL** : https://dev.mysql.com/downloads/
- **Node.js** : https://nodejs.org/
