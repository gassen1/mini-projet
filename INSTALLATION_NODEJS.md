# Installation de Node.js - Guide Rapide

## Pourquoi installer Node.js ?

Node.js est nécessaire pour :
- Installer les dépendances du projet Angular (`npm install`)
- Démarrer le serveur de développement Angular (`npm start`)
- Compiler le projet Angular pour la production

## Installation

### Option 1 : Téléchargement Direct (Recommandé)

1. **Téléchargez Node.js** :
   - Allez sur https://nodejs.org/
   - Téléchargez la version **LTS** (Long Term Support)
   - Version recommandée : Node.js 18.x ou supérieur

2. **Installez Node.js** :
   - Exécutez le fichier téléchargé (.msi pour Windows)
   - Suivez l'assistant d'installation
   - **Important** : Cochez l'option "Add to PATH" si proposée

3. **Vérifiez l'installation** :
   - Ouvrez un nouveau terminal PowerShell ou CMD
   - Tapez : `node --version`
   - Tapez : `npm --version`
   - Les deux commandes doivent afficher des numéros de version

### Option 2 : Via Chocolatey (si installé)

```powershell
choco install nodejs-lts
```

### Option 3 : Via Winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

## Après l'installation

1. **Fermez et rouvrez votre terminal** pour que les changements de PATH soient pris en compte

2. **Vérifiez l'installation** :
   ```powershell
   node --version
   npm --version
   ```

3. **Installez les dépendances du projet** :
   ```powershell
   cd frontend
   npm install
   ```

4. **Démarrez le projet** :
   ```powershell
   npm start
   ```

## Dépannage

### "node n'est pas reconnu"
- Redémarrez votre terminal après l'installation
- Vérifiez que Node.js est dans le PATH système
- Réinstallez Node.js si nécessaire

### "npm n'est pas reconnu"
- npm est inclus avec Node.js, réinstallez Node.js
- Vérifiez que le PATH contient le dossier npm

### Erreurs de permissions
- Exécutez le terminal en tant qu'administrateur si nécessaire
- Ou configurez npm pour utiliser un dossier local : `npm config set prefix %APPDATA%\npm`

## Vérification Rapide

Une fois Node.js installé, vous pouvez utiliser le script de démarrage automatique :

```powershell
cd frontend
.\start.bat
```

Ce script vérifiera automatiquement :
- ✅ Si Node.js est installé
- ✅ Si npm est installé
- ✅ Si les dépendances sont installées
- ✅ Démarre le serveur de développement
