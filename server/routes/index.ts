import { Router } from 'express'
import csrf from '../middleware/csrfMiddleware'
import { Services } from '../services'
import homeRoutes from './home'
import searchRoutes from './search'
import loadResultsRoutes from './loadResults'
import adminRoutes from './admin'
import auth from '../authentication/auth'
import tokenVerifier from '../data/tokenVerification'
import populateCurrentUser from '../middleware/populateCurrentUser'

export default function Index(services: Services): Router {
  const router = Router({ mergeParams: true })

  router.use(auth.authenticationMiddleware(tokenVerifier))
  router.use(populateCurrentUser(services.userService))
  router.use(csrf())

  router.use(homeRoutes())
  router.use(searchRoutes(services.offenceService))
  router.use(loadResultsRoutes(services.offenceService))
  router.use(adminRoutes(services.offenceService))

  return router
}
