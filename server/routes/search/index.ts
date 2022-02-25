import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import SearchRoutes from './handlers/search'
import OffenceService from '../../services/offenceService'

export default function Index(offenceService: OffenceService): Router {
  const router = Router()
  const routePrefix = (path: string) => `/search${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))

  const searchHandler = new SearchRoutes(offenceService)

  get('/offence-code', searchHandler.GET)

  return router
}
