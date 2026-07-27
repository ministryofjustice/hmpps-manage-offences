import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import { ScheduleDetailsForm, validateScheduleDetails } from '../scheduleValidation'

export default class EditScheduleRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const schedule = await this.offenceService.getScheduleById(Number(req.params.scheduleId), res.locals.user)
    res.render('pages/schedules/editSchedule', {
      schedule,
      form: { act: schedule.act, code: schedule.code, url: schedule.url },
      errors: [],
    })
  }

  POST = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const schedule = await this.offenceService.getScheduleById(Number(scheduleId), res.locals.user)
    const submitted = req.body as ScheduleDetailsForm

    const form: ScheduleDetailsForm =
      schedule.status === 'DRAFT' ? submitted : { act: schedule.act, code: schedule.code, url: submitted.url }

    const errors = validateScheduleDetails(form)
    if (errors.length) {
      return res.render('pages/schedules/editSchedule', { schedule, form, errors })
    }

    try {
      await this.offenceService.updateSchedule(
        Number(scheduleId),
        { act: form.act.trim(), code: form.code.trim(), url: form.url?.trim() || null },
        res.locals.user,
      )
    } catch (error) {
      if (error.status !== 409) throw error
      return res.render('pages/schedules/editSchedule', {
        schedule,
        form,
        errors: [{ text: 'A schedule with that act and code already exists', href: '#code' }],
      })
    }
    return res.redirect(`/schedules/parts-and-offences/${scheduleId}`)
  }
}
