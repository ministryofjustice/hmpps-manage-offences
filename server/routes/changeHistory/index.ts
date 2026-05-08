import { RequestHandler, Router } from 'express'
import ChangeHistory from './handlers/changeHistory'
import AdminService from '../../services/adminService'

export default function Index(adminService: AdminService): Router {
  const router = Router()
  const routePrefix = (path: string) => `/change-history${path}`

  const changeHistoryHandler = new ChangeHistory(adminService)

  router.get('/nomis', changeHistoryHandler.GET_NOMIS)

  return router
}
