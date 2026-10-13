import { FaWhatsapp } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export default function FloatingScrollButtons() {
  const [position, setPosition] = useState({
    atTop: true,
    atBottom: false,
  })

  useEffect(() => {
    let frame = 0

    const updatePosition = () => {
      cancelAnimationFrame(frame)

      frame = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const maxScroll = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        )

        setPosition({
          atTop: scrollTop < 120,
          atBottom: maxScroll - scrollTop < 120,
        })
      })
    }

    updatePosition()

    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [])

  const scrollTo = (destination) => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    )

    window.scrollTo({
      top: destination === 'top' ? 0 : maxScroll,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <nav className="vasupriy-floating-scroll" aria-label="Page scroll navigation">
            <a
        className="vasupriy-scroll-btn vasupriy-scroll-btn--whatsapp"
        href={`https://wa.me/918447689084?text=${encodeURIComponent(
          "Hello Vasupriy Interiovilla! I'm interested in your interior design services. I'd like to discuss my project."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Vasupriy Interiovilla on WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
<button
        type="button"
        className="vasupriy-scroll-btn vasupriy-scroll-btn--top"
        onClick={() => scrollTo('top')}
        aria-label="Back to top"
        title="Back to top"
        disabled={position.atTop}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      <button
        type="button"
        className="vasupriy-scroll-btn vasupriy-scroll-btn--bottom"
        onClick={() => scrollTo('bottom')}
        aria-label="Back to bottom"
        title="Back to bottom"
        disabled={position.atBottom}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14m-7-7 7 7 7-7" />
        </svg>
      </button>
    </nav>
  )
}