import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { saveInterest } from '../services/interest.service'
import type { InterestFormData, FormStatus } from '../types/interest'

const initialForm: InterestFormData = {
  name: '',
  email: '',
  organization: '',
  organizationType: '',
  interestType: '',
  priority: '',
}

type Props = {
  organizationTypes: string[]
  interestTypes: string[]
}

export function InterestForm({ organizationTypes, interestTypes }: Props) {
    const [form, setForm] = useState<InterestFormData>(initialForm)
    const [status, setStatus] = useState<FormStatus>('idle')

    const statusMessage = useMemo(() => {
    if (status === 'success') {
        return 'Gracias. Tu interés quedó registrado para contacto posterior.'
    }

    if (status === 'error') {
        return 'No pudimos guardar el contacto. Intentá nuevamente en unos segundos.'
    }

    return ''
    }, [status])

    const updateField = (field: keyof InterestFormData, value: string) => {
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

  
    return <form className="interest-form reveal" onSubmit={handleSubmit}>
        <div className="form-intro">
        <strong>Formulario breve de validación</strong>
        <p>
            Compartí tu interés y necesidad principal. Leemos cada envío y
            usamos esta información para definir el roadmap.
        </p>
        </div>
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
        {status === 'sending'
            ? 'Enviando...'
            : 'Quiero participar de la validación'}
        </button>
        {statusMessage && (
        <p className={`form-status ${status}`}>{statusMessage}</p>
        )}
    </form>
}