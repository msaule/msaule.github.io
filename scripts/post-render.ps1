$ErrorActionPreference = 'Stop'
# Keep the custom homepage intact after rendering legacy Quarto source material.
& node (Join-Path $PSScriptRoot 'build.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Portfolio build failed.' }
