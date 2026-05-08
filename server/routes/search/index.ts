import { Router } from 'express'
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

  const searchRoutes = new SearchRoutes(offenceService, adminService)
  const adminRoutes = new AdminRoutes(adminService)

  router.get('/search/offence-code', searchRoutes.GET)
  router.get('/search/offence/:offenceId/view', searchRoutes.VIEW_OFFENCE)
  router.post(adminPaths.REACTIVATE_NOMIS_OFFENCE, adminRoutes.REACTIVATE_NOMIS_OFFENCE)
  router.post(adminPaths.DEACTIVATE_NOMIS_OFFENCE, adminRoutes.DEACTIVATE_NOMIS_OFFENCE)
  router.post(adminPaths.ADD_ENCOURAGEMENT_OFFENCE, adminRoutes.ADD_ENCOURAGEMENT_OFFENCE)

  return router
}
