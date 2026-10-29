/* VASUPRIY_SINGLE_SOLUTION_STATIC_V1 */
import '../../components/home/SingleSolutionVideos.css'
import './HomeHeroEntrance.css'
import aboutFloorPlan from '../../assets/images/home/expertise/floor-plan-gallery/floor-plan-05.png'
import { useState as useExpertiseState } from 'react'
import solutionBrandImage from '../../assets/images/renamed-collection/commercial-site-photos/modern-commercial-space-interior-01.jpg'
import solutionProductImage from '../../assets/images/renamed-collection/residential-site-photos/residential-interior-details-46.jpg'
import solutionDesignImage from '../../assets/images/renamed-collection/residential-interior-renders/elegant-living-room-14.jpg'
import aboutVasupriyInterior from '../../assets/images/home/about-vasupriy-interior.png'
import { useEffect, useRef, useState } from 'react'
import useDecodedSelection, { createDecodedSelection } from '../../hooks/useDecodedSelection.js'
import { Link } from 'react-router-dom'

import '../../App.css'
import './HomeAboutShowcaseBackground.css'
import './HomeAboutChapters.css'
import useScrollMotion from '../../hooks/useScrollMotion.js'
import InteriorProductsPreview from '../../components/home/InteriorProductsPreview.jsx'
// import FloorPlanGallery from '../../components/home/FloorPlanGallery.jsx'
import HomeExpertiseCurated from '../../components/home/HomeExpertiseCurated.jsx'

import WhyVasupriy from '../../components/home/WhyVasupriy.jsx'
import HomeGallery from '../../components/home/HomeGallery.jsx'
import ResidentialScrollProjects from '../../components/home/ResidentialScrollProjects.jsx'

import vasupriyLogo from '../../assets/brand/logo 2 vasupriya.png'
import BrandStrip from '../../components/home/BrandStrip.jsx'
import antra4HeroImage from '../../assets/images/home/hero-interior.png'
import heroArchitectureWatermark from '../../assets/images/home/hero-architecture-watermark.png'
import residentialInterior from '../../assets/images/home/projects/residential-interior.png'
import commercialSpace from '../../assets/images/home/projects/commercial-space.png'
import spaceMakeover from '../../assets/images/home/projects/space-makeover.png'
import serviceMakeover from '../../assets/images/renamed-collection/residential-interior-renders/elegant-living-room-14.jpg'
import serviceExecution from '../../assets/images/renamed-collection/commercial-site-photos/cafe-service-counter-17.jpg'
import serviceArchitecture from '../../assets/images/renamed-collection/cafe-interiors/cafe-feature-wall-05.jpg'
import expertiseInterior from '../../assets/images/home/expertise/expertise-interior.png'
import interiorShowcaseImage from '../../assets/images/home/interior-showcase.png'

import expertiseFeature from '../../assets/images/home/expertise/expertise-feature.png'
import expertiseSpacePlanning from '../../assets/images/home/expertise/space-planning.png'
import expertiseDesignVisualization from '../../assets/images/home/expertise/design-visualization.png'
import expertiseArchitecture from '../../assets/images/home/expertise/architectural-solutions.png'
import expertiseTurnkey from '../../assets/images/home/expertise/turnkey-execution.png'
const aboutChapters = [
  {
    label: 'Designing', title: 'Designed for Living',
    description: 'A thoughtful dialogue between your everyday routines, timeless aesthetics and practical design.',
    keywords: 'Residential · Spatial Planning · Comfort', image: aboutVasupriyInterior,
    alt: 'Warm, contemporary interior design by Vasupriy', link: '/services/space-designing-makeover',
  },
  {
    label: 'Materials', title: 'Made with Precision',
    description: 'From considered material choices to coordinated craftsmanship, every detail has a purpose.',
    keywords: 'Execution · Detail · Craft', image: solutionBrandImage,
    alt: 'Refined commercial interior highlighting material craftsmanship', link: '/services/drop-servicing-installation',
  },
  {
    label: 'Walkthrough', title: 'Distinctly Yours',
    description: 'Personalised finishes, furniture and statement features that reflect your individual design language.',
    keywords: 'Customisation · Finishes · Identity', image: solutionProductImage,
    alt: 'Custom contemporary interior feature with layered materials', link: '/services/customized-theme-products',
  },
  {
    label: 'Door Services', title: 'Spaces Reimagined',
    description: 'Beautiful transformations balancing what a space already is with everything it could become.',
    keywords: 'Makeovers · Ideas · Transformation', image: solutionDesignImage,
    alt: 'Inviting interior makeover featuring soft furnishings and natural tones', link: '/services/space-designing-makeover',
  },
]

/* VASUPRIY_ABOUT_FOUR_TAB_VIDEOS_V1 */
const aboutChapterVideos = [
  '/videos/home/about-chapters/designing.mp4',
  '/videos/home/about-chapters/materials.mp4',
  '/videos/home/about-chapters/walkthrough.mp4',
  '/videos/home/about-chapters/door-services.mp4',
]
function Home() {
  const [activeExpertiseImage, setActiveExpertiseImage] =
    useExpertiseState(expertiseFeature)

  const [pageReady, setPageReady] = useState(false)
  const [activeAboutChapter, setActiveAboutChapter] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [activeService, serviceImages] = useDecodedSelection(0)
  const siteRef = useRef(null)



  /* VASUPRIY ABOUT FLOOR PLAN SCROLL PARALLAX (vertical) */
  useEffect(() => {
    const image = siteRef.current?.querySelector('.about-antra-floor-plan')

    if (!image) return undefined

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0

      if (motionQuery.matches) {
        image.style.removeProperty('--floor-scroll-y')
        return
      }

      const rect = image.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1

      // 0 when the image enters at the bottom, 1 when it leaves at the top
      const progress = (viewportHeight - rect.top) /
        (viewportHeight + rect.height)

      const clamped = Math.max(0, Math.min(1, progress))
      const distance = window.innerWidth <= 640 ? 18 : 40

      // Starts lower, drifts upward as the user scrolls down (and back on scroll up)
      const offset = (1 - clamped * 2) * distance

      image.style.setProperty('--floor-scroll-y', `${offset.toFixed(2)}px`)
    }

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update)
      }
    }

    update()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    motionQuery.addEventListener?.('change', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      motionQuery.removeEventListener?.('change', onScroll)

      if (frame) window.cancelAnimationFrame(frame)

      image.style.removeProperty('--floor-scroll-y')
    }
  }, [])
  const projectIndexRef = useRef(0)
  const projectHoverTimer = useRef(null)
  const serviceHoverTimer = useRef(null)

  const [projectImages] = useState(() => createDecodedSelection(setActiveProject))
  useEffect(() => () => projectImages.cancel(), [projectImages])

  const activateProject = index => {
    window.clearTimeout(projectHoverTimer.current)
    projectImages.select(index, siteRef.current?.querySelectorAll('.project-visual-image')[index], readyIndex => {
      projectIndexRef.current = readyIndex
      setActiveProject(readyIndex)
      siteRef.current?.dispatchEvent(new CustomEvent('project-select', { detail: readyIndex }))
    })
  }

  const activateService = index => {
    window.clearTimeout(serviceHoverTimer.current)
    serviceImages.select(index, siteRef.current?.querySelectorAll('.home-service-image')[index])
  }

  const scheduleProjectHover = (index) => {
    window.clearTimeout(projectHoverTimer.current)

    projectHoverTimer.current = window.setTimeout(() => {
      activateProject(index)
    }, 450)
  }

  const cancelProjectHover = () => {
    window.clearTimeout(projectHoverTimer.current)
  }

  const scheduleServiceHover = (index) => {
    window.clearTimeout(serviceHoverTimer.current)

    serviceHoverTimer.current = window.setTimeout(() => {
      activateService(index)
    }, 450)
  }

  const cancelServiceHover = () => {
    window.clearTimeout(serviceHoverTimer.current)
  }

  const serviceRoutes = [
    '/services/space-designing-makeover',
    '/services/drop-servicing-installation',
    '/services/customized-theme-products',
  ]
  const homeServices = [
    {
      number: '01',
      title: 'Space Designing and Makeover',
      description:
        'Creative space planning and personalized makeovers that transform interiors with thoughtful layouts, functionality and style.',
    },
    {
      number: '02',
      title: 'Interior Drop Servicing and Installation',
      description:
        'Seamless interior product sourcing, delivery coordination and professional installation for a convenient end-to-end experience.',
    },
    {
      number: '03',
      title: 'Custom Theme Based Products',
      description:
        'Explore customized interior products thoughtfully designed around your preferred theme, aesthetic and space requirements.',
    },
  ]
  useScrollMotion(siteRef, projectIndexRef, setActiveProject)

  /* =========================================================
     HOME — PREMIUM CONVERGE SCROLL REVEAL
     Independent from the existing useScrollMotion engine.
  ========================================================= */
  useEffect(() => {
    const root = siteRef.current

    if (!root) return undefined

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const groups = [
      /* ABOUT */
      {
        selector: '.about-antra-heading',
        direction: 'home-reveal-up',
      },
      {
        selector: '.about-antra-visual',
        direction: 'home-reveal-left',
      },
      {
        selector: '.about-antra-statement',
        direction: 'home-reveal-right',
      },
      {
        selector: '.about-antra-story',
        direction: 'home-reveal-left',
      },
      {
        selector: '.about-antra-points',
        direction: 'home-reveal-right',
      },

      /* ABOUT SHOWCASE */
      {
        selector: '.about-showcase-image',
        direction: 'home-reveal-up',
        stagger: 110,
      },
      {
        selector: '.about-showcase-highlight',
        direction: 'home-reveal-up',
        stagger: 90,
      },

      /* SERVICES */
      {
        selector: '.home-services-heading',
        direction: 'home-reveal-up',
      },
      {
        selector: '.home-services-list',
        direction: 'home-reveal-left',
      },
      {
        selector: '.home-services-description',
        direction: 'home-reveal-left',
      },
      {
        selector: '.home-services-visual',
        direction: 'home-reveal-right',
      },

      /* EXPERTISE */
      {
        selector: '.home-expertise-heading',
        direction: 'home-reveal-up',
      },
      {
        selector: '.home-expertise-card',
        direction: 'home-reveal-up',
        stagger: 120,
      },

      /* EXPERTISE SHOWCASE */
      {
        selector: '.expertise-showcase-heading',
        direction: 'home-reveal-up',
      },
      {
        selector: '.expertise-showcase-info',
        direction: 'home-reveal-left',
      },
      {
        selector: '.expertise-showcase-visual',
        direction: 'home-reveal-right',
      },

      /* PRODUCTS */
      {
        selector: '#home-products [class*="heading"]',
        direction: 'home-reveal-up',
      },
      {
        selector: '#home-products [class*="card"]',
        direction: 'home-reveal-up',
        stagger: 100,
      },

      /* WHY VASUPRIY */
      {
        selector: '#why-vasupriy [class*="heading"]',
        direction: 'home-reveal-up',
      },
      {
        selector: '#why-vasupriy [class*="visual"]',
        direction: 'home-reveal-left',
      },
      {
        selector: '#why-vasupriy [class*="content"]',
        direction: 'home-reveal-right',
      },

      /* ARCHITECTURE SHOWCASE */
      {
        selector: '.interior-architecture-word',
        direction: 'home-reveal-left',
      },
      {
        selector: '.interior-architecture-image',
        direction: 'home-reveal-scale',
      },

      /* GALLERY */
      {
        selector: '[class*="home-gallery"] [class*="heading"]',
        direction: 'home-reveal-up',
      },
      {
        selector: '[class*="home-gallery"] img',
        direction: 'home-reveal-up',
        stagger: 80,
      },
    ]

    const elements = []
    const registered = new Set()

    groups.forEach(({ selector, direction, stagger = 0 }) => {
      root.querySelectorAll(selector).forEach((element, index) => {
        if (registered.has(element)) return

        registered.add(element)

        element.classList.add(
          'home-premium-reveal',
          direction
        )

        if (stagger) {
          element.style.setProperty(
            '--home-reveal-delay',
            `${Math.min(index * stagger, 420)}ms`
          )
        }

        elements.push(element)
      })
    })

    if (
      reducedMotion.matches ||
      !('IntersectionObserver' in window)
    ) {
      elements.forEach((element) => {
        element.classList.add('home-premium-visible')
      })

      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add(
            'home-premium-visible'
          )

          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px',
      }
    )

    /*
     * Start observing after initial layout/preloader settles.
     * Elements already inside the first viewport remain readable.
     */
    const startTimer = window.setTimeout(() => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()

        if (rect.top < window.innerHeight * 0.92) {
          element.classList.add(
            'home-premium-visible'
          )
        } else {
          observer.observe(element)
        }
      })
    }, 80)

    return () => {
      window.clearTimeout(startTimer)
      observer.disconnect()

      elements.forEach((element) => {
        element.classList.remove(
          'home-premium-reveal',
          'home-reveal-left',
          'home-reveal-right',
          'home-reveal-up',
          'home-reveal-scale',
          'home-premium-visible'
        )

        element.style.removeProperty(
          '--home-reveal-delay'
        )
      })
    }
  }, [pageReady])

  useEffect(() => {
    const readyTimer = window.setTimeout(() => {
      setPageReady(true)
    }, 100)

    return () => {
      window.clearTimeout(readyTimer)
    }
  }, [])

  useEffect(() => () => {
    window.clearTimeout(projectHoverTimer.current)
    window.clearTimeout(serviceHoverTimer.current)
  }, [])

  return (
    <>


      <div ref={siteRef} className={`site ${pageReady ? 'site--ready' : ''}`}>
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="antra4-hero" id="home">

          <div
            className="antra4-hero-blueprint"
            aria-hidden="true"
          >
            <img
              src={heroArchitectureWatermark}
              alt=""
              className="antra4-hero-blueprint-image"
            />
          </div>

          <div className="site-container antra4-hero-container">

            <div className="antra4-hero-copy">

              <div className="antra4-hero-badge">
                <span aria-hidden="true" />
                <span>Trusted Interior Partner</span>
              </div>

              <h1 className="antra4-hero-title">

                <span className="antra4-title-line antra4-title-line--video">
                  <span>Your One</span>

                  <span
                    className="antra4-video-pill"
                    aria-hidden="true"
                  >
                    <img
                      src={residentialInterior}
                      alt=""
                    />

                    <span className="antra4-video-play">
                      ▶
                    </span>
                  </span>
                </span>

                <span className="antra4-title-line">
                  stop
                </span>

                <em className="antra4-title-line">
                  Interior
                </em>

                <em className="antra4-title-line">
                  Solutions
                </em>

              </h1>

              <div className="antra4-hero-lower">

                <p className="antra4-hero-description">
                  Whether it&apos;s your home, office, or a commercial
                  project, we create thoughtfully designed interiors
                  that bring your vision to life.
                </p>

                <Link
                  className="antra4-hero-cta"
                  to="/services/space-designing-makeover"
                >
                  <span>Our Services</span>

                  <span
                    className="antra4-hero-cta-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>

              </div>

            </div>

            <div className="antra4-hero-visual">

              <span
                className="antra4-hero-dot"
                aria-hidden="true"
              />

              <div className="antra4-hero-image-frame">
                <img
                  src={antra4HeroImage}
                  alt="Vasupriy interior design"
                />
              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            SPONSOR / BRAND PLACEHOLDERS
        ====================================================== */}

        <BrandStrip />

        {/* =====================================================
            EXPERTISE STRIP
        ====================================================== */}

        <section
          className="brand-strip"
          aria-label="Vasupriy expertise"
          data-scroll-section
        >
          <div className="brand-strip-track">
            {[0, 1].map(copy => (
              <div className="brand-strip-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {['Residential Interiors', 'Commercial Spaces', 'Space Makeovers',
                  'Custom Design', 'End-to-End Execution'].map(label => (
                    <span className="brand-strip-item" key={label}>
                      <span>{label}</span><i aria-hidden="true" />
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            ABOUT VASUPRIY — EDITORIAL
        ====================================================== */}

        <section className="vasu-chapter-about" id="about" data-scroll-section aria-labelledby="vasu-about-title">
          <div className="vasu-chapter-about__shell">
            <div className="vasu-chapter-about__copy">
              <div className="vasu-chapter-about__brand">
                <img src={vasupriyLogo} alt="" loading="lazy" />
                <span>VASUPRIY <small>INTERIOVILLA</small></span>
              </div>
              <span className="vasu-chapter-about__eyebrow">INTERIOR DESIGN STUDIO · EST. 2019</span>
              <h2 id="vasu-about-title">Spaces with a <em>story to tell.</em></h2>
              <p>We blend thoughtful design, careful material selection and coordinated execution to create spaces that feel unmistakably yours. Discover the craft behind every Vasupriy interior.</p>
              <Link className="vasu-chapter-about__all" to="/about">Discover Our Story <span aria-hidden="true">&#8599;</span></Link>
            </div>
            <div className="vasu-chapter-about__showcase">
              <div className="vasu-chapter-about__tabs" role="tablist" aria-label="Explore Vasupriy expertise">
                {aboutChapters.map((chapter, index) => (
                  <button
                    type="button"
                    role="tab"
                    key={chapter.label}
                    id={`vasu-about-tab-${index}`}
                    aria-controls="vasu-about-panel"
                    aria-selected={activeAboutChapter === index}
                    tabIndex={activeAboutChapter === index ? 0 : -1}
                    className={activeAboutChapter === index ? 'is-active' : ''}
                    onClick={() => setActiveAboutChapter(index)}
                    onKeyDown={(event) => {
                      const key = event.key
                      let next = null
                      if (key === 'ArrowRight') next = (index + 1) % aboutChapters.length
                      if (key === 'ArrowLeft') next = (index - 1 + aboutChapters.length) % aboutChapters.length
                      if (key === 'Home') next = 0
                      if (key === 'End') next = aboutChapters.length - 1
                      if (next !== null) {
                        event.preventDefault()
                        setActiveAboutChapter(next)
                        event.currentTarget.parentElement?.querySelectorAll('[role="tab"]')[next]?.focus()
                      }
                    }}
                  >{chapter.label}</button>
                ))}
              </div>
              <div
                className="vasu-chapter-about__stage"
                id="vasu-about-panel"
                role="tabpanel"
                aria-labelledby={`vasu-about-tab-${activeAboutChapter}`}
              >
                <video
                  key={aboutChapters[activeAboutChapter].label}
                  className="vasu-chapter-about__image"
                  src={aboutChapterVideos[activeAboutChapter]}
                  poster={aboutChapters[activeAboutChapter].image}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={aboutChapters[activeAboutChapter].alt}
                />
                <div className="vasu-chapter-about__story">
                  {/* <span className="vasu-chapter-about__ornament" aria-hidden="true">V</span> */}
                  <span className="vasu-chapter-about__story-label">VASUPRIY / {aboutChapters[activeAboutChapter].label}</span>
                  <h3>{aboutChapters[activeAboutChapter].title}</h3>
                  <p>{aboutChapters[activeAboutChapter].description}</p>
                  <span className="vasu-chapter-about__keywords">{aboutChapters[activeAboutChapter].keywords}</span>
                  <Link to={aboutChapters[activeAboutChapter].link}>Explore Collection <span aria-hidden="true">&#8594;</span></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Restored original Multiple Brand, Product and Design Options */}
        <section className="about-antra section-space about-showcase-restored" aria-label="Interior options and design highlights">
          <div className="about-showcase">
            <div className="about-showcase-solution-heading" data-reveal>
              <span className="about-showcase-solution-eyebrow">
                ONE DESTINATION · ENDLESS POSSIBILITIES
              </span>

              <h2>
                Switch to a <em>Single Solution</em>
              </h2>
            </div>

            <div
              className="about-showcase-gallery"
              data-reveal
            >
              <figure className="about-showcase-image about-showcase-image--one">

                <img className="vasu-single-solution-poster"
                  src="/images/home/single-solution/multiple-brands.webp"
                  alt="Multiple brand choices for interior products"
                />
                <figcaption className="about-showcase-solution-label">
                  Multiple Brand Options
                </figcaption>
              </figure>

              <figure className="about-showcase-image about-showcase-image--two">

                <img className="vasu-single-solution-poster"
                  src="/images/home/single-solution/multiple-products.webp"
                  alt="Interior product and material selection consultation"
                />
                <figcaption className="about-showcase-solution-label">
                  Multiple Products Options
                </figcaption>
              </figure>

              <figure className="about-showcase-image about-showcase-image--three">

                <img className="vasu-single-solution-poster"
                  src="/images/home/single-solution/multiple-designs.webp"
                  alt="Interior design drawings and material samples"
                />
                <figcaption className="about-showcase-solution-label">
                  Multiple Design Options
                </figcaption>
              </figure>
            </div>

            <div
              className="about-showcase-highlights"
              data-reveal
            >
              <article className="about-showcase-highlight">
                <strong>2019</strong>

                <div className="about-showcase-highlight-copy">
                  <h3>Established</h3>
                  <p>
                    Creating considered residential and commercial
                    interiors since 2019.
                  </p>
                </div>
              </article>

              <article className="about-showcase-highlight">
                <strong>Design +</strong>

                <div className="about-showcase-highlight-copy">
                  <h3>Execution</h3>
                  <p>
                    Bringing design direction and coordinated execution
                    together.
                  </p>
                </div>
              </article>

              <article className="about-showcase-highlight">
                <strong>2D + 3D</strong>

                <div className="about-showcase-highlight-copy">
                  <h3>Visualization</h3>
                  <p>
                    Helping spaces take shape through thoughtful
                    visualization.
                  </p>
                </div>
              </article>

              <article className="about-showcase-highlight">
                <strong>End-to-End</strong>

                <div className="about-showcase-highlight-copy">
                  <h3>Interior Solutions</h3>
                  <p>
                    From planning and customization through final
                    execution.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
        {/* =====================================================
            FEATURED PROJECTS
        ====================================================== */}

        {/* <section
          className="featured-projects section-space"
          id="featured-projects"
          data-scroll-section
        >
          <div className="site-container">
            <div className="projects-heading-row" data-reveal>
              <div className="projects-heading-meta">
                <span className="section-label">Selected Work</span>
                <span className="projects-count">01 — 03</span>
              </div>

              <div className="projects-heading-copy">
                <h2 className="section-title projects-title">
                  <span className="motion-title-mask"><span className="motion-title-line">Spaces shaped around</span></span>
                  <span className="motion-title-mask"><em className="motion-title-line">how people actually live.</em></span>
                </h2>

                <p>
                  From refined residences to expressive commercial spaces,
                  we shape interiors around function, character and the
                  people who experience them.
                </p>
              </div>
            </div>

            <div className="projects-showcase">
              <div className="projects-visual">
                <div className="projects-visual-frame" data-reveal>
                  <div className="projects-image-stack">
                    <img
                      className={`project-visual-image ${
                        activeProject === 0 ? 'project-visual-image--active' : ''
                      }`}
                      src={residentialInterior}
                      alt="Residential interior design concept"
                      aria-hidden={activeProject !== 0}
                    />

                    <img
                      className={`project-visual-image ${
                        activeProject === 1 ? 'project-visual-image--active' : ''
                      }`}
                      src={commercialSpace}
                      alt="Commercial interior design concept"
                      aria-hidden={activeProject !== 1}
                    />

                    <img
                      className={`project-visual-image ${
                        activeProject === 2 ? 'project-visual-image--active' : ''
                      }`}
                      src={spaceMakeover}
                      alt="Space makeover interior design concept"
                      aria-hidden={activeProject !== 2}
                    />
                  </div>

                  <div className="projects-visual-overlay" aria-hidden="true" />

                  <div className="projects-visual-index" aria-hidden="true">
                    <span key={`project-index-${activeProject}`}>0{activeProject + 1}</span>
                    <span>03</span>
                  </div>

                  <div className="projects-visual-caption">
                    <span key={`project-caption-${activeProject}`}>
                      {activeProject === 0 && 'Residential Interiors'}
                      {activeProject === 1 && 'Commercial Spaces'}
                      {activeProject === 2 && 'Space Makeovers'}
                    </span>

                    <span>Design · Execution · Customization</span>
                  </div>
                </div>
              </div>

              <div className="projects-list">
                <div
                  className={`project-row ${
                    activeProject === 0 ? 'project-row--active' : ''
                  }`}
                  data-project-index="0"
                  data-reveal
                  role="button"
                  aria-pressed={activeProject === 0}
                  onClick={() => activateProject(0)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      activateProject(0)
                    }
                  }}
                  onMouseEnter={() => scheduleProjectHover(0)}
                  onMouseLeave={cancelProjectHover}
                  onFocus={() => activateProject(0)}
                  tabIndex={0}
                >
                  <span className="project-number">01</span>

                  <div className="project-row-content">
                    <span className="project-kicker">Modern Homes</span>
                    <h3>Residential Interiors</h3>
                    <p>
                      Thoughtful spaces balancing comfort, clean detailing
                      and everyday functionality.
                    </p>
                  </div>

                  <span className="project-row-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>

                <div
                  className={`project-row ${
                    activeProject === 1 ? 'project-row--active' : ''
                  }`}
                  data-project-index="1"
                  data-reveal
                  role="button"
                  aria-pressed={activeProject === 1}
                  onClick={() => activateProject(1)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      activateProject(1)
                    }
                  }}
                  onMouseEnter={() => scheduleProjectHover(1)}
                  onMouseLeave={cancelProjectHover}
                  onFocus={() => activateProject(1)}
                  tabIndex={0}
                >
                  <span className="project-number">02</span>

                  <div className="project-row-content">
                    <span className="project-kicker">Work &amp; Hospitality</span>
                    <h3>Commercial Spaces</h3>
                    <p>
                      Refined environments designed around experience,
                      identity and efficient use of space.
                    </p>
                  </div>

                  <span className="project-row-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>

                <div
                  className={`project-row ${
                    activeProject === 2 ? 'project-row--active' : ''
                  }`}
                  data-project-index="2"
                  data-reveal
                  role="button"
                  aria-pressed={activeProject === 2}
                  onClick={() => activateProject(2)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      activateProject(2)
                    }
                  }}
                  onMouseEnter={() => scheduleProjectHover(2)}
                  onMouseLeave={cancelProjectHover}
                  onFocus={() => activateProject(2)}
                  tabIndex={0}
                >
                  <span className="project-number">03</span>

                  <div className="project-row-content">
                    <span className="project-kicker">Refresh &amp; Reimagine</span>
                    <h3>Space Makeovers</h3>
                    <p>
                      Focused transformations that bring new character,
                      warmth and purpose to existing spaces.
                    </p>
                  </div>

                  <span className="project-row-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </div>
            </div>

            <div className="projects-footer" data-reveal>
              <p>
                Interior concepts shown for design presentation.
                Explore our complete project portfolio.
              </p>

              <Link className="projects-view-all" to="/projects">
                <span>Explore All Projects</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section> */}

        <ResidentialScrollProjects />

        {/* =====================================================
            INTERIOR SERVICES PREVIEW
            ===================================================== */}

        <section className="home-services section-space" id="home-services" data-scroll-section>
          <div className="home-services-atmosphere" data-reveal aria-hidden="true">
            <span className="home-services-glow home-services-glow--one" />
            <span className="home-services-glow home-services-glow--two" />
            <span className="home-services-grid" />
          </div>

          <div className="site-container home-services-container">
            <div className="home-services-heading" data-reveal data-heading-reveal>
              <div className="home-services-heading-meta">
                <span className="home-services-label">
                  <span aria-hidden="true" />
                  Our Services
                </span>

                <span className="home-services-count">01 — 03</span>
              </div>

              <div className="home-services-heading-copy">
                <h2>
                  <span className="motion-title-mask"><span className="motion-title-line">Explore our comprehensive</span></span>
                  <span className="motion-title-mask"><em className="motion-title-line">interior design services.</em></span>
                </h2>

                <p>
                  From thoughtful space planning to coordinated execution,
                  Vasupriy brings design, visualization and implementation
                  together through one considered approach.
                </p>
              </div>
            </div>

            <div className="home-services-stage">
              <div className="home-services-content">
                <div
                  className="home-services-list"
                  role="tablist"
                  aria-label="Interior services"
                >
                  {homeServices.map((service, index) => {
                    const isActive = activeService === index

                    return (
                      <Link
                        to={serviceRoutes[index]}
                        className={`home-service-item ${isActive ? 'home-service-item--active' : ''
                          }`}
                        key={service.number}
                        id={`home-service-tab-${index}`}
                        data-reveal
                        style={{ '--reveal-delay': `${index * 80}ms` }}
                        onMouseEnter={() => scheduleServiceHover(index)}
                        onMouseLeave={cancelServiceHover}
                        onFocus={() => activateService(index)}
                        onClick={() => { cancelServiceHover(); activateService(index) }}
                      >
                        <span className="home-service-number">
                          {service.number}
                        </span>

                        <span className="home-service-title">
                          {service.title}
                        </span>

                        <span
                          className="home-service-arrow"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </Link>
                    )
                  })}
                </div>

                <div className="home-services-description" data-reveal>
                  <p key={`service-description-${activeService}`}>
                    {homeServices[activeService].description}
                  </p>
                </div>

                <Link
                  className="home-services-cta"
                  data-reveal
                  to="/services/space-designing-makeover"
                >
                  <span>Explore All Services</span>
                  <span className="home-services-cta-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </div>

              <div
                className="home-services-visual"
                id="home-service-visual"
                role="tabpanel"
                aria-labelledby={`home-service-tab-${activeService}`}
              >
                <div className="home-services-image-frame" data-reveal>
                  <div className="home-services-image-stack">
                    <img
                      className={`home-service-image ${activeService === 0 ? 'home-service-image--active' : ''
                        }`}
                      src={serviceMakeover}
                      alt="Space designing and makeover concept"
                      aria-hidden={activeService !== 0}
                    />

                    <img
                      className={`home-service-image ${activeService === 1 ? 'home-service-image--active' : ''
                        }`}
                      src={serviceExecution}
                      alt="Interior execution and turnkey concept"
                      aria-hidden={activeService !== 1}
                    />

                    <img
                      className={`home-service-image ${activeService === 2 ? 'home-service-image--active' : ''
                        }`}
                      src={serviceArchitecture}
                      alt="Architectural and civil interior concept"
                      aria-hidden={activeService !== 2}
                    />

                    <img
                      className={`home-service-image ${activeService === 3 ? 'home-service-image--active' : ''
                        }`}
                      src={serviceMakeover}
                      alt="2D and 3D visualization concept"
                      aria-hidden={activeService !== 3}
                    />

                  </div>

                  <div
                    className="home-services-image-shade"
                    aria-hidden="true"
                  />

                  <div className="home-services-visual-index">
                    <span key={`service-index-${activeService}`}>
                      0{activeService + 1}
                    </span>
                    <span>/ 03</span>
                  </div>

                  <div className="home-services-visual-caption">
                    <span key={`service-title-${activeService}`}>
                      {homeServices[activeService].title}
                    </span>

                    <small>
                      Design · Visualization · Execution
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CURATED EXPERTISE (Antra exp-section) */}
        <HomeExpertiseCurated />

        {/* =====================================================
            3D INTERIOR VISUAL + OUR EXPERTISE
        ====================================================== */}



        {/* ORIGINAL 3D INTERIOR FLOOR PLAN VISUAL */}
        {/* <FloorPlanGallery /> */}
        {/* EXPERTISE / SKILLS SHOWCASE */}
        <section
          className="expertise-showcase"
          data-scroll-section
        >
          <div
            className="expertise-showcase-blueprint"
            aria-hidden="true"
          />

          <div className="site-container expertise-showcase-container">

            <div
              className="expertise-showcase-heading"
              data-reveal
              data-heading-reveal
            >
              <div className="expertise-showcase-heading-space">
                <span className="expertise-showcase-label">
                  <i aria-hidden="true" />
                  Our clients say
                </span>
              </div>

              <h2>
                Trusted Expertise In
                <em> Interior Design </em>
                And Execution.
              </h2>
            </div>


            <div className="expertise-showcase-content">

              <div
                className="expertise-showcase-info"
                data-reveal
              >
                <p className="expertise-showcase-intro">
                  We transform ideas into thoughtfully designed spaces
                  through detailed planning, visualization and coordinated
                  execution.
                </p>

                <div className="expertise-showcase-skills">

                  <div className="expertise-showcase-skill">
                    <div className="expertise-showcase-skill-heading">
                      <strong>Interior Design</strong>
                      <span>90%</span>
                    </div>

                    <div className="expertise-showcase-progress">
                      <span style={{ '--skill-width': '90%' }} />
                    </div>
                  </div>


                  <div className="expertise-showcase-skill">
                    <div className="expertise-showcase-skill-heading">
                      <strong>3D Visualization</strong>
                      <span>95%</span>
                    </div>

                    <div className="expertise-showcase-progress">
                      <span style={{ '--skill-width': '95%' }} />
                    </div>
                  </div>


                  <div className="expertise-showcase-skill">
                    <div className="expertise-showcase-skill-heading">
                      <strong>Space Planning</strong>
                      <span>90%</span>
                    </div>

                    <div className="expertise-showcase-progress">
                      <span style={{ '--skill-width': '90%' }} />
                    </div>
                  </div>

                </div>
              </div>


              <div
                className="expertise-showcase-visual"
                data-reveal
              >
                <img
                  src={expertiseInterior}
                  alt="Vasupriy interior design expertise"
                />
              </div>

            </div>


            <div
              className="expertise-showcase-wordmark"
              aria-hidden="true"
            >
              interiovilla
            </div>

          </div>
        </section>

        <InteriorProductsPreview />

        <WhyVasupriy />



        <section
          className="interior-architecture-showcase"
          aria-label="Vasupriy architectural interior showcase"
          data-scroll-section
        >
          <div
            className="interior-architecture-word"
            aria-hidden="true"
          >
            vasupriy</div>

          <div
            className="interior-architecture-image"
            data-reveal
          >
            <img
              src={interiorShowcaseImage}
              alt="Modern architectural interior by Vasupriy Interiovilla"
            />
          </div>
        </section>

        <HomeGallery />
      </div>
    </>
  )
}

export default Home






















