/* VASUPRIY_GALLERY_CLIENT_162_V1 */
import clientPhotos from './gallerySpaceMakeover.json'

export const galleryCategories = [
  'All Projects',
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Washroom',
  'Office',
  'Puja Room',
  'Stairs',
  'Pergola',
  'Cafe / Restaurant / Salon',
]

export const galleryItems = clientPhotos

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
