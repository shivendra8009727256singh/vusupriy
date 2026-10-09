import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { blogPosts, getBlogPage, filterBlogPosts } from '../../data/blogPosts.js'
import bannerImage from '../../assets/blog/blogheader.png'
import './Blog.css'

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
})

function Blog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const listingRef = useRef(null)
  const searchRef = useRef(null)
  const query = searchParams.get('q') ?? ''
  const categories = [...new Set(blogPosts.map(post => post.category))]
  const requestedCategory = searchParams.get('category') ?? ''
  const category = categories.includes(requestedCategory) ? requestedCategory : ''
  const filteredPosts = filterBlogPosts(blogPosts, query, category)
  const { page, pageCount, posts } = getBlogPage(filteredPosts, searchParams.get('page'))

  function changeFilter(key, value) {
    const params = new URLSearchParams(searchParams)
    params.delete('page')
    if (value) params.set(key, value)
    else params.delete(key)
    setSearchParams(params, { replace: true })
  }

  function resetFilters() {
    const params = new URLSearchParams(searchParams)
    for (const key of ['q', 'category', 'page']) params.delete(key)
    setSearchParams(params, { replace: true })
    searchRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    const root = listingRef.current
    const cards = [...root.querySelectorAll('.blog-card')]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.IntersectionObserver) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('blog-card--revealed')
          observer.unobserve(target)
        }
      })
    }, { threshold: 0.08 })
    root.classList.add('blog-motion-enabled')
    cards.forEach(card => observer.observe(card))
    return () => {
      observer.disconnect()
      root.classList.remove('blog-motion-enabled')
    }
  }, [page, query, category])

  function changePage(nextPage) {
    const nextParams = new URLSearchParams(searchParams)
    if (nextPage === 1) nextParams.delete('page')
    else nextParams.set('page', String(nextPage))
    setSearchParams(nextParams)
    listingRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
    listingRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className="blog-page blog-index-page">
      <section className="blog-hero" aria-labelledby="blog-title">
        <img className="blog-hero-image" src={bannerImage} alt="" fetchPriority="high" />
        <div className="site-container blog-hero-content">
          <span className="section-label blog-eyebrow">The Vasupriy Journal</span>
          <h1 id="blog-title">Our <em>Blog.</em></h1>
          <p className="blog-hero-description">Ideas, inspiration and thoughtful advice for spaces that feel like you.</p>
        </div>
      </section>

      <section className="blog-listing section-space" aria-label="Interior design articles" tabIndex={-1} ref={listingRef}>
        <div className="site-container">
          <div className="blog-journal-heading">
            <div><span className="section-label">Inside the journal</span><h2>Design notes &amp; <em>inspiration.</em></h2></div>
          </div>
          <div className="blog-toolbar">
            <label className="blog-search"><span>Search the journal</span><input ref={searchRef} type="search" value={query} placeholder="Try lighting, materials, small homes…" onChange={event => changeFilter('q', event.target.value)} /></label>
            <label className="blog-category-filter"><span>Explore a topic</span><select value={category} onChange={event => changeFilter('category', event.target.value)}><option value="">All topics</option>{categories.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
          </div>
          <div className="blog-results-summary"><p role="status">{filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}{category ? ` in ${category}` : ' to inspire you'}</p>{(query || category) && <button type="button" onClick={resetFilters}>Clear filters ×</button>}</div>
          {posts.length === 0 && <div className="blog-empty"><h3>No stories found</h3><p>Try another keyword or explore all our topics.</p><button type="button" onClick={resetFilters}>Explore all articles →</button></div>}
          <div className="blog-grid" key={`${page}-${query}-${category}`}>
            {posts.map((post, index) => (
              <article className="blog-card" key={post.id} style={{ '--blog-delay': `${(index % 3) * 70}ms` }}>
                <Link className="blog-card-image-frame blog-card-image-link" to={`/blog/${post.id}`} aria-label={`Read ${post.title}`}>
                  <img src={post.image} alt={post.imageAlt} loading="lazy" decoding="async" width="720" height="540" />
                  <span className="blog-category">{post.category}</span>
                </Link>
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <time dateTime={post.date}>{dateFormatter.format(new Date(`${post.date}T00:00:00Z`))}</time>
                    <span className="blog-author">By <span>{post.author}</span></span>
                  </div>
                  <h2><Link to={`/blog/${post.id}`}>{post.title}</Link></h2>
                  <p className="blog-excerpt">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
          {pageCount > 1 && <nav className="blog-pagination" aria-label="Blog pagination">
            <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => changePage(page - 1)}>←</button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(number => (
              <button type="button" key={number} aria-label={`Page ${number}`} aria-current={page === number ? 'page' : undefined} onClick={() => changePage(number)}>{String(number).padStart(2, '0')}</button>
            ))}
            <button type="button" aria-label="Next page" disabled={page === pageCount} onClick={() => changePage(page + 1)}>→</button>
          </nav>}
          {pageCount > 1 && <p className="blog-page-status" role="status">Page {page} of {pageCount}</p>}
        </div>
      </section>
    </div>
  )
}

export default Blog
