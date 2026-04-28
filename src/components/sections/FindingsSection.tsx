import { getRevealStyle } from '../../utils/reveal'

type Props = {
  items: string[]
}

export function FindingsSection({ items }: Props) {
  return (
    <section className="split-section" aria-labelledby="hallazgos-title">
      <div className="reveal" style={getRevealStyle(0)}>
        <p className="eyebrow">Hallazgos</p>
        <h2 id="hallazgos-title">
          El valor no esta solo en la cantidad, sino en la estructura y utilidad
          potencial.
        </h2>
      </div>
      <div className="finding-list">
        {items.map((finding, index) => (
          <p key={finding} className="reveal" style={getRevealStyle(index, 120)}>
            {finding}
          </p>
        ))}
      </div>
    </section>
  )
}
