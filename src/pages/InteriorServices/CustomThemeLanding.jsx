import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CustomThemeLanding.css'

/* Resolve existing project assets by filename, independent of their collection folder. */
const imageFiles = import.meta.glob('../../assets/images/**/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const resolveImage = (filename, fallback) => {
  const image = Object.entries(imageFiles).find(([path]) => path.endsWith('/' + filename))
  return image?.[1] || fallback
}
const hero = resolveImage('customized-products.png', resolveImage('space-makeover.png'))
const epoxy = resolveImage('restaurant-checkered-floor-65.jpg', resolveImage('interior-left.jpg', hero))
const panels = resolveImage('premium-wall-panels-51.jpg', resolveImage('space-planning.png', hero))
const art = resolveImage('cafe-wall-art-23.jpg', resolveImage('interior-showcase.png', hero))
const furniture = resolveImage('custom-furniture.jpg', resolveImage('elegant-living-room-16.jpg', hero))
const garden = resolveImage('cafe-seating-and-plants-12.jpg', resolveImage('cafe-green-accent-wall-19.jpg', hero))
const detail = resolveImage('bedroom-wall-paneling-29.jpg', panels)

const collections = [
  { id: '01', title: 'Custom Epoxy Flooring', tag: 'A signature underfoot', image: epoxy, description: 'Personalised flooring finishes, patterns and colour stories shaped around your space.' },
  { id: '02', title: 'Wall Panels & Wallpapers', tag: 'Walls with character', image: panels, description: 'Tailored textures, feature panels and wallpapers that create a distinct focal point.' },
  { id: '03', title: 'Rugs & Wall Hangings', tag: 'Art in every detail', image: art, description: 'Considered textile accents and decorative art selected to complement your theme.' },
  { id: '04', title: 'Complete Furnishings', tag: 'Beautifully coordinated', image: furniture, description: 'Custom-inspired furniture, curtains, cushions and soft furnishings in visual harmony.' },
  { id: '05', title: 'Garden & Greenery', tag: 'Nature, thoughtfully placed', image: garden, description: 'Green features and planting concepts curated for indoor and outdoor settings.' },
]

const steps = [
  {
    id: '01',
    title: "Let's Talk Modifications",
    copy: 'Tell us what you want to customise. We understand your space, style, ideas and requirements.',
  },
  {
    id: '02',
    title: 'Explore Brands & Material Quality',
    copy: 'Compare trusted brands, material quality, finishes and product options before making your choice.',
  },
  {
    id: '03',
    title: 'Choose According to Your Budget',
    copy: 'Select the brand and materials that best suit your preferences, requirements and planned budget.',
  },
  {
    id: '04',
    title: 'Certified Professionals Come to You',
    copy: 'Our professional installation team visits your location for measurements and planned execution.',
  },
  {
    id: '05',
    title: 'Supervised Completion & Warranty',
    copy: 'We supervise the work through completion, hand over your finished project and provide the applicable warranty card.',
  },
]
const slides = [
  { image: panels, label: 'TEXTURE & DETAIL', title: 'Surfaces that tell a story.', copy: 'A distinctive wall finish can define the entire character of a room.' },
  { image: furniture, label: 'A COHESIVE VISION', title: 'Every detail in dialogue.', copy: 'Furniture, soft furnishings and colour choices working together as one language.' },
  { image: garden, label: 'NATURAL HARMONY', title: 'A little nature, thoughtfully placed.', copy: 'Curated greenery brings softness, depth and a sense of calm.' },
  { image: detail, label: 'CRAFT IN FOCUS', title: 'A refined finishing touch.', copy: 'It is the careful execution of small details that makes a space feel complete.' },
]

export default function CustomThemeLanding() {
  const [slide, setSlide] = useState(0)
  const current = slides[slide]

  useEffect(() => {
    const old = document.title
    document.title = 'Customized & Theme-Based Products | Vasupriy Interiovilla'
    return () => { document.title = old }
  }, [])

  const move = (direction) => setSlide((value) => (value + direction + slides.length) % slides.length)

  return (
    <main className="vct">
      <section className="vct-hero" aria-labelledby="vct-hero-title">
        <img src={hero} alt="Refined designer interior with a cohesive custom theme" fetchPriority="high" />
        <div className="vct-hero-shade" />
        <div className="vct-wrap vct-hero-body">
          <p className="vct-kicker vct-kicker--light">VASUPRIY INTERIOVILLA / BESPOKE COLLECTIONS</p>
          <h1 id="vct-hero-title">Crafted for your space.<br /><em>Created for your story.</em></h1>
          <p>Distinctive, considered products that bring your personal design language to life.</p>
          <a className="vct-button vct-button--gold" href="#what-we-customize">Explore the collection <span aria-hidden="true">↗</span></a>
        </div>
        <span className="vct-hero-index">01 / CUSTOM-MADE INTERIORS</span>
      </section>

      <section className="vct-intro vct-section" aria-labelledby="vct-intro-title">
        <div className="vct-wrap vct-intro-grid">
          <div><p className="vct-kicker">THE ART OF PERSONALISATION</p><h2 id="vct-intro-title">Not simply chosen.<br /><em>Thoughtfully made yours.</em></h2></div>
          <div className="vct-intro-side"><span className="vct-rule" /><p>Your home deserves more than a standard catalogue. We help bring together finishes, textures, furnishings and personalised details into a distinctive whole—beautiful to see, comfortable to live with.</p><Link to="/contact" className="vct-inline-link">Share your vision <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section id="what-we-customize" className="vct-collections vct-section" aria-labelledby="vct-collections-title">
        <div className="vct-wrap">
          <div className="vct-heading-row"><div><p className="vct-kicker">01 / OUR COLLECTIONS</p><h2 id="vct-collections-title">What we <em>customize.</em></h2></div><p>Five considered ways to make your interior unmistakably yours.</p></div>
          <div className="vct-collection-grid">
            {collections.map((item) => (
              <article key={item.id} className="vct-collection-card">
                <div className="vct-collection-image"><img src={item.image} alt={`${item.title} interior design example`} loading="lazy" decoding="async" /><span className="vct-collection-number">{item.id} / 05</span></div>
                <div className="vct-collection-copy"><p>{item.tag}</p><h3>{item.title}</h3><span>{item.description}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VASUPRIY_CUSTOM_PROCESS_STAGGERED_V1 */}
      <section
        className="vct-process vct-section"
        aria-labelledby="vct-process-title"
        style={{
          backgroundImage: `linear-gradient(
      105deg,
      rgba(5, 29, 33, .72),
      rgba(5, 29, 33, .62)
    ), url(${hero})`,
        }}
      >
        <div className="vct-wrap">
          <div className="vct-process-heading">
            <p className="vct-kicker">FROM VISION TO CREATION</p>
            <h2 id="vct-process-title">
              Our customization <em>process.</em>
            </h2>
            <p>
              A thoughtful journey from your first inspiration
              to the final personalised detail.
            </p>
          </div>

          <div className="vct-step-grid">
            {steps.map((step) => (
              <article className="vct-step" key={step.id}>
                <span className="vct-step-number">{step.id}.</span>

                <div className="vct-step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      <section className="vct-craft vct-section" aria-labelledby="vct-craft-title"><div className="vct-wrap vct-craft-grid"><div className="vct-craft-photo"><img src={detail} alt="Detailed bespoke wall panel craftsmanship" loading="lazy" /><span>CRAFTED WITH PURPOSE</span></div><div className="vct-craft-copy"><p className="vct-kicker">03 / CRAFTSMANSHIP & GUIDANCE</p><h2 id="vct-craft-title">The difference is<br /><em>in the details.</em></h2><p>Beautiful customisation requires both imagination and practical expertise. We guide material selection, proportions, finishes and execution considerations to help your choices feel intentional and coherent.</p><div className="vct-craft-highlights"><div><span>01</span><strong>Material-led guidance</strong></div><div><span>02</span><strong>Considered finishes</strong></div><div><span>03</span><strong>Coordinated execution</strong></div></div><Link className="vct-inline-link" to="/contact">Discuss your project <span aria-hidden="true">↗</span></Link></div></div></section>

      <section className="vct-gallery vct-section" aria-labelledby="vct-gallery-title"><div className="vct-wrap"><div className="vct-heading-row"><div><p className="vct-kicker">04 / SELECTED INSPIRATION</p><h2 id="vct-gallery-title">A closer look at <em>the possibilities.</em></h2></div>
      {/* <div className="vct-gallery-controls"><span aria-live="polite">{String(slide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span><button type="button" onClick={() => move(-1)} aria-label="Previous inspiration photograph">←</button><button type="button" onClick={() => move(1)} aria-label="Next inspiration photograph">→</button></div> */}
      </div><div className="vct-gallery-stage">
        <button className="vct-gallery-edge-arrow vct-gallery-edge-arrow--prev" type="button" onClick={() => move(-1)} aria-label="Previous inspiration photograph">←</button>
        <button className="vct-gallery-edge-arrow vct-gallery-edge-arrow--next" type="button" onClick={() => move(1)} aria-label="Next inspiration photograph">→</button><div className="vct-gallery-photo"><img src={current.image} key={current.image} alt={current.title} loading="lazy" /></div><div className="vct-gallery-story" aria-live="polite"><p className="vct-kicker">{current.label}</p><h3>{current.title}</h3><p>{current.copy}</p><span>VASUPRIY / BESPOKE EDITION</span></div></div><p className="vct-gallery-note">Imagery is illustrative of interior products and styling possibilities; final designs and materials depend on your chosen scope.</p></div></section>

      <section className="vct-cta vct-section" aria-labelledby="vct-cta-title"><div className="vct-wrap vct-cta-grid"><div><p className="vct-kicker vct-kicker--light">YOUR IDEA. OUR NEXT CONVERSATION.</p><h2 id="vct-cta-title">Imagine it differently.<br /><em>Make it distinctly yours.</em></h2><p>Tell us what you want to create. We'll help you explore custom design possibilities for your space.</p></div><Link className="vct-button vct-button--gold" to="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  )
}
