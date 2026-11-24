@echo off
chcp 65001 >nul
title Colorai local site
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\serve.ps1"
