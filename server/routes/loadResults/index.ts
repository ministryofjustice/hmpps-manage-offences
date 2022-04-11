import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import LoadResultsRoutes from './handlers/loadResults'
import OffenceService from '../../services/offenceService'

export default function Index(offenceService: OffenceService): Router {
  const router = Router()
  const routePrefix = (path: string) => `/load-results${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))

  const loadResultsHandler = new LoadResultsRoutes(offenceService)

  get('/', loadResultsHandler.GET)

  return router
}
