import { dataAccess } from '../data'
import OffenceService from './offenceService'
import AuditService from './auditService'
import AdminService from './adminService'

export const services = () => {
  const { applicationInfo, manageOffencesApiClient, prisonApiClient, hmppsAuditClient } = dataAccess()

  const offenceService = new OffenceService(manageOffencesApiClient)
  const adminService = new AdminService(manageOffencesApiClient, prisonApiClient)

  return {
    applicationInfo,
    offenceService,
    adminService,
    auditService: new AuditService(hmppsAuditClient),
  }
}

export type Services = ReturnType<typeof services>
