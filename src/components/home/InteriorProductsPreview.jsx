import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { imagesForProduct } from '../../pages/InteriorProducts/productImageMap.js'
import './InteriorProductsReference.css'

// Reuse the existing product catalogue and its real client-provided images.
const collections = [
  {
    label: 'Flooring Styling',
    description: 'Considered flooring materials and textures to ground every interior beautifully.',
    items: ['SPC Flooring', 'European Laminate', 'Wooden Deck Flooring', 'Carpet Tiles Flooring', 'Epoxy Flooring'],
  },
  {
    label: 'Wall Makeover Products',
    description: 'Elevate walls with expressive patterns, refined surfaces and layered finishes.',
    items: ['Non-Woven Wallpaper', 'Customized Design Wallpaper', 'WPC Panels', 'PVC Panels', 'MDF Wall Panels'],
  },
  {
    label: 'Enlightenment Options',
    description: 'Lighting selections that add warmth, ambience and definition to every room.',
    items: ['Chandeliers', 'Ceiling Light', 'Wall Lamps', 'Garden Light', 'Down Light'],
  },
  {
    label: 'Green Element',
    description: 'Bring a naturally refreshing atmosphere to your space with thoughtful greenery.',
    items: ['Vertical Garden', 'Artificial Plant and Tree', 'Artificial Grass Flooring'],
  },
]

const cardsFor = collection => collection.items.flatMap(name => {
  const image = imagesForProduct(name)[0]
  return image ? [{ name, image }] : []
})

export default function InteriorProductsPreview() {
  const [selected, setSelected] = useState(0)
  const [position, setPosition] = useState(0)
  const railRef = useRef(null)
  const category = collections[selected]
  const cards = cardsFor(category)

  useEffect(() => {
    const rail = railRef.current
    if (rail) rail.scrollTo({ left: 0, behavior: 'instant' })
    setPosition(0)
  }, [selected])

  const updatePosition = () => {
    const rail = railRef.current
    if (!rail) return
    const firstCard = rail.querySelector('.vproduct-card')
    if (!firstCard) return
    const step = firstCard.getBoundingClientRect().width + 18
    setPosition(Math.round(rail.scrollLeft / step))
  }

  const navigate = direction => {
    const rail = railRef.current
    const firstCard = rail?.querySelector('.vproduct-card')
    if (!rail || !firstCard) return
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 18
    const step = firstCard.getBoundingClientRect().width + gap
    const maxScroll = rail.scrollWidth - rail.clientWidth
    const target = Math.max(0, Math.min(maxScroll, rail.scrollLeft + direction * step))
    rail.scrollTo({ left: target, behavior: 'smooth' })
  }

  return (
    <section className="vproduct-showcase" id="home-products" aria-labelledby="vproduct-title" data-scroll-section>
      <div className="vproduct-shell">
        <header className="vproduct-heading">
          <div>
            <span className="vproduct-eyebrow">VASUPRIY INTERIOVILLA / OUR PRODUCTS</span>
            <h2 id="vproduct-title">Interior products <em>&amp; finishes</em></h2>
            <p>Curated interior products, thoughtfully chosen for spaces that feel like yours.</p>
          </div>
          <div className="vproduct-arrows" aria-label="Browse product images">
            <button type="button" onClick={() => navigate(-1)} aria-label="Previous products">←</button>
            <button type="button" onClick={() => navigate(1)} aria-label="Next products">→</button>
          </div>
        </header>

        <div className="vproduct-layout">
          <nav className="vproduct-tabs" aria-label="Product collections">
            {collections.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={selected === index ? 'vproduct-tab is-active' : 'vproduct-tab'}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                {item.label}
              </button>
            ))}
            <Link className="vproduct-all" to="/interior-products">View full collection <span aria-hidden="true">↗</span></Link>
          </nav>

          <div className="vproduct-right">
            <div className="vproduct-rail" ref={railRef} onScroll={updatePosition} aria-label={`${category.label} products`}>
              {cards.map((card, index) => (
                <article className="vproduct-card" key={`${selected}-${card.name}`}>
                  <Link to="/interior-products" aria-label={`Explore ${card.name} products`}>
                    <div className="vproduct-image-wrap">
                      <img src={card.image} alt={card.name} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />
                    </div>
                    <h3>{card.name}</h3>
                    <p>{category.description}</p>
                  </Link>
                </article>
              ))}
            </div>
            <div className="vproduct-footer">
              <span>{String(Math.min(position + 1, Math.max(cards.length, 1))).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}</span>
              <span>Swipe or use arrows to explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
