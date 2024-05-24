import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import AdminService from '../../../services/adminService'
import FeatureToggleType from '../../../types/featureToggleType'

export default class PartsAndOffencesRoutes {
  constructor(
    private readonly offenceService: OffenceService,
    private readonly adminService: AdminService,
  ) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const fullSchedule = await this.offenceService.getScheduleById(Number(scheduleId), res.locals.user)

    res.render('pages/schedules/partsAndOffences', {
      fullSchedule,
    })
  }

  GET_PCSC_LISTS = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.query as Record<string, string>
    const pcscLists = await this.offenceService.getPcscLists(res.locals.user)

    res.render('pages/schedules/pcscLists', {
      pcscLists,
      scheduleId,
    })
  }

  GET_SEXUAL_AND_VIOLENT_LISTS = async (req: Request, res: Response): Promise<void> => {
    const sexualOrViolentLists = await this.offenceService.getSexualOrViolentLists(res.locals.user)
    const sexualFromCodesAndS15P2 = (await this.adminService.getFeatureToggles(res.locals.user)).find(
      i => i.feature === FeatureToggleType.SEXUAL_OFFENCES_FROM_CODES_AND_S15P2.featureName,
    ).enabled
    const sexualFromS3AndS15P2 = !sexualFromCodesAndS15P2
    res.render('pages/schedules/sexualOrViolentLists', {
      sexualOrViolentLists,
      sexualFromCodesAndS15P2,
      sexualFromS3AndS15P2,
    })
  }
}
