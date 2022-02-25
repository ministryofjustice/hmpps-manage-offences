import { RequestHandler } from 'express'
import logger from '../../logger'
import UserService from '../services/userService'
import OffenceService from '../services/offenceService'

export default function populateCurrentUser(userService: UserService, offenceService: OffenceService): RequestHandler {
  return async (req, res, next) => {
    try {
      if (res.locals.user) {
        const user = res.locals.user && (await userService.getUser(res.locals.user.token))
        if (user) {
          res.locals.user = { ...user, ...res.locals.user }
          offenceService.setManageOffencesApiClient(res.locals.user.token)
        } else {
          logger.info('No user available')
        }
      }
      next()
    } catch (error) {
      logger.error(error, `Failed to retrieve user for: ${res.locals.user && res.locals.user.username}`)
      next(error)
    }
  }
}
