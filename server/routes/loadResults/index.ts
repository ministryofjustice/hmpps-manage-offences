import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import LoadResultsRoutes from './handlers/loadResults'
import AdminService from '../../services/adminService'

export const loadResultPaths = {
  LOAD_RESULTS: '/load-results',
}
export default function Index(adminService: AdminService): Router {
  const router = Router()
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  const loadResultsHandler = new LoadResultsRoutes(adminService)

  get(loadResultPaths.LOAD_RESULTS, loadResultsHandler.GET)

  return router
}
