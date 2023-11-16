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

  GET_PCSC_LISTS = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const pcscLists = await this.offenceService.getPcscLists(res.locals.user)

    res.render('pages/schedules/pcscLists', {
      pcscLists,
      scheduleId,
    })
  }
}
