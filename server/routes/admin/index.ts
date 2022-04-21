import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import LoadResultsRoutes from './handlers/admin'
import OffenceService from '../../services/offenceService'

export default function Index(offenceService: OffenceService): Router {
  const router = Router()
  const routePrefix = (path: string) => `/admin${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))

  const adminHandler = new LoadResultsRoutes(offenceService)

  get('/', adminHandler.GET)
  get('/trigger-sdrs-load', adminHandler.SDRS_LOAD)
  get('/trigger-sdrs-update', adminHandler.SDRS_UPDATE)

  return router
}
