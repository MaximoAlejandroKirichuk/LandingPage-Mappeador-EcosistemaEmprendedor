import { getRevealStyle } from '../../utils/reveal'

type Stat = {
  value: string
  label: string
}

type Props = {
  eyebrow: string
  title: string
  stats: Stat[]
}

export function StateSection({ eyebrow, title, stats }: Props) {
  return (
    <section className="section-block muted" aria-labelledby="estado-title">
      <p className="eyebrow reveal" style={getRevealStyle(0)}>
        {eyebrow}
      </p>
      <div className="section-heading reveal" style={getRevealStyle(1, 120)}>
        <h2 id="estado-title">{title}</h2>
      </div>
      <div className="proof-row">
        {stats.map((stat, index) => (
          <div key={stat.label} className="reveal" style={getRevealStyle(index, 160)}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
