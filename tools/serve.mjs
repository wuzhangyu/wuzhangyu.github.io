// Serve the site folder on http://127.0.0.1:<port>/ and open it in the browser (Node 16+, any OS).
//   node tools/serve.mjs          this computer only
//   node tools/serve.mjs --lan    also reachable from a phone / tablet on the same Wi-Fi
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { networkInterfaces } from "node:os";
import { exec } from "node:child_process";
import { dirname, extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const LAN = process.argv.includes("--lan");
const START = Number(process.argv.find((a) => /^\d+$/.test(a)) || 8765);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".ico": "image/x-icon", ".woff2": "font/woff2", ".ttf": "font/ttf", ".txt": "text/plain; charset=utf-8", ".md": "text/plain; charset=utf-8",
  ".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".ogg": "audio/ogg",
};

const server = createServer(async (req, res) => {
  try {
    let rel = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (rel.endsWith("/")) rel += "index.html";
    const file = normalize(join(ROOT, rel));
    if (!file.startsWith(ROOT + sep) || !(await stat(file)).isFile()) throw 0;
    res.writeHead(200, { "Content-Type": TYPES[extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

function listen(port) {
  server.once("error", () => (port < START + 20 ? listen(port + 1) : (console.log("No free port found."), process.exit(1))));
  server.listen(port, LAN ? "0.0.0.0" : "127.0.0.1", () => {
    const url = `http://127.0.0.1:${port}/index.html`;
    console.log(`\n  Colorai local site is running: ${url}`);
    if (LAN) {
      const ip = Object.values(networkInterfaces()).flat().find((n) => n && n.family === "IPv4" && !n.internal)?.address;
      if (ip) console.log(`  On a phone / tablet (same Wi-Fi): http://${ip}:${port}/index.html`);
    }
    console.log("  Close this window (or press Ctrl+C) to stop it.\n");
    if (!process.env.COLORAI_NO_BROWSER) {
      const cmd = process.platform === "win32" ? `start "" "${url}"` : process.platform === "darwin" ? `open "${url}"` : `xdg-open "${url}"`;
      exec(cmd, () => {});
    }
  });
}
listen(START);
