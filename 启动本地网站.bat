@echo off
chcp 65001 >nul
title Colorai local site
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "tools\serve.ps1" && goto :eof
echo PowerShell 启动失败，改用 Python / Node……
where py >nul 2>nul && (py -3 tools\serve.py & goto :eof)
where python >nul 2>nul && (python tools\serve.py & goto :eof)
where node >nul 2>nul && (node tools\serve.mjs & goto :eof)
echo 没找到 Python 或 Node，直接用浏览器打开 index.html（换页时音乐会断一下）。
start "" "index.html"
pause
