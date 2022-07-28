import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import ToggleJobsRoutes from './handlers/toggleJobs'
import OffenceService from '../../services/offenceService'

export const toggleJobsPaths = {
  TOGGLE_JOBS: '/toggle-jobs',
}
export default function Index(offenceService: OffenceService): Router {
  const router = Router()
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(path, asyncMiddleware(handler))

  const toggleJobsHandler = new ToggleJobsRoutes(offenceService)

  get(toggleJobsPaths.TOGGLE_JOBS, toggleJobsHandler.GET)
  post(toggleJobsPaths.TOGGLE_JOBS, toggleJobsHandler.POST)

  return router
}
