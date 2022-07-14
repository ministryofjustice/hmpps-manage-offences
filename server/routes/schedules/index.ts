import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import ScheduleRoutes from './handlers/schedules'
import LinkOffenceRoutes from './handlers/linkOffence'
import OffenceService from '../../services/offenceService'
import PartsAndOffencesRoutes from './handlers/partsAndOffences'

export default function Index(offenceService: OffenceService): Router {
  const router = Router()
  const routePrefix = (path: string) => `/schedules${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(routePrefix(path), asyncMiddleware(handler))

  const scheduleHandler = new ScheduleRoutes(offenceService)
  const linkOffenceRoutes = new LinkOffenceRoutes(offenceService)
  const partsAndOffencesHandler = new PartsAndOffencesRoutes(offenceService)

  get('/', scheduleHandler.GET)
  get('/parts-and-offences/:scheduleId', partsAndOffencesHandler.GET)
  get('/add-offences/:scheduleId/:schedulePartId', linkOffenceRoutes.GET)
  post('/link-offence', linkOffenceRoutes.POST_LINK)
  post('/unlink-offence', linkOffenceRoutes.POST_UNLINK)

  return router
}
