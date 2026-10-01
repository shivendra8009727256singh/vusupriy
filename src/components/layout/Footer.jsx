import { Link } from 'react-router-dom'

import vasupriyLogo from '../../assets/brand/logo 2 vasupriya.png'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="site-container">
          <div className="footer-cta">
            <div className="footer-cta-label">
              <span className="footer-label-line" />
              <span>Start a Project</span>
            </div>

            <Link
              className="footer-big-link"
              to="/contact"
            >
              <span>
                Let&apos;s create a space
                <br />
                that feels <em>like you.</em>
              </span>

              <span
                className="footer-circle-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="site-container footer-grid">
          <div className="footer-brand">
            <Link
              className="footer-logo-link"
              to="/"
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
            </Link>

            <p>
              Modern, minimalist and thoughtfully crafted
              interiors where refined aesthetics meet
              functionality.
            </p>

            <span className="footer-since">
              ESTABLISHED 2019
            </span>
          </div>

          <div className="footer-column">
            <span className="footer-heading">
              Explore
            </span>

            <nav
              className="footer-links"
              aria-label="Footer navigation"
            >
              <Link to="/">
                <span>01</span>
                Home
              </Link>

              <Link to="/about">
                <span>02</span>
                About
              </Link>

              <Link to="/interior-services">
                <span>03</span>
                Interior Services
              </Link>

              <Link to="/interior-products">
                <span>04</span>
                Interior Products
              </Link>

              <Link to="/projects">
                <span>05</span>
                Projects
              </Link>

              <Link to="/gallery">
                <span>06</span>
                Gallery
              </Link>

              <Link to="/blog">
                <span>07</span>
                Blog
              </Link>

              <Link to="/contact">
                <span>08</span>
                Contact
              </Link>
            </nav>
          </div>

          <div className="footer-column footer-services">
            <span className="footer-heading">
              Expertise
            </span>

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
            <span className="footer-heading">
              Let&apos;s Connect
            </span>

            <p>
              Have a space in mind? Tell us what
              you&apos;re imagining and let&apos;s shape it
              together.
            </p>

            <Link
              className="footer-consultation"
              to="/contact"
            >
              <span>Book a Consultation</span>
              <span aria-hidden="true">↗</span>
            </Link>

            <div className="footer-socials">
              <Link
                to="/contact"
                aria-label="Instagram"
              >
                IG
              </Link>

              <Link
                to="/contact"
                aria-label="Facebook"
              >
                FB
              </Link>

              <Link
                to="/contact"
                aria-label="Pinterest"
              >
                PI
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="site-container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} Vasupriy
            Interiovilla. All rights reserved.
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
  )
}

export default Footer
