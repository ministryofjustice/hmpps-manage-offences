import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes } from '../../testutils/appSetup'
import OffenceService from '../../../services/offenceService'
import {
  OffenceToScheduleMapping,
  SexualOrViolentLists,
} from '../../../@types/manageOffences/manageOffencesClientTypes'
import AdminService from '../../../services/adminService'
import FeatureToggleDisplay from '../../../types/featureToggleDisplay'

jest.mock('../../../services/offenceService')

const offenceService = new OffenceService(null) as jest.Mocked<OffenceService>
const adminService = new AdminService(null, null) as jest.Mocked<AdminService>

const offence1: OffenceToScheduleMapping = {
  id: 1,
  code: 'AA1234',
  description: 'Offence 1',
  startDate: '1994-01-06',
  endDate: null,
  childOffences: null,
  isChild: false,
  revisionId: 1,
  changedDate: '2003-07-26',
  legislationText: 'Legislation text 1',
}

const offence2: OffenceToScheduleMapping = {
  id: 2,
  code: 'BB1234',
  description: 'Offence 2',
  startDate: '1994-01-06',
  endDate: null,
  childOffences: null,
  isChild: false,
  revisionId: 1,
  changedDate: '2003-07-26',
  legislationText: 'Legislation text 2',
}

const offence3: OffenceToScheduleMapping = {
  id: 3,
  code: 'CC1234',
  description: 'Offence 3',
  startDate: '1994-01-06',
  endDate: null,
  childOffences: null,
  isChild: false,
  revisionId: 1,
  changedDate: '2003-07-26',
  legislationText: 'Legislation text 3',
}

const sexualOrViolentLists: SexualOrViolentLists = {
  sexualCodesAndS15P2: [offence1],
  sexualS3AndS15P2: [offence2],
  violent: [offence3],
}

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({
    services: { offenceService, adminService },
  })
})
afterEach(() => {
  jest.resetAllMocks()
})

describe('', () => {
  it('should navigate to the Sexual or Violent Offences page', () => {
    offenceService.getSexualOrViolentLists.mockResolvedValue(sexualOrViolentLists)
    adminService.getFeatureToggles = jest.fn()
    const featureToggleDisplays = [
      {
        feature: 'SEXUAL_OFFENCES_FROM_CODES_AND_S15P2',
        enabled: true,
        displayName: 'SEXUAL_OFFENCES_FROM_CODES_AND_S15P2',
      } as unknown as FeatureToggleDisplay,
    ]

    adminService.getFeatureToggles.mockResolvedValue(featureToggleDisplays)

    return request(app)
      .get('/schedules/sexual-or-violent-lists')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Sexual or Violent Offences')
        expect(res.text).toContain('offence codes that begin with SX03 or SX56 or inclusion in Schedule 15 Part 2')
      })
  })

  it('when the toggle is false, the correct table should be identified', () => {
    offenceService.getSexualOrViolentLists.mockResolvedValue(sexualOrViolentLists)
    adminService.getFeatureToggles = jest.fn()
    const featureToggleDisplays = [
      {
        feature: 'SEXUAL_OFFENCES_FROM_CODES_AND_S15P2',
        enabled: false,
        displayName: 'SEXUAL_OFFENCES_FROM_CODES_AND_S15P2',
      } as unknown as FeatureToggleDisplay,
    ]

    adminService.getFeatureToggles.mockResolvedValue(featureToggleDisplays)

    return request(app)
      .get('/schedules/sexual-or-violent-lists')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Sexual or Violent Offences')
        expect(res.text).toContain('inclusion in Schedule 3 or Schedule 15 Part 2')
      })
  })

  it('the sexual tab should contain the sexual offences', () => {
    offenceService.getSexualOrViolentLists.mockResolvedValue(sexualOrViolentLists)

    adminService.getFeatureToggles = jest.fn()
    const featureToggleDisplays = [
      {
        feature: 'SEXUAL_OFFENCES_FROM_CODES_AND_S15P2',
        enabled: true,
        displayName: 'SEXUAL_OFFENCES_FROM_CODES_AND_S15P2',
      } as unknown as FeatureToggleDisplay,
    ]

    adminService.getFeatureToggles.mockResolvedValue(featureToggleDisplays)

    return request(app)
      .get('/schedules/sexual-or-violent-lists#sexual-s3-and-s15p2')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Codes that begin with SX03 or SX56 or are in Schedule 15 Part 2')
        expect(res.text).toContain('AA1234')
        expect(res.text).toContain('BB1234')
        expect(res.text).toContain('Legislation text 2')
        expect(res.text).toContain('Offence 2')
        expect(res.text).toContain('06 Jan 1994')
      })
  })

  it('the violent tab should contain the violent offences', () => {
    offenceService.getSexualOrViolentLists.mockResolvedValue(sexualOrViolentLists)
    adminService.getFeatureToggles = jest.fn()
    const featureToggleDisplays = [
      {
        feature: 'SEXUAL_OFFENCES_FROM_CODES_AND_S15P2',
        enabled: true,
        displayName: 'SEXUAL_OFFENCES_FROM_CODES_AND_S15P2',
      } as unknown as FeatureToggleDisplay,
    ]

    adminService.getFeatureToggles.mockResolvedValue(featureToggleDisplays)

    return request(app)
      .get('/schedules/sexual-or-violent-lists#violent')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Violent Offences (Schedule 15 Part 1)')
        expect(res.text).toContain('CC1234')
        expect(res.text).toContain('Offence 3')
        expect(res.text).toContain('06 Jan 1994')
        expect(res.text).toContain('Legislation text 3')
      })
  })
})
