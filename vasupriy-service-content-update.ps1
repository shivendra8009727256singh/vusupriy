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
$editorial = @'
const serviceEditorial = {
  "Complete Room Transformation": {
    "intro": "A room transformation begins with understanding how the space is used every day. We bring layout, furniture, lighting and finishes together to create a cohesive interior without assuming major structural changes are necessary.",
    "highlights": [
      "Furniture arrangement that supports comfort, movement and conversation",
      "Coordinated lighting, colour and material palettes",
      "Storage, styling and finishing details that feel intentional"
    ],
    "approach": "We review what can be retained, refreshed or replaced, then develop a practical transformation plan around the desired mood and available budget."
  },
  "Space Planning & Layout Optimization": {
    "intro": "Good planning creates a sense of ease long before decorative details are added. We study circulation, furniture scale, functional zones and natural light to make compact and generous rooms work more effectively.",
    "highlights": [
      "Clear circulation routes and thoughtfully defined activity zones",
      "Furniture sizing, placement and ergonomic clearances",
      "Storage opportunities and better use of overlooked corners"
    ],
    "approach": "Our approach starts with measurements and daily routines, followed by layout options that balance openness, privacy and practicality."
  },
  "Aesthetic Designs & Theme Styling": {
    "intro": "A considered theme gives an interior its identity. We coordinate colours, textures, furnishings and decorative accents so the final atmosphere feels personal rather than assembled from unrelated trends.",
    "highlights": [
      "A clear visual direction and cohesive mood board",
      "Complementary fabrics, finishes and decorative accents",
      "Balanced statement pieces and quieter supporting details"
    ],
    "approach": "We explore references and preferences first, then refine a palette and styling direction that can be carried consistently across the room."
  },
  "Space Enhancement & Surface Upgrades": {
    "intro": "Thoughtful upgrades can change how a room feels without rebuilding it. Feature walls, lighting adjustments, refined finishes and decorative treatments introduce depth, warmth and character.",
    "highlights": [
      "Wall finishes, panels and wallpaper combinations",
      "Layered lighting and carefully positioned highlights",
      "Surface treatments chosen for use, maintenance and visual impact"
    ],
    "approach": "We assess existing surfaces and the desired finish, then plan upgrades that complement the architecture and fit the scope of work."
  },
  "Architectural & Civil Work": {
    "intro": "Architectural and civil interventions establish the foundation for a well-functioning interior. Layout modifications, surface preparation and construction details need careful coordination with design intent and site conditions.",
    "highlights": [
      "Space alterations and practical construction sequencing",
      "Coordination of measurements, levels and finishing requirements",
      "Attention to site conditions and applicable approvals"
    ],
    "approach": "We begin with site review and scope definition, coordinating appropriate technical specialists wherever structural or regulated work is involved."
  },
  "Professional 2D, 3D & GRFC Drawings": {
    "intro": "Clear drawings help turn design intent into decisions that clients and execution teams can understand. Plans, visualizations and relevant construction details make proportions, finishes and coordination easier to review.",
    "highlights": [
      "2D layouts for spatial clarity and furniture placement",
      "3D views to explore materials, lighting and atmosphere",
      "Detailed drawings and revisions aligned with the agreed scope"
    ],
    "approach": "We gather dimensions and requirements, develop visual options and refine documentation before execution. Drawing types are selected to suit the project."
  },
  "Mirror & Glazing Styling": {
    "intro": "Mirrors and glazing can make interiors feel lighter, brighter and more spacious. Their impact depends on proportion, placement, edge detailing and appropriate material selection.",
    "highlights": [
      "Decorative mirrors and feature compositions",
      "Glass partitions and glazing details suited to the space",
      "Consideration of safety, cleaning and reflected light"
    ],
    "approach": "We review locations, dimensions and desired aesthetics before coordinating suitable specifications and installation details."
  },
  "Doors & Windows Installation": {
    "intro": "Doors and windows shape privacy, light, ventilation and the visual rhythm of a space. The right selection combines architectural style with reliable everyday performance.",
    "highlights": [
      "Opening styles, proportions and frame finishes",
      "Hardware, access and ease of operation",
      "Alignment, sealing and installation coordination"
    ],
    "approach": "We assess openings and functional needs, then help align product choices and fitting details with the surrounding interiors."
  },
  "Centralized AC & Electrical Fitting": {
    "intro": "Comfort and lighting work best when technical systems are considered early. Thoughtful coordination helps integrate climate control, switches, fixtures and services without compromising the interior design.",
    "highlights": [
      "Placement planning for air distribution and access",
      "Lighting points, controls and fixture coordination",
      "Concealment, maintenance access and safety considerations"
    ],
    "approach": "We coordinate layouts with qualified installation professionals and ensure electrical and HVAC work follows relevant technical requirements."
  },
  "Natural Garden Setup": {
    "intro": "Greenery softens architecture and creates inviting transitions between indoor and outdoor spaces. A successful garden setup considers sunlight, water access, maintenance and the intended atmosphere.",
    "highlights": [
      "Plant selections suited to available light and conditions",
      "Planters, pathways and green focal points",
      "Practical watering and maintenance considerations"
    ],
    "approach": "We review the setting and maintenance preferences, then develop a greenery concept that complements the space rather than overcrowding it."
  },
  "3D Epoxy Flooring": {
    "intro": "Decorative epoxy flooring can create a seamless, expressive surface with a distinctive visual character. The right result depends on substrate condition, finish selection and suitability for the intended use.",
    "highlights": [
      "Finish concepts, colour depth and decorative effects",
      "Substrate preparation and application planning",
      "Slip resistance, cleaning and maintenance needs"
    ],
    "approach": "We evaluate the flooring environment and coordinate product and installation recommendations with experienced applicators."
  },
  "Indian Artistry on Walls & Ceilings": {
    "intro": "Artistic walls and ceilings can celebrate craftsmanship while giving a room a memorable focal point. Patterns, textures and motifs work best when they relate to the architecture and surrounding furnishings.",
    "highlights": [
      "Motif development inspired by the desired cultural language",
      "Accent placement, scale and colour harmony",
      "Material and artisan coordination for detailed finishes"
    ],
    "approach": "We develop references and sample directions before planning execution, allowing craftsmanship to complement rather than overwhelm the space."
  },
  "Curtains & Blinds Installation": {
    "intro": "Window treatments balance daylight, privacy, acoustics and softness. Fabric, opacity, hardware and fit all contribute to the final impression.",
    "highlights": [
      "Fabric and blind selections for light and privacy",
      "Measurements, fall, fullness and mounting details",
      "Hardware finishes coordinated with the interior palette"
    ],
    "approach": "We review window dimensions and usage needs, then plan treatment styles and fitting details for a clean, considered result."
  },
  "Nano Coating Protection": {
    "intro": "Protective surface treatments may help simplify maintenance for suitable materials. Choosing a coating requires understanding the substrate, expected wear and product-specific performance.",
    "highlights": [
      "Surface suitability and desired protection goals",
      "Finish compatibility and visual appearance",
      "Application guidance and realistic maintenance expectations"
    ],
    "approach": "We assess the intended surface and review manufacturer specifications before recommending any coating solution; performance depends on product and conditions."
  },
  "Lift Installation": {
    "intro": "Lift integration requires careful attention to access, circulation and architectural coordination. Beyond appearance, safety, compliance and ongoing serviceability are essential considerations.",
    "highlights": [
      "Space planning around entry, circulation and clearances",
      "Finish coordination with the surrounding interior",
      "Access for maintenance and specialist technical requirements"
    ],
    "approach": "We can assist with design coordination while licensed lift providers and relevant professionals handle technical design, approvals and installation."
  },
  "Customized Flooring": {
    "intro": "Flooring sets the tone for an entire interior. A tailored selection considers texture, scale, comfort and durability as well as the relationship between adjacent rooms.",
    "highlights": [
      "Material and finish combinations for the intended use",
      "Patterns, transitions and edge details",
      "Cleaning, slip resistance and long-term upkeep"
    ],
    "approach": "We compare practical requirements and aesthetic references before helping define a flooring direction and installation scope."
  },
  "Wall Panels & Wallpapers": {
    "intro": "Wall treatments add texture, rhythm and personality without changing the fundamental layout. The right design can frame a focal point or quietly enrich the entire room.",
    "highlights": [
      "Feature wall compositions and panel proportions",
      "Wallpaper patterns, colour and texture coordination",
      "Surface preparation and maintenance considerations"
    ],
    "approach": "We develop wall concepts around room scale, furniture placement and lighting, then review suitable materials and installation details."
  },
  "Rugs & Wall Hangings": {
    "intro": "Layered textiles make spaces feel warmer and more individual. Rugs and wall hangings introduce colour, tactile contrast and a sense of composition.",
    "highlights": [
      "Rug scale and placement relative to furniture",
      "Textures, motifs and colour relationships",
      "Wall display positioning and care requirements"
    ],
    "approach": "We select accent pieces in context with the overall scheme so each layer adds character without creating visual clutter."
  },
  "Complete Furnishings": {
    "intro": "A well-furnished interior feels cohesive from the largest seating piece to the smallest soft detail. Proportion, comfort and material consistency are central to the result.",
    "highlights": [
      "Furniture selection and practical room arrangements",
      "Upholstery, curtains, cushions and complementary textiles",
      "Finishing accessories and coordinated visual balance"
    ],
    "approach": "We consider room dimensions, daily use and preferred style before curating a furnishing direction that works as a whole."
  },
  "Garden & Greenery": {
    "intro": "Thoughtfully placed greenery can bring calm, texture and life to residential or commercial settings. Planting and decorative elements should suit the space and the care available.",
    "highlights": [
      "Indoor and outdoor greenery concepts",
      "Planter styles and integration with surrounding materials",
      "Light, watering and ongoing care considerations"
    ],
    "approach": "We match the visual concept to environmental conditions and maintenance preferences, creating a practical green layer for the space."
  }
}
'@
$style = @'
/* VASUPRIY SERVICE EDITORIAL CONTENT START */
.vasu-service-page .vasu-service-editorial-intro{margin:24px 0 30px;padding:24px 28px;background:linear-gradient(130deg,#fbf9f4,#f3eee4);border-left:3px solid #b48f4e;border-radius:0 14px 14px 0}
.vasu-service-page .vasu-service-editorial-intro p,.vasu-service-page .vasu-service-editorial-approach p{font-size:clamp(16px,1.25vw,18px);line-height:1.85;color:#354b50;margin:0}
.vasu-service-page .vasu-service-editorial-eyebrow{display:block;font-size:11px;font-weight:800;letter-spacing:.18em;color:#a78245;margin-bottom:13px;text-transform:uppercase}
.vasu-service-page .vasu-service-editorial-focus{margin:32px 0;padding:30px;border:1px solid rgba(180,143,78,.23);border-radius:18px;background:#fff;box-shadow:0 12px 34px rgba(0,53,65,.04)}
.vasu-service-page .vasu-service-editorial-focus h3,.vasu-service-page .vasu-service-editorial-approach h3{font-family:Georgia,serif;font-size:clamp(27px,2.6vw,38px);font-weight:500;line-height:1.2;color:#063f4b;margin:0 0 22px}
.vasu-service-page .vasu-service-editorial-points{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.vasu-service-page .vasu-service-editorial-point{display:flex;align-items:flex-start;gap:12px;padding:17px;background:#f8f6f1;border-radius:11px;color:#28464d;line-height:1.6;font-size:15px}
.vasu-service-page .vasu-service-editorial-point span{flex:0 0 auto;color:#b48f4e;font-weight:800}
.vasu-service-page .vasu-service-editorial-approach{margin:30px 0 36px;padding:28px 30px;border-top:1px solid rgba(180,143,78,.35);border-bottom:1px solid rgba(180,143,78,.35)}
@media(max-width:767px){.vasu-service-page .vasu-service-editorial-points{grid-template-columns:1fr}.vasu-service-page .vasu-service-editorial-focus,.vasu-service-page .vasu-service-editorial-approach{padding:22px 18px}.vasu-service-page .vasu-service-editorial-intro{padding:20px}}
/* VASUPRIY SERVICE EDITORIAL CONTENT END */
'@
try {
  $jsxPath = (Resolve-Path $jsxFile).Path
  $cssPath = (Resolve-Path $cssFile).Path
  $jsx = [System.IO.File]::ReadAllText($jsxPath)
  $css = [System.IO.File]::ReadAllText($cssPath)
  $anchor = 'function ServiceDetail() {'
  if (!$jsx.Contains('const serviceEditorial = ')) {
    if (!$jsx.Contains($anchor)) { throw 'ServiceDetail function not found.' }
    $jsx = $jsx.Replace($anchor, $editorial + "`r`n" + $anchor)
  }
  $leadAnchor = '            {selectedImages.length > 0 && ('
  $introBlock = @'
            {serviceEditorial[selected.title] && (
              <div className="vasu-service-editorial-intro">
                <span className="vasu-service-editorial-eyebrow">A CLOSER LOOK</span>
                <p>{serviceEditorial[selected.title].intro}</p>
              </div>
            )}

'@
  if (!$jsx.Contains('className="vasu-service-editorial-intro"')) {
    if (!$jsx.Contains($leadAnchor)) { throw 'Image gallery anchor not found.' }
    $jsx = $jsx.Replace($leadAnchor, $introBlock + $leadAnchor)
  }
  $dividerAnchor = '            <div className="vasu-service-content-divider" />'
  $detailsBlock = @'
            {serviceEditorial[selected.title] && (
              <>
                <section className="vasu-service-editorial-focus">
                  <span className="vasu-service-editorial-eyebrow">THE DETAILS THAT MATTER</span>
                  <h3>What We Focus On</h3>
                  <div className="vasu-service-editorial-points">
                    {serviceEditorial[selected.title].highlights.map((point, index) => (
                      <div className="vasu-service-editorial-point" key={point}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <div>{point}</div>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="vasu-service-editorial-approach">
                  <span className="vasu-service-editorial-eyebrow">OUR APPROACH</span>
                  <h3>Designed Around Your Requirements</h3>
                  <p>{serviceEditorial[selected.title].approach}</p>
                </section>
              </>
            )}

'@
  if (!$jsx.Contains('className="vasu-service-editorial-focus"')) {
    if (!$jsx.Contains($dividerAnchor)) { throw 'Content divider anchor not found.' }
    $jsx = $jsx.Replace($dividerAnchor, $detailsBlock + $dividerAnchor)
  }
  $cssStart = '/* VASUPRIY SERVICE EDITORIAL CONTENT START */'
  $cssEnd = '/* VASUPRIY SERVICE EDITORIAL CONTENT END */'
  if ($css.Contains($cssStart)) {
    $a = $css.IndexOf($cssStart)
    $b = $css.IndexOf($cssEnd, $a)
    if ($b -lt 0) { throw 'CSS end marker missing.' }
    $css = $css.Substring(0, $a) + $style + $css.Substring($b + $cssEnd.Length)
  } else { $css += "`r`n`r`n" + $style + "`r`n" }
  [System.IO.File]::WriteAllText($jsxPath, $jsx, $utf8)
  [System.IO.File]::WriteAllText($cssPath, $css, $utf8)
  npm run build
  if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
  Write-Host 'SUCCESS: All 20 service detail content blocks added.' -ForegroundColor Green
  Write-Host "Backups: $jsxBackup and $cssBackup"
} catch {
  Copy-Item -LiteralPath $jsxBackup -Destination $jsxFile -Force
  Copy-Item -LiteralPath $cssBackup -Destination $cssFile -Force
  Write-Host 'Files restored from backup.' -ForegroundColor Yellow
  throw
}
