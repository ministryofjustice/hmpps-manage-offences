import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'

export default class ScheduleRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const allSchedules = await this.offenceService.getAllSchedules(res.locals.user)
    const schedules = allSchedules
      .map(s => ({ ...s, fullName: `Schedule ${s.code} (${s.act})` }))
      .sort((a, b) => a.code.localeCompare(b.code))
    const { scheduleId } = req.query as Record<string, string>
    if (!scheduleId) {
      return res.render('pages/schedules/schedules', { schedules })
    }

    return res.redirect(`/schedules/parts-and-offences/${scheduleId}`)
  }
}
