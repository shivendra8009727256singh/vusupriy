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
  'Natural Cork Sheet': ['/images/wall-makeover/wall-reference-12.jpg'],
  'Concrete Work (Walls & Outer Building Settings)': ['/images/wall-makeover/wall-reference-13.jpg'],
  'Mosaic Tiles (Metal & Glass)': ['/images/wall-makeover/wall-reference-14.jpg'],
  '3D Self-Adhesive Tiles': ['/images/wall-makeover/wall-reference-15.jpg'],
  'Elegant Wall & Flooring Tiles': ['/images/wall-makeover/wall-reference-16.jpg'],
  'Highlighter Tiles': ['/images/wall-makeover/wall-reference-17.jpg'],
  'Stone & Inlay Work on Walls': ['/images/wall-makeover/wall-reference-18.jpg'],
  'European Laminate': productImages.laminate,
  'SPC Flooring': productImages.spc,
  'Wooden Deck Flooring': productImages.wood,
  'WPC Deck Flooring': productImages.deck,
  'Carpet Tiles Flooring': productImages.carpet,
  'Artificial Grass Flooring': productImages.green.slice(1, 2),
  'Epoxy Flooring': productImages.epoxy,
  'Handmade Rugs': productImages.rug,
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
