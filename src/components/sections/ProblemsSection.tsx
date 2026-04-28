import { getRevealStyle } from '../../utils/reveal'

type Problem = {
  title: string
  text: string
}

type Props = {
  items: Problem[]
}

export function ProblemsSection({ items }: Props) {
  return (
    <section className="section-block" aria-labelledby="problema-title">
      <div className="section-heading reveal" style={getRevealStyle(0)}>
        <p className="eyebrow">Problema</p>
        <h2 id="problema-title">
          La informacion existe, pero todavia cuesta aprovecharla.
        </h2>
      </div>
      <div className="card-grid three">
        {items.map((problem, index) => (
          <article
            className="info-card reveal"
            key={problem.title}
            style={getRevealStyle(index, 120)}
          >
            <h3>{problem.title}</h3>
            <p>{problem.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
