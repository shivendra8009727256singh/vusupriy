import assert from 'node:assert/strict'
import { before, after, test } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
let server
before(async () => { server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' }) })
after(async () => { await server?.close() })
test('Contact route renders shared contact details, map and unavailable sending honestly', async () => {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const html = renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: ['/contact'] }, React.createElement(App)))
  for (const marker of ['contact-title', 'contact-marquee', 'contact-information-title', 'contact-message-title', 'contact-location-title']) assert.ok(html.includes(marker), marker)
  assert.equal((html.match(/class="site-header /g) ?? []).length, 1)
  assert.equal((html.match(/class="site-footer"/g) ?? []).length, 1)
  assert.equal((html.match(/ required=""/g) ?? []).length, 4)
  assert.match(html, /<iframe/)
  assert.match(html, /hello@example\.com/)
  assert.match(html, /Office no -F09/)
  assert.doesNotMatch(html, /Thank you\. Your message/)
  assert.match(html, /Online messaging will be available soon/)
  assert.doesNotMatch(html, /contact-marquee-toggle/)
})

test('a configured address enables the responsive map without inventing a location', async () => {
  const { default: Contact } = await server.ssrLoadModule('/src/pages/Contact/Contact.jsx')
  const { contactInfo } = await server.ssrLoadModule('/src/data/contactInfo.js')
  const previousAddress = contactInfo.address
  try {
    contactInfo.address = 'Configured studio address'
    const html = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(Contact)))
    assert.match(html, /<iframe/)
    assert.match(html, /Configured%20studio%20address/)
  } finally { contactInfo.address = previousAddress }
})
