import OffenceService from './offenceService'
import UserService from './userService'
import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import AdminService from './adminService'
import PrisonApiClient from '../data/prisonApiClient'
import ManageUsersApiClient from '../data/manageUsersApiClient'

const manageOffencesApiClient = new ManageOffencesApiClient()
const prisonApiClient = new PrisonApiClient()
const manageUsersApiClient = new ManageUsersApiClient()

const offenceService = new OffenceService(manageOffencesApiClient)
const adminService = new AdminService(manageOffencesApiClient, prisonApiClient)
const userService = new UserService(manageUsersApiClient)

export const services = {
  offenceService,
  adminService,
  userService,
}

export type Services = typeof services
