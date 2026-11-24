# Publish the current files to https://wuzhangyu.github.io/ (needs: gh auth login, once).
# Only the working tree is uploaded; local git history stays on this machine.
param([string]$Message = "Update site")

$ErrorActionPreference = "Stop"
$env:PATH += ";C:\Program Files\GitHub CLI"
$src = Split-Path $PSScriptRoot -Parent
$dst = Join-Path $env:TEMP "colorai-publish"

if (Test-Path (Join-Path $dst ".git")) {
  git -C $dst fetch -q origin main
  git -C $dst reset -q --hard origin/main
} else {
  if (Test-Path $dst) { Remove-Item $dst -Recurse -Force }
  gh repo clone wuzhangyu/wuzhangyu.github.io $dst -- -q
}

Get-ChildItem $dst -Force | Where-Object { $_.Name -notin ".git", ".github", ".gitignore" } | Remove-Item -Recurse -Force
Get-ChildItem $src -Force | Where-Object { $_.Name -notin ".git", ".cursor", ".vscode", ".gitignore" } | Copy-Item -Destination $dst -Recurse -Force

git -C $dst add -A
if (-not (git -C $dst status --porcelain)) { Write-Host "Nothing changed."; exit 0 }
git -C $dst -c user.name="Colorai" -c user.email="colorai@hnu.edu.cn" commit -q -m $Message
git -C $dst push -q origin main
Write-Host "Pushed. GitHub Pages updates in about a minute: https://wuzhangyu.github.io/"
