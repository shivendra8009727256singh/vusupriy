import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

let server
let module
before(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  const component = await server.ssrLoadModule('/src/components/home/InteriorProductsPreview.jsx')
  const model = await server.ssrLoadModule('/src/components/home/interiorProductsPreview.js')
  module = { ...component, ...model }
})
after(async () => { await server?.close() })

const render = () => renderToStaticMarkup(
  React.createElement(MemoryRouter, null, React.createElement(module.default)),
)

test('renders the four approved categories, accessible controls and product route', () => {
  const html = render()
  assert.match(html, /Details that/)
  assert.match(html, /complete the space\./)
  for (const title of ['Mirror &amp; Glazing', 'Doors &amp; Windows', 'Curtains &amp; Blinds', 'Customized / Theme-Based Products']) assert.ok(html.includes(title))
  assert.equal((html.match(/type="button"/g) || []).length, 4)
  assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1)
  assert.match(html, /href="\/interior-products"/)
  assert.match(html, /Explore Interior Products/)
  assert.equal((html.match(/class="home-product-placeholder"/g) || []).length, 0)
  assert.equal((html.match(/<img/g) || []).length, 4)
  for (const filename of ['mirror-glazing.png', 'doors-windows.png', 'curtains-blinds.png', 'customized-products.png']) assert.ok(html.includes(filename))
})

test('dedicated photography can be replaced without changing controls', () => {
  const first = module.interiorProducts[0]
  assert.ok(first)
  const previous = first.image
  first.image = '/product-mirror.jpg'
  try {
    const html = render()
    assert.match(html, /src="\/product-mirror.jpg"/)
    assert.equal((html.match(/type="button"/g) || []).length, 4)
    assert.equal((html.match(/class="home-product-placeholder"/g) || []).length, 0)
  } finally { first.image = previous }
})

test('hover waits 450ms and moving away cancels the preview', context => {
  context.mock.timers.enable({ apis: ['setTimeout'] })
  const changes = []
  const controls = module.createProductPreview(index => changes.push(index), globalThis)
  controls.preview(1)
  context.mock.timers.tick(449)
  assert.deepEqual(changes, [])
  context.mock.timers.tick(1)
  assert.deepEqual(changes, [1])
  controls.preview(2)
  controls.cancel()
  context.mock.timers.tick(450)
  assert.deepEqual(changes, [1])
})

test('direct activation cancels an older hover and supports all four selections', context => {
  context.mock.timers.enable({ apis: ['setTimeout'] })
  const changes = []
  const controls = module.createProductPreview(index => changes.push(index), globalThis)
  controls.preview(1)
  controls.activate(3)
  context.mock.timers.tick(450)
  assert.deepEqual(changes, [3])
  controls.activate(0)
  controls.activate(1)
  controls.activate(2)
  assert.deepEqual(changes, [3, 0, 1, 2])
})


test('Home places Products after Services and before Footer with existing controls intact', async () => {
  const previousWindow = globalThis.window
  globalThis.window = { matchMedia: () => ({ matches: true }) }
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx')
    const html = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(App)))
    const services = html.indexOf('id="home-services"')
    const products = html.indexOf('id="home-products"')
    const footer = html.indexOf('class="site-footer"')
    assert.ok(services > 0 && products > services && footer > products)
    assert.equal((html.match(/data-project-index=/g) || []).length, 3)
    assert.equal((html.match(/role="tab"/g) || []).length, 4)
    assert.equal((html.match(/class="home-product-category /g) || []).length, 4)
    assert.equal((html.match(/project-visual-image--active/g) || []).length, 1)
    assert.equal((html.match(/home-service-image--active/g) || []).length, 1)
    const serviceMarkup = html.slice(services, products)
    for (const filename of ['space-designing-makeover.png', 'execution-turnkey.png', 'architectural-civil.png']) assert.ok(serviceMarkup.includes(filename))
    assert.equal((serviceMarkup.match(/space-designing-makeover.png/g) || []).length, 2)
    assert.doesNotMatch(serviceMarkup, /residential-interior.png|commercial-space.png|space-makeover.png/)
    assert.ok(html.includes('id="about"'))
    assert.ok(html.includes('id="home"'))
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})
