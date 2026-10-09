import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import project01 from '../../assets/images/home/scroll-projects/project-01.png'
import project02 from '../../assets/images/home/scroll-projects/project-02.png'
import project03 from '../../assets/images/home/scroll-projects/project-03.png'

import './ResidentialScrollProjects.css'

const projects = [
  {
    number: '01',
    title: 'Elegant Dining',
    category: 'Residential Interior',
    type: 'Refined Dining Spaces',
    image: project01,
  },
  {
    number: '02',
    title: 'Luxury Living',
    category: 'Single Home',
    type: 'Luxury Residential Design',
    image: project02,
  },
  {
    number: '03',
    title: 'Modern Retreat',
    category: 'Residential Interior',
    type: 'Contemporary Living Spaces',
    image: project03,
  },
]

export default function ResidentialScrollProjects() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    let raf = 0

    const update = () => {
      raf = 0

      const panels = section.querySelectorAll(
        '.vasu-project-panel'
      )

      if (!panels.length) return

      const viewportMiddle = window.innerHeight * 0.5
      let current = 0

      panels.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect()

        if (rect.top <= viewportMiddle) {
          current = index
        }
      })

      setActive((previous) =>
        previous === current ? previous : current
      )
    }

    const onScroll = () => {
      if (!raf) {
        raf = window.requestAnimationFrame(update)
      }
    }

    update()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)

      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="vasu-scroll-projects"
      id="residential-projects"
      aria-label="Residential and single home projects"
    >
      <header className="vasu-project-intro">
        <div className="vasu-project-intro-inner">
          <div>
            <span className="vasu-project-eyebrow">
              Selected Interior Spaces
            </span>

            <h2>
              Residential <em>&amp; Single Home</em>
            </h2>
          </div>

          <div className="vasu-project-intro-side">
            <span>Designed for inspired living</span>
            <span className="vasu-project-count">
              0{active + 1} / 03
            </span>
          </div>
        </div>
      </header>

      <div className="vasu-project-list">
        {projects.map((project, index) => (
          <article
            className="vasu-project-panel"
            key={project.number}
            style={{ '--panel-index': index }}
          >
            <div className="vasu-project-image">
              <img
                src={project.image}
                alt={`${project.title} - ${project.category}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />

              <div className="vasu-project-image-shade" />

              <div className="vasu-project-image-top">
                <div className="vasu-project-tags">
                  <span>{project.category}</span>
                  <span>{project.type}</span>
                </div>

                <span className="vasu-project-number">
                  {project.number}
                </span>
              </div>

              <div className="vasu-project-image-brand">
                VASUPRIY INTERIOVILLA
              </div>
            </div>

            <div className="vasu-project-content">
              <div>
                <span className="vasu-project-content-label">
                  Featured Project / {project.number}
                </span>

                <h3>{project.title}</h3>
              </div>

              <div className="vasu-project-content-right">
                <span>{project.category}</span>
                <span>{project.type}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="vasu-project-footer">
        <span>Explore more inspiring interior spaces</span>

        <Link to="/projects">
          Explore All Projects
          <span aria-hidden="true"> ↗</span>
        </Link>
      </footer>
    </section>
  )
}