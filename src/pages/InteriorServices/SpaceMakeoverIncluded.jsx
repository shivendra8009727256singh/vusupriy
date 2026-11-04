import clientGallery from './spaceMakeoverClientGallery.json'
import spacePlanningPhoto from '../../assets/images/home/expertise/space-planning.png'
import './SpaceMakeoverIncluded.css'

// VASUPRIY_MASONRY_ALL_11_CATEGORIES
const cards = [
  { title: 'Living Room', image: clientGallery['Living room'][0] },
  { title: 'Bedroom', image: clientGallery['Bedroom'][0] },
  { title: 'Kitchen', image: clientGallery['Kitchen'][0] },
  { title: 'Washroom', image: clientGallery['Washroom'][0] },
  { title: 'Office', image: clientGallery['Office'][0] },
  { title: 'Puja Room', image: clientGallery['Puja room'][0] },
  { title: 'Stairs', image: clientGallery['Stairs'][0] },
  { title: 'Pergola', image: clientGallery['Pergola'][0] },
  { title: 'Cafe / Restaurant / Salon', image: clientGallery['Cafe, Restaurant, Salon'][0] },
]

export default function SpaceMakeoverIncluded() {
  return (
    <section
      className="vsm-included-ref"
      id="vsm-included"
      aria-labelledby="vsm-included-title"
    >
      <div className="vsm-included-ref__container">
        <header className="vsm-included-ref__heading">
          <h2 id="vsm-included-title">
            Start with what you want to change
          </h2>
          <p>We'll take it from there</p>
        </header>

        <div className="vsm-included-ref__grid">
          {cards.map((card, index) => (
            <article
              className={`vsm-included-ref__card vsm-included-ref__card--${index + 1}`}
              key={card.title}
            >
              <img
                src={card.image}
                alt={`${card.title} interior design`}
                loading="lazy"
                decoding="async"
              />
              <div className="vsm-included-ref__overlay" />
              <h3>{card.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}