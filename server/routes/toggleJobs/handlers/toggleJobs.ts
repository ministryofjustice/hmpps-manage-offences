import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import FeatureToggleEnum from '../../../enums/FeatureToggleEnum'

export default class ToggleJobsRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const featureToggles = await this.offenceService.getFeatureToggles(res.locals.user)
    res.render('pages/toggleJobs/toggleJobs', { featureToggles })
  }

  POST = async (req: Request, res: Response): Promise<void> => {
    await this.offenceService.toggleFeature(
      FeatureToggleEnum.FULL_SYNC_NOMIS,
      req.body[FeatureToggleEnum.FULL_SYNC_NOMIS],
      res.locals.user,
    )

    await this.offenceService.toggleFeature(
      FeatureToggleEnum.SYNC_SDRS,
      req.body[FeatureToggleEnum.SYNC_SDRS],
      res.locals.user,
    )

    await this.offenceService.toggleFeature(
      FeatureToggleEnum.DELTA_SYNC_NOMIS,
      req.body[FeatureToggleEnum.DELTA_SYNC_NOMIS],
      res.locals.user,
    )

    res.redirect('/toggle-jobs')
  }
}
