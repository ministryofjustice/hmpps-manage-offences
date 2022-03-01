import redis, { createClient } from 'redis'
import session from 'express-session'
import connectRedis, { Client } from 'connect-redis'
import addRequestId from 'express-request-id'
import express, { Router } from 'express'

import config from '../config'
import { createRedisClient } from '../data/redisClient'

const RedisStore = connectRedis(session)

const cl =

export default function setUpWebSession(): Router {
  const client = createRedisClient()
  const router = express.Router()
  // client.connect()

  router.use(
    session({
      store: new RedisStore({ client: client as unknown as Client }),
      cookie: { secure: config.https, sameSite: 'lax', maxAge: config.session.expiryMinutes * 60 * 1000 },
      secret: config.session.secret,
      resave: false, // redis implements touch so shouldn't need this
      saveUninitialized: false,
      rolling: true,
    })
  )

  // Update a value in the cookie so that the set-cookie will be sent.
  // Only changes every minute so that it's not sent with every request.
  router.use((req, res, next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
  })

  router.use(addRequestId())

  return router
}
