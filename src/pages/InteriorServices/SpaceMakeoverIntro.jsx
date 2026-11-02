import { useState } from 'react'
import { Link } from 'react-router-dom'
import clientGallery from './spaceMakeoverClientGallery.json'
import livingMainNew from '../../assets/images/renamed-collection/residential-interior-renders/elegant-living-room-15.jpg'
import livingSecondaryNew from '../../assets/images/renamed-collection/residential-interior-renders/elegant-living-room-16.jpg'
import livingDetailNew from '../../assets/images/renamed-collection/residential-interior-renders/elegant-living-room-17.jpg'
import './SpaceMakeoverIntro.css'

import livingMain from '../../assets/images/renamed-collection/residential-interior-renders/elegant-living-room-13.jpg'
import livingSecondary from '../../assets/images/renamed-collection/residential-interior-renders/elegant-living-room-14.jpg'
import livingDetail from '../../assets/images/renamed-collection/residential-site-photos/residential-interior-details-46.jpg'
import bedroomMain from '../../assets/images/renamed-collection/residential-site-photos/modern-bedroom-interior-27.jpg'
import bedroomSecondary from '../../assets/images/renamed-collection/residential-site-photos/bedroom-wall-paneling-29.jpg'
import bedroomDetail from '../../assets/images/renamed-collection/residential-site-photos/bedroom-ambient-lighting-30.jpg'
import spaceMain from '../../assets/images/home/expertise/space-planning.png'
import spaceSecondary from '../../assets/images/home/expertise/floor-plan-gallery/floor-plan-01.png'
import spaceDetail from '../../assets/images/home/expertise/design-visualization.png'

// VASUPRIY_CLIENT_SPACE_MAKEOVER_GALLERY_162
const clientCategories = [
  { tab: 'Living Room', folder: 'Living room', title: 'Thoughtful living room designs, tailored around you', description: 'Explore the complete client collection of living room interiors.', featureOne: ['Design focus', 'Balanced layouts'], featureTwo: ['Atmosphere', 'Warm & welcoming'] },
  { tab: 'Bedroom', folder: 'Bedroom', title: 'Comfortable bedroom retreats with refined details', description: 'Explore the client bedroom design collection.', featureOne: ['Design focus', 'Rest & comfort'], featureTwo: ['Atmosphere', 'Soft & tranquil'] },
  { tab: 'Kitchen', folder: 'Kitchen', title: 'Beautiful kitchens designed for daily living', description: 'Explore layouts, storage and finishes from the client kitchen collection.', featureOne: ['Design focus', 'Storage & flow'], featureTwo: ['Atmosphere', 'Practical & elegant'] },
  { tab: 'Washroom', folder: 'Washroom', title: 'Considered washrooms with modern finishes', description: 'Discover the complete client washroom inspiration collection.', featureOne: ['Design focus', 'Comfort & function'], featureTwo: ['Finishes', 'Clean & refined'] },
  { tab: 'Office', folder: 'Office', title: 'Workspaces designed for focus and comfort', description: 'Explore the office interiors supplied in the client collection.', featureOne: ['Design focus', 'Productive layouts'], featureTwo: ['Atmosphere', 'Professional & calm'] },
  { tab: 'Puja Room', folder: 'Puja room', title: 'Peaceful spaces for prayer and reflection', description: 'Explore the client puja room designs.', featureOne: ['Design focus', 'Thoughtful detailing'], featureTwo: ['Atmosphere', 'Serene & timeless'] },
  { tab: 'Stairs', folder: 'Stairs', title: 'Staircases shaped by beautiful detailing', description: 'Explore the client staircase design collection.', featureOne: ['Design focus', 'Flow & structure'], featureTwo: ['Finishes', 'Crafted details'] },
  { tab: 'Pergola', folder: 'Pergola', title: 'Inviting outdoor pergola spaces', description: 'Explore the pergola and outdoor styling references.', featureOne: ['Design focus', 'Outdoor comfort'], featureTwo: ['Atmosphere', 'Open & inviting'] },
  { tab: 'Cafe / Restaurant / Salon', folder: 'Cafe, Restaurant, Salon', title: 'Distinctive commercial interiors', description: 'Browse the full cafe, restaurant and salon collection from the client.', featureOne: ['Design focus', 'Customer experience'], featureTwo: ['Atmosphere', 'Distinctive & welcoming'] },
]
const clientExamples = clientCategories.map(category => ({
  ...category,
  gallery: clientGallery[category.folder] || [],
}))
const spacePlanningExample = {
  tab: 'Space Planning',
  title: 'Intelligent space planning for everyday living',
  description: 'Making every inch work harder through clear movement, smart layouts and design visualisation.',
  featureOne: ['Design focus', 'Optimised layouts'],
  featureTwo: ['Approach', 'Plan & visualise'],
  gallery: [spaceMain, spaceDetail, spaceSecondary],
}
const examples = [...clientExamples.slice(0, 2), spacePlanningExample, ...clientExamples.slice(2)]

export default function SpaceMakeoverIntro() {
  const [index, setIndex] = useState(0)
  const [photoIndex, setPhotoIndex] = useState(0)
  const active = examples[index]
  const photos = active.gallery
  const galleryLength = photos.length
  const mainPhoto = photos[photoIndex % galleryLength]
  const detailPhoto = photos[(photoIndex + 1) % galleryLength]
  const supportingPhoto = photos[(photoIndex + 2) % galleryLength]
  const selectTab = next => {
    setIndex((next + examples.length) % examples.length)
    setPhotoIndex(0)
  }
  const movePhoto = direction => setPhotoIndex(current => (current + direction + galleryLength) % galleryLength)

  return (
    <section className="vsm-intro-ref" id="vsm-intro" aria-labelledby="vsm-intro-title">
      <div className="vsm-intro-ref__container">
        <h2 id="vsm-intro-title">Explore thoughtful spaces shaped by beautiful detail</h2>
        <div className="vsm-intro-ref__tabs" role="tablist" aria-label="Explore our makeover design areas">
          {examples.map((example, tabIndex) => (
            <button
              id={`vsm-intro-tab-${tabIndex}`}
              key={example.tab}
              type="button"
              role="tab"
              aria-selected={index === tabIndex}
              aria-controls="vsm-intro-active-panel"
              tabIndex={index === tabIndex ? 0 : -1}
              className={index === tabIndex ? 'is-selected' : ''}
              onClick={() => selectTab(tabIndex)}
              onKeyDown={event => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                  event.preventDefault()
                  const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + examples.length) % examples.length
                  selectTab(next)
                  event.currentTarget.parentNode.querySelectorAll('[role="tab"]')[next]?.focus()
                }
              }}
            >{example.tab}</button>
          ))}
        </div>
        <div className="vsm-intro-ref__stage" id="vsm-intro-active-panel" role="tabpanel" aria-labelledby={`vsm-intro-tab-${index}`}>
          <div className="vsm-intro-ref__main-image" key={`${index}-${photoIndex}-main`}>
            <img src={mainPhoto} alt={`${active.tab} client design reference ${photoIndex + 1}`} loading="lazy" decoding="async" />
          </div>
          <div className="vsm-intro-ref__editorial" key={`${index}-${photoIndex}-side`}>
            <h3>{active.title}</h3>
            <p className="vsm-intro-ref__description">{active.description}</p>
            <div className="vsm-intro-ref__tile vsm-intro-ref__tile--top"><img src={detailPhoto} alt={`${active.tab} additional design reference`} loading="lazy" decoding="async" /></div>
            <div className="vsm-intro-ref__tile vsm-intro-ref__tile--bottom"><img src={supportingPhoto} alt={`${active.tab} detail reference`} loading="lazy" decoding="async" /></div>
            <div className="vsm-intro-ref__specs">
              <div><span>{active.featureOne[0]}</span><strong>{active.featureOne[1]}</strong></div>
              <div><span>{active.featureTwo[0]}</span><strong>{active.featureTwo[1]}</strong></div>
            </div>
            <Link className="vsm-intro-ref__link" to="/contact" state={{service: `Space Designing & Makeover - ${active.tab}`}}>Explore this service <span aria-hidden="true"></span></Link>
          </div>
          <button className="vsm-intro-ref__arrow vsm-intro-ref__arrow--prev" onClick={() => selectTab(index - 1)} type="button" aria-label="Previous makeover category"></button>
          <button className="vsm-intro-ref__arrow vsm-intro-ref__arrow--next" onClick={() => selectTab(index + 1)} type="button" aria-label="Next makeover category"></button>
        </div>
        <div className="vsm-intro-ref__gallery-controls" aria-label={`${active.tab} photo gallery`}>
          <span className="vsm-intro-ref__gallery-count">{active.tab}  {String(photoIndex + 1).padStart(2, '0')} / {String(galleryLength).padStart(2, '0')}</span>
          <div className="vsm-intro-ref__gallery-buttons">
            <button type="button" onClick={() => movePhoto(-1)} aria-label={`Previous ${active.tab} photo`}></button>
            <button type="button" onClick={() => movePhoto(1)} aria-label={`Next ${active.tab} photo`}></button>
          </div>
        </div>
        <div className="vsm-intro-ref__gallery-thumbs" aria-label={`${active.tab} gallery thumbnails`}>
          {photos.map((photo, i) => (
            <button key={`${active.tab}-${i}`} type="button" className={photoIndex === i ? 'is-active' : ''} aria-label={`Show ${active.tab} photo ${i + 1}`} aria-pressed={photoIndex === i} onClick={() => setPhotoIndex(i)}>
              <img src={photo} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}