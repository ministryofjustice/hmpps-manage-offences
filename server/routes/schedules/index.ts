import { Router } from 'express'
import ScheduleRoutes from './handlers/schedules'
import LinkOffenceRoutes from './handlers/linkOffence'
import OffenceService from '../../services/offenceService'
import PartsAndOffencesRoutes from './handlers/partsAndOffences'
import CreateScheduleRoutes from './handlers/createSchedule'
import ScheduleStatusRoutes from './handlers/scheduleStatus'
import SchedulePartRoutes from './handlers/scheduleParts'
import EditScheduleRoutes from './handlers/editSchedule'
import AdminService from '../../services/adminService'

export const schedulePaths = {
  LINK_OFFENCE_POST: '/schedules/link-offence', // TODO REMOVE
  UNLINK_OFFENCE_POST: '/schedules/unlink-offence',
  LINK_OFFENCES: '/schedules/link-offences/:scheduleId/:schedulePartId',
  LINK_OFFENCE_CREATE: '/schedules/link-offence/create',
  CREATE_SCHEDULE: '/schedules/create',
  SCHEDULE_STATUS: '/schedules/:scheduleId/status',
  EDIT_SCHEDULE: '/schedules/:scheduleId/edit',
  ADD_SCHEDULE_PART: '/schedules/:scheduleId/parts/add',
  DELETE_SCHEDULE_PART: '/schedules/:scheduleId/parts/:schedulePartId/delete',
}

export default function Index(offenceService: OffenceService, adminService: AdminService): Router {
  const router = Router()

  const scheduleHandler = new ScheduleRoutes(offenceService)
  const linkOffenceRoutes = new LinkOffenceRoutes(offenceService)
  const partsAndOffencesHandler = new PartsAndOffencesRoutes(offenceService, adminService)
  const createScheduleHandler = new CreateScheduleRoutes(offenceService)
  const scheduleStatusHandler = new ScheduleStatusRoutes(offenceService, adminService)
  const schedulePartHandler = new SchedulePartRoutes(offenceService)
  const editScheduleHandler = new EditScheduleRoutes(offenceService)

  router.get('/schedules', scheduleHandler.GET)
  // registered ahead of any /schedules/:param route so the literal paths win
  router.get(schedulePaths.CREATE_SCHEDULE, createScheduleHandler.GET)
  router.post(schedulePaths.CREATE_SCHEDULE, createScheduleHandler.POST)
  router.get(schedulePaths.SCHEDULE_STATUS, scheduleStatusHandler.GET)
  router.post(schedulePaths.SCHEDULE_STATUS, scheduleStatusHandler.POST)
  router.get(schedulePaths.EDIT_SCHEDULE, editScheduleHandler.GET)
  router.post(schedulePaths.EDIT_SCHEDULE, editScheduleHandler.POST)
  router.get(schedulePaths.ADD_SCHEDULE_PART, schedulePartHandler.GET_ADD)
  router.post(schedulePaths.ADD_SCHEDULE_PART, schedulePartHandler.POST_ADD)
  router.post(schedulePaths.DELETE_SCHEDULE_PART, schedulePartHandler.POST_DELETE)
  router.get('/schedules/parts-and-offences/:scheduleId', partsAndOffencesHandler.GET)
  router.get('/schedules/pcsc-lists', partsAndOffencesHandler.GET_PCSC_LISTS)
  router.get('/schedules/sds-exclusion-lists', partsAndOffencesHandler.GET_SDS_EXCLUSION_LISTS)
  router.get(schedulePaths.LINK_OFFENCES, linkOffenceRoutes.GET)
  router.get(schedulePaths.LINK_OFFENCE_CREATE, linkOffenceRoutes.GET_LINK_SCREEN)
  router.post(schedulePaths.LINK_OFFENCE_CREATE, linkOffenceRoutes.POST_LINK)
  router.post(schedulePaths.UNLINK_OFFENCE_POST, linkOffenceRoutes.POST_UNLINK)

  return router
}
