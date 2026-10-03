import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

let server
before(async () => { server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' }) })
after(async () => { await server?.close() })

test('Why presents three supported editorial themes without simulated controls or metrics', async () => {
  const { default: Why } = await server.ssrLoadModule('/src/components/home/WhyVasupriy.jsx')
  const html = renderToStaticMarkup(React.createElement(Why))
  assert.match(html, /aria-labelledby="why-vasupriy-title"/)
  assert.match(html, /class="why-vasupriy-heading"><span class="why-vasupriy-rule" data-reveal="true" aria-hidden="true"><[/]span><div class="why-vasupriy-intro-content" data-reveal="true" data-heading-reveal="true">/)
  assert.match(html, /Thoughtful by design./)
  assert.match(html, /Considered in execution./)
  for (const title of ['Design + Execution', 'Functional Planning', 'Customization']) assert.ok(html.includes(title))
  assert.deepEqual([...html.matchAll(/class="why-vasupriy-number"[^>]*>(\d{2})</g)].map(match => match[1]), ['01', '02', '03'])
  assert.equal((html.match(/<li /g) || []).length, 3)
  assert.doesNotMatch(html, /<button|<a |tabindex|role="button"|\d+%|guarantee|award|certified|savings|clients served/i)
})

test('Home places Why immediately after Products and before the shared Footer', async () => {
  const previousWindow = globalThis.window
  globalThis.window = { matchMedia: () => ({ matches: true }) }
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx')
    const html = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(App)))
    assert.match(html, /id="home-products"[\s\S]*?<[/]section><section class="why-vasupriy section-space"/)
    assert.ok(html.indexOf('id="why-vasupriy"') < html.indexOf('class="site-footer"'))
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})
