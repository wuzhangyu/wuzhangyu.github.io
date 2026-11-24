@echo off
chcp 65001 >nul
title Colorai local site (LAN)
cd /d "%~dp0"
echo 同一个 Wi-Fi 下的手机 / 平板可以用下面显示的地址打开。第一次运行时 Windows 防火墙可能会弹窗，选「允许」。
where py >nul 2>nul && (py -3 tools\serve.py --lan & goto :eof)
where python >nul 2>nul && (python tools\serve.py --lan & goto :eof)
where node >nul 2>nul && (node tools\serve.mjs --lan & goto :eof)
echo 这个方式需要装 Python 或 Node.js。只在本机看的话，用「启动本地网站.bat」就行。
pause
