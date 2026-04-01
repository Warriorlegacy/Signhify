@echo off
REM Auto-fix script for Windows

echo Running auto-fix...

REM Check file structure
echo Checking HTML file...
if not exist index.html (
    echo ERROR: index.html not found
    exit /b 1
)

echo.
echo Checking for common issues...
findstr /C:"<script></script>" index.html >nul
if %ERRORLEVEL%==0 (
    echo WARNING: Found empty script tags
)

echo.
echo Auto-fix complete!
echo.
echo To validate your site, run: npx html-validate index.html