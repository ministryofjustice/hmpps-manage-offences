import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import LoadResultsRoutes from './handlers/loadResults'
import OffenceService from '../../services/offenceService'

export const loadResultPaths = {
  LOAD_RESULTS: '/load-results',
}
export default function Index(offenceService: OffenceService): Router {
  const router = Router()
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  const loadResultsHandler = new LoadResultsRoutes(offenceService)

  get(loadResultPaths.LOAD_RESULTS, loadResultsHandler.GET)

  return router
}
