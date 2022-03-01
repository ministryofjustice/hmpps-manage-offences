import OffenceService from './offenceService'
import UserService from './userService'
import HmppsAuthClient from '../data/hmppsAuthClient'
import ManageOffencesApiClient from '../data/manageOffencesApiClient'

const hmppsAuthClient = new HmppsAuthClient()
const manageOffencesApiClient = new ManageOffencesApiClient()

const offenceService = new OffenceService(manageOffencesApiClient)
const userService = new UserService(hmppsAuthClient)

export const services = {
  offenceService,
  userService,
}

export type Services = typeof services
