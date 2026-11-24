# Serves the site folder on http://127.0.0.1:<port>/ and opens it in the default browser.
# Close this window to stop the server.
param([int]$Port = 8765)

$Root = Split-Path -Parent $PSScriptRoot
$Types = @{
  ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8"; ".js" = "text/javascript; charset=utf-8"
  ".json" = "application/json"; ".svg" = "image/svg+xml"; ".webp" = "image/webp"; ".png" = "image/png"
  ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"; ".gif" = "image/gif"; ".ico" = "image/x-icon"
  ".woff2" = "font/woff2"; ".ttf" = "font/ttf"; ".txt" = "text/plain; charset=utf-8"; ".md" = "text/plain; charset=utf-8"
}

$listener = New-Object System.Net.HttpListener
for ($p = $Port; $p -lt $Port + 20; $p++) {
  try { $listener.Prefixes.Clear(); $listener.Prefixes.Add("http://127.0.0.1:$p/"); $listener.Start(); $Port = $p; break } catch { $listener = New-Object System.Net.HttpListener }
}
if (-not $listener.IsListening) { Write-Host "No free port found." -ForegroundColor Red; Read-Host "Press Enter to exit"; exit 1 }

$url = "http://127.0.0.1:$Port/index.html"
Write-Host ""
Write-Host "  Colorai local site is running: $url" -ForegroundColor Cyan
Write-Host "  Close this window to stop it." -ForegroundColor DarkGray
Write-Host ""
if (-not $env:COLORAI_NO_BROWSER) { Start-Process $url }

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $res = $ctx.Response
  try {
    $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart("/")
    if ($rel -eq "" -or $rel.EndsWith("/")) { $rel += "index.html" }
    $file = [IO.Path]::GetFullPath((Join-Path $Root $rel))
    if (-not $file.StartsWith($Root) -or -not (Test-Path -LiteralPath $file -PathType Leaf)) {
      $res.StatusCode = 404
      $bytes = [Text.Encoding]::UTF8.GetBytes("404 Not Found")
    } else {
      $ext = [IO.Path]::GetExtension($file).ToLower()
      $res.ContentType = if ($Types.ContainsKey($ext)) { $Types[$ext] } else { "application/octet-stream" }
      $res.AddHeader("Cache-Control", "no-cache")
      $bytes = [IO.File]::ReadAllBytes($file)
    }
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch {
  } finally {
    $res.OutputStream.Close()
  }
}
