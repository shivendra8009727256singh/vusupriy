$ErrorActionPreference = 'Stop'
$jsxFile = '.\src\pages\InteriorServices\ServiceDetail.jsx'
$cssFile = '.\src\App.css'
if (!(Test-Path $jsxFile) -or !(Test-Path $cssFile)) { throw 'Run from Vasupriy project root.' }
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$jsxBackup = "$jsxFile.$stamp.bak"
$cssBackup = "$cssFile.$stamp.bak"
Copy-Item -LiteralPath $jsxFile -Destination $jsxBackup
Copy-Item -LiteralPath $cssFile -Destination $cssBackup
$utf8 = New-Object System.Text.UTF8Encoding($false)
try {
  $jsxPath = (Resolve-Path $jsxFile).Path
  $cssPath = (Resolve-Path $cssFile).Path
  $jsx = [System.IO.File]::ReadAllText($jsxPath)
  $css = [System.IO.File]::ReadAllText($cssPath)
  $marker = 'VASUPRIY RIGHT COLUMN EDITORIAL V2'
  if ($jsx.Contains($marker)) { throw 'This update is already installed. No changes made.' }

  $articleEnd = $jsx.IndexOf('</article>')
  $fullStartToken = '<div className="vasu-service-container vasu-service-fullwidth">'
  $fullStart = $jsx.IndexOf($fullStartToken)
  if ($articleEnd -lt 0 -or $fullStart -lt $articleEnd) { throw 'Unexpected article/fullwidth structure; files untouched.' }
  $innerStart = $fullStart + $fullStartToken.Length
  $processToken = '<div className="vasu-service-process">'
  $processStart = $jsx.IndexOf($processToken, $innerStart)
  if ($processStart -lt 0) { throw 'Design process section not found; files untouched.' }
  $moved = $jsx.Substring($innerStart, $processStart - $innerStart).Trim()
  if (!$moved.Contains('vasu-service-editorial-focus') -or !$moved.Contains('vasu-service-editorial-approach') -or !$moved.Contains('vasu-service-fullwidth-heading')) {
    throw 'Editorial section structure differs from expected; files untouched.'
  }
  if ($moved.Contains('vasu-sidebar-vertical-gallery')) { throw 'Unexpected gallery placement; files untouched.' }

  # Move detailed content into the right column, immediately after the main images.
  $jsx = $jsx.Substring(0, $articleEnd) + "            {/* $marker */}`r`n" + $moved + "`r`n          " + $jsx.Substring($articleEnd)

  # Keep the existing Design Process in the full-width area.
  $newFullStart = $jsx.IndexOf($fullStartToken, $articleEnd)
  $newInnerStart = $newFullStart + $fullStartToken.Length
  $newProcessStart = $jsx.IndexOf($processToken, $newInnerStart)
  if ($newFullStart -lt 0 -or $newProcessStart -lt 0) { throw 'Unable to locate moved sections.' }
  $processHeading = @'

          <div className="vasu-service-process-heading">
            <span className="vasu-service-editorial-eyebrow">HOW WE WORK</span>
            <h2>Our Design Process</h2>
          </div>
'@
  $jsx = $jsx.Substring(0, $newInnerStart) + $processHeading + $jsx.Substring($newProcessStart)

  $styleMarker = '/* VASUPRIY RIGHT COLUMN EDITORIAL V2 START */'
  if (!$css.Contains($styleMarker)) {
    $css += @'

/* VASUPRIY RIGHT COLUMN EDITORIAL V2 START */
.vasu-service-page .vasu-service-content .vasu-service-fullwidth-heading {
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid rgba(180,143,78,.3);
}
.vasu-service-page .vasu-service-content .vasu-service-fullwidth-heading h2 {
  font-size: clamp(27px, 3vw, 39px);
  overflow-wrap: anywhere;
}
.vasu-service-page .vasu-service-content .vasu-service-editorial-points {
  grid-template-columns: repeat(2,minmax(0,1fr));
}
.vasu-service-page .vasu-service-fullwidth {
  margin-top: 24px;
}
.vasu-service-page .vasu-service-process-heading {
  padding-top: 30px;
  border-top: 1px solid rgba(180,143,78,.3);
}
.vasu-service-page .vasu-service-process-heading h2 {
  margin: 10px 0 22px;
  color: #063f4b;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(30px,4vw,46px);
  font-weight: 500;
}
@media (max-width: 767px) {
  .vasu-service-page .vasu-service-content .vasu-service-editorial-points {
    grid-template-columns: 1fr;
  }
}
/* VASUPRIY RIGHT COLUMN EDITORIAL V2 END */
'@
  }
  [System.IO.File]::WriteAllText($jsxPath, $jsx, $utf8)
  [System.IO.File]::WriteAllText($cssPath, $css, $utf8)
  npm run build
  if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
  Write-Host 'SUCCESS: Editorial details now continue in right column; process remains full width.' -ForegroundColor Green
  Write-Host "Backups: $jsxBackup and $cssBackup"
} catch {
  Copy-Item -LiteralPath $jsxBackup -Destination $jsxFile -Force
  Copy-Item -LiteralPath $cssBackup -Destination $cssFile -Force
  Write-Host 'Update failed; original files restored.' -ForegroundColor Yellow
  throw
}
