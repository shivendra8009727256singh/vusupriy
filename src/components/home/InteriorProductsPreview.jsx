import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import './InteriorProductsPreview.css'

import curtainsImage from '../../assets/images/home/products/curtains-blinds.png'
import customizedImage from '../../assets/images/home/products/customized-products.png'
import doorsImage from '../../assets/images/home/products/doors-windows.png'
import glazingImage from '../../assets/images/home/products/mirror-glazing.png'
import residentialImage from '../../assets/images/home/projects/residential-interior.png'

const products = [
  {
    id: 1,
    title: 'Curtains & Blinds',
    image: curtainsImage,
    alt: 'Curtains and blinds interior products',
  },
  {
    id: 2,
    title: 'Customized Products',
    image: customizedImage,
    alt: 'Customized interior products',
  },
  {
    id: 3,
    title: 'Doors & Windows',
    image: doorsImage,
    alt: 'Interior doors and windows',
  },
  {
    id: 4,
    title: 'Mirror & Glazing',
    image: glazingImage,
    alt: 'Mirror and glazing interior solutions',
  },
  {
    id: 5,
    title: 'Interior Collections',
    image: residentialImage,
    alt: 'Curated interior product collection',
  },
]

const AUTOPLAY_DELAY = 3800

export default function InteriorProductsPreview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(null)

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % products.length)
  }

  const goPrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + products.length) % products.length,
    )
  }

  useEffect(() => {
    if (isPaused) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length)
    }, AUTOPLAY_DELAY)

    return () => window.clearInterval(timer)
  }, [isPaused])

  const visibleProducts = [0, 1, 2].map(
    (offset) => products[(activeIndex + offset) % products.length],
  )

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const distance = endX - touchStartX.current

    if (Math.abs(distance) > 45) {
      if (distance < 0) {
        goNext()
      } else {
        goPrevious()
      }
    }

    touchStartX.current = null
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
        <img
          src={products[activeIndex].image}
          alt=""
        />
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
            <span aria-hidden="true">↗</span>
          </Link>
        </div>


        <div
          className="products-gallery-slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Interior products gallery"
          data-reveal
        >
          <div
            className="products-gallery-track"
            key={activeIndex}
          >
            {visibleProducts.map((product, index) => (
              <article
                className={`products-gallery-card products-gallery-card--${index + 1}`}
                key={`${activeIndex}-${product.id}`}
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


          <div className="products-gallery-controls">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous product"
            >
              <span aria-hidden="true">←</span>
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next product"
            >
              <span aria-hidden="true">→</span>
            </button>
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
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${product.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
