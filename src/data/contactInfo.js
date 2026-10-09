// Shared contact details: import { contactInfo } from this file anywhere in the site.
// Phone and email are temporary dummy values. Replace them here when ready.
export const contactInfo = {
  phone: '+91 8447689084',
  email: 'Vasupriyinteriovilla@gmail.com',
  address: 'Office no -F09, 1st floor, Anjuman House 23, C Block, Sector 63, Noida, Uttar Pradesh 201309',
  mapEmbedUrl: '',
  // Connect a server endpoint accepting JSON via POST and returning { success: true }
  // only after the message is accepted. Email-provider secrets belong on the server.
  submissionEndpoint: '',
  services: ['Building Design', 'Construction', 'Renovation & Remodeling', 'Commercial Projects', 'Interior & Exterior Design'],
}

export function validateContactForm(values) {
  const errors = {}
  for (const [field, label] of [['firstName', 'first name'], ['lastName', 'last name']]) {
    const value = (values[field] ?? '').trim()
    if (!value) errors[field] = `Please enter your ${label}.`
    else if (value.length > 80) errors[field] = 'Please use 80 characters or fewer.'
  }
  const phone = (values.phone ?? '').trim()
  const digits = phone.replace(/\D/g, '')
  if (!phone) errors.phone = 'Please enter your phone number.'
  else if (!/^[+\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) errors.phone = 'Please enter a valid phone number with 7–15 digits.'
  const email = (values.email ?? '').trim()
  if (!email) errors.email = 'Please enter your email address.'
  else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.'
  if ((values.message ?? '').length > 2000) errors.message = 'Please keep your message within 2,000 characters.'
  return errors
}

export async function submitContactMessage(endpoint, values, fetcher = globalThis.fetch) {
  if (!endpoint) throw new Error('Online messaging is not available yet. Your message has not been sent.')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetcher(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values), signal: controller.signal,
    })
    if (!response.ok) throw new Error('We could not send your message. Please try again later.')
    const confirmation = await response.json().catch(() => null)
    if (confirmation?.success !== true) throw new Error('We could not confirm your submission. Your message has been kept below.')
    return confirmation
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('The request timed out. We could not confirm your submission. Please try again later.')
    if (error instanceof TypeError) throw new Error('Unable to connect. Please check your connection and try again.')
    throw error
  } finally {
    clearTimeout(timeout)
  }
}
