import { Router } from 'express'
import csrf from '../middleware/csrfMiddleware'
import { Services } from '../services'
import homeRoutes from './home'
import searchRoutes from './search'
import auth from '../authentication/auth'
import tokenVerifier from '../data/tokenVerification'
import populateCurrentUser from '../middleware/populateCurrentUser'

export default function Index(services: Services): Router {
  const router = Router({ mergeParams: true })

  router.use(auth.authenticationMiddleware(tokenVerifier))
  router.use(populateCurrentUser(services.userService, services.offenceService))
  router.use(csrf())

  router.use(homeRoutes())
  router.use(searchRoutes(services.offenceService))

  return router
}
