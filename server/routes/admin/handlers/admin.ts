import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'

export default class SearchRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const admin = await this.offenceService.getMostRecentLoadResult(res.locals.user)
    res.render('pages/admin/admin', { admin })
  }

  SDRS_LOAD = async (req: Request, res: Response): Promise<void> => {
    await this.offenceService.triggerSdrsLoad(res.locals.user)
    res.redirect('/load-results')
  }

  SDRS_UPDATE = async (req: Request, res: Response): Promise<void> => {
    await this.offenceService.triggerSdrsUpdate(res.locals.user)
    res.redirect('/load-results')
  }
}
