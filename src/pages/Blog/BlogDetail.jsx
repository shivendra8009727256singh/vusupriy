import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { blogPosts, getBlogPost, blogArticleDefaults } from '../../data/blogPosts.js'
import bannerImage from '../../assets/images/home/interior-showcase.png'
import './Blog.css'
import './BlogDetail.css'

const formatDate = date => new Intl.DateTimeFormat('en-IN', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`))

export default function BlogDetail() {
  const { slug } = useParams()
  const post = getBlogPost(slug)
  const details = { ...blogArticleDefaults, ...post?.details }
  const recentPosts = blogPosts.filter(item => item.id !== slug).slice(0, 4)
  const articleIndex = blogPosts.findIndex(item => item.id === slug)
  const previousPost = blogPosts[articleIndex - 1]
  const nextPost = blogPosts[articleIndex + 1]

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${post?.title ?? 'Article not found'} | Vasupriy Interiovilla`
    return () => { document.title = previousTitle }
  }, [post])

  return (
    <div className="blog-page blog-detail-page">
      <section className="blog-hero" aria-labelledby="blog-detail-banner-title">
        <img className="blog-hero-image" src={post?.image ?? bannerImage} alt={post?.imageAlt ?? ''} fetchPriority="high" />
        <div className="site-container blog-hero-content">
          <span className="section-label blog-eyebrow">The Vasupriy Journal</span>
          <h1 id="blog-detail-banner-title">Blog <em>Details.</em></h1>
          {post && <p className="blog-hero-description">{post.title}</p>}
        </div>
      </section>

      {!post ? (
        <section className="site-container section-space blog-detail-missing">
          <h2>Article not found</h2>
          <p>This article is unavailable. Explore more ideas in our journal.</p>
          <Link className="blog-detail-back" to="/blog">← Back to the Blog</Link>
        </section>
      ) : (
        <div className="site-container section-space blog-detail-layout">
          <article className="blog-detail-article" aria-labelledby="blog-article-title">
            <header className="blog-detail-article-heading">
              <div className="blog-meta">
                <span className="blog-detail-category">{post.category}</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="blog-author">By <span>{post.author}</span></span>
              </div>
              <h2 id="blog-article-title">{post.title}</h2>
            </header>
            <img className="blog-detail-featured" src={post.image} alt={post.imageAlt} width="960" height="720" />
            <div className="blog-detail-copy">
              <p className="blog-detail-introduction">{post.excerpt}</p>
              {post.body.map((paragraph, index) => (
                <section key={paragraph} id={`article-section-${index}`} className="blog-detail-section">
                  <h3>{details.sectionHeadings[index] ?? 'A considered approach'}</h3>
                  <p>{paragraph}</p>
                  {index === 0 && (
                    <figure className="blog-detail-image-pair">
                      {details.images.map(item => <img key={item.src} src={item.src} alt={item.alt} loading="lazy" decoding="async" width="640" height="480" />)}
                      <figcaption>Interior inspiration: thoughtful spaces and refined details.</figcaption>
                    </figure>
                  )}
                </section>
              ))}
              <blockquote className="blog-detail-quote">
                <span className="blog-detail-quote-mark" aria-hidden="true">“</span>
                <p>{details.quote}</p>
                <footer>{post.author}</footer>
              </blockquote>
              <section id="article-conclusion" className="blog-detail-section">
                <h3>{details.conclusionHeading}</h3>
                <p>{details.conclusion}</p>
              </section>
            </div>
            <div className="blog-detail-tags" aria-label="Article topics">
              <span>Topics</span>
              {(post.tags ?? [post.category, 'Interior Design', 'Vasupriy Journal']).map(tag => <span className="blog-detail-tag" key={tag}>{tag}</span>)}
            </div>
            <Link className="blog-detail-back" to="/blog">← Back to the Blog</Link>
            <nav className="blog-detail-neighbours" aria-label="More journal articles">
              {previousPost && <Link to={`/blog/${previousPost.id}`}><span>← Previous article</span><strong>{previousPost.title}</strong></Link>}
              {nextPost && <Link to={`/blog/${nextPost.id}`}><span>Next article →</span><strong>{nextPost.title}</strong></Link>}
            </nav>
          </article>

          <aside className="blog-detail-sidebar" aria-labelledby="blog-recent-title">
            <nav className="blog-detail-contents" aria-label="Article contents"><span className="section-label">In this article</span>{post.body.map((_, index) => <a key={index} href={`#article-section-${index}`}><span>{String(index + 1).padStart(2, '0')}</span>{details.sectionHeadings[index] ?? 'A considered approach'}</a>)}<a href="#article-conclusion"><span>{String(post.body.length + 1).padStart(2, '0')}</span>{details.conclusionHeading}</a></nav>
            <span className="section-label">More inspiration</span>
            <h2 id="blog-recent-title">Recent <em>Articles.</em></h2>
            <div className="blog-detail-recent-list">
              {recentPosts.map(item => (
                <Link className="blog-detail-recent" to={`/blog/${item.id}`} key={item.id}>
                  <img src={item.image} alt="" loading="lazy" decoding="async" width="100" height="100" />
                  <div><time dateTime={item.date}>{formatDate(item.date)}</time><h3>{item.title}</h3></div>
                </Link>
              ))}
            </div>
            <div className="blog-detail-consultation">
              <span className="section-label">Your next chapter</span>
              <h3>Ideas for your <em>own space?</em></h3>
              <p>Let's turn your inspiration into an interior that feels like you.</p>
              <Link className="blog-read-link" to="/contact"><span>Start a conversation</span><span className="blog-read-arrow" aria-hidden="true">↗</span></Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
