const clamp = value => Math.min(Math.max(value, 0), 1)

export function assemblyProgress(top, viewport, span = 0, mobile = false) {
  if (viewport <= 0) return 1
  const start = 0.98 * viewport
  const end = (mobile ? 0.72 : 0.52) * viewport - span
  if (top >= start) return 0
  if (top <= end) return 1
  return clamp((start - top) / Math.max(start - end, 1))
}

export function remapProgress(progress, start, end) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return clamp((progress - start) / Math.max(end - start, 0.0001))
}

// Cubic smoothstep eases positions mathematically, without time-based lag.
export function easeAssembly(progress) {
  const value = clamp(progress)
  return value * value * (3 - 2 * value)
}

export function assemblyState(progress, origin, factor = 1, mobile = false) {
  const eased = easeAssembly(progress)
  const remaining = 1 - eased
  const distance = (value, limit) => mobile ? Math.sign(value) * Math.min(Math.abs(value), limit) : value * factor
  return {
    x: remaining === 0 ? 0 : distance(origin.x ?? 0, 30) * remaining,
    y: remaining === 0 ? 0 : distance(origin.y ?? 0, 38) * remaining,
    opacity: (origin.opacity ?? 0) + (1 - (origin.opacity ?? 0)) * eased,
    scale: 1 + ((origin.scale ?? 1) - 1) * remaining,
    clip: (origin.clip ?? 0) * remaining,
    progress: eased,
  }
}

export function firstWhyRowProgress(row, copy, heading = 1) {
  if (heading < 0.65) return 0
  if (copy >= 0.60) return row
  return Math.min(row, clamp((copy - 0.05) / 0.55))
}

const label = { x: -24, y: -28 }
const heading = { x: 0, y: 80, opacity: 0.05, clip: 30 }
const copy = { x: 45, y: 40 }
const action = { x: 0, y: 45 }
const imageLeft = { x: -125, y: 8, opacity: 0.22, scale: 1.04, clip: 12 }
const imageRight = { ...imageLeft, x: 125 }

// Section timelines share geometry; child ranges express choreography, never timers.
const compositions = [
  ['expertise', '.brand-strip-track', 'up', {x:0,y:24,opacity:0.65}, '.brand-strip', [0,1]],
  ['about', '.intro-motion-line', 'rule', {}, '.intro-grid', [0.05,0.88]],
  ['about', '.intro-label', 'up', label, '.intro-grid', [0.06,0.60]],
  ['about', '.intro-title-line', 'up', heading, '.intro-grid', [0.12,0.82], 0.04],
  ['about', '.intro-copy > p', 'up', copy, '.intro-grid', [0.28,0.90]],
  ['about', '.intro-story-link', 'up', action, '.intro-grid', [0.44,1]],
  ['about', '.intro-motion-orbit--one', 'up', {x:20,y:-18,opacity:0.35}, '.intro-grid', [0,0.85]],
  ['about', '.intro-motion-orbit--two', 'up', {x:-20,y:18,opacity:0.35}, '.intro-grid', [0.10,0.95]],
  ['projects', '.projects-heading-meta .section-label', 'up', label, '.projects-heading-row', [0.06,0.60]],
  ['projects', '.projects-count', 'up', {x:24,y:-20}, '.projects-heading-row', [0.10,0.68]],
  ['projects', '.projects-title .motion-title-line', 'up', {...heading,x:28}, '.projects-heading-row', [0.12,0.82],0.04],
  ['projects', '.projects-heading-copy > p', 'up', {...copy,x:35}, '.projects-heading-row', [0.28,0.92]],
  ['projects', '.projects-visual-frame', 'left', imageLeft, '.projects-visual', [0,0.90],0,'projectEntrance'],
  ['projects', '.projects-visual-index', 'up', {x:20,y:-20}, '.projects-visual', [0.10,0.70]],
  ['projects', '.projects-visual-caption', 'up', {x:25,y:24}, '.projects-visual', [0.30,0.95]],
  ['services', '.home-services-label', 'up', {x:-28,y:28}, '.home-services-heading', [0.06,0.62]],
  ['services', '.home-services-count', 'up', {x:22,y:-22}, '.home-services-heading', [0.10,0.70]],
  ['services', '.home-services-heading .motion-title-line', 'up', {...heading,x:-30}, '.home-services-heading', [0.12,0.82],0.04],
  ['services', '.home-services-heading-copy > p', 'up', {...copy,x:-40}, '.home-services-heading', [0.28,0.92]],
  ['services', '.home-services-image-frame', 'right', imageRight, '.home-services-visual', [0,0.90]],
  ['services', '.home-service-item', 'up', {x:-50,y:42}, null, [0.10,0.88],0.025],
  ['services', '.home-services-description', 'up', {x:-24,y:40}, null, [0.22,0.92]],
  ['services', '.home-services-cta', 'up', action, null, [0.40,1]],
  ['services', '.home-services-visual-index', 'up', {x:-20,y:-24}, '.home-services-visual', [0.10,0.68]],
  ['services', '.home-services-visual-caption', 'up', {x:-24,y:24}, '.home-services-visual', [0.30,0.95]],
  ['products', '.home-products-heading-meta .section-label', 'up', {x:24,y:-28}, '.home-products-heading', [0.06,0.60]],
  ['products', '.home-products-range', 'up', {x:20,y:-20}, '.home-products-heading', [0.10,0.70]],
  ['products', '.home-products-heading .motion-title-line', 'up', {...heading,x:28}, '.home-products-heading', [0.12,0.82],0.04],
  ['products', '.home-products-rule', 'rule', {}, '.home-products-heading', [0.08,0.90]],
  ['products', '.home-products-frame', 'left', imageLeft, '.home-products-visual', [0,0.90]],
  ['products', '.home-product-category', 'up', {x:50,y:40}, null, [0.10,0.88],0.025],
  ['products', '.home-products-footer', 'up', action, null, [0.40,1]],
  ['products', '.home-products-visual-top', 'up', {x:-16,y:-18}, '.home-products-visual', [0.10,0.70]],
  ['products', '.home-products-number-mask', 'up', {x:20,y:-18}, '.home-products-visual', [0.12,0.74]],
  ['products', '.home-products-caption', 'up', {x:24,y:24}, '.home-products-visual', [0.30,0.95]],
  ['why', '.why-vasupriy-rule', 'rule', {}, '.why-vasupriy-heading', [0,0.65]],
  ['why', '.why-vasupriy-intro-content .section-label', 'up', {x:-18,y:-20}, '.why-vasupriy-intro-content', [0.08,0.62]],
  ['why', '.why-vasupriy-heading h2', 'up', {...heading,y:58}, '.why-vasupriy-intro-content', [0.14,0.84],0,'whyHeading'],
  ['why', '.why-vasupriy-intro', 'up', {x:-24,y:32}, null, [0.20,0.92],0,'whyCopy'],
  ['why', '.why-vasupriy-row', 'up', {x:32,y:32}, null, [0.12,0.90],0.025,'whyRow'],
]

export function createRevealTargets(root) {
  return compositions.flatMap(([group,selector,kind,origin,anchor,range,stagger=0,role]) =>
    [...root.querySelectorAll(selector)].map((element,index) => {
      element.setAttribute('data-scroll-reveal',kind)
      return {group,element,kind,origin,anchor:anchor ? element.closest(anchor) || root.querySelector(anchor) || element : element,range:range.map(value=>Math.min(value+index*stagger,1)),role,index,x:0,y:0,scale:1,progress:0,forced:false,established:false}
    }),
  )
}

export function assemblyValues(targets,rects,viewport,mobile=false) {
  const groups = new Map()
  targets.forEach((target,index) => {
    const top=rects[index].top
    const group=groups.get(target.group) || {top,tail:top}
    group.top=Math.min(group.top,top)
    group.tail=Math.max(group.tail,top)
    groups.set(target.group,group)
  })
  groups.forEach(group => {
    group.travel=Math.max(viewport*(mobile ? 0.26 : 0.46)+group.tail-group.top,1)
    group.progress=assemblyProgress(group.top,viewport,group.tail-group.top,mobile)
  })
  const values=targets.map((target,index) => {
    if (viewport <= 0) return 1
    const group=groups.get(target.group)
    // Long sections retain one timeline, with child windows placed in visible geometry.
    const offset=(rects[index].top-group.top)/group.travel
    const window=viewport*(mobile ? 0.26 : 0.46)/group.travel
    const range=mobile ? [target.range[0]*0.35,Math.max(target.range[1],0.90)] : target.range
    return remapProgress(group.progress,offset+range[0]*window,offset+range[1]*window)
  })
  return {values,groups}
}

export function writeAssemblyState(target,state) {
  target.x=Number(state.x.toFixed(2));target.y=Number(state.y.toFixed(2));target.scale=Number(state.scale.toFixed(4))
  const style=target.element.style
  style.setProperty('--reveal-opacity',state.opacity.toFixed(4))
  style.setProperty('--reveal-x',state.x.toFixed(2)+'px')
  style.setProperty('--reveal-y',state.y.toFixed(2)+'px')
  style.setProperty('--reveal-scale',state.scale.toFixed(4))
  style.setProperty('--reveal-rule',(target.kind === 'rule' ? state.progress : remapProgress(state.progress,0.25,1)).toFixed(4))
  const amount=state.clip.toFixed(2)+'%'
  const clip=target.kind === 'left' ? 'inset(0 '+amount+' 0 0)' : target.kind === 'right' ? 'inset(0 0 0 '+amount+')' : target.origin.clip ? 'inset(0 0 '+amount+' 0)' : 'none'
  style.setProperty('--reveal-clip',clip)
}
