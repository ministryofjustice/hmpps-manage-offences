import OffenceService from './offenceService'
import UserService from './userService'
import HmppsAuthClient from '../data/hmppsAuthClient'
import TokenStore from '../data/tokenStore'
import { createRedisClient } from '../data/redisClient'

const hmppsAuthClient = new HmppsAuthClient(new TokenStore(createRedisClient()))
const offenceService = new OffenceService()
const userService = new UserService(hmppsAuthClient)

export const services = {
  offenceService,
  userService,
}

export type Services = typeof services
