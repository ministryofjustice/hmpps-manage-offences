import { Router } from 'express'
import { Services } from '../services'
import homeRoutes from './home'
import searchRoutes from './search'
import loadResultsRoutes from './loadResults'
import toggleJobs from './toggleJobs'
import scheduleRoutes from './schedules'
import changeHistory from './changeHistory'

export default function Index(services: Services): Router {
  const router = Router({ mergeParams: true })

  router.use(homeRoutes())
  router.use(searchRoutes(services.offenceService, services.adminService))
  router.use(loadResultsRoutes(services.adminService))
  router.use(toggleJobs(services.adminService))
  router.use(scheduleRoutes(services.offenceService, services.adminService))
  router.use(changeHistory(services.adminService))

  return router
}
