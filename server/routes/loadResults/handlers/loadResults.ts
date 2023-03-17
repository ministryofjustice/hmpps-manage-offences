import { Request, Response } from 'express'
import AdminService from '../../../services/adminService'

export default class LoadResultRoutes {
  constructor(private readonly adminService: AdminService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const loadResults = await this.adminService.getMostRecentLoadResult(res.locals.user)
    res.render('pages/loadResults/loadResults', { loadResults })
  }
}
