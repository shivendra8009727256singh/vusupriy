$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$jsxPath = Join-Path $root 'src\pages\InteriorServices\ServiceDetail.jsx'
$cssPath = Join-Path $root 'src\App.css'
if (!(Test-Path -LiteralPath $jsxPath)) { throw "Missing file: $jsxPath. Run from project root." }
if (!(Test-Path -LiteralPath $cssPath)) { throw "Missing file: $cssPath. Run from project root." }
$originalJsx = [System.IO.File]::ReadAllText($jsxPath)
$originalCss = [System.IO.File]::ReadAllText($cssPath)
$updatedJsx = $originalJsx
$updatedCss = $originalCss
$backupFolder = Join-Path $root ('.vasu-layout-backup-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
$didWrite = $false
try {
  $marker = '{/* VASUPRIY FULL WIDTH SERVICE DETAILS V1 */}'
  $markerAt = $updatedJsx.IndexOf($marker, [StringComparison]::Ordinal)
  if ($markerAt -lt 0) { throw 'Full-width marker not found; no changes made.' }
  $articleCloseAt = $updatedJsx.LastIndexOf('</article>', $markerAt, [StringComparison]::Ordinal)
  if ($articleCloseAt -lt 0) { throw 'Article closing tag not found before full-width marker.' }
  $between = $updatedJsx.Substring($articleCloseAt + '</article>'.Length, $markerAt - ($articleCloseAt + '</article>'.Length))
  if ($between -notmatch '^\s*</div>\s*$') { throw 'Unexpected boundary after article. No changes made.' }
  $fullOpen = '<div className="vasu-service-container vasu-service-fullwidth">'
  $fullAt = $updatedJsx.IndexOf($fullOpen, $markerAt, [StringComparison]::Ordinal)
  if ($fullAt -lt 0) { throw 'Full-width container not found.' }
  $detailsAt = $updatedJsx.IndexOf('<div className="vasu-service-fullwidth-heading">', $fullAt, [StringComparison]::Ordinal)
  $processAt = $updatedJsx.IndexOf('<div className="vasu-service-process">', $detailsAt, [StringComparison]::Ordinal)
  if ($detailsAt -lt 0 -or $processAt -lt 0 -or $processAt -le $detailsAt) { throw 'Details/process boundaries not found.' }
  $moveBlock = $updatedJsx.Substring($detailsAt, $processAt - $detailsAt)
  foreach ($expected in @('MORE ABOUT THIS SERVICE', 'vasu-service-gallery-showcase', 'What We Focus On', 'Designed Around Your Requirements', 'Thoughtfully Designed for Your Space')) {
    if (!$moveBlock.Contains($expected)) { throw "Missing expected content: $expected" }
  }
  if ($moveBlock.Contains('vasu-service-process')) { throw 'Unexpected process nested in details block.' }
  $prefix = $updatedJsx.Substring(0, $articleCloseAt)
  $suffix = $updatedJsx.Substring($processAt)
  $sectionStart = $updatedJsx.Substring($articleCloseAt, $detailsAt - $articleCloseAt)
  if (!$sectionStart.Contains($marker)) { throw 'Marker missing in boundary.' }
  # Move editorial block into article, preserving the original process as a full-width section.
  $newArticleEnd = "`r`n            <div className=`"vasu-service-inline-details`">`r`n" + $moveBlock.Trim() + "`r`n            </div>`r`n          </article>`r`n        </div>`r`n        " + $marker + "`r`n        " + $fullOpen + "`r`n          "
  $updatedJsx = $prefix + $newArticleEnd + $suffix
  if (($updatedJsx.Split(@('vasu-service-gallery-showcase'), [StringSplitOptions]::None).Length - 1) -ne 1) { throw 'Gallery count unexpected after transformation.' }
  if (($updatedJsx.Split(@('vasu-service-process'), [StringSplitOptions]::None).Length - 1) -ne 1) { throw 'Process count unexpected after transformation.' }
  $cssMarker = '/* VASUPRIY INLINE SERVICE DETAILS SAFE FIX */'
  if (!$updatedCss.Contains($cssMarker)) {
    $updatedCss += @'

/* VASUPRIY INLINE SERVICE DETAILS SAFE FIX */
.vasu-service-content .vasu-service-inline-details {
  width: 100%;
  min-width: 0;
  margin-top: 12px;
}
.vasu-service-content .vasu-service-inline-details .vasu-service-gallery-showcase {
  width: 100%;
  max-width: 100%;
}
.vasu-service-content .vasu-service-inline-details .vasu-sidebar-vertical-gallery {
  width: 100%;
  max-width: 100%;
}
.vasu-service-fullwidth:has(> .vasu-service-process) {
  margin-top: 34px;
}
@media (max-width: 767px) {
  .vasu-service-content .vasu-service-inline-details { margin-top: 18px; }
}
'@
  }
  New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null
  Copy-Item -LiteralPath $jsxPath -Destination (Join-Path $backupFolder 'ServiceDetail.jsx')
  Copy-Item -LiteralPath $cssPath -Destination (Join-Path $backupFolder 'App.css')
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($jsxPath, $updatedJsx, $utf8NoBom)
  [System.IO.File]::WriteAllText($cssPath, $updatedCss, $utf8NoBom)
  $didWrite = $true
  Write-Host 'Layout updated. Running npm run build...' -ForegroundColor Cyan
  & npm.cmd run build
  if ($LASTEXITCODE -ne 0) { throw "Build failed with exit code $LASTEXITCODE" }
  Write-Host 'SUCCESS: Build passed. Backup:' $backupFolder -ForegroundColor Green
} catch {
  if ($didWrite) {
    [System.IO.File]::WriteAllText($jsxPath, $originalJsx, (New-Object System.Text.UTF8Encoding($false)))
    [System.IO.File]::WriteAllText($cssPath, $originalCss, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host 'Original source files restored.' -ForegroundColor Yellow
  } else { Write-Host 'Validation stopped before writing source files.' -ForegroundColor Yellow }
  throw
}
