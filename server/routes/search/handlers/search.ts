import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import AdminService from '../../../services/adminService'

export default class SearchRoutes {
  constructor(
    private readonly offenceService: OffenceService,
    private readonly adminService: AdminService,
  ) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const { offenceCode } = req.query as Record<string, string>
    const offences = offenceCode ? await this.offenceService.searchOffences(offenceCode, res.locals.user) : undefined
    res.render('pages/search/search', { offences, offenceCode })
  }

  VIEW_OFFENCE = async (req: Request, res: Response): Promise<void> => {
    const { offenceId } = req.params
    const { offenceCodeSearch } = req.query as Record<string, string>
    const encouragementOffenceConfirmation = req.query.encouragementOffenceConfirmation === 'true'
    const offence = await this.offenceService.getOffenceById(offenceId as unknown as number, res.locals.user)

    const nomisActivationFlags = await this.adminService.getNomisActivationFlags(
      offence.code,
      offence,
      res.locals.user,
      res.locals.user.roles,
    )

    const childOffences =
      !offence.isChild && (await this.offenceService.getOffencesByIds(offence.childOffenceIds, res.locals.user))

    const parentOffence =
      offence?.parentOffenceId && offence.isChild
        ? await this.offenceService.getOffenceById(offence.parentOffenceId, res.locals.user)
        : undefined

    const offenceMarkers = await this.offenceService.getOffenceMarkers(offence, res.locals.user)

    const isEligibleForEncouragementOffence = this.offenceService.isEligibleForEncouragementOffence(
      offence,
      childOffences,
      res.locals.user.roles,
    )

    res.render('pages/search/viewOffence', {
      offence,
      offenceCodeSearch,
      childOffences,
      parentOffence,
      nomisActivationFlags,
      offenceMarkers,
      isEligibleForEncouragementOffence,
      encouragementOffenceConfirmation,
    })
  }
}
