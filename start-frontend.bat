@echo off
echo ========================================
echo   Demarrage Frontend Angular
echo ========================================
echo.

REM Vérifier Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Node.js n'est pas installe!
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js version:
node --version
echo npm version:
npm --version
echo.

cd frontendangular

REM Vérifier si node_modules existe
if not exist "node_modules" (
    echo [FRONTEND] Installation des dependances...
    echo Cela peut prendre quelques minutes...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERREUR] Echec de l'installation des dependances!
        pause
        exit /b 1
    )
    echo [OK] Dependances installees!
    echo.
)

echo [FRONTEND] Demarrage du serveur de developpement...
echo.
echo L'application sera accessible sur: http://localhost:4200
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

npm start

pause
