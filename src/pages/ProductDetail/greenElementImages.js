
// Optimized client-supplied Green Element collection.

// Artificial Grass Flooring — 26 images
export const artificialGrassImages = Array.from({ length: 26 }, (_, index) =>
  `/images/green-element-client/artificial-grass-${String(index + 1).padStart(2, '0')}.webp`
)

// Vertical Garden — 16 images
export const verticalGardenImages = Array.from({ length: 16 }, (_, index) =>
  `/images/green-element-client/vertical-garden-${String(index + 1).padStart(2, '0')}.webp`
)

// Artificial Plant and Tree — 37 images
// VASUPRIY_ARTIFICIAL_PLANT_HIDE_PRICE_IMAGES_V1
// Hide images 18-26 without deleting source files.
export const artificialPlantImages = Array.from(
  { length: 37 },
  (_, index) => index + 1
)
  .filter(number => number < 18 || number > 26)
  .map(number =>
    `/images/green-element-client/artificial-plant-${String(number).padStart(2, '0')}.webp`
  )

// Natural Garden — 4 client-supplied images
export const naturalGardenImages = Array.from({ length: 4 }, (_, index) =>
  `/images/green-element-client/natural-garden-${String(index + 1).padStart(2, '0')}.jpeg`
)
