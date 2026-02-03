@echo off
echo ========================================
echo   Demarrage Backend Spring Boot
echo ========================================
echo.

REM Vérifier Java
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Java n'est pas installe ou pas dans le PATH!
    echo Veuillez installer Java JDK 17 ou superieur
    pause
    exit /b 1
)

REM Vérifier Maven
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Maven n'est pas installe ou pas dans le PATH!
    echo Veuillez installer Apache Maven
    pause
    exit /b 1
)

echo [OK] Java version:
java -version 2>&1 | findstr /i "version"
echo.

echo [OK] Maven version:
mvn --version | findstr /i "Apache Maven"
echo.

cd backend

echo [BACKEND] Compilation et demarrage...
echo.
echo Le serveur demarrera sur: http://localhost:8081
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

mvn spring-boot:run

pause
