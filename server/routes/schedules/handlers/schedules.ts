import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import { Schedule } from '../../../@types/manageOffences/manageOffencesClientTypes'

export default class ScheduleRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const allSchedules = await this.offenceService.getAllSchedules(res.locals.user)
    const schedules = allSchedules
      .map(s => {
        const { status } = s as Schedule & { status?: 'DRAFT' | 'LIVE' }
        return { ...s, fullName: `Schedule ${s.code} (${s.act})${status === 'DRAFT' ? ' [draft]' : ''}` }
      })
      .sort((a, b) => a.code.localeCompare(b.code))
    const { scheduleId } = req.query as Record<string, string>
    if (!scheduleId) {
      return res.render('pages/schedules/schedules', { schedules })
    }

    return res.redirect(`/schedules/parts-and-offences/${scheduleId}`)
  }
}
