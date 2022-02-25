import { Request, Response } from 'express'

import SearchRoutes from './search'
import OffenceService from '../../../services/offenceService'

const offenceService = new OffenceService() as jest.Mocked<OffenceService>

describe('Route Handlers - Home', () => {
  const handler = new SearchRoutes(offenceService)
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {
      query: {},
    } as unknown as Request
    res = {
      render: jest.fn(),
    } as unknown as Response
  })

  describe('GET', () => {
    it('For case admin', async () => {
      offenceService.getOffencesByCode = jest.fn()
      offenceService.getOffencesByCode.mockResolvedValue([{ id: 1 }])
      await handler.GET(req, res)
      expect(res.render).toHaveBeenCalledWith('pages/search/search', [{ id: 1 }])
    })
  })
})
