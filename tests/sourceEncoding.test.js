import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { test } from 'node:test'

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(entry => {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory)
    return entry.isDirectory() ? sourceFiles(url) : /\.(?:jsx?|tsx?|css|scss)$/.test(entry.name) ? [url] : []
  }))
  return nested.flat()
}

test('active source files contain valid UTF-8 without mojibake or replacement characters', async () => {
  const decoder = new TextDecoder('utf-8', { fatal: true })
  const failures = []
  for (const file of await sourceFiles(new URL('../src/', import.meta.url))) {
    const source = decoder.decode(await readFile(file))
    // Control bytes are deliberately rejected as encoding corruption.
    // eslint-disable-next-line no-control-regex
    if (/[\u00c3\u00c2]|\u00e2[\u0080-\u00bf\u2000-\u2122]|[\ufffd\u0000\u0080-\u009f]/u.test(source)) failures.push(file.pathname)
  }
  assert.deepEqual(failures, [], 'Encoding corruption must not reach rendered content or CSS')
})

test('Hero decorative badge contains only its existing CSS dot', async () => {
  const source = await readFile(new URL('../src/pages/Home/Home.jsx', import.meta.url), 'utf8')
  assert.match(source, /className="antra4-hero-badge">\s*<span aria-hidden="true" \/>/)
})
