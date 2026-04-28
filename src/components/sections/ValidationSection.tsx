import { InterestForm } from '../InterestForm'
import { getRevealStyle } from '../../utils/reveal'

type Props = {
  content: {
    eyebrow: string
    title: string
    description: string
    points: string[]
  }
  organizationTypes: string[]
  interestTypes: string[]
}

export function ValidationSection({
  content,
  organizationTypes,
  interestTypes,
}: Props) {
  return (
    <section
      className="validation-section"
      id="validacion"
      aria-labelledby="validacion-title"
    >
      <div className="form-copy reveal" style={getRevealStyle(0)}>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="validacion-title">{content.title}</h2>
        <p>{content.description}</p>
        <ul className="validation-points" aria-label="Razones para participar">
          {content.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <InterestForm
        className="reveal"
        style={getRevealStyle(1, 140)}
        organizationTypes={organizationTypes}
        interestTypes={interestTypes}
      />
    </section>
  )
}
