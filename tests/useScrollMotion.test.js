import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createScrollMotion, chapterProgress, projectLayers, stableProjectIndex, createProjectOwnership } from '../src/hooks/useScrollMotion.js'

function fixture({ reduced = false, mobile = false, about = false, images = false, products = false, why = false, entrances = false } = {}) {
  const listeners = new Map()
  const frames = new Map()
  const observers = []
  const classes = () => { const values = new Set(); return { add: v => values.add(v), remove: v => values.delete(v), contains: v => values.has(v) } }
  const element = (top, height, dataset = {}) => ({ dataset, attributes: new Map(), setAttribute(k,v) { this.attributes.set(k,v) }, removeAttribute(k) { this.attributes.delete(k) }, closest: () => null, classList: classes(), style: { values: new Map(), setProperty(k,v) { this.values.set(k,v) }, removeProperty(k) { this.values.delete(k) } }, getBoundingClientRect: () => ({ top, bottom: top + height, height }), querySelectorAll: () => [] })
  const hero = element(-400, 800)
  const section = element(-200, 1600)
  const rows = [element(-100, 280, { projectIndex: '0' }), element(180, 280, { projectIndex: '1' }), element(460, 280, { projectIndex: '2' })]
  const imageLayers = images ? Array.from({ length: 3 }, () => ({ ...element(0, 500), complete: true, naturalWidth: 100 })) : []
  const visual = element(76, 250)
  const heading = element(650, 200)
  const aboutSection = element(500, 1000)
  const aboutAnchor = element(650, 450)
  const productSection = element(0, 2200)
  const productFrame = element(200, 400)
  const whySection = element(600, 1200)
  const whyIntroAnchor = element(680, 300)
  const whyHeading = element(720, 230)
  whyHeading.closest = () => whyIntroAnchor
  const whyCopy = element(820, 80)
  const whyRows = [element(650,140),element(800,140),element(950,140)]
  const position = (element, top, height=140) => { element.getBoundingClientRect=()=>{ const translated=top+parseFloat(element.style.values.get('--reveal-y')||'0');return {top:translated,bottom:translated+height,height} } }
  position(whyCopy,820,80);whyRows.forEach((row,index)=>position(row,650+index*150))
  const entrance = element(800, 140)
  let entranceTop = 800
  entrance.getBoundingClientRect = () => { const top = entranceTop + parseFloat(entrance.style.values.get('--reveal-y') || '0'); return {top,bottom:top+140,height:140} }
  const reveal = [heading, ...rows, ...(about ? [aboutAnchor] : [])]
  const queries = new Map([['.why-vasupriy-heading h2',why ? [whyHeading] : []],['.why-vasupriy-intro',why ? [whyCopy] : []],['.why-vasupriy-row',why ? whyRows : []],['.home-service-item', entrances ? [entrance] : []],['[data-heading-reveal]', about ? [aboutAnchor] : [heading]], ['[data-reveal]', reveal], ['[data-scroll-section]', [section]], ['[data-project-index]', rows], ['.project-visual-image', imageLayers]])
  const root = element(0, 3000)
  root.querySelectorAll = s => queries.get(s) || []
  root.querySelector = s => s === '#home-products' ? (products ? productSection : null) : s === '.home-products-frame' ? (products ? productFrame : null) : s === '#why-vasupriy' ? (why ? whySection : null) : s === '#about' ? (about ? aboutSection : null) : s === '#about [data-reveal]' ? (about ? aboutAnchor : null) : s === '#home' ? hero : s === '#featured-projects' ? section : s === '.projects-visual' ? visual : null
  const mediaObjects = new Map()
  const media = q => { const result = { matches: q.includes('reduced-motion') ? reduced : q.includes('min-width') ? !mobile : mobile, addEventListener: (_,fn) => listeners.set(q,fn), removeEventListener: () => listeners.delete(q) }; mediaObjects.set(q, result); return result }
  let clock = 0
  const win = { scrollY: 0, performance: { now: () => clock }, innerHeight: 800, matchMedia: media, addEventListener: (s,fn) => listeners.set(s,fn), removeEventListener: s => listeners.delete(s), requestAnimationFrame: fn => { frames.set(frames.size + 1, fn); return frames.size }, cancelAnimationFrame: id => frames.delete(id), IntersectionObserver: class { constructor(fn, options) { this.options=options; this.fn=fn; this.targets=new Set(); observers.push(this) } observe(e) { this.targets.add(e) } unobserve(e) { this.targets.delete(e) } disconnect() { this.targets.clear() } } }
  root.addEventListener = (s,fn) => listeners.set(s,fn)
  root.removeEventListener = s => listeners.delete(s)
  let selected = 0
  const changes = []
  const cleanup = createScrollMotion(root, { window: win, getProjectIndex: () => selected, onProjectChange: i => { selected=i; changes.push(i) } })
  const flush = (elapsed = 16) => { clock += elapsed; const pending=[...frames.values()]; frames.clear(); pending.forEach(fn=>fn()) }
  return { whyIntroAnchor, whyHeading, whyCopy, whyRows, position, entrance, setEntranceTop: value => { entranceTop=value }, productSection, productFrame, whySection, win, imageLayers, root, hero, heading, aboutSection, aboutAnchor, rows, frames, listeners, observers, changes, cleanup, flush, mediaObjects }
}

test('batches scroll events and changes the selected project only when necessary', () => {
  const f=fixture(); f.flush()
  assert.deepEqual(f.changes, [1])
  for(let i=0;i<10;i++) f.listeners.get('scroll')()
  assert.equal(f.frames.size, 1)
  f.flush(); assert.deepEqual(f.changes, [1])
  assert.equal(f.hero.style.values.get('--hero-media-y'), '27.00px')
  f.cleanup()
})

test('reveals each observed chapter independently and releases it after entrance', () => {
  const f=fixture(); const observer=f.observers[0]
  observer.fn([{target:f.heading,isIntersecting:true},{target:f.rows[2],isIntersecting:false}])
  assert.equal(f.heading.classList.contains('is-revealed'), true)
  assert.equal(f.rows[2].classList.contains('is-revealed'), false)
  assert.equal(observer.targets.has(f.heading), false)
  f.cleanup()
})

test('reduced motion exposes content without parallax but preserves scroll selection', () => {
  const f=fixture({reduced:true}); f.flush()
  assert.equal(f.root.classList.contains('motion-enabled'), false)
  assert.equal(f.heading.classList.contains('is-revealed'), true)
  assert.equal(parseFloat(f.hero.style.values.get('--hero-media-y') || '0px'), 0)
  assert.deepEqual(f.changes, [1]); f.cleanup()
})

test('mobile selects the chapter below the pinned visual instead of behind it', () => {
  const f=fixture({mobile:true}); f.flush()
  assert.deepEqual(f.changes, [2]); f.cleanup()
})

test('unmount cancels queued frames, disconnects observers and removes listeners', () => {
  const f=fixture(); f.cleanup()
  assert.equal(f.frames.size, 0)
  assert.equal(f.listeners.size, 0)
  assert.equal(f.observers.every(o=>o.targets.size===0), true)
  assert.equal(f.root.classList.contains('motion-enabled'), false)
})

test('scroll progresses through all three chapters in either direction', () => {
  const f=fixture(); f.flush()
  for(const [index, top] of [300, 580, 860].entries()) f.rows[index].getBoundingClientRect=()=>({top, bottom:top+280, height:280})
  f.listeners.get('scroll')(); f.flush()
  for(const [index, top] of [-600, -320, -40].entries()) f.rows[index].getBoundingClientRect=()=>({top, bottom:top+280, height:280})
  f.listeners.get('scroll')(); f.flush()
  assert.deepEqual(f.changes, [1, 0, 2]); f.cleanup()
})

test('changing reduced motion live removes depth and exposes pending entrances', () => {
  const f=fixture(); f.flush()
  f.mediaObjects.get('(prefers-reduced-motion: reduce)').matches=true
  f.listeners.get('(prefers-reduced-motion: reduce)')(); f.flush()
  assert.equal(f.root.classList.contains('motion-enabled'), false)
  assert.equal(parseFloat(f.hero.style.values.get('--hero-media-y')), 0)
  assert.equal(f.rows[2].classList.contains('is-revealed'), true)
  assert.equal(f.observers.every(o=>o.targets.size===0), true)
  f.cleanup()
})


test('About content anchor reveals its composed section once and releases observation', () => {
  const f = fixture({ about: true }); const observer = f.observers[0]
  observer.fn([{ target: f.aboutAnchor, isIntersecting: true }])
  assert.equal(f.aboutSection.classList.contains('is-revealed'), true)
  assert.equal(observer.targets.has(f.aboutAnchor), false)
  f.cleanup()
})

test('About late entrance catches up promptly and desktop depth resets with reduced motion', () => {
  const f = fixture({ about: true })
  f.aboutAnchor.getBoundingClientRect = () => ({ top: -20, bottom: 430, height: 450 })
  f.observers[0].fn([{ target: f.aboutAnchor, isIntersecting: true }]); f.flush()
  assert.equal(f.aboutSection.classList.contains('intro-reveal--prompt'), true)
  assert.notEqual(parseFloat(f.aboutSection.style.values.get('--intro-depth-y') || '0'), 0)
  f.mediaObjects.get('(prefers-reduced-motion: reduce)').matches = true
  f.listeners.get('(prefers-reduced-motion: reduce)')(); f.flush()
  assert.equal(parseFloat(f.aboutSection.style.values.get('--intro-depth-y')), 0)
  f.cleanup()
})

test('About has no continuous depth on mobile and skipped content is exposed', () => {
  const f = fixture({ about: true, mobile: true })
  f.aboutAnchor.getBoundingClientRect = () => ({ top: -600, bottom: -150, height: 450 })
  f.flush()
  assert.equal(f.aboutSection.classList.contains('is-revealed'), true)
  assert.equal(parseFloat(f.aboutSection.style.values.get('--intro-depth-y')), 0)
  f.cleanup()
})


test('About reduced motion exposes the entire composition immediately', () => {
  const f = fixture({ about: true, reduced: true }); f.flush()
  assert.equal(f.aboutAnchor.classList.contains('is-revealed'), true)
  assert.equal(f.aboutSection.classList.contains('is-revealed'), true)
  assert.equal(parseFloat(f.aboutSection.style.values.get('--intro-depth-y')), 0)
  f.cleanup()
})


test('chapter progress is continuous, reversible and clamps fast jumps', () => {
  const centres = [100, 500, 900]
  assert.equal(chapterProgress(centres, 100), 0)
  assert.equal(chapterProgress(centres, 300), 0.5)
  assert.equal(chapterProgress(centres, 700), 1.5)
  assert.equal(chapterProgress(centres, -500), 0)
  assert.equal(chapterProgress(centres, 5000), 2)
  assert.equal(chapterProgress(centres, 300), 0.5)
})

test('project dwell blends only neighbouring layers without time-based lag', () => {
  assert.deepEqual(projectLayers(0.2, 3), [1, 0, 0])
  assert.deepEqual(projectLayers(0.5, 3), [0.5, 0.5, 0])
  assert.deepEqual(projectLayers(1.5, 3), [0, 0.5, 0.5])
  assert.deepEqual(projectLayers(2, 3), [0, 0, 1])
})

test('chapter midpoint hysteresis prevents boundary chatter in both directions', () => {
  assert.equal(stableProjectIndex(0.52, 0, 3), 0)
  assert.equal(stableProjectIndex(0.56, 0, 3), 1)
  assert.equal(stableProjectIndex(0.48, 1, 3), 1)
  assert.equal(stableProjectIndex(0.44, 1, 3), 0)
  assert.equal(stableProjectIndex(2, 0, 3), 2)
})

test('manual selection survives tiny scroll and resize, yielding after meaningful scroll', () => {
  const owner = createProjectOwnership()
  owner.activate(2, 400)
  assert.equal(owner.resolve(0.2, 400), 2)
  assert.equal(owner.resolve(0.2, 415), 2)
  assert.equal(owner.resolve(0.2, 450), 0.2)
  assert.equal(owner.resolve(1.4, 420), 1.4)
})


test('controller blends at most two project layers and reduced motion resets their depth', () => {
  const f = fixture({ images: true }); f.flush()
  f.rows.forEach((row, index) => { const top = index * 280 - 176; row.getBoundingClientRect = () => ({ top, bottom: top + 280, height: 280 }) })
  f.listeners.get('scroll')(); f.flush()
  assert.equal(f.imageLayers.filter(image => image.style.values.get('--project-visibility') === 'visible').length, 2)
  assert.equal(f.root.classList.contains('motion-enabled'), true)
  f.mediaObjects.get('(prefers-reduced-motion: reduce)').matches = true
  f.listeners.get('(prefers-reduced-motion: reduce)')(); f.flush()
  assert.equal(f.imageLayers.filter(image => image.style.values.get('--project-visibility') === 'visible').length, 1)
  assert.equal(f.imageLayers.every(image => image.style.values.get('--project-scale') === '1.0000'), true)
  assert.equal(f.imageLayers.every(image => image.style.values.get('--project-y') === '0.00px'), true)
  f.cleanup(); assert.equal(f.imageLayers.every(image => image.style.values.size === 0), true)
})

test('controller retains manual choice through resize then completes a finite scroll handoff', () => {
  const f = fixture({ images: true }); f.flush()
  f.listeners.get('project-select')({ detail: 2 }); f.flush()
  assert.equal(f.changes.at(-1), 2)
  f.win.scrollY = 15; f.listeners.get('scroll')(); f.flush()
  f.listeners.get('resize')(); f.flush()
  assert.equal(f.changes.at(-1), 2)
  f.win.scrollY = 50; f.listeners.get('scroll')(); f.flush(); f.flush(300)
  assert.equal(f.changes.at(-1), 1)
  assert.equal(f.frames.size, 0)
  f.cleanup(); assert.equal(f.listeners.size, 0)
})

test('scroll selection waits for image readiness and decode completion cannot schedule after unmount', async () => {
  const f = fixture({ images: true }); let decoded
  f.imageLayers[1].complete = false
  f.imageLayers[1].decode = () => new Promise(resolve => { decoded = resolve })
  f.flush(); assert.deepEqual(f.changes, [])
  f.cleanup(); decoded(); await Promise.resolve()
  assert.equal(f.frames.size, 0)
  assert.equal(f.listeners.size, 0)
})


test('heading observation starts later without changing ordinary chapter triggers', () => {
  const f = fixture({about:true})
  assert.equal(f.observers[0].options.rootMargin, '0px 0px -8% 0px')
  assert.equal(f.observers[1].options.rootMargin, '0px 0px -176px 0px')
  assert.equal(f.observers[0].targets.has(f.aboutAnchor), false)
  assert.equal(f.observers[1].targets.has(f.aboutAnchor), true)
  f.observers[1].fn([{target:f.aboutAnchor,isIntersecting:true}])
  assert.equal(f.aboutSection.classList.contains('is-revealed'), true)
  f.cleanup()
})

test('Products depth follows the frame rather than section geometry and resets', () => {
  const f = fixture({products:true}); f.flush()
  assert.equal(f.productSection.style.values.get('--products-stage-y'), '0.00px')
  f.productFrame.getBoundingClientRect=()=>({top:0,bottom:400,height:400})
  f.listeners.get('scroll')(); f.flush()
  assert.ok(parseFloat(f.productSection.style.values.get('--products-stage-y')) < 0)
  assert.ok(parseFloat(f.productSection.style.values.get('--products-stage-scale')) > 1)
  f.mediaObjects.get('(prefers-reduced-motion: reduce)').matches=true
  f.listeners.get('(prefers-reduced-motion: reduce)')(); f.flush()
  assert.equal(f.productSection.style.values.get('--products-stage-scale'), '1.0000')
  f.cleanup(); assert.equal(f.productSection.style.values.size, 0)
})

test('Why rows follow actual copy progress after the heading establishes', () => {
  const f=fixture({why:true});f.flush()
  assert.equal(f.whyRows[0].style.values.get('--reveal-opacity'),'0.0000')
  f.whyIntroAnchor.getBoundingClientRect=()=>({top:400,bottom:700,height:300})
  f.position(f.whyCopy,650,80);f.listeners.get('scroll')();f.flush()
  assert.equal(f.whySection.classList.contains('why-copy-started'),true)
  assert.ok(parseFloat(f.whyRows[0].style.values.get('--reveal-opacity'))>0)
  f.position(f.whyCopy,450,80);f.position(f.whyRows[0],400);f.position(f.whyRows[1],600)
  f.listeners.get('scroll')();f.flush()
  assert.equal(f.whyRows[0].style.values.get('--reveal-opacity'),'1.0000')
  assert.ok(parseFloat(f.whyRows[1].style.values.get('--reveal-opacity'))>0)
  assert.equal(f.whyRows[2].style.values.get('--reveal-opacity'),'0.0000')
  f.mediaObjects.get('(prefers-reduced-motion: reduce)').matches=true
  f.listeners.get('(prefers-reduced-motion: reduce)')();f.flush()
  assert.equal(f.whyRows.every(row=>row.style.values.get('--reveal-opacity')==='1.0000'),true)
  f.cleanup();assert.equal(f.whySection.classList.contains('why-copy-started'),false)
})


test('assembly stops at intermediate scroll, reverses, recalculates resize and resolves late arrivals', () => {
  const f=fixture({entrances:true})
  assert.equal(f.entrance.attributes.get('data-scroll-reveal'),'up')
  assert.equal(f.entrance.style.values.get('--reveal-y'),'42.00px')
  assert.equal(f.entrance.style.values.get('--reveal-x'),'-50.00px')
  f.flush();assert.equal(f.entrance.style.values.get('--reveal-opacity'),'0.0000')
  f.setEntranceTop(616);f.listeners.get('scroll')();f.flush()
  const intermediate=new Map(f.entrance.style.values)
  const y=parseFloat(intermediate.get('--reveal-y'))
  assert.ok(y>0 && y<42);assert.ok(parseFloat(intermediate.get('--reveal-x'))<0)
  assert.equal(f.frames.size,0);f.flush(5000)
  assert.deepEqual(f.entrance.style.values,intermediate)
  f.listeners.get('scroll')();f.flush();assert.deepEqual(f.entrance.style.values,intermediate)
  f.setEntranceTop(450);f.listeners.get('scroll')();f.flush();assert.equal(f.entrance.style.values.get('--reveal-y'),'0.00px')
  f.setEntranceTop(616);f.listeners.get('scroll')();f.flush();assert.deepEqual(f.entrance.style.values,intermediate)
  f.win.innerHeight=1000;f.listeners.get('resize')();f.flush();assert.ok(parseFloat(f.entrance.style.values.get('--reveal-y'))<y)
  f.setEntranceTop(-2000);f.listeners.get('scroll')();f.flush();assert.equal(f.entrance.style.values.get('--reveal-opacity'),'1.0000')
  f.cleanup();assert.equal(f.entrance.style.values.size,0);assert.equal(f.entrance.attributes.size,0);assert.equal(f.frames.size,0)
})

test('mobile entrances shorten travel; reduced motion resolves every target immediately', () => {
  const f=fixture({entrances:true,mobile:true});f.flush()
  assert.equal(f.entrance.style.values.get('--reveal-y'),'38.00px')
  f.mediaObjects.get('(prefers-reduced-motion: reduce)').matches=true
  f.listeners.get('(prefers-reduced-motion: reduce)')();f.flush()
  assert.equal(f.entrance.style.values.get('--reveal-opacity'),'1.0000')
  assert.equal(f.entrance.style.values.get('--reveal-y'),'0.00px');f.cleanup()
})
