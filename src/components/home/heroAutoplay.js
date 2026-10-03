// Autoplay owns only image opacity state; existing Hero motion remains outside.
export const HERO_HOLD_MS = 5000
export const HERO_FADE_MS = 1200

export function createHeroAutoplay({ images, onChange, onSettle, window: win = window, document: doc = document }) {
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)')
  const ready = new WeakSet()
  const failed = new WeakSet()
  const decoding = new WeakMap()
  let current = 0
  let timer = null
  let generation = 0
  let transitioning = false
  let disposed = false
  const enabled = () => !disposed && !reduced.matches && doc.visibilityState !== 'hidden' && images.length > 1
  const decode = image => {
    if (ready.has(image)) return Promise.resolve(true)
    if (failed.has(image)) return Promise.resolve(false)
    if (decoding.has(image)) return decoding.get(image)
    const pending = Promise.resolve().then(async () => {
      if (image.decode) await image.decode()
      if (!image.complete || !image.naturalWidth) throw new Error('Hero image unavailable')
      ready.add(image)
      return true
    }).catch(() => { failed.add(image); return false })
    decoding.set(image, pending)
    return pending
  }
  const clear = () => {
    generation++
    if (timer !== null) win.clearTimeout(timer)
    timer = null
  }
  const hold = () => {
    if (!enabled()) return
    const token = generation
    void decode(images[(current + 1) % images.length])
    timer = win.setTimeout(async () => {
      timer = null
      for (let offset = 1; offset < images.length; offset++) {
        const next = (current + offset) % images.length
        const loaded = await decode(images[next])
        if (token !== generation || !enabled()) return
        if (!loaded) continue
        const previous = current
        current = next
        transitioning = true
        onChange(current, previous)
        settle()
        return
      }
      // All alternatives failed; retain the current photograph.
    }, HERO_HOLD_MS)
  }
  const settle = () => {
    timer = win.setTimeout(() => {
      timer = null
      transitioning = false
      onSettle()
      hold()
    }, HERO_FADE_MS)
  }
  const restart = () => {
    clear()
    if (reduced.matches) {
      if (current !== 0 || transitioning) {
        current = 0
        transitioning = false
        onChange(0, null)
      }
      return
    }
    if (!enabled()) return
    // Keep the opaque base through a tab interruption, then retire it safely.
    if (transitioning) settle()
    else hold()
  }
  doc.addEventListener('visibilitychange', restart)
  reduced.addEventListener('change', restart)
  hold()
  return () => {
    disposed = true
    clear()
    doc.removeEventListener('visibilitychange', restart)
    reduced.removeEventListener('change', restart)
  }
}
