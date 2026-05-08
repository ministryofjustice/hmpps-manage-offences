import { Router } from 'express'
import LoadResultsRoutes from './handlers/loadResults'
import AdminService from '../../services/adminService'

export const loadResultPaths = {
  LOAD_RESULTS: '/load-results',
}
export default function Index(adminService: AdminService): Router {
  const router = Router()

  const loadResultsHandler = new LoadResultsRoutes(adminService)

  router.get(loadResultPaths.LOAD_RESULTS, loadResultsHandler.GET)

  return router
}
