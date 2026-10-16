// Regenerates src/data/galleryItems.js from the 5 renamed photo folders.
// Run: node scripts/generate-gallery.mjs
// Titles describe generic design concepts — never claimed client projects.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createHash } from 'node:crypto'

const ASSETS_DIR = 'src/assets/vasupriy-interior-images-renamed'

const FOLDERS = [
  {
    folder: 'cafe-interiors',
    label: 'Cafe Interiors',
    description:
      'Cafe and hospitality interiors from our curated collection.',
  },
  {
    folder: 'commercial-interior-renders',
    label: 'Commercial Interiors',
    description:
      'Commercial interiors exploring light, material and volume.',
  },
  {
    folder: 'commercial-site-photos',
    label: 'Commercial Site',
    description:
      'On-site commercial spaces captured during real project stages.',
  },
  {
    folder: 'residential-interior-renders',
    label: 'Residential Interior',
    description:
      'Residential interiors balancing comfort and character.',
  },
  {
    folder: 'residential-site-photos',
    label: 'Residential Site',
    description:
      'Real residential spaces photographed on site and in detail.',
  },
]

const titleCase = (slug) =>
  slug
    .replace(/-\d+$/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

// VASUPRIY_GALLERY_UNIQUE_HASH_V1: Avoid repeated photos, even with different filenames.
const seenHashes = new Set()
const items = []
for (const { folder, label, description } of FOLDERS) {
  const files = readdirSync(join(ASSETS_DIR, folder))
    .filter((file) => file.endsWith('.jpg'))
    .sort()
  for (const file of files) {
    const hash = createHash('sha256')
      .update(readFileSync(join(ASSETS_DIR, folder, file)))
      .digest('hex')
    if (seenHashes.has(hash)) continue
    seenHashes.add(hash)
    const base = file.replace(/\.jpg$/, '')
    items.push({
      id: `${folder}-${base}`,
      title: titleCase(base),
      category: label,
      image: `../assets/vasupriy-interior-images-renamed/${folder}/${file}`,
      imageAlt: `${titleCase(base)} — ${label.toLowerCase()} interior photograph`,
      description,
    })
  }
}

// Give distinct images distinct visible titles without inventing project names.
const titleTotals = new Map()
for (const item of items) {
  titleTotals.set(item.title, (titleTotals.get(item.title) ?? 0) + 1)
}
const titleSequence = new Map()
for (const item of items) {
  const baseTitle = item.title
  if ((titleTotals.get(baseTitle) ?? 0) > 1) {
    const next = (titleSequence.get(baseTitle) ?? 0) + 1
    titleSequence.set(baseTitle, next)
    item.title = `${baseTitle} â€” View ${String(next).padStart(2, '0')}`
    item.imageAlt = `${item.title} â€” ${item.category.toLowerCase()} interior photograph`
  }
}

// VASUPRIY_GALLERY_VISUAL_TITLES_V1 - Reviewed against image thumbnails.
// Keep this mapping after duplicate filtering and generic title numbering.
// It assigns photo-specific titles without changing original asset filenames.
const visualTitles = new Map([
  ['cafe-ambient-lighting-06.jpg', 'Cafe Bar with Checkerboard Flooring'],
  ['cafe-ambient-lighting-14.jpg', 'Golden Accent Wall and Cafe Lounge'],
  ['cafe-dining-space-08.jpg', 'Checkerboard Cafe Service Island'],
  ['cafe-dining-space-16.jpg', 'Cafe Booths beneath Woven Canopy'],
  ['cafe-feature-wall-05.jpg', 'Arched Cafe Dining with Timber Ceiling'],
  ['cafe-feature-wall-13.jpg', 'Twin Service Counters in Modern Cafe'],
  ['cafe-interior-checkered-floor-01.jpg', 'Illuminated Wall Niches in Cafe'],
  ['cafe-interior-checkered-floor-09.jpg', 'Curtained Booth Seating by Window'],
  ['cafe-interior-wood-ceiling-02.jpg', 'Muted Green Coffered Cafe Ceiling'],
  ['cafe-interior-wood-ceiling-10.jpg', 'Timber Display Shelves and Cafe Seating'],
  ['cafe-reception-counter-03.jpg', 'Arched Alcove Cafe Seating'],
  ['cafe-reception-counter-11.jpg', 'Long Cafe Aisle with Yellow Accents'],
  ['cafe-seating-and-plants-04.jpg', 'Triple Arch Cafe Dining Alcoves'],
  ['cafe-seating-and-plants-12.jpg', 'Geometric Wall Art above Banquettes'],
  ['cafe-wooden-wall-panels-07.jpg', 'Checkerboard Cafe and Window Lounge'],
  ['cafe-wooden-wall-panels-15.jpg', 'Hanging Woven Decor over Cafe Bar'],
  ['cafe-architectural-details-06.jpg', 'Narrow Cafe Dining with Sculptural Wall'],
  ['cafe-architectural-details-12.jpg', 'Marble Cafe Counter with Backlit Shelves'],
  ['cafe-ceiling-lighting-22.jpg', 'Sculptural Cafe Ceiling and Warm Lights'],
  ['cafe-ceiling-lighting-26.jpg', 'Textured Buddha Wall in Daylit Cafe'],
  ['cafe-ceiling-lighting-30.jpg', 'Cafe Nook beneath Timber Staircase'],
  ['cafe-ceiling-lighting-34.jpg', 'Split Level Cafe with Display Shelving'],
  ['cafe-ceiling-lighting-38.jpg', 'Warm Cafe Stairwell and Mural Wall'],
  ['cafe-counter-and-pendant-lights-02.jpg', 'Compact Cafe Counter with Organic Lighting'],
  ['cafe-counter-and-pendant-lights-08.jpg', 'Cafe Dining beneath Wall Sculptures'],
  ['cafe-counter-design-20.jpg', 'Textured Cafe Wall with Bench Seating'],
  ['cafe-counter-design-24.jpg', 'Narrow Cafe Interior with Lit Arches'],
  ['cafe-counter-design-28.jpg', 'Backlit Ember Cafe Bar Counter'],
  ['cafe-dining-seating-05.jpg', 'Sculpture Display beside Cafe Seating'],
  ['cafe-feature-wall-03.jpg', 'Curved Reception Desk with Relief Wall'],
  ['cafe-feature-wall-09.jpg', 'Staircase Cafe with Decorative Wall Panels'],
  ['cafe-seating-layout-21.jpg', 'Warm Cafe Lounge with Marble Counter'],
  ['cafe-seating-layout-25.jpg', 'Glowing Reception Wall and Dining Booths'],
  ['cafe-seating-layout-29.jpg', 'Neutral Cafe with Wall Mural Panels'],
  ['cafe-wall-art-19.jpg', 'Cafe Seating below Staircase'],
  ['cafe-wall-art-23.jpg', 'Cafe Stairwell with Illuminated Shelves'],
  ['cafe-wall-art-27.jpg', 'Arched Wall Niches and Banquette Dining'],
  ['cafe-wall-art-31.jpg', 'Glass Display with Artistic Wall Relief'],
  ['colorful-restaurant-interior-39.jpg', 'Timber Lattice Divider in Restaurant'],
  ['colorful-restaurant-interior-43.jpg', 'Colorful Restaurant with Display Staircase'],
  ['colorful-restaurant-interior-47.jpg', 'Decorative Restaurant Stair and Wall Art'],
  ['luxury-cafe-staircase-01.jpg', 'Tall Cafe Staircase with Glowing Ceiling'],
  ['restaurant-ceiling-design-41.jpg', 'Framed Floral Art in Restaurant Dining'],
  ['restaurant-ceiling-design-45.jpg', 'Bright Restaurant with Ceiling Color Accents'],
  ['restaurant-checkered-floor-73.jpg', 'Cafe Wall Niches with Rattan Chairs'],
  ['restaurant-dining-area-42.jpg', 'Narrow Restaurant Dining beside Staircase'],
  ['restaurant-dining-area-46.jpg', 'Colorful Restaurant Feature Wall'],
  ['restaurant-dining-seating-74.jpg', 'Arched Restaurant Booths with Wood Ceiling'],
  ['restaurant-feature-ceiling-71.jpg', 'Checkerboard Corridor and Cafe Booths'],
  ['restaurant-reception-counter-76.jpg', 'Triple Arch Booth Dining Area'],
  ['restaurant-wall-decor-40.jpg', 'Restaurant Banquette with Art Gallery Wall'],
  ['restaurant-wall-decor-44.jpg', 'Timber Lattice Restaurant Mezzanine'],
  ['restaurant-wall-decor-48.jpg', 'Traditional Cafe Counter with Open Shelves'],
  ['cafe-green-accent-wall-16.jpg', 'Mint Green Cafe with Arched Mirrors'],
  ['cafe-green-accent-wall-19.jpg', 'Cafe Dining with Green Feature Wall'],
  ['cafe-green-accent-wall-22.jpg', 'Modern Shop Counter under Linear Lights'],
  ['cafe-seating-interior-15.jpg', 'Narrow Cafe with Green Upholstered Bench'],
  ['cafe-seating-interior-18.jpg', 'Green LED Feature Wall by Cafe Tables'],
  ['cafe-seating-interior-21.jpg', 'Arched Mirror Wall with Cafe Seating'],
  ['cafe-service-counter-17.jpg', 'Green Banquette Dining and Shelved Counter'],
  ['cafe-service-counter-20.jpg', 'Cafe Service Counter with Green Arches'],
  ['commercial-ceiling-lighting-08.jpg', 'Commercial Hall with Zigzag LED Ceiling'],
  ['commercial-ceiling-lighting-11.jpg', 'Under Construction Space with Linear Lighting'],
  ['commercial-ceiling-lighting-14.jpg', 'Finished Gym with Green Feature Wall'],
  ['gym-interior-construction-07.jpg', 'Timber Floor Installation in Gym Hall'],
  ['gym-interior-construction-10.jpg', 'Gym Interior with Green Balloon Decor'],
  ['gym-interior-construction-13.jpg', 'Fitness Studio during Equipment Setup'],
  ['interior-renovation-in-progress-06.jpg', 'Gym Corridor during Floor Renovation'],
  ['interior-renovation-in-progress-12.jpg', 'Gym Equipment Installation and Site Work'],
  ['modern-commercial-space-interior-01.jpg', 'Fitness Reception with Bold Green Columns'],
  ['modern-commercial-space-interior-02.jpg', 'Fitness Hall with Geometric Accent Pillars'],
  ['modern-commercial-space-interior-03.jpg', 'Modern Fitness Floor with Timber Finish'],
  ['modern-commercial-space-interior-04.jpg', 'Workout Hall with Black Acoustic Ceiling'],
  ['modern-commercial-space-interior-05.jpg', 'Green Column Fitness Studio Entrance'],
  ['contemporary-interior-52.jpg', 'Timber Lattice and Colorful Restaurant Accents'],
  ['contemporary-interior-56.jpg', 'Luxury Open Plan Lounge with Ceiling Chandelier'],
  ['designer-ceiling-50.jpg', 'Contemporary Lounge with Statement Chandelier'],
  ['designer-ceiling-54.jpg', 'Minimalist Sofa Lounge beside Tall Windows'],
  ['elegant-living-room-13.jpg', 'Neutral Living Room with Layered Ceiling'],
  ['elegant-living-room-14.jpg', 'Classic Lounge with Wall Mounted Television'],
  ['elegant-living-room-15.jpg', 'Panelled Bedroom Television Feature Wall'],
  ['elegant-living-room-16.jpg', 'Elegant Bedroom with Wall Mounted Television'],
  ['elegant-living-room-17.jpg', 'Light Bedroom with Double Door Wardrobes'],
  ['elegant-living-room-18.jpg', 'Neutral Bedroom with Upholstered Headboard'],
  ['modern-living-room-49.jpg', 'Contemporary Corporate Reception with Timber Desk'],
  ['modern-living-room-53.jpg', 'Modern Waiting Lounge with Wall Wash Lighting'],
  ['premium-wall-panels-51.jpg', 'Red Banquette beneath Gallery Wall Art'],
  ['premium-wall-panels-55.jpg', 'Corporate Reception beneath Timber Slat Canopy'],
  ['bedroom-ambient-lighting-30.jpg', 'Bedroom with Warm Cove Lighting'],
  ['bedroom-ambient-lighting-34.jpg', 'Bedroom with Glossy Dark Timber Wall'],
  ['bedroom-ambient-lighting-38.jpg', 'Warm Bedroom with Floating TV Console'],
  ['bedroom-ambient-lighting-42.jpg', 'Floor to Ceiling Bedroom Wardrobes'],
  ['bedroom-false-ceiling-28.jpg', 'Triangular Cove Lighting above Bedroom'],
  ['bedroom-false-ceiling-32.jpg', 'Dark Wood Bedroom Corridor with Wardrobes'],
  ['bedroom-false-ceiling-36.jpg', 'Bedroom with Wood Ceiling and Soft Cove Lights'],
  ['bedroom-false-ceiling-40.jpg', 'Soft Lit Bedroom with Panelled Ceiling'],
  ['bedroom-wall-paneling-29.jpg', 'Bedroom with Sloped Ceiling Cove Detail'],
  ['bedroom-wall-paneling-33.jpg', 'Bedroom Dressing Wall with Floating Console'],
  ['bedroom-wall-paneling-37.jpg', 'Bedroom with Angular Ceiling and Blush Bedding'],
  ['bedroom-wall-paneling-41.jpg', 'Blue Sofa beside Decorative Wall Panel'],
  ['interior-staircase-design-23.jpg', 'Staircase with Illuminated Floating Steps'],
  ['interior-staircase-design-24.jpg', 'Timber and Marble Stairwell Detail'],
  ['interior-staircase-design-25.jpg', 'Decorative Circular Feature Wall by Staircase'],
  ['interior-staircase-design-26.jpg', 'Glass Balustrade with Marble Accent Wall'],
  ['living-room-ceiling-lighting-44.jpg', 'Living Room with Linear Timber Ceiling'],
  ['living-room-ceiling-lighting-48.jpg', 'Blue Sofa Lounge with Curtain Wall'],
  ['living-room-ceiling-lighting-52.jpg', 'Contemporary Lounge with Central Chandelier'],
  ['living-room-ceiling-lighting-56.jpg', 'Warm Ceiling Coves over Modern Living Space'],
  ['living-room-ceiling-lighting-60.jpg', 'TV Lounge with Textured Feature Panels'],
  ['living-room-feature-wall-45.jpg', 'Blue Accent Living Room with Wall Artwork'],
  ['living-room-feature-wall-49.jpg', 'Marble Console Wall beside Lounge Seating'],
  ['living-room-feature-wall-53.jpg', 'Open Plan Lounge with Chandelier and Staircase'],
  ['living-room-feature-wall-57.jpg', 'Illuminated Display Shelf by Stairwell'],
  ['living-room-feature-wall-61.jpg', 'Neutral TV Lounge with Modern Sofas'],
  ['modern-bedroom-interior-27.jpg', 'Decorative Circular Wall Detail by Staircase'],
  ['modern-bedroom-interior-31.jpg', 'White Panelled Bedroom Entrance'],
  ['modern-bedroom-interior-35.jpg', 'Warm Wood Bedroom with Feature Storage Wall'],
  ['modern-bedroom-interior-39.jpg', 'Bedroom with Dark Wardrobe and Ceiling Fan'],
  ['modern-living-room-43.jpg', 'Pink Bedspread in Panelled Bedroom'],
  ['modern-living-room-47.jpg', 'Living Room with Stone Feature Coffee Table'],
  ['modern-living-room-51.jpg', 'Marble TV Wall with Plush Sofas'],
  ['modern-living-room-55.jpg', 'Lounge with Blue Pendant Chandelier'],
  ['modern-living-room-59.jpg', 'Modern Lounge with Angular Ceiling Detail'],
  ['residential-interior-details-46.jpg', 'Blue Upholstered Sitting Area with Timber Ceiling'],
  ['residential-interior-details-50.jpg', 'Textured Sofa Wall and Contemporary TV Lounge'],
  ['residential-interior-details-54.jpg', 'Elegant Lounge with Ceiling Feature Light'],
  ['residential-interior-details-58.jpg', 'Living Room with Wall Art and Corner Sofa'],
])
for (const item of items) {
  const filename = item.image.split('/').pop()
  const title = visualTitles.get(filename)
  if (!title) throw new Error(`Missing reviewed gallery title for ${filename}`)
  item.title = title
  item.imageAlt = `${title} - ${item.category.toLowerCase()} photograph`
  item.description = `A curated look at ${title.toLowerCase()}, highlighting the details and atmosphere of the space.`
}
if (items.length !== visualTitles.size) {
  throw new Error(`Expected ${visualTitles.size} unique images, found ${items.length}`)
}const ids = items.map((item) => item.id)
if (new Set(ids).size !== ids.length) {
  throw new Error('Duplicate gallery ids detected')
}

const entry = (item) => `  {
    id: '${item.id}',
    title: '${item.title.replace(/'/g, "\\'")}',
    category: '${item.category}',
    image: new URL(
      '${item.image}',
      import.meta.url,
    ).href,
    imageAlt: '${item.imageAlt.replace(/'/g, "\\'")}',
    description: '${item.description}',
  },`

const output = `// Curated gallery content for the Vasupriy Interiovilla Gallery page.
// AUTO-GENERATED by scripts/generate-gallery.mjs — do not edit by hand.
// Titles describe generic design concepts — they are not claimed client projects.
// Images resolve through Vite so this data also works in the Node test runner.

export const galleryCategories = [
  'All Projects',
${FOLDERS.map((entry) => `  '${entry.label}',`).join('\n')}
]

export const galleryItems = [
${items.map(entry).join('\n')}
]

export function filterGalleryItems(items, category = 'All Projects') {
  if (!category || category === 'All Projects') return items
  return items.filter((item) => item.category === category)
}

export function getGalleryItem(id) {
  return galleryItems.find((item) => item.id === id)
}

/* Compact page window: first two, last two and neighbours of the
   current page, with an ellipsis wherever pages are skipped. */
export function getPageWindow(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }
  const keep = new Set([1, 2, total - 1, total, current - 1, current, current + 1])
  const numbers = [...keep]
    .filter((number) => number >= 1 && number <= total)
    .sort((a, b) => a - b)
  const window = []
  let previous = 0
  for (const number of numbers) {
    if (number - previous > 1) window.push('…')
    window.push(number)
    previous = number
  }
  return window
}
`

writeFileSync('src/data/galleryItems.js', output.replace(/(title:\s*'[^'\r\n]*?)\s+\S+\s+(View\s+\d{2}')/g, '$1 - $2'))
console.log(`Wrote ${items.length} gallery items across ${FOLDERS.length} categories.`)
