import { Link } from 'react-router-dom'
import './SpaceMakeoverIncluded.css'

import roomMain from '../../assets/images/renamed-collection/residential-interior-renders/elegant-living-room-14.jpg'
import roomDetail from '../../assets/images/renamed-collection/residential-site-photos/residential-interior-details-46.jpg'
import bedroom from '../../assets/images/renamed-collection/residential-site-photos/modern-bedroom-interior-27.jpg'
import wallDetail from '../../assets/images/renamed-collection/residential-site-photos/bedroom-wall-paneling-29.jpg'
import lighting from '../../assets/images/renamed-collection/residential-site-photos/bedroom-ambient-lighting-30.jpg'

const included = [
  {
    title: 'Complete Room Transformation',
    description: 'A renewed look and feel for your living spaces, shaped around your lifestyle.',
  },
  {
    title: 'Space Planning & Layout',
    description: 'Smarter furniture placement, clearer circulation and more usable space.',
  },
  {
    title: 'Aesthetic & Theme Styling',
    description: 'A coordinated palette of colours, textures, lighting and furnishings.',
  },
  {
    title: 'Surface & Detail Upgrades',
    description: 'Statement walls, panels and thoughtful finishing touches.',
  },
]

export default function SpaceMakeoverIncluded() {
  return (
    <section className="vsm-included-ref" id="vsm-included" aria-labelledby="vsm-included-title">
      <div className="vsm-included-ref__container">
        <div className="vsm-included-ref__panel">
          <div className="vsm-included-ref__copy">
            <span className="vsm-included-ref__eyebrow">VASUPRIY / DESIGN & MAKEOVER</span>
            <h2 id="vsm-included-title">What’s <em>included</em></h2>
            <p className="vsm-included-ref__intro">Thoughtful design, tailored to the way you live.</p>
            <ul className="vsm-included-ref__list">
              {included.map((item, index) => (
                <li key={item.title}>
                  <span className="vsm-included-ref__number">{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </li>
              ))}
            </ul>
            <Link className="vsm-included-ref__link" to="/contact" state={{ service: 'Space Designing & Makeover' }}>
              Explore our services <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="vsm-included-ref__gallery" aria-label="Space makeover design inspirations">
            <figure className="vsm-included-ref__photo vsm-included-ref__photo--main"><img src="/images/services/space-makeover-included/included-main-concept.webp" alt="Refined living room makeover" loading="lazy" /></figure>
            <figure className="vsm-included-ref__photo vsm-included-ref__photo--top"><img src="/images/services/space-makeover-included/included-bedroom.webp" alt="Modern bedroom transformation" loading="lazy" /></figure>
            <figure className="vsm-included-ref__photo vsm-included-ref__photo--far"><img src="/images/services/space-makeover-included/included-temple.webp" alt="Detailed wall styling and materials" loading="lazy" /></figure>
            <figure className="vsm-included-ref__photo vsm-included-ref__photo--middle"><img src="/images/services/space-makeover-included/included-blue-living.webp" alt="Carefully curated interior finishes" loading="lazy" /></figure>
            <figure className="vsm-included-ref__photo vsm-included-ref__photo--bottom"><img src="/images/services/space-makeover-included/included-tv-wall.webp" alt="Warm ambient lighting details" loading="lazy" /></figure>
          </div>
        </div>
      </div>
    </section>
  )
}
