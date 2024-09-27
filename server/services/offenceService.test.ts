import AuthTokenService from '../data/authTokenService'
import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import OffenceService from './offenceService'
import { Offence } from '../@types/manageOffences/manageOffencesClientTypes'

jest.mock('../data/manageOffencesApiClient')
jest.mock('../data/authTokenService')
jest.mock('../data/prisonApiClient')

describe('Offence service', () => {
  let manageOffencesApiClient: jest.Mocked<ManageOffencesApiClient>
  let authTokenService: jest.Mocked<AuthTokenService>
  let offenceService: OffenceService

  describe('isEligibleForEncouragementOffence', () => {
    beforeEach(() => {
      authTokenService = new AuthTokenService(null) as jest.Mocked<AuthTokenService>
      manageOffencesApiClient = new ManageOffencesApiClient(authTokenService) as jest.Mocked<ManageOffencesApiClient>
      offenceService = new OffenceService(manageOffencesApiClient)
    })

    it('Returns EligibleForEncouragementOffence true for valid parent offence', () => {
      const parentOffence = {
        code: 'AB123',
        endDate: '2016-01-01',
        isChild: false,
      } as Offence
      const childOffences = [{ code: 'AB12345' }] as Array<Offence>
      expect(offenceService.isEligibleForEncouragementOffence(parentOffence, childOffences)).toBeTruthy()
    })

    it('Returns EligibleForEncouragementOffence false where offence is child', () => {
      const parentOffence = {
        code: 'AB123',
        endDate: '2016-01-01',
        isChild: true,
      } as Offence
      const childOffences = [{ code: 'AB12345' }] as Array<Offence>
      expect(offenceService.isEligibleForEncouragementOffence(parentOffence, childOffences)).toBeFalsy()
    })

    it('Returns EligibleForEncouragementOffence false where Encourage offence is already present', () => {
      const parentOffence = {
        code: 'AB123',
        endDate: '2016-01-01',
        isChild: false,
      } as Offence
      const childOffences = [{ code: `${parentOffence.code}E` }] as Array<Offence>
      expect(offenceService.isEligibleForEncouragementOffence(parentOffence, childOffences)).toBeFalsy()
    })

    it('Returns EligibleForEncouragementOffence false where end date is prior to 2008-02-15', () => {
      const parentOffence = {
        code: 'AB123',
        endDate: '2008-02-14',
        isChild: false,
      } as Offence
      const childOffences = [{ code: 'AB12345' }] as Array<Offence>
      expect(offenceService.isEligibleForEncouragementOffence(parentOffence, childOffences)).toBeFalsy()
    })
  })
})
