import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'

export type CreateScheduleForm = {
  act?: string
  code?: string
  url?: string
  partCount?: string
}

export type FormError = {
  text: string
  href: string
}

const LEGISLATION_URL = /^https:\/\/www\.legislation\.gov\.uk\//

export function validateCreateSchedule(form: CreateScheduleForm): FormError[] {
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
  const partCount = Number(form.partCount)
  if (!Number.isInteger(partCount) || partCount < 1 || partCount > 20) {
    errors.push({ text: 'Enter the number of parts, between 1 and 20', href: '#partCount' })
  }
  return errors
}

export default class CreateScheduleRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    res.render('pages/schedules/createSchedule', {
      errors: req.flash('errors'),
      form: req.flash('form')[0] ?? {},
    })
  }

  POST = async (req: Request, res: Response): Promise<void> => {
    const form = req.body as CreateScheduleForm
    const errors = validateCreateSchedule(form)
    if (errors.length) {
      req.flash('errors', errors)
      req.flash('form', form)
      return res.redirect('/schedules/create')
    }

    try {
      const created = await this.offenceService.createSchedule(
        {
          id: 0,
          act: form.act.trim(),
          code: form.code.trim(),
          url: form.url?.trim() || null,
          scheduleParts: Array.from({ length: Number(form.partCount) }, (_, i) => ({ id: 0, partNumber: i + 1 })),
        },
        res.locals.user,
      )
      return res.redirect(`/schedules/parts-and-offences/${created.id}`)
    } catch (error) {
      if (error.status !== 409) throw error
      req.flash('errors', [{ text: 'A schedule with that act and code already exists', href: '#code' }])
      req.flash('form', form)
      return res.redirect('/schedules/create')
    }
  }
}
