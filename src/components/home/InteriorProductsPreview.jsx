import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import './InteriorProductsPreview.css'

import curtainsImage from '../../assets/images/renamed-collection/residential-interior-renders/premium-wall-panels-51.jpg'
import customizedImage from '../../assets/images/renamed-collection/cafe-interiors/cafe-interior-checkered-floor-01.jpg'
import doorsImage from '../../assets/images/renamed-collection/commercial-interior-renders/cafe-counter-and-pendant-lights-02.jpg'
import glazingImage from '../../assets/images/renamed-collection/cafe-interiors/cafe-seating-and-plants-04.jpg'
import residentialImage from '../../assets/images/renamed-collection/residential-interior-renders/designer-ceiling-50.jpg'

const products = [
  {
    id: 1,
    title: 'Wall Coverings',
    image: curtainsImage,
    alt: 'Premium decorative wall covering and panels',
  },
  {
    id: 2,
    title: 'Floor Makeovers',
    image: customizedImage,
    alt: 'Stylish checkered flooring in a modern interior',
  },
  {
    id: 3,
    title: 'Enlightenment Options',
    image: doorsImage,
    alt: 'Decorative pendant lighting in a premium cafe',
  },
  {
    id: 4,
    title: 'Green Elements',
    image: glazingImage,
    alt: 'Indoor greenery and plants in an interior space',
  },
  {
    id: 5,
    title: 'Ceiling Styling',
    image: residentialImage,
    alt: 'Designer ceiling styling in a modern interior',
  },
]

const AUTOPLAY_DELAY = 2000
const SLIDE_DURATION = 900

const sliderProducts = [...products, ...products, ...products]

export default function InteriorProductsPreview() {
  const [trackIndex, setTrackIndex] = useState(products.length)
  const [isAnimating, setIsAnimating] = useState(true)

  const trackIndexRef = useRef(products.length)
  const touchStartX = useRef(null)
  const slideTimeoutRef = useRef(null)
  const lockedRef = useRef(false)

  const activeIndex =
    ((trackIndex % products.length) + products.length) %
    products.length

  const moveTo = (nextIndex) => {
    if (lockedRef.current) return

    lockedRef.current = true
    setIsAnimating(true)
    trackIndexRef.current = nextIndex
    setTrackIndex(nextIndex)

    window.clearTimeout(slideTimeoutRef.current)

    slideTimeoutRef.current = window.setTimeout(() => {
      let normalizedIndex = trackIndexRef.current

      if (normalizedIndex >= products.length * 2) {
        normalizedIndex -= products.length
      } else if (normalizedIndex < products.length) {
        normalizedIndex += products.length
      }

      if (normalizedIndex !== trackIndexRef.current) {
        setIsAnimating(false)
        trackIndexRef.current = normalizedIndex
        setTrackIndex(normalizedIndex)
      }

      lockedRef.current = false
    }, SLIDE_DURATION)
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      moveTo(trackIndexRef.current + 1)
    }, AUTOPLAY_DELAY)

    return () => {
      window.clearInterval(timer)
      window.clearTimeout(slideTimeoutRef.current)
    }
  }, [])

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return

    const endX =
      event.changedTouches[0]?.clientX ?? touchStartX.current

    const distance = endX - touchStartX.current

    if (distance < -45) {
      moveTo(trackIndexRef.current + 1)
    } else if (distance > 45) {
      moveTo(trackIndexRef.current - 1)
    }

    touchStartX.current = null
  }

  const handleDotClick = (index) => {
    const current = trackIndexRef.current % products.length
    const forward = (index - current + products.length) % products.length

    if (forward === 0) return

    moveTo(trackIndexRef.current + forward)
  }

  return (
    <section
      className="products-gallery"
      id="home-products"
      aria-labelledby="products-gallery-title"
      data-scroll-section
    >
      <div
        className="products-gallery-background"
        aria-hidden="true"
      >
        <img src={products[activeIndex].image} alt="" />
      </div>

      <div
        className="products-gallery-overlay"
        aria-hidden="true"
      />

      <div className="site-container products-gallery-container">
        <div className="products-gallery-copy" data-reveal>
          <span className="products-gallery-label">
            <i aria-hidden="true" />
            Our Products
          </span>

          <h2 id="products-gallery-title">
            Interior
            <br />
            Products
          </h2>

          <p>
            Curated interior products that bring together refined
            materials, thoughtful details and practical solutions
            for beautifully finished spaces.
          </p>

          <Link
            className="products-gallery-link"
            to="/interior-products"
          >
            Explore Products
            <span aria-hidden="true">{'\u2197'}</span>
          </Link>
        </div>

        <div
          className="products-gallery-slider"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Interior products gallery"
          data-reveal
        >
          <div className="products-gallery-viewport">
            <div
              className={`products-gallery-track ${
                isAnimating ? 'products-gallery-track--animate' : ''
              }`}
              style={{
                '--product-index': trackIndex,
              }}
            >
              {sliderProducts.map((product, index) => (
                <article
                  className="products-gallery-card"
                  key={`${product.id}-${index}`}
                >
                  <img
                    src={product.image}
                    alt={product.alt}
                    decoding="async"
                  />

                  <div className="products-gallery-card-overlay">
                    <span>
                      {String(product.id).padStart(2, '0')}
                    </span>
                    <h3>{product.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            className="products-gallery-progress"
            aria-label={`Product ${activeIndex + 1} of ${products.length}`}
          >
            {products.map((product, index) => (
              <button
                key={product.id}
                type="button"
                className={
                  index === activeIndex
                    ? 'products-gallery-dot products-gallery-dot--active'
                    : 'products-gallery-dot'
                }
                onClick={() => handleDotClick(index)}
                aria-label={`Show ${product.title}`}
                aria-current={
                  index === activeIndex ? 'true' : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}