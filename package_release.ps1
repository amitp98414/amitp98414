# Packages the repository into a timestamped ZIP for release
param(
  [string]$OutDir = "release",
  [string]$ExcludePattern = ".git|node_modules|venv|__pycache__"
)
$now = Get-Date -Format "yyyyMMdd-HHmm"
$zipName = "release-$now.zip"
$cwd = Get-Location
if (-Not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir | Out-Null }
$files = Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch $ExcludePattern }
$tempFolder = Join-Path $env:TEMP ("release-$now")
if (Test-Path $tempFolder) { Remove-Item -Recurse -Force $tempFolder }
New-Item -ItemType Directory -Path $tempFolder | Out-Null
foreach ($f in $files) {
  $dest = Join-Path $tempFolder ($f.FullName.Substring($cwd.Path.Length).TrimStart('\'))
  $destDir = Split-Path $dest -Parent
n  if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
  Copy-Item -Path $f.FullName -Destination $dest -Force
}
Compress-Archive -Path (Join-Path $tempFolder '*') -DestinationPath (Join-Path $OutDir $zipName) -Force
Remove-Item -Recurse -Force $tempFolder
Write-Output "Created: $OutDir\$zipName"