import { useEffect, useMemo, useRef, useState } from 'react'
import projectsData from './projectsData.json'
import './Projects.css'

const DETAILS = {
  jalsa: { title: 'Jalsa', location: 'Gurgaon' },
  '65th-avenue': { title: '65th Avenue', location: 'Gurgaon' },
  'samsung-head-office': { title: 'Samsung Head Office', location: 'Noida' },
  miricall: { title: 'Miricall', location: 'Dehradun' },
  'ascent-international-school': { title: 'Ascent International School', location: 'Greater Noida' },
}

const projects = projectsData.map((project, index) => ({
  ...project,
  ...DETAILS[project.slug],
  number: String(index + 1).padStart(2, '0'),
}))

function ProjectGallery({ project, onClose }) {
  const [selected, setSelected] = useState(0)
  const closeRef = useRef(null)
  const images = project.images

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = event => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setSelected(current => (current + 1) % images.length)
      if (event.key === 'ArrowLeft') setSelected(current => (current - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [images, onClose])

  const move = direction => setSelected(current => (current + direction + images.length) % images.length)

  return (
    <div className="lux-project-viewer" role="dialog" aria-modal="true" aria-label={`${project.title} project photography`}>
      <button className="lux-viewer-backdrop" type="button" onClick={onClose} aria-label="Close project gallery" />
      <div className="lux-viewer-shell">
        <div className="lux-viewer-top">
          <div className="lux-viewer-identity">
            <span>VASUPRIY / SELECTED WORK</span>
            <h2>{project.title}</h2>
            <p>{project.location}</p>
          </div>
          <button className="lux-viewer-close" type="button" ref={closeRef} onClick={onClose} aria-label="Close gallery">
            <span aria-hidden="true">×</span> CLOSE
          </button>
        </div>
        <div className="lux-viewer-stage">
          <button className="lux-viewer-arrow lux-viewer-prev" type="button" onClick={() => move(-1)} aria-label="Previous photograph">←</button>
          <img src={images[selected]} alt={`${project.title}, photograph ${selected + 1} of ${images.length}`} />
          <button className="lux-viewer-arrow lux-viewer-next" type="button" onClick={() => move(1)} aria-label="Next photograph">→</button>
        </div>
        <div className="lux-viewer-bottom">
          <div className="lux-viewer-count"><strong>{String(selected + 1).padStart(2, '0')}</strong><span>/ {String(images.length).padStart(2, '0')}</span></div>
          <div className="lux-viewer-thumbs" aria-label="Choose photograph">
            {images.map((image, index) => (
              <button key={`${image}-${index}`} type="button" className={index === selected ? 'is-current' : ''} onClick={() => setSelected(index)} aria-label={`Show photograph ${index + 1}`} aria-pressed={index === selected}>
                <img src={image} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeSlug, setActiveSlug] = useState(null)
  const [filter, setFilter] = useState('All')
  const [heroIndex, setHeroIndex] = useState(2)
  const selectedProject = useMemo(() => projects.find(item => item.slug === activeSlug), [activeSlug])
  const locations = ['All', ...new Set(projects.map(item => item.location))]
  const visible = filter === 'All' ? projects : projects.filter(item => item.location === filter)
  const heroProject = projects[heroIndex] || projects[0]

  // Automatically cycle through featured projects forever.
  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex(current => (current + 1) % projects.length)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const elements = document.querySelectorAll('.lux-projects .lux-reveal')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' })
    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [filter])

  return (
    <main className="lux-projects">
      <section className="lux-hero" aria-label="Selected projects">
        <div className="lux-hero-photo" key={heroProject.slug}>
          <img src={heroProject.images[0]} alt={`${heroProject.title} interior project`} fetchPriority="high" />
        </div>
        <div className="lux-hero-shade" />
        <div className="lux-hero-content">
          <div className="lux-eyebrow lux-hero-eyebrow"><span className="lux-line" /> VASUPRIY INTERIOVILLA <span className="lux-dot">·</span> OUR PORTFOLIO</div>
          <h1>Spaces with<br /><em>a point of view.</em></h1>
          <div className="lux-hero-bottomline">
            <p>Architecture, atmosphere and thoughtful details — a collection of spaces shaped with intention.</p>
            <a href="#selected-work" className="lux-text-link">DISCOVER OUR WORK <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="lux-hero-rail">
          <div className="lux-hero-feature"><span>FEATURED PROJECT</span><strong>{heroProject.title}</strong><small>{heroProject.location}</small></div>
          <div className="lux-hero-controls" aria-label="Featured project controls">
            <button type="button" onClick={() => setHeroIndex(i => (i - 1 + projects.length) % projects.length)} aria-label="Previous featured project">←</button>
            <span>{String(heroIndex + 1).padStart(2, '0')} <i>/</i> {String(projects.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => setHeroIndex(i => (i + 1) % projects.length)} aria-label="Next featured project">→</button>
          </div>
        </div>
        <div className="lux-scroll-cue" aria-hidden="true"><span /> SCROLL TO EXPLORE</div>
      </section>

      <section className="lux-intro" id="selected-work">
        <div className="lux-intro-top lux-reveal">
          <div className="lux-eyebrow"><span className="lux-line" /> SELECTED WORK / 2026</div>
          <span className="lux-intro-index">01 — 05</span>
        </div>
        <div className="lux-intro-body lux-reveal">
          <h2>Every space<br />has <em>its own story.</em></h2>
          <p>Explore a considered collection of spaces across Gurgaon, Noida, Greater Noida and Dehradun. Each project is presented through its original photography.</p>
        </div>
        <div className="lux-intro-rule" />
        <div className="lux-filter-row lux-reveal" aria-label="Filter projects by location">
          <span>EXPLORE BY LOCATION</span>
          <div className="lux-filter-options">
            {locations.map(location => (
              <button type="button" key={location} className={filter === location ? 'is-active' : ''} onClick={() => setFilter(location)} aria-pressed={filter === location}>{location}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="lux-works" aria-label="Project portfolio">
        {visible.map((project, index) => (
          <article className={`lux-work lux-work-${index % 3} lux-reveal`} key={project.slug}>
            <button className="lux-work-image" type="button" onClick={() => setActiveSlug(project.slug)} aria-label={`Explore ${project.title} photography`}>
              <img src={project.images[0]} alt={`${project.title} project in ${project.location}`} loading="lazy" />
              <span className="lux-work-image-overlay" />
              <span className="lux-work-explore">EXPLORE PROJECT <span aria-hidden="true">↗</span></span>
              <span className="lux-work-serial">{project.number} / {String(projects.length).padStart(2, '0')}</span>
            </button>
            <div className="lux-work-details">
              <div className="lux-work-kicker"><span>{project.location}</span><span>{String(project.images.length).padStart(2, '0')} PHOTOGRAPHS</span></div>
              <button type="button" className="lux-work-title" onClick={() => setActiveSlug(project.slug)}>
                <h3>{project.title}</h3><span aria-hidden="true">↗</span>
              </button>
              <div className="lux-work-divider" />
            </div>
          </article>
        ))}
      </section>

      <div className="lux-endnote"><span>VASUPRIY INTERIOVILLA</span><span>CRAFTED SPACES. LASTING IMPRESSIONS.</span></div>
      {selectedProject && <ProjectGallery key={selectedProject.slug} project={selectedProject} onClose={() => setActiveSlug(null)} />}
    </main>
  )
}
