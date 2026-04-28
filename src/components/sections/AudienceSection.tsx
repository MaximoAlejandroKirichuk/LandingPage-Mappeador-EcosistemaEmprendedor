import { getRevealStyle } from '../../utils/reveal'

type Props = {
  eyebrow: string
  title: string
  items: string[]
}

export function AudienceSection({ eyebrow, title, items }: Props) {
  return (
    <section className="section-block" aria-labelledby="audiencia-title">
      <div className="section-heading reveal" style={getRevealStyle(0)}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="audiencia-title">{title}</h2>
      </div>
      <div className="tag-list">
        {items.map((audience, index) => (
          <span key={audience} className="reveal" style={getRevealStyle(index, 120)}>
            {audience}
          </span>
        ))}
      </div>
    </section>
  )
}
