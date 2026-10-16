import { artificialGrassImages, verticalGardenImages, artificialPlantImages, naturalGardenImages } from './greenElementImages'
import { inlayStoneImages } from './inlayStoneImages'
import { carpetTileImages } from './carpetTileImages'
import { concreteImages } from './concreteImages'
import { sheetImages } from './sheetImages'
import { wallMouldingImages } from './wallMouldingImages'
import { wallpaperImages } from './wallpaperImages'
import { wallPanelImages } from './wallPanelImages'
import { laminateFinishes, laminateDetails } from './laminateFinishes'
import { deckFinishes } from './deckFinishes'
import { woodenFinishes } from './woodenFinishes'
import { imagesForProduct } from '../InteriorProducts/productImageMap'
import { spcFinishes } from './spcFinishes'
import { chandelierImages } from './chandelierImages'

export const productCategories = [
  { id: 'flooring', name: 'Flooring Styling', subtitle: 'Beautiful foundations for extraordinary spaces', groups: [
    ['Flooring & Finishes', ['European Laminate','SPC Flooring','Wooden Deck Flooring','Deck Flooring','WPC Deck Flooring','Carpet Tiles Flooring','Artificial Grass Flooring','Epoxy Flooring','Handmade Rugs']]
  ] },
  { id: 'green', name: 'Green Element', subtitle: 'A natural expression of modern living', groups: [
    ['Green Living', ['Artificial Grass Flooring','Vertical Garden','Artificial Plant and Tree','Natural Garden']]
  ] },
  { id: 'lighting', name: 'Enlightenment Options', subtitle: 'Create an atmosphere worth remembering', groups: [
    ['Indoor & Outdoor Lights', ['Chandeliers','Garden Light','Ceiling Light','Pole Light','Wall Lamps','Down Light','Focus Light']]
  ] },
  { id: 'walls', name: 'Wall Makeover Products', subtitle: 'Surfaces with a point of view', groups: [
    ['Wallpaper', ['Non-Woven Wallpaper','Customized Design Wallpaper','Fabric Wallpaper']],
    ['Wall Moulding', ['Wall Moulding']],
    ['Wall Panels', ['WPC Panels','PVC Panels','Charcoal Metallic Panels','3D CNC Cutting Wall Panels','FRP Wall Panels','MDF Wall Panels']],
    ['Sheets', ['Texture Sheet','Fluted Acrylic Sheet','Natural Cork Sheet']],
    ['Concrete Work', ['Concrete Work (Walls & Outer Building Settings)']],
    ['Tiles & Inlay', ['Mosaic Tiles (Metal & Glass)','3D Self-Adhesive Tiles','Highlighter Tiles','Stone & Inlay Work on Walls']]
  ] }
]
export const slugify = name => name.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')

export const catalogue = productCategories.flatMap(category => category.groups.flatMap(([group, names]) => names.map(name => ({
 category:category.id, categoryName:category.name, group, name, slug:slugify(name), url:`/products/${category.id}/${slugify(name)}`,
 images: name === 'Chandeliers' ? chandelierImages : name === 'Stone & Inlay Work on Walls' ? inlayStoneImages : name === 'Carpet Tiles Flooring' ? carpetTileImages : concreteImages[name] ? concreteImages[name] : sheetImages[name] ? sheetImages[name] : wallMouldingImages[name] ? wallMouldingImages[name] : wallpaperImages[name] ? wallpaperImages[name] : wallPanelImages[name] ? wallPanelImages[name] : name === 'European Laminate' ? [...laminateFinishes.flatMap(f => f.images), ...laminateDetails] : name === 'Deck Flooring' ? deckFinishes.flatMap(f => f.images) : name === 'Wooden Deck Flooring' ? woodenFinishes.flatMap(f => f.images) : name === 'SPC Flooring' ? spcFinishes.flatMap(f => f.images) : name === 'Artificial Grass Flooring' ? artificialGrassImages
: name === 'Vertical Garden' ? verticalGardenImages
: name === 'Artificial Plant and Tree' ? artificialPlantImages
: name === 'Natural Garden' ? naturalGardenImages
: imagesForProduct(name),
 finishes:name === 'European Laminate' ? laminateFinishes : name === 'Deck Flooring' ? deckFinishes : name === 'Wooden Deck Flooring' ? woodenFinishes : name === 'SPC Flooring' ? spcFinishes : [],
 description:`Explore ${name.toLowerCase()} for carefully considered residential and commercial spaces. Our team can help you identify suitable styles, finishes and applications for your project.`,
 specifications:[['Product family',category.name],['Material / finish', 'Confirm available options with our team'],['Dimensions & thickness','Available on request'],['Installation guidance','Discuss with our specialists'],['Availability & pricing','Request a quotation']]
}))))
export const findProduct = (category,slug) => catalogue.find(p => p.category === category && p.slug === slug)
