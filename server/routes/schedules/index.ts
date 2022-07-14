import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import ScheduleRoutes from './handlers/schedules'
import LinkOffenceRoutes from './handlers/linkOffence'
import OffenceService from '../../services/offenceService'

export default function Index(offenceService: OffenceService): Router {
  const router = Router()
  const routePrefix = (path: string) => `/schedules${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(routePrefix(path), asyncMiddleware(handler))

  const scheduleHandler = new ScheduleRoutes(offenceService)
  const linkOffenceHandler = new LinkOffenceRoutes(offenceService)

  get('/', scheduleHandler.GET)
  get('/link-offences/:scheduleId/:schedulePartId', linkOffenceHandler.GET)
  post('/link-offence', linkOffenceHandler.POST)

  return router
}
