import { type RequestHandler, Router } from 'express'
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
  const get = (path: string, handler: RequestHandler) => router.get(path, handler)
  const post = (path: string, handler: RequestHandler) => router.post(path, handler)

  const scheduleHandler = new ScheduleRoutes(offenceService)
  const linkOffenceRoutes = new LinkOffenceRoutes(offenceService)
  const partsAndOffencesHandler = new PartsAndOffencesRoutes(offenceService)

  get('/schedules', scheduleHandler.GET)
  get('/schedules/create', scheduleHandler.GET_CREATE)
  post('/schedules/create', scheduleHandler.POST_CREATE)
  get('/schedules/parts-and-offences/:scheduleId', partsAndOffencesHandler.GET)
  get('/schedules/parts-and-offences/:scheduleId/part/create', partsAndOffencesHandler.GET_PART_CREATE)
  post('/schedules/parts-and-offences/:scheduleId/part/create', partsAndOffencesHandler.POST_PART_CREATE)
  get(
    '/schedules/parts-and-offences/:scheduleId/part/:schedulePartId/link',
    partsAndOffencesHandler.GET_PART_LINK_OFFENCES,
  )
  post(
    '/schedules/parts-and-offences/:scheduleId/part/:schedulePartId/link',
    partsAndOffencesHandler.POST_PART_LINK_OFFENCES,
  )
  get(
    '/schedules/parts-and-offences/:scheduleId/part/:schedulePartId/link/confirmation',
    partsAndOffencesHandler.POST_PART_CREATE_CONFIRMATION,
  )
  get('/schedules/pcsc-lists', partsAndOffencesHandler.GET_PCSC_LISTS)
  get('/schedules/sds-exclusion-lists', partsAndOffencesHandler.GET_SDS_EXCLUSION_LISTS)
  get(schedulePaths.LINK_OFFENCES, linkOffenceRoutes.GET)
  get(schedulePaths.LINK_OFFENCE_CREATE, linkOffenceRoutes.GET_LINK_SCREEN)
  post(schedulePaths.LINK_OFFENCE_CREATE, linkOffenceRoutes.POST_LINK)
  post(schedulePaths.UNLINK_OFFENCE_POST, linkOffenceRoutes.POST_UNLINK)

  return router
}
