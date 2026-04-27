export type InterestFormData = {
  name: string
  email: string
  organization: string
  organizationType: string
  interestType: string
  priority: string
}

export type FormStatus = 'idle' | 'sending' | 'success' | 'error'