import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import AdminService from '../../../services/adminService'

export default class ManageSchedulesRoutes {
  constructor(
    private readonly offenceService: OffenceService,
    private readonly adminService: AdminService,
  ) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const schedules = (await this.offenceService.getAllSchedules(res.locals.user))
      .map(s => ({ ...s, fullName: `Schedule ${s.code} (${s.act})` }))
      .sort((a, b) => a.code.localeCompare(b.code))
    res.render('pages/schedules/manageSchedules', { schedules })
  }

  POST_STATUS = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const status = req.body.status === 'LIVE' ? 'LIVE' : 'DRAFT'
    await this.adminService.setScheduleStatus(Number(scheduleId), status, res.locals.user)
    res.redirect('/schedules/manage')
  }
}
