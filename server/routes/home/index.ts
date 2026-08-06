import { Router } from 'express'
import HomeRoutes from './handlers/home'
import OffenceService from '../../services/offenceService'

export default function Index(offenceService: OffenceService): Router {
  const router = Router()

  const homeHandler = new HomeRoutes(offenceService)

  router.get('/', homeHandler.GET)

  return router
}
