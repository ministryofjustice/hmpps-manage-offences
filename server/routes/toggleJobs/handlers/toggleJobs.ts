import { Request, Response } from 'express'
import FeatureToggleEnum from '../../../enums/FeatureToggleEnum'
import { FeatureToggle } from '../../../@types/manageOffences/manageOffencesClientTypes'
import AdminService from '../../../services/adminService'

export default class ToggleJobsRoutes {
  constructor(private readonly adminService: AdminService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const featureToggles = await this.adminService.getFeatureToggles(res.locals.user)
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
      {
        feature: FeatureToggleEnum.SYNC_HOME_OFFICE_CODES,
        enabled: req.body[FeatureToggleEnum.SYNC_HOME_OFFICE_CODES],
      },
      {
        feature: FeatureToggleEnum.PUBLISH_EVENTS,
        enabled: req.body[FeatureToggleEnum.PUBLISH_EVENTS],
      },
      {
        feature: FeatureToggleEnum.UNLINK_SCHEDULES_NOMIS,
        enabled: req.body[FeatureToggleEnum.UNLINK_SCHEDULES_NOMIS],
      },
      {
        feature: FeatureToggleEnum.LINK_SCHEDULES_NOMIS,
        enabled: req.body[FeatureToggleEnum.LINK_SCHEDULES_NOMIS],
      },
    ]

    await this.adminService.toggleFeatures(featureToggles, res.locals.user)

    res.redirect('/toggle-jobs')
  }
}
