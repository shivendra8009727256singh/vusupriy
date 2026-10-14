import { useEffect, useMemo, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { catalogue, findProduct, productCategories } from './catalogue'

import './ProductDetail.css'

export default function ProductDetail() {

  const { category, slug } = useParams()

  const product = findProduct(category, slug)

  const [activeImage, setActiveImage] = useState(0)

  const [activeTab, setActiveTab] = useState('overview')

  const [lightboxOpen, setLightboxOpen] = useState(false)

  const [showAllImages, setShowAllImages] = useState(false)

  useEffect(() => { setActiveImage(0); setSelectedFinish('all'); setActiveTab('overview'); setShowAllImages(false); window.scrollTo({top:0,behavior:'instant'}) }, [category,slug])

  const [selectedFinish, setSelectedFinish] = useState('all')

  const allImages = product?.images || []

  const images = selectedFinish === 'all' ? allImages : (product?.finishes?.find(f => f.name === selectedFinish)?.images || allImages)

  const visibleImages = showAllImages ? images : images.slice(0, 12)

  const changeFinish = finish => { setSelectedFinish(finish); setActiveImage(0); setShowAllImages(false) }

  const showPrevious = () => {

    setActiveImage(current => (current - 1 + images.length) % images.length)

  }

  const showNext = () => {

    setActiveImage(current => (current + 1) % images.length)

  }

  useEffect(() => {

    if (!lightboxOpen) return

    const onKeyDown = event => {

      if (event.key === 'Escape') setLightboxOpen(false)

      if (event.key === 'ArrowLeft' && images.length > 1) {

        setActiveImage(current => (current - 1 + images.length) % images.length)

      }

      if (event.key === 'ArrowRight' && images.length > 1) {

        setActiveImage(current => (current + 1) % images.length)

      }

    }

    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {

      document.removeEventListener('keydown', onKeyDown)

      document.body.style.overflow = previousOverflow

    }

  }, [lightboxOpen, images.length])

  useEffect(() => {

    setLightboxOpen(false)

  }, [category, slug])

  const related = useMemo(() => product ? catalogue.filter(p => p.category === product.category && p.slug !== product.slug).slice(0,4) : [],[product])

  if (!product) return <main className="vpd-missing"><span>VASUPRIY MATERIAL LIBRARY</span><h1>Collection not found.</h1><p>The requested material is not part of the current catalogue.</p><Link to="/interior-products">Explore all products ↗</Link></main>

  const group = productCategories.find(c => c.id === product.category)

  return <main className="vpd-page">

    <div className="vpd-topbar"><div className="vpd-wrap vpd-breadcrumb"><Link to="/interior-products">Products</Link><span>/</span><Link to={`/interior-products?category=${product.category}`}>{product.categoryName}</Link><span>/</span><strong>{product.name}</strong></div></div>

    <section className="vpd-intro vpd-wrap"><div><span className="vpd-eyebrow">VASUPRIY INTERIOVILLA <i/> {product.group.toUpperCase()}</span><h1>{product.name}<em>Crafted for your vision.</em></h1><p>{product.description}</p><div className="vpd-intro-actions"><a href="#vpd-materials" className="vpd-btn">Explore finishes <span>↗</span></a><Link to="/contact" state={{product:product.name,category:product.categoryName}} className="vpd-outline">Request a quote ↗</Link></div></div><div className="vpd-intro-side"><span>THE MATERIAL EDIT</span><img className="vpd-floating-brand-logo" src="/images/brand/vasupriy-navbar-watermark.png" alt="Vasupriy Interiovilla" /><small>{product.categoryName}</small></div></section>

    <section id="vpd-materials" className="vpd-gallery vpd-wrap" aria-label="Product gallery"><div className="vpd-photo-main">{images.length ? (

      <button

        type="button"

        className="vpd-image-zoom-trigger"
        style={product.name === 'Carpet Tiles Flooring' ? {
          background: '#fff',
          height: 'auto',
          minHeight: 0,
          maxHeight: 'none',
          width: '100%',
          display: 'block'
        } : undefined}

        onClick={() => setLightboxOpen(true)}

        aria-label={`Open full-screen gallery for ${product.name}`}

      >

        <img

          src={images[Math.min(activeImage, images.length - 1)]}

          alt={`${product.name} material sample ${activeImage + 1}`}
          style={product.name === 'Carpet Tiles Flooring' ? {
            display: 'block',
            width: '100%',
            maxWidth: 'none',
            height: 'auto',
            maxHeight: 'none',
            objectFit: 'contain',
            objectPosition: 'top center'
          } : undefined}

        />

        <span className="vpd-zoom-indicator">⤢ VIEW FULL SCREEN</span>

      </button>

    ) : <div className="vpd-placeholder"><span>VASUPRIY MATERIALS</span><strong>{product.name}</strong><small>Product photography will be added when available</small></div>}<span className="vpd-photo-tag">{product.group}</span></div><aside className="vpd-gallery-info"><span className="vpd-eyebrow">THE COLLECTION / {product.categoryName.toUpperCase()}</span><h2>Explore the <em>details.</em></h2><p>Browse available reference photographs and discuss exact finishes, samples and installation requirements with our design team.</p><div className="vpd-finish-label">{images.length ? `${images.length} reference ${images.length === 1 ? 'image' : 'images'}` : 'Images coming soon'}</div>{product.finishes?.length > 0 && <div className="vpd-spc-finishes" style={{margin:'18px 0',display:'flex',flexWrap:'wrap',gap:8}}><button type="button" onClick={() => changeFinish('all')} aria-pressed={selectedFinish==='all'} style={{padding:'9px 12px',borderRadius:20,border:'1px solid #b8aa91',background:selectedFinish==='all'?'#24251f':'transparent',color:selectedFinish==='all'?'#fff':'inherit',cursor:'pointer'}}>All finishes</button>{product.finishes.map(f=><button type="button" key={f.name} onClick={() => changeFinish(f.name)} aria-pressed={selectedFinish===f.name} style={{padding:'9px 12px',borderRadius:20,border:'1px solid #b8aa91',background:selectedFinish===f.name?'#24251f':'transparent',color:selectedFinish===f.name?'#fff':'inherit',cursor:'pointer'}}>{f.name} ({f.images.length})</button>)}</div>}<div className="vpd-thumbs">{visibleImages.map((image,index)=><button type="button" key={`${image}-${index}`} className={activeImage===index?'is-active':''} onClick={()=>setActiveImage(index)} aria-label={`View ${product.name} reference ${index+1}`} aria-pressed={activeImage===index}><img src={image} alt="" loading="lazy"/><span>{String(index+1).padStart(2,'0')}</span></button>)}</div>{images.length > 12 && <button type="button" className="vpd-gallery-toggle" aria-expanded={showAllImages} onClick={() => { if (showAllImages && activeImage >= 12) setActiveImage(0); setShowAllImages(value => !value) }} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,width:'100%',margin:'18px 0 8px',padding:'14px 18px',border:'1px solid #c8b28d',background:'#073c49',color:'#e9c99a',fontSize:12,fontWeight:700,letterSpacing:'0.12em',cursor:'pointer',transition:'background 0.2s ease'}}>{showAllImages ? 'SHOW LESS' : `VIEW ALL ${images.length} IMAGES`} <span aria-hidden="true">{showAllImages ? '↑' : '↓'}</span></button>}<p className="vpd-note">Reference photographs illustrate the product category; they are not verified SKU-specific finishes. Please confirm final selections before ordering.</p><Link to="/contact" state={{product:product.name}} className="vpd-dark-btn">Enquire about this material <span>↗</span></Link></aside></section>

    <section className="vpd-spec-section"><div className="vpd-wrap"><div className="vpd-section-head"><span className="vpd-eyebrow">PRODUCT INFORMATION</span><h2>Everything in <em>the detail.</em></h2></div><div className="vpd-tabs" role="tablist" aria-label="Product information"><button type="button" role="tab" aria-selected={activeTab==='overview'} onClick={()=>setActiveTab('overview')}>Overview</button><button type="button" role="tab" aria-selected={activeTab==='specifications'} onClick={()=>setActiveTab('specifications')}>Specifications</button><button type="button" role="tab" aria-selected={activeTab==='applications'} onClick={()=>setActiveTab('applications')}>Applications</button></div><div className="vpd-tab-panel" role="tabpanel">{activeTab==='overview' && <div className="vpd-copy"><h3>Considered materials. Beautiful spaces.</h3><p>{product.description}</p><p>Explore samples and product suitability with Vasupriy Interiovilla. Technical specifications, finish names, and exact availability are provided upon enquiry.</p></div>}{activeTab==='specifications' && <div className="vpd-spec-table">{product.specifications.map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>}{activeTab==='applications' && <div className="vpd-copy"><h3>Made for the way you live.</h3><p>Our team can help evaluate whether {product.name.toLowerCase()} is suitable for your residential, commercial, or outdoor project. Final suitability depends on the specific material and installation conditions.</p><Link to="/contact" state={{product:product.name}}>Discuss your project ↗</Link></div>}</div></div></section>

    {related.length > 0 && <section className="vpd-related vpd-wrap"><div className="vpd-section-head"><span className="vpd-eyebrow">CONTINUE EXPLORING</span><h2>Discover more <em>materials.</em></h2></div><div className="vpd-related-grid">{related.map(p=><Link key={p.url} to={p.url} className="vpd-related-card"><div>{p.images[0] ? <img src={p.images[0]} alt={`${p.name} material`} loading="lazy"/> : <span className="vpd-related-empty">VASUPRIY / MATERIALS</span>}</div><span>{p.group}</span><strong>{p.name}</strong><small>Explore product ↗</small></Link>)}</div></section>}

    <section className="vpd-cta"><div className="vpd-wrap"><div><span className="vpd-eyebrow">A PERSONAL APPROACH</span><h2>Let's select the <em>perfect finish.</em></h2><p>Share your project requirements and our team will help you explore the right options.</p></div><Link to="/contact" state={{product:product.name}}>Request a consultation ↗</Link></div></section>

    {lightboxOpen && images.length > 0 && (

      <div

        className="vpd-lightbox-overlay"

        role="dialog"

        aria-modal="true"

        aria-label={`${product.name} full-screen image gallery`}

        onClick={() => setLightboxOpen(false)}

      >

        <div className="vpd-lightbox-top">

          <div>

            <span>VASUPRIY INTERIOVILLA</span>

            <strong>{product.name}</strong>

          </div>

          <button

            type="button"

            className="vpd-lightbox-close"

            onClick={() => setLightboxOpen(false)}

            aria-label="Close gallery"

          >

            ×

          </button>

        </div>

        <div

          className="vpd-lightbox-stage"

          onClick={event => event.stopPropagation()}

          onTouchStart={event => {

            event.currentTarget.dataset.touchX = event.touches[0].clientX

          }}

          onTouchEnd={event => {

            const start = Number(event.currentTarget.dataset.touchX)

            const difference = event.changedTouches[0].clientX - start

            if (images.length > 1 && Math.abs(difference) > 55) {

              if (difference < 0) showNext()

              else showPrevious()

            }

          }}

        >

          {images.length > 1 && (

            <button

              type="button"

              className="vpd-lightbox-arrow vpd-lightbox-arrow--prev"

              onClick={showPrevious}

              aria-label="Previous image"

            >

              ←

            </button>

          )}

          <img

            key={images[activeImage]}

            src={images[activeImage]}

            alt={`${product.name} reference ${activeImage + 1}`}

            className="vpd-lightbox-image"

          />

          {images.length > 1 && (

            <button

              type="button"

              className="vpd-lightbox-arrow vpd-lightbox-arrow--next"

              onClick={showNext}

              aria-label="Next image"

            >

              →

            </button>

          )}

        </div>

        <div className="vpd-lightbox-bottom">

          <span>

            {String(activeImage + 1).padStart(2, '0')}

            <i />

            {String(images.length).padStart(2, '0')}

          </span>

          <p>REFERENCE IMAGE · CONFIRM PRODUCT DETAILS BEFORE ORDERING</p>

          <Link

            to="/contact"

            state={{ product: product.name, category: product.categoryName }}

            onClick={() => setLightboxOpen(false)}

          >

            ENQUIRE NOW ↗

          </Link>

        </div>

      </div>

    )}

  </main>

}
