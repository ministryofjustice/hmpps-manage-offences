import OffenceService from './offenceService'
import UserService from './userService'
import HmppsAuthClient from '../data/hmppsAuthClient'
import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import AdminService from './adminService'
import PrisonApiClient from '../data/prisonApiClient'

const hmppsAuthClient = new HmppsAuthClient()
const manageOffencesApiClient = new ManageOffencesApiClient()
const prisonApiClient = new PrisonApiClient()

const offenceService = new OffenceService(manageOffencesApiClient)
const adminService = new AdminService(manageOffencesApiClient, prisonApiClient)
const userService = new UserService(hmppsAuthClient)

export const services = {
  offenceService,
  adminService,
  userService,
}

export type Services = typeof services
