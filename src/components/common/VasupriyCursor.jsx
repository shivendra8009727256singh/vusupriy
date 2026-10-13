import { useEffect, useRef } from 'react'
import vasupriyLogo from '../../assets/brand/vasupriy-cursor-symbol.png'
import './VasupriyCursor.css'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, select, textarea, summary'

const VIEW_SELECTOR =
  'a[href*="/gallery"], a[href*="/projects"], [data-cursor="view"]'

export default function VasupriyCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const media = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    )

    let frame = 0
    let active = media.matches
    let visible = false

    let currentX = -100
    let currentY = -100
    let targetX = -100
    let targetY = -100

    const offsetX = 18
    const offsetY = 19

    const hide = () => {
      visible = false
      cursor.classList.remove('is-visible', 'is-hovering', 'is-viewing')
    }

    const updateMedia = () => {
      active = media.matches
      cursor.classList.toggle('is-enabled', active)

      if (!active) hide()
    }

    const onPointerMove = (event) => {
      if (!active || event.pointerType === 'touch') return

      targetX = event.clientX + offsetX
      targetY = event.clientY + offsetY

      if (!visible) {
        currentX = targetX
        currentY = targetY
        visible = true
        cursor.classList.add('is-visible')
      }

      const target =
        event.target instanceof Element ? event.target : null

      const interactive = target?.closest(INTERACTIVE_SELECTOR)
      const viewing = target?.closest(VIEW_SELECTOR)

      cursor.classList.toggle('is-hovering', Boolean(interactive))
      cursor.classList.toggle('is-viewing', Boolean(viewing))
    }

    const animate = () => {
      if (active && visible) {
        currentX += (targetX - currentX) * 0.18
        currentY += (targetY - currentY) * 0.18

        cursor.style.transform =
          `translate3d(${currentX}px, ${currentY}px, 0)`
      }

      frame = window.requestAnimationFrame(animate)
    }

    updateMedia()

    media.addEventListener('change', updateMedia)

    window.addEventListener('pointermove', onPointerMove, {
      passive: true,
    })

    document.addEventListener('pointerout', (event) => {
      if (!event.relatedTarget) hide()
    })

    window.addEventListener('blur', hide)

    frame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frame)

      media.removeEventListener('change', updateMedia)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', hide)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="vasupriy-luxury-cursor"
      aria-hidden="true"
    >
      <span className="vasupriy-cursor-halo" />

      <span className="vasupriy-cursor-core">
        <img
          src={vasupriyLogo}
          alt=""
          draggable={false}
        />
      </span>

      <span className="vasupriy-cursor-view">
        VIEW
      </span>
    </div>
  )
}