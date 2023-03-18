import { Request, Response } from 'express'

import ToggleJobsRoutes from './toggleJobs'
import FeatureToggleDisplay from '../../../types/featureToggleDisplay'
import AdminService from '../../../services/adminService'

const adminService = new AdminService(null, null) as jest.Mocked<AdminService>

describe('Route Handlers - ToggleJobs', () => {
  const handler = new ToggleJobsRoutes(adminService)
  let req: Request
  let res: Response

  beforeEach(() => {
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
  })
})
