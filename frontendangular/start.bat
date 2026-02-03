@echo off
echo ========================================
echo   Demarrage du Frontend Angular
echo ========================================
echo.

REM Vérifier si Node.js est installé
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Node.js n'est pas installe!
    echo.
    echo Veuillez installer Node.js depuis:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Vérifier si npm est installé
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: npm n'est pas installe!
    echo.
    echo Veuillez installer Node.js (npm est inclus)
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version
echo.

REM Vérifier si node_modules existe
if not exist "node_modules" (
    echo Installation des dependances...
    echo Cela peut prendre quelques minutes...
    echo.
    npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERREUR lors de l'installation des dependances!
        pause
        exit /b 1
    )
    echo.
    echo Installation terminee!
    echo.
)

echo Demarrage du serveur de developpement...
echo L'application sera accessible sur: http://localhost:4200
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

npm start
