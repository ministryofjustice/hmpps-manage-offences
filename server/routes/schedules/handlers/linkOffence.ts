import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'

export default class LinkOffenceRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, schedulePartId } = req.params
    const { offenceCode } = req.query as Record<string, string>
    const offences = offenceCode
      ? await this.offenceService.getOffencesNotLinked(offenceCode, scheduleId as unknown as number, res.locals.user)
      : undefined

    res.render('pages/schedules/linkOffences', { offences, offenceCode, schedulePartId, scheduleId })
  }

  POST = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, schedulePartId, offenceCodeSearch, offenceId } = req.body
    await this.offenceService.linkOffence(schedulePartId, offenceId, res.locals.user)
    const queryString = new URLSearchParams({ offenceCode: offenceCodeSearch }).toString()
    res.redirect(`/schedules/link-offences/${scheduleId}/${schedulePartId}?${queryString}`)
  }
}
