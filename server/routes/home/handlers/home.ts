import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'

export default class HomeRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const progressionModelExclusions = await this.offenceService.getProgressionModelExclusionLists(res.locals.user)
    const progressionModelExclusionsArePublished =
      progressionModelExclusions &&
      progressionModelExclusions.sentencingAct2026ProgressionModelExclusions &&
      progressionModelExclusions.sentencingAct2026ProgressionModelExclusions.length > 0
    res.render('pages/index', {
      progressionModelExclusionsArePublished,
    })
  }
}
