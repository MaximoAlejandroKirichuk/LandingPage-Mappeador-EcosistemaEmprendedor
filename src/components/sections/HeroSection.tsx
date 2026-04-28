import { getRevealStyle } from '../../utils/reveal'

type Category = {
  label: string
  value: string
}

type HeroContent = {
  eyebrow: string
  title: string
  lede: string
  ctaLabel: string
  ctaHint: string
  support: string
  panel: {
    label: string
    value: string
    metrics: Array<{ value: string; label: string }>
  }
}

type Props = {
  content: HeroContent
  categories: Category[]
}

export function HeroSection({ content, categories }: Props) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-copy reveal" style={getRevealStyle(0)}>
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id="hero-title">{content.title}</h1>
        <p className="hero-lede">{content.lede}</p>
        <div className="hero-actions">
          <a className="primary-action" href="#validacion">
            {content.ctaLabel}
          </a>
          <span className="cta-hint">{content.ctaHint}</span>
        </div>
        <p className="support">{content.support}</p>
      </div>

      <div
        className="hero-panel reveal"
        style={getRevealStyle(1, 120)}
        aria-label="Resumen del relevamiento"
      >
        <div className="panel-header">
          <span>{content.panel.label}</span>
          <strong>{content.panel.value}</strong>
        </div>
        <div className="metric-grid">
          {content.panel.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
        <div className="category-bars">
          {categories.map((category, index) => (
            <div
              className="bar-row reveal"
              key={category.label}
              style={getRevealStyle(index, 120)}
            >
              <span>{category.label}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${Math.max(Number(category.value) * 9, 18)}%`,
                  }}
                />
              </div>
              <strong>{category.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
