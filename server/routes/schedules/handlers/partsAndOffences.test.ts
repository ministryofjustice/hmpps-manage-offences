import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes } from '../../testutils/appSetup'
import OffenceService from '../../../services/offenceService'
import { OffenceToScheduleMapping, SdsExclusionLists } from '../../../@types/manageOffences/manageOffencesClientTypes'
import AdminService from '../../../services/adminService'

jest.mock('../../../services/offenceService')

const offenceService = new OffenceService(null) as jest.Mocked<OffenceService>
const adminService = new AdminService(null, null) as jest.Mocked<AdminService>

const sexualOffence: OffenceToScheduleMapping = {
  id: 2,
  code: 'BB1234',
  description: 'Sexual Offence',
  startDate: '1994-01-06',
  endDate: null,
  childOffences: null,
  isChild: false,
  revisionId: 1,
  changedDate: '2003-07-26',
  legislationText: 'Legislation text 2',
}

const sexualOffenceTrancheThree: OffenceToScheduleMapping = {
  id: 22,
  code: 'BB12345',
  description: 'Tranche Three Sexual Offence',
  startDate: '1994-01-06',
  endDate: null,
  childOffences: null,
  isChild: false,
  revisionId: 1,
  changedDate: '2003-07-26',
  legislationText: 'Legislation text 2',
}

const domesticAbuseOffence: OffenceToScheduleMapping = {
  id: 3,
  code: 'CC1234',
  description: 'Domestic Abuse Offence',
  startDate: '1994-01-06',
  endDate: null,
  childOffences: null,
  isChild: false,
  revisionId: 1,
  changedDate: '2003-07-26',
  legislationText: 'Legislation text 3',
}

const domesticAbuseOffenceTrancheThree: OffenceToScheduleMapping = {
  id: 33,
  code: 'CC12345',
  description: 'Tranche Three Domestic Abuse Offence',
  startDate: '1994-01-06',
  endDate: null,
  childOffences: null,
  isChild: false,
  revisionId: 1,
  changedDate: '2003-07-26',
  legislationText: 'Legislation text 3',
}

const nationalSecurityOffence: OffenceToScheduleMapping = {
  id: 3,
  code: 'DD1234',
  description: 'National Security Offence',
  startDate: '1994-01-06',
  endDate: null,
  childOffences: null,
  isChild: false,
  revisionId: 1,
  changedDate: '2003-07-26',
  legislationText: 'Legislation text 3',
}

const violentOffence: OffenceToScheduleMapping = {
  id: 3,
  code: 'EE1234',
  description: 'Violent Offence',
  startDate: '1994-01-06',
  endDate: null,
  childOffences: null,
  isChild: false,
  revisionId: 1,
  changedDate: '2003-07-26',
  legislationText: 'Legislation text 3',
}

const terrorismOffence: OffenceToScheduleMapping = {
  id: 3,
  code: 'FF1234',
  description: 'Terror Offence',
  startDate: '1994-01-06',
  endDate: null,
  childOffences: null,
  isChild: false,
  revisionId: 1,
  changedDate: '2003-07-26',
  legislationText: 'Legislation text 3',
}

const trancheThreeMurderOffence: OffenceToScheduleMapping = {
  id: 4,
  code: 'MM1234',
  description: 'Tranche Three Murder Offence',
  startDate: '1994-01-06',
  endDate: null,
  childOffences: null,
  isChild: false,
  revisionId: 1,
  changedDate: '2003-07-26',
  legislationText: 'Legislation text 3',
}

const sdsExclusionLists: SdsExclusionLists = {
  sexual: [sexualOffence],
  sexualTrancheThree: [sexualOffenceTrancheThree],
  domesticAbuse: [domesticAbuseOffence],
  domesticAbuseTrancheThree: [domesticAbuseOffenceTrancheThree],
  nationalSecurity: [nationalSecurityOffence],
  violent: [violentOffence],
  terrorism: [terrorismOffence],
  murderTrancheThree: [trancheThreeMurderOffence],
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
  it('should navigate to the SDS exclusions page', () => {
    offenceService.getSdsExclusionLists.mockResolvedValue(sdsExclusionLists)

    return request(app)
      .get('/schedules/sds-exclusion-lists')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('SDS Early Release Exclusions')
        expect(res.text).toContain(
          'Offences that relate to the Sexual Offences Act 2003 or where the code begins with SX03 or SX56 or the offence is in Schedule 15 Part 2',
        )
      })
  })

  it('the violent tab should contain the violent offences', () => {
    offenceService.getSdsExclusionLists.mockResolvedValue(sdsExclusionLists)

    return request(app)
      .get('/schedules/sds-exclusion-lists#violent')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Violent Offences (Schedule 15 Part 1)')
        expect(res.text).toContain('Violent offences are only excluded for sentences of four years and over.')
        expect(res.text).toContain('CC1234')
        expect(res.text).toContain('Violent Offence')
        expect(res.text).toContain('06 Jan 1994')
        expect(res.text).toContain('Legislation text 3')
      })
  })

  it('the five tabs should be present, one for each list', () => {
    offenceService.getSdsExclusionLists.mockResolvedValue(sdsExclusionLists)

    return request(app)
      .get('/schedules/sds-exclusion-lists')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('#violent')
        expect(res.text).toContain('Violent Offences (Schedule 15 Part 1)')
        expect(res.text).toContain('Violent offences are only excluded for sentences of four years and over.')
        expect(res.text).toContain('#sexual')
        expect(res.text).toContain(
          'Offences that relate to the Sexual Offences Act 2003 or where the code begins with SX03 or SX56 or the offence is in Schedule 15 Part 2',
        )
        expect(res.text).toContain('#domestic-abuse')
        expect(res.text).toContain('Offences that relate to Domestic Abuse')
        expect(res.text).toContain('#national-security')
        expect(res.text).toContain('Offences that relate to National Security legislation')
        expect(res.text).toContain('#terrorism')
        expect(res.text).toContain('Offences that relate to Terrorism legislation')
      })
  })

  it('all five test offences should be visible', () => {
    offenceService.getSdsExclusionLists.mockResolvedValue(sdsExclusionLists)

    return request(app)
      .get('/schedules/sds-exclusion-lists')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('BB1234')
        expect(res.text).toContain('Sexual Offence')
        expect(res.text).toContain('Tranche Three Sexual Offence')
        expect(res.text).toContain('CC1234')
        expect(res.text).toContain('Domestic Abuse Offence')
        expect(res.text).toContain('Tranche Three Domestic Abuse Offence')
        expect(res.text).toContain('DD1234')
        expect(res.text).toContain('National Security Offence')
        expect(res.text).toContain('EE1234')
        expect(res.text).toContain('Violent Offence')
        expect(res.text).toContain('FF1234')
        expect(res.text).toContain('Terror Offence')
        expect(res.text).toContain('Tranche Three Murder Offence')
      })
  })
})
