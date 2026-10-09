import test from 'node:test'
import assert from 'node:assert/strict'
import { galleryCategories, galleryItems, filterGalleryItems, getGalleryItem, getPageWindow } from '../src/data/galleryItems.js'

test('gallery filters return matching items and preserve the full collection', () => {
  assert.deepEqual(filterGalleryItems(galleryItems, 'All Projects'), galleryItems)
  assert.deepEqual(filterGalleryItems(galleryItems, ''), galleryItems)
  const cafes = filterGalleryItems(galleryItems, 'Cafe Interiors')
  assert.ok(cafes.length > 0)
  assert.ok(cafes.every((item) => item.category === 'Cafe Interiors'))
  const renders = filterGalleryItems(galleryItems, 'Commercial Interiors')
  assert.ok(renders.length > 0)
  assert.ok(renders.every((item) => item.category === 'Commercial Interiors'))
  assert.deepEqual(filterGalleryItems(galleryItems, 'Unknown Category'), [])
})

test('gallery lookup resolves every card and does not substitute an unknown item', () => {
  for (const item of galleryItems) assert.equal(getGalleryItem(item.id), item)
  assert.equal(getGalleryItem('missing-space'), undefined)
  assert.equal(getGalleryItem(undefined), undefined)
})

test('gallery items have unique identifiers and complete metadata', () => {
  assert.ok(galleryItems.length >= 150)
  assert.equal(new Set(galleryItems.map((item) => item.id)).size, galleryItems.length)
  for (const item of galleryItems) {
    for (const field of ['title', 'category', 'image', 'imageAlt', 'description']) {
      assert.ok(item[field]?.trim(), `${item.id}: missing ${field}`)
    }
    assert.ok(item.image.endsWith('.jpg'), `${item.id}: unexpected image ${item.image}`)
  }
})

test('every advertised filter category has at least one gallery item', () => {
  for (const category of galleryCategories.filter((entry) => entry !== 'All Projects')) {
    assert.ok(
      galleryItems.some((item) => item.category === category),
      `${category}: no gallery items`,
    )
  }
})

test('pagination window stays compact with first, last and neighbour pages', () => {
  assert.deepEqual(getPageWindow(1, 4), [1, 2, 3, 4])
  assert.deepEqual(getPageWindow(1, 16), [1, 2, '…', 15, 16])
  assert.deepEqual(getPageWindow(8, 16), [1, 2, '…', 7, 8, 9, '…', 15, 16])
  assert.deepEqual(getPageWindow(15, 16), [1, 2, '…', 14, 15, 16])
  assert.deepEqual(getPageWindow(16, 16), [1, 2, '…', 15, 16])
})
