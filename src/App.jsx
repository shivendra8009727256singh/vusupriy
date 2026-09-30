import { useEffect, useState } from 'react'
import './App.css'

import vasupriyLogo from './assets/brand/logo 2 vasupriya.png'
import heroInterior from './assets/images/home/hero-interior.png'

function Preloader({ leaving }) {
  return (
    <div
      className={`preloader ${leaving ? 'preloader--leaving' : ''}`}
      aria-hidden="true"
    >
      <div className="preloader-panels">
        <span className="preloader-panel" />
        <span className="preloader-panel" />
        <span className="preloader-panel" />
        <span className="preloader-panel" />
        <span className="preloader-panel" />
      </div>

      <div className="preloader-brand">
        <div className="preloader-logo-wrap">
          <img src={vasupriyLogo} alt="" className="preloader-logo" />
        </div>

        <div className="preloader-wordmark">
          <span>VASUPRIY</span>
          <small>INTERIOVILLA</small>
        </div>

        <div className="preloader-progress">
          <span />
        </div>

        <p>Designing spaces with character</p>
      </div>

      <span className="preloader-index preloader-index--left">EST. 2019</span>
      <span className="preloader-index preloader-index--right">
        INTERIOR · EXECUTION
      </span>
    </div>
  )
}

function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [loaderLeaving, setLoaderLeaving] = useState(false)
  const [pageReady, setPageReady] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)

  useEffect(() => {
    document.body.classList.add('is-loading')

    const leaveTimer = window.setTimeout(() => {
      setLoaderLeaving(true)
      setPageReady(true)
    }, 2200)

    const removeTimer = window.setTimeout(() => {
      setShowLoader(false)
      document.body.classList.remove('is-loading')
    }, 3300)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
      document.body.classList.remove('is-loading')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 60)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {showLoader && <Preloader leaving={loaderLeaving} />}

      <main className={`site ${pageReady ? 'site--ready' : ''}`}>
        {/* =====================================================
            HEADER
        ====================================================== */}
        <header
          className={`site-header ${headerScrolled ? 'site-header--scrolled' : ''
            }`}
        >
          <div className="site-container header-inner">
            <a
              className="brand"
              href="#home"
              aria-label="Vasupriy Interiovilla home"
            >
              <img
                className="brand-logo"
                src={vasupriyLogo}
                alt="Vasupriy Interiovilla"
              />

              <span className="brand-name">
                <strong>VASUPRIY</strong>
                <small>INTERIOVILLA</small>
              </span>
            </a>

            <nav className="desktop-nav" aria-label="Primary navigation">
              <a className="active" href="#home">
                Home
              </a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#projects">Projects</a>
              <a href="#process">Process</a>
              <a href="#contact">Contact</a>
            </nav>

            <a className="header-cta" href="#contact">
              <span>Book Now</span>
              <span aria-hidden="true">↗</span>
            </a>

            <button
              className="menu-button"
              type="button"
              aria-label="Open navigation"
            >
              <span />
              <span />
            </button>
          </div>
        </header>

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="hero-section" id="home">
          <div className="hero-media" aria-hidden="true">
            <img src={heroInterior} alt="" />
          </div>

          <div className="hero-image-shade" />
          <div className="hero-navy-panel" />

          <div className="site-container hero-container">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="eyebrow-line" />
                <span>Interior Design · Execution · Customization</span>
              </div>

              <h1 className="hero-title">
                <span className="hero-title-line hero-title-line--white">
                  Designing
                </span>

                <span className="hero-title-line hero-title-line--gold">
                  spaces that feel
                </span>

                <span className="hero-title-line hero-title-line--white">
                  uniquely yours.
                </span>
              </h1>

              <div className="hero-bottom">
                <div className="hero-description">
                  <span className="hero-year">EST. 2019</span>

                  <p>
                    Modern, minimalist and thoughtfully crafted interiors where
                    functionality meets refined aesthetics.
                  </p>
                </div>

                <div className="hero-actions">
                  <a className="hero-primary-btn" href="#projects">
                    <span>Explore Projects</span>

                    <span className="button-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>

                  <a className="hero-text-link" href="#contact">
                    Book a Consultation
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            <aside className="hero-feature">
              <div className="feature-top">
                <span className="feature-number">01</span>
                <span className="feature-line" />
              </div>

              <div className="feature-content">
                <span className="feature-label">Our Approach</span>

                <strong>
                  Factory-direct.
                  <br />
                  End-to-end.
                  <br />
                  Made for you.
                </strong>
              </div>
            </aside>

            <div className="hero-scroll" aria-hidden="true">
              <span className="scroll-line" />
              <span>Scroll to explore</span>
            </div>
          </div>
        </section>

        {/* =====================================================
            EXPERTISE STRIP
        ====================================================== */}
        <section className="brand-strip" aria-label="Vasupriy expertise">
          <div className="brand-strip-track">
            <span>Residential Interiors</span>
            <i />
            <span>Commercial Spaces</span>
            <i />
            <span>Space Makeovers</span>
            <i />
            <span>2D &amp; 3D Visualization</span>
            <i />
            <span>Custom Design</span>
            <i />
            <span>End-to-End Execution</span>
          </div>
        </section>

        {/* =====================================================
            ABOUT INTRO
        ====================================================== */}
        <section className="intro-section section-space" id="about">
          <div className="site-container intro-grid">
            <div className="intro-label">
              <span className="section-label">About Vasupriy</span>
            </div>

            <div className="intro-content">
              <h2 className="section-title">
                Less clutter.
                <br />
                More character.
                <br />
                <em>Timeless spaces.</em>
              </h2>

              <div className="intro-copy">
                <p>
                  Since 2019, Vasupriy Interiovilla has been shaping residential
                  and commercial spaces around clean lines, functional layouts
                  and sophisticated details.
                </p>

                <a href="#services">
                  Discover our story
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* =====================================================
          FOOTER
      ====================================================== */}
        <footer className="site-footer" id="contact">
          <div className="footer-top">
            <div className="site-container">
              <div className="footer-cta">
                <div className="footer-cta-label">
                  <span className="footer-label-line" />
                  <span>Start a Project</span>
                </div>

                <a className="footer-big-link" href="#contact">
                  <span>
                    Let&apos;s create a space
                    <br />
                    that feels <em>like you.</em>
                  </span>

                  <span className="footer-circle-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-main">
            <div className="site-container footer-grid">
              <div className="footer-brand">
                <a
                  className="footer-logo-link"
                  href="#home"
                  aria-label="Vasupriy Interiovilla home"
                >
                  <img
                    className="footer-logo"
                    src={vasupriyLogo}
                    alt="Vasupriy Interiovilla"
                  />

                  <span className="footer-wordmark">
                    <strong>VASUPRIY</strong>
                    <small>INTERIOVILLA</small>
                  </span>
                </a>

                <p>
                  Modern, minimalist and thoughtfully crafted interiors where
                  refined aesthetics meet functionality.
                </p>

                <span className="footer-since">ESTABLISHED 2019</span>
              </div>

              <div className="footer-column">
                <span className="footer-heading">Explore</span>

                <nav className="footer-links" aria-label="Footer navigation">
                  <a href="#home">
                    <span>01</span>
                    Home
                  </a>

                  <a href="#about">
                    <span>02</span>
                    About
                  </a>

                  <a href="#services">
                    <span>03</span>
                    Services
                  </a>

                  <a href="#projects">
                    <span>04</span>
                    Projects
                  </a>

                  <a href="#process">
                    <span>05</span>
                    Process
                  </a>
                </nav>
              </div>

              <div className="footer-column footer-services">
                <span className="footer-heading">Expertise</span>

                <div className="footer-service-list">
                  <span>Residential Interiors</span>
                  <span>Commercial Spaces</span>
                  <span>Space Makeovers</span>
                  <span>2D &amp; 3D Visualization</span>
                  <span>Architectural &amp; Civil Work</span>
                  <span>Custom Design</span>
                </div>
              </div>

              <div className="footer-column footer-connect">
                <span className="footer-heading">Let&apos;s Connect</span>

                <p>
                  Have a space in mind? Tell us what you&apos;re imagining and
                  let&apos;s shape it together.
                </p>

                <a className="footer-consultation" href="#contact">
                  <span>Book a Consultation</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <div className="footer-socials">
                  <a href="#contact" aria-label="Instagram">
                    IG
                  </a>
                  <a href="#contact" aria-label="Facebook">
                    FB
                  </a>
                  <a href="#contact" aria-label="Pinterest">
                    PI
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="site-container footer-bottom-inner">
              <p>
                © {new Date().getFullYear()} Vasupriy Interiovilla. All rights
                reserved.
              </p>

              <button
                className="back-to-top"
                type="button"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }
              >
                <span>Back to top</span>
                <span aria-hidden="true">↑</span>
              </button>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

export default App