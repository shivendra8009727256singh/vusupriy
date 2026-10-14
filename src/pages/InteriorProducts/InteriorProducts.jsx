import { useEffect, useMemo, useState } from 'react'

import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'

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

const siteAssets = import.meta.glob('../../assets/images/\*\*/\*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' })

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

      <Link className="vpm-collection-link" to={`/interior-products/${collection.id}`}>Explore this collection <span aria-hidden="true">↗</span></Link>

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

  const { category } = useParams()

  const legacyCategory = new URLSearchParams(location.search).get('category')

  const selected = category || legacyCategory

  const active = collections.some(c => c.id === selected) ? selected : 'all'

  const isCategoryPage = Boolean(category)

  const currentCollection = collections.find(c => c.id === active)

  const [search, setSearch] = useState('')

  useEffect(() => setSearch(''), [active])

  useEffect(() => {

    if (category) window.scrollTo({ top: 0, behavior: 'instant' })

  }, [category])

  const shown = useMemo(() => active === 'all' ? collections : collections.filter(c => c.id === active), [active])

  const choose = (id) => navigate(id === 'all' ? '/interior-products' : `/interior-products/${id}`)

  if (category && !currentCollection) return <Navigate to="/interior-products" replace />

  if (!category && legacyCategory && currentCollection) {

    return <Navigate to={`/interior-products/${active}`} replace />

  }

  return <main className="vpm-page">

    {!isCategoryPage && <section className="vpm-hero">

      <div className="vpm-container vpm-hero-grid">

        <div className="vpm-hero-copy"><span className="vpm-eyebrow"><i /> VASUPRIY INTERIOVILLA — MATERIAL ATELIER</span>

          <h1>The art of <em>beautiful</em><br />materials.</h1>

          <p>Explore authentic flooring, greenery, lighting and wall finishes — carefully chosen to make every interior unmistakably yours.</p>

          <a className="vpm-hero-button" href="#vpm-collections">Explore the collections <span aria-hidden="true">↗</span></a>

          <div className="vpm-hero-foot"><span>04 COLLECTIONS</span><span>CURATED MATERIALS · REAL FINISHES</span></div>

        </div>

        <div className="vpm-hero-visual"><img src={productImages.laminate[1] || productImages.laminate[0]} alt="Premium flooring material from the Vasupriy collection" /><div className="vpm-hero-inset"><img src={productImages.rug[0]} alt="Handmade rug from the Vasupriy collection" /></div><span className="vpm-hero-image-label">THE VASUPRIY MATERIAL EDIT</span></div>

      </div>

    </section>}

    {!isCategoryPage && <section className="vpm-curation vpm-container" aria-label="Featured product materials">

      <div className="vpm-curation-top"><div><span className="vpm-kicker">THE MATERIAL LIBRARY</span><h2>Texture. <em>Form.</em> Feeling.</h2></div><p>A closer look at the finishes, textures and details that define exceptional spaces.</p></div>

      <div className="vpm-curation-grid">{photoTiles.map((item, index) => <Link key={`${item.category}-${item.name}`} className={`vpm-photo-tile vpm-photo-tile--${index}`} to={detailUrl(item.category, item.name)}><img src={item.image} alt={`${item.title} — Vasupriy product material`} loading="lazy" /><span className="vpm-photo-shade"/><span className="vpm-photo-copy"><small>{item.eyebrow}</small><strong>{item.title}</strong><span>Explore product ↗</span></span></Link>)}</div>

    </section>}

    {!isCategoryPage && <LightingShowroom />}

    <style>{`
/* Category-only editorial hero. Existing All Products styles remain untouched. */
.vpm-page .vpm-category-hero{position:relative;isolation:isolate;overflow:hidden;background:linear-gradient(115deg,#f9f6f0 0%,#f2ede4 58%,#e9e1d5 100%);padding:clamp(160px,14vw,205px) 0 105px;color:#103d46}
.vpm-category-hero-inner{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.94fr);align-items:center;gap:clamp(48px,6vw,105px);position:relative;z-index:1}
.vpm-category-hero-copy{min-width:0;animation:vpmCategoryEnter .75s ease both}
.vpm-category-back{display:inline-flex;color:#32575d;text-decoration:none;font:700 11px Arial,sans-serif;letter-spacing:.08em;border-bottom:1px solid #bca47f;padding-bottom:12px;margin-bottom:40px}
.vpm-category-back:hover{color:#b08a59}
.vpm-category-eyebrow{display:flex;align-items:center;gap:12px;color:#a38157;font:700 10px/1.6 Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase}
.vpm-category-eyebrow>span{width:27px;height:1px;background:#b99b71;flex-shrink:0}
.vpm-category-eyebrow b{font-weight:400;opacity:.6}
.vpm-page .vpm-category-hero h1{font:400 clamp(52px,5.3vw,85px)/1.05 Georgia,'Times New Roman',serif;letter-spacing:-.065em;margin:30px 0 22px;color:#103744;text-wrap:balance}
.vpm-page .vpm-category-hero h1 em{display:block;margin-top:18px;font:italic 400 clamp(25px,2.7vw,41px)/1.23 Georgia,serif;letter-spacing:-.035em;color:#b08a59}
.vpm-category-hero-copy>p{max-width:480px;color:#647477;font:400 15px/1.95 Arial,sans-serif;margin:0 0 32px}
.vpm-category-hero-actions{display:flex;flex-wrap:wrap;align-items:center;gap:23px}
.vpm-category-primary{display:inline-flex;align-items:center;justify-content:space-between;gap:38px;padding:19px 23px;background:#0c4049;color:#f7efe3;text-decoration:none;font:700 11px Arial,sans-serif;letter-spacing:.06em;transition:background .25s,transform .25s}
.vpm-category-primary:hover{background:#155562;transform:translateY(-3px)}
.vpm-category-primary span{font-size:19px}
.vpm-category-secondary{color:#214e55;text-decoration:none;border-bottom:1px solid #ae926d;padding-bottom:8px;font:700 11px Arial,sans-serif;letter-spacing:.025em}
.vpm-category-hero-footer{display:flex;flex-wrap:wrap;gap:12px 24px;border-top:1px solid #d6cbbc;margin-top:55px;padding-top:20px;color:#8b795f;font:700 9px Arial,sans-serif;letter-spacing:.16em}
.vpm-category-hero-visual{position:relative;min-width:0;height:clamp(420px,42vw,590px);background:#d6d3c9;box-shadow:0 25px 65px rgba(17,48,50,.17);animation:vpmCategoryEnter .9s .1s ease both}
.vpm-category-hero-visual>img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1)}
.vpm-category-hero-visual:hover>img{transform:scale(1.025)}
.vpm-category-hero-outline{position:absolute;inset:-17px 17px 17px -17px;border:1px solid rgba(174,137,84,.7);pointer-events:none}
.vpm-category-hero-image-caption{position:absolute;bottom:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:28px 24px 19px;background:linear-gradient(0deg,rgba(4,33,39,.82),transparent);color:white;font:700 10px Arial,sans-serif;letter-spacing:.17em}
.vpm-category-hero-image-caption strong{color:#e4c49b;font-weight:700;white-space:nowrap}
.vpm-category-hero-watermark{position:absolute;left:-.1em;bottom:-.27em;z-index:0;pointer-events:none;font:400 clamp(260px,35vw,520px)/1 Georgia,serif;color:rgba(14,65,70,.035)}
.vpm-catalog--category{padding-top:70px;scroll-margin-top:100px}
.vpm-category-section-heading{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:14px 40px}
.vpm-category-section-heading h2{font-size:clamp(36px,4.5vw,62px);letter-spacing:-.05em;margin:10px 0 0}
.vpm-category-section-heading p{font:14px/1.8 Arial,sans-serif;color:#66777a;max-width:310px;margin:0}
@keyframes vpmCategoryEnter{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:950px){.vpm-category-hero-inner{gap:35px}.vpm-page .vpm-category-hero h1{font-size:clamp(43px,5.5vw,66px)}.vpm-category-hero-visual{height:470px}}
@media(max-width:750px){.vpm-page .vpm-category-hero{padding:142px 0 65px}.vpm-category-hero-inner{grid-template-columns:1fr;gap:46px}.vpm-category-back{margin-bottom:26px}.vpm-page .vpm-category-hero h1{font-size:clamp(45px,10vw,68px)}.vpm-page .vpm-category-hero h1 em{font-size:clamp(25px,6vw,36px)}.vpm-category-hero-visual{height:clamp(330px,90vw,520px);margin-left:12px}.vpm-category-hero-outline{inset:-12px 12px 12px -12px}.vpm-category-hero-footer{margin-top:36px}.vpm-catalog--category{padding-top:48px}.vpm-category-section-heading{display:block}.vpm-category-section-heading p{margin-top:12px}}
@media(prefers-reduced-motion:reduce){.vpm-category-hero-copy,.vpm-category-hero-visual{animation:none}.vpm-category-hero-visual>img,.vpm-category-primary{transition:none}}
`}</style>

    {isCategoryPage && (
      <section className={`vpm-category-hero vpm-category-hero--${active}`} aria-labelledby="vpm-category-title">
        <div className="vpm-container vpm-category-hero-inner">
          <div className="vpm-category-hero-copy">
            <Link className="vpm-category-back" to="/interior-products">← &nbsp; All Products</Link>
            <div className="vpm-category-eyebrow"><span /> {currentCollection.label} <b> / </b> COLLECTION {currentCollection.number}</div>
            <h1 id="vpm-category-title">{currentCollection.title}<em>{currentCollection.subtitle}</em></h1>
            <p>{currentCollection.description}</p>
            <div className="vpm-category-hero-actions">
              <a className="vpm-category-primary" href="#vpm-collections">Explore Materials <span aria-hidden="true">↗</span></a>
              <Link className="vpm-category-secondary" to="/contact">Discuss your project <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="vpm-category-hero-footer"><span>VASUPRIY MATERIAL ATELIER</span><span>{String(currentCollection.groups.reduce((total, group) => total + group.items.length, 0)).padStart(2, '0')} CURATED MATERIALS</span></div>
          </div>
          <div className="vpm-category-hero-visual">
            {(collectionImages[active] || imageFor(active, currentCollection.groups[0].items[0])) ? (
              <img src={collectionImages[active] || imageFor(active, currentCollection.groups[0].items[0])} alt={`${currentCollection.title} from Vasupriy Interiovilla`} fetchPriority="high" />
            ) : (
              <div className={`vpm-art vpm-art--${active}`} aria-label={currentCollection.title}><span>{currentCollection.number}</span><strong>{currentCollection.title}</strong></div>
            )}
            <div className="vpm-category-hero-image-caption"><span>THE VASUPRIY COLLECTION</span><strong>{currentCollection.number} / 04</strong></div>
            <span className="vpm-category-hero-outline" aria-hidden="true" />
          </div>
        </div>
        <span className="vpm-category-hero-watermark" aria-hidden="true">{currentCollection.number}</span>
      </section>
    )}

    <section
      id="vpm-collections"
      className={`vpm-catalog vpm-container ${isCategoryPage ? 'vpm-catalog--category' : ''}`}
    >
      {!isCategoryPage && (
        <div className="vpm-catalog-heading">
          <div><span className="vpm-kicker">THE COLLECTIONS</span><h2>Explore by <em>material.</em></h2></div>
          <p>Not simply products. A collection of details that bring a space to life.</p>
        </div>
      )}
      {isCategoryPage && (
        <div className="vpm-category-section-heading"><span className="vpm-kicker">EXPLORE THE COLLECTION</span><h2>Discover the <em>details.</em></h2><p>Select a material to preview finishes and reference imagery.</p></div>
      )}

    <div className="vpm-toolbar"><div className="vpm-category-nav" aria-label="Select product collection">{[{id:'all',title:'All Collections'},...collections].map(c => <button type="button" key={c.id} onClick={() => choose(c.id)} className={active === c.id ? 'is-active' : ''} aria-pressed={active === c.id}>{c.title}</button>)}</div><label className="vpm-search"><span className="vpm-sr-only">Search materials</span><input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a material..." /></label></div>

      <div className="vpm-collections">{shown.map((collection, index) => <Collection key={collection.id} collection={collection} reverse={index % 2 === 1} search={search} />)}</div>

      {shown.every(c => c.groups.every(g => g.items.every(name => !`${name} ${g.title} ${c.title}`.toLowerCase().includes(search.toLowerCase().trim())))) && <div className="vpm-empty">No matching materials. <button type="button" onClick={() => setSearch('')}>Clear search</button></div>}

    </section>

    <section className="vpm-outro"><div className="vpm-container vpm-outro-inner"><div><span className="vpm-kicker">A MORE PERSONAL APPROACH</span><h2>Your vision deserves <em>the right materials.</em></h2><p>Tell us what you have in mind. We'll help you explore the collection.</p></div><Link to="/contact" className="vpm-hero-button">Start a conversation <span aria-hidden="true">↗</span></Link></div></section>

  </main>

}
