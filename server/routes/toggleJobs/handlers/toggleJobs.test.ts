import { Request, Response } from 'express'

import ToggleJobsRoutes from './toggleJobs'
import OffenceService from '../../../services/offenceService'
import FeatureToggleDisplay from '../../../types/featureToggleDisplay'

const offenceService = new OffenceService(null) as jest.Mocked<OffenceService>

describe('Route Handlers - ToggleJobs', () => {
  const handler = new ToggleJobsRoutes(offenceService)
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
      offenceService.getFeatureToggles = jest.fn()
      const featureToggleDisplays = [
        {
          feature: 'DELTA_SYNC_NOMIS',
          enabled: true,
          displayName: 'Delta sync NOMIS',
        } as unknown as FeatureToggleDisplay,
      ]
      offenceService.getFeatureToggles.mockResolvedValue(featureToggleDisplays)
      await handler.GET(req, res)
      expect(res.render).toHaveBeenCalledWith('pages/toggleJobs/toggleJobs', { featureToggles: featureToggleDisplays })
    })
  })
})
