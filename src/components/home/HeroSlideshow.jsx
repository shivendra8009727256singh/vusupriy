import { useEffect, useRef, useState } from 'react'
import { createHeroAutoplay } from './heroAutoplay.js'
import heroInterior from '../../assets/images/home/hero-interior.png'
import makeover from '../../assets/images/home/services/space-designing-makeover.png'
import execution from '../../assets/images/home/services/execution-turnkey.png'
import architecture from '../../assets/images/home/services/architectural-civil.png'
import './HeroSlideshow.css'

const slides = [heroInterior, makeover, execution, architecture]

export default function HeroSlideshow({ ready = true }) {
  const layers = useRef([])
  const [selection, setSelection] = useState({ current: 0, previous: null })
  useEffect(() => ready ? createHeroAutoplay({
    images: layers.current,
    onChange: (current, previous) => setSelection({ current, previous }),
    onSettle: () => setSelection(value => ({ ...value, previous: null })),
  }) : undefined, [ready])

  return slides.map((src, index) => (
    <div className={'hero-slide ' + (index === selection.current ? 'hero-slide--current' : index === selection.previous ? 'hero-slide--outgoing' : '')} key={src} aria-hidden="true">
      <img ref={image => { layers.current[index] = image }} src={src} alt="" decoding="async" fetchPriority={index === 0 ? 'high' : 'low'} />
    </div>
  ))
}
