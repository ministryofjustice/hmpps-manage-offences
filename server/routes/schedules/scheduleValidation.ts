export type ScheduleDetailsForm = {
  act?: string
  code?: string
  url?: string
}

export type FormError = {
  text: string
  href: string
}

const LEGISLATION_URL = /^https:\/\/www\.legislation\.gov\.uk\//

export function validateScheduleDetails(form: ScheduleDetailsForm): FormError[] {
  const errors: FormError[] = []
  if (!form.act?.trim()) {
    errors.push({ text: 'Enter the act the schedule belongs to', href: '#act' })
  }
  if (!form.code?.trim()) {
    errors.push({ text: 'Enter the schedule code', href: '#code' })
  }
  if (form.url?.trim() && !LEGISLATION_URL.test(form.url.trim())) {
    errors.push({ text: 'Enter a legislation.gov.uk address, or leave the field blank', href: '#url' })
  }
  return errors
}
