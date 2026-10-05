import { useCallback, useRef, useState } from 'react'

import beforeImage from '../../assets/images/home/expertise/transformation/before.jpg'
import afterImage from '../../assets/images/home/expertise/transformation/after.jpg'

function BeforeAfterTransformation() {
  const comparisonRef = useRef(null)
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)

  const updatePosition = useCallback((clientX) => {
    const element = comparisonRef.current

    if (!element) return

    const rect = element.getBoundingClientRect()
    const nextPosition = ((clientX - rect.left) / rect.width) * 100
    const clampedPosition = Math.min(100, Math.max(0, nextPosition))

    setPosition(clampedPosition)
  }, [])

  const handlePointerDown = (event) => {
    setDragging(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
    updatePosition(event.clientX)
  }

  const handlePointerMove = (event) => {
    if (!dragging) return

    updatePosition(event.clientX)
  }

  const handlePointerUp = (event) => {
    setDragging(false)
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setPosition((current) => Math.max(0, current - 2))
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setPosition((current) => Math.min(100, current + 2))
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setPosition(0)
    }

    if (event.key === 'End') {
      event.preventDefault()
      setPosition(100)
    }
  }

  return (
    <div
      className="expertise-transformation"
      data-reveal
    >
      <div className="expertise-transformation-heading">
        <span>Transformation</span>

        <p>
          Drag to explore the space before and after its transformation.
        </p>
      </div>

      <div
        ref={comparisonRef}
        className={`before-after-comparison ${
          dragging ? 'before-after-comparison--dragging' : ''
        }`}
        style={{
          '--comparison-position': `${position}%`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <img
          className="before-after-image before-after-image--before"
          src={beforeImage}
          alt="Interior space before transformation"
          draggable="false"
        />

        <div className="before-after-after-layer">
          <img
            className="before-after-image before-after-image--after"
            src={afterImage}
            alt="Interior space after transformation"
            draggable="false"
          />
        </div>

        <span className="before-after-label before-after-label--before">
          Before
        </span>

        <span className="before-after-label before-after-label--after">
          After
        </span>

        <div
          className="before-after-divider"
          role="slider"
          tabIndex="0"
          aria-label="Before and after comparison"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(position)}
          onKeyDown={handleKeyDown}
        >
          <span className="before-after-handle" aria-hidden="true">
            <span>‹</span>
            <span>›</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default BeforeAfterTransformation
