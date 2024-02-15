import { when } from 'jest-when'
import AdminService from './adminService'
import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import { Offence } from '../@types/manageOffences/manageOffencesClientTypes'
import PrisonApiClient from '../data/prisonApiClient'
import { PageOffenceDto } from '../@types/prisonApi/prisonApiTypes'
import AuthTokenService from '../data/authTokenService'

jest.mock('../data/manageOffencesApiClient')
jest.mock('../data/prisonApiClient')
jest.mock('../data/authTokenService')

const user = { token: 'some token' } as Express.User

describe('Admin service', () => {
  const authTokenService = new AuthTokenService(null) as jest.Mocked<AuthTokenService>
  const manageOffencesApiClient = new ManageOffencesApiClient(authTokenService) as jest.Mocked<ManageOffencesApiClient>
  const prisonApiClient = new PrisonApiClient(authTokenService) as jest.Mocked<PrisonApiClient>
  const adminService = new AdminService(manageOffencesApiClient, prisonApiClient)

  describe('adminService', () => {
    describe('getNomisActivationFlags', () => {
      const activeOffence = {} as Offence
      const inactiveOffence = { endDate: '2023-01-01' } as Offence

      it('When user doesnt have correct role', async () => {
        const result = await adminService.getNomisActivationFlags('OF1', activeOffence, user, [])

        expect(result).toEqual({ canActivate: false, canDeactivate: false })
      })

      it('When offence is active in nomis and manage-offences', async () => {
        when(prisonApiClient.getOffencesByCodeStartsWith).mockResolvedValue({
          content: [{ code: 'OF1', activeFlag: 'Y' }],
        } as PageOffenceDto)
        const result = await adminService.getNomisActivationFlags('OF1', activeOffence, user, [
          'NOMIS_OFFENCE_ACTIVATOR',
        ])

        expect(result).toEqual({ canActivate: false })
      })

      it('When offence is inactive in nomis and active in manage-offences', async () => {
        when(prisonApiClient.getOffencesByCodeStartsWith).mockResolvedValue({
          content: [{ code: 'OF1', activeFlag: 'N' }],
        } as PageOffenceDto)
        const result = await adminService.getNomisActivationFlags('OF1', activeOffence, user, [
          'NOMIS_OFFENCE_ACTIVATOR',
        ])

        expect(result).toEqual({ canActivate: true })
      })

      it('When offence is active in nomis and inactive in manage-offences', async () => {
        when(prisonApiClient.getOffencesByCodeStartsWith).mockResolvedValue({
          content: [{ code: 'OF1', activeFlag: 'Y' }],
        } as PageOffenceDto)
        const result = await adminService.getNomisActivationFlags('OF1', inactiveOffence, user, [
          'NOMIS_OFFENCE_ACTIVATOR',
        ])

        expect(result).toEqual({ canActivate: false, canDeactivate: true })
      })

      it('When offence is inactive in nomis and inactive in manage-offences', async () => {
        when(prisonApiClient.getOffencesByCodeStartsWith).mockResolvedValue({
          content: [{ code: 'OF1', activeFlag: 'N' }],
        } as PageOffenceDto)
        const result = await adminService.getNomisActivationFlags('OF1', inactiveOffence, user, [
          'NOMIS_OFFENCE_ACTIVATOR',
        ])

        expect(result).toEqual({ canActivate: true, canDeactivate: false })
      })
    })
  })
})
