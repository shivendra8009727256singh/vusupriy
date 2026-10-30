import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import './DropServicingExperience.css'

const asset = (name) => name

const services = [
  { slug: 'architectural-civil-work', title: 'Architectural & Civil Work', image: '/images/services/drop/architectural-civil-work-1.webp', gallery: ['/images/services/drop/architectural-civil-work-1.webp', '/images/services/drop/architectural-civil-work-2.webp', '/images/services/drop/architectural-civil-work-3.webp'], summary: 'Thoughtful structural coordination and practical groundwork for enduring interiors.', details: ['Planning and site-ready civil improvements', 'Coordinated wiring, plumbing and ceiling work', 'Material selection aligned with the approved scope'], highlight: 'Strong foundations make beautiful interiors possible.' },
  { slug: '2d-3d-grfc-drawings', title: '2D, 3D & GRFC Drawings', image: '/images/services/drop/2d-3d-grfc-drawings-1.webp', gallery: ['/images/services/drop/2d-3d-grfc-drawings-1.webp', '/images/services/drop/2d-3d-grfc-drawings-2.webp', '/images/services/drop/2d-3d-grfc-drawings-3.webp'], summary: 'Visualize spaces and architectural details with clear, considered design documentation.', details: ['Spatial and furniture layout drawings', '3D visualizations for materials and finishes', 'GRFC facade and architectural detailing'], highlight: 'See the direction before execution begins.' },
  { slug: 'mirror-glazing-styling', title: 'Mirror & Glazing Styling', image: '/images/services/drop/mirror-glazing-styling-1.webp', gallery: ['/images/services/drop/mirror-glazing-styling-1.webp', '/images/services/drop/mirror-glazing-styling-2.webp', '/images/services/drop/mirror-glazing-styling-3.webp'], summary: 'Refined glass and mirror installations that bring light, depth and elegance.', details: ['Feature mirrors and architectural glass partitions', 'Glazed doors and considered enclosures', 'Skylight and daylight-led design options'], highlight: 'A clearer perspective on beautiful space.' },
  { slug: 'doors-windows-installation', title: 'Doors & Windows Installation', image: '/images/services/drop/doors-windows-installation-1.webp', gallery: ['/images/services/drop/doors-windows-installation-1.webp', '/images/services/drop/doors-windows-installation-2.webp', '/images/services/drop/doors-windows-installation-3.webp'], summary: 'Precisely fitted openings that balance comfort, character and performance.', details: ['UPVC, PVC and wooden door options', 'Glass, wooden and acrylic window solutions', 'Fit, finish and alignment coordination'], highlight: 'Every opening deserves a thoughtful finish.' },
  { slug: 'ac-electrical-fitting', title: 'Centralized AC & Electrical Fitting', image: '/images/services/drop/ac-electrical-fitting-1.webp', gallery: ['/images/services/drop/ac-electrical-fitting-1.webp', '/images/services/drop/ac-electrical-fitting-2.webp', '/images/services/drop/ac-electrical-fitting-3.webp'], summary: 'Integrated climate control, lighting and electrical solutions designed for everyday comfort.', details: ['Ducted and centralized AC coordination', 'Electrical points, fixtures and lighting', 'Practical installation planning and handover'], highlight: 'Comfort works best when it feels effortless.' },
  { slug: 'natural-garden-setup', title: 'Natural Garden Setup', image: '/images/services/drop/natural-garden-setup-1.webp', gallery: ['/images/services/drop/natural-garden-setup-1.webp', '/images/services/drop/natural-garden-setup-2.webp', '/images/services/drop/natural-garden-setup-3.webp'], summary: 'Bring nature into residential and commercial spaces with considered greenery.', details: ['Indoor and outdoor planting concepts', 'Green features suited to each space', 'Installation and maintenance considerations'], highlight: 'Natural elements bring a different kind of luxury.' },
  { slug: '3d-epoxy-flooring', title: '3D Epoxy Flooring', image: '/images/services/drop/3d-epoxy-flooring-1.webp', gallery: ['/images/services/drop/3d-epoxy-flooring-1.webp', '/images/services/drop/3d-epoxy-flooring-2.webp', '/images/services/drop/3d-epoxy-flooring-3.webp'], summary: 'Distinctive seamless floors that combine visual personality with functional finishing.', details: ['Surface preparation and design consultation', 'Decorative and 3D-effect flooring concepts', 'Material and maintenance guidance'], highlight: 'Statement surfaces, from the ground up.' },
  { slug: 'indian-wall-ceiling-art', title: 'Indian Artistry on Walls & Ceilings', image: '/images/services/drop/indian-wall-ceiling-art-1.webp', gallery: ['/images/services/drop/indian-wall-ceiling-art-1.webp', '/images/services/drop/indian-wall-ceiling-art-2.webp', '/images/services/drop/indian-wall-ceiling-art-3.webp'], summary: 'Art-led finishes that celebrate detail, tradition and architectural expression.', details: ['Statement wall art and specialist finishes', 'Decorative ceiling concepts', 'Craft-led detailing aligned to your design'], highlight: 'Craftsmanship transforms details into stories.' },
  { slug: 'curtains-blinds-installation', title: 'Curtains & Blinds Installation', image: '/images/services/drop/curtains-blinds-installation-1.webp', gallery: ['/images/services/drop/curtains-blinds-installation-1.webp', '/images/services/drop/curtains-blinds-installation-2.webp', '/images/services/drop/curtains-blinds-installation-3.webp'], summary: 'Soft furnishings and window treatments made to complement the space.', details: ['Fabric, texture and operating-style consultation', 'Measurement and fitting coordination', 'Privacy, light and finishing considerations'], highlight: 'The final layer makes the space feel complete.' },
  { slug: 'nano-coating-protection', title: 'Nano Coating Protection', image: '/images/services/drop/nano-coating-protection-1.webp', gallery: ['/images/services/drop/nano-coating-protection-1.webp', '/images/services/drop/nano-coating-protection-2.webp', '/images/services/drop/nano-coating-protection-3.webp'], summary: 'Surface-focused protective treatments selected for suitable materials and use cases.', details: ['Suitability review for the chosen substrate', 'Application planning for eligible finishes', 'Care guidance based on selected treatment'], highlight: 'Protect the finishes that define your space.' },
  { slug: 'lift-installation', title: 'Lift Installation', image: '/images/services/drop/lift-installation-1.webp', gallery: ['/images/services/drop/lift-installation-1.webp', '/images/services/drop/lift-installation-2.webp', '/images/services/drop/lift-installation-3.webp'], summary: 'Coordinated vertical-mobility solutions considered alongside architecture and safety.', details: ['Requirements and site-readiness consultation', 'Coordination with qualified lift vendors', 'Fit, access and applicable compliance planning'], highlight: 'Convenience designed into every level.' },
  {
    slug: 'sunroof-skylighting',
    title: 'Sunroof and Skylighting',
    image: '/images/services/drop/mirror-glazing-styling-3.webp',
    gallery: [
      '/images/services/drop/mirror-glazing-styling-3.webp',
      '/images/services/drop/mirror-glazing-styling-2.webp',
      '/images/services/drop/mirror-glazing-styling-1.webp'
    ],
    summary: 'Bring beautiful natural daylight into your space through thoughtfully planned sunroofs and architectural skylighting.',
    details: [
      'Sunroof and skylight design, placement and daylight planning',
      'Suitable glazing, frame systems, drainage and waterproofing considerations',
      'Professional fitting coordination, finishing and maintenance guidance'
    ],
    highlight: 'Open your interiors to a brighter perspective.'
  },
]

const basePath = '/services/drop-servicing-installation'
const serviceLink = (slug) => `${basePath}/${slug}`

function PhotoSlides({ images, title }) {
  const [index, setIndex] = useState(0)
  const photos = images.filter(Boolean)
  useEffect(() => setIndex(0), [title])
  /* VASUPRIY_SLIDE_STORIES_V5 */
  const selectedService = services.find(service => service.title === title)

  const liftStories = [
    {
      eyebrow: 'ARCHITECTURAL ELEGANCE',
      title: 'Luxury Lift Integration',
      description:
        'A lift can become part of the architectural experience, combining smooth vertical movement with beautifully considered interiors.',
    },
    {
      eyebrow: 'DESIGN & PLANNING',
      title: 'Precision Cabin & Shaft Planning',
      description:
        'Thoughtful planning for cabin finishes, access, shaft requirements and the surrounding space creates a seamless design language.',
    },
    {
      eyebrow: 'FINISHING & COORDINATION',
      title: 'A Refined Arrival Experience',
      description:
        'From coordinated installation to the final architectural details, every element contributes to a sophisticated everyday experience.',
    },
  ]

  const serviceStories = selectedService
    ? selectedService.details.map((detail, position) => ({
        eyebrow: [
          'SERVICE VISION',
          'MATERIALS & DETAILING',
          'EXPERT COORDINATION',
        ][position % 3],
        title: detail,
        description: [
          selectedService.summary,
          'Every material and finish is considered in relation to your space, functional needs and overall design direction.',
          'Installation and finishing are coordinated around site conditions and the scope agreed for your project.',
        ][position % 3],
      }))
    : [
        {
          eyebrow: 'SELECTED INTERIOR VISUALS',
          title: 'Thoughtful Details',
          description:
            'Explore selected examples of design, materials and finishing inspiration.',
        },
        {
          eyebrow: 'DESIGN INSPIRATION',
          title: 'Crafted Spaces',
          description:
            'Discover architectural ideas that bring character to carefully planned spaces.',
        },
        {
          eyebrow: 'FINISHING TOUCHES',
          title: 'A Lasting Impression',
          description:
            'Consider the subtle details that contribute to a refined interior.',
        },
      ]

  const stories = title === 'Lift Installation'
    ? liftStories
    : serviceStories

  const slideStory = stories[index % stories.length]
  if (!photos.length) return null
  return (
    <div className="vds-slides">
      <div className="vds-slides-photo">
        <div className="vds-slides-editorial">
  <div className="vds-slides-editorial-top">
    <span className="vds-slides-editorial-line" />
    <span>VASUPRIY INTERIOVILLA</span>
  </div>

  <div className="vds-slides-editorial-content">
  <span className="vds-slides-editorial-label">
    {slideStory.eyebrow}
  </span>
  <h3>{slideStory.title}</h3>
  <p>{slideStory.description}</p>
</div>

  <span className="vds-slides-editorial-bottom">
    CRAFTED WITH PURPOSE
  </span>
</div>
        <img
          className="vds-slides-main"
          src={asset(photos[index])}
          alt={`${title} reference ${index + 1}`}
          loading="lazy"
        />
        <span className="vds-slides-count">{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
      </div>
      <div className="vds-slides-footer">
        <span>SELECTED VISUALS · VASUPRIY INTERIOVILLA</span>
        <div className="vds-slide-buttons">
          <button type="button" onClick={() => setIndex(i => (i - 1 + photos.length) % photos.length)} aria-label="Previous image">←</button>
          <button type="button" onClick={() => setIndex(i => (i + 1) % photos.length)} aria-label="Next image">→</button>
        </div>
      </div>
    </div>
  )
}

export function DropServicingLanding() {
  useEffect(() => {
    const before = document.title
    document.title = 'Drop Servicing & Installation | Vasupriy Interiovilla'
    return () => { document.title = before }
  }, [])

  return (
    <main className="vds">
      {/* HERO */}
      <section className="vds-hero">
        <img className="vds-hero-photo" src={asset('/images/services/drop/mirror-glazing-styling-3.webp')} alt="Architectural and interior execution" fetchPriority="high" />
        <div className="vds-hero-cover" />
        <div className="vds-container vds-hero-content">
          <span className="vds-eyebrow vds-eyebrow-light">VASUPRIY INTERIOVILLA / INTERIOR SERVICES</span>
          <h1>Every Detail.<br /><em>Expertly Executed.</em></h1>
          <p>From architectural groundwork to the finishing touches—coordinated installation services designed around your space.</p>
          <a className="vds-pill vds-pill-gold" href="#drop-services">Explore our services <span>↗</span></a>
        </div>
        <span className="vds-hero-index">01 — 12 / SPECIALIZED SERVICES</span>
      </section>

      {/* INTRO */}
      <section className="vds-intro vds-section">
        <div className="vds-container vds-intro-grid">
          <div><span className="vds-eyebrow">AN INTEGRATED APPROACH</span><h2>See it. Feel it.<br /><em>Get it... at your home</em></h2></div>
          <div><p>Exceptional interiors are built through more than design alone. Our installation offering brings planning, sourcing and on-site coordination together—with attention to the material, the craft and the final detail.</p><div className="vds-intro-signature"><strong>12</strong><span>specialist service categories<br />one considered experience</span></div></div>
        </div>
      </section>

      {/* GRID / SERVICES */}
      <section className="vds-section vds-catalog" id="drop-services">
        <div className="vds-container">
          <div className="vds-section-head"><div><span className="vds-eyebrow">EXPLORE OUR EXPERTISE</span><h2>Installation,<br /><em>beautifully considered.</em></h2></div><p>Select a service to discover its approach, key details and inspiring visual references.</p></div>
          <div className="vds-grid">
            {services.map((item, index) => (
              <Link className="vds-service-card" to={serviceLink(item.slug)} key={item.slug} aria-label={`Explore ${item.title}`}>
                <div className="vds-service-photo"><img src={asset(item.image)} alt="" loading="lazy" /><span className="vds-service-number">{String(index + 1).padStart(2, '0')}</span></div>
                <div className="vds-service-body"><h3>{item.title}</h3><span className="vds-service-visit">View service <span aria-hidden="true">↗</span></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VASUPRIY_DROP_INSTALLATION_PROCESS_V1 */}
      <section className="vds-section vds-install-process" aria-labelledby="vds-install-process-title">
        <div className="vds-container">
          <div className="vds-install-process-head">
            <span className="vds-install-process-kicker">FROM REQUEST TO HANDOVER</span>
            <h2 id="vds-install-process-title">Our installation <em>process.</em></h2>
            <p>A carefully coordinated service journey, from understanding your requirements to the final quality check.</p>
          </div>

          <div className="vds-install-process-grid" aria-label="Our five-step installation process">
            {[
              {
                no: "01",
                title: "Share Your Requirements",
                copy: "Tell us what needs installation, repair or upgrading, along with your location and preferred timeline."
              },
              {
                no: "02",
                title: "Site Assessment & Planning",
                copy: "We review site conditions, technical needs and the specialists required to deliver your service."
              },
              {
                no: "03",
                title: "Quotation & Approval",
                copy: "Review the proposed scope, materials, installation charges and schedule before approving the work."
              },
              {
                no: "04",
                title: "Professional Installation",
                copy: "Our coordinated installation team carries out the approved work with attention to safety and finishing."
              },
              {
                no: "05",
                title: "Quality Check & Handover",
                copy: "We review the completed work, coordinate handover and share applicable care and warranty documentation."
              }
            ].map((step) => (
              <article className="vds-install-process-card" key={step.no}>
                <span className="vds-install-process-number">{step.no}.</span>
                <div className="vds-install-process-card-copy">
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* COMMITMENT */}
      <section className="vds-section vds-commitment">
        <div className="vds-container vds-commitment-layout"><div><span className="vds-eyebrow vds-eyebrow-light">THE VASUPRIY COMMITMENT</span><h2>Defined by care.<br /><em>Delivered with precision.</em></h2></div><div className="vds-commitment-list">{[
          ['01', 'Thoughtful consultation', 'We start with your vision, the site and the practical requirements.'],
          ['02', 'Material-led decisions', 'Suitable options are reviewed around quality, use and design intent.'],
          ['03', 'Coordinated execution', 'Planned handoffs and specialist teams support an organized journey.'],
          ['04', 'Clarity at every step', 'Final scope, timelines and applicable terms are confirmed in the proposal.'],
        ].map(([no, title, desc]) => <div className="vds-commitment-item" key={no}><span>{no}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div></div>
      </section>

      {/* SLIDES */}
      <section className="vds-section vds-showcase"><div className="vds-container"><div className="vds-section-head"><div><span className="vds-eyebrow">A GLIMPSE OF OUR WORLD</span><h2>Details worth<br /><em>looking closer.</em></h2></div><p>Selected architectural spaces, textures and finishing inspiration.</p></div><PhotoSlides images={['/images/services/drop/architectural-civil-work-1.webp','/images/services/drop/mirror-glazing-styling-2.webp','/images/services/drop/doors-windows-installation-1.webp','/images/services/drop/lift-installation-1.webp']} title="Drop servicing collection" /></div></section>

      {/* CTA */}
      <section className="vds-section vds-cta"><div className="vds-container vds-cta-inner"><div><span className="vds-eyebrow vds-eyebrow-light">YOUR PROJECT, OUR PRIORITY</span><h2>Let’s bring the<br /><em>details together.</em></h2><p>Talk to our team about your space, requirements and the services that fit your project.</p></div><Link className="vds-pill vds-pill-gold" to="/contact">Discuss your project <span>↗</span></Link></div></section>
    </main>
  )
}

export function DropServicingDetail() {
  const { serviceSlug } = useParams()
  const item = services.find(service => service.slug === serviceSlug)
  useEffect(() => {
    const before = document.title
    if (item) document.title = `${item.title} | Vasupriy Interiovilla`
    return () => { document.title = before }
  }, [item])
  if (!item) return <Navigate to={basePath} replace />
  const related = services.filter(service => service.slug !== item.slug).slice(0, 3)
  return <main className="vds vds-detail">
    {/* HERO */}
    <section className="vds-hero vds-detail-hero"><img className="vds-hero-photo" src={asset(item.image)} alt={`${item.title} interior service`} fetchPriority="high" /><div className="vds-hero-cover" /><div className="vds-container vds-hero-content"><Link className="vds-back" to={basePath}>← All installation services</Link><span className="vds-eyebrow vds-eyebrow-light">VASUPRIY / SPECIALIZED INSTALLATION</span><h1>{item.title}</h1><p>{item.summary}</p><a href="#service-details" className="vds-pill vds-pill-gold">Explore the details <span>↗</span></a></div></section>
    {/* INTRO */}
    <section className="vds-section vds-intro"><div className="vds-container vds-detail-intro"><div><span className="vds-eyebrow">DESIGNED AROUND YOUR SPACE</span><h2>{item.highlight}</h2></div><p>Thoughtful planning. The right materials. Precise execution.</p></div></section>
    {/* SERVICE DETAILS */}
    <section className="vds-section vds-detail-features" id="service-details"><div className="vds-container"><div className="vds-section-head"><div><span className="vds-eyebrow">SERVICE DETAILS</span><h2>What we <em>consider.</em></h2></div><p>Three details that define our approach.</p></div><div className="vds-detail-editorial">{item.details.map((detail,index) => <article className="vds-editorial-row" key={detail}><div className="vds-editorial-photo"><img src={asset(item.gallery[index % item.gallery.length])} alt={`${item.title}: ${detail}`} loading="lazy" decoding="async" /><span>{String(index+1).padStart(2,'0')} / 03</span></div><div className="vds-editorial-copy"><span className="vds-eyebrow">A CLOSER LOOK</span><h3>{detail}</h3><p>{index===0 ? item.summary : index===1 ? 'Considered materials and specialist expertise, selected to complement the space.' : 'Carefully coordinated around your requirements and the approved project scope.'}</p></div></article>)}</div></div></section>
    {/* SLIDES */}
    <section className="vds-section vds-showcase"><div className="vds-container"><div className="vds-section-head"><div><span className="vds-eyebrow">SELECTED VISUALS</span><h2>Material, form<br /><em>and finish.</em></h2></div><p>Curated references from this service category.</p></div><PhotoSlides images={item.gallery} title={item.title}/></div></section>
    {/* COMMITMENT / HIGHLIGHTS */}
    <section className="vds-section vds-commitment"><div className="vds-container vds-commitment-layout"><div><span className="vds-eyebrow vds-eyebrow-light">OUR COMMITMENT</span><h2>Precision in practice.<br /><em>Confidence in every detail.</em></h2><Link className="vds-pill vds-pill-gold" to="/contact">Request a consultation <span>↗</span></Link></div><div className="vds-commitment-list">{[['01','Personalized requirements','We begin by understanding design intent and site conditions.'],['02','Responsible coordination','Specialists and materials are selected for the agreed requirements.'],['03','Defined deliverables','Scope, schedule, exclusions and care guidance are agreed before execution.']].map(([number,title,description])=><div className="vds-commitment-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div></div></section>
    <section className="vds-section vds-related"><div className="vds-container"><div className="vds-section-head"><div><span className="vds-eyebrow">CONTINUE EXPLORING</span><h2>More ways to <em>create.</em></h2></div></div><div className="vds-related-grid">{related.map(service => <Link key={service.slug} to={serviceLink(service.slug)}><img src={asset(service.image)} alt="" loading="lazy" /><span>{service.title} ↗</span></Link>)}</div></div></section>
  </main>
}
