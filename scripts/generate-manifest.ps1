param(
    [string]$AppRoot = "app",
    [string]$Output = "app\manifest.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -Path $AppRoot)) {
    throw "App root not found: $AppRoot"
}

$files = Get-ChildItem -Path $AppRoot -File -Recurse |
    Where-Object { $_.Name -ne "manifest.json" } |
    ForEach-Object {
        $relative = $_.FullName.Substring((Resolve-Path $AppRoot).Path.Length).TrimStart([IO.Path]::DirectorySeparatorChar)
        $relative.Replace("\\", "/")
    } |
    Sort-Object

$manifest = [PSCustomObject]@{
    files = $files
}

$manifestJson = $manifest | ConvertTo-Json -Depth 3
$manifestJson | Set-Content -Path $Output -Encoding UTF8

Write-Host "Wrote manifest to $Output with $($files.Count) files."
