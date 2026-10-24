import { useState } from 'react'
import { Link } from 'react-router-dom'
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

const examples = [
  {
    tab: 'Living Room',
    title: 'A thoughtful living room, tailored around you',
    image: livingMain,
    supporting: livingSecondary,
    detail: livingDetail,
    featureOne: ['Design focus', 'Balanced layouts'],
    featureTwo: ['Atmosphere', 'Warm & welcoming'],
    description: 'Thoughtful layout, calm textures and coordinated finishes for the moments that matter.',
  },
  {
    tab: 'Bedroom',
    title: 'A calming bedroom retreat with refined details',
    image: bedroomMain,
    supporting: bedroomSecondary,
    detail: bedroomDetail,
    featureOne: ['Design focus', 'Rest & comfort'],
    featureTwo: ['Atmosphere', 'Soft & tranquil'],
    description: 'A personal retreat shaped by beautiful materials, functional storage and restful light.',
  },
  {
    tab: 'Space Planning',
    title: 'Intelligent space planning for everyday living',
    image: spaceMain,
    supporting: spaceSecondary,
    detail: spaceDetail,
    featureOne: ['Design focus', 'Optimised layouts'],
    featureTwo: ['Approach', 'Plan & visualise'],
    description: 'Making every inch work harder through clearer movement, smart layouts and design visualisation.',
  },
]

export default function SpaceMakeoverIntro() {
  const [index, setIndex] = useState(0)
  const active = examples[index]
  const move = direction => setIndex(current => (current + direction + examples.length) % examples.length)

  return (
    <section className="vsm-intro-ref" id="vsm-intro" aria-labelledby="vsm-intro-title">
      <div className="vsm-intro-ref__container">
        <h2 id="vsm-intro-title">Explore thoughtful spaces shaped by beautiful detail</h2>
        <div className="vsm-intro-ref__tabs" role="tablist" aria-label="Explore our makeover design areas">
          {examples.map((example, tabIndex) => (
            <button
              id={`vsm-intro-tab-${tabIndex}`}
              key={example.tab}
              role="tab"
              type="button"
              aria-selected={index === tabIndex}
              aria-controls="vsm-intro-active-panel"
              tabIndex={index === tabIndex ? 0 : -1}
              className={index === tabIndex ? 'is-selected' : ''}
              onClick={() => setIndex(tabIndex)}
              onKeyDown={event => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                  event.preventDefault()
                  const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + examples.length) % examples.length
                  setIndex(next)
                  event.currentTarget.parentNode.querySelectorAll('[role="tab"]')[next]?.focus()
                }
              }}
            >{example.tab}</button>
          ))}
        </div>
        <div className="vsm-intro-ref__stage" id="vsm-intro-active-panel" role="tabpanel" aria-labelledby={`vsm-intro-tab-${index}`}>
          <div className="vsm-intro-ref__main-image" key={`${index}-main`}>
            <img src={active.image} alt={`${active.tab} design by Vasupriy Interiovilla`} loading="lazy" decoding="async" />
          </div>
          <div className="vsm-intro-ref__editorial" key={`${index}-side`}>
            <h3>{active.title}</h3>
            <p className="vsm-intro-ref__description">{active.description}</p>
            <div className="vsm-intro-ref__tile vsm-intro-ref__tile--top"><img src={active.detail} alt={`${active.tab} material and detail inspiration`} loading="lazy" /></div>
            <div className="vsm-intro-ref__tile vsm-intro-ref__tile--bottom"><img src={active.supporting} alt={`${active.tab} design inspiration`} loading="lazy" /></div>
            <div className="vsm-intro-ref__specs">
              <div><span>{active.featureOne[0]}</span><strong>{active.featureOne[1]}</strong></div>
              <div><span>{active.featureTwo[0]}</span><strong>{active.featureTwo[1]}</strong></div>
            </div>
            <Link className="vsm-intro-ref__link" to="/contact" state={{service: `Space Designing & Makeover - ${active.tab}`}}>Explore this service <span aria-hidden="true">↗</span></Link>
          </div>
          <button className="vsm-intro-ref__arrow vsm-intro-ref__arrow--prev" onClick={() => move(-1)} type="button" aria-label="Previous makeover category">‹</button>
          <button className="vsm-intro-ref__arrow vsm-intro-ref__arrow--next" onClick={() => move(1)} type="button" aria-label="Next makeover category">›</button>
        </div>
      </div>
    </section>
  )
}
