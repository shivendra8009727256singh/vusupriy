import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import galleries from './customThemeGalleries.json'
import './CustomThemeGallery.css'

export default function CustomThemeGallery() {
  const { slug } = useParams()
  const item = galleries[slug]
  const [selected, setSelected] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => { setSelected(0); setLightbox(false) }, [slug])
  useEffect(() => {
    if (!item) return
    const previous = document.title
    document.title = `${item.title} | Vasupriy Interiovilla`
    return () => { document.title = previous }
  }, [item])
  useEffect(() => {
    if (!lightbox || !item) return
    const handleKey = (event) => {
      if (event.key === 'Escape') setLightbox(false)
      if (event.key === 'ArrowRight') setSelected(value => (value + 1) % item.images.length)
      if (event.key === 'ArrowLeft') setSelected(value => (value - 1 + item.images.length) % item.images.length)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [lightbox, item])

  if (!item) return <Navigate to="/services/customized-theme-products" replace />
  const image = item.images[selected]
  const advance = (direction) => setSelected(value => (value + direction + item.images.length) % item.images.length)

  return (
    <main className="ctg-page">
      <section className="ctg-intro">
        <div className="ctg-container">
          <nav className="ctg-breadcrumb" aria-label="Breadcrumb">
            <Link to="/services/customized-theme-products">Customized Theme Products</Link><span aria-hidden="true">/</span><span>{item.title}</span>
          </nav>
          <div className="ctg-heading"><div><p className="ctg-eyebrow">VASUPRIY / BESPOKE COLLECTION</p><h1>{item.title}<em>.</em></h1><p className="ctg-lead">{item.blurb}</p></div><span className="ctg-count">{String(item.images.length).padStart(2, '0')} / GALLERY IMAGES</span></div>
        </div>
      </section>

      <section className="ctg-container ctg-layout" aria-label={`${item.title} gallery`}>
        <div className="ctg-gallery">
          <div className="ctg-feature"><button type="button" className="ctg-feature-button" onClick={() => setLightbox(true)} aria-label={`Enlarge ${item.title} image ${selected + 1}`}><img src={image} alt={`${item.title} design reference ${selected + 1}`} /></button><span className="ctg-feature-counter">{String(selected + 1).padStart(2, '0')} / {String(item.images.length).padStart(2, '0')}</span></div>
          <div className="ctg-gallery-controls"><button type="button" onClick={() => advance(-1)} aria-label="Previous image">Previous</button><span>Explore the collection</span><button type="button" onClick={() => advance(1)} aria-label="Next image">Next</button></div>
          <div className="ctg-thumbnails">{item.images.map((src, index) => <button key={src} className={`ctg-thumb ${selected === index ? 'is-active' : ''}`} onClick={() => setSelected(index)} type="button" aria-label={`Show image ${index + 1}`} aria-pressed={selected === index}><img src={src} loading="lazy" alt={`${item.title} gallery thumbnail ${index + 1}`} /></button>)}</div>
        </div>
        <aside className="ctg-information"><p className="ctg-eyebrow">THE COLLECTION</p><h2>Designed around <em>your space.</em></h2><p>{item.blurb}</p><div className="ctg-info-rule" /><h3>Where it works</h3><ul>{item.applications.map(application => <li key={application}>{application}</li>)}</ul><h3>Selection & guidance</h3><p>{item.notes}</p><p className="ctg-disclaimer">Gallery imagery is for design reference. Final materials, dimensions, availability and pricing are confirmed for each project.</p><Link to="/contact" className="ctg-inquire">Discuss your project <span aria-hidden="true">↗</span></Link></aside>
      </section>

      <section className="ctg-bottom"><div className="ctg-container ctg-bottom-inner"><div><p className="ctg-eyebrow">EXPLORE MORE</p><h2>Every detail has a story.</h2></div><Link to="/services/customized-theme-products#what-we-customize">Back to all collections <span aria-hidden="true">↗</span></Link></div></section>

      {lightbox && <div className="ctg-lightbox" role="dialog" aria-modal="true" aria-label={`${item.title} image viewer`} onClick={() => setLightbox(false)}><button className="ctg-lightbox-close" type="button" onClick={() => setLightbox(false)} aria-label="Close gallery">×</button><button type="button" className="ctg-lightbox-arrow" onClick={event => { event.stopPropagation(); advance(-1) }} aria-label="Previous image">‹</button><img src={image} alt={`${item.title} image ${selected + 1}`} onClick={event => event.stopPropagation()} /><button type="button" className="ctg-lightbox-arrow" onClick={event => { event.stopPropagation(); advance(1) }} aria-label="Next image">›</button><span className="ctg-lightbox-count">{selected + 1} / {item.images.length}</span></div>}
    </main>
  )
}