import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'

export default class SearchRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const { offenceCode } = req.query as Record<string, string>
    const offences = offenceCode ? await this.offenceService.searchOffences(offenceCode, res.locals.user) : undefined
    res.render('pages/search/search', { offences, offenceCode })
  }

  VIEW_OFFENCE = async (req: Request, res: Response): Promise<void> => {
    const { offenceId } = req.params
    const { offenceCodeSearch } = req.query as Record<string, string>
    const offence = await this.offenceService.getOffenceById(offenceId as unknown as number, res.locals.user)
    const childOffences =
      !offence.isChild && (await this.offenceService.getOffencesByIds(offence.childOffenceIds, res.locals.user))
    const parentOffence =
      offence.isChild && (await this.offenceService.getOffenceById(offence.parentOffenceId, res.locals.user))
    res.render('pages/search/viewOffence', { offence, offenceCodeSearch, childOffences, parentOffence })
  }
}
