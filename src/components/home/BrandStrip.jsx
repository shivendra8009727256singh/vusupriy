import { useEffect, useRef } from 'react'
import { homeBrandStrip } from '../../data/homeBrandStrip.js'
import './BrandStrip.css'

export default function BrandStrip() {
  const rowRef = useRef(null)

  useEffect(() => {
    const row = rowRef.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (preference.matches || !window.IntersectionObserver) return undefined

    row.classList.add('home-brand-strip__row--pending')
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      row.classList.remove('home-brand-strip__row--pending')
      observer.disconnect()
    }, { threshold: 0.15 })
    observer.observe(row)
    const show = () => {
      if (!preference.matches) return
      row.classList.remove('home-brand-strip__row--pending')
      observer.disconnect()
    }
    preference.addEventListener('change', show)
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', show)
    }
  }, [])

  return (
    <div className="home-brand-strip" aria-hidden="true">
      <div className="home-brand-strip__row" ref={rowRef}>
        <div className="home-brand-strip__viewport">
          <div className="home-brand-strip__track">
            {[0, 1].map(copy => (
              <div className="home-brand-strip__group" key={copy}>
                {homeBrandStrip.map(brand => (
                  <div className="home-brand-strip__logo" key={brand.id}>
                    {brand.imageSrc ? (
                      <img src={brand.imageSrc} alt="" draggable="false" />
                    ) : (
                      <>
                        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.15">
                          <path d={brand.path} />
                        </svg>
                        <span>{brand.label}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
