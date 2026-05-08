import { Router } from 'express'
import ToggleJobsRoutes from './handlers/toggleJobs'
import AdminService from '../../services/adminService'

export const toggleJobsPaths = {
  TOGGLE_JOBS: '/toggle-jobs',
}
export default function Index(adminService: AdminService): Router {
  const router = Router()

  const toggleJobsHandler = new ToggleJobsRoutes(adminService)

  router.get(toggleJobsPaths.TOGGLE_JOBS, toggleJobsHandler.GET)
  router.post(toggleJobsPaths.TOGGLE_JOBS, toggleJobsHandler.POST)

  return router
}
