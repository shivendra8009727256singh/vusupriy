import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import vasupriyLogo from '../../assets/brand/logo 2 vasupriya.png'

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Interior Services', path: '/interior-services' },
  { label: 'Interior Products', path: '/interior-products' },
  { label: 'Projects', path: '/projects' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

function Header() {
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()

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

  useEffect(() => {
    setMenuOpen(false)

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) {
      document.body.classList.remove('menu-open')
      return undefined
    }

    document.body.classList.add('menu-open')

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`site-header ${
          headerScrolled ? 'site-header--scrolled' : ''
        }`}
      >
        <div className="site-container header-inner">
          <Link
            className="brand"
            to="/"
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
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  isActive ? 'active' : ''
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link className="header-cta" to="/contact">
            <span>Book Now</span>
            <span aria-hidden="true">↗</span>
          </Link>

          <button
            className={`menu-button ${
              menuOpen ? 'menu-button--active' : ''
            }`}
            type="button"
            aria-label={
              menuOpen ? 'Close navigation' : 'Open navigation'
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${
          menuOpen ? 'mobile-menu--open' : ''
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <div className="mobile-menu-panel">
          <div className="mobile-menu-decoration" aria-hidden="true">
            <span>VASUPRIY</span>
          </div>

          <div className="mobile-menu-top">
            <span className="mobile-menu-label">Navigation</span>
            <span className="mobile-menu-index">EST. 2019</span>
          </div>

          <nav
            className="mobile-navigation"
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {navigation.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'active' : ''
                }
              >
                <span className="mobile-nav-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="mobile-nav-label">
                  {item.label}
                </span>

                <span className="mobile-nav-arrow" aria-hidden="true">
                  ↗
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="mobile-menu-bottom">
            <p>
              Modern interiors.
              <br />
              Thoughtfully made.
            </p>

            <Link
              className="mobile-consultation"
              to="/contact"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              Book a Consultation
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
