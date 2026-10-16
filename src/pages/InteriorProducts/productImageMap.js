import productImages from './productImages.json'

// Explicit product references only. Never use a different product's image as fallback.
// The five existing greenery images are split into non-overlapping sets.
export const productImageMap = {
  'Non-Woven Wallpaper': ['/images/wall-makeover/wall-reference-01.jpg'],
  'Customized Design Wallpaper': ['/images/wall-makeover/wall-reference-02.jpg'],
  'Fabric Wallpaper': ['/images/wall-makeover/wall-reference-03.jpg'],
  'WPC Panels': ['/images/wall-makeover/wall-reference-04.jpg'],
  'PVC Panels': ['/images/wall-makeover/wall-reference-05.jpg'],
  'Charcoal Metallic Panels': ['/images/wall-makeover/wall-reference-06.jpg'],
  '3D CNC Cutting Wall Panels': ['/images/wall-makeover/wall-reference-07.jpg'],
  'FRP Wall Panels': ['/images/wall-makeover/wall-reference-08.jpg'],
  'MDF Wall Panels': ['/images/wall-makeover/wall-reference-09.jpg'],
  'Texture Sheet': ['/images/wall-makeover/wall-reference-10.jpg'],
  'Fluted Acrylic Sheet': ['/images/wall-makeover/wall-reference-11.jpg'],
  'Natural Cork Sheet': ['/images/products/walls/natural-cork-sheet/cork-sheet-01.png', '/images/products/walls/natural-cork-sheet/cork-sheet-02.png', '/images/products/walls/natural-cork-sheet/cork-sheet-03.png', '/images/products/walls/natural-cork-sheet/cork-sheet-04.jpg', '/images/products/walls/natural-cork-sheet/cork-sheet-05.jpg', '/images/products/walls/natural-cork-sheet/cork-sheet-06.jpg', '/images/products/walls/natural-cork-sheet/cork-sheet-07.jpg'],
  'Concrete Work (Walls & Outer Building Settings)': ['/images/wall-makeover/wall-reference-13.jpg'],
  'Mosaic Tiles (Metal & Glass)': ['/images/products/walls/mosaic-metal-glass-client/mosaic-01.jpg', '/images/products/walls/mosaic-metal-glass-client/mosaic-02.jpg', '/images/products/walls/mosaic-metal-glass-client/mosaic-03.jpg', '/images/products/walls/mosaic-metal-glass-client/mosaic-04.jpg', '/images/products/walls/mosaic-metal-glass-client/mosaic-05.jpg', '/images/products/walls/mosaic-metal-glass-client/mosaic-06.jpg', '/images/products/walls/mosaic-metal-glass-client/mosaic-07.jpg', '/images/products/walls/mosaic-metal-glass-client/mosaic-08.jpg', '/images/products/walls/mosaic-metal-glass-client/mosaic-09.jpg', '/images/products/walls/mosaic-metal-glass-client/mosaic-10.jpg', '/images/products/walls/mosaic-metal-glass-client/mosaic-11.jpg', '/images/products/walls/mosaic-metal-glass-client/mosaic-12.jpg'],
  '3D Self-Adhesive Tiles': ['/images/wall-makeover/wall-reference-15.jpg'],
  'Elegant Wall & Flooring Tiles': ['/images/wall-makeover/wall-reference-16.jpg'],
  'Highlighter Tiles': ['/images/products/walls/highlighter-tiles-client/highlighter-01.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-02.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-03.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-04.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-05.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-06.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-07.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-08.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-09.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-10.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-11.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-12.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-13.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-14.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-15.jpg', '/images/products/walls/highlighter-tiles-client/highlighter-16.jpg'],
  'Stone & Inlay Work on Walls': ['/images/inlay-stone-client/inlay-stone-01.webp'],
  'European Laminate': productImages.laminate,
  'SPC Flooring': productImages.spc,
  'Wooden Deck Flooring': productImages.wood,
  'WPC Deck Flooring': productImages.deck,
  'Carpet Tiles Flooring': ['/images/carpet-tiles-client/carpet-tile-01.webp'],
  'Artificial Grass Flooring': productImages.green.slice(1, 2),
  'Epoxy Flooring': ['/images/products/flooring/epoxy-flooring-client/epoxy-flooring-01.png', '/images/products/flooring/epoxy-flooring-client/epoxy-flooring-02.png', '/images/products/flooring/epoxy-flooring-client/epoxy-flooring-03.png', '/images/products/flooring/epoxy-flooring-client/epoxy-flooring-04.png', '/images/products/flooring/epoxy-flooring-client/epoxy-flooring-05.png', '/images/products/flooring/epoxy-flooring-client/epoxy-flooring-06.png', '/images/products/flooring/epoxy-flooring-client/epoxy-flooring-07.png', '/images/products/flooring/epoxy-flooring-client/epoxy-flooring-08.png', '/images/products/flooring/epoxy-flooring-client/epoxy-flooring-09.png', '/images/products/flooring/epoxy-flooring-client/epoxy-flooring-10.jpg'],
  'Handmade Rugs': ['/images/products/flooring/handmade-rugs-client/rug-01.png', '/images/products/flooring/handmade-rugs-client/rug-02.png', '/images/products/flooring/handmade-rugs-client/rug-03.png', '/images/products/flooring/handmade-rugs-client/rug-04.png', '/images/products/flooring/handmade-rugs-client/rug-05.png', '/images/products/flooring/handmade-rugs-client/rug-06.png', '/images/products/flooring/handmade-rugs-client/rug-07.png', '/images/products/flooring/handmade-rugs-client/rug-08.png', '/images/products/flooring/handmade-rugs-client/rug-09.png', '/images/products/flooring/handmade-rugs-client/rug-10.png', '/images/products/flooring/handmade-rugs-client/rug-11.png', '/images/products/flooring/handmade-rugs-client/rug-12.png', '/images/products/flooring/handmade-rugs-client/rug-13.png'],
  'Vertical Garden': productImages.green.slice(0, 1),
  'Artificial Plant and Tree': productImages.green.slice(2, 3),
  'Chandeliers': productImages.chandeliers,
  'Garden Light': productImages.gardenLights,
  'Ceiling Light': productImages.ceilingLights,
  'Pole Light': productImages.poleLights,
  'Wall Lamps': productImages.wallLamps,
  'Down Light': productImages.downLights,
  'Focus Light': productImages.focusLights,
}

export const imagesForProduct = name => (productImageMap[name] || []).filter(Boolean)

// These are design-inspiration photographs, not verified material/product samples.
export const wallReferenceProductNames = new Set(["Non-Woven Wallpaper", "Customized Design Wallpaper", "Fabric Wallpaper", "WPC Panels", "PVC Panels", "Charcoal Metallic Panels", "3D CNC Cutting Wall Panels", "FRP Wall Panels", "MDF Wall Panels", "Texture Sheet", "Fluted Acrylic Sheet", "Natural Cork Sheet", "Concrete Work (Walls & Outer Building Settings)", "Mosaic Tiles (Metal & Glass)", "3D Self-Adhesive Tiles", "Elegant Wall & Flooring Tiles", "Highlighter Tiles", "Stone & Inlay Work on Walls"])
