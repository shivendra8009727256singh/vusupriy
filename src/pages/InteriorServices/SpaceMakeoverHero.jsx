import { useState } from 'react'
import { Link } from 'react-router-dom'
import './SpaceMakeoverHero.css'

const initial = { name: '', phone: '', email: '', pincode: '' }

export default function SpaceMakeoverHero({ image }) {
  const [form, setForm] = useState(initial)
  const [consent, setConsent] = useState(false)
  const [notice, setNotice] = useState('')

  const onChange = event => {
    const { name, value } = event.target
    setForm(previous => ({ ...previous, [name]: value }))
    setNotice('')
  }

  const onSubmit = event => {
    event.preventDefault()
    if (!consent) {
      setNotice('Please select the consent checkbox to continue.')
      return
    }
    const subject = encodeURIComponent('Space Designing & Makeover Enquiry')
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nPincode: ${form.pincode}\nService: Space Designing & Makeover`)
    setNotice('Your email application will open with a prepared enquiry. Please send the email to complete your request.')
    window.location.href = `mailto:Vasupriyinteriovilla@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="vsmref-hero" aria-labelledby="vsm-page-title">
      <img className="vsmref-background" src={image} alt="Elegant residential interior designed for everyday comfort" fetchPriority="high" />
      <div className="vsmref-shade" aria-hidden="true" />
      <div className="vsmref-center">
        <p className="vsmref-kicker">VASUPRIY INTERIOVILLA</p>
        <div className="vsmref-wordmark">SPACE DESIGNING <span>&amp; MAKEOVER</span></div>
        <h1 id="vsm-page-title">Shaped by thoughtful design,<br /><em>made for the way you live.</em></h1>
      </div>
      <div className="vsmref-leadcard" aria-labelledby="vsmref-form-title">
        <h2 id="vsmref-form-title">Enter your details and our experts will reach out to you.</h2>
        <form onSubmit={onSubmit}>
          <div className="vsmref-fields">
            <label><span className="vsmref-sr">Full name</span><input name="name" value={form.name} onChange={onChange} required maxLength={80} autoComplete="name" placeholder="Full Name" /></label>
            <label><span className="vsmref-sr">Mobile number</span><input name="phone" value={form.phone} onChange={onChange} required type="tel" minLength={7} maxLength={18} autoComplete="tel" placeholder="+91  Mobile Number" /></label>
            <label><span className="vsmref-sr">Email address</span><input name="email" value={form.email} onChange={onChange} required type="email" autoComplete="email" placeholder="Email ID" /></label>
            <label><span className="vsmref-sr">Pincode</span><input name="pincode" value={form.pincode} onChange={onChange} required pattern="[0-9]{6}" inputMode="numeric" maxLength={6} placeholder="Pincode*" /></label>
          </div>
          <div className="vsmref-lower">
            <div className="vsmref-legal">
              <label className="vsmref-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} /><span>Yes, I would like Vasupriy Interiovilla to contact me about my enquiry.</span></label>
              <p>Continuing will open your email app with a prepared enquiry. It is <strong>not sent automatically</strong>. See our <Link to="/contact">contact information</Link>.</p>
              {notice && <p className="vsmref-notice" role="status">{notice}</p>}
            </div>
            <button type="submit">Submit <span aria-hidden="true">↗</span></button>
          </div>
        </form>
      </div>
    </section>
  )
}
