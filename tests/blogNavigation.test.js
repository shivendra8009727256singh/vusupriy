import assert from 'node:assert/strict'
import { before, after, test } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

let server
before(async () => { server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' }) })
after(async () => { await server?.close() })

test('blog titles link to articles without Read More buttons', async () => {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const html = renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: ['/blog'] }, React.createElement(App)))
  const titles = [...html.matchAll(/<h2><a[^>]*href="([^"]+)"/g)]
  assert.equal(titles.length, 9)
  assert.equal(titles[0][1], '/blog/small-home-space')
  assert.doesNotMatch(html, /Read More|blog-read-link/)
})

test('every title destination renders its matching article through App routes', async () => {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const { blogPosts } = await server.ssrLoadModule('/src/data/blogPosts.js')
  for (const post of blogPosts) {
    const html = renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [`/blog/${post.id}`] }, React.createElement(App)))
    assert.ok(html.includes(`id="blog-article-title">${post.title}</h2>`), post.id)
    assert.doesNotMatch(html, /Article not found/)
  }
})
