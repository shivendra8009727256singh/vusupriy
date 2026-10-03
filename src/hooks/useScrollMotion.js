import { useLayoutEffect } from 'react'
import { createRevealTargets, assemblyValues, assemblyState, writeAssemblyState, easeAssembly, firstWhyRowProgress } from './scrollReveal.js'

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max)


// Geometry owns scroll visuals; React owns only the discrete accessible chapter.
export function chapterProgress(centres, activationY) {
  if (centres.length < 2 || activationY <= centres[0]) return 0
  for (let index = 0; index < centres.length - 1; index++) {
    if (activationY <= centres[index + 1]) {
      return index + clamp((activationY - centres[index]) / Math.max(centres[index + 1] - centres[index], 1))
    }
  }
  return centres.length - 1
}

export function projectLayers(progress, count) {
  const position = clamp(progress, 0, count - 1)
  const lower = Math.floor(position)
  const fraction = clamp((position - lower - 0.3) / 0.4)
  const blend = fraction * fraction * (3 - 2 * fraction)
  return Array.from({ length: count }, (_, index) => index === lower ? 1 - blend : index === lower + 1 ? blend : 0)
}

export function stableProjectIndex(progress, current, count) {
  const candidate = Math.round(clamp(progress, 0, count - 1))
  if (candidate > current && progress < current + 0.55) return current
  if (candidate < current && progress > current - 0.55) return current
  return candidate
}

export function createProjectOwnership() {
  let manual = null
  return {
    activate(index, scrollY) { manual = { index, scrollY } },
    resolve(progress, scrollY) {
      if (manual && Math.abs(scrollY - manual.scrollY) < 32) return manual.index
      manual = null
      return progress
    },
  }
}

// One controller owns the observer and frame scheduler for this Home instance.
// The injectable window also lets lifecycle behavior be verified without a browser.
export function createScrollMotion(root, {
  window: win = window,
  getProjectIndex,
  onProjectChange,
}) {
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)')
  const mobile = win.matchMedia('(max-width: 720px)')
  const revealMobile = win.matchMedia('(max-width: 760px)')
  const desktop = win.matchMedia('(min-width: 961px)')
  const scrollTargets = createRevealTargets(root)
  const assemblySections = new Map([['expertise',root.querySelector('.brand-strip')],['about',root.querySelector('#about')],['projects',root.querySelector('#featured-projects')],['services',root.querySelector('#home-services')],['products',root.querySelector('#home-products')],['why',root.querySelector('#why-vasupriy')]])
  const targetsByElement = new Map(scrollTargets.map(target => [target.element, target]))
  const reveals = [...root.querySelectorAll('[data-reveal]')]
  const headingAnchors = new Set(root.querySelectorAll('[data-heading-reveal]'))
  const products = root.querySelector('#home-products')
  const productFrame = root.querySelector('.home-products-frame')
  const productAnchor = root.querySelector('.home-products-visual') || productFrame
  const why = root.querySelector('#why-vasupriy')
  const sections = [...root.querySelectorAll('[data-scroll-section]')]
  const about = root.querySelector('#about')
  const aboutAnchor = root.querySelector('#about [data-reveal]')
  const hero = root.querySelector('#home')
  const projects = root.querySelector('#featured-projects')
  const visual = root.querySelector('.projects-visual')
  const rows = [...root.querySelectorAll('[data-project-index]')]
  const projectImages = [...root.querySelectorAll('.project-visual-image')]
  const ownership = createProjectOwnership()
  let manualMode = false
  let manualOutgoing = null
  let visualProgress = null
  let handoff = null
  const now = () => win.performance?.now?.() ?? Date.now()
  const pendingImages = new Set()
  const decodedImages = new WeakSet()
  let frame = null
  let disposed = false
  let observer = null
  let headingObserver = null

  const reveal = (element, top) => {
    const entranceTop = top ?? element.getBoundingClientRect().top
    if (!element.classList.contains('is-revealed') && entranceTop < win.innerHeight * 0.25) element.classList.add('motion-reveal--prompt')
    if (element === aboutAnchor && !element.classList.contains('is-revealed')) {
      // Late arrivals keep content readable rather than waiting through the stagger.
      if (entranceTop < win.innerHeight * 0.25) {
        about.classList.add('intro-reveal--prompt')
      }
      about.classList.add('is-revealed')
    }
    element.classList.add('is-revealed')
    observer?.unobserve(element)
    headingObserver?.unobserve(element)
  }

  const configureHeadings = () => {
    headingObserver?.disconnect()
    headingObserver = null
    if (reduced.matches || !win.IntersectionObserver) return
    headingObserver = new win.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) reveal(entry.target, entry.boundingClientRect?.top)
      })
    }, { rootMargin: `0px 0px -${Math.round(win.innerHeight * 0.22)}px 0px`, threshold: 0 })
    headingAnchors.forEach(element => {
      if (!element.classList.contains('is-revealed')) headingObserver.observe(element)
    })
  }

  const configureReveals = () => {
    observer?.disconnect()
    observer = null
    headingObserver?.disconnect()
    headingObserver = null
    root.classList.remove('motion-enabled')
    if (reduced.matches || !win.IntersectionObserver) {
      why?.classList.add('why-copy-started')
      reveals.forEach(element => reveal(element))
      return
    }
    observer = new win.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) reveal(entry.target, entry.boundingClientRect?.top)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 })
    configureHeadings()
    root.classList.add('motion-enabled')
    reveals.filter(element => !element.classList.contains('is-revealed'))
      .forEach(element => (headingAnchors.has(element) ? headingObserver : observer).observe(element))
  }

  const update = () => {
    frame = null
    if (disposed) return
    const viewport = win.innerHeight
    // Read geometry together before writing style properties.
    const aboutRect = aboutAnchor?.getBoundingClientRect()
    const productRect = productAnchor?.getBoundingClientRect()
    const anchorRects = new Map()
    const revealRects = scrollTargets.map(target => {
      const anchor = target.anchor || target.element
      if (!anchorRects.has(anchor)) anchorRects.set(anchor, anchor.getBoundingClientRect())
      const rect = anchorRects.get(anchor)
      // Self-anchored controls need their previously written translation removed.
      const owner = targetsByElement.get(anchor)
      const scaleCorrection = owner && rect.height ? (rect.height - rect.height / owner.scale) / 2 : 0
      return { top: rect.top - (owner?.y || 0) + scaleCorrection }
    })
    const heroRect = hero?.getBoundingClientRect()
    const sectionRects = sections.map(section => section.getBoundingClientRect())
    const projectRect = projects?.getBoundingClientRect()
    const visualRect = visual?.getBoundingClientRect()
    const rowRects = rows.map(row => row.getBoundingClientRect())
    const pendingReveals = reveals.filter(element => !element.classList.contains('is-revealed'))
    const pendingRects = pendingReveals.map(element => element.getBoundingClientRect())
    const depth = heroRect && !reduced.matches && desktop.matches
      ? clamp(-heroRect.top / Math.max(heroRect.height, 1)) : 0

    if (about && aboutRect) {
      // Only decoration moves; text and chapter state remain untouched.
      const aboutProgress = !reduced.matches && desktop.matches
        ? clamp((viewport - aboutRect.top) / (viewport + aboutRect.height)) : 0
      about.style.setProperty('--intro-depth-y', (aboutProgress * -16).toFixed(2) + 'px')
      // A fast jump can skip an observer intersection entirely.
      if (aboutRect.bottom < 0 && !aboutAnchor.classList.contains('is-revealed')) reveal(aboutAnchor, aboutRect.top)
    }

    if (hero) {
      hero.style.setProperty('--hero-scroll-progress', depth.toFixed(4))
      hero.style.setProperty('--hero-media-y', (depth * 54).toFixed(2) + 'px')
      hero.style.setProperty('--hero-media-scale', (1 + depth * 0.035).toFixed(4))
      hero.style.setProperty('--hero-content-y', (depth * -46).toFixed(2) + 'px')
      hero.style.setProperty('--hero-content-opacity', (1 - depth * 0.58).toFixed(4))
      hero.style.setProperty('--hero-feature-y', (depth * -24).toFixed(2) + 'px')
      hero.style.setProperty('--hero-scroll-opacity', clamp(1 - depth * 1.8).toFixed(4))
    }
    sections.forEach((section, index) => {
      const rect = sectionRects[index]
      if (rect.bottom < 0 || rect.top > viewport) return
      const progress = reduced.matches ? 0 : clamp((viewport - rect.top) / (viewport + rect.height))
      section.style.setProperty('--section-progress', progress.toFixed(4))
      const travel = reduced.matches || mobile.matches ? 0 : desktop.matches ? 14 : 6
      section.style.setProperty('--motion-depth', ((0.5 - progress) * travel).toFixed(2) + 'px')
      section.style.setProperty('--motion-release', (reduced.matches ? 1 : 1 - clamp((progress - 0.7) / 0.3) * 0.15).toFixed(4))
    })

    if (products && productRect) {
      const progress = clamp((viewport - productRect.top) / Math.max(viewport + productRect.height, 1))
      const travel = reduced.matches || mobile.matches ? 0 : desktop.matches ? 18 : 8
      products.style.setProperty('--products-stage-y', ((0.5 - progress) * travel).toFixed(2) + 'px')
      products.style.setProperty('--products-stage-scale', (travel ? 1 + Math.abs(0.5 - progress) * 0.016 : 1).toFixed(4))
    }

    const assembly = assemblyValues(scrollTargets, revealRects, viewport, revealMobile.matches)
    assembly.groups.forEach((group,name) => assemblySections.get(name)?.style.setProperty('--assembly-progress', (reduced.matches ? 1 : group.progress).toFixed(4)))
    const revealValues = assembly.values.map((progress,index) => {
      const target = scrollTargets[index]
      return reduced.matches || target.forced || (target.group === 'projects' && target.established) ? 1 : progress
    })
    const whyCopyIndex = scrollTargets.findIndex(target => target.role === 'whyCopy')
    const whyCopy = whyCopyIndex < 0 ? null : easeAssembly(revealValues[whyCopyIndex])
    const whyHeadingIndex = scrollTargets.findIndex(target => target.role === 'whyHeading')
    const whyHeading = whyHeadingIndex < 0 ? 1 : easeAssembly(revealValues[whyHeadingIndex])
    if (whyCopy !== null && (reduced.matches || (whyHeading >= 0.65 && whyCopy > 0))) why?.classList.add('why-copy-started')
    scrollTargets.forEach((target,index) => {
      let progress = revealValues[index]
      if (target.role === 'whyRow' && !revealMobile.matches && !reduced.matches && !target.forced && whyCopy !== null) {
        progress = firstWhyRowProgress(progress,whyCopy - target.index * 0.10,whyHeading)
      }
      const factor = desktop.matches ? 1 : 0.65
      const state = assemblyState(progress,target.origin,factor,revealMobile.matches)
      target.progress = progress
      if (progress === 1) target.established = true
      writeAssemblyState(target,state)
    })

    pendingReveals.forEach((element, index) => {
      if (pendingRects[index].bottom < 0) reveal(element, pendingRects[index].top)
    })

    if (!projectRect || !rows.length || projectRect.top >= viewport * 0.72 || projectRect.bottom <= viewport * 0.22) return
    let activationY = viewport * 0.48
    // On phones the visible chapter starts below the pinned image.
    if (mobile.matches && visualRect && visualRect.top > 0 && visualRect.bottom < viewport) {
      activationY = Math.max(activationY, Math.min(viewport * 0.82, visualRect.bottom + (viewport - visualRect.bottom) * 0.5))
    }
    const centres = rowRects.map(rect => rect.top + rect.height / 2)
    const scrollProgress = chapterProgress(centres, activationY)
    const requestedProgress = ownership.resolve(scrollProgress, win.scrollY || 0)
    const wasManual = manualMode
    manualMode = requestedProgress !== scrollProgress
    const instant = reduced.matches || mobile.matches
    // A short finite handoff reconciles manual selection with resumed scrolling.
    if (wasManual && !manualMode && !instant) handoff = { from: visualProgress ?? requestedProgress, start: now() }
    let progress = requestedProgress
    if (handoff && !instant) {
      const amount = clamp((now() - handoff.start) / 280)
      const ease = 1 - Math.pow(1 - amount, 3)
      progress = handoff.from + (requestedProgress - handoff.from) * ease
      if (amount === 1) handoff = null
      else schedule()
    } else if (instant) handoff = null
    visualProgress = progress
    const next = manualMode ? Math.round(requestedProgress) : stableProjectIndex(scrollProgress, getProjectIndex(), rows.length)
    const weights = instant ? projectLayers(next, rows.length) : projectLayers(progress, rows.length)
    if (projectImages.length) {
      // Keep the previously rendered stage until the next required bitmap is ready.
      const unready = projectImages.filter((image, index) => weights[index] > 0 && !decodedImages.has(image) && (!image.complete || image.naturalWidth === 0))
      unready.forEach(image => {
        if (pendingImages.has(image)) return
        pendingImages.add(image)
        image.decode?.().then(() => { pendingImages.delete(image); decodedImages.add(image); schedule() }).catch(() => pendingImages.delete(image))
      })
      if (unready.length) return
      if (next !== getProjectIndex()) onProjectChange(next)
      projects.classList.add('projects-progress-enabled')
      const baseLayer = weights.findIndex(weight => weight > 0)
      projectImages.forEach((image, index) => {
        const weight = weights[index]
        // Rapid manual requests retire older fades rather than accumulating layers.
        if (manualMode && weight === 0 && index !== manualOutgoing) image.classList.add('project-layer-dormant')
        else image.classList.remove('project-layer-dormant')
        image.style.setProperty('--project-opacity', (index === baseLayer ? 1 : weight).toFixed(4))
        image.style.setProperty('z-index', String(index))
        image.style.setProperty('--project-scale', (instant ? 1 : 1 + (1 - weight) * 0.02).toFixed(4))
        image.style.setProperty('--project-y', (instant ? 0 : (index - progress) * (desktop.matches ? 8 : 3)).toFixed(2) + 'px')
        image.style.setProperty('--project-visibility', weight > 0 ? 'visible' : 'hidden')
      })
    } else if (next !== getProjectIndex()) onProjectChange(next)
  }

  const schedule = () => {
    if (!disposed && frame === null) frame = win.requestAnimationFrame(update)
  }
  const preferenceChanged = () => {
    configureReveals()
    if (reduced.matches) {
      handoff = null
      projectImages.forEach((image, index) => {
        const active = index === getProjectIndex()
        image.style.setProperty('--project-opacity', active ? '1' : '0')
        image.style.setProperty('--project-scale', '1')
        image.style.setProperty('--project-y', '0px')
        image.style.setProperty('--project-visibility', active ? 'visible' : 'hidden')
      })
    }
    schedule()
  }
  const focusReveal = event => {
    scrollTargets.forEach(target => {
      if (target.element === event.target || target.element.contains?.(event.target)) target.forced = true
    })
    schedule()
    // Keyboard focus must never land on visually hidden controls.
    let target = event.target
    while (target && target !== root) {
      if (target.hasAttribute?.('data-reveal')) reveal(target)
      target = target.parentElement
    }
  }
  const manualSelect = event => {
    const index = Number(event.detail)
    if (!Number.isInteger(index) || index < 0 || index >= rows.length) return
    manualOutgoing = Math.round(visualProgress ?? getProjectIndex())
    ownership.activate(index, win.scrollY || 0)
    manualMode = true
    handoff = null
    // CSS handles a short direct manual fade; scroll-owned updates have no lag.
    if (projects) projects.classList.add('projects-manual-selection')
    schedule()
  }
  const scrollSchedule = () => {
    if (projects && Math.abs((win.scrollY || 0) - manualScrollY) >= 32) projects.classList.remove('projects-manual-selection')
    schedule()
  }
  let manualScrollY = win.scrollY || 0
  const selectProject = event => { manualScrollY = win.scrollY || 0; manualSelect(event) }
  const resizeMotion = () => { configureHeadings(); schedule() }
  scrollTargets.forEach(target => {
    writeAssemblyState(target,assemblyState(reduced.matches ? 1 : 0,target.origin,desktop.matches ? 1 : 0.65,revealMobile.matches))
  })
  configureReveals()
  schedule()
  win.addEventListener('scroll', scrollSchedule, { passive: true })
  root.addEventListener('project-select', selectProject)
  win.addEventListener('resize', resizeMotion)
  reduced.addEventListener('change', preferenceChanged)
  mobile.addEventListener('change', schedule)
  desktop.addEventListener('change', schedule)
  revealMobile.addEventListener('change', schedule)
  root.addEventListener('focusin', focusReveal)

  return () => {
    disposed = true
    observer?.disconnect()
    headingObserver?.disconnect()
    why?.classList.remove('why-copy-started')
    products?.style.removeProperty('--products-stage-y')
    products?.style.removeProperty('--products-stage-scale')
    if (frame !== null) win.cancelAnimationFrame(frame)
    win.removeEventListener('scroll', scrollSchedule)
    root.removeEventListener('project-select', selectProject)
    projects?.classList.remove('projects-progress-enabled')
    projects?.classList.remove('projects-manual-selection')
    projectImages.forEach(image => {
      image.classList.remove('project-layer-dormant')
      ;['--project-opacity', '--project-scale', '--project-y', '--project-visibility', 'z-index'].forEach(property => image.style.removeProperty(property))
    })
    pendingImages.clear()
    win.removeEventListener('resize', resizeMotion)
    reduced.removeEventListener('change', preferenceChanged)
    mobile.removeEventListener('change', schedule)
    desktop.removeEventListener('change', schedule)
    revealMobile.removeEventListener('change', schedule)
    root.removeEventListener('focusin', focusReveal)
    assemblySections.forEach(section => section?.style.removeProperty('--assembly-progress'))
    scrollTargets.forEach(target => {
      target.element.removeAttribute('data-scroll-reveal')
      ;['--reveal-opacity', '--reveal-x', '--reveal-y', '--reveal-scale', '--reveal-rule', '--reveal-clip'].forEach(property => target.element.style.removeProperty(property))
    })
    root.classList.remove('motion-enabled')
  }
}

export default function useScrollMotion(rootRef, projectIndexRef, onProjectChange) {
  useLayoutEffect(() => {
    if (!rootRef.current) return undefined
    return createScrollMotion(rootRef.current, {
      getProjectIndex: () => projectIndexRef.current,
      onProjectChange: index => {
        projectIndexRef.current = index
        onProjectChange(index)
      },
    })
  }, [rootRef, projectIndexRef, onProjectChange])
}
