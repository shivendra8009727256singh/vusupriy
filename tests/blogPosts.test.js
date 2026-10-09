import test from 'node:test'
import assert from 'node:assert/strict'
import { blogPosts, getBlogPage, getBlogPost, filterBlogPosts } from '../src/data/blogPosts.js'

test('journal search handles casing and whitespace and combines with category', () => {
  assert.deepEqual(filterBlogPosts(blogPosts, '  SMALL HOME  '), [blogPosts[0]])
  assert.deepEqual(filterBlogPosts(blogPosts, '', 'Lighting'), [blogPosts[3]])
  assert.deepEqual(filterBlogPosts(blogPosts, 'small home', 'Lighting'), [])
  assert.deepEqual(filterBlogPosts(blogPosts), blogPosts)
  assert.deepEqual(filterBlogPosts(blogPosts, 'no matching article'), [])
})

test('detail lookup resolves every card and does not substitute an unknown article', () => {
  for (const post of blogPosts) assert.equal(getBlogPost(post.id), post)
  assert.equal(getBlogPost('missing-article'), undefined)
  assert.equal(getBlogPost(undefined), undefined)
})

test('pagination exposes every article exactly once and clamps invalid pages', () => {
  const first = getBlogPage(blogPosts, 1)
  const second = getBlogPage(blogPosts, 2)
  assert.equal(first.posts.length, 9)
  assert.equal(first.pageCount, 2)
  assert.deepEqual([...first.posts, ...second.posts], blogPosts)
  assert.equal(getBlogPage(blogPosts, -1).page, 1)
  assert.equal(getBlogPage(blogPosts, 99).page, 2)
  assert.equal(getBlogPage([], 1).posts.length, 0)
})

test('articles have unique identifiers and complete, readable metadata', () => {
  assert.equal(new Set(blogPosts.map(post => post.id)).size, blogPosts.length)
  for (const post of blogPosts) {
    for (const field of ['title', 'category', 'author', 'excerpt', 'image', 'imageAlt']) {
      assert.ok(post[field]?.trim(), `${post.id}: missing ${field}`)
    }
    assert.ok(Number.isFinite(Date.parse(post.date)))
    assert.ok(post.body.length >= 2)
  }
})
