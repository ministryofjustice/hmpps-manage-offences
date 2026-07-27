import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import AdminService from '../../../services/adminService'

export default class ScheduleStatusRoutes {
  constructor(
    private readonly offenceService: OffenceService,
    private readonly adminService: AdminService,
  ) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const schedule = await this.offenceService.getScheduleById(Number(req.params.scheduleId), res.locals.user)
    res.render('pages/schedules/scheduleStatus', { schedule })
  }

  POST = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const status = req.body.status === 'LIVE' ? 'LIVE' : 'DRAFT'
    await this.adminService.setScheduleStatus(Number(scheduleId), status, res.locals.user)
    res.redirect(`/schedules/parts-and-offences/${scheduleId}`)
  }
}
