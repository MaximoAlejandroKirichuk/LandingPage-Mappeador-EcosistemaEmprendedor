import { getRevealStyle } from '../../utils/reveal'

type Props = {
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
}

export function ClosingSection({ eyebrow, title, description, ctaLabel }: Props) {
  return (
    <section
      className="closing-section reveal"
      style={getRevealStyle(0)}
      aria-labelledby="cierre-title"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 id="cierre-title">{title}</h2>
      <p>{description}</p>
      <a className="primary-action secondary-cta" href="#validacion">
        {ctaLabel}
      </a>
    </section>
  )
}
