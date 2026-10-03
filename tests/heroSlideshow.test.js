import assert from 'node:assert/strict'
import { before, after, test } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

let server
before(async()=>{server=await createServer({server:{middlewareMode:true,hmr:false},appType:'custom'})})
after(async()=>{await server?.close()})

test('Hero configures four existing decorative images with the original first',async()=>{
  const {default:HeroSlideshow}=await server.ssrLoadModule('/src/components/home/HeroSlideshow.jsx')
  const html=renderToStaticMarkup(React.createElement(HeroSlideshow))
  assert.equal((html.match(/<img /g)||[]).length,4)
  assert.equal((html.match(/alt=""/g)||[]).length,4)
  assert.equal((html.match(/aria-hidden="true"/g)||[]).length,4)
  assert.equal((html.match(/hero-slide--current/g)||[]).length,1)
  const sources=[...html.matchAll(/<img [^>]*src="([^"]+)"/g)].map(match=>match[1])
  assert.deepEqual(sources.map(src=>src.split('/').at(-1)),['hero-interior.png','space-designing-makeover.png','execution-turnkey.png','architectural-civil.png'])
  assert.match(html,/fetchPriority="high"/)
  assert.doesNotMatch(html,/<button|<a |tabindex/)
})
