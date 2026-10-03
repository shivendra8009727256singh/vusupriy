import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createDecodedSelection } from '../src/hooks/useDecodedSelection.js'

test('an older image decode cannot overwrite the latest user selection', async () => {
  const commits = []; const pending = []
  const controls = createDecodedSelection(index => commits.push(index))
  const image = () => ({ decode: () => new Promise(resolve => pending.push(resolve)) })
  controls.select(1, image()); controls.select(2, image())
  pending[0](); await Promise.resolve(); assert.deepEqual(commits, [])
  pending[1](); await Promise.resolve(); assert.deepEqual(commits, [2])
})

test('decode failure retains the previous image and unmount cancels pending selection', async () => {
  const commits = []; let ready
  const controls = createDecodedSelection(index => commits.push(index))
  controls.select(1, { decode: () => Promise.reject(new Error('unavailable')) })
  await Promise.resolve(); await Promise.resolve(); assert.deepEqual(commits, [])
  controls.select(2, { decode: () => new Promise(resolve => { ready = resolve }) })
  controls.cancel(); ready(); await Promise.resolve(); assert.deepEqual(commits, [])
})
