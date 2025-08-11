import { RequestHandler, Router } from 'express'
import ChangeHistory from './handlers/changeHistory'
import AdminService from '../../services/adminService'

export default function Index(adminService: AdminService): Router {
  const router = Router()
  const routePrefix = (path: string) => `/change-history${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), handler)

  const changeHistoryHandler = new ChangeHistory(adminService)

  get('/nomis', changeHistoryHandler.GET_NOMIS)

  return router
}
