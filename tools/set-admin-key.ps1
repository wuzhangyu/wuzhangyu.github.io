# Change the admin password (the ADMIN_KEY secret on Cloudflare Pages), redeploy so it takes effect,
# and write it to the private note outside this project (never into the project: the project is pushed to a public GitHub repo).
#   powershell -ExecutionPolicy Bypass -File tools\set-admin-key.ps1            asks for a new password (leave empty to generate one)
#   powershell -ExecutionPolicy Bypass -File tools\set-admin-key.ps1 -NoDeploy  only update the secret; it takes effect on the next publish
param([switch]$NoDeploy)

$ErrorActionPreference = "Stop"
$note = Join-Path $env:USERPROFILE "Colorai-私密\管理密码.txt"

function Plain($secure) { [Runtime.InteropServices.Marshal]::PtrToStringBSTR([Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)) }

Write-Host ""
Write-Host "  设置新的管理密码（至少 12 位；直接回车 = 随机生成一个 20 位的）" -ForegroundColor Cyan
$a = Plain (Read-Host "  新密码" -AsSecureString)
if ($a) {
  if ($a.Length -lt 12) { throw "太短了，至少 12 位。" }
  if ($a -match "\s") { throw "不能有空格。" }
  $b = Plain (Read-Host "  再输一次" -AsSecureString)
  if ($a -ne $b) { throw "两次输入不一样。" }
  $key = $a
} else {
  $chars = "abcdefghijkmnpqrstuvwxyz23456789".ToCharArray()
  $bytes = New-Object byte[] 20
  [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
  $key = -join ($bytes | ForEach-Object { $chars[$_ % $chars.Length] })
}

Write-Host "  上传到 Cloudflare…" -ForegroundColor DarkGray
$key | npx --yes wrangler pages secret put ADMIN_KEY --project-name coloraiyu
if ($LASTEXITCODE) { throw "上传失败（需要先 npx wrangler login）。旧密码仍然有效。" }

New-Item -ItemType Directory -Force (Split-Path $note) | Out-Null
$old = if (Test-Path $note) { Get-Content $note -Raw -Encoding UTF8 } else { "" }
$text = $old -replace "(?m)^当前密码：[^\r\n]*", "当前密码：$key" -replace "(?m)^更新时间：[^\r\n]*", "更新时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm')"
if ($text -notmatch "当前密码：") { $text = "当前密码：$key`r`n更新时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm')`r`n" }
[IO.File]::WriteAllText($note, $text, (New-Object Text.UTF8Encoding $true))
Write-Host "  已写入 $note" -ForegroundColor DarkGray

if ($NoDeploy) {
  Write-Host "  新密码要等下次发布（tools\publish.ps1）后才生效，在那之前旧密码仍然能用。" -ForegroundColor Yellow
} else {
  Write-Host "  重新部署，让新密码生效…" -ForegroundColor DarkGray
  & (Join-Path $PSScriptRoot "publish.ps1") -Message "Rotate admin key" -NoGitHub
  Write-Host ""
  Write-Host "  完成。旧密码已经失效；用旧密码登录过的浏览器需要重新登录（通行密钥不受影响）。" -ForegroundColor Green
}
