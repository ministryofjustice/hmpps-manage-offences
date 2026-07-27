import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import { FormError } from '../scheduleValidation'

export default class SchedulePartRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  private renderAddForm = async (
    req: Request,
    res: Response,
    form: { partNumber?: string },
    errors: FormError[],
  ): Promise<void> => {
    const schedule = await this.offenceService.getScheduleById(Number(req.params.scheduleId), res.locals.user)
    res.render('pages/schedules/addSchedulePart', { schedule, form, errors })
  }

  GET_ADD = async (req: Request, res: Response): Promise<void> => {
    const schedule = await this.offenceService.getScheduleById(Number(req.params.scheduleId), res.locals.user)
    const highest = (schedule.scheduleParts ?? []).reduce((max, p) => Math.max(max, p.partNumber), 0)
    res.render('pages/schedules/addSchedulePart', {
      schedule,
      form: { partNumber: String(highest + 1) },
      errors: [],
    })
  }

  POST_ADD = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const form = req.body as { partNumber?: string }
    const partNumber = Number(form.partNumber)
    if (!Number.isInteger(partNumber) || partNumber < 1 || partNumber > 99) {
      return this.renderAddForm(req, res, form, [{ text: 'Enter a part number between 1 and 99', href: '#partNumber' }])
    }

    try {
      await this.offenceService.addSchedulePart(Number(scheduleId), partNumber, res.locals.user)
    } catch (error) {
      if (error.status !== 409) throw error
      return this.renderAddForm(req, res, form, [
        { text: `This schedule already has a part ${partNumber}`, href: '#partNumber' },
      ])
    }
    return res.redirect(`/schedules/parts-and-offences/${scheduleId}`)
  }

  POST_DELETE = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, schedulePartId } = req.params
    await this.offenceService.deleteSchedulePart(Number(schedulePartId), res.locals.user)
    res.redirect(`/schedules/parts-and-offences/${scheduleId}`)
  }
}
