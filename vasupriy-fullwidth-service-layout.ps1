$ErrorActionPreference = 'Stop'
$jsxFile = '.\src\pages\InteriorServices\ServiceDetail.jsx'
$cssFile = '.\src\App.css'
if (!(Test-Path $jsxFile) -or !(Test-Path $cssFile)) { throw 'Run this script from the Vasupriy project root.' }
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
  $marker = 'VASUPRIY FULL WIDTH SERVICE DETAILS V1'
  if ($jsx.Contains($marker)) { throw 'This layout update is already installed. No files changed.' }
  $startText = '            {serviceEditorial[selected.title] && (' + "`n" + '              <>'
  $start = $jsx.IndexOf($startText)
  if ($start -lt 0) {
    $startText = '            {serviceEditorial[selected.title] && (' + "`r`n" + '              <>'
    $start = $jsx.IndexOf($startText)
  }
  if ($start -lt 0) { throw 'Editorial detail block not found; no changes applied.' }
  $articleClose = '</article>'
  $end = $jsx.IndexOf($articleClose, $start)
  if ($end -lt 0) { throw 'Closing article not found.' }
  $moved = $jsx.Substring($start, $end - $start).Trim()
  if (!$moved.Contains('vasu-service-editorial-focus') -or !$moved.Contains('vasu-service-process')) {
    throw 'Unexpected JSX structure. Please share the current ServiceDetail.jsx.'
  }
  # Keep only the intro and image gallery in the right-hand column.
  $jsx = $jsx.Substring(0, $start) + '          ' + $jsx.Substring($end)
  # Insert the detailed editorial content after the two-column layout, inside the same section.
  $closing = "        </div>" + "`n" + "      </section>"
  $closingCRLF = "        </div>" + "`r`n" + "      </section>"
  $needle = if ($jsx.Contains($closing)) { $closing } else { $closingCRLF }
  $idx = $jsx.LastIndexOf($needle)
  if ($idx -lt 0) { throw 'Main layout closing tag not found.' }
  $insert = @'
        {/* VASUPRIY FULL WIDTH SERVICE DETAILS V1 */}
        <div className="vasu-service-container vasu-service-fullwidth">
          <div className="vasu-service-fullwidth-heading">
            <span className="vasu-service-editorial-eyebrow">MORE ABOUT THIS SERVICE</span>
            <h2>{selected.title} — The Details</h2>
          </div>
'@
  $insert += "`r`n" + $moved + "`r`n        </div>`r`n"
  $jsx = $jsx.Substring(0, $idx + ('        </div>').Length) + "`r`n" + $insert + $jsx.Substring($idx + ('        </div>').Length)
  $style = @'
/* VASUPRIY FULL WIDTH SERVICE DETAILS V1 START */
.vasu-service-page .vasu-service-layout { align-items: start; }
.vasu-service-page .vasu-service-sidebar { align-self: start; height: auto; }
.vasu-service-page .vasu-service-sidebar-inner { position: static !important; }
.vasu-service-page .vasu-service-fullwidth { margin-top: clamp(42px, 6vw, 82px); padding-bottom: clamp(60px, 7vw, 105px); }
.vasu-service-page .vasu-service-fullwidth-heading { border-top: 1px solid rgba(180,143,78,.3); padding-top: clamp(28px, 4vw, 50px); margin-bottom: 28px; }
.vasu-service-page .vasu-service-fullwidth-heading h2 { font-family: Georgia, 'Times New Roman', serif; font-size: clamp(30px, 4vw, 48px); font-weight: 500; line-height: 1.2; color: #063f4b; margin: 10px 0 0; }
.vasu-service-page .vasu-service-fullwidth .vasu-service-editorial-focus { margin: 22px 0 30px; }
.vasu-service-page .vasu-service-fullwidth .vasu-service-editorial-points { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.vasu-service-page .vasu-service-fullwidth .vasu-service-editorial-approach { margin: 30px 0; }
.vasu-service-page .vasu-service-fullwidth .vasu-service-process { margin: 32px 0; }
@media (max-width: 1024px) {
  .vasu-service-page .vasu-service-fullwidth .vasu-service-editorial-points { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 767px) {
  .vasu-service-page .vasu-service-fullwidth { margin-top: 30px; }
  .vasu-service-page .vasu-service-fullwidth .vasu-service-editorial-points { grid-template-columns: 1fr; }
}
/* VASUPRIY FULL WIDTH SERVICE DETAILS V1 END */
'@
  if (!$css.Contains('/* VASUPRIY FULL WIDTH SERVICE DETAILS V1 START */')) { $css += "`r`n" + $style }
  [System.IO.File]::WriteAllText($jsxPath, $jsx, $utf8)
  [System.IO.File]::WriteAllText($cssPath, $css, $utf8)
  npm run build
  if ($LASTEXITCODE -ne 0) { throw 'Production build failed.' }
  Write-Host 'SUCCESS: Detailed service content moved below the two-column layout.' -ForegroundColor Green
  Write-Host "Backups: $jsxBackup and $cssBackup"
} catch {
  Copy-Item -LiteralPath $jsxBackup -Destination $jsxFile -Force
  Copy-Item -LiteralPath $cssBackup -Destination $cssFile -Force
  Write-Host 'Original files restored.' -ForegroundColor Yellow
  throw
}
