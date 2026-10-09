import './FloorPlanGallery.css'

import floorPlan1 from '../../assets/images/home/expertise/floor-plan-gallery/floor-plan-01.png'
import floorPlan2 from '../../assets/images/home/expertise/floor-plan-gallery/floor-plan-02.png'
import floorPlan3 from '../../assets/images/home/expertise/floor-plan-gallery/floor-plan-03.png'
import floorPlan4 from '../../assets/images/home/expertise/floor-plan-gallery/floor-plan-04.png'
import floorPlan5 from '../../assets/images/home/expertise/floor-plan-gallery/floor-plan-05.png'

const floorPlans = [
  floorPlan1,
  floorPlan2,
  floorPlan3,
  floorPlan4,
  floorPlan5,
]

export default function FloorPlanGallery() {
  return (
    <section
      className="floor-plan-gallery"
      aria-label="3D interior floor plan gallery"
      data-scroll-section
    >
      <div className="floor-plan-gallery-viewport">
        <div className="floor-plan-gallery-track">
          {[0, 1].map((copy) => (
            <div
              className="floor-plan-gallery-group"
              key={copy}
              aria-hidden={copy === 1}
            >
              {floorPlans.map((image, index) => (
                <div className="floor-plan-gallery-item" key={index}>
                  <img
                    src={image}
                    alt={copy === 0 ? `3D interior floor plan ${index + 1}` : ''}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}