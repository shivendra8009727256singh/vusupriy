import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import productImages from './productImages.json'
import { imagesForProduct } from './productImageMap'
import { slugify, findProduct } from '../ProductDetail/catalogue'
import './InteriorProducts.css'

const collections = [
  { id: 'flooring', number: '01', title: 'Flooring Styling', subtitle: 'The foundation of beautiful spaces', label: 'THE ART OF SURFACES', description: 'Understated texture. Exceptional presence. Discover surfaces that ground a room and define its character.', groups: [
    { title: 'Flooring & Finishes', items: ['European Laminate', 'SPC Flooring', 'Wooden Deck Flooring', 'Deck Flooring', 'WPC Deck Flooring', 'Carpet Tiles Flooring', 'Artificial Grass Flooring', 'Epoxy Flooring', 'Handmade Rugs', 'Self-Adhesive Tiles'] },
  ] },
  { id: 'green', number: '02', title: 'Green Element', subtitle: 'Nature, thoughtfully brought indoors', label: 'LIVING TEXTURES', description: 'An invitation to slow down. Organic forms and greenery that bring a quiet sense of life to a space.', groups: [
    { title: 'Green Living', items: ['Artificial Grass Flooring', 'Vertical Garden', 'Artificial Plant and Tree', 'Natural Garden'] },
  ] },
  { id: 'lighting', number: '03', title: 'Enlightenment Options', subtitle: 'A new perspective on light', label: 'THE ART OF ILLUMINATION', description: 'Light creates mood, rhythm and atmosphere. Explore thoughtful options for interiors and outdoor spaces.', groups: [
    { title: 'Architectural Lighting', items: ['Chandeliers', 'Garden Light', 'Ceiling Light', 'Pole Light', 'Wall Lamps', 'Down Light', 'Focus Light', 'Floor Lamps', 'Indoor & Outdoor Lights'] },
  ] },
  { id: 'walls', number: '04', title: 'Wall Makeover Products', subtitle: 'Every wall has a story', label: 'SURFACE EXPRESSION', description: 'A tactile palette of finishes and architectural details to make ordinary walls feel extraordinary.', groups: [
    { title: 'Wallpaper', items: ['Non-Woven Wallpaper', 'Customized Design Wallpaper', 'Fabric Wallpaper'] },
    { title: 'Wall Moulding', items: ['Wall Moulding'] },
    { title: 'Wall Panels', items: ['WPC Panels', 'PVC Panels', 'Charcoal Metallic Panels', '3D CNC Cutting Wall Panels', 'FRP Wall Panels', 'MDF Wall Panels'] },
    { title: 'Sheets', items: ['Texture Sheet', 'Fluted Acrylic Sheet', 'Natural Cork Sheet'] },
    { title: 'Concrete Work', items: ['Concrete Work (Walls & Outer Building Settings)'] },
    { title: 'Tiles & Inlay', items: ['Mosaic Tiles (Metal & Glass)', '3D Self-Adhesive Tiles', 'Elegant Wall & Flooring Tiles', 'Highlighter Tiles', 'Stone & Inlay Work on Walls'] },
  ] },
]


// Reuse photographs already present in the Vasupriy project, without copying stock imagery.
const siteAssets = import.meta.glob('../../assets/images/**/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' })
const sitePhotos = Object.entries(siteAssets).map(([path, url]) => ({ path: path.toLowerCase(), url }))
const sitePhoto = (...terms) => sitePhotos.find(({ path }) => terms.some(term => path.includes(term)))?.url || null
const collectionImages = {
  flooring: productImages.laminate[0],
  green: productImages.green[0],
  lighting: productImages.chandeliers[0],
  walls: sitePhoto('premium-wall-panels', 'living-room-feature-wall', 'cafe-feature-wall', 'bedroom-wall-paneling'),
}
const detailUrl = (category, name) => `/products/${category}/${slugify(name)}`
const galleryFor = (category, name) => findProduct(category, slugify(name))?.images || imagesForProduct(name)
const imageFor = (category, name) => galleryFor(category, name)[0] || null
const photoTiles = [
  { title: 'Natural Wood', eyebrow: 'FLOORING', image: productImages.laminate[2] || productImages.laminate[0], category: 'flooring', name: 'European Laminate' },
  { title: 'Contemporary Surfaces', eyebrow: 'SPC COLLECTION', image: productImages.spc[1] || productImages.spc[0], category: 'flooring', name: 'SPC Flooring' },
  { title: 'Living Green', eyebrow: 'BOTANICAL', image: imagesForProduct('Vertical Garden')[0], category: 'green', name: 'Vertical Garden' },
  { title: 'Architectural Light', eyebrow: 'ILLUMINATION', image: productImages.ceilingLights[0], category: 'lighting', name: 'Ceiling Light' },
  { title: 'Statement Walls', eyebrow: 'WALL FINISHES', image: collectionImages.walls, category: 'walls', name: 'WPC Panels' },
  { title: 'Handcrafted Texture', eyebrow: 'RUGS & TEXTILES', image: productImages.rug[1] || productImages.rug[0], category: 'flooring', name: 'Handmade Rugs' },
].filter(item => item.image)

function MaterialRow({ name, category, index, open, onToggle }) {
  const image = imageFor(category, name)
  return (
    <div className={`vpm-material ${open ? 'vpm-material--open' : ''}`}>
      <button className="vpm-material-trigger" type="button" onClick={onToggle} aria-expanded={open}>
        <span className="vpm-material-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="vpm-material-name">{name}</span>
        <span className="vpm-material-plus" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="vpm-material-reveal">
        {image ? <img src={image} alt={`${name} material reference`} loading="lazy" /> : <div className="vpm-no-image"><span>Material enquiry</span><strong>{name}</strong><small>Product photography coming soon</small></div>}
        <div className="vpm-material-action"><p>Explore actual samples, finishes and product details.</p><Link to={detailUrl(category, name)}>View {name} details <span aria-hidden="true">↗</span></Link><Link className="vpm-enquiry-mini" to="/contact" state={{ product: name }}>Request a quote ↗</Link></div>
      </div>}
    </div>
  )
}

function Collection({ collection, reverse, search }) {
  const [openName, setOpenName] = useState(null)
  const [activePhoto, setActivePhoto] = useState(0)
  useEffect(() => { setOpenName(null); setActivePhoto(0) }, [collection.id, search])
  const selectMaterial = (name) => {
    setOpenName(current => current === name ? null : name)
    setActivePhoto(0)
  }
  const groups = collection.groups.map(group => ({ ...group, items: group.items.filter(name => `${name} ${group.title} ${collection.title}`.toLowerCase().includes(search.toLowerCase().trim())) })).filter(group => group.items.length)
  if (!groups.length) return null
  const gallery = openName ? galleryFor(collection.id, openName) : []
  const image = openName ? (gallery[activePhoto] || null) : collectionImages[collection.id]
  const hasMissingPhoto = Boolean(openName && !gallery.length)
  return <article id={`vpm-${collection.id}`} className={`vpm-collection ${reverse ? 'vpm-collection--reverse' : ''}`}>
    <div className="vpm-collection-visual">
      {image ? <img key={image} className="vpm-selected-photo" src={image} alt={openName ? `${openName} product reference ${activePhoto + 1}` : `${collection.title} collection`} loading="lazy" /> : hasMissingPhoto ? <div className="vpm-selected-empty" role="status"><span>PRODUCT REFERENCE</span><strong>{openName}</strong><p>Product photography coming soon</p><Link to={detailUrl(collection.id, openName)}>View product details ↗</Link></div> : <div className={`vpm-art vpm-art--${collection.id}`} aria-hidden="true"><span>{collection.number}</span><strong>{collection.id === 'lighting' ? 'LIGHT' : 'FORM'}</strong><small>VASUPRIY MATERIAL LIBRARY</small></div>}
      {openName && gallery.length > 1 && <div className="vpm-selected-thumbnails" aria-label={`${openName} reference photos`}>{gallery.map((photo, i) => <button key={`${photo}-${i}`} type="button" className={i === activePhoto ? 'is-active' : ''} aria-label={`Show ${openName} image ${i + 1}`} aria-pressed={i === activePhoto} onClick={() => setActivePhoto(i)}><img src={photo} alt="" loading="lazy" /></button>)}</div>}
      {openName && <div className="vpm-selected-label" aria-live="polite"><span>{openName}</span>{gallery.length > 0 && <small>{activePhoto + 1} / {gallery.length}</small>}</div>}
      <span className="vpm-visual-mark">{collection.number} / 04</span>
      <span className="vpm-visual-caption">VASUPRIY · INTERIOVILLA</span>
    </div>
    <div className="vpm-collection-copy">
      <div className="vpm-collection-meta"><span>{collection.label}</span><span>COLLECTION {collection.number}</span></div>
      <h2>{collection.title}<em>{collection.subtitle}</em></h2>
      <p className="vpm-collection-description">{collection.description}</p>
      <div className="vpm-material-list">
        {groups.map(group => <div key={group.title} className="vpm-material-group">
          {collection.groups.length > 1 && <h3>{group.title}</h3>}
          {group.items.map((name, index) => <MaterialRow key={name} name={name} category={collection.id} index={index} open={openName === name} onToggle={() => selectMaterial(name)} />)}
        </div>)}
      </div>
      <Link className="vpm-collection-link" to={`/interior-products?category=${collection.id}`}>Explore this collection <span aria-hidden="true">↗</span></Link>
    </div>
  </article>
}

const lightingProducts = [
  { name: 'Chandeliers', key: 'chandeliers' },
  { name: 'Ceiling Light', key: 'ceilingLights' },
  { name: 'Down Light', key: 'downLights' },
  { name: 'Focus Light', key: 'focusLights' },
  { name: 'Wall Lamps', key: 'wallLamps' },
  { name: 'Garden Light', key: 'gardenLights' },
  { name: 'Pole Light', key: 'poleLights' },
]
function LightingShowroom() {
  const [selected, setSelected] = useState('all')

  const available = lightingProducts.map(product => {
    const normalized = value => value.toLowerCase().replace(/[^a-z0-9]/g, '')
    const key = Object.keys(productImages).find(
      candidate => normalized(candidate) === normalized(product.key) ||
        normalized(candidate) === normalized(product.name)
    )

    return {
      ...product,
      images: key ? productImages[key] : [],
    }
  }).filter(product => product.images?.length)

  if (!available.length) return null

  const visible = selected === 'all'
    ? available
    : available.filter(product => product.name === selected)

  return (
    <section className="vpm-lighting-showroom vpm-container" aria-label="Luxury lighting showroom">
      <div className="vpm-lighting-showroom-heading">
        <div>
          <span className="vpm-kicker">THE LIGHTING ATELIER</span>
          <h2>Light, beautifully <em>considered.</em></h2>
        </div>
        <p>Explore our curated lighting references, from sculptural chandeliers to architectural illumination.</p>
      </div>

      <div className="vpm-lighting-filters" aria-label="Filter lighting products">
        <button type="button" className={selected === 'all' ? 'is-active' : ''} onClick={() => setSelected('all')}>All Lighting</button>
        {available.map(product => (
          <button
            key={product.name}
            type="button"
            className={selected === product.name ? 'is-active' : ''}
            onClick={() => setSelected(product.name)}
          >
            {product.name}
          </button>
        ))}
      </div>

      <div className="vpm-lighting-grid">
        {visible.map((product, index) => (
          <Link
            key={product.name}
            className="vpm-lighting-card"
            to={detailUrl('lighting', product.name)}
          >
            <div className="vpm-lighting-card-image">
              <img
                src={product.images[0]}
                alt={`${product.name} from Vasupriy Interiovilla`}
                loading="lazy"
              />
              <span className="vpm-lighting-card-count">
                {String(index + 1).padStart(2, '0')} / {String(available.length).padStart(2, '0')}
              </span>
              <span className="vpm-lighting-card-arrow" aria-hidden="true">↗</span>
            </div>
            <div className="vpm-lighting-card-info">
              <div>
                <span>VASUPRIY / LIGHTING COLLECTION</span>
                <h3>{product.name}</h3>
              </div>
              <small>{product.images.length} reference images</small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
export default function InteriorProducts() {
  const location = useLocation()
  const navigate = useNavigate()
  const selected = new URLSearchParams(location.search).get('category')
  const active = collections.some(c => c.id === selected) ? selected : 'all'
  const [search, setSearch] = useState('')
  useEffect(() => setSearch(''), [active])
  const shown = useMemo(() => active === 'all' ? collections : collections.filter(c => c.id === active), [active])
  const choose = (id) => navigate(id === 'all' ? '/interior-products' : `/interior-products?category=${id}`)
  return <main className="vpm-page">
    <section className="vpm-hero">
      <div className="vpm-container vpm-hero-grid">
        <div className="vpm-hero-copy"><span className="vpm-eyebrow"><i /> VASUPRIY INTERIOVILLA — MATERIAL ATELIER</span>
          <h1>The art of <em>beautiful</em><br />materials.</h1>
          <p>Explore authentic flooring, greenery, lighting and wall finishes — carefully chosen to make every interior unmistakably yours.</p>
          <a className="vpm-hero-button" href="#vpm-collections">Explore the collections <span aria-hidden="true">↗</span></a>
          <div className="vpm-hero-foot"><span>04 COLLECTIONS</span><span>CURATED MATERIALS · REAL FINISHES</span></div>
        </div>
        <div className="vpm-hero-visual"><img src={productImages.laminate[1] || productImages.laminate[0]} alt="Premium flooring material from the Vasupriy collection" /><div className="vpm-hero-inset"><img src={productImages.rug[0]} alt="Handmade rug from the Vasupriy collection" /></div><span className="vpm-hero-image-label">THE VASUPRIY MATERIAL EDIT</span></div>
      </div>
    </section>
    <section className="vpm-curation vpm-container" aria-label="Featured product materials">
      <div className="vpm-curation-top"><div><span className="vpm-kicker">THE MATERIAL LIBRARY</span><h2>Texture. <em>Form.</em> Feeling.</h2></div><p>A closer look at the finishes, textures and details that define exceptional spaces.</p></div>
      <div className="vpm-curation-grid">{photoTiles.map((item, index) => <Link key={`${item.category}-${item.name}`} className={`vpm-photo-tile vpm-photo-tile--${index}`} to={detailUrl(item.category, item.name)}><img src={item.image} alt={`${item.title} — Vasupriy product material`} loading="lazy" /><span className="vpm-photo-shade"/><span className="vpm-photo-copy"><small>{item.eyebrow}</small><strong>{item.title}</strong><span>Explore product ↗</span></span></Link>)}</div>
    </section>
    <LightingShowroom />
    <section id="vpm-collections" className="vpm-catalog vpm-container">
      <div className="vpm-catalog-heading"><div><span className="vpm-kicker">THE COLLECTIONS</span><h2>Explore by <em>material.</em></h2></div><p>Not simply products. A collection of details that bring a space to life.</p></div>
      <div className="vpm-toolbar"><div className="vpm-category-nav" aria-label="Select product collection">{[{id:'all',title:'All Collections'},...collections].map(c => <button type="button" key={c.id} onClick={() => choose(c.id)} className={active === c.id ? 'is-active' : ''} aria-pressed={active === c.id}>{c.title}</button>)}</div><label className="vpm-search"><span className="vpm-sr-only">Search materials</span><input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a material..." /></label></div>
      <div className="vpm-collections">{shown.map((collection, index) => <Collection key={collection.id} collection={collection} reverse={index % 2 === 1} search={search} />)}</div>
      {shown.every(c => c.groups.every(g => g.items.every(name => !`${name} ${g.title} ${c.title}`.toLowerCase().includes(search.toLowerCase().trim())))) && <div className="vpm-empty">No matching materials. <button type="button" onClick={() => setSearch('')}>Clear search</button></div>}
    </section>
    <section className="vpm-outro"><div className="vpm-container vpm-outro-inner"><div><span className="vpm-kicker">A MORE PERSONAL APPROACH</span><h2>Your vision deserves <em>the right materials.</em></h2><p>Tell us what you have in mind. We'll help you explore the collection.</p></div><Link to="/contact" className="vpm-hero-button">Start a conversation <span aria-hidden="true">↗</span></Link></div></section>
  </main>
}
