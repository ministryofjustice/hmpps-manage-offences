import { type RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import ScheduleRoutes from './handlers/schedules'
import LinkOffenceRoutes from './handlers/linkOffence'
import OffenceService from '../../services/offenceService'
import PartsAndOffencesRoutes from './handlers/partsAndOffences'

export const schedulePaths = {
  LINK_OFFENCE_POST: '/schedules/link-offence', // TODO REMOVE
  UNLINK_OFFENCE_POST: '/schedules/unlink-offence',
  LINK_OFFENCES: '/schedules/link-offences/:scheduleId/:schedulePartId',
  LINK_OFFENCE_CREATE: '/schedules/link-offence/create',
}

export default function Index(offenceService: OffenceService): Router {
  const router = Router()
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(path, asyncMiddleware(handler))

  const scheduleHandler = new ScheduleRoutes(offenceService)
  const linkOffenceRoutes = new LinkOffenceRoutes(offenceService)
  const partsAndOffencesHandler = new PartsAndOffencesRoutes(offenceService)

  get('/schedules', scheduleHandler.GET)
  get('/schedules/parts-and-offences/:scheduleId', partsAndOffencesHandler.GET)
  get('/schedules/pcsc-lists', partsAndOffencesHandler.GET_PCSC_LISTS)
  get(schedulePaths.LINK_OFFENCES, linkOffenceRoutes.GET)
  get(schedulePaths.LINK_OFFENCE_CREATE, linkOffenceRoutes.GET_LINK_SCREEN)
  post(schedulePaths.LINK_OFFENCE_CREATE, linkOffenceRoutes.POST_LINK)
  post(schedulePaths.UNLINK_OFFENCE_POST, linkOffenceRoutes.POST_UNLINK)

  return router
}
