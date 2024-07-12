import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import AdminService from '../../../services/adminService'

export default class PartsAndOffencesRoutes {
  constructor(
    private readonly offenceService: OffenceService,
    private readonly adminService: AdminService,
  ) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const fullSchedule = await this.offenceService.getScheduleById(Number(scheduleId), res.locals.user)

    res.render('pages/schedules/partsAndOffences', {
      fullSchedule,
    })
  }

  GET_PCSC_LISTS = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.query as Record<string, string>
    const pcscLists = await this.offenceService.getPcscLists(res.locals.user)

    res.render('pages/schedules/pcscLists', {
      pcscLists,
      scheduleId,
    })
  }

  GET_SEXUAL_AND_VIOLENT_LISTS = async (req: Request, res: Response): Promise<void> => {
    const sexualOrViolentLists = await this.offenceService.getSexualOrViolentLists(res.locals.user)

    res.render('pages/schedules/sexualOrViolentLists', {
      sexualOrViolentLists,
    })
  }
}
