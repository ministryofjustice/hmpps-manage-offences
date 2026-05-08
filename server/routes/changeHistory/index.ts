import { Router } from 'express'
import ChangeHistory from './handlers/changeHistory'
import AdminService from '../../services/adminService'

export default function Index(adminService: AdminService): Router {
  const router = Router()

  const changeHistoryHandler = new ChangeHistory(adminService)

  router.get('/change-history/nomis', changeHistoryHandler.GET_NOMIS)

  return router
}
