import { RequestHandler, Router } from 'express'
import ToggleJobsRoutes from './handlers/toggleJobs'
import AdminService from '../../services/adminService'

export const toggleJobsPaths = {
  TOGGLE_JOBS: '/toggle-jobs',
}
export default function Index(adminService: AdminService): Router {
  const router = Router()
  const get = (path: string, handler: RequestHandler) => router.get(path, handler)
  const post = (path: string, handler: RequestHandler) => router.post(path, handler)

  const toggleJobsHandler = new ToggleJobsRoutes(adminService)

  get(toggleJobsPaths.TOGGLE_JOBS, toggleJobsHandler.GET)
  post(toggleJobsPaths.TOGGLE_JOBS, toggleJobsHandler.POST)

  return router
}
