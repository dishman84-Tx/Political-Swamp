@echo off
echo Deploying Cold Iron Dossier to Firebase...
cd /d "%~dp0"
firebase deploy --only hosting
if errorlevel 1 (
    echo.
    echo Login required. Running firebase login --reauth...
    firebase login --reauth
    firebase deploy --only hosting
)
echo.
echo Done! Live at https://mission-political-swamp.web.app
pause
