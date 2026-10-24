import { useEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom' // re-enable with the footer below
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import project01 from '../../assets/images/home/scroll-projects/project-01.png'
import project02 from '../../assets/images/home/scroll-projects/project-02.png'
import project03 from '../../assets/images/home/scroll-projects/project-03.png'

import './ResidentialScrollProjects.css'

gsap.registerPlugin(ScrollTrigger)

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

  /* Antra index-4 project stack (ported from antra main.js):
     each item except the last pins at "top 15%" and scrubs to
     scale 0.6 / opacity 0 while the next item scrolls over it. */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const mm = gsap.matchMedia()

    mm.add(
      '(min-width: 992px) and (prefers-reduced-motion: no-preference)',
      () => {
        gsap.utils
          .toArray('.vasu-project-panel', section)
          .forEach((element, index, array) => {
            if (index === array.length - 1) return

            gsap.to(element, {
              scale: 0.6,
              opacity: 0,
              duration: 2,
              scrollTrigger: {
                trigger: element,
                start: 'top 15%',
                end: 'bottom 15%',
                scrub: 2,
                pin: true,
                pinSpacing: false,
              },
            })
          })
      }
    )

    // Images load lazily; recalc trigger positions once they arrive
    const images = section.querySelectorAll('img')
    const refresh = () => ScrollTrigger.refresh()
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', refresh, { once: true })
    })

    return () => {
      images.forEach((img) => img.removeEventListener('load', refresh))
      mm.revert()
    }
  }, [])

  /* Intro counter: last panel whose top has passed mid-viewport */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    let raf = 0

    const update = () => {
      raf = 0

      const panels = section.querySelectorAll('.vasu-project-panel')
      const viewportMiddle = window.innerHeight * 0.5
      let current = 0

      panels.forEach((panel, index) => {
        if (panel.getBoundingClientRect().top <= viewportMiddle) {
          current = index
        }
      })

      setActive((previous) => (previous === current ? previous : current))
    }

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }

    update()

    window.addEventListener('scroll', onScroll, { passive: true })
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
            style={{ zIndex: index + 1 }}
          >
            <div className="vasu-project-thumb">
              <img
                src={project.image}
                alt={`${project.title} - ${project.category}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />

              <ul className="vasu-project-tags">
                <li>{project.category}</li>
                <li>{project.type}</li>
              </ul>

              <span className="vasu-project-number">
                {project.number}
              </span>
            </div>

            <div className="vasu-project-content">
              <h3>{project.title}</h3>
              <p>Vasupriy Interiovilla</p>
            </div>
          </article>
        ))}
      </div>

      {/* <footer className="vasu-project-footer">
        <span>Explore more inspiring interior spaces</span>

        <Link to="/projects">
          Explore All Projects
          <span aria-hidden="true"> ↗</span>
        </Link>
      </footer> */}
    </section>
  )
}
