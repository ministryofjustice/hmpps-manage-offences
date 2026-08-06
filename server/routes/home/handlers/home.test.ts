import { Request, Response } from 'express'

import HomeRoutes from './home'
import OffenceService from '../../../services/offenceService'

const offenceService = new OffenceService(null) as jest.Mocked<OffenceService>

describe('Route Handlers - Home', () => {
  const handler = new HomeRoutes(offenceService)
  let req: Request
  let res: Response

  beforeEach(() => {
    res = {
      locals: {
        user: jest.fn(),
      },
      render: jest.fn(),
    } as unknown as Response
    offenceService.getProgressionModelExclusionLists = jest.fn()
  })

  describe('GET', () => {
    it('Test landing page has no progression model link by default', async () => {
      offenceService.getProgressionModelExclusionLists.mockResolvedValue({
        sentencingAct2026ProgressionModelExclusions: [],
      })
      await handler.GET(req, res)
      expect(res.render).toHaveBeenCalledWith('pages/index', { progressionModelExclusionsArePublished: false })
    })
    it('Test landing page has progression model link if the schedule is published', async () => {
      offenceService.getProgressionModelExclusionLists.mockResolvedValue({
        sentencingAct2026ProgressionModelExclusions: [
          {
            id: 0,
            code: 'OFFENCE1',
            revisionId: 0,
            startDate: '',
            changedDate: '',
            isChild: false,
          },
        ],
      })
      await handler.GET(req, res)
      expect(res.render).toHaveBeenCalledWith('pages/index', { progressionModelExclusionsArePublished: true })
    })
  })
})
