import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import './App.css'
import { InterestForm } from './components/InterestForm'


const problems = [
  {
    title: 'Información fragmentada',
    text: 'Actores, programas, convocatorias y espacios aparecen en fuentes distintas, con formatos y niveles de actualización muy variables.',
  },
  {
    title: 'Dificultad para comparar',
    text: 'Sin una estructura común, cuesta detectar oportunidades relevantes, entender diferencias entre actores y priorizar vínculos institucionales.',
  },
  {
    title: 'Trabajo manual repetido',
    text: 'Cada nueva consulta obliga a reconstruir parte del mapa del ecosistema antes de convertir la información en decisiones útiles.',
  },
]

const approach = [
  'Estructurar la información en una base ordenada por categoría, foco, programas, contacto, etapa y otros atributos relevantes.',
  'Diseñar una futura plataforma con consulta, visualización, filtros y seguimiento de oportunidades.',
  'Avanzar hacia automatizaciones con IA para búsqueda, scraping, clasificación, actualización de registros y generación de reportes.',
]

const categories = [
  { label: 'Universidades', value: '7' },
  { label: 'Crowdfunding', value: '10' },
  { label: 'Organismos públicos / gobierno', value: '4' },
  { label: 'Capital ventures / aceleración', value: '3' },
  { label: 'Plataformas del ecosistema', value: '3' },
]

const findings = [
  'Crowdfunding es hoy la categoría más desarrollada en cantidad, con datos comparables sobre modelos, comisiones y facilidad de uso.',
  'Universidades conserva un valor estratégico alto para posicionar a UAI dentro de redes, programas, incubadoras y hubs.',
  'Organismos públicos aportan información valiosa para seguimiento institucional, beneficiarios, programas y convocatorias.',
  'Capital ventures permite identificar foco sectorial, etapa de inversión y montos orientativos para futuras alianzas o derivaciones.',
]

const audiences = [
  'Organizaciones externas interesadas en articulación',
  'Universidades y áreas de extensión',
  'Programas de innovación',
  'Organismos públicos',
  'Actores de inversión, aceleración y ecosistema emprendedor',
]

const organizationTypes = [
  'Universidad / área de extensión',
  'Programa de innovación',
  'Organismo público',
  'Aceleradora / incubadora',
  'Actor de inversión',
  'Otra organización del ecosistema',
]

const interestTypes = [
  'Explorar articulación institucional',
  'Participar como usuario temprano',
  'Aportar información o fuentes',
  'Recibir novedades del proyecto',
]

function App() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'))

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const revealStyle = (index: number, baseDelay = 0): CSSProperties => ({
    '--delay': `${baseDelay + index * 90}ms`,
  })

  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy reveal" style={revealStyle(0)}>
          <p className="eyebrow">Mapeo del Ecosistema Emprendedor UAI</p>
          <h1 id="hero-title">
            Ordenar el ecosistema emprendedor para convertir información
            dispersa en valor institucional.
          </h1>
          <p className="hero-lede">
            Desde UAI estamos consolidando una base estructurada de actores,
            programas, oportunidades y fuentes del ecosistema emprendedor
            argentino para facilitar análisis, seguimiento y articulación con
            organizaciones externas.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#validacion">
              Completar formulario de validación
            </a>
            <span className="cta-hint">
              Te toma menos de 2 minutos y nos ayuda a priorizar qué construir
              primero.
            </span>
          </div>
          <p className="support">
            Corte de avance: 24 de abril de 2026. La plataforma se encuentra en
            definición funcional y no se presenta como producto finalizado.
          </p>
        </div>

        <div
          className="hero-panel reveal"
          style={revealStyle(1, 120)}
          aria-label="Resumen del relevamiento"
        >
          <div className="panel-header">
            <span>Base estructurada</span>
            <strong>27 registros</strong>
          </div>
          <div className="metric-grid">
            <div>
              <strong>5</strong>
              <span>categorías iniciales</span>
            </div>
            <div>
              <strong>IA</strong>
              <span>automatización prevista</span>
            </div>
          </div>
          <div className="category-bars">
            {categories.map((category, index) => (
              <div
                className="bar-row reveal"
                key={category.label}
                style={revealStyle(index, 120)}
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

      <section className="section-block" aria-labelledby="problema-title">
        <div className="section-heading reveal" style={revealStyle(0)}>
          <p className="eyebrow">Problema</p>
          <h2 id="problema-title">
            La información existe, pero todavía cuesta aprovecharla.
          </h2>
        </div>
        <div className="card-grid three">
          {problems.map((problem, index) => (
            <article
              className="info-card reveal"
              key={problem.title}
              style={revealStyle(index, 120)}
            >
              <h3>{problem.title}</h3>
              <p>{problem.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section" aria-labelledby="enfoque-title">
        <div className="reveal" style={revealStyle(0)}>
          <p className="eyebrow">Enfoque de resolución</p>
          <h2 id="enfoque-title">
            Relevar, ordenar, actualizar y convertir datos en decisiones.
          </h2>
          <p>
            El trabajo combina el relevamiento del ecosistema con la definición
            de un producto digital que permita consultar, visualizar y
            capitalizar esa información como herramienta institucional.
          </p>
        </div>
        <ol className="step-list">
          {approach.map((item, index) => (
            <li key={item} className="reveal" style={revealStyle(index, 140)}>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="section-block muted" aria-labelledby="estado-title">
        <p className="eyebrow reveal" style={revealStyle(0)}>Estado actual</p>
        <div className="section-heading reveal" style={revealStyle(1, 120)}>
          <h2 id="estado-title">
            Una base que ya funciona como insumo para análisis y futura
            visualización.
          </h2>
        </div>
        <div className="proof-row">
          <div className="reveal" style={revealStyle(0, 160)}>
            <strong>27</strong>
            <span>registros consolidados</span>
          </div>
          <div className="reveal" style={revealStyle(1, 160)}>
            <strong>5</strong>
            <span>categorías iniciales</span>
          </div>
          <div className="reveal" style={revealStyle(2, 160)}>
            <strong>Base</strong>
            <span>con atributos para comparar</span>
          </div>
          <div className="reveal" style={revealStyle(3, 160)}>
            <strong>MVP</strong>
            <span>en dirección funcional</span>
          </div>
        </div>
      </section>

      <section className="split-section" aria-labelledby="hallazgos-title">
        <div className="reveal" style={revealStyle(0)}>
          <p className="eyebrow">Hallazgos</p>
          <h2 id="hallazgos-title">
            El valor no está solo en la cantidad, sino en la estructura y
            utilidad potencial.
          </h2>
        </div>
        <div className="finding-list">
          {findings.map((finding, index) => (
            <p key={finding} className="reveal" style={revealStyle(index, 120)}>
              {finding}
            </p>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="audiencia-title">
        <div className="section-heading reveal" style={revealStyle(0)}>
          <p className="eyebrow">Para quién</p>
          <h2 id="audiencia-title">
            Pensado para organizaciones que necesitan articular con mejor
            información.
          </h2>
        </div>
        <div className="tag-list">
          {audiences.map((audience, index) => (
            <span
              key={audience}
              className="reveal"
              style={revealStyle(index, 120)}
            >
              {audience}
            </span>
          ))}
        </div>
      </section>

      <section
        className="validation-section"
        id="validacion"
        aria-labelledby="validacion-title"
      >
        <div className="form-copy reveal" style={revealStyle(0)}>
          <p className="eyebrow">Validación externa</p>
          <h2 id="validacion-title">
            Queremos conocer qué información sería más relevante para
            potenciales aliados.
          </h2>
          <p>
            Esta landing busca recoger señales concretas de interés y feedback
            sobre necesidades específicas que una plataforma de estas
            características debería cubrir.
          </p>
          <ul className="validation-points" aria-label="Razones para participar">
            <li>Tu respuesta impacta en el alcance del primer MVP.</li>
            <li>Priorizamos funcionalidades según señales reales de demanda.</li>
            <li>Contactamos solo para avances relevantes del proyecto.</li>
          </ul>
        </div>

        {/*Formulario separado*/}
        <InterestForm
          organizationTypes={organizationTypes}
          interestTypes={interestTypes}
        />
      </section>

      <section className="closing-section reveal" aria-labelledby="cierre-title">
        <p className="eyebrow">Próximo paso</p>
        <h2 id="cierre-title">
          Validar interés real antes de avanzar con más desarrollo.
        </h2>
        <p>
          Si este problema también es relevante para tu organización, nos
          interesa conversar y entender qué datos, vistas o reportes podrían
          convertir el relevamiento en una herramienta más útil para UAI y sus
          potenciales aliados.
        </p>
        <a className="primary-action secondary-cta" href="#validacion">
          Completar formulario ahora
        </a>
      </section>
    </main>
  )
}

export default App
