import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import vasupriyLogo from '../../assets/brand/logo 2 vasupriya.png'

const LEAVE_DELAY = 2200
const READY_DELAY = 3100
const REMOVE_DELAY = 3300

export default function RouteLoader() {
  const location = useLocation()
  const timersRef = useRef([])

  const [showLoader, setShowLoader] = useState(true)
  const [loaderLeaving, setLoaderLeaving] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    timersRef.current.forEach((timer) => {
      window.clearTimeout(timer)
    })

    timersRef.current = []

    const finish = () => {
      setShowLoader(false)
      setLoaderLeaving(false)
      document.body.classList.remove('is-loading')
    }

    if (preference.matches) {
      finish()
      return undefined
    }

    setShowLoader(true)
    setLoaderLeaving(false)

    document.body.classList.add('is-loading')

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })

    const leaveTimer = window.setTimeout(() => {
      setLoaderLeaving(true)
    }, LEAVE_DELAY)

    /*
     * Kept intentionally to match the original loader timing:
     * 2200ms -> leaving starts
     * 3100ms -> page is considered ready
     * 3300ms -> loader is removed
     */
    const readyTimer = window.setTimeout(() => {
      document.documentElement.dataset.routeReady = 'true'
    }, READY_DELAY)

    const removeTimer = window.setTimeout(() => {
      finish()
      delete document.documentElement.dataset.routeReady
    }, REMOVE_DELAY)

    timersRef.current = [
      leaveTimer,
      readyTimer,
      removeTimer,
    ]

    const preferenceChanged = () => {
      if (!preference.matches) return

      timersRef.current.forEach((timer) => {
        window.clearTimeout(timer)
      })

      timersRef.current = []

      delete document.documentElement.dataset.routeReady
      finish()
    }

    preference.addEventListener(
      'change',
      preferenceChanged
    )

    return () => {
      timersRef.current.forEach((timer) => {
        window.clearTimeout(timer)
      })

      timersRef.current = []

      preference.removeEventListener(
        'change',
        preferenceChanged
      )

      delete document.documentElement.dataset.routeReady
      document.body.classList.remove('is-loading')
    }
  }, [location.pathname])

  if (!showLoader) {
    return null
  }

  return (
    <div
      className={`preloader ${
        loaderLeaving ? 'preloader--leaving' : ''
      }`}
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
          <img
            src={vasupriyLogo}
            alt=""
            className="preloader-logo"
          />
        </div>

        <div className="preloader-wordmark">
          <span>VASUPRIY</span>
          <small>INTERIOVILLA</small>
        </div>

        <div className="preloader-progress">
          <span />
        </div>

        <p>Your One-Stop Interior Solution</p>
      </div>

      <span className="preloader-index preloader-index--left">
        EST. 2019
      </span>

      <span className="preloader-index preloader-index--right">
        INTERIOR · EXECUTION
      </span>
    </div>
  )
}
