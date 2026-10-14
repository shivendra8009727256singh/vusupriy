export const chandelierImages = Array.from(
  { length: 20 },
  (_, index) => {
    const number = String(index + 1).padStart(2, '0')

    const extension = [1, 3, 6, 10, 11].includes(index + 1)
      ? 'jpg'
      : 'png'

    return `/images/lighting/chandeliers/chandelier-${number}.${extension}`
  }
)