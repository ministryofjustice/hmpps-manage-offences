import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'

export default class SearchRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const { offenceCode } = req.query as Record<string, string>
    const offences = offenceCode ? await this.offenceService.getOffencesByCode(offenceCode, res.locals.user) : undefined
    res.render('pages/search/search', { offences, offenceCode })
  }
}
