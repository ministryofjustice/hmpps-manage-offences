import { type Express, Request, Response } from 'express'

import request from 'supertest'
import ToggleJobsRoutes from './toggleJobs'
import FeatureToggleDisplay from '../../../types/featureToggleDisplay'
import AdminService from '../../../services/adminService'
import { appWithAllRoutes } from '../../testutils/appSetup'

const adminService = new AdminService(null, null) as jest.Mocked<AdminService>

let app: Express

describe('Route Handlers - ToggleJobs', () => {
  const handler = new ToggleJobsRoutes(adminService)
  let req: Request
  let res: Response

  beforeEach(() => {
    app = appWithAllRoutes({
      services: { adminService },
    })
    req = {
      query: {},
    } as unknown as Request
    res = {
      render: jest.fn(),
      locals: {
        user: {
          username: 'user',
        },
      },
    } as unknown as Response
  })

  describe('GET', () => {
    it('ToggleJobs screen without any a toggleJobs param', async () => {
      adminService.getFeatureToggles = jest.fn()
      const featureToggleDisplays = [
        {
          feature: 'DELTA_SYNC_NOMIS',
          enabled: true,
          displayName: 'Delta sync NOMIS',
        } as unknown as FeatureToggleDisplay,
      ]
      adminService.getFeatureToggles.mockResolvedValue(featureToggleDisplays)
      await handler.GET(req, res)
      expect(res.render).toHaveBeenCalledWith('pages/toggleJobs/toggleJobs', { featureToggles: featureToggleDisplays })
    })

    it('the hint text should be displayed with the correct style', async () => {
      adminService.getFeatureToggles = jest.fn()
      const featureToggleDisplays = [
        {
          feature: 'DELTA_SYNC_NOMIS',
          enabled: true,
          displayName: 'Delta sync NOMIS',
          hintText: 'Some hint text here',
        } as unknown as FeatureToggleDisplay,
      ]
      adminService.getFeatureToggles.mockResolvedValue(featureToggleDisplays)
      return request(app)
        .get('/toggle-jobs')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(response => {
          expect(response.text).toContain('Delta sync NOMIS')
          expect(response.text).toContain(
            '<div id="DELTA_SYNC_NOMIS-hint" class="govuk-hint govuk-!-width-two-thirds">',
          )
          expect(response.text).toContain('Some hint text here')
        })
    })
  })
})
