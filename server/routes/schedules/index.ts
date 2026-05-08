import { Router } from 'express'
import ScheduleRoutes from './handlers/schedules'
import LinkOffenceRoutes from './handlers/linkOffence'
import OffenceService from '../../services/offenceService'
import PartsAndOffencesRoutes from './handlers/partsAndOffences'
import AdminService from '../../services/adminService'

export const schedulePaths = {
  LINK_OFFENCE_POST: '/schedules/link-offence', // TODO REMOVE
  UNLINK_OFFENCE_POST: '/schedules/unlink-offence',
  LINK_OFFENCES: '/schedules/link-offences/:scheduleId/:schedulePartId',
  LINK_OFFENCE_CREATE: '/schedules/link-offence/create',
}

export default function Index(offenceService: OffenceService, adminService: AdminService): Router {
  const router = Router()

  const scheduleHandler = new ScheduleRoutes(offenceService)
  const linkOffenceRoutes = new LinkOffenceRoutes(offenceService)
  const partsAndOffencesHandler = new PartsAndOffencesRoutes(offenceService, adminService)

  router.get('/schedules', scheduleHandler.GET)
  router.get('/schedules/parts-and-offences/:scheduleId', partsAndOffencesHandler.GET)
  router.get('/schedules/pcsc-lists', partsAndOffencesHandler.GET_PCSC_LISTS)
  router.get('/schedules/sds-exclusion-lists', partsAndOffencesHandler.GET_SDS_EXCLUSION_LISTS)
  router.get(schedulePaths.LINK_OFFENCES, linkOffenceRoutes.GET)
  router.get(schedulePaths.LINK_OFFENCE_CREATE, linkOffenceRoutes.GET_LINK_SCREEN)
  router.post(schedulePaths.LINK_OFFENCE_CREATE, linkOffenceRoutes.POST_LINK)
  router.post(schedulePaths.UNLINK_OFFENCE_POST, linkOffenceRoutes.POST_UNLINK)

  return router
}
