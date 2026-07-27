import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import { ScheduleDetailsForm, validateScheduleDetails } from '../scheduleValidation'

export default class CreateScheduleRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    res.render('pages/schedules/createSchedule', { errors: [], form: {} })
  }

  POST = async (req: Request, res: Response): Promise<void> => {
    const form = req.body as ScheduleDetailsForm
    const errors = validateScheduleDetails(form)
    if (errors.length) {
      return res.render('pages/schedules/createSchedule', { errors, form })
    }

    try {
      const created = await this.offenceService.createSchedule(
        {
          id: 0,
          act: form.act.trim(),
          code: form.code.trim(),
          url: form.url?.trim() || null,
          scheduleParts: [],
          status: 'DRAFT',
        },
        res.locals.user,
      )
      return res.redirect(`/schedules/parts-and-offences/${created.id}`)
    } catch (error) {
      if (error.status !== 409) throw error
      return res.render('pages/schedules/createSchedule', {
        errors: [{ text: 'A schedule with that act and code already exists', href: '#code' }],
        form,
      })
    }
  }
}
