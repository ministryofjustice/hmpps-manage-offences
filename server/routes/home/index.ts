import { Router } from 'express'
import HomeRoutes from './handlers/home'

export default function Index(): Router {
  const router = Router()

  const homeHandler = new HomeRoutes()

  router.get('/', homeHandler.GET)

  return router
}
