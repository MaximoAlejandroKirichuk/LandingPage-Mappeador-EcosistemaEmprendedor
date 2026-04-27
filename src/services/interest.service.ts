import type { InterestFormData } from '../types/interest'

const googlesheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL?.replace(/\/$/, '');

export async function saveInterest(form: InterestFormData) {
  try {
    const response = await fetch(googlesheetsUrl, {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        source: 'landing-uai-emprendedores',
        createdAt: new Date().toISOString(),
      }),
    })

    const data = await response.json()

    if (data.status === 'ok') {
      return 'success' as const
    }

    throw new Error('Error en Apps Script')
  } catch (error) {
    console.error(error)
    throw error
  }
}