#!/bin/sh
# Linux: run `sh 启动本地网站-Linux.sh` (add --lan to open it from a phone on the same Wi-Fi). Ctrl+C stops it.
cd "$(dirname "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then exec python3 tools/serve.py "$@"
elif command -v node >/dev/null 2>&1; then exec node tools/serve.mjs "$@"
fi
echo "需要 Python 3 或 Node.js 才能启动本地服务器。也可以直接用浏览器打开 index.html，或者打开线上版 https://coloraiyu.pages.dev/"
command -v xdg-open >/dev/null 2>&1 && xdg-open index.html
