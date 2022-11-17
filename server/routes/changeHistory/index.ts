import { RequestHandler, Router } from 'express'
import asyncMiddleware from '../../middleware/asyncMiddleware'
import ChangeHistory from './handlers/changeHistory'
import ChangeHistoryService from '../../services/changeHistoryService'

export default function Index(changeHistoryService: ChangeHistoryService): Router {
  const router = Router()
  const routePrefix = (path: string) => `/change-history${path}`
  const get = (path: string, handler: RequestHandler) => router.get(routePrefix(path), asyncMiddleware(handler))

  const changeHistoryHandler = new ChangeHistory(changeHistoryService)

  get('/nomis', changeHistoryHandler.GET_NOMIS)

  return router
}
