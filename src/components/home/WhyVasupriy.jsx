import { Link } from 'react-router-dom'

import './WhyVasupriy.css'

import mainInterior from '../../assets/images/home/projects/commercial-space.png'
import secondaryInterior from '../../assets/images/home/projects/residential-interior.png'
import detailInterior from '../../assets/images/home/projects/space-makeover.png'

const reasons = [
  {
    icon: '▣',
    title: 'Premium Materials & Quality Craftsmanship',
    description:
      'We select quality materials and coordinate skilled craftsmanship to create refined interiors with lasting performance.',
  },
  {
    icon: '◷',
    title: 'On-Time & Hassle-Free Execution',
    description:
      'A structured workflow, clear coordination and planned execution help keep every stage of the project moving efficiently.',
  },
  {
    icon: '♧',
    title: 'Sustainable & Smart Design Approach',
    description:
      'Thoughtful planning, natural light and responsible material choices help us create functional and considered spaces.',
  },
  {
    icon: '◎',
    title: 'End-to-End Project Handling',
    description:
      'From planning and visualization to customization and coordinated execution, we bring the complete interior journey together.',
  },
]

export default function WhyVasupriy() {
  return (
    <section
      className="why-vasupriy"
      id="why-vasupriy"
      aria-labelledby="why-vasupriy-title"
      data-scroll-section
    >
      <div className="site-container why-vasupriy-container">

        {/* =========================
            SECTION HEADING
        ========================== */}
        <header
          className="why-vasupriy-header"
          data-reveal
          data-heading-reveal
        >
          <span className="why-vasupriy-eyebrow">
            <i aria-hidden="true">✦</i>
            Why Choose Us
          </span>

          <h2 id="why-vasupriy-title">
            Experience Professional Service
            <br />
            Backed By <em>Proven Results</em>
          </h2>

          <p>
            We bring thoughtful design, functional planning and
            coordinated execution together to create residential
            and commercial interiors shaped around your requirements.
          </p>
        </header>


        {/* =========================
            MAIN CONTENT
        ========================== */}
        <div className="why-vasupriy-content">

          {/* =========================
              LEFT IMAGE COMPOSITION
          ========================== */}
          <div
            className="why-vasupriy-visual"
            data-reveal
          >
            <div className="why-vasupriy-support-card">
              <span
                className="why-vasupriy-support-icon"
                aria-hidden="true"
              >
                ♧
              </span>

              <h3>
                Dedicated Support
                <br />
                At Every Step
              </h3>

              <p>
                From initial planning through visualization and
                execution, our team stays connected throughout
                the interior journey.
              </p>
            </div>


            <figure className="why-vasupriy-image why-vasupriy-image--top">
              <img
                src={secondaryInterior}
                alt="Refined Vasupriy interior design"
              />
            </figure>


            <figure className="why-vasupriy-image why-vasupriy-image--main">
              <img
                src={mainInterior}
                alt="Vasupriy residential and commercial interior"
              />
            </figure>


            <figure className="why-vasupriy-image why-vasupriy-image--detail">
              <img
                src={detailInterior}
                alt="Vasupriy customized interior detail"
              />
            </figure>
          </div>


          {/* =========================
              RIGHT REASON CARDS
          ========================== */}
          <div
            className="why-vasupriy-reasons"
            aria-label="Reasons to choose Vasupriy"
          >
            {reasons.map((reason, index) => (
              <article
                className="why-vasupriy-reason"
                key={reason.title}
                data-reveal
                style={{
                  '--why-card-delay': `${index * 100}ms`,
                }}
              >
                <div className="why-vasupriy-reason-heading">
                  <span
                    className="why-vasupriy-reason-icon"
                    aria-hidden="true"
                  >
                    {reason.icon}
                  </span>

                  <h3>{reason.title}</h3>
                </div>

                <span
                  className="why-vasupriy-reason-rule"
                  aria-hidden="true"
                />

                <p>{reason.description}</p>
              </article>
            ))}
          </div>

        </div>


        {/* =========================
            BOTTOM CTA
        ========================== */}
        <div
          className="why-vasupriy-footer"
          data-reveal
        >
          <div
            className="why-vasupriy-mini-marks"
            aria-hidden="true"
          >
            <span>V</span>
            <span>I</span>
          </div>

          <p>
            Experience thoughtful interiors where design,
            function and execution come together beautifully.
          </p>

          <span aria-hidden="true">—</span>

          <Link to="/contact">
            Contact Us Today
          </Link>
        </div>

      </div>
    </section>
  )
}
