$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$jsx = Join-Path $root 'src/pages/InteriorServices/ServiceDetail.jsx'
$css = Join-Path $root 'src/App.css'
if (!(Test-Path $jsx) -or !(Test-Path $css)) { Write-Host 'Run this from vasupriy-interiovilla project root.' -ForegroundColor Red; exit 1 }
$out = Join-Path $root 'vasupriy-layout-diagnostic.txt'
$patterns = 'vasu-service-sidebar|vasu-service-grid|vasu-service-content|vasu-service-inline-details|vasu-service-fullwidth|VASUPRIY INLINE SERVICE DETAILS SAFE FIX|position:\s*sticky|align-items|grid-template-columns'
$lines = @('VASUPRIY SERVICE LAYOUT DIAGNOSTIC', ('Generated: ' + (Get-Date)), ('Project: ' + $root), '')
foreach ($file in @($jsx,$css)) {
  $lines += ('=== ' + $file + ' ===')
  $matches = Select-String -Path $file -Pattern $patterns -AllMatches
  foreach ($m in $matches) {
    $start = [Math]::Max(1,$m.LineNumber-5)
    $end = [Math]::Min((Get-Content $file).Count,$m.LineNumber+10)
    $content = Get-Content $file
    $lines += ('--- lines ' + $start + '-' + $end + ' ---')
    for ($i=$start; $i -le $end; $i++) { $lines += ('{0,5}: {1}' -f $i,$content[$i-1]) }
  }
}
$lines | Set-Content -Path $out -Encoding UTF8
Write-Host ('Diagnostic saved: ' + $out) -ForegroundColor Green
Write-Host 'Share vasupriy-layout-diagnostic.txt here so I can prepare a precise one-click fix.' -ForegroundColor Cyan
