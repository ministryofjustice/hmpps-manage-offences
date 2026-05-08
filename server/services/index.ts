import { dataAccess } from '../data'
import OffenceService from './offenceService'
import AuditService from './auditService'
import UserService from './userService'
import AdminService from './adminService'

export const services = () => {
  const { applicationInfo, manageUsersApiClient, manageOffencesApiClient, prisonApiClient, hmppsAuditClient } = dataAccess()

  const offenceService = new OffenceService(manageOffencesApiClient)
  const adminService = new AdminService(manageOffencesApiClient, prisonApiClient)
  const userService = new UserService(manageUsersApiClient)

  return {
    applicationInfo,
    offenceService,
    adminService,
    userService,
    auditService: new AuditService(hmppsAuditClient),
  }
}

export type Services = ReturnType<typeof services>
