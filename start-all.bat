@echo off
echo ========================================
echo   Demarrage Backend + Frontend
echo   Systeme de Reservation Padel
echo ========================================
echo.

REM Vérifier Java
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Java n'est pas installe ou pas dans le PATH!
    echo Veuillez installer Java JDK 17 ou superieur
    echo.
    pause
    exit /b 1
)

REM Vérifier Maven
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Maven n'est pas installe ou pas dans le PATH!
    echo Veuillez installer Apache Maven
    echo.
    pause
    exit /b 1
)

REM Vérifier Node.js pour le frontend
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Node.js n'est pas installe!
    echo Veuillez installer Node.js depuis https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Java version:
java -version 2>&1 | findstr /i "version"
echo.

echo [OK] Maven version:
mvn --version | findstr /i "Apache Maven"
echo.

echo [OK] Node.js version:
node --version
echo npm version:
npm --version
echo.

echo ========================================
echo   Demarrage du Backend Spring Boot
echo ========================================
echo.

REM Créer un nouveau terminal pour le backend
start "Backend Spring Boot - Port 8081" cmd /k "cd backend && echo [BACKEND] Compilation et demarrage... && mvn spring-boot:run"

REM Attendre un peu pour que le backend démarre
timeout /t 5 /nobreak >nul

echo ========================================
echo   Demarrage du Frontend Angular
echo ========================================
echo.

REM Vérifier si node_modules existe dans frontendangular
if not exist "frontendangular\node_modules" (
    echo [FRONTEND] Installation des dependances...
    cd frontendangular
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERREUR] Echec de l'installation des dependances!
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Dependances installees!
    echo.
)

REM Créer un nouveau terminal pour le frontend
start "Frontend Angular - Port 4200" cmd /k "cd frontendangular && echo [FRONTEND] Demarrage du serveur de developpement... && npm start"

echo.
echo ========================================
echo   Demarrage en cours...
echo ========================================
echo.
echo Deux fenetres de terminal ont ete ouvertes:
echo.
echo 1. Backend Spring Boot
echo    - Port: 8081
echo    - URL: http://localhost:8081
echo    - API: http://localhost:8081/api
echo.
echo 2. Frontend Angular
echo    - Port: 4200
echo    - URL: http://localhost:4200
echo.
echo Le backend peut prendre 30-60 secondes pour demarrer.
echo Le frontend sera accessible une fois compile (environ 1 minute).
echo.
echo Appuyez sur une touche pour fermer cette fenetre...
echo (Les serveurs continueront de fonctionner dans leurs fenetres)
pause >nul
