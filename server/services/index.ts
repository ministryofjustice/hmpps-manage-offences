import { dataAccess } from '../data'
import OffenceService from './offenceService'
import UserService from './userService'
import AdminService from './adminService'

export const services = () => {
  const { applicationInfo, manageUsersApiClient, manageOffencesApiClient, prisonApiClient } = dataAccess()

  const offenceService = new OffenceService(manageOffencesApiClient)
  const adminService = new AdminService(manageOffencesApiClient, prisonApiClient)
  const userService = new UserService(manageUsersApiClient)

  return {
    applicationInfo,
    offenceService,
    adminService,
    userService,
  }
}

export type Services = ReturnType<typeof services>

export { UserService }
