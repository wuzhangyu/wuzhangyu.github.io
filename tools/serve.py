#!/usr/bin/env python3
"""Serve the site folder on http://127.0.0.1:<port>/ and open it in the browser. Works on Windows, macOS and Linux (Python 3.7+).

    python3 tools/serve.py          # this computer only
    python3 tools/serve.py --lan    # also reachable from a phone / tablet on the same Wi-Fi
"""
import http.server, os, socket, sys, threading, webbrowser
from functools import partial

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LAN = "--lan" in sys.argv
PORT = next((int(a) for a in sys.argv[1:] if a.isdigit()), 8765)


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      ".js": "text/javascript", ".mjs": "text/javascript", ".webp": "image/webp", ".woff2": "font/woff2",
                      ".svg": "image/svg+xml", ".json": "application/json", ".md": "text/plain; charset=utf-8"}

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, *args):
        pass


def lan_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("10.255.255.255", 1))
        return s.getsockname()[0]
    except OSError:
        return None
    finally:
        s.close()


server = None
for p in range(PORT, PORT + 20):
    try:
        server = http.server.ThreadingHTTPServer(("0.0.0.0" if LAN else "127.0.0.1", p), partial(Handler, directory=ROOT))
        PORT = p
        break
    except OSError:
        continue
if not server:
    sys.exit("No free port found.")

url = f"http://127.0.0.1:{PORT}/index.html"
print(f"\n  Colorai local site is running: {url}")
if LAN:
    ip = lan_ip()
    if ip:
        print(f"  On a phone / tablet (same Wi-Fi): http://{ip}:{PORT}/index.html")
print("  Close this window (or press Ctrl+C) to stop it.\n")
if not os.environ.get("COLORAI_NO_BROWSER"):
    threading.Timer(0.4, lambda: webbrowser.open(url)).start()
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
