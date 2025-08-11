import express, { Router } from 'express'
import multer from 'multer'

export default function setUpWebRequestParsing(): Router {
  const router = express.Router()
  router.use(multer({ storage: multer.memoryStorage(), limits: { fileSize: 1024 * 1024 } }).any())
  router.use(express.json())
  router.use(express.urlencoded({ extended: true }))
  return router
}
