import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import ToggleJobsRoutes from './handlers/toggleJobs'
import OffenceService from '../../services/offenceService'

export default function Index(offenceService: OffenceService): Router {
  const router = Router()
  const routePrefix = () => `/toggle-jobs`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(), asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(routePrefix(), asyncMiddleware(handler))

  const toggleJobsHandler = new ToggleJobsRoutes(offenceService)

  get('/', toggleJobsHandler.GET)
  post('/', toggleJobsHandler.POST)

  return router
}
