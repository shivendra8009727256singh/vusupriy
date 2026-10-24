import { Link } from 'react-router-dom'
import './HomeGallery.css'

// VASUPRIY_HOME_GALLERY_TO_EXPERTISE_V1
const galleryRowOne = [
  { id: 1, image: '/images/home-expertise/custom-mosaic-work.jpg', alt: 'Custom Mosaic Work', title: 'Custom Mosaic Work', category: 'Our Expertise', size: 'medium' },
  { id: 2, image: '/images/home-expertise/embroidered-wallpaper.jpg', alt: 'Embroidered Wallpaper', title: 'Embroidered Wallpaper', category: 'Our Expertise', size: 'large' },
  { id: 3, image: '/images/home-expertise/frp-fountain.jpg', alt: 'FRP Fountain', title: 'FRP Fountain', category: 'Our Expertise', size: 'medium' },
  { id: 4, image: '/images/home-expertise/hand-made-rugs.jpg', alt: 'Hand Made Rugs', title: 'Hand Made Rugs', category: 'Our Expertise', size: 'medium' },
]

const galleryRowTwo = [
  { id: 5, image: '/images/home-expertise/hdhmr.jpg', alt: 'HDHMR', title: 'HDHMR', category: 'Our Expertise', size: 'large' },
  { id: 6, image: '/images/home-expertise/inlay-work.jpg', alt: 'Inlay Work', title: 'Inlay Work', category: 'Our Expertise', size: 'medium' },
  { id: 7, image: '/images/home-expertise/mural-painting.jpg', alt: 'Mural Painting', title: 'Mural Painting', category: 'Our Expertise', size: 'large' },
  { id: 8, image: '/images/home-expertise/stone-engraved.jpg', alt: 'Stone Engraved', title: 'Stone Engraved', category: 'Our Expertise', size: 'medium' },
]

function GalleryTrack({ items, direction = 'left' }) {
  const repeatedItems = [...items, ...items]

  return (
    <div className="antra-gallery-row">
      <div
        className={`antra-gallery-track antra-gallery-track--${direction}`}
      >
        {repeatedItems.map((item, index) => (
          <Link
            to="/gallery"
            className={`antra-gallery-item antra-gallery-item--${item.size}`}
            key={`${item.id}-${index}`}
            aria-label={`View gallery: ${item.title}`}
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
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function HomeGallery() {
  return (
    <section
      className="antra-gallery"
      id="expertise"
      aria-labelledby="home-gallery-title"
      data-scroll-section
    >
      <div
        className="antra-gallery-watermark"
        aria-hidden="true"
      >
        interiovilla
      </div>

      <div className="antra-gallery-header">
        <div className="antra-gallery-eyebrow">
          <span aria-hidden="true" />
          Indian Artistry
        </div>

        <div className="antra-gallery-heading-row">
          <h2 id="home-gallery-title">
            Crafted with Passion.
            <br />
            <em>Defined by Expertise.</em>
          </h2>

          <p>
            Discover our expertise in bespoke craftsmanship, artistic finishes, and innovative interior solutions. From handcrafted details to distinctive design elements, every creation reflects quality, creativity, and timeless elegance.
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
