import assert from 'node:assert/strict'
import { test } from 'node:test'
import { validateContactForm, submitContactMessage } from '../src/data/contactInfo.js'

const valid = { firstName: 'Priya', lastName: 'Sharma', phone: '+91 98765 43210', email: 'priya@example.com', message: '' }
test('requires names, phone and a valid email while message is optional', () => {
  assert.deepEqual(validateContactForm(valid), {})
  assert.deepEqual(Object.keys(validateContactForm({})), ['firstName', 'lastName', 'phone', 'email'])
  assert.ok(validateContactForm({ ...valid, email: 'invalid' }).email)
  assert.ok(validateContactForm({ ...valid, phone: 'abc123' }).phone)
  assert.ok(validateContactForm({ ...valid, firstName: '  ' }).firstName)
  assert.ok(validateContactForm({ ...valid, message: 'x'.repeat(2001) }).message)
})
test('no backend or unconfirmed response can report success', async () => {
  await assert.rejects(submitContactMessage('', valid), /not been sent/)
  await assert.rejects(submitContactMessage('/api/contact', valid, async () => ({ ok: false })), /could not/)
  await assert.rejects(submitContactMessage('/api/contact', valid, async () => ({ ok: true, json: async () => ({}) })), /confirm/)
  let request
  const result = await submitContactMessage('/api/contact', valid, async (url, options) => {
    request = { url, options }
    return { ok: true, json: async () => ({ success: true }) }
  })
  assert.equal(result.success, true)
  assert.equal(request.options.method, 'POST')
  assert.deepEqual(JSON.parse(request.options.body), valid)
})
