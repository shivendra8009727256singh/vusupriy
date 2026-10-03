import mirrorGlazing from '../../assets/images/home/products/mirror-glazing.png'
import doorsWindows from '../../assets/images/home/products/doors-windows.png'
import curtainsBlinds from '../../assets/images/home/products/curtains-blinds.png'
import customizedProducts from '../../assets/images/home/products/customized-products.png'

export const interiorProducts = [
  {
    number: '01',
    title: 'Mirror & Glazing',
    supportingLine: 'Reflective surfaces and glazing details.',
    image: mirrorGlazing,
    imageAlt: 'Statement mirror beside a clear glass partition in an ivory and oak interior',
  },
  {
    number: '02',
    title: 'Doors & Windows',
    supportingLine: 'Openings that frame and connect your space.',
    image: doorsWindows,
    imageAlt: 'Oak pivot door and floor-to-ceiling glazing opening onto a garden',
  },
  {
    number: '03',
    title: 'Curtains & Blinds',
    supportingLine: 'Window coverings for light and privacy.',
    image: curtainsBlinds,
    imageAlt: 'Linen curtains, ivory sheers and a roller blind in a sunlit interior',
  },
  {
    number: '04',
    title: 'Customized / Theme-Based Products',
    supportingLine: 'Details shaped around a chosen theme.',
    image: customizedProducts,
    imageAlt: 'Custom oak cabinetry with stone-backed niches and integrated lighting',
  },
]

export function createProductPreview(onActivate, timers = globalThis) {
  let timer = null
  const cancel = () => {
    timers.clearTimeout(timer)
    timer = null
  }
  return {
    activate(index, button) {
      cancel()
      onActivate(index, button)
    },
    preview(index, button) {
      cancel()
      timer = timers.setTimeout(() => {
        timer = null
        onActivate(index, button)
      }, 450)
    },
    cancel,
  }
}

