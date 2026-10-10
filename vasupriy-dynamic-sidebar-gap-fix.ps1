$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$jsxPath = Join-Path $root 'src\pages\InteriorServices\ServiceDetail.jsx'
$cssPath = Join-Path $root 'src\App.css'
if (!(Test-Path $jsxPath) -or !(Test-Path $cssPath)) { throw 'Run this script from Vasupriy project root (where src and package.json exist).' }
$backup = Join-Path $root ('.vasu-dynamic-gap-backup-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $backup | Out-Null
Copy-Item $jsxPath (Join-Path $backup 'ServiceDetail.jsx')
Copy-Item $cssPath (Join-Path $backup 'App.css')
$utf8 = New-Object System.Text.UTF8Encoding($false)
$jsx = [System.IO.File]::ReadAllText($jsxPath)
$css = [System.IO.File]::ReadAllText($cssPath)
if ($jsx.Contains('VASU_DYNAMIC_SIDEBAR_GAP_V1')) { Write-Host 'Already installed. No changes made.'; exit 0 }
function Replace-Once([string]$source, [string]$old, [string]$new, [string]$label) {
  $n = ([regex]::Matches($source, [regex]::Escape($old))).Count
  if ($n -ne 1) { throw "Cannot safely locate $label (matches: $n). Files were not changed." }
  return $source.Replace($old, $new)
}
$jsx = Replace-Once $jsx "import { useEffect, useState } from 'react'" "import { useEffect, useRef, useState } from 'react'" 'React import'
$anchor = '  const [selectedIndex, setSelectedIndex] = useState(0)'
$insert = @'
  // VASU_DYNAMIC_SIDEBAR_GAP_V1: measure natural content, never include filler in measurement.
  const sidebarInnerRef = useRef(null)
  const articleRef = useRef(null)
  const [sidebarGap, setSidebarGap] = useState(0)

  useEffect(() => {
    const sidebarInner = sidebarInnerRef.current
    const article = articleRef.current
    if (!sidebarInner || !article) return undefined
    let frame = 0
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (window.innerWidth <= 1024) {
          setSidebarGap(0)
          return
        }
        const sidebarHeight = sidebarInner.getBoundingClientRect().height
        const articleHeight = article.getBoundingClientRect().height
        // Ignore small differences. Keep filler height independent of its own dimensions.
        const difference = Math.max(0, Math.round(articleHeight - sidebarHeight - 26))
        setSidebarGap(difference >= 220 ? difference : 0)
      })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(sidebarInner)
    observer.observe(article)
    window.addEventListener('resize', measure)
    measure()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [slug, selectedIndex])
'@
$jsx = Replace-Once $jsx $anchor ($anchor + "`n" + $insert) 'selectedIndex state'
$jsx = Replace-Once $jsx '<div className="vasu-service-sidebar-inner">' '<div className="vasu-service-sidebar-inner" ref={sidebarInnerRef}>' 'sidebar inner'
$jsx = Replace-Once $jsx '<article className="vasu-service-content">' '<article className="vasu-service-content" ref={articleRef}>' 'content article'
$boundaryPattern = '(?s)(</div>\s*)(</aside>\s*<article className="vasu-service-content" ref=\{articleRef\}>)'
if (([regex]::Matches($jsx, $boundaryPattern)).Count -ne 1) { throw 'Cannot safely locate sidebar end and article start. No files changed.' }
$filler = @'
{sidebarGap > 0 && (
  <div className="vasu-service-gap-filler" style={{ minHeight: sidebarGap }}>
    <span className="vasu-service-gap-eyebrow">DESIGN INSPIRATION</span>
    <h3>Made for Your Space</h3>
    <p>Discover ideas and details tailored to your interior vision.</p>
    {findImage(serviceImages[slug]?.hero) && (
      <img src={findImage(serviceImages[slug]?.hero)} alt={`${service.title} interior inspiration`} loading="lazy" decoding="async" />
    )}
    <Link to="/contact">Discuss Your Project <span aria-hidden="true">↗</span></Link>
  </div>
)}
'@
$jsx = [regex]::Replace($jsx, $boundaryPattern, { param($m) $m.Groups[1].Value + "`n" + $filler + "`n" + $m.Groups[2].Value }, 1)
$css += @'

/* VASU_DYNAMIC_SIDEBAR_GAP_V1 — only fills a genuine desktop sidebar gap */
@media (min-width: 1025px) {
  .vasu-service-page .vasu-service-sidebar { align-self: start; display: flex; flex-direction: column; gap: 26px; min-width: 0; }
  .vasu-service-page .vasu-service-gap-filler {
    box-sizing: border-box; display: flex; flex-direction: column; overflow: hidden;
    padding: 26px 22px; border-radius: 16px;
    background: #f8f6f1; border: 1px solid rgba(180,143,78,.28);
    color: #153e45;
  }
  .vasu-service-page .vasu-service-gap-eyebrow { color: #b48f4e; font-size: 11px; font-weight: 800; letter-spacing: .14em; }
  .vasu-service-page .vasu-service-gap-filler h3 { font-family: Georgia,serif; font-size: clamp(24px,2.4vw,32px); font-weight: 500; line-height: 1.2; margin: 16px 0 12px; }
  .vasu-service-page .vasu-service-gap-filler p { font-size: 14px; line-height: 1.75; margin: 0 0 22px; }
  .vasu-service-page .vasu-service-gap-filler img { display: block; width: 100%; min-height: 130px; max-height: 340px; flex: 1 1 auto; object-fit: cover; border-radius: 10px; }
  .vasu-service-page .vasu-service-gap-filler a { color: #063f4b; text-decoration: none; font-size: 13px; font-weight: 800; margin-top: 22px; align-self: flex-start; border-bottom: 1px solid #b48f4e; padding-bottom: 6px; }
}
@media (max-width: 1024px) { .vasu-service-page .vasu-service-gap-filler { display: none !important; } }
'@
[System.IO.File]::WriteAllText($jsxPath, $jsx, $utf8)
[System.IO.File]::WriteAllText($cssPath, $css, $utf8)
Write-Host "Backup: $backup"
Write-Host 'Running npm run build...'
& npm run build
if ($LASTEXITCODE -ne 0) {
  Copy-Item (Join-Path $backup 'ServiceDetail.jsx') $jsxPath -Force
  Copy-Item (Join-Path $backup 'App.css') $cssPath -Force
  throw 'Build failed; original files automatically restored.'
}
Write-Host 'SUCCESS: dynamic desktop sidebar filler installed; build passed.' -ForegroundColor Green
