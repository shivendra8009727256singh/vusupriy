import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './SpaceMakeoverLanding.css'
import SpaceMakeoverIncluded from './SpaceMakeoverIncluded.jsx'
import SpaceMakeoverIntro from './SpaceMakeoverIntro.jsx'
import SpaceMakeoverHero from './SpaceMakeoverHero.jsx'

import heroPhoto from '../../assets/images/renamed-collection/residential-interior-renders/elegant-living-room-13.jpg'
import introPhoto from '../../assets/images/home/projects/space-makeover.png'
import livingPhoto from '../../assets/images/renamed-collection/residential-interior-renders/elegant-living-room-14.jpg'
import roomPhoto from '../../assets/images/renamed-collection/residential-site-photos/modern-bedroom-interior-27.jpg'
import floorPlanPhoto from '../../assets/images/home/expertise/space-planning.png'
import panelPhoto from '../../assets/images/renamed-collection/residential-site-photos/bedroom-wall-paneling-29.jpg'

const inclusions = [
  { number: '01', title: 'Complete Room Transformation', description: 'A fresh visual identity for living rooms, bedrooms and other meaningful spaces.', image: livingPhoto },
  { number: '02', title: 'Space Planning & Layout', description: 'Thoughtful furniture placement and circulation that put every square foot to work.', image: floorPlanPhoto },
  { number: '03', title: 'Aesthetic & Theme Styling', description: 'Coordinated materials, colours, furnishings and lighting to reflect your taste.', image: roomPhoto },
  { number: '04', title: 'Surface & Detail Upgrades', description: 'Feature walls, texture, panel designs and finishing details that make a difference.', image: panelPhoto },
]

const journey = [
  { title: 'Understand your needs', body: 'We begin by understanding your home, personal style and everyday requirements.' },
  { title: 'Design to match', body: 'Our team plans practical layouts, textures and visual concepts tailored to your space.' },
  { title: 'Select with care', body: 'We help you choose suitable materials, furnishings and finishes.' },
  { title: 'Execute with expertise', body: 'We coordinate the approved makeover work with careful attention to details.' },
  { title: 'Seamless support', body: 'We review the completed work and explain care and applicable warranty terms.' },
]

const commitments = [
  { title: 'Expert design guidance', detail: 'A collaborative approach shaped around your room, preferences and practical priorities.' },
  { title: 'Thoughtful material selection', detail: 'Materials and finishes are reviewed for aesthetic fit, practicality and maintenance needs.' },
  { title: 'Coordinated execution', detail: 'A clear scope and planned handoffs help maintain consistency from concept to completion.' },
  { title: '5-year warranty on eligible work', detail: 'Coverage depends on the selected service, materials and the written warranty terms agreed in the quotation.' },
  { title: 'Attention to every detail', detail: 'The experience is guided by finishes, workmanship and the little things that bring a space together.' },
]

const comfortDetails = [
  { number: '1', title: 'Easy access to storage', body: 'Cabinets and shelves planned around comfortable reach and daily routines.', left: '15.6%', top: '30.5%' },
  { number: '2', title: 'Convenient, practical drawers', body: 'Storage that opens smoothly and keeps everyday essentials close at hand.', left: '46.5%', top: '68.3%' },
  { number: '3', title: 'Movement that feels natural', body: 'Thoughtful counter heights, reach and circulation make a space easier to use.', left: '74.1%', top: '56%' },
]
const benefits = [
  { number: '01', title: 'Designed around you', body: 'Every room responds to your lifestyle and the way you want to feel in it.' },
  { number: '02', title: 'Better use of space', body: 'Smart planning makes daily movement, storage and furniture feel effortless.' },
  { number: '03', title: 'A coordinated finish', body: 'Colours, textures, lighting and furnishings come together as one language.' },
  { number: '04', title: 'From idea to execution', body: 'We help connect the design intent with practical project delivery.' },
]

const pricingFactors = [
  'Size and condition of the space',
  'Chosen materials and finishes',
  'Complexity of design and custom work',
  'Installation and execution scope',
]

export default function SpaceMakeoverLanding() {
  const [openCommitment, setOpenCommitment] = useState(0)
  const [activeComfort, setActiveComfort] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Space Designing & Makeover | Vasupriy Interiovilla'
    return () => { document.title = previousTitle }
  }, [])

  const currentSlide = inclusions[activeSlide]
  const changeSlide = direction => setActiveSlide(current => (current + direction + inclusions.length) % inclusions.length)

  return (
    <div className="vsm">
      <SpaceMakeoverHero image={heroPhoto} />

      <SpaceMakeoverIntro />

      <SpaceMakeoverIncluded />

      <section className="vsm-section vsm-process" aria-labelledby="vsm-process-title">
        <div className="vsm-process-backdrop" style={{ backgroundImage: `linear-gradient(105deg, rgba(19,17,19,.60), rgba(19,17,19,.42)), url(${heroPhoto})` }} />
        <div className="vsm-container vsm-process-content">
          <p className="vsm-eyebrow vsm-eyebrow--light">FROM VISION TO REALITY</p>
          <h2 id="vsm-process-title">Installation <em>process.</em></h2>
          <p className="vsm-process-subtitle">Your makeover journey, thoughtfully planned from consultation to completion.</p>
          <div className="vsm-process-timeline" aria-label="Our five step design and makeover process">
            {journey.map((step, index) => (
              <article className="vsm-process-timeline-card" key={step.title}>
                <span className="vsm-process-timeline-number">{String(index + 1).padStart(2, '0')}.</span>
                <div><h3>{step.title}</h3><p>{step.body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vsm-section vsm-commitment" aria-labelledby="vsm-commitment-title">
        <div className="vsm-container vsm-commitment-grid">
          <div><p className="vsm-eyebrow">THE VASUPRIY PROMISE</p><h2 id="vsm-commitment-title">A Legacy of Craftsmanship <em>&amp; Commitment</em></h2><p className="vsm-commitment-lead">Thoughtful planning, considered materials and professional guidance come together to elevate your space, from first idea to finishing detail.</p></div>
          <div className="vsm-accordion">
            {commitments.map((item, index) => (
              <div className="vsm-accordion-item" key={item.title}>
                <button type="button" aria-expanded={openCommitment === index} aria-controls={`vsm-commitment-panel-${index}`} onClick={() => setOpenCommitment(current => current === index ? -1 : index)}>
                  <span>{item.title}</span><span aria-hidden="true" className="vsm-accordion-icon">{openCommitment === index ? '−' : '+'}</span>
                </button>
                <div id={`vsm-commitment-panel-${index}`} hidden={openCommitment !== index}><p>{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vsm-section vsm-comfort" aria-labelledby="vsm-comfort-title">
        <div className="vsm-container vsm-comfort-layout">
          <div className="vsm-comfort-copy">
            <p className="vsm-eyebrow">THE HUMAN SIDE OF DESIGN</p>
            <h2 id="vsm-comfort-title">Where comfort <em>is intentional.</em></h2>
            <p>Thoughtful planning makes every movement feel easier. Explore the design details that bring everyday comfort.</p>
            <div className="vsm-comfort-items">
              {comfortDetails.map((item, index) => (
                <button type="button" key={item.number} className={`vsm-comfort-item ${activeComfort === index ? 'is-active' : ''}`} onClick={() => setActiveComfort(index)} aria-pressed={activeComfort === index}>
                  <span>{item.number}</span><span><strong>{item.title}</strong><small>{item.body}</small></span>
                </button>
              ))}
            </div>
          </div>
          <div className="vsm-comfort-photo">
            <img src="/images/services/comfort/comfort-kitchen.webp" alt="A bright modern kitchen illustrating accessible wall cabinets, convenient drawers and easy-to-reach counter space" loading="lazy" />
            {comfortDetails.map((item, index) => (
              <button type="button" key={item.number} className={`vsm-hotspot ${activeComfort === index ? 'is-active' : ''}`} style={{ left: item.left, top: item.top }} onClick={() => setActiveComfort(index)} aria-label={`Show ${item.title}`} aria-pressed={activeComfort === index}>{item.number}</button>
            ))}

          </div>
        </div>
      </section>

      {/* <section className="vsm-section vsm-benefits" aria-labelledby="vsm-benefits-title">
        <div className="vsm-container vsm-benefits-inner">
          <div className="vsm-benefits-heading">
            <div>
              <p className="vsm-benefits-kicker">THE ADVANTAGE OF THOUGHTFUL DESIGN</p>
              <h2 id="vsm-benefits-title"><em>Benefits.</em></h2>
            </div>
            <p>Better living is in the details. Discover what a carefully planned makeover brings to your everyday spaces.</p>
          </div>
          <div className="vsm-benefits-showcase">
            {benefits.map((item, index) => (
              <article className="vsm-benefits-card" key={item.number}>
                <div className="vsm-benefits-card-photo">
                  <img src={inclusions[index % inclusions.length].image} alt={item.title} loading="lazy" decoding="async" />
                  <span className="vsm-benefits-number">{item.number}</span>
                </div>
                <div className="vsm-benefits-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="vsm-benefits-footnote">Every space is unique. Specific improvements are planned around your room, requirements and approved scope.</p>
        </div>
      </section> */}

      <section className="vsm-section vsm-pricing" aria-labelledby="vsm-pricing-title">
        <div className="vsm-container">
          <div className="vsm-pricing-shell">
            <div className="vsm-pricing-intro">
              <span className="vsm-pricing-kicker">PRICING & PLANNING</span>
              <h2 id="vsm-pricing-title">A beautiful space begins with <em>a clear plan.</em></h2>
              <p>Every space is different, and so is every makeover. Our team prepares a personalised estimate after understanding the room, your design preferences, selected materials and execution requirements.</p>
              <div className="vsm-pricing-actions">
                <Link to="/contact" className="vsm-pricing-action">Request an estimate <span aria-hidden="true">&#8599;</span></Link>
                <span>No fixed package price or hidden assumptions.</span>
              </div>
            </div>
            <div className="vsm-pricing-breakdown">
              <div className="vsm-pricing-breakdown-head">
                <span>YOUR PERSONALISED ESTIMATE</span>
                <span>01 / 04</span>
              </div>
              <h3>What shapes your investment?</h3>
              <div className="vsm-pricing-factors">
                {pricingFactors.map((factor, index) => (
                  <div className="vsm-pricing-factor" key={factor}>
                    <span className="vsm-pricing-factor-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="vsm-pricing-factor-text">{factor}</span>
                    <span className="vsm-pricing-factor-mark" aria-hidden="true">&#8599;</span>
                  </div>
                ))}
              </div>
              <p className="vsm-pricing-disclaimer">Final pricing, deliverables, timelines and any applicable 5-year warranty coverage are confirmed in the written proposal and its terms.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="vsm-section vsm-cta" aria-labelledby="vsm-cta-title">
        <div className="vsm-container">
          <div className="vsm-feature-banner">
            <img src={currentSlide.image} alt={currentSlide.title} loading="lazy" />
            <div className="vsm-feature-scrim" />
            <div className="vsm-feature-copy">
              <span className="vsm-feature-kicker">VASUPRIY INTERIOVILLA</span>
              <h2 id="vsm-cta-title">Designed for <em>your everyday.</em></h2>
              <p>Reimagine your home with practical planning, beautifully coordinated finishes and expert guidance.</p>
            </div>
            <Link to="/contact" className="vsm-feature-link">Explore now <span aria-hidden="true">→</span></Link>
          </div>
          <div className="vsm-feature-slide-controls" aria-label="Featured interior images">
            <span>{String(activeSlide+1).padStart(2,'0')} / {String(inclusions.length).padStart(2,'0')}</span>
            <div><button type="button" onClick={() => changeSlide(-1)} aria-label="Previous design image">←</button><button type="button" onClick={() => changeSlide(1)} aria-label="Next design image">→</button></div>
          </div>
        </div>
      </section>
    </div>
  )
}
