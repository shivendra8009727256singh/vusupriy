

import { useEffect, useRef, useState } from 'react'

import { Link, NavLink, useLocation } from 'react-router-dom'
import './PremiumMobileMenu.css'



import vasupriyLogo from '../../assets/brand/logo 2 vasupriya.png'



const services = [

  {

    label: 'Space Designing & Makeover',

    path: '/services/space-designing-makeover',

  },

  {

    label: 'Drop Servicing & Installation',

    path: '/services/drop-servicing-installation',

  },

  {

    label: 'Customized & Theme-Based Products',

    path: '/services/customized-theme-products',

  },

]



const productCategories = [

  { label: 'Flooring Styling', id: 'flooring' },

  { label: 'Green Element', id: 'green' },

  { label: 'Enlightenment Options', id: 'lighting' },

  { label: 'Wall Makeover Products', id: 'walls' },

]



const navigation = [

  { label: 'Home', path: '/' },

  { label: 'About', path: '/about' },

  { label: 'Services', path: '/interior-services' },

  { label: 'Products', path: '/interior-products' },

  { label: 'Projects', path: '/projects' },

  { label: 'Gallery', path: '/gallery' },

  { label: 'Blog', path: '/blog' },

  { label: 'Contact', path: '/contact' },

]



function Header() {

  const [headerScrolled, setHeaderScrolled] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)

  const [servicesOpen, setServicesOpen] = useState(false)

  const [productsOpen, setProductsOpen] = useState(false)

  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)



  const servicesRef = useRef(null)

  const productsRef = useRef(null)

  const location = useLocation()



  const isServicesRoute =

    location.pathname === '/interior-services' ||

    location.pathname.startsWith('/services/')



  const isProductsRoute =
    location.pathname === '/interior-products' ||
    location.pathname.startsWith('/interior-products/') ||
    location.pathname.startsWith('/products/')



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

    setServicesOpen(false)

    setProductsOpen(false)

    setMobileServicesOpen(false)

    setMobileProductsOpen(false)



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



  useEffect(() => {

    if (!servicesOpen) return undefined



    const handleOutsideClick = (event) => {

      if (!servicesRef.current?.contains(event.target)) {

        setServicesOpen(false)

      }

    }



    const handleEscape = (event) => {

      if (event.key === 'Escape') {

        setServicesOpen(false)

      }

    }



    document.addEventListener('pointerdown', handleOutsideClick)

    window.addEventListener('keydown', handleEscape)



    return () => {

      document.removeEventListener('pointerdown', handleOutsideClick)

      window.removeEventListener('keydown', handleEscape)

    }

  }, [servicesOpen])



  useEffect(() => {

    if (!productsOpen) return undefined

    const outside = (event) => {

      if (!productsRef.current?.contains(event.target)) setProductsOpen(false)

    }

    const escape = (event) => {

      if (event.key === 'Escape') setProductsOpen(false)

    }

    document.addEventListener('pointerdown', outside)

    window.addEventListener('keydown', escape)

    return () => {

      document.removeEventListener('pointerdown', outside)

      window.removeEventListener('keydown', escape)

    }

  }, [productsOpen])



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

            {navigation.map((item) => {

              if (item.label === 'Services') {

                return (

                  <div

                    key={item.path}

                    ref={servicesRef}

                    className={`vasu-services-nav ${

                      servicesOpen ? 'vasu-services-nav--open' : ''

                    }`}

                    onMouseEnter={() => setServicesOpen(true)}

                    onMouseLeave={() => setServicesOpen(false)}

                    onBlur={(event) => {

                      if (!event.currentTarget.contains(event.relatedTarget)) {

                        setServicesOpen(false)

                      }

                    }}

                  >

                    <button

                      type="button"

                      className={`vasu-services-trigger ${

                        isServicesRoute ? 'active' : ''

                      }`}

                      aria-expanded={servicesOpen}

                      aria-controls="vasu-services-dropdown"

                      onClick={() => setServicesOpen((current) => !current)}

                    >

                      Services

                      <span

                        className="vasu-services-chevron"

                        aria-hidden="true"

                      >

                        ▾

                      </span>

                    </button>



                    <div

                      id="vasu-services-dropdown"

                      className="vasu-services-dropdown"

                      aria-hidden={!servicesOpen}

                    >

                      <span className="vasu-services-dropdown-title">

                        Explore Our Services

                      </span>



                      {services.map((service, index) => (

                        <NavLink

                          key={service.path}

                          to={service.path}

                          tabIndex={servicesOpen ? 0 : -1}

                          onClick={() => setServicesOpen(false)}

                          className="vasu-services-dropdown-link"

                        >

                          <span className="vasu-services-dropdown-number">

                            {String(index + 1).padStart(2, '0')}

                          </span>

                          <span>{service.label}</span>

                          <span aria-hidden="true">↗</span>

                        </NavLink>

                      ))}

                    </div>

                  </div>

                )

              }



              if (item.label === 'Products') {

                return (

                  <div

                    key={item.path}

                    ref={productsRef}

                    className={`vasu-services-nav ${productsOpen ? 'vasu-services-nav--open' : ''}`}

                    onMouseEnter={() => { setProductsOpen(true); setServicesOpen(false) }}

                    onMouseLeave={() => setProductsOpen(false)}

                    onBlur={(event) => {

                      if (!event.currentTarget.contains(event.relatedTarget)) setProductsOpen(false)

                    }}

                  >

                    <button

                      type="button"

                      className={`vasu-services-trigger ${isProductsRoute ? 'active' : ''}`}

                      aria-expanded={productsOpen}

                      aria-controls="vasu-products-dropdown"

                      onClick={() => { setProductsOpen((open) => !open); setServicesOpen(false) }}

                    >

                      Products <span className="vasu-services-chevron" aria-hidden="true">▾</span>

                    </button>

                    <div

                      id="vasu-products-dropdown"

                      className="vasu-services-dropdown"

                      aria-hidden={!productsOpen}

                    >

                      <span className="vasu-services-dropdown-title">Explore Product Collections</span>

                      <NavLink

                        to="/interior-products"

                        tabIndex={productsOpen ? 0 : -1}

                        onClick={() => setProductsOpen(false)}

                        className="vasu-services-dropdown-link"

                      >

                        <span className="vasu-services-dropdown-number">00</span>

                        <span>All Products</span><span aria-hidden="true">↗</span>

                      </NavLink>

                      {productCategories.map((category, index) => (

                        <NavLink

                          key={category.id}

                          to={`/interior-products/${category.id}`}

                          tabIndex={productsOpen ? 0 : -1}

                          onClick={() => setProductsOpen(false)}

                          className="vasu-services-dropdown-link"

                        >

                          <span className="vasu-services-dropdown-number">{String(index + 1).padStart(2, '0')}</span>

                          <span>{category.label}</span><span aria-hidden="true">↗</span>

                        </NavLink>

                      ))}

                    </div>

                  </div>

                )

              }



              return (

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

              )

            })}

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

            {navigation.map((item, index) => {

              if (item.label === 'Services') {

                return (

                  <div

                    key={item.path}

                    className="vasu-mobile-services"

                  >

                    <button

                      type="button"

                      className={`vasu-mobile-services-trigger ${

                        isServicesRoute ? 'active' : ''

                      }`}

                      tabIndex={menuOpen ? 0 : -1}

                      aria-expanded={mobileServicesOpen}

                      onClick={() =>

                        setMobileServicesOpen((current) => !current)

                      }

                    >

                      <span className="mobile-nav-number">

                        {String(index + 1).padStart(2, '0')}

                      </span>



                      <span className="mobile-nav-label">

                        Services

                      </span>



                      <span

                        className="mobile-nav-arrow"

                        aria-hidden="true"

                      >

                        {mobileServicesOpen ? '−' : '+'}

                      </span>

                    </button>



                    {mobileServicesOpen && (

                      <div className="vasu-mobile-services-list">

                        {services.map((service) => (

                          <NavLink

                            key={service.path}

                            to={service.path}

                            tabIndex={menuOpen ? 0 : -1}

                            onClick={() => setMenuOpen(false)}

                          >

                            <span>{service.label}</span>

                            <span aria-hidden="true">↗</span>

                          </NavLink>

                        ))}

                      </div>

                    )}

                  </div>

                )

              }



              if (item.label === 'Products') {

                return (

                  <div key={item.path} className="vasu-mobile-services">

                    <button

                      type="button"

                      className={`vasu-mobile-services-trigger ${isProductsRoute ? 'active' : ''}`}

                      tabIndex={menuOpen ? 0 : -1}

                      aria-expanded={mobileProductsOpen}

                      onClick={() => setMobileProductsOpen((open) => !open)}

                    >

                      <span className="mobile-nav-number">{String(index + 1).padStart(2, '0')}</span>

                      <span className="mobile-nav-label">Products</span>

                      <span className="mobile-nav-arrow" aria-hidden="true">{mobileProductsOpen ? '−' : '+'}</span>

                    </button>

                    {mobileProductsOpen && (

                      <div className="vasu-mobile-services-list">

                        <NavLink to="/interior-products" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>

                          <span>All Products</span><span aria-hidden="true">↗</span>

                        </NavLink>

                        {productCategories.map((category) => (

                          <NavLink

                            key={category.id}

                            to={`/interior-products/${category.id}`}

                            tabIndex={menuOpen ? 0 : -1}

                            onClick={() => setMenuOpen(false)}

                          >

                            <span>{category.label}</span><span aria-hidden="true">↗</span>

                          </NavLink>

                        ))}

                      </div>

                    )}

                  </div>

                )

              }



              return (

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

              )

            })}

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
