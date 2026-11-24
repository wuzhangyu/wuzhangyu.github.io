#!/bin/bash
# macOS: double-click to open the site locally. Close this Terminal window to stop it.
# If macOS says it can't be opened: right-click this file → 打开 (Open), once.
cd "$(dirname "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then exec python3 tools/serve.py "$@"
elif command -v node >/dev/null 2>&1; then exec node tools/serve.mjs "$@"
fi
echo "需要 Python 3 或 Node.js 才能启动本地服务器。"
echo "也可以直接双击 index.html 打开（换页时音乐会断一下），或者打开线上版 https://coloraiyu.pages.dev/"
open "index.html"
read -r -p "按回车关闭…"
