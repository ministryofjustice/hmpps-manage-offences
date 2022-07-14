import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'

export default class PartsAndOffencesRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const fullSchedule = await this.offenceService.getScheduleById(Number(scheduleId), res.locals.user)

    res.render('pages/schedules/partsAndOffences', {
      fullSchedule,
    })
  }

  POST = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, schedulePartId, offenceCodeSearch, offenceId } = req.body
    await this.offenceService.linkOffence(schedulePartId, offenceId, res.locals.user)
    const queryString = new URLSearchParams({ offenceCode: offenceCodeSearch }).toString()
    res.redirect(`/schedules/add-offences/${scheduleId}/${schedulePartId}?${queryString}`)
  }
}
