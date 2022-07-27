import jwtDecode from 'jwt-decode'
import type { RequestHandler } from 'express'
import logger from '../../logger'
import AuthorisedRoles from '../enums/authorisedRoles'
import urlToRoleMapping from '../types/urltoRoleMapping'

export default function authorisationMiddleware(authorisedRoles: string[] = []): RequestHandler {
  return (req, res, next) => {
    if (res.locals && res.locals.user && res.locals.user.token) {
      const { authorities: roles = [] } = jwtDecode(res.locals.user.token) as { authorities?: string[] }

      if (authorisedRoles.length && !roles.some(role => authorisedRoles.includes(role))) {
        logger.error('User is not authorised to access this')
        return res.redirect('/authError')
      }

      const urlMapping = Object.values(urlToRoleMapping).find(value => value.matchPath(req.path))
      const authorised = !urlMapping || roles.some(r => urlMapping.roles.includes(AuthorisedRoles[r]))
      if (!authorised) {
        logger.error('User is not authorised to access this resource')
        return res.redirect('/authError')
      }

      return next()
    }

    req.session.returnTo = req.originalUrl
    return res.redirect('/sign-in')
  }
}
