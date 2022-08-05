import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import FeatureToggleEnum from '../../../enums/FeatureToggleEnum'
import { FeatureToggle } from '../../../@types/manageOffences/manageOffencesClientTypes'

export default class ToggleJobsRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const featureToggles = await this.offenceService.getFeatureToggles(res.locals.user)
    res.render('pages/toggleJobs/toggleJobs', { featureToggles })
  }

  POST = async (req: Request, res: Response): Promise<void> => {
    const featureToggles: FeatureToggle[] = [
      {
        feature: FeatureToggleEnum.FULL_SYNC_NOMIS,
        enabled: req.body[FeatureToggleEnum.FULL_SYNC_NOMIS],
      },
      {
        feature: FeatureToggleEnum.FULL_SYNC_SDRS,
        enabled: req.body[FeatureToggleEnum.FULL_SYNC_SDRS],
      },
      {
        feature: FeatureToggleEnum.DELTA_SYNC_SDRS,
        enabled: req.body[FeatureToggleEnum.DELTA_SYNC_SDRS],
      },
      {
        feature: FeatureToggleEnum.DELTA_SYNC_NOMIS,
        enabled: req.body[FeatureToggleEnum.DELTA_SYNC_NOMIS],
      },
    ]

    await this.offenceService.toggleFeatures(featureToggles, res.locals.user)

    res.redirect('/toggle-jobs')
  }
}
