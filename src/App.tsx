import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type InterestForm = {
  name: string
  email: string
  organization: string
  organizationType: string
  interestType: string
  priority: string
}

type FormStatus = 'idle' | 'sending' | 'saved' | 'local' | 'error'

const initialForm: InterestForm = {
  name: '',
  email: '',
  organization: '',
  organizationType: '',
  interestType: '',
  priority: '',
}

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

const databaseUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL?.replace(/\/$/, '')
const firebasePath = import.meta.env.VITE_FIREBASE_INTERESTS_PATH ?? 'landingInterests'

async function saveInterest(form: InterestForm) {
  if (!databaseUrl) {
    return 'local' as const
  }

  const response = await fetch(`${databaseUrl}/${firebasePath}.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...form,
      source: 'landing-validacion-uai',
      createdAt: new Date().toISOString(),
    }),
  })

  if (!response.ok) {
    throw new Error('No se pudo guardar el contacto.')
  }

  return 'saved' as const
}

function App() {
  const [form, setForm] = useState<InterestForm>(initialForm)
  const [status, setStatus] = useState<FormStatus>('idle')

  const statusMessage = useMemo(() => {
    if (status === 'saved') {
      return 'Gracias. Tu interés quedó registrado para contacto posterior.'
    }

    if (status === 'local') {
      return 'Gracias. El formulario quedó validado en esta demo; para guardar contactos reales falta configurar Firebase.'
    }

    if (status === 'error') {
      return 'No pudimos guardar el contacto en este momento. Revisaremos la configuración de Firebase.'
    }

    return ''
  }, [status])

  const updateField = (field: keyof InterestForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (status !== 'idle' && status !== 'sending') {
      setStatus('idle')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')

    try {
      const result = await saveInterest(form)
      setStatus(result)
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
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
              Participar en la validación
            </a>
            <span>Proyecto en etapa de validación temprana.</span>
          </div>
          <p className="support">
            Corte de avance: 24 de abril de 2026. La plataforma se encuentra en
            definición funcional y no se presenta como producto finalizado.
          </p>
        </div>

        <div className="hero-panel" aria-label="Resumen del relevamiento">
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
            {categories.map((category) => (
              <div className="bar-row" key={category.label}>
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
        <div className="section-heading">
          <p className="eyebrow">Problema</p>
          <h2 id="problema-title">
            La información existe, pero todavía cuesta aprovecharla.
          </h2>
        </div>
        <div className="card-grid three">
          {problems.map((problem) => (
            <article className="info-card" key={problem.title}>
              <h3>{problem.title}</h3>
              <p>{problem.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section" aria-labelledby="enfoque-title">
        <div>
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
          {approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="section-block muted" aria-labelledby="estado-title">
        <div className="section-heading">
          <p className="eyebrow">Estado actual</p>
          <h2 id="estado-title">
            Una base que ya funciona como insumo para análisis y futura
            visualización.
          </h2>
        </div>
        <div className="proof-row">
          <div>
            <strong>27</strong>
            <span>registros consolidados</span>
          </div>
          <div>
            <strong>5</strong>
            <span>categorías iniciales</span>
          </div>
          <div>
            <strong>Base</strong>
            <span>con atributos para comparar</span>
          </div>
          <div>
            <strong>MVP</strong>
            <span>en dirección funcional</span>
          </div>
        </div>
      </section>

      <section className="split-section" aria-labelledby="hallazgos-title">
        <div>
          <p className="eyebrow">Hallazgos</p>
          <h2 id="hallazgos-title">
            El valor no está solo en la cantidad, sino en la estructura y
            utilidad potencial.
          </h2>
        </div>
        <div className="finding-list">
          {findings.map((finding) => (
            <p key={finding}>{finding}</p>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="audiencia-title">
        <div className="section-heading">
          <p className="eyebrow">Para quién</p>
          <h2 id="audiencia-title">
            Pensado para organizaciones que necesitan articular con mejor
            información.
          </h2>
        </div>
        <div className="tag-list">
          {audiences.map((audience) => (
            <span key={audience}>{audience}</span>
          ))}
        </div>
      </section>

      <section
        className="validation-section"
        id="validacion"
        aria-labelledby="validacion-title"
      >
        <div className="form-copy">
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
        </div>

        <form className="interest-form" onSubmit={handleSubmit}>
          <label>
            Nombre y apellido
            <input
              required
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              type="text"
              name="name"
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              required
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              type="email"
              name="email"
              autoComplete="email"
            />
          </label>
          <label>
            Organización
            <input
              required
              value={form.organization}
              onChange={(event) =>
                updateField('organization', event.target.value)
              }
              type="text"
              name="organization"
              autoComplete="organization"
            />
          </label>
          <label>
            Tipo de organización
            <select
              required
              value={form.organizationType}
              onChange={(event) =>
                updateField('organizationType', event.target.value)
              }
              name="organizationType"
            >
              <option value="">Seleccionar</option>
              {organizationTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tipo de interés
            <select
              required
              value={form.interestType}
              onChange={(event) =>
                updateField('interestType', event.target.value)
              }
              name="interestType"
            >
              <option value="">Seleccionar</option>
              {interestTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="full-width">
            ¿Qué información o necesidad te gustaría priorizar?
            <textarea
              required
              value={form.priority}
              onChange={(event) => updateField('priority', event.target.value)}
              name="priority"
              rows={4}
            />
          </label>
          <button
            className="primary-action form-button"
            type="submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar interés'}
          </button>
          {statusMessage && (
            <p className={`form-status ${status}`}>{statusMessage}</p>
          )}
        </form>
      </section>

      <section className="closing-section" aria-labelledby="cierre-title">
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
      </section>
    </main>
  )
}

export default App
