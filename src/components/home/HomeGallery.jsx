import './HomeGallery.css'

const galleryRowOne = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=88',
    alt: 'Modern living room interior',
    title: 'Refined Living',
    category: 'Residential Interior',
    size: 'medium',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1400&q=88',
    alt: 'Modern kitchen interior',
    title: 'The Modern Kitchen',
    category: 'Kitchen Design',
    size: 'large',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=88',
    alt: 'Dining room interior',
    title: 'Gather Around',
    category: 'Dining Experience',
    size: 'medium',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=88',
    alt: 'Minimal contemporary interior',
    title: 'Quiet Minimalism',
    category: 'Contemporary Interior',
    size: 'medium',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=88',
    alt: 'Luxury residential interior',
    title: 'Elevated Comfort',
    category: 'Luxury Residence',
    size: 'large',
  },
]

const galleryRowTwo = [
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=88',
    alt: 'Bedroom interior',
    title: 'Restful Retreat',
    category: 'Bedroom Interior',
    size: 'medium',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=88',
    alt: 'Warm modern living interior',
    title: 'Warmth in Every Detail',
    category: 'Living Space',
    size: 'large',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=88',
    alt: 'Contemporary home interior',
    title: 'Contemporary Living',
    category: 'Modern Residence',
    size: 'medium',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=88',
    alt: 'Kitchen and dining interior',
    title: 'Designed for Togetherness',
    category: 'Kitchen & Dining',
    size: 'large',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=88',
    alt: 'Minimal bedroom interior',
    title: 'Calm by Design',
    category: 'Bedroom Interior',
    size: 'medium',
  },
]

function GalleryTrack({ items, direction = 'left' }) {
  const repeatedItems = [...items, ...items]

  return (
    <div className="antra-gallery-row">
      <div
        className={`antra-gallery-track antra-gallery-track--${direction}`}
      >
        {repeatedItems.map((item, index) => (
          <article
            className={`antra-gallery-item antra-gallery-item--${item.size}`}
            key={`${item.id}-${index}`}
          >
            <img
              src={item.image}
              alt={index < items.length ? item.alt : ''}
              loading="lazy"
              decoding="async"
            />

            <div className="antra-gallery-shade" aria-hidden="true" />

            <div className="antra-gallery-caption">
              <span>{item.category}</span>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function HomeGallery() {
  return (
    <section
      className="antra-gallery"
      id="home-gallery"
      aria-labelledby="home-gallery-title"
      data-scroll-section
    >
      <div
        className="antra-gallery-watermark"
        aria-hidden="true"
      >
        interiorvilla
      </div>

      <div className="antra-gallery-header">
        <div className="antra-gallery-eyebrow">
          <span aria-hidden="true" />
          Our Gallery
        </div>

        <div className="antra-gallery-heading-row">
          <h2 id="home-gallery-title">
            Spaces We&apos;ve
            <br />
            <em>Shaped.</em>
          </h2>

          <p>
            A glimpse into interiors crafted with character,
            comfort and purpose — spaces thoughtfully designed
            around the way people live, work and connect.
          </p>
        </div>
      </div>

      <div className="antra-gallery-wall">
        <GalleryTrack
          items={galleryRowOne}
          direction="left"
        />

        <GalleryTrack
          items={galleryRowTwo}
          direction="right"
        />
      </div>
    </section>
  )
}
