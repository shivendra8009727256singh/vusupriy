import './WhyVasupriy.css'

const themes = [
  {
    number: '01',
    title: 'Design + Execution',
    description: 'Design direction and coordinated execution, bringing a space from concept toward implementation.',
  },
  {
    number: '02',
    title: 'Functional Planning',
    description: 'Clean lines, functional layouts and thoughtful consideration of natural light and materials. A balance of form and function.',
  },
  {
    number: '03',
    title: 'Customization',
    description: 'Design solutions and interior details shaped around your space, requirements and chosen direction.',
  },
]

export default function WhyVasupriy() {
  return (
    <section className="why-vasupriy section-space" id="why-vasupriy" aria-labelledby="why-vasupriy-title" data-scroll-section>
      <div className="site-container why-vasupriy-layout">
        <div className="why-vasupriy-heading">
          <span className="why-vasupriy-rule" data-reveal aria-hidden="true" />
          <div className="why-vasupriy-intro-content" data-reveal data-heading-reveal>
            <span className="section-label">Why Vasupriy</span>
            <h2 className="section-title" id="why-vasupriy-title">
              <span className="motion-title-mask"><span className="motion-title-line">Thoughtful by design.</span></span>{' '}
              <span className="motion-title-mask"><em className="motion-title-line">Considered in execution.</em></span>
            </h2>
            <p className="why-vasupriy-intro">A considered approach to spaces, where design direction, everyday function and personal requirements come together.</p>
          </div>
        </div>
        <ol className="why-vasupriy-themes">
          {themes.map((theme, index) => (
            <li className="why-vasupriy-row" key={theme.number} data-reveal style={{ '--why-row-delay': `${index === 0 ? 100 : 650 + index * 160}ms` }}>
              <span className="why-vasupriy-number" aria-hidden="true">{theme.number}</span>
              <div className="why-vasupriy-copy">
                <h3>{theme.title}</h3>
                <p>{theme.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
