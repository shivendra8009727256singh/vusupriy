import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import vasupriyLogo from '../../assets/brand/logo 2 vasupriya.png'

const EXIT_START = 900
const REMOVE_AT = 1450

export default function RouteLoader() {
  const location = useLocation()
  const [showLoader, setShowLoader] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    let exitTimer
    let removeTimer

    const finish = () => {
      setShowLoader(false)
      setLeaving(false)
      document.body.classList.remove('is-loading')
      delete document.documentElement.dataset.routeReady
    }

    const start = () => {
      if (reducedMotion.matches) {
        finish()
        return
      }

      setShowLoader(true)
      setLeaving(false)
      document.body.classList.add('is-loading')
      document.documentElement.dataset.routeReady = 'false'

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      })

      exitTimer = window.setTimeout(() => {
        document.documentElement.dataset.routeReady = 'true'
        setLeaving(true)
      }, EXIT_START)

      removeTimer = window.setTimeout(finish, REMOVE_AT)
    }

    const onPreferenceChange = () => {
      if (!reducedMotion.matches) return
      window.clearTimeout(exitTimer)
      window.clearTimeout(removeTimer)
      finish()
    }

    start()

    reducedMotion.addEventListener('change', onPreferenceChange)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(removeTimer)
      reducedMotion.removeEventListener('change', onPreferenceChange)
      document.body.classList.remove('is-loading')
      delete document.documentElement.dataset.routeReady
    }
  }, [location.pathname])

  if (!showLoader) return null

  return (
    <div
      className={`preloader vasupriy-signature-loader ${
        leaving ? 'preloader--leaving' : ''
      }`}
      aria-hidden="true"
    >
      <div className="preloader-panels">
        {Array.from({ length: 5 }, (_, index) => (
          <span className="preloader-panel" key={index} />
        ))}
      </div>

      <div className="signature-loader-glow" />

      <div className="signature-loader-frame">
        <span className="signature-loader-corner signature-loader-corner--tl" />
        <span className="signature-loader-corner signature-loader-corner--tr" />
        <span className="signature-loader-corner signature-loader-corner--bl" />
        <span className="signature-loader-corner signature-loader-corner--br" />
      </div>

      <div className="preloader-brand">
        <span className="signature-loader-eyebrow">
          EST. 2019 — INTERIOR DESIGN STUDIO
        </span>

        <div className="preloader-logo-wrap">
          <img
            src={vasupriyLogo}
            alt=""
            className="preloader-logo"
          />
        </div>

        {/* <div className="signature-loader-wordmark">
          <span>VASUPRIY</span>
          <small>INTERIOVILLA</small>
        </div> */}

        <div className="preloader-progress">
          <span />
        </div>

        <p>Your One-Stop Interior Solution</p>
      </div>

      <span className="preloader-index preloader-index--left">
        DESIGN · DETAIL · DISTINCTION
      </span>

      <span className="preloader-index preloader-index--right">
        INTERIOR · EXECUTION
      </span>
    </div>
  )
}