import { Router } from 'express'
import csrf from '../middleware/csrfMiddleware'
import { Services } from '../services'
import homeRoutes from './home'
import searchRoutes from './search'
import loadResultsRoutes from './loadResults'
import toggleJobs from './toggleJobs'
import scheduleRoutes from './schedules'
import changeHistory from './changeHistory'
import auth from '../authentication/auth'
import tokenVerifier from '../data/tokenVerification'
import populateCurrentUser from '../middleware/populateCurrentUser'

export default function Index(services: Services): Router {
  const router = Router({ mergeParams: true })

  router.use(auth.authenticationMiddleware(tokenVerifier))
  router.use(populateCurrentUser(services.userService))
  router.use(csrf())

  router.use(homeRoutes())
  router.use(searchRoutes(services.offenceService, services.adminService))
  router.use(loadResultsRoutes(services.adminService))
  router.use(toggleJobs(services.adminService))
  router.use(scheduleRoutes(services.offenceService))
  router.use(changeHistory(services.adminService))

  return router
}
