import { useEffect, useMemo, useRef, useState } from 'react'

import { galleryCategories, galleryItems, filterGalleryItems, getPageWindow } from '../../data/galleryItems.js'
import bannerImage from '../../assets/vasupriy-interior-images-renamed/galleryheader.png'
import './Gallery.css'

/* One mosaic = 1 feature panel + 4 supporting panels (reference rhythm). */
const MOSAIC_SIZE = 5

/* Gallery pagination — ten spaces per page. */
const PAGE_SIZE = 10

function GalleryCard({ item, index, large, onOpen }) {
  return (
    <article
      className={`gallery-card${large ? ' gallery-card--large' : ''}`}
      data-gallery-reveal
    >
      <button
        type="button"
        className="gallery-card-open"
        aria-haspopup="dialog"
        aria-label={`Open ${item.title} preview`}
        onClick={() => onOpen(index)}
      >
        <span className="gallery-card-frame">
          <img
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            decoding="async"
            width="800"
            height="600"
          />
          <span className="gallery-expand" aria-hidden="true">
            ⤢
          </span>
        </span>
        <span className="gallery-card-caption">
          <span className="gallery-card-category">{item.category}</span>
          <strong className="gallery-card-title">{item.title}</strong>
        </span>
      </button>
    </article>
  )
}

function GalleryMosaicGrid({ items, onOpen }) {
  const groups = []
  for (let start = 0; start < items.length; start += MOSAIC_SIZE) {
    groups.push(items.slice(start, start + MOSAIC_SIZE))
  }

  return (
    <>
      {groups.map((group, groupIndex) => {
        const offset = groupIndex * MOSAIC_SIZE
        if (group.length === MOSAIC_SIZE) {
          return (
            <div
              key={group[0].id}
              className={`gallery-mosaic${
                groupIndex % 2 === 1 ? ' gallery-mosaic--flip' : ''
              }`}
            >
              {group.map((item, position) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={offset + position}
                  large={position === 0}
                  onOpen={onOpen}
                />
              ))}
            </div>
          )
        }
        return (
          <div key={group[0].id} className="gallery-grid-uniform">
            {group.map((item, position) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={offset + position}
                large={false}
                onOpen={onOpen}
              />
            ))}
          </div>
        )
      })}
    </>
  )
}

function Gallery() {
  const rootRef = useRef(null)
  const closeButtonRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const touchStartXRef = useRef(null)
  const collectionRef = useRef(null)

  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [page, setPage] = useState(1)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredItems = useMemo(
    () => filterGalleryItems(galleryItems, activeCategory),
    [activeCategory],
  )

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageItems = filteredItems.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  const activeItem =
    lightboxIndex === null ? null : pageItems[lightboxIndex] ?? null

  function selectCategory(category) {
    setActiveCategory(category)
    setPage(1)
    setLightboxIndex(null)
  }

  function changePage(nextPage) {
    setPage(Math.min(pageCount, Math.max(1, nextPage)))
    setLightboxIndex(null)
    collectionRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }

  /* Page title */
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Our Gallery | Vasupriy Interiovilla'
    return () => {
      document.title = previousTitle
    }
  }, [])

  /* Scroll-reveal, matching the Contact page motion pattern */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const cards = [...root.querySelectorAll('[data-gallery-reveal]')]
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.IntersectionObserver
    ) {
      cards.forEach((card) => card.classList.add('gallery-revealed'))
      return undefined
    }

    root.classList.add('gallery-motion')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('gallery-revealed')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.08 },
    )
    cards.forEach((card) => observer.observe(card))

    return () => {
      observer.disconnect()
      root.classList.remove('gallery-motion')
    }
  }, [activeCategory, safePage])

  /* Lightbox: keyboard, scroll-lock and focus management */
  useEffect(() => {
    if (lightboxIndex === null) return undefined

    lastFocusedRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus({ preventScroll: true })

    const handleKey = (event) => {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) => (current + 1) % pageItems.length)
      }
      if (event.key === 'ArrowLeft') {
        setLightboxIndex(
          (current) => (current - 1 + pageItems.length) % pageItems.length,
        )
      }
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      if (lastFocusedRef.current?.focus) {
        lastFocusedRef.current.focus({ preventScroll: true })
      }
    }
  }, [lightboxIndex, pageItems.length])

  function openLightbox(index) {
    setLightboxIndex(index)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function stepLightbox(direction) {
    setLightboxIndex(
      (current) => (current + direction + pageItems.length) % pageItems.length,
    )
  }

  function handleTouchStart(event) {
    touchStartXRef.current = event.touches[0].clientX
  }

  function handleTouchEnd(event) {
    if (touchStartXRef.current === null) return
    const delta = event.changedTouches[0].clientX - touchStartXRef.current
    touchStartXRef.current = null
    if (Math.abs(delta) < 40 || pageItems.length < 2) return
    stepLightbox(delta < 0 ? 1 : -1)
  }

  return (
    <div className="gallery-page" ref={rootRef}>
      {/* ============ SECTION 1 — HERO ============ */}
      <section className="gallery-hero" aria-labelledby="gallery-title">
        <img
          className="gallery-hero-image"
          src={bannerImage}
          alt=""
          fetchPriority="high"
        />
        <div className="site-container gallery-hero-content">
          <span className="section-label gallery-eyebrow">
            Vasupriy Interiovilla
          </span>
          <h1 id="gallery-title">
            Our <em>Gallery.</em>
          </h1>
          <p className="gallery-hero-description">
            A curated look at the interiors and architectural details that
            define our way of designing.
          </p>
        </div>
      </section>

      {/* ============ SECTION 2 — INTRODUCTION ============ */}
      <section
        className="site-container gallery-intro"
        aria-labelledby="gallery-intro-title"
        data-gallery-reveal
      >
        <span className="section-label gallery-intro-eyebrow">
          Our Collection
        </span>
        <h2 id="gallery-intro-title">
          Spaces That <em>Inspire.</em>
        </h2>
        <p>
          Explore our curated collection of thoughtfully designed interiors,
          timeless architecture, and beautifully crafted living spaces.
        </p>
      </section>

      {/* ============ SECTION 3 + 4 — FILTERS + GRID + PAGINATION ============ */}
      <section
        className="site-container gallery-collection"
        aria-label="Gallery collection"
        ref={collectionRef}
      >
        <div
          className="gallery-filters"
          role="group"
          aria-label="Filter gallery by category"
          data-gallery-reveal
        >
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`gallery-filter${
                category === activeCategory ? ' gallery-filter--active' : ''
              }`}
              aria-pressed={category === activeCategory}
              onClick={() => selectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="gallery-count" aria-live="polite">
          Showing {(safePage - 1) * PAGE_SIZE + 1}–
          {Math.min(safePage * PAGE_SIZE, filteredItems.length)} of{' '}
          {filteredItems.length} spaces
        </p>

        {filteredItems.length === 0 ? (
          <div className="gallery-empty">
            <h3>No spaces in this collection yet</h3>
            <p>Please explore another category.</p>
          </div>
        ) : (
          <>
            <GalleryMosaicGrid
              items={pageItems}
              onOpen={openLightbox}
            />

            {pageCount > 1 && (
              <nav
                className="gallery-pagination"
                aria-label="Gallery pages"
              >
                <button
                  type="button"
                  className="gallery-page-prev"
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  onClick={() => changePage(safePage - 1)}
                >
                  ←
                </button>

                {getPageWindow(safePage, pageCount).map((entry, position) =>
                  entry === '…' ? (
                    <span
                      key={`ellipsis-${position}`}
                      className="gallery-ellipsis"
                      aria-hidden="true"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={entry}
                      type="button"
                      aria-label={`Page ${entry}`}
                      aria-current={entry === safePage ? 'page' : undefined}
                      onClick={() => changePage(entry)}
                    >
                      {entry}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  className="gallery-page-next"
                  disabled={safePage === pageCount}
                  aria-label="Next page"
                  onClick={() => changePage(safePage + 1)}
                >
                  →
                </button>
              </nav>
            )}
          </>
        )}
      </section>

      {/* ============ SECTION 5 — LIGHTBOX ============ */}
      {activeItem && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} preview`}
          onClick={closeLightbox}
        >
          <div className="gallery-lightbox-top">
            <span
              className="gallery-lightbox-counter"
              aria-live="polite"
            >
              {lightboxIndex + 1} / {pageItems.length}
            </span>
            <button
              type="button"
              ref={closeButtonRef}
              className="gallery-lightbox-close"
              aria-label="Close preview"
              onClick={closeLightbox}
            >
              ✕
            </button>
          </div>

          <div className="gallery-lightbox-stage">
            {pageItems.length > 1 && (
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-prev"
                aria-label="Previous image"
                onClick={(event) => {
                  event.stopPropagation()
                  stepLightbox(-1)
                }}
              >
                ←
              </button>
            )}

            <figure
              className="gallery-lightbox-figure"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <span className="gallery-lightbox-media">
                <img
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.imageAlt}
                  draggable={false}
                />
              </span>
              <figcaption className="gallery-lightbox-caption">
                <span className="gallery-card-category">
                  {activeItem.category}
                </span>
                <strong>{activeItem.title}</strong>
                <span className="gallery-lightbox-description">
                  {activeItem.description}
                </span>
              </figcaption>
            </figure>

            {pageItems.length > 1 && (
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-next"
                aria-label="Next image"
                onClick={(event) => {
                  event.stopPropagation()
                  stepLightbox(1)
                }}
              >
                →
              </button>
            )}
          </div>

          <p className="gallery-lightbox-hint" aria-hidden="true">
            Esc to close · ← → to browse
          </p>
        </div>
      )}
    </div>
  )
}

export default Gallery
