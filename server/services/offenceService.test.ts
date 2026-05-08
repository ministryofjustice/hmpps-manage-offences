import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import OffenceService from './offenceService'
import { Offence } from '../@types/manageOffences/manageOffencesClientTypes'
import AuthorisedRoles from '../enums/authorisedRoles'

jest.mock('../data/manageOffencesApiClient')
jest.mock('../data/authTokenService')
jest.mock('../data/prisonApiClient')

describe('Offence service', () => {
  let manageOffencesApiClient: jest.Mocked<ManageOffencesApiClient>
  let offenceService: OffenceService

  describe('isEligibleForEncouragementOffence', () => {
    beforeEach(() => {
      manageOffencesApiClient = new ManageOffencesApiClient(null) as jest.Mocked<ManageOffencesApiClient>
      offenceService = new OffenceService(manageOffencesApiClient)
    })

    it('Returns EligibleForEncouragementOffence true for valid parent offence', () => {
      const parentOffence = {
        code: 'AB123',
        endDate: '2016-01-01',
        isChild: false,
      } as Offence
      const childOffences = [{ code: 'AB12345' }] as Array<Offence>
      expect(
        offenceService.isEligibleForEncouragementOffence(parentOffence, childOffences, [
          AuthorisedRoles.NOMIS_OFFENCE_ACTIVATOR,
        ]),
      ).toBeTruthy()
    })

    it('Returns EligibleForEncouragementOffence false where offence is child', () => {
      const parentOffence = {
        code: 'AB123',
        endDate: '2016-01-01',
        isChild: true,
      } as Offence
      const childOffences = [{ code: 'AB12345' }] as Array<Offence>
      expect(
        offenceService.isEligibleForEncouragementOffence(parentOffence, childOffences, [
          AuthorisedRoles.NOMIS_OFFENCE_ACTIVATOR,
        ]),
      ).toBeFalsy()
    })

    it('Returns EligibleForEncouragementOffence false where user roles do not include ACTIVATOR', () => {
      const parentOffence = {
        code: 'AB123',
        endDate: '2016-01-01',
        isChild: false,
      } as Offence
      const childOffences = [{ code: 'AB12345' }] as Array<Offence>
      expect(
        offenceService.isEligibleForEncouragementOffence(parentOffence, childOffences, [
          AuthorisedRoles.ROLE_UPDATE_OFFENCE_SCHEDULES,
        ]),
      ).toBeFalsy()
    })

    it('Returns EligibleForEncouragementOffence false where Encourage offence is already present', () => {
      const parentOffence = {
        code: 'AB123',
        endDate: '2016-01-01',
        isChild: false,
      } as Offence
      const childOffences = [{ code: `${parentOffence.code}E` }] as Array<Offence>
      expect(
        offenceService.isEligibleForEncouragementOffence(parentOffence, childOffences, [
          AuthorisedRoles.NOMIS_OFFENCE_ACTIVATOR,
        ]),
      ).toBeFalsy()
    })

    it('Returns EligibleForEncouragementOffence false where end date is prior to 2008-02-15', () => {
      const parentOffence = {
        code: 'AB123',
        endDate: '2008-02-14',
        isChild: false,
      } as Offence
      const childOffences = [{ code: 'AB12345' }] as Array<Offence>
      expect(
        offenceService.isEligibleForEncouragementOffence(parentOffence, childOffences, [
          AuthorisedRoles.NOMIS_OFFENCE_ACTIVATOR,
        ]),
      ).toBeFalsy()
    })
  })
})
