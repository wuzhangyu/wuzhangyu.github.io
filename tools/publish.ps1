# Publish the site.
#   1. Upload to Cloudflare Pages: https://coloraiyu.pages.dev/  (needs `npx wrangler login`, once)
#   2. Push a backup copy to GitHub wuzhangyu/wuzhangyu.github.io (needs `gh auth login`, once; skip with -NoGitHub)
# Only the working tree is uploaded; local git history stays on this machine.
param([string]$Message = "Update site", [switch]$NoGitHub)

$ErrorActionPreference = "Stop"
$env:PATH += ";C:\Program Files\GitHub CLI"
$src = Split-Path $PSScriptRoot -Parent
$skip = ".git", ".cursor", ".vscode", ".gitignore", ".wrangler"

# Pages wants: wrangler.toml + functions/ (guestbook and AI APIs) next to public/ (the static site).
$dist = Join-Path $env:TEMP "colorai-dist"
if (Test-Path $dist) { Remove-Item $dist -Recurse -Force }
$public = Join-Path $dist "public"
New-Item -ItemType Directory $public | Out-Null
Get-ChildItem $src -Force | Where-Object { $_.Name -notin ($skip + "tools", "cloudflare", "修改指南.md", "怎么打开.txt", ".gitattributes") -and $_.Name -notlike "启动本地网站*" -and $_.Name -notlike "打开线上版*" } | Copy-Item -Destination $public -Recurse -Force
Get-ChildItem (Join-Path $src "cloudflare") | Where-Object { $_.Name -ne "schema.sql" } | Copy-Item -Destination $dist -Recurse -Force
Push-Location $dist
try {
  npx --yes wrangler pages deploy --project-name coloraiyu --branch main --commit-dirty=true --commit-message $Message
  if ($LASTEXITCODE) { throw "Cloudflare upload failed." }
} finally { Pop-Location }

if (-not $NoGitHub) {
  $repo = Join-Path $env:TEMP "colorai-publish"
  if (Test-Path (Join-Path $repo ".git")) {
    git -C $repo fetch -q origin main
    git -C $repo reset -q --hard origin/main
  } else {
    if (Test-Path $repo) { Remove-Item $repo -Recurse -Force }
    gh repo clone wuzhangyu/wuzhangyu.github.io $repo -- -q
  }
  Get-ChildItem $repo -Force | Where-Object { $_.Name -notin ".git", ".github", ".gitignore" } | Remove-Item -Recurse -Force
  Get-ChildItem $src -Force | Where-Object { $_.Name -notin $skip } | Copy-Item -Destination $repo -Recurse -Force
  git -C $repo add -A
  if (git -C $repo status --porcelain) {
    git -C $repo -c user.name="Colorai" -c user.email="colorai@hnu.edu.cn" commit -q -m $Message
    git -C $repo push -q origin main
  }
}
Write-Host "Done: https://coloraiyu.pages.dev/"
