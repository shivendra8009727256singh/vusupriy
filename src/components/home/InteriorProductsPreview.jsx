import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createProductPreview, interiorProducts } from './interiorProductsPreview.js'
import './InteriorProductsPreview.css'
import useDecodedSelection from '../../hooks/useDecodedSelection.js'

export default function InteriorProductsPreview() {
  const [activeProduct, images] = useDecodedSelection(0)
  const [controls] = useState(() => createProductPreview((index, button) => images.select(index, button?.closest('section')?.querySelectorAll('.home-product-layer img')[index]), globalThis))
  const selected = interiorProducts[activeProduct]

  useEffect(() => () => controls.cancel(), [controls])

  return (
    <section
      className="home-products section-space"
      id="home-products"
      aria-labelledby="home-products-title"
      data-scroll-section
    >
      <div className="home-products-atmosphere" data-reveal aria-hidden="true" />
      <div className="site-container">
        <div className="home-products-heading" data-reveal data-heading-reveal>
          <div className="home-products-heading-meta">
            <span className="section-label">Interior Products</span>
            <span className="home-products-range" aria-hidden="true">01 — 04</span>
          </div>
          <h2 className="section-title" id="home-products-title">
            <span className="motion-title-mask">
              <span className="motion-title-line">Details that</span>
            </span>
            <span className="motion-title-mask">
              <em className="motion-title-line">complete the space.</em>
            </span>
          </h2>
          <span className="home-products-rule" aria-hidden="true" />
        </div>

        <div className="home-products-showcase">
          <div className="home-products-visual">
            <div
              className="home-products-frame"
              id="home-product-visual"
              role="region"
              aria-labelledby={`home-product-title-${activeProduct}`}
              data-reveal
            >
              <div className="home-products-layers">
                {interiorProducts.map((product, index) => (
                  <div
                    className={`home-product-layer ${index === activeProduct ? 'home-product-layer--active' : ''}`}
                    key={product.number}
                    aria-hidden={index !== activeProduct}
                  >
                    <img src={product.image} alt={product.imageAlt} width="1122" height="1402" decoding="async" />
                  </div>
                ))}
              </div>
              <div className="home-products-visual-top" aria-hidden="true">
                <span>Interior Products</span>
                <span>04 categories</span>
              </div>
              <div className="home-products-number-mask" aria-hidden="true">
                <span key={selected.number}>{selected.number}</span>
              </div>
              <div className="home-products-caption">
                <span className="home-products-caption-label">Product selection</span>
                <span className="home-products-caption-name" key={selected.title}>
                  {selected.title}
                </span>
              </div>
            </div>
          </div>

          <div className="home-products-categories" role="group" aria-label="Interior product categories">
            {interiorProducts.map((product, index) => (
              <button
                className={`home-product-category ${index === activeProduct ? 'home-product-category--active' : ''}`}
                type="button"
                key={product.number}
                aria-pressed={index === activeProduct}
                aria-controls="home-product-visual"
                aria-labelledby={`home-product-title-${index}`}
                aria-describedby={`home-product-description-${index}`}
                onMouseEnter={event => controls.preview(index, event.currentTarget)}
                onMouseLeave={controls.cancel}
                onFocus={event => controls.activate(index, event.currentTarget)}
                onClick={event => controls.activate(index, event.currentTarget)}
                onBlur={controls.cancel}
                data-reveal
                style={{ '--reveal-delay': `${index * 80}ms` }}
              >
                <span className="home-product-category-number" aria-hidden="true">{product.number}</span>
                <span className="home-product-category-copy">
                  <span className="home-product-category-title" id={`home-product-title-${index}`}>
                    {product.title}
                  </span>
                  <span className="home-product-category-description" id={`home-product-description-${index}`}>
                    {product.supportingLine}
                  </span>
                </span>
                <span className="home-product-category-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </div>

        <div className="home-products-footer" data-reveal>
          <Link className="home-products-cta" to="/interior-products">
            <span>Explore Interior Products</span>
            <span className="home-products-cta-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
