// Optimized client-supplied Green Element collection.

// Natural Garden has no supplied images and is intentionally not mapped.

export const artificialGrassImages = Array.from({ length: 26 }, (_, index) =>
  `/images/green-element-client/artificial-grass-${String(index + 1).padStart(2, '0')}.webp`
)

export const verticalGardenImages = Array.from({ length: 16 }, (_, index) =>
  `/images/green-element-client/vertical-garden-${String(index + 1).padStart(2, '0')}.webp`
)

export const artificialPlantImages = Array.from({ length: 37 }, (_, index) =>
  `/images/green-element-client/artificial-plant-${String(index + 1).padStart(2, '0')}.webp`
)
