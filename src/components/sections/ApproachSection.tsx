import { getRevealStyle } from '../../utils/reveal'

type Props = {
  items: string[]
}

export function ApproachSection({ items }: Props) {
  return (
    <section className="split-section" aria-labelledby="enfoque-title">
      <div className="reveal" style={getRevealStyle(0)}>
        <p className="eyebrow">Enfoque de resolucion</p>
        <h2 id="enfoque-title">
          Relevar, ordenar, actualizar y convertir datos en decisiones.
        </h2>
        <p>
          El trabajo combina el relevamiento del ecosistema con la definicion de
          un producto digital que permita consultar, visualizar y capitalizar
          esa informacion como herramienta institucional.
        </p>
      </div>
      <ol className="step-list">
        {items.map((item, index) => (
          <li key={item} className="reveal" style={getRevealStyle(index, 140)}>
            {item}
          </li>
        ))}
      </ol>
    </section>
  )
}
