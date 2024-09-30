import { Request, Response } from 'express'
import AdminService from '../../../services/adminService'

export default class AdminRoutes {
  constructor(private readonly adminService: AdminService) {}

  REACTIVATE_NOMIS_OFFENCE = async (req: Request, res: Response): Promise<void> => {
    const { offenceId, offenceCodeSearch } = req.body
    await this.adminService.reactivateOffence(offenceId, res.locals.user)
    res.redirect(`/search/offence/${offenceId}/view?offenceCodeSearch=${offenceCodeSearch}`)
  }

  DEACTIVATE_NOMIS_OFFENCE = async (req: Request, res: Response): Promise<void> => {
    const { offenceId, offenceCodeSearch } = req.body
    await this.adminService.deactivateOffence(offenceId, res.locals.user)
    res.redirect(`/search/offence/${offenceId}/view?offenceCodeSearch=${offenceCodeSearch}`)
  }

  ADD_ENCOURAGEMENT_OFFENCE = async (req: Request, res: Response): Promise<void> => {
    const { offenceId, offenceCodeSearch } = req.body
    await this.adminService.addEncouragementOffence(offenceId, res.locals.user)
    res.redirect(
      `/search/offence/${offenceId}/view?offenceCodeSearch=${offenceCodeSearch}&encouragementOffenceConfirmation`,
    )
  }
}
