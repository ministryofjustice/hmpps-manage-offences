import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'

export default class SearchRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const loadResults = await this.offenceService.getMostRecentLoadResult(res.locals.user)
    res.render('pages/loadResults/loadResults', { loadResults })
  }
}
