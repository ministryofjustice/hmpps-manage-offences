import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import SearchRoutes from './handlers/search'
import OffenceService from '../../services/offenceService'
import AdminService from '../../services/adminService'
import AdminRoutes from './handlers/admin'

export const adminPaths = {
  REACTIVATE_NOMIS_OFFENCE: '/admin/nomis/offence/reactivate',
  DEACTIVATE_NOMIS_OFFENCE: '/admin/nomis/offence/deactivate',
  ADD_ENCOURAGEMENT_OFFENCE: '/admin/nomis/offence/encouragement',
}

export default function Index(offenceService: OffenceService, adminService: AdminService): Router {
  const router = Router()
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(path, asyncMiddleware(handler))

  const searchRoutes = new SearchRoutes(offenceService, adminService)
  const adminRoutes = new AdminRoutes(adminService)

  get('/search/offence-code', searchRoutes.GET)
  get('/search/offence/:offenceId/view', searchRoutes.VIEW_OFFENCE)
  post(adminPaths.REACTIVATE_NOMIS_OFFENCE, adminRoutes.REACTIVATE_NOMIS_OFFENCE)
  post(adminPaths.DEACTIVATE_NOMIS_OFFENCE, adminRoutes.DEACTIVATE_NOMIS_OFFENCE)
  post(adminPaths.ADD_ENCOURAGEMENT_OFFENCE, adminRoutes.ADD_ENCOURAGEMENT_OFFENCE)

  return router
}
