import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes } from '../../testutils/appSetup'
import OffenceService from '../../../services/offenceService'
import {
  OffenceToScheduleMapping,
  SexualOrViolentLists,
} from '../../../@types/manageOffences/manageOffencesClientTypes'

jest.mock('../../../services/offenceService')

const offenceService = new OffenceService(null) as jest.Mocked<OffenceService>

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

const sexualOrViolentLists: SexualOrViolentLists = { sexual: [offence1, offence2], violent: [offence3] }

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({
    services: { offenceService },
  })
})
afterEach(() => {
  jest.resetAllMocks()
})

describe('', () => {
  it('should navigate to the Sexual or Violent Offences page', () => {
    offenceService.getSexualOrViolentLists.mockResolvedValue(sexualOrViolentLists)

    return request(app)
      .get('/schedules/sexual-or-violent-lists')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Sexual or Violent Offences')
      })
  })

  it('the sexual tab should contain the sexual offences', () => {
    offenceService.getSexualOrViolentLists.mockResolvedValue(sexualOrViolentLists)

    return request(app)
      .get('/schedules/sexual-or-violent-lists#sexual')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Sexual Offences (Schedule 3 or Schedule 15 Part 2)')
        expect(res.text).toContain('AA1234')
        expect(res.text).toContain('BB1234')
        expect(res.text).toContain('Legislation text 2')
        expect(res.text).toContain('Offence 2')
        expect(res.text).toContain('06 Jan 1994')
      })
  })

  it('the violent tab should contain the violent offences', () => {
    offenceService.getSexualOrViolentLists.mockResolvedValue(sexualOrViolentLists)

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
