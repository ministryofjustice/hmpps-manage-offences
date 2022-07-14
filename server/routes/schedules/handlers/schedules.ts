import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'

export default class ScheduleRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const schedules = await this.offenceService.getAllSchedules(res.locals.user)
    const { scheduleId } = req.query as Record<string, string>
    if (!scheduleId) {
      return res.render('pages/schedules/schedules', { schedules })
    }

    const fullSchedule = await this.offenceService.getScheduleById(scheduleId as unknown as number, res.locals.user)
    return res.render('pages/schedules/schedules', { schedules, fullSchedule, scheduleId })
  }
}
