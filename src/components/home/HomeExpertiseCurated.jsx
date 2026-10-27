import './HomeExpertiseCurated.css'
// Reference-image slots: missing images fall back to existing Vasupriy artwork.
const expertiseReferenceImages = [
  '/images/home/expertise-reference/renovation.jpg',
  '/images/home/expertise-reference/consultation.jpg',
  '/images/home/expertise-reference/space-planning.jpg',
  '/images/home/expertise-reference/visualization.jpg',
]

// Placeholder images — swap these for the final artwork
import renovationImage from '../../assets/images/home/expertise/turnkey-execution.png'
import consultationImage from '../../assets/images/home/expertise/architectural-solutions.png'
import spacePlanningImage from '../../assets/images/home/expertise/space-planning.png'
import visualizationImage from '../../assets/images/home/expertise/design-visualization.png'

const curatedExpertise = [
  {
    title: ['Renovation and', 'remodeling'],
    description:
      'Thoughtful upgrades that refresh layouts, finishes and services while respecting how the space is already used.',
    image: renovationImage,
  },
  {
    title: ['Custom design', 'consultation'],
    description:
      'One-on-one sessions to shape a design direction around your lifestyle, brand, budget and timeline.',
    image: consultationImage,
  },
  {
    title: ['Space planning', 'and layout'],
    description:
      'Functional zoning, circulation and furniture planning that make every square foot work harder.',
    image: spacePlanningImage,
  },
  {
    title: ['3D design', 'visualization'],
    description:
      'Photo-real renders that let you walk through materials, lighting and details before execution begins.',
    image: visualizationImage,
  },
]

function HomeExpertiseCurated() {
  return (
    <section
      className="home-curated"
      id="home-curated"
      data-scroll-section
    >
      <div className="site-container home-curated-container">
        <div className="home-curated-heading" data-reveal>
          <span className="home-curated-label">
            <span aria-hidden="true" />
            Our Expertise
          </span>

          <h2>
            Curating the perfect <em>pieces</em>
            <br />
            <em>to complete</em> your space
          </h2>
        </div>

        <div className="home-curated-grid">
          {curatedExpertise.map((item, index) => (
            <article
              className="home-curated-item"
              key={item.title.join(' ')}
              data-reveal
              style={{ '--premium-reveal-delay': `${index * 110}ms` }}
            >
              <div className="home-curated-image">
                <img
                  src={expertiseReferenceImages[index]} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = item.image }}
                  alt={item.title.join(' ')}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="home-curated-content">
                <h3>
                  {item.title[0]}
                  <br />
                  {item.title[1]}
                </h3>

                <span className="home-curated-line" aria-hidden="true" />

                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeExpertiseCurated
